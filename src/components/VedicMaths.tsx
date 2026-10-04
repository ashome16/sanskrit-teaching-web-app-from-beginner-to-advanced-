import React, { useState, useEffect } from 'react';
import {
  VEDIC_ZERO_ESSAY,
  VEDIC_LOGIC_LANGUAGE_ESSAY,
  VEDIC_SUTRAS,
  VEDIC_SUBSUTRAS,
  VEDIC_QUIZ_QUESTIONS,
  VEDIC_ARTICLES,
  GURU_PARAMPARA,
  HISTORIOGRAPHICAL_FRAMEWORK,
  SHAKA_TO_CE_OFFSET,
  SHAKA_ERA_CHRONOLOGY,
  VEDIC_SUBSUTRA_WORKSHEETS,
  type VedicSutra,
  type VedicSubSutraWorksheet,
  type VedicSubSutraProblem
} from '../data/vedicMaths';
import { useAuthStore } from '../store/authStore';
import { hasPremiumAccess, canDownloadContent } from '../utils/premiumAccess';
import { downloadBlob, escapeHtml } from '../utils/contentDownload';
import { playPronunciation } from '../utils/pronunciation';
import { VEDIC_LEARNING_PATH, VEDIC_PATH_SUTRA_IDS, vedicPathIndex } from '../data/vedicLearningPath';
import { VedicLearningPath } from './VedicLearningPath';
import VedicArticleFigure from './VedicArticleFigure';
import '../styles/vedic-maths.css';
import '../styles/resources.css';

export type VedicTab = 'solvers' | 'articles' | 'zero' | 'fluid' | 'algebra' | 'geometry' | 'parampara' | 'logic' | 'sutras' | 'quiz' | 'essay';
type SolverKey = 'ekadhikena' | 'nikhilam-sub' | 'nikhilam-mul' | 'urdhva' | 'ekanyunena' | 'antya' | 'beejank';

export interface VedicMathsProps {
  onGoHome?: () => void;
  onOpenReader?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenGrammar?: () => void;
  onOpenRegister?: () => void;
  onOpenLogin?: () => void;
  /** Tab to open first (e.g. 'zero' from search / Numbers guide "Read more"). */
  initialTab?: VedicTab;
  /** Anchor to open first: 'zero' | 'vedic-path' | 'sutra-<id>' | 'solver-<key>' | 'article-<slug>' (also read from the URL hash). */
  initialAnchor?: string;
  /** "New here? Start from Numbers" → Sanskrit Numbers guide. */
  onOpenNumbers?: () => void;
}

export type DhanurStanceKey = 'alidha' | 'pratyalidha' | 'samapada' | 'vaisakha' | 'mandala';

export interface DhanurStance {
  id: DhanurStanceKey;
  nameSa: string;
  nameIast: string;
  nameEn: string;
  shapeEmoji: string;
  shapeName: string;
  shapeGeometry: string;
  spanLabel: string;
  spanDesc: string;
  weightFront: number;
  weightRear: number;
  weightDesc: string;
  combatRole: string;
  recoilPhysics: string;
  bodyMechanics: string;
  sourceText: string;
  textDiagram: string;
  tacticalTip: string;
}

const DHANUR_STANCES: DhanurStance[] = [
  {
    id: 'alidha',
    nameSa: 'आलीढ स्थानम्',
    nameIast: 'Ālīḍha Sthānam',
    nameEn: 'The Forward Bow Stance',
    shapeEmoji: '📐',
    shapeName: 'Right-Angled Scalene Triangle',
    shapeGeometry: 'Scalene right-angled triangle between front foot, rear foot, and pelvic center of gravity.',
    spanLabel: '3 Cubits (त्र्यरत्नि / ~4.5 ft / ~1.37 m)',
    spanDesc: 'Roughly 4.5 feet wide',
    weightFront: 70,
    weightRear: 30,
    weightDesc: '70% Forward / 30% Rear',
    combatRole: 'Aggressive long-range heavy attack. Transforms the archer into a forward kinetic wedge to drive maximum piercing force into oncoming cavalry or infantry.',
    recoilPhysics: 'Converts full body momentum forward into the arrow shaft, while the straight trailing leg anchors and absorbs heavy recoil.',
    bodyMechanics: 'Right knee bent deeply forward directly above ankle; left leg stretched out straight behind. Torso leans aggressively forward toward the target.',
    sourceText: 'Agni Purāṇa (Ch. 249) & Vasiṣṭha Dhanurveda Saṃhitā',
    textDiagram: `[Target Direction ->] 🎯
       ( Head/Torso )
          /       \\
         /         \\
        /           \\  <- Extended Leg
   [Bent Knee]       \\
      L_              \\
     /  \\______________\\
   [Front Foot]    [Back Foot]
   |<--- 3 Cubits (4.5 ft) --->|`,
    tacticalTip: 'Śulba Mapping: Ground span between feet acts as Pārśvamānī (base a), vertical spine as Tiryaṅmānī (height b), and arrow line of sight as Akṣṇayā Rajjuḥ (hypotenuse c).'
  },
  {
    id: 'pratyalidha',
    nameSa: 'प्रत्यालीढ स्थानम्',
    nameIast: 'Pratyālīḍha Sthānam',
    nameEn: 'The Defensive Wedge Stance',
    shapeEmoji: '📐',
    shapeName: 'Reflected / Inverted Triangle',
    shapeGeometry: 'Exact mirror reflection of the Ālīḍha triangle, anchored rearward for defensive counter-strikes.',
    spanLabel: '3 Cubits (त्र्यरत्नि / ~4.5 ft / ~1.37 m)',
    spanDesc: 'Roughly 4.5 feet wide',
    weightFront: 30,
    weightRear: 70,
    weightDesc: '30% Forward / 70% Rear',
    combatRole: 'Lean-away defense. Absorbs heavy counter-impact and shockwaves while dodging incoming projectiles and returning rapid counter-fire.',
    recoilPhysics: 'The deeply bent rear leg acts as a compressed mechanical shock absorber that catches backward recoil and launches immediate return volleys.',
    bodyMechanics: 'Left knee drawn back and deeply bent; right leg extended straight forward toward target. Torso reclines back defensively to evade incoming missiles.',
    sourceText: 'Agni Purāṇa (Ch. 249) & Vasiṣṭha Dhanurveda Saṃhitā',
    textDiagram: `🎯 [<- Target Direction]
       ( Head/Torso )
          /       \\
         /         \\
        /           \\
       /             \\  [Bent Knee]
      /_______________\\_/
   [Front Foot]    [Back Foot]
   |<--- 3 Cubits (4.5 ft) --->|`,
    tacticalTip: 'Used by veteran archers to slip beneath enemy arrow trajectories while keeping the arrow notched and aimed at enemy officers.'
  },
  {
    id: 'samapada',
    nameSa: 'समपद स्थानम्',
    nameIast: 'Samapada Sthānam',
    nameEn: 'The Symmetrical Parallel Stance',
    shapeEmoji: '█',
    shapeName: 'Symmetrical Vertical Rectangle / Square',
    shapeGeometry: 'Balanced bilateral rectangle with an erect vertical spine perpendicular to the earth.',
    spanLabel: '1 Palm-Width (समपद / ~4–5 inches)',
    spanDesc: 'Exactly 1 palm-width apart',
    weightFront: 50,
    weightRear: 50,
    weightDesc: '50% Left / 50% Right (Absolute Symmetry)',
    combatRole: 'Formal salutations (Praṇāma), mental centering before practice, ritual zeroing, and calibrating steady breathing (Prāṇāyāma).',
    recoilPhysics: 'Distributes body weight with absolute bilateral equilibrium along both legs, eliminating muscle tremor and steadying the visual sightline.',
    bodyMechanics: 'Both feet placed flat on the ground, pointing forward, perfectly parallel and one palm-width apart. Knees straight, spine strictly perpendicular.',
    sourceText: 'Vasiṣṭha Dhanurveda Saṃhitā',
    textDiagram: `       ( Head/Torso )
          |       |
          |       |
          |       |
          |       |
          ||     ||
        [||]     [||]
     [Left Foot] [Right Foot]
     |<-- 1 Palm-width -->|`,
    tacticalTip: 'The archer’s foundational centering posture. Used to achieve heart-rate stillness before drawing the first arrow in competition or ritual.'
  },
  {
    id: 'vaisakha',
    nameSa: 'वैशाख स्थानम्',
    nameIast: 'Vaiśākha Sthānam',
    nameEn: 'The Equilateral Power Squat',
    shapeEmoji: '⏃',
    shapeName: 'Equilateral Triangle / Isosceles Trapezoid',
    shapeGeometry: 'Broad trapezoidal power base with dropped pelvic center of gravity and outward knee flares.',
    spanLabel: '3 Spans (त्रि-वितस्ति / ~2 to 2.5 ft / ~75 cm)',
    spanDesc: 'Approximately 2.5 feet wide',
    weightFront: 50,
    weightRear: 50,
    weightDesc: '50% Left / 50% Right (Ultra-Low Center of Gravity)',
    combatRole: 'Drawing exceptionally stiff, heavy composite or solid iron bows (Loha-Dhanuṣ) requiring massive draw weights (80–120+ lbs).',
    recoilPhysics: 'The lowered pelvis and broad bilateral base prevent the archer from being tipped backward by massive string release energy.',
    bodyMechanics: 'Feet spread wide apart (three spans); both knees flexed slightly outward into a firm half-squat. Thighs and core locked in isometric tension.',
    sourceText: 'Agni Purāṇa (Ch. 249) & Vasiṣṭha Dhanurveda Saṃhitā',
    textDiagram: `       ( Head/Torso )
          /       \\
         /         \\
      [Knee]     [Knee]
       /             \\
      /               \\
   [Left Foot]   [Right Foot]
   |<--- 3 Spans (2.5 ft) --->|`,
    tacticalTip: 'Standard stance for fortress rampart snipers launching heavy armor-piercing iron arrows (Nārāca) into siege engines.'
  },
  {
    id: 'mandala',
    nameSa: 'मण्डल स्थानम्',
    nameIast: 'Maṇḍala Sthānam',
    nameEn: 'The Circular / Hexagonal Pivot',
    shapeEmoji: '⬡',
    shapeName: 'Regular Hexagon / Circle',
    shapeGeometry: 'Circular radial base enabling 360-degree rotational mobility without feet crossing or tangling.',
    spanLabel: '1 Vitasti (वितस्ति / ~9 inches)',
    spanDesc: 'Approximately 9 inches apart',
    weightFront: 50,
    weightRear: 50,
    weightDesc: 'Omnidirectional Dynamic Equilibrium (360°)',
    combatRole: 'Chariot archers (Rathis) and warriors surrounded by multiple adversaries in close-quarters melee skirmishes.',
    recoilPhysics: 'Circular knee curvature allows radial torque redirection, absorbing violent string snap while pivoting smoothly in all 360 degrees.',
    bodyMechanics: 'Feet spaced one Vitasti (9 inches) apart, pointing diagonally outward; knees bent wide to create a round circular silhouette.',
    sourceText: 'Agni Purāṇa (Ch. 249) & Vasiṣṭha Dhanurveda Saṃhitā',
    textDiagram: `       ( Head/Torso )
          /       \\
         /         \\
      [Knee]  ( )  [Knee]
         \\         /
          \\       /
      [Left]     [Right]
      [Foot]     [Foot]
       |<-- 9 inches -->|`,
    tacticalTip: 'Allows charioteers to pivot instantaneously and unleash backward Parthian shots or flank shots without tripping over their own feet.'
  }
];

const MURDHANYA_PHONETICS = [
  {
    letterSa: 'ट',
    letterIast: 'ṭa',
    phoneticName: 'Voiceless Unaspirated Retroflex Stop',
    sanskritClass: 'अघोष अल्पप्राण',
    biomechanics: 'Tip of the tongue curls upward to strike the apex of the hard palate (Mūrdhan), builds intra-oral pressure, and snaps forward like a drawn bowstring released.',
    acousticArrow: 'A swift, sharp, high-frequency sound wave projectile.'
  },
  {
    letterSa: 'ठ',
    letterIast: 'ṭha',
    phoneticName: 'Voiceless Aspirated Retroflex Stop',
    sanskritClass: 'अघोष महाप्राण',
    biomechanics: 'The retroflex palatal snap is immediately accompanied by an explosive burst of breath (Prāṇa), propelling acoustic energy with high kinetic velocity.',
    acousticArrow: 'An explosive shockwave arrow driven by compressed breath.'
  },
  {
    letterSa: 'ड',
    letterIast: 'ḍa',
    phoneticName: 'Voiced Unaspirated Retroflex Stop',
    sanskritClass: 'घोष अल्पप्राण',
    biomechanics: 'Vocal cords vibrate in resonance before and during the retroflex release, infusing the sound wave with deep harmonic weight.',
    acousticArrow: 'A heavy iron-tipped arrow with dense vocal resonance.'
  },
  {
    letterSa: 'ढ',
    letterIast: 'ḍha',
    phoneticName: 'Voiced Aspirated Retroflex Stop',
    sanskritClass: 'घोष महाप्राण',
    biomechanics: 'The most energetic retroflex stop: vocal cord vibration coupled with deep thoracic air projection upon the elastic palatal snap.',
    acousticArrow: 'A blazing siege arrow combining deep acoustic mass and velocity.'
  },
  {
    letterSa: 'ण',
    letterIast: 'ṇa',
    phoneticName: 'Voiced Retroflex Nasal',
    sanskritClass: 'घोष अनुनासिक',
    biomechanics: 'The tongue seals against the retroflex palate while the soft palate drops, directing acoustic sound waves through the nasal resonator chamber.',
    acousticArrow: 'A continuous, ringing harmonic drone that vibrates and lingers.'
  }
];

const VedicMaths: React.FC<VedicMathsProps> = ({
  onGoHome,
  onOpenReader,
  onOpenPhilosophy,
  onOpenGrammar,
  onOpenRegister,
  onOpenLogin,
  initialTab = 'sutras',
  initialAnchor,
  onOpenNumbers,
}) => {
  const { currentUser, isAdminLoggedIn, openAuthModal, openPaymentModal } = useAuthStore();
  const isSubscribed = hasPremiumAccess(currentUser, isAdminLoggedIn);
  const canDownload = canDownloadContent(currentUser, isAdminLoggedIn);

  const [activeTab, setActiveTab] = useState<VedicTab>(initialTab);
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'core' | 'domains' | 'heritage' | 'mastery'>('all');

  // Sub-Sutra Practice Worksheet States
  const [activeWorksheetSubSutraId, setActiveWorksheetSubSutraId] = useState<number | null>(null);
  const [wsUserAnswers, setWsUserAnswers] = useState<Record<string, string>>({});
  const [wsFeedback, setWsFeedback] = useState<Record<string, { isCorrect: boolean; checked: boolean }>>({});
  const [wsShowHints, setWsShowHints] = useState<Record<string, boolean>>({});
  const [wsShowSteps, setWsShowSteps] = useState<Record<string, boolean>>({});
  const [wsOverallScore, setWsOverallScore] = useState<Record<number, { score: number; total: number } | null>>({});
  const [wsIncludeAnswersInDownload, setWsIncludeAnswersInDownload] = useState(false);
  const [wsDownloadSuccessMsg, setWsDownloadSuccessMsg] = useState<string | null>(null);

  const handleUnlockWorksheet = () => {
    if (onOpenRegister) {
      onOpenRegister();
    } else {
      openAuthModal('register');
    }
  };

  const handleOpenLoginModal = () => {
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      openAuthModal('login');
    }
  };

  const normalizeAnswer = (str: string) => str.trim().toLowerCase().replace(/[, ]+/g, '');

  const handleCheckProblem = (problem: VedicSubSutraProblem) => {
    const userRaw = wsUserAnswers[problem.id] || '';
    const userClean = normalizeAnswer(userRaw);
    if (!userClean) return;

    let isCorrect = false;
    if (problem.acceptedAnswers && problem.acceptedAnswers.length > 0) {
      isCorrect = problem.acceptedAnswers.some((ans) => normalizeAnswer(ans) === userClean);
    } else {
      isCorrect = normalizeAnswer(problem.answer) === userClean;
    }

    setWsFeedback((prev) => ({
      ...prev,
      [problem.id]: { isCorrect, checked: true }
    }));
  };

  const handleCheckAllForSubSutra = (ws: VedicSubSutraWorksheet) => {
    let correctCount = 0;
    let totalChecked = 0;
    const newFeedback = { ...wsFeedback };

    ws.problems.forEach((problem, pIdx) => {
      if (!isSubscribed && pIdx > 0) return;

      totalChecked++;
      const userRaw = wsUserAnswers[problem.id] || '';
      const userClean = normalizeAnswer(userRaw);
      let isCorrect = false;
      if (userClean) {
        if (problem.acceptedAnswers && problem.acceptedAnswers.length > 0) {
          isCorrect = problem.acceptedAnswers.some((ans) => normalizeAnswer(ans) === userClean);
        } else {
          isCorrect = normalizeAnswer(problem.answer) === userClean;
        }
      }
      if (isCorrect) correctCount++;
      newFeedback[problem.id] = { isCorrect, checked: true };
    });

    setWsFeedback(newFeedback);
    setWsOverallScore((prev) => ({
      ...prev,
      [ws.subSutraId]: { score: correctCount, total: totalChecked }
    }));
  };

  const handleResetSubSutraWorksheet = (ws: VedicSubSutraWorksheet) => {
    const newAnswers = { ...wsUserAnswers };
    const newFeedback = { ...wsFeedback };
    const newHints = { ...wsShowHints };
    const newSteps = { ...wsShowSteps };

    ws.problems.forEach((p) => {
      delete newAnswers[p.id];
      delete newFeedback[p.id];
      delete newHints[p.id];
      delete newSteps[p.id];
    });

    setWsUserAnswers(newAnswers);
    setWsFeedback(newFeedback);
    setWsShowHints(newHints);
    setWsShowSteps(newSteps);
    setWsOverallScore((prev) => ({
      ...prev,
      [ws.subSutraId]: null
    }));
  };

  const handleToggleWorksheet = (subSutraId: number) => {
    setActiveWorksheetSubSutraId((prev) => (prev === subSutraId ? null : subSutraId));
  };

  const handleDownloadWorksheet = (ws: VedicSubSutraWorksheet) => {
    if (!canDownload) {
      if (openPaymentModal) {
        openPaymentModal();
      } else if (onOpenRegister) {
        onOpenRegister();
      } else {
        openAuthModal('register');
      }
      return;
    }

    const subSutra = VEDIC_SUBSUTRAS.find((s) => s.id === ws.subSutraId);
    const questionsHtml = ws.problems
      .map((p, idx) => {
        const answerBlock = wsIncludeAnswersInDownload
          ? `<div style="background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:0.6rem 0.8rem; margin-top:0.6rem; color:#166534; font-size:0.95rem;">
              <strong>✓ Vedic Answer:</strong> ${escapeHtml(p.answer)}<br/>
              <strong>⚡ Vedic Method Steps:</strong>
              <ol style="margin:0.4rem 0 0.4rem 1.2rem; padding:0;">
                ${p.solutionSteps.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
              </ol>
              <div style="font-size:0.85rem; color:#15803d; font-style:italic;">${escapeHtml(p.explanation)}</div>
            </div>`
          : `<div style="min-height:3rem; border-bottom:1px dotted #9ca3af; margin-top:1rem; margin-bottom:1rem;"></div>`;

        return `
          <div style="margin:1.25rem 0; padding-bottom:1rem; border-bottom:1px solid #e5e7eb;">
            <div style="font-size:1.05rem; font-weight:700; color:#1f2937;">
              Problem ${idx + 1}: ${escapeHtml(p.question)}
            </div>
            <div style="font-size:0.88rem; color:#6b7280; margin-top:0.25rem;">
              <em>Hint:</em> ${escapeHtml(p.hint)}
            </div>
            ${answerBlock}
          </div>
        `;
      })
      .join('');

    const bodyHtml = `
      <div style="font-family:'Noto Serif Devanagari', Georgia, serif; max-width:800px; margin:0 auto; padding:2rem; color:#1f2937;">
        <div style="border-bottom:2px solid #b45309; padding-bottom:1rem; margin-bottom:1.5rem; display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="font-size:0.85rem; text-transform:uppercase; letter-spacing:0.05em; color:#b45309; font-weight:800;">
              EdNet Learn Gurukul · Vedic Mathematics
            </div>
            <h1 style="font-size:1.6rem; margin:0.35rem 0; color:#78350f;">
              ${escapeHtml(ws.titleSa)}
            </h1>
            <div style="font-size:1.1rem; color:#374151; font-weight:600;">
              Sub-Sutra #${ws.subSutraId}: ${escapeHtml(ws.title)}
            </div>
            <div style="font-size:0.9rem; color:#6b7280; margin-top:0.25rem;">
              ${escapeHtml(ws.description)}
            </div>
          </div>
          <div style="text-align:right; font-size:0.85rem; color:#4b5563; min-width:180px;">
            <div>Level: <strong>${escapeHtml(ws.level)}</strong></div>
            <div>Target Time: <strong>${ws.targetTimeMinutes} mins</strong></div>
            ${wsIncludeAnswersInDownload ? '<div style="color:#059669; font-weight:700; margin-top:0.25rem;">Teacher Edition (Answer Key)</div>' : '<div style="color:#6b7280;">Student Worksheet</div>'}
          </div>
        </div>

        <div style="background:#fef3c7; border:1px solid #fde68a; border-radius:8px; padding:0.8rem 1rem; margin-bottom:1.5rem; font-size:0.9rem;">
          <div><strong>Sub-Sutra:</strong> ${escapeHtml(subSutra?.sanskrit || '')} (${escapeHtml(subSutra?.transliteration || '')})</div>
          <div><strong>Meaning:</strong> ${escapeHtml(subSutra?.meaning || '')}</div>
          <div><strong>Application:</strong> ${escapeHtml(subSutra?.application || '')}</div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; padding:0.5rem 0; border-bottom:1px dashed #d1d5db; font-size:0.95rem;">
          <div>Student Name: __________________________________</div>
          <div>Date: ____________________</div>
          <div>Score: _______ / ${ws.problems.length}</div>
        </div>

        <div>
          ${questionsHtml}
        </div>

        <div style="margin-top:2.5rem; padding-top:1rem; border-top:1px solid #e5e7eb; font-size:0.8rem; color:#6b7280; text-align:center;">
          EdNet Learn Gurukul Vedic Mathematics Practice Worksheets · care@ednetlearn.in · © ${new Date().getFullYear()}
        </div>
      </div>
    `;

    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(ws.title)} - Worksheet</title>
