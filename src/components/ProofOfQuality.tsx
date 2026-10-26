import React, { useState, useRef, useEffect } from 'react';
import { playPronunciation, playSequence, stopPronunciation } from '../utils/pronunciation';
import '../styles/proof-of-quality.css';

export interface ProofOfQualityProps {
  onOpenReader: (lessonId?: string) => void;
  onOpenVarnamala?: () => void;
  onOpenGrammar?: () => void;
  onOpenRegister?: () => void;
}

type PoqTab = 'lessons' | 'audio' | 'analyzer' | 'chapter';
type SubLesson = 'sounds' | 'spoken' | 'sentence' | 'math';

interface AudioTrack {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  source: string;
  text: string;
  lines: string[];
  translation: string;
}

const SAMPLE_TRACKS: AudioTrack[] = [
  {
    id: 'saraswati',
    tag: 'Sacred Hymn · सरस्वतीवन्दना',
    title: 'Saraswati Vandana (Prayer of Wisdom)',
    subtitle: 'Classic verse from Deepakam Class 7 Invocation',
    source: 'Śārdūlavikrīḍita Meter · Traditional Recitation',
    text: 'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना । या ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा वन्दिता सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥',
    lines: [
      'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता',
      'या वीणावरदण्डमण्डितकरा या श्वेतपद्मासना',
      'या ब्रह्माच्युतशङ्करप्रभृतिभिर्देवैः सदा वन्दिता',
      'सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा',
    ],
    translation:
      'May Goddess Saraswati, who is fair as the jasmine flower, the moon, or snow; who is adorned in pristine white garments; whose hands grace the sacred veena; who is seated upon a pure white lotus; who is perpetually adored by Brahma, Vishnu, and Shiva; completely dispel all our ignorance and protect us.',
  },
  {
    id: 'rigveda',
    tag: 'Rigveda Hymn · ऋग्वेद-मन्त्रः',
    title: 'Saṅgacchadhvaṃ (Universal Solidarity)',
    subtitle: 'Rigveda 10.191.2 · Opening Hymn of Class 8',
    source: 'Rigvedic Vedic Meter · Collective Harmony',
    text: 'संगच्छध्वं संवदध्वं सं वो मनांसि जानताम् । देवा भागं यथा पूर्वे सञ्जानाना उपासते ॥',
    lines: [
      'संगच्छध्वं संवदध्वम्',
      'सं वो मनांसि जानताम्',
      'देवा भागं यथा पूर्वे',
      'सञ्जानाना उपासते',
    ],
    translation:
      'May we walk together in unity; may we speak in harmony; may our minds comprehend together; just as the enlightened sages of old shared their portions in cooperative fellowship.',
  },
  {
    id: 'pavamana',
    tag: 'Upanishadic Chant · मङ्गलाचरणम्',
    title: 'Asato Mā Sadgamaya (The Path of Light)',
    subtitle: 'Bṛhadāraṇyaka Upaniṣad 1.3.28',
    source: 'Meditative Shanti Chant',
    text: 'ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥',
    lines: [
      'ॐ असतो मा सद्गमय',
      'तमसो मा ज्योतिर्गमय',
      'मृत्योर्मा अमृतं गमय',
      'ॐ शान्तिः शान्तिः शान्तिः',
    ],
    translation:
      'Lead me from the unreal to the real; lead me from darkness unto light; lead me from mortality unto immortality. Om peace, peace, peace.',
  },
  {
    id: 'spoken',
    tag: 'Spoken Sanskrit · सरल-सम्भाषणम्',
    title: 'Gurukul Daily Conversation',
    subtitle: 'Natural everyday greetings and questions',
    source: 'Modern Conversational Sanskrit (सरल-संस्कृत-सम्भाषणम्)',
    text: 'नमो नमः भ्रातः! भवतः नाम किम्? मम नाम आनन्दः। भवान् कुत्र गच्छति? अहं शालां प्रति गच्छामि।',
    lines: [
      'नमो नमः भ्रातः !',
      'भवतः नाम किम् ?',
      'मम नाम आनन्दः ।',
      'भवान् कुत्र गच्छति ?',
      'अहं शालां प्रति गच्छामि ।',
    ],
    translation:
      'Hello brother! What is your name? My name is Ananda. Where are you going? I am heading towards the school.',
  },
  {
    id: 'phonetics',
    tag: 'Phonetic Articulation · ध्वनिविज्ञानम्',
    title: 'Vowel Echoes & Conjunct Consonants',
    subtitle: 'High-precision articulation for complex sounds',
    source: 'Pāṇinian Śikṣā (पाणिनीय-शिक्षा)',
    text: 'क्ष ज्ञ त्र श्र ऋ ॠ ऌ कः काः किः कुः',
    lines: [
      'क्ष · ज्ञ · त्र · श्र',
      'ऋ · ॠ · ऌ · ॡ',
      'कः · काः · किः · कुः',
    ],
    translation:
      'Phonetic demonstration of conjunct consonants (kṣa, jña, tra, śra), vocalic liquids (ṛ, ṝ, ḷ), and the resonant visarga (ḥ) vowel echo.',
  },
];

interface AnalyzerWord {
  devanagari: string;
  transliteration: string;
  prefix: { sa: string; type: string; gloss: string };
  root: { sa: string; type: string; gloss: string };
  suffix: { sa: string; type: string; gloss: string };
  meaningEn: string;
  meaningHi: string;
  grammarNotes: string;
}

