import React from 'react';
import { GANA_HEADINGS, GANA_LABELS } from '../utils/dhatupatha';

const GANA_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/**
 * Short reading notes for the library. Collapsed so the toolbar and root list
 * stay where they are. Gaṇa labels, seṭ/aniṭ tags, Hindi, and the English
 * sentences are the ones already stored for these roots.
 */
const DhatupathaGuide: React.FC = () => {
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
          <li>भू → भवति — He/She/It is, becomes (होना).</li>
          <li>
            गम् → गच्छति — He/She/It goes (जाना). In the present the stem is an <strong>आदेश · ādeśa</strong>:
            गम् is replaced by गच्छ.
          </li>
          <li>पठ् → पठति — He/She/It reads, studies (पढ़ना).</li>
          <li>
            दृश् → पश्यति — He/She/It sees (देखना). Present ādeśa: दृश् is replaced by पश्य.
          </li>
          <li>वद् → वदति — He/She/It speaks (बोलना).</li>
        </ul>
      </details>
    </section>
  );
};

export default DhatupathaGuide;
