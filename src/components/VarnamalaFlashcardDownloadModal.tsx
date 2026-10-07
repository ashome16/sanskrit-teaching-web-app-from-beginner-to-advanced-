import React, { useState } from 'react';
import '../styles/varnamala-flashcards.css';

interface VarnamalaFlashcardDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'varnamala' | 'barakhadi' | 'chart';
}

interface LetterCard {
  dev: string;
  iast: string;
  category: string;
  sthana: string;
  example: string;
  type: 'vowel' | 'cons' | 'conjunct';
}

const VARNAMALA_LETTERS: LetterCard[] = [
  // Vowels (Svara)
  { dev: 'अ', iast: 'a', category: 'ह्रस्व-स्वरः (Short Vowel)', sthana: 'कण्ठ्य (Throat / Velar)', example: 'अश्वः (Horse)', type: 'vowel' },
  { dev: 'आ', iast: 'ā', category: 'दीर्घ-स्वरः (Long Vowel)', sthana: 'कण्ठ्य (Throat / Velar)', example: 'आम्रम् (Mango)', type: 'vowel' },
  { dev: 'इ', iast: 'i', category: 'ह्रस्व-स्वरः (Short Vowel)', sthana: 'तालव्य (Palatal)', example: 'इक्षुः (Sugarcane)', type: 'vowel' },
  { dev: 'ई', iast: 'ī', category: 'दीर्घ-स्वरः (Long Vowel)', sthana: 'तालव्य (Palatal)', example: 'ईश्वरः (Lord)', type: 'vowel' },
  { dev: 'उ', iast: 'u', category: 'ह्रस्व-स्वरः (Short Vowel)', sthana: 'ओष्ठ्य (Labial)', example: 'उष्ट्रः (Camel)', type: 'vowel' },
  { dev: 'ऊ', iast: 'ū', category: 'दीर्घ-स्वरः (Long Vowel)', sthana: 'ओष्ठ्य (Labial)', example: 'ऊर्णा (Wool)', type: 'vowel' },
  { dev: 'ऋ', iast: 'ṛ', category: 'ह्रस्व-स्वरः (Short Vowel)', sthana: 'मूर्धन्य (Retroflex)', example: 'ऋषिः (Sage)', type: 'vowel' },
  { dev: 'ॠ', iast: 'ṝ', category: 'दीर्घ-स्वरः (Long Vowel)', sthana: 'मूर्धन्य (Retroflex)', example: 'ॠकारः (Vocalic R)', type: 'vowel' },
  { dev: 'ऌ', iast: 'ḷ', category: 'ह्रस्व-स्वरः (Short Vowel)', sthana: 'दन्त्य (Dental)', example: 'ऌकारः (Vocalic L)', type: 'vowel' },
  { dev: 'ए', iast: 'e', category: 'संयुक्त-स्वरः (Diphthong)', sthana: 'कण्ठतालव्य (Palato-velar)', example: 'एकम् (One)', type: 'vowel' },
  { dev: 'ऐ', iast: 'ai', category: 'संयुक्त-स्वरः (Diphthong)', sthana: 'कण्ठतालव्य (Palato-velar)', example: 'ऐरावतः (Airavata)', type: 'vowel' },
  { dev: 'ओ', iast: 'o', category: 'संयुक्त-स्वरः (Diphthong)', sthana: 'कण्ठोष्ठ्य (Labio-velar)', example: 'ओष्ठः (Lip)', type: 'vowel' },
  { dev: 'औ', iast: 'au', category: 'संयुक्त-स्वरः (Diphthong)', sthana: 'कण्ठोष्ठ्य (Labio-velar)', example: 'औषधम् (Medicine)', type: 'vowel' },
  { dev: 'अं', iast: 'aṃ', category: 'अनुस्वारः (Modifier)', sthana: 'नासिक्य (Nasal resonance)', example: 'अंशः (Part)', type: 'vowel' },
  { dev: 'अः', iast: 'aḥ', category: 'विसर्गः (Modifier)', sthana: 'कण्ठ्य (Throat echo)', example: 'रामः (Rama)', type: 'vowel' },

  // Ka-varga (कवर्ग)
  { dev: 'क', iast: 'ka', category: 'कवर्ग (अल्पप्राण / अघोष)', sthana: 'कण्ठ्य (Velar)', example: 'कमलम् (Lotus)', type: 'cons' },
  { dev: 'ख', iast: 'kha', category: 'कवर्ग (महाप्राण / अघोष)', sthana: 'कण्ठ्य (Velar)', example: 'खगः (Bird)', type: 'cons' },
  { dev: 'ग', iast: 'ga', category: 'कवर्ग (अल्पप्राण / घोष)', sthana: 'कण्ठ्य (Velar)', example: 'गजः (Elephant)', type: 'cons' },
  { dev: 'घ', iast: 'gha', category: 'कवर्ग (महाप्राण / घोष)', sthana: 'कण्ठ्य (Velar)', example: 'घटः (Pot)', type: 'cons' },
  { dev: 'ङ', iast: 'ṅa', category: 'कवर्ग (अनुनासिक / घोष)', sthana: 'कण्ठनासिक्य (Nasal)', example: 'गङ्गा (Ganga)', type: 'cons' },

  // Ca-varga (चवर्ग)
  { dev: 'च', iast: 'ca', category: 'चवर्ग (अल्पप्राण / अघोष)', sthana: 'तालव्य (Palatal)', example: 'चन्द्रः (Moon)', type: 'cons' },
  { dev: 'छ', iast: 'cha', category: 'चवर्ग (महाप्राण / अघोष)', sthana: 'तालव्य (Palatal)', example: 'छत्रम् (Umbrella)', type: 'cons' },
  { dev: 'ज', iast: 'ja', category: 'चवर्ग (अल्पप्राण / घोष)', sthana: 'तालव्य (Palatal)', example: 'जलम् (Water)', type: 'cons' },
  { dev: 'झ', iast: 'jha', category: 'चवर्ग (महाप्राण / घोष)', sthana: 'तालव्य (Palatal)', example: 'झषः (Fish)', type: 'cons' },
  { dev: 'ञ', iast: 'ña', category: 'चवर्ग (अनुनासिक / घोष)', sthana: 'तालुनासिक्य (Nasal)', example: 'चञ्चुः (Beak)', type: 'cons' },

  // Ta-varga (टवर्ग)
  { dev: 'ट', iast: 'ṭa', category: 'टवर्ग (अल्पप्राण / अघोष)', sthana: 'मूर्धन्य (Retroflex)', example: 'टीका (Commentary)', type: 'cons' },
  { dev: 'ठ', iast: 'ṭha', category: 'टवर्ग (महाप्राण / अघोष)', sthana: 'मूर्धन्य (Retroflex)', example: 'ठक्कुरः (Deity)', type: 'cons' },
  { dev: 'ड', iast: 'ḍa', category: 'टवर्ग (अल्पप्राण / घोष)', sthana: 'मूर्धन्य (Retroflex)', example: 'डमरुः (Drum)', type: 'cons' },
  { dev: 'ढ', iast: 'ḍha', category: 'टवर्ग (महाप्राण / घोष)', sthana: 'मूर्धन्य (Retroflex)', example: 'ढक्का (Large Drum)', type: 'cons' },
  { dev: 'ण', iast: 'ṇa', category: 'टवर्ग (अनुनासिक / घोष)', sthana: 'मूर्धनासिक्य (Nasal)', example: 'वीणा (Lute)', type: 'cons' },

  // Ta-varga (तवर्ग)
  { dev: 'त', iast: 'ta', category: 'तवर्ग (अल्पप्राण / अघोष)', sthana: 'दन्त्य (Dental)', example: 'तरुः (Tree)', type: 'cons' },
  { dev: 'थ', iast: 'tha', category: 'तवर्ग (महाप्राण / अघोष)', sthana: 'दन्त्य (Dental)', example: 'स्थली (Place)', type: 'cons' },
  { dev: 'द', iast: 'da', category: 'तवर्ग (अल्पप्राण / घोष)', sthana: 'दन्त्य (Dental)', example: 'दन्तम् (Tooth)', type: 'cons' },
  { dev: 'ध', iast: 'dha', category: 'तवर्ग (महाप्राण / घोष)', sthana: 'दन्त्य (Dental)', example: 'धनुः (Bow)', type: 'cons' },
  { dev: 'न', iast: 'na', category: 'तवर्ग (अनुनासिक / घोष)', sthana: 'दन्तनासिक्य (Nasal)', example: 'नदी (River)', type: 'cons' },

  // Pa-varga (पवर्ग)
  { dev: 'प', iast: 'pa', category: 'पवर्ग (अल्पप्राण / अघोष)', sthana: 'ओष्ठ्य (Labial)', example: 'पत्रम् (Leaf)', type: 'cons' },
  { dev: 'फ', iast: 'pha', category: 'पवर्ग (महाप्राण / अघोष)', sthana: 'ओष्ठ्य (Labial)', example: 'फलम् (Fruit)', type: 'cons' },
  { dev: 'ब', iast: 'ba', category: 'पवर्ग (अल्पप्राण / घोष)', sthana: 'ओष्ठ्य (Labial)', example: 'बालकः (Boy)', type: 'cons' },
  { dev: 'भ', iast: 'bha', category: 'पवर्ग (महाप्राण / घोष)', sthana: 'ओष्ठ्य (Labial)', example: 'भानुः (Sun)', type: 'cons' },
  { dev: 'म', iast: 'ma', category: 'पवर्ग (अनुनासिक / घोष)', sthana: 'ओष्ठनासिक्य (Nasal)', example: 'मित्रम् (Friend)', type: 'cons' },

  // Antastha (अन्तःस्थ)
  { dev: 'य', iast: 'ya', category: 'अन्तःस्थ (Semivowel)', sthana: 'तालव्य (Palatal)', example: 'यज्ञः (Sacrifice)', type: 'cons' },
  { dev: 'र', iast: 'ra', category: 'अन्तःस्थ (Semivowel)', sthana: 'मूर्धन्य (Retroflex)', example: 'रथः (Chariot)', type: 'cons' },
  { dev: 'ल', iast: 'la', category: 'अन्तःस्थ (Semivowel)', sthana: 'दन्त्य (Dental)', example: 'लता (Creeper)', type: 'cons' },
  { dev: 'व', iast: 'va', category: 'अन्तःस्थ (Semivowel)', sthana: 'दन्तोष्ठ्य (Labiodental)', example: 'वनम् (Forest)', type: 'cons' },

  // Ushman (ऊष्मन्)
  { dev: 'श', iast: 'śa', category: 'ऊष्मन् (Sibilant)', sthana: 'तालव्य (Palatal)', example: 'शिवः (Auspicious)', type: 'cons' },
  { dev: 'ष', iast: 'ṣa', category: 'ऊष्मन् (Sibilant)', sthana: 'मूर्धन्य (Retroflex)', example: 'षण्मुखः (Six-faced)', type: 'cons' },
  { dev: 'स', iast: 'sa', category: 'ऊष्मन् (Sibilant)', sthana: 'दन्त्य (Dental)', example: 'सूर्यः (Sun)', type: 'cons' },
  { dev: 'ह', iast: 'ha', category: 'ऊष्मन् (Aspirate)', sthana: 'कण्ठ्य (Glottal / Velar)', example: 'हंसः (Swan)', type: 'cons' },

  // Samyuktakshara (संयुक्त)
  { dev: 'क्ष', iast: 'kṣa', category: 'संयुक्तव्यञ्जनम् (क् + ष्)', sthana: 'कण्ठ्य-मूर्धन्य', example: 'वृक्षः (Tree)', type: 'conjunct' },
  { dev: 'त्र', iast: 'tra', category: 'संयुक्तव्यञ्जनम् (त् + र्)', sthana: 'दन्त्य-मूर्धन्य', example: 'नेत्रम् (Eye)', type: 'conjunct' },
  { dev: 'ज्ञ', iast: 'jña', category: 'संयुक्तव्यञ्जनम् (ज् + ञ्)', sthana: 'तालव्य', example: 'ज्ञानम् (Knowledge)', type: 'conjunct' },
  { dev: 'श्र', iast: 'śra', category: 'संयुक्तव्यञ्जनम् (श् + र्)', sthana: 'तालव्य-मूर्धन्य', example: 'श्रमः (Effort)', type: 'conjunct' },
];

