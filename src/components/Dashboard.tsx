import React, { useState, useEffect } from 'react';
import TextbookReader from './TextbookReader';
import WordAnalyzerCard, { type WordSelection } from './WordAnalyzerCard';
import VibhaktiGuideModal from './VibhaktiGuideModal';
import Board from './Board';
import { LESSONS as STATIC_LESSONS, fetchLatestChapters } from '../data/chapters';
import { playPronunciation } from '../utils/pronunciation';
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  const [lessons, setLessons] = useState(STATIC_LESSONS);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordSelection, setWordSelection] = useState<WordSelection | null>(null);
  const [isVibhaktiGuideOpen, setIsVibhaktiGuideOpen] = useState(false);
  const [activeView, setActiveView] = useState<'board' | 'reader' | 'analyzer'>('board');

  // Cache-busted refetch on mount so freshly regenerated chapters.json content
  // (varṇamālā guide + Chapter 1) shows up without a hard reload.
  useEffect(() => {
    let cancelled = false;
    fetchLatestChapters()
      .then((fresh) => {
        if (!cancelled && fresh.length > 0) setLessons(fresh);
      })
      .catch(() => {
        // Keep the statically bundled lessons if the runtime fetch fails.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const lesson = lessons[lessonIndex];
  const sentence = lesson?.sentences[sentenceIndex];
  const isFirstSentence = lessonIndex === 0 && sentenceIndex === 0;
  const isLastSentence =
    lessonIndex === lessons.length - 1 && sentenceIndex === lesson.sentences.length - 1;

  // Every word in a paragraph block is clickable: it speaks the word aloud and populates the analyzer card.
  const handleWordClick = (word: string) => {
    playPronunciation(word);
    localStorage.setItem('last-stem', word);
    setWordSelection({ text: word, nonce: Date.now() });
  };

  // Switching lessons resets the sentence loop to item 0 and flushes the analyzer card
  const handleSelectLesson = (nextLessonId: string) => {
    const nextIndex = lessons.findIndex((item) => item.id === nextLessonId);
    if (nextIndex === -1) return;
    setLessonIndex(nextIndex);
    setSentenceIndex(0);
    setWordSelection(null);
  };

  // Next/Previous always reset the analyzer's word selection state
  const goNext = () => {
    if (sentenceIndex < lesson.sentences.length - 1) {
      setSentenceIndex(sentenceIndex + 1);
    } else if (lessonIndex < lessons.length - 1) {
      // Seamlessly transition into the next lesson once the active one is finished
      setLessonIndex(lessonIndex + 1);
      setSentenceIndex(0);
    }
    setWordSelection(null);
  };

  const goPrevious = () => {
    if (sentenceIndex > 0) {
      setSentenceIndex(sentenceIndex - 1);
    } else if (lessonIndex > 0) {
      const previousLesson = lessons[lessonIndex - 1];
      setLessonIndex(lessonIndex - 1);
      setSentenceIndex(previousLesson.sentences.length - 1);
    }
    setWordSelection(null);
  };

  if (!lesson || !sentence) {
    return <div className="dashboard-empty">No chapter content available.</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">🕉️ Sanskrit Learning</h1>
        <nav className="dashboard-nav" aria-label="Main learning views">
          <button className={activeView === 'board' ? 'active' : ''} onClick={() => setActiveView('board')}>Board</button>
          <button className={activeView === 'reader' ? 'active' : ''} onClick={() => setActiveView('reader')}>Deepakam</button>
          <button className={activeView === 'analyzer' ? 'active' : ''} onClick={() => setActiveView('analyzer')}>Analyse</button>
        </nav>
        <button
          type="button"
          className="vibhakti-guide-trigger"
          onClick={() => setIsVibhaktiGuideOpen(true)}
          aria-haspopup="dialog"
        >
          <span aria-hidden="true">ℹ️</span> Vibhakti Guide
        </button>
      </header>

      {activeView === 'board' && <Board />}
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
        isFirstSentence={isFirstSentence}
        isLastSentence={isLastSentence}
      />}
      {activeView !== 'board' && <WordAnalyzerCard selection={wordSelection} />}

      <VibhaktiGuideModal
        isOpen={isVibhaktiGuideOpen}
        onClose={() => setIsVibhaktiGuideOpen(false)}
      />
    </div>
  );
};

export default Dashboard;

