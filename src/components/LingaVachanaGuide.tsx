import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/linga-vachana.css';

interface LingaVachanaGuideProps {
  onOpenWorksheets?: () => void;
  onGoBack?: () => void;
}

type TabKey = 'matrix' | 'linga' | 'vachana' | 'pronouns' | 'verbs' | 'trainer';

interface GenderMatrixRow {
  base: string;
  englishBase: string;
  gender: 'पुंलिङ्गम् (Masculine)' | 'स्त्रीलिङ्गम् (Feminine)' | 'नपुंसकलिङ्गम् (Neuter)';
  genderKey: 'masc' | 'fem' | 'neut';
  singular: string;
  dual: string;
  plural: string;
  singularMeaning: string;
  dualMeaning: string;
  pluralMeaning: string;
}

const GENDER_MATRIX_ROWS: GenderMatrixRow[] = [
  // Masculine (-अकारान्त पुंलिङ्ग)
  {
    base: 'बालक (Boy)',
    englishBase: 'Boy',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'बालकः',
    dual: 'बालकौ',
    plural: 'बालकाः',
    singularMeaning: 'One boy',
    dualMeaning: 'Two boys',
    pluralMeaning: 'Many boys',
  },
  {
    base: 'अश्व (Horse)',
    englishBase: 'Horse',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'अश्वः',
    dual: 'अश्वौ',
    plural: 'अश्वाः',
    singularMeaning: 'One horse',
    dualMeaning: 'Two horses',
    pluralMeaning: 'Many horses',
  },
  {
    base: 'गज (Elephant)',
    englishBase: 'Elephant',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'गजः',
    dual: 'गजौ',
    plural: 'गजाः',
    singularMeaning: 'One elephant',
    dualMeaning: 'Two elephants',
    pluralMeaning: 'Many elephants',
  },
  {
    base: 'वानर (Monkey)',
    englishBase: 'Monkey',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'वानरः',
    dual: 'वानरौ',
    plural: 'वानराः',
    singularMeaning: 'One monkey',
    dualMeaning: 'Two monkeys',
    pluralMeaning: 'Many monkeys',
  },
  {
    base: 'देव (God / Deity)',
    englishBase: 'Deity',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'देवः',
    dual: 'देवौ',
    plural: 'देवाः',
    singularMeaning: 'One god',
    dualMeaning: 'Two gods',
    pluralMeaning: 'Many gods',
  },
  {
    base: 'मयूर (Peacock)',
    englishBase: 'Peacock',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'मयूरः',
    dual: 'मयूरौ',
    plural: 'मयूराः',
    singularMeaning: 'One peacock',
    dualMeaning: 'Two peacocks',
    pluralMeaning: 'Many peacocks',
  },
  {
    base: 'सिंह (Lion)',
    englishBase: 'Lion',
    gender: 'पुंलिङ्गम् (Masculine)',
    genderKey: 'masc',
    singular: 'सिंहः',
    dual: 'सिंहौ',
    plural: 'सिंहाः',
    singularMeaning: 'One lion',
    dualMeaning: 'Two lions',
    pluralMeaning: 'Many lions',
  },

  // Feminine (-आकारान्त स्त्रीलिङ्ग)
  {
    base: 'बालिका (Girl)',
    englishBase: 'Girl',
    gender: 'स्त्रीलिङ्गम् (Feminine)',
    genderKey: 'fem',
    singular: 'बालिका',
    dual: 'बालिके',
    plural: 'बालिकाः',
    singularMeaning: 'One girl',
    dualMeaning: 'Two girls',
    pluralMeaning: 'Many girls',
  },
  {
    base: 'लता (Creeper / Vine)',
    englishBase: 'Creeper',
    gender: 'स्त्रीलिङ्गम् (Feminine)',
    genderKey: 'fem',
    singular: 'लता',
    dual: 'लते',
    plural: 'लताः',
    singularMeaning: 'One creeper',
    dualMeaning: 'Two creepers',
    pluralMeaning: 'Many creepers',
  },
  {
    base: 'छात्रा (Female Student)',
    englishBase: 'Female Student',
    gender: 'स्त्रीलिङ्गम् (Feminine)',
    genderKey: 'fem',
    singular: 'छात्रा',
    dual: 'छात्रे',
    plural: 'छात्राः',
    singularMeaning: 'One female student',
    dualMeaning: 'Two female students',
    pluralMeaning: 'Many female students',
  },
  {
    base: 'मक्षिका (Fly / Housefly)',
    englishBase: 'Housefly',
    gender: 'स्त्रीलिङ्गम् (Feminine)',
    genderKey: 'fem',
    singular: 'मक्षिका',
    dual: 'मक्षिके',
    plural: 'मक्षिकाः',
    singularMeaning: 'One fly',
    dualMeaning: 'Two flies',
    pluralMeaning: 'Many flies',
  },
  {
    base: 'महिला (Woman)',
    englishBase: 'Woman',
    gender: 'स्त्रीलिङ्गम् (Feminine)',
    genderKey: 'fem',
    singular: 'महिला',
    dual: 'महिले',
    plural: 'महिलाः',
    singularMeaning: 'One woman',
    dualMeaning: 'Two women',
    pluralMeaning: 'Many women',
  },

  // Neuter (-अकारान्त नपुंसकलिङ्ग)
  {
    base: 'पुस्तक (Book)',
    englishBase: 'Book',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'पुस्तकम्',
    dual: 'पुस्तके',
    plural: 'पुस्तकानि',
    singularMeaning: 'One book',
    dualMeaning: 'Two books',
    pluralMeaning: 'Many books',
  },
  {
    base: 'फल (Fruit)',
    englishBase: 'Fruit',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'फलम्',
    dual: 'फले',
    plural: 'फलानि',
    singularMeaning: 'One fruit',
    dualMeaning: 'Two fruits',
    pluralMeaning: 'Many fruits',
  },
  {
    base: 'पुष्प (Flower)',
    englishBase: 'Flower',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'पुष्पम्',
    dual: 'पुष्पे',
    plural: 'पुष्पाणि',
    singularMeaning: 'One flower',
    dualMeaning: 'Two flowers',
    pluralMeaning: 'Many flowers',
  },
  {
    base: 'मित्र (Friend - Neuter)',
    englishBase: 'Friend',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'मित्रम्',
    dual: 'मित्रे',
    plural: 'मित्राणि',
    singularMeaning: 'One friend',
    dualMeaning: 'Two friends',
    pluralMeaning: 'Many friends',
  },
  {
    base: 'गृह (House)',
    englishBase: 'House',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'गृहम्',
    dual: 'गृहे',
    plural: 'गृहाणि',
    singularMeaning: 'One house',
    dualMeaning: 'Two houses',
    pluralMeaning: 'Many houses',
  },
  {
    base: 'चक्र (Wheel)',
    englishBase: 'Wheel',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'चक्रम्',
    dual: 'चक्रे',
    plural: 'चक्राणि',
    singularMeaning: 'One wheel',
    dualMeaning: 'Two wheels',
    pluralMeaning: 'Many wheels',
  },
  {
    base: 'पत्र (Leaf / Letter)',
    englishBase: 'Leaf',
    gender: 'नपुंसकलिङ्गम् (Neuter)',
    genderKey: 'neut',
    singular: 'पत्रम्',
    dual: 'पत्रे',
    plural: 'पत्राणि',
    singularMeaning: 'One leaf',
    dualMeaning: 'Two leaves',
    pluralMeaning: 'Many leaves',
  },
];