const BARAKHADI_VOWELS = [
  { dev: 'अ', matra: '', iast: 'a' },
  { dev: 'आ', matra: 'ा', iast: 'ā' },
  { dev: 'इ', matra: 'ि', iast: 'i' },
  { dev: 'ई', matra: 'ी', iast: 'ī' },
  { dev: 'उ', matra: 'ु', iast: 'u' },
  { dev: 'ऊ', matra: 'ू', iast: 'ū' },
  { dev: 'ऋ', matra: 'ृ', iast: 'ṛ' },
  { dev: 'ए', matra: 'े', iast: 'e' },
  { dev: 'ऐ', matra: 'ै', iast: 'ai' },
  { dev: 'ओ', matra: 'ो', iast: 'o' },
  { dev: 'औ', matra: 'ौ', iast: 'au' },
  { dev: 'अं', matra: 'ं', iast: 'aṃ' },
  { dev: 'अः', matra: 'ः', iast: 'aḥ' },
];

const KEY_CONSONANTS = [
  'क', 'ख', 'ग', 'घ',
  'च', 'छ', 'ज', 'झ',
  'ट', 'ठ', 'ड', 'ढ',
  'त', 'थ', 'द', 'ध', 'न',
  'प', 'फ', 'ब', 'भ', 'म',
  'य', 'र', 'ल', 'व',
  'श', 'ष', 'स', 'ह',
];

