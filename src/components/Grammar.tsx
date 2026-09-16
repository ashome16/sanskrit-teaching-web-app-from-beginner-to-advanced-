import React, { useEffect, useState } from 'react';
import { VIBHAKTI_CASES } from '../data/vibhakti';
import { ARTICLES } from '../data/articleIndex';
import { parseArticle, type ParsedArticle } from '../utils/articleParser';
import ConjunctGames from './ConjunctGames';
import SoundTeamsArticle from './SoundTeamsArticle';
import '../styles/grammar.css';

type GrammarTopic = 'home' | 'vibhakti' | 'samyukta' | 'sound-teams' | 'article';

const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());

type GrammarProps = {
  onGoHome?: () => void;
};

const Grammar: React.FC<GrammarProps> = ({ onGoHome }) => {
  const [topic, setTopic] = useState<GrammarTopic>('home');
  const [selectedCase, setSelectedCase] = useState(1);
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [articles, setArticles] = useState<Record<string, ParsedArticle>>({});
  const [articleError, setArticleError] = useState(false);

  const activeArticleMeta = ARTICLES.find((item) => item.id === activeArticleId);
  const activeArticle = activeArticleId ? articles[activeArticleId] : undefined;

  const goBackToShelf = () => {
    setTopic('home');
    setActiveArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (id: string) => {
    setActiveArticleId(id);
    setArticleError(false);
    setTopic('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBreadcrumb = (currentTitle: string) => (
    <div className="grammar-header-nav">
      <nav className="grammar-breadcrumb" aria-label="Grammar breadcrumb navigation">
        <button
          type="button"
          className="grammar-breadcrumb-link"
          onClick={goBackToShelf}
          title="Return to Grammar Shelf with all articles"
        >
          📚 व्याकरणम् (Grammar Shelf)
        </button>
        <span className="grammar-breadcrumb-sep" aria-hidden="true">›</span>
        <span className="grammar-breadcrumb-current">{currentTitle}</span>
      </nav>
      <nav className="grammar-nav" aria-label="Grammar page navigation">
        <button type="button" className="grammar-back" onClick={goBackToShelf}>
          ← Back to All Articles
        </button>
        {onGoHome && (
          <button type="button" className="grammar-home" onClick={onGoHome}>
            ← Deepakam · Home
          </button>
        )}
      </nav>
    </div>
  );

  useEffect(() => {
    if (topic === 'article' && activeArticleMeta && !articles[activeArticleMeta.id] && !articleError) {
      fetchText(activeArticleMeta.file)
        .then((text) => setArticles((prev) => ({ ...prev, [activeArticleMeta.id]: parseArticle(text) })))
        .catch(() => setArticleError(true));
    }
  }, [topic, activeArticleMeta, articles, articleError]);

  if (topic === 'vibhakti') {
    return (
      <section className="grammar-page" aria-label="Vibhakti guide">
        <header className="grammar-page-header">
          {renderBreadcrumb('विभक्ति · Vibhakti')}
          <h2 className="grammar-title">विभक्ति · Vibhakti</h2>
          <p className="grammar-lead">The 8 noun cases at a glance — our first grammar brick.</p>
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

  if (topic === 'samyukta') {
    return (
      <section className="grammar-page" aria-label="Conjunct games">
        <header className="grammar-page-header">
          {renderBreadcrumb('संयुक्त · Conjunct Games')}
          <h2 className="grammar-title">संयुक्त · Conjunct Games</h2>
          <p className="grammar-lead">
            Three playground posters. Tap a game title to open or close its picture.
          </p>
        </header>
        <ConjunctGames />
      </section>
    );
  }

  if (topic === 'sound-teams') {
    return (
      <section className="grammar-page" aria-label="Five Sound Teams">
        <header className="grammar-page-header">
          {renderBreadcrumb('Five Sound Teams · पञ्च वर्ण-टीमें')}
          <h2 className="grammar-title">Five Sound Teams · पञ्च वर्ण-टीमें</h2>
          <p className="grammar-lead">
            Vowels, consonants, sliders, hissers, and fusion blocks — how every letter finds its
            squad.
          </p>
        </header>
        <SoundTeamsArticle />
      </section>
    );
  }

  if (topic === 'article') {
    return (
      <section className="grammar-page" aria-label="Grammar article">
        <header className="grammar-page-header">
          {renderBreadcrumb(activeArticle ? activeArticle.title : (activeArticleMeta?.cardTitle || 'Article'))}
          <h2 className="grammar-title">{activeArticle ? activeArticle.title : 'Loading…'}</h2>
          {activeArticle?.subtitle && <p className="grammar-lead">{activeArticle.subtitle}</p>}
        </header>
        {articleError && (
          <p className="grammar-lead">
            Could not load the article. Make sure {activeArticleMeta?.file ?? 'the article file'} exists in
            public/.
          </p>
        )}
        {activeArticle && (
          <article className="grammar-article">
            {activeArticle.blocks.map((block, index) => {
              if (block.type === 'subheading') {
                return (
                  <h3 className="grammar-article-subheading" key={index}>
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul className="grammar-article-list" key={index}>
                    {block.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'table') {
                return (
                  <div className="grammar-article-table-wrap" key={index}>
                    <table className="grammar-article-table">
                      <thead>
                        <tr>
                          {block.headers.map((header, headerIndex) => (
                            <th key={headerIndex}>{header}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (block.type === 'image') {
                const src = block.src.startsWith('http') || block.src.startsWith('/') ? block.src : `./${block.src}`;
                return (
                  <figure className="grammar-article-image-wrap" key={index}>
                    <img src={src} alt={block.alt} className="grammar-article-image" loading="lazy" />
                    {block.caption && (
                      <figcaption className="grammar-article-image-caption">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              if (block.type === 'code') {
                return (
                  <pre className="grammar-article-code" key={index}>
                    <code>{block.text}</code>
                  </pre>
                );
              }
              return (
                <p className="grammar-article-paragraph" key={index}>
                  {block.text}
                </p>
              );
            })}
            <footer className="grammar-article-footer">
              <button
                type="button"
                className="grammar-back grammar-footer-btn"
                onClick={goBackToShelf}
              >
                ← Back to All Grammar Articles
              </button>
              {onGoHome && (
                <button
                  type="button"
                  className="grammar-home grammar-footer-btn"
                  onClick={onGoHome}
                >
                  ← Return to Deepakam Lessons
                </button>
              )}
            </footer>
          </article>
        )}
      </section>
    );
  }

  return (
    <section className="grammar-page" aria-label="Grammar">
      <header className="grammar-page-header">
        <h2 className="grammar-title">व्याकरणम् · Grammar</h2>
        <p className="grammar-lead">
          We build this shelf from the base. Vibhakti and conjunct games live here so Deepakam
          stays the book.
        </p>
      </header>
      <div className="grammar-shelf">
        <button type="button" className="grammar-card grammar-card--ready" onClick={() => setTopic('vibhakti')}>
          <span className="grammar-card-title">विभक्ति · Vibhakti</span>
          <span className="grammar-card-blurb">Eight noun cases — who does what to whom.</span>
        </button>
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          onClick={() => setTopic('sound-teams')}
        >
          <span className="grammar-card-title">Five Sound Teams · पञ्च वर्ण-टीमें</span>
          <span className="grammar-card-blurb">
            Vowels, consonants, sliders, hissers, and fusion blocks — how every letter finds its
            squad.
          </span>
        </button>
        <button type="button" className="grammar-card grammar-card--ready" onClick={() => setTopic('samyukta')}>
          <span className="grammar-card-title">संयुक्त · Conjunct Games</span>
          <span className="grammar-card-blurb">Drop the stick, piggyback, shape-shifters — how letters join.</span>
        </button>
        {ARTICLES.map((item) => (
          <button
            type="button"
            className="grammar-card grammar-card--ready"
            key={item.id}
            onClick={() => openArticle(item.id)}
          >
            <span className="grammar-card-title">
              {item.emoji} {item.cardTitle}
            </span>
            <span className="grammar-card-blurb">{item.cardBlurb}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Grammar;