interface SpotErrorItem {
  id: number;
  incorrect: string;
  incorrectMeaning: string;
  correct: string;
  correctMeaning: string;
  ruleExplanation: string;
  subjectType: string;
}

const SPOT_ERROR_ITEMS: SpotErrorItem[] = [
  {
    id: 1,
    incorrect: 'चक्राणि भ्रमति।',
    incorrectMeaning: 'The wheels rotates (Grammar mismatch!)',
    correct: 'चक्राणि भ्रमन्ति।',
    correctMeaning: 'The wheels rotate.',
    ruleExplanation:
      'चक्राणि is Neuter Plural (बहुवचनम्). It requires the 3rd person plural verb ending -न्ति (भ्रमन्ति), not singular -ति.',
    subjectType: 'बहुवचनम् (Plural Subject)',
  },
  {
    id: 2,
    incorrect: 'अश्वौ धावन्ति।',
    incorrectMeaning: 'Two horses all run (Grammar mismatch!)',
    correct: 'अश्वौ धावतः।',
    correctMeaning: 'Two horses run.',
    ruleExplanation:
      'अश्वौ is Masculine Dual (द्विवचनम् - two horses). The verb must end in dual suffix -तः (धावतः), not plural -न्ति.',
    subjectType: 'द्विवचनम् (Dual Subject)',
  },
  {
    id: 3,
    incorrect: 'वयम् लिखामि।',
    incorrectMeaning: 'We all write alone (Grammar mismatch!)',
    correct: 'वयम् लिखामः।',
    correctMeaning: 'We all write.',
    ruleExplanation:
      'The First Person plural pronoun वयम् ("We all") requires the plural verbal suffix -ामः (लिखामः), while -आमि is strictly singular for अहम्.',
    subjectType: 'उत्तमपुरुषः बहुवचनम् (1st Person Plural)',
  },
  {
    id: 4,
    incorrect: 'पत्राणि पतति।',
    incorrectMeaning: 'Leaves falls (Grammar mismatch!)',
    correct: 'पत्राणि पतन्ति।',
    correctMeaning: 'The leaves fall.',
    ruleExplanation:
      'पत्राणि is Neuter Plural (Many leaves). The corresponding verb must take the plural ending -न्ति (पतन्ति).',
    subjectType: 'बहुवचनम् (Plural Subject)',
  },
  {
    id: 5,
    incorrect: 'बालिके हसन्ति।',
    incorrectMeaning: 'Two girls all laugh (Grammar mismatch!)',
    correct: 'बालिके हसतः।',
    correctMeaning: 'Two girls laugh.',
    ruleExplanation:
      'बालिके is Feminine Dual (द्विवचनम् - two girls). The action verb must take the dual marker -तः (हसतः).',
    subjectType: 'द्विवचनम् (Dual Subject)',
  },
  {
    id: 6,
    incorrect: 'सिंहः गर्जतः।',
    incorrectMeaning: 'One lion two roar (Grammar mismatch!)',
    correct: 'सिंहः गर्जति।',
    correctMeaning: 'The lion roars.',
    ruleExplanation:
      'सिंहः is Masculine Singular (एकवचनम् - one lion). It requires singular verb ending -ति (गर्जति).',
    subjectType: 'एकवचनम् (Singular Subject)',
  },
];