const makeBarakhadiRow = (cons: string) => {
  return BARAKHADI_VOWELS.map((v) => {
    if (v.matra === '') return { akshara: cons, iast: `${cons}${v.iast}`, vowel: v.dev };
    if (cons === 'र' && v.dev === 'उ') return { akshara: 'रु', iast: 'ru', vowel: 'उ' };
    if (cons === 'र' && v.dev === 'ऊ') return { akshara: 'रू', iast: 'rū', vowel: 'ऊ' };
    return { akshara: `${cons}${v.matra}`, iast: `${cons}${v.iast}`, vowel: v.dev };
  });
};

export const VarnamalaFlashcardDownloadModal: React.FC<VarnamalaFlashcardDownloadModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'varnamala',
}) => {
  const [activeTab, setActiveTab] = useState<'varnamala' | 'barakhadi' | 'chart'>(initialMode);
  const [selectedConsonant, setSelectedConsonant] = useState<string>('क');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentBarakhadiCards = makeBarakhadiRow(selectedConsonant);

  return (
    <div
      className="vcard-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Download Sanskrit Varnamala and Barakhadi Flashcards & PDF"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="vcard-modal">
        {/* Modal Header */}
        <header className="vcard-modal-header">
          <div className="vcard-brand-row">
            <img src="/logo.jpg" alt="EdNet Learn Logo" className="vcard-logo-img" />
            <div className="vcard-brand-text">
              <h2>
                <span>🔤</span> संस्कृत-वर्णमाला एवं बारहखड़ी
              </h2>
              <p>EdNet Learn · Printable Flashcards &amp; Comprehensive PDF Study Deck</p>
            </div>
          </div>
          <button
            type="button"
            className="vcard-modal-close-btn"
            onClick={onClose}
            aria-label="Close download modal"
          >
            ✕
          </button>
        </header>

        {/* Controls Bar */}
        <div className="vcard-controls-bar">
          <div className="vcard-tab-group" role="tablist">
            <button
              type="button"
              className={`vcard-tab-btn${activeTab === 'varnamala' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('varnamala')}
              role="tab"
              aria-selected={activeTab === 'varnamala'}
            >
              <span>🔤</span> वर्णमाला फ्लैश-कार्ड्स (Alphabet Cards)
            </button>
            <button
              type="button"
              className={`vcard-tab-btn${activeTab === 'barakhadi' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('barakhadi')}
              role="tab"
              aria-selected={activeTab === 'barakhadi'}
            >
              <span>📜</span> बारहखड़ी कार्ड्स (Syllable Cards)
            </button>
            <button
              type="button"
              className={`vcard-tab-btn${activeTab === 'chart' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('chart')}
              role="tab"
              aria-selected={activeTab === 'chart'}
            >
              <span>📊</span> समग्र तक्था (Complete Reference Sheet)
            </button>
          </div>

          <div className="vcard-actions-group">
            <button
              type="button"
              className="vcard-btn-print"
              onClick={handlePrint}
              title="Print or Save this view as PDF"
            >
              <span>🖨️</span> Save as PDF / Print
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="vcard-modal-body">
          <div className="vcard-printable-area">
            {/* Print Header shown only during window.print() */}
            <div className="vcard-print-header">
              <div className="vcard-print-header-brand">
                <img src="/logo.jpg" alt="Logo" className="vcard-print-logo" />
                <div>
                  <h1 className="vcard-print-title">EdNet Learn · संस्कृत-शिक्षा</h1>
                  <p className="vcard-print-sub">
                    {activeTab === 'varnamala'
                      ? 'Sanskrit Varṇamālā Printable Flashcard Deck (स्वर एवं व्यञ्जन)'
                      : activeTab === 'barakhadi'
                      ? `Sanskrit Bārahkhaḍī Cards for "${selectedConsonant}" (बारहखड़ी-तक्था)`
                      : 'Complete Sanskrit Varṇamālā & Bārahkhaḍī Reference Chart'}
                  </p>
                </div>
              </div>
              <div className="vcard-print-meta">
                <div>ednetlearn.in</div>
                <div>Gurukul Sanskrit Academy</div>
                <div>Class 6–10 &amp; University Foundations</div>
              </div>
            </div>

            {/* View 1: Varnamala Flashcards */}
            {activeTab === 'varnamala' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 className="vcard-section-title" style={{ margin: 0 }}>
                    <span>🔤</span> Varṇamālā Cut-Out Flashcard Deck (46 Letters)
                  </h3>
                  <small style={{ color: '#64748b' }}>
                    Tip: Use heavy paper/cardstock and cut along dashed lines ✂️
                  </small>
                </div>

                <div className="vcard-grid">
                  {VARNAMALA_LETTERS.map((item) => (
                    <div
                      key={item.dev}
                      className={`vcard-item ${item.type === 'vowel' ? 'vcard-item--vowel' : 'vcard-item--cons'}`}
                    >
                      <span className="vcard-cut-guide">✂</span>
                      <div className="vcard-akshara-big">{item.dev}</div>
                      <div className="vcard-iast-tag">{item.iast}</div>
                      <div className="vcard-category-tag">{item.category}</div>
                      <div className="vcard-sthana-text">📍 {item.sthana}</div>
                      <div className="vcard-example-word">📖 {item.example}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 2: Barakhadi Flashcards */}
            {activeTab === 'barakhadi' && (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="vcard-section-title" style={{ margin: 0 }}>
                      <span>📜</span> Bārahkhaḍī Syllable Cards: {selectedConsonant}-वर्ग
                    </h3>
                    <small style={{ color: '#64748b' }}>
                      Select any consonant below to inspect &amp; print its 13 mātrā cards
                    </small>
                  </div>

                  <div className="vcard-consonant-pills" role="radiogroup" aria-label="Select consonant">
                    {KEY_CONSONANTS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`vcard-cons-pill${selectedConsonant === c ? ' is-active' : ''}`}
                        onClick={() => setSelectedConsonant(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="vcard-grid">
                  {currentBarakhadiCards.map((b, idx) => (
                    <div key={b.akshara} className="vcard-item vcard-item--cons">
                      <span className="vcard-cut-guide">✂</span>
                      <div className="vcard-akshara-big">{b.akshara}</div>
                      <div className="vcard-iast-tag">{b.iast}</div>
                      <div className="vcard-category-tag">
                        {selectedConsonant} + {b.vowel}
                      </div>
                      <div className="vcard-sthana-text">
                        Mātrā #{idx + 1} of 13
                      </div>
                      <div className="vcard-example-word">
                        स्वर: {b.vowel} ({BARAKHADI_VOWELS[idx].matra ? `मात्रा: "${BARAKHADI_VOWELS[idx].matra}"` : 'मूल-स्वर'})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* View 3: Complete Reference Summary Chart */}
            {activeTab === 'chart' && (
              <div>
                <h3 className="vcard-section-title">
                  <span>📊</span> Complete Sanskrit Varṇamālā Reference Table
                </h3>
                <div className="vcard-table-wrap">
                  <table className="vcard-ref-table">
                    <thead>
                      <tr>
                        <th>वर्ग / श्रेणी (Group)</th>
                        <th>उच्चारण-स्थानम् (Place)</th>
                        <th>अक्षराणि (Letters)</th>
                        <th>IAST Transliteration</th>
                        <th>प्रयत्नः / वैशिष्ट्यम् (Phonetic Note)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>स्वराः (Vowels)</strong></td>
                        <td>कण्ठ, तालु, मूर्धा, ओष्ठ</td>
                        <td style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 700 }}>
                          अ आ इ ई उ ऊ ऋ ॠ ऌ ए ऐ ओ औ
                        </td>
                        <td>a ā i ī u ū ṛ ṝ ḷ e ai o au</td>
                        <td>13 Core Svaras (ह्रस्व, दीर्घ, संयुक्त)</td>
                      </tr>
                      <tr>
                        <td><strong>अयोगवाहौ (Modifiers)</strong></td>
                        <td>नासिक्य / कण्ठ्य</td>
                        <td style={{ fontSize: '1.15rem', color: '#0f766e', fontWeight: 700 }}>अं, अः</td>
                        <td>aṃ (Anusvāra), aḥ (Visarga)</td>
                        <td>Vowel dependent nasal &amp; aspiration</td>
                      </tr>
                      <tr>
                        <td><strong>कवर्ग (Ka-varga)</strong></td>
                        <td>कण्ठ्य (Velar / Throat)</td>
                        <td style={{ fontSize: '1.15rem', color: '#b45309', fontWeight: 700 }}>क ख ग घ ङ</td>
                        <td>ka kha ga gha ṅa</td>
                        <td>Voiceless, aspirated, voiced, nasal</td>
                      </tr>
                      <tr>
                        <td><strong>चवर्ग (Ca-varga)</strong></td>
                        <td>तालव्य (Palatal / Hard Palate)</td>
                        <td style={{ fontSize: '1.15rem', color: '#b45309', fontWeight: 700 }}>च छ ज झ ञ</td>
                        <td>ca cha ja jha ña</td>
                        <td>Voiceless, aspirated, voiced, nasal</td>
                      </tr>
                      <tr>
                        <td><strong>टवर्ग (Ṭa-varga)</strong></td>
                        <td>मूर्धन्य (Retroflex / Roof)</td>
                        <td style={{ fontSize: '1.15rem', color: '#b45309', fontWeight: 700 }}>ट ठ ड ढ ण</td>
                        <td>ṭa ṭha ḍa ḍha ṇa</td>
                        <td>Curled tongue contact at roof of mouth</td>
                      </tr>
                      <tr>
                        <td><strong>तवर्ग (Ta-varga)</strong></td>
                        <td>दन्त्य (Dental / Teeth)</td>
                        <td style={{ fontSize: '1.15rem', color: '#b45309', fontWeight: 700 }}>त थ द ध न</td>
                        <td>ta tha da dha na</td>
                        <td>Tongue tip touches behind upper teeth</td>
                      </tr>
                      <tr>
                        <td><strong>पवर्ग (Pa-varga)</strong></td>
                        <td>ओष्ठ्य (Labial / Lips)</td>
                        <td style={{ fontSize: '1.15rem', color: '#b45309', fontWeight: 700 }}>प फ ब भ म</td>
                        <td>pa pha ba bha ma</td>
                        <td>Both lips touch and release</td>
                      </tr>
                      <tr>
                        <td><strong>अन्तःस्थाः (Semivowels)</strong></td>
                        <td>तालु, मूर्धा, दन्त, ओष्ठ</td>
                        <td style={{ fontSize: '1.15rem', color: '#6d28d9', fontWeight: 700 }}>य र ल व</td>
                        <td>ya ra la va</td>
                        <td>In-between vowels and consonants</td>
                      </tr>
                      <tr>
                        <td><strong>ऊष्माणः (Sibilants &amp; H)</strong></td>
                        <td>तालु, मूर्धा, दन्त, कण्ठ</td>
                        <td style={{ fontSize: '1.15rem', color: '#dc2626', fontWeight: 700 }}>श ष स ह</td>
                        <td>śa ṣa sa ha</td>
                        <td>Fricative warm airflow sounds</td>
                      </tr>
                      <tr>
                        <td><strong>संयुक्तव्यञ्जनानि</strong></td>
                        <td>मिश्र-स्थानानि</td>
                        <td style={{ fontSize: '1.15rem', color: '#0369a1', fontWeight: 700 }}>क्ष त्र ज्ञ श्र</td>
                        <td>kṣa tra jña śra</td>
                        <td>Classical ligature conjuncts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="vcard-section-title" style={{ marginTop: '2rem' }}>
                  <span>📜</span> Bārahkhaḍī Mātrā Matrix (Sample Key Consonants)
                </h3>
                <div className="vcard-table-wrap">
                  <table className="vcard-ref-table">
                    <thead>
                      <tr>
                        <th>वर्ण</th>
                        {BARAKHADI_VOWELS.map((v) => (
                          <th key={v.dev}>{v.dev} ({v.iast})</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {['क', 'ग', 'च', 'ज', 'त', 'द', 'प', 'म', 'र', 'स'].map((c) => {
                        const row = makeBarakhadiRow(c);
                        return (
                          <tr key={c}>
                            <td><strong>{c}</strong></td>
                            {row.map((cell) => (
                              <td key={cell.akshara} style={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f766e' }}>
                                {cell.akshara}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VarnamalaFlashcardDownloadModal;
