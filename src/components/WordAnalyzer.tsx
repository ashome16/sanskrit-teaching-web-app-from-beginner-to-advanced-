import React, { useEffect, useState } from 'react';
import type { SanskritWordBreakdown } from '../types/linguistics';
import { searchSanskritWords, getAllSanskritWords } from '../data/sanskrit-words';
import { extractLinguisticInfo } from '../utils/linguistics';
import '../styles/word-analyzer.css';

export interface ExternalWordSelection {
  text: string;
  nonce: number;
  speak?: boolean;
}

interface WordAnalyzerProps {
  initialWord?: SanskritWordBreakdown;
  externalSelection?: ExternalWordSelection | null;
  onClose?: () => void;
}

const cleanWord = (value: string): string =>
  value.replace(/[\s।॥,;:!?()[\]{}<>'"“”‘’]+/g, '').trim();

const createCustomWord = (value: string): SanskritWordBreakdown => {
  const devanagari = cleanWord(value) || value.trim();
  const analysis = extractLinguisticInfo(devanagari, '');

  return {
    id: `custom-${devanagari}`,
    devanagari,
    transliteration: analysis.transliteration || devanagari,
    meaning: 'Custom Word Analysis (Dictionary entry not found)',
    partOfSpeech: 'noun',
    syllables: analysis.syllables || [],
    conjunctConsonants: analysis.conjunctConsonants || [],
    etymology: 'Analysis unavailable for external text',
    examples: [],
  };
};

const playPronunciation = (value: string) => {
  const word = cleanWord(value) || value.trim();
  if (!word || !/[\u0900-\u097F]/.test(word) || typeof window === 'undefined' || !window.speechSynthesis) {
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'hi-IN';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

const WordAnalyzer: React.FC<WordAnalyzerProps> = ({
  initialWord,
  externalSelection,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<SanskritWordBreakdown | null>(
    initialWord || null
  );
  const [searchResults, setSearchResults] = useState<SanskritWordBreakdown[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    syllables: true,
    conjuncts: true,
    rootWord: true,
    grammar: true,
    etymology: true,
    examples: true,
  });

  const analyzeWord = (value: string, speak = false) => {
    const word = cleanWord(value);
    if (!word) {
      return;
    }

    const exactMatch = searchSanskritWords(word).find((entry) => entry.devanagari === word);
    setSelectedWord(exactMatch || createCustomWord(word));
    setSearchQuery(word);
    setShowSearchResults(false);
    if (speak) {
      playPronunciation(word);
    }
  };

  useEffect(() => {
    if (externalSelection?.text.trim()) {
      analyzeWord(externalSelection.text, externalSelection.speak);
    }
  }, [externalSelection?.nonce]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchSanskritWords(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const handleSelectWord = (word: SanskritWordBreakdown) => {
    setSelectedWord(word);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const allWords = getAllSanskritWords();

  return (
    <div className="word-analyzer">
      <div className="analyzer-container">
        {/* Header */}
        <div className="analyzer-header">
          <h2>Sanskrit Word Analyzer</h2>
          {onClose && (
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Search Sanskrit words... (type in Devanagari, transliteration, or meaning)"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                analyzeWord(searchQuery, true);
              }
            }}
            autoFocus
          />
          <div className="quick-access">
            <span className="quick-label">Quick access:</span>
            {allWords.slice(0, 3).map((word) => (
              <button
                key={word.id}
                className="quick-btn"
                onClick={() => {
                  handleSelectWord(word);
                  playPronunciation(word.devanagari);
                }}
              >
                {word.devanagari}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results ({searchResults.length})</h3>
            <div className="results-grid">
              {searchResults.map((word) => (
                <button
                  key={word.id}
                  className="result-item"
                  onClick={() => handleSelectWord(word)}
                >
                  <div className="result-devanagari">{word.devanagari}</div>
                  <div className="result-transliteration">{word.transliteration}</div>
                  <div className="result-meaning">{word.meaning}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Word Analysis */}
        {selectedWord && (
          <div className="word-analysis">
            {/* Word Header */}
            <div className="word-header">
              <div className="word-main">
                <div className="word-main-header">
                  <button
                    type="button"
                    className="word-devanagari-button"
                    onClick={() => playPronunciation(selectedWord.devanagari)}
                    aria-label={`Play pronunciation for ${selectedWord.devanagari}`}
                  >
                    <span className="word-devanagari">{selectedWord.devanagari}</span>
                  </button>
                  <button
                    type="button"
                    className="word-pronunciation-button"
                    onClick={() => playPronunciation(selectedWord.devanagari)}
                    aria-label={`Play pronunciation for ${selectedWord.devanagari}`}
                    title="Play pronunciation"
                  >
                    🔊
                  </button>
                </div>
                <div className="word-info">
                  <div className="word-transliteration">{selectedWord.transliteration}</div>
                  <div className="word-pos">{selectedWord.partOfSpeech}</div>
                </div>
              </div>
              <div className="word-meaning">{selectedWord.meaning}</div>
            </div>

            {/* Syllable Breakdown Section */}
            {selectedWord.syllables && selectedWord.syllables.length > 0 && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('syllables')}
                >
                  <h3>📖 Syllable Breakdown (Akṣaras)</h3>
                  <span className="toggle-icon">
                    {expandedSections.syllables ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.syllables && (
                  <div className="section-content">
                    <p className="section-description">
                      Individual syllables that make up the word:
                    </p>
                    <div className="syllables-grid">
                      {selectedWord.syllables.map((syllable, idx) => (
                        <div key={idx} className="syllable-card">
                          <div className="syllable-devanagari">
                            {syllable.devanagari}
                          </div>
                          <div className="syllable-transliteration">
                            {syllable.transliteration}
                          </div>
                          <div className={`syllable-type ${syllable.iotype}`}>
                            {syllable.iotype}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Conjunct Consonants Section */}
            {selectedWord.conjunctConsonants && selectedWord.conjunctConsonants.length > 0 && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('conjuncts')}
                >
                  <h3>
                    🔗 Conjunct Consonants (Samyuktākṣara) ({selectedWord.conjunctConsonants.length})
                  </h3>
                  <span className="toggle-icon">
                    {expandedSections.conjuncts ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.conjuncts && (
                  <div className="section-content">
                    <p className="section-description">
                      Consonant clusters combining two or more half-consonants:
                    </p>
                    <div className="conjuncts-list">
                      {selectedWord.conjunctConsonants.map((conjunct, idx) => (
                        <div key={idx} className="conjunct-card">
                          <div className="conjunct-main">
                            <div className="conjunct-devanagari">
                              {conjunct.devanagari}
                            </div>
                            <div className="conjunct-info">
                              <div className="conjunct-transliteration">
                                {conjunct.transliteration}
                              </div>
                              <div className="conjunct-description">
                                {conjunct.description}
                              </div>
                            </div>
                          </div>
                          <div className="conjunct-components">
                            {conjunct.components.map((comp, i) => (
                              <span key={i} className="component">
                                {comp}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Root Word Section */}
            {selectedWord.dhatu && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('rootWord')}
                >
                  <h3>🌱 Root Word (Dhātu)</h3>
                  <span className="toggle-icon">
                    {expandedSections.rootWord ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.rootWord && (
                  <div className="section-content">
                    <div className="dhatu-card">
                      <div className="dhatu-main">
                        <div className="dhatu-devanagari">
                          {selectedWord.dhatu.devanagari}
                        </div>
                        <div className="dhatu-info">
                          <div className="dhatu-transliteration">
                            {selectedWord.dhatu.transliteration}
                          </div>
                          <div className="dhatu-class">
                            Verb Class {selectedWord.dhatu.class}
                          </div>
                        </div>
                      </div>
                      <div className="dhatu-meaning">{selectedWord.dhatu.meaning}</div>
                      {selectedWord.dhatu.description && (
                        <p className="dhatu-description">{selectedWord.dhatu.description}</p>
                      )}
                      {selectedWord.dhatu.examples && selectedWord.dhatu.examples.length > 0 && (
                        <div className="dhatu-examples">
                          <strong>Examples:</strong>
                          <ul>
                            {selectedWord.dhatu.examples.map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Grammar Section */}
            {(selectedWord.nounInflection || selectedWord.verbInflection) && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('grammar')}
                >
                  <h3>📚 Grammatical Information</h3>
                  <span className="toggle-icon">
                    {expandedSections.grammar ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.grammar && (
                  <div className="section-content">
                    {selectedWord.nounInflection && (
                      <div className="grammar-group">
                        <h4>Noun Inflection</h4>
                        <div className="grammar-grid">
                          <div className="grammar-item">
                            <span className="grammar-label">Gender:</span>
                            <span className="grammar-value">
                              {selectedWord.nounInflection.gender}
                            </span>
                          </div>
                          <div className="grammar-item">
                            <span className="grammar-label">Number:</span>
                            <span className="grammar-value">
                              {selectedWord.nounInflection.number}
                            </span>
                          </div>
                          <div className="grammar-item">
                            <span className="grammar-label">Case:</span>
                            <span className="grammar-value">
                              {selectedWord.nounInflection.case} (Vibhakti)
                            </span>
                          </div>
                          {selectedWord.nounInflection.meaning && (
                            <div className="grammar-item full">
                              <span className="grammar-label">Meaning:</span>
                              <span className="grammar-value">
                                {selectedWord.nounInflection.meaning}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedWord.verbInflection && (
                      <div className="grammar-group">
                        <h4>Verb Inflection</h4>
                        <div className="grammar-grid">
                          <div className="grammar-item">
                            <span className="grammar-label">Tense:</span>
                            <span className="grammar-value">
                              {selectedWord.verbInflection.tense}
                            </span>
                          </div>
                          <div className="grammar-item">
                            <span className="grammar-label">Person:</span>
                            <span className="grammar-value">
                              {selectedWord.verbInflection.person}
                            </span>
                          </div>
                          <div className="grammar-item">
                            <span className="grammar-label">Number:</span>
                            <span className="grammar-value">
                              {selectedWord.verbInflection.number}
                            </span>
                          </div>
                          {selectedWord.verbInflection.mood && (
                            <div className="grammar-item">
                              <span className="grammar-label">Mood:</span>
                              <span className="grammar-value">
                                {selectedWord.verbInflection.mood}
                              </span>
                            </div>
                          )}
                          {selectedWord.verbInflection.meaning && (
                            <div className="grammar-item full">
                              <span className="grammar-label">Meaning:</span>
                              <span className="grammar-value">
                                {selectedWord.verbInflection.meaning}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Etymology Section */}
            {selectedWord.etymology && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('etymology')}
                >
                  <h3>🏛️ Etymology</h3>
                  <span className="toggle-icon">
                    {expandedSections.etymology ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.etymology && (
                  <div className="section-content">
                    <p className="etymology-text">{selectedWord.etymology}</p>
                  </div>
                )}
              </div>
            )}

            {/* Examples Section */}
            {selectedWord.examples && selectedWord.examples.length > 0 && (
              <div className="analysis-section">
                <div
                  className="section-header"
                  onClick={() => toggleSection('examples')}
                >
                  <h3>📝 Examples</h3>
                  <span className="toggle-icon">
                    {expandedSections.examples ? '▼' : '▶'}
                  </span>
                </div>
                {expandedSections.examples && (
                  <div className="section-content">
                    <div className="examples-list">
                      {selectedWord.examples.map((example, idx) => (
                        <div key={idx} className="example-item">
                          <div className="example-text">{example}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!selectedWord && !showSearchResults && (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>Sanskrit Word Analyzer</h3>
            <p>Search for a Sanskrit word to see its complete linguistic breakdown:</p>
            <ul className="empty-tips">
              <li>🔤 Syllable segmentation into Akṣaras</li>
              <li>🔗 Conjunct consonant identification (Samyuktākṣara)</li>
              <li>🌱 Root word (Dhātu) extraction with meaning</li>
              <li> Grammatical inflections and cases (Vibhaktis)</li>
              <li>🏛️ Etymology and related words</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WordAnalyzer;
