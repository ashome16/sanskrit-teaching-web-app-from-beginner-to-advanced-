import React, { useEffect } from 'react';
import '../styles/philosophy.css';
import '../styles/cbse-guide.css';

export interface CbseSanskritGuidePageProps {
  onOpenRegister?: () => void;
  onGoHome?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenGrammar?: () => void;
  onOpenResources?: () => void;
}

const DEFAULT_TITLE =
  'Online Sanskrit & Vedic Math Classes for Kids | EdNet Learn Gurukul';
const DEFAULT_DESC =
  'Unlock your child\'s potential with interactive Sanskrit and Vedic Math for kids. Start a 14-day free trial, then pay ₹200 once — no auto-debit.';

const PAGE_TITLE =
  'CBSE NCERT Sanskrit Exam Guide (Classes 7–10) | EdNet Learn Gurukul';
const PAGE_DESC =
  'Master CBSE NCERT Sanskrit exams for Classes 7–10: section blueprint, question terminology, Kim-family keywords, and exam-day strategy. EdNet Learn Gurukul.';
const PAGE_URL = 'https://ednetlearn.in/cbse-sanskrit-guide';

const BLUEPRINT_ROWS: {
  section: string;
  domain: string;
  weightage: string;
  time: string;
  formats: string;
}[] = [
  {
    section: "खण्ड 'क'",
    domain: 'अपठित-अवबोधनम् (Unseen Comprehension)',
    weightage: '10 Marks',
    time: '20 Minutes',
    formats:
      'One unseen passage (80–100 words in Class 10; shorter for Classes 7–8). Evaluates direct textual decoding, titling, and grammar clues.',
  },
  {
    section: "खण्ड 'ख'",
    domain: 'रचनात्मक-कार्यम् (Creative Writing)',
    weightage: '15 Marks',
    time: '35 Minutes',
    formats:
      'Form-based formal/informal letters, paragraph compositions, and picture descriptions (Chitra Varnanam) using contextual aids.',
  },
  {
    section: "खण्ड 'ग'",
    domain: 'अनुप्रयुक्त-व्याकरणम् (Applied Grammar)',
    weightage: '25 Marks',
    time: '40 Minutes',
    formats:
      'Strictly rule-based language mechanics: Sandhi, Samas, Dhatu/Shabda Roop, Pratyaya, time-writing, and sentence corrections.',
  },
  {
    section: "खण्ड 'घ'",
    domain: 'पठित-अवबोधनम् (Literature / Textual)',
    weightage: '30 Marks',
    time: '55 Minutes',
    formats:
      'Comprehension extracts pulled straight from your assigned NCERT textbooks (Ruchira for 7–8; Shemushi or Manika for 9–10).',
  },
];

const TERMINOLOGY: { term: string; meaning: string }[] = [
  {
    term: 'एकपदेन उत्तरत (Ekapadena Uttarata)',
    meaning: 'Answer in exactly one word. Do not write a sentence.',
  },
  {
    term: 'पूर्णवाक्येन उत्तरत (Purnavakyena Uttarata)',
    meaning: 'Answer in a complete sentence.',
  },
  {
    term: 'उचितं शीर्षकं लिखत (Uchitam Shirshakam Likhata)',
    meaning:
      'Provide a suitable title for the text block (typically best kept to 2–3 words).',
  },
  {
    term: 'विशेषण-विशेष्य पदम् (Visheshana-Visheshya Padam)',
    meaning:
      'Identify the adjective (Visheshana) and the corresponding noun being described (Visheshya).',
  },
  {
    term: 'पर्यायपदम् / विलोमपदम् (Paryayapadam / Vilomapadam)',
    meaning: 'Locate a synonym / antonym within the text.',
  },
  {
    term: 'कर्तृपदम् / क्रियापदम् (Kartripadam / Kriyapadam)',
    meaning:
      'Identify the subject (doer) / verb (action) in a specified sentence string.',
  },
  {
    term: 'मञ्जूषा (Manjusha)',
    meaning:
      'The word-bank or options box provided at the bottom of writing or fill-in-the-blank questions.',
  },
  {
    term: 'रेखाङ्कितपदानि आधृत्य प्रश्ननिर्माणं कुरुत (Rekhankitapadani Adhritya Prashnanirmanam Kuruta)',
    meaning: 'Frame a question matching the context of the underlined words.',
  },
  {
    term: 'अन्वयः (Anvaya)',
    meaning:
      'Rearranging a poetic verse (Shloka) into a logical prose sequence (frequently laid out as a fill-in-the-blank drill).',
  },
  {
    term: 'भावार्थः (Bhavartha)',
    meaning:
      'The underlying central meaning, theme, or intent of a poetic verse.',
  },
];

