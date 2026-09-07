import React, { useState } from 'react';
import { VIBHAKTI_CASES } from '../data/vibhakti';
import '../styles/grammar.css';

type GrammarTopic = 'home' | 'vibhakti';

const Grammar: React.FC = () => {
  const [topic, setTopic] = useState<GrammarTopic>('home');
  const [selectedCase, setSelectedCase] = useState(1);

  if (topic === 'vibhakti') {
    return (
      <section className="grammar-page" aria-label="Vibhakti guide">
        <header className="grammar-page-header">
          <button type="button" className="grammar-back" onClick={() => setTopic('home')}>
            ← Grammar
          </button>
          <h2 className="grammar-title">विभक्ति · Vibhakti</h2>
          <p className="grammar-lead">The 7 noun cases at a glance — our first grammar brick.</p>
        </header>
        <ul className="grammar-vibhakti-list">
          {VIBHAKTI_CASES.map((item) => (
            <li
              key={item.number}
              className={`grammar-vibhakti-row${selectedCase === item.number ? ' selected' : ''}`}
              onClick={() => setSelectedCase(item.number)}
            >
              <span className="grammar-vibhakti-number">{item.number}</span>
              <div className="grammar-vibhakti-text">
                <span className="grammar-vibhakti-name">
                  {item.sanskrit} ({item.iast})
                </span>
                <span className="grammar-vibhakti-role">{item.role}</span>
                <span className="grammar-vibhakti-description">{item.description}</span>
              </div>
              {selectedCase === item.number && (
                <div className="grammar-vibhakti-example">
                  <strong>{item.form}</strong>
                  <span>{item.template}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="grammar-page" aria-label="Grammar">
      <header className="grammar-page-header">
        <h2 className="grammar-title">व्याकरणम् · Grammar</h2>
        <p className="grammar-lead">
          We build this shelf from the base. Start with Vibhakti; more bricks come later
          (sandhi, dhātu, etc.) without crowding Deepakam.
        </p>
      </header>
      <div className="grammar-shelf">
        <button type="button" className="grammar-card grammar-card--ready" onClick={() => setTopic('vibhakti')}>
          <span className="grammar-card-kicker">Ready</span>
          <span className="grammar-card-title">विभक्ति · Vibhakti</span>
          <span className="grammar-card-blurb">Seven noun cases — who does what to whom.</span>
        </button>
        <div className="grammar-card grammar-card--soon" aria-disabled="true">
          <span className="grammar-card-kicker">Later</span>
          <span className="grammar-card-title">सन्धि · Sandhi</span>
          <span className="grammar-card-blurb">How sounds join — coming when we grow this shelf.</span>
        </div>
        <div className="grammar-card grammar-card--soon" aria-disabled="true">
          <span className="grammar-card-kicker">Later</span>
          <span className="grammar-card-title">धातु · Verb roots</span>
          <span className="grammar-card-blurb">Action words — placeholder for the next brick.</span>
        </div>
      </div>
    </section>
  );
};

export default Grammar;
