import React, { useEffect, useRef, useState } from 'react';
import { ARTICLES } from '../data/articleIndex';
import { SANSKRIT_ARTICLE_META } from '../data/sanskritArticles';
import { ARTICLE_KEY_WORDS } from '../data/articleKeyWords';
import { SANSKRIT_EXPLANATIONS } from '../data/sanskritExplanations';
import { parseArticle, type ParsedArticle } from '../utils/articleParser';
import { playPronunciation, speakAsBodhi, stopBodhiSpeech } from '../utils/pronunciation';
import { BodhiAvatar } from './BodhiAvatar';
import ConjunctGames from './ConjunctGames';
import SoundTeamsArticle from './SoundTeamsArticle';
import LingaVachanaGuide from './LingaVachanaGuide';
import VibhaktiGuide from './VibhaktiGuide';
import PaninianStudio from './PaninianStudio';
import { NumbersGuide } from './NumbersGuide';
import KatapayadiManuscriptFigure from './KatapayadiManuscriptFigure';
import GrammarLightFigure, { isGrammarLightFigure } from './GrammarLightFigures';
import VedicArticleFigure from './VedicArticleFigure';
import type { VedicArticleFigureId } from '../data/vedicMaths';
import {
  VYAKARANA_MODULES,
  VYAKARANA_LESSONS,
  getLessonById,
  getNextLesson,
  getPrevLesson,
} from '../data/vyakaranaCourseData';
import type { ArticleBlock } from '../utils/articleParser';
import '../styles/grammar.css';

export type GrammarTopic =
  | 'home'
  | 'course-lesson'
  | 'vibhakti'
  | 'linga-vachana'
  | 'numbers'
  | 'samyukta'
  | 'sound-teams'
  | 'science-of-sound'
  | 'dhatupatha'
  | 'article';

const MASTERCLASS_IDS = [
  'beginners-roadmap',
  'katapayadi-number-words',
  'animal-names-yoga-shapes-singing-notes',
  'vakyapadiya-and-ai',
  'indian-calendar-precision',
  'naming-the-colossal',
  'legacy-of-indian-metrology',
  'sanskrit-in-english',
];

const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());

const SITE_ORIGIN_PATTERN = /^https?:\/\/(www\.)?ednetlearn\.in/i;

const MARKDOWN_TOKEN_PATTERN = /(\[[^\]]+\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s)<>]+|\*\*[^*]+\*\*|\*(?!\*)[^*]+\*|`[^`]+`)/g;
const DEVANAGARI_WORD_PATTERN = /([\u0901-\u0963\u0970-\u097F\u200C\u200D]+(?:[-—][\u0901-\u0963\u0970-\u097F\u200C\u200D]+)*)/g;

/** Renders Devanagari Sanskrit words as interactive tap-to-pronounce saffron pills */
const renderDevanagariWords = (text: string, baseKey: string): React.ReactNode => {
  const parts = text.split(DEVANAGARI_WORD_PATTERN);
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const cleanWord = part.trim();
    if (!cleanWord) return part;

    return (
      <span
        key={`${baseKey}-sa-${i}`}
        className="grammar-sanskrit-highlight"
        onClick={(e) => {
          e.stopPropagation();
          playPronunciation(cleanWord);
        }}
        title={`Tap to hear Sanskrit pronunciation: ${cleanWord}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playPronunciation(cleanWord);
          }
        }}
      >
        {part}
      </span>
    );
  });
};

/**
 * Rich parser for grammar article text:
 * - Parses markdown links [text](url) and bare URLs
 * - Parses bolding **text**
 * - Parses inline code `code`
 * - Automatically highlights Devanagari Sanskrit words with tap-to-pronounce
 */
