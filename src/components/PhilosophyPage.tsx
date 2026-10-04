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
import { CymaticsHarmonicsStudio } from './CymaticsHarmonicsStudio';

export interface PhilosophyPageProps {
  onOpenRegister?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenVarnamala?: () => void;
  onOpenReader?: () => void;
  onGoHome?: () => void;
  onOpenGrammarArticle?: (articleId: string) => void;
  /** Open a Course Addendum unit (e.g. Mantras & Ślokas). */
  onOpenCourseAddendum?: (addendumId: string) => void;
  initialEssay?: 'ai_sanskrit' | 'sunyat_anantam' | 'tagore_sanskrit' | 'music_of_matter' | 'pingala_binary' | 'turanga_bandha' | 'lilavati_math' | 'shad_darshana' | 'medha_mind';
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
  { term: 'medhā (मेधा)', meaning: 'receptive, retentive intelligence; from √medhṛ (Dhātupāṭha: understanding; also “meeting, coming together”)' },
  { term: 'antaḥkaraṇa (अन्तःकरणम्)', meaning: 'the inner instrument: manas, buddhi, citta and ahaṅkāra (Vedānta); threefold in Sāṅkhya' },
  { term: 'sākṣī (साक्षी)', meaning: 'the witness; awareness that observes the movements of the mind without being one of them' },
  { term: 'citta-vṛtti-nirodha (चित्तवृत्तिनिरोधः)', meaning: 'stilling of the fluctuations of the mind — Patañjali’s definition of yoga (Yoga Sūtra 1.2)' },
  { term: 'puruṣa · prakṛti (पुरुषः · प्रकृतिः)', meaning: 'Sāṅkhya: pure witnessing consciousness / nature, including mind, ego and intellect as subtle matter' },
  { term: 'kośa (कोशः)', meaning: 'sheath; the five layers (food, breath, mind, intellect, bliss) of Taittirīya Upaniṣad 2' },
  { term: 'anātman · anattā (अनात्मन्)', meaning: 'Buddhist “not-self”: no permanent self to be found in or behind the stream of mental events' },
  { term: 'ṣaḍ-darśana (षड्दर्शनानि)', meaning: 'the six “ways of seeing”: Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā and Vedānta' },
  { term: 'āstika · nāstika (आस्तिक · नास्तिक)', meaning: 'in doxography: schools that accept the authority of the Veda / those that do not (Cārvāka, Jaina, Bauddha)' },
  { term: 'pramāṇa (प्रमाणम्)', meaning: 'a valid means of knowing: perception, inference, comparison, testimony, and (for some schools) postulation and non-apprehension' },
  { term: 'padārtha (पदार्थः)', meaning: '“the meaning of a word”; in Vaiśeṣika, a category of what is real — six in the sūtra, later seven with abhāva (absence)' },
  { term: 'paramāṇu (परमाणुः)', meaning: 'the eternal, partless atom of Vaiśeṣika, from which earth, water, fire and air are built' },
  { term: 'satkāryavāda (सत्कार्यवादः)', meaning: 'Sāṅkhya doctrine that the effect already exists, unmanifest, in its cause (Sāṅkhya Kārikā 9)' },
  { term: 'tattva (तत्त्वम्)', meaning: '“that-ness”, a principle of reality; Sāṅkhya enumerates twenty-five' },
  { term: 'svataḥ-prāmāṇya (स्वतःप्रामाण्यम्)', meaning: 'Mīmāṃsā thesis that a cognition is valid by default unless defeated' },
  { term: 'arthāpatti · anupalabdhi (अर्थापत्तिः · अनुपलब्धिः)', meaning: 'postulation (accepted by both Mīmāṃsā schools) · non-apprehension (Kumārila’s sixth pramāṇa)' },
  { term: 'pūrvapakṣa · siddhānta (पूर्वपक्षः · सिद्धान्तः)', meaning: 'the opponent’s view, stated first and at full strength · the established conclusion' },
  { term: 'vāda · jalpa · vitaṇḍā (वादः · जल्पः · वितण्डा)', meaning: 'truth-seeking discussion · debate to win · purely destructive cavil (Nyāya Sūtra 1.2.1–3)' },
  { term: 'vivarta · pariṇāma (विवर्तः · परिणामः)', meaning: 'apparent transformation (Advaita’s account of the world) · real transformation (as milk into curd; Sāṅkhya’s prakṛti)' },
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

const SHAD_ESSAY_TITLE =
  'Six Lenses on Reality: The Ṣaḍ-darśanas and the Culture of Debate · Darśana | EdNet Learn Gurukul';
const SHAD_ESSAY_DESC =
  'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā and Vedānta: each opening sūtra in Devanagari with meaning, how the six schools differ in method, and India’s culture of pūrvapakṣa and debate.';

const MEDHA_ESSAY_TITLE =
  'Medhā and the Mind: Two Ways of Looking at Consciousness · Darśana | EdNet Learn Gurukul';
const MEDHA_ESSAY_DESC =
  'Medhā, antaḥkaraṇa and the witness (sākṣī): Descartes, physicalism and the hard problem set beside Vedānta, Sāṅkhya-Yoga (YS 1.2) and Buddhist anattā.';

/** Essays that own a URL hash (deep link + section chips prefixed with the same key). */
const ESSAY_HASHES = {
  shad_darshana: 'shad-darshana',
  medha_mind: 'medha',
} as const;

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
  const [activeEssay, setActiveEssay] = useState<'ai_sanskrit' | 'sunyat_anantam' | 'tagore_sanskrit' | 'music_of_matter' | 'pingala_binary' | 'turanga_bandha' | 'lilavati_math' | 'shad_darshana' | 'medha_mind'>(initialEssay);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    if (initialEssay) {
      setActiveEssay(initialEssay);
    }
  }, [initialEssay]);

  // Deep links: /philosophy#medha opens the Medhā essay tab; /philosophy#shad-darshana opens Six Lenses.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    const match = (Object.keys(ESSAY_HASHES) as (keyof typeof ESSAY_HASHES)[]).find(
      (k) => hash === `#${ESSAY_HASHES[k]}` || hash.startsWith(`#${ESSAY_HASHES[k]}-`)
    );
    if (match) {
      setActiveEssay(match);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { pathname, search, hash } = window.location;
    const matchesKey = (key: string) => hash === `#${key}` || hash.startsWith(`#${key}-`);
    const activeKey = (ESSAY_HASHES as Record<string, string>)[activeEssay];
    if (activeKey) {
      if (!matchesKey(activeKey)) {
        window.history.replaceState(window.history.state, '', `${pathname}${search}#${activeKey}`);
      }
    } else if (Object.values(ESSAY_HASHES).some(matchesKey)) {
      window.history.replaceState(window.history.state, '', `${pathname}${search}`);
    }
  }, [activeEssay]);

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
    } else if (activeEssay === 'shad_darshana') {
      currentTitle = SHAD_ESSAY_TITLE;
      currentDesc = SHAD_ESSAY_DESC;
    } else if (activeEssay === 'medha_mind') {
      currentTitle = MEDHA_ESSAY_TITLE;
      currentDesc = MEDHA_ESSAY_DESC;
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
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'shad_darshana' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('shad_darshana');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">👁️</span>
            <div>
              <span className="philosophy-essay-tab-title">षड्दर्शनानि · Six Lenses on Reality</span>
              <span className="philosophy-essay-tab-sub">The Ṣaḍ-darśanas &amp; the Culture of Debate · Prequel to Medhā</span>
            </div>
          </button>
          <button
            type="button"
            className={`philosophy-essay-tab ${activeEssay === 'medha_mind' ? 'active' : ''}`}
            onClick={() => {
              setActiveEssay('medha_mind');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="philosophy-essay-tab-icon" aria-hidden="true">🪔</span>
            <div>
              <span className="philosophy-essay-tab-title">मेधा · Medhā and the Mind</span>
              <span className="philosophy-essay-tab-sub">Two Ways of Looking at Consciousness · Antaḥkaraṇa · Sākṣī</span>
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

            <section className="philosophy-section philosophy-what-they-said" aria-labelledby="what-they-said">
              <h2 id="what-they-said">What they said</h2>
              <blockquote className="philosophy-said">
                <p>
                  “The intellectual debt of Europe to Sanskrit literature has thus been undeniably great; it may perhaps become greater still in the years that are to come.”
                </p>
                <footer>
                  Arthur A. MacDonell,{' '}
                  <a
                    href="https://www.gutenberg.org/files/41563/41563-h/41563-h.htm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A History of Sanskrit Literature
                  </a>
                </footer>
              </blockquote>
              <blockquote className="philosophy-said">
                <p>
                  “The Sanskrit language, whatever be its antiquity, is of a wonderful structure; more perfect than the Greek, more copious than the Latin and more exquisitely refined than either: yet bearing to both of them a stronger affinity, both in the roots of verbs, and in the forms of grammar, than could possibly have been produced by accident; so strong indeed, that no philologer could examine them all without believing them to have sprung from some common source which perhaps no longer exists.”
                </p>
                <footer>
                  Sir William Jones, Third Anniversary Discourse, 2 February 1786. He came to India in 1783 as a judge of the Supreme Court at Fort William, Bengal.
                </footer>
              </blockquote>
              <blockquote className="philosophy-said">
                <p>
                  “Sanskrit language, as has been universally recognized by those competent to form a judgement, as one of the most magnificent, the most perfect, the most prominent and wonderfully sufficient literary instruments developed by the human mind.”
                </p>
                <footer>
                  Sri Aurobindo, <cite>Arya</cite>, May to September 1920
                </footer>
              </blockquote>
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
                <a href="#cymatics-somatic-nodal" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🌊 Somatic Cymatics Studio</a>
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

            {/* Somatic Cymatics & Nodal Stillness Interactive Section */}
            <section className="philosophy-section" id="cymatics-somatic-nodal" aria-labelledby="cymatics-somatic-nodal-heading">
              <h2 id="cymatics-somatic-nodal-heading">Somatic Cymatics &amp; Nodal Stillness: The Practitioner as the Chladni Plate (नाद-बिन्दु-संस्थानम्)</h2>
              <p className="philosophy-secondary" style={{ marginTop: '-0.35rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                Form Born from Regions of Zero Displacement · 4-Lobe Mūlādhāra Resonance · Yantra as a Standing Wave Map
              </p>

              <figure className="philosophy-hero-mandala" style={{ maxWidth: '580px', margin: '1.5rem auto' }}>
                <img
                  src="/philosophy/cymatics-sound-vibration-geometric-structure.png"
                  alt="Cymatics: Sound Vibration Creating Geometric Structure — 4-Lobe Quadrupole Standing Wave"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    border: '1px solid #1e293b',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45), 0 0 25px rgba(56, 189, 248, 0.1)',
                    background: '#070b14'
                  }}
                  loading="lazy"
                />
                <figcaption style={{ fontSize: '0.84rem', color: '#64748b', textAlign: 'center', marginTop: '0.75rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  Figure: Polar standing wave representation of acoustic vibration generating a 4-lobed quadrupole geometry. Particles settle along nodal lines (regions of zero displacement), mirroring the 4-petaled Mūlādhāra lotus, the 4-gated Bhūpura of sacred Yantras, and the fourfold descent of Vāk (Parā ⟶ Paśyantī ⟶ Madhyamā ⟶ Vaikharī).
                </figcaption>
              </figure>

              <p>
                What cymatics demonstrates on a physical laboratory plate is the empirical foundation of what Tantric and Vedic traditions formalized as Yantra: <strong>Mantra (sound-vibration) ⟷ Yantra (geometric standing wave) ⟷ Mūrti (embodied form)</strong>.
              </p>

              <ul className="philosophy-bullet-list">
                <li>
                  <strong>Form is Born from Nodal Stillness:</strong> In cymatics, particles do not collect where the plate is violently shaking. They gather at the <em>nodal lines</em> — the regions of zero displacement where opposing wave vectors cancel each other out. Geometry appears where there is structural stillness amid oscillation.
                </li>
                <li>
                  <strong>The 4-Lobe Pattern (Mūlādhāra &amp; Gaṇapati):</strong> A harmonic quadrupole vibration naturally generates a distinct 4-lobed rotational symmetry. In subtle anatomy, Mūlādhāra is classically mapped as a 4-petaled lotus (vaṃ, śaṃ, ṣaṃ, saṃ), the seat of Gaṇeśa identified with Oṃkāra and the grossest density of earth/matter (pṛthvī-tattva).
                </li>
                <li>
                  <strong>Somatic Cymatics: The Practitioner as the Plate:</strong> The human body is over 70% fluid. When chanting a sacred varṇa with unwavering <em>bhāvanā</em>, the articulator acts as the mechanical actuator, intention provides stable voltage without phase jitter, and consciousness settles neural tissue along the nodal lines of sacred geometry.
                </li>
              </ul>

              {/* Interactive Cymatics Studio Component */}
              <CymaticsHarmonicsStudio onPlayAudio={handlePlayAudio} />
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
                <a href="#lilavati-parikarma" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🔢 2. Śleṣa &amp; Parikarmāṣṭakam</a>
                <a href="#lilavati-vyavahara" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📐 3. Volumetric Vyavahāras</a>
                <a href="#lilavati-bees" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🐝 4. Swarm of Bees (Quadratic)</a>
                <a href="#lilavati-necklace" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>📿 5. Broken Necklace (Fractions)</a>
                <a href="#lilavati-peacock-lotus" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🦚 6. Peacock &amp; Lotus (Geometry)</a>
                <a href="#lilavati-studio" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>⚙️ 7. Interactive Riddle Studio</a>
                <a href="#lilavati-currency" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🐚 8. Cowrie Currency (Varāṭaka) &amp; Place-Value</a>
                <a href="#lilavati-aesthetics" className="philosophy-chip" style={{ textDecoration: 'none', cursor: 'pointer' }}>🎨 9. Sanskrit Aesthetics &amp; Rasa</a>
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

            {/* Section 2: The Shlesha Invocation, Parikarmashtaka & Khahara */}
            <section className="philosophy-section" id="lilavati-parikarma" aria-labelledby="heading-lilavati-parikarma">
              <h2 id="heading-lilavati-parikarma">2. The Śleṣa Invocation, the 8 Operations (परिकर्माष्टकम्) &amp; Calculus of Zero (खहरः)</h2>
              <p className="philosophy-lead">
                The opening verse of the <em>Līlāvatī</em> is an acknowledged masterpiece of classical Sanskrit <strong>श्लेषालङ्कारः (Śleṣālaṅkāra / double entendre)</strong>. Composed in the noble 14-syllable <strong>वसन्ततिलका (Vasantatilakā)</strong> meter, the verse is intentionally crafted with two entirely coherent, parallel meanings: one as a romantic tribute to a graceful maiden, and the other as an exact technical blueprint for mathematical arithmetic.
              </p>

              {/* The Shlesha Verse Card */}
              <div className="philosophy-card" style={{ background: '#fefce8', border: '1.5px solid #fef08a', margin: '1.25rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                    Śleṣālaṅkāra Invocation · Vasantatilakā Chandaḥ (वसन्ततिलका)
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio('येषां सुजातिगुणवर्गविभूषिताङ्गी शुद्धाखिला व्यवहृतिः खलु कण्ठसक्ता । लीलावतीह सरसोक्तिमुदाहरन्ती तेषां सदैव सुखसम्पदुपैति वृद्धिम् ॥')}
                    style={{
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.78rem',
                      borderRadius: '6px',
                      border: '1px solid #fde047',
                      background: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: '#854d0e',
                    }}
                  >
                    🔊 Chant Śleṣa Verse
                  </button>
                </div>

                <div style={{ fontSize: '1.12rem', fontWeight: 800, color: '#713f12', lineHeight: 1.7, marginBottom: '0.4rem' }}>
                  येषां सुजातिगुणवर्गविभूषिताङ्गी शुद्धाखिला व्यवहृतिः खलु कण्ठसक्ता ।<br />
                  लीलावतीह सरसोक्तिमुदाहरन्ती तेषां सदैव सुखसम्पदुपैति वृद्धिम् ॥<br />
                  <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#a16207' }}>
                    yeṣāṃ sujātiguṇavargavibhūṣitāṅgī śuddhākhilā vyavahṛtiḥ khalu kaṇṭhasaktā |<br />
                    līlāvatīha sarasoktimudāharantī teṣāṃ sadaiva sukhasampadupaiti vṛddhim ||
                  </span>
                </div>
              </div>

              {/* Dual Interpretation Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '12px', border: '1.5px solid #bbf7d0' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.08rem', fontWeight: 800, color: '#166534' }}>
                    📐 1. गणित-परः अर्थः (The Mathematical Meaning)
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#15803d', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    In classical Indian mathematics (<em>Pāṭīgaṇita</em>), each technical compound maps to algorithmic operations:
                  </p>
                  <ul style={{ fontSize: '0.85rem', color: '#14532d', paddingLeft: '1.2rem', lineHeight: 1.6, margin: 0 }}>
                    <li><strong>सुजाति (Su-jāti):</strong> Fractional reductions, classification of integer types, and operations on similar fractions (<em>Bhāgajāti</em>).</li>
                    <li><strong>गुण (Guṇa):</strong> The operation of multiplication (<em>Guṇana / Guṇakāra</em>).</li>
                    <li><strong>वर्ग (Varga):</strong> Squaring operations and second-degree rules (<em>Varga-parikarma</em>).</li>
                    <li><strong>विभूषिताङ्गी (Vibhūṣitāṅgī):</strong> A textbook treatise structured with these essential computational chapters.</li>
                    <li><strong>शुद्धाखिला व्यवहृतिः (Śuddhākhilā vyavahṛtiḥ):</strong> Flawless execution of practical mathematical transactions, commercial calculations, and word problems (<em>Vyavahāra-gaṇita</em>).</li>
                    <li><strong>कण्ठसक्ता (Kaṇṭhasaktā):</strong> Firmly memorized (&quot;clinging to the throat&quot;), enabling instant mental calculation without slate aids.</li>
                    <li><strong>लीलावती (Līlāvatī):</strong> The mathematical treatise itself, denoting &quot;The Playful, Joyful Science.&quot;</li>
                    <li><strong>सुखसम्पदुपैति वृद्धिम् (Sukhasampad upaiti vṛddhim):</strong> Intellectual mastery and worldly prosperity constantly multiply.</li>
                  </ul>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem', background: '#dcfce7', borderRadius: '8px', fontSize: '0.84rem', color: '#14532d', fontStyle: 'italic' }}>
                    <strong>Mathematical Translation:</strong> &quot;For those who hold this Līlāvatī text at their throat (in fluent memory)—a treatise adorned with fractions (Jāti), multiplication (Guṇa), and squares (Varga), producing error-free calculations (Vyavahāra)—joy, wealth, and analytical prosperity will forever multiply.&quot;
                  </div>
                </div>

                <div style={{ background: '#fdf2f8', padding: '1.2rem', borderRadius: '12px', border: '1.5px solid #fbcfe8' }}>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.08rem', fontWeight: 800, color: '#9d174d' }}>
                    🌺 2. काव्य-परः अर्थः (The Romantic / Poetic Meaning)
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#be185d', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                    Read through classical Sanskrit aesthetics (<em>Kāvya / Śṛṅgāra</em>), the exact same words portray a beloved companion:
                  </p>
                  <ul style={{ fontSize: '0.85rem', color: '#831843', paddingLeft: '1.2rem', lineHeight: 1.6, margin: 0 }}>
                    <li><strong>सुजाति (Su-jāti):</strong> Born of noble, virtuous, and distinguished lineage.</li>
                    <li><strong>गुण (Guṇa):</strong> Endowed with high moral virtues, sweetness of speech, and gracious charm.</li>
                    <li><strong>वर्ग (Varga):</strong> Beloved and preeminent among her circle of kindred companions.</li>
                    <li><strong>विभूषिताङ्गी (Vibhūṣitāṅgī):</strong> Whose limbs and body are gracefully adorned with radiant gems and ornaments.</li>
                    <li><strong>शुद्धाखिला व्यवहृतिः (Śuddhākhilā vyavahṛtiḥ):</strong> Whose daily conduct, manners, and social interactions are pure and spotless.</li>
                    <li><strong>कण्ठसक्ता (Kaṇṭhasaktā):</strong> Who affectionately embraces her beloved’s neck with tender devotion.</li>
                    <li><strong>लीलावती (Līlāvatī):</strong> A charming, playful, and affectionate maiden.</li>
                    <li><strong>सुखसम्पदुपैति वृद्धिम् (Sukhasampad upaiti vṛddhim):</strong> Daily happiness, peace, and domestic fulfillment continually increase.</li>
                  </ul>
                  <div style={{ marginTop: '0.75rem', padding: '0.6rem', background: '#fce7f3', borderRadius: '8px', fontSize: '0.84rem', color: '#831843', fontStyle: 'italic' }}>
                    <strong>Poetic Translation:</strong> &quot;For the one who holds a charming woman named Līlāvatī close to his heart—one born of noble pedigree (Sujāti), endowed with virtues (Guṇa), adorned with ornaments (Vibhūṣitāṅgī), whose conduct is spotless (Vyavahṛti), and who tenderly embraces his neck—endless joy and domestic prosperity will forever flourish.&quot;
                  </div>
                </div>
              </div>

              {/* Parikarmashtaka: The 8 Fundamental Operations */}
              <div style={{ marginTop: '1.75rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  The 8 Fundamental Operations of Arithmetic (परिकर्माष्टकम्)
                </h3>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
                  Directly after the introductory invocation, Bhāskarāchārya establishes the sequence of eight fundamental operations (<em>Parikarmāṣṭakam</em>) that forms the procedural engine of classical Indian algebra and astronomy, extending basic arithmetic to include powers and roots:
                </p>

                <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Operation (परिकर्म)</th>
                        <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Sanskrit Canon</th>
                        <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Algorithmic Core in Līlāvatī</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>1. Saṅkalita (सङ्कलितम्)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>सङ्कलने रूपैक्यम्</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Addition: Combining magnitudes into a single sum using column place-value alignments from left-to-right or right-to-left.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>2. Vyavakalita (व्यवकलितम्)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>व्युत्कलनेऽन्तरं भवेत्</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Subtraction: Computing the algebraic difference between minuend and subtrahend, handling positive and negative signs (<em>Dhana-Ṛṇa</em>).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>3. Guṇana (गुणनम् / गुणकारः)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>गुण्यो गुणकगुणिता गुणितः स्यात्</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Multiplication: Employs 5 distinct algorithms (<em>Pañca Guṇana-vidhayaḥ</em>): Sthānaguṇana (place-by-place), Khaṇḍaguṇana (factoring: A(b₁+b₂)), Vibhāga, Rūpavibhāga, and Kapāṭasandhi (lattice grid).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>4. Bhāgahāra (भागहारः)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>भागहारेण भाजिते</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Division: Partitioning quantities and factoring, isolating common divisors (<em>Apavartana</em>) prior to formal long division.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>5. Varga (वर्गः)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>समद्विघातः कृतिरुच्यते</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Squaring: Self-multiplication leveraging algebraic identities: (a+b)² = a² + 2ab + b² and a² = (a+d)(a-d) + d² (using chosen difference <em>iṣṭa</em>).</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>6. Varga-mūla (वर्गमूलम्)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>पदं मूलं प्रकीर्तितम्</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Square Root: Digit-by-digit place extraction dividing odd (<em>Viṣama</em>) and even (<em>Sama</em>) place columns systematically.</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>7. Ghana (घनः)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>समत्रिघातो घन उच्यते</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Cubing: Three-fold continuous product (a × a × a), proven through spatial cubic volume expansion: (a+b)³ = a³ + 3a²b + 3ab² + b³.</td>
                      </tr>
                      <tr style={{ background: '#f8fafc' }}>
                        <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#0f766e' }}>8. Ghana-mūla (घनमूलम्)</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#334155' }}>आद्यं घनस्थानमथाघने द्वे</td>
                        <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Cube Root: Grouping digits into trinary place sets (one cubic, two non-cubic) to extract roots of large astronomical numbers.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shunya-parikarma & Khahara */}
              <div className="philosophy-card" style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', margin: '1.25rem 0' }}>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.08rem', fontWeight: 800, color: '#1e40af' }}>
                  🌌 शून्यपरिकर्म (Śūnya-parikarma): Operations on Zero &amp; The Infinite Khahara (खहरः)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#1e3a8a', lineHeight: 1.5, margin: '0 0 0.75rem' }}>
                  Bhāskarāchārya articulates the exact arithmetic laws for combining Zero (<em>Kha / Śūnya</em>) with standard numbers, establishing how Zero affects addition, subtraction, multiplication, and powers:
                </p>

                <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #dbeafe', margin: '0.5rem 0' }}>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1e40af', lineHeight: 1.6 }}>
                    योगे खं क्षेपसमं वर्गादौ खं खभाजितो राशिः ।<br />
                    खहरः स्यात् खगुणः खं खगुणश्चिन्त्यश्च शेषविधौ ॥
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#3b82f6', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    yogē khaṁ kṣēpasamaṁ vargādau khaṁ khabhājitō rāśiḥ | khaharaḥ syāt khaguṇaḥ khaṁ khaguṇaścintyaśca śēṣavidhau ||
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#1e3a8a', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                    <strong>Mathematical Axiom:</strong> In addition, zero leaves the augend unchanged (a + 0 = a); the square or power of zero remains zero (0² = 0, 0³ = 0); a number multiplied by zero becomes zero (a × 0 = 0); and a quantity divided by zero is known as <strong>खहर (Khahara)</strong>—a fraction with zero as denominator (a / 0 = ∞).
                  </p>
                </div>

                <div style={{ background: '#ffffff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #dbeafe', margin: '0.75rem 0 0.25rem' }}>
                  <div style={{ fontSize: '0.98rem', fontWeight: 800, color: '#1e40af', lineHeight: 1.6 }}>
                    अस्मिन् विकारः खहरे न राशावपि प्रविष्टेष्वपि निःसृतेषु ।<br />
                    बहुष्वपि स्याल्लयसृष्टिकालेऽनन्तेऽच्युते भूतगणेषु यद्वत् ॥
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#3b82f6', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    asmin vikāraḥ khaharē na rāśāvapi praviṣṭēṣvapi niḥsṛtēṣu | bahuṣvapi syāllayasṛṣṭikālē&apos;nantē&apos;cyutē bhūtagaṇēṣu yadvat ||
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#1e3a8a', margin: '0.5rem 0 0', lineHeight: 1.5 }}>
                    <strong>The Cosmological Comparison of Mathematical Infinity:</strong> &quot;In this quantity called <em>Khahara</em> (division by zero), no change or alteration occurs, even though finite quantities enter into it or issue forth from it—just as no alteration occurs in the Infinite, Immutable Reality (<em>Ananta / Acyuta</em>), when endless hosts of beings emerge at cosmic creation (<em>Sṛṣṭi</em>) or dissolve back at cosmic dissolution (<em>Laya</em>)!&quot;
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Applied Volumetric Vyavaharas */}
            <section className="philosophy-section" id="lilavati-vyavahara" aria-labelledby="heading-lilavati-vyavahara">
              <h2 id="heading-lilavati-vyavahara">3. Applied Solid Geometry: The Volumetric Vyavahāras (खात-चिति-क्रकच-व्यवहाराः)</h2>
              <p className="philosophy-lead">
                In classical Indian mathematics, geometry was never confined to motionless lines drawn in dust. In the <em>Vyavahāra</em> (applied computational practice) chapters of the <em>Līlāvatī</em>, Bhāskarāchārya translates 3D solid mensuration into real-world civil engineering, architecture, forestry, and economic costing.
              </p>
              <p>
                The fundamental spatial metric across all three-dimensional calculations is the <strong>घनहस्तः (<em>Ghanahastaḥ</em> — Cubic Cubit)</strong>: the volume of a solid cube measuring one <em>Hasta</em> (approx. 18–24 inches) on each side (1 Hasta³).
              </p>

              {/* The Three Volumetric Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                {/* 1. Khata-vyavahara */}
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>⛏️</span>
                    <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#0f172a' }}>
                      1. खातव्यवहारः (Khāta-vyavahāraḥ)
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase' }}>
                    Earthwork &amp; Excavation Calculus
                  </span>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: '0.4rem 0' }}>
                    Used for step-wells (<em>Vāpī</em>), storage reservoirs (<em>Taḍāga</em>), and temple foundations. Bhāskara classifies pits into three topographies:
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>समखातम् (Sama):</strong> Uniform rectangular trench: Volume = Length × Width × Depth (in <em>Ghanahasta</em>).</li>
                    <li><strong>विषमखातम् (Viṣama):</strong> Irregular depths/banks; calculated by taking mean averages (Madhya-māna) of length, width, and depth across multi-point surveys.</li>
                    <li><strong>असमखातम् (Asama / Prismoidal):</strong> Sloping stepped tanks. Bhāskara formulates the exact prismoidal frustum volume (<em>Sūkṣma-ghana</em>):
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', padding: '0.35rem 0.5rem', borderRadius: '5px', margin: '0.3rem 0', border: '1px solid #cbd5e1' }}>
                        V = (h / 3) × (A₁ + A₂ + √(A₁ × A₂))
                      </div>
                      Centuries before modern calculus, matching the frustum formula for any truncated pyramid!
                    </li>
                  </ul>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#0f766e', background: '#f0fdfa', padding: '0.4rem', borderRadius: '6px' }}>
                    <strong>Logistical Output:</strong> Volume converts directly into laborer shifts (<em>Puruṣa-pramāṇa</em>), soil transport distance, and coin wages.
                  </div>
                </div>

                {/* 2. Citi-vyavahara */}
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🧱</span>
                    <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#0f172a' }}>
                      2. चितिव्यवहारः (Citi-vyavahāraḥ)
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                    Brick Stacks &amp; Masonry Planning
                  </span>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: '0.4rem 0' }}>
                    Originating in Vedic altar construction (<em>Śyena-citi</em>) and applied to royal fortress walls and temple superstructures:
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Stack Footprint:</strong> Calculates total 3D wall volume without counting individual bricks:
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', padding: '0.35rem 0.5rem', borderRadius: '5px', margin: '0.3rem 0', border: '1px solid #cbd5e1' }}>
                        Stack Volume = L × W × H (in Ghanahastas)
                      </div>
                    </li>
                    <li><strong>Unit Division (Bhāgahāra):</strong> Divides overall stack volume by unit brick volume (in fractional <em>Ghanahastas</em>):
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', padding: '0.35rem 0.5rem', borderRadius: '5px', margin: '0.3rem 0', border: '1px solid #cbd5e1' }}>
                        Total Bricks = (Stack Volume) / (Unit Brick Volume)
                      </div>
                    </li>
                  </ul>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#b45309', background: '#fffbeb', padding: '0.4rem', borderRadius: '6px' }}>
                    <strong>Architectural Impact:</strong> Eliminated material guesswork, allowing builders to kiln exact brick quotas before ground-breaking.
                  </div>
                </div>

                {/* 3. Krakaca-vyavahara */}
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #cbd5e1' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🪚</span>
                    <h3 style={{ margin: 0, fontSize: '1.02rem', fontWeight: 800, color: '#0f172a' }}>
                      3. क्रकचव्यवहारः (Krakaca-vyavahāraḥ)
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4338ca', textTransform: 'uppercase' }}>
                    Timber Geometry &amp; Sawing Metrics
                  </span>
                  <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, margin: '0.4rem 0' }}>
                    <em>Krakaca</em> literally denotes the carpenter’s pull-saw. Formulates commercial billing for sawing timber logs into planks:
                  </p>
                  <ul style={{ fontSize: '0.82rem', color: '#334155', paddingLeft: '1.1rem', margin: 0, lineHeight: 1.5 }}>
                    <li><strong>Cylindrical Core:</strong> Measures circumference (<em>Pariṇāha</em>) and length (<em>Dīrgha</em>) to calculate usable rectangular timber cross-section (<em>Caturaśrīkaraṇa</em>).</li>
                    <li><strong>Surface-Area Cleared:</strong> Ancient sawyers were not billed per log, but by total cross-sectional area severed by the blade:
                      <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', background: '#ffffff', padding: '0.35rem 0.5rem', borderRadius: '5px', margin: '0.3rem 0', border: '1px solid #cbd5e1' }}>
                        Cut Area = Length × Thickness × Number of Cuts
                      </div>
                    </li>
                    <li><strong>Wood Density Index:</strong> Differentiated labor tariffs based on hardness: hardwood Sal (<em>Śāla</em>) &amp; Acacia vs. medium Teak vs. soft Pine.</li>
                  </ul>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#4338ca', background: '#eef2ff', padding: '0.4rem', borderRadius: '6px' }}>
                    <strong>Commercial Reality:</strong> Standardized industrial billing based on physical thermodynamic work accomplished.
                  </div>
                </div>
              </div>

              {/* The Dimensional Pipeline Diagram */}
              <div className="philosophy-card" style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '1rem 0' }}>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '0.94rem', fontWeight: 800, color: '#0f172a' }}>
                  The Dimensional Pipeline of Classical Indian Mensuration:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.84rem', fontWeight: 700, color: '#334155', padding: '0.5rem 0' }}>
                  <span style={{ background: '#ffffff', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                    📏 Linear Dimensions (हस्त / Hasta)
                  </span>
                  <span style={{ color: '#0f766e' }}>➔ गुणनम् (Multiplication) ➔</span>
                  <span style={{ background: '#e0f2fe', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #7dd3fc', color: '#0369a1' }}>
                    🧊 3D Solid Measure (घनहस्त / Ghanahasta)
                  </span>
                  <span style={{ color: '#0f766e' }}>➔ भागहारः (Division / Ratio) ➔</span>
                  <span style={{ background: '#fef3c7', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid #fde68a', color: '#92400e' }}>
                    💰 Labor Shifts, Brick Counts &amp; Coin Wages
                  </span>
                </div>
              </div>
            </section>

            {/* Section 4: Resolution of the Swarm of Bees Riddle */}
            <section className="philosophy-section" id="lilavati-bees" aria-labelledby="heading-lilavati-bees">
              <h2 id="heading-lilavati-bees">4. Resolution of the Classic &quot;Swarm of Bees&quot; Riddle</h2>
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

            {/* Section 5: The Broken Necklace */}
            <section className="philosophy-section" id="lilavati-necklace" aria-labelledby="heading-lilavati-necklace">
              <h2 id="heading-lilavati-necklace">5. The Broken Necklace: Elevating a Lover’s Quarrel into Fractions</h2>
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

            {/* Section 6: Geometry Puzzles: The Peacock and the Lotus */}
            <section className="philosophy-section" id="lilavati-peacock-lotus" aria-labelledby="heading-lilavati-peacock-lotus">
              <h2 id="heading-lilavati-peacock-lotus">6. Geometry in Nature: The Perched Peacock and the Wind-Blown Lotus</h2>
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

            {/* Section 7: Interactive Riddle Studio */}
            <section className="philosophy-section" id="lilavati-studio" aria-labelledby="heading-lilavati-studio">
              <h2 id="heading-lilavati-studio">7. Interactive Riddle Studio: Solve Bhāskara’s Four Riddles</h2>
              <p className="philosophy-lead">
                Experiment with the interactive sliders below to solve the quadratic bee swarm, string the pearls, calculate the peacock’s dive, measure the lake depth, and convert cowrie shell currency into silver and gold:
              </p>

              {/* Embedded Interactive Component */}
              <LilavatiPoeticMathStudio onPlayAudio={handlePlayAudio} />
            </section>

            {/* Section 8: Cowrie Shell Currency & Place-Value */}
            <section className="philosophy-section" id="lilavati-currency" aria-labelledby="heading-lilavati-currency">
              <h2 id="heading-lilavati-currency">8. The Micro-Currency Foundation: Cowrie Shells (Varāṭaka), Global Trade &amp; Physical Place-Value</h2>
              <p className="philosophy-lead">
                In Chapter 1 of the <em>Līlāvatī</em> (the <em>Paribhāṣā</em> metrological chapter), Bhāskarāchārya does not begin with abstract cosmic numbers. Instead, he anchors mathematical calculation in the tangible micro-currency of the common person: the cowrie seashell (वराटक / <em>varāṭaka</em>).
              </p>

              <div className="philosophy-card" style={{ background: '#fefce8', border: '1.5px solid #fef08a', margin: '1.25rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#854d0e', textTransform: 'uppercase' }}>
                    Sanskrit Metrology Verse · Upajāti Meter (Chapter 1, Verse 2)
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio('वराटकानां दशकद्वयं यत् सा काकिणी')}
                    style={{
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.76rem',
                      borderRadius: '6px',
                      border: '1px solid #fde047',
                      background: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: '#854d0e',
                    }}
                  >
                    🔊 Chant Currency Verse
                  </button>
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#713f12', lineHeight: 1.6, marginBottom: '0.35rem' }}>
                  वराटकानां दशकद्वयं यत् सा काकिणी ताश्च पणश्चतस्रः ।<br />
                  ते षोडश द्रम्म इहावगम्यो द्रम्मैस्तथा षोडशभिश्च निष्कः ॥<br />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#a16207' }}>
                    varāṭakānāṁ daśakadvayaṁ yat sā kākiṇī tāśca paṇaścatasraḥ |<br />
                    te ṣoḍaśa dramma ihāvagamyo drammaistathā ṣoḍaśabhiśca niṣkaḥ ||
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#854d0e', background: '#fef9c3', padding: '0.5rem 0.75rem', borderRadius: '6px', margin: '0.4rem 0', border: '1px solid #fde047' }}>
                  <strong>16th c. Vernacular Transmission (<em>Prakīrṇa Gaṇitamu</em> by Eluganti Pedana):</strong><br />
                  <em>&quot;Twenty cowries make one kākiṇī · four kākiṇīs make one paṇa · sixteen paṇas make one dramma · sixteen drammas make one niṣka.&quot;</em>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#713f12', lineHeight: 1.5 }}>
                  <strong>Literal Sanskrit Axiom:</strong> &quot;Twice ten (20) varāṭakas (cowrie shells) make one kākiṇī; four kākiṇīs make one paṇa; sixteen paṇas make one dramma; and sixteen drammas make one niṣka.&quot;
                </p>
              </div>

              {/* Monetary Conversion Table */}
              <div style={{ overflowX: 'auto', margin: '1.25rem 0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Denomination (Sanskrit / Classical)</th>
                      <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Shell Count (Varāṭaka)</th>
                      <th style={{ padding: '0.65rem 0.85rem', fontWeight: 800, color: '#0f172a' }}>Marketplace &amp; Metallic Reality</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Phooṭī Kauḍī / Kapardikā-pāda (पादवराटकः / फूटी कौड़ी)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>1/4 Shell (0.25)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Quarter piece of a broken shell; fractional ledger unit (origin of the idiom <em>&quot;not even a phooṭī kauḍī&quot;</em>)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Varāṭaka / Kapardikā (वराटकः / कपर्दिका)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>1 Whole Shell</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Individual <em>Monetaria moneta</em>; indivisible micro-currency for buying daily produce, salt, and clay pots</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Kākiṇī (काकिणी)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>20 Shells</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Handful barter standard; bridges retail counters with wholesale bulk transactions</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Paṇa / Kārṣāpaṇa (पणः / कार्षापणः)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>80 Shells (4 Kākiṇīs)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Standard copper coin (~9.5 grams); 80 uniform cowries balanced 1 copper coin on the scales</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Dramma (द्रम्मः)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>1,280 Shells (16 Paṇas)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>Standard silver coin; money changers used pre-calibrated scoops/baskets containing 1,280 shells</td>
                    </tr>
                    <tr style={{ background: '#f8fafc' }}>
                      <td style={{ padding: '0.6rem 0.85rem', fontWeight: 700, color: '#334155' }}>Niṣka (निष्कः)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#0d9488', fontWeight: 700 }}>20,480 Shells (16 Drammas)</td>
                      <td style={{ padding: '0.6rem 0.85rem', color: '#475569' }}>High-denomination gold coin; state revenue reserves, real-estate transactions, and merchant fleet financing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Three Thematic Sub-Blocks */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', margin: '1.25rem 0' }}>
                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    🐚 Why Seashells, Not Tamarind Seeds?
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    While tamarind seeds were used casually in domestic folk games like <em>Pallāṅguḻi / Vāmana Guṇṭalu</em>, they rot, chip, get eaten by insects, and change weight as they dry.
                    Formal treatises required <strong>Monetaria moneta</strong>: mineralized, lightweight, permanent, and impossible to counterfeit inland.
                    Meanwhile, botanical seeds like <strong>Guñjā (ratti)</strong> and <strong>Yava (barleycorn)</strong> were reserved for balance scales (<em>tulā</em>) to weigh gold and gems.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    ⛵ The Maldives (Mala-dvīpa) Aquaculture Loop
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    The world’s cowrie epicentre was the Maldives (ancient <em>Mala-dvīpa</em>, Arab <em>Dyvah-Kouzah</em>). Islanders submerged palm rafts in lagoons where millions of cowrie snails fed, harvesting them on lunar cycles.
                    Because atolls cannot grow rice, merchant fleets from Bengal and Odisha (Balasore, Chittagong) sailed with monsoons, bartering thousands of tons of rice, grains, silks, and pottery for billions of shells.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '1.15rem', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
                  <h3 style={{ margin: '0 0 0.4rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                    🧮 The Physical Training Ground for Place-Value
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    Before calculating millions on paper, merchants arranged cowries in heaps of tens and twenties on grid floors. This tactile manipulation physically trained human brains in <strong>positional place-value</strong> and <strong>carrying over</strong>.
                    This efficiency swept through Arab treatises (Al-Khwarizmi) and into Europe via Fibonacci’s <em>Liber Abaci</em> (1202), rendering Roman numerals and abacuses obsolete.
                  </p>
                </div>
              </div>

              {/* Volumetric Capacity & The World's First Rain Gauge */}
              <div className="philosophy-card" style={{ background: '#f0fdf4', border: '1.5px solid #86efac', margin: '1.25rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                    Volumetric Dry &amp; Liquid Metrology · Līlāvatī Chapter 1 (Verse 7)
                  </span>
                  <button
                    type="button"
                    onClick={() => handlePlayAudio('द्रोणस्तु खार्याः खलु षोडशांशः स्यादाढको द्रोणचतुर्थभागः । प्रस्थश्चतुर्थांश इहाढकस्य प्रस्थाङ्घ्रिराद्यैः कुडवः प्रदिष्टः ॥')}
                    style={{
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.76rem',
                      borderRadius: '6px',
                      border: '1px solid #86efac',
                      background: '#ffffff',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: '#166534',
                    }}
                  >
                    🔊 Chant Droṇa Metrology
                  </button>
                </div>
                <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#14532d', lineHeight: 1.6, marginBottom: '0.35rem' }}>
                  द्रोणस्तु खार्याः खलु षोडशांशः स्यादाढको द्रोणचतुर्थभागः ।<br />
                  प्रस्थश्चतुर्थांश इहाढकस्य प्रस्थाङ्घ्रिराद्यैः कुडवः प्रदिष्टः ॥<br />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#15803d' }}>
                    droṇastu khāryāḥ khalu ṣoḍaśāṃśaḥ syādāḍhako droṇacaturthabhāgaḥ |<br />
                    prasthaścaturthāṃśa ihāḍhakasya prasthāṅghrirādyaiḥ kuḍavaḥ pradiṣṭaḥ ||
                  </span>
                </div>
                <p style={{ margin: '0.4rem 0', fontSize: '0.88rem', color: '#14532d', lineHeight: 1.5 }}>
                  <strong>The Volumetric Hierarchy:</strong> 1 Khārī (खारी) = 16 Droṇas (द्रोण) · 1 Droṇa = 4 Āḍhakas (आढक) · 1 Āḍhaka = 4 Prasthas (प्रस्थ) · 1 Prastha = 4 Kuḍavas (कुडव). (1 Khārī = 1,024 Kuḍavas).
                </p>

                <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '8px', border: '1px solid #bbf7d0', marginTop: '0.75rem' }}>
                  <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.94rem', fontWeight: 800, color: '#166534' }}>
                    🌧️ The World’s Earliest State Rain Gauge: Varṣāmāna (वर्षामानम्) in Kauṭilya’s Arthaśāstra
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#15803d', lineHeight: 1.5 }}>
                    Centuries before Bhāskara codified these units, the <em>Arthaśāstra</em> (Book 2, Chapters 19 &amp; 24, c. 300 BCE) deployed the exact same <strong>Droṇa (द्रोण)</strong> metric to construct history’s first standardized meteorological network:
                  </p>
                  <ul style={{ margin: '0.4rem 0 0', paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#14532d', lineHeight: 1.5 }}>
                    <li><strong>Standardized Gauge Bowl:</strong> Rain was caught in circular bowls measuring 1 <em>Aratni</em> (approx. 18 inches / 24 aṅgulas) in mouth diameter set up before royal warehouses.</li>
                    <li><strong>The Droṇa Metric:</strong> 1 Droṇa of water (approx. 13.2 kg) corresponded to approximately 1.5 to 2 inches of uniform surface rainfall.</li>
                    <li><strong>Agro-Climatic Zoning:</strong> Annual rainfall was calibrated regionally: 16 Droṇas for arid zones (<em>Jāṅgala</em>), 24 Droṇas for fertile moist zones (<em>Anūpa</em>), 13.5 Droṇas for the Deccan plateau (<em>Aśmaka</em>), 23 Droṇas for Malwa (<em>Avantī</em>), and unlimited for coastal Konkan (<em>Aparānta</em>) and the Himalayas.</li>
                    <li><strong>Dynamic Tax Governance:</strong> State agricultural ministers (<em>Sītādhyakṣa</em>) linked agricultural taxation and seed-sowing advisories (millets vs. paddy) in real time to the Droṇas recorded at regional rain stations.</li>
                  </ul>
                </div>
              </div>

              <div className="philosophy-card" style={{ background: '#f0fdfa', border: '1.5px solid #99f6e4', margin: '1rem 0' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.92rem', color: '#134e4a', lineHeight: 1.6 }}>
                  <strong>Historical Continuity:</strong> Four centuries before Bhāskara, Śrīdharācārya’s <em>Triśatikā</em> (8th c. CE) formulated this exact ratio: <code>20 varāṭakas = 1 kākiṇī</code>. Two centuries after Bhāskara, Nārāyaṇa Paṇḍita’s <em>Gaṇita Kaumudī</em> (1356 CE) opened its metrology chapter with the identical shell sequence. Cowrie shells functioned as India’s standardized national computational bedrock for well over a thousand years.
                </p>
              </div>
            </section>

            {/* Section 9: Sanskrit Aesthetics & Rasa */}
            <section className="philosophy-section" id="lilavati-aesthetics" aria-labelledby="heading-lilavati-aesthetics">
              <h2 id="heading-lilavati-aesthetics">9. Sanskrit Aesthetics: The Philosophy Behind the Poetry</h2>
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

        {/* =========================================================================
            ESSAY: षड्दर्शनानि · Six Lenses on Reality — prequel to Medhā and the Mind
           ========================================================================= */}
        {activeEssay === 'shad_darshana' && (
          <div className="philosophy-essay-body" id="shad-darshana">
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · षड्दर्शनानि · प्रमाणम् · पूर्वपक्षः</span>
              <h1 className="philosophy-title">
                षड्दर्शनानि · Six Lenses on Reality: The Ṣaḍ-darśanas and the Culture of Debate
              </h1>
              <p className="philosophy-mantra">
                Darśana means “seeing,” not “doctrine.” Six schools, six vantage points — and a conversation that
                never needed a single winner.
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '40rem', margin: '1.25rem auto 0.75rem' }}>
                <p lang="sa" style={{ fontSize: '1.15rem' }}>
                  को अद्धा वेद क इह प्र वोचत् कुत आजाता कुत इयं विसृष्टिः ।
                </p>
                <p>“Who truly knows? Who here will declare it — whence it was born, whence this creation?”</p>
                <cite>— Ṛgveda 10.129.6 (Nāsadīya Sūkta)</cite>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="षड्दर्शनानि" label="षड्दर्शनानि (ṣaḍ-darśanāni)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="दर्शनम्" label="दर्शनम् (darśanam)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="प्रमाणम्" label="प्रमाणम् (pramāṇam)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="पूर्वपक्षः" label="पूर्वपक्षः (pūrvapakṣaḥ)" />
              </div>
            </header>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', margin: '0 0 1.75rem' }} aria-label="Article sections">
              <a href="#shad-darshana-nyaya" className="philosophy-chip" style={{ textDecoration: 'none' }}>⚖️ 1. Nyāya</a>
              <a href="#shad-darshana-vaisheshika" className="philosophy-chip" style={{ textDecoration: 'none' }}>⚛️ 2. Vaiśeṣika</a>
              <a href="#shad-darshana-sankhya" className="philosophy-chip" style={{ textDecoration: 'none' }}>🌱 3. Sāṅkhya</a>
              <a href="#shad-darshana-yoga" className="philosophy-chip" style={{ textDecoration: 'none' }}>🧘 4. Yoga</a>
              <a href="#shad-darshana-mimamsa" className="philosophy-chip" style={{ textDecoration: 'none' }}>🔥 5. Mīmāṃsā</a>
              <a href="#shad-darshana-vedanta" className="philosophy-chip" style={{ textDecoration: 'none' }}>🕉️ 6. Vedānta</a>
              <a href="#shad-darshana-methods" className="philosophy-chip" style={{ textDecoration: 'none' }}>🔍 How They Differ</a>
              <a href="#shad-darshana-debate" className="philosophy-chip" style={{ textDecoration: 'none' }}>🗣️ Nothing Was Absolute</a>
            </div>

            {/* Opening */}
            <section className="philosophy-section" aria-label="Introduction">
              <p>
                The <strong lang="sa">षड्दर्शनानि (ṣaḍ-darśanāni)</strong>, the “six darśanas,” are the six classical
                schools of Indian philosophy traditionally called <strong>āstika</strong>. Here the word has a precise
                meaning: a school that accepts the authority of the Veda. (It does not simply mean “theist” — as we will
                see, two of the six did not need a creator God at all.) Alongside them stood the <strong>nāstika</strong>{' '}
                schools, which did not accept Vedic authority: the materialist <strong>Cārvāka</strong> (Lokāyata), the{' '}
                <strong>Jaina</strong>, and the <strong>Bauddha</strong> (Buddhist) traditions. They were not outsiders
                to the conversation. They were among its sharpest partners in debate.
              </p>
              <p>
                Rather than a single absolute dogma, the six operate as an interconnected web of perspectives, each
                using its own analytical method to examine the nature of reality. The word itself tells you how to read
                them. <strong lang="sa">दर्शन (darśana)</strong>, from √dṛś, “to see,” means a <em>way of seeing</em>, a
                viewpoint — not a creed. Each school stands at a different vantage point and asks three questions in its
                own order: <em>What is real? How do we know? What should we do?</em>
              </p>
              <p>
                Below, each school speaks first through one opening teaching — its foundational sūtra or verse, given in
                Devanagari, transliteration, and meaning — followed by its approach. Then we compare their methods side
                by side, and end with the culture of argument that held them together.
              </p>
              <p style={{ fontSize: '0.92rem', color: '#57534e' }}>
                Texts: each sūtra below has been checked against the editions on GRETIL (Göttingen Register of
                Electronic Texts in Indian Languages); the Devanagari is transliterated from those editions. Numbering
                follows the standard references given with each quotation.
              </p>
            </section>

            {/* 1. Nyaya */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-nyaya">
              <h2 id="shad-darshana-nyaya">1. Nyāya: The Science of Valid Knowing</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.05rem' }}>
                  प्रमाणप्रमेयसंशयप्रयोजनदृष्टान्तसिद्धान्तावयवतर्कनिर्णयवादजल्पवितण्डाहेत्वाभासच्छलजातिनिग्रहस्थानानां
                  तत्त्वज्ञानान्निःश्रेयसाधिगमः ॥
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  pramāṇa-prameya-saṃśaya-prayojana-dṛṣṭānta-siddhāntāvayava-tarka-nirṇaya-vāda-jalpa-vitaṇḍā-hetvābhāsa-chala-jāti-nigrahasthānānāṃ
                  tattvajñānān niḥśreyasādhigamaḥ
                </p>
                <p>
                  “The highest good is attained through true knowledge of the sixteen categories” — beginning with the
                  means of knowledge (<em>pramāṇa</em>), the objects of knowledge (<em>prameya</em>) and doubt
                  (<em>saṃśaya</em>), and ending with the fallacies and tricks of debate (<em>hetvābhāsa</em>,{' '}
                  <em>chala</em>, <em>jāti</em>) and the points at which an arguer is defeated (<em>nigrahasthāna</em>).
                </p>
                <cite>— Nyāya Sūtra of Gautama (Akṣapāda) 1.1.1</cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> The first sūtra is really a syllabus: a table of contents for a science of
                knowledge and debate. Notice that <em>doubt</em> is the third item on the list. Nyāya begins where honest
                inquiry begins — with not yet knowing. Its core claim is that whatever exists can, in principle, be known
                through a valid means; reality must survive logical verification.
              </p>
              <p>
                Nyāya accepts four <strong lang="sa">प्रमाण (pramāṇa)</strong>, valid means of knowing (NS 1.1.3):
                perception (<em>pratyakṣa</em>), inference (<em>anumāna</em>), comparison or analogy
                (<em>upamāna</em>), and reliable testimony (<em>śabda</em>). Its formal argument has five members
                (NS 1.1.32): the claim (<em>pratijñā</em>), the reason (<em>hetu</em>), the example
                (<em>udāharaṇa</em>), the application (<em>upanaya</em>), and the conclusion (<em>nigamana</em>). The
                classic illustration: <em>the hill has fire; because it has smoke; wherever there is smoke there is
                fire, as in a kitchen; this hill has smoke of that kind; therefore the hill has fire.</em>
              </p>
              <p>
                Nyāya also studied debate itself. It distinguishes <strong>vāda</strong>, honest discussion aimed at
                truth; <strong>jalpa</strong>, debate aimed at winning; and <strong>vitaṇḍā</strong>, pure attack that
                defends no position of its own (NS 1.2.1–3). And it catalogued bad-faith argument — quibbles, false
                rejoinders, fallacious reasons — with a thoroughness any modern student of rhetoric would recognise.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="न्यायः" label="न्याय (nyāya)" />
                <AudioChip term="प्रत्यक्षम्" label="प्रत्यक्ष (pratyakṣa)" />
                <AudioChip term="अनुमानम्" label="अनुमान (anumāna)" />
                <AudioChip term="उपमानम्" label="उपमान (upamāna)" />
                <AudioChip term="शब्दः" label="शब्द (śabda)" />
                <AudioChip term="वादः" label="वाद (vāda)" />
              </div>
            </section>

            {/* 2. Vaisheshika */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-vaisheshika">
              <h2 id="shad-darshana-vaisheshika">2. Vaiśeṣika: Reality Sorted into Categories</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.05rem' }}>
                  धर्मविशेषप्रसूताद्द्रव्यगुणकर्मसामान्यविशेषसमवायानां पदार्थानां साधर्म्यवैधर्म्याभ्यां
                  तत्त्वज्ञानान्निःश्रेयसम् ॥
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  dharma-viśeṣa-prasūtād dravya-guṇa-karma-sāmānya-viśeṣa-samavāyānāṃ padārthānāṃ
                  sādharmya-vaidharmyābhyāṃ tattvajñānān niḥśreyasam
                </p>
                <p>
                  “The highest good comes from true knowledge — born of a particular dharma — of the categories
                  substance, quality, action, universal, particularity and inherence, through their similarities and
                  differences.”
                </p>
                <cite>
                  — Vaiśeṣika Sūtra of Kaṇāda 1.1.4 (in the recension followed by Śaṅkara Miśra’s Upaskāra). Recensions
                  differ: the text transmitted with Candrānanda’s Vṛtti lacks this sūtra, and there 1.1.4 is the list of
                  nine substances.
                </cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> Where Nyāya asks <em>how</em> we know, Vaiśeṣika asks <em>what there
                is</em>. Its answer is a catalogue. Everything real falls into one of six{' '}
                <strong lang="sa">पदार्थ (padārtha)</strong>, categories — literally “meanings of words,” things that can
                be named. Later Nyāya-Vaiśeṣika added a seventh: <em>abhāva</em>, absence (the “no-pot” you notice on an
                empty table is, for this school, a genuine object of knowledge).
              </p>
              <p>
                The sūtra names nine substances (<em>dravya</em>): earth, water, fire, air, ether (<em>ākāśa</em>),
                time, space, self (<em>ātman</em>) and mind (<em>manas</em>). The four material elements are ultimately
                made of <strong lang="sa">परमाणु (paramāṇu)</strong>, eternal, partless atoms too small to perceive,
                which combine into larger and larger wholes. It is an atomism that most historians regard as developed
                independently of the Greek atomists. For Vaiśeṣika, reality is <em>pluralistic</em> and exists
                independently of anyone’s perception of it; atoms combine according to regular causes, with the unseen
                force the sūtras call <em>adṛṣṭa</em> accounting for what ordinary causes cannot.
              </p>
              <p>
                Its method is classification by comparison: knowing a thing by what it shares with others
                (<em>sādharmya</em>) and what sets it apart (<em>vaidharmya</em>) — the very words of the sūtra above.
                Classical Vaiśeṣika accepted two pramāṇas, perception and inference, and over time merged with Nyāya
                into a single joint school, Nyāya-Vaiśeṣika: one supplying the logic, the other the ontology.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="वैशेषिकम्" label="वैशेषिक (vaiśeṣika)" />
                <AudioChip term="पदार्थः" label="पदार्थ (padārtha)" />
                <AudioChip term="द्रव्यम्" label="द्रव्य (dravya)" />
                <AudioChip term="परमाणुः" label="परमाणु (paramāṇu)" />
                <AudioChip term="अभावः" label="अभाव (abhāva)" />
              </div>
            </section>

            {/* 3. Sankhya */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-sankhya">
              <h2 id="shad-darshana-sankhya">3. Sāṅkhya: Enumerating the Constituents of Experience</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.1rem' }}>
                  मूलप्रकृतिरविकृतिर्महदाद्याः प्रकृतिविकृतयः सप्त ।<br />
                  षोडशकस्तु विकारो न प्रकृतिर्न विकृतिः पुरुषः ॥
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  mūla-prakṛtir avikṛtir mahad-ādyāḥ prakṛti-vikṛtayaḥ sapta |<br />
                  ṣoḍaśakas tu vikāro na prakṛtir na vikṛtiḥ puruṣaḥ ||
                </p>
                <p>
                  “Primal nature is not a product. The seven beginning with the Great One (intellect, ego and the five
                  subtle elements) are both producers and products. The sixteen are products only. Puruṣa is neither
                  producer nor product.”
                </p>
                <cite>— Sāṅkhya Kārikā of Īśvarakṛṣṇa, verse 3</cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> <em>Sāṅkhya</em> means “enumeration,” and this verse is a whole cosmology in
                two lines. There are two uncreated realities: <strong lang="sa">प्रकृति (prakṛti)</strong>, nature, and{' '}
                <strong lang="sa">पुरुष (puruṣa)</strong>, pure consciousness — not one cosmic puruṣa but many (SK 18).
                From unmanifest prakṛti unfold twenty-three further principles: intellect (<em>buddhi</em>, the “Great
                One”), ego (<em>ahaṅkāra</em>), mind, the ten senses of knowing and acting, the five subtle elements and
                the five gross elements. With puruṣa and prakṛti, that makes twenty-five{' '}
                <strong lang="sa">तत्त्व (tattva)</strong>.
              </p>
              <p>
                The striking move is where the line is drawn. Mind, intellect and ego are on the side of{' '}
                <em>nature</em>; consciousness alone is puruṣa. The world is real — not an illusion — and it is dynamic:
                the evolutionary unfolding of prakṛti is set going by the proximity or conjunction (<em>saṃyoga</em>) of
                puruṣa and prakṛti, which the Kārikā compares to a lame man riding on the shoulders of a blind one
                (SK 21). Causation is explained by <strong lang="sa">सत्कार्यवाद (satkāryavāda)</strong>: the effect
                already exists, unmanifest, in its cause (SK 9) — the commentators’ favourite example is oil, already
                present in the sesame seed. Sāṅkhya reasons by rational deduction
                from effects to causes and accepts three pramāṇas — perception, inference and reliable testimony (SK 4).
                Classical Sāṅkhya is non-theistic: it explains the cosmos without a creator God.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="साङ्ख्यम्" label="साङ्ख्य (sāṅkhya)" />
                <AudioChip term="प्रकृतिः" label="प्रकृति (prakṛti)" />
                <AudioChip term="पुरुषः" label="पुरुष (puruṣa)" />
                <AudioChip term="तत्त्वम्" label="तत्त्व (tattva)" />
                <AudioChip term="सत्कार्यवादः" label="सत्कार्यवाद (satkāryavāda)" />
              </div>
            </section>

            {/* 4. Yoga */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-yoga">
              <h2 id="shad-darshana-yoga">4. Yoga: Analysis Through Experiment</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.15rem' }}>योगश्चित्तवृत्तिनिरोधः ॥</p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>yogaś citta-vṛtti-nirodhaḥ</p>
                <p>“Yoga is the stilling of the fluctuations of the mind.”</p>
                <cite>— Yoga Sūtra of Patañjali 1.2</cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> If Sāṅkhya drew the map, Yoga built the laboratory. It takes over Sāṅkhya’s
                picture of puruṣa and prakṛti and asks how its central claim — that consciousness is not the
                mind — can be <em>verified</em>, not just argued. Sāṅkhya supplies the theory; Yoga runs the experiment.
              </p>
              <p>
                It begins by classifying the fluctuations (<em>vṛtti</em>) themselves (YS 1.6): right knowledge, error,
                conceptual construction or imagination, sleep, and memory. Right knowledge rests on three pramāṇas —
                perception, inference and testimony (YS 1.7). Our perception is coloured by these movements; the
                eight-limbed discipline (<em>aṣṭāṅga</em>, YS 2.29) — ethical restraints and observances, posture,
                breath, withdrawal of the senses, concentration, meditation and absorption — is the method for quieting
                them, until “the seer abides in its own nature” (YS 1.3).
              </p>
              <p>
                One point is often misunderstood. Yoga does <em>not</em> say that the outer world is merely
                psychological, or that it fades away when the mind is still. Yoga is a realist school: in YS 4.14–16
                Patañjali argues that an object is one and the same even when different minds perceive it differently,
                and that a thing does not depend on a single mind — “if it did, what would become of it when that mind
                was not attending?” What stills is the <em>mind’s distortion</em>, not the world. Yoga’s distinctive
                claim is that some truths can be confirmed only through trained, first-person experience. It also
                admits <em>Īśvara</em>, a special puruṣa untouched by affliction, as one optional support for practice
                (“or by devotion to Īśvara,” YS 1.23–24).
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="योगः" label="योग (yoga)" />
                <AudioChip term="चित्तवृत्तिनिरोधः" label="चित्तवृत्तिनिरोधः" />
                <AudioChip term="अष्टाङ्गयोगः" label="अष्टाङ्ग (aṣṭāṅga)" />
                <AudioChip term="ईश्वरः" label="ईश्वर (īśvara)" />
              </div>
            </section>

            {/* 5. Mimamsa */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-mimamsa">
              <h2 id="shad-darshana-mimamsa">5. Mīmāṃsā: The Philosophy of Language and Duty</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.15rem' }}>
                  अथातो धर्मजिज्ञासा ॥ चोदनालक्षणोऽर्थो धर्मः ॥
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  athāto dharma-jijñāsā || codanā-lakṣaṇo ’rtho dharmaḥ ||
                </p>
                <p>
                  “Now, therefore, the inquiry into dharma. Dharma is that good which is known through injunction (the
                  Vedic command).”
                </p>
                <cite>— Mīmāṃsā Sūtra of Jaimini 1.1.1–2</cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> Mīmāṃsā, “reflective inquiry,” began as the discipline of interpreting the
                Vedic ritual texts, and in doing so it became India’s great school of hermeneutics and philosophy of
                language. How do you read a sentence that commands? How do you resolve two texts that seem to
                conflict? Which words are the main point and which are praise? Its rules of interpretation were so
                useful that later jurists and grammarians borrowed them freely.
              </p>
              <p>
                Mīmāṃsā holds that the connection between a word and its meaning is inherent, not invented
                (MS 1.1.5, <em>autpattikas tu śabdasyārthena sambandhaḥ</em>), and that a cognition is valid by default
                unless something defeats it — <strong lang="sa">स्वतःप्रामाण्य (svataḥ-prāmāṇya)</strong>, intrinsic
                validity. Its two great commentators differ on the means of knowledge. <strong>Prabhākara</strong>{' '}
                accepts five pramāṇas: perception, inference, comparison, testimony, and postulation
                (<em>arthāpatti</em>). <strong>Kumārila Bhaṭṭa</strong> accepts those same five and adds a sixth,
                non-apprehension (<em>anupalabdhi</em>), by which we know absences.
              </p>
              <p>
                Its picture of reality is pragmatic and action-centred. The world is real and without beginning, the
                Veda is eternal and authorless, and dharma is decoded from its injunctions. Right action (<em>karma</em>)
                produces results through its own unseen potency, so early Mīmāṃsā did not need to posit a creator God
                — and Kumārila argues explicitly against one. Existence, on this view, is a web of actions and their
                fruits, and language is the key to reading it.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="मीमांसा" label="मीमांसा (mīmāṃsā)" />
                <AudioChip term="धर्मः" label="धर्म (dharma)" />
                <AudioChip term="अर्थापत्तिः" label="अर्थापत्ति (arthāpatti)" />
                <AudioChip term="अनुपलब्धिः" label="अनुपलब्धि (anupalabdhi)" />
              </div>
            </section>

            {/* 6. Vedanta */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-vedanta">
              <h2 id="shad-darshana-vedanta">6. Vedānta: Inquiry into the Ground of Being</h2>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.15rem' }}>
                  अथातो ब्रह्मजिज्ञासा ॥ जन्माद्यस्य यतः ॥
                </p>
                <p style={{ fontStyle: 'italic', fontSize: '0.95rem' }}>
                  athāto brahma-jijñāsā || janmādy asya yataḥ ||
                </p>
                <p>
                  “Now, therefore, the inquiry into Brahman. [Brahman is that] from which the origin and so on — the
                  origin, sustenance and dissolution — of this [world] proceed.”
                </p>
                <cite>— Brahma Sūtra of Bādarāyaṇa 1.1.1–2</cite>
              </blockquote>
              <p>
                <strong>Approach.</strong> Set the first words beside Mīmāṃsā’s: <em>athāto dharma-jijñāsā</em>,{' '}
                <em>athāto brahma-jijñāsā</em>. The parallel is deliberate. Vedānta — “the end of the Veda,” its
                Upaniṣadic culmination, also called Uttara-Mīmāṃsā — uses the same hermeneutic tools as Mīmāṃsā, but
                turns them from the ritual portion of the Veda to the Upaniṣads, and from the question of duty to the
                question of the ground of being. Its method is systematic interpretation of scripture joined to
                dialectic: every major position is argued by first stating the opponent’s view (<em>pūrvapakṣa</em>)
                and then answering it (<em>uttarapakṣa</em>, <em>siddhānta</em>).
              </p>
              <p>
                On what the Brahma Sūtra means, its great commentators disagree — and the disagreement is the lesson.
                Each concerns the relation between the individual self (<em>jīvātman</em>) and Brahman, and between
                Brahman and the world:
              </p>
              <ul>
                <li>
                  <strong>Śaṅkara’s Advaita</strong> (non-dualism): Brahman alone is ultimately real, and the self is
                  not other than Brahman. The world is <em>vivarta</em>, an apparent transformation — as a rope appears
                  as a snake — real for practical purposes, but not independently real.
                </li>
                <li>
                  <strong>Rāmānuja’s Viśiṣṭādvaita</strong> (qualified non-dualism): selves and world are real, and are
                  related to Brahman as a body to its indwelling soul (<em>śarīra–śarīrin</em>). Brahman really becomes
                  the manifest world in this sense — a real transformation (<em>pariṇāma</em>) of what is Brahman’s
                  body — without any change in Brahman’s own perfect nature.
                </li>
                <li>
                  <strong>Madhva’s Dvaita</strong> (dualism): God, selves and matter are eternally distinct and real.
                  The world is neither an appearance of Brahman nor a transformation of Brahman; it depends wholly on
                  God, who governs it.
                </li>
              </ul>
              <p>
                Same sūtra, same methods, different conclusions. So when you hear that “Vedānta teaches that true
                existence is pure, undifferentiated being,” remember that this is Advaita’s answer — not Vedānta’s only
                one.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="वेदान्तः" label="वेदान्त (vedānta)" />
                <AudioChip term="ब्रह्मन्" label="ब्रह्मन् (brahman)" />
                <AudioChip term="विवर्तः" label="विवर्त (vivarta)" />
                <AudioChip term="परिणामः" label="परिणाम (pariṇāma)" />
              </div>
            </section>

            {/* Comparison Table */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-methods">
              <h2 id="shad-darshana-methods">How They Differ in Method</h2>
              <p>
                The six are best understood not as rival answers to one question, but as answers to six different
                questions. Each column below is a simplification; every school had centuries of internal debate.
              </p>
              <div className="philosophy-table-wrap">
                <table className="philosophy-table">
                  <thead>
                    <tr>
                      <th scope="col">School</th>
                      <th scope="col">Central question</th>
                      <th scope="col">Primary method</th>
                      <th scope="col">Nature of reality analysed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Nyāya</strong></td>
                      <td>How do we know?</td>
                      <td>Logic, epistemology, debate theory: four pramāṇas, five-membered argument, sixteen categories</td>
                      <td>Epistemic realism: a mind-independent world that can be known through valid means and must survive logical testing.</td>
                    </tr>
                    <tr>
                      <td><strong>Vaiśeṣika</strong></td>
                      <td>What exists?</td>
                      <td>Categorisation by similarity and difference; atomism</td>
                      <td>Ontological pluralism: six (later seven) padārthas; nine substances; material things built from eternal paramāṇus.</td>
                    </tr>
                    <tr>
                      <td><strong>Sāṅkhya</strong></td>
                      <td>What is experience made of?</td>
                      <td>Enumeration and causal inference (satkāryavāda)</td>
                      <td>Dualist realism: many puruṣas and one prakṛti; the world is a real unfolding of prakṛti into twenty-five tattvas.</td>
                    </tr>
                    <tr>
                      <td><strong>Yoga</strong></td>
                      <td>How do we verify it directly?</td>
                      <td>Disciplined introspection; the eight-limbed practice</td>
                      <td>Realist, on Sāṅkhya’s map: the world is real and shared (YS 4.14–16); what changes is the mind’s distortion, not the world.</td>
                    </tr>
                    <tr>
                      <td><strong>Mīmāṃsā</strong></td>
                      <td>What does the text enjoin?</td>
                      <td>Hermeneutics; philosophy of language (vākya-śāstra)</td>
                      <td>Pragmatic realism: a real, beginningless world; dharma known through Vedic injunction; action and its fruits.</td>
                    </tr>
                    <tr>
                      <td><strong>Vedānta</strong></td>
                      <td>What is the ultimate ground?</td>
                      <td>Scriptural interpretation of the Upaniṣads; dialectic</td>
                      <td>Brahman as the source of origin, sustenance and dissolution — read as non-dual (Advaita: world as vivarta), qualified non-dual (Viśiṣṭādvaita: world as Brahman’s body) or dual (Dvaita).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Put simply: Nyāya supplies logic, Vaiśeṣika ontology, Sāṅkhya-Yoga a psychology and a practice,
                Mīmāṃsā a theory of interpretation, and Vedānta a synthesis. Traditionally they are even grouped in
                pairs — Nyāya with Vaiśeṣika, Sāṅkhya with Yoga, Mīmāṃsā with Vedānta.
              </p>
            </section>

            {/* Debate */}
            <section className="philosophy-section" aria-labelledby="shad-darshana-debate">
              <h2 id="shad-darshana-debate">Nothing Was Absolute: The Culture of Debate</h2>
              <p>
                <strong>The opponent goes first.</strong> Classical Indian philosophical writing has a signature form:
                before you state your own view, you present the <strong lang="sa">पूर्वपक्ष (pūrvapakṣa)</strong> — the
                opposing position — in its strongest form. Only then comes the reply and the established conclusion
                (<em>siddhānta</em>). Śaṅkara, Kumārila and countless others often stated their opponents’ arguments so
                fully that such passages remain valuable sources for the schools they opposed.
              </p>
              <p>
                <strong>They argued with each other — and with outsiders.</strong> Nyāya logicians and Buddhist
                logicians sharpened one another for centuries. Nyāya’s view that an effect is a genuinely new thing
                challenged Sāṅkhya’s satkāryavāda. Vedānta accepted Mīmāṃsā’s rules of interpretation but argued that
                the Upaniṣads, whose subject is Brahman rather than ritual action, point beyond action to knowledge —
                while Mīmāṃsakas pressed back that the Veda is fundamentally about what is to be done. The Brahma Sūtra
                itself devotes a whole section to critiquing Sāṅkhya’s unconscious prakṛti as a first cause
                (BS 2.2.1 ff.) and Vaiśeṣika’s atoms (the argument continues in BS 2.2, around sūtras 11–17 in Śaṅkara’s
                numbering). Sāṅkhya was critiqued by nearly everyone. And the Cārvākas, who accepted perception alone,
                and the Jainas, with their doctrine of many-sidedness (<em>anekāntavāda</em>), were part of the
                conversation throughout.
              </p>
              <p>
                <strong>Even Vedic authority was argued, not merely assumed.</strong> Mīmāṃsā and Vedānta treat the
                Veda as a source of knowledge in its own right. Nyāya justifies testimony through reasoning, as the word
                of a reliable speaker. Sāṅkhya and Yoga accept scripture but lean heavily on inference and on practice.
                Whether there is a God, whether there is one self or many, whether the world is real or apparent — all of
                it remained open. Doubt was a tool, not a failure: Nyāya put it third in its list of categories.
              </p>
              <p>
                Debate was also a public culture. The Upaniṣads already stage it — Yājñavalkya questioned in turn by
                the sages at King Janaka’s court, Gārgī among them — and later centuries saw formal disputations in royal
                courts and monastic centres. A single scholar might write authoritative commentaries on several rival
                schools: the ninth- or tenth-century Vācaspati Miśra wrote on Nyāya, Sāṅkhya, Yoga, Mīmāṃsā and Advaita.
                Reality was treated less as a creed to be defended than as a many-sided puzzle to be examined from every
                angle.
              </p>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.1rem' }}>
                  इयं विसृष्टिर्यत आबभूव यदि वा दधे यदि वा न ।<br />
                  यो अस्याध्यक्षः परमे व्योमन्सो अङ्ग वेद यदि वा न वेद ॥
                </p>
                <p>
                  “Whence this creation arose — whether it was established or not — the one who watches over it in the
                  highest heaven, he surely knows. Or perhaps he does not know.”
                </p>
                <cite>— Ṛgveda 10.129.7, the final verse of the Nāsadīya Sūkta (its question “ko addhā veda — who truly knows?” is 10.129.6)</cite>
              </blockquote>
              <p>
                That is where the oldest philosophical hymn of the tradition chooses to end: not with an answer, but
                with a question left honestly open. The six darśanas inherit that spirit. Truth is approached from many
                angles, tested, and argued over — and the next essay turns those six lenses on the nearest mystery of
                all, the mind itself.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="पूर्वपक्षः" label="पूर्वपक्ष (pūrvapakṣa)" />
                <AudioChip term="सिद्धान्तः" label="सिद्धान्त (siddhānta)" />
                <AudioChip term="आस्तिक" label="आस्तिक (āstika)" />
                <AudioChip term="नास्तिक" label="नास्तिक (nāstika)" />
              </div>
            </section>

            {/* Bodhi's note */}
            <div className="philosophy-learner-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <BodhiAvatar mood="reading" size="sm" showHalo={false} />
                <h3 style={{ margin: 0 }}>Bodhi’s Study Note · Hear the Family Resemblance</h3>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1rem' }}>
                Read two opening sūtras aloud, slowly: <strong lang="sa">अथातो धर्मजिज्ञासा</strong> and{' '}
                <strong lang="sa">अथातो ब्रह्मजिज्ञासा</strong>. Only one word changes. Now split{' '}
                <strong lang="sa">जिज्ञासा</strong>: it is the desiderative of √jñā, “to know” — literally “the wish to
                know.” Every darśana begins there. Try this with a friend: pick a simple claim, and before you argue for
                it, state the best case <em>against</em> it. That is pūrvapakṣa — and it is the habit that makes the next
                essay, on medhā and the mind, much easier to think through.
              </p>
              <div className="philosophy-action-buttons">
                <button
                  type="button"
                  className="philosophy-action-btn"
                  onClick={() => {
                    setActiveEssay('medha_mind');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Next: Medhā and the Mind →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            ESSAY: मेधा · Medhā and the Mind — Two Ways of Looking at Consciousness
           ========================================================================= */}
        {activeEssay === 'medha_mind' && (
          <div className="philosophy-essay-body" id="medha">
            <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '0 0 0.75rem' }}>
              <button
                type="button"
                className="philosophy-crumb-btn"
                onClick={() => {
                  setActiveEssay('shad_darshana');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← Prequel: Six Lenses on Reality
              </button>
            </div>
            <header className="philosophy-hero">
              <span className="philosophy-kicker">Gurukul Darśana · मेधा · अन्तःकरणम् · साक्षी</span>
              <h1 className="philosophy-title">
                मेधा · Medhā and the Mind: Two Ways of Looking at Consciousness
              </h1>
              <p className="philosophy-mantra">
                The West asks what the mind is made of. The sages of India ask whether the mind is even you.
              </p>

              <blockquote className="philosophy-pull-quote" style={{ maxWidth: '40rem', margin: '1.25rem auto 0.75rem' }}>
                <p lang="sa" style={{ fontSize: '1.15rem' }}>
                  यन्मनसा न मनुते येनाहुर्मनो मतम् ।<br />
                  तदेव ब्रह्म त्वं विद्धि नेदं यदिदमुपासते ॥
                </p>
                <p>
                  “That which the mind cannot think, but by which, they say, the mind is thought — know that
                  alone to be Brahman, not this which people worship here.”
                </p>
                <cite>— Kena Upaniṣad 1.6</cite>
              </blockquote>

              <div className="philosophy-journey" style={{ marginTop: '1rem' }}>
                <AudioChip term="मेधा" label="मेधा (medhā)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="अन्तःकरणम्" label="अन्तःकरण (antaḥkaraṇa)" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="चित्तवृत्तिनिरोधः" label="चित्तवृत्तिनिरोधः" />
                <span className="philosophy-mantra-sep">·</span>
                <AudioChip term="साक्षी" label="साक्षी (sākṣī)" />
              </div>
            </header>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', margin: '0 0 1.75rem' }} aria-label="Article sections">
              <a href="#medha-etymology" className="philosophy-chip" style={{ textDecoration: 'none' }}>🪔 1. The Word Medhā</a>
              <a href="#medha-west" className="philosophy-chip" style={{ textDecoration: 'none' }}>🏛️ 2. The Western Inheritance</a>
              <a href="#medha-india" className="philosophy-chip" style={{ textDecoration: 'none' }}>🕉️ 3. The View from India</a>
              <a href="#medha-faultline" className="philosophy-chip" style={{ textDecoration: 'none' }}>⚖️ 4. The Real Fault Line</a>
              <a href="#medha-nudge" className="philosophy-chip" style={{ textDecoration: 'none' }}>📱 5. A Mind Worth Nudging</a>
              <a href="#medha-sakshi" className="philosophy-chip" style={{ textDecoration: 'none' }}>🌊 6. Resting as the Witness</a>
            </div>

            {/* Opening */}
            <section className="philosophy-section" aria-label="Introduction">
              <p>
                Every civilization eventually asks the same question: <em>what is it that thinks?</em> The
                answers split into two broad instincts. The dominant line of Western philosophy asks what the
                mind is made of and how it works. The contemplative schools of India ask something stranger
                and more personal: <em>is the mind even you?</em>
              </p>
              <p>
                This essay walks both roads. It is not a contest between a “materialist West” and a
                “spiritual India” — as we will see, that picture is too simple on both sides. But the two roads
                do begin from different places, and the difference matters for how we study, how we live with
                technology, and how we understand the word at the centre of this page: <strong>medhā</strong>.
              </p>
            </section>

            {/* 1. Etymology */}
            <section className="philosophy-section" aria-labelledby="medha-etymology">
              <h2 id="medha-etymology">1. The Word Medhā: A Receptive Intelligence</h2>
              <p>
                <strong lang="sa">मेधा (medhā)</strong> is usually translated “intelligence,” “wisdom,” or
                “retentive memory.” Its verbal root, as listed in Pāṇini’s Dhātupāṭha, is{' '}
                <strong lang="sa">मेधृ (medhṛ)</strong>, a bhvādi (first-class) root given the senses of{' '}
                <em lang="sa">medhā</em> (understanding) and — in a separate entry — <em lang="sa">saṅgama</em>,
                “meeting, coming together” (<span lang="sa">मेधृ सङ्गमे च</span>). The same entry also records a
                sense of <em>hiṃsana</em>, “harming,” which is a reminder that Sanskrit roots carry several meanings
                and that etymology is a lens, not a proof.
              </p>
              <p>
                Still, the pairing of “understanding” with “meeting” is suggestive. Read through that lens, medhā is
                not computational speed or the ability to pile up facts. It is the capacity of the mind to{' '}
                <em>meet</em> what is true and hold it without distortion — a receptive clarity rather than an
                acquisitive one. The word is old: already in the Ṛgveda (1.18.6) the poet says{' '}
                <span lang="sa">सनिं मेधामयासिषम्</span>, “I have sought medhā as my gain,” and the later{' '}
                <strong>Medhā Sūkta</strong> — preserved as a supplementary hymn (khila) to the Ṛgveda and, in its most
                widely chanted form, in the Mahānārāyaṇa Upaniṣad of the Taittirīya Āraṇyaka — addresses Medhā as a
                goddess: <span lang="sa">त्वया जुष्ट ऋषिर्भवति देवि</span>, “favoured by you, O Devī, one becomes a ṛṣi.”
              </p>
              <p>
                In the Indian tradition this faculty belongs to the <strong lang="sa">अन्तःकरण (antaḥkaraṇa)</strong>,
                the “inner instrument.” Vedānta usually describes it as fourfold:
              </p>
              <ul>
                <li><strong lang="sa">मनस् (manas)</strong> — the mind that receives, doubts, and deliberates;</li>
                <li><strong lang="sa">बुद्धि (buddhi)</strong> — the intellect that decides and discerns;</li>
                <li><strong lang="sa">चित्त (citta)</strong> — the store of memory and impressions;</li>
                <li><strong lang="sa">अहंकार (ahaṃkāra)</strong> — the “I-maker,” which claims experiences as “mine.”</li>
              </ul>
              <p>
                (Sāṅkhya counts the inner instrument as threefold — buddhi, ahaṃkāra and manas — but the idea is the
                same.) Medhā, in this picture, is what the inner instrument looks like when it is clean: absorbing,
                integrating, and retaining deep truths because nothing in it is bending the light. It is less a
                possession than a transparency.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="मनस्" label="मनस् (manas)" />
                <AudioChip term="बुद्धिः" label="बुद्धि (buddhi)" />
                <AudioChip term="चित्तम्" label="चित्त (citta)" />
                <AudioChip term="अहंकारः" label="अहंकार (ahaṃkāra)" />
              </div>
              <p>
                That word — <em>instrument</em> — is the hinge of everything that follows. To see why, we have to look
                first at how the Western tradition came to think about the mind.
              </p>
            </section>

            {/* 2. Western Inheritance */}
            <section className="philosophy-section" aria-labelledby="medha-west">
              <h2 id="medha-west">2. The Western Inheritance: What Is the Mind Made Of?</h2>
              <p>
                Modern Western philosophy of mind effectively begins with <strong>René Descartes</strong> (1596–1650).
                He divided reality into two kinds of substance: <em>res cogitans</em>, the thinking thing, and{' '}
                <em>res extensa</em>, extended physical matter. The mind was immaterial, the body mechanical. This gave
                the West a clear picture — and a famous problem. If mind and matter are utterly different, how does a
                decision move an arm, or a pinprick produce pain? Princess Elisabeth of Bohemia pressed Descartes on
                exactly this in 1643, and the “interaction problem” has never gone away.
              </p>
              <p>
                Much of later Western thought tried to escape the problem by collapsing the two sides into one.{' '}
                <strong>Physicalism</strong>, the dominant view in academic philosophy and neuroscience today, holds that
                the mind is what the brain does. Thoughts are patterns of neural firing, emotions are neurochemical
                cascades, memories are changes in synaptic strength. There is, in Gilbert Ryle’s mocking 1949 phrase,
                no “ghost in the machine.”
              </p>
              <p>
                <strong>Functionalism</strong> refined this. A mental state is defined not by what it is made of but by
                what it <em>does</em> — its causal role between inputs, other states, and outputs. Pain is whatever plays
                the pain role. This opened the door to a question Alan Turing had already posed in 1950 and that now
                sits on every phone: if a machine performed all the right functions, would it be thinking?
              </p>
              <p>
                Then, in 1995, <strong>David Chalmers</strong> named what he called the <em>hard problem of
                consciousness</em>. Even if we explained every function of the brain — perception, memory, attention,
                report — a further question would remain: <em>why does any of this feel like something from the
                inside?</em> Why is there an experience of red, and not just the processing of wavelengths? (Thomas Nagel
                had put the point memorably in 1974: there is “something it is like” to be a bat.) Three decades on,
                there is no consensus answer.
              </p>
              <p>
                Beneath most of these debates lies a shared assumption: <strong>you are your mind</strong>. Whether the
                mind is a soul, a brain process, or a pattern of information, it is the seat of the self. This is why
                dementia is so often described as a person “disappearing” while the body remains — if the self is the
                mind, then when the mind goes, the person goes.
              </p>
              <p>
                The West has never spoken with one voice, though. <strong>Spinoza</strong> (1632–1677) proposed a single
                substance with thought and extension as two of its attributes — often called dual-aspect monism.{' '}
                <strong>Leibniz</strong> imagined reality as made of <em>monads</em>, simple perceiving centres.{' '}
                <strong>David Hume</strong> looked inward for a self and reported finding only “a bundle or collection
                of different perceptions” — strikingly close to a Buddhist observation. <strong>Henri Bergson</strong>{' '}
                argued that lived time, <em>durée</em>, cannot be captured by clock-time measurement, and that
                consciousness is more than the brain’s bookkeeping. And today some philosophers seriously defend
                panpsychism, or the “extended mind” thesis (Andy Clark and David Chalmers, 1998), which holds that
                notebooks and devices can literally be part of a mind. These are real dissenting currents — but they
                have remained minority positions.
              </p>
            </section>

            {/* 3. India */}
            <section className="philosophy-section" aria-labelledby="medha-india">
              <h2 id="medha-india">3. The View from Classical India: The Mind as Instrument</h2>
              <p>
                The major contemplative schools of India begin from a different place. For most of them, the mind is an
                instrument — very subtle, but an instrument — and not the one who uses it. It is something you{' '}
                <em>have</em>, observed by what you <em>are</em>.
              </p>

              <h3>Vedānta: The Sheaths and the Light</h3>
              <p>
                The Taittirīya Upaniṣad describes a person as a series of nested layers, later systematized as the
                five <strong lang="sa">कोश (kośa)</strong>, “sheaths”: the body made of food (<em>annamaya</em>), the
                sheath of vital breath (<em>prāṇamaya</em>), of mind (<em>manomaya</em>), of discerning intellect
                (<em>vijñānamaya</em>), and of bliss (<em>ānandamaya</em>). At the centre — or rather, pervading all of
                them without being any of them — is the <strong lang="sa">आत्मन् (ātman)</strong>, which Advaita Vedānta
                identifies with Brahman, the ground of all that is.
              </p>
              <p>
                Mind and intellect belong to the <em>sūkṣma śarīra</em>, the subtle body, together with the senses and
                the vital breaths. They are made of subtle matter, not of consciousness itself. The Kena Upaniṣad quoted
                above makes the point sharply: the real Self is “the mind of the mind,” that <em>by which</em> the mind
                thinks, which is itself never an object of thought. A short Advaita text, the Dṛg-Dṛśya-Viveka, opens
                with a ladder of seeing: the form is seen by the eye; the eye is seen by the mind; the movements of the
                mind are seen by the witness, <strong lang="sa">साक्षी (sākṣī)</strong> — and the witness is never itself
                seen. The observer is the light by which thought becomes visible.
              </p>
              <p>
                It is often said that Vedānta calls the mind “an illusion.” That needs care. Advaita does not claim the
                mind is nothing. It says the mind belongs to the changing, dependent world — what it calls{' '}
                <em>mithyā</em>, the realm of <em>māyā</em> — real enough to experience and to work with, but not
                independently real and not the Self. (Other Vedānta schools, such as Viśiṣṭādvaita and Dvaita, treat
                the world and the mind as fully real, while still distinguishing them from the self.)
              </p>

              <h3>Sāṅkhya and Yoga: The Witness and the Weather</h3>
              <p>
                The Sāṅkhya system draws the line most starkly. On one side is{' '}
                <strong lang="sa">पुरुष (puruṣa)</strong>, pure consciousness: the witness, uninvolved and inactive (the
                Sāṅkhya Kārikā, verse 19, calls it <em>sākṣī</em>, a witness, and <em>akartṛ</em>, a non-doer). On the
                other side is <strong lang="sa">प्रकृति (prakṛti)</strong>, nature — and nature includes not only rocks
                and bodies but intellect, ego, and emotion, all understood as extremely subtle matter. Your thoughts, on
                this view, are as much a part of nature as the weather.
              </p>
              <p>
                Patañjali’s Yoga Sūtra, built on this framework, gives the most famous definition in Indian
                psychology (1.2):
              </p>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.15rem' }}>योगश्चित्तवृत्तिनिरोधः ॥</p>
                <p>“Yoga is the stilling of the fluctuations of the mind.”</p>
                <cite>— Yoga Sūtra 1.2 · followed by 1.3: “Then the seer abides in its own nature.”</cite>
              </blockquote>
              <p>
                The mind, left to itself, is turbulent — constantly taking the shape of whatever it meets. Liberation
                is not the mind becoming perfect. It is the witness recognizing that it was never caught in the
                turbulence at all.
              </p>

              <h3>Buddhism: No Fixed Watcher</h3>
              <p>
                Buddhism takes a different road and arrives somewhere just as radical. Its teaching of{' '}
                <em>anattā</em> (Pāli; Sanskrit <em>anātman</em>, “not-self”) denies any permanent self — not only a
                self identical to the mind, but also a hidden, eternal witness behind it. The mind is a stream of
                momentary mental events (<em>citta</em>), arising and passing in dependence on conditions. The felt,
                solid “I” is a construction assembled moment by moment. Meditation, on this view, does not uncover a
                hidden watcher; it shows that the search for a fixed watcher was the mistake.
              </p>
              <p>
                So even within India there is deep disagreement: Vedānta and Sāṅkhya affirm a witnessing self distinct
                from the mind, while Buddhism denies a lasting self of any kind. What they share is the conviction that{' '}
                <em>the mind is not what you take yourself to be</em>, and that this can be seen directly.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' }}>
                <AudioChip term="पुरुषः" label="पुरुष (puruṣa)" />
                <AudioChip term="प्रकृतिः" label="प्रकृति (prakṛti)" />
                <AudioChip term="कोशः" label="कोश (kośa)" />
                <AudioChip term="आत्मन्" label="आत्मन् (ātman)" />
                <AudioChip term="अनात्मन्" label="अनात्मन् (anātman)" />
              </div>
            </section>

            {/* Comparison Table */}
            <section className="philosophy-section" aria-labelledby="medha-table">
              <h2 id="medha-table">Two Pictures of the Mind, Side by Side</h2>
              <p>
                The table below contrasts the <em>dominant</em> modern Western physicalist picture with the broad
                picture shared by the Indian contemplative schools. Both columns are simplifications: each tradition is
                internally diverse, and there are Western dualists and panpsychists just as there were Indian
                materialists.
              </p>
              <div className="philosophy-table-wrap">
                <table className="philosophy-table">
                  <thead>
                    <tr>
                      <th scope="col">Question</th>
                      <th scope="col">Modern Western physicalism (dominant view)</th>
                      <th scope="col">Indian contemplative schools (Vedānta · Sāṅkhya-Yoga)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>What is the mind?</strong></td>
                      <td>What the brain does — patterns of neural activity and information processing.</td>
                      <td>A subtle instrument (<em>antaḥkaraṇa</em>, part of the <em>sūkṣma śarīra</em>), made of subtle matter, not of consciousness itself.</td>
                    </tr>
                    <tr>
                      <td><strong>Where is it?</strong></td>
                      <td>Located in and dependent on the brain and nervous system (though “extended mind” theorists include the body and tools).</td>
                      <td>Associated with the subtle body, not reducible to the gross brain. Some modern teachers read this as a mind not confined to the skull — an interpretation, not a claim the classical texts make in those words.</td>
                    </tr>
                    <tr>
                      <td><strong>Is the mind the self?</strong></td>
                      <td>Generally yes: the self is a mental or neural construction; there is no further “you.”</td>
                      <td>No. The mind is an object of awareness; the self (<em>ātman</em> / <em>puruṣa</em>) is the witness. Buddhism agrees the mind is not a self, but denies any permanent self.</td>
                    </tr>
                    <tr>
                      <td><strong>How is it studied?</strong></td>
                      <td>Mainly third-person: experiment, measurement, theory.</td>
                      <td>Mainly first-person: disciplined observation of one’s own mind through practice.</td>
                    </tr>
                    <tr>
                      <td><strong>What is the goal?</strong></td>
                      <td>Explanation — and often enhancement or repair of mental function.</td>
                      <td>Liberation (<em>mokṣa</em>, <em>kaivalya</em>, <em>nirvāṇa</em>) — freedom from identifying with the mind.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4. The Real Fault Line */}
            <section className="philosophy-section" aria-labelledby="medha-faultline">
              <h2 id="medha-faultline">4. The Real Fault Line</h2>
              <p>
                It would be easy to tell this as a story of a materialist West and a spiritual India. That story is
                false. India had its own thoroughgoing materialists: the <strong>Cārvāka</strong> (Lokāyata) school
                rejected any soul and held that consciousness arises from matter when the elements combine in the right
                way — like the intoxicating power that appears when certain ingredients ferment. That is very close to
                modern emergentist physicalism.
              </p>
              <p>
                The deeper divide is not matter versus spirit. It is this question:{' '}
                <strong>is the self identical to the mind, or distinct from it?</strong> The mainstream Western
                tradition has largely assumed they are the same — whether it then explained the mind as soul or as
                brain. The main Indian contemplative schools assumed the mind is an <em>object</em> of awareness, and
                claimed that this can be demonstrated experientially, not just argued.
              </p>
              <p>
                That points to the second difference: <strong>method</strong>. Western philosophy of mind has mostly
                been third-person and theoretical. The Indian schools were first-person and practical: you are asked to
                watch a thought arise, stay, and dissolve, and to notice who is watching. A yogi who could recite every
                distinction between puruṣa and prakṛti but had never once watched a thought arise would, by the
                tradition’s own standard, have learned nothing that matters.
              </p>
            </section>

            {/* 5. Optimization and nudging (condensed from essay 1) */}
            <section className="philosophy-section" aria-labelledby="medha-nudge">
              <h2 id="medha-nudge">5. A Mind Worth Nudging: Optimization in the Attention Economy</h2>
              <p>
                These are not just seminar questions. How a culture answers “what is the mind?” shapes what it does
                with minds. If the mind is essentially a biological machine, the natural next step is to tune it. A large
                industry now promises exactly that — cognitive enhancement, biohacking, neurofeedback, performance
                coaching — much of it aimed at maximizing output. Some of this is genuinely useful; some of it is
                marketing ahead of evidence.
              </p>
              <p>
                The same picture also makes the mind a resource to be influenced. Behavioural science has documented how
                small design choices — defaults, framing, the famous “nudge” of Thaler and Sunstein (2008) — shift what
                people choose. Digital platforms apply these insights at scale, using data on our clicks and pauses and
                design patterns such as infinite scroll and unpredictable rewards (often loosely described as “dopamine
                loops”) to hold attention. How much this changes deep beliefs is still debated by researchers, but few
                dispute that our attention is being competed for, measured, and sold.
              </p>
              <p>
                The contemplative traditions do not offer a better optimization technique. They offer a different
                question. If the mind is an instrument, then being nudged, profiled, or tuned is something that happens{' '}
                <em>to the instrument</em>. The more clearly you see the movements of your own mind — a craving
                arriving, an outrage being triggered — the less automatically they run you. That is not a rejection of
                technology. It is a way of remaining the one who uses it.
              </p>
            </section>

            {/* Convergence */}
            <section className="philosophy-section" aria-labelledby="medha-convergence">
              <h2 id="medha-convergence">Why the Comparison Still Matters</h2>
              <p>
                Neither road has simply solved the problem. The hard problem is still hard, and the contemplative claims
                are, by their nature, difficult to test from outside. But something interesting is happening where the
                roads meet.
              </p>
              <p>
                Neuroscience keeps finding that the unified, in-charge “I” is less solid than it feels. Split-brain
                studies by Roger Sperry and Michael Gazzaniga showed that when the two hemispheres are surgically
                disconnected, a verbal “interpreter” in the left hemisphere will confidently invent reasons for actions it
                did not initiate. Research on <em>confabulation</em> shows how readily people produce plausible stories
                about why they did things. <em>Predictive processing</em> models describe the brain as constantly
                generating a best-guess model of the world — and of the self. Together these suggest that the self we
                experience may be, at least partly, a narrative the brain constructs.
              </p>
              <p>
                That is not the same as saying “you are the Ātman” or “there is no self.” Science cannot settle those
                claims. But the Buddhist observer who found no fixed watcher, the Sāṅkhya teacher who said thought is
                part of nature, and the neuroscientist who finds the self to be a construction are, cautiously, arriving
                in the same neighbourhood from very different roads.
              </p>
            </section>

            {/* 6. Sakshi */}
            <section className="philosophy-section" aria-labelledby="medha-sakshi">
              <h2 id="medha-sakshi">6. The Wave, the Mirror, and Resting as the Witness</h2>
              <p>
                The traditions reach for images here, because the point is hard to say directly. Scoop up a wave and look
                for the wave: you find only water. The mind, examined closely, is likewise a stream of thoughts,
                conditioning, reactions, and memories, with no separate “thing” behind them. In the depths of meditative
                absorption (<em>samādhi</em>), the texts say, even this movement stills, and what remains is awareness
                itself — <em>cit</em>, the ocean of which each thought was a passing wave.
              </p>
              <p>
                The second image is the <strong>unbound mirror</strong>. The unconditioned mind is like a still, clear
                mountain lake: it reflects stars, clouds, earth, and sky exactly as they are, because nothing is
                disturbing its surface. Most of us spend our lives mistaking the dust on the mirror — our moods,
                opinions, and reactions — for who we are. Medhā, in this sense, is not a bigger mirror. It is a cleaner
                one.
              </p>
              <p>
                Many schools also see body and mind as one continuum rather than two opposed substances: in Sāṅkhya both
                belong to prakṛti, the body as its gross form and the mind as its subtle form. That is why practices of
                breath and posture are treated as practices of mind.
              </p>
              <p>
                The practical invitation is simple, and older than any of our arguments. Learn to tell the transient
                from the permanent observer. Do not only try to upgrade the room of conditioned thought; step back far
                enough to see that you are standing in it. Rest, even for a few breaths, as the silent witness —{' '}
                <strong lang="sa">साक्षी (sākṣī)</strong>, the word the Śvetāśvatara Upaniṣad (6.11) uses for the one who
                sees: <span lang="sa">साक्षी चेता केवलो निर्गुणश्च</span>, “the witness, pure awareness, alone, beyond
                qualities.”
              </p>
              <p>
                From that place, the traditions say, you discover that you are not only the machine that can be tuned,
                nudged, or exploited. You are the awareness that makes the instrument luminous — the light in which every
                thought, including this one, appears.
              </p>
              <blockquote className="philosophy-pull-quote">
                <p lang="sa" style={{ fontSize: '1.1rem' }}>दृश्या धीवृत्तयः साक्षी दृगेव न तु दृश्यते ॥</p>
                <p>“The movements of the mind are seen; the witness is the seer — and is never itself seen.”</p>
                <cite>— Dṛg-Dṛśya-Viveka, verse 1</cite>
              </blockquote>
            </section>

            {/* Bodhi's note */}
            <div className="philosophy-learner-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                <BodhiAvatar mood="reading" size="sm" showHalo={false} />
                <h3 style={{ margin: 0 }}>Bodhi’s Study Note · Watching the Word Work</h3>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#134e4a', margin: '0 0 1rem' }}>
                Try a tiny experiment before your next lesson. Sit for one minute and simply notice each thought as it
                arrives — name it “thinking” and let it go. Then chant one word slowly: <strong lang="sa">मेधा</strong>.
                Notice that the sound, the meaning, and the one who hears both are three different things. That
                noticing is the beginning of medhā — and it makes the next śloka much easier to hold.
              </p>
              <div className="philosophy-action-buttons">
                <button
                  type="button"
                  className="philosophy-action-btn"
                  onClick={() => {
                    setActiveEssay('ai_sanskrit');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  🤖 Why Learn Sanskrit in the Age of AI ➔
                </button>
                <button
                  type="button"
                  className="philosophy-action-btn"
                  style={{ background: '#b45309' }}
                  onClick={() => {
                    setActiveEssay('sunyat_anantam');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  🌌 Śūnyāt Anantam ➔
                </button>
              </div>
            </div>
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
