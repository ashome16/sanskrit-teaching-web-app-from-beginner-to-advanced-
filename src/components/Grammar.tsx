import React, { useEffect, useState } from 'react';
import { ARTICLES } from '../data/articleIndex';
import { parseArticle, type ParsedArticle } from '../utils/articleParser';
import ConjunctGames from './ConjunctGames';
import SoundTeamsArticle from './SoundTeamsArticle';
import LingaVachanaGuide from './LingaVachanaGuide';
import VibhaktiGuide from './VibhaktiGuide';
import PaninianStudio from './PaninianStudio';
import { NumbersGuide } from './NumbersGuide';
import '../styles/grammar.css';

type GrammarTopic = 'home' | 'vibhakti' | 'linga-vachana' | 'numbers' | 'samyukta' | 'sound-teams' | 'science-of-sound' | 'dhatupatha' | 'article';

const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());

type GrammarProps = {
  onGoHome?: () => void;
  onOpenWorksheets?: () => void;
  onOpenQuiz?: () => void;
};

const Grammar: React.FC<GrammarProps> = ({ onGoHome, onOpenWorksheets, onOpenQuiz }) => {
  const [topic, setTopic] = useState<GrammarTopic>('home');
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
        {renderBreadcrumb('विभक्ति-परिचयः · Vibhakti Guide')}
        <VibhaktiGuide
          onGoBack={goBackToShelf}
          onOpenWorksheets={onOpenWorksheets}
          onOpenQuiz={onOpenQuiz}
        />
      </section>
    );
  }

  if (topic === 'linga-vachana') {
    return (
      <section className="grammar-page" aria-label="Gender and Number Guide">
        <header className="grammar-page-header">
          {renderBreadcrumb('लिङ्गं वचनं च · Gender & Number')}
        </header>
        <LingaVachanaGuide
          onOpenWorksheets={onOpenWorksheets}
          onOpenQuiz={onOpenQuiz}
          onGoBack={goBackToShelf}
        />
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

  if (topic === 'science-of-sound') {
    return (
      <section className="grammar-page" aria-label="Sanskrit Science of Sound">
        <header className="grammar-page-header">
          {renderBreadcrumb('ध्वनि-विज्ञानम् · Science of Sound')}
          <h2 className="grammar-title">संस्कृतम् · ध्वनि-विज्ञानम्</h2>
          <p className="grammar-lead">
            The Science of Sound: Neuro-acoustic precision, resonant vibrations, and anatomical vocal science of the Sanskrit language.
          </p>
        </header>

        <div
          style={{
            maxWidth: '850px',
            margin: '0 auto 2rem auto',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '56.25%',
              height: 0,
              background: '#090d16',
            }}
          >
            <iframe
              src="https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0"
              title="Sanskrit: The Science of Sound"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div
            style={{
              padding: '1.25rem 1.5rem',
              background: '#fafaf9',
              borderTop: '1px solid #f0ece1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#1c1917' }}>
                🎥 Masterclass: Sanskrit: The Science of Sound
              </div>
              <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.2rem' }}>
                Curated Documentary by <strong>Conscious Cosmos</strong> · Timestamp: starts at 0:32
              </div>
            </div>
            <a
              href="https://www.youtube.com/watch?v=tkvYjNZSsZA&t=32s"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#dc2626',
                color: '#ffffff',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              <span>▶ Watch on YouTube</span>
            </a>
          </div>
        </div>

        <article className="grammar-article" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <h3 className="grammar-article-subheading">🧠 Key Concepts Explored in this Documentary</h3>
          <ul className="grammar-article-list">
            <li>
              <strong>The 5 Anatomical Vocal Points (उच्चारण-स्थानानि):</strong> Sanskrit organizes letters geometrically along the human vocal tract from back to front: Kaṇṭhya (कण्ठ्य - Throat), Tālavya (तालव्य - Palate), Mūrdhanya (मूर्धन्य - Roof of mouth), Dantya (दन्त्य - Teeth), and Oṣṭhya (ओष्ठ्य - Lips).
            </li>
            <li>
              <strong>Effort and Breath Dynamics (आभ्यन्तर-प्रयत्न):</strong> How internal aspiration (alpaprāṇa vs. mahāprāṇa) and voicing (ghoṣa vs. aghoṣa) stimulate distinct neurological pathways.
            </li>
            <li>
              <strong>Acoustic Resonance &amp; Cymatics:</strong> The physical geometric vibrations created by Sanskrit frequencies and why ancient mantras follow exact mathematical harmonics.
            </li>
          </ul>

          <footer className="grammar-article-footer">
            <button type="button" className="grammar-back grammar-footer-btn" onClick={goBackToShelf}>
              ← Back to All Grammar Articles
            </button>
            {onGoHome && (
              <button type="button" className="grammar-home grammar-footer-btn" onClick={onGoHome}>
                ← Return to Deepakam Lessons
              </button>
            )}
          </footer>
        </article>
      </section>
    );
  }

  if (topic === 'dhatupatha') {
    return (
      <section className="grammar-page" aria-label="Pāṇinian Dhātupāṭha Studio">
        <header className="grammar-page-header">
          {renderBreadcrumb('पाणिनीय-धातुपाठ-प्रयोगशाला (Pāṇinian Studio)')}
        </header>
        <PaninianStudio onGoBack={goBackToShelf} />
      </section>
    );
  }

  if (topic === 'numbers') {
    return (
      <section className="grammar-page" aria-label="Sanskrit Numbers Masterclass">
        <header className="grammar-page-header">
          {renderBreadcrumb('संख्या-परिचयः (Numbers Masterclass)')}
        </header>
        <NumbersGuide />
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
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          style={{ borderColor: '#059669', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}
          onClick={() => setTopic('vibhakti')}
        >
          <span className="grammar-card-title" style={{ color: '#047857' }}>
            🏛️ विभक्ति · Vibhakti Guide
          </span>
          <span className="grammar-card-blurb">
            Understand all 8 Sanskrit noun cases, kāraka roles, suffixes, sentences, and memory trick with Bālaka.
          </span>
        </button>
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          style={{ borderColor: '#0f766e', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)' }}
          onClick={() => setTopic('dhatupatha')}
        >
          <span className="grammar-card-title" style={{ color: '#0f766e' }}>
            🌿 पाणिनीय-धातुपाठ-प्रयोगशाला · Pāṇinian Studio
          </span>
          <span className="grammar-card-blurb">
            Deconstruct words (गत्वा, पठितुम्), generate 5-Lakāra conjugations with color-coded formulas, and practice Pratyayas.
          </span>
        </button>
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          style={{ borderColor: '#d97706', background: 'linear-gradient(180deg, #ffffff 0%, #fffdf8 100%)' }}
          onClick={() => setTopic('linga-vachana')}
        >
          <span className="grammar-card-title" style={{ color: '#b45309' }}>
            ⚖️ लिङ्गं वचनं च · Gender &amp; Number
          </span>
          <span className="grammar-card-blurb">
            Master the 3 Genders, 3 Numbers, Pronouns, and Subject-Verb agreement with interactive tools.
          </span>
        </button>
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          style={{ borderColor: '#2563eb', background: 'linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)' }}
          onClick={() => setTopic('numbers')}
        >
          <span className="grammar-card-title" style={{ color: '#1d4ed8' }}>
            🔢 संख्या-परिचयः · Numbers Masterclass
          </span>
          <span className="grammar-card-blurb">
            Complete 1-100 numerals, 1-4 gender declensions (एकः, एका, एकम्), ordinals (प्रथम, द्वितीय), Vedic scales up to 10¹⁷, and quizzes.
          </span>
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
        <button
          type="button"
          className="grammar-card grammar-card--ready"
          style={{ borderColor: '#8b5cf6', background: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)' }}
          onClick={() => setTopic('science-of-sound')}
        >
          <span className="grammar-card-title" style={{ color: '#7c3aed' }}>
            🎥 Sanskrit: The Science of Sound · ध्वनि-विज्ञानम्
          </span>
          <span className="grammar-card-blurb">
            Masterclass Video: Explore the neuro-acoustic precision, 5 vocal articulation points, and resonant frequencies of Sanskrit.
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