const KIM_FAMILY: { term: string; meaning: string }[] = [
  {
    term: 'कः / का / किम् (Kah / Kaa / Kim)',
    meaning: 'Who? / What? (Masculine / Feminine / Neuter versions).',
  },
  {
    term: 'कुत्र (Kutra)',
    meaning:
      'Where? (Expects a physical location or setting, typically appearing in the 7th case/Saptami Vibhakti, like गृहे or वने).',
  },
  {
    term: 'कदा (Kada)',
    meaning:
      'When? (Expects a time-bound reference word, like प्रातः or सायं).',
  },
  {
    term: 'कति (Kati)',
    meaning: 'How many? (Expects a definitive numerical figure).',
  },
  {
    term: 'कथम् (Katham)',
    meaning: 'How? (Expects a specific method, condition, or descriptive quality).',
  },
  {
    term: 'किमर्थम् (Kimartham)',
    meaning:
      'Why? / For what purpose? (Expects a functional reason, frequently triggering words ending in a -तुमुन् suffix or the 4th case/Chaturthi Vibhakti).',
  },
  {
    term: 'कुतः (Kutah)',
    meaning:
      'From where? (Expects a source of origin, matching the 5th case/Panchami Vibhakti, like ग्रामात्).',
  },
  {
    term: 'कीदृशः / कीदृशी (Keedrushah / Keedrushi)',
    meaning:
      'What kind of? (Expects a descriptive adjective matching the gender layout of the targeted noun).',
  },
];