<style>
  @media print {
    body { margin: 0; padding: 0; }
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

    downloadBlob(`vedic-subsutra-${ws.subSutraId}-worksheet.html`, fullHtml);
    setWsDownloadSuccessMsg(`Downloaded Sub-Sutra #${ws.subSutraId} worksheet!`);
    setTimeout(() => setWsDownloadSuccessMsg(null), 4000);
  };

  // Solver States
  const [activeSolver, setActiveSolver] = useState<SolverKey>('ekadhikena');
  const [ekaInput, setEkaInput] = useState<number>(75);
  const [nikSubBase, setNikSubBase] = useState<number>(10000);
  const [nikSubNum, setNikSubNum] = useState<number>(3456);
  const [nikMulA, setNikMulA] = useState<number>(96);
  const [nikMulB, setNikMulB] = useState<number>(93);
  const [urdhvaA, setUrdhvaA] = useState<number>(23);
  const [urdhvaB, setUrdhvaB] = useState<number>(45);
  const [ekaNyunNum, setEkaNyunNum] = useState<number>(64);
  const [antyaA, setAntyaA] = useState<number>(43);
  const [antyaB, setAntyaB] = useState<number>(47);
  const [beejankA, setBeejankA] = useState<number>(23);
  const [beejankB, setBeejankB] = useState<number>(45);

  // Article Reader State
  const [selectedArticleId, setSelectedArticleId] = useState<string>('magic-intro');

  // Absolute Zero & Place Value States
  const [romanInputNum, setRomanInputNum] = useState<number>(3888);
  const [algebraConstA, setAlgebraConstA] = useState<number>(2);
  const [algebraConstB, setAlgebraConstB] = useState<number>(3);

  // Fluid Space States
  const [fluidNumA, setFluidNumA] = useState<number>(23);
  const [fluidNumB, setFluidNumB] = useState<number>(45);

  // Baudhāyana Geometric Studio States
  const [baudA, setBaudA] = useState<number>(3);
  const [baudB, setBaudB] = useState<number>(4);
  const [showBaudVyakarana, setShowBaudVyakarana] = useState<boolean>(true);

  // Dhanurveda & Ballistics Studio States
  const [dhanurStance, setDhanurStance] = useState<DhanurStanceKey>('alidha');
  const [dhanurDistA, setDhanurDistA] = useState<number>(40);
  const [dhanurElevB, setDhanurElevB] = useState<number>(15);
  const [activePhoneticLetter, setActivePhoneticLetter] = useState<string>('ṭa');

  // Historiography & Shaka Chronology States
  const [paramparaSubTab, setParamparaSubTab] = useState<'all' | 'historiography' | 'shaka-matrix' | 'lineage'>('all');
  const [shakaInputYear, setShakaInputYear] = useState<number>(520);
  const [chronoSearch, setChronoSearch] = useState<string>('');
  const [chronoFilter, setChronoFilter] = useState<string>('all');
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);
  const [selectedMathematicianId, setSelectedMathematicianId] = useState<string | null>(null);

  // Sutra Directory States
  const [sutraSearch, setSutraSearch] = useState('');
  const [sutraFilter, setSutraFilter] = useState<string>('all');

  // Quiz States
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Roman Numeral Helper
  const getRoman = (num: number): string => {
    if (num <= 0 || num > 3999) return 'Out of range (1–3999)';
    const lookup: [number, string][] = [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
    ];
    let res = '';
    let n = num;
    for (const [v, sym] of lookup) {
      while (n >= v) {
        res += sym;
        n -= v;
      }
    }
    return res;
  };

  // Filtered Sutras
  const filteredSutras = VEDIC_SUTRAS.filter((sutra) => {
    const matchesSearch =
      sutra.sanskrit.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.transliteration.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.meaning.toLowerCase().includes(sutraSearch.toLowerCase()) ||
      sutra.description.toLowerCase().includes(sutraSearch.toLowerCase());
    const matchesFilter = sutraFilter === 'all' || sutra.category === sutraFilter;
    return matchesSearch && matchesFilter;
  });

  // Display order follows the shared Numbers → Vedic Maths path, then the rest by number.
  const orderedSutras = [
    ...VEDIC_PATH_SUTRA_IDS.flatMap((id) => filteredSutras.filter((sutra) => sutra.id === id)),
    ...filteredSutras.filter((sutra) => !VEDIC_PATH_SUTRA_IDS.includes(sutra.id)),
  ];

  // ---- Anchor navigation (/vedic-maths#zero, #vedic-path, #sutra-<id>, #solver-<key>, #article-<slug>) ----
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const [flashId, setFlashId] = useState<string | null>(null);

  const goToAnchor = (anchor: string, updateUrl = true): boolean => {
    const clean = anchor.replace(/^#/, '');
    let scrollId: string;
    if (clean === 'zero') {
      setActiveTab('zero');
      scrollId = 'vedic-tabs';
    } else if (clean === 'vedic-path') {
      setActiveTab('sutras');
      scrollId = 'vedic-path';
    } else if (/^sutra-\d+$/.test(clean)) {
      const id = Number(clean.slice(6));
      if (!VEDIC_SUTRAS.some((s) => s.id === id)) return false;
      setActiveTab('sutras');
      setSutraFilter('all');
      setSutraSearch('');
      scrollId = clean;
    } else if (clean.startsWith('solver-')) {
      const key = clean.slice(7) as SolverKey;
      const keys: SolverKey[] = ['ekadhikena', 'nikhilam-sub', 'nikhilam-mul', 'urdhva', 'ekanyunena', 'antya', 'beejank'];
      if (!keys.includes(key)) return false;
      setActiveTab('solvers');
      setActiveSolver(key);
      scrollId = 'vedic-solver-layout';
    } else if (clean.startsWith('article-')) {
      const key = clean.slice(8);
      const article = VEDIC_ARTICLES.find((a) => a.slug === key || a.id === key);
      if (!article) return false;
      setActiveTab('articles');
      setSelectedArticleId(article.id);
      scrollId = 'vedic-article-card';
    } else if (clean === 'algebra') {
      setActiveTab('algebra');
      scrollId = 'vedic-tabs';
    } else if (clean === 'geometry') {
      setActiveTab('geometry');
      scrollId = 'vedic-tabs';
    } else if (clean === 'fluid') {
      setActiveTab('fluid');
      scrollId = 'vedic-tabs';
    } else if (clean === 'logic') {
      setActiveTab('logic');
      scrollId = 'vedic-tabs';
    } else if (clean === 'parampara') {
      setActiveTab('parampara');
      setParamparaSubTab('all');
      scrollId = 'vedic-tabs';
    } else if (clean === 'shaka-matrix' || clean === 'shaka-chronology') {
      setActiveTab('parampara');
      setParamparaSubTab('shaka-matrix');
      scrollId = 'shaka-matrix-section';
    } else if (clean === 'historiography') {
      setActiveTab('parampara');
      setParamparaSubTab('historiography');
      scrollId = 'historiography-section';
    } else if (clean === 'quiz') {
      setActiveTab('quiz');
      scrollId = 'vedic-tabs';
    } else if (clean === 'sutras') {
      setActiveTab('sutras');
      scrollId = 'vedic-tabs';
    } else if (clean === 'solvers') {
      setActiveTab('solvers');
      scrollId = 'vedic-tabs';
    } else if (clean === 'articles' || clean === 'essay') {
      setActiveTab('articles');
      scrollId = 'vedic-tabs';
    } else {
      return false;
    }
    if (updateUrl && typeof window !== 'undefined') {
      const { pathname, search } = window.location;
      window.history.replaceState(window.history.state, '', `${pathname}${search}#${clean}`);
    }
    setPendingScrollId(scrollId);
    return true;
  };

  // Open the anchor from the Numbers guide / search, or from the URL hash on load + hash changes.
  useEffect(() => {
    const fromHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialAnchor) goToAnchor(initialAnchor);
    else if (fromHash) goToAnchor(fromHash, false);
    const onHash = () => {
      const h = window.location.hash.replace(/^#/, '');
      if (h) goToAnchor(h, false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!pendingScrollId) return;
    const id = pendingScrollId;
    const raf = window.requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        if (id.startsWith('sutra-')) setFlashId(id);
      }
      setPendingScrollId(null);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [pendingScrollId, activeTab]);

  useEffect(() => {
    if (!flashId) return;
    const t = window.setTimeout(() => setFlashId(null), 2200);
    return () => window.clearTimeout(t);
  }, [flashId]);

  const onAnchorLink = (anchor: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (goToAnchor(anchor)) e.preventDefault();
  };

  // Digital Root (Beejank) Helper
  const getDigitalRoot = (n: number): number => {
    let sum = Math.abs(n);
    while (sum >= 10) {
      sum = sum
        .toString()
        .split('')
        .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return sum;
  };

  // Quiz Handlers
  const handleSelectOption = (opt: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(opt);
    setShowExplanation(true);
    const currentQ = VEDIC_QUIZ_QUESTIONS[quizIndex];
    if (opt === currentQ.correctAnswer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < VEDIC_QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // Current Article lookup
  const currentArticle = VEDIC_ARTICLES.find((a) => a.id === selectedArticleId) || VEDIC_ARTICLES[0];
  const currentArticleIdx = VEDIC_ARTICLES.findIndex((a) => a.id === currentArticle.id);
  const articleAnchor = (id: string): string => {
    const target = VEDIC_ARTICLES.find((a) => a.id === id);
    return `article-${target ? target.slug : id}`;
  };
  // Switching articles keeps an #article-<slug> URL in sync (other hashes are left alone).
  const selectArticle = (id: string) => {
    setSelectedArticleId(id);
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#article-')) {
      const { pathname, search } = window.location;
      window.history.replaceState(window.history.state, '', `${pathname}${search}#${articleAnchor(id)}`);
    }
  };

  return (
    <div className="vedic-maths-container">
      {/* Header & Navigation */}
      <header className="vedic-header">
        <div className="vedic-header-inner">
          <div className="vedic-breadcrumb">
            {onGoHome && (
              <button
                type="button"
                className="vedic-breadcrumb-btn"
                onClick={onGoHome}
                title="Return to Home page"
              >
                🏠 Deepakam · Home
              </button>
            )}
            <span className="vedic-breadcrumb-sep" aria-hidden="true">›</span>
            <span className="vedic-breadcrumb-current">📐 वैदिक-गणितम् (Vedic Mathematics)</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {onOpenPhilosophy && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onOpenPhilosophy}
                title="Our Philosophy · Darśana"
              >
                🪔 Darśana
              </button>
            )}
            {onOpenGrammar && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onOpenGrammar}
                title="Grammar Shelf · Kaṭapayādi & more"
              >
                📚 Grammar · Kaṭapayādi
              </button>
            )}
            {onOpenReader && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onOpenReader}
              >
                📖 NCERT Class 7 Lessons
              </button>
            )}
            {onGoHome && (
              <button
                type="button"
                className="vedic-header-nav-btn"
                onClick={onGoHome}
              >
                ← Back to Home
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="vedic-hero">
        <div className="vedic-invocation-badge">
          <span>॥ गणितं ब्रह्मज्ञानस्य सोपानम् ॥</span>
          <span>·</span>
          <span>16 Core Sutras &amp; 13 Sub-Sutras</span>
        </div>
        <h1 className="vedic-hero-title">
          <span className="vedic-hero-title-sa">वैदिक-गणितम्</span> · Vedic Mathematics
        </h1>
        <p className="vedic-hero-subtitle">
          The Magic of Numbers &amp; The Architecture of Absolute Zero: An ultra-efficient system of mental calculation that allows people to solve arithmetic and algebraic problems 10 to 15 times faster than conventional methods.
        </p>

        {onOpenNumbers && (
          <p className="vedic-numbers-start">
            <span aria-hidden="true">🔢</span> New here?{' '}
            <a
              href="/grammar"
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                e.preventDefault();
                onOpenNumbers();
              }}
            >
              Start from Numbers (संख्याः 0–100) →
            </a>{' '}
            <span className="vedic-numbers-start-sub">
              then follow the{' '}
              <a href="/vedic-maths#vedic-path" onClick={onAnchorLink('vedic-path')}>
                step-by-step path
              </a>
              .
            </span>
          </p>
        )}


        {/* Tab Navigation & Curriculum Track Guide */}
        <div className="vedic-curriculum-nav" id="vedic-tabs">
          {/* Quick Track Filter Bar */}
          <div className="vedic-track-filters" role="tablist" aria-label="Curriculum Tracks">
            <button
              type="button"
              className={`vedic-track-filter-btn${selectedTrack === 'all' ? ' active' : ''}`}
              onClick={() => setSelectedTrack('all')}
            >
              <span>🌟 Complete Curriculum</span>
              <span className="vedic-track-filter-count">10 Modules</span>
            </button>
            <button
              type="button"
              className={`vedic-track-filter-btn${selectedTrack === 'core' ? ' active' : ''}`}
              onClick={() => setSelectedTrack('core')}
            >
              <span>📜 1. Core Curriculum</span>
              <span className="vedic-track-filter-count">2</span>
            </button>
            <button
              type="button"
              className={`vedic-track-filter-btn${selectedTrack === 'domains' ? ' active' : ''}`}
              onClick={() => setSelectedTrack('domains')}
            >
              <span>📐 2. Domains</span>
              <span className="vedic-track-filter-count">3</span>
            </button>
            <button
              type="button"
              className={`vedic-track-filter-btn${selectedTrack === 'heritage' ? ' active' : ''}`}
              onClick={() => setSelectedTrack('heritage')}
            >
              <span>🏛️ 3. Heritage &amp; Logic</span>
              <span className="vedic-track-filter-count">3</span>
            </button>
            <button
              type="button"
              className={`vedic-track-filter-btn${selectedTrack === 'mastery' ? ' active' : ''}`}
              onClick={() => setSelectedTrack('mastery')}
            >
              <span>⚡ 4. Mastery &amp; Treatises</span>
              <span className="vedic-track-filter-count">2</span>
            </button>
          </div>

          {/* Grouped Tracks Grid */}
          <div className="vedic-tracks-grid">
            {(selectedTrack === 'all' || selectedTrack === 'core') && (
              <div className="vedic-track-card">
                <div className="vedic-track-header">
                  <div className="vedic-track-badge">Track 1 · आधारशिला</div>
                  <div className="vedic-track-title-wrap">
                    <h3 className="vedic-track-title">Core Curriculum &amp; Solvers</h3>
                    <span className="vedic-track-sa">मूलसूत्राणि साधनागारं च</span>
                  </div>
                  <p className="vedic-track-desc">Foundational 16 canonical aphorisms, 13 sub-sutras, learning path &amp; mental math lab.</p>
                </div>
                <div className="vedic-track-btns">
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'sutras' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('sutras');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">1</span>
                    <span className="vedic-tab-icon" aria-hidden="true">📜</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">16 Sūtras &amp; Learning Path</span>
                      <span className="vedic-tab-sub">Foundations · Path · Worksheets</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'solvers' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('solvers');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">2</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🧮</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Interactive Solvers Studio</span>
                      <span className="vedic-tab-sub">7 Mental Math Calculators</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {(selectedTrack === 'all' || selectedTrack === 'domains') && (
              <div className="vedic-track-card">
                <div className="vedic-track-header">
                  <div className="vedic-track-badge">Track 2 · प्रयोगाः</div>
                  <div className="vedic-track-title-wrap">
                    <h3 className="vedic-track-title">Universal Applications</h3>
                    <span className="vedic-track-sa">बीजगणितं शुल्बसूत्राणि च</span>
                  </div>
                  <p className="vedic-track-desc">Vedic algebra, Baudhayana geometric constructions, and cognitive fluid calculation streams.</p>
                </div>
                <div className="vedic-track-btns">
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'algebra' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('algebra');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">3</span>
                    <span className="vedic-tab-icon" aria-hidden="true">📐</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Universal Algebra Engine</span>
                      <span className="vedic-tab-sub">Vilokanam &amp; Parāvartya</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'geometry' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('geometry');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">4</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🔺</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Vedic Geometry &amp; Śulba</span>
                      <span className="vedic-tab-sub">Baudhāyana · Altars · Pi</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'fluid' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('fluid');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">5</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🌊</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Fluid Space &amp; Mental Math</span>
                      <span className="vedic-tab-sub">Visual Grid &amp; Parallel Streams</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {(selectedTrack === 'all' || selectedTrack === 'heritage') && (
              <div className="vedic-track-card">
                <div className="vedic-track-header">
                  <div className="vedic-track-badge">Track 3 · दर्शनम्</div>
                  <div className="vedic-track-title-wrap">
                    <h3 className="vedic-track-title">Heritage &amp; Epistemology</h3>
                    <span className="vedic-track-sa">शून्यं तर्कशास्त्रं परम्परा च</span>
                  </div>
                  <p className="vedic-track-desc">The invention of zero, formal logic, Paninian computational linguistics, and unbroken lineage.</p>
                </div>
                <div className="vedic-track-btns">
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'zero' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('zero');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">6</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🪐</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">The Numerical Grid &amp; Zero</span>
                      <span className="vedic-tab-sub">Śūnya &amp; Positional Notation</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'logic' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('logic');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">7</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🗣️</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Logic &amp; Language (AI)</span>
                      <span className="vedic-tab-sub">Nyāya · Kaṭapayādi · NASA AI</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'parampara' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('parampara');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">8</span>
                    <span className="vedic-tab-icon" aria-hidden="true">🕉️</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Guru Paramparā &amp; Lineage</span>
                      <span className="vedic-tab-sub">Āryabhaṭa to Bhāratī Kṛṣṇa</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {(selectedTrack === 'all' || selectedTrack === 'mastery') && (
              <div className="vedic-track-card">
                <div className="vedic-track-header">
                  <div className="vedic-track-badge">Track 4 · अभ्यासः</div>
                  <div className="vedic-track-title-wrap">
                    <h3 className="vedic-track-title">Mastery &amp; Treatises</h3>
                    <span className="vedic-track-sa">अभ्यासपरीक्षा सिद्धान्तमञ्जरी</span>
                  </div>
                  <p className="vedic-track-desc">Speed math self-assessment quiz and 6 illustrated academic masterclasses with historical manuscripts.</p>
                </div>
                <div className="vedic-track-btns">
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'quiz' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('quiz');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">9</span>
                    <span className="vedic-tab-icon" aria-hidden="true">⚡</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Speed Math Challenge</span>
                      <span className="vedic-tab-sub">Timed Quiz &amp; Mastery Check</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    className={`vedic-tab-btn${activeTab === 'articles' || activeTab === 'essay' ? ' active' : ''}`}
                    onClick={() => {
                      setActiveTab('articles');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <span className="vedic-tab-num">10</span>
                    <span className="vedic-tab-icon" aria-hidden="true">📖</span>
                    <div className="vedic-tab-content">
                      <span className="vedic-tab-title">Articles Masterclass</span>
                      <span className="vedic-tab-sub">6 Illustrated Treatises</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="vedic-content-wrap">

        {activeTab === 'sutras' && (
          <div>
            {/* Official 16 Foundational Sutras Poster Banner */}
            <div className="vedic-poster-banner" style={{ marginTop: '0.5rem' }}>
              <div
                className="vedic-poster-thumb-wrap"
                onClick={() => setIsPosterModalOpen(true)}
                title="Click to view full-size poster"
              >
                <img
                  src="/vedic-sutras-poster-v3.webp"
                  alt="EdNet Learn poster: the 16 Vedic Mathematics sutras of Swami Bharati Krishna Tirtha in standard order (Ekādhikena Pūrveṇa to Guṇakasamuccayaḥ), each with Sanskrit name, IAST, English meaning, use and a worked example"
                  className="vedic-poster-thumb-img"
                />
              </div>
              <div className="vedic-poster-content">
                <span className="vedic-poster-badge">✦ Official Academy Wall Poster ✦</span>
                <h3 className="vedic-poster-title">16 Foundational Sutras of Vedic Mathematics</h3>
                <p className="vedic-poster-quote">
                  "Vedic Mathematics is not just a method, it is a way of thinking."
                </p>
                <p className="vedic-poster-desc">
                  The complete 16 sutras with Sanskrit aphorisms, English translations, and worked arithmetic &amp; algebraic examples for rapid mental calculation (Ekādhikena, Nikhilam, Ūrdhva-Tiryagbhyām, Parāvartya, and more).
                </p>
                <div className="vedic-poster-actions">
                  <button
                    type="button"
                    className="vedic-poster-btn-primary"
                    onClick={() => setIsPosterModalOpen(true)}
                  >
                    <span>🔍</span>
                    <span>View Full Poster</span>
                  </button>
                  <a
                    href="/vedic-sutras-poster-v3.png"
                    download="EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.png"
                    className="vedic-poster-btn-secondary"
                  >
                    <span>📥</span>
                    <span>Download High-Res (PNG)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Practical Starting Path Card */}
            <div className="vedic-starting-path-card">
              <div className="vedic-path-badge">🎯 Recommended 4-Step Learning Sequence</div>
              <h3>A Practical Starting Path with the 16 Sutras</h3>
              <ol className="vedic-path-steps">
                <li>
                  <strong>Pick 2–3 Frequent Sutras:</strong> Start with sutras that solve problems you actually encounter often — e.g., <em>Nikhilaṁ Navataścaramam</em> for multiplication near powers of 10, or <em>Dvandva / Ekādhikena</em> for squaring numbers ending in 5.
                </li>
                <li>
                  <strong>Watch a Video Walkthrough:</strong> Focus on just those 2–3 sutras on YouTube to absorb the visual cross-multiplication or base-complement patterns with worked examples.
                </li>
                <li>
                  <strong>Drill 10–15 Problems Daily:</strong> Pair sutra techniques with a free timed mental-math test site (5 minutes a day) until the calculation pattern becomes automatic.
                </li>
                <li>
                  <strong>Add One New Sutra per Week:</strong> Expand gradually through the remaining 14 sutras rather than trying to absorb all 16 at once.
                </li>
              </ol>
            </div>

            <VedicLearningPath
              id="vedic-path"
              heading="🧭 Step-by-step path: Numbers → Vedic Maths (Classes 6–8)"
              intro="The sutra cards below follow this same order. Start at Step 1 and use ← Previous / Next → on each card."
              onOpen={(anchor, e) => {
                if (goToAnchor(anchor)) e.preventDefault();
              }}
            />

            <div className="sutra-search-bar">
              <input
                type="text"
                className="sutra-search-input"
                placeholder="🔍 Search sutra by Sanskrit name, English meaning, or formula..."
                value={sutraSearch}
                onChange={(e) => setSutraSearch(e.target.value)}
              />

              <div className="sutra-filter-chips">
                {[
                  { id: 'all', label: 'All (16)' },
                  { id: 'multiplication', label: '✖️ Multiplication' },
                  { id: 'squaring', label: '² Squaring' },
                  { id: 'subtraction', label: '➖ Subtraction' },
                  { id: 'division', label: '➗ Division' },
                  { id: 'algebra', label: '📐 Algebra' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    className={`sutra-filter-chip${sutraFilter === chip.id ? ' active' : ''}`}
                    onClick={() => setSutraFilter(chip.id)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sutras-grid">
              {orderedSutras.map((sutra: VedicSutra) => {
                const stepIdx = vedicPathIndex(`sutra-${sutra.id}`);
                const prevStep = stepIdx > 0 ? VEDIC_LEARNING_PATH[stepIdx - 1] : null;
                const nextStep = stepIdx >= 0 && stepIdx < VEDIC_LEARNING_PATH.length - 1 ? VEDIC_LEARNING_PATH[stepIdx + 1] : null;
                const pathStep = stepIdx >= 0 ? VEDIC_LEARNING_PATH[stepIdx] : null;
                return (
                <div
                  key={sutra.id}
                  id={`sutra-${sutra.id}`}
                  className={`sutra-card${flashId === `sutra-${sutra.id}` ? ' sutra-card--flash' : ''}`}
                >
                  {pathStep && (
                    <div className="sutra-step-tag">
                      Step {stepIdx + 1} of {VEDIC_LEARNING_PATH.length}
                    </div>
                  )}
                  <div className="sutra-card-top">
                    <div className="sutra-card-badge-row">
                      <span className="sutra-card-num">Sutra {sutra.id}</span>
                      <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={() => playPronunciation(sutra.sanskrit)}
                          title="Listen to Sanskrit pronunciation"
                          style={{
                            background: '#fef3c7',
                            border: '1px solid #fde68a',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            padding: '0.15rem 0.45rem'
                          }}
                        >
                          🔊
                        </button>
                        <span className="sutra-card-cat">{sutra.category}</span>
                      </div>
                    </div>

                    <h3 className="sutra-card-sanskrit">{sutra.sanskrit}</h3>
                    <p className="sutra-card-iast">{sutra.transliteration}</p>
                    <p className="sutra-card-meaning">&ldquo;{sutra.meaning}&rdquo;</p>
                    <p className="sutra-card-desc">{sutra.description}</p>
                  </div>

                  <div className="sutra-card-example">
                    <div className="sutra-card-example-title">💡 Example: {sutra.example.problem}</div>
                    <ul className="sutra-card-example-steps">
                      {sutra.example.steps.map((st, sIdx) => (
                        <li key={sIdx}>{st}</li>
                      ))}
                    </ul>
                    <div className="sutra-card-example-ans">➔ Answer: {sutra.example.answer}</div>
                  </div>

                  {pathStep && (
                    <nav className="sutra-step-nav" aria-label={`Learning path step ${stepIdx + 1}`}>
                      {prevStep ? (
                        <a href={`/vedic-maths#${prevStep.anchor}`} onClick={onAnchorLink(prevStep.anchor)} className="sutra-step-nav-link">
                          ← Previous: {prevStep.title}
                        </a>
                      ) : (
                        <span />
                      )}
                      {pathStep.solver && (
                        <a href={`/vedic-maths#solver-${pathStep.solver}`} onClick={onAnchorLink(`solver-${pathStep.solver}`)} className="sutra-step-nav-link sutra-step-nav-link--try">
                          ▶ Try it
                        </a>
                      )}
                      {nextStep ? (
                        <a href={`/vedic-maths#${nextStep.anchor}`} onClick={onAnchorLink(nextStep.anchor)} className="sutra-step-nav-link sutra-step-nav-link--next">
                          Next: {nextStep.title} →
                        </a>
                      ) : (
                        <span className="sutra-step-nav-done">🎉 Path complete — explore the other sutras below</span>
                      )}
                    </nav>
                  )}
                </div>
                );
              })}
            </div>

            {/* Sub-Sutras Section with Subscription Practice Worksheets */}
            <div className="subsutras-section">
              <div className="subsutras-header-intro">
                <h2 className="subsutras-title">त्रयोदश उपसूत्राणि · 13 Sub-Sutras (Upa-Sutras)</h2>
                <p className="subsutras-subtitle">
                  Corollaries that extend the 16 primary sutras into specialized domains such as proportion, divisibility osculation, and factor reduction. Each sub-sutra now includes a dedicated <strong>Online Practice Worksheet</strong> with live algorithmic verification!
                </p>
              </div>

              {/* Sub-Sutras Navigation Bar & Member Status */}
              <div className="subsutras-header-banner">
                <div className="subsutras-status-row">
                  {isSubscribed ? (
                    <div className="subsutras-member-chip active">
                      <span className="chip-icon">👑</span>
                      <span><strong>Gurukul Member Active:</strong> All 13 Sub-Sutra Interactive Worksheets Unlocked</span>
                    </div>
                  ) : (
                    <div className="subsutras-member-chip preview">
                      <span className="chip-icon">⭐</span>
                      <span>
                        <strong>Member Preview Mode:</strong> Problem 1 open on each Sub-Sutra.
                      </span>
                      <button
                        type="button"
                        className="subsutras-header-subscribe-btn"
                        onClick={handleUnlockWorksheet}
                      >
                        Unlock All 13 Worksheets
                      </button>
                    </div>
                  )}
                </div>

                <div className="subsutras-quick-select-wrap">
                  <span className="subsutras-quick-label">⚡ Jump to Practice Worksheet:</span>
                  <div className="subsutras-quick-pills">
                    {VEDIC_SUBSUTRAS.map((sub) => (
                      <button
                        key={sub.id}
                        type="button"
                        className={`subsutras-quick-pill ${activeWorksheetSubSutraId === sub.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveWorksheetSubSutraId(sub.id);
                          setTimeout(() => {
                            const el = document.getElementById(`subsutra-ws-${sub.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }, 100);
                        }}
                      >
                        #{sub.id} {sub.transliteration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="subsutras-table-wrap">
                <table className="subsutras-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>No.</th>
                      <th>उपसूत्रम् (Sanskrit)</th>
                      <th>Transliteration</th>
                      <th>English Meaning</th>
                      <th>Mathematical Application</th>
                      <th style={{ width: '150px' }}>Online Practice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VEDIC_SUBSUTRAS.map((sub) => (
                      <React.Fragment key={sub.id}>
                        <tr className={`subsutra-table-row ${activeWorksheetSubSutraId === sub.id ? 'active-row' : ''}`}>
                          <td><strong>#{sub.id}</strong></td>
                          <td style={{ fontWeight: 700, color: '#78350f', fontFamily: "'Noto Serif Devanagari', serif" }}>
                            {sub.sanskrit}
                          </td>
                          <td style={{ fontStyle: 'italic', color: '#4b5563' }}>{sub.transliteration}</td>
                          <td style={{ fontWeight: 600 }}>{sub.meaning}</td>
                          <td style={{ color: '#4b5563' }}>{sub.application}</td>
                          <td>
                            <button
                              type="button"
                              className={`subsutra-open-ws-btn ${activeWorksheetSubSutraId === sub.id ? 'active' : ''}`}
                              onClick={() => handleToggleWorksheet(sub.id)}
                              title={`Open Practice Worksheet for Sub-Sutra #${sub.id}`}
                            >
                              {activeWorksheetSubSutraId === sub.id ? 'Close Sheet ▲' : '📝 Practice Sheet ▼'}
                            </button>
                          </td>
                        </tr>

                        {activeWorksheetSubSutraId === sub.id && (() => {
                          const ws = VEDIC_SUBSUTRA_WORKSHEETS.find((w) => w.subSutraId === sub.id);
                          if (!ws) return null;
                          const scoreInfo = wsOverallScore[ws.subSutraId];

                          return (
                            <tr className="subsutra-ws-drawer-tr">
                              <td colSpan={6}>
                                <div className="subsutra-ws-drawer-content" id={`subsutra-ws-${sub.id}`}>
                                  {/* Worksheet Card Header */}
                                  <div className="subsutra-ws-card-header">
                                    <div className="subsutra-ws-header-left">
                                      <div className="subsutra-ws-tag-row">
                                        <span className="subsutra-ws-num-badge">Sub-Sutra #{sub.id}</span>
                                        <span className="subsutra-ws-level-badge">{ws.level}</span>
                                        <span className="subsutra-ws-time-badge">⏱️ {ws.targetTimeMinutes} mins</span>
                                        {isSubscribed ? (
                                          <span className="subsutra-ws-access-badge member">👑 Gurukul Member Access</span>
                                        ) : (
                                          <span className="subsutra-ws-access-badge trial">⭐ Free Preview Mode (Problem 1 Open)</span>
                                        )}
                                      </div>
                                      <h3 className="subsutra-ws-title">
                                        {ws.titleSa} · {ws.title}
                                      </h3>
                                      <p className="subsutra-ws-description">{ws.description}</p>
                                    </div>

                                    <div className="subsutra-ws-header-actions">
                                      <label className="subsutra-ws-download-toggle">
                                        <input
                                          type="checkbox"
                                          checked={wsIncludeAnswersInDownload}
                                          onChange={(e) => setWsIncludeAnswersInDownload(e.target.checked)}
                                        />
                                        <span>Include Answer Key in Download</span>
                                      </label>
                                      <button
                                        type="button"
                                        className="subsutra-ws-download-btn"
                                        onClick={() => handleDownloadWorksheet(ws)}
                                        title={canDownload ? "Download printable HTML/PDF worksheet" : "Upgrade to download printable worksheet"}
                                      >
                                        📥 Download Printable Sheet
                                      </button>
                                      {wsDownloadSuccessMsg && (
                                        <div className="subsutra-ws-download-toast">
                                          ✓ {wsDownloadSuccessMsg}
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Problems List */}
                                  <div className="subsutra-problems-list">
                                    {ws.problems.map((problem, pIdx) => {
                                      const isLocked = !isSubscribed && pIdx > 0;
                                      const feedback = wsFeedback[problem.id];
                                      const hintShown = !!wsShowHints[problem.id];
                                      const stepsShown = !!wsShowSteps[problem.id];
                                      const userVal = wsUserAnswers[problem.id] || '';

                                      if (isLocked) {
                                        return (
                                          <div key={problem.id} className="subsutra-problem-card locked">
                                            <div className="subsutra-locked-ribbon">
                                              <span className="subsutra-lock-icon">🔒</span>
                                              <span>Gurukul Member Problem #{pIdx + 1}</span>
                                            </div>
                                            <div className="subsutra-locked-body">
                                              <h4 className="subsutra-locked-title">
                                                Problem {pIdx + 1}: {problem.question.split('(')[0]}...
                                              </h4>
                                              <p className="subsutra-locked-text">
                                                This interactive worksheet drill, its step-by-step Vedic solution algorithms, and score tracking are available with a Gurukul Subscription or Free Trial.
                                              </p>
                                              <div className="subsutra-locked-btns">
                                                <button
                                                  type="button"
                                                  className="subsutra-unlock-btn"
                                                  onClick={handleUnlockWorksheet}
                                                >
                                                  ⭐ Unlock All 13 Sub-Sutra Worksheets
                                                </button>
                                                <button
                                                  type="button"
                                                  className="subsutra-login-link-btn"
                                                  onClick={handleOpenLoginModal}
                                                >
                                                  Already a Member? Sign In
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }

                                      return (
                                        <div
                                          key={problem.id}
                                          className={`subsutra-problem-card ${
                                            feedback?.checked
                                              ? feedback.isCorrect
                                                ? 'problem-correct'
                                                : 'problem-incorrect'
                                              : ''
                                          }`}
                                        >
                                          <div className="subsutra-problem-card-top">
                                            <div className="subsutra-problem-index">
                                              <span className="subsutra-q-badge">Problem {pIdx + 1}</span>
                                              {!isSubscribed && pIdx === 0 && (
                                                <span className="subsutra-free-pill">Free Interactive Preview</span>
                                              )}
                                            </div>
                                            <div className="subsutra-problem-tools">
                                              <button
                                                type="button"
                                                className={`subsutra-tool-btn ${hintShown ? 'active' : ''}`}
                                                onClick={() =>
                                                  setWsShowHints((prev) => ({
                                                    ...prev,
                                                    [problem.id]: !hintShown
                                                  }))
                                                }
                                              >
                                                💡 {hintShown ? 'Hide Hint' : 'Hint'}
                                              </button>
                                              <button
                                                type="button"
                                                className={`subsutra-tool-btn ${stepsShown ? 'active' : ''}`}
                                                onClick={() =>
                                                  setWsShowSteps((prev) => ({
                                                    ...prev,
                                                    [problem.id]: !stepsShown
                                                  }))
                                                }
                                              >
                                                ⚡ {stepsShown ? 'Hide Vedic Steps' : 'Vedic Steps'}
                                              </button>
                                            </div>
                                          </div>

                                          <div className="subsutra-problem-question">
                                            {problem.question}
                                          </div>

                                          {hintShown && (
                                            <div className="subsutra-hint-card">
                                              <strong>💡 Vedic Hint:</strong> {problem.hint}
                                            </div>
                                          )}

                                          {/* Input & Action Area */}
                                          <div className="subsutra-problem-input-group">
                                            <input
                                              type="text"
                                              className={`subsutra-problem-input ${
                                                feedback?.checked
                                                  ? feedback.isCorrect
                                                    ? 'input-success'
                                                    : 'input-error'
                                                  : ''
                                              }`}
                                              placeholder="Enter your calculation answer..."
                                              value={userVal}
                                              onChange={(e) =>
                                                setWsUserAnswers((prev) => ({
                                                  ...prev,
                                                  [problem.id]: e.target.value
                                                }))
                                              }
                                              onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                  handleCheckProblem(problem);
                                                }
                                              }}
                                            />
                                            <button
                                              type="button"
                                              className="subsutra-check-answer-btn"
                                              onClick={() => handleCheckProblem(problem)}
                                              disabled={!userVal.trim()}
                                            >
                                              Check Answer
                                            </button>
                                          </div>

                                          {/* Feedback pill */}
                                          {feedback?.checked && (
                                            <div
                                              className={`subsutra-feedback-banner ${
                                                feedback.isCorrect ? 'banner-correct' : 'banner-incorrect'
                                              }`}
                                            >
                                              {feedback.isCorrect ? (
                                                <span>✓ उत्तमोत्तमम्! Correct answer ({problem.answer}). Great Vedic calculation!</span>
                                              ) : (
                                                <span>
                                                  ✗ Not quite ({userVal || 'no answer'}). Check the hint or view the Vedic steps!
                                                </span>
                                              )}
                                            </div>
                                          )}

                                          {/* Step-by-Step Vedic Method */}
                                          {stepsShown && (
                                            <div className="subsutra-solution-steps-card">
                                              <div className="subsutra-steps-header">
                                                <strong>⚡ Step-by-Step Vedic Algorithmic Solution:</strong>
                                                <span className="subsutra-steps-ans">
                                                  Answer: <strong>{problem.answer}</strong>
                                                </span>
                                              </div>
                                              <ol className="subsutra-steps-ol">
                                                {problem.solutionSteps.map((step, sIndex) => (
                                                  <li key={sIndex}>{step}</li>
                                                ))}
                                              </ol>
                                              <p className="subsutra-steps-explanation">
                                                <em>{problem.explanation}</em>
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Worksheet Card Footer */}
                                  <div className="subsutra-ws-card-footer">
                                    <div className="subsutra-ws-footer-score">
                                      {scoreInfo ? (
                                        <span className="subsutra-score-pill">
                                          🎯 Score: <strong>{scoreInfo.score} / {scoreInfo.total}</strong> (
                                          {Math.round((scoreInfo.score / scoreInfo.total) * 100)}%)
                                          {scoreInfo.score === scoreInfo.total ? ' 🌟 Adbhutam!' : ' Keep practicing!'}
                                        </span>
                                      ) : (
                                        <span className="subsutra-unscored-pill">
                                          {isSubscribed
                                            ? 'Fill your answers and click Check All'
                                            : 'Solve Problem 1 or Subscribe for all 3 problems'}
                                        </span>
                                      )}
                                    </div>
                                    <div className="subsutra-ws-footer-actions">
                                      <button
                                        type="button"
                                        className="subsutra-check-all-btn"
                                        onClick={() => handleCheckAllForSubSutra(ws)}
                                      >
                                        ✓ Check All Answers
                                      </button>
                                      <button
                                        type="button"
                                        className="subsutra-reset-btn"
                                        onClick={() => handleResetSubSutraWorksheet(ws)}
                                      >
                                        🔄 Reset Sheet
                                      </button>
                                      <button
                                        type="button"
                                        className="subsutra-close-btn"
                                        onClick={() => setActiveWorksheetSubSutraId(null)}
                                      >
                                        ✕ Close Sheet
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })()}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* NEXT CHAPTER ROADMAP CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 1</span>
                <h3 className="vedic-next-track-title">Step 2: Mental Math Solvers Studio</h3>
                <p className="vedic-next-track-desc">
                  Now that you have explored the 16 core aphorisms and sub-sūtras, see them in real-time action! Test Ekādhikena, Nikhilam, and Ūrdhva-Tiryagbhyām with live interactive calculators and step-by-step traces.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('solvers');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🧮 Launch Interactive Solvers Studio →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('quiz');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ⚡ Take Speed Math Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solvers' && (
          <div>
          <div className="solver-layout" id="vedic-solver-layout">
            {/* Sidebar with Solver Methods */}
            <aside className="solver-sidebar">
              <h3 className="solver-sidebar-title">⚡ Vedic Techniques</h3>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'ekadhikena' ? ' active' : ''}`}
                onClick={() => setActiveSolver('ekadhikena')}
              >
                <span className="solver-menu-sa">१. एकाधिकेन पूर्वेण</span>
                <span className="solver-menu-en">Squaring numbers ending in 5 (75²)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'nikhilam-sub' ? ' active' : ''}`}
                onClick={() => setActiveSolver('nikhilam-sub')}
              >
                <span className="solver-menu-sa">२. निखिलम् (घटनम्)</span>
                <span className="solver-menu-en">All from 9, last from 10 (Subtraction)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'nikhilam-mul' ? ' active' : ''}`}
                onClick={() => setActiveSolver('nikhilam-mul')}
              >
                <span className="solver-menu-sa">३. निखिलम् (गुणनम्)</span>
                <span className="solver-menu-en">Base multiplication near 100 (96 × 93)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'urdhva' ? ' active' : ''}`}
                onClick={() => setActiveSolver('urdhva')}
              >
                <span className="solver-menu-sa">४. ऊर्ध्वतिर्यग्भ्याम्</span>
                <span className="solver-menu-en">Universal 2-digit multiplication</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'ekanyunena' ? ' active' : ''}`}
                onClick={() => setActiveSolver('ekanyunena')}
              >
                <span className="solver-menu-sa">५. एकन्यूनेन पूर्वेण</span>
                <span className="solver-menu-en">Lightning multiplication by 99 or 999</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'antya' ? ' active' : ''}`}
                onClick={() => setActiveSolver('antya')}
              >
                <span className="solver-menu-sa">६. अन्त्ययोर्दशकेऽपि</span>
                <span className="solver-menu-en">Units sum to 10, tens equal (43 × 47)</span>
              </button>

              <button
                type="button"
                className={`solver-menu-btn${activeSolver === 'beejank' ? ' active' : ''}`}
                onClick={() => setActiveSolver('beejank')}
              >
                <span className="solver-menu-sa">७. बीजाङ्क (Digital Root)</span>
                <span className="solver-menu-en">Guṇitasamuccayaḥ Verification Check</span>
              </button>
            </aside>

            {/* Main Interactive Solver Card */}
            <section className="solver-card">
              {/* Method 1: Ekadhikena Purvena */}
              {activeSolver === 'ekadhikena' && (() => {
                const prev = Math.floor(ekaInput / 10);
                const left = prev * (prev + 1);
                const right = 25;
                const result = left * 100 + right;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १ · Ekādhikena Pūrveṇa</span>
                      <h2 className="solver-title">एकाधिकेन पूर्वेण — By One More Than the Previous One</h2>
                      <p className="solver-meaning">
                        Effortlessly square any number ending in 5 in under 2 seconds without paper calculations.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[25, 35, 65, 75, 85, 95, 105, 115].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`solver-preset-chip${ekaInput === val ? ' active' : ''}`}
                          onClick={() => setEkaInput(val)}
                        >
                          {val}²
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="eka-input">Number ending in 5:</label>
                        <input
                          id="eka-input"
                          type="number"
                          step="10"
                          value={ekaInput}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10) || 5;
                            setEkaInput(Math.floor(val / 10) * 10 + 5);
                          }}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Multiply previous digit by (digit + 1)</div>
                            <div className="solver-step-calc">
                              {prev} × ({prev} + 1) = {prev} × {prev + 1} = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Always 5² = 25</div>
                            <div className="solver-step-calc">
                              5² = <strong>25</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Combine Left &amp; Right Halves</div>
                            <div className="solver-step-calc">
                              {left} | 25 = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{ekaInput}² Calculation Result</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 2: Nikhilam Subtraction */}
              {activeSolver === 'nikhilam-sub' && (() => {
                const baseStr = nikSubBase.toString();
                const numStr = nikSubNum.toString().padStart(baseStr.length - 1, '0');
                const diff = nikSubBase - nikSubNum;
                const digits = numStr.split('').map((d) => parseInt(d, 10));

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् २ · Nikhilaṁ Navataścaramaṁ Daśataḥ</span>
                      <h2 className="solver-title">निखिलं नवतश्चरमं दशतः — All from 9 and the Last from 10</h2>
                      <p className="solver-meaning">
                        Subtract from 100, 1,000, 10,000, etc., directly from left to right with zero borrowing or carrying!
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { base: 1000, num: 348 },
                        { base: 10000, num: 3456 },
                        { base: 10000, num: 4372 },
                        { base: 100000, num: 48273 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${nikSubBase === item.base && nikSubNum === item.num ? ' active' : ''}`}
                          onClick={() => {
                            setNikSubBase(item.base);
                            setNikSubNum(item.num);
                          }}
                        >
                          {item.base} − {item.num}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="niksub-base">Base (Power of 10):</label>
                        <select
                          id="niksub-base"
                          value={nikSubBase}
                          onChange={(e) => setNikSubBase(parseInt(e.target.value, 10))}
                          style={{
                            padding: '0.5rem 0.8rem',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            border: '2px solid #e5e7eb'
                          }}
                        >
                          <option value={100}>100 (10²)</option>
                          <option value={1000}>1,000 (10³)</option>
                          <option value={10000}>10,000 (10⁴)</option>
                          <option value={100000}>100,000 (10⁵)</option>
                        </select>
                      </div>

                      <div className="solver-input-group">
                        <label htmlFor="niksub-num">Number to Subtract:</label>
                        <input
                          id="niksub-num"
                          type="number"
                          max={nikSubBase - 1}
                          min={1}
                          value={nikSubNum}
                          onChange={(e) => setNikSubNum(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">All Leading Digits from 9:</div>
                            <div className="solver-step-calc">
                              {digits.slice(0, -1).map((d, i) => (
                                <span key={i} style={{ marginRight: '1rem' }}>
                                  9 − {d} = <strong>{9 - d}</strong>
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">The Very Last Digit from 10:</div>
                            <div className="solver-step-calc">
                              10 − {digits[digits.length - 1]} = <strong>{10 - digits[digits.length - 1]}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Read Seamlessly from Left to Right</div>
                            <div className="solver-step-calc">
                              Answer: <strong>{diff.toLocaleString()}</strong> (no borrowing across zeroes!)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{nikSubBase} − {nikSubNum}</span>
                      <span className="solver-result-val">{diff.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 3: Nikhilam Multiplication near Base 100 */}
              {activeSolver === 'nikhilam-mul' && (() => {
                const base = 100;
                const devA = nikMulA - base;
                const devB = nikMulB - base;
                const left = nikMulA + devB;
                const right = devA * devB;
                const result = left * 100 + right;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् २ · Nikhilaṁ Base Multiplication</span>
                      <h2 className="solver-title">निखिलं गुणनम् — Base 100 Multiplication</h2>
                      <p className="solver-meaning">
                        Cross-subtract deficiencies or add surpluses, multiply deviations, and combine!
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 96, b: 93 },
                        { a: 98, b: 97 },
                        { a: 95, b: 92 },
                        { a: 104, b: 107 },
                        { a: 103, b: 106 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${nikMulA === item.a && nikMulB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setNikMulA(item.a);
                            setNikMulB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="nikmul-a">Number 1 (near 100):</label>
                        <input
                          id="nikmul-a"
                          type="number"
                          value={nikMulA}
                          onChange={(e) => setNikMulA(parseInt(e.target.value, 10) || 100)}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="nikmul-b">Number 2 (near 100):</label>
                        <input
                          id="nikmul-b"
                          type="number"
                          value={nikMulB}
                          onChange={(e) => setNikMulB(parseInt(e.target.value, 10) || 100)}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Find Deviations from Base 100</div>
                            <div className="solver-step-calc">
                              {nikMulA} has deviation {devA >= 0 ? `+${devA}` : devA}, and {nikMulB} has deviation {devB >= 0 ? `+${devB}` : devB}
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Cross-Add/Subtract Deviation</div>
                            <div className="solver-step-calc">
                              {nikMulA} + ({devB}) = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Multiply the two deviations</div>
                            <div className="solver-step-calc">
                              ({devA}) × ({devB}) = <strong>{right.toString().padStart(2, '0')}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">4</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right.toString().padStart(2, '0')} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{nikMulA} × {nikMulB}</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 4: Urdhva-Tiryagbhyam */}
              {activeSolver === 'urdhva' && (() => {
                const aTens = Math.floor(urdhvaA / 10);
                const aUnits = urdhvaA % 10;
                const bTens = Math.floor(urdhvaB / 10);
                const bUnits = urdhvaB % 10;

                const step1Val = aUnits * bUnits;
                const step1Unit = step1Val % 10;
                const step1Carry = Math.floor(step1Val / 10);

                const step2Val = aTens * bUnits + aUnits * bTens + step1Carry;
                const step2Unit = step2Val % 10;
                const step2Carry = Math.floor(step2Val / 10);

                const step3Val = aTens * bTens + step2Carry;
                const total = urdhvaA * urdhvaB;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् ३ · Ūrdhva-Tiryagbhyām</span>
                      <h2 className="solver-title">ऊर्ध्वतिर्यग्भ्याम् — Vertically and Crosswise</h2>
                      <p className="solver-meaning">
                        The universal multiplication method for multiplying any two 2-digit numbers in a single line.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 23, b: 45 },
                        { a: 31, b: 12 },
                        { a: 42, b: 53 },
                        { a: 64, b: 27 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${urdhvaA === item.a && urdhvaB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setUrdhvaA(item.a);
                            setUrdhvaB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="urdhva-a">Number 1 (2-digit):</label>
                        <input
                          id="urdhva-a"
                          type="number"
                          min={10}
                          max={99}
                          value={urdhvaA}
                          onChange={(e) => setUrdhvaA(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="urdhva-b">Number 2 (2-digit):</label>
                        <input
                          id="urdhva-b"
                          type="number"
                          min={10}
                          max={99}
                          value={urdhvaB}
                          onChange={(e) => setUrdhvaB(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Vertical Right: Units × Units (↓)</div>
                            <div className="solver-step-calc">
                              {aUnits} × {bUnits} = {step1Val} ➔ Write <strong>{step1Unit}</strong>, carry <strong>{step1Carry}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Crosswise: Sum of cross-products + carry (✕)</div>
                            <div className="solver-step-calc">
                              ({aTens} × {bUnits}) + ({aUnits} × {bTens}) + {step1Carry} = ({aTens * bUnits}) + ({aUnits * bTens}) + {step1Carry} = {step2Val} ➔ Write <strong>{step2Unit}</strong>, carry <strong>{step2Carry}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Vertical Left: Tens × Tens + carry (↑)</div>
                            <div className="solver-step-calc">
                              ({aTens} × {bTens}) + {step2Carry} = {aTens * bTens} + {step2Carry} = <strong>{step3Val}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{urdhvaA} × {urdhvaB}</span>
                      <span className="solver-result-val">{total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 5: Ekanyunena Purvena */}
              {activeSolver === 'ekanyunena' && (() => {
                const left = ekaNyunNum - 1;
                const right = 99 - left;
                const result = ekaNyunNum * 99;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १४ · Ekanyūnena Pūrveṇa</span>
                      <h2 className="solver-title">एकन्यूनेन पूर्वेण — By One Less Than the Previous One</h2>
                      <p className="solver-meaning">
                        Instant multiplication of 2-digit numbers by 99 in 2 seconds.
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[23, 48, 64, 78, 89].map((val) => (
                        <button
                          key={val}
                          type="button"
                          className={`solver-preset-chip${ekaNyunNum === val ? ' active' : ''}`}
                          onClick={() => setEkaNyunNum(val)}
                        >
                          {val} × 99
                        </button>
                      ))}
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="ekanyun-num">Number (up to 98):</label>
                        <input
                          id="ekanyun-num"
                          type="number"
                          min={1}
                          max={98}
                          value={ekaNyunNum}
                          onChange={(e) => setEkaNyunNum(Math.min(98, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Subtract 1 from the number</div>
                            <div className="solver-step-calc">
                              {ekaNyunNum} − 1 = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Subtract left part from 99</div>
                            <div className="solver-step-calc">
                              99 − {left} = <strong>{right}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{ekaNyunNum} × 99</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 6: Antyayordasake'pi */}
              {activeSolver === 'antya' && (() => {
                const tensA = Math.floor(antyaA / 10);
                const unitsA = antyaA % 10;
                const unitsB = antyaB % 10;
                const left = tensA * (tensA + 1);
                const right = unitsA * unitsB;
                const result = antyaA * antyaB;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">उपसूत्रम् ८ · Antyayordaśake&apos;pi</span>
                      <h2 className="solver-title">अन्त्ययोर्दशकेऽपि — When Units Add to 10 and Tens are Equal</h2>
                      <p className="solver-meaning">
                        Fast calculation when the leading digits match and unit digits sum to 10 (e.g. 43 × 47).
                      </p>
                    </div>

                    <div className="solver-presets">
                      <span className="solver-presets-label">Try Presets:</span>
                      {[
                        { a: 43, b: 47 },
                        { a: 53, b: 57 },
                        { a: 62, b: 68 },
                        { a: 84, b: 86 },
                        { a: 91, b: 99 }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`solver-preset-chip${antyaA === item.a && antyaB === item.b ? ' active' : ''}`}
                          onClick={() => {
                            setAntyaA(item.a);
                            setAntyaB(item.b);
                          }}
                        >
                          {item.a} × {item.b}
                        </button>
                      ))}
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Left Part: Tens digit × (Tens + 1)</div>
                            <div className="solver-step-calc">
                              {tensA} × ({tensA} + 1) = {tensA} × {tensA + 1} = <strong>{left}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Right Part: Multiply unit digits</div>
                            <div className="solver-step-calc">
                              {unitsA} × {unitsB} = <strong>{right.toString().padStart(2, '0')}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Concatenate: Left | Right</div>
                            <div className="solver-step-calc">
                              {left} | {right.toString().padStart(2, '0')} = <strong>{result.toLocaleString()}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box">
                      <span className="solver-result-label">{antyaA} × {antyaB}</span>
                      <span className="solver-result-val">{result.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })()}

              {/* Method 7: Beejank Digital Root Validator */}
              {activeSolver === 'beejank' && (() => {
                const rootA = getDigitalRoot(beejankA);
                const rootB = getDigitalRoot(beejankB);
                const rootProd = getDigitalRoot(rootA * rootB);
                const product = beejankA * beejankB;
                const rootAns = getDigitalRoot(product);
                const isMatch = rootProd === rootAns;

                return (
                  <div>
                    <div className="solver-header">
                      <span className="solver-sutra-tag">सूत्रम् १५ · Guṇitasamuccayaḥ</span>
                      <h2 className="solver-title">बीजाङ्क (Beejank) — The Digital Root Verification Method</h2>
                      <p className="solver-meaning">
                        Check any mathematical multiplication or division in seconds by comparing single-digit digital sums.
                      </p>
                    </div>

                    <div className="solver-inputs-row">
                      <div className="solver-input-group">
                        <label htmlFor="beejank-a">Multiplier A:</label>
                        <input
                          id="beejank-a"
                          type="number"
                          value={beejankA}
                          onChange={(e) => setBeejankA(parseInt(e.target.value, 10) || 1)}
                        />
                      </div>
                      <div className="solver-input-group">
                        <label htmlFor="beejank-b">Multiplier B:</label>
                        <input
                          id="beejank-b"
                          type="number"
                          value={beejankB}
                          onChange={(e) => setBeejankB(parseInt(e.target.value, 10) || 1)}
                        />
                      </div>
                    </div>

                    <div className="solver-visual-card">
                      <div className="solver-step-list">
                        <div className="solver-step-item">
                          <div className="solver-step-num">1</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Number A ({beejankA})</div>
                            <div className="solver-step-calc">
                              Sum digits until 1 single digit remains = <strong>{rootA}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">2</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Number B ({beejankB})</div>
                            <div className="solver-step-calc">
                              Sum digits until 1 single digit remains = <strong>{rootB}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">3</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Product of Roots</div>
                            <div className="solver-step-calc">
                              {rootA} × {rootB} = {rootA * rootB} ➔ Root = <strong>{rootProd}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="solver-step-item">
                          <div className="solver-step-num">4</div>
                          <div className="solver-step-content">
                            <div className="solver-step-title">Digital Root of Calculated Answer ({product})</div>
                            <div className="solver-step-calc">
                              Root of {product} = <strong>{rootAns}</strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="solver-result-box" style={{ background: isMatch ? '#f0fdf4' : '#fef2f2', borderColor: isMatch ? '#86efac' : '#fca5a5' }}>
                      <span className="solver-result-label" style={{ color: isMatch ? '#166534' : '#991b1b' }}>
                        Verification Status
                      </span>
                      <span className="solver-result-val" style={{ color: isMatch ? '#15803d' : '#b91c1c', fontSize: '1.4rem' }}>
                        {isMatch ? `✅ Verified Correct! (${rootProd} = ${rootAns})` : '❌ Mismatch detected'}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </section>
          </div>

            {/* NEXT CHAPTER ROADMAP CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 2</span>
                <h3 className="vedic-next-track-title">Step 3: Universal Algebra Engine</h3>
                <p className="vedic-next-track-desc">
                  Transcend arithmetic into abstract variables. Discover how Parāvartya Yojayet (Transpose &amp; Apply) and Vilokanam (Inspection) solve quadratics, simultaneous equations, and polynomial factorisations instantly.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('algebra');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📐 Open Universal Algebra Engine →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('sutras');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 1. 16 Sūtras Directory
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: UNIVERSAL ENGINE OF ALGEBRA (BASE 10 VS BASE X)
            ================================================================== */}
        {activeTab === 'algebra' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill" style={{ background: '#fef3c7', color: '#92400e' }}>
              <span>॥ बीजगणितस्य सार्वभौम-यन्त्रम् ॥</span>
              <span>·</span>
              <span>Base 10 vs Base x Unification</span>
            </div>

            <h1 className="zero-essay-title">The Universal Engine of Algebra</h1>
            <p className="zero-essay-subtitle">
              The most profound proof that Vedic math is a deep conceptual system rather than a bag of tricks is its seamless transition into Algebra. Universally, arithmetic and algebra are not two distinct subjects—algebra is simply generalized arithmetic.
            </p>

            {/* Interactive Algebra Bridge */}
            <div className="algebra-bridge-box" style={{ marginTop: '1.5rem' }}>
              <h3 className="algebra-bridge-title">
                📐 Interactive Proof: Identical Coefficient Vector [1, a+b, ab]
              </h3>
              <p className="algebra-bridge-desc">
                Notice how the Vedic Sutra <em>Ūrdhva-Tiryagbhyām</em> generates the exact identical coefficient array whether the base is concrete 10 or unknown variable x:
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6b7280' }}>Try Coefficients:</span>
                {[
                  { a: 2, b: 3 },
                  { a: 3, b: 4 },
                  { a: 1, b: 5 },
                  { a: 4, b: 5 },
                  { a: 6, b: 7 }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`solver-preset-chip${algebraConstA === item.a && algebraConstB === item.b ? ' active' : ''}`}
                    onClick={() => {
                      setAlgebraConstA(item.a);
                      setAlgebraConstB(item.b);
                    }}
                  >
                    (x + {item.a})(x + {item.b})
                  </button>
                ))}
              </div>

              {(() => {
                const a = algebraConstA;
                const b = algebraConstB;
                const sum = a + b;
                const prod = a * b;
                const arithNum1 = 10 + a;
                const arithNum2 = 10 + b;
                const arithAns = arithNum1 * arithNum2;

                return (
                  <div className="algebra-bridge-grid">
                    <div className="algebra-col-card">
                      <h4 className="algebra-col-title">Arithmetic (Base 10)</h4>
                      <div className="algebra-math-formula">
                        {arithNum1} × {arithNum2} = (10 + {a})(10 + {b})
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#374151', margin: '0.4rem 0' }}>
                        = 1·(10²) + {sum}·(10) + {prod}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803d' }}>
                        = {arithAns}
                      </div>
                      <div className="algebra-coeff-chip">
                        Coefficients: [1, {sum}, {prod}]
                      </div>
                    </div>

                    <div className="algebra-col-card">
                      <h4 className="algebra-col-title">Algebra (Base x)</h4>
                      <div className="algebra-math-formula">
                        (x + {a})(x + {b})
                      </div>
                      <div style={{ fontSize: '0.92rem', color: '#374151', margin: '0.4rem 0' }}>
                        = 1·(x²) + {sum}·(x) + {prod}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b45309' }}>
                        = x² + {sum}x + {prod}
                      </div>
                      <div className="algebra-coeff-chip" style={{ background: '#fef3c7', color: '#92400e' }}>
                        Coefficients: [1, {sum}, {prod}]
                      </div>
                    </div>
                  </div>
                );
              })()}

              <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.65, margin: '1.25rem 0 0 0' }}>
                {VEDIC_ZERO_ESSAY.algebraEngine.summary}
              </p>
            </div>

                        <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 2</span>
                <h3 className="vedic-next-track-title">Step 4: Vedic Geometry &amp; Śulba Sūtras</h3>
                <p className="vedic-next-track-desc">
                  Explore the sacred geometry of the Śulba Sūtras: Baudhāyana's theorem (800 BCE), ritual altar geometries, and ancient rational approximations of √2 and π.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('geometry');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🔺 Explore Vedic Geometry &amp; Śulba →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setSelectedArticleId('algebra-engine');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read Universal Algebra Article
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('solvers');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 2. Solvers Studio
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: VEDIC GEOMETRY & THE SCIENCE OF SHAPES (शुल्बसूत्राणि)
            ================================================================== */}
        {activeTab === 'geometry' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill" style={{ background: '#ecfdf5', color: '#065f46' }}>
              <span>॥ शुल्बसूत्राणि · रेखागणितम् ॥</span>
              <span>·</span>
              <span>The Sacred Science of Shapes</span>
            </div>

            <h1 className="zero-essay-title">Vedic Geometry: The Science of Shapes</h1>
            <p className="zero-essay-subtitle">
              Centuries before Euclidean geometry arose in the Mediterranean, ancient Indian master-geometers documented the Śulba Sūtras (शुल्बसूत्राणि)—using ropes, pegs, and exact geometric transformations to construct monumental fire altars, squares, circles, and Pythagorean triples.
            </p>

            {/* Video Player Box */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                margin: '2rem 0',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '56.25%',
                  height: 0,
                  background: '#090d16',
                }}
              >
                <iframe
                  src="https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=11&rel=0"
                  title="Vedic Geometry: The Science Of Shapes"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div
                style={{
                  padding: '1.25rem 1.5rem',
                  background: '#fafaf9',
                  borderTop: '1px solid #f0ece1',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1c1917' }}>
                    🎥 Masterclass: Vedic Geometry — The Science of Shapes
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.2rem' }}>
                    Curated Documentary by <strong>Conscious Cosmos</strong> · Timestamp: starts at 0:11
                  </div>
                </div>
                <a
                  href="https://www.youtube.com/watch?v=bp9m53Tp6xg&t=11s"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: '#dc2626',
                    color: '#ffffff',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  <span>▶ Watch on YouTube</span>
                </a>
              </div>
            </div>

            {/* In-depth geometric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📐</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  The Śulba Sūtras (शुल्बसूत्राणि)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  <em>"Śulba"</em> literally means a measuring cord or rope. The texts of <em>Baudhāyana, Āpastamba, Kātyāyana</em>, and <em>Mānava</em> (c. 800–500 BCE) documented exact geometric algorithms used to lay out coordinates, cardinal orientations, and right angles on the earth.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🔺</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  Baudhāyana’s Theorem (The Diagonal Principle)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  <em>"दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्ग्मानी च यत् पृथग् भूते कुरुतस्तदुभयं करोति ॥"</em> (Baudhāyana Śulba Sūtra 1.48). Centuries before Pythagoras, Baudhāyana proved that the diagonal of a rectangle produces the sum of the areas produced separately by its length and breadth.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⭕</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1e293b', margin: '0 0 0.5rem 0' }}>
                  Circle &amp; Square Transformations (Circling the Square)
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.55, margin: 0 }}>
                  Because Vedic altars had to possess identical surface area regardless of whether their geometry was circular (<em>Gārhapatya</em>) or square (<em>Āhavanīya</em>), Vedic seers devised exact cord-and-peg algorithms to transform squares to circles and circles to squares without area loss.
                </p>
              </div>
            </div>

            {/* ================================================================
                BAUDHĀYANA-PYTHAGORAS THEOREM & SACRED TRIPLES STUDIO
                ================================================================ */}
            <div className="baudhayana-studio-card" style={{ marginTop: '2.5rem', background: '#ffffff', border: '2px solid #fde68a', borderRadius: '18px', padding: '2rem', boxShadow: '0 4px 20px rgba(180, 83, 9, 0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#fef3c7', color: '#92400e', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    <span>॥ बौधायन-पायथागोरस-सिद्धान्तः ॥</span>
                    <span>·</span>
                    <span>c. 800 BCE (250+ Years Before Pythagoras)</span>
                  </div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#78350f', margin: '0 0 0.4rem 0' }}>
                    Baudhāyana’s Theorem (Śulba Sūtra 1.48) &amp; The Sacred Triples (1.49)
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#4b5563', margin: 0, maxWidth: '850px', lineHeight: 1.55 }}>
                    Centuries before Pythagoras formulated the theorem algebraically in Greece, Ācārya Baudhāyana recorded the diagonal relationship of a right-angled triangle as a spatial rope algorithm for constructing Vedic fire altars (<em>Agnicayana</em>).
                  </p>
                </div>
              </div>

              {/* Canonical Shloka Presentation Box */}
              <div style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '1.5px solid #fde68a', borderRadius: '14px', padding: '1.4rem 1.6rem', marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Baudhāyana Śulba Sūtra (१.४८) · The Canonical Diagonal Aphorism
                </div>
                <div style={{ fontFamily: "'Noto Serif Devanagari', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: '#78350f', lineHeight: 1.6 }}>
                  दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ॥
                </div>
                <div style={{ fontStyle: 'italic', color: '#5b3414', fontSize: '0.92rem', marginTop: '0.35rem' }}>
                  Dīrghacaturaśrasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yatpṛthagbhūte kurutastadubhayaṃ karoti.
                </div>
                <div style={{ background: 'rgba(255,255,255,0.7)', borderLeft: '3px solid #d97706', padding: '0.65rem 0.9rem', borderRadius: '0 8px 8px 0', marginTop: '0.85rem', color: '#1f2937', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  <strong>Translation:</strong> "The diagonal chord of a rectangle produces both areas which its flank (horizontal base) and lateral (vertical height) sides produce separately."
                  <div style={{ marginTop: '0.35rem', color: '#b45309', fontWeight: 800 }}>
                    Formula: (Akṣṇayā Rajjuḥ)² = (Pārśvamānī)² + (Tiryaṅmānī)² &nbsp;⟺&nbsp; c² = a² + b²
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer & Chord Calculator */}
              {(() => {
                const cVal = Math.sqrt(baudA * baudA + baudB * baudB);
                const isIntTriple = Number.isInteger(cVal);
                const areaA = baudA * baudA;
                const areaB = baudB * baudB;
                const areaC = Math.round(cVal * cVal * 100) / 100;

                return (
                  <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#1e293b' }}>
                          ⚡ Interactive Baudhāyana Chord &amp; Area Lab
                        </h3>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>
                          Adjust base (पार्श्वमानी) and height (तिर्यङ्मानी) to see the rope area verification.
                        </p>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: isIntTriple ? '#dcfce7' : '#fef3c7', color: isIntTriple ? '#166534' : '#92400e', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 800 }}>
                        {isIntTriple ? `✓ Whole-Number Baudhāyana Triple (${baudA}, ${baudB}, ${cVal})` : `Irrational Chord (c ≈ ${cVal.toFixed(3)})`}
                      </div>
                    </div>

                    {/* Presets from Sulba Sutra 1.49 */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                        Sacred Canonical Triples (Baudhāyana Śulba Sūtra 1.49):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {[
                          { a: 3, b: 4, name: 'त्रिक-चतुष्कयोः पञ्चकः', ratio: '3 : 4 : 5' },
                          { a: 5, b: 12, name: 'पञ्चक-द्वादशकोः त्रयोदशः', ratio: '5 : 12 : 13' },
                          { a: 8, b: 15, name: 'अष्टक-पञ्चदशकोः सप्तदशः', ratio: '8 : 15 : 17' },
                          { a: 12, b: 35, name: 'द्वादशक-पञ्चत्रिंशकोः सप्तत्रिंशः', ratio: '12 : 35 : 37' }
                        ].map((tr) => (
                          <button
                            key={tr.ratio}
                            type="button"
                            onClick={() => { setBaudA(tr.a); setBaudB(tr.b); }}
                            style={{
                              background: baudA === tr.a && baudB === tr.b ? '#78350f' : '#ffffff',
                              color: baudA === tr.a && baudB === tr.b ? '#ffffff' : '#334155',
                              border: '1.5px solid',
                              borderColor: baudA === tr.a && baudB === tr.b ? '#78350f' : '#cbd5e1',
                              borderRadius: '8px',
                              padding: '0.4rem 0.75rem',
                              fontSize: '0.85rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <span>{tr.ratio}</span>
                            <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>({tr.name})</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inputs & Visualizer Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                      <div>
                        <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            <span>Horizontal Base (पार्श्वमानी a):</span>
                            <strong style={{ color: '#b45309' }}>{baudA} units</strong>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={baudA}
                            onChange={(e) => setBaudA(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            style={{ width: '100%', accentColor: '#b45309' }}
                          />
                        </div>

                        <div style={{ marginBottom: '1.25rem' }}>
                          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                            <span>Vertical Height (तिर्यङ्मानी b):</span>
                            <strong style={{ color: '#0284c7' }}>{baudB} units</strong>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="50"
                            value={baudB}
                            onChange={(e) => setBaudB(Math.max(1, parseInt(e.target.value, 10) || 1))}
                            style={{ width: '100%', accentColor: '#0284c7' }}
                          />
                        </div>

                        {/* Equation Breakdown Box */}
                        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
                          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: 600 }}>
                            Mathematical Area Synthesis (यत्पृथग्भूते कुरुतस्तदुभयं करोति):
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '1.05rem', color: '#1e293b', fontWeight: 700 }}>
                            <span style={{ color: '#b45309' }}>{baudA}²</span> + <span style={{ color: '#0284c7' }}>{baudB}²</span> = <span style={{ color: '#16a34a' }}>{cVal % 1 === 0 ? cVal : cVal.toFixed(2)}²</span>
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '0.92rem', color: '#475569', marginTop: '0.2rem' }}>
                            <span style={{ color: '#b45309' }}>{areaA}</span> + <span style={{ color: '#0284c7' }}>{areaB}</span> = <span style={{ color: '#16a34a', fontWeight: 800 }}>{areaA + areaB} sq units</span>
                          </div>
                        </div>
                      </div>

                      {/* Geometric SVG Diagram */}
                      <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <svg viewBox="0 0 320 240" style={{ width: '100%', maxWidth: '280px', height: 'auto' }} aria-label="Baudhayana Theorem Triangle Diagram">
                          {/* Triangle */}
                          <polygon points="50,190 270,190 50,50" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
                          {/* Right Angle Marker */}
                          <polyline points="50,172 68,172 68,190" fill="none" stroke="#78350f" strokeWidth="1.5" />
                          {/* Labels */}
                          <text x="160" y="212" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="800">
                            पार्श्वमानी a = {baudA} (Area: {areaA})
                          </text>
                          <text x="35" y="125" textAnchor="middle" fill="#0284c7" fontSize="13" fontWeight="800" transform="rotate(-90, 35, 125)">
                            तिर्यङ्मानी b = {baudB} (Area: {areaB})
                          </text>
                          <text x="175" y="105" textAnchor="middle" fill="#16a34a" fontSize="13" fontWeight="800" transform="rotate(-33, 175, 105)">
                            अक्ष्णया रज्जुः c = {cVal % 1 === 0 ? cVal : cVal.toFixed(2)} (Area: {areaA + areaB})
                          </text>
                        </svg>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center', marginTop: '0.5rem' }}>
                          Area of Hypotenuse Square ({areaC}) = Base Square ({areaA}) + Height Square ({areaB})
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Comparative Table: Baudhāyana vs. Pythagoras */}
              <div style={{ marginBottom: '1.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.75rem' }}>
                  🏛️ The Direct Bridge: Baudhāyana (800 BCE) to Pythagoras (530 BCE)
                </h3>
                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Baudhāyana’s Sanskrit Term</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Sacred Geometric Role (800 BCE)</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Modern Pythagorean Equivalent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#b45309' }}>पार्श्वमानी (Pārśvamānī)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>The flank-measuring horizontal cord</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Base (<em>a</em>)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafaf9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#0284c7' }}>तिर्यङ्मानी (Tiryaṅmānī)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>The transverse-measuring vertical cord</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Perpendicular / Height (<em>b</em>)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#16a34a' }}>अक्ष्णया रज्जुः (Akṣṇayā rajjuḥ)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>The diagonal measuring rope across the corner</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>Hypotenuse (<em>c</em>)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#fafaf9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#7c3aed' }}>पृथग्भूते कुरुतः (Pṛthagbhūte kurutaḥ)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>What the base and height separately produce (dual verb)</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}><em>a² + b²</em></td>
                      </tr>
                      <tr>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#ea580c' }}>तदुभयं करोति (Tadubhayaṃ karoti)</td>
                        <td style={{ padding: '0.75rem 1rem', color: '#334155' }}>The single diagonal produces both of those combined (singular verb)</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}><em>= c²</em></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Complete Word-by-Word Sanskrit Vyākaraṇa Breakdown */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                    📖 Complete Sanskrit Vyākaraṇa Breakdown (12 Morphological Steps)
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowBaudVyakarana(!showBaudVyakarana)}
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0.35rem 0.75rem', fontSize: '0.82rem', fontWeight: 700, color: '#475569', cursor: 'pointer' }}
                  >
                    {showBaudVyakarana ? 'Hide Grammar Table ▴' : 'Show Grammar Table ▾'}
                  </button>
                </div>

                {showBaudVyakarana && (
                  <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                          <th style={{ padding: '0.65rem 0.9rem' }}>Sanskrit Word</th>
                          <th style={{ padding: '0.65rem 0.9rem' }}>Case / Vibhakti</th>
                          <th style={{ padding: '0.65rem 0.9rem' }}>Morphology &amp; Compound</th>
                          <th style={{ padding: '0.65rem 0.9rem' }}>Mathematical Meaning</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { w: 'दीर्घचतुरश्रस्य', i: 'Dīrghacaturaśrasya', v: 'Ṣaṣṭhī (6th/Genitive) Sg.', m: 'Karmadhāraya: Dīrgha (long) + Caturaśra (rectangle)', e: 'Of a rectangle' },
                          { w: 'अक्ष्णया', i: 'Akṣṇayā', v: 'Tṛtīyā (3rd/Instrumental) Sg.', m: 'Noun akṣṇā (across corner / diagonal)', e: 'Along the diagonal direction' },
                          { w: 'रज्जुः', i: 'Rajjuḥ', v: 'Prathamā (1st/Nominative) Sg.', m: 'Feminine noun rajju (measuring cord)', e: 'The diagonal measuring rope (Hypotenuse)' },
                          { w: 'पार्श्वमानी', i: 'Pārśvamānī', v: 'Prathamā (1st) Sg. Fem.', m: 'Pārśva (side/flank) + Māna (measure)', e: 'The horizontal side / base (a)' },
                          { w: 'तिर्यङ्मानी', i: 'Tiryaṅmānī', v: 'Prathamā (1st) Sg. Fem.', m: 'Tiryañc (transverse/vertical) + Māna', e: 'The vertical side / height (b)' },
                          { w: 'च', i: 'Ca', v: 'Avyaya (Indeclinable)', m: 'Conjunction', e: 'And' },
                          { w: 'यत्', i: 'Yat', v: 'Relative Pronoun (Neuter) Sg.', m: 'Yad stem', e: 'Whatever area' },
                          { w: 'पृथग्भूते', i: 'Pṛthagbhūte', v: 'Saptamī/Dual Participle', m: 'Pṛthak (separately) + Bhūta (become)', e: 'Separately / individually' },
                          { w: 'कुरुतः', i: 'Kurutaḥ', v: 'Verb: Kṛ, Laṭ, 3rd Person, DUAL', m: 'Note the dual number for base + height!', e: 'They two (base and height) produce' },
                          { w: 'तत्', i: 'Tat', v: 'Correlative Pronoun (Neuter) Sg.', m: 'Tad stem (corresponds to Yat)', e: 'That combined area' },
                          { w: 'उभयम्', i: 'Ubhayam', v: 'Dvitīyā (Accusative) Neuter Sg.', m: 'Both together', e: 'Both areas combined' },
                          { w: 'करोति', i: 'Karoti', v: 'Verb: Kṛ, Laṭ, 3rd Person, SINGULAR', m: 'Switches to singular for the single diagonal rope!', e: 'It (the single diagonal rope) produces' }
                        ].map((row, idx) => (
                          <tr key={row.w} style={{ borderBottom: '1px solid #f1f5f9', background: idx % 2 === 1 ? '#fafaf9' : '#ffffff' }}>
                            <td style={{ padding: '0.65rem 0.9rem', fontWeight: 700, color: '#78350f' }}>
                              {row.w} <span style={{ fontSize: '0.8rem', color: '#6b7280', fontStyle: 'italic' }}>({row.i})</span>
                            </td>
                            <td style={{ padding: '0.65rem 0.9rem', color: '#475569', fontWeight: 600 }}>{row.v}</td>
                            <td style={{ padding: '0.65rem 0.9rem', color: '#334155' }}>{row.m}</td>
                            <td style={{ padding: '0.65rem 0.9rem', color: '#0f172a', fontWeight: 700 }}>{row.e}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Vedic Parity & The Lone Even Prime (2) Card */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>🪐</span>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#1e293b' }}>
                    Vedic Roots of Parity &amp; Why 2 Sits as the Only Even Prime
                  </h4>
                </div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  In the <em>Taittirīya Saṃhitā</em> (Yajurveda), sacred arithmetic chants alternated between <strong>Yugma</strong> (paired, balanced, even numbers) and <strong>Ayugma</strong> (unpaired, dynamic, odd numbers).
                  When designing <em>Agnicayana</em> brick altars, Vedic architects encountered the fundamental distinction between <strong>Composite Areas</strong> (which tile into uniform rectangular grids) and <strong>Prime Dimensions</strong> (which refuse rectangular factorisation and demand custom fractional bricks).
                </p>
                <div style={{ background: '#ffffff', borderLeft: '3px solid #78350f', padding: '0.75rem 1rem', borderRadius: '0 8px 8px 0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                  <strong>The "Even Prime" Anomaly:</strong> The number 2 is divisible by 2 (making it even / Yugma), yet its only divisors are 1 and 2 (making it prime / indivisible). Every other even number (4, 6, 8, 10...) is a multiple of 2 and carries at least three factors. Thus, 2 stands alone as the foundational bridge of number theory and modern binary computing.
                </div>
              </div>

              {/* Link to Full Masterclass Treatise */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    selectArticle('baudhayana-even-prime-geometry');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read Full Illustrated Masterclass on Baudhāyana &amp; The Even Prime →
                </button>
              </div>
            </div>

            {/* Sacred Altars & The Invariant Area Problem */}
            <div style={{ marginTop: '2.5rem', background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  The Invariant Area Problem &amp; Sacred Altars (यज्ञकुण्डानि)
                </h3>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                The catalyst for ancient Indian geometry was the strict ritual injunction that every sacrificial fire altar (<em>Chiti</em>)
                must possess the exact same surface area—traditionally <strong>7½ square puruṣas (approx. 108 square aṅgulas)</strong>—even
                when constructed in drastically different symbolic silhouettes:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>🦅</div>
                  <h4 style={{ margin: '0 0 0.35rem', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>
                    Śyenaciti (श्येनचितिः · Falcon Altar)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Shaped as a magnificent soaring eagle with outstretched wings and tail to carry prayers up to heaven. Required complex polygon dissection while maintaining exact 7½ puruṣa area.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>🐢</div>
                  <h4 style={{ margin: '0 0 0.35rem', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>
                    Kūrmaciti (कूर्मचितिः · Tortoise Altar)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Symbolizing cosmic stability, foundation, and steady equilibrium of the universe. Required segmental circular boundaries matching square areas.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>☸️</div>
                  <h4 style={{ margin: '0 0 0.35rem', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>
                    Rathacakraciti (रथचक्रचितिः · Chariot Wheel)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Symbolizing movement, cyclical cosmic time (<em>kālacakra</em>), and seasonal progression. Built with concentric annular bands and spoke divisions.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '1.6rem', marginBottom: '0.25rem' }}>🏺</div>
                  <h4 style={{ margin: '0 0 0.35rem', color: '#0f172a', fontSize: '1rem', fontWeight: 800 }}>
                    Droṇaciti (द्रोणचितिः · Trough Altar)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                    Representing abundance, nourishment, and a vessel of divine soma. Formed with trapezoidal prisms and precise step gradations.
                  </p>
                </div>
              </div>
            </div>

            {/* Baudhayana's √2 Approximation Masterclass */}
            <div style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)', border: '1.5px solid #a7f3d0', borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>✨</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46', margin: 0 }}>
                  Baudhāyana’s √2 Approximation Formula (800 BCE)
                </h3>
              </div>
              <p style={{ fontSize: '0.94rem', color: '#065f46', lineHeight: 1.6, margin: '0 0 1rem' }}>
                When constructing a square altar double the size of an existing one, Baudhāyana needed the exact diagonal length (<em>d = s√2</em>). In <em>Baudhāyana Śulba Sūtra (1.61–62)</em>, he recorded the legendary verse:
              </p>
              <div style={{ background: '#ffffff', border: '1px solid #86efac', borderRadius: '10px', padding: '1rem 1.25rem', fontFamily: 'monospace', fontSize: '0.98rem', color: '#166534', marginBottom: '1rem' }}>
                <strong>समस्य द्विकरणी । प्रमाणं तृतीयेन वर्धयेत्तच्च चतुर्थेनात्मचतुस्त्रिंशोनेन सविशेषः ॥</strong>
                <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#15803d' }}>
                  <em>"Increase the unit measure by its third, that third by its fourth, less the thirty-fourth part of that fourth."</em>
                </div>
                <div style={{ marginTop: '0.5rem', fontSize: '1.1rem', fontWeight: 800, color: '#047857' }}>
                  √2 ≈ 1 + ⅓ + (⅓ × ¼) - (⅓ × ¼ × ⅟₃₄) = 577 / 408 ≈ 1.414215686...
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Baudhāyana’s Value (c. 800 BCE)</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#166534' }}>1.414215686</div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', marginTop: '0.2rem' }}>577 / 408 (8th continued-fraction convergent)</div>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Modern Value of √2</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>1.414213562</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.2rem' }}>Calculated with 64-bit IEEE floating point</div>
                </div>

                <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>Historical Accuracy</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#2563eb' }}>99.99985%</div>
                  <div style={{ fontSize: '0.78rem', color: '#3b82f6', marginTop: '0.2rem' }}>Error of only 0.00000212!</div>
                </div>
              </div>
            </div>

            {/* Modern Echoes in Computer Science & Algorithms */}
            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.4rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>💻</div>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 800 }}>
                  1. Constructive Algorithmic Geometry (CAD)
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  Because the Śulba Sūtras do not deal in abstract proofs but in sequential constructive instructions (<em>"stretch cord AB, bisect at M, swing arc to C"</em>), computer scientists classify them as early <strong>imperative constructive algorithms</strong> directly mirroring parametric CAD and 3D graphic rendering logic.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.4rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🏛️</div>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 800 }}>
                  2. Vāstu Śāstra &amp; Sustainable Architecture
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  The cord-geometry of altar construction laid the groundwork for Indian architecture (<em>Vāstu Śāstra</em>), where symmetry, orientation relative to the solar cardinal axis, and proportional area subdivisions are utilized in modern green architecture to maximize ventilation and thermal efficiency.
                </p>
              </div>

              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.4rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🔐</div>
                <h4 style={{ margin: '0 0 0.4rem', color: '#0f172a', fontSize: '1.05rem', fontWeight: 800 }}>
                  3. Continued Fractions &amp; Signal Processing
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
                  Baudhāyana's 577/408 corresponds to the 8th convergent of continued fractions (<em>[1; 2, 2, 2...]</em>). These Diophantine approximations are foundational to digital signal processing, Fourier quantization, and modern cryptographic key generation.
                </p>
              </div>
            </div>

            {/* ================================================================
                DHANURVEDA STUDIO: THE GEOMETRY OF ARCHERY, PHONETICS & BALLISTICS
                ================================================================ */}
            <div id="dhanurveda-studio" className="dhanur-studio-card">
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ffedd5', color: '#c2410c', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    <span>॥ धनुर्वेदः · ज्यामितीय-स्थानानि ॥</span>
                    <span>·</span>
                    <span>The Sacred Upaveda of the Bow</span>
                  </div>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#9a3412', margin: '0 0 0.4rem 0' }}>
                    🏹 The Geometry of Dhanurveda: Stances, Ballistics &amp; Sanskrit Phonetics
                  </h2>
                  <p style={{ fontSize: '0.95rem', color: '#4b5563', margin: 0, maxWidth: '880px', lineHeight: 1.6 }}>
                    In ancient India, archery was not mere physical combat—it was a sacred, systematic <strong>Upaveda</strong> (applied Vedic science) connected to the Yajurveda.
                    It synthesised human biomechanics, the triangle theorems of the <em>Śulba Sūtras</em>, and the acoustic physics of Sanskrit <em>Vyākaraṇa</em> into an integrated martial and spiritual art.
                  </p>
                </div>
              </div>

              {/* The 4 Structural Pillars */}
              <div style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1.5px solid #fed7aa', borderRadius: '14px', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c2410c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                  The 4 Educational Pillars of Dhanurveda · वसिष्ठ-धनुर्वेद-संहिता
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                    <div style={{ fontWeight: 800, color: '#9a3412', fontSize: '0.95rem' }}>१. स्थानम् (Sthāna)</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>The Geometric Stance: triangular foot alignment to balance center of gravity &amp; absorb recoil.</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                    <div style={{ fontWeight: 800, color: '#9a3412', fontSize: '0.95rem' }}>२. छुरिका / मुष्टि (Churikā)</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>The Grip &amp; Tension: physics of finger lock, drawing leverage, and thumb-ring release torque.</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                    <div style={{ fontWeight: 800, color: '#9a3412', fontSize: '0.95rem' }}>३. मुक्त-विमुक्त (Release)</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>The Release Timing: precise microsecond discharge synchronized with breath suspension (Prāṇāyāma).</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #fed7aa' }}>
                    <div style={{ fontWeight: 800, color: '#9a3412', fontSize: '0.95rem' }}>४. लक्ष्य-वेध (Targeting)</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>Penetrative Focus: absolute one-pointed concentration—the martial root of Yogic Dhāraṇā.</div>
                  </div>
                </div>
              </div>

              {/* MODULE 1: INTERACTIVE 5 STANCES EXPLORER */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1f2937', margin: 0 }}>
                      1. The Five Geometric Stances (Sthānas) of Ancient Archery
                    </h3>
                    <p style={{ margin: '0.25rem 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
                      Codified in the <em>Agni Purāṇa</em> and <em>Vasiṣṭha Dhanurveda</em>: select a posture to inspect its biomechanical polygon, center-of-gravity shifts, and recoil physics.
                    </p>
                  </div>
                </div>

                {/* Stance Selector Tab Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  {DHANUR_STANCES.map((st) => {
                    const isActive = dhanurStance === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        className={`dhanur-stance-btn ${isActive ? 'active' : ''}`}
                        onClick={() => setDhanurStance(st.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.3rem' }}>
                          <span style={{ fontSize: '1.3rem' }}>{st.shapeEmoji}</span>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, padding: '0.15rem 0.45rem', borderRadius: '4px', background: isActive ? '#ea580c' : '#f1f5f9', color: isActive ? '#ffffff' : '#64748b' }}>
                            {st.weightDesc.split('/')[0].trim()}
                          </span>
                        </div>
                        <div style={{ fontFamily: "'Noto Serif Devanagari', serif", fontWeight: 700, fontSize: '0.96rem', color: isActive ? '#9a3412' : '#1e293b' }}>
                          {st.nameSa}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: isActive ? '#c2410c' : '#64748b', fontWeight: 600 }}>
                          {st.nameIast}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                          {st.shapeName.split(' ')[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Stance Interactive Inspector */}
                {(() => {
                  const current = DHANUR_STANCES.find((s) => s.id === dhanurStance) || DHANUR_STANCES[0];
                  return (
                    <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
                        {/* Left Details Column */}
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                            <h4 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                              {current.nameSa} ({current.nameIast})
                            </h4>
                            <button
                              type="button"
                              onClick={() => playPronunciation(current.nameSa)}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: '#ffedd5', border: '1px solid #fdba74', color: '#c2410c', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                              title="Hear pronunciation in Sanskrit"
                            >
                              🔊 Listen
                            </button>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                              Shape: {current.shapeName}
                            </span>
                            <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                              Foot Span: {current.spanLabel}
                            </span>
                            <span style={{ background: '#dcfce7', color: '#15803d', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                              Weight: {current.weightDesc}
                            </span>
                          </div>

                          <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                              Physical Body Alignment &amp; Geometry:
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.55 }}>
                              {current.bodyMechanics}
                            </p>
                          </div>

                          <div style={{ marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                              Tactical Combat Application &amp; Recoil Physics:
                            </div>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: '#334155', lineHeight: 1.55 }}>
                              {current.combatRole} {current.recoilPhysics}
                            </p>
                          </div>

                          <div style={{ background: '#ffffff', borderLeft: '3px solid #ea580c', padding: '0.65rem 0.85rem', borderRadius: '0 8px 8px 0', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                            <strong>💡 Śulba Sūtra Geometry Link:</strong> {current.tacticalTip}
                          </div>

                          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '0.65rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#64748b' }}>
                            <strong>Sanskrit Root Study:</strong> The term <em>स्थान (Sthāna)</em> originates from the Dhātu <strong>स्था (Sthā - to stand firm)</strong>. It is the direct Indo-European ancestor of English <em>"stance"</em>, <em>"station"</em>, <em>"state"</em>, and <em>"constant"</em>.
                            <div style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>Source: {current.sourceText}</div>
                          </div>
                        </div>

                        {/* Right Visual Diagram & Blueprint Box */}
                        <div>
                          {/* SVG Visualizer Canvas */}
                          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                Dynamic Geometric Vector Model
                              </span>
                              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ea580c' }}>
                                {current.shapeEmoji} {current.shapeName}
                              </span>
                            </div>

                            <svg viewBox="0 0 380 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
                              <defs>
                                <pattern id="dhanurGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                                </pattern>
                                <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                                  <path d="M0,0 L0,6 L8,3 z" fill="#dc2626" />
                                </marker>
                              </defs>
                              <rect width="380" height="200" fill="url(#dhanurGrid)" />

                              {/* Ground Baseline (Pārśvamānī) */}
                              <line x1="30" y1="160" x2="350" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                              <text x="190" y="188" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="bold">
                                Pārśvamānī (Base Foot Span: {current.spanDesc})
                              </text>

                              {/* Dynamic Shapes based on current stance */}
                              {current.id === 'alidha' && (
                                <g>
                                  {/* Right-angled Scalene Triangle */}
                                  <polygon points="90,160 290,160 120,60" fill="rgba(234, 88, 12, 0.15)" stroke="#ea580c" strokeWidth="2.5" />
                                  {/* Torso & Head */}
                                  <circle cx="120" cy="45" r="14" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
                                  <text x="120" y="49" textAnchor="middle" fontSize="11">🏹</text>
                                  {/* Bent Front Knee */}
                                  <circle cx="105" cy="115" r="5" fill="#ea580c" />
                                  <line x1="120" y1="60" x2="105" y2="115" stroke="#ea580c" strokeWidth="3" />
                                  <line x1="105" y1="115" x2="90" y2="160" stroke="#ea580c" strokeWidth="3" />
                                  {/* Straight Extended Back Leg */}
                                  <line x1="120" y1="60" x2="290" y2="160" stroke="#9a3412" strokeWidth="3" />
                                  {/* Feet pads */}
                                  <rect x="75" y="156" width="30" height="8" rx="4" fill="#c2410c" />
                                  <text x="90" y="174" textAnchor="middle" fill="#c2410c" fontSize="9" fontWeight="bold">Front (70%)</text>
                                  <rect x="275" y="156" width="30" height="8" rx="4" fill="#64748b" />
                                  <text x="290" y="174" textAnchor="middle" fill="#64748b" fontSize="9">Rear (30%)</text>
                                  {/* Center of Gravity Node */}
                                  <circle cx="115" cy="100" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                                  <text x="135" y="104" fill="#b45309" fontSize="9" fontWeight="bold">CG (70% fwd)</text>
                                  {/* Arrow vector */}
                                  <line x1="120" y1="50" x2="330" y2="50" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowHead)" />
                                  <text x="320" y="42" textAnchor="end" fill="#dc2626" fontSize="10" fontWeight="bold">Target Direction 🎯</text>
                                </g>
                              )}

                              {current.id === 'pratyalidha' && (
                                <g>
                                  {/* Reflected Triangle */}
                                  <polygon points="90,160 290,160 260,60" fill="rgba(59, 130, 246, 0.15)" stroke="#2563eb" strokeWidth="2.5" />
                                  {/* Torso & Head leaning back */}
                                  <circle cx="260" cy="45" r="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                                  <text x="260" y="49" textAnchor="middle" fontSize="11">🏹</text>
                                  {/* Bent Rear Knee */}
                                  <circle cx="275" cy="115" r="5" fill="#2563eb" />
                                  <line x1="260" y1="60" x2="275" y2="115" stroke="#2563eb" strokeWidth="3" />
                                  <line x1="275" y1="115" x2="290" y2="160" stroke="#2563eb" strokeWidth="3" />
                                  {/* Straight Extended Front Leg */}
                                  <line x1="260" y1="60" x2="90" y2="160" stroke="#1d4ed8" strokeWidth="3" />
                                  {/* Feet pads */}
                                  <rect x="75" y="156" width="30" height="8" rx="4" fill="#64748b" />
                                  <text x="90" y="174" textAnchor="middle" fill="#64748b" fontSize="9">Front (30%)</text>
                                  <rect x="275" y="156" width="30" height="8" rx="4" fill="#1d4ed8" />
                                  <text x="290" y="174" textAnchor="middle" fill="#1d4ed8" fontSize="9" fontWeight="bold">Rear (70%)</text>
                                  {/* Center of Gravity Node */}
                                  <circle cx="265" cy="100" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                                  <text x="245" y="104" textAnchor="end" fill="#1d4ed8" fontSize="9" fontWeight="bold">CG (70% rear)</text>
                                  {/* Arrow vector forward */}
                                  <line x1="250" y1="50" x2="50" y2="50" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#arrowHead)" />
                                  <text x="60" y="42" fill="#dc2626" fontSize="10" fontWeight="bold">Counter-Fire 🎯</text>
                                </g>
                              )}

                              {current.id === 'samapada' && (
                                <g>
                                  {/* Parallel Vertical Rectangle */}
                                  <rect x="160" y="60" width="60" height="100" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2.5" />
                                  {/* Torso & Head */}
                                  <circle cx="190" cy="40" r="14" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
                                  <text x="190" y="44" textAnchor="middle" fontSize="11">🙏</text>
                                  {/* Parallel legs */}
                                  <line x1="175" y1="60" x2="175" y2="160" stroke="#059669" strokeWidth="3" />
                                  <line x1="205" y1="60" x2="205" y2="160" stroke="#059669" strokeWidth="3" />
                                  {/* Feet pads (1 palm-width apart) */}
                                  <rect x="163" y="156" width="22" height="8" rx="4" fill="#059669" />
                                  <rect x="195" y="156" width="22" height="8" rx="4" fill="#059669" />
                                  <text x="190" y="176" textAnchor="middle" fill="#059669" fontSize="9" fontWeight="bold">50% Left | 50% Right</text>
                                  {/* Center of Gravity Node */}
                                  <circle cx="190" cy="110" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                                  <text x="190" y="125" textAnchor="middle" fill="#047857" fontSize="9" fontWeight="bold">Symmetric Equilibrium</text>
                                </g>
                              )}

                              {current.id === 'vaisakha' && (
                                <g>
                                  {/* Equilateral Trapezoid / Power Squat */}
                                  <polygon points="110,160 270,160 230,85 150,85" fill="rgba(217, 119, 6, 0.15)" stroke="#d97706" strokeWidth="2.5" />
                                  {/* Torso & Head */}
                                  <circle cx="190" cy="65" r="14" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
                                  <text x="190" y="69" textAnchor="middle" fontSize="11">⚔️</text>
                                  {/* Outward bent knees */}
                                  <circle cx="130" cy="120" r="5" fill="#d97706" />
                                  <circle cx="250" cy="120" r="5" fill="#d97706" />
                                  <line x1="160" y1="85" x2="130" y2="120" stroke="#d97706" strokeWidth="3" />
                                  <line x1="130" y1="120" x2="110" y2="160" stroke="#d97706" strokeWidth="3" />
                                  <line x1="220" y1="85" x2="250" y2="120" stroke="#d97706" strokeWidth="3" />
                                  <line x1="250" y1="120" x2="270" y2="160" stroke="#d97706" strokeWidth="3" />
                                  {/* Feet pads (wide base) */}
                                  <rect x="95" y="156" width="30" height="8" rx="4" fill="#b45309" />
                                  <rect x="255" y="156" width="30" height="8" rx="4" fill="#b45309" />
                                  <text x="190" y="176" textAnchor="middle" fill="#b45309" fontSize="9" fontWeight="bold">Wide Power Base (3 Spans / ~2.5 ft)</text>
                                  {/* Low Center of Gravity Node */}
                                  <circle cx="190" cy="125" r="7" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                                  <text x="190" y="142" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="bold">Ultra-Low CG (Iron Bow Power)</text>
                                </g>
                              )}

                              {current.id === 'mandala' && (
                                <g>
                                  {/* Hexagonal / Circular 360 Pivot */}
                                  <polygon points="190,50 240,85 245,130 220,160 160,160 135,130 140,85" fill="rgba(147, 51, 234, 0.12)" stroke="#9333ea" strokeWidth="2.5" />
                                  {/* Circular rotation guide ring */}
                                  <circle cx="190" cy="110" r="55" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 3" />
                                  {/* Torso & Head */}
                                  <circle cx="190" cy="45" r="14" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
                                  <text x="190" y="49" textAnchor="middle" fontSize="11">🔄</text>
                                  {/* Radial outward legs */}
                                  <circle cx="145" cy="120" r="5" fill="#9333ea" />
                                  <circle cx="235" cy="120" r="5" fill="#9333ea" />
                                  <line x1="175" y1="80" x2="145" y2="120" stroke="#9333ea" strokeWidth="3" />
                                  <line x1="145" y1="120" x2="160" y2="160" stroke="#9333ea" strokeWidth="3" />
                                  <line x1="205" y1="80" x2="235" y2="120" stroke="#9333ea" strokeWidth="3" />
                                  <line x1="235" y1="120" x2="220" y2="160" stroke="#9333ea" strokeWidth="3" />
                                  {/* Feet pads (1 vitasti apart) */}
                                  <rect x="145" y="156" width="25" height="8" rx="4" fill="#7e22ce" />
                                  <rect x="210" y="156" width="25" height="8" rx="4" fill="#7e22ce" />
                                  <text x="190" y="176" textAnchor="middle" fill="#7e22ce" fontSize="9" fontWeight="bold">1 Vitasti (~9 in) · 360° Rotational Pivot</text>
                                  {/* Dynamic rotational arrow */}
                                  <path d="M 235 90 A 55 55 0 0 1 235 130" fill="none" stroke="#7e22ce" strokeWidth="2" markerEnd="url(#arrowHead)" />
                                  <path d="M 145 130 A 55 55 0 0 1 145 90" fill="none" stroke="#7e22ce" strokeWidth="2" markerEnd="url(#arrowHead)" />
                                </g>
                              )}
                            </svg>
                          </div>

                          {/* Visual Text Blueprint Box */}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                                Canonical Text Blueprint
                              </span>
                              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Vedic Stance Layout</span>
                            </div>
                            <pre className="dhanur-ascii-box">{current.textDiagram}</pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* MODULE 2: THE LINGUISTIC CONNECTION (THE MOUTH AS A BOW) */}
              <div style={{ background: '#fdf4ff', border: '1.5px solid #f0abfc', borderRadius: '16px', padding: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>🏹</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#86198f', margin: 0 }}>
                    2. The Linguistic Connection: The Mouth as a Bow (Dhanuṣ &amp; Sanskrit Phonetics)
                  </h3>
                </div>
                <p style={{ margin: '0 0 1.25rem', fontSize: '0.92rem', color: '#4a044e', lineHeight: 1.6 }}>
                  In Sanskrit grammar (<em>Vyākaraṇa</em>) and phonetics (<em>Śikṣā</em>), archery is the supreme physical metaphor for how speech sounds are generated.
                  The vocal tract is mapped directly onto the anatomy of a flexed bow:
                </p>

                {/* Anatomy Analogy Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#ffffff', border: '1px solid #f5d0fe', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a21caf', textTransform: 'uppercase' }}>Bow Stave (धनुर्दण्डः)</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#701a75', marginTop: '0.15rem' }}>The Hard Palate (Mūrdhan)</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Curved ceiling of the mouth acting as the rigid bow frame.</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #f5d0fe', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a21caf', textTransform: 'uppercase' }}>Bowstring (ज्या / मौर्वी)</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#701a75', marginTop: '0.15rem' }}>The Tongue (Jihvā)</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Elastic muscle that curls back under tension and snaps forward.</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #f5d0fe', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a21caf', textTransform: 'uppercase' }}>Drawing Tension (कर्ष-शक्तिः)</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#701a75', marginTop: '0.15rem' }}>Vocal Breath (Prāṇa)</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Thoracic air compression building behind the palatal closure.</div>
                  </div>
                  <div style={{ background: '#ffffff', border: '1px solid #f5d0fe', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a21caf', textTransform: 'uppercase' }}>Sonic Arrows (ध्वनि-शराः)</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#701a75', marginTop: '0.15rem' }}>Mūrdhanya Consonants</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>The retroflex series: ट (ṭa), ठ (ṭha), ड (ḍa), ढ (ḍha), ण (ṇa).</div>
                  </div>
                </div>

                {/* Interactive Retroflex Consonants Soundboard */}
                <div style={{ background: '#ffffff', border: '1px solid #f5d0fe', borderRadius: '12px', padding: '1.25rem' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#86198f', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    🔊 Interactive Mūrdhanya Soundboard (Click to hear each sound-arrow release):
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    {MURDHANYA_PHONETICS.map((ph) => {
                      const isSelected = activePhoneticLetter === ph.letterIast;
                      return (
                        <button
                          key={ph.letterIast}
                          type="button"
                          className={`dhanur-phonetic-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => {
                            setActivePhoneticLetter(ph.letterIast);
                            playPronunciation(ph.letterSa);
                          }}
                        >
                          <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '1.6rem', fontWeight: 800, color: isSelected ? '#c2410c' : '#1e293b' }}>
                            {ph.letterSa}
                          </span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#ea580c' : '#64748b' }}>
                            {ph.letterIast}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Phonetic Letter Deep Dive */}
                  {(() => {
                    const sel = MURDHANYA_PHONETICS.find((p) => p.letterIast === activePhoneticLetter) || MURDHANYA_PHONETICS[0];
                    return (
                      <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                          <span style={{ fontFamily: "'Noto Serif Devanagari', serif", fontSize: '1.4rem', fontWeight: 800, color: '#7e22ce' }}>
                            {sel.letterSa} ({sel.letterIast})
                          </span>
                          <span style={{ background: '#f3e8ff', color: '#6b21a8', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                            {sel.phoneticName}
                          </span>
                          <span style={{ background: '#fce7f3', color: '#9d174d', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                            {sel.sanskritClass}
                          </span>
                          <button
                            type="button"
                            onClick={() => playPronunciation(sel.letterSa)}
                            style={{ background: '#e9d5ff', border: 'none', color: '#581c87', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                          >
                            🔊 Play Sound
                          </button>
                        </div>
                        <div style={{ fontSize: '0.86rem', color: '#374151', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                          <strong>Tongue &amp; Palate Mechanics:</strong> {sel.biomechanics}
                        </div>
                        <div style={{ fontSize: '0.84rem', color: '#7e22ce', fontWeight: 600 }}>
                          <strong>Acoustic Arrow Type:</strong> {sel.acousticArrow}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* MODULE 3: THE VEDIC MATH CONNECTION (BALLISTICS & ŚARA-ABHYĀSA) */}
              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>📐</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', margin: 0 }}>
                    3. The Vedic Math Connection: Ballistics &amp; Trajectory Triangles
                  </h3>
                </div>
                <p style={{ margin: '0 0 1.25rem', fontSize: '0.92rem', color: '#14532d', lineHeight: 1.6 }}>
                  Vedic archers were master calculators of ballistics. Hitting an elevated target required computing the diagonal hypotenuse
                  using the exact principles recorded in Baudhāyana’s <em>Śulba Sūtra 1.48</em>:
                </p>

                {(() => {
                  const cDist = Math.sqrt(dhanurDistA * dhanurDistA + dhanurElevB * dhanurElevB);
                  const angleDeg = (Math.atan2(dhanurElevB, dhanurDistA) * 180) / Math.PI;
                  const flightTime = cDist / 65; // ~65 m/s arrow velocity
                  const dropMeters = 0.5 * 9.8 * flightTime * flightTime;
                  const adjustedAim = dhanurElevB + dropMeters;

                  return (
                    <div style={{ background: '#ffffff', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1.25rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        {/* Sliders */}
                        <div>
                          <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                              <span>Pārśvamānī (Ground Distance a):</span>
                              <strong style={{ color: '#15803d' }}>{dhanurDistA} meters</strong>
                            </div>
                            <input
                              type="range"
                              min="10"
                              max="100"
                              step="5"
                              value={dhanurDistA}
                              onChange={(e) => setDhanurDistA(parseInt(e.target.value, 10))}
                              style={{ width: '100%', accentColor: '#16a34a' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                              <span>10 m</span>
                              <span>Close Skirmish</span>
                              <span>100 m (Maximum Range)</span>
                            </div>
                          </div>

                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                              <span>Tiryaṅmānī (Target Elevation b):</span>
                              <strong style={{ color: '#0369a1' }}>{dhanurElevB} meters</strong>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="40"
                              step="1"
                              value={dhanurElevB}
                              onChange={(e) => setDhanurElevB(parseInt(e.target.value, 10))}
                              style={{ width: '100%', accentColor: '#0284c7' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94a3b8' }}>
                              <span>0 m (Ground Level)</span>
                              <span>20 m (Rampart)</span>
                              <span>40 m (High Tower)</span>
                            </div>
                          </div>

                          {/* Historical Presets */}
                          <div style={{ marginTop: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                              Historical Presets:
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              <button
                                type="button"
                                onClick={() => { setDhanurDistA(25); setDhanurElevB(12); }}
                                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                              >
                                🎯 Arjuna's Matsya-Vedha (25m, 12m)
                              </button>
                              <button
                                type="button"
                                onClick={() => { setDhanurDistA(50); setDhanurElevB(0); }}
                                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                              >
                                ⚔️ Cavalry Flat Shot (50m, 0m)
                              </button>
                              <button
                                type="button"
                                onClick={() => { setDhanurDistA(70); setDhanurElevB(25); }}
                                style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.25rem 0.55rem', borderRadius: '6px', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 600 }}
                              >
                                🏰 Fortress Siege (70m, 25m)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Calculated Output Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Akṣṇayā Rajjuḥ (Line of Sight)</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#16a34a' }}>
                              {cDist.toFixed(2)} m
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.2rem' }}>
                              c = √({dhanurDistA}² + {dhanurElevB}²)
                            </div>
                          </div>

                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Angle of Release (θ)</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0284c7' }}>
                              {angleDeg.toFixed(1)}°
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.2rem' }}>
                              arctan({dhanurElevB} / {dhanurDistA})
                            </div>
                          </div>

                          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700 }}>Arrow Flight Time</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#9333ea' }}>
                              {(flightTime * 1000).toFixed(0)} ms
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.2rem' }}>
                              at ~65 m/s release
                            </div>
                          </div>

                          <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '10px', padding: '0.85rem' }}>
                            <div style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 700 }}>Śara-Abhyāsa Drop</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#b45309' }}>
                              +{dropMeters.toFixed(2)} m
                            </div>
                            <div style={{ fontSize: '0.72rem', color: '#78350f', marginTop: '0.2rem' }}>
                              Aim point: {adjustedAim.toFixed(2)} m
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ background: '#f0fdf4', borderLeft: '3px solid #16a34a', padding: '0.65rem 0.85rem', borderRadius: '0 8px 8px 0', fontSize: '0.85rem', color: '#166534', lineHeight: 1.5 }}>
                        <strong>Tactical Ballistic Rule:</strong> In the <em>Śara-Abhyāsa</em> (Arrow Practice Grid), archers calibrated for gravity drop by aiming higher than the target by exactly $\Delta y = \frac{1}{2} g t^2$. For an elevation of {dhanurElevB}m at {dhanurDistA}m range, aim {dropMeters.toFixed(2)}m above the target ({adjustedAim.toFixed(2)}m total height) using the <strong>{dhanurElevB > 15 ? 'Vaiśākha (Power Squat)' : 'Ālīḍha (Forward Attack)'}</strong> stance.
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Masterclass Link CTA */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)', border: '1.5px solid #fed7aa', borderRadius: '14px', padding: '1.25rem 1.5rem' }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#9a3412', fontSize: '1rem' }}>
                    📖 Read the Scholarly Treatise on Dhanurveda
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Explore the complete 10-minute masterclass on Dhanurveda, the 5 combat stances, Mūrdhanya phonetics, and Yogic Dhāraṇā.
                  </div>
                </div>
                <button
                  type="button"
                  className="article-interactive-cta"
                  style={{ background: '#ea580c', color: '#ffffff', border: 'none', padding: '0.65rem 1.25rem', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                  onClick={() => {
                    selectArticle('dhanurveda-geometry-phonetics');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  Read Full Masterclass Treatise →
                </button>
              </div>
            </div>

            {/* NEXT CHAPTER ROADMAP CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 2</span>
                <h3 className="vedic-next-track-title">Step 5: Fluid Space &amp; Mental Parallel Math</h3>
                <p className="vedic-next-track-desc">
                  Understand the cognitive science of mental calculation: left-to-right processing, cross-multiplication streams, and the mental blackboard.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('fluid');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🌊 Enter Fluid Space &amp; Parallel Math →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setSelectedArticleId('geometry-infinite');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read Sacred Geometry Article
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('algebra');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 3. Universal Algebra
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: FLUID SPACE & SIMULTANEOUS PARALLEL PROCESSING
            ================================================================== */}
        {activeTab === 'fluid' && (
          <div className="fluid-space-container">
            <div className="zero-badge-pill" style={{ background: '#ecfdf5', color: '#065f46' }}>
              <span>॥ स्थानमानस्य सातत्यं युगपत्-प्रक्रिया च ॥</span>
              <span>·</span>
              <span>Fluid Space &amp; Simultaneous Processing</span>
            </div>

            <div className="fluid-space-hero">
              <h1 className="zero-essay-title">Treating Place Value as Fluid Space</h1>
              <p className="zero-essay-subtitle">
                While conventional school mathematics treats place value as a rigid set of isolated columns, Vedic Mathematics treats it as a continuous, fluid continuum. The Sutra <em>Ūrdhva-Tiryagbhyām</em> (Vertically and Crosswise) allows you to calculate units, tens, and hundreds simultaneously in parallel in a single line!
              </p>
            </div>

            {/* Interactive Parallel Flow Visualizer */}
            <div className="fluid-interactive-card">
              <div className="fluid-inputs-bar">
                <div className="fluid-presets">
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#78350f' }}>Try Presets:</span>
                  {[
                    { a: 23, b: 45 },
                    { a: 31, b: 52 },
                    { a: 42, b: 36 },
                    { a: 64, b: 25 }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`solver-preset-chip${fluidNumA === p.a && fluidNumB === p.b ? ' active' : ''}`}
                      onClick={() => {
                        setFluidNumA(p.a);
                        setFluidNumB(p.b);
                      }}
                    >
                      {p.a} × {p.b}
                    </button>
                  ))}
                </div>

                <div className="fluid-inputs-direct">
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4b5563' }}>Custom 2-Digit:</span>
                  <input
                    type="number"
                    min={10}
                    max={99}
                    value={fluidNumA}
                    onChange={(e) => setFluidNumA(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                    className="fluid-input-field"
                  />
                  <span style={{ fontWeight: 800, color: '#9ca3af' }}>×</span>
                  <input
                    type="number"
                    min={10}
                    max={99}
                    value={fluidNumB}
                    onChange={(e) => setFluidNumB(Math.min(99, Math.max(10, parseInt(e.target.value, 10) || 10)))}
                    className="fluid-input-field"
                  />
                </div>
              </div>

              {(() => {
                const a1 = Math.floor(fluidNumA / 10);
                const a0 = fluidNumA % 10;
                const b1 = Math.floor(fluidNumB / 10);
                const b0 = fluidNumB % 10;

                // Step 1: Units
                const prod1 = a0 * b0;
                const unitDigit = prod1 % 10;
                const carry1 = Math.floor(prod1 / 10);

                // Step 2: Crosswise
                const cross1 = a1 * b0;
                const cross2 = a0 * b1;
                const crossSum = cross1 + cross2 + carry1;
                const tensDigit = crossSum % 10;
                const carry2 = Math.floor(crossSum / 10);

                // Step 3: Left
                const prod3 = a1 * b1;
                const hundredVal = prod3 + carry2;

                const finalProd = fluidNumA * fluidNumB;

                return (
                  <div>
                    <div className="fluid-comparison-grid">
                      {/* Conventional School Long Multiplication */}
                      <div className="fluid-school-card">
                        <span className="fluid-card-tag">Traditional School Method</span>
                        <h3 className="fluid-card-title">Rigid Columnar Scrap Work</h3>
                        
                        <div className="fluid-school-stack">
                          <div>&nbsp;&nbsp;{fluidNumA}</div>
                          <div>×&nbsp;{fluidNumB}</div>
                          <div className="fluid-school-line" />
                          <div>&nbsp;{fluidNumA * b0} <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({fluidNumA}×{b0})</span></div>
                          <div>{fluidNumA * b1}0 <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>({fluidNumA}×{b1}0)</span></div>
                          <div className="fluid-school-line" />
                          <div style={{ fontWeight: 800, color: '#1f2937' }}>{finalProd}</div>
                        </div>

                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
                          ⚠️ Requires 3 distinct rows of paper writing, indenting with placeholder zeros, multiple isolated carries, and vertical column addition.
                        </p>
                      </div>

                      {/* Vedic Simultaneous Parallel Stream */}
                      <div className="fluid-vedic-card">
                        <span className="fluid-card-tag">Vedic Ūrdhva-Tiryagbhyām</span>
                        <h3 className="fluid-card-title">Simultaneous Symmetrical Matrix</h3>

                        <div className="fluid-vedic-steps">
                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>↓ Vertical Right (Units):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              {a0} × {b0} = {prod1} ➔ <strong>{unitDigit}</strong> (carry {carry1})
                            </div>
                          </div>

                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>✕ Crosswise (Tens):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              ({a1}×{b0}) + ({a0}×{b1}) + {carry1} = {crossSum} ➔ <strong>{tensDigit}</strong> (carry {carry2})
                            </div>
                          </div>

                          <div className="fluid-vedic-step">
                            <div className="fluid-vedic-step-label">
                              <span>↓ Vertical Left (Hundreds):</span>
                            </div>
                            <div className="fluid-vedic-step-calc">
                              ({a1}×{b1}) + {carry2} = <strong>{hundredVal}</strong>
                            </div>
                          </div>
                        </div>

                        <div className="fluid-vedic-single-line">
                          <div className="fluid-single-line-label">Direct Single-Line Answer</div>
                          <div className="fluid-single-line-ans">{finalProd.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Metric Contrast Bar */}
                    <div className="fluid-metric-contrast">
                      <div>
                        <div className="fluid-metric-item-num">0</div>
                        <div className="fluid-metric-item-label">Scrap Rows Needed</div>
                      </div>
                      <div>
                        <div className="fluid-metric-item-num">10–15×</div>
                        <div className="fluid-metric-item-label">Faster Mental Processing</div>
                      </div>
                      <div>
                        <div className="fluid-metric-item-num">100%</div>
                        <div className="fluid-metric-item-label">Parallel Geometric Sync</div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

                        <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 3</span>
                <h3 className="vedic-next-track-title">Step 6: The Numerical Grid &amp; Absolute Zero</h3>
                <p className="vedic-next-track-desc">
                  Uncover the greatest intellectual revolution in human mathematics: the decimal place-value system and Brahmagupta's laws of Śūnya (Zero).
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('zero');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🪐 Explore The Numerical Grid &amp; Zero →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setSelectedArticleId('fluid-space');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read Fluid Space Article
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('geometry');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 4. Vedic Geometry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: THE ARCHITECTURE OF ABSOLUTE ZERO & THE NUMERICAL GRID
            ================================================================== */}
        {activeTab === 'zero' && (
          <div className="zero-essay-container">
            <div className="zero-badge-pill">
              <span>॥ शून्यं सर्वप्रपञ्चस्य मूलम् ॥</span>
              <span>·</span>
              <span>The Architecture of Absolute Zero</span>
            </div>

            <h1 className="zero-essay-title">{VEDIC_ZERO_ESSAY.title}</h1>
            <p className="zero-essay-subtitle">{VEDIC_ZERO_ESSAY.subtitle}</p>

            {VEDIC_ZERO_ESSAY.intro.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Section 1: The Birth of the Grid */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.birthGrid.title}</h2>
            {VEDIC_ZERO_ESSAY.birthGrid.paragraphs.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Interactive Roman vs Decimal Place-Value Tester */}
            <div className="roman-compare-card">
              <div className="roman-compare-header">
                <span>🏛️ Interactive Grid Test: Roman Tally vs. Indian Decimal System</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '1rem' }}>
                Test any number to see why Roman numerals required immense paper real estate, while the Indian positional system represents numbers dynamically:
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6b7280' }}>Presets:</span>
                {[333, 1984, 2026, 3888].map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`solver-preset-chip${romanInputNum === val ? ' active' : ''}`}
                    onClick={() => setRomanInputNum(val)}
                  >
                    {val}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={3999}
                  value={romanInputNum}
                  onChange={(e) => setRomanInputNum(Math.min(3999, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.95rem',
                    borderRadius: '6px',
                    border: '1.5px solid #d1d5db',
                    width: '100px',
                    marginLeft: '0.5rem'
                  }}
                />
              </div>

              <div className="roman-compare-grid">
                <div className="roman-box">
                  <div className="roman-box-label">Roman Numeral (Fixed Tally System)</div>
                  <div className="roman-output-val">{getRoman(romanInputNum)}</div>
                  <div className="roman-note">
                    Length: <strong>{getRoman(romanInputNum).length} static characters</strong> with no positional multiplication scaling.
                  </div>
                </div>

                <div className="roman-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <div className="roman-box-label" style={{ color: '#166534' }}>Indian Decimal Place-Value System</div>
                  <div className="decimal-output-val">{romanInputNum.toLocaleString()}</div>
                  <div className="roman-note" style={{ color: '#166534' }}>
                    Length: <strong>{romanInputNum.toString().length} dynamic digits</strong> ={' '}
                    {romanInputNum
                      .toString()
                      .split('')
                      .map((d, i, arr) => `${d} × 10^${arr.length - 1 - i}`)
                      .join(' + ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Global Journey */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.globalJourney.title}</h2>
            <div className="timeline-wrap">
              {VEDIC_ZERO_ESSAY.globalJourney.timeline.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-era">{item.era}</div>
                  <div className="timeline-who">{item.who}</div>
                  <div className="timeline-desc">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Section 3: Conclusion & Next Steps */}
            <h2 className="vedic-essay-h2">{VEDIC_ZERO_ESSAY.conclusion.title}</h2>
            {VEDIC_ZERO_ESSAY.conclusion.paragraphs.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

                        <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 3</span>
                <h3 className="vedic-next-track-title">Step 7: Logic &amp; Language (Nyāya &amp; Pāṇini AI)</h3>
                <p className="vedic-next-track-desc">
                  Examine the mathematical rigor of Sanskrit linguistics, Nyāya formal logic, Rick Briggs' NASA AI paper, and the Kaṭapayādi alphanumeric cipher.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('logic');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🗣️ Explore Logic, Language &amp; AI →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setSelectedArticleId('birth-grid');
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read The Birth of the Grid Article
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('fluid');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 5. Fluid Space
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logic' && (
          <div className="logic-essay-container">
            <div className="zero-badge-pill" style={{ background: '#ede9fe', color: '#5b21b6' }}>
              <span>॥ सूत्रं ज्ञानाय मङ्गलम् ॥</span>
              <span>·</span>
              <span>The Linguistic Architecture of Calculation</span>
            </div>

            <h1 className="zero-essay-title">{VEDIC_LOGIC_LANGUAGE_ESSAY.title}</h1>
            <p className="zero-essay-subtitle">{VEDIC_LOGIC_LANGUAGE_ESSAY.subtitle}</p>

            {VEDIC_LOGIC_LANGUAGE_ESSAY.intro.map((p, idx) => (
              <p key={idx} className="vedic-essay-p">{p}</p>
            ))}

            {/* Section 1: The 16 Core Sutras and Sub-Sutras */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.desc}</p>

            <div className="anchor-sutras-grid">
              {VEDIC_LOGIC_LANGUAGE_ESSAY.sutraFramework.keySutras.map((sutra) => (
                <div key={sutra.id} className="anchor-sutra-card">
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="sutra-card-num">Sutra {sutra.id}</span>
                      <button
                        type="button"
                        onClick={() => playPronunciation(sutra.sanskrit)}
                        title="Listen to Sanskrit pronunciation"
                        style={{
                          background: '#fef3c7',
                          border: '1px solid #fde68a',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          padding: '0.15rem 0.45rem'
                        }}
                      >
                        🔊
                      </button>
                    </div>
                    <h3 className="anchor-sutra-title">{sutra.sanskrit}</h3>
                    <div className="anchor-sutra-iast">{sutra.transliteration}</div>
                    <div className="anchor-sutra-meaning">&ldquo;{sutra.meaning}&rdquo;</div>
                    <div className="anchor-sutra-app">{sutra.application}</div>
                  </div>
                  {sutra.example && (
                    <div className="anchor-sutra-ex">
                      <strong>💡 Example:</strong> {sutra.example}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Section 2: Historical Context: Vedic or Modern? */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.intro}</p>

            <div className="historical-matrix-wrap">
              <table className="historical-matrix-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>Historical Dimension</th>
                    <th style={{ width: '39%' }}>Traditional Vedic View</th>
                    <th style={{ width: '39%' }}>Historical Academic View</th>
                  </tr>
                </thead>
                <tbody>
                  {VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.comparisonMatrix.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <span className="matrix-dim-badge">{row.dimension}</span>
                      </td>
                      <td>
                        <span className="matrix-trad-badge">Traditional Perspective</span>
                        <div>{row.traditional}</div>
                      </td>
                      <td>
                        <span className="matrix-acad-badge">Academic Perspective</span>
                        <div>{row.academic}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="vedic-essay-quote">
              &ldquo;{VEDIC_LOGIC_LANGUAGE_ESSAY.historicalContext.synthesis}&rdquo;
            </div>

            {/* Section 3: Why the Sanskrit Structure Works: Cognitive Load Shift */}
            <h2 className="vedic-essay-h2">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.title}</h2>
            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.p1}</p>

            <div className="cognitive-load-box">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>
                🧠 Cognitive Load: Western Columnar Arithmetic vs. Vedic Sanskrit Aphorisms
              </h3>
              <div className="cognitive-grid">
                <div className="cognitive-card">
                  <div className="cognitive-card-title" style={{ color: '#b91c1c' }}>
                    <span>⚠️ Conventional Columnar Arithmetic</span>
                  </div>
                  <div className="cognitive-card-desc">
                    High cognitive strain on working memory. Requires keeping multiple carries in mind, shifting partial product rows with placeholder zeroes, and performing multi-tier vertical addition. Focus is absorbed by scrap management rather than holistic problem structure.
                  </div>
                </div>

                <div className="cognitive-card" style={{ borderColor: '#86efac', background: '#f0fdf4' }}>
                  <div className="cognitive-card-title" style={{ color: '#15803d' }}>
                    <span>✨ Vedic Sanskrit Cognitive Triggers</span>
                  </div>
                  <div className="cognitive-card-desc">
                    Low working memory load. Short poetic Sanskrit aphorisms trigger spatial, geometric visualization and whole-number pattern recognition. Problems are perceived globally, processed in parallel, and solved in a single line.
                  </div>
                </div>
              </div>
            </div>

            <p className="vedic-essay-p">{VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.p2}</p>
            <p className="vedic-essay-p" style={{ fontWeight: 700, color: '#15803d' }}>
              {VEDIC_LOGIC_LANGUAGE_ESSAY.cognitiveLoad.conclusion}
            </p>

            {/* NEXT CHAPTER ROADMAP CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 3</span>
                <h3 className="vedic-next-track-title">Step 8: The Source &amp; Guru Paramparā</h3>
                <p className="vedic-next-track-desc">
                  Trace the unbroken golden chain of Indian mathematical geniuses from Āryabhaṭa, Brahmagupta, and Mādhava of Saṅgamagrāma to Svāmī Bhāratī Kṛṣṇa Tīrtha.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('parampara');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🕉️ Meet the Masters in Guru Paramparā →
                </button>
                {onOpenGrammar && (
                  <button
                    type="button"
                    className="article-pager-btn"
                    onClick={onOpenGrammar}
                  >
                    📚 Explore Grammar &amp; Kaṭapayādi Shelf
                  </button>
                )}
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('zero');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ← Back to 6. The Numerical Grid &amp; Zero
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: GURU PARAMPARA & THE SOURCE (SACRED LINEAGE)
            ================================================================== */}
        {/* ==================================================================
            TAB: GURU PARAMPARA, HISTORIOGRAPHY & SHAKA CHRONOLOGY (TRACK 3 · STEP 8)
            ================================================================== */}
        {activeTab === 'parampara' && (() => {
          const convertedCeYear = shakaInputYear + SHAKA_TO_CE_OFFSET;
          const matchedAstronomer = SHAKA_ERA_CHRONOLOGY.find(
            (m) => m.shakaNumeric === shakaInputYear
          );
          const nearbyAstronomers = !matchedAstronomer
            ? SHAKA_ERA_CHRONOLOGY.filter(
                (m) => Math.abs(m.shakaNumeric - shakaInputYear) <= 25
              )
            : [];

          const filteredChronology = SHAKA_ERA_CHRONOLOGY.filter((item) => {
            const matchesFilter =
              chronoFilter === 'all' ||
              (chronoFilter === 'astronomy' && item.focusArea === 'Astronomy & Siddhanta') ||
              (chronoFilter === 'algebra' && item.focusArea === 'Arithmetic & Algebra') ||
              (chronoFilter === 'geometry' && item.focusArea === 'Geometry & Trigonometry') ||
              (chronoFilter === 'commentary' && item.focusArea === 'Commentary & Reconstruction') ||
              (chronoFilter === 'observational' && item.focusArea === 'Observational & Calendrical');

            const searchClean = chronoSearch.trim().toLowerCase();
            const matchesSearch =
              !searchClean ||
              item.name.toLowerCase().includes(searchClean) ||
              item.teluguName.toLowerCase().includes(searchClean) ||
              item.sanskritName.toLowerCase().includes(searchClean) ||
              item.primaryTreatise.toLowerCase().includes(searchClean) ||
              item.contributions.toLowerCase().includes(searchClean) ||
              item.century.toLowerCase().includes(searchClean) ||
              item.shakaYear.toLowerCase().includes(searchClean) ||
              item.ceYear.toLowerCase().includes(searchClean);

            return matchesFilter && matchesSearch;
          });

          return (
            <div className="parampara-container">
              {/* Hero Crest */}
              <div className="parampara-hero-crest">
                <div className="parampara-badge-pill">
                  <span>॥ मूलस्रोतः इतिहासदर्शनम् शकाब्दक्रमश्च ॥</span>
                  <span>·</span>
                  <span>Track 3: Heritage &amp; Epistemology · Step 8</span>
                </div>
                <h1 className="parampara-title">Historiographical Framework &amp; The Living Lineage</h1>
                <p className="parampara-subtitle">
                  Vedic Mathematics and Indian Astronomy form an unbroken continuum spanning millennia—from phonetic oral transmission and palm-leaf manuscripts to classical Siddhāntic astronomy (Shaka Era) and 21st-century microchip computing.
                </p>

                {/* Sub-Navigation Pills */}
                <div className="parampara-subnav-bar">
                  <div className="parampara-subnav-pills">
                    <button
                      type="button"
                      className={`parampara-subnav-pill ${paramparaSubTab === 'all' ? 'active' : ''}`}
                      onClick={() => setParamparaSubTab('all')}
                    >
                      🌟 All Dimensions
                    </button>
                    <button
                      type="button"
                      className={`parampara-subnav-pill ${paramparaSubTab === 'historiography' ? 'active' : ''}`}
                      onClick={() => setParamparaSubTab('historiography')}
                    >
                      📜 5 Historiographical Pillars
                    </button>
                    <button
                      type="button"
                      className={`parampara-subnav-pill ${paramparaSubTab === 'shaka-matrix' ? 'active' : ''}`}
                      onClick={() => setParamparaSubTab('shaka-matrix')}
                    >
                      ⏱️ Shaka ⟷ CE Matrix ({SHAKA_ERA_CHRONOLOGY.length} Masters)
                    </button>
                    <button
                      type="button"
                      className={`parampara-subnav-pill ${paramparaSubTab === 'lineage' ? 'active' : ''}`}
                      onClick={() => setParamparaSubTab('lineage')}
                    >
                      🕉️ Modern Guru Paramparā
                    </button>
                  </div>
                  <button
                    type="button"
                    className="parampara-article-cta-btn"
                    onClick={() => {
                      setActiveTab('articles');
                      setSelectedArticleId('historiographical-framework-indian-mathematics');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    📖 Read Masterclass Article →
                  </button>
                </div>
              </div>

              {/* SECTION 1: 5 HISTORIOGRAPHICAL PILLARS */}
              {(paramparaSubTab === 'all' || paramparaSubTab === 'historiography') && (
                <div id="historiography-section" className="parampara-section-block">
                  <div className="section-block-header">
                    <div className="section-block-badge">॥ पञ्च इतिहास-स्तम्भाः ॥ · Philological Foundations</div>
                    <h2 className="section-block-title">The 5 Historiographical Pillars of Indian Mathematics</h2>
                    <p className="section-block-desc">
                      Why standard Western philological dating models often misjudge the antiquity of Indian sciences: the interplay of oral Guru-Paramparā transmission, tropical palm-leaf decay, archaeological floor dates (<em>terminus ante quem</em>), burnt university libraries, and shared homonyms.
                    </p>
                  </div>

                  {/* 3 Core Historical Contrasts */}
                  <div className="historiography-contrasts-grid">
                    <div className="contrast-card">
                      <div className="contrast-icon">🌿</div>
                      <h4 className="contrast-title">Monsoon vs Arid Sands</h4>
                      <p className="contrast-desc">
                        Unlike Egyptian papyrus or Sumerian clay that lasted 4,000 years in dry sands, organic <strong>Tālapatra (palm leaves)</strong> decay within 300–500 years under tropical humidity and silverfish, requiring constant manual recopying (<em>punarlekhana</em>). Surviving manuscripts are almost always late copies of ancient originals.
                      </p>
                    </div>
                    <div className="contrast-card">
                      <div className="contrast-icon">🗣️</div>
                      <h4 className="contrast-title">Oral Sūtras vs Paper Ceilings</h4>
                      <p className="contrast-desc">
                        Knowledge was memorized through metered <strong>Sūtras (Anuṣṭubh, Āryā)</strong> with built-in phonetic checksums and mathematical ciphers (Kaṭapayādi). Theorems lived in the disciplined memory of gurus and disciples centuries before being written down. <em>Text absence does not mean idea absence.</em>
                      </p>
                    </div>
                    <div className="contrast-card">
                      <div className="contrast-icon">🏛️</div>
                      <h4 className="contrast-title">Floor Date (Terminus Ante Quem)</h4>
                      <p className="contrast-desc">
                        An excavated manuscript date marks the latest date by which the math was already in routine use, not its birthday. The <strong>Bakhshālī Manuscript (3rd c. CE)</strong> was a merchant’s trade ledger; a standard dot zero in everyday accounting proves the decimal system was standard practice centuries prior.
                      </p>
                    </div>
                  </div>

                  {/* The 5 Pillar Detail Cards */}
                  <div className="historiography-pillars-list">
                    {HISTORIOGRAPHICAL_FRAMEWORK.map((pillar) => {
                      const isExpanded = expandedPillarId === pillar.id;
                      return (
                        <div key={pillar.id} className="pillar-card">
                          <div className="pillar-header">
                            <div className="pillar-title-wrap">
                              <span className="pillar-badge">Pillar #{pillar.pillarNumber}</span>
                              <span className="pillar-icon">{pillar.icon}</span>
                              <div>
                                <div className="pillar-sa-title">{pillar.sanskritTitle}</div>
                                <h3 className="pillar-en-title">{pillar.title}</h3>
                                <div className="pillar-te-title">తెలుగు: {pillar.teluguTitle}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="pillar-toggle-btn"
                              onClick={() => setExpandedPillarId(isExpanded ? null : pillar.id)}
                            >
                              {isExpanded ? '▲ Hide Details' : '▼ Deep Analysis'}
                            </button>
                          </div>

                          <p className="pillar-summary">{pillar.shortSummary}</p>

                          {isExpanded && (
                            <div className="pillar-expanded-body">
                              <div className="pillar-full-desc">{pillar.fullDescription}</div>
                              
                              <div className="pillar-impact-box">
                                <div className="pillar-impact-label">💡 Historiographical Reality &amp; Methodological Rule:</div>
                                <div className="pillar-impact-text">{pillar.historiographicalImpact}</div>
                              </div>

                              <div className="pillar-examples-wrap">
                                <div className="pillar-examples-label">🔍 Canonical Historical Evidence:</div>
                                <ul className="pillar-examples-list">
                                  {pillar.keyExamples.map((ex, eIdx) => (
                                    <li key={eIdx}>{ex}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION 2: SHAKA ERA CONVERTER & CHRONOLOGY MATRIX */}
              {(paramparaSubTab === 'all' || paramparaSubTab === 'shaka-matrix') && (
                <div id="shaka-matrix-section" className="parampara-section-block">
                  <div className="section-block-header">
                    <div className="section-block-badge">॥ शकाब्द-रूपान्तरणम् कालक्रम-सारणी च ॥ · Siddhāntic Epoch</div>
                    <h2 className="section-block-title">Chronological Matrix: Shaka Era to Common Era (CE)</h2>
                    <p className="section-block-desc">
                      The standard astronomical epoch across classical Indian treatises is the Śālivāhana Śaka Era (began 78 CE). Use the interactive converter and explore the matrix of 19 master astronomers and mathematicians with their Telugu, Sanskrit, and English titles.
                    </p>
                  </div>

                  {/* Interactive Shaka-to-CE Converter Tool */}
                  <div className="shaka-converter-studio">
                    <div className="converter-formula-banner">
                      <span className="formula-badge">Mathematical Offset Formula</span>
                      <div className="formula-equation">
                        <strong>CE</strong> = <strong>Shaka Year</strong> + <strong>78</strong>
                        <span className="formula-sep">⟷</span>
                        <strong>Shaka Year</strong> = <strong>CE</strong> - <strong>78</strong>
                      </div>
                      <p className="formula-note">
                        Established in 78 CE to mark the Śaka epoch; all classical ephemerides from Varāhamihira to Sawai Jai Singh II register celestial movements in this calendar.
                      </p>
                    </div>

                    <div className="converter-interactive-row">
                      <div className="converter-input-box">
                        <label htmlFor="shaka-input" className="converter-label">
                          Enter Shaka Era Year:
                        </label>
                        <div className="converter-input-wrap">
                          <input
                            id="shaka-input"
                            type="number"
                            className="converter-num-input"
                            value={shakaInputYear}
                            onChange={(e) => setShakaInputYear(Number(e.target.value) || 0)}
                            min={0}
                            max={3000}
                          />
                          <span className="converter-unit">Shaka</span>
                        </div>
                      </div>

                      <div className="converter-equal-sign">=</div>

                      <div className="converter-output-box">
                        <div className="converter-output-label">Converted Common Era:</div>
                        <div className="converter-output-val">{convertedCeYear} CE</div>
                        <div className="converter-output-sub">
                          ({shakaInputYear} + {SHAKA_TO_CE_OFFSET} = {convertedCeYear})
                        </div>
                      </div>
                    </div>

                    {/* Matched Astronomer Highlight */}
                    {matchedAstronomer && (
                      <div className="converter-match-card exact">
                        <div className="match-tag">🎯 Exact Landmark Astronomer Match!</div>
                        <div className="match-title">
                          <span className="match-te">{matchedAstronomer.teluguName}</span>
                          <span className="match-sep">·</span>
                          <span className="match-en">{matchedAstronomer.name}</span>
                          <span className="match-sa">({matchedAstronomer.sanskritName})</span>
                        </div>
                        <div className="match-meta">
                          <span>📅 {matchedAstronomer.shakaYear} Shaka ({matchedAstronomer.ceYear})</span>
                          <span>·</span>
                          <span>📜 Treatise: {matchedAstronomer.primaryTreatise}</span>
                          <span>·</span>
                          <span className="match-focus-pill">{matchedAstronomer.focusArea}</span>
                        </div>
                        <p className="match-desc">{matchedAstronomer.contributions}</p>
                      </div>
                    )}

                    {!matchedAstronomer && nearbyAstronomers.length > 0 && (
                      <div className="converter-match-card nearby">
                        <div className="match-tag">🔍 Epoch Contemporaries (within 25 years):</div>
                        <div className="nearby-chips">
                          {nearbyAstronomers.map((ast) => (
                            <button
                              key={ast.id}
                              type="button"
                              className="nearby-chip-btn"
                              onClick={() => setShakaInputYear(ast.shakaNumeric)}
                            >
                              {ast.teluguName} ({ast.name}) · {ast.shakaYear} Shaka ({ast.ceYear})
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick Preset Buttons */}
                    <div className="converter-presets-wrap">
                      <div className="presets-label">⚡ Jump to Landmark Astronomical Epochs:</div>
                      <div className="presets-grid">
                        {SHAKA_ERA_CHRONOLOGY.map((ast) => (
                          <button
                            key={ast.id}
                            type="button"
                            className={`preset-btn ${shakaInputYear === ast.shakaNumeric ? 'active' : ''}`}
                            onClick={() => setShakaInputYear(ast.shakaNumeric)}
                          >
                            <span className="preset-name">{ast.name}</span>
                            <span className="preset-year">{ast.shakaNumeric} Shaka → {ast.ceNumeric} CE</span>
                          </button>
                        ))}
                        <button
                          type="button"
                          className={`preset-btn present ${shakaInputYear === 1946 ? 'active' : ''}`}
                          onClick={() => setShakaInputYear(1946)}
                        >
                          <span className="preset-name">Present Indian National Calendar</span>
                          <span className="preset-year">1946 Shaka → 2024 CE</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filterable Chronological Matrix Table */}
                  <div className="chrono-matrix-directory">
                    <div className="matrix-controls-bar">
                      <div className="matrix-search-box">
                        <span className="search-icon">🔍</span>
                        <input
                          type="text"
                          className="matrix-search-input"
                          placeholder="Search by Telugu (మొదటి ఆర్యభటుడు), Sanskrit, English, treatise, century..."
                          value={chronoSearch}
                          onChange={(e) => setChronoSearch(e.target.value)}
                        />
                        {chronoSearch && (
                          <button
                            type="button"
                            className="search-clear-btn"
                            onClick={() => setChronoSearch('')}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="matrix-filter-pills">
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'all' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('all')}
                        >
                          All ({SHAKA_ERA_CHRONOLOGY.length})
                        </button>
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'astronomy' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('astronomy')}
                        >
                          🪐 Astronomy &amp; Siddhānta
                        </button>
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'algebra' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('algebra')}
                        >
                          🧮 Arithmetic &amp; Algebra
                        </button>
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'geometry' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('geometry')}
                        >
                          📐 Geometry &amp; Trigonometry
                        </button>
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'commentary' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('commentary')}
                        >
                          📜 Commentary &amp; Reconstruction
                        </button>
                        <button
                          type="button"
                          className={`matrix-filter-pill ${chronoFilter === 'observational' ? 'active' : ''}`}
                          onClick={() => setChronoFilter('observational')}
                        >
                          ⏱️ Observational &amp; Calendrical
                        </button>
                      </div>
                    </div>

                    <div className="matrix-results-count">
                      Showing <strong>{filteredChronology.length}</strong> of {SHAKA_ERA_CHRONOLOGY.length} classical masters
                    </div>

                    {/* Desktop Responsive Table */}
                    <div className="chrono-table-container">
                      <table className="chrono-table">
                        <thead>
                          <tr>
                            <th>Mathematician &amp; Lineage</th>
                            <th>Shaka Era</th>
                            <th>Common Era (CE = Shaka + 78)</th>
                            <th>Century</th>
                            <th>Primary Treatise</th>
                            <th>Landmark Mathematical &amp; Astronomical Contributions</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredChronology.map((m) => {
                            const isSelected = selectedMathematicianId === m.id;
                            return (
                              <tr
                                key={m.id}
                                className={`chrono-row ${isSelected ? 'selected' : ''}`}
                                onClick={() => setSelectedMathematicianId(isSelected ? null : m.id)}
                              >
                                <td className="chrono-cell-name">
                                  <div className="name-te">{m.teluguName}</div>
                                  <div className="name-en">{m.name}</div>
                                  <div className="name-sa">{m.sanskritName}</div>
                                  <span className="focus-tag">{m.focusArea}</span>
                                </td>
                                <td className="chrono-cell-shaka">
                                  <span className="shaka-badge">{m.shakaYear}</span>
                                </td>
                                <td className="chrono-cell-ce">
                                  <span className="ce-badge">{m.ceYear}</span>
                                </td>
                                <td className="chrono-cell-century">{m.century}</td>
                                <td className="chrono-cell-treatise">
                                  <em>{m.primaryTreatise}</em>
                                </td>
                                <td className="chrono-cell-contrib">{m.contributions}</td>
                                <td className="chrono-cell-action">
                                  <button
                                    type="button"
                                    className="test-converter-btn"
                                    title="Load into Shaka-to-CE Converter"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShakaInputYear(m.shakaNumeric);
                                      const el = document.getElementById('shaka-matrix-section');
                                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }}
                                  >
                                    ⚡ Calculate
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile View: Cards */}
                    <div className="chrono-cards-mobile">
                      {filteredChronology.map((m) => (
                        <div key={m.id} className="chrono-mobile-card">
                          <div className="mobile-card-header">
                            <div>
                              <div className="mobile-te-name">{m.teluguName}</div>
                              <h4 className="mobile-en-name">{m.name}</h4>
                              <div className="mobile-sa-name">{m.sanskritName}</div>
                            </div>
                            <span className="focus-tag">{m.focusArea}</span>
                          </div>

                          <div className="mobile-era-row">
                            <span className="shaka-badge">Shaka: {m.shakaYear}</span>
                            <span className="era-arrow">➜</span>
                            <span className="ce-badge">{m.ceYear}</span>
                            <span className="century-badge">{m.century}</span>
                          </div>

                          <div className="mobile-treatise">
                            <strong>Treatise:</strong> <em>{m.primaryTreatise}</em>
                          </div>

                          <p className="mobile-contrib">{m.contributions}</p>

                          <button
                            type="button"
                            className="test-converter-btn mobile"
                            onClick={() => {
                              setShakaInputYear(m.shakaNumeric);
                              const el = document.getElementById('shaka-matrix-section');
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }}
                          >
                            ⚡ Test in Shaka Converter ({m.shakaNumeric} + 78 = {m.ceNumeric})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 3: THE LIVING GURU PARAMPARA */}
              {(paramparaSubTab === 'all' || paramparaSubTab === 'lineage') && (
                <div className="parampara-section-block">
                  <div className="section-block-header">
                    <div className="section-block-badge">॥ आधुनिक-पुनरुत्थानम् ॥ · The Modern Renaissance</div>
                    <h2 className="section-block-title">The Sacred Awakening &amp; Modern Revival Lineage</h2>
                    <p className="section-block-desc">
                      From Swami Bharati Krishna Tirtha’s 8 years of solitary tapasya in the Sringeri forests (1911–1918) to international textbook publications, university lectures, and 21st-century VLSI microchip multipliers.
                    </p>
                  </div>

                  <div className="parampara-lineage-flow">
                    {GURU_PARAMPARA.map((member) => (
                      <div key={member.id} className="lineage-card">
                        <div className="lineage-header">
                          <div className="lineage-identity">
                            <div className="lineage-avatar-icon">{member.imageIcon}</div>
                            <div className="lineage-names">
                              <span className="lineage-name-sa">{member.sanskritName}</span>
                              <h2 className="lineage-name-en">{member.name}</h2>
                            </div>
                          </div>
                          <span className="lineage-badge-pill">{member.badge}</span>
                        </div>

                        <div className="lineage-role-period">
                          <span className="lineage-role">{member.role}</span>
                          <span className="lineage-period">📅 {member.period}</span>
                        </div>

                        <p className="lineage-desc">{member.description}</p>

                        <div className="lineage-contributions">
                          <div className="lineage-contributions-title">Historic Milestones &amp; Contributions:</div>
                          {member.keyContributions.map((c, cIdx) => (
                            <div key={cIdx} className="lineage-contribution-bullet">
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>

                        {member.quote && (
                          <div className="lineage-quote">
                            &ldquo;{member.quote}&rdquo;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Next Track Card */}
              <div className="vedic-next-track-card">
                <div className="vedic-next-track-header">
                  <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 4</span>
                  <h3 className="vedic-next-track-title">Step 9: Speed Math Challenge &amp; Quiz</h3>
                  <p className="vedic-next-track-desc">
                    Test your grasp of the 16 Sūtras, mental calculation shortcuts, and astronomical timekeeping with interactive, timed self-assessment questions.
                  </p>
                </div>
                <div className="vedic-next-track-actions">
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => {
                      setActiveTab('quiz');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    ⚡ Take Speed Math Challenge Quiz →
                  </button>
                  <button
                    type="button"
                    className="article-pager-btn"
                    onClick={() => {
                      setActiveTab('articles');
                      setSelectedArticleId('historiographical-framework-indian-mathematics');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    📖 Read Historiography Masterclass
                  </button>
                  <button
                    type="button"
                    className="article-pager-btn"
                    onClick={() => {
                      setActiveTab('logic');
                      const el = document.getElementById('vedic-tabs');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    ← Back to 7. Logic &amp; Language
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {activeTab === 'quiz' && (
          <div className="quiz-container">
            {!quizFinished ? (
              <div>
                {/* Quiz Header */}
                <div className="quiz-header">
                  <span className="quiz-progress-pill">
                    Question {quizIndex + 1} of {VEDIC_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="quiz-score-pill">
                    Score: {quizScore} / {VEDIC_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Current Question */}
                {(() => {
                  const q = VEDIC_QUIZ_QUESTIONS[quizIndex];
                  return (
                    <div>
                      <div className="quiz-sutra-badge">
                        <span>⚡ Apply: {q.sutraSanskrit}</span>
                        <span>({q.sutraName})</span>
                      </div>

                      <h2 className="quiz-question-text">{q.question}</h2>

                      <div className="quiz-options-grid">
                        {q.options.map((opt, i) => {
                          const isSelected = selectedOption === opt;
                          const isCorrect = opt === q.correctAnswer;
                          let className = 'quiz-option-btn';

                          if (selectedOption !== null) {
                            if (isCorrect) className += ' correct';
                            else if (isSelected) className += ' incorrect';
                          }

                          return (
                            <button
                              key={i}
                              type="button"
                              className={className}
                              disabled={selectedOption !== null}
                              onClick={() => handleSelectOption(opt)}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {showExplanation && (
                        <div
                          className={`quiz-feedback-box ${
                            selectedOption === q.correctAnswer ? 'correct' : 'incorrect'
                          }`}
                        >
                          <div className="quiz-feedback-title">
                            {selectedOption === q.correctAnswer
                              ? '🎉 Correct! Brilliant Mental Math!'
                              : `❌ Not quite! The correct answer is ${q.correctAnswer}`}
                          </div>
                          <div className="quiz-feedback-trick">
                            <strong>⚡ Fast Vedic Trick:</strong> {q.quickTrick}
                          </div>
                          <div className="quiz-feedback-explanation">
                            <strong>Step-by-step:</strong> {q.explanation}
                          </div>
                        </div>
                      )}

                      {selectedOption !== null && (
                        <div className="quiz-actions">
                          <button
                            type="button"
                            className="quiz-next-btn"
                            onClick={handleNextQuestion}
                          >
                            {quizIndex < VEDIC_QUIZ_QUESTIONS.length - 1
                              ? 'Next Question ➔'
                              : 'View Final Score 🏆'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="quiz-complete-card">
                <div className="quiz-complete-icon">🏆</div>
                <h2 className="quiz-complete-title">Vedic Speed Challenge Completed!</h2>
                <p className="quiz-complete-score">
                  You scored <strong>{quizScore} out of {VEDIC_QUIZ_QUESTIONS.length}</strong> (
                  {Math.round((quizScore / VEDIC_QUIZ_QUESTIONS.length) * 100)}%)
                </p>
                <button
                  type="button"
                  className="quiz-next-btn"
                  onClick={handleRestartQuiz}
                >
                  🔄 Retake Challenge
                </button>
              </div>
            )}

            {/* NEXT CHAPTER ROADMAP CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Next Step in Vedic Mathematics · Track 4</span>
                <h3 className="vedic-next-track-title">Step 10: Articles Masterclass &amp; Treatises</h3>
                <p className="vedic-next-track-desc">
                  Deepen your knowledge with 6 illustrated scholarly treatises, complete with historical manuscript reproductions, diagrams, and proofs.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('articles');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📖 Read Articles Masterclass →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('sutras');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📜 Review 16 Sūtras Directory
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('solvers');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🧮 Practice in Solvers Studio
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================
            TAB: ARTICLES MASTERCLASS (6 IN-DEPTH ARTICLES)
            ================================================================== */}
        {(activeTab === 'articles' || activeTab === 'essay') && (
          <div className="articles-hub-container">
            <aside className="articles-dates-note" role="note">
              <span className="articles-dates-note-icon" aria-hidden="true">ⓘ</span>
              <p>
                <strong>A note on dates:</strong> the dates given for texts are the dates of the earliest copies that
                have survived, been found and been deciphered, not when a method or idea began. Much knowledge was passed
                on orally, and many manuscripts and libraries were lost over the centuries through climate, decay and
                destruction during invasions (for example, Nālandā, c. 1193). Many methods are therefore likely older
                than their earliest surviving record.
              </p>
            </aside>

            {/* Article Selector Navigation Pills */}
            <div className="article-nav-pills-wrap">
              <div className="article-nav-pills-label">
                <span>📚 Vedic Knowledge Library · Select Article</span>
              </div>
              <div className="article-nav-pills">
                {VEDIC_ARTICLES.map((article, idx) => (
                  <button
                    key={article.id}
                    type="button"
                    className={`article-nav-pill${selectedArticleId === article.id ? ' active' : ''}`}
                    onClick={() => selectArticle(article.id)}
                  >
                    <span>{idx + 1}.</span>
                    <span>{article.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Article Reading Presentation */}
            <article className="article-reading-card" id="vedic-article-card">
              {currentArticle.prequel && (
                <a
                  className="article-series-link article-series-link--prequel"
                  href={`/vedic-maths#${articleAnchor(currentArticle.prequel.id)}`}
                  onClick={onAnchorLink(articleAnchor(currentArticle.prequel.id))}
                >
                  ← Prequel: {currentArticle.prequel.label}
                </a>
              )}
              <div className="article-meta-header">
                <span className="article-badge-tag">
                  ✦ {currentArticle.badge}
                </span>
                <span className="article-reading-time">
                  ⏱️ {currentArticle.readingTime}
                </span>
              </div>

              <div className="article-sa-heading">{currentArticle.sanskritTitle}</div>
              <h1 className="article-en-heading">{currentArticle.title}</h1>
              <p className="article-subtitle">{currentArticle.subtitle}</p>

              {/* Sections */}
              {currentArticle.sections.map((sec, sIdx) => (
                <div key={sIdx} className="article-section-block">
                  {sec.part && (
                    <header className="article-part-header">
                      <div className="article-part-label">{sec.part.label}</div>
                      {sec.part.sanskritTitle && <div className="article-part-sa">{sec.part.sanskritTitle}</div>}
                      <h2 className="article-part-title">{sec.part.title}</h2>
                      <p className="article-part-subtitle">{sec.part.subtitle}</p>
                    </header>
                  )}
                  {sec.part ? (
                    <h3 className="article-section-title">{sec.title}</h3>
                  ) : (
                    <h2 className="article-section-title">{sec.title}</h2>
                  )}
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="article-p">{p}</p>
                  ))}
                  {sec.figure && <VedicArticleFigure id={sec.figure} />}
                  {sec.terms && sec.terms.length > 0 && (
                    <div className="article-terms" aria-label="Tap to hear Sanskrit terms">
                      {sec.terms.map((term) => (
                        <button
                          key={term.sa}
                          type="button"
                          className="article-term"
                          onClick={() => playPronunciation(term.sa)}
                          title={`Listen: ${term.iast}`}
                        >
                          <span className="article-term-audio" aria-hidden="true">🔊</span>
                          <span className="article-term-sa" lang="sa">{term.sa}</span>
                          <span className="article-term-iast">{term.iast}</span>
                          <span className="article-term-gloss">{term.gloss}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {sec.highlight && (
                    <div className="article-highlight-box">
                      💡 {sec.highlight}
                    </div>
                  )}
                  {sec.links && sec.links.length > 0 && (
                    <div className="article-inline-links">
                      {sec.links.map((link) => (
                        <a
                          key={link.anchor}
                          className="article-inline-link"
                          href={`/vedic-maths#${link.anchor}`}
                          onClick={onAnchorLink(link.anchor)}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {sec.quote && (
                    <div className="article-pullquote">
                      <span className="article-pullquote-mark">&ldquo;</span>
                      {sec.quote}
                    </div>
                  )}
                  {sec.takeaways && sec.takeaways.length > 0 && (
                    <div className="article-takeaways-card">
                      <div className="article-takeaways-title">
                        <span>🎯 Key Takeaways</span>
                      </div>
                      {sec.takeaways.map((point, kIdx) => (
                        <div key={kIdx} className="article-takeaway-item">
                          <span className="article-takeaway-icon">✓</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Pull Quote */}
              {currentArticle.quote && (
                <div className="article-pullquote">
                  <span className="article-pullquote-mark">&ldquo;</span>
                  {currentArticle.quote}
                </div>
              )}

              {/* Key Takeaways */}
              {currentArticle.keyTakeaways.length > 0 && (
              <div className="article-takeaways-card">
                <div className="article-takeaways-title">
                  <span>🎯 Key Architectural Takeaways</span>
                </div>
                {currentArticle.keyTakeaways.map((point, kIdx) => (
                  <div key={kIdx} className="article-takeaway-item">
                    <span className="article-takeaway-icon">✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
              )}

              {currentArticle.next && (
                <a
                  className="article-series-link article-series-link--next"
                  href={`/vedic-maths#${articleAnchor(currentArticle.next.id)}`}
                  onClick={onAnchorLink(articleAnchor(currentArticle.next.id))}
                >
                  Next: {currentArticle.next.label} →
                </a>
              )}

              {/* Sequential Footer Navigation & Interactive CTAs */}
              <div className="article-action-footer">
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="article-pager-btn"
                    disabled={currentArticleIdx === 0}
                    onClick={() => {
                      if (currentArticleIdx > 0) {
                        selectArticle(VEDIC_ARTICLES[currentArticleIdx - 1].id);
                      }
                    }}
                  >
                    ← Previous Article
                  </button>
                  <button
                    type="button"
                    className="article-pager-btn"
                    disabled={currentArticleIdx === VEDIC_ARTICLES.length - 1}
                    onClick={() => {
                      if (currentArticleIdx < VEDIC_ARTICLES.length - 1) {
                        selectArticle(VEDIC_ARTICLES[currentArticleIdx + 1].id);
                      }
                    }}
                  >
                    Next Article →
                  </button>
                </div>

                {/* Contextual Interactive CTAs */}
                {currentArticle.id === 'birth-grid' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('zero')}
                  >
                    🏛️ Test Roman vs. Decimal Grid Laboratory →
                  </button>
                )}
                {currentArticle.id === 'fluid-space' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('fluid')}
                  >
                    🌊 Open Fluid Space &amp; Parallel Math Visualizer →
                  </button>
                )}
                {currentArticle.id === 'algebra-engine' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('algebra')}
                  >
                    📐 Launch Universal Algebra Engine Proof →
                  </button>
                )}
                {currentArticle.id === 'source-lineage' && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('parampara')}
                  >
                    🕉️ Explore Guru Parampara Sacred Lineage →
                  </button>
                )}
                {(currentArticle.id === 'magic-intro' || currentArticle.id === 'geometry-infinite') && (
                  <button
                    type="button"
                    className="article-interactive-cta"
                    onClick={() => setActiveTab('solvers')}
                  >
                    🧮 Try Interactive Mental Math Solvers →
                  </button>
                )}
              </div>
            </article>

            {onOpenGrammar && (
              <div className="article-action-footer" style={{ marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={onOpenGrammar}
                  title="Open Grammar Shelf — Kaṭapayādi article"
                >
                  🔢 Sanskrit &amp; Maths heritage · Kaṭapayādi (Grammar Shelf) →
                </button>
              </div>
            )}

            {/* CURRICULUM JOURNEY COMPLETION CARD */}
            <div className="vedic-next-track-card">
              <div className="vedic-next-track-header">
                <span className="vedic-next-track-badge">Curriculum Journey Complete · कृतकृत्यता</span>
                <h3 className="vedic-next-track-title">Mastery of Vedic Mathematics</h3>
                <p className="vedic-next-track-desc">
                  You have explored all four tracks: from the foundational 16 Sūtras to Algebra, Geometry, the Philosophy of Zero, Logic, and Historical Masterclasses. Revisit any section to sharpen your mental calculation speed.
                </p>
              </div>
              <div className="vedic-next-track-actions">
                <button
                  type="button"
                  className="article-interactive-cta"
                  onClick={() => {
                    setActiveTab('sutras');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  📜 Return to Step 1: 16 Sūtras &amp; Path →
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('solvers');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  🧮 Practice with Interactive Solvers
                </button>
                <button
                  type="button"
                  className="article-pager-btn"
                  onClick={() => {
                    setActiveTab('quiz');
                    const el = document.getElementById('vedic-tabs');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  ⚡ Challenge Speed Math Quiz
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* POSTER LIGHTBOX MODAL */}
      {isPosterModalOpen && (
        <div
          className="resources-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-vedic-poster-title"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div className="resources-modal-content" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
            <div className="resources-modal-header">
              <span className="resource-card-badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                EdNet Learn Vedic Maths Academy
              </span>
              <button
                type="button"
                className="resources-modal-close-btn"
                onClick={() => setIsPosterModalOpen(false)}
                aria-label="Close poster modal"
              >
                ✕
              </button>
            </div>

            <h3 id="modal-vedic-poster-title" className="resources-modal-title" style={{ marginBottom: '0.25rem' }}>
              16 Foundational Sutras of Vedic Mathematics
              <span className="resource-card-title-sa">षोडश-वैदिक-गणित-सूत्राणि</span>
            </h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: '#4338ca', fontStyle: 'italic' }}>
              "Vedic Mathematics is not just a method, it is a way of thinking."
            </p>

            <div className="vedic-modal-image-wrap">
              <img
                src="/vedic-sutras-poster-v3.webp"
                alt="EdNet Learn poster: the 16 Vedic Mathematics sutras of Swami Bharati Krishna Tirtha in standard order (Ekādhikena Pūrveṇa to Guṇakasamuccayaḥ), each with Sanskrit name, IAST, English meaning, use and a worked example"
                className="vedic-modal-image"
              />
            </div>

            <div className="resources-modal-actions" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="resource-action-icon-btn"
                onClick={() => setIsPosterModalOpen(false)}
              >
                <span>✕</span>
                <span>Close</span>
              </button>
              <a
                href="/vedic-sutras-poster-v3.png"
                download="EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.png"
                className="vedic-poster-btn-primary"
              >
                <span>📥</span>
                <span>Download High-Resolution Poster (PNG)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VedicMaths;
