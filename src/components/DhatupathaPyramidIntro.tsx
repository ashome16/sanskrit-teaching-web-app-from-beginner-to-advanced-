import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';

type PyramidLevelId = 'sounds' | 'roots' | 'affixes' | 'words';

interface PyramidLevel {
  id: PyramidLevelId;
  levelNumber: number;
  sanskritName: string;
  englishTitle: string;
  badge: string;
  widthPercent: number;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  summary: string;
  formula: string;
  keyConcepts: { term: string; meaning: string }[];
  examples: { sanskrit: string; english: string; audioText?: string }[];
  paniniSutra?: { sutra: string; translation: string };
}

const PYRAMID_LEVELS: PyramidLevel[] = [
  {
    id: 'words',
    levelNumber: 4,
    sanskritName: 'सुप्तिङन्तं पदम् · Generative Living Speech',
    englishTitle: 'The Summit: Inflected Words, Compounds & Living Sentences',
    badge: 'शिखरम् · The Living Output (Millions of Words)',
    widthPercent: 44,
    bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    borderColor: '#d97706',
    accentColor: '#b45309',
    summary:
      'Only fully inflected words exist in Sanskrit. A raw root or uninflected noun can never be spoken in a sentence without a perfecting affix. From 2,000 roots arise millions of precise nouns, verbs, adjectives, and treatises.',
    formula: 'प्रकृतिः (Stem / Root) + प्रत्ययः (Affix) = पदम् (Valid Inflected Word)',
    keyConcepts: [
      { term: 'तिङन्तम् (Tiṅanta)', meaning: 'Inflected finite verbs conjugated across 10 Lakāras, 3 Persons, and 3 Numbers (e.g. पठति, अभवत्, गमिष्यति).' },
      { term: 'सुबन्तम् (Subanta)', meaning: 'Inflected nouns and adjectives declined across 7 Vibhaktis (Cases) and 3 Numbers (e.g. बालः, रामेण, ज्ञानाय).' },
      { term: 'समासः (Samāsa)', meaning: 'Synthetic compounding that fuses multiple words into precise unified concepts (e.g. सूर्य-कान्तिः, जगद्-गुरुः).' },
    ],
    examples: [
      { sanskrit: 'संस्कृतम्', english: 'Perfected / refined (सम् + कृ + क्त)', audioText: 'संस्कृतम्' },
      { sanskrit: 'कर्तव्यम्', english: 'Moral duty / that which ought to be done (कृ + तव्यत्)', audioText: 'कर्तव्यम्' },
      { sanskrit: 'गच्छति', english: 'He/She/It moves / goes (गम् + शप् + तिप्)', audioText: 'गच्छति' },
      { sanskrit: 'ज्ञानम्', english: 'Conscious awareness / knowledge (ज्ञा + ल्युट्)', audioText: 'ज्ञानम्' },
    ],
    paniniSutra: {
      sutra: 'सुप्तिङन्तं पदम् (अष्टाध्यायी १.४.१४)',
      translation: 'A sound combination ending in a Sup (nominal case) or Tiṅ (verbal inflection) affix is designated as a Pada (true word).',
    },
  },
  {
    id: 'affixes',
    levelNumber: 3,
    sanskritName: 'प्रत्ययाः & विकरणानि · Morphological Engine',
    englishTitle: 'The Operators: Derivational Affixes & Morphological Mutation',
    badge: 'संस्कारः · Computational Functions & Transformations',
    widthPercent: 62,
    bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    borderColor: '#059669',
    accentColor: '#047857',
    summary:
      'Suffixes in Sanskrit act as mathematical functions. They latch onto root verbs to trigger internal vowel ablaut (Guṇa & Vṛddhi) and generate either conjugated verbs or brand new nouns and participles.',
    formula: 'Root + Vikaraṇa (Class Sign) + Pratyaya (Affix) → Word Stem',
    keyConcepts: [
      { term: 'कृत्-प्रत्ययाः (Kṛt Affixes)', meaning: 'Primary verbal suffixes that convert actions into nouns, agents, and participles (तव्यत्, अनीयर्, क्त्वा, ल्यप्, तुमुन्, क्त, शतृ).' },
      { term: 'तिङ्-प्रत्ययाः (Tiṅ Endings)', meaning: '18 verbal conjugational terminations (९ परस्मैपदे + ९ आत्मनेपदे) encoding Tense, Mood, Person, and Number.' },
      { term: 'सुप्-प्रत्ययाः (Sup Endings)', meaning: '21 nominal case terminations governing grammatical relationships (agent, object, instrument, purpose, origin).' },
      { term: 'गुण-वृद्धि (Ablaut Mutations)', meaning: 'Vowel grade strengthening: इ/ई → ए/ऐ, उ/ऊ → ओ/औ, ऋ/ॠ → अर्/आर्.' },
    ],
    examples: [
      { sanskrit: 'कृ + तव्यत् = कर्तव्य', english: 'Root "do" + obligation suffix = "duty"', audioText: 'कर्तव्य' },
      { sanskrit: 'गम् + तुमुन् = गन्तुम्', english: 'Root "go" + purposive infinitive = "in order to go"', audioText: 'गन्तुम्' },
      { sanskrit: 'पठ् + शतृ = पठन्', english: 'Root "read" + present active participle = "reading"', audioText: 'पठन्' },
      { sanskrit: 'भू + शप् + तिप् = भवति', english: 'Root "be" + class sign + 3rd person singular = "becomes"', audioText: 'भवति' },
    ],
    paniniSutra: {
      sutra: 'प्रत्ययः परश्च (अष्टाध्यायी ३.१.१ - ३.१.२)',
      translation: 'An affix is placed after the base or root to generate semantic transformation.',
    },
  },
  {
    id: 'roots',
    levelNumber: 2,
    sanskritName: 'धातवः · The ~2,000 Atomic Verbal Seeds',
    englishTitle: 'The Semantic Seeds: Pāṇini’s Dhātupāṭha (Action Primitives)',
    badge: 'बीजानि · 2,000 Atomic Verb Roots across 10 Gaṇas',
    widthPercent: 80,
    bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    borderColor: '#2563eb',
    accentColor: '#1d4ed8',
    summary:
      'In Vedic epistemology, every noun is born from a verb of action. The Dhātupāṭha catalogs the complete set of ~2,000 atomic verbal seeds representing every primal state of motion, existence, knowledge, and action in human experience.',
    formula: 'क्रियावाचिनो धातवः (Verbal Roots denote Action & State of Being)',
    keyConcepts: [
      { term: 'दशगणाः (10 Conjugational Classes)', meaning: 'The 2,000 roots are organized into 10 families (भ्वादि, अदादि, जुहोत्यादि, दिवादि, स्वादि, तुदादि, रुधादि, तनादि, क्र्यादि, चुरादि).' },
      { term: 'पद-भेदः (Voice & Alignment)', meaning: 'परस्मैपदम् (action outward / for another), आत्मनेपदम् (action inward / self-affecting), उभयपदम् (both).' },
      { term: 'अनुबन्धाः (It-Markers)', meaning: 'Cryptic indexing code letters (like ण्, ष्, ल्) attached to roots in the Dhātupāṭha to trigger specific derivation rules.' },
    ],
    examples: [
      { sanskrit: 'भू (सत्तायाम्)', english: 'To exist, become, be born (Root #1 in Dhātupāṭha)', audioText: 'भू' },
      { sanskrit: 'गम् (गतौ)', english: 'To move, go, approach, reach', audioText: 'गम्' },
      { sanskrit: 'कृ (करणे)', english: 'To act, make, perform, create', audioText: 'कृ' },
      { sanskrit: 'ज्ञा (अवबोधने)', english: 'To know, understand, perceive, realize', audioText: 'ज्ञा' },
    ],
    paniniSutra: {
      sutra: 'भूवादयो धातवः (अष्टाध्यायी १.३.१)',
      translation: 'The verbal primitives beginning with "भू" (listed in the Dhātupāṭha) are designated as Dhātu (verbal roots).',
    },
  },
  {
    id: 'sounds',
    levelNumber: 1,
    sanskritName: '१४ माहेश्वर-सूत्राणि & वर्णाः · Acoustic Bedrock',
    englishTitle: 'The Foundation: 14 Śiva Sūtras, Phonemes & Sacred Vibrations',
    badge: 'तलम · The Acoustic Bedrock of All Reality',
    widthPercent: 100,
    bgGradient: 'linear-gradient(135deg, #fdf4ff 0%, #fae8ff 100%)',
    borderColor: '#c026d3',
    accentColor: '#a21caf',
    summary:
      'At the deepest level lies pure acoustic resonance. Legend recounts Lord Śiva sounding his Ḍamaru drum 14 times, producing the 14 Maheshwara Sutras. These encode all vowels and consonants into a biological sound matrix based on 5 anatomical vocal points.',
    formula: 'ध्वनिः (Vocal Acoustic Resonance) → वर्णाः (Phonemes) → प्रत्याहाराः (Sound Matrices)',
    keyConcepts: [
      { term: '१४ माहेश्वर-सूत्राणि (Shiva Sutras)', meaning: 'अइउण्, ऋऌक्, एओङ्, ऐऔच्, हयवरट्, लण्, ञमङणनम्, झभञ्, घढधष्, जबगडदश्, खफछठथचटतव्, कपय्, शषसर्, हल्.' },
      { term: 'प्रत्याहाराः (Acoustic Compression Sets)', meaning: 'Short algebraic tokens representing whole sound classes: अक् (all simple vowels), यण् (semivowels य, र, ल, व), हल् (all consonants), अल् (all sounds).' },
      { term: 'पञ्च-उच्चारण-स्थानानि (5 Articulation Points)', meaning: 'कण्ठ (Throat/Velar), तालु (Palate/Palatal), मूर्धा (Roof/Retroflex), दन्त (Teeth/Dental), ओष्ठ (Lips/Labial).' },
    ],
    examples: [
      { sanskrit: 'अ इ उ ण्', english: 'Sutra 1: The foundational pure vocal resonances (a, i, u)', audioText: 'अ इ उ' },
      { sanskrit: 'ह य व र ट्', english: 'Sutra 5: The semivowel stream (h, y, v, r)', audioText: 'ह य व र' },
      { sanskrit: 'अक् → अ, इ, उ, ऋ, ऌ', english: 'Pratyāhāra representing all basic pure vowels', audioText: 'अक्' },
      { sanskrit: 'यण् → य, र, ल, व', english: 'Pratyāhāra representing all semivowels (used in Yaṇ-Sandhi)', audioText: 'यण्' },
    ],
    paniniSutra: {
      sutra: 'अकः सवर्णे दीर्घः (अष्टाध्यायी ६.१.१०१)',
      translation: 'When an Ak vowel is followed by a homogeneous vowel, both merge into a single prolonged long vowel.',
    },
  },
];

