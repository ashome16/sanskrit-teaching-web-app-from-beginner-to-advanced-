import React from 'react';
import { GANA_HEADINGS, GANA_LABELS } from '../utils/dhatupatha';

const GANA_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/** Usual class sign only — not a full Pāṇini lesson. */
const VIKARANA: Record<number, string> = {
  1: 'usual class sign: शप् · śap (a)',
  2: 'usual class sign: none (लुक् · luk)',
  3: 'usual class sign: reduplication · द्वित्वम्',
  4: 'usual class sign: श्यन् · śyan (ya)',
  5: 'usual class sign: श्नु · śnu (nu)',
  6: 'usual class sign: श · śa (a, weak)',
  7: 'usual class sign: श्नम् · śnam (na infix)',
  8: 'usual class sign: उ · u',
  9: 'usual class sign: श्ना · śnā (nā)',
  10: 'usual class sign: णिच् · ṇic (aya)',
};

const EXAMPLE_ROOTS = [
  { id: 'bhu', root: 'भू', line: '→ भवति — He/She/It is, becomes (होना).' },
  {
    id: 'gam',
    root: 'गम्',
    line: '→ गच्छति — He/She/It goes (जाना). In the present the stem is an आदेश · ādeśa: गम् is replaced by गच्छ.',
  },
  { id: 'path', root: 'पठ्', line: '→ पठति — He/She/It reads, studies (पढ़ना).' },
  {
    id: 'drsh',
    root: 'दृश्',
    line: '→ पश्यति — He/She/It sees (देखना). Present ādeśa: दृश् is replaced by पश्य.',
  },
  { id: 'vad', root: 'वद्', line: '→ वदति — He/She/It speaks (बोलना).' },
] as const;

type DhatupathaGuideProps = {
  onOpenRoot?: (id: string) => void;
};

/**
 * Short reading notes for the library. Collapsed so the toolbar and root list
 * stay where they are. Gaṇa labels, seṭ/aniṭ tags, Hindi, and the English
 * sentences are the ones already stored for these roots.
 */
const DhatupathaGuide: React.FC<DhatupathaGuideProps> = ({ onOpenRoot }) => {
  return (
    <section className="dp-guide" aria-label="How to read the Dhātupāṭha">
      <details className="dp-guide-block">
        <summary>What is a धातु · dhātu?</summary>
        <p>
          A <strong>धातु · dhātu</strong> is a verbal root: an action or a state, not a finished word.
          <strong> पठ्</strong> means “to read, to study” (पढ़ना). Endings turn that root into a form
          such as पठति.
        </p>
        <p>
          When the library has marked it, the card tag says <strong>set</strong> or <strong>anit</strong>{' '}
          (a few say <strong>vet</strong>). <strong>सेट् · seṭ</strong> takes an इ before some endings;{' '}
          <strong>अनिट् · aniṭ</strong> does not. Here the library marks पठ् as set, and भू, गम्, दृश्, and वद् as anit.
        </p>
      </details>

      <details className="dp-guide-block">
        <summary>The ten गणाः · gaṇas</summary>
        <p>
          A <strong>गण · gaṇa</strong> is the class a root belongs to. The name is the lead root plus आदि
          “and the rest”: <strong>bhvādi</strong> is भू and the roots grouped with it. Each class adds a{' '}
          <strong>विकरण · vikaraṇa</strong>, a class sign, before the personal ending. The classical list is
          much larger than the roots on this page. These ten are the ones used here:
        </p>
        <ol className="dp-guide-ganas">
          {GANA_ORDER.map((n) => (
            <li key={n}>
              <span className="dp-guide-sa">{GANA_HEADINGS[n].san}</span>
              {' · '}
              {GANA_LABELS[n]}
              {' — '}
              {GANA_HEADINGS[n].en}
              <span className="dp-guide-vik">{VIKARANA[n]}</span>
            </li>
          ))}
        </ol>
      </details>

      <details className="dp-guide-block">
        <summary>पद · pada</summary>
        <p>
          On this page, <strong>पद · pada</strong> means which set of endings the root takes.
          <strong> परस्मैपद · parasmaipada</strong> uses endings such as <strong>-ति</strong> (-ti),{' '}
          <strong>-तः</strong> (-taḥ), and <strong>-अन्ति</strong> (-anti): प्रथम पुरुष एकवचन, द्विवचन, and बहुवचन.
          <strong> आत्मनेपद · ātmanepada</strong> uses the other set, such as -ते.
          <strong> उभयपद · ubhayapada</strong> can take either set.
          Traditionally, parasmaipada is glossed “for another’s benefit,” but that is not a hard rule here;
          the tag only names the ending set.
        </p>
      </details>

      <details className="dp-guide-block">
        <summary>How to read one form</summary>
        <p>
          Open a root to see its present table (<strong>लट्</strong>). The row is{' '}
          <strong>पुरुष · puruṣa</strong> (person): प्रथम पुरुष is 3rd, मध्यम पुरुष is 2nd, उत्तम पुरुष is 1st.
          The column is <strong>वचन · vacana</strong> (number): एकवचन singular, द्विवचन dual, बहुवचन plural.
          The English under the form matches that cell: 3rd person is “He/She/It”, “They two”, “They all”;
          2nd person is “You (one)” or “You (singular)”, “You two”, “You all”; 1st person is “I”, “We two”, “We all”.
        </p>
        <ul className="dp-guide-ganas">
          {EXAMPLE_ROOTS.map((example) => (
            <li key={example.id}>
              <button
                type="button"
                className="dp-guide-root"
                onClick={() => onOpenRoot?.(example.id)}
              >
                {example.root}
              </button>{' '}
              {example.line}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
};

export default DhatupathaGuide;