const ANALYZER_DEMO_WORDS: AnalyzerWord[] = [
  {
    devanagari: 'संस्कृतम्',
    transliteration: 'saṃskṛtam',
    prefix: { sa: 'सम् (sam)', type: 'उपसर्गः (Prefix)', gloss: 'Together / Perfectly / Thoroughly' },
    root: { sa: '√कृ (kṛ)', type: 'धातुः (Root Verb)', gloss: 'To do / To refine / To sculpt' },
    suffix: { sa: '-क्त (-kta)', type: 'कृत्-प्रत्ययः (Passive Suffix)', gloss: 'Completed / Past Passive' },
    meaningEn: 'Refined, polished, perfected, consecrated language',
    meaningHi: 'सुसंस्कृत, परिष्कृत, शुद्ध और नियमबद्ध भाषा',
    grammarNotes: 'सम् + सुट् + कृ + क्त (कर्मणि वा भावे) — सम्बन्धे व्याकरण-सिद्धिः',
  },
  {
    devanagari: 'गच्छति',
    transliteration: 'gacchati',
    prefix: { sa: '—', type: 'उपसर्गः (Prefix)', gloss: 'Direct verb root' },
    root: { sa: '√गम् (gam)', type: 'धातुः (Root Verb)', gloss: 'To go / To move toward' },
    suffix: { sa: '-शप् + तिप् (-śap + tip)', type: 'तिङ्-प्रत्ययः (Verb Infix & Ending)', gloss: 'Present 3rd Person Singular' },
    meaningEn: 'He / She / It goes (Present Tense)',
    meaningHi: 'वह जाता है / वह जाती है (वर्तमानकालः / लट्-लकारः)',
    grammarNotes: 'इषुकमिगमिभ्यः छः (पाणिनि ६.४.१३) — गम्-धातोः गच्छ् आदेशः',
  },
  {
    devanagari: 'विद्यालये',
    transliteration: 'vidyālaye',
    prefix: { sa: 'विद्या (vidyā)', type: 'पूर्वपदम् (First Noun)', gloss: 'Knowledge / Wisdom' },
    root: { sa: 'आलय (ālaya)', type: 'उत्तरपदम् (Second Noun)', gloss: 'Abode / Temple / Home' },
    suffix: { sa: '-ङि (-ṅi / ए)', type: 'सुप्-प्रत्ययः (Case Suffix)', gloss: '7th Case (सप्तमी / Locative)' },
    meaningEn: 'In the school / In the house of knowledge',
    meaningHi: 'विद्यालय में / पाठशाला में (सप्तमी-एकवचनम्)',
    grammarNotes: 'विद्या + आलय = विद्यालय (दीर्घ-सन्धिः) + ङि = विद्यालये',
  },
  {
    devanagari: 'अहिंसा',
    transliteration: 'ahiṃsā',
    prefix: { sa: 'नञ् (nañ / अ-)', type: 'न-उपसर्गः (Negative Prefix)', gloss: 'Absence of / Non-' },
    root: { sa: '√हिंस् (hiṃs)', type: 'धातुः (Root Verb)', gloss: 'To injure / To strike / To harm' },
    suffix: { sa: '-अङ् + टाप् (-aṅ + ṭāp)', type: 'स्त्री-प्रत्ययः (Feminine Abstract)', gloss: 'Abstract virtue noun' },
    meaningEn: 'Non-violence, complete absence of harm to any being',
    meaningHi: 'किसी भी प्राणी को कष्ट न पहुँचाना / अक्रूरता',
    grammarNotes: 'न हिंसनम् इति अहिंसा (नञ्-तत्पुरुष-समासः)',
  },
];

interface Chapter1WordGloss {
  word: string;
  gloss: string;
  grammar: string;
}

const CHAPTER1_GLOSSES: Record<string, Chapter1WordGloss> = {
  'अम्ब': { word: 'अम्ब !', gloss: 'O Mother! (सम्बोधनम्)', grammar: 'अम्बा-शब्दः, सम्बोधन-एकवचनम्' },
  'वयं': { word: 'वयं', gloss: 'We all', grammar: 'अस्मद्-सर्वनाम, प्रथमा-बहुवचनम्' },
  'शालायां': { word: 'शालायां', gloss: 'In school', grammar: 'शाला-स्त्रीलिङ्ग-शब्दः, सप्तमी-एकवचनम् (अधिकरणम्)' },
  'गीतं': { word: 'गीतं', gloss: 'Song', grammar: 'गीत-नपुंसकलिङ्ग-शब्दः, द्वितीया-एकवचनम् (कर्म)' },
  'शृणुमः': { word: 'शृणुमः', gloss: 'We hear / listen', grammar: 'श्रु-धातुः, लट्-लकारः (Present), उत्तमपुरुष-बहुवचनम्' },
  'किन्तु': { word: 'किन्तु', gloss: 'However / But', grammar: 'अव्ययम् (Indeclinable)' },
  'अर्थं': { word: 'अर्थं', gloss: 'Meaning / significance', grammar: 'अर्थ-पुंल्लिङ्ग-शब्दः, द्वितीया-एकवचनम्' },
  'जिज्ञासा': { word: 'जिज्ञासा', gloss: 'Curiosity / desire to know', grammar: 'ज्ञातुम् इच्छा = जिज्ञासा (सन्-प्रत्ययान्तः)' },
  'लिखितवान्': { word: 'लिखितवान्', gloss: 'Wrote (he wrote)', grammar: 'लिख्-धातुः + क्तवतु-प्रत्ययः (Past Active Participle)' },
};

