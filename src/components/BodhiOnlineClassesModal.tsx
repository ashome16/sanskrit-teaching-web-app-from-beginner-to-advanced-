import React, { useState } from 'react';
import BodhiAvatar, { type BodhiMood } from './BodhiAvatar';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/bodhi-online-classes.css';

export type ClassTrackId = 'spoken' | 'cbse' | 'vyakaran' | 'vedic_math';

interface ClassTrackDetail {
  id: ClassTrackId;
  name: string;
  nameSa: string;
  levelBadge: string;
  icon: string;
  targetAudience: string;
  duration: string;
  description: string;
  syllabus: string[];
  sampleLesson: {
    title: string;
    sanskritText: string;
    transliteration: string;
    meaning: string;
    bodhiTip: string;
    quizQuestion: string;
    quizOptions: string[];
    correctIndex: number;
    explanation: string;
  };
}

const CLASS_TRACKS: ClassTrackDetail[] = [
  {
    id: 'spoken',
    name: 'Spoken Sanskrit & Varṇamālā',
    nameSa: 'सरल-सम्भाषणम् एवं वर्णमाला',
    levelBadge: 'Level 1 · Absolute Beginner',
    icon: '🗣️',
    targetAudience: 'Kids, beginners & families learning to speak & read',
    duration: '15 min daily micro-lessons · Self-paced',
    description:
      'Master the 5 vocal articulation zones (कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ), 400+ akshara sound combinations, essential daily greetings, and conversational phrases with authentic audio feedback.',
    syllabus: [
      'Authentic acoustic pronunciation of 13 Vowels & 33 Consonants',
      'Daily conversational greetings (हरिः ओम्, नमस्ते, सुप्रभातं, कथम् अस्ति?)',
      'Self-introduction and asking names (मम नाम... भवतः नाम किम्?)',
      'Everyday vocabulary: family, birds, animals, flowers & numbers 1–100',
    ],
    sampleLesson: {
      title: 'Micro-Class: Friendly Greeting & Asking Names',
      sanskritText: 'नमस्ते! भवतः नाम किम्? मम नाम बोधिः।',
      transliteration: 'Namaste! Bhavataḥ nāma kim? Mama nāma Bodhiḥ.',
      meaning: 'Hello! What is your name? (to a male) My name is Bodhi.',
      bodhiTip:
        'Use "भवतः" (bhavataḥ) when asking a gentleman, and "भवत्याः" (bhavatyāḥ) when speaking to a lady!',
      quizQuestion: 'How would you reply to Bodhi to say "My name is Rahul"?',
      quizOptions: [
        'मम नाम राहुलः (Mama nāma Rāhulaḥ)',
        'त्वं नाम राहुलः (Tvaṁ nāma Rāhulaḥ)',
        'सः नाम राहुलः (Saḥ nāma Rāhulaḥ)',
      ],
      correctIndex: 0,
      explanation: 'उत्तमम्! "मम" (Mama) means "my", so "मम नाम राहुलः" is the correct respectful reply.',
    },
  },
  {
    id: 'cbse',
    name: 'CBSE & NCERT School Prep',
    nameSa: 'दीपकम् · कक्षा ६–१० परीक्षा-मार्गदर्शनम्',
    levelBadge: 'Classes 6–10 · Board Exam Focus',
    icon: '🏫',
    targetAudience: 'CBSE / ICSE / State Board students aiming for 95%+',
    duration: 'Chapter-by-chapter modules with mock tests',
    description:
      'Line-by-line decoding of NCERT Deepakam (दीपकम्) textbooks, word-by-word sandhi breakdown, anvaya verse restructuring, Kim-pada question formation (प्रश्ननिर्माणम्), and 80-mark blueprint mock papers.',
    syllabus: [
      'Complete Class 7 & 8 Deepakam & Class 9 Sharada chapters with audio',
      'Question formation mastery: कः, का, किम्, केन, कस्मै, कस्मात्, कस्य, कुत्र, कदा',
      'Section-wise blueprint training: Reading, Writing, Grammar & Literature',
      'Chapter-wise downloadable question banks and instant scoring quizzes',
    ],
    sampleLesson: {
      title: 'Micro-Class: Question Formation (प्रश्ननिर्माणम्)',
      sanskritText: 'वृक्षाः परोपकाराय फलन्ति।',
      transliteration: 'Vṛkṣāḥ paropakārāya phalanti.',
      meaning: 'Trees bear fruit for the benefit of others.',
      bodhiTip:
        'When an underlined word ends in "-आय" (4th case / चतुर्थी विभक्तिः like परोपकाराय), frame the question using "किमर्थम्" (for what purpose) or "कस्मै" (for whom)!',
      quizQuestion: 'Replace "परोपकाराय" with the correct interrogative question word:',
      quizOptions: [
        'किमर्थम् / कस्मै (Kimartham / Kasmai)',
        'कुत्र (Kutra - where)',
        'कदा (Kadā - when)',
      ],
      correctIndex: 0,
      explanation: 'साधु साधु! "परोपकाराय" indicates the purpose (Dative / चतुर्थी), so "वृक्षाः किमर्थम् फलन्ति?" is correct!',
    },
  },
  {
    id: 'vyakaran',
    name: 'Pāṇinian Vyakaran & Shlokas',
    nameSa: 'व्याकरणम् एवं श्लोक-उच्चारणम्',
    levelBadge: 'Level 2–3 · Classical Grammar',
    icon: '🏛️',
    targetAudience: 'Intermediate learners, adults, shloka & Gita chanters',
    duration: '10 structured modules + interactive studios',
    description:
      'Learn Sanskrit grammar the scientific way: words algorithmically generated from roots (Dhātu) through affixes (Pratyaya). Master 7 Vibhaktis, 5 Lakāras, Sandhi rules, and sacred shloka chanting cadence.',
    syllabus: [
      'Nominal declensions: Bālaka, Latā, Phala, Hari, Guru, Pitṛ & pronouns',
      'Verb conjugations: 5 Lakāras (Laṭ, Lṛṭ, Laṅ, Loṭ, Vidhiliṅ) in Parasmaipada & Ātmanepada',
      'Root science: Dhātupāṭha verb engine & Kṛt pratyayas (Ktva, Lyap, Tumun)',
      'Classical metre (Chandas) and pause breathing for Bhagavad Gita shlokas',
    ],
    sampleLesson: {
      title: 'Micro-Class: The 7 Vibhaktis (Noun Cases)',
      sanskritText: 'रामेण बाणेन रावणः हतः।',
      transliteration: 'Rāmeṇa bāṇena Rāvaṇaḥ hataḥ.',
      meaning: 'By Rama, with an arrow, Ravana was defeated.',
      bodhiTip:
        'Notice the 3rd case (तृतीया विभक्तिः) endings: "रामेण" (the agent doing the action) and "बाणेन" (the instrument/tool used)!',
      quizQuestion: 'What case (विभक्तिः) is used for the instrument / tool of action?',
      quizOptions: [
        'तृतीया विभक्तिः (3rd Case / Instrumental)',
        'द्वितीया विभक्तिः (2nd Case / Accusative)',
        'सप्तमी विभक्तिः (7th Case / Locative)',
      ],
      correctIndex: 0,
      explanation: 'सम्यक्! Pāṇini sūtra 2.3.18 "कर्तृकरणयोस्तृतीया" dictates that the instrument (करण) takes तृतीया.',
    },
  },
  {
    id: 'vedic_math',
    name: 'Vedic Math & Astronomical Science',
    nameSa: 'वैदिक-गणितम् एवं खगोल-विज्ञानम्',
    levelBadge: 'All Ages · High Speed & Geometry',
    icon: '⚡',
    targetAudience: 'Math lovers, students, competitive exam test-takers',
    duration: '16 Sutras + interactive calculation sandboxes',
    description:
      'Transform mental calculation using the 16 sutras of Vedic Mathematics. Learn rapid mental multiplication, squaring, Baudhayana geometric rope proofs, and ancient astronomical Ahargaṇa day-count calculations.',
    syllabus: [
      'Ekādhikena Pūrveṇa & Nikhilam lightning mental multiplication',
      'Square roots, cube roots, and vinculum (Rekhāṅka) negative digit math',
      'Baudhayana Sulba Sutras: Ancient geometric altar proofs',
      'Sūrya Siddhānta Ahargaṇa: Calculating planetary positions through Sanskrit verses',
    ],
    sampleLesson: {
      title: 'Micro-Class: Sūtra "एकाधिकेन पूर्वेण" (One more than the previous)',
      sanskritText: '३५ × ३५ = (३ × ४) | (५ × ५) = १२२५',
      transliteration: '35 × 35 = (3 × 4) | (5 × 5) = 1225',
      meaning: 'To square any number ending in 5: multiply the left digit by (digit + 1), and append 25!',
      bodhiTip:
        'Try 65 × 65 in your head: 6 × 7 = 42, then append 25 ➔ 4225! Done in 2 seconds without pen or paper.',
      quizQuestion: 'Using Ekadhikena Purvena, what is 75 × 75?',
      quizOptions: [
        '5625 (because 7 × 8 = 56, append 25)',
        '5425',
        '4925',
      ],
      correctIndex: 0,
      explanation: 'अद्भुतम्! 7 × 8 = 56, append 25 gives 5625 instantly! That is the speed of Vedic mathematics.',
    },
  },
];