export const LingaVachanaGuide: React.FC<LingaVachanaGuideProps> = ({
  onOpenWorksheets,
  onGoBack,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('matrix');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<'all' | 'masc' | 'fem' | 'neut'>('all');
  const [revealedCorrections, setRevealedCorrections] = useState<Record<number, boolean>>({});

  const toggleCorrection = (id: number) => {
    setRevealedCorrections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMatrix =
    selectedGenderFilter === 'all'
      ? GENDER_MATRIX_ROWS
      : GENDER_MATRIX_ROWS.filter((r) => r.genderKey === selectedGenderFilter);

  return (
    <div className="linga-vachana-container" aria-label="Linga and Vachana Guide">
      {/* Header Banner */}
      <header className="lv-header">
        <div className="lv-header-badge">
          <span>⚖️</span>
          <span>संस्कृत-व्याकरण-मूलम् · Core Foundations</span>
        </div>
        <h1 className="lv-title">
          लिङ्गं वचनं च · Gender &amp; Number System
        </h1>
        <p className="lv-subtitle">
          Master the three genders (पुंलिङ्ग, स्त्रीलिङ्ग, नपुंसकलिङ्ग), the unique Sanskrit three-number system
          (एकवचन, द्विवचन, बहुवचन), pronoun mapping, and foolproof subject-verb agreement (कर्तृ-क्रिया-अन्वयः).
        </p>

        {/* Tab Navigation */}
        <nav className="lv-nav-tabs" aria-label="Grammar Tabs">
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'matrix' ? ' active' : ''}`}
            onClick={() => setActiveTab('matrix')}
          >
            📊 The Master Matrix
          </button>
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'linga' ? ' active' : ''}`}
            onClick={() => setActiveTab('linga')}
          >
            ⚧️ त्रयः लिङ्गाः (3 Genders)
          </button>
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'vachana' ? ' active' : ''}`}
            onClick={() => setActiveTab('vachana')}
          >
            🔢 त्रीणि वचनानि (3 Numbers)
          </button>
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'pronouns' ? ' active' : ''}`}
            onClick={() => setActiveTab('pronouns')}
          >
            👥 सर्वनाम-पदानि (Pronouns)
          </button>
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'verbs' ? ' active' : ''}`}
            onClick={() => setActiveTab('verbs')}
          >
            ⚡ क्रियापद-अन्वयः (Verb Concord)
          </button>
          <button
            type="button"
            className={`lv-tab-btn${activeTab === 'trainer' ? ' active' : ''}`}
            onClick={() => setActiveTab('trainer')}
          >
            🎯 दोष-निवारणम् (Spot Errors)
          </button>
        </nav>
      </header>

      {/* =========================================================================
          TAB 1: MASTER MATRIX (लिङ्ग-वचन-कोष्ठकम्)
          ========================================================================= */}
      {activeTab === 'matrix' && (
        <section className="lv-section" aria-label="Gender Number Matrix">
          <div className="lv-card-intro">
            <h2>📐 लिङ्ग-वचन-कोष्ठकम् (The Gender-Number Matrix)</h2>
            <p>
              In Sanskrit, every noun stem (प्रातिपदिकम्) changes its suffix predictably based on its
              <strong> Gender (लिङ्ग)</strong> and <strong> Number (वचन)</strong>. Study the mathematical pattern below:
            </p>

            <div className="lv-pattern-chips">
              <div className="lv-pattern-chip lv-pattern-chip--masc">
                <span className="lv-chip-tag">पुंलिङ्गम् (Masculine)</span>
                <strong>-अः (1) ➡️ -औ (2) ➡️ -आः (3+)</strong>
                <em>e.g. गजः ➡️ गजौ ➡️ गजाः</em>
              </div>
              <div className="lv-pattern-chip lv-pattern-chip--fem">
                <span className="lv-chip-tag">स्त्रीलिङ्गम् (Feminine)</span>
                <strong>-आ (1) ➡️ -ए (2) ➡️ -आः (3+)</strong>
                <em>e.g. लता ➡️ लते ➡️ लताः</em>
              </div>
              <div className="lv-pattern-chip lv-pattern-chip--neut">
                <span className="lv-chip-tag">नपुंसकलिङ्गम् (Neuter)</span>
                <strong>-अम् (1) ➡️ -ए (2) ➡️ -आनि (3+)</strong>
                <em>e.g. पत्रम् ➡️ पत्रे ➡️ पत्राणि</em>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="lv-filter-row">
              <span className="lv-filter-label">Filter Gender:</span>
              <button
                type="button"
                className={`lv-filter-pill${selectedGenderFilter === 'all' ? ' active' : ''}`}
                onClick={() => setSelectedGenderFilter('all')}
              >
                All Genders ({GENDER_MATRIX_ROWS.length})
              </button>
              <button
                type="button"
                className={`lv-filter-pill${selectedGenderFilter === 'masc' ? ' active' : ''}`}
                onClick={() => setSelectedGenderFilter('masc')}
              >
                ♂️ पुंलिङ्गम् (Masculine)
              </button>
              <button
                type="button"
                className={`lv-filter-pill${selectedGenderFilter === 'fem' ? ' active' : ''}`}
                onClick={() => setSelectedGenderFilter('fem')}
              >
                ♀️ स्त्रीलिङ्गम् (Feminine)
              </button>
              <button
                type="button"
                className={`lv-filter-pill${selectedGenderFilter === 'neut' ? ' active' : ''}`}
                onClick={() => setSelectedGenderFilter('neut')}
              >
                🍏 नपुंसकलिङ्गम् (Neuter)
              </button>
            </div>
          </div>

          {/* Responsive Table Grid */}
          <div className="lv-table-container">
            <table className="lv-table">
              <thead>
                <tr>
                  <th>प्रातिपदिकम् (Base Word)</th>
                  <th>लिङ्गम् (Gender)</th>
                  <th>एकवचनम् (Singular · 1)</th>
                  <th>द्विवचनम् (Dual · 2)</th>
                  <th>बहुवचनम् (Plural · 3+)</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatrix.map((row, idx) => (
                  <tr key={idx} className={`lv-row lv-row--${row.genderKey}`}>
                    <td className="lv-cell-base">
                      <strong>{row.base}</strong>
                      <span className="lv-cell-sub">Root: {row.englishBase}</span>
                    </td>
                    <td>
                      <span className={`lv-badge-gender lv-badge--${row.genderKey}`}>
                        {row.gender}
                      </span>
                    </td>
                    <td>
                      <div className="lv-cell-word-box">
                        <span className="lv-sanskrit-word">{row.singular}</span>
                        <span className="lv-english-gloss">{row.singularMeaning}</span>
                        <button
                          type="button"
                          className="lv-audio-btn"
                          title={`Listen to ${row.singular}`}
                          onClick={() => playPronunciation(row.singular)}
                        >
                          🔊
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="lv-cell-word-box">
                        <span className="lv-sanskrit-word">{row.dual}</span>
                        <span className="lv-english-gloss">{row.dualMeaning}</span>
                        <button
                          type="button"
                          className="lv-audio-btn"
                          title={`Listen to ${row.dual}`}
                          onClick={() => playPronunciation(row.dual)}
                        >
                          🔊
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="lv-cell-word-box">
                        <span className="lv-sanskrit-word">{row.plural}</span>
                        <span className="lv-english-gloss">{row.pluralMeaning}</span>
                        <button
                          type="button"
                          className="lv-audio-btn"
                          title={`Listen to ${row.plural}`}
                          onClick={() => playPronunciation(row.plural)}
                        >
                          🔊
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 2: TRIPLE GENDERS (त्रयः लिङ्गाः)
          ========================================================================= */}
      {activeTab === 'linga' && (
        <section className="lv-section" aria-label="Three Genders">
          <div className="lv-cards-triplet">
            {/* Masculine Card */}
            <article className="lv-feature-card lv-card--masc">
              <div className="lv-card-head">
                <span className="lv-card-icon">🧑</span>
                <div>
                  <h3>पुंलिङ्गम् (Masculine Gender)</h3>
                  <span className="lv-card-ending-tag">Primary marker: ends in <strong>-अः (-aḥ)</strong></span>
                </div>
              </div>
              <p className="lv-card-text">
                Nouns representing male living beings or grammatically masculine items generally end with a
                visarga <code>-अः</code> in the singular nominative case.
              </p>
              <div className="lv-card-examples">
                <h4>Core Examples:</h4>
                <ul>
                  <li>
                    <strong>बालकः</strong> (Bālakaḥ) — One boy
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('बालकः')}>🔊</button>
                  </li>
                  <li>
                    <strong>गजः</strong> (Gajaḥ) — One elephant
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('गजः')}>🔊</button>
                  </li>
                  <li>
                    <strong>अश्वः</strong> (Aśvaḥ) — One horse
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('अश्वः')}>🔊</button>
                  </li>
                  <li>
                    <strong>मयूरः</strong> (Mayūraḥ) — One peacock
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('मयूरः')}>🔊</button>
                  </li>
                  <li>
                    <strong>सिंहः</strong> (Siṁhaḥ) — One lion
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('सिंहः')}>🔊</button>
                  </li>
                </ul>
              </div>
              <div className="lv-card-footer-tip">
                💡 <em>Rule: In dual, replace <code>-अः</code> with <code>-औ</code> (गजौ). In plural, replace with <code>-आः</code> (गजाः).</em>
              </div>
            </article>

            {/* Feminine Card */}
            <article className="lv-feature-card lv-card--fem">
              <div className="lv-card-head">
                <span className="lv-card-icon">👩</span>
                <div>
                  <h3>स्त्रीलिङ्गम् (Feminine Gender)</h3>
                  <span className="lv-card-ending-tag">Primary marker: ends in <strong>-आ (-ā)</strong> or <strong>-ई (-ī)</strong></span>
                </div>
              </div>
              <p className="lv-card-text">
                Nouns representing female living beings, delicate entities, or feminine concepts typically end in
                the elongated vowel <code>-आ</code> (आकारान्त) or <code>-ई</code> (ईकारान्त) without a visarga in singular nominative.
              </p>
              <div className="lv-card-examples">
                <h4>Core Examples:</h4>
                <ul>
                  <li>
                    <strong>बालिका</strong> (Bālikā) — One girl
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('बालिका')}>🔊</button>
                  </li>
                  <li>
                    <strong>लता</strong> (Latā) — One creeper / vine
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('लता')}>🔊</button>
                  </li>
                  <li>
                    <strong>छात्रा</strong> (Chātrā) — One female student
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('छात्रा')}>🔊</button>
                  </li>
                  <li>
                    <strong>मक्षिका</strong> (Makṣikā) — One housefly
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('मक्षिका')}>🔊</button>
                  </li>
                  <li>
                    <strong>महिला</strong> (Mahilā) — One woman
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('महिला')}>🔊</button>
                  </li>
                </ul>
              </div>
              <div className="lv-card-footer-tip">
                💡 <em>Rule: In dual, replace <code>-आ</code> with <code>-ए</code> (लते). In plural, add visarga <code>-आः</code> (लताः).</em>
              </div>
            </article>

            {/* Neuter Card */}
            <article className="lv-feature-card lv-card--neut">
              <div className="lv-card-head">
                <span className="lv-card-icon">🍏</span>
                <div>
                  <h3>नपुंसकलिङ्गम् (Neuter Gender)</h3>
                  <span className="lv-card-ending-tag">Primary marker: ends in <strong>-अम् (-am)</strong></span>
                </div>
              </div>
              <p className="lv-card-text">
                Inanimate objects, inanimate nature, flowers, fruits, and abstract concepts often fall into the
                neuter gender, taking an anusvāra or halanta-makāra <code>-अम्</code> in the singular.
              </p>
              <div className="lv-card-examples">
                <h4>Core Examples:</h4>
                <ul>
                  <li>
                    <strong>पुस्तकम्</strong> (Pustakam) — One book
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('पुस्तकम्')}>🔊</button>
                  </li>
                  <li>
                    <strong>फलम्</strong> (Phalam) — One fruit
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('फलम्')}>🔊</button>
                  </li>
                  <li>
                    <strong>पुष्पम्</strong> (Puṣpam) — One flower
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('पुष्पम्')}>🔊</button>
                  </li>
                  <li>
                    <strong>मित्रम्</strong> (Mitram) — One friend (Neuter concept)
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('मित्रम्')}>🔊</button>
                  </li>
                  <li>
                    <strong>चक्रम्</strong> (Cakram) — One wheel
                    <button type="button" className="lv-audio-btn-mini" onClick={() => playPronunciation('चक्रम्')}>🔊</button>
                  </li>
                </ul>
              </div>
              <div className="lv-card-footer-tip">
                💡 <em>Rule: In dual, replace <code>-अम्</code> with <code>-ए</code> (फले). In plural, replace with <code>-आनि</code> (फलानि).</em>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 3: TRIPLE NUMBERS (त्रीणि वचनानि)
          ========================================================================= */}
      {activeTab === 'vachana' && (
        <section className="lv-section" aria-label="Three Numbers">
          <div className="lv-vachana-spotlight">
            <h2>The Secret Genius of Sanskrit Numbers (वचनानि)</h2>
            <p className="lv-lead">
              While English and Hindi recognize only two numbers — Singular (1) and Plural (2 or more) —
              <strong> Sanskrit has THREE distinct numbers</strong>:
            </p>

            <div className="lv-vachana-grid">
              <div className="lv-vachana-card">
                <span className="lv-vachana-badge">1</span>
                <h3>एकवचनम् (Singular)</h3>
                <span className="lv-vachana-count">Count: Exactly One (१)</span>
                <p>Represents a single person, animal, or object.</p>
                <div className="lv-example-box">
                  <div><strong>अश्वः</strong> = 1 Horse</div>
                  <div><strong>बालिका</strong> = 1 Girl</div>
                  <div><strong>फलम्</strong> = 1 Fruit</div>
                </div>
              </div>

              <div className="lv-vachana-card lv-vachana-card--highlight">
                <span className="lv-vachana-badge">2</span>
                <h3>द्विवचनम् (Dual) 🌟</h3>
                <span className="lv-vachana-count">Count: Exactly Two (२)</span>
                <p>
                  Special dual form! Sanskrit doesn't say "two boys went"; the noun itself transforms to signify
                  natural pairs (eyes, ears, hands, couples, twins).
                </p>
                <div className="lv-example-box">
                  <div><strong>अश्वौ</strong> = 2 Horses</div>
                  <div><strong>बालिके</strong> = 2 Girls</div>
                  <div><strong>फले</strong> = 2 Fruits</div>
                </div>
              </div>

              <div className="lv-vachana-card">
                <span className="lv-vachana-badge">3+</span>
                <h3>बहुवचनम् (Plural)</h3>
                <span className="lv-vachana-count">Count: Three or More (३+)</span>
                <p>Used strictly when counting three or more entities.</p>
                <div className="lv-example-box">
                  <div><strong>अश्वाः</strong> = 3+ Horses</div>
                  <div><strong>बालिकाः</strong> = 3+ Girls</div>
                  <div><strong>फलानि</strong> = 3+ Fruits</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 4: PRONOUNS (सर्वनाम-पदानि)
          ========================================================================= */}
      {activeTab === 'pronouns' && (
        <section className="lv-section" aria-label="Pronouns Matrix">
          <div className="lv-card-intro">
            <h2>👥 सर्वनाम-पदानि (Sanskrit Pronouns by Gender &amp; Number)</h2>
            <p>
              Third-person pronouns change with Gender (He / She / It), while First Person ("I / We") and
              Second Person ("You") are gender-neutral universal pronouns:
            </p>
          </div>

          <div className="lv-pronoun-tables">
            {/* Third Person */}
            <div className="lv-pronoun-block">
              <h3>१. प्रथमपुरुषः (Third Person · "He / She / It / They")</h3>
              <table className="lv-table">
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>एकवचनम् (1)</th>
                    <th>द्विवचनम् (2)</th>
                    <th>बहुवचनम् (3+)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>पुंलिङ्गम् (Masc)</strong></td>
                    <td>
                      <span className="lv-sanskrit-word">सः</span> (Saha)
                      <span className="lv-english-gloss">He</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">तौ</span> (Tau)
                      <span className="lv-english-gloss">They two (M)</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">ते</span> (Te)
                      <span className="lv-english-gloss">They all (M)</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>स्त्रीलिङ्गम् (Fem)</strong></td>
                    <td>
                      <span className="lv-sanskrit-word">सा</span> (Sā)
                      <span className="lv-english-gloss">She</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">ते</span> (Te)
                      <span className="lv-english-gloss">They two (F)</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">ताः</span> (Tāḥ)
                      <span className="lv-english-gloss">They all (F)</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>नपुंसकलिङ्गम् (Neut)</strong></td>
                    <td>
                      <span className="lv-sanskrit-word">तत्</span> (Tat)
                      <span className="lv-english-gloss">That / It</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">ते</span> (Te)
                      <span className="lv-english-gloss">Those two (N)</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">तानि</span> (Tāni)
                      <span className="lv-english-gloss">Those all (N)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Second & First Person */}
            <div className="lv-pronoun-block">
              <h3>२. मध्यमपुरुषः एवं उत्तमपुरुषः (Universal Pronouns)</h3>
              <table className="lv-table">
                <thead>
                  <tr>
                    <th>Person</th>
                    <th>एकवचनम् (1)</th>
                    <th>द्विवचनम् (2)</th>
                    <th>बहुवचनम् (3+)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>मध्यमपुरुषः (2nd Person · You)</strong></td>
                    <td>
                      <span className="lv-sanskrit-word">त्वम्</span> (Tvam)
                      <span className="lv-english-gloss">You alone</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">युवाम्</span> (Yuvām)
                      <span className="lv-english-gloss">You two</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">यूयम्</span> (Yūyam)
                      <span className="lv-english-gloss">You all</span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>उत्तमपुरुषः (1st Person · I / We)</strong></td>
                    <td>
                      <span className="lv-sanskrit-word">अहम्</span> (Aham)
                      <span className="lv-english-gloss">I</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">आवाम्</span> (Āvām)
                      <span className="lv-english-gloss">We two</span>
                    </td>
                    <td>
                      <span className="lv-sanskrit-word">वयम्</span> (Vayam)
                      <span className="lv-english-gloss">We all</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 5: VERB CONCORD (क्रियापद-अन्वयः)
          ========================================================================= */}
      {activeTab === 'verbs' && (
        <section className="lv-section" aria-label="Verb Agreement">
          <div className="lv-card-intro">
            <h2>⚡ कर्तृ-क्रिया-अन्वयः (Subject-Verb Agreement Matrix)</h2>
            <p>
              In Sanskrit, the verb ending (प्रत्यय) must strictly agree with the subject's
              <strong> Person (पुरुषः)</strong> and <strong> Number (वचनम्)</strong>:
            </p>
          </div>

          <div className="lv-verbs-matrix">
            <table className="lv-table">
              <thead>
                <tr>
                  <th>पुरुषः (Person)</th>
                  <th>एकवचनम् (Singular)</th>
                  <th>द्विवचनम् (Dual)</th>
                  <th>बहुवचनम् (Plural)</th>
                  <th>Matching Suffix Pattern</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>प्रथमपुरुषः (3rd Person)</strong>
                    <span className="lv-cell-sub">He / She / It / Names</span>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">पठति</span>
                      <span className="lv-english-gloss">reads (He/She)</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">पठतः</span>
                      <span className="lv-english-gloss">two read</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">पठन्ति</span>
                      <span className="lv-english-gloss">all read</span>
                    </div>
                  </td>
                  <td>
                    <code className="lv-code-badge">-ति | -तः | -न्ति</code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>मध्यमपुरुषः (2nd Person)</strong>
                    <span className="lv-cell-sub">You (त्वम् / युवाम् / यूयम्)</span>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">धावसि</span>
                      <span className="lv-english-gloss">You run</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">धावथः</span>
                      <span className="lv-english-gloss">You two run</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">धावथ</span>
                      <span className="lv-english-gloss">You all run</span>
                    </div>
                  </td>
                  <td>
                    <code className="lv-code-badge">-सि | -थः | -थ</code>
                  </td>
                </tr>

                <tr>
                  <td>
                    <strong>उत्तमपुरुषः (1st Person)</strong>
                    <span className="lv-cell-sub">I / We (अहम् / आवाम् / वयम्)</span>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">लिखामि</span>
                      <span className="lv-english-gloss">I write</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">लिखावः</span>
                      <span className="lv-english-gloss">We two write</span>
                    </div>
                  </td>
                  <td>
                    <div className="lv-cell-word-box">
                      <span className="lv-sanskrit-word">लिखामः</span>
                      <span className="lv-english-gloss">We all write</span>
                    </div>
                  </td>
                  <td>
                    <code className="lv-code-badge">-आमि | -आवः | -आमः</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Quick Interrogative Words Box */}
          <div className="lv-question-words-box">
            <h3>❓ प्रश्नवाचक-शब्दाः (Essential Interrogative Words)</h3>
            <div className="lv-qwords-grid">
              <div className="lv-qword-card">
                <strong>किम् (Kim)</strong>
                <span>What / Who (Neuter)</span>
              </div>
              <div className="lv-qword-card">
                <strong>कुत्र (Kutra)</strong>
                <span>Where</span>
              </div>
              <div className="lv-qword-card">
                <strong>कदा (Kadā)</strong>
                <span>When</span>
              </div>
              <div className="lv-qword-card">
                <strong>कथम् (Katham)</strong>
                <span>How</span>
              </div>
              <div className="lv-qword-card">
                <strong>कुतः (Kutaḥ)</strong>
                <span>Where from</span>
              </div>
              <div className="lv-qword-card">
                <strong>किमर्थम् (Kimartham)</strong>
                <span>Why / For what</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          TAB 6: SPOT THE ERROR INTERACTIVE TRAINER (दोष-निवारणम्)
          ========================================================================= */}
      {activeTab === 'trainer' && (
        <section className="lv-section" aria-label="Spot the Grammar Error">
          <div className="lv-card-intro">
            <h2>🎯 दोष-निवारणम् (Spot &amp; Correct the Grammar Error)</h2>
            <p>
              Each sentence below contains a deliberate mismatch between the Subject (Noun/Pronoun) and the Verb.
              Test your grammar instincts, then click "Reveal Correction &amp; Rule" to verify!
            </p>
          </div>

          <div className="lv-trainer-grid">
            {SPOT_ERROR_ITEMS.map((item) => {
              const isRevealed = !!revealedCorrections[item.id];
              return (
                <div key={item.id} className="lv-trainer-card">
                  <div className="lv-trainer-head">
                    <span className="lv-trainer-num">Problem #{item.id}</span>
                    <span className="lv-trainer-type">{item.subjectType}</span>
                  </div>

                  <div className="lv-incorrect-box">
                    <span className="lv-x-icon">❌</span>
                    <div>
                      <div className="lv-incorrect-sanskrit">{item.incorrect}</div>
                      <div className="lv-incorrect-sub">{item.incorrectMeaning}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="lv-btn-reveal"
                    onClick={() => toggleCorrection(item.id)}
                  >
                    {isRevealed ? 'Hide Explanation ▴' : 'Reveal Correct Sentence & Rule ▾'}
                  </button>

                  {isRevealed && (
                    <div className="lv-correct-box">
                      <div className="lv-correct-head">
                        <span className="lv-check-icon">✅</span>
                        <div>
                          <strong className="lv-correct-sanskrit">{item.correct}</strong>
                          <span className="lv-correct-meaning">({item.correctMeaning})</span>
                        </div>
                      </div>
                      <p className="lv-correct-rule">
                        <strong>व्याकरण-नियमः (Grammar Rule):</strong> {item.ruleExplanation}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Footer Banner with CTA to Worksheets */}
      <footer className="lv-footer-cta">
        <div className="lv-footer-left">
          <h3>Ready to test yourself with printable worksheets?</h3>
          <p>
            We have prepared 5 dedicated, printable Sanskrit Grammar worksheets covering Gender matrices,
            Number variations, Interrogatives, and Subject-Verb agreement.
          </p>
        </div>
        <div className="lv-footer-right">
          {onOpenWorksheets && (
            <button
              type="button"
              className="lv-btn-cta"
              onClick={onOpenWorksheets}
            >
              📑 Open Grammar Worksheets ▶
            </button>
          )}
          {onGoBack && (
            <button
              type="button"
              className="lv-btn-secondary"
              onClick={onGoBack}
            >
              ← Back to Grammar Shelf
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default LingaVachanaGuide;