interface GenesisRootCase {
  root: string;
  rootGloss: string;
  gana: string;
  verbs: { word: string; meaning: string; formula: string }[];
  nouns: { word: string; meaning: string; formula: string }[];
  philosophical: { word: string; meaning: string; formula: string }[];
}

const GENESIS_ROOTS: GenesisRootCase[] = [
  {
    root: 'कृ (करणे)',
    rootGloss: 'To Act, Make, Create, Perform',
    gana: 'तनादि-गणः (Class 8)',
    verbs: [
      { word: 'करोति', meaning: 'He / She performs / does (Active)', formula: 'कृ + उ + तिप् (लट्)' },
      { word: 'कुरुते', meaning: 'He acts for himself (Ātmanepada)', formula: 'कृ + उ + त (लट् आत्मनेपद)' },
      { word: 'अकरोत्', meaning: 'He / She performed (Past)', formula: 'अट् + कृ + उ + त् (लङ्)' },
      { word: 'करिष्यति', meaning: 'He / She will perform (Future)', formula: 'कृ + स्य + तिप् (लृट्)' },
      { word: 'कारयति', meaning: 'He causes to do / orchestrates (Causative)', formula: 'कृ + णिच् + शप् + तिप्' },
    ],
    nouns: [
      { word: 'कर्मन् (Karma)', meaning: 'Action, deed, moral cause-and-effect', formula: 'कृ + मनिन्' },
      { word: 'कार्यम् (Kārya)', meaning: 'Task, duty, purpose, effect in causality', formula: 'कृ + ण्यत्' },
      { word: 'कर्ता (Kartā)', meaning: 'The agent, doer, creator, nominative subject', formula: 'कृ + तृच्' },
      { word: 'करणम् (Karaṇa)', meaning: 'Instrument, means of action, cognitive organ', formula: 'कृ + ल्युट्' },
      { word: 'कृतिः (Kṛti)', meaning: 'Masterpiece, creative composition, creation', formula: 'कृ + क्तिन्' },
    ],
    philosophical: [
      { word: 'संस्कृतम् (Saṃskṛtam)', meaning: 'Perfected, refined, purified speech', formula: 'सम् (together/pure) + कृ + क्त' },
      { word: 'संस्कृतिः (Saṃskṛti)', meaning: 'Culture, civilization, refined tradition', formula: 'सम् + कृ + क्तिन्' },
      { word: 'प्रकृतिः (Prakṛti)', meaning: 'Primary nature, cosmic matter, original source', formula: 'प्र (first/forth) + कृ + क्तिन्' },
      { word: 'विकृतिः (Vikṛti)', meaning: 'Transformation, modification, derivative product', formula: 'वि + कृ + क्तिन्' },
    ],
  },
  {
    root: 'गम् (गतौ)',
    rootGloss: 'To Move, Go, Reach, Understand',
    gana: 'भ्वादि-गणः (Class 1)',
    verbs: [
      { word: 'गच्छति', meaning: 'He / She walks / goes (Present stem गच्छ)', formula: 'गम् → गच्छ् + शप् + तिप् (लट्)' },
      { word: 'अगच्छत्', meaning: 'He / She walked / went (Past)', formula: 'अट् + गच्छ् + त् (लङ्)' },
      { word: 'गमिष्यति', meaning: 'He / She will go (Future keeps original root गम्)', formula: 'गम् + इस्य + तिप् (लृट्)' },
      { word: 'गमयति', meaning: 'He leads, guides, sends (Causative)', formula: 'गम् + णिच् + शप् + तिप्' },
    ],
    nouns: [
      { word: 'गतिः (Gati)', meaning: 'Motion, velocity, spiritual destiny, refuge', formula: 'गम् + क्तिन्' },
      { word: 'गमनम् (Gamana)', meaning: 'The act of going, movement, journey', formula: 'गम् + ल्युट्' },
      { word: 'गन्तव्यम् (Gantavya)', meaning: 'Destination, place to be reached', formula: 'गम् + तव्यत्' },
      { word: 'आगन्तुकः (Āgantuka)', meaning: 'Guest, visitor, traveler who has arrived', formula: 'आ + गम् + तुकन्' },
    ],
    philosophical: [
      { word: 'अधिगमः (Adhigama)', meaning: 'Attainment, acquisition of wisdom / learning', formula: 'अधि (over) + गम् + घञ्' },
      { word: 'सङ्गमः (Saṅgama)', meaning: 'Sacred confluence, meeting of rivers, union', formula: 'सम् (confluence) + गम् + अप्' },
      { word: 'अवगमः (Avagama)', meaning: 'Cognitive comprehension, direct perception', formula: 'अव (downward/deep) + गम् + घञ्' },
    ],
  },
  {
    root: 'ज्ञा (अवबोधने)',
    rootGloss: 'To Know, Comprehend, Experience, Realize',
    gana: 'क्र्यादि-गणः (Class 9)',
    verbs: [
      { word: 'जानाति', meaning: 'He / She knows, understands (Present)', formula: 'ज्ञा → जा + ना + ति (लट्)' },
      { word: 'अजानात्', meaning: 'He / She knew, understood (Past)', formula: 'अट् + जा + ना + त् (लङ्)' },
      { word: 'ज्ञास्यति', meaning: 'He / She will know / recognize (Future)', formula: 'ज्ञा + स्य + तिप् (लृट्)' },
      { word: 'ज्ञापयति', meaning: 'He informs, announces, teaches (Causative)', formula: 'ज्ञा + पुक् + णिच् + तिप्' },
    ],
    nouns: [
      { word: 'ज्ञानम् (Jñānam)', meaning: 'Knowledge, pure awareness, consciousness', formula: 'ज्ञा + ल्युट्' },
      { word: 'ज्ञानी (Jñānī)', meaning: 'Wise seer, illuminated scholar, knower of truth', formula: 'ज्ञान + इनि' },
      { word: 'ज्ञेयम् (Jñeyam)', meaning: 'That which is to be known, the ultimate object', formula: 'ज्ञा + यत्' },
      { word: 'संज्ञा (Saṃjñā)', meaning: 'Consciousness, technical name, identification', formula: 'सम् + ज्ञा + अङ्' },
    ],
    philosophical: [
      { word: 'विज्ञानम् (Vijñānam)', meaning: 'Empirical science, specialized systematic discernment', formula: 'वि (distinct/specialized) + ज्ञा + ल्युट्' },
      { word: 'प्रज्ञा (Prajñā)', meaning: 'Transcendent intuitive insight, spiritual wisdom', formula: 'प्र (elevated) + ज्ञा + क' },
      { word: 'अज्ञानम् (Ajñānam)', meaning: 'Spiritual nescience, perceptual illusion, ignorance', formula: 'नञ् (not) + ज्ञानम्' },
    ],
  },
];