const renderRichArticleText = (text: string, baseKeyPrefix = 'rich'): React.ReactNode => {
  if (!text) return null;

  const parts = text.split(MARKDOWN_TOKEN_PATTERN);
  if (parts.length === 1) {
    return renderDevanagariWords(text, `${baseKeyPrefix}-single`);
  }

  return parts.map((part, i) => {
    if (!part) return null;
    const key = `${baseKeyPrefix}-${i}`;

    // Markdown link: [Anchor text](https://...)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
      if (match) {
        const [, linkText, rawUrl] = match;
        const isSite = SITE_ORIGIN_PATTERN.test(rawUrl);
        const href = isSite ? rawUrl.replace(SITE_ORIGIN_PATTERN, '') || '/' : rawUrl;
        return (
          <a
            key={key}
            href={href}
            className="grammar-article-link"
            {...(isSite ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {renderDevanagariWords(linkText, `${key}-lt`)}
          </a>
        );
      }
    }

    // Markdown bold: **content**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldContent = part.slice(2, -2);
      return (
        <strong key={key}>
          {renderDevanagariWords(boldContent, `${key}-b`)}
        </strong>
      );
    }

    // Markdown italic: *content*
    if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**') && part.length >= 2) {
      const italicContent = part.slice(1, -1);
      return (
        <em key={key}>
          {renderDevanagariWords(italicContent, `${key}-em`)}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code key={key} className="grammar-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Bare URL: https://...
    if (part.startsWith('http://') || part.startsWith('https://')) {
      const trailing = part.match(/[.,;:!?)]+$/)?.[0] ?? '';
      const url = trailing ? part.slice(0, -trailing.length) : part;
      const isSite = SITE_ORIGIN_PATTERN.test(url);
      const href = isSite ? url.replace(SITE_ORIGIN_PATTERN, '') || '/' : url;
      return (
        <React.Fragment key={key}>
          <a
            href={href}
            className="grammar-article-link"
            {...(isSite ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
          >
            {url.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
          {trailing}
        </React.Fragment>
      );
    }

    // Plain text: highlight Devanagari words
    return <React.Fragment key={key}>{renderDevanagariWords(part, key)}</React.Fragment>;
  });
};

const renderArticleBlocks = (blocks: ArticleBlock[]) => {
  return blocks.map((block, index) => {
    if (block.type === 'subheading') {
      return (
        <h3 key={index} className="grammar-article-subheading">
          {renderRichArticleText(block.text, `h3-${index}`)}
        </h3>
      );
    }
    if (block.type === 'quote') {
      return (
        <blockquote key={index} className="grammar-article-quote">
          {renderRichArticleText(block.text, `quote-${index}`)}
        </blockquote>
      );
    }
    if (block.type === 'list') {
      if (block.ordered) {
        return (
          <ol key={index} className="grammar-article-list grammar-article-list-ordered" start={block.start || 1}>
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{renderRichArticleText(item, `li-${index}-${itemIndex}`)}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul key={index} className="grammar-article-list">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderRichArticleText(item, `li-${index}-${itemIndex}`)}</li>
          ))}
        </ul>
      );
    }
    if (block.type === 'table') {
      return (
        <div className="grammar-article-table-wrap" key={index}>
          <table className="grammar-article-table">
            <thead>
              <tr>
                {block.headers.map((header, headerIndex) => (
                  <th key={headerIndex}>{renderRichArticleText(header, `th-${index}-${headerIndex}`)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderRichArticleText(cell, `td-${index}-${rowIndex}-${cellIndex}`)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (block.type === 'image') {
      const src = block.src.startsWith('http') || block.src.startsWith('/') ? block.src : `./${block.src}`;
      return (
        <figure className="grammar-article-image-wrap" key={index}>
          <img src={src} alt={block.alt} className="grammar-article-image" loading="lazy" />
          {block.caption && (
            <figcaption className="grammar-article-image-caption">
              {renderRichArticleText(block.caption, `cap-${index}`)}
            </figcaption>
          )}
        </figure>
      );
    }
    if (block.type === 'figure') {
      if (block.id === 'katapayadi-matrix') {
        return <KatapayadiManuscriptFigure key={index} />;
      }
      if (isGrammarLightFigure(block.id)) {
        return <GrammarLightFigure key={index} id={block.id} />;
      }
      return (
        <figure className="grammar-article-figure-container" key={index}>
          <VedicArticleFigure id={block.id as VedicArticleFigureId} />
          {block.caption && (
            <figcaption className="grammar-article-image-caption">
              {renderRichArticleText(block.caption, `fig-cap-${index}`)}
            </figcaption>
          )}
        </figure>
      );
    }
    if (block.type === 'code') {
      return (
        <pre className="grammar-article-code" key={index}>
          <code>{block.text}</code>
        </pre>
      );
    }
    return (
      <p key={index} className="grammar-article-paragraph">
        {renderRichArticleText(block.text, `p-${index}`)}
      </p>
    );
  });
};

export interface LessonQuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface LessonQuizInfo {
  quizTitle: string;
  anchor: string;
  category: string;
  questions: LessonQuizQuestion[];
}

export const LESSON_QUIZZES: Record<string, LessonQuizInfo> = {
  'lesson-1': {
    quizTitle: 'Devanāgarī Script & Svara Vowels Quiz',
    anchor: 'lit-grammar-basic',
    category: 'lit_grammar_basic',
    questions: [
      {
        q: 'Which of the following is a Dīrgha (long) vowel in Sanskrit?',
        options: ['अ (a)', 'आ (ā)', 'इ (i)', 'उ (u)'],
        answer: 1,
        explain: 'आ (ā) is a canonical long vowel (dīrgha-svara) lasting two mātrās.',
      },
      {
        q: 'What is the continuous horizontal top banner line in Devanāgarī script called?',
        options: ['शिरोरेखा (Shirorekha)', 'मात्रा (Mātrā)', 'दण्डः (Daṇḍa)', 'विसर्गः (Visarga)'],
        answer: 0,
        explain: 'The top line linking letters together is called the Shirorekha ("head line").',
      },
      {
        q: 'What phonetic role does the Anusvāra (अं) play?',
        options: ['A full vowel', 'A pure nasal resonance (नासिक्य)', 'A retroflex stop', 'A verb suffix'],
        answer: 1,
        explain: 'Anusvāra is an Ayogavāha producing pure nasal acoustic resonance after a vowel.',
      },
    ],
  },
  'lesson-2': {
    quizTitle: 'Vyañjana Consonants & Sthāna Places Quiz',
    anchor: 'lit-grammar-basic',
    category: 'lit_grammar_basic',
    questions: [
      {
        q: 'Which anatomical vocal place produces the Ka-varga (क, ख, ग, घ, ङ)?',
        options: ['ओष्ठ्य (Lips)', 'तालव्य (Palate)', 'कण्ठ्य (Throat / Velar)', 'दन्त्य (Teeth)'],
        answer: 2,
        explain: 'Ka-varga starts deepest in the vocal tract at Kaṇṭha (the throat).',
      },
      {
        q: 'What physiological mechanism distinguishes Alpaprāṇa from Mahāprāṇa consonants?',
        options: ['Vocal cord pitch', 'Volume of exhaled breath puff', 'Tongue width', 'Syllable duration'],
        answer: 1,
        explain: 'Alpaprāṇa uses minimal breath; Mahāprāṇa produces an aspirated puff of warm air.',
      },
      {
        q: 'To which class do the consonants य, र, ल, व belong?',
        options: ['स्पर्श (Stops)', 'अन्तःस्थ (Semivowels)', 'ऊष्मन् (Sibilants)', 'अयोगवाह'],
        answer: 1,
        explain: 'They are Antaḥstha (intermediate sounds between vowels and consonants).',
      },
    ],
  },
  'lesson-3': {
    quizTitle: 'Dhātu Roots & Prātipadika Stems Quiz',
    anchor: 'grammar',
    category: 'grammar',
    questions: [
      {
        q: 'In Pāṇinian generative linguistics, what is a Dhātu?',
        options: ['A completed sentence', 'The indestructible semantic verb root seed', 'A prefix only', 'A punctuation mark'],
        answer: 1,
        explain: 'A Dhātu is the elemental root from which all verbs and nouns are derived.',
      },
      {
        q: 'What does the cardinal rule "अपदं न प्रयुञ्जीत" mandate?',
        options: ['Never walk barefoot', 'Never use an uninflected raw root or crude stem in a sentence', 'Never write without ink', 'Never speak in public'],
        answer: 1,
        explain: 'In Sanskrit, a raw root or stem must receive case (Sup) or verbal (Tiṅ) endings before entering a sentence.',
      },
      {
        q: 'What role do Upasargas (like सम्-, अनु-, प्र-) perform when attached to a Dhātu?',
        options: ['They delete the root', 'They modify, redirect, or intensify the root meaning', 'They make the word feminine', 'They convert verbs into numbers'],
        answer: 1,
        explain: 'Upasargas dramatically modulate verb meanings (उपसर्गेण धात्वर्थो बलादन्यत्र नीयते).',
      },
    ],
  },
  'lesson-4': {
    quizTitle: 'Vibhakti & Kāraka Case Roles Quiz',
    anchor: 'lit-grammar-basic',
    category: 'lit_grammar_basic',
    questions: [
      {
        q: 'How many total Vibhaktis (grammatical cases) does Sanskrit employ?',
        options: ['4 cases', '6 cases', '8 cases (7 cases + Sambodhana)', '12 cases'],
        answer: 2,
        explain: 'Sanskrit features 7 core case numbers plus Sambodhana (addressing/vocative).',
      },
      {
        q: 'Which Vibhakti denotes the instrument or means by which an action is performed (Karaṇa)?',
        options: ['Prathamā (Case 1)', 'Dvitīyā (Case 2)', 'Tṛtīyā (Case 3)', 'Caturthī (Case 4)'],
        answer: 2,
        explain: 'Tṛtīyā vibhakti marks the instrument or accomplice (e.g. हस्तेन - by hand).',
      },
      {
        q: 'Which Kāraka role is paired with Pañcamī Vibhakti (Case 5)?',
        options: ['Kartā (Doer)', 'Karma (Object)', 'Apādāna (Source / Separation)', 'Adhikaraṇa (Location)'],
        answer: 2,
        explain: 'Pañcamī denotes Apādāna (point of departure or source: वृक्षात् - from the tree).',
      },
    ],
  },
  'lesson-5': {
    quizTitle: 'Akārānta Pulliṅga (Bālaka) Declension Quiz',
    anchor: 'lit-grammar-basic',
    category: 'lit_grammar_basic',
    questions: [
      {
        q: 'What is the Prathamā Vibhakti Plural form of बालक (Bālaka)?',
        options: ['बालकः', 'बालकौ', 'बालकाः', 'बालकम्'],
        answer: 2,
        explain: 'Singular: बालकः, Dual: बालकौ, Plural: बालकाः.',
      },
      {
        q: 'In the dual column of Bālaka, which ending is shared by Cases 3, 4, and 5?',
        options: ['-योः', '-आभ्याम्', '-एभ्यः', '-आणाम्'],
        answer: 1,
        explain: 'Cases 3, 4, and 5 dual always share -ābhyām (बालकाभ्याम्).',
      },
      {
        q: 'Which form represents the Saptamī Vibhakti Singular (in the boy)?',
        options: ['बालकाय', 'बालके', 'बालकस्य', 'बालकेन'],
        answer: 1,
        explain: 'Case 7 singular of akārānta pulliṅga ends in -e: बालके (in the boy).',
      },
    ],
  },
  'lesson-6': {
    quizTitle: 'Ākārānta & Īkārānta Strīliṅga (Latā & Nadī) Quiz',
    anchor: 'lit-grammar-basic',
    category: 'lit_grammar_basic',
    questions: [
      {
        q: 'How does the Case 1 Singular of लता (Latā) differ from masculine बालकः?',
        options: ['Latā has no visarga (लता vs बालकः)', 'Latā has two visargas', 'Latā ends in halanta', 'There is no difference'],
        answer: 0,
        explain: 'Ākārānta feminine singular drops the visarga, ending in pure long -ā (लता).',
      },
      {
        q: 'What is the Case 1 Dual of लता?',
        options: ['लते', 'लताः', 'लताभ्याम्', 'लतासु'],
        answer: 0,
        explain: 'Case 1 Dual of Latā is लते (two vines).',
      },
      {
        q: 'What is the Case 1 Plural of river (नदी - Nadī)?',
        options: ['नदीः', 'नद्यः', 'नदीनाम्', 'नदीभिः'],
        answer: 1,
        explain: 'Case 1 forms: नदी, नद्यौ, नद्यः (rivers).',
      },
    ],
  },
  'lesson-7': {
    quizTitle: 'Laṭ Lakāra Present Tense Conjugation Quiz',
    anchor: 'lit-grammar-middle',
    category: 'lit_grammar_middle',
    questions: [
      {
        q: 'What is the third-person singular (Prathama Puruṣa Ekavacana) present tense ending?',
        options: ['-सि (-si)', '-मि (-mi)', '-ति (-ti)', '-मः (-maḥ)'],
        answer: 2,
        explain: 'The universal present formula begins with -ति: पठति (he/she reads).',
      },
      {
        q: 'Which Lakāra represents the present indicative tense in Sanskrit?',
        options: ['लट् (Laṭ)', 'लृट् (Lṛṭ)', 'लङ् (Laṅ)', 'लोट् (Loṭ)'],
        answer: 0,
        explain: 'Laṭ (लट् लकारः) designates current present action.',
      },
      {
        q: 'What happens to the stem vowel in first person (Uttama Puruṣa) present tense?',
        options: ['It shortens', 'It lengthens to -ā (पठ + आमि = पठामि)', 'It turns into visarga', 'It vanishes'],
        answer: 1,
        explain: 'The stem vowel broadens before m and v: पठामि, पठावः, पठामः.',
      },
    ],
  },
  'lesson-8': {
    quizTitle: 'Three Persons (Puruṣa) & Numbers (Vacana) Quiz',
    anchor: 'lit-grammar-middle',
    category: 'lit_grammar_middle',
    questions: [
      {
        q: 'Which person does Sanskrit Prathama Puruṣa (प्रथम-पुरुषः) designate?',
        options: ['I / We (1st person)', 'You (2nd person)', 'He / She / It / All third person nouns', 'Imperative'],
        answer: 2,
        explain: 'In Sanskrit, Prathama Puruṣa is 3rd Person (the external world); Uttama Puruṣa is I/We.',
      },
      {
        q: 'Which pronoun agrees with the verb पठामि (paṭhāmi)?',
        options: ['सः (Saḥ)', 'त्वम् (Tvam)', 'अहम् (Aham)', 'ते (Te)'],
        answer: 2,
        explain: 'अहम् is Uttama Puruṣa Singular, agreeing with -mi: अहम् पठामि (I read).',
      },
      {
        q: 'What is the second person plural (Madhyama Puruṣa Bahuvacana) pronoun for "You all"?',
        options: ['त्वम् (Tvam)', 'युवाम् (Yuvām)', 'यूयम् (Yūyam)', 'वयम् (Vayam)'],
        answer: 2,
        explain: 'त्वम् (You), युवाम् (You two), यूयम् (You all).',
      },
    ],
  },
  'lesson-9': {
    quizTitle: 'Kartari Prayoga (Subject-Verb Agreement) Quiz',
    anchor: 'lit-grammar-middle',
    category: 'lit_grammar_middle',
    questions: [
      {
        q: 'In active voice (Kartari Prayoga), what case must the Subject (Kartā) take?',
        options: ['Dvitīyā (Case 2)', 'Prathamā (Case 1)', 'Ṣaṣṭhī (Case 6)', 'Saptamī (Case 7)'],
        answer: 1,
        explain: 'The Subject is in Prathamā Vibhakti (Case 1) in Kartari Prayoga.',
      },
      {
        q: 'Do finite Sanskrit verbs change form according to the gender of the subject?',
        options: ['Yes, masculine and feminine verbs differ', 'No, Sanskrit verbs have NO gender; only Person and Number', 'Only in past tense', 'Only in plural'],
        answer: 1,
        explain: 'Sanskrit verbs are genderless: बालकः पठति and बालिका पठति share the identical verb form.',
      },
      {
        q: 'What case does the direct object (Karma) take in Kartari Prayoga?',
        options: ['Prathamā (Case 1)', 'Dvitīyā (Case 2)', 'Tṛtīyā (Case 3)', 'Caturthī (Case 4)'],
        answer: 1,
        explain: 'The direct object takes Dvitīyā Vibhakti: बालकः पुस्तकं पठति.',
      },
    ],
  },
  'lesson-10': {
    quizTitle: 'Avyayas (Indeclinables) & Spoken Sanskrit Quiz',
    anchor: 'grammar',
    category: 'grammar',
    questions: [
      {
        q: 'What defines an Avyaya (अव्ययम्) in Sanskrit?',
        options: ['A noun declining into 24 forms', 'A word that never changes across gender, number, or case', 'A verb form', 'An adjective only'],
        answer: 1,
        explain: 'सदृशं त्रिषु लिङ्गेषु सर्वासु च विभक्तिषु... यन्न व्येति तदव्ययम् (It never alters form under any inflection).',
      },
      {
        q: 'How do you politely ask "What is your name?" to a gentleman in Sanskrit?',
        options: ['भवतः नाम किम्?', 'भवत्याः नाम किम्?', 'मम नाम किम्?', 'कः त्वम्?'],
        answer: 0,
        explain: 'भवतः नाम किम्? (masculine polite) vs भवत्याः नाम किम्? (feminine polite).',
      },
      {
        q: 'Which Avyaya means "also / too" in Sanskrit?',
        options: ['च (ca)', 'अपि (api)', 'सह (saha)', 'कुत्र (kutra)'],
        answer: 1,
        explain: 'अपि means "also / even / too" (e.g. अहमपि गच्छामि - I am going too).',
      },
    ],
  },
};

const LessonInlineQuiz: React.FC<{
  quizInfo: LessonQuizInfo;
  onOpenFullQuiz?: (anchor?: string) => void;
}> = ({ quizInfo, onOpenFullQuiz }) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const correctCount = quizInfo.questions.filter((_, idx) => selectedAnswers[idx] === quizInfo.questions[idx].answer).length;

  return (
    <div className="grammar-lesson-quiz-box">
      <div className="grammar-lesson-quiz-header">
        <div className="grammar-lesson-quiz-title-row">
          <span className="grammar-lesson-quiz-icon">🎯</span>
          <div>
            <h4 className="grammar-lesson-quiz-title">
              ज्ञान-परीक्षा · {quizInfo.quizTitle}
            </h4>
            <p className="grammar-lesson-quiz-sub">
              Test your grasp of this lesson's key rules with instant checks
            </p>
          </div>
        </div>
        <div className="grammar-lesson-quiz-score-badge">
          {correctCount} / {quizInfo.questions.length} Correct
        </div>
      </div>

      <div className="grammar-lesson-quiz-questions">
        {quizInfo.questions.map((qItem, qIdx) => {
          const selected = selectedAnswers[qIdx];
          const hasAnswered = selected !== undefined;
          const isCorrect = hasAnswered && selected === qItem.answer;

          return (
            <div key={qIdx} className="grammar-inline-q-item">
              <p className="grammar-inline-q-text">
                <span className="grammar-inline-q-num">Q{qIdx + 1}.</span> {qItem.q}
              </p>
              <div className="grammar-inline-q-options">
                {qItem.options.map((opt, oIdx) => {
                  let optClass = 'grammar-inline-opt-btn';
                  if (hasAnswered) {
                    if (oIdx === qItem.answer) optClass += ' is-correct';
                    else if (oIdx === selected) optClass += ' is-wrong';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      className={optClass}
                      onClick={() => {
                        if (!hasAnswered) {
                          setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                        }
                      }}
                      disabled={hasAnswered}
                    >
                      <span className="grammar-inline-opt-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {hasAnswered && (
                <div className={`grammar-inline-q-feedback ${isCorrect ? 'is-right' : 'is-wrong'}`}>
                  <span>{isCorrect ? '✓ उत्कृष्टम् (Correct!)' : '✗ पुनः प्रयतताम् (Review):'}</span> {qItem.explain}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {onOpenFullQuiz && (
        <div className="grammar-lesson-quiz-footer-cta">
          <button
            type="button"
            className="grammar-lesson-quiz-hub-btn"
            onClick={() => onOpenFullQuiz(quizInfo.anchor)}
          >
            <span>🎯 Open Full Vaidic Vyākaraṇam Quiz Hub for this Topic →</span>
          </button>
        </div>
      )}
    </div>
  );
};

export type GrammarProps = {
  initialTopic?: GrammarTopic;
  initialArticleId?: string | null;
  initialLessonId?: string | null;
  onGoHome?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: (anchor?: string) => void;
};

const Grammar: React.FC<GrammarProps> = ({
  initialTopic = 'home',
  initialArticleId = null,
  initialLessonId = null,
  onGoHome,
  onOpenWorksheets,
  onOpenQuiz,
}) => {
  const [topic, setTopic] = useState<GrammarTopic>(() => {
    if (initialLessonId) return 'course-lesson';
    if (initialArticleId && initialArticleId.startsWith('lesson-')) return 'course-lesson';
    return initialTopic;
  });
  const [activeArticleId, setActiveArticleId] = useState<string | null>(() => {
    if (initialArticleId && !initialArticleId.startsWith('lesson-')) return initialArticleId;
    return null;
  });
  const [activeLessonId, setActiveLessonId] = useState<string | null>(() => {
    if (initialLessonId) return initialLessonId;
    if (initialArticleId && initialArticleId.startsWith('lesson-')) return initialArticleId;
    return null;
  });
  const [courseViewTab, setCourseViewTab] = useState<'course' | 'masterclasses' | 'studios'>('course');
  const [searchFilter, setSearchFilter] = useState('');
  const [articles, setArticles] = useState<Record<string, ParsedArticle>>({});
  const [articleError, setArticleError] = useState(false);
  const [activeSpokenWord, setActiveSpokenWord] = useState<string | null>(null);
  const [isExplanationSpeaking, setIsExplanationSpeaking] = useState(false);
  const [showEnglishExplanation, setShowEnglishExplanation] = useState(true);
  const explanationStopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    try {
      localStorage.removeItem('grammar_article_lang');
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const activeArticleMeta = ARTICLES.find((item) => item.id === activeArticleId);
  const activeArticle = activeArticleId ? articles[activeArticleId] : undefined;

  const stopAllBodhiSpeech = () => {
    if (explanationStopRef.current) {
      explanationStopRef.current();
      explanationStopRef.current = null;
    }
    stopBodhiSpeech();
    setIsExplanationSpeaking(false);
    setActiveSpokenWord(null);
  };

  const handlePlayBodhiWord = (word: string) => {
    stopAllBodhiSpeech();
    setActiveSpokenWord(word);
    playPronunciation(word);
    setTimeout(() => {
      setActiveSpokenWord((curr) => (curr === word ? null : curr));
    }, 1400);
  };

  const handleToggleExplanationSpeech = (text: string) => {
    if (isExplanationSpeaking) {
      stopAllBodhiSpeech();
      return;
    }
    stopAllBodhiSpeech();
    setIsExplanationSpeaking(true);
    setActiveSpokenWord('explanation');

    const stopFn = speakAsBodhi(text, {
      lang: 'sa',
      onEnd: () => {
        explanationStopRef.current = null;
        setIsExplanationSpeaking(false);
        setActiveSpokenWord((curr) => (curr === 'explanation' ? null : curr));
      },
    });
    explanationStopRef.current = stopFn;
  };

  const activeLesson = activeLessonId ? getLessonById(activeLessonId) : undefined;

  const goBackToShelf = () => {
    stopAllBodhiSpeech();
    setTopic('home');
    setActiveArticleId(null);
    setActiveLessonId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBackToCourse = () => {
    stopAllBodhiSpeech();
    setTopic('home');
    setActiveArticleId(null);
    setActiveLessonId(null);
    setCourseViewTab('course');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (id: string) => {
    stopAllBodhiSpeech();
    setActiveArticleId(id);
    setActiveLessonId(null);
    setArticleError(false);
    setTopic('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLesson = (id: string) => {
    stopAllBodhiSpeech();
    setActiveLessonId(id);
    setActiveArticleId(null);
    setArticleError(false);
    setTopic('course-lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    return () => {
      stopAllBodhiSpeech();
    };
  }, [topic, activeArticleId, activeLessonId]);

  const renderBreadcrumb = (currentTitle: string) => (
    <div className="grammar-header-nav">
      <nav className="grammar-breadcrumb" aria-label="Grammar breadcrumb navigation">
        <button
          type="button"
          className="grammar-breadcrumb-link"
          onClick={goBackToShelf}
          title="Return to Vyākaraṇa Overview"
        >
          📚 वैदिक-व्याकरणम् (Vaidic Vyākaraṇam)
        </button>
        {topic === 'course-lesson' && (
          <>
            <span className="grammar-breadcrumb-sep" aria-hidden="true">›</span>
            <button
              type="button"
              className="grammar-breadcrumb-link"
              onClick={goBackToCourse}
              title="Return to 10-Lesson Course Curriculum"
            >
              🎓 10-Lesson Course
            </button>
          </>
        )}
        <span className="grammar-breadcrumb-sep" aria-hidden="true">›</span>
        <span className="grammar-breadcrumb-current">{currentTitle}</span>
      </nav>
      <nav className="grammar-nav" aria-label="Grammar page navigation">
        <button
          type="button"
          className="grammar-back"
          onClick={topic === 'course-lesson' ? goBackToCourse : goBackToShelf}
        >
          {topic === 'course-lesson' ? '← Back to Course' : '← Back to Overview'}
        </button>
        {onGoHome && (
          <button type="button" className="grammar-home" onClick={onGoHome}>
            ← Deepakam · Home
          </button>
        )}
      </nav>
    </div>
  );

  useEffect(() => {
    if (topic === 'article' && activeArticleMeta && !articles[activeArticleMeta.id] && !articleError) {
      fetchText(activeArticleMeta.file)
        .then((text) => setArticles((prev) => ({ ...prev, [activeArticleMeta.id]: parseArticle(text) })))
        .catch(() => setArticleError(true));
    }
  }, [topic, activeArticleMeta, articles, articleError]);

  useEffect(() => {
    if (topic === 'course-lesson' && activeLesson && !articles[activeLesson.id] && !articleError) {
      fetchText(activeLesson.file)
        .then((text) => setArticles((prev) => ({ ...prev, [activeLesson.id]: parseArticle(text) })))
        .catch(() => setArticleError(true));
    }
  }, [topic, activeLesson, articles, articleError]);

  if (topic === 'vibhakti') {
    return (
      <section className="grammar-page" aria-label="Vibhakti guide">
        {renderBreadcrumb('विभक्ति-परिचयः · Vibhakti Guide')}
        <VibhaktiGuide
          onGoBack={goBackToShelf}
          onOpenWorksheets={onOpenWorksheets}
          onOpenQuiz={onOpenQuiz}
        />
      </section>
    );
  }

  if (topic === 'linga-vachana') {
    return (
      <section className="grammar-page" aria-label="Gender and Number Guide">
        <header className="grammar-page-header">
          {renderBreadcrumb('लिङ्गं वचनं च · Gender & Number')}
        </header>
        <LingaVachanaGuide
          onOpenWorksheets={onOpenWorksheets}
          onOpenQuiz={onOpenQuiz}
          onGoBack={goBackToShelf}
        />
      </section>
    );
  }

  if (topic === 'samyukta') {
    return (
      <section className="grammar-page" aria-label="Conjunct games">
        <header className="grammar-page-header">
          {renderBreadcrumb('संयुक्त · Conjunct Games')}
          <h2 className="grammar-title">संयुक्त-क्रीडा-मण्डलम् · Conjunct Games Studio</h2>
          <p className="grammar-lead">
            Tactile letter forges, vertical piggyback stackers, superhero shape-shifters, and 3-level quiz arena with score tracking &amp; comic guides!
          </p>
        </header>
        <ConjunctGames />
      </section>
    );
  }

  if (topic === 'sound-teams') {
    return (
      <section className="grammar-page" aria-label="Five Sound Teams">
        <header className="grammar-page-header">
          {renderBreadcrumb('Five Sound Teams · पञ्च वर्ण-टीमें')}
          <h2 className="grammar-title">Five Sound Teams · पञ्च वर्ण-टीमें</h2>
          <p className="grammar-lead">
            Vowels, consonants, sliders, hissers, and fusion blocks — how every letter finds its
            squad.
          </p>
        </header>
        <SoundTeamsArticle />
      </section>
    );
  }

  if (topic === 'science-of-sound') {
    return (
      <section className="grammar-page" aria-label="Sanskrit Science of Sound">
        <header className="grammar-page-header">
          {renderBreadcrumb('ध्वनि-विज्ञानम् · Science of Sound')}
          <h2 className="grammar-title">संस्कृतम् · ध्वनि-विज्ञानम्</h2>
          <p className="grammar-lead">
            The Science of Sound: Neuro-acoustic precision, resonant vibrations, and anatomical vocal science of the Sanskrit language.
          </p>
        </header>

        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto 2rem auto',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
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
              src="https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0"
              title="Sanskrit: The Science of Sound"
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
                🎥 Masterclass: Sanskrit: The Science of Sound
              </div>
              <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.2rem' }}>
                Curated Documentary by <strong>Conscious Cosmos</strong> · Timestamp: starts at 0:32
              </div>
            </div>
            <a
              href="https://www.youtube.com/watch?v=tkvYjNZSsZA&t=32s"
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

        <article className="grammar-article" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h3 className="grammar-article-subheading">🧠 Key Concepts Explored in this Documentary</h3>
          <ul className="grammar-article-list">
            <li>
              <strong>The 5 Anatomical Vocal Points (उच्चारण-स्थानानि):</strong> Sanskrit organizes letters geometrically along the human vocal tract from back to front: Kaṇṭhya (कण्ठ्य - Throat), Tālavya (तालव्य - Palate), Mūrdhanya (मूर्धन्य - Roof of mouth), Dantya (दन्त्य - Teeth), and Oṣṭhya (ओष्ठ्य - Lips).
            </li>
            <li>
              <strong>Effort and Breath Dynamics (आभ्यन्तर-प्रयत्न):</strong> How internal aspiration (alpaprāṇa vs. mahāprāṇa) and voicing (ghoṣa vs. aghoṣa) stimulate distinct neurological pathways.
            </li>
            <li>
              <strong>Acoustic Resonance &amp; Cymatics:</strong> The physical geometric vibrations created by Sanskrit frequencies and why ancient mantras follow exact mathematical harmonics.
            </li>
          </ul>

          <footer className="grammar-article-footer">
            <button type="button" className="grammar-back grammar-footer-btn" onClick={goBackToShelf}>
              ← Back to All Grammar Articles
            </button>
            {onGoHome && (
              <button type="button" className="grammar-home grammar-footer-btn" onClick={onGoHome}>
                ← Return to Deepakam Lessons
              </button>
            )}
          </footer>
        </article>
      </section>
    );
  }

  if (topic === 'dhatupatha') {
    return (
      <section className="grammar-page" aria-label="Pāṇinian Dhātupāṭha Studio">
        <header className="grammar-page-header">
          {renderBreadcrumb('पाणिनीय-धातुपाठ-प्रयोगशाला (Pāṇinian Studio)')}
        </header>
        <PaninianStudio onGoBack={goBackToShelf} onGoHome={onGoHome} />
      </section>
    );
  }

  if (topic === 'numbers') {
    return (
      <section className="grammar-page" aria-label="Sanskrit Numbers Masterclass">
        <header className="grammar-page-header">
          {renderBreadcrumb('संख्या-परिचयः (Numbers Masterclass)')}
        </header>
        <NumbersGuide />
      </section>
    );
  }

  if (topic === 'course-lesson' && activeLesson) {
    const lessonArticle = articles[activeLesson.id];
    const prevLesson = getPrevLesson(activeLesson.id);
    const nextLesson = getNextLesson(activeLesson.id);
    const moduleInfo = VYAKARANA_MODULES.find((m) => m.id === activeLesson.moduleId);

    return (
      <section className="grammar-page" aria-label={`Vyākaraṇa ${activeLesson.title}`}>
        <header className="grammar-page-header">
          {renderBreadcrumb(activeLesson.title)}
          <div className="grammar-module-tag-row" style={{ marginTop: '0.75rem' }}>
            <span className="grammar-module-pill" style={{ background: moduleInfo?.color || '#0f766e' }}>
              {moduleInfo?.badge || 'Module'} · Lesson {activeLesson.lessonNumber} of 10
            </span>
            <span className="grammar-lesson-num-pill">{activeLesson.titleSa}</span>
          </div>
          <h2 className="grammar-title" style={{ marginTop: '0.4rem' }}>{activeLesson.title}</h2>
          <p className="grammar-lead">{activeLesson.summary}</p>
        </header>

        {/* Bodhi Mascot Companion */}
        <div className="grammar-bodhi-companion-card">
          <div className="grammar-bodhi-companion-avatar">
            <BodhiAvatar
              size="md"
              mood="scholar"
              showHalo={true}
              isSpeaking={activeSpokenWord !== null}
            />
          </div>
          <div className="grammar-bodhi-companion-content">
            <div className="grammar-bodhi-companion-header">
              <div className="grammar-bodhi-title-row">
                <span className="grammar-bodhi-name">बोधिः (Bodhi)</span>
                <span className="grammar-bodhi-badge">Lesson Tutor</span>
              </div>
            </div>

            <p className="grammar-bodhi-speech">
              Welcome to <strong>{activeLesson.title}</strong>. Practice pronouncing each highlighted Sanskrit term below, then read through the rules, paradigms, and examples.
            </p>

            <div className="grammar-bodhi-key-words">
              <span className="grammar-bodhi-key-words-label">Key Concepts:</span>
              <div className="grammar-bodhi-chips">
                {activeLesson.keyConcepts.map((concept, idx) => (
                  <span key={idx} className="grammar-lesson-tag">{concept}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Studio Callout if connected */}
        {activeLesson.interactiveStudioTopic && (
          <div className="grammar-lesson-studio-callout">
            <div className="grammar-lesson-studio-callout-text">
              🔬 <strong>Interactive Lab:</strong> Practice this concept live in our dedicated studio: {activeLesson.interactiveStudioLabel}
            </div>
            <button
              type="button"
              className="grammar-lesson-studio-btn"
              onClick={() => {
                stopAllBodhiSpeech();
                setTopic(activeLesson.interactiveStudioTopic!);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Open Studio →
            </button>
          </div>
        )}

        {/* Lesson Markdown Body */}
        {lessonArticle ? (
          <article className="grammar-article">
            {renderArticleBlocks(lessonArticle.blocks)}
          </article>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</div>
            <p>Loading {activeLesson.title}...</p>
          </div>
        )}

        {/* Inline Lesson Quiz */}
        {LESSON_QUIZZES[activeLesson.id] && (
          <LessonInlineQuiz
            quizInfo={LESSON_QUIZZES[activeLesson.id]}
            onOpenFullQuiz={onOpenQuiz}
          />
        )}

        {/* Suggested Practice Drill */}
        <div className="grammar-lesson-practice-box" style={{
          margin: '2rem 0 1rem 0',
          padding: '1.25rem 1.5rem',
          background: '#fffdf5',
          border: '1.5px solid #fef08a',
          borderRadius: '12px',
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#854d0e', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem', fontWeight: 800 }}>
            <span>📝</span> Suggested Lesson Drill &amp; Self-Check
          </h4>
          <p style={{ margin: 0, fontSize: '0.92rem', color: '#713f12', lineHeight: 1.5 }}>
            {activeLesson.suggestedPractice}
          </p>
        </div>

        {/* Navigation Footer */}
        <footer className="grammar-lesson-nav-footer">
          {prevLesson ? (
            <button
              type="button"
              className="grammar-lesson-nav-btn grammar-lesson-nav-prev"
              onClick={() => openLesson(prevLesson.id)}
            >
              ← Previous: Lesson {prevLesson.lessonNumber}
            </button>
          ) : <div />}

          <button
            type="button"
            className="grammar-footer-btn"
            onClick={goBackToCourse}
          >
            📋 All Lessons Overview
          </button>

          {nextLesson ? (
            <button
              type="button"
              className="grammar-lesson-nav-btn grammar-lesson-nav-next"
              onClick={() => openLesson(nextLesson.id)}
            >
              Next: Lesson {nextLesson.lessonNumber} →
            </button>
          ) : (
            <div style={{ fontWeight: 800, color: '#047857', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>🎉</span> Course Completed!
            </div>
          )}
        </footer>
      </section>
    );
  }

  if (topic === 'article') {
    const displayArticle = activeArticle;
    const displayTitle = displayArticle?.title || activeArticleMeta?.cardTitle || 'Article';
    const displaySubtitle = displayArticle?.subtitle || activeArticleMeta?.cardBlurb;
    const keyWords = activeArticleId ? ARTICLE_KEY_WORDS[activeArticleId] : undefined;
    const activeExplanation = activeArticleId ? SANSKRIT_EXPLANATIONS[activeArticleId] : undefined;

    return (
      <section className="grammar-page" aria-label="Grammar article">
        <header className="grammar-page-header">
          {renderBreadcrumb(displayTitle)}
          <h2 className="grammar-title">{displayTitle}</h2>
          {displaySubtitle && <p className="grammar-lead">{displaySubtitle}</p>}
        </header>

        {/* Bodhi Mascot Article Companion: Key Words & Sanskrit Recitation */}
        <div className="grammar-bodhi-companion-card">
          <div className="grammar-bodhi-companion-avatar">
            <BodhiAvatar
              size="md"
              mood={isExplanationSpeaking ? 'scholar' : activeSpokenWord ? 'happy' : 'reading'}
              showHalo={true}
              isSpeaking={isExplanationSpeaking || activeSpokenWord !== null}
            />
          </div>
          <div className="grammar-bodhi-companion-content">
            <div className="grammar-bodhi-companion-header">
              <div className="grammar-bodhi-title-row">
                <span className="grammar-bodhi-name">बोधिः (Bodhi)</span>
                <span className="grammar-bodhi-badge">Sanskrit Mascot &amp; Guide</span>
              </div>
            </div>

            <p className="grammar-bodhi-speech">
              Namaste. I am Bodhi. Explore the key concepts below, and tap any highlighted Sanskrit word in the glossary or narrative to hear authentic pronunciation.
            </p>

            {/* Bodhi's Sanskrit Explanation (💡 बोधि-व्याख्या · Bodhi's Sanskrit Explanation) */}
            {activeExplanation && (
              <div className={`grammar-bodhi-explanation-card${isExplanationSpeaking ? ' is-speaking' : ''}`}>
                <div className="grammar-bodhi-explanation-head">
                  <div className="grammar-bodhi-explanation-titles">
                    <div className="grammar-bodhi-explanation-badge-row">
                      <span className="grammar-bodhi-explanation-tag">💡 बोधि-व्याख्या · Bodhi's Sanskrit Explanation</span>
                      {activeExplanation.takeawayQuote && (
                        <span className="grammar-bodhi-sutra-quote" title={activeExplanation.takeawayQuote.en}>
                          📜 {activeExplanation.takeawayQuote.sa}
                        </span>
                      )}
                    </div>
                    <h4 className="grammar-bodhi-explanation-title">{activeExplanation.titleSa}</h4>
                  </div>

                  <div className="grammar-bodhi-explanation-actions">
                    <button
                      type="button"
                      className={`grammar-bodhi-listen-btn${isExplanationSpeaking ? ' active' : ''}`}
                      onClick={() => handleToggleExplanationSpeech(activeExplanation.sanskritText)}
                      title={
                        isExplanationSpeaking
                          ? 'विरामोऽस्तु · Stop Bodhi recitation'
                          : 'शृणोतु · Hear Bodhi explain in simple Sanskrit'
                      }
                    >
                      {isExplanationSpeaking ? (
                        <>
                          <span className="grammar-bodhi-audio-pulse-dot" />
                          <span className="grammar-bodhi-listen-icon">⏹️</span>
                          <span className="grammar-bodhi-listen-text">विरामोऽस्तु (Stop)</span>
                        </>
                      ) : (
                        <>
                          <span className="grammar-bodhi-listen-icon">🔊</span>
                          <span className="grammar-bodhi-listen-text">शृणोतु (Hear Bodhi in Sanskrit)</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`grammar-bodhi-lang-toggle-btn${showEnglishExplanation ? ' active' : ''}`}
                      onClick={() => setShowEnglishExplanation((prev) => !prev)}
                      title={showEnglishExplanation ? 'Hide English translation' : 'Show English translation'}
                    >
                      {showEnglishExplanation ? '🇬🇧 English (Hide)' : '🇬🇧 English (Show)'}
                    </button>
                  </div>
                </div>

                {/* Sanskrit Explanation Paragraph */}
                <div className="grammar-bodhi-sanskrit-box">
                  <p className="grammar-bodhi-sanskrit-text">
                    {activeExplanation.sanskritText}
                  </p>
                </div>

                {/* English Translation & Takeaways Box */}
                {showEnglishExplanation && (
                  <div className="grammar-bodhi-english-box">
                    <div className="grammar-bodhi-english-header">
                      <span className="grammar-bodhi-english-tag">🇬🇧 English Translation &amp; Core Analysis</span>
                    </div>
                    <p className="grammar-bodhi-english-text">
                      {activeExplanation.englishTranslation}
                    </p>

                    {activeExplanation.bulletPoints && activeExplanation.bulletPoints.length > 0 && (
                      <div className="grammar-bodhi-bullets-wrap">
                        <span className="grammar-bodhi-bullets-title">सार-बिन्दवः · Key Takeaways:</span>
                        <ul className="grammar-bodhi-bullets-list">
                          {activeExplanation.bulletPoints.map((bp, bpIdx) => (
                            <li key={bpIdx}>
                              <strong className="grammar-bodhi-bullet-sa">{bp.sa}</strong>
                              <span className="grammar-bodhi-bullet-en"> — {bp.en}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Key Sanskrit Words with Bodhi Voice */}
            {keyWords && keyWords.length > 0 && (
              <div className="grammar-bodhi-keywords-wrap">
                <span className="grammar-bodhi-keywords-label">
                  <strong>बोधि-शब्दावली (Key Sanskrit Terms):</strong> Tap any word to hear authentic pronunciation:
                </span>
                <div className="grammar-bodhi-chips">
                  {keyWords.map((kw, kwIdx) => {
                    const isWordSpeaking = activeSpokenWord === kw.word;
                    return (
                      <button
                        key={kwIdx}
                        type="button"
                        className={`grammar-bodhi-chip${isWordSpeaking ? ' active-speaking' : ''}`}
                        onClick={() => handlePlayBodhiWord(kw.word)}
                        title={`Tap to hear Bodhi speak "${kw.word}" (${kw.translit})`}
                      >
                        <span className="grammar-bodhi-chip-icon">🔊</span>
                        <span className="grammar-bodhi-chip-word">{kw.word}</span>
                        <span className="grammar-bodhi-chip-translit">({kw.translit})</span>
                        <span className="grammar-bodhi-chip-meaning">{kw.meaning}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {articleError && !displayArticle && (
          <p className="grammar-lead">
            Could not load the article. Make sure {activeArticleMeta?.file ?? 'the article file'} exists in
            public/.
          </p>
        )}
        {displayArticle && (
          <article className="grammar-article">
            {renderArticleBlocks(displayArticle.blocks)}
            <footer className="grammar-article-footer">
              <button
                type="button"
                className="grammar-back grammar-footer-btn"
                onClick={goBackToShelf}
              >
                ← Back to All Grammar Articles
              </button>
              {onGoHome && (
                <button
                  type="button"
                  className="grammar-home grammar-footer-btn"
                  onClick={onGoHome}
                >
                  ← Return to Deepakam Lessons
                </button>
              )}
            </footer>
          </article>
        )}
      </section>
    );
  }

  const INTERACTIVE_TOPICS = [
    {
      id: 'vibhakti' as GrammarTopic,
      title: '🏛️ विभक्ति · Vibhakti Guide',
      blurb: 'Understand all 8 Sanskrit noun cases, kāraka roles, suffixes, sentences, and memory trick with Bālaka.',
      color: '#047857',
      borderColor: '#059669',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)',
      keywords: ['vibhakti', 'noun cases', 'balaka', 'karaka', 'declension', 'cases', 'विभक्ति', 'बालक'],
    },
    {
      id: 'dhatupatha' as GrammarTopic,
      title: '🌿 पाणिनीय-धातुपाठ-प्रयोगशाला · Pāṇinian Studio',
      blurb: 'Deconstruct words (गत्वा, पठितुम्), generate 5-Lakāra conjugations with color-coded formulas, and practice Pratyayas.',
      color: '#0f766e',
      borderColor: '#0f766e',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)',
      keywords: ['dhatupatha', 'paninian studio', 'lakara', 'verb conjugations', 'pratyaya', 'deconstruct', 'roots', 'धातुपाठ', 'लकार'],
    },
    {
      id: 'linga-vachana' as GrammarTopic,
      title: '⚖️ लिङ्गं वचनं च · Gender & Number',
      blurb: 'Master the 3 Genders, 3 Numbers, Pronouns, and Subject-Verb agreement with interactive tools.',
      color: '#b45309',
      borderColor: '#d97706',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)',
      keywords: ['linga', 'vachana', 'gender', 'number', 'pullinga', 'strilinga', 'napumsakalinga', 'agreement', 'लिङ्गं वचनं च'],
    },
    {
      id: 'numbers' as GrammarTopic,
      title: '🔢 संख्या-परिचयः · Numbers Masterclass',
      blurb: 'Complete 1-100 numerals, 1-4 gender declensions (एकः, एका, एकम्), ordinals (प्रथम, द्वितीय), Vedic scales up to 10¹⁷, and quizzes.',
      color: '#1d4ed8',
      borderColor: '#2563eb',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)',
      keywords: ['numbers', 'numerals', 'counting', '1 to 100', 'ordinals', 'scales', 'sankhya', 'संख्या', 'गिनती', 'ankanama', 'ankanam vamato gatih', 'अङ्कानां वामतो गतिः', 'compose', 'arithmetic', 'algorithm'],
    },
    {
      id: 'sound-teams' as GrammarTopic,
      title: 'Five Sound Teams · पञ्च वर्ण-टीमें',
      blurb: 'Vowels, consonants, sliders, hissers, and fusion blocks — how every letter finds its squad.',
      color: '#475569',
      borderColor: '#d8cfbf',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)',
      keywords: ['sound teams', 'vowels', 'consonants', 'sliders', 'hissers', 'varnamala', 'वर्ण-टीमें'],
    },
    {
      id: 'science-of-sound' as GrammarTopic,
      title: '🎥 Sanskrit: The Science of Sound · ध्वनि-विज्ञानम्',
      blurb: 'Masterclass Video: Explore the neuro-acoustic precision, 5 vocal articulation points, and resonant frequencies of Sanskrit.',
      color: '#7c3aed',
      borderColor: '#8b5cf6',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)',
      keywords: ['science of sound', 'video', 'acoustics', 'kantha', 'talu', 'murdha', 'danta', 'oshtha', 'ध्वनि-विज्ञानम्'],
    },
    {
      id: 'samyukta' as GrammarTopic,
      title: 'संयुक्त · Conjunct Games',
      blurb: 'Drop the stick, piggyback, shape-shifters — how letters join.',
      color: '#e11d48',
      borderColor: '#d8cfbf',
      bgGradient: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)',
      keywords: ['conjunct games', 'samyukta', 'ligatures', 'half letters', 'संयुक्त'],
    },
  ];

  const qClean = searchFilter.trim().toLowerCase();

  const filteredLessons = qClean
    ? VYAKARANA_LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(qClean) ||
          l.titleSa.toLowerCase().includes(qClean) ||
          l.summary.toLowerCase().includes(qClean) ||
          l.keyConcepts.some((c) => c.toLowerCase().includes(qClean)) ||
          `lesson ${l.lessonNumber}`.includes(qClean)
      )
    : VYAKARANA_LESSONS;

  const filteredInteractive = qClean
    ? INTERACTIVE_TOPICS.filter(
        (t) =>
          t.title.toLowerCase().includes(qClean) ||
          t.blurb.toLowerCase().includes(qClean) ||
          t.keywords.some((k) => k.toLowerCase().includes(qClean))
      )
    : INTERACTIVE_TOPICS;

  const masterclassArticles = ARTICLES.filter((art) => MASTERCLASS_IDS.includes(art.id));

  const filteredMasterclasses = qClean
    ? ARTICLES.filter((art) => {
        const saMeta = SANSKRIT_ARTICLE_META[art.id];
        const text = (
          art.cardTitle +
          ' ' +
          art.cardBlurb +
          ' ' +
          (saMeta?.titleSa || '') +
          ' ' +
          (saMeta?.blurbSa || '')
        ).toLowerCase();
        if (text.includes(qClean)) return true;
        // Katapayadi extra tags
        if (art.id === 'katapayadi-number-words') {
          const kataTags = ['phi', 'golden ratio', 'pi', 'melakarta', 'raga', 'ragas', 'narayaniyam', 'astronomy', 'chronogram', 'madhava', 'virahanka', 'hemacandra', 'ankanam', 'ankanam vamato gatih', 'अङ्कानां वामतो गतिः', 'compose', 'arithmetic', 'algorithm'];
          if (kataTags.some((tag) => tag.includes(qClean) || qClean.includes(tag))) return true;
        }
        if (art.id === 'beginners-roadmap') {
          const roadTags = ['roadmap', 'beginner', 'start', 'where to start', 'how to learn', 'learn sanskrit', 'study plan', 'plan', 'routine', 'first steps', 'guide', 'mistakes', 'devanagari', 'iast', 'pronunciation', 'मार्गदर्शिका'];
          if (roadTags.some((tag) => tag.includes(qClean) || qClean.includes(tag))) return true;
        }
        if (art.id === 'sanskrit-in-english') {
          const engTags = ['etymology', 'english', 'loanword', 'borrowing', 'cognate', 'sugar', 'jungle', 'shampoo', 'bungalow', 'orange', 'ginger', 'candy', 'cheetah', 'karma', 'yoga', 'juggernaut', 'william jones'];
          if (engTags.some((tag) => tag.includes(qClean) || qClean.includes(tag))) return true;
        }
        return false;
      })
    : masterclassArticles;

  const totalMatches = filteredLessons.length + filteredMasterclasses.length + filteredInteractive.length;

  return (
    <section className="grammar-page" aria-label="Grammar">
      <header className="grammar-page-header">
        <h2 className="grammar-title">वैदिक-व्याकरणम् · Vaidic Vyākaraṇam</h2>
        <p className="grammar-lead">
          A structured 10-lesson Vaidic Vyākaraṇam curriculum from phonetics to syntax, paired with interactive studios and scholarly masterclasses.
        </p>
      </header>

      {/* Grammar Search Bar */}
      <div className="grammar-search-bar-wrap">
        <div className="grammar-search-input-box">
          <span className="grammar-search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="grammar-search-input"
            placeholder="Search lessons, cases, verbs, or masterclasses (e.g. Vowels, Vibhakti, Laṭ Lakāra, Kaṭapayādi)..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            aria-label="Filter grammar lessons, articles and topics"
          />
          {searchFilter && (
            <button
              type="button"
              className="grammar-search-clear"
              onClick={() => setSearchFilter('')}
              title="Clear search filter"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchFilter && (
          <div className="grammar-search-count-badge">
            Found {totalMatches} matching {totalMatches === 1 ? 'item' : 'items'}
          </div>
        )}
      </div>

      {/* 3 Main Sections of Vyakarana: 10-Lesson Course, Masterclasses, Studios */}
      {!qClean && (
        <div className="grammar-view-tabs" role="tablist" aria-label="Vyakarana sections">
          <button
            type="button"
            className={`grammar-view-tab${courseViewTab === 'course' ? ' active' : ''}`}
            onClick={() => setCourseViewTab('course')}
            role="tab"
            aria-selected={courseViewTab === 'course'}
          >
            <span>🎓 10-Part Beginner Course</span>
            <span className="grammar-view-tab-count">10</span>
          </button>
          <button
            type="button"
            className={`grammar-view-tab${courseViewTab === 'masterclasses' ? ' active' : ''}`}
            onClick={() => setCourseViewTab('masterclasses')}
            role="tab"
            aria-selected={courseViewTab === 'masterclasses'}
          >
            <span>📚 Linguistics Masterclasses</span>
            <span className="grammar-view-tab-count">{masterclassArticles.length}</span>
          </button>
          <button
            type="button"
            className={`grammar-view-tab${courseViewTab === 'studios' ? ' active' : ''}`}
            onClick={() => setCourseViewTab('studios')}
            role="tab"
            aria-selected={courseViewTab === 'studios'}
          >
            <span>🛠️ Interactive Studios &amp; Labs</span>
            <span className="grammar-view-tab-count">{INTERACTIVE_TOPICS.length}</span>
          </button>
        </div>
      )}

      {/* Search Results View */}
      {qClean && totalMatches > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
          {filteredLessons.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>🎓</span> Matching Course Lessons ({filteredLessons.length})
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {filteredLessons.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    className="grammar-course-lesson-card"
                    onClick={() => openLesson(l.id)}
                  >
                    <div>
                      <div className="grammar-lesson-card-top">
                        <span className="grammar-lesson-num-pill">Lesson {l.lessonNumber}</span>
                        <span className="grammar-lesson-card-emoji">{l.emoji}</span>
                      </div>
                      <h4 className="grammar-lesson-card-title">{l.title}</h4>
                      <p className="grammar-lesson-card-desc">{l.summary}</p>
                    </div>
                    <div className="grammar-lesson-card-cta">
                      <span>Open Lesson →</span>
                      {onOpenQuiz && (
                        <span
                          className="grammar-lesson-quiz-link-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            const q = LESSON_QUIZZES[l.id];
                            onOpenQuiz(q?.anchor || 'grammar');
                          }}
                          title={`Take ${l.title} Quiz`}
                        >
                          🎯 Take Quiz
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredMasterclasses.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#b45309', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>📚</span> Matching Masterclass Articles ({filteredMasterclasses.length})
              </h3>
              <div className="grammar-shelf">
                {filteredMasterclasses.map((item) => (
                  <button
                    type="button"
                    className="grammar-card grammar-card--ready"
                    key={item.id}
                    onClick={() => openArticle(item.id)}
                  >
                    <span className="grammar-card-title">
                      {item.emoji} {item.cardTitle}
                    </span>
                    <span className="grammar-card-blurb">{item.cardBlurb}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredInteractive.length > 0 && (
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1d4ed8', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>🛠️</span> Matching Interactive Studios ({filteredInteractive.length})
              </h3>
              <div className="grammar-shelf">
                {filteredInteractive.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="grammar-card grammar-card--ready"
                    style={{
                      borderColor: t.borderColor,
                      background: t.bgGradient,
                    }}
                    onClick={() => setTopic(t.id)}
                  >
                    <span className="grammar-card-title" style={{ color: t.color }}>
                      {t.title}
                    </span>
                    <span className="grammar-card-blurb">{t.blurb}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course Track: 10 Lessons in 4 Modules */}
      {!qClean && courseViewTab === 'course' && (
        <div className="grammar-course-overview">
          {VYAKARANA_MODULES.map((module) => {
            const moduleLessons = VYAKARANA_LESSONS.filter((l) => module.lessonIds.includes(l.id));
            return (
              <div key={module.id} className="grammar-module-section">
                <div className="grammar-module-header">
                  <div className="grammar-module-badge-wrap" style={{ border: `2px solid ${module.color}` }}>
                    <span>{module.emoji}</span>
                  </div>
                  <div className="grammar-module-info">
                    <div className="grammar-module-tag-row">
                      <span className="grammar-module-pill" style={{ background: module.color }}>
                        {module.badge}
                      </span>
                      <span className="grammar-module-title-sa">{module.titleSa}</span>
                    </div>
                    <h3 className="grammar-module-title">{module.title}</h3>
                    <p className="grammar-module-summary">{module.summary}</p>
                  </div>
                </div>

                <div className="grammar-module-lessons-list">
                  {moduleLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      type="button"
                      className="grammar-course-lesson-card"
                      onClick={() => openLesson(lesson.id)}
                    >
                      <div>
                        <div className="grammar-lesson-card-top">
                          <span className="grammar-lesson-num-pill">Lesson {lesson.lessonNumber}</span>
                          <span className="grammar-lesson-card-emoji">{lesson.emoji}</span>
                        </div>
                        <h4 className="grammar-lesson-card-title">{lesson.title}</h4>
                        <p className="grammar-lesson-card-desc">{lesson.summary}</p>
                        <div className="grammar-lesson-card-tags">
                          {lesson.keyConcepts.slice(0, 3).map((tag, tIdx) => (
                            <span key={tIdx} className="grammar-lesson-tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div className="grammar-lesson-card-cta">
                        <span>Start Lesson →</span>
                        {onOpenQuiz && (
                          <span
                            className="grammar-lesson-quiz-link-badge"
                            onClick={(e) => {
                              e.stopPropagation();
                              const q = LESSON_QUIZZES[lesson.id];
                              onOpenQuiz(q?.anchor || 'grammar');
                            }}
                            title={`Take ${lesson.title} Quiz`}
                          >
                            🎯 Take Quiz
                          </span>
                        )}
                        {lesson.interactiveStudioLabel && (
                          <span className="grammar-lesson-studio-badge">
                            ⚡ Lab Attached
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Masterclasses Track */}
      {!qClean && courseViewTab === 'masterclasses' && (
        <>
          <button
            type="button"
            className="grammar-start-here-banner"
            onClick={() => openArticle('beginners-roadmap')}
            title="Open: A Beginner's Roadmap to Learning Sanskrit"
          >
            <span className="grammar-start-here-emoji" aria-hidden="true">🧭</span>
            <span className="grammar-start-here-text">
              <strong>New to Sanskrit? Start here.</strong> A beginner's roadmap: what to learn first, in what order, and an 8-week starter plan.
            </span>
            <span className="grammar-start-here-arrow" aria-hidden="true">→</span>
          </button>

          <div className="grammar-shelf">
            {masterclassArticles.map((item) => (
              <button
                type="button"
                className="grammar-card grammar-card--ready"
                key={item.id}
                onClick={() => openArticle(item.id)}
              >
                <span className="grammar-card-title">
                  {item.emoji} {item.cardTitle}
                </span>
                <span className="grammar-card-blurb">{item.cardBlurb}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Interactive Studios & Labs Track */}
      {!qClean && courseViewTab === 'studios' && (
        <div className="grammar-shelf">
          {INTERACTIVE_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              className="grammar-card grammar-card--ready"
              style={{
                borderColor: t.borderColor,
                background: t.bgGradient,
              }}
              onClick={() => setTopic(t.id)}
            >
              <span className="grammar-card-title" style={{ color: t.color }}>
                {t.title}
              </span>
              <span className="grammar-card-blurb">{t.blurb}</span>
            </button>
          ))}
        </div>
      )}

      {totalMatches === 0 && (
        <div className="grammar-no-results-card">
          <span className="grammar-no-results-emoji" aria-hidden="true">🔍</span>
          <h4 className="grammar-no-results-title">No matching grammar topics found</h4>
          <p className="grammar-no-results-text">
            No topics matched &ldquo;{searchFilter}&rdquo;. Try searching for &ldquo;Vowels&rdquo;, &ldquo;Vibhakti&rdquo;, &ldquo;Laṭ Lakāra&rdquo;, &ldquo;Kaṭapayādi&rdquo;, or &ldquo;Avyaya&rdquo;.
          </p>
          <button
            type="button"
            className="grammar-clear-search-btn"
            onClick={() => setSearchFilter('')}
          >
            Clear Filter &amp; Show All Topics
          </button>
        </div>
      )}
    </section>
  );
};

export default Grammar;
