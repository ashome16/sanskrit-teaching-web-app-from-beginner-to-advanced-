import React, { useState, useEffect } from 'react';
import TextbookReader from './TextbookReader';
import WordAnalyzerCard, { type WordSelection } from './WordAnalyzerCard';
import Board from './Board';
import Grammar from './Grammar';
import { LESSONS as STATIC_LESSONS, fetchLatestChapters } from '../data/chapters';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/dashboard.css';

/** Conjunct Games live under Grammar now — keep out of Deepakam nav. */
const HIDDEN_DEEPAKAM_IDS = new Set(['samyukta']);

const firstDeepakamIndex = (lessons: typeof STATIC_LESSONS): number => {
  const gsde101 = lessons.findIndex((item) => item.id === 'gsde101');
  if (gsde101 >= 0) return gsde101;
  const gsde = lessons.findIndex((item) => item.id.startsWith('gsde'));
  return gsde >= 0 ? gsde : 0;
};

const Dashboard: React.FC = () => {
  const [lessons, setLessons] = useState(STATIC_LESSONS);
  const [lessonIndex, setLessonIndex] = useState(() => {
    const saved = localStorage.getItem('school-lesson-id');
    if (saved && !HIDDEN_DEEPAKAM_IDS.has(saved)) {
      const idx = STATIC_LESSONS.findIndex((item) => item.id === saved);
      if (idx >= 0) return idx;
    }
    const varna = STATIC_LESSONS.findIndex((item) => item.id === 'varnamala');
    return varna >= 0 ? varna : 0;
  });
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordSelection, setWordSelection] = useState<WordSelection | null>(null);
  const [activeView, setActiveView] = useState<'board' | 'reader' | 'grammar'>('reader');

  useEffect(() => {
    localStorage.setItem('school-active-view', activeView);
  }, [activeView]);

  useEffect(() => {
    const id = lessons[lessonIndex]?.id;
    if (id && !HIDDEN_DEEPAKAM_IDS.has(id)) {
      localStorage.setItem('school-lesson-id', id);
    }
  }, [lessonIndex, lessons]);

  // If a stale save still points at samyukta, bounce to Chapter 1.
  useEffect(() => {
    const id = lessons[lessonIndex]?.id;
    if (!id || !HIDDEN_DEEPAKAM_IDS.has(id)) return;
    const fallback = firstDeepakamIndex(lessons);
    setLessonIndex(fallback);
    setSentenceIndex(0);
    setWordSelection(null);
  }, [lessonIndex, lessons]);

  useEffect(() => {
    let cancelled = false;
    fetchLatestChapters()
      .then((fresh) => {
        if (!cancelled && fresh.length > 0) setLessons(fresh);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const findNextVisibleLesson = (from: number, direction: 1 | -1): number => {
    let i = from + direction;
    while (i >= 0 && i < lessons.length) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
      i += direction;
    }
    return from;
  };

  const lesson = lessons[lessonIndex];
  const sentence = lesson?.sentences[sentenceIndex];
  const isFirstSentence = lessonIndex === 0 && sentenceIndex === 0;
  const lastVisible = (() => {
    for (let i = lessons.length - 1; i >= 0; i -= 1) {
      if (!HIDDEN_DEEPAKAM_IDS.has(lessons[i]?.id)) return i;
    }
    return lessons.length - 1;
  })();
  const isLastSentence =
    lessonIndex === lastVisible && sentenceIndex === (lesson?.sentences.length ?? 1) - 1;

  const handleWordClick = (word: string) => {
    playPronunciation(word);
    localStorage.setItem('last-stem', word);
    setWordSelection({ text: word, nonce: Date.now() });
  };

  const handleSelectLesson = (nextLessonId: string) => {
    if (HIDDEN_DEEPAKAM_IDS.has(nextLessonId)) return;
    const nextIndex = lessons.findIndex((item) => item.id === nextLessonId);
    if (nextIndex === -1) return;
    setLessonIndex(nextIndex);
    setSentenceIndex(0);
    setWordSelection(null);
  };

  const goNext = () => {
    if (sentenceIndex < lesson.sentences.length - 1) {
      setSentenceIndex(sentenceIndex + 1);
    } else {
      const next = findNextVisibleLesson(lessonIndex, 1);
      if (next !== lessonIndex) {
        setLessonIndex(next);
        setSentenceIndex(0);
      }
    }
    setWordSelection(null);
  };

  const goPrevious = () => {
    if (sentenceIndex > 0) {
      setSentenceIndex(sentenceIndex - 1);
    } else {
      const prev = findNextVisibleLesson(lessonIndex, -1);
      if (prev !== lessonIndex) {
        setLessonIndex(prev);
        setSentenceIndex(lessons[prev].sentences.length - 1);
      }
    }
    setWordSelection(null);
  };

  const jumpToSentence = (index: number) => {
    if (!lesson?.sentences?.length) return;
    const clamped = Math.max(0, Math.min(index, lesson.sentences.length - 1));
    setSentenceIndex(clamped);
    setWordSelection(null);
  };

  const openVarnamala = () => {
    const idx = lessons.findIndex((item) => item.id === 'varnamala');
    if (idx >= 0) {
      setLessonIndex(idx);
      setSentenceIndex(0);
      setWordSelection(null);
    }
    setActiveView('reader');
  };

  const openDeepakam = () => {
    const current = lessons[lessonIndex];
    const guideIds = new Set(['varnamala', 'barakhadi', 'samyukta', 'numbers']);
    if (!current || guideIds.has(current.id) || HIDDEN_DEEPAKAM_IDS.has(current.id)) {
      const idx = firstDeepakamIndex(lessons);
      if (idx >= 0) {
        setLessonIndex(idx);
        setSentenceIndex(0);
        setWordSelection(null);
      }
    }
    setActiveView('reader');
  };

  if (!lesson || !sentence) {
    return <div className="dashboard-empty">No chapter content available.</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">🕉️ Sanskrit Learning</h1>
        <nav className="dashboard-nav" aria-label="Main learning views">
          <button
            className={activeView === 'reader' && lesson.id === 'varnamala' ? 'active' : ''}
            onClick={openVarnamala}
          >
            Varṇamālā
          </button>
          <button className={activeView === 'board' ? 'active' : ''} onClick={() => setActiveView('board')}>Board</button>
          <div
            className={`dashboard-nav-group${activeView === 'reader' && lesson.id !== 'varnamala' ? ' dashboard-nav-group--active' : ''}`}
          >
            <span className="dashboard-nav-group-label">NCERT Deepakam</span>
            <div className="dashboard-nav-sub" role="group" aria-label="NCERT Deepakam grades">
              <button
                type="button"
                className={activeView === 'reader' && lesson.id !== 'varnamala' ? 'active' : ''}
                onClick={openDeepakam}
              >
                7th · Deepakam
              </button>
              <button type="button" className="dashboard-nav-soon" disabled aria-disabled="true" title="Coming later">
                8th
              </button>
              <button type="button" className="dashboard-nav-soon" disabled aria-disabled="true" title="Coming later">
                9th
              </button>
            </div>
          </div>
          <button
            className={activeView === 'grammar' ? 'active' : ''}
            onClick={() => setActiveView('grammar')}
          >
            Grammar
          </button>
        </nav>
      </header>

      {activeView === 'board' && <Board />}
      {activeView === 'grammar' && <Grammar />}
      {activeView === 'reader' && <TextbookReader
        lessons={lessons}
        activeLessonId={lesson.id}
        onSelectLesson={handleSelectLesson}
        sentence={sentence}
        sentenceNumber={sentenceIndex + 1}
        totalSentences={lesson.sentences.length}
        onWordClick={handleWordClick}
        onNext={goNext}
        onPrevious={goPrevious}
        onJumpToSentence={jumpToSentence}
        isFirstSentence={isFirstSentence}
        isLastSentence={isLastSentence}
      />}
      {activeView === 'reader' && <WordAnalyzerCard selection={wordSelection} />}

    </div>
  );
};

export default Dashboard;