export interface BodhiOnlineClassesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView?: (view: any) => void;
  onOpenVarnamala?: () => void;
  onOpenReader?: (chapterId?: string) => void;
  onOpenGrammar?: () => void;
  onOpenVedicMaths?: () => void;
  onOpenCourse?: () => void;
  onOpenBodhi?: () => void;
  initialTrack?: ClassTrackId;
}

export const BodhiOnlineClassesModal: React.FC<BodhiOnlineClassesModalProps> = ({
  isOpen,
  onClose,
  onNavigateView,
  onOpenVarnamala,
  onOpenReader,
  onOpenGrammar,
  onOpenVedicMaths,
  onOpenCourse,
  onOpenBodhi,
  initialTrack = 'spoken',
}) => {
  const [selectedTrackId, setSelectedTrackId] = useState<ClassTrackId>(initialTrack);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [bodhiMood, setBodhiMood] = useState<BodhiMood>('namaste');

  if (!isOpen) return null;

  const currentTrack = CLASS_TRACKS.find((t) => t.id === selectedTrackId) || CLASS_TRACKS[0];

  const handleSelectTrack = (trackId: ClassTrackId) => {
    setSelectedTrackId(trackId);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
    setBodhiMood('happy');
  };

  const handleHearWelcome = () => {
    playPronunciation('नमस्ते! अहं बोधिः। स्वागतं भवतः ऑनलाइन-संस्कृत-कक्षासु!');
    setBodhiMood('namaste');
  };

  const handlePlaySampleAudio = (text: string) => {
    playPronunciation(text);
    setBodhiMood('reading');
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedQuizAnswer(index);
    setQuizSubmitted(true);
    if (index === currentTrack.sampleLesson.correctIndex) {
      setBodhiMood('celebrate');
      playPronunciation('साधु साधु! उत्तमम्!');
    } else {
      setBodhiMood('scholar');
    }
  };

  const handleLaunchTrack = () => {
    onClose();
    switch (currentTrack.id) {
      case 'spoken':
        if (onOpenVarnamala) onOpenVarnamala();
        else if (onNavigateView) onNavigateView('home');
        break;
      case 'cbse':
        if (onOpenReader) onOpenReader('gsde101');
        else if (onNavigateView) onNavigateView('reader');
        break;
      case 'vyakaran':
        if (onOpenGrammar) onOpenGrammar();
        else if (onNavigateView) onNavigateView('grammar');
        break;
      case 'vedic_math':
        if (onOpenVedicMaths) onOpenVedicMaths();
        else if (onNavigateView) onNavigateView('vedic-maths');
        break;
    }
  };

  return (
    <div
      className="boc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="boc-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="boc-modal-dialog">
        {/* Modal Header */}
        <header className="boc-modal-header">
          <div className="boc-header-left">
            <div className="boc-header-avatar">
              <BodhiAvatar mood={bodhiMood} size="md" showHalo={true} />
              <button
                type="button"
                className="boc-welcome-voice-btn"
                onClick={handleHearWelcome}
                title="Hear Bodhi welcome you to class"
              >
                🔊 Welcome Voice
              </button>
            </div>

            <div className="boc-header-titles">
              <span className="boc-badge">✨ 24/7 Virtual Gurukul · Interactive AI Mentor</span>
              <h2 id="boc-title" className="boc-title">
                Sanskrit Online Classes with Bodhi
                <span className="boc-title-sanskrit">बोधेः ऑनलाइन-संस्कृत-वर्गाः</span>
              </h2>
              <p className="boc-subtitle">
                Self-paced daily micro-classes, authentic phonetic audio recitation, CBSE school guidance, and instant 1-on-1 doubt solving.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="boc-close-btn"
            onClick={onClose}
            aria-label="Close Online Classes dialog"
          >
            ✕
          </button>
        </header>

        {/* Modal Body */}
        <div className="boc-modal-body">
          {/* Key Perks Strip */}
          <div className="boc-perks-row">
            <div className="boc-perk-item">
              <span className="boc-perk-icon">⏱️</span>
              <span>15-Min Daily Micro-Lessons</span>
            </div>
            <div className="boc-perk-item">
              <span className="boc-perk-icon">🎙️</span>
              <span>Phonetic Audio Articulation</span>
            </div>
            <div className="boc-perk-item">
              <span className="boc-perk-icon">💬</span>
              <span>1-on-1 Ask Bodhi Doubts</span>
            </div>
            <div className="boc-perk-item">
              <span className="boc-perk-icon">📜</span>
              <span>Completion Certificate</span>
            </div>
          </div>

          {/* Track Selector Tabs */}
          <div>
            <div className="boc-tracks-header">
              <h3 className="boc-tracks-title">Choose Your Online Class Track:</h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Select any track to try a live sample lesson below</span>
            </div>

            <div className="boc-track-tabs" role="tablist">
              {CLASS_TRACKS.map((track) => {
                const isActive = track.id === selectedTrackId;
                return (
                  <button
                    key={track.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`boc-track-tab-btn${isActive ? ' active' : ''}`}
                    onClick={() => handleSelectTrack(track.id)}
                  >
                    <div className="boc-tab-top">
                      <span className="boc-tab-icon">{track.icon}</span>
                      <span className="boc-tab-level">{track.levelBadge.split('·')[0]}</span>
                    </div>
                    <span className="boc-tab-name">{track.name}</span>
                    <span className="boc-tab-sa">{track.nameSa.split('·')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Track Spotlight Card */}
          <div className="boc-track-spotlight">
            <div className="boc-spotlight-top">
              <div className="boc-spotlight-info">
                <h3>
                  <span>{currentTrack.icon}</span>
                  <span>{currentTrack.name}</span>
                </h3>
                <p>{currentTrack.description}</p>
              </div>

              <div className="boc-spotlight-meta-pills">
                <span className="boc-meta-pill highlight">{currentTrack.levelBadge}</span>
                <span className="boc-meta-pill">👥 {currentTrack.targetAudience}</span>
                <span className="boc-meta-pill">⏳ {currentTrack.duration}</span>
              </div>
            </div>

            {/* Interactive Classroom Sandbox */}
            <div className="boc-classroom-box">
              <div className="boc-classroom-label-row">
                <span className="boc-classroom-label">
                  <span>🎓</span>
                  <span>Interactive Classroom Preview: {currentTrack.sampleLesson.title}</span>
                </span>
                <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>
                  ● Bodhi Online Classroom Live
                </span>
              </div>

              <div className="boc-lesson-content">
                <div className="boc-lesson-sanskrit">{currentTrack.sampleLesson.sanskritText}</div>
                <div className="boc-lesson-translit">{currentTrack.sampleLesson.transliteration}</div>
                <div className="boc-lesson-meaning">
                  <strong>Meaning:</strong> {currentTrack.sampleLesson.meaning}
                </div>

                <div className="boc-interactive-controls">
                  <button
                    type="button"
                    className="boc-audio-btn"
                    onClick={() => handlePlaySampleAudio(currentTrack.sampleLesson.sanskritText)}
                    title="Listen to Bodhi pronounce this phrase"
                  >
                    🔊 Listen to Bodhi
                  </button>

                  <div style={{ fontSize: '0.82rem', color: '#78350f', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span>💡</span>
                    <span><strong>Bodhi's Tip:</strong> {currentTrack.sampleLesson.bodhiTip}</span>
                  </div>
                </div>
              </div>

              {/* Check-in Practice Question */}
              <div className="boc-quiz-box">
                <div className="boc-quiz-prompt">
                  <span>❓ Bodhi's Quick Check: </span>
                  {currentTrack.sampleLesson.quizQuestion}
                </div>

                <div className="boc-quiz-options">
                  {currentTrack.sampleLesson.quizOptions.map((opt, i) => {
                    let optClass = 'boc-quiz-opt-btn';
                    if (quizSubmitted) {
                      if (i === currentTrack.sampleLesson.correctIndex) optClass += ' correct';
                      else if (i === selectedQuizAnswer) optClass += ' wrong';
                    }
                    return (
                      <button
                        key={i}
                        type="button"
                        className={optClass}
                        onClick={() => handleQuizAnswer(i)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div
                    className={`boc-quiz-feedback ${
                      selectedQuizAnswer === currentTrack.sampleLesson.correctIndex ? 'success' : 'fail'
                    }`}
                  >
                    {selectedQuizAnswer === currentTrack.sampleLesson.correctIndex
                      ? currentTrack.sampleLesson.explanation
                      : `Not quite! The correct answer is: ${
                          currentTrack.sampleLesson.quizOptions[currentTrack.sampleLesson.correctIndex]
                        }. ${currentTrack.sampleLesson.explanation}`}
                  </div>
                )}
              </div>
            </div>

            {/* Syllabus Checklist */}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#334155', marginBottom: '0.4rem' }}>
                📖 What You Will Master in This Track:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                {currentTrack.syllabus.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '0.2rem' }}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <footer className="boc-modal-footer">
          <div className="boc-footer-left">
            <span>✨ 100% Free to start · All 4 tracks open</span>
          </div>

          <div className="boc-footer-actions">
            {onOpenBodhi && (
              <button
                type="button"
                className="boc-secondary-cta"
                onClick={() => {
                  onClose();
                  onOpenBodhi();
                }}
              >
                💬 Ask Bodhi a Question
              </button>
            )}

            {onOpenCourse && (
              <button
                type="button"
                className="boc-secondary-cta"
                onClick={() => {
                  onClose();
                  onOpenCourse();
                }}
              >
                🧠 Full 28-Lesson Curriculum
              </button>
            )}

            <button
              type="button"
              className="boc-primary-cta"
              onClick={handleLaunchTrack}
            >
              <span>🚀 Launch {currentTrack.name.split('&')[0]} Class</span>
              <span>➔</span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BodhiOnlineClassesModal;