export const ProofOfQuality: React.FC<ProofOfQualityProps> = ({
  onOpenReader,
  onOpenVarnamala,
  onOpenGrammar,
  onOpenRegister,
}) => {
  const [activeTab, setActiveTab] = useState<PoqTab>('lessons');
  const [activeSubLesson, setActiveSubLesson] = useState<SubLesson>('sounds');
  const [activeTrackIdx, setActiveTrackIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(0.75);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number>(0);
  const [mathBase, setMathBase] = useState<number>(35);
  const [sentenceOrder, setSentenceOrder] = useState<number>(0);
  const [selectedSentenceToken, setSelectedSentenceToken] = useState<string>('रामः');
  const [selectedChapterWord, setSelectedChapterWord] = useState<string | null>('शृणुमः');

  const stopAudioRef = useRef<(() => void) | null>(null);

  // Stop any ongoing audio on unmount or tab switch
  useEffect(() => {
    return () => {
      if (stopAudioRef.current) stopAudioRef.current();
      stopPronunciation();
    };
  }, []);

  // Listen for direct requests to jump all the way down to the audio lesson
  useEffect(() => {
    const handleStartAudioLesson = () => {
      setActiveTab('lessons');
      setActiveSubLesson('sounds');
      setTimeout(() => {
        const target = document.getElementById('audio-lesson') || document.getElementById('poq-audio-lesson');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    };

    window.addEventListener('start-free-audio-lesson', handleStartAudioLesson);
    return () => window.removeEventListener('start-free-audio-lesson', handleStartAudioLesson);
  }, []);

  const handleTabChange = (tab: PoqTab) => {
    if (stopAudioRef.current) stopAudioRef.current();
    stopPronunciation();
    setIsPlayingAudio(false);
    setActiveTab(tab);
  };

  const handlePlaySound = (text: string) => {
    stopPronunciation();
    playPronunciation(text, { plainDevanagari: true, rate: speechRate });
  };

  const handleToggleTrack = (idx: number) => {
    if (idx !== activeTrackIdx) {
      if (stopAudioRef.current) stopAudioRef.current();
      stopPronunciation();
      setIsPlayingAudio(false);
      setActiveTrackIdx(idx);
    }

    if (isPlayingAudio && idx === activeTrackIdx) {
      if (stopAudioRef.current) stopAudioRef.current();
      stopPronunciation();
      setIsPlayingAudio(false);
      return;
    }

    const track = SAMPLE_TRACKS[idx];
    setIsPlayingAudio(true);
    stopAudioRef.current = playSequence(track.lines, {
      gapMs: 900,
      plainDevanagari: true,
      rate: speechRate,
      onDone: () => {
        setIsPlayingAudio(false);
        stopAudioRef.current = null;
      },
    });
  };

  const selectedTrack = SAMPLE_TRACKS[activeTrackIdx];
  const selectedAnalyzerWord = ANALYZER_DEMO_WORDS[selectedWordIdx];

  // Sentence reordering simulator
  const sentenceOrders = [
    [
      { dev: 'रामः', role: '1st Case (प्रथमा)', desc: 'Agent / Subject: Rama (the one doing the action)' },
      { dev: 'लङ्कायां', role: '7th Case (सप्तमी)', desc: 'Location / Adhikaraṇa: In Lanka (the place)' },
      { dev: 'बाणेन', role: '3rd Case (तृतीया)', desc: 'Instrument / Karaṇa: With an arrow (the means)' },
      { dev: 'रावणम्', role: '2nd Case (द्वितीया)', desc: 'Object / Karma: Ravana (the recipient of action)' },
      { dev: 'अमारयत्', role: 'Past Verb (लङ्-लकारः)', desc: 'Action: Slew / Defeated (3rd Person Singular)' },
    ],
    [
      { dev: 'बाणेन', role: '3rd Case (तृतीया)', desc: 'Instrument / Karaṇa: With an arrow (the means)' },
      { dev: 'रामः', role: '1st Case (प्रथमा)', desc: 'Agent / Subject: Rama (the one doing the action)' },
      { dev: 'रावणम्', role: '2nd Case (द्वितीया)', desc: 'Object / Karma: Ravana (the recipient of action)' },
      { dev: 'लङ्कायां', role: '7th Case (सप्तमी)', desc: 'Location / Adhikaraṇa: In Lanka (the place)' },
      { dev: 'अमारयत्', role: 'Past Verb (लङ्-लकारः)', desc: 'Action: Slew / Defeated (3rd Person Singular)' },
    ],
    [
      { dev: 'रावणम्', role: '2nd Case (द्वितीया)', desc: 'Object / Karma: Ravana (the recipient of action)' },
      { dev: 'लङ्कायां', role: '7th Case (सप्तमी)', desc: 'Location / Adhikaraṇa: In Lanka (the place)' },
      { dev: 'रामः', role: '1st Case (प्रथमा)', desc: 'Agent / Subject: Rama (the one doing the action)' },
      { dev: 'बाणेन', role: '3rd Case (तृतीया)', desc: 'Instrument / Karaṇa: With an arrow (the means)' },
      { dev: 'अमारयत्', role: 'Past Verb (लङ्-लकारः)', desc: 'Action: Slew / Defeated (3rd Person Singular)' },
    ],
  ];

  const currentTokens = sentenceOrders[sentenceOrder];
  const activeTokenInfo = currentTokens.find((t) => t.dev === selectedSentenceToken) || currentTokens[0];

  // Vedic Math calculation
  const mathLeft = Math.floor(mathBase / 10);
  const mathStep1 = mathLeft * (mathLeft + 1);
  const mathResult = mathStep1 * 100 + 25;

  return (
    <section className="poq-section" id="proof-of-quality" aria-label="Proof of Quality - Experience Before You Sign Up">
      <div className="poq-container">
        {/* Header Strip */}
        <div className="poq-header">
          <div className="poq-eyebrow">
            <span>🛡️</span>
            <span>गुणवत्ता-प्रमाणम् · Proof of Quality</span>
          </div>
          <h2 className="poq-title">
            Experience the Gurukul Platform Before Signing Up
            <span className="poq-title-sa">निःशुल्क-अनुभवः · No Registration Required</span>
          </h2>
          <p className="poq-subtitle">
            Zero commitment. Test interactive micro-lessons, hear authentic native audio, explore our Pāṇinian word analyzer, and read an entire NCERT chapter with full audio right now.
          </p>
          <div className="poq-guarantee-strip">
            <span className="poq-guarantee-item"><span>✓</span> Instant Interactive Audio Practice</span>
            <span className="poq-guarantee-item"><span>✓</span> 100% Free · No Sign-Up Needed</span>
            <span className="poq-guarantee-item"><span>✓</span> Authentic Audio Recitations</span>
            <span className="poq-guarantee-item"><span>✓</span> Complete NCERT Deepakam Chapter 1 Free</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="poq-nav-tabs" role="tablist" id="audio-lesson">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'lessons'}
            className={`poq-tab-btn${activeTab === 'lessons' ? ' active' : ''}`}
            onClick={() => handleTabChange('lessons')}
          >
            <span className="poq-tab-icon">🎓</span>
            <span>Short Demo Lessons</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'audio'}
            className={`poq-tab-btn${activeTab === 'audio' ? ' active' : ''}`}
            onClick={() => handleTabChange('audio')}
          >
            <span className="poq-tab-icon">🎧</span>
            <span>Sample Audio Recitations</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'analyzer'}
            className={`poq-tab-btn${activeTab === 'analyzer' ? ' active' : ''}`}
            onClick={() => handleTabChange('analyzer')}
          >
            <span className="poq-tab-icon">🔍</span>
            <span>Word Analyzer &amp; Jodo UI</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'chapter'}
            className={`poq-tab-btn${activeTab === 'chapter' ? ' active' : ''}`}
            onClick={() => handleTabChange('chapter')}
          >
            <span className="poq-tab-icon">📖</span>
            <span>Complete Free Chapter 1</span>
          </button>
        </div>

        {/* ==================================================================
            TAB 1: SHORT DEMO LESSONS
            ================================================================== */}
        {activeTab === 'lessons' && (
          <div className="poq-panel-body" role="tabpanel">
            <div className="poq-sublesson-chips">
              <button
                type="button"
                className={`poq-sublesson-chip${activeSubLesson === 'sounds' ? ' active' : ''}`}
                onClick={() => setActiveSubLesson('sounds')}
              >
                <span>🔤</span>
                <span>1. Sound Science &amp; Shiva Sutras</span>
              </button>
              <button
                type="button"
                className={`poq-sublesson-chip${activeSubLesson === 'spoken' ? ' active' : ''}`}
                onClick={() => setActiveSubLesson('spoken')}
              >
                <span>💬</span>
                <span>2. Everyday Spoken Phrases</span>
              </button>
              <button
                type="button"
                className={`poq-sublesson-chip${activeSubLesson === 'sentence' ? ' active' : ''}`}
                onClick={() => setActiveSubLesson('sentence')}
              >
                <span>📐</span>
                <span>3. Case Endings &amp; Free Word Order</span>
              </button>
              <button
                type="button"
                className={`poq-sublesson-chip${activeSubLesson === 'math' ? ' active' : ''}`}
                onClick={() => setActiveSubLesson('math')}
              >
                <span>⚡</span>
                <span>4. Vedic Mental Math in 2s</span>
              </button>
            </div>

            {/* Sub-Lesson 1: Sounds of Sanskrit */}
            {activeSubLesson === 'sounds' && (
              <div className="poq-lesson-card" id="poq-audio-lesson">
                <div className="poq-lesson-card-header">
                  <span className="poq-lesson-badge">ध्वनिविज्ञानम् · Anatomical Sound Zones</span>
                  <h3 className="poq-lesson-title">How Sanskrit Generates Sounds: From Throat to Lips</h3>
                  <p className="poq-lesson-desc">
                    Unlike modern scripts, Sanskrit sounds are grouped with scientific precision by the physical organ that produces them. Tap any sound below to test authentic audio pronunciation:
                  </p>
                </div>

                <div className="poq-sound-zones">
                  {/* Zone 1: Guttural */}
                  <div className="poq-zone-box">
                    <div className="poq-zone-header">
                      <span className="poq-zone-name">कण्ठ्याः (Guttural)</span>
                      <span className="poq-zone-organ">Throat / Glottis</span>
                    </div>
                    <div className="poq-zone-sounds">
                      {['अ', 'आ', 'क', 'ख', 'ग', 'घ', 'ङ', 'ह'].map((s) => (
                        <button key={s} type="button" className="poq-sound-btn" onClick={() => handlePlaySound(s)}>
                          <span>{s}</span>
                          <span className="poq-sound-btn-speaker">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zone 2: Palatal */}
                  <div className="poq-zone-box">
                    <div className="poq-zone-header">
                      <span className="poq-zone-name">तालव्याः (Palatal)</span>
                      <span className="poq-zone-organ">Hard Palate</span>
                    </div>
                    <div className="poq-zone-sounds">
                      {['इ', 'ई', 'च', 'छ', 'ज', 'झ', 'ञ', 'य', 'श'].map((s) => (
                        <button key={s} type="button" className="poq-sound-btn" onClick={() => handlePlaySound(s)}>
                          <span>{s}</span>
                          <span className="poq-sound-btn-speaker">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zone 3: Cerebral */}
                  <div className="poq-zone-box">
                    <div className="poq-zone-header">
                      <span className="poq-zone-name">मूर्धन्याः (Retroflex)</span>
                      <span className="poq-zone-organ">Roof of Mouth</span>
                    </div>
                    <div className="poq-zone-sounds">
                      {['ऋ', 'ॠ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'र', 'ष'].map((s) => (
                        <button key={s} type="button" className="poq-sound-btn" onClick={() => handlePlaySound(s)}>
                          <span>{s}</span>
                          <span className="poq-sound-btn-speaker">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zone 4: Dental */}
                  <div className="poq-zone-box">
                    <div className="poq-zone-header">
                      <span className="poq-zone-name">दन्त्याः (Dental)</span>
                      <span className="poq-zone-organ">Teeth</span>
                    </div>
                    <div className="poq-zone-sounds">
                      {['ऌ', 'त', 'थ', 'द', 'ध', 'न', 'ल', 'स'].map((s) => (
                        <button key={s} type="button" className="poq-sound-btn" onClick={() => handlePlaySound(s)}>
                          <span>{s}</span>
                          <span className="poq-sound-btn-speaker">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zone 5: Labial */}
                  <div className="poq-zone-box">
                    <div className="poq-zone-header">
                      <span className="poq-zone-name">ओष्ठ्याः (Labial)</span>
                      <span className="poq-zone-organ">Lips</span>
                    </div>
                    <div className="poq-zone-sounds">
                      {['उ', 'ऊ', 'प', 'फ', 'ब', 'भ', 'म', 'व'].map((s) => (
                        <button key={s} type="button" className="poq-sound-btn" onClick={() => handlePlaySound(s)}>
                          <span>{s}</span>
                          <span className="poq-sound-btn-speaker">🔊</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shiva Sutras Sample */}
                <div className="poq-shiva-strip">
                  <div>
                    <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                      14 Shiva Sound Aphorisms (माहेश्वर-सूत्राणि):
                    </span>
                    <div className="poq-shiva-text">१. अइउण् · २. ऋऌक् · ३. एओङ् · ४. ऐऔच्</div>
                  </div>
                  <button
                    type="button"
                    className="poq-play-shiva-btn"
                    onClick={() => handlePlaySound('अ इ उ ण् । ऋ लृ क् । ए ओ ङ् । ऐ औ च्')}
                  >
                    <span>🔊 Recite Shiva Sutras</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sub-Lesson 2: Spoken Sanskrit */}
            {activeSubLesson === 'spoken' && (
              <div className="poq-lesson-card">
                <div className="poq-lesson-card-header">
                  <span className="poq-lesson-badge">सरल-सम्भाषणम् · Spoken Sanskrit</span>
                  <h3 className="poq-lesson-title">Speak Sanskrit Naturally From Day One</h3>
                  <p className="poq-lesson-desc">
                    Listen to natural questions and responses used in everyday conversation. Tap any card to hear native pronunciation:
                  </p>
                </div>

                <div className="poq-dialogue-grid">
                  <div className="poq-dialogue-card">
                    <div>
                      <div className="poq-dialogue-q">नमो नमः ! भवतः नाम किम् ?</div>
                      <div className="poq-dialogue-a">मम नाम आनन्दः ।</div>
                      <div className="poq-dialogue-meaning">
                        “Hello! What is your name?” — “My name is Ananda.”
                      </div>
                    </div>
                    <button
                      type="button"
                      className="poq-dialogue-speaker-btn"
                      onClick={() => handlePlaySound('नमो नमः! भवतः नाम किम्? मम नाम आनन्दः।')}
                    >
                      <span>🔊 Listen &amp; Repeat</span>
                    </button>
                  </div>

                  <div className="poq-dialogue-card">
                    <div>
                      <div className="poq-dialogue-q">कथम् अस्ति ?</div>
                      <div className="poq-dialogue-a">कुशलम् अस्मि । सर्वं सम्यक् अस्ति ।</div>
                      <div className="poq-dialogue-meaning">
                        “How are you?” — “I am well. Everything is going great.”
                      </div>
                    </div>
                    <button
                      type="button"
                      className="poq-dialogue-speaker-btn"
                      onClick={() => handlePlaySound('कथम् अस्ति? कुशलम् अस्मि। सर्वं सम्यक् अस्ति।')}
                    >
                      <span>🔊 Listen &amp; Repeat</span>
                    </button>
                  </div>

                  <div className="poq-dialogue-card">
                    <div>
                      <div className="poq-dialogue-q">कृपया इदं स्वीकरोतु ।</div>
                      <div className="poq-dialogue-a">बहु धन्यवादः ! स्वागतम् !</div>
                      <div className="poq-dialogue-meaning">
                        “Please accept this.” — “Thank you very much! You are welcome!”
                      </div>
                    </div>
                    <button
                      type="button"
                      className="poq-dialogue-speaker-btn"
                      onClick={() => handlePlaySound('कृपया इदं स्वीकरोतु। बहु धन्यवादः! स्वागतम्!')}
                    >
                      <span>🔊 Listen &amp; Repeat</span>
                    </button>
                  </div>

                  <div className="poq-dialogue-card">
                    <div>
                      <div className="poq-dialogue-q">पुनर्मिलामः ! शुभदिनम् !</div>
                      <div className="poq-dialogue-a">भवते अपि शुभदिनम् !</div>
                      <div className="poq-dialogue-meaning">
                        “See you again! Have a good day!” — “Wishing you a wonderful day as well!”
                      </div>
                    </div>
                    <button
                      type="button"
                      className="poq-dialogue-speaker-btn"
                      onClick={() => handlePlaySound('पुनर्मिलामः! शुभदिनम्! भवते अपि शुभदिनम्!')}
                    >
                      <span>🔊 Listen &amp; Repeat</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Lesson 3: Sentence Grammar & Case Endings */}
            {activeSubLesson === 'sentence' && (
              <div className="poq-lesson-card">
                <div className="poq-lesson-card-header">
                  <span className="poq-lesson-badge">कारक-विभक्तिः · Sentence Architecture</span>
                  <h3 className="poq-lesson-title">Why Sanskrit Word Order Is 100% Free</h3>
                  <p className="poq-lesson-desc">
                    In English, <em>“Dog bites man”</em> is opposite to <em>“Man bites dog”</em>. In Sanskrit, case suffixes (Vibhaktis) encode who did what, so words can appear in ANY order without changing the meaning!
                  </p>
                </div>

                <div className="poq-sentence-builder">
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.65rem' }}>
                    Click any token below to inspect its grammatical role:
                  </div>
                  <div className="poq-sentence-tokens-row">
                    {currentTokens.map((t) => (
                      <div
                        key={t.dev}
                        className={`poq-word-token${selectedSentenceToken === t.dev ? ' selected' : ''}`}
                        onClick={() => {
                          setSelectedSentenceToken(t.dev);
                          handlePlaySound(t.dev);
                        }}
                      >
                        <span className="poq-token-devanagari">{t.dev}</span>
                        <span className="poq-token-case">{t.role.split(' ')[0]}</span>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="poq-sound-btn"
                      style={{ background: '#15803d', color: '#fff', borderColor: '#15803d', padding: '0.6rem 1rem' }}
                      onClick={() => handlePlaySound(currentTokens.map((t) => t.dev).join(' '))}
                    >
                      <span>🔊 Play Sentence</span>
                    </button>
                  </div>

                  <div className="poq-token-detail-card">
                    <div className="poq-td-role">{activeTokenInfo.dev} — {activeTokenInfo.role}</div>
                    <p className="poq-td-desc">{activeTokenInfo.desc}</p>
                  </div>

                  <div className="poq-free-order-demo">
                    <span>
                      <strong>Interactive Test:</strong> Shuffle the word order and see that the meaning remains completely unchanged:
                    </span>
                    <button
                      type="button"
                      className="poq-shuffle-btn"
                      onClick={() => setSentenceOrder((prev) => (prev + 1) % sentenceOrders.length)}
                    >
                      🔀 Shuffle Order (Layout {sentenceOrder + 1}/3)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Lesson 4: Vedic Mental Math */}
            {activeSubLesson === 'math' && (
              <div className="poq-lesson-card">
                <div className="poq-lesson-card-header">
                  <span className="poq-lesson-badge">वैदिक-गणितम् · Mental Math in 2 Seconds</span>
                  <h3 className="poq-lesson-title">Sutra 1: एकाधिकेन पूर्वेण (By One More Than the Previous)</h3>
                  <p className="poq-lesson-desc">
                    Square any two-digit number ending in 5 mentally in seconds: multiply the tens digit by (tens digit + 1), and suffix 25.
                  </p>
                </div>

                <div className="poq-math-playground">
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b', marginBottom: '0.5rem' }}>
                    Select a number to calculate its square instantly:
                  </div>
                  <div className="poq-math-chip-row">
                    {[15, 25, 35, 45, 65, 75, 85, 95, 105].map((n) => (
                      <button
                        key={n}
                        type="button"
                        className={`poq-math-chip${mathBase === n ? ' active' : ''}`}
                        onClick={() => setMathBase(n)}
                      >
                        {n}²
                      </button>
                    ))}
                  </div>

                  <div className="poq-math-breakdown-card">
                    <div className="poq-mb-target">{mathBase}² = ?</div>
                    <div className="poq-mb-steps">
                      <div className="poq-mb-step-item">
                        <div className="poq-mb-step-title">Step 1: Left Part</div>
                        <div className="poq-mb-step-val">
                          {mathLeft} × ({mathLeft} + 1) = {mathLeft} × {mathLeft + 1} = <strong>{mathStep1}</strong>
                        </div>
                      </div>
                      <div className="poq-mb-step-item">
                        <div className="poq-mb-step-title">Step 2: Right Part</div>
                        <div className="poq-mb-step-val">5² = <strong>25</strong> (Always ends in 25)</div>
                      </div>
                    </div>
                    <div className="poq-mb-final">
                      Result: {mathStep1} | 25 = <strong>{mathResult}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            TAB 2: SAMPLE AUDIO SHOWCASE
            ================================================================== */}
        {activeTab === 'audio' && (
          <div className="poq-panel-body" role="tabpanel">
            <div className="poq-audio-layout">
              {/* Left Column: Playlist */}
              <div className="poq-audio-playlist">
                {SAMPLE_TRACKS.map((t, idx) => (
                  <div
                    key={t.id}
                    className={`poq-audio-track-item${activeTrackIdx === idx ? ' active' : ''}`}
                    onClick={() => handleToggleTrack(idx)}
                  >
                    <div className="poq-ati-meta">
                      <span className="poq-ati-tag">{t.tag}</span>
                      <div className="poq-ati-title">{t.title}</div>
                      <div className="poq-ati-sub">{t.subtitle}</div>
                    </div>
                    <div className="poq-ati-play-icon">
                      {isPlayingAudio && activeTrackIdx === idx ? '⏸' : '▶'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Active Player Console */}
              <div className="poq-audio-player-card">
                <div>
                  <div className="poq-ap-header">
                    <span className="poq-ap-eyebrow">{selectedTrack.tag}</span>
                    <h3 className="poq-ap-title">{selectedTrack.title}</h3>
                    <div className="poq-ap-source">{selectedTrack.source}</div>
                  </div>

                  <div className="poq-ap-verse-box">
                    {selectedTrack.lines.map((line, lIdx) => (
                      <div key={lIdx} style={{ marginBottom: '0.35rem' }}>
                        {line}
                      </div>
                    ))}
                  </div>

                  <div className="poq-ap-translation">
                    <strong>Meaning:</strong> {selectedTrack.translation}
                  </div>
                </div>

                <div className="poq-ap-controls">
                  <button
                    type="button"
                    className="poq-ap-main-btn"
                    onClick={() => handleToggleTrack(activeTrackIdx)}
                  >
                    <span>{isPlayingAudio ? '⏸ Pause Recitation' : '▶ Play Recitation'}</span>
                  </button>

                  <div className="poq-ap-speed-group">
                    <span>Speed:</span>
                    <button
                      type="button"
                      className={`poq-ap-speed-btn${speechRate === 0.68 ? ' active' : ''}`}
                      onClick={() => setSpeechRate(0.68)}
                      title="Slow Vedic Chant Tempo"
                    >
                      0.7x (Chant)
                    </button>
                    <button
                      type="button"
                      className={`poq-ap-speed-btn${speechRate === 0.75 ? ' active' : ''}`}
                      onClick={() => setSpeechRate(0.75)}
                      title="Standard Learning Tempo"
                    >
                      0.75x (Study)
                    </button>
                    <button
                      type="button"
                      className={`poq-ap-speed-btn${speechRate === 0.9 ? ' active' : ''}`}
                      onClick={() => setSpeechRate(0.9)}
                      title="Natural Conversational Tempo"
                    >
                      1.0x (Natural)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB 3: WORD ANALYZER & JODO STUDIO UI SHOWCASE
            ================================================================== */}
        {activeTab === 'analyzer' && (
          <div className="poq-panel-body" role="tabpanel">
            <div className="poq-analyzer-interactive-header">
              <span className="poq-lesson-badge">पद-विश्लेषणम् · Interactive Word Deconstructor</span>
              <h3 className="poq-lesson-title">Experience the Pāṇinian Morphological Engine</h3>
              <p className="poq-lesson-desc">
                Every word in our 6,000+ word library is broken down into its elemental root (धातु), prefix (उपसर्ग), and grammatical suffix (प्रत्यय). Tap any word below to see the live engine in action:
              </p>
            </div>

            {/* Word Chips */}
            <div className="poq-analyzer-word-chips">
              {ANALYZER_DEMO_WORDS.map((w, idx) => (
                <button
                  key={w.devanagari}
                  type="button"
                  className={`poq-aw-chip${selectedWordIdx === idx ? ' active' : ''}`}
                  onClick={() => {
                    setSelectedWordIdx(idx);
                    handlePlaySound(w.devanagari);
                  }}
                >
                  <span>✨ {w.devanagari}</span>
                </button>
              ))}
            </div>

            {/* Live Morphological Breakdown Card */}
            <div className="poq-analyzer-live-card">
              <div className="poq-alc-top">
                <div>
                  <span className="poq-alc-word">{selectedAnalyzerWord.devanagari}</span>
                  <span className="poq-alc-translit">[{selectedAnalyzerWord.transliteration}]</span>
                </div>
                <button
                  type="button"
                  className="poq-alc-audio-btn"
                  onClick={() => handlePlaySound(selectedAnalyzerWord.devanagari)}
                >
                  <span>🔊 Pronounce Word</span>
                </button>
              </div>

              {/* Flowchart Nodes */}
              <div className="poq-flow-nodes">
                <div className="poq-flow-node poq-flow-node--prefix">
                  <div className="poq-fn-type">{selectedAnalyzerWord.prefix.type}</div>
                  <div className="poq-fn-sanskrit">{selectedAnalyzerWord.prefix.sa}</div>
                  <div className="poq-fn-gloss">{selectedAnalyzerWord.prefix.gloss}</div>
                </div>

                <div className="poq-flow-arrow">+</div>

                <div className="poq-flow-node poq-flow-node--root">
                  <div className="poq-fn-type">{selectedAnalyzerWord.root.type}</div>
                  <div className="poq-fn-sanskrit">{selectedAnalyzerWord.root.sa}</div>
                  <div className="poq-fn-gloss">{selectedAnalyzerWord.root.gloss}</div>
                </div>

                <div className="poq-flow-arrow">+</div>

                <div className="poq-flow-node poq-flow-node--suffix">
                  <div className="poq-fn-type">{selectedAnalyzerWord.suffix.type}</div>
                  <div className="poq-fn-sanskrit">{selectedAnalyzerWord.suffix.sa}</div>
                  <div className="poq-fn-gloss">{selectedAnalyzerWord.suffix.gloss}</div>
                </div>

                <div className="poq-flow-arrow">=</div>

                <div className="poq-flow-node poq-flow-node--result">
                  <div className="poq-fn-type">Final Deconstructed Form</div>
                  <div className="poq-fn-sanskrit">{selectedAnalyzerWord.devanagari}</div>
                  <div className="poq-fn-gloss">Grammar Verified ✓</div>
                </div>
              </div>

              <div className="poq-alc-meanings">
                <div>
                  <strong>English Meaning:</strong> {selectedAnalyzerWord.meaningEn}
                </div>
                <div>
                  <strong>हिन्दी अर्थ:</strong> {selectedAnalyzerWord.meaningHi}
                </div>
                <div style={{ width: '100%', fontSize: '0.82rem', color: '#64748b', borderTop: '1px solid #fed7aa', paddingTop: '0.5rem' }}>
                  <strong>Pāṇinian Derivation Note:</strong> {selectedAnalyzerWord.grammarNotes}
                </div>
              </div>
            </div>

            {/* Visual UI Screenshots & System Mockups */}
            <div style={{ marginBottom: '1rem' }}>
              <span className="poq-lesson-badge">UI WALKTHROUGH &amp; SCREENSHOTS</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.85rem' }}>
                How the Actual Reader &amp; Puzzle Studio Looks
              </h4>
            </div>

            <div className="poq-mockup-gallery">
              {/* Mockup Card 1: Jodo Studio */}
              <div className="poq-mockup-card">
                <div className="poq-mockup-top-bar">
                  <div className="poq-mockup-dots">
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                  </div>
                  <span>Jodo Studio · 7-Shelf Syllable Assembly</span>
                </div>
                <div className="poq-mockup-view">
                  <div className="poq-mv-title">Interactive Drag &amp; Drop Tile Puzzle</div>
                  <div className="poq-mv-desc">
                    Assemble 6,000+ words tile by tile. Instant audio feedback on every letter snap:
                  </div>
                  <div className="poq-mock-tiles-tray">
                    <span className="poq-mock-tile">सं (sam)</span>
                    <span className="poq-mock-tile">स्कृ (skṛ)</span>
                    <span className="poq-mock-tile">तम् (tam)</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>
                    ✓ Perfect Match: संस्कृतम् (Refined Language)
                  </div>
                </div>
              </div>

              {/* Mockup Card 2: 7 Vibhakti Case Matrix */}
              <div className="poq-mockup-card">
                <div className="poq-mockup-top-bar">
                  <div className="poq-mockup-dots">
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                  </div>
                  <span>7 Vibhakti Case Declension Matrix</span>
                </div>
                <div className="poq-mockup-view">
                  <div className="poq-mv-title">Instant Noun Declension Table</div>
                  <div className="poq-mv-desc">
                    Click any noun in the textbook to view its 21-case grid across Singular, Dual, and Plural:
                  </div>
                  <table className="poq-mock-matrix-table">
                    <thead>
                      <tr>
                        <th>Case (विभक्तिः)</th>
                        <th>एकवचनम् (Singular)</th>
                        <th>बहुवचनम् (Plural)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1st (प्रथमा - Subject)</td>
                        <td>रामः (rāmaḥ)</td>
                        <td>रामाः (rāmāḥ)</td>
                      </tr>
                      <tr>
                        <td>2nd (द्वितीया - Object)</td>
                        <td>रामम् (rāmam)</td>
                        <td>रामान् (rāmān)</td>
                      </tr>
                      <tr>
                        <td>3rd (तृतीया - By/With)</td>
                        <td>रामेण (rāmeṇa)</td>
                        <td>रामैः (rāmaiḥ)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mockup Card 3: Reverse Word Deconstruction */}
              <div className="poq-mockup-card">
                <div className="poq-mockup-top-bar">
                  <div className="poq-mockup-dots">
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                    <span className="poq-mockup-dot" />
                  </div>
                  <span>Reverse Word Deconstructor Flow</span>
                </div>
                <div className="poq-mockup-view">
                  <div className="poq-mv-title">Grammatical Breakdown Popover</div>
                  <div className="poq-mv-desc">
                    Click any compound word to inspect sandhi splits, verb roots, and trilingual dictionary glosses:
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.65rem' }}>
                    <div style={{ fontWeight: 800, color: '#3d1b04', fontSize: '0.9rem' }}>
                      पठनम् = √पठ् (To Read) + -ल्युट् (Action Noun)
                    </div>
                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Meaning: The act of reading / study · Neuter Noun
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {onOpenGrammar && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button
                  type="button"
                  className="poq-rw-secondary-cta"
                  onClick={onOpenGrammar}
                >
                  <span>📐 Explore Full Grammar Studio &amp; Verb Paradigms ➔</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            TAB 4: COMPLETE FREE CHAPTER 1 (NCERT DEEPAKAM)
            ================================================================== */}
        {activeTab === 'chapter' && (
          <div className="poq-panel-body" role="tabpanel">
            {/* Free Chapter Value Strip */}
            <div className="poq-free-chapter-banner">
              <div className="poq-fcb-left">
                <span className="poq-fcb-badge">🎁 100% UNRESTRICTED FREE ACCESS</span>
                <h3 className="poq-fcb-title">NCERT Class 7 Chapter 1: वन्दे भारतमातरम्</h3>
                <p className="poq-fcb-desc">
                  Experience the full power of our interactive reader without creating an account or paying a rupee. Line-by-line Sanskrit text, word-by-word sandhi breakdown, native audio, and CBSE question patterns are completely unlocked.
                </p>
                <div className="poq-fcb-perks">
                  <span>✓ Full 15 Paragraphs &amp; Invocations</span>
                  <span>✓ 1-Click Audio for Every Line</span>
                  <span>✓ Trilingual Word Lookup Popovers</span>
                  <span>✓ No Credit Card · No Sign-Up</span>
                </div>
              </div>

              <button
                type="button"
                className="poq-fcb-cta-btn"
                onClick={() => onOpenReader('gsde101')}
                title="Launch full NCERT Deepakam Chapter 1 in Reader"
              >
                <span>📖 Open Complete Free Chapter 1 in Reader ➔</span>
              </button>
            </div>

            {/* In-Page Reader Preview Window */}
            <div className="poq-reader-window">
              <div className="poq-rw-header">
                <div>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase' }}>
                    Live Reader Preview · कक्षा ७ - प्रथमः पाठः
                  </span>
                  <div className="poq-rw-title">वन्दे भारतमातरम् (Salutations to Mother India)</div>
                </div>
                <button
                  type="button"
                  className="poq-rw-listen-btn"
                  onClick={() =>
                    handlePlaySound(
                      'अम्ब ! वयं विभिन्नेषु कार्यक्रमेषु, आकाशवाण्यां, शालायां च वन्दे मातरम् इति गीतं बहुत्र शृणुमः। किन्तु अस्य अर्थं न जानीमः।'
                    )
                  }
                >
                  <span>🔊 Recite Opening Dialogue</span>
                </button>
              </div>

              {/* Dialogue Block 1 */}
              <div className="poq-rw-verse-block">
                <div className="poq-rw-verse-tag">Passage 1 · Tap any highlighted word to inspect its meaning:</div>
                <div className="poq-rw-verse-words">
                  {['अम्ब', '!', 'वयं', 'विभिन्नेषु', 'कार्यक्रमेषु', ',', 'आकाशवाण्यां', ',', 'शालायां', 'च', '‘वन्दे', 'मातरम्’', 'इति', 'गीतं', 'बहुत्र', 'शृणुमः', '।', 'किन्तु', 'अस्य', 'अर्थं', 'न', 'जानीमः', '।', 'मातः', '!', 'इदं', 'गीतं', 'कः', 'लिखितवान्', 'इत्यपि', 'मम', 'जिज्ञासा', 'अस्ति', '।'].map((token, wIdx) => {
                    const clean = token.replace(/[!,‘’.“”]/g, '').trim();
                    const hasGloss = Boolean(CHAPTER1_GLOSSES[clean]);
                    return (
                      <span
                        key={wIdx}
                        className={`poq-rw-word-chip${selectedChapterWord === clean ? ' active' : ''}`}
                        style={{ cursor: hasGloss ? 'pointer' : 'default', borderStyle: hasGloss ? 'solid' : 'dashed' }}
                        onClick={() => {
                          if (hasGloss) {
                            setSelectedChapterWord(clean);
                            handlePlaySound(clean);
                          }
                        }}
                      >
                        {token}
                      </span>
                    );
                  })}
                </div>

                {selectedChapterWord && CHAPTER1_GLOSSES[selectedChapterWord] && (
                  <div className="poq-rw-word-gloss">
                    <strong>Word Breakdown: </strong>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#b45309' }}>
                      {CHAPTER1_GLOSSES[selectedChapterWord].word}
                    </span>
                    <span> — Meaning: {CHAPTER1_GLOSSES[selectedChapterWord].gloss}</span>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>
                      Grammar Role: {CHAPTER1_GLOSSES[selectedChapterWord].grammar}
                    </div>
                  </div>
                )}

                <div className="poq-rw-translation" style={{ marginTop: '0.85rem' }}>
                  <strong>Parallel English Translation: </strong>
                  “Mother! In various programs, on the radio, and in school, we hear the song ‘Vande Mataram’ in many places. But we do not know its meaning. Mother! Who wrote this song? This is also my curiosity.”
                </div>
              </div>

              {/* Reader Actions Footer */}
              <div className="poq-rw-actions">
                <button
                  type="button"
                  className="poq-fcb-cta-btn"
                  onClick={() => onOpenReader('gsde101')}
                >
                  <span>📖 Continue Reading Full 15 Passages in Reader ➔</span>
                </button>

                {onOpenVarnamala && (
                  <button
                    type="button"
                    className="poq-rw-secondary-cta"
                    onClick={onOpenVarnamala}
                  >
                    <span>🌱 Or Start from Alphabet (वर्णमाला) ➔</span>
                  </button>
                )}

                {onOpenRegister && (
                  <button
                    type="button"
                    className="poq-fcb-cta-btn"
                    style={{ background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)' }}
                    onClick={onOpenRegister}
                  >
                    <span>🎁 Start 14-Day Free Access ➔</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProofOfQuality;