export const DhatupathaPyramidIntro: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedLevelId, setSelectedLevelId] = useState<PyramidLevelId>('roots');
  const [selectedGenesisRootIndex, setSelectedGenesisRootIndex] = useState(0);

  const activeLevel = PYRAMID_LEVELS.find((lvl) => lvl.id === selectedLevelId) ?? PYRAMID_LEVELS[2];
  const activeGenesis = GENESIS_ROOTS[selectedGenesisRootIndex];

  return (
    <section className="dp-pyramid-intro-shell" aria-label="Generative Architecture of Sanskrit">
      <div className="dp-pyramid-banner-header">
        <div className="dp-pyramid-banner-titles">
          <div className="dp-pyramid-banner-eyebrow">
            वाग्विज्ञानम् · THE ARCHITECTURE OF SANSKRIT MORPHOLOGY
          </div>
          <h2 className="dp-pyramid-banner-title">
            The Generative Pyramid: How Sanskrit Creates Millions of Words
          </h2>
          <p className="dp-pyramid-banner-subtitle">
            Unlike modern languages with static memorized dictionaries, Sanskrit is an algorithmic generative language.
            From <strong>14 acoustic sound matrices</strong> and <strong>~2,000 atomic verbal roots (धातवः)</strong>,
            Pāṇini&apos;s computational grammar derives the entire philosophical, scientific, and poetic lexicon of India.
          </p>
        </div>

        <button
          type="button"
          className="dp-pyramid-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          title={isExpanded ? 'Collapse Architecture Guide' : 'Expand Architecture Guide'}
        >
          {isExpanded ? '▲ Hide Infographic' : '▼ Explore How Sanskrit Is Built'}
        </button>
      </div>

      {isExpanded && (
        <div className="dp-pyramid-body">
          {/* Top Interactive Pyramid Visual */}
          <div className="dp-pyramid-container">
            <div className="dp-pyramid-instructions">
              <span className="dp-pyramid-hint-icon">👆</span>
              <span>Click any tier of the pyramid below to inspect its mathematical role, Pāṇinian sūtras, and sound patterns:</span>
            </div>

            <div className="dp-pyramid-stack" role="tablist" aria-label="Sanskrit Pyramid Tiers">
              {PYRAMID_LEVELS.map((level) => {
                const isSelected = selectedLevelId === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`dp-pyramid-tier dp-pyramid-tier--level-${level.levelNumber} ${isSelected ? 'dp-pyramid-tier--active' : ''}`}
                    style={{
                      width: `${level.widthPercent}%`,
                      background: level.bgGradient,
                      borderColor: level.borderColor,
                    }}
                    onClick={() => setSelectedLevelId(level.id)}
                  >
                    <div className="dp-tier-content">
                      <div className="dp-tier-level-tag" style={{ background: level.borderColor }}>
                        Level {level.levelNumber}
                      </div>
                      <div className="dp-tier-title-wrap">
                        <strong className="dp-tier-name">{level.sanskritName}</strong>
                        <span className="dp-tier-badge">{level.badge}</span>
                      </div>
                      {isSelected && (
                        <div className="dp-tier-selected-marker" style={{ background: level.borderColor }}>
                          Selected Tier ▼
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Inspector Card for Selected Level */}
          <div
            className="dp-tier-inspector-card"
            style={{
              borderColor: activeLevel.borderColor,
              borderTopColor: activeLevel.borderColor,
            }}
          >
            <div className="dp-inspector-header">
              <div>
                <span className="dp-inspector-badge" style={{ background: activeLevel.borderColor }}>
                  Level {activeLevel.levelNumber} Analysis
                </span>
                <h3 className="dp-inspector-title" style={{ color: activeLevel.accentColor }}>
                  {activeLevel.sanskritName}
                </h3>
                <p className="dp-inspector-sub">{activeLevel.englishTitle}</p>
              </div>
              <div className="dp-inspector-formula-box">
                <span className="dp-formula-label">Computational Formula:</span>
                <code className="dp-formula-code">{activeLevel.formula}</code>
              </div>
            </div>

            <p className="dp-inspector-summary">{activeLevel.summary}</p>

            {/* Panini Sutra Card */}
            {activeLevel.paniniSutra && (
              <div className="dp-panini-sutra-card">
                <div className="dp-sutra-quote">📜 {activeLevel.paniniSutra.sutra}</div>
                <div className="dp-sutra-meaning">{activeLevel.paniniSutra.translation}</div>
              </div>
            )}

            {/* Key Concepts Grid */}
            <div className="dp-inspector-grid">
              <div className="dp-inspector-concepts-col">
                <h4 className="dp-col-title">Core Linguistic Mechanics:</h4>
                <div className="dp-concepts-list">
                  {activeLevel.keyConcepts.map((kc, i) => (
                    <div key={i} className="dp-concept-item">
                      <strong className="dp-concept-term">{kc.term}</strong>
                      <span className="dp-concept-meaning">{kc.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dp-inspector-examples-col">
                <h4 className="dp-col-title">Live Morphological Samples:</h4>
                <div className="dp-examples-list">
                  {activeLevel.examples.map((ex, i) => (
                    <div key={i} className="dp-example-item">
                      <div className="dp-example-top">
                        <span className="dp-example-sanskrit">{ex.sanskrit}</span>
                        {ex.audioText && (
                          <button
                            type="button"
                            className="dp-audio-btn"
                            onClick={() => playPronunciation(ex.audioText || ex.sanskrit)}
                            title={`Pronounce ${ex.audioText}`}
                            aria-label={`Hear ${ex.audioText}`}
                          >
                            🔊
                          </button>
                        )}
                      </div>
                      <span className="dp-example-english">{ex.english}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Root-to-Word Genesis Flow (शब्द-सृष्टि-प्रवाहः) */}
          <div className="dp-genesis-section">
            <div className="dp-genesis-header">
              <div>
                <span className="dp-genesis-tag">शब्द-सृष्टि-प्रवाहः · LIVE DERIVATION EXPLORER</span>
                <h3 className="dp-genesis-title">
                  Watch a Single Root Bloom into Infinite Vocabulary
                </h3>
                <p className="dp-genesis-desc">
                  Select an atomic verbal seed from the Dhātupāṭha below to trace how Pāṇinian operators derive finite verbs,
                  duty nouns, instruments, masterpieces, and philosophical terms:
                </p>
              </div>

              {/* Root Selection Pills */}
              <div className="dp-genesis-root-selector" role="tablist">
                {GENESIS_ROOTS.map((gr, idx) => (
                  <button
                    key={gr.root}
                    type="button"
                    role="tab"
                    aria-selected={selectedGenesisRootIndex === idx}
                    className={`dp-genesis-root-tab ${selectedGenesisRootIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedGenesisRootIndex(idx)}
                  >
                    <strong>{gr.root}</strong>
                    <small>{gr.rootGloss}</small>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Genesis Explorer Grid */}
            <div className="dp-genesis-card">
              <div className="dp-genesis-root-banner">
                <div className="dp-root-badge-group">
                  <span className="dp-root-lead-glyph">{activeGenesis.root.split(' ')[0]}</span>
                  <div>
                    <h4 className="dp-root-lead-title">{activeGenesis.root}</h4>
                    <span className="dp-root-lead-gloss">Semantic Essence: &quot;{activeGenesis.rootGloss}&quot; · {activeGenesis.gana}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="dp-root-audio-btn"
                  onClick={() => playPronunciation(activeGenesis.root.split(' ')[0])}
                  title={`Pronounce root ${activeGenesis.root}`}
                >
                  🔊 Hear Root &apos;{activeGenesis.root.split(' ')[0]}&apos;
                </button>
              </div>

              <div className="dp-genesis-columns-grid">
                {/* 1. Verbs / Tiṅanta */}
                <div className="dp-genesis-col">
                  <div className="dp-genesis-col-head">
                    <span className="dp-genesis-col-icon">⚡</span>
                    <div>
                      <strong className="dp-genesis-col-title">१. तिङन्तानि · Finite Verbs</strong>
                      <span className="dp-genesis-col-sub">Actions across Tense, Mood & Voice</span>
                    </div>
                  </div>
                  <div className="dp-genesis-card-list">
                    {activeGenesis.verbs.map((item, i) => (
                      <div key={i} className="dp-genesis-item">
                        <div className="dp-genesis-item-top">
                          <strong className="dp-item-sanskrit">{item.word}</strong>
                          <button
                            type="button"
                            className="dp-audio-mini-btn"
                            onClick={() => playPronunciation(item.word)}
                            title={`Hear ${item.word}`}
                          >
                            🔊
                          </button>
                        </div>
                        <span className="dp-item-meaning">{item.meaning}</span>
                        <code className="dp-item-formula">{item.formula}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Nouns / Kṛdanta */}
                <div className="dp-genesis-col">
                  <div className="dp-genesis-col-head">
                    <span className="dp-genesis-col-icon">🌱</span>
                    <div>
                      <strong className="dp-genesis-col-title">२. कृदन्तानि · Nouns &amp; Agents</strong>
                      <span className="dp-genesis-col-sub">Actions turned into Things & Doers</span>
                    </div>
                  </div>
                  <div className="dp-genesis-card-list">
                    {activeGenesis.nouns.map((item, i) => (
                      <div key={i} className="dp-genesis-item">
                        <div className="dp-genesis-item-top">
                          <strong className="dp-item-sanskrit">{item.word}</strong>
                          <button
                            type="button"
                            className="dp-audio-mini-btn"
                            onClick={() => playPronunciation(item.word.split(' ')[0])}
                            title={`Hear ${item.word}`}
                          >
                            🔊
                          </button>
                        </div>
                        <span className="dp-item-meaning">{item.meaning}</span>
                        <code className="dp-item-formula">{item.formula}</code>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Philosophical & Civilization Terms */}
                <div className="dp-genesis-col">
                  <div className="dp-genesis-col-head">
                    <span className="dp-genesis-col-icon">🪔</span>
                    <div>
                      <strong className="dp-genesis-col-title">३. दर्शनानि · Civilization &amp; Philosophy</strong>
                      <span className="dp-genesis-col-sub">Higher Vedic Concepts & Culture</span>
                    </div>
                  </div>
                  <div className="dp-genesis-card-list">
                    {activeGenesis.philosophical.map((item, i) => (
                      <div key={i} className="dp-genesis-item">
                        <div className="dp-genesis-item-top">
                          <strong className="dp-item-sanskrit">{item.word}</strong>
                          <button
                            type="button"
                            className="dp-audio-mini-btn"
                            onClick={() => playPronunciation(item.word.split(' ')[0])}
                            title={`Hear ${item.word}`}
                          >
                            🔊
                          </button>
                        </div>
                        <span className="dp-item-meaning">{item.meaning}</span>
                        <code className="dp-item-formula">{item.formula}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DhatupathaPyramidIntro;
