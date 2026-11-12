import React, { useState, useEffect, useMemo, useRef } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import { playPronunciation, stopPronunciation } from '../../utils/pronunciation';
import { PreschoolActivityPictogram } from './LabPictograms';

export interface VisualChalkNode {
  labelSa: string;
  labelEn: string;
  color: string;
  value?: string;
  graphicKind?:
    | 'letter'
    | 'number'
    | 'circle'
    | 'triangle'
    | 'square'
    | 'star'
    | 'pentagon'
    | 'hexagon'
    | 'sphere'
    | 'cube'
    | 'cone'
    | 'cylinder'
    | 'droplet'
    | 'mix'
    | 'mango'
    | 'banana'
    | 'apple'
    | 'grapes'
    | 'coconut'
    | 'watermelon'
    | 'cow'
    | 'elephant'
    | 'lion'
    | 'peacock'
    | 'wave';
  conceptExplain: string;
  speakWord?: string;
}

export interface BlackboardStep {
  stepNum: number;
  titleEn: string;
  titleSa: string;
  chalkFormula: string;
  formulaTokens: { token: string; explain: string; color?: string }[];
  chalkSub: string;
  explanationEn: string;
  speakSa: string;
  diagramType: 'geometry' | 'color-mix' | 'phonics' | 'numbers' | 'cycle' | 'map' | 'harmony';
  highlightColor: string;
  visualNodes: VisualChalkNode[];
}

export interface InterlockedQuizItem {
  id: string;
  linkedStepIndex: number;
  questionEn: string;
  questionSa: string;
  chalkHint: string;
  options: {
    id: string;
    labelSa: string;
    labelEn: string;
    isCorrect: boolean;
    whyEn: string;
  }[];
}

export interface ActivityBlackboardLesson {
  id: string;
  titleEn: string;
  titleSa: string;
  kicker: string;
  steps: BlackboardStep[];
  quizzes: InterlockedQuizItem[];
}

/**
 * Hand-drawn style Chalk SVG Graphic rendered inside each sequential concept node
 */
const ChalkNodeGraphic: React.FC<{
  kind?: VisualChalkNode['graphicKind'];
  color: string;
  symbolText: string;
  isActiveBeat: boolean;
}> = ({ kind = 'letter', color, symbolText, isActiveBeat }) => {
  const strokeProps = {
    stroke: color,
    strokeWidth: 2.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
    className: `psw-kb-svg-stroke ${isActiveBeat ? 'is-drawing' : ''}`,
  };

  switch (kind) {
    case 'circle':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <circle cx="32" cy="32" r="22" {...strokeProps} />
          <circle cx="32" cy="32" r="2.5" fill={color} />
          <line x1="32" y1="32" x2="54" y2="32" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
          <text x="41" y="27" fill="#b45309" fontSize="9" fontWeight="800">r</text>
        </svg>
      );
    case 'triangle':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <polygon points="32,10 55,52 9,52" {...strokeProps} />
          <circle cx="32" cy="10" r="3.5" fill="#f59e0b" />
          <circle cx="55" cy="52" r="3.5" fill="#f59e0b" />
          <circle cx="9" cy="52" r="3.5" fill="#f59e0b" />
          <text x="27" y="42" fill={color} fontSize="12" fontWeight="900">३</text>
        </svg>
      );
    case 'square':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <rect x="13" y="13" width="38" height="38" rx="2" {...strokeProps} />
          <circle cx="13" cy="13" r="3.2" fill="#f59e0b" />
          <circle cx="51" cy="13" r="3.2" fill="#f59e0b" />
          <circle cx="51" cy="51" r="3.2" fill="#f59e0b" />
          <circle cx="13" cy="51" r="3.2" fill="#f59e0b" />
          <text x="27" y="37" fill={color} fontSize="13" fontWeight="900">४</text>
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <polygon
            points="32,8 38,24 55,24 41,35 46,52 32,42 18,52 23,35 9,24 26,24"
            {...strokeProps}
          />
          <text x="27" y="36" fill="#b45309" fontSize="11" fontWeight="900">५</text>
        </svg>
      );
    case 'pentagon':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <polygon points="32,9 54,25 46,52 18,52 10,25" {...strokeProps} />
          <text x="27" y="38" fill={color} fontSize="12" fontWeight="900">५</text>
        </svg>
      );
    case 'hexagon':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <polygon points="32,8 53,20 53,44 32,56 11,44 11,20" {...strokeProps} />
          <text x="27" y="37" fill={color} fontSize="12" fontWeight="900">६</text>
        </svg>
      );
    case 'sphere':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <circle cx="32" cy="32" r="22" {...strokeProps} />
          <ellipse cx="32" cy="32" rx="22" ry="8" stroke={color} strokeWidth="1.8" strokeDasharray="3 2" fill="none" />
          <ellipse cx="32" cy="32" rx="8" ry="22" stroke={color} strokeWidth="1.8" strokeDasharray="3 2" fill="none" />
        </svg>
      );
    case 'cube':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <rect x="12" y="20" width="28" height="28" {...strokeProps} />
          <rect x="24" y="10" width="28" height="28" stroke={color} strokeWidth="2" strokeDasharray="3 2" fill="none" />
          <line x1="12" y1="20" x2="24" y2="10" stroke={color} strokeWidth="2" />
          <line x1="40" y1="20" x2="52" y2="10" stroke={color} strokeWidth="2" />
          <line x1="40" y1="48" x2="52" y2="38" stroke={color} strokeWidth="2" />
        </svg>
      );
    case 'cone':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <path d="M32 10 L12 48 L52 48 Z" {...strokeProps} />
          <ellipse cx="32" cy="48" rx="20" ry="6" stroke={color} strokeWidth="2.2" fill="none" />
        </svg>
      );
    case 'cylinder':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <ellipse cx="32" cy="16" rx="18" ry="6" {...strokeProps} />
          <path d="M14 16 V46 C14 50 50 50 50 46 V16" {...strokeProps} />
        </svg>
      );
    case 'droplet':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <path
            d="M32 10 C32 10 50 30 50 42 C50 52 42 56 32 56 C22 56 14 52 14 42 C14 30 32 10 32 10 Z"
            {...strokeProps}
            fill={color}
            fillOpacity="0.28"
          />
          <circle cx="26" cy="40" r="4" fill="#ffffff" fillOpacity="0.6" />
        </svg>
      );
    case 'mix':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <circle cx="23" cy="32" r="14" stroke="#facc15" strokeWidth="2.4" fill={color} fillOpacity="0.22" />
          <circle cx="41" cy="32" r="14" stroke="#38bdf8" strokeWidth="2.4" fill={color} fillOpacity="0.35" />
          <circle cx="32" cy="32" r="7" fill={color} />
        </svg>
      );
    case 'number': {
      const numMatch = symbolText.split('·')[0]?.trim() || symbolText;
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <rect x="8" y="8" width="48" height="48" rx="12" stroke={color} strokeWidth="2.2" strokeDasharray="4 3" fill="rgba(255,255,255,0.03)" />
          <text x="32" y="42" textAnchor="middle" fill={color} fontSize="26" fontWeight="900">
            {numMatch}
          </text>
        </svg>
      );
    }
    case 'mango':
    case 'banana':
    case 'apple':
    case 'grapes':
    case 'coconut':
    case 'watermelon':
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <circle cx="32" cy="34" r="19" {...strokeProps} fill={color} fillOpacity="0.18" />
          <path d="M32 15 C36 9 44 11 42 16 C38 17 34 16 32 15 Z" stroke="#059669" strokeWidth="2.2" fill="#10b981" fillOpacity="0.35" />
          <text x="32" y="40" textAnchor="middle" fill={color} fontSize="15" fontWeight="900">
            {symbolText.slice(0, 2)}
          </text>
        </svg>
      );
    default: {
      const mainGlyph = symbolText.split(' ')[0] || symbolText;
      return (
        <svg viewBox="0 0 64 64" className="psw-kb-node-svg" aria-hidden="true">
          <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2.2" strokeDasharray="5 3" fill="rgba(255,255,255,0.04)" />
          <text x="32" y="41" textAnchor="middle" fill={color} fontSize="22" fontWeight="900">
            {mainGlyph}
          </text>
        </svg>
      );
    }
  }
};

const LESSON_DATABASE: Record<string, ActivityBlackboardLesson> = {
  shapes: {
    id: 'shapes',
    titleEn: 'Jyāmiti (ज्यामिति): Sacred & Everyday Shapes',
    titleSa: 'ज्यामितिः · आकाराणां गणितम्',
    kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · GEOMETRY & CORNERS',
    steps: [
      {
        stepNum: 1,
        titleEn: 'How Jyā (Cord) + Miti (Measure) Draws Shapes',
        titleSa: 'ज्या (रज्जुः) + मिति (मापनम्) = ज्यामितिः',
        chalkFormula: 'ज्या (Cord)  +  मिति (Measure)  =  ज्यामितिः (Geometry)',
        formulaTokens: [
          { token: 'ज्या (Cord)', explain: 'Ancient builders stretched a measuring cord called ज्या (Jyā)...', color: '#d97706' },
          { token: '+', explain: 'Combined with...', color: '#94a3b8' },
          { token: 'मिति (Measure)', explain: 'Exact measurement called मिति (Miti)...', color: '#0284c7' },
          { token: '=', explain: 'Which gives us...', color: '#94a3b8' },
          { token: 'ज्यामितिः (Geometry)', explain: 'ज्यामितिः — the science of drawing every shape in nature!', color: '#059669' },
        ],
        chalkSub: '0 Corners = वृत्तम् (Circle) · 3 Corners = त्रिकोणम् · 4 Corners = चतुरस्रम्',
        explanationEn: 'Watch each geometric shape draw sequentially as we count its corners from 0 up to 5!',
        speakSa: 'वृत्तम् त्रिकोणम् चतुरस्रम् तारका',
        diagramType: 'geometry',
        highlightColor: '#d97706',
        visualNodes: [
          {
            labelSa: 'वृत्तम्',
            labelEn: 'Circle · ० Corners (Sun)',
            color: '#d97706',
            value: '० Koṇa',
            graphicKind: 'circle',
            speakWord: 'वृत्तम्',
            conceptExplain: 'Graphic 1 [ वृत्तम् · Circle ]: Drawn by spinning a cord around a center point — ० sharp corners!',
          },
          {
            labelSa: 'त्रिकोणम्',
            labelEn: 'Triangle · ३ Corners (Peak)',
            color: '#e11d48',
            value: '३ Koṇa',
            graphicKind: 'triangle',
            speakWord: 'त्रिकोणम्',
            conceptExplain: 'Graphic 2 [ त्रिकोणम् · Triangle ]: ३ straight lines meet at ३ glowing yellow corner points (त्रि = 3)!',
          },
          {
            labelSa: 'चतुरस्रम्',
            labelEn: 'Square · ४ Equal Sides',
            color: '#059669',
            value: '४ Koṇa',
            graphicKind: 'square',
            speakWord: 'चतुरस्रम्',
            conceptExplain: 'Graphic 3 [ चतुरस्रम् · Square ]: ४ equal sides and ४ balanced corners (चतुर = 4)!',
          },
          {
            labelSa: 'तारका',
            labelEn: 'Star · ५ Bright Points',
            color: '#7c3aed',
            value: '५ Points',
            graphicKind: 'star',
            speakWord: 'तारका',
            conceptExplain: 'Graphic 4 [ तारका · Star ]: ५ shining points twinkling in the night sky!',
          },
        ],
      },
      {
        stepNum: 2,
        titleEn: 'Counting Corners (Koṇa · कोण): ३, ४, ५, ६',
        titleSa: 'त्रि (३) → चतुर (४) → पञ्च (५) → षट् (६)',
        chalkFormula: '३ त्रिकोणम्  →  ४ चतुरस्रम्  →  ५ पञ्चकोणम्  →  ६ षट्कोणम्',
        formulaTokens: [
          { token: '३ त्रिकोणम्', explain: '३ corners: त्रि (3) + कोण (corner) = Triangle!', color: '#e11d48' },
          { token: '→ ४ चतुरस्रम्', explain: 'Add 1 corner → ४ corners: चतुर (4) = Square!', color: '#059669' },
          { token: '→ ५ पञ्चकोणम्', explain: 'Add 1 more → ५ corners: पञ्च (5) = Pentagon flower!', color: '#0284c7' },
          { token: '→ ६ षट्कोणम्', explain: 'Add 1 more → ६ corners: षट् (6) = Honeycomb Hexagon!', color: '#d97706' },
        ],
        chalkSub: 'Every Sanskrit shape name has its exact corner number built right inside!',
        explanationEn: 'Sanskrit shape names tell you their exact math! Watch the number of corners grow from ३ to ६ as each polygon is drawn.',
        speakSa: 'त्रिकोणम् चतुरस्रम् पञ्चकोणम् षट्कोणम्',
        diagramType: 'geometry',
        highlightColor: '#0284c7',
        visualNodes: [
          {
            labelSa: '३ · त्रिकोणम्',
            labelEn: '3 Corners · Mountain Peak',
            color: '#e11d48',
            value: 'त्रि = ३',
            graphicKind: 'triangle',
            speakWord: 'त्रिकोणम्',
            conceptExplain: 'Number ३ + Triangle graphic: त्रि (3) + कोणम् (corners) = त्रिकोणम्.',
          },
          {
            labelSa: '४ · चतुरस्रम्',
            labelEn: '4 Corners · Vāstu Altar',
            color: '#059669',
            value: 'चतुर = ४',
            graphicKind: 'square',
            speakWord: 'चतुरस्रम्',
            conceptExplain: 'Number ४ + Square graphic: चतुर (4) equal corners = चतुरस्रम्.',
          },
          {
            labelSa: '५ · पञ्चकोणम्',
            labelEn: '5 Corners · 5-Petal Lotus',
            color: '#0284c7',
            value: 'पञ्च = ५',
            graphicKind: 'pentagon',
            speakWord: 'पञ्चकोणम्',
            conceptExplain: 'Number ५ + Pentagon graphic: पञ्च (5) + कोणम् = पञ्चकोणम्.',
          },
          {
            labelSa: '६ · षट्कोणम्',
            labelEn: '6 Corners · Bee Honeycomb',
            color: '#d97706',
            value: 'षट् = ६',
            graphicKind: 'hexagon',
            speakWord: 'षट्कोणम्',
            conceptExplain: 'Number ६ + Hexagon graphic: षट् (6) + कोणम् = षट्कोणम् (Honeycomb cell).',
          },
        ],
      },
      {
        stepNum: 3,
        titleEn: '2D Flat Shapes Puff Up Into 3D Solid Forms',
        titleSa: 'समतल-आकाराः → घन-आकाराः (2D → 3D)',
        chalkFormula: 'वृत्तम् (2D) → गोलः (3D)  |  चतुरस्रम् (2D) → घनः (3D)  |  त्रिकोणम् → शङ्कुः',
        formulaTokens: [
          { token: 'वृत्तम् → गोलः', explain: 'Spin a flat Circle (वृत्तम्) in 3D space → it becomes a Sphere (गोलः)!', color: '#0284c7' },
          { token: '|', explain: 'Next transformation...', color: '#64748b' },
          { token: 'चतुरस्रम् → घनः', explain: 'Stack 6 flat Squares (चतुरस्रम्) → it forms a solid Cube (घनः)!', color: '#059669' },
          { token: '|', explain: 'And third...', color: '#64748b' },
          { token: 'त्रिकोणम् → शङ्कुः', explain: 'Spin a Triangle (त्रिकोणम्) around its height → it forms a Cone (शङ्कुः)!', color: '#d97706' },
        ],
        chalkSub: 'From flat chalk drawings to real-world 3D objects!',
        explanationEn: 'Watch each 3D solid graphic appear sequentially as we transform flat 2D shapes into spheres, cubes, cones, and drums!',
        speakSa: 'गोलः घनः शङ्कुः बेलनः',
        diagramType: 'geometry',
        highlightColor: '#059669',
        visualNodes: [
          {
            labelSa: 'गोलः',
            labelEn: '3D Sphere (Earth / Ball)',
            color: '#0284c7',
            value: 'From वृत्तम्',
            graphicKind: 'sphere',
            speakWord: 'गोलः',
            conceptExplain: '3D Graphic 1 [ गोलः · Sphere ]: A round ball curving in all directions like Planet Earth!',
          },
          {
            labelSa: 'घनः',
            labelEn: '3D Cube (6 Square Faces)',
            color: '#059669',
            value: 'From चतुरस्रम्',
            graphicKind: 'cube',
            speakWord: 'घनः',
            conceptExplain: '3D Graphic 2 [ घनः · Cube ]: A solid box built from 6 equal square faces!',
          },
          {
            labelSa: 'शङ्कुः',
            labelEn: '3D Cone (Temple Spire)',
            color: '#d97706',
            value: 'From त्रिकोणम्',
            graphicKind: 'cone',
            speakWord: 'शङ्कुः',
            conceptExplain: '3D Graphic 3 [ शङ्कुः · Cone ]: Circular base rising to a single apex point!',
          },
          {
            labelSa: 'बेलनः',
            labelEn: '3D Cylinder (Mridangam Drum)',
            color: '#7c3aed',
            value: '2 Circles',
            graphicKind: 'cylinder',
            speakWord: 'बेलनः',
            conceptExplain: '3D Graphic 4 [ बेलनः · Cylinder ]: Two flat circles connected by a smooth rolling tube!',
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q-shape-1',
        linkedStepIndex: 0,
        questionEn: 'Which shape has 0 sharp corners and is drawn by spinning a cord around a center point?',
        questionSa: 'शून्य-कोणः वर्तुलः आकारः कः?',
        chalkHint: 'Check Step 1: 0 Corners = वृत्तम् (Circle).',
        options: [
          { id: 'a', labelSa: 'वृत्तम् (vṛttam)', labelEn: 'Circle — 0 corners like the Sun', isCorrect: true, whyEn: 'Correct! वृत्तम् (vṛttam) is a round circle with zero corners.' },
          { id: 'b', labelSa: 'त्रिकोणम् (trikoṇam)', labelEn: 'Triangle — 3 corners', isCorrect: false, whyEn: 'त्रिकोणम् has 3 sharp corners.' },
          { id: 'c', labelSa: 'चतुरस्रम् (caturasram)', labelEn: 'Square — 4 corners', isCorrect: false, whyEn: 'चतुरस्रम् has 4 equal corners.' },
          { id: 'd', labelSa: 'षट्कोणम् (ṣaṭkoṇam)', labelEn: 'Hexagon — 6 corners', isCorrect: false, whyEn: 'षट्कोणम् has 6 corners.' },
        ],
      },
      {
        id: 'q-shape-2',
        linkedStepIndex: 1,
        questionEn: 'In Sanskrit geometry, "Tri" means 3 and "Koṇa" means corner. What does त्रिकोणम् (Trikoṇam) mean?',
        questionSa: 'त्रिकोणम् इत्यस्य कति कोणाः सन्ति?',
        chalkHint: 'Look at Step 2: त्रि (3) + कोण (Corner) = त्रिकोणम्.',
        options: [
          { id: 'a', labelSa: '३ कोणाः · Triangle', labelEn: 'A 3-cornered Triangle (like a mountain peak)', isCorrect: true, whyEn: 'Brilliant! त्रि (3) + कोण (corner) = 3-cornered Triangle.' },
          { id: 'b', labelSa: '४ कोणाः · Square', labelEn: 'A 4-cornered Square', isCorrect: false, whyEn: '4 corners is चतुरस्रम्.' },
          { id: 'c', labelSa: '५ कोणाः · Pentagon', labelEn: 'A 5-cornered Pentagon', isCorrect: false, whyEn: '5 corners is पञ्चकोणम्.' },
          { id: 'd', labelSa: '० कोणाः · Circle', labelEn: 'A round Circle', isCorrect: false, whyEn: '0 corners is वृत्तम्.' },
        ],
      },
      {
        id: 'q-shape-3',
        linkedStepIndex: 1,
        questionEn: 'Busy honeybees build 6-cornered honeycomb rooms. What is the Sanskrit name for a 6-cornered Hexagon?',
        questionSa: 'मधुमक्षिकायाः ६-कोण-आकारः कः?',
        chalkHint: 'Check Step 2: षट् (6) + कोणम् = षट्कोणम्.',
        options: [
          { id: 'a', labelSa: 'षट्कोणम् (ṣaṭkoṇam)', labelEn: 'Hexagon — 6 corners (Ṣaṭ = 6)', isCorrect: true, whyEn: 'Exact match! षट् (6) + कोणम् (corners) = षट्कोणम् (Hexagon).' },
          { id: 'b', labelSa: 'अर्धचन्द्रः (ardhacandraḥ)', labelEn: 'Crescent Moon', isCorrect: false, whyEn: 'अर्धचन्द्रः is the curved crescent moon.' },
          { id: 'c', labelSa: 'गोलः (golaḥ)', labelEn: '3D Sphere', isCorrect: false, whyEn: 'गोलः is a round 3D sphere.' },
          { id: 'd', labelSa: 'आयतम् (āyatam)', labelEn: '4-cornered Rectangle', isCorrect: false, whyEn: 'आयतम् is a 4-sided rectangle.' },
        ],
      },
    ],
  },

  colors: {
    id: 'colors',
    titleEn: 'Varṇa-Melanam: Primary & Mixed Color Chemistry',
    titleSa: 'वर्ण-मेलन-विज्ञानम्',
    kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · PIGMENT MIXING EQUATIONS',
    steps: [
      {
        stepNum: 1,
        titleEn: 'The 3 Primary Colors (Mūla-Varṇāḥ)',
        titleSa: 'त्रयः मूल-वर्णाः · रक्तः, पीतः, नीलः',
        chalkFormula: '१ रक्तः (Red)   +   २ पीतः (Yellow)   +   ३ नीलः (Blue)',
        formulaTokens: [
          { token: '१ रक्तः (Red)', explain: 'First root pigment: रक्तः (Red) — warm like the rising sun!', color: '#ef4444' },
          { token: '+', explain: 'Next primary pigment...', color: '#94a3b8' },
          { token: '२ पीतः (Yellow)', explain: 'Second root pigment: पीतः (Yellow) — bright like turmeric (हरिद्रा)!', color: '#ca8a04' },
          { token: '+', explain: 'And third primary pigment...', color: '#94a3b8' },
          { token: '३ नीलः (Blue)', explain: 'Third root pigment: नीलः (Blue) — deep like indigo sky!', color: '#3b82f6' },
        ],
        chalkSub: 'Primary colors cannot be made by mixing other paints — they are the parents!',
        explanationEn: 'Watch each primary color droplet appear sequentially! Red (रक्तः), Yellow (पीतः), and Blue (नीलः) are the three root pigments.',
        speakSa: 'रक्तः पीतः नीलः श्वेतः',
        diagramType: 'color-mix',
        highlightColor: '#e11d48',
        visualNodes: [
          {
            labelSa: 'रक्तः',
            labelEn: 'Red · Sunrise & Apple',
            color: '#ef4444',
            value: 'Primary १',
            graphicKind: 'droplet',
            speakWord: 'रक्तः',
            conceptExplain: 'Droplet १ [ रक्तः · Red ]: Pure warm primary pigment found in red roses and apples.',
          },
          {
            labelSa: 'पीतः',
            labelEn: 'Yellow · Haldi & Banana',
            color: '#ca8a04',
            value: 'Primary २',
            graphicKind: 'droplet',
            speakWord: 'पीतः',
            conceptExplain: 'Droplet २ [ पीतः · Yellow ]: Golden primary pigment found in turmeric and ripe bananas.',
          },
          {
            labelSa: 'नीलः',
            labelEn: 'Blue · Indigo & Peacock',
            color: '#3b82f6',
            value: 'Primary ३',
            graphicKind: 'droplet',
            speakWord: 'नीलः',
            conceptExplain: 'Droplet ३ [ नीलः · Blue ]: Cool primary pigment of the sky, ocean, and peacock neck.',
          },
          {
            labelSa: 'श्वेतः',
            labelEn: 'White · Pure Sunlight',
            color: '#475569',
            value: 'Light',
            graphicKind: 'droplet',
            speakWord: 'श्वेतः',
            conceptExplain: 'Droplet ४ [ श्वेतः · White ]: Pure white light that lightens any pigment into a soft pastel!',
          },
        ],
      },
      {
        stepNum: 2,
        titleEn: 'Mixing Secondary Colors in the Cauldron',
        titleSa: 'द्वितीयक-वर्ण-समीकरणम्',
        chalkFormula: 'रक्तः (Red)  +  पीतः (Yellow)  =  काषायः (Saffron Orange)',
        formulaTokens: [
          { token: 'रक्तः (Red)', explain: 'Pour 1 drop of warm Red (रक्तः) into the cauldron...', color: '#ef4444' },
          { token: '+', explain: 'Mix together with...', color: '#94a3b8' },
          { token: 'पीतः (Yellow)', explain: '1 drop of sunny Yellow (पीतः)...', color: '#ca8a04' },
          { token: '=', explain: 'Swirl the cauldron and watch the new color appear...', color: '#94a3b8' },
          { token: 'काषायः (Orange)', explain: 'काषायः (Saffron-Orange) glows like a festive diya flame!', color: '#f97316' },
        ],
        chalkSub: 'पीतः + नीलः = हरितः (Green)  |  रक्तः + नीलः = जाम्बवः (Purple)',
        explanationEn: 'Watch each color-mixing equation appear one by one! Two primary droplets fuse into a brand-new secondary color.',
        speakSa: 'काषायः हरितः जाम्बवः पाटलः',
        diagramType: 'color-mix',
        highlightColor: '#d97706',
        visualNodes: [
          {
            labelSa: 'रक्त + पीत = काषायः',
            labelEn: 'Red + Yellow → Orange Diya',
            color: '#f97316',
            value: 'Mix १',
            graphicKind: 'mix',
            speakWord: 'काषायः',
            conceptExplain: 'Mix १ [ काषायः · Orange ]: Red (रक्तः) + Yellow (पीतः) fuse into glowing Saffron-Orange!',
          },
          {
            labelSa: 'पीत + नील = हरितः',
            labelEn: 'Yellow + Blue → Green Leaf',
            color: '#22c55e',
            value: 'Mix २',
            graphicKind: 'mix',
            speakWord: 'हरितः',
            conceptExplain: 'Mix २ [ हरितः · Green ]: Yellow (पीतः) + Blue (नीलः) blend into fresh Leaf-Green!',
          },
          {
            labelSa: 'रक्त + नील = जाम्बवः',
            labelEn: 'Red + Blue → Jamun Purple',
            color: '#a855f7',
            value: 'Mix ३',
            graphicKind: 'mix',
            speakWord: 'जाम्बवः',
            conceptExplain: 'Mix ३ [ जाम्बवः · Purple ]: Red (रक्तः) + Blue (नीलः) create deep Jamun-Berry Purple!',
          },
          {
            labelSa: 'रक्त + श्वेत = पाटलः',
            labelEn: 'Red + White → Lotus Pink',
            color: '#ec4899',
            value: 'Mix ४',
            graphicKind: 'mix',
            speakWord: 'पाटलः',
            conceptExplain: 'Mix ४ [ पाटलः · Pink ]: Red (रक्तः) + White (श्वेतः) soften into blooming Lotus-Pink!',
          },
        ],
      },
      {
        stepNum: 3,
        titleEn: '7 Colors Inside White Sunlight (Saptāśva)',
        titleSa: 'सूर्यस्य सप्त-किरणाः · इन्द्रधनुः',
        chalkFormula: 'श्वेत-प्रकाशः (Sunlight)  →  वृष्टि-बिन्दुः (Raindrop)  →  ७ इन्द्रधनुः वर्णाः',
        formulaTokens: [
          { token: 'श्वेत-प्रकाशः', explain: 'Start with a beam of pure white sunlight (श्वेत-प्रकाशः)...', color: '#475569' },
          { token: '→ वृष्टि-बिन्दुः', explain: 'It enters a tiny floating raindrop in the sky...', color: '#0284c7' },
          { token: '→ ७ इन्द्रधनुः वर्णाः', explain: 'And unfolds sequentially into 7 glowing rainbow colors (सप्त-किरणाः)!', color: '#059669' },
        ],
        chalkSub: 'Vedic poets called the 7 colors the 7 horses of Sūrya (सप्ताश्वः)!',
        explanationEn: 'Nature makes colors from plants, minerals, and sunlight! Watch each natural Indian pigment appear on the board.',
        speakSa: 'हरिद्रा नीली कुङ्कुमम् कमलम्',
        diagramType: 'harmony',
        highlightColor: '#059669',
        visualNodes: [
          {
            labelSa: 'हरिद्रा → पीतः',
            labelEn: 'Turmeric Root gives Yellow',
            color: '#ca8a04',
            graphicKind: 'droplet',
            speakWord: 'पीतः',
            conceptExplain: 'Natural Dye १: Golden Turmeric (हरिद्रा) gives us bright पीतः (Yellow).',
          },
          {
            labelSa: 'नीली → नीलः',
            labelEn: 'Indigo Leaf gives Blue',
            color: '#3b82f6',
            graphicKind: 'droplet',
            speakWord: 'नीलः',
            conceptExplain: 'Natural Dye २: The Indian Indigo plant (नीली) gives the world नीलः (Blue).',
          },
          {
            labelSa: 'कुङ्कुमम् → काषायः',
            labelEn: 'Saffron Stigma gives Orange',
            color: '#f97316',
            graphicKind: 'droplet',
            speakWord: 'काषायः',
            conceptExplain: 'Natural Dye ३: Sacred Saffron (कुङ्कुमम्) gives warm काषायः (Orange).',
          },
          {
            labelSa: 'कमलम् → पाटलः',
            labelEn: 'Lotus Petal gives Pink',
            color: '#ec4899',
            graphicKind: 'droplet',
            speakWord: 'पाटलः',
            conceptExplain: 'Natural Dye ४: Blooming Lotus petals (कमलम्) show soft पाटलः (Pink).',
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q-col-1',
        linkedStepIndex: 1,
        questionEn: 'Look at the Blackboard Equation: What color appears when you mix पीतः (Yellow) + नीलः (Blue)?',
        questionSa: 'पीतः + नीलः = कः वर्णः भवति?',
        chalkHint: 'Check Step 2: पीतः (Yellow) + नीलः (Blue) = हरितः (Green).',
        options: [
          { id: 'a', labelSa: 'हरितः (haritaḥ)', labelEn: 'Green — like a fresh leaf!', isCorrect: true, whyEn: 'Spot on! Yellow (पीतः) + Blue (नीलः) makes Green (हरितः).' },
          { id: 'b', labelSa: 'काषायः (kāṣāyaḥ)', labelEn: 'Orange — Red + Yellow', isCorrect: false, whyEn: 'काषायः (Orange) is made from Red + Yellow.' },
          { id: 'c', labelSa: 'जाम्बवः (jāmbavaḥ)', labelEn: 'Purple — Red + Blue', isCorrect: false, whyEn: 'जाम्बवः (Purple) is made from Red + Blue.' },
          { id: 'd', labelSa: 'श्वेतः (śvetaḥ)', labelEn: 'White', isCorrect: false, whyEn: 'Yellow + Blue makes Green (हरितः).' },
        ],
      },
      {
        id: 'q-col-2',
        linkedStepIndex: 1,
        questionEn: 'Which two colors mix to create काषायः (Saffron / Orange) like a warm diya flame?',
        questionSa: 'काषाय-वर्णाय कौ वर्णौ मेलनीयौ?',
        chalkHint: 'See Step 2: रक्तः (Red) + पीतः (Yellow) = काषायः (Orange).',
        options: [
          { id: 'a', labelSa: 'रक्तः + पीतः', labelEn: 'Red + Yellow', isCorrect: true, whyEn: 'Correct! Red (रक्तः) + Yellow (पीतः) blends into glowing Saffron-Orange (काषायः).' },
          { id: 'b', labelSa: 'नीलः + श्वेतः', labelEn: 'Blue + White', isCorrect: false, whyEn: 'Blue + White makes sky-blue.' },
          { id: 'c', labelSa: 'पीतः + नीलः', labelEn: 'Yellow + Blue', isCorrect: false, whyEn: 'Yellow + Blue makes Green.' },
          { id: 'd', labelSa: 'रक्तः + नीलः', labelEn: 'Red + Blue', isCorrect: false, whyEn: 'Red + Blue makes Purple (जाम्बवः).' },
        ],
      },
      {
        id: 'q-col-3',
        linkedStepIndex: 1,
        questionEn: 'What do we get when we mix रक्तः (Red) + श्वेतः (White)?',
        questionSa: 'रक्तः + श्वेतः = कः वर्णः?',
        chalkHint: 'Look at Mix 4 in Step 2: Red + White = Lotus Pink!',
        options: [
          { id: 'a', labelSa: 'पाटलः (pāṭalaḥ)', labelEn: 'Pink — like a blooming Lotus (कमलम्)', isCorrect: true, whyEn: 'Wonderful! Red + White softens into पाटलः (Pink).' },
          { id: 'b', labelSa: 'नीलः (nīlaḥ)', labelEn: 'Blue', isCorrect: false, whyEn: 'नीलः is pure Blue.' },
          { id: 'c', labelSa: 'हरितः (haritaḥ)', labelEn: 'Green', isCorrect: false, whyEn: 'हरितः is Green.' },
          { id: 'd', labelSa: 'पीतः (pītaḥ)', labelEn: 'Yellow', isCorrect: false, whyEn: 'पीतः is Yellow.' },
        ],
      },
    ],
  },

  counting: {
    id: 'counting',
    titleEn: 'Saṅkhyā-Gaṇanam: Sanskrit Numbers १ to १०',
    titleSa: 'संख्या-गणनम् · १ तः १० पर्यन्तम्',
    kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · NUMBER SENSE & COUNTING',
    steps: [
      {
        stepNum: 1,
        titleEn: 'First Five Numbers Appear Sequentially: १, २, ३, ४, ५',
        titleSa: 'एकम् · द्वे · त्रीणि · चत्वारि · पञ्च',
        chalkFormula: '१ एकम् (1)  →  २ द्वे (2)  →  ३ त्रीणि (3)  →  ४ चत्वारि (4)  →  ५ पञ्च (5)',
        formulaTokens: [
          { token: '१ एकम्', explain: 'Number १ appears: एकम् (One) — like १ shining Sun in the sky!', color: '#f59e0b' },
          { token: '→ २ द्वे', explain: 'Add १ more → Number २ appears: द्वे (Two) — २ graceful swans!', color: '#0284c7' },
          { token: '→ ३ त्रीणि', explain: 'Add १ more → Number ३ appears: त्रीणि (Three) — ३ sweet mangoes!', color: '#059669' },
          { token: '→ ४ चत्वारि', explain: 'Add १ more → Number ४ appears: चत्वारि (Four) — ४ directions!', color: '#e11d48' },
          { token: '→ ५ पञ्च', explain: 'Add १ more → Number ५ appears: पञ्च (Five) — ५ fingers on your hand!', color: '#7c3aed' },
        ],
        chalkSub: 'Count on one hand: 5 fingers = पञ्च अङ्गुलयः!',
        explanationEn: 'Watch each Devanagari numeral and its counting dots appear sequentially as we count from १ (Ekam) to ५ (Pañca)!',
        speakSa: 'एकम् द्वे त्रीणि चत्वारि पञ्च',
        diagramType: 'numbers',
        highlightColor: '#0284c7',
        visualNodes: [
          {
            labelSa: '१ · एकम्',
            labelEn: '1 Bright Sun (एकः सूर्यः)',
            color: '#f59e0b',
            value: '●',
            graphicKind: 'number',
            speakWord: 'एकम्',
            conceptExplain: 'Numeral १ [ एकम् · One ]: One single dot (●) — there is १ Sun (सूर्यः) in our sky!',
          },
          {
            labelSa: '२ · द्वे',
            labelEn: '2 White Swans (द्वौ हंसौ)',
            color: '#0284c7',
            value: '●●',
            graphicKind: 'number',
            speakWord: 'द्वे',
            conceptExplain: 'Numeral २ [ द्वे · Two ]: १ + १ = २ dots (●●) — like २ eyes and २ wings of a swan!',
          },
          {
            labelSa: '३ · त्रीणि',
            labelEn: '3 Mangoes (त्रीणि आम्राणि)',
            color: '#059669',
            value: '●●●',
            graphicKind: 'number',
            speakWord: 'त्रीणि',
            conceptExplain: 'Numeral ३ [ त्रीणि · Three ]: २ + १ = ३ dots (●●●) — like ३ leaves on a Bilva stem!',
          },
          {
            labelSa: '५ · पञ्च',
            labelEn: '5 Stars (पञ्च ताराः)',
            color: '#7c3aed',
            value: '●●●●●',
            graphicKind: 'number',
            speakWord: 'पञ्च',
            conceptExplain: 'Numeral ५ [ पञ्च · Five ]: ५ glowing dots (●●●●●) — count all ५ fingers on one hand!',
          },
        ],
      },
      {
        stepNum: 2,
        titleEn: 'Six to Ten & The Power of Zero: ६, ७, ८, ९, १०',
        titleSa: 'षट् · सप्त · अष्ट · नव · दश (१ + ० = १०)',
        chalkFormula: '६ षट् (6)  →  ७ सप्त (7)  →  ८ अष्ट (8)  →  ९ नव (9)  →  १० दश (10)',
        formulaTokens: [
          { token: '६ षट्', explain: 'Number ६ appears: षट् (Six) — ६ sides of a bee’s honeycomb!', color: '#e11d48' },
          { token: '→ ७ सप्त', explain: 'Number ७ appears: सप्त (Seven) — ७ colors in the rainbow!', color: '#0284c7' },
          { token: '→ ८ अष्ट', explain: 'Number ८ appears: अष्ट (Eight) — ८ petals of an auspicious lotus!', color: '#059669' },
          { token: '→ ९ नव', explain: 'Number ९ appears: नव (Nine) — ९ cosmic gems (नवरत्नम्)!', color: '#7c3aed' },
          { token: '→ १० दश', explain: 'Join १ (Eka) with ० (Śūnya · Zero) → १० दश (Ten)!', color: '#d97706' },
        ],
        chalkSub: '१ (Eka) + ० (Śūnya · Zero) = १० दश (Ten)!',
        explanationEn: 'India gifted the world Śūnya (० · Zero)! Watch how ६, ७, ८, and १० appear step by step.',
        speakSa: 'षट् सप्त अष्ट नव दश',
        diagramType: 'numbers',
        highlightColor: '#d97706',
        visualNodes: [
          {
            labelSa: '६ · षट्',
            labelEn: '6 Buzzing Bees (षट् भ्रमराः)',
            color: '#e11d48',
            value: '●●●●●●',
            graphicKind: 'number',
            speakWord: 'षट्',
            conceptExplain: 'Numeral ६ [ षट् · Six ]: ५ + १ = ६ — honeybees have ६ legs and build ६-cornered cells!',
          },
          {
            labelSa: '७ · सप्त',
            labelEn: '7 Rainbow Hues (सप्त वर्णाः)',
            color: '#0284c7',
            value: '●●●●●●●',
            graphicKind: 'number',
            speakWord: 'सप्त',
            conceptExplain: 'Numeral ७ [ सप्त · Seven ]: ६ + १ = ७ — ७ rainbow colors and ७ musical notes (सप्त-स्वराः)!',
          },
          {
            labelSa: '८ · अष्ट',
            labelEn: '8 Lotuses (अष्ट कमलानि)',
            color: '#059669',
            value: '●●●●●●●●',
            graphicKind: 'number',
            speakWord: 'अष्ट',
            conceptExplain: 'Numeral ८ [ अष्ट · Eight ]: ७ + १ = ८ — ८ directions in space (अष्ट-दिशः)!',
          },
          {
            labelSa: '१० · दश',
            labelEn: '10 Fingers (दश अङ्गुलयः)',
            color: '#d97706',
            value: '१ + ० = १०',
            graphicKind: 'number',
            speakWord: 'दश',
            conceptExplain: 'Numeral १० [ दश · Ten ]: Digit १ placed next to शून्य (०) makes १० — all १० fingers on both hands!',
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q-cnt-1',
        linkedStepIndex: 0,
        questionEn: 'How do we say the number 5 (५ — Five fingers on one hand) in Sanskrit?',
        questionSa: '५ (Five) इत्यस्य संस्कृत-नाम किम्?',
        chalkHint: 'Look at Step 1: १ एकम्, २ द्वे, ३ त्रीणि, ४ चत्वारि, ५ पञ्च!',
        options: [
          { id: 'a', labelSa: '५ · पञ्च (pañca)', labelEn: 'Pañca — Five', isCorrect: true, whyEn: 'Correct! ५ is पञ्च (pañca), as in Pañcatantra and Pañcabhūta.' },
          { id: 'b', labelSa: '२ · द्वे (dve)', labelEn: 'Dve — Two', isCorrect: false, whyEn: 'द्वे means 2.' },
          { id: 'c', labelSa: '३ · त्रीणि (trīṇi)', labelEn: 'Trīṇi — Three', isCorrect: false, whyEn: 'त्रीणि means 3.' },
          { id: 'd', labelSa: '८ · अष्ट (aṣṭa)', labelEn: 'Aṣṭa — Eight', isCorrect: false, whyEn: 'अष्ट means 8.' },
        ],
      },
      {
        id: 'q-cnt-2',
        linkedStepIndex: 1,
        questionEn: 'There are 7 colors in a rainbow (सप्त वर्णाः). Which Sanskrit number means 7?',
        questionSa: 'इन्द्रधनुषि कति वर्णाः सन्ति? (7)',
        chalkHint: 'Check Step 2: ६ षट्, ७ सप्त, ८ अष्ट.',
        options: [
          { id: 'a', labelSa: '७ · सप्त (sapta)', labelEn: 'Sapta — Seven', isCorrect: true, whyEn: 'Great job! ७ is सप्त (sapta), like the 7 musical notes (Saptak) and 7 rainbow colors.' },
          { id: 'b', labelSa: '६ · षट् (ṣaṭ)', labelEn: 'Ṣaṭ — Six', isCorrect: false, whyEn: 'षट् means 6.' },
          { id: 'c', labelSa: '९ · नव (nava)', labelEn: 'Nava — Nine', isCorrect: false, whyEn: 'नव means 9.' },
          { id: 'd', labelSa: '४ · चत्वारि (catvāri)', labelEn: 'Catvāri — Four', isCorrect: false, whyEn: 'चत्वारि means 4.' },
        ],
      },
      {
        id: 'q-cnt-3',
        linkedStepIndex: 1,
        questionEn: 'When we write १ followed by शून्य (० · Zero), which Sanskrit number do we get?',
        questionSa: '१० इत्यस्य संस्कृत-नाम किम्?',
        chalkHint: 'Look at the end of Step 2: १० = दश (Ten)!',
        options: [
          { id: 'a', labelSa: '१० · दश (daśa)', labelEn: 'Daśa — Ten (10)', isCorrect: true, whyEn: 'Awesome! १० is दश (daśa · Ten).' },
          { id: 'b', labelSa: '१ · एकम् (ekam)', labelEn: 'Ekam — One (1)', isCorrect: false, whyEn: 'एकम् is 1.' },
          { id: 'c', labelSa: '८ · अष्ट (aṣṭa)', labelEn: 'Aṣṭa — Eight (8)', isCorrect: false, whyEn: 'अष्ट is 8.' },
          { id: 'd', labelSa: '५ · पञ्च (pañca)', labelEn: 'Pañca — Five (5)', isCorrect: false, whyEn: 'पञ्च is 5.' },
        ],
      },
    ],
  },
};

/**
 * Fallback generator so all 24 Preschool & Next-Level games have a tailored
 * sequential Khan Academy–style Blackboard Lesson + Interlocked Quiz!
 */
function getLessonForActivity(
  actId: string,
  labelEn: string,
  labelSa: string,
  desc: string,
  taglineSa: string,
): ActivityBlackboardLesson {
  if (LESSON_DATABASE[actId]) {
    return LESSON_DATABASE[actId];
  }

  if (actId === 'fruits') {
    return {
      id: 'fruits',
      titleEn: 'Phala-Vijñānam: Sweet Fruits & Plant Seeds',
      titleSa: 'फल-सङ्ग्रहः · वृक्ष-पोषणम्',
      kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · BOTANY & SANSKRIT NAMES',
      steps: [
        {
          stepNum: 1,
          titleEn: 'How Flowers Become Sweet Fruits (पुष्पम् → फलम्)',
          titleSa: 'आतपः (Sun) + जलम् (Water) → मधुरं फलम्',
          chalkFormula: 'पुष्पम् (Flower)  +  सूर्य-प्रकाशः (Sun)  +  जलम् (Water)  =  मधुरं फलम् (Fruit)',
          formulaTokens: [
            { token: 'पुष्पम् (Flower)', explain: 'First, a fragrant blossom (पुष्पम्) opens on the branch...', color: '#e11d48' },
            { token: '+ सूर्य-प्रकाशः', explain: 'Green leaves catch golden sunlight (सूर्य-प्रकाशः)...', color: '#d97706' },
            { token: '+ जलम्', explain: 'Roots drink cool water (जलम्) from the soil...', color: '#0284c7' },
            { token: '= मधुरं फलम्', explain: 'And the flower swells into a sweet ripe fruit (मधुरं फलम्)!', color: '#059669' },
          ],
          chalkSub: 'आम्रम् (Mango) · कदलीफलम् (Banana) · सेवफलम् (Apple)',
          explanationEn: 'Watch each fruit symbol and Sanskrit name appear sequentially as we see how trees nourish their fruits!',
          speakSa: 'आम्रम् कदलीफलम् सेवफलम् द्राक्षाफलम्',
          diagramType: 'cycle',
          highlightColor: '#059669',
          visualNodes: [
            {
              labelSa: 'आम्रम्',
              labelEn: 'Mango · King of Fruits',
              color: '#f59e0b',
              value: '१ Sweet',
              graphicKind: 'mango',
              speakWord: 'आम्रम्',
              conceptExplain: 'Fruit Graphic १ [ आम्रम् · Mango ]: Golden summer fruit with one big seed inside.',
            },
            {
              labelSa: 'कदलीफलम्',
              labelEn: 'Banana · Golden Energy',
              color: '#d97706',
              value: '२ Soft',
              graphicKind: 'banana',
              speakWord: 'कदलीफलम्',
              conceptExplain: 'Fruit Graphic २ [ कदलीफलम् · Banana ]: Curved yellow peel packed with instant energy.',
            },
            {
              labelSa: 'सेवफलम्',
              labelEn: 'Apple · Crispy Red',
              color: '#ef4444',
              value: '३ Crunchy',
              graphicKind: 'apple',
              speakWord: 'सेवफलम्',
              conceptExplain: 'Fruit Graphic ३ [ सेवफलम् · Apple ]: Crunchy red fruit that grows in cool mountain orchards.',
            },
            {
              labelSa: 'द्राक्षाफलम्',
              labelEn: 'Grapes · Juicy Bunch',
              color: '#7c3aed',
              value: '४ Cluster',
              graphicKind: 'grapes',
              speakWord: 'द्राक्षाफलम्',
              conceptExplain: 'Fruit Graphic ४ [ द्राक्षाफलम् · Grapes ]: Many round berries growing together in a bunch!',
            },
          ],
        },
        {
          stepNum: 2,
          titleEn: 'Water-Rich & Shell-Protected Fruits',
          titleSa: 'नारिकेलम् (Coconut) & कालिङ्गम् (Watermelon)',
          chalkFormula: 'नारिकेलम् (Hard Shell + Water)   |   कालिङ्गम् (Juicy Red Watermelon)',
          formulaTokens: [
            { token: 'नारिकेलम्', explain: 'नारिकेलम् (Coconut) protects pure sweet water inside a tough shell!', color: '#0284c7' },
            { token: '|', explain: 'And alongside it...', color: '#64748b' },
            { token: 'कालिङ्गम्', explain: 'कालिङ्गम् (Watermelon) holds cool red juice for hot summer days!', color: '#059669' },
          ],
          chalkSub: 'कालिङ्गम् gets its name from ancient Kalinga land!',
          explanationEn: 'Nature packages pure water inside fruits! Watch each water-rich fruit appear on the board.',
          speakSa: 'नारिकेलम् कालिङ्गम् नारङ्गफलम्',
          diagramType: 'harmony',
          highlightColor: '#0284c7',
          visualNodes: [
            {
              labelSa: 'नारिकेलम्',
              labelEn: 'Coconut · Sacred Water',
              color: '#0284c7',
              graphicKind: 'coconut',
              speakWord: 'नारिकेलम्',
              conceptExplain: 'Fruit Graphic १ [ नारिकेलम् · Coconut ]: Tall coastal palm fruit filled with sweet water.',
            },
            {
              labelSa: 'कालिङ्गम्',
              labelEn: 'Watermelon · Summer Cooler',
              color: '#059669',
              graphicKind: 'watermelon',
              speakWord: 'कालिङ्गम्',
              conceptExplain: 'Fruit Graphic २ [ कालिङ्गम् · Watermelon ]: Green striped rind outside, ruby red juice inside!',
            },
            {
              labelSa: 'नारङ्गफलम्',
              labelEn: 'Orange · Juicy Segments',
              color: '#fb923c',
              graphicKind: 'mango',
              speakWord: 'नारङ्गफलम्',
              conceptExplain: 'Fruit Graphic ३ [ नारङ्गफलम् · Orange ]: The English word "Orange" comes from Sanskrit नारङ्ग!',
            },
            {
              labelSa: 'तृण-बदरी',
              labelEn: 'Strawberry · Dotted Berry',
              color: '#e11d48',
              graphicKind: 'apple',
              speakWord: 'बदरी',
              conceptExplain: 'Fruit Graphic ४ [ तृण-बदरी · Strawberry ]: Tiny seeds sit right on the outside of its red coat!',
            },
          ],
        },
      ],
      quizzes: [
        {
          id: 'q-fr-1',
          linkedStepIndex: 0,
          questionEn: 'Which golden summer fruit is called आम्रम् (āmram) in Sanskrit?',
          questionSa: 'आम्रम् इत्यस्य आङ्ग्ल-नाम किम्?',
          chalkHint: 'Check Step 1: आम्रम् = Mango (King of Fruits)!',
          options: [
            { id: 'a', labelSa: 'आम्रम् · Mango', labelEn: 'Mango — the sweet golden fruit', isCorrect: true, whyEn: 'Correct! आम्रम् (āmram) is the sweet Mango.' },
            { id: 'b', labelSa: 'सेवफलम् · Apple', labelEn: 'Apple', isCorrect: false, whyEn: 'Apple is सेवफलम्.' },
            { id: 'c', labelSa: 'द्राक्षाफलम् · Grapes', labelEn: 'Grapes', isCorrect: false, whyEn: 'Grapes are द्राक्षाफलम्.' },
            { id: 'd', labelSa: 'कदलीफलम् · Banana', labelEn: 'Banana', isCorrect: false, whyEn: 'Banana is कदलीफलम्.' },
          ],
        },
        {
          id: 'q-fr-2',
          linkedStepIndex: 1,
          questionEn: 'Which fruit has a sturdy brown shell with cool sweet water inside and is called नारिकेलम्?',
          questionSa: 'नारिकेलम् नाम किम् फलम्?',
          chalkHint: 'Look at Step 2: नारिकेलम् = Hard Shell + Cool Water.',
          options: [
            { id: 'a', labelSa: 'नारिकेलम् · Coconut', labelEn: 'Coconut', isCorrect: true, whyEn: 'Spot on! नारिकेलम् (nārikelam) is the Coconut.' },
            { id: 'b', labelSa: 'तृण-बदरी · Strawberry', labelEn: 'Strawberry', isCorrect: false, whyEn: 'तृण-बदरी is Strawberry.' },
            { id: 'c', labelSa: 'कालिङ्गम् · Watermelon', labelEn: 'Watermelon', isCorrect: false, whyEn: 'कालिङ्गम् is Watermelon.' },
            { id: 'd', labelSa: 'नारङ्गफलम् · Orange', labelEn: 'Orange', isCorrect: false, whyEn: 'नारङ्गफलम् is Orange.' },
          ],
        },
      ],
    };
  }

  if (actId === 'animals') {
    return {
      id: 'animals',
      titleEn: 'Paśu-Dhvanayaḥ: Animal Habitats & Calls',
      titleSa: 'पशु-पक्षिणां ध्वनि-विज्ञानम्',
      kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · ZOOLOGY & HABITATS',
      steps: [
        {
          stepNum: 1,
          titleEn: 'Home, Woods & Jungle Habitats Appear Sequentially',
          titleSa: 'ग्राम्याः (Home) → उपवनम् (Woods) → अरण्यम् (Jungle)',
          chalkFormula: 'धेनुः (Cow · Home)  →  मयूरः (Peacock · Woods)  →  सिंहः (Lion · Jungle)',
          formulaTokens: [
            { token: 'धेनुः (Home)', explain: 'Near our home lives the gentle Cow — धेनुः (Dhenuḥ)!', color: '#d97706' },
            { token: '→ मयूरः (Woods)', explain: 'In the green groves dances the Peacock — मयूरः (Mayūraḥ)!', color: '#059669' },
            { token: '→ सिंहः (Jungle)', explain: 'In the deep forest roars the Lion — सिंहः (Siṁhaḥ)!', color: '#fb923c' },
          ],
          chalkSub: 'Every animal has a unique Sanskrit name and voice (ध्वनिः)!',
          explanationEn: 'Watch each animal symbol and its Sanskrit voice appear sequentially from home to forest!',
          speakSa: 'धेनुः गजः सिंहः मयूरः',
          diagramType: 'map',
          highlightColor: '#d97706',
          visualNodes: [
            {
              labelSa: 'धेनुः',
              labelEn: 'Cow · हम्बा-हम्बा (Home)',
              color: '#d97706',
              value: 'Home',
              graphicKind: 'letter',
              speakWord: 'धेनुः',
              conceptExplain: 'Animal १ [ धेनुः · Cow ]: Lives near the village home and calls "Hambā-Hambā".',
            },
            {
              labelSa: 'गजः',
              labelEn: 'Elephant · चिङ्घारः (Forest)',
              color: '#0284c7',
              value: 'Forest',
              graphicKind: 'letter',
              speakWord: 'गजः',
              conceptExplain: 'Animal २ [ गजः · Elephant ]: Giant gentle forest friend with a long trunk (शुण्डा).',
            },
            {
              labelSa: 'सिंहः',
              labelEn: 'Lion · गर्जति (Jungle King)',
              color: '#fb923c',
              value: 'Jungle',
              graphicKind: 'letter',
              speakWord: 'सिंहः',
              conceptExplain: 'Animal ३ [ सिंहः · Lion ]: King of the forest (वनराजः) whose mighty roar is गर्जति!',
            },
            {
              labelSa: 'मयूरः',
              labelEn: 'Peacock · केका-केका (Rain)',
              color: '#059669',
              value: 'Groves',
              graphicKind: 'letter',
              speakWord: 'मयूरः',
              conceptExplain: 'Animal ४ [ मयूरः · Peacock ]: Spreads rainbow feathers and sings "Kekā-Kekā" when clouds gather!',
            },
          ],
        },
      ],
      quizzes: [
        {
          id: 'q-an-1',
          linkedStepIndex: 0,
          questionEn: 'Which bird spreads its rainbow feathers when rain clouds arrive and is called मयूरः?',
          questionSa: 'मेघं दृष्ट्वा कः नृत्यति? (मयूरः)',
          chalkHint: 'See the blackboard: मयूरः = Dancing Peacock!',
          options: [
            { id: 'a', labelSa: 'मयूरः (mayūraḥ)', labelEn: 'Peacock — dances in the monsoon', isCorrect: true, whyEn: 'Correct! मयूरः (mayūraḥ) is the dancing Peacock.' },
            { id: 'b', labelSa: 'सिंहः (siṁhaḥ)', labelEn: 'Lion', isCorrect: false, whyEn: 'सिंहः is the Lion.' },
            { id: 'c', labelSa: 'मूषकः (mūṣakaḥ)', labelEn: 'Mouse', isCorrect: false, whyEn: 'मूषकः is the tiny Mouse.' },
            { id: 'd', labelSa: 'मण्डूकः (maṇḍūkaḥ)', labelEn: 'Frog', isCorrect: false, whyEn: 'मण्डूकः is the jumping Frog.' },
          ],
        },
        {
          id: 'q-an-2',
          linkedStepIndex: 0,
          questionEn: 'What is the Sanskrit name for the roaring King of the Forest (Lion)?',
          questionSa: 'वनराजः "Lion" संस्कृते किम् उच्यते?',
          chalkHint: 'Look at the orange node on the blackboard: सिंहः · गर्जति!',
          options: [
            { id: 'a', labelSa: 'सिंहः (siṁhaḥ)', labelEn: 'Majestic Lion', isCorrect: true, whyEn: 'Spot on! सिंहः (siṁhaḥ) is the Lion.' },
            { id: 'b', labelSa: 'धेनुः (dhenuḥ)', labelEn: 'Sacred Cow', isCorrect: false, whyEn: 'धेनुः is the Cow.' },
            { id: 'c', labelSa: 'काकः (kākaḥ)', labelEn: 'Clever Crow', isCorrect: false, whyEn: 'काकः is the Crow.' },
            { id: 'd', labelSa: 'श्वा (śvā)', labelEn: 'Playful Puppy', isCorrect: false, whyEn: 'श्वा is the Dog/Puppy.' },
          ],
        },
      ],
    };
  }

  return {
    id: actId,
    titleEn: `${labelEn} — Chalkboard Concept Studio`,
    titleSa: labelSa,
    kicker: 'KHAN-STYLE SEQUENTIAL CHALKBOARD · INTERACTIVE CONCEPT & QUIZ',
    steps: [
      {
        stepNum: 1,
        titleEn: `Step-by-Step Pattern of ${labelEn}`,
        titleSa: taglineSa || labelSa,
        chalkFormula: `१ निरीक्षणम् (Observe)  →  २ श्रवणम् (Listen)  →  ३ प्रयोगः (${labelSa})`,
        formulaTokens: [
          { token: '१ निरीक्षणम् (Observe)', explain: `First, observe the visual symbol for ${labelEn}...`, color: '#d97706' },
          { token: '→ २ श्रवणम् (Listen)', explain: `Next, listen to the Sanskrit pronunciation "${taglineSa || labelSa}"...`, color: '#0284c7' },
          { token: `→ ३ प्रयोगः (${labelSa})`, explain: 'Then connect the sound and graphic in the interactive activity!', color: '#059669' },
        ],
        chalkSub: desc,
        explanationEn: `${desc} Watch each symbol and concept node appear sequentially on the blackboard.`,
        speakSa: taglineSa || labelSa,
        diagramType: 'harmony',
        highlightColor: '#0284c7',
        visualNodes: [
          {
            labelSa: `१ · ${labelSa}`,
            labelEn: labelEn,
            color: '#d97706',
            value: 'Concept १',
            graphicKind: 'letter',
            speakWord: labelSa,
            conceptExplain: `Concept १ [ ${labelSa} ]: Core Sanskrit symbol and title for ${labelEn}.`,
          },
          {
            labelSa: '२ · श्रवणम्',
            labelEn: 'Listen to Sanskrit Sound',
            color: '#0284c7',
            value: 'Concept २',
            graphicKind: 'circle',
            speakWord: 'श्रवणम्',
            conceptExplain: 'Concept २ [ श्रवणम् ]: Hear the clear syllable vibration aloud.',
          },
          {
            labelSa: '३ · निरीक्षणम्',
            labelEn: 'Spot Visual Pattern',
            color: '#059669',
            value: 'Concept ३',
            graphicKind: 'triangle',
            speakWord: 'निरीक्षणम्',
            conceptExplain: 'Concept ३ [ निरीक्षणम् ]: Connect the shape, number, or picture to its Sanskrit root.',
          },
          {
            labelSa: '४ · प्रज्ञा',
            labelEn: 'Master the Quiz',
            color: '#7c3aed',
            value: 'Concept ४',
            graphicKind: 'star',
            speakWord: 'प्रज्ञा',
            conceptExplain: 'Concept ४ [ प्रज्ञा ]: Lock in your mastery by solving the interlocked quiz on the right!',
          },
        ],
      },
    ],
    quizzes: [
      {
        id: `q-${actId}-1`,
        linkedStepIndex: 0,
        questionEn: `What is the Sanskrit title for "${labelEn}" shown on the blackboard?`,
        questionSa: `"${labelEn}" इत्यस्य संस्कृत-नाम किम्?`,
        chalkHint: `Look at Concept 1 on the chalkboard: ${labelSa}`,
        options: [
          { id: 'a', labelSa: labelSa, labelEn: `Correct match for ${labelEn}`, isCorrect: true, whyEn: `Great job! ${labelSa} is the Sanskrit name for ${labelEn}.` },
          { id: 'b', labelSa: 'सङ्ख्या-गणनम्', labelEn: 'Counting Numbers', isCorrect: false, whyEn: 'सङ्ख्या-गणनम् means Counting Numbers.' },
          { id: 'c', labelSa: 'वर्ण-मेलनम्', labelEn: 'Color Mixing', isCorrect: false, whyEn: 'वर्ण-मेलनम् means Color Mixing.' },
          { id: 'd', labelSa: 'वाद्य-ध्वनिः', labelEn: 'Musical Instruments', isCorrect: false, whyEn: 'वाद्य-ध्वनिः means Musical Instruments.' },
        ],
      },
    ],
  };
}

export interface PreschoolBlackboardProps {
  activityId: string;
  labelEn: string;
  labelSa: string;
  desc: string;
  taglineSa: string;
  gameStars: number;
  energyPoints: number;
  onAwardPoints: (pts: number, reason: string) => void;
  onSwitchToPlay?: () => void;
}

export const PreschoolBlackboard: React.FC<PreschoolBlackboardProps> = ({
  activityId,
  labelEn,
  labelSa,
  desc,
  taglineSa,
  gameStars,
  energyPoints,
  onAwardPoints,
  onSwitchToPlay,
}) => {
  const lesson = useMemo(
    () => getLessonForActivity(activityId, labelEn, labelSa, desc, taglineSa),
    [activityId, labelEn, labelSa, desc, taglineSa],
  );

  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [activeQuizIdx, setActiveQuizIdx] = useState(0);
  const [selectedOptId, setSelectedOptId] = useState<string | null>(null);
  const [solvedQuizzes, setSolvedQuizzes] = useState<string[]>([]);
  const [isNarrating, setIsNarrating] = useState(false);
  const [pointToast, setPointToast] = useState<string | null>(null);
  const [exploredNodes, setExploredNodes] = useState<string[]>([]);

  // SEQUENTIAL CHALK PLAYBACK STATE:
  // Beats within a step:
  // Beat 0: Title & Heading
  // Beats 1 .. formulaTokens.length: Each symbol/operator/word of the chalk equation
  // Beats formulaTokens.length + 1 .. formulaTokens.length + visualNodes.length: Each visual graphic/symbol/number node + its explanation
  const currentStep = lesson.steps[activeStepIdx] || lesson.steps[0];
  const currentQuiz = lesson.quizzes[activeQuizIdx] || lesson.quizzes[0];

  const formulaTokens = useMemo(() => {
    if (currentStep.formulaTokens && currentStep.formulaTokens.length > 0) {
      return currentStep.formulaTokens;
    }
    return currentStep.chalkFormula.split(/\s{2,}/).map((tok) => ({
      token: tok,
      explain: `Writing "${tok}" on the blackboard...`,
      color: currentStep.highlightColor,
    }));
  }, [currentStep]);

  const totalBeats = 1 + formulaTokens.length + currentStep.visualNodes.length;
  const [revealedBeat, setRevealedBeat] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [autoSpeakBeats, setAutoSpeakBeats] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Reset sequential playback when switching activity or step
  useEffect(() => {
    setActiveStepIdx(0);
    setCompletedSteps([0]);
    setActiveQuizIdx(0);
    setSelectedOptId(null);
    setRevealedBeat(1);
    setIsAutoPlaying(true);
  }, [activityId]);

  // Sequential timer advancing one symbol/letter/graphic/number beat at a time
  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!isAutoPlaying) return;

    if (revealedBeat < totalBeats) {
      timerRef.current = window.setTimeout(() => {
        setRevealedBeat((prev) => {
          const next = Math.min(totalBeats, prev + 1);
          // Speak the newly revealed visual node if Auto-Voice is toggled on
          const nodeIndex = next - 1 - formulaTokens.length;
          if (autoSpeakBeats && nodeIndex >= 0 && nodeIndex < currentStep.visualNodes.length) {
            const node = currentStep.visualNodes[nodeIndex];
            playPronunciation(node.speakWord || node.labelSa.split(' ')[0]);
          }
          return next;
        });
      }, 1550);
    } else {
      setIsAutoPlaying(false);
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [isAutoPlaying, revealedBeat, totalBeats, formulaTokens.length, currentStep.visualNodes, autoSpeakBeats]);

  // Determine the currently active explanation sentence corresponding to `revealedBeat`
  const currentBeatInfo = useMemo(() => {
    if (revealedBeat <= 1) {
      return {
        phaseBadge: 'WRITING HEADING',
        symbolFocus: currentStep.titleSa,
        text: `Introducing Step ${currentStep.stepNum}: ${currentStep.titleEn} (${currentStep.titleSa})`,
        color: currentStep.highlightColor,
      };
    }
    const formulaIdx = revealedBeat - 2;
    if (formulaIdx < formulaTokens.length) {
      const tok = formulaTokens[formulaIdx];
      return {
        phaseBadge: `CHALK FORMULA SYMBOL ${formulaIdx + 1}/${formulaTokens.length}`,
        symbolFocus: tok.token,
        text: tok.explain,
        color: tok.color || currentStep.highlightColor,
      };
    }
    const nodeIdx = revealedBeat - 2 - formulaTokens.length;
    const node = currentStep.visualNodes[Math.min(nodeIdx, currentStep.visualNodes.length - 1)];
    if (node) {
      return {
        phaseBadge: `CONCEPT GRAPHIC ${nodeIdx + 1}/${currentStep.visualNodes.length}`,
        symbolFocus: node.labelSa,
        text: node.conceptExplain || `${node.labelSa} — ${node.labelEn}`,
        color: node.color,
      };
    }
    return {
      phaseBadge: 'COMPLETE STEP',
      symbolFocus: currentStep.titleSa,
      text: currentStep.explanationEn,
      color: currentStep.highlightColor,
    };
  }, [revealedBeat, currentStep, formulaTokens]);

  const triggerToast = (msg: string) => {
    setPointToast(msg);
    setTimeout(() => setPointToast(null), 2600);
  };

  const handleSelectStep = (idx: number) => {
    setActiveStepIdx(idx);
    setRevealedBeat(1);
    setIsAutoPlaying(true);
    soundEffects.playStrokeChime();
    if (!completedSteps.includes(idx)) {
      setCompletedSteps((prev) => [...prev, idx]);
      onAwardPoints(50, 'Chalkboard Step Explored (+50 Energy Pts)');
      triggerToast('+50 Energy Pts · Blackboard Step Unlocked!');
    }
    const matchingQuizIdx = lesson.quizzes.findIndex((q) => q.linkedStepIndex === idx);
    if (matchingQuizIdx >= 0) {
      setActiveQuizIdx(matchingQuizIdx);
      setSelectedOptId(null);
    }
  };

  const handleNextBeat = () => {
    setIsAutoPlaying(false);
    soundEffects.playStrokeChime();
    if (revealedBeat < totalBeats) {
      const next = revealedBeat + 1;
      setRevealedBeat(next);
      const nodeIdx = next - 2 - formulaTokens.length;
      if (nodeIdx >= 0 && nodeIdx < currentStep.visualNodes.length) {
        const node = currentStep.visualNodes[nodeIdx];
        playPronunciation(node.speakWord || node.labelSa.split(' ')[0]);
      }
      onAwardPoints(10, 'Sequential Chalk Concept Step (+10 Energy Pts)');
    } else if (activeStepIdx < lesson.steps.length - 1) {
      handleSelectStep(activeStepIdx + 1);
    }
  };

  const handlePrevBeat = () => {
    setIsAutoPlaying(false);
    soundEffects.playStrokeChime();
    setRevealedBeat((prev) => Math.max(1, prev - 1));
  };

  const handleReplayStep = () => {
    soundEffects.playStrokeChime();
    setRevealedBeat(1);
    setIsAutoPlaying(true);
  };

  const handleSpeakChalkboard = async () => {
    if (isNarrating) {
      stopPronunciation();
      setIsNarrating(false);
      return;
    }
    setIsNarrating(true);
    try {
      await playPronunciation(currentStep.speakSa);
    } catch {
      /* ignore */
    } finally {
      setIsNarrating(false);
    }
  };

  const handleAnswerOption = (opt: InterlockedQuizItem['options'][0]) => {
    setSelectedOptId(opt.id);
    if (opt.isCorrect) {
      soundEffects.playCelebrationChime();
      playPronunciation(opt.labelSa.split(' ')[0]);
      if (!solvedQuizzes.includes(currentQuiz.id)) {
        setSolvedQuizzes((prev) => [...prev, currentQuiz.id]);
        onAwardPoints(100, 'Interlocked Quiz Mastered (+100 Energy Pts + 1 ⭐)');
        triggerToast('🎉 +100 Energy Pts & +1 Star! Interlocked Quiz Solved!');
      }
      if (currentQuiz.linkedStepIndex < lesson.steps.length) {
        setActiveStepIdx(currentQuiz.linkedStepIndex);
        setRevealedBeat(totalBeats);
        setIsAutoPlaying(false);
      }
    } else {
      soundEffects.playPuzzleSnap();
      if (currentQuiz.linkedStepIndex < lesson.steps.length) {
        setActiveStepIdx(currentQuiz.linkedStepIndex);
        setRevealedBeat(totalBeats);
        setIsAutoPlaying(false);
      }
    }
  };

  const masteryPct = Math.min(
    100,
    Math.round(
      ((completedSteps.length / lesson.steps.length) * 45) +
      ((solvedQuizzes.length / Math.max(1, lesson.quizzes.length)) * 55)
    ),
  );

  return (
    <section className="psw-khan-blackboard-studio" aria-label="Khan Academy Style Sequential Gurukul Blackboard & Interlocked Quiz">
      {/* Top Score & Mastery Ribbon integrating Game Points + Blackboard + Quiz Points */}
      <div className="psw-kb-topbar">
        <div className="psw-kb-brand">
          <span className="psw-kb-pict"><PreschoolActivityPictogram id={activityId} /></span>
          <div>
            <span className="psw-kb-kicker">{lesson.kicker}</span>
            <h3 className="psw-kb-title">
              {lesson.titleEn} <span className="sanskrit-safe-text" lang="sa">· {lesson.titleSa}</span>
            </h3>
          </div>
        </div>

        <div className="psw-kb-score-strip" aria-label="Integrated Game & Blackboard Points">
          <div className="psw-kb-metric psw-kb-metric--energy" title="Total Khan-Style Energy Points across Play, Blackboard & Quiz">
            <span className="psw-kb-metric-lbl">ENERGY POINTS</span>
            <strong className="psw-kb-metric-val">{energyPoints} pts</strong>
          </div>
          <div className="psw-kb-metric psw-kb-metric--stars" title="Total Preschool Stars">
            <span className="psw-kb-metric-lbl">STAR JAR</span>
            <strong className="psw-kb-metric-val">{gameStars} ★</strong>
          </div>
          <div className="psw-kb-metric psw-kb-metric--mastery" title="Lesson & Interlocked Quiz Mastery">
            <span className="psw-kb-metric-lbl">MASTERY</span>
            <strong className="psw-kb-metric-val">{masteryPct}%</strong>
          </div>
          {onSwitchToPlay && (
            <button
              type="button"
              className="psw-kb-mode-btn"
              onClick={onSwitchToPlay}
            >
              ▶ Back to Interactive Game
            </button>
          )}
        </div>
      </div>

      {pointToast && (
        <div className="psw-kb-toast" role="status" aria-live="polite">
          {pointToast}
        </div>
      )}

      {/* Main Split Studio: Left = Sequential Khan-Style Chalkboard, Right = Interlocked Quiz */}
      <div className="psw-kb-split-grid">
        {/* LEFT COLUMN: SEQUENTIAL DARK SLATE CHALKBOARD EXPLANATION */}
        <div className="psw-kb-slate-board">
          {/* Step Tabs + Playback Controls on Top of Blackboard */}
          <div className="psw-kb-step-tabs" role="tablist" aria-label="Blackboard explanation steps">
            {lesson.steps.map((st, idx) => {
              const isDone = completedSteps.includes(idx);
              const isCurrent = idx === activeStepIdx;
              const isLinked = currentQuiz?.linkedStepIndex === idx;
              return (
                <button
                  key={st.stepNum}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  className={`psw-kb-step-tab ${isCurrent ? 'active' : ''} ${isLinked ? 'interlocked' : ''}`}
                  style={isCurrent ? { borderColor: st.highlightColor } : undefined}
                  onClick={() => handleSelectStep(idx)}
                >
                  <span className="psw-kb-step-num">Step {st.stepNum}</span>
                  {isDone && <span className="psw-kb-step-check">✓</span>}
                  {isLinked && <span className="psw-kb-step-lock" title="Interlocked with current quiz question">🔗</span>}
                </button>
              );
            })}

            <button
              type="button"
              className={`psw-kb-voice-btn ${autoSpeakBeats ? 'active' : ''}`}
              onClick={() => {
                setAutoSpeakBeats((v) => !v);
                handleSpeakChalkboard();
              }}
            >
              {isNarrating ? '⏹ Stop Voice' : autoSpeakBeats ? '🔊 Auto-Voice ON' : '🔊 Hear Chalkboard'}
            </button>
          </div>

          {/* Sequential Playback Control Ribbon (Play/Pause, Step Beat by Beat, Scrubber) */}
          <div className="psw-kb-seq-bar" aria-label="Sequential Chalkboard Playback Controls">
            <div className="psw-kb-seq-btns">
              <button
                type="button"
                className={`psw-kb-seq-btn psw-kb-seq-btn--play ${isAutoPlaying ? 'is-playing' : ''}`}
                onClick={() => {
                  if (revealedBeat >= totalBeats) {
                    setRevealedBeat(1);
                    setIsAutoPlaying(true);
                  } else {
                    setIsAutoPlaying((p) => !p);
                  }
                }}
              >
                {isAutoPlaying ? '⏸ Pause Chalk' : revealedBeat >= totalBeats ? '↺ Replay Sequential Lesson' : '▶ Play Sequential Lesson'}
              </button>
              <button
                type="button"
                className="psw-kb-seq-btn"
                disabled={revealedBeat <= 1}
                onClick={handlePrevBeat}
                title="Previous Symbol / Concept"
              >
                ⏮ Prev
              </button>
              <button
                type="button"
                className="psw-kb-seq-btn psw-kb-seq-btn--next"
                onClick={handleNextBeat}
                title="Reveal Next Symbol, Letter, Graphic or Number"
              >
                {revealedBeat < totalBeats ? '⏭ Next Symbol / Graphic (+10 pts)' : '✓ All Revealed'}
              </button>
              {revealedBeat < totalBeats && (
                <button
                  type="button"
                  className="psw-kb-seq-btn"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setRevealedBeat(totalBeats);
                  }}
                >
                  ⚡ Show All
                </button>
              )}
            </div>

            {/* Progress Dots for Every Sequential Symbol / Graphic Beat */}
            <div className="psw-kb-beat-track" role="group" aria-label="Sequential concept beats">
              {Array.from({ length: totalBeats }).map((_, bIdx) => {
                const beatNumber = bIdx + 1;
                const isRevealed = beatNumber <= revealedBeat;
                const isCurrentBeat = beatNumber === revealedBeat;
                return (
                  <button
                    key={beatNumber}
                    type="button"
                    className={`psw-kb-beat-dot ${isRevealed ? 'revealed' : ''} ${isCurrentBeat ? 'current' : ''}`}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setRevealedBeat(beatNumber);
                    }}
                    title={`Jump to sequential beat ${beatNumber} of ${totalBeats}`}
                    aria-label={`Beat ${beatNumber} of ${totalBeats}`}
                  />
                );
              })}
              <span className="psw-kb-beat-counter">
                Beat {revealedBeat}/{totalBeats}
              </span>
            </div>
          </div>

          {/* LIVE SYNCHRONIZED TEACHER NARRATION BANNER (Explains the exact symbol/letter/graphic appearing now) */}
          <div
            className="psw-kb-live-narrator"
            style={{ borderColor: currentBeatInfo.color }}
            aria-live="polite"
          >
            <div className="psw-kb-ln-top">
              <span className="psw-kb-ln-badge" style={{ background: currentBeatInfo.color }}>
                🖍️ {currentBeatInfo.phaseBadge}
              </span>
              <span className="psw-kb-ln-symbol sanskrit-safe-text" lang="sa" style={{ color: currentBeatInfo.color }}>
                {currentBeatInfo.symbolFocus}
              </span>
            </div>
            <p className="psw-kb-ln-text">{currentBeatInfo.text}</p>
          </div>

          {/* Chalkboard Canvas Area */}
          <div className="psw-kb-chalk-canvas">
            <div className="psw-kb-chalk-header">
              <span className="psw-kb-chalk-step-title" style={{ color: currentStep.highlightColor }}>
                Step {currentStep.stepNum}: {currentStep.titleEn}
              </span>
              <span className="psw-kb-sanskrit-pill sanskrit-safe-text" lang="sa">
                {currentStep.titleSa}
              </span>
            </div>

            {/* SEQUENTIAL NEON CHALK EQUATION BOX: Each symbol/token appears sequentially */}
            <div className="psw-kb-equation-box" style={{ borderColor: currentStep.highlightColor }}>
              <div className="psw-kb-seq-tokens" lang="sa">
                {formulaTokens.map((tok, tIdx) => {
                  const tokenBeat = 2 + tIdx;
                  const isVisible = revealedBeat >= tokenBeat;
                  const isWritingNow = revealedBeat === tokenBeat;
                  return (
                    <button
                      key={tIdx}
                      type="button"
                      className={`psw-kb-formula-token sanskrit-safe-text ${isVisible ? 'is-visible' : 'is-hidden'} ${isWritingNow ? 'is-writing-now' : ''}`}
                      style={{
                        color: tok.color || currentStep.highlightColor,
                        borderColor: isWritingNow ? (tok.color || currentStep.highlightColor) : 'transparent',
                      }}
                      onClick={() => {
                        setIsAutoPlaying(false);
                        setRevealedBeat(tokenBeat);
                        soundEffects.playStrokeChime();
                      }}
                      title={tok.explain}
                    >
                      <span>{tok.token}</span>
                      {isWritingNow && <span className="psw-kb-chalk-cursor" aria-hidden="true">🖍️</span>}
                    </button>
                  );
                })}
              </div>
              <div className="psw-kb-equation-sub">
                {currentStep.chalkSub}
              </div>
            </div>

            {/* SEQUENTIAL INTERACTIVE CHALK DIAGRAM NODES (Each symbol, letter, graphic, or number appears sequentially!) */}
            <div className="psw-kb-diagram-grid" role="group" aria-label="Sequential Chalk Symbols, Letters, Graphics & Numbers">
              {currentStep.visualNodes.map((node, i) => {
                const nodeBeat = 2 + formulaTokens.length + i;
                const isNodeRevealed = revealedBeat >= nodeBeat;
                const isNodeActiveNow = revealedBeat === nodeBeat;
                const nodeKey = `${activityId}-${activeStepIdx}-${i}`;
                const isExplored = exploredNodes.includes(nodeKey);

                return (
                  <button
                    key={i}
                    type="button"
                    className={`psw-kb-node-card ${isNodeRevealed ? 'is-revealed' : 'is-awaiting'} ${isNodeActiveNow ? 'is-active-beat' : ''} ${isExplored ? 'explored' : ''}`}
                    style={{
                      borderColor: isNodeRevealed ? node.color : '#cbd5e1',
                    }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setRevealedBeat(nodeBeat);
                      playPronunciation(node.speakWord || node.labelSa.split(' ')[0]);
                      if (!isExplored) {
                        setExploredNodes((prev) => [...prev, nodeKey]);
                      }
                      onAwardPoints(15, `Chalk Symbol/Graphic Inspected: ${node.labelSa}`);
                      triggerToast(`+15 Energy Pts · "${node.labelSa}" Explained!`);
                    }}
                  >
                    <div className="psw-kb-node-seq-pill" style={{ background: isNodeRevealed ? node.color : '#94a3b8', color: '#ffffff' }}>
                      #{i + 1}
                    </div>

                    {/* Hand-drawn Chalk SVG Graphic / Symbol / Letter / Number */}
                    <div className="psw-kb-node-graphic-wrap">
                      {isNodeRevealed ? (
                        <ChalkNodeGraphic
                          kind={node.graphicKind}
                          color={node.color}
                          symbolText={node.labelSa}
                          isActiveBeat={isNodeActiveNow}
                        />
                      ) : (
                        <div className="psw-kb-node-placeholder">
                          <span>🖍️</span>
                          <small>Appears on Beat {nodeBeat}</small>
                        </div>
                      )}
                    </div>

                    <div className="psw-kb-node-label sanskrit-safe-text" lang="sa" style={{ color: isNodeRevealed ? node.color : '#64748b' }}>
                      {isNodeRevealed ? node.labelSa : '• • •'}
                    </div>
                    <div className="psw-kb-node-caption">
                      {isNodeRevealed ? node.labelEn : 'Click or wait for sequential reveal'}
                    </div>
                    {node.value && isNodeRevealed && (
                      <span className="psw-kb-node-pts" style={{ color: node.color }}>
                        {node.value} · 🔊 +15 pts
                      </span>
                    )}
                    {isNodeActiveNow && (
                      <span className="psw-kb-now-explaining-tag">
                        ✨ Explaining Now
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Full Step Summary Note */}
            <div className="psw-kb-teacher-note">
              <span className="psw-kb-teacher-avatar" aria-hidden="true">👩‍🏫</span>
              <div className="psw-kb-teacher-text">
                <p>{currentStep.explanationEn}</p>
                <div className="psw-kb-visual-hint">
                  💡 Tap any symbol, letter, graphic, or number card above to replay its explanation and hear its Sanskrit sound (+15 pts)!
                </div>
              </div>
            </div>
          </div>

          {/* Chalk Tray Footer */}
          <div className="psw-kb-chalk-tray">
            <div className="psw-kb-tray-sticks" aria-hidden="true">
              <span className="psw-kb-stick" style={{ background: '#38bdf8' }} />
              <span className="psw-kb-stick" style={{ background: '#fde047' }} />
              <span className="psw-kb-stick" style={{ background: '#fb7185' }} />
              <span className="psw-kb-stick" style={{ background: '#4ade80' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="psw-kb-tray-btn"
                onClick={handleReplayStep}
              >
                ↺ Replay Step Drawings
              </button>
              {activeStepIdx < lesson.steps.length - 1 ? (
                <button
                  type="button"
                  className="psw-kb-tray-btn psw-kb-tray-btn--next"
                  onClick={() => handleSelectStep(activeStepIdx + 1)}
                >
                  Next Chalkboard Step ({activeStepIdx + 2}/{lesson.steps.length}) · +50 pts ➔
                </button>
              ) : (
                <span className="psw-kb-qf-mastery">
                  ✓ All Steps Drawn! Solve the Interlocked Quiz ➔
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERLOCKED QUIZ TESTING & POINTS */}
        <div className="psw-kb-quiz-panel">
          <div>
            <div className="psw-kb-quiz-header">
              <span className="psw-kb-quiz-badge">🎯 INTERLOCKED MASTERY CHECK · +100 PTS</span>
              <button
                type="button"
                className="psw-kb-interlock-tag"
                onClick={() => handleSelectStep(currentQuiz.linkedStepIndex)}
              >
                🔗 Interlocked with Chalk Step {currentQuiz.linkedStepIndex + 1}
              </button>
            </div>

            {/* Question Selector Dots */}
            <div className="psw-kb-q-dots" role="tablist" aria-label="Quiz questions" style={{ marginTop: 10 }}>
              {lesson.quizzes.map((q, qIdx) => {
                const isSolved = solvedQuizzes.includes(q.id);
                const isCurrent = qIdx === activeQuizIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    className={`psw-kb-q-dot ${isCurrent ? 'active' : ''} ${isSolved ? 'solved' : ''}`}
                    onClick={() => {
                      setActiveQuizIdx(qIdx);
                      setSelectedOptId(null);
                      if (q.linkedStepIndex < lesson.steps.length) {
                        setActiveStepIdx(q.linkedStepIndex);
                        setRevealedBeat(totalBeats);
                        setIsAutoPlaying(false);
                      }
                      soundEffects.playStrokeChime();
                    }}
                  >
                    {isSolved ? `★ Q${qIdx + 1}` : `Question ${qIdx + 1}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Box */}
          <div className="psw-kb-question-card">
            <div className="psw-kb-q-prompt-row">
              <div>
                <div className="sanskrit-safe-text" lang="sa" style={{ color: '#b45309', fontWeight: 800, fontSize: '0.92rem', marginBottom: 4 }}>
                  {currentQuiz.questionSa}
                </div>
                <p className="psw-kb-q-prompt">{currentQuiz.questionEn}</p>
              </div>
              <span className="psw-kb-q-points-pill">+100 pts · ★</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#475569', background: '#fef3c7', border: '1px solid #fde68a', padding: '8px 10px', borderRadius: 8 }}>
              💡 <strong>Chalkboard Hint:</strong> {currentQuiz.chalkHint}
            </div>

            {/* 4 Testing Options */}
            <div className="psw-kb-options-list" role="radiogroup" aria-label={currentQuiz.questionEn}>
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedOptId === opt.id;
                const stateClass = isSelected
                  ? opt.isCorrect
                    ? 'correct'
                    : 'wrong'
                  : '';
                return (
                  <button
                    key={opt.id}
                    type="button"
                    className={`psw-kb-opt-btn ${stateClass}`}
                    onClick={() => handleAnswerOption(opt)}
                  >
                    <span className="psw-kb-opt-letter">{String.fromCharCode(65 + idx)}</span>
                    <div className="psw-kb-opt-text">
                      <div className="sanskrit-safe-text" lang="sa" style={{ fontWeight: 900, color: '#0f172a' }}>
                        {opt.labelSa}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#475569' }}>{opt.labelEn}</div>
                    </div>
                    {isSelected && (
                      <span className="psw-kb-opt-status">
                        {opt.isCorrect ? '✅ +100' : '🔄'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Instant Feedback & Next Question Progression */}
            {selectedOptId && (() => {
              const chosen = currentQuiz.options.find((o) => o.id === selectedOptId);
              if (!chosen) return null;
              return (
                <div className={`psw-kb-feedback ${chosen.isCorrect ? 'ok' : 'retry'}`} role="status">
                  <div className="psw-kb-fb-head">
                    {chosen.isCorrect ? '🎉 Correct! +100 Energy Points & +1 Star!' : '🔍 Check the Linked Chalkboard Step!'}
                  </div>
                  <div>{chosen.whyEn}</div>
                  {chosen.isCorrect && activeQuizIdx < lesson.quizzes.length - 1 && (
                    <button
                      type="button"
                      className="psw-kb-fb-next-btn"
                      onClick={() => {
                        const nextIdx = activeQuizIdx + 1;
                        setActiveQuizIdx(nextIdx);
                        setSelectedOptId(null);
                        const linked = lesson.quizzes[nextIdx]?.linkedStepIndex ?? 0;
                        if (linked < lesson.steps.length) {
                          setActiveStepIdx(linked);
                        }
                        soundEffects.playStrokeChime();
                      }}
                    >
                      Next Interlocked Question (Q{activeQuizIdx + 2}/{lesson.quizzes.length}) ➔
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Points Breakdown Footer */}
          <div className="psw-kb-quiz-footer">
            <span>🎮 Game: <b>+25 pts</b></span>
            <span>🖍️ Symbol Beat: <b>+10–50 pts</b></span>
            <span className="psw-kb-qf-mastery">🎯 Quiz: <b>+100 pts &amp; ★</b></span>
          </div>
        </div>
      </div>
    </section>
  );
};
