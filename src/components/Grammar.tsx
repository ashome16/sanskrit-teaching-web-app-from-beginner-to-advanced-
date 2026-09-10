import React, { useEffect, useState } from 'react';
import { VIBHAKTI_CASES } from '../data/vibhakti';
import { parseArticle, type ParsedArticle } from '../utils/articleParser';
import ConjunctGames from './ConjunctGames';
import '../styles/grammar.css';

type GrammarTopic = 'home' | 'vibhakti' | 'samyukta' | 'article';

const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());

const Grammar: React.FC = () => {
  const [topic, setTopic] = useState<GrammarTopic>('home');
  const [selectedCase, setSelectedCase] = useState(1);
  const [article, setArticle] = useState<ParsedArticle | null>(null);
  const [articleError, setArticleError] = useState(false);

  useEffect(() => {
    if (topic === 'article' && !article && !articleError) {
      fetchText('grammar/article.txt')
        .then((text) => setArticle(parseArticle(text)))
        .catch(() => setArticleError(true));
    }
  }, [topic, article, articleError]);

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

  if (topic === 'samyukta') {
    return (
      <section className="grammar-page" aria-label="Conjunct games">
        <header className="grammar-page-header">
          <button type="button" className="grammar-back" onClick={() => setTopic('home')}>
            ← Grammar
          </button>
          <h2 className="grammar-title">संयुक्त · Conjunct Games</h2>
          <p className="grammar-lead">
            Three playground posters. Tap a game title to open or close its picture.
          </p>
        </header>
        <ConjunctGames />
      </section>
    );
  }

  if (topic === 'article') {
    return (
      <section className="grammar-page" aria-label="Grammar article">
        <header className="grammar-page-header">
          <button type="button" className="grammar-back" onClick={() => setTopic('home')}>
            ← Grammar
          </button>
          <h2 className="grammar-title">{article ? article.title : 'Loading…'}</h2>
          {article?.subtitle && <p className="grammar-lead">{article.subtitle}</p>}
        </header>
        {articleError && (
          <p className="grammar-lead">
            Could not load the article. Make sure public/grammar/article.txt exists.
          </p>
        )}
        {article && (
          <article className="grammar-article">
            {article.blocks.map((block, index) => {
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
              return (
                <p className="grammar-article-paragraph" key={index}>
                  {block.text}
                </p>
              );
            })}
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
          <span className="grammar-card-kicker">Ready</span>
          <span className="grammar-card-title">विभक्ति · Vibhakti</span>
          <span className="grammar-card-blurb">Seven noun cases — who does what to whom.</span>
        </button>
        <button type="button" className="grammar-card grammar-card--ready" onClick={() => setTopic('samyukta')}>
          <span className="grammar-card-kicker">Ready</span>
          <span className="grammar-card-title">संयुक्त · Conjunct Games</span>
          <span className="grammar-card-blurb">Drop the stick, piggyback, shape-shifters — how letters join.</span>
        </button>
        <button type="button" className="grammar-card grammar-card--ready" onClick={() => setTopic('article')}>
          <span className="grammar-card-kicker">Ready</span>
          <span className="grammar-card-title">📖 The Evolution of Sound</span>
          <span className="grammar-card-blurb">
            From Vedic mantra to modern linguistics — why Sanskrit grammar matters.
          </span>
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
      Claude finished the response
      Thought for 7s
      Good news — looking at your screenshots, these are actually two different files, not duplicates:
      
      articleParser.ts (image 2) — looks perfect, correctly pasted with the parseArticle function.
      Grammar.tsx (image 1) — this one still has the old content. Notice line 6 says type GrammarTopic = 'home' | 'vibhakti' | 'samyukta'; — it's missing 'article', and there's no article-loading code. This hasn't been replaced yet, which is probably why it looked the same as before.
      So the fix is: you still need to replace Grammar.tsx's content with the new version. Here's how:
      
      Select all and delete the old content
      You're already on the Grammar.tsx tab in the editor. Click anywhere inside the code, then press Cmd+A to select everything, then Delete/Backspace to clear it.
      1
      2
      3
      Want me to resend the Grammar.tsx file now so it's easy to grab?
      
      so am i done
      
      Thought for 1s
      Not quite yet — here's where things stand:
      
      ✅ public/grammar/article.txt — updated with the structured format
      ✅ src/utils/articleParser.ts — correctly pasted
      ❌ src/components/Grammar.tsx — still has the old content, not yet replaced
      ❌ Nothing committed/pushed to GitHub yet
      Two things left:
      
      Replace Grammar.tsx
      In your Grammar.tsx tab, select all (Cmd+A), delete, then paste in the new Grammar.tsx content and save (Cmd+S).
      1
      2
      Want me to resend the Grammar.tsx content now so it's handy to paste in?
      
      but you are askingme to repalce grammar ,tsx with same contenat as article.txt
      
      Thought for 2s
      No, they're not the same content at all — let me be really clear about what each file is:
      
      article.txt = just the article's wording (title, headings, paragraphs, bullet lists). Plain human-readable text.
      Grammar.tsx = the actual app code (React/TypeScript) that builds the whole Grammar page — the shelf of cards, the Vibhakti list, the Conjunct Games, AND the part that fetches and displays article.txt. It's code, full of things like import, useState, <button>, etc.
      They look nothing alike. Here's the actual Grammar.tsx code again, freshly generated, so you can compare directly:
      
      Ran a command, shared files
      Open that file — you should see it starts with import React, { useEffect, useState } from 'react'; and is full of code, not the Sanskrit article text. Replace your src/components/Grammar.tsx in VS Code with exactly this.
      
      
      Grammar
      Code·TSX 
      
      Write a message…
      
      
      Claude is AI and can make mistakes.
      
      
      Grammar · TSX
    </section>
  );
};

export default Grammar;
