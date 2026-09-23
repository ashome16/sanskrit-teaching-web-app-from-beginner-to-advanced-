import React, { useEffect, useState } from 'react';
import '../styles/philosophy.css';

export interface PhilosophyPageProps {
  onOpenRegister?: () => void;
  onOpenVedicMaths?: () => void;
  onGoHome?: () => void;
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
];

const DEFAULT_TITLE =
  'Online Sanskrit & Vedic Math Classes for Kids | EdNet Learn Gurukul';
const DEFAULT_DESC =
  'Unlock your child\'s potential with interactive Sanskrit and Vedic Math for kids. Start a 14-day free trial, then pay ₹200 once — no auto-debit.';

const PAGE_TITLE =
  'Our Philosophy · Darśana | Śūnyāt Anantam | EdNet Learn Gurukul';
const PAGE_DESC =
  'EdNet Learn Gurukul darśana: gaṇita as a living bhāṣā — from śūnya to ananta. Explore mathematics as inquiry, pattern, and ṛta. Begin a 14-day free trial.';

const PhilosophyPage: React.FC<PhilosophyPageProps> = ({
  onOpenRegister,
  onOpenVedicMaths,
  onGoHome,
}) => {
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = PAGE_TITLE;

    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content') || '';
    metaDesc?.setAttribute('content', PAGE_DESC);

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
      'https://ednetlearn.in/philosophy/sunyat-anantam-mandala.webp';
    ogTitle?.setAttribute('content', PAGE_TITLE);
    ogDesc?.setAttribute('content', PAGE_DESC);
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
  }, []);

  return (
    <article className="philosophy-page" id="philosophy-page" lang="en">
      <div className="philosophy-container">
        <header className="philosophy-hero">
          <div className="philosophy-hero-top">
            {onGoHome && (
              <button type="button" className="philosophy-crumb-btn" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenVedicMaths && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenVedicMaths}>
                वैदिक-गणितम्
              </button>
            )}
          </div>

          <span className="philosophy-kicker">Gurukul Darśana · दर्शन</span>
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
          </div>
        </section>

        <section className="philosophy-glossary" aria-labelledby="glossary-heading">
          <button
            type="button"
            className="philosophy-glossary-toggle"
            aria-expanded={glossaryOpen}
            onClick={() => setGlossaryOpen((v) => !v)}
          >
            <span id="glossary-heading">Word Key · Glossary</span>
            <span aria-hidden="true">{glossaryOpen ? '▾' : '▸'}</span>
          </button>
          {glossaryOpen && (
            <div className="philosophy-glossary-body">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Term</th>
                    <th scope="col">Meaning</th>
                  </tr>
                </thead>
                <tbody>
                  {GLOSSARY.map((row) => (
                    <tr key={row.term}>
                      <td lang="sa">
                        <em>{row.term}</em>
                      </td>
                      <td>{row.meaning}</td>
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
