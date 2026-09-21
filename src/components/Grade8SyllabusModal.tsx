import React, { useState, useMemo, useEffect } from 'react';
import { GRADE_8_SYLLABUS, type Grade8Chapter } from '../data/grade8Syllabus';
import { useAuthStore } from '../store/authStore';
import '../styles/grade8-syllabus.css';

interface Grade8SyllabusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson?: (lessonId: string) => void;
}

type FilterCategory = 'all' | 'shlokas' | 'stories' | 'dialogue' | 'grammar' | 'preface';

export const Grade8SyllabusModal: React.FC<Grade8SyllabusModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  const { isAdminLoggedIn } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Web Speech API for Sanskrit pronunciation
  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (speakingId === id) {
      setSpeakingId(null);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN'; // Devanagari phonology
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const filteredChapters = useMemo(() => {
    return GRADE_8_SYLLABUS.filter((ch: Grade8Chapter) => {
      const matchesCategory = activeCategory === 'all' || ch.category === activeCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        ch.title.toLowerCase().includes(q) ||
        ch.englishTitle.toLowerCase().includes(q) ||
        ch.chNumber.toLowerCase().includes(q) ||
        ch.page.toLowerCase().includes(q) ||
        ch.theme.toLowerCase().includes(q) ||
        ch.grammarFocus.toLowerCase().includes(q) ||
        (ch.sampleVerse && ch.sampleVerse.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      all: GRADE_8_SYLLABUS.length,
      shlokas: 0,
      stories: 0,
      dialogue: 0,
      grammar: 0,
      preface: 0,
    };
    GRADE_8_SYLLABUS.forEach((ch) => {
      if (counts[ch.category] !== undefined) {
        counts[ch.category]++;
      }
    });
    return counts;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="g8-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="g8-title">
      <div className="g8-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="g8-modal-header">
          <div className="g8-modal-title-box">
            <span className="g8-badge-grade">अष्टमकक्षा-पाठ्यक्रमः · NCERT / CBSE Class 8</span>
            <h2 id="g8-title">
              <span>📜</span> पाठानुक्रमणिका (Table of Contents)
            </h2>
            <p>
              Complete index of all 13 textbook chapters, introductory prayers, and grammatical appendices with exact page references.
            </p>
          </div>
          <button
            type="button"
            className="g8-modal-close-btn"
            onClick={onClose}
            title="Close index (Esc)"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Stats Summary Row */}
        <div className="g8-stats-row">
          <div className="g8-stat-chip">
            <span>📚</span>
            <span><strong>18</strong> Total Modules</span>
          </div>
          <div className="g8-stat-chip">
            <span>📖</span>
            <span><strong>13</strong> Core Lessons</span>
          </div>
          <div className="g8-stat-chip">
            <span>📐</span>
            <span><strong>3</strong> Grammar Appendices</span>
          </div>
          <div className="g8-stat-chip">
            <span>📄</span>
            <span><strong>Page iii to 173</strong> References</span>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="g8-controls-bar">
          <input
            type="text"
            className="g8-search-input"
            placeholder="🔍 Search chapter title, page number, grammar topic (e.g. डिजिभारतम्, Page 49, सङ्ख्याशब्दाः)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search Grade 8 Syllabus"
          />

          <div className="g8-filters">
            {(
              [
                { id: 'all', label: 'सर्वम् · All' },
                { id: 'shlokas', label: 'श्लोकाः · Shlokas' },
                { id: 'stories', label: 'कथाः · Stories' },
                { id: 'dialogue', label: 'सम्भाषणम् · Dialogues' },
                { id: 'grammar', label: 'व्याकरणम् · Grammar' },
                { id: 'preface', label: 'प्रस्तावना · Preface' },
              ] as { id: FilterCategory; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`g8-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(tab.id)}
              >
                {tab.label} <span className="g8-filter-count">({categoryCounts[tab.id]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body / Chapter Cards */}
        <div className="g8-modal-body">
          {!isAdminLoggedIn && (
            <div className="g8-upcoming-overlay-note" role="status">
              <strong>UPCOMING · शीघ्रम्</strong>
              <span>
                Class 8 Sanskrit is coming soon for students. Chapter cards below are a syllabus preview only — lessons are not yet open.
              </span>
            </div>
          )}
          {filteredChapters.length === 0 ? (
            <div className="g8-empty-state">
              <span style={{ fontSize: '2.5rem' }}>🔍</span>
              <p style={{ fontWeight: 700, margin: '0.5rem 0 0.25rem', color: '#334155' }}>No entries found</p>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 1rem' }}>
                No chapter matches your query "{searchQuery}".
              </p>
              <button
                type="button"
                className="g8-filter-btn active"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredChapters.map((ch) => {
              const isAvailable =
                isAdminLoggedIn && (ch.status === 'available' || ch.id.startsWith('grade8_'));
              const isSpeaking = speakingId === ch.id;
              const isVerseSpeaking = speakingId === `${ch.id}_verse`;

              return (
                <div
                  key={ch.id}
                  className={`g8-chapter-card ${isAvailable ? 'highlight' : ''}`}
                >
                  <div className="g8-card-top-row">
                    <div className="g8-card-badges">
                      <span className="g8-ch-num-badge">
                        {ch.icon} {ch.chNumber}
                      </span>
                      <span className="g8-ch-page-badge">
                        📄 {ch.page}
                      </span>
                      <span className="g8-ch-genre-badge">{ch.genreBadge}</span>
                    </div>

                    <div className="g8-card-status">
                      {isAvailable ? (
                        <span className="g8-status-pill ready">✅ Available in App</span>
                      ) : (
                        <span className="g8-status-pill syllabus">
                          {isAdminLoggedIn ? '📚 In Syllabus' : '⏳ UPCOMING · शीघ्रम्'}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="g8-card-title-row">
                    <h3 className="g8-card-title-sa">{ch.title}</h3>
                    <button
                      type="button"
                      className="g8-audio-icon-btn"
                      onClick={() => speakText(ch.id, ch.title)}
                      title={isSpeaking ? 'Stop pronunciation' : 'Listen to Sanskrit pronunciation'}
                      aria-label={`Pronounce ${ch.title}`}
                    >
                      {isSpeaking ? '⏹️ Playing' : '🔊 Pronounce'}
                    </button>
                  </div>
                  <div className="g8-card-title-en">{ch.englishTitle}</div>

                  <div className="g8-card-theme">{ch.theme}</div>

                  {ch.sampleVerse && (
                    <div className="g8-card-verse-box">
                      <div className="g8-verse-inner-header">
                        <span className="g8-verse-heading">✨ श्लोक-पंक्तिः / Sample Verse</span>
                        <button
                          type="button"
                          className="g8-verse-audio-btn"
                          onClick={() => speakText(`${ch.id}_verse`, ch.sampleVerse!)}
                          title="Listen to sample verse"
                        >
                          {isVerseSpeaking ? '⏹️ Stop' : '🔊 Chanting Audio'}
                        </button>
                      </div>
                      <div className="g8-verse-text">{ch.sampleVerse}</div>
                    </div>
                  )}

                  <div className="g8-card-grammar-box">
                    <strong>📌 व्याकरण-केन्द्रम् (Grammar Focus):</strong> {ch.grammarFocus}
                  </div>

                  <div className="g8-card-action-row">
                    {isAvailable ? (
                      <button
                        type="button"
                        className="g8-action-btn-primary"
                        onClick={() => {
                          onClose();
                          if (onSelectLesson) {
                            onSelectLesson(ch.id);
                          }
                        }}
                      >
                        📖 Open Interactive Lesson ➔
                      </button>
                    ) : (
                      <span className="g8-card-ref-label">
                        {isAdminLoggedIn
                          ? `NCERT Prescribed Text · ${ch.page}`
                          : 'Coming soon · Class 8 content is being prepared'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="g8-modal-footer">
          <span className="g8-modal-footer-note">
            💡 Tap 🔊 to listen to authentic Sanskrit pronunciation for every chapter title and verse.
          </span>
          <button type="button" className="g8-filter-btn active" onClick={onClose}>
            Close Index
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grade8SyllabusModal;
