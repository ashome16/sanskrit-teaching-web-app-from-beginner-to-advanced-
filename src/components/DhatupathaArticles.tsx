import React, { useState } from 'react';
import {
  DHATUPATHA_ARTICLES,
  type DhatupathaArticle,
} from '../data/dhatupathaArticles';
import { playPronunciation } from '../utils/pronunciation';

interface DhatupathaArticlesProps {
  onDeconstructWord?: (word: string) => void;
  onGenerateDhatu?: (dhatuId: string) => void;
}

export const DhatupathaArticles: React.FC<DhatupathaArticlesProps> = ({
  onDeconstructWord,
  onGenerateDhatu,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    DHATUPATHA_ARTICLES[0].id
  );
  const [searchQuery, setSearchQuery] = useState('');

  const activeArticle =
    DHATUPATHA_ARTICLES.find((a) => a.id === selectedArticleId) ||
    DHATUPATHA_ARTICLES[0];

  const filteredArticles = DHATUPATHA_ARTICLES.filter((art) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      art.titleSan.toLowerCase().includes(q) ||
      art.titleEn.toLowerCase().includes(q) ||
      art.summary.toLowerCase().includes(q) ||
      art.badge.toLowerCase().includes(q)
    );
  });

  const currentIndex = DHATUPATHA_ARTICLES.findIndex(
    (a) => a.id === activeArticle.id
  );
  const prevArticle =
    currentIndex > 0 ? DHATUPATHA_ARTICLES[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < DHATUPATHA_ARTICLES.length - 1
      ? DHATUPATHA_ARTICLES[currentIndex + 1]
      : null;

  const handleActionClick = (action: DhatupathaArticle['suggestedAction']) => {
    if (!action) return;
    if (action.type === 'deconstruct' && action.targetWord && onDeconstructWord) {
      onDeconstructWord(action.targetWord);
    } else if (action.type === 'generate' && action.dhatuId && onGenerateDhatu) {
      onGenerateDhatu(action.dhatuId);
    }
  };

  return (
    <div className="dp-articles-layout" aria-label="Dhātupāṭha Knowledge Articles">
      {/* Top Knowledge Hub Banner */}
      <section className="dp-articles-hero">
        <div className="dp-articles-hero-content">
          <span className="dp-articles-hero-pill">📜 पाणिनीय-सिद्धान्त-दीपिका</span>
          <h3 className="dp-articles-hero-title">
            The Science of Sanskrit Verbal Roots (धातु-विज्ञानम्)
          </h3>
          <p className="dp-articles-hero-desc">
            Explore comprehensive grammatical treatises on Pāṇini’s Dhātupāṭha,
            the 10 Gaṇas, verbal voice (परस्मैपद/आत्मनेपद), the 5 core school
            Lakāras, Kṛt participles, and the mathematical vowel-shifting laws of
            Guṇa and Vṛddhi.
          </p>
        </div>
      </section>

      {/* Article Navigation Bar / Grid */}
      <section className="dp-articles-shelf">
        <div className="dp-articles-shelf-header">
          <div className="dp-shelf-title-wrap">
            <span className="dp-shelf-badge">अध्ययन-विषयाः</span>
            <h4 className="dp-shelf-title">Select a Descriptive Article ({DHATUPATHA_ARTICLES.length})</h4>
          </div>
          <div className="dp-shelf-search">
            <input
              type="text"
              placeholder="Search articles, Gaṇas, Lakāras, Sūtras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="dp-shelf-search-input"
              aria-label="Search Dhātupāṭha articles"
            />
          </div>
        </div>

        <div className="dp-articles-pill-row" role="tablist">
          {filteredArticles.map((art) => {
            const isSelected = art.id === activeArticle.id;
            return (
              <button
                key={art.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`dp-article-tab-btn${
                  isSelected ? ' dp-article-tab-btn--active' : ''
                }`}
                onClick={() => setSelectedArticleId(art.id)}
              >
                <span
                  className="dp-article-tab-badge"
                  style={{ backgroundColor: art.badgeColor }}
                >
                  {art.badge}
                </span>
                <span className="dp-article-tab-san">{art.titleSan.split('—')[0]}</span>
                <span className="dp-article-tab-time">{art.readTime}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Article Reader */}
      <article className="dp-article-card" aria-labelledby="active-article-title">
        {/* Article Header */}
        <header className="dp-article-header">
          <div className="dp-article-meta-row">
            <span
              className="dp-article-category-badge"
              style={{ backgroundColor: activeArticle.badgeColor }}
            >
              {activeArticle.badge}
            </span>
            <span className="dp-article-readtime">⏱️ {activeArticle.readTime}</span>
            <span className="dp-article-cert-tag">✓ Authentic Pāṇinian Sūtras</span>
          </div>

          <h2 id="active-article-title" className="dp-article-h1-san">
            {activeArticle.titleSan}
          </h2>
          <h3 className="dp-article-h2-en">{activeArticle.titleEn}</h3>

          <p className="dp-article-summary">{activeArticle.summary}</p>

          {activeArticle.suggestedAction && (
            <div className="dp-article-action-box">
              <span className="dp-action-icon">⚡</span>
              <span className="dp-action-text">Interactive Practical Tool:</span>
              <button
                type="button"
                className="dp-article-action-btn"
                onClick={() => handleActionClick(activeArticle.suggestedAction)}
              >
                {activeArticle.suggestedAction.label}
              </button>
            </div>
          )}
        </header>

        {/* Article Sections */}
        <div className="dp-article-body">
          {activeArticle.sections.map((sec, secIdx) => (
            <section key={secIdx} className="dp-article-section">
              <div className="dp-sec-header">
                {sec.titleSan && <h4 className="dp-sec-san">{sec.titleSan}</h4>}
                <h3 className="dp-sec-en">{sec.title}</h3>
              </div>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="dp-sec-p">
                  {p}
                </p>
              ))}

              {/* Sūtra Callout Boxes */}
              {sec.sutras && sec.sutras.length > 0 && (
                <div className="dp-sutras-wrap">
                  {sec.sutras.map((sut, sutIdx) => (
                    <div key={sutIdx} className="dp-sutra-box">
                      <div className="dp-sutra-top">
                        <span className="dp-sutra-badge">पाणिनीय-सूत्रम्</span>
                        <span className="dp-sutra-num">{sut.number}</span>
                        <button
                          type="button"
                          className="dp-sutra-audio-btn"
                          onClick={() => playPronunciation(sut.sutra.split('।')[0].trim())}
                          title="Listen to authentic recitation"
                          aria-label={`Pronounce ${sut.sutra}`}
                        >
                          🔊 Listen
                        </button>
                      </div>
                      <div className="dp-sutra-text">{sut.sutra}</div>
                      <div className="dp-sutra-meaning">
                        <strong>Meaning:</strong> {sut.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 10 Classical Gaṇa Workshop Cards */}
              {sec.ganaCards && sec.ganaCards.length > 0 && (
                <div className="dp-ganas-grid">
                  {sec.ganaCards.map((g) => (
                    <div key={g.number} className="dp-gana-workshop-card">
                      <div className="dp-gana-card-header">
                        <div className="dp-gana-num-badge">
                          <span className="dp-gana-num-digit">{g.number}</span>
                          <span className="dp-gana-num-label">गणः</span>
                        </div>
                        <div className="dp-gana-card-title-col">
                          <h4 className="dp-gana-name-san">{g.nameSan}</h4>
                          <div className="dp-gana-name-en-row">
                            <span className="dp-gana-name-en">{g.nameEn}</span>
                            <span className="dp-gana-badge-pill">{g.titleBadge}</span>
                          </div>
                        </div>
                        <div className="dp-gana-vikarana-tag">
                          <span className="dp-vik-label">विकरणम्</span>
                          <span className="dp-vik-val">{g.vikarana}</span>
                        </div>
                      </div>

                      <div className="dp-gana-blueprint-box">
                        <div className="dp-gana-box-title">
                          <span>⚙️</span> <strong>The Blueprint (संरचना-प्रक्रिया):</strong>
                        </div>
                        <p className="dp-gana-blueprint-text">{g.blueprint}</p>
                      </div>

                      <div className="dp-gana-example-box">
                        <div className="dp-gana-box-title">
                          <span>✨</span> <strong>Paradigmatic Formulation (उदाहरणम्):</strong>
                        </div>
                        <div className="dp-gana-derivation-row">
                          <div className="dp-gana-deriv-left">
                            <span className="dp-gana-root">{g.exampleRoot}</span>
                            <span className="dp-gana-arrow">➔</span>
                            <span className="dp-gana-stem">{g.exampleDerivation}</span>
                          </div>
                          <button
                            type="button"
                            className="dp-gana-audio-btn"
                            onClick={() =>
                              playPronunciation(
                                g.exampleDerivation.split('➔')[1]?.split('(')[0]?.trim() ||
                                  g.exampleDerivation
                              )
                            }
                            title="Listen to authentic pronunciation"
                            aria-label={`Pronounce ${g.exampleDerivation}`}
                          >
                            🔊 Listen
                          </button>
                        </div>
                        <div className="dp-gana-meaning">
                          <em>Meaning:</em> {g.exampleMeaning}
                        </div>
                      </div>

                      {g.funFact && (
                        <div className="dp-gana-funfact-box">
                          <span className="dp-funfact-icon">💡</span>
                          <div className="dp-gana-funfact-text">
                            <strong>Grammatical Insight:</strong> {g.funFact}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Responsive Table */}
              {sec.table && (
                <div className="dp-table-scroll-container">
                  <table className="dp-article-table">
                    <thead>
                      <tr>
                        {sec.table.headers.map((th, thIdx) => (
                          <th key={thIdx}>{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Key Takeaway Banner */}
              {sec.keyTakeaway && (
                <div className="dp-takeaway-box">
                  <div className="dp-takeaway-label">
                    <span>💡</span> <strong>सूत्र-सारः (Key Insight)</strong>
                  </div>
                  <div className="dp-takeaway-text">{sec.keyTakeaway}</div>
                </div>
              )}

              {/* Pronunciation Examples */}
              {sec.examples && sec.examples.length > 0 && (
                <div className="dp-examples-grid">
                  {sec.examples.map((ex, exIdx) => (
                    <div key={exIdx} className="dp-example-card">
                      <div className="dp-ex-san-row">
                        <span className="dp-ex-san">{ex.sanskrit}</span>
                        <button
                          type="button"
                          className="dp-ex-audio-btn"
                          onClick={() => playPronunciation(ex.sanskrit)}
                          title="Listen"
                        >
                          🔊
                        </button>
                      </div>
                      <div className="dp-ex-trans">{ex.transliteration}</div>
                      <div className="dp-ex-meaning">{ex.meaning}</div>
                      {ex.breakdown && (
                        <div className="dp-ex-breakdown">
                          <code>{ex.breakdown}</code>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer Next/Prev Navigation */}
        <footer className="dp-article-footer">
          {prevArticle ? (
            <button
              type="button"
              className="dp-article-nav-btn dp-article-nav-btn--prev"
              onClick={() => {
                setSelectedArticleId(prevArticle.id);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            >
              <span className="dp-nav-dir">← Previous Article</span>
              <span className="dp-nav-title">{prevArticle.titleSan.split('—')[0]}</span>
            </button>
          ) : (
            <div />
          )}

          {nextArticle && (
            <button
              type="button"
              className="dp-article-nav-btn dp-article-nav-btn--next"
              onClick={() => {
                setSelectedArticleId(nextArticle.id);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
            >
              <span className="dp-nav-dir">Next Article →</span>
              <span className="dp-nav-title">{nextArticle.titleSan.split('—')[0]}</span>
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};

export default DhatupathaArticles;
