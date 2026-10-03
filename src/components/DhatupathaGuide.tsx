import React from 'react';
import { GANA_HEADINGS, GANA_LABELS } from '../utils/dhatupatha';

const GANA_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/**
 * Short reading notes for the library. Collapsed so the toolbar and root list
 * stay where they are. Labels match the gaṇa headings and the Laṭ sentences.
 */
const DhatupathaGuide: React.FC = () => {
  return (
    <section className="dp-guide" aria-label="How to read the Dhātupāṭha">
      <details className="dp-guide-block">
        <summary>What is a धातु · dhātu?</summary>
        <p>
          A <strong>धातु · dhātu</strong> is a verbal root: the base of a verb, not a finished word.
          Each card is one root and the meaning already stored for it. Endings turn that root into
          a form you can use in a sentence.
        </p>
      </details>

      <details className="dp-guide-block">
        <summary>The ten गणाः · gaṇas</summary>
        <p>
          A <strong>गण · gaṇa</strong> is the class a root belongs to. The list uses these ten, in order:
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
          <strong>पद · pada</strong> says which set of endings the root takes, not who does the action.
          <strong> परस्मैपद · parasmaipada</strong> takes the परस्मैपद endings.
          <strong> आत्मनेपद · ātmanepada</strong> takes the आत्मनेपद endings.
          <strong> उभयपद · ubhayapada</strong> can take either set. The tag on the card tells you which.
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
      </details>
    </section>
  );
};

export default DhatupathaGuide;
