import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SEARCH_INDEX, type SearchItem, type SearchCategory } from '../data/searchIndex';
import { matchesSearchQuery, stripDiacritics, normalizeSearchText } from '../utils/searchNormalizer';
import '../styles/search-modal.css';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (item: SearchItem) => void;
}

const POPULAR_SUGGESTIONS = [
  'Vidyā (विद्या)',
  'Symbol on top of a (ā)',
  'Ask Bodhi',
  '16 Vedic Sutras',
  '13 Sub-Sutras',
  'Vibhaktis (8 Cases)',
  'Sandhi',
  'Kaṭapayādi (ϕ & π)',
  'Dhātupāṭha',
  'Class 7 & 8 Deepakam',
];

const RECENT_SEARCHES_KEY = 'gurukul_recent_searches_v1';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveCategory('all');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  const saveRecentSearch = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== text);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const clearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {}
  };

  // Filter & Rank results
  const filteredResults = useMemo(() => {
    const q = query.trim();
    if (!q) {
      if (activeCategory === 'all') return SEARCH_INDEX;
      return SEARCH_INDEX.filter((item) => item.category === activeCategory);
    }

    return SEARCH_INDEX.filter((item) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'grammar' && item.category !== 'grammar') return false;
        if (activeCategory === 'lessons' && item.category !== 'lessons') return false;
        if (activeCategory === 'maths' && item.category !== 'maths') return false;
        if (activeCategory === 'tools' && item.category !== 'tools') return false;
        if (activeCategory === 'guides' && item.category !== 'guides') return false;
      }

      // Text search matching against title, subtitle, description, keywords, category
      const targetString = [
        item.title,
        item.subtitle || '',
        item.description,
        item.categoryLabel,
        ...item.keywords,
      ].join(' ');

      return matchesSearchQuery(targetString, q);
    }).sort((a, b) => {
      const qNorm = normalizeSearchText(q);
      const aTitleNorm = normalizeSearchText(a.title);
      const bTitleNorm = normalizeSearchText(b.title);

      const aTitleMatch = aTitleNorm.includes(qNorm) ? 2 : 0;
      const bTitleMatch = bTitleNorm.includes(qNorm) ? 2 : 0;
      return bTitleMatch - aTitleMatch;
    });
  }, [query, activeCategory]);

  // Keep selected index in bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Handle keyboard navigation inside the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : Math.max(0, filteredResults.length - 1)
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults.length > 0 && selectedIndex < filteredResults.length) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const container = resultsContainerRef.current;
    if (!container) return;
    const activeEl = container.querySelector('.search-result-card--active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const handleSelectItem = (item: SearchItem) => {
    saveRecentSearch(query || item.title);
    onNavigate(item);
    onClose();
  };

  const handleSuggestionClick = (suggestion: string) => {
    // Strip parenthetical for clean query
    const cleaned = suggestion.replace(/\(.*?\)/g, '').trim();
    setQuery(cleaned);
    inputRef.current?.focus();
  };

  /** Helper to highlight matched substring */
  const renderHighlighted = (text: string, searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) return text;

    const rawTokens = q.split(/\s+/).filter((t) => t.length > 0);
    if (rawTokens.length === 0) return text;

    const buildFuzzyRegexPattern = (token: string) => {
      const clean = stripDiacritics(token).toLowerCase();
      let pat = '';
      for (const ch of clean) {
        if (ch === 'a') pat += '[aāAĀ]';
        else if (ch === 'i') pat += '[iīIĪ]';
        else if (ch === 'u') pat += '[uūUŪ]';
        else if (ch === 'r') pat += '[rṛṝRṚṜ]';
        else if (ch === 'l') pat += '[lḷḹLḶḸ]';
        else if (ch === 'n') pat += '[nṅñṇNṄÑṆ]';
        else if (ch === 't') pat += '[tṭTṬ]';
        else if (ch === 'd') pat += '[dḍDḌ]';
        else if (ch === 's') pat += '[sśṣSŚṢ]';
        else if (ch === 'h') pat += '[hḥHḤ]';
        else if (ch === 'm') pat += '[mṃṁMṂṀ]';
        else pat += ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      return pat;
    };

    const patterns = rawTokens.map(buildFuzzyRegexPattern).filter(Boolean);
    if (patterns.length === 0) return text;

    try {
      const regex = new RegExp(`(${patterns.join('|')})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="search-highlight">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="search-modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="search-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Search Gurukul Articles and Lessons"
        onKeyDown={handleKeyDown}
      >
        {/* Modal Search Header Bar */}
        <header className="search-modal-header">
          <div className="search-input-wrapper">
            <span className="search-input-icon" aria-hidden="true">
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              className="search-main-input"
              placeholder="Search Kaṭapayādi, Golden Ratio, Vibhakti, 16 Sutras, Sandhi, chapters, tools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search articles, grammar and lessons"
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                title="Clear query"
                aria-label="Clear query"
              >
                ✕
              </button>
            )}
          </div>
          <button
            type="button"
            className="search-modal-close-btn"
            onClick={onClose}
            title="Close search (Esc)"
            aria-label="Close search"
          >
            ✕
          </button>
        </header>

        {/* Category Filter Pills */}
        <nav className="search-category-nav" aria-label="Filter search by category">
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'all' ? ' active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All Results
          </button>
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'grammar' ? ' active' : ''}`}
            onClick={() => setActiveCategory('grammar')}
          >
            📖 Articles &amp; Grammar
          </button>
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'lessons' ? ' active' : ''}`}
            onClick={() => setActiveCategory('lessons')}
          >
            📚 Deepakam Lessons
          </button>
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'maths' ? ' active' : ''}`}
            onClick={() => setActiveCategory('maths')}
          >
            📐 Vedic Maths
          </button>
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'tools' ? ' active' : ''}`}
            onClick={() => setActiveCategory('tools')}
          >
            🧩 Tools &amp; Quizzes
          </button>
          <button
            type="button"
            className={`search-cat-pill${activeCategory === 'guides' ? ' active' : ''}`}
            onClick={() => setActiveCategory('guides')}
          >
            📜 Guides &amp; Darśana
          </button>
        </nav>

        {/* Quick Suggestion Chips & Recent Searches when query is short/empty */}
        {!query.trim() && (
          <div className="search-overview-section">
            {recentSearches.length > 0 && (
              <div className="search-recent-block">
                <div className="search-recent-header">
                  <span className="search-section-label">🕒 Recent Searches</span>
                  <button
                    type="button"
                    className="search-recent-clear-all"
                    onClick={clearAllRecent}
                  >
                    Clear history
                  </button>
                </div>
                <div className="search-recent-pills">
                  {recentSearches.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="search-recent-pill"
                      onClick={() => {
                        setQuery(item);
                        inputRef.current?.focus();
                      }}
                    >
                      <span className="search-recent-text">{item}</span>
                      <span
                        className="search-recent-remove"
                        onClick={(e) => removeRecentSearch(e, item)}
                        title="Remove from history"
                      >
                        ✕
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="search-popular-block">
              <span className="search-section-label">⚡ Popular Topics &amp; Shortcuts</span>
              <div className="search-popular-chips">
                {POPULAR_SUGGESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="search-popular-chip"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Container */}
        <div className="search-results-list" ref={resultsContainerRef}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  className={`search-result-card${isSelected ? ' search-result-card--active' : ''}`}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-selected={isSelected}
                >
                  <div className="search-result-left-col">
                    <span
                      className="search-result-badge-pill"
                      style={{
                        backgroundColor: `${item.badgeColor}15`,
                        color: item.badgeColor,
                        borderColor: `${item.badgeColor}40`,
                      }}
                    >
                      <span className="search-result-badge-emoji">{item.badgeEmoji}</span>
                      <span>{item.categoryLabel}</span>
                    </span>
                    <h4 className="search-result-title">
                      {renderHighlighted(item.title, query)}
                    </h4>
                    {item.subtitle && (
                      <p className="search-result-subtitle">
                        {renderHighlighted(item.subtitle, query)}
                      </p>
                    )}
                    <p className="search-result-desc">
                      {renderHighlighted(item.description, query)}
                    </p>
                  </div>
                  <div className="search-result-right-col">
                    <span className="search-result-action-hint">
                      Open →
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="search-empty-state">
              <span className="search-empty-emoji" aria-hidden="true">
                🔍
              </span>
              <h4 className="search-empty-title">No matching topics found</h4>
              <p className="search-empty-text">
                We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try searching for &ldquo;Kaṭapayādi&rdquo;, &ldquo;Vibhakti&rdquo;, &ldquo;Sandhi&rdquo;, &ldquo;Vedic Maths&rdquo;, &ldquo;Class 7&rdquo;, or &ldquo;Dhātupāṭha&rdquo;.
              </p>
              <div className="search-empty-suggestions">
                <button
                  type="button"
                  className="search-popular-chip"
                  onClick={() => setQuery('Kaṭapayādi')}
                >
                  Explore Kaṭapayādi (ϕ &amp; π)
                </button>
                <button
                  type="button"
                  className="search-popular-chip"
                  onClick={() => setQuery('Vibhakti')}
                >
                  Explore Vibhakti Cases
                </button>
                <button
                  type="button"
                  className="search-popular-chip"
                  onClick={() => setQuery('Vedic Maths')}
                >
                  16 Vedic Maths Sūtras
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Keybinding Hints */}
        <footer className="search-modal-footer">
          <div className="search-footer-shortcuts">
            <span className="search-footer-kbd-item">
              <kbd>↑</kbd> <kbd>↓</kbd> to navigate
            </span>
            <span className="search-footer-kbd-item">
              <kbd>↵</kbd> to open
            </span>
            <span className="search-footer-kbd-item">
              <kbd>ESC</kbd> to close
            </span>
          </div>
          <div className="search-footer-total-count">
            {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} available
          </div>
        </footer>
      </div>
    </div>
  );
};

export default GlobalSearchModal;
