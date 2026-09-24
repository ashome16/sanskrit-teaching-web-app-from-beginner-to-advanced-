import React, { useState } from 'react';
import { playPronunciation } from '../utils/pronunciation';
import BodhiAvatar from './BodhiAvatar';
import '../styles/gunitaakshara.css';

export interface GunitaRow {
  svara: string;
  svaraDev: string;
  svaraIast: string;
  matraSign: string;
  matraDesc: string;
  baseLogic: string;
  resultDev: string;
  resultIast: string;
  soundGuide: string;
}

const BASE_CONSONANTS = [
  { dev: 'क्', bare: 'क', label: 'k (क्)' },
  { dev: 'ग्', bare: 'ग', label: 'g (ग्)' },
  { dev: 'च्', bare: 'च', label: 'c (च्)' },
  { dev: 'त्', bare: 'त', label: 't (त्)' },
  { dev: 'प्', bare: 'प', label: 'p (प्)' },
  { dev: 'म्', bare: 'म', label: 'm (म्)' },
  { dev: 'र्', bare: 'र', label: 'r (र्)' },
  { dev: 'ह्', bare: 'ह', label: 'h (ह्)' },
];

export const GUNITAKSHARA_ROWS_DATA = [
  {
    svaraDev: 'अ',
    svaraIast: 'a',
    matraSign: '—',
    matraDesc: '(None - removes Halanta)',
    soundGuide: "'u' as in cut",
    matraSuffix: '',
    matraCode: 'inherent',
  },
  {
    svaraDev: 'आ',
    svaraIast: 'ā',
    matraSign: 'ा',
    matraDesc: 'Vertical bar to the right',
    soundGuide: "'a' as in car",
    matraSuffix: 'ा',
    matraCode: 'aa',
  },
  {
    svaraDev: 'इ',
    svaraIast: 'i',
    matraSign: 'ि',
    matraDesc: 'Left hook over letter',
    soundGuide: "'i' as in kit",
    matraSuffix: 'ि',
    matraCode: 'i',
  },
  {
    svaraDev: 'ई',
    svaraIast: 'ī',
    matraSign: 'ी',
    matraDesc: 'Right hook over letter',
    soundGuide: "'ee' as in keep",
    matraSuffix: 'ी',
    matraCode: 'ii',
  },
  {
    svaraDev: 'उ',
    svaraIast: 'u',
    matraSign: 'ु',
    matraDesc: 'Left curve under letter',
    soundGuide: "'u' as in put",
    matraSuffix: 'ु',
    matraCode: 'u',
  },
  {
    svaraDev: 'ऊ',
    svaraIast: 'ū',
    matraSign: 'ू',
    matraDesc: 'Right loop under letter',
    soundGuide: "'oo' as in cool",
    matraSuffix: 'ू',
    matraCode: 'uu',
  },
  {
    svaraDev: 'ऋ',
    svaraIast: 'ṛ',
    matraSign: 'ृ',
    matraDesc: "Small 'c' hook under letter",
    soundGuide: "Vocalic 'r' sound (like 'ri' in rigid)",
    matraSuffix: 'ृ',
    matraCode: 'r',
  },
  {
    svaraDev: 'ॠ',
    svaraIast: 'ṝ',
    matraSign: 'ॄ',
    matraDesc: "Double 'c' hook under letter",
    soundGuide: "Elongated vocalic 'r' sound",
    matraSuffix: 'ॄ',
    matraCode: 'rr',
  },
  {
    svaraDev: 'ऌ',
    svaraIast: 'ḷ',
    matraSign: 'ॢ',
    matraDesc: 'Small sign under letter',
    soundGuide: "Vocalic 'l' sound (like 'l' in apple)",
    matraSuffix: 'ॢ',
    matraCode: 'l',
  },
  {
    svaraDev: 'ए',
    svaraIast: 'e',
    matraSign: 'े',
    matraDesc: 'Single diagonal stroke above',
    soundGuide: "'ay' as in pay",
    matraSuffix: 'े',
    matraCode: 'e',
  },
  {
    svaraDev: 'ऐ',
    svaraIast: 'ai',
    matraSign: 'ै',
    matraDesc: 'Double diagonal stroke above',
    soundGuide: "'ai' as in high / aisle",
    matraSuffix: 'ै',
    matraCode: 'ai',
  },
  {
    svaraDev: 'ओ',
    svaraIast: 'o',
    matraSign: 'ो',
    matraDesc: 'Bar with single stroke above',
    soundGuide: "'o' as in pole",
    matraSuffix: 'ो',
    matraCode: 'o',
  },
  {
    svaraDev: 'औ',
    svaraIast: 'au',
    matraSign: 'ौ',
    matraDesc: 'Bar with double stroke above',
    soundGuide: "'ow' as in cow",
    matraSuffix: 'ौ',
    matraCode: 'au',
  },
  {
    svaraDev: 'अं',
    svaraIast: 'aṁ',
    matraSign: 'ं',
    matraDesc: 'Anusvāra (dot above letter)',
    soundGuide: "Nasal sound ('am' or 'an')",
    matraSuffix: 'ं',
    matraCode: 'am',
  },
  {
    svaraDev: 'अः',
    svaraIast: 'aḥ',
    matraSign: 'ः',
    matraDesc: 'Visarga (double dots to the right)',
    soundGuide: "Soft breathy echo ('aha')",
    matraSuffix: 'ः',
    matraCode: 'ah',
  },
];

export const GunitaaksharaGuide: React.FC = () => {
  const [selectedConsonant, setSelectedConsonant] = useState(BASE_CONSONANTS[0]);

  const handleSpeak = (text: string) => {
    try {
      playPronunciation(text);
    } catch {}
  };

  // Build the combination letter for current consonant
  const getCombination = (item: typeof GUNITAKSHARA_ROWS_DATA[0]) => {
    const bare = selectedConsonant.bare; // e.g. क or र

    // Handle exceptions for 'र'
    if (bare === 'र') {
      if (item.matraCode === 'u') return 'रु';
      if (item.matraCode === 'uu') return 'रू';
    }
    // Handle exception for 'ह'
    if (bare === 'ह') {
      if (item.matraCode === 'r') return 'हृ';
    }

    if (item.matraCode === 'inherent') {
      return bare;
    }
    return bare + item.matraSuffix;
  };

  return (
    <section className="gunita-guide-container" aria-label="Sanskrit Gunitaakshara Guide">
      {/* Header and Core Definition */}
      <header className="gunita-header">
        <div className="gunita-badge">
          <span>🔤</span>
          <span>संस्कृत-लिपि-विज्ञानम् · Script Science</span>
        </div>
        <h2 className="gunita-main-title">
          Guṇitākṣarāṇi (गुणिताक्षराणि)
          <span className="gunita-main-sub">Combination Letters: Pure Consonants Merged with Vowels</span>
        </h2>
        <p className="gunita-definition">
          <strong>Guṇitākṣarāṇi (गुणिताक्षराणि)</strong> are the combination letters formed when a pure consonant
          (<em>Vyañjana</em>) merges with a vowel (<em>Svara</em>). In the Devanagari script used for Sanskrit,
          a pure consonant cannot be easily pronounced on its own and is marked with a slanting line underneath
          called a <strong>Halanta</strong> (e.g., <strong>क्, ख्, ग्</strong>).
        </p>
        <p className="gunita-definition">
          When you add a vowel to a consonant, the vowel loses its independent shape and transforms into a specific
          modifier graphic or symbol called a <strong>Mātrā (मात्रा)</strong>.
        </p>
      </header>

      {/* Bodhi Mascot Tip Box */}
      <aside className="gunita-bodhi-box">
        <div className="gunita-bodhi-avatar">
          <BodhiAvatar mood="scholar" size="sm" showHalo={false} />
        </div>
        <div className="gunita-bodhi-content">
          <h4 className="gunita-bodhi-title">Bodhi’s Phonetic Insight (बोधि-परामर्शः)</h4>
          <p className="gunita-bodhi-text">
            "Think of a pure consonant like a statue carved out of stone (क्). The vowel (अ, आ, इ...) is the breath of
            life that makes it sing! Notice how the Halanta disappears as soon as even the short vowel 'अ' arrives (क् + अ = क)."
          </p>
        </div>
      </aside>

      {/* Interactive Consonant Selector Bar */}
      <div className="gunita-selector-section">
        <div className="gunita-selector-label">
          <span>🎯 Choose a Root Consonant to Preview:</span>
        </div>
        <div className="gunita-consonant-chips" role="tablist">
          {BASE_CONSONANTS.map((c) => (
            <button
              key={c.dev}
              type="button"
              className={`gunita-chip-btn ${selectedConsonant.dev === c.dev ? 'active' : ''}`}
              onClick={() => setSelectedConsonant(c)}
              role="tab"
              aria-selected={selectedConsonant.dev === c.dev}
            >
              <span className="gunita-chip-dev">{c.dev}</span>
              <span className="gunita-chip-label">({c.bare})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Full Guṇitākṣara Symbols Guide Table */}
      <div className="gunita-table-wrap" role="region" aria-label="Sanskrit Guṇitākṣara Symbols Guide">
        <table className="gunita-table">
          <thead>
            <tr>
              <th scope="col">Svara (Vowel)</th>
              <th scope="col">Mātrā (Vowel Sign / Symbol)</th>
              <th scope="col">Combination Logic</th>
              <th scope="col">Guṇitākṣara (Result)</th>
              <th scope="col">Sound / Pronunciation Guide</th>
              <th scope="col">Listen</th>
            </tr>
          </thead>
          <tbody>
            {GUNITAKSHARA_ROWS_DATA.map((row) => {
              const combined = getCombination(row);
              const logicFormula = `${selectedConsonant.dev} + ${row.svaraDev}`;
              const isSpecial =
                (selectedConsonant.bare === 'र' && (row.matraCode === 'u' || row.matraCode === 'uu')) ||
                (selectedConsonant.bare === 'ह' && row.matraCode === 'r');

              return (
                <tr key={row.svaraDev} className={isSpecial ? 'gunita-row-special' : ''}>
                  <td className="gunita-cell-svara">
                    <strong className="gunita-svara-dev">{row.svaraDev}</strong>
                    <span className="gunita-svara-iast">({row.svaraIast})</span>
                  </td>
                  <td className="gunita-cell-matra">
                    <span className="gunita-matra-glyph">{row.matraSign}</span>
                    <span className="gunita-matra-desc">{row.matraDesc}</span>
                  </td>
                  <td className="gunita-cell-logic">
                    <code>{logicFormula}</code>
                  </td>
                  <td className="gunita-cell-result">
                    <span className="gunita-result-letter">{combined}</span>
                    {isSpecial && <span className="gunita-special-tag">Special Form</span>}
                  </td>
                  <td className="gunita-cell-sound">
                    <span className="gunita-sound-text">{row.soundGuide}</span>
                  </td>
                  <td className="gunita-cell-audio">
                    <button
                      type="button"
                      className="gunita-audio-btn"
                      onClick={() => handleSpeak(combined)}
                      title={`Listen to ${combined}`}
                      aria-label={`Pronounce ${combined}`}
                    >
                      🔊 {combined}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Special Formatting Exceptions Section */}
      <section className="gunita-exceptions-section" aria-labelledby="gunita-exceptions-heading">
        <h3 id="gunita-exceptions-heading" className="gunita-exceptions-title">
          ⚠️ Special Formatting Exceptions (विशेष-लिपि-नियमाः)
        </h3>
        <p className="gunita-exceptions-intro">
          While most consonants follow the uniform rules above, there are a few important script anomalies you will encounter in Sanskrit:
        </p>

        <div className="gunita-exceptions-grid">
          {/* Exception 1: Ra with u and uu */}
          <div className="gunita-exception-card">
            <div className="gunita-card-header">
              <span className="gunita-card-icon">🌀</span>
              <h4 className="gunita-card-title">The Letter र (ra) with 'u' or 'ū'</h4>
            </div>
            <p className="gunita-card-desc">
              Unlike other letters where the vowel goes underneath, the symbols for <strong>उ</strong> and <strong>ऊ</strong> attach
              directly to the <strong>middle-right side</strong> of <strong>र</strong>:
            </p>
            <div className="gunita-formula-box">
              <div className="gunita-formula-item">
                <span className="gunita-formula-calc">र् + उ = <strong>रु</strong></span>
                <span className="gunita-formula-style">(curved attach, no inner loop)</span>
                <button
                  type="button"
                  className="gunita-pill-audio"
                  onClick={() => handleSpeak('रु')}
                  title="Hear ru"
                >
                  🔊 रु (guruḥ, puruṣaḥ)
                </button>
              </div>
              <div className="gunita-formula-item">
                <span className="gunita-formula-calc">र् + ऊ = <strong>रू</strong></span>
                <span className="gunita-formula-style">(looped attach with solid horizontal stem)</span>
                <button
                  type="button"
                  className="gunita-pill-audio"
                  onClick={() => handleSpeak('रू')}
                  title="Hear rū"
                >
                  🔊 रू (rūpam)
                </button>
              </div>
            </div>
          </div>

          {/* Exception 2: Ha with r */}
          <div className="gunita-exception-card">
            <div className="gunita-card-header">
              <span className="gunita-card-icon">❤️</span>
              <h4 className="gunita-card-title">The Letter ह (ha) with 'ṛ'</h4>
            </div>
            <p className="gunita-card-desc">
              When <strong>ऋ</strong> combines with <strong>ह</strong>, the hook goes <strong>inside the stomach</strong> of the letter rather than below its base line:
            </p>
            <div className="gunita-formula-box">
              <div className="gunita-formula-item">
                <span className="gunita-formula-calc">ह् + ऋ = <strong>हृ</strong></span>
                <span className="gunita-formula-style">
                  (pronounced <em>hṛ</em>, as in the famous Sanskrit word <strong>हृदयम्</strong> — heart)
                </span>
                <button
                  type="button"
                  className="gunita-pill-audio"
                  onClick={() => handleSpeak('हृदयम्')}
                  title="Hear hṛdayam"
                >
                  🔊 हृ (हृदयम् · Heart)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default GunitaaksharaGuide;