const CbseSanskritGuidePage: React.FC<CbseSanskritGuidePageProps> = ({
  onOpenRegister,
  onGoHome,
  onOpenPhilosophy,
  onOpenGrammar,
  onOpenResources,
}) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    metaDesc?.setAttribute('content', PAGE_DESC);

    const canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') || '';
    canonical?.setAttribute('href', PAGE_URL);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const prevOgTitle = ogTitle?.getAttribute('content') || '';
    const prevOgDesc = ogDesc?.getAttribute('content') || '';
    const prevOgUrl = ogUrl?.getAttribute('href') || ogUrl?.getAttribute('content') || '';
    ogTitle?.setAttribute('content', PAGE_TITLE);
    ogDesc?.setAttribute('content', PAGE_DESC);
    ogUrl?.setAttribute('content', PAGE_URL);

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      metaDesc?.setAttribute('content', prevDesc || DEFAULT_DESC);
      if (prevCanonical) canonical?.setAttribute('href', prevCanonical);
      if (prevOgTitle) ogTitle?.setAttribute('content', prevOgTitle);
      if (prevOgDesc) ogDesc?.setAttribute('content', prevOgDesc);
      if (prevOgUrl) ogUrl?.setAttribute('content', prevOgUrl);
    };
  }, []);

  return (
    <article className="philosophy-page" id="cbse-sanskrit-guide-page" lang="en">
      <div className="philosophy-container">
        <header className="philosophy-hero">
          <div className="philosophy-hero-top">
            {onGoHome && (
              <button type="button" className="philosophy-crumb-btn" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenGrammar && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenGrammar}>
                व्याकरणम्
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenPhilosophy}>
                Darśana
              </button>
            )}
            {onOpenResources && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenResources}>
                Free Resources
              </button>
            )}
          </div>

          <span className="philosophy-kicker">CBSE · NCERT · Classes 7–10</span>
          <h1 className="philosophy-title">
            The Definitive Guide to CBSE NCERT Sanskrit Exams: Pattern, Strategy, and Terminology
            (Classes 7–10)
          </h1>
          <p className="philosophy-secondary">
            Exam blueprint, question terminology, Kim-family keywords, and exam-day strategy
          </p>
        </header>

        <section className="philosophy-section" aria-labelledby="guide-intro">
          <h2 id="guide-intro" className="visually-hidden" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Introduction
          </h2>
          <p>
            Sanskrit is widely regarded as one of the most structured, logical, and high-scoring
            subjects in the school curriculum. Because it operates on predictable, mathematical
            rules, achieving a perfect score is entirely realistic.
          </p>
          <p>
            This master guide consolidates everything you need to know about the exam pattern,
            question terminology, core keywords, and actionable preparation strategies as you
            progress from middle school through the Class 10 Board Examinations.
          </p>
        </section>

        <section className="philosophy-section" aria-labelledby="blueprint">
          <h2 id="blueprint">Section-by-Section Exam Blueprint</h2>
          <p>
            Whether you are in Class 7 or sitting for your Class 10 Board Exam (Subject Code 122),
            the Sanskrit question paper is uniformly organized into four distinct sections (
            <span lang="sa">खण्ड</span>).
          </p>
          <p>
            While middle school papers (Classes 7–8) may occasionally be scaled down by individual
            schools (e.g., to 60 marks over 2.5 hours), the official CBSE structure for High School
            (Classes 9–10) consists of an 80-mark theory paper spanning a 3-hour (180 minutes)
            duration, alongside a 20-mark internal assessment.
          </p>

          <div className="cbse-guide-table-wrap" role="region" aria-label="Section-by-section exam blueprint">
            <table className="cbse-guide-table">
              <thead>
                <tr>
                  <th scope="col">Section</th>
                  <th scope="col">Domain</th>
                  <th scope="col">Weightage (Class 10)</th>
                  <th scope="col">Target Time</th>
                  <th scope="col">Core Target &amp; Question Formats</th>
                </tr>
              </thead>
              <tbody>
                {BLUEPRINT_ROWS.map((row) => (
                  <tr key={row.section}>
                    <td lang="sa">{row.section}</td>
                    <td>
                      <span lang="sa">{row.domain.split(' (')[0]}</span>
                      {row.domain.includes(' (') ? ` (${row.domain.split(' (')[1]}` : ''}
                    </td>
                    <td>{row.weightage}</td>
                    <td>{row.time}</td>
                    <td>{row.formats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cbse-guide-note">
            <strong>Note:</strong> Always reserve the remaining 30 minutes of your exam slot
            exclusively for reviewing accent marks, formatting, and proofreading.
          </p>
        </section>

        <section className="philosophy-section" aria-labelledby="terminology">
          <h2 id="terminology">Deciphering Question Paper Terminology</h2>
          <p>
            Understanding exact Sanskrit instructions eliminates text translation confusion during
            high-pressure exam hours. Master this glossary of recurring directives:
          </p>
          <dl className="cbse-guide-dl">
            {TERMINOLOGY.map((item) => (
              <React.Fragment key={item.term}>
                <dt lang="sa">{item.term}</dt>
                <dd>{item.meaning}</dd>
              </React.Fragment>
            ))}
          </dl>
        </section>

        <section className="philosophy-section" aria-labelledby="kim-family">
          <h2 id="kim-family">Reference Keywords for Answering (The Kim Family)</h2>
          <p>
            When constructing answers or creating questions, you must learn to identify what
            interrogative pronouns are asking for. Most rely heavily on the Kim (What/Who) pronoun
            family:
          </p>
          <ul className="cbse-guide-keywords">
            {KIM_FAMILY.map((item) => (
              <li key={item.term}>
                <strong lang="sa">{item.term}</strong>
                {item.meaning}
              </li>
            ))}
          </ul>
        </section>

        <section className="philosophy-section" aria-labelledby="growth-path">
          <h2 id="growth-path">The Growth Path: How the Exam Evolves from Class 7 to 10</h2>
          <p>
            While the foundational blueprint (Sections A through D) remains entirely identical
            across all levels, the test formatting evolves as you progress:
          </p>

          <div className="philosophy-card">
            <h3>1. Paper Origin &amp; Scope</h3>
            <ul className="philosophy-steps">
              <li>
                <strong>Classes 7 &amp; 8:</strong> The assessment is school-managed. Papers are
                curated internally based on localized NCERT benchmarks. The syllabus is split into
                distinct terms (Half-Yearly and Annual components).
              </li>
              <li>
                <strong>Classes 9 &amp; 10:</strong> The assessment shifts to a Centralized CBSE Board
                framework. The Class 10 final exam is a cumulative review testing the entire academic
                year&apos;s text syllabus.
              </li>
            </ul>
          </div>

          <div className="philosophy-card">
            <h3>2. Conceptual Complexity</h3>
            <ul className="philosophy-steps">
              <li>
                <strong>Grammar Progression:</strong> Middle school focuses on basic verb tables
                (Dhatu Roop), standard noun declensions (Shabda Roop), and foundational vowel
                combinations. High school transitions heavily to advanced compound structures
                (Samas), complex prefixes and suffixes (Avyaya &amp; Pratyaya), and strict syntax
                corrections.
              </li>
              <li>
                <strong>Reading Tiers:</strong> Text patterns advance from basic 4–5 sentence
                narrative fables in Class 7 to complex, nuance-rich 100-word prose excerpts by Class
                10.
              </li>
            </ul>
          </div>
        </section>

        <section className="philosophy-section" aria-labelledby="strategy">
          <h2 id="strategy">High-Yield Strategic Pointers for Exam Day</h2>
          <ul className="philosophy-steps">
            <li>
              <strong>Invert the Order for Comprehension:</strong> Read the questions before reading
              the unseen passage. This anchors your attention to isolate the targeted sentences
              instantly upon your first scan of the text.
            </li>
            <li>
              <strong>Decode Before You Fill:</strong> For the Section B Letter Writing task, do not
              rush to plug words into blanks sequentially. Read the letter header and body
              completely first to determine the sender, recipient, and core context before pulling
              tokens from the Manjusha.
            </li>
            <li>
              <strong>Keep Picture Descriptions Crisp:</strong> When executing Chitra Varnanam,
              prioritize simplicity. Use predictable, grammatically clean phrases like{' '}
              <span lang="sa">“इदं चित्रं [Topic in Shasthi Vibhakti] अस्ति”</span> (This picture is
              of...) to bypass complex spelling or syntax risks.
            </li>
            <li>
              <strong>Master the Four Time-Anchors:</strong> For Samay-Lekhanam, secure an easy 4–5
              marks by verifying <span lang="sa">वादनम्</span> (o&apos;clock),{' '}
              <span lang="sa">सपाद</span> (quarter past), <span lang="sa">सार्ध</span> (half past),
              and <span lang="sa">पादोन</span> (quarter to). Always remember that a quarter-to
              configuration points forward (e.g., 4:45 must be written as{' '}
              <span lang="sa">पादोन-पञ्चवादनम्</span>, quarter to five).
            </li>
            <li>
              <strong>Audit for Visual Anchors:</strong> During your final 30-minute revision window,
              carefully review your script for missing Halant (<span lang="sa">्</span>) strokes and
              Visarga (<span lang="sa">ः</span>) dots. In a precise language like Sanskrit, omitting
              a single visual stroke can alter the grammatical case of a word completely.
            </li>
          </ul>
        </section>

        <section className="philosophy-cta" aria-labelledby="cbse-guide-cta-heading">
          <h2 id="cbse-guide-cta-heading">Begin Your 14-Day Free Trial</h2>
          <p>
            Build exam-ready Sanskrit skills with guided lessons, grammar tables, and practice —
            from middle school through Class 10 Board prep.
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
            {onOpenGrammar && (
              <button type="button" className="philosophy-cta-secondary" onClick={onOpenGrammar}>
                Explore व्याकरणम्
              </button>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};

export default CbseSanskritGuidePage;
