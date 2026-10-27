import React, { useState } from 'react';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/student-staircase-blackboard.css';

interface StudentStaircaseBlackboardProps {
  onOpenVarnamala: () => void;
  onOpenReader: (lessonId?: string) => void;
  onOpenGrammar: () => void;
  onOpenCbseGuide?: () => void;
  onOpenQuiz?: () => void;
}

export const StudentStaircaseBlackboard: React.FC<StudentStaircaseBlackboardProps> = ({
  onOpenVarnamala,
  onOpenReader,
  onOpenGrammar,
  onOpenCbseGuide,
  onOpenQuiz,
}) => {
  const [isGreetingSpeaking, setIsGreetingSpeaking] = useState(false);

  const handleNamasteGreeting = () => {
    stopPronunciation();
    soundEffects.playStrokeChime();
    setIsGreetingSpeaking(true);
    playPronunciation('हरिः ॐ! नमो नमः। संस्कृत-विद्यालये भवतः स्वागतम्।');
    setTimeout(() => {
      setIsGreetingSpeaking(false);
    }, 4500);
  };

  const LEARNING_LINKS = [
    {
      id: 'varnamala',
      stepNum: '१',
      icon: '🔤',
      sanskrit: 'वर्णमाला एवं अक्षराणि',
      english: 'Alphabet, Sounds & 400+ Syllables',
      action: onOpenVarnamala,
      tag: 'Step 1',
    },
    {
      id: 'sentences',
      stepNum: '२',
      icon: '💬',
      sanskrit: 'सरल-वाक्यानि एवं धातवः',
      english: '300 Everyday Sentences & Root Studio',
      action: () => onOpenReader('simple-sentences'),
      tag: 'Step 2 & 3',
    },
    {
      id: 'grammar',
      stepNum: '३',
      icon: '🏛️',
      sanskrit: 'व्याकरणम् · धातुपाठः',
      english: 'Vibhaktis, Verb Conjugation & Rules',
      action: onOpenGrammar,
      tag: 'Step 4',
    },
    {
      id: 'deepakam',
      stepNum: '४',
      icon: '📖',
      sanskrit: 'दीपकम् पाठ्यपुस्तकम्',
      english: 'NCERT Deepakam 1-Tap Reader',
      action: () => onOpenReader(),
      tag: 'Step 5',
    },
    {
      id: 'exams',
      stepNum: '५',
      icon: '🎯',
      sanskrit: 'परीक्षा-सिद्धिः एवं प्रश्नावल्याः',
      english: 'CBSE Exam Prep & Interactive Quizzes',
      action: () => {
        if (onOpenCbseGuide) onOpenCbseGuide();
        else if (onOpenQuiz) onOpenQuiz();
      },
      tag: 'Step 6',
    },
  ];

  return (
    <section className="student-staircase-section" aria-label="Staircase of Learning towards Knowledge Blackboard">
      {/* Eyebrow Header */}
      <div className="ssb-eyebrow">
        <span className="ssb-badge">ज्ञान-सोपानम् · THE STAIRCASE OF WISDOM</span>
        <span className="ssb-subtext">विद्या ददाति विनयम् · विनयाद्याति पात्रताम्</span>
      </div>

      <div className="ssb-main-stage">
        {/* Left Side: Backside View of Student Ascending Stairs Image Frame */}
        <div className="ssb-image-viewport">
          <img
            src="/gurukul-staircase-blackboard.jpg"
            alt="Backside view of a student climbing the staircase of learning steps towards the blackboard"
            className="ssb-hero-img"
            loading="lazy"
          />
          {/* Subtle atmospheric vignette */}
          <div className="ssb-img-overlay" aria-hidden="true" />

          {/* Floating Stair Steps Indicator */}
          <div className="ssb-stairs-progression-rail" aria-label="Ascending steps of learning">
            <div className="ssb-step-chip">
              <span className="ssb-step-num">१</span>
              <span>ध्वनिः (Sound)</span>
            </div>
            <div className="ssb-step-arrow">➜</div>
            <div className="ssb-step-chip">
              <span className="ssb-step-num">२</span>
              <span>संयुक्ताक्षरम् (Syllables)</span>
            </div>
            <div className="ssb-step-arrow">➜</div>
            <div className="ssb-step-chip">
              <span className="ssb-step-num">३</span>
              <span>वाक्यम् (Sentences)</span>
            </div>
            <div className="ssb-step-arrow">➜</div>
            <div className="ssb-step-chip">
              <span className="ssb-step-num">४</span>
              <span>व्याकरणम् (Grammar)</span>
            </div>
            <div className="ssb-step-arrow">➜</div>
            <div className="ssb-step-chip active">
              <span className="ssb-step-num">५</span>
              <span>सिद्धिः (Mastery)</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Interactive Classroom Blackboard (कृष्णफलकम्) */}
        <div className="ssb-blackboard-card" role="region" aria-label="Sanskrit Learning Blackboard">
          {/* Chalkboard Wooden Frame Bezel */}
          <div className="ssb-blackboard-inner">
            {/* Top Chalkboard Banner with Namaste Greeting */}
            <div className="ssb-chalk-header">
              <button
                type="button"
                className={`ssb-namaste-btn ${isGreetingSpeaking ? 'speaking' : ''}`}
                onClick={handleNamasteGreeting}
                title="Tap the Namaste icon to hear traditional Sanskrit greeting (नमो नमः)"
                aria-label="Namaste greeting button"
              >
                <span className="ssb-namaste-icon" aria-hidden="true">🙏</span>
                <span className="ssb-namaste-halo" aria-hidden="true" />
              </button>

              <div className="ssb-chalk-title-block">
                <h3 className="ssb-chalk-motto">नमो नमः · स्वागतम्!</h3>
                <p className="ssb-chalk-submotto">
                  <em>"Climb each step with reverence — the blackboard of wisdom awaits."</em>
                </p>
                <div className="ssb-chalk-listen-pill" onClick={handleNamasteGreeting} role="button" tabIndex={0}>
                  <span>🔊</span>
                  <span>{isGreetingSpeaking ? 'उच्चारणं भवति... (Speaking…)' : 'Tap Namaste to Hear Greeting'}</span>
                </div>
              </div>
            </div>

            {/* Blackboard Divider with Chalk Dust Effect */}
            <div className="ssb-chalk-divider" aria-hidden="true">
              <span className="ssb-chalk-line" />
              <span className="ssb-chalk-symbol">ॐ</span>
              <span className="ssb-chalk-line" />
            </div>

            {/* Interactive Links on the Blackboard */}
            <div className="ssb-chalk-links-label">
              <span>✏️ CHALKBOARD STUDY PATHWAYS · फलक-निर्देशाः:</span>
            </div>

            <div className="ssb-chalk-links-grid">
              {LEARNING_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.id}
                  className="ssb-chalk-link-row"
                  onClick={() => {
                    soundEffects.playPuzzleSnap();
                    link.action();
                  }}
                  title={`Open ${link.sanskrit} (${link.english})`}
                >
                  <div className="ssb-clr-left">
                    <span className="ssb-clr-step">{link.stepNum}</span>
                    <span className="ssb-clr-icon" aria-hidden="true">{link.icon}</span>
                    <div className="ssb-clr-text">
                      <div className="ssb-clr-sanskrit">{link.sanskrit}</div>
                      <div className="ssb-clr-english">{link.english}</div>
                    </div>
                  </div>
                  <div className="ssb-clr-arrow" aria-hidden="true">
                    <span>{link.tag}</span>
                    <span>➜</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Chalk Tray Accent */}
            <div className="ssb-chalk-tray" aria-hidden="true">
              <span className="ssb-chalk-piece ssb-chalk-white" />
              <span className="ssb-chalk-piece ssb-chalk-yellow" />
              <span className="ssb-chalk-piece ssb-chalk-blue" />
              <span className="ssb-duster" title="Chalk Duster" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
