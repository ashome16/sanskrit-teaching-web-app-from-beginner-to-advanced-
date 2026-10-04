import React, { useState, useMemo, useRef, useEffect, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  SANSKRIT_NUMBERS_1_TO_100,
  GENDER_DECLENSIONS_1_TO_4,
  ORDINAL_NUMBERS_LIST,
  VEDIC_LARGE_NUMBERS,
  DECADE_GROUPS,
  type SanskritNumberItem,
} from '../data/sanskritNumbers';
import { playPronunciation, stopPronunciation, playSequence } from '../utils/pronunciation';
import { BodhiAvatar } from './BodhiAvatar';
import { VedicLearningPath } from './VedicLearningPath';
import '../styles/numbers-guide.css';

interface NumbersGuideProps {
  onSelectWord?: (word: string) => void;
}

type GuideTab = 'grid' | 'gender' | 'ordinals' | 'vedic' | 'rules' | 'quiz';

/**
 * Existing articles on the site about the history of Indian numerals.
 * Clicking dispatches `ednet:open-target` (handled by Dashboard with the same
 * navigation the global search uses); the href is the real page fallback.
 */
interface ReadMoreLink {
  id: string;
  emoji: string;
  title: string;
  blurb: string;
  href: string;
  target: Record<string, string>;
}

const NUMBERS_READ_MORE: ReadMoreLink[] = [
  {
    id: 'zero-grid',
    emoji: '🪐',
    title: 'The Numerical Grid & Zero',
    blurb: 'Vedic Maths · decimal place value and śūnya (zero), and how the system travelled to Europe.',
    href: '/vedic-maths#zero',
    target: { view: 'vedic-maths', vedicAnchor: 'zero' },
  },
  {
    id: 'roots-of-algebra',
    emoji: '🌱',
    title: 'बीजगणितस्य मूलानि · The Roots of Algebra',
    blurb: 'Vedic Maths article · how place value, zero and negative numbers (dhana–ṛṇa) led to the equation and the variable x.',
    href: '/vedic-maths#article-roots-of-algebra',
    target: { view: 'vedic-maths', vedicAnchor: 'article-roots-of-algebra' },
  },
  {
    id: 'before-the-carat',
    emoji: '⚖️',
    title: 'Before the Carat · Seeds, Slate & Ancient Metrology',
    blurb: 'Vedic Maths article · counting in weights: 8 dust motes → … → 80 guñjā seeds to a gold suvarṇa, and binary–decimal Indus weights.',
    href: '/vedic-maths#article-before-the-carat',
    target: { view: 'vedic-maths', vedicAnchor: 'article-before-the-carat' },
  },
  {
    id: 'naming-the-colossal',
    emoji: '🔢',
    title: 'Naming the Colossal · Past a Million',
    blurb: 'Vedic Maths article · named powers of ten in the Vājasaneyi Saṃhitā, the tallakṣaṇa list, and Piṅgala’s prastāra.',
    href: '/vedic-maths#article-naming-the-colossal',
    target: { view: 'vedic-maths', vedicAnchor: 'article-naming-the-colossal' },
  },
  {
    id: 'katapayadi',
    emoji: '🔢',
    title: 'कटपयादि · Kaṭapayādi',
    blurb: 'Article · the letter-number cipher and अङ्कानां वामतो गतिः (digits read right-to-left).',
    href: '/grammar',
    target: { view: 'grammar', grammarTopic: 'article', grammarArticleId: 'katapayadi-number-words' },
  },
  {
    id: 'sunyat-anantam',
    emoji: '🌌',
    title: 'Śūnyāt Anantam (शून्यात् अनन्तम्)',
    blurb: 'Darśana essay · the journey of Gaṇita-śāstra, from zero to infinity.',
    href: '/philosophy',
    target: { view: 'philosophy', philosophyEssay: 'sunyat_anantam' },
  },
  {
    id: 'pingala',
    emoji: '⚡',
    title: 'The Binary Blueprint: Piṅgala',
    blurb: 'Darśana essay · Chandaḥśāstra, laghu (0) & guru (1) and Meru-prastāra.',
    href: '/philosophy',
    target: { view: 'philosophy', philosophyEssay: 'pingala_binary' },
  },
  {
    id: 'lilavati',
    emoji: '📐',
    title: 'The Poetic Equation: Bhāskara’s Līlāvatī',
    blurb: 'Darśana essay · mathematics written as Sanskrit verse.',
    href: '/philosophy',
    target: { view: 'philosophy', philosophyEssay: 'lilavati_math' },
  },
];

/** In-app navigation via Dashboard; falls back to the link's real href when unhandled. */
const openSiteTarget = (event: React.MouseEvent<HTMLAnchorElement>, target: Record<string, string>) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  const detail = { target, handled: false };
  window.dispatchEvent(new CustomEvent('ednet:open-target', { detail }));
  if (detail.handled) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

interface QuizQuestion {
  question: string;
  numeralDev?: string;
  correctWord: string;
  options: string[];
  explanation: string;
}

export const NumbersGuide: React.FC<NumbersGuideProps> = ({ onSelectWord }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('grid');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [composerNumber, setComposerNumber] = useState<number>(24);
  const [playingWord, setPlayingWord] = useState<string | null>(null);
  /** Which ▶ Play all queue is running: 'all', a decade id, 'ordinals' or 'vedic'. */
  const [playingGroup, setPlayingGroup] = useState<string | null>(null);
  const isPlayingAll = playingGroup !== null;
  const stopPlaySequenceRef = useRef<(() => void) | null>(null);
  const guideRef = useRef<HTMLElement | null>(null);

  // Quiz state
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Cleanup audio on unmount. Mark the dashboard so its overflow box does not
  // swallow a fixed Pause bar on phones (same scrollport bug as Dhātupāṭha).
  useEffect(() => {
    const dash = document.querySelector('.dashboard');
    dash?.classList.add('dashboard--numbers');
    return () => {
      dash?.classList.remove('dashboard--numbers');
      stopPlaySequenceRef.current?.();
      stopPronunciation();
    };
  }, []);

  const handleSpeak = (word: string) => {
    stopPlaySequenceRef.current?.();
    stopPlaySequenceRef.current = null;
    resumeRef.current = null;
    setPlayingGroup(null);
    stopPronunciation();

    setPlayingWord(word);
    playPronunciation(word);
    onSelectWord?.(word);

    // Reset visual highlight after 1.2s
    setTimeout(() => {
      setPlayingWord((prev) => (prev === word ? null : prev));
    }, 1200);
  };

  // Filtered 1-100 items
  const filteredNumbers = useMemo(() => {
    return SANSKRIT_NUMBERS_1_TO_100.filter((item) => {
      // Decade filter
      if (selectedDecade !== 'all') {
        if (item.decadeGroup !== selectedDecade) return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const query = searchQuery.trim().toLowerCase();
      const matchVal = item.value.toString().includes(query);
      const matchDev = item.devanagariNumeral.includes(query);
      const matchWord = item.word.includes(query);
      const matchIast = item.iast.toLowerCase().includes(query);
      const matchEn = item.english.toLowerCase().includes(query);
      return matchVal || matchDev || matchWord || matchIast || matchEn;
    });
  }, [selectedDecade, searchQuery]);

  // 1–100 cards grouped into their decade sections (respecting decade filter + search).
  const numberSections = useMemo(
    () =>
      DECADE_GROUPS.filter((group) => group.id !== 'all')
        .map((group) => ({
          ...group,
          items: filteredNumbers.filter((item) => item.decadeGroup === group.id),
        }))
        .filter((group) => group.items.length > 0),
    [filteredNumbers],
  );

  /** Where to resume after Pause. Cleared when the queue finishes or the list changes. */
  const resumeRef = useRef<{ groupId: string; index: number } | null>(null);
  const dockRef = useRef<HTMLDivElement | null>(null);

  /** Cancel a running ▶ Play all (Pause, tab / filter change, unmount). */
  const stopPlayAll = (resetIndex: boolean) => {
    stopPlaySequenceRef.current?.();
    stopPlaySequenceRef.current = null;
    stopPronunciation();
    setPlayingGroup(null);
    setPlayingWord(null);
    if (resetIndex) resumeRef.current = null;
  };

  // ▶ Play all — speaks each word in order through playSequence, which uses the
  // same speakConfigured() pipeline (voice, rate, pitch) as playPronunciation /
  // each card's tap-to-hear. No extra rate is passed. Pause keeps the index.
  const beginGroup = (groupId: string, words: string[], startIndex: number) => {
    stopPlaySequenceRef.current?.();
    stopPlaySequenceRef.current = null;
    stopPronunciation();
    if (!words.length) {
      setPlayingGroup(null);
      setPlayingWord(null);
      resumeRef.current = null;
      return;
    }
    const index = startIndex >= words.length ? 0 : Math.max(0, startIndex);
    const slice = words.slice(index);
    resumeRef.current = { groupId, index };
    setPlayingGroup(groupId);
    setPlayingWord(slice[0] ?? null);
    stopPlaySequenceRef.current = playSequence(slice, {
      gapMs: 600,
      onItem: (word, itemIndex) => {
        // Highlight only. (Calling onSelectWord here would re-speak via the parent
        // and cancel the queue.)
        const abs = index + itemIndex;
        resumeRef.current = { groupId, index: abs };
        setPlayingWord(words[abs] ?? word);
      },
      onDone: () => {
        stopPlaySequenceRef.current = null;
        setPlayingGroup(null);
        setPlayingWord(null);
        resumeRef.current = null;
      },
    });
  };

  const handleTogglePlayGroup = (groupId: string, words: string[]) => {
    if (playingGroup === groupId) {
      stopPlayAll(false);
      return;
    }
    const resume = resumeRef.current;
    const start = resume?.groupId === groupId ? resume.index : 0;
    beginGroup(groupId, words, start);
  };

  const handleTogglePlayAll = () =>
    handleTogglePlayGroup(
      'all',
      filteredNumbers.map((item) => item.word),
    );

  // Changing tab, decade or search mid-playback cancels Play all.
  useEffect(() => {
    if (!stopPlaySequenceRef.current && !resumeRef.current) return;
    stopPlaySequenceRef.current?.();
    stopPlaySequenceRef.current = null;
    stopPronunciation();
    resumeRef.current = null;
    setPlayingGroup(null);
    setPlayingWord(null);
  }, [activeTab, selectedDecade, searchQuery]);

  // Pin Pause under the site header (or the screen top once that header has
  // scrolled away). The button is portaled to document.body: the grammar
  // dashboard is an overflow box, so an in-flow fixed control scrolls off
  // on a phone.
  useLayoutEffect(() => {
    if (!isPlayingAll) return;
    const place = () => {
      const header = document.querySelector<HTMLElement>('.dashboard-header');
      const bottom = header ? header.getBoundingClientRect().bottom : 0;
      const dock = dockRef.current;
      if (!dock) return;
      if (bottom > 8) dock.style.setProperty('--num-stick-top', `${Math.round(bottom)}px`);
      else dock.style.removeProperty('--num-stick-top');
    };
    place();
    const header = document.querySelector('.dashboard-header');
    const observer = header ? new ResizeObserver(place) : null;
    if (header && observer) observer.observe(header);
    window.addEventListener('scroll', place, true);
    window.addEventListener('resize', place);
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', place, true);
      window.removeEventListener('resize', place);
    };
  }, [isPlayingAll, playingGroup]);

  // Keep the number being spoken just below the fixed Pause bar, not under it.
  useEffect(() => {
    if (!isPlayingAll || !playingWord || !guideRef.current) return;
    const el = Array.from(guideRef.current.querySelectorAll<HTMLElement>('[data-play-word]')).find(
      (node) => node.dataset.playWord === playingWord,
    );
    if (!el) return;
    const viewH = window.innerHeight || document.documentElement.clientHeight;
    const dock = dockRef.current;
    const barBottom = dock ? dock.getBoundingClientRect().bottom : 0;
    let portTop = 0;
    let parent: HTMLElement | null = el.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      const scrolls = /(auto|scroll)/.test(style.overflowY) && parent.scrollHeight > parent.clientHeight + 1;
      if (scrolls) {
        portTop = parent.getBoundingClientRect().top;
        break;
      }
      parent = parent.parentElement;
    }
    const topLimit = Math.max(8, barBottom + 12);
    const clearance = Math.max(8, topLimit - portTop);
    el.style.scrollMarginTop = `${Math.round(clearance)}px`;
    const rect = el.getBoundingClientRect();
    const covered = rect.top < topLimit - 4;
    const above = rect.bottom < topLimit;
    const below = rect.top > viewH - 24;
    if (!covered && !above && !below) return;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start', inline: 'nearest' });
  }, [isPlayingAll, playingWord]);

  const renderPlayButton = (
    groupId: string,
    idle: string,
    onClick: () => void,
    opts: { className: string; titleIdle: string; titleActive: string; ariaIdle: string; ariaActive: string; disabled?: boolean },
  ) => {
    const active = playingGroup === groupId;
    const button = (
      <button
        type="button"
        className={`${opts.className}${active ? ` ${opts.className}--playing` : ''}`}
        onClick={onClick}
        aria-pressed={active}
        disabled={!active && !!opts.disabled}
        title={active ? opts.titleActive : opts.titleIdle}
        aria-label={active ? opts.ariaActive : opts.ariaIdle}
      >
        {active ? '⏸ Pause' : idle}
      </button>
    );
    if (!active || typeof document === 'undefined') return button;
    return (
      <>
        <span className="num-play-slot" aria-hidden="true" />
        {createPortal(
          <div ref={dockRef} className="num-playback-dock" role="region" aria-label="Playback">
            {button}
          </div>,
          document.body,
        )}
      </>
    );
  };

  // Quiz questions bank
  const quizQuestions: QuizQuestion[] = useMemo(() => [
    {
      question: 'What is the Sanskrit name for 42 (४२)?',
      numeralDev: '४२',
      correctWord: 'द्विचत्वारिंशत्',
      options: ['द्विचत्वारिंशत्', 'एकचत्वारिंशत्', 'द्विपञ्चाशत्', 'द्वात्रिंशत्'],
      explanation: '४२ is formed by units (द्वि = 2) + tens (चत्वारिंशत् = 40) = द्विचत्वारिंशत्.',
    },
    {
      question: 'How do you say "Three girls" in Sanskrit?',
      numeralDev: '३',
      correctWord: 'तिस्रः बालिकाः',
      options: ['तिस्रः बालिकाः', 'त्रयः बालिकाः', 'त्रीणि बालिकाः', 'त्रयः बालकाः'],
      explanation: 'For the number 3, the feminine form is तिस्रः (e.g. तिस्रः बालिकाः). त्रयः is masculine and त्रीणि is neuter.',
    },
    {
      question: 'What does "एकोनविंशतिः" (ekonaviṁśatiḥ) mean?',
      numeralDev: '१९',
      correctWord: 'Nineteen (20 minus 1)',
      options: ['Nineteen (20 minus 1)', 'Twenty-one', 'Twenty-nine', 'Nine'],
      explanation: 'एक + ऊन + विंशतिः = one less than twenty (19). In Sanskrit it is also called नवदश.',
    },
    {
      question: 'What is 96 (९६) in Sanskrit, and why does it have an unusual spelling?',
      numeralDev: '९६',
      correctWord: 'षण्णवतिः',
      options: ['षण्णवतिः', 'षट्नवतिः', 'षड्विंशतिः', 'सप्तनवतिः'],
      explanation: 'षट् + नवतिः changes into षण्णवतिः because Paninian Anunasika Sandhi turns the retroflex ṭ into the retroflex nasal ṇ before n!',
    },
    {
      question: 'What is the Vedic name for Ten Million / 1 Crore (10⁷)?',
      numeralDev: '१०,०००,०००',
      correctWord: 'कोटिः (Koṭiḥ)',
      options: ['कोटिः (Koṭiḥ)', 'लक्षम् (Lakṣam)', 'अर्बुदम् (Arbudam)', 'सहस्रम् (Sahasram)'],
      explanation: 'कोटिः represents 10⁷ (1,00,00,000 / one crore), appearing famously in the Rāmāyaṇa and Purāṇas.',
    },
    {
      question: 'Which gender forms exist for the number 5 (पञ्च) and above?',
      numeralDev: '५',
      correctWord: 'Uniform in all genders (त्रिषु लिङ्गेषु समानानि)',
      options: [
        'Uniform in all genders (त्रिषु लिङ्गेषु समानानि)',
        'Separate forms for masculine and feminine only',
        'Different in all three genders',
        'Only neuter forms exist',
      ],
      explanation: 'In Sanskrit, only numbers 1 to 4 decline differently by gender. From 5 (पञ्च) onwards, the forms are identical across masculine, feminine, and neuter nouns.',
    },
    {
      question: 'How do you say "First Lesson" using an ordinal number?',
      numeralDev: '१st',
      correctWord: 'प्रथमः पाठः',
      options: ['प्रथमः पाठः', 'एकम् पाठः', 'प्रथमा पाठः', 'प्रथमम् पाठः'],
      explanation: 'Because पाठः is masculine singular, the ordinal must agree in masculine form: प्रथमः पाठः.',
    },
    {
      question: 'What is 84 (८४) in Sanskrit?',
      numeralDev: '८४',
      correctWord: 'चतुरशीतिः',
      options: ['चतुरशीतिः', 'चतुश्चत्वारिंशत्', 'चतुःषष्टिः', 'चतुर्नवतिः'],
      explanation: 'चतुर् (4) + अशीतिः (80) combines seamlessly as चतुरशीतिः (84). Famous as 84 lakh life-forms (चतुरशीतिलक्ष योनि).',
    },
  ], []);

  const currentQ = quizQuestions[currentQIndex % quizQuestions.length];

  const handleSelectQuizAnswer = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
    setQuizTotal((prev) => prev + 1);

    const isCorrect = option === currentQ.correctWord;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      playPronunciation(currentQ.correctWord);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCurrentQIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <section className="num-guide-container" aria-label="Sanskrit Numbers Guide" ref={guideRef}>
      {/* Header */}
      <header className="num-guide-header">
        <div className="num-guide-badge">
          <span>🔢 संख्या-शास्त्रम् · Vedic &amp; Classical Numerals</span>
        </div>
        <h2 className="num-guide-title">
          संस्कृत-संख्या-परिचयः
          <span className="num-guide-subtitle">
            Complete Sanskrit Numbers Guide · 1 to 100, Gender Rules, Ordinals &amp; Large Powers of 10
          </span>
        </h2>
        <p className="num-guide-desc">
          Explore the profound logic of Indian numeration: foundational digits (१-१०), decadal compound
          construction, gender agreement rules for 1–4, ordinal rankings, and cosmological scales up to 10¹⁷.
        </p>

        {/* Bodhi Mascot Banner */}
        <div className="num-bodhi-banner">
          <div className="num-bodhi-avatar-col">
            <BodhiAvatar size="md" mood="scholar" />
          </div>
          <p className="num-bodhi-quote">
            <strong>बोधिः वदति (Bodhi says):</strong> &ldquo;Did you know? In Sanskrit, compound numbers follow
            the golden rule <em>अङ्कानां वामतो गतिः</em> (digits move leftward — units first, tens next!).
            For example, 24 is चतुर् (4) + विंशतिः (20) = <strong>चतुर्विंशतिः</strong>. Click any card to hear
            the authentic classical pronunciation!&rdquo;
          </p>
        </div>
      </header>

      {/* Main Tabs Navigation */}
      <nav className="num-nav-tabs" role="tablist" aria-label="Numbers Guide Modes">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'grid'}
          className={`num-nav-tab${activeTab === 'grid' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('grid')}
        >
          <span>🔢</span>
          <span>१ तः १०० संख्यावलिः (1-100 Grid)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'gender'}
          className={`num-nav-tab${activeTab === 'gender' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('gender')}
        >
          <span>⚖️</span>
          <span>१-४ लिङ्गभेदाः (Gender Declensions)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'ordinals'}
          className={`num-nav-tab${activeTab === 'ordinals' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('ordinals')}
        >
          <span>🥇</span>
          <span>पूरण-संख्याः (Ordinals 1st-100th)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'vedic'}
          className={`num-nav-tab${activeTab === 'vedic' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('vedic')}
        >
          <span>🌌</span>
          <span>महा-संख्याः (Vedic Powers of 10)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'rules'}
          className={`num-nav-tab${activeTab === 'rules' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          <span>💡</span>
          <span>निर्माण-रहस्यम् (Sandhi &amp; Rules)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'quiz'}
          className={`num-nav-tab${activeTab === 'quiz' ? ' num-nav-tab--active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          <span>🎯</span>
          <span>संख्या-प्रश्नोत्तरी (Practice Quiz)</span>
        </button>
      </nav>

      {/* Tab 1: 1-100 Interactive Numbers Grid */}
      {activeTab === 'grid' && (
        <div>
          {/* Toolbar: Search, Decade Chips & Play Decade */}
          <div className="num-toolbar">
            <div className="num-toolbar-top">
              <div className="num-search-box">
                <span className="num-search-icon">🔍</span>
                <input
                  type="text"
                  className="num-search-input"
                  placeholder="Search by digit (e.g. 42), word (चत्वारिंशत्), IAST, or English..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search numbers"
                />
              </div>

              {renderPlayButton('all', '▶ Play all', handleTogglePlayAll, {
                className: 'num-play-all-btn',
                disabled: filteredNumbers.length === 0,
                titleActive: 'Pause playback',
                ariaActive: 'Pause speaking numbers',
                titleIdle:
                  selectedDecade === 'all' && !searchQuery.trim()
                    ? 'Hear every number 1–100 in order'
                    : 'Hear every number shown below, in order',
                ariaIdle:
                  selectedDecade === 'all' && !searchQuery.trim()
                    ? 'Play all numbers 1 to 100'
                    : 'Play all numbers shown',
              })}
            </div>

            {/* Decade filter chips */}
            <div className="num-decade-chips" role="group" aria-label="Decade filters">
              {DECADE_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  className={`num-decade-chip${selectedDecade === group.id ? ' num-decade-chip--active' : ''}`}
                  onClick={() => setSelectedDecade(group.id)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards grouped by decade, each with its own ▶ Play */}
          <div className="num-sections" role="region" aria-label="Number tiles">
            {numberSections.map((section) => {
              const [from, to] = section.range;
              const sectionPlaying = playingGroup === section.id;
              return (
                <section
                  key={section.id}
                  className={`num-section${sectionPlaying ? ' num-section--playing' : ''}`}
                  aria-labelledby={`num-section-${section.id}`}
                >
                  <header className="num-section-head">
                    <h3 className="num-section-title" id={`num-section-${section.id}`}>
                      <span className="num-section-title-dev">{section.label}</span>
                      <span className="num-section-title-range">
                        {from === 1 ? '0' : from}–{to}
                      </span>
                    </h3>
                    {renderPlayButton(
                      section.id,
                      '▶ Play',
                      () => handleTogglePlayGroup(section.id, section.items.map((item) => item.word)),
                      {
                        className: 'num-play-group-btn',
                        titleActive: 'Pause playback',
                        ariaActive: `Pause numbers ${from}–${to}`,
                        titleIdle: `Hear ${from}–${to} in order`,
                        ariaIdle: `Play all numbers ${from}–${to}`,
                      },
                    )}
                  </header>

                  <div className="num-grid">
                    {section.items.map((item: SanskritNumberItem) => {
                      const isPlaying = playingWord === item.word;
                      return (
                        <div
                          key={item.value}
                          role="button"
                          tabIndex={0}
                          data-play-word={item.word}
                          aria-current={isPlaying && isPlayingAll ? 'true' : undefined}
                          className={`num-card${item.value === 0 ? ' num-card--zero' : ''}${isPlaying ? ' num-card--playing' : ''}`}
                          onClick={() => handleSpeak(item.word)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleSpeak(item.word);
                            }
                          }}
                          title={`Click to pronounce ${item.word} (${item.english})`}
                          aria-label={`${item.value} in Sanskrit is ${item.word} (${item.iast})`}
                        >
                          <div className="num-card-numerals">
                            <span className="num-card-digits">{item.devanagariNumeral}</span>
                            <span className="num-card-badge">{item.value}</span>
                          </div>
                          <div className="num-card-text">
                            <div className="num-card-word">{item.word}</div>
                            <div className="num-card-iast">{item.iast}</div>
                            <div className="num-card-en">{item.english}</div>
                          </div>

                          {item.breakdown && (
                            <div className="num-card-breakdown" title={item.breakdown}>
                              {item.breakdown}
                            </div>
                          )}

                          <button
                            type="button"
                            className="num-card-audio-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeak(item.word);
                            }}
                            aria-label={`Play audio for ${item.word}`}
                          >
                            <span>🔊</span>
                            <span>Speak</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {filteredNumbers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>No matching numbers found</p>
              <p style={{ fontSize: '0.9rem' }}>Try clearing your search term or selecting another decade.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Gender Declensions 1 to 4 */}
      {activeTab === 'gender' && (
        <div className="gender-declension-section">
          <div className="gender-rule-banner">
            <h3 className="gender-rule-title">
              <span>⚖️</span>
              <span>The Cardinal Gender Agreement Rule (१ तः ४ लिङ्गभेदाः)</span>
            </h3>
            <p className="gender-rule-p">
              In Sanskrit, cardinal numbers <strong>1, 2, 3, and 4</strong> act as adjectives (विशेषणानि)
              and <strong>must change their form to match the gender</strong> (Masculine, Feminine, or Neuter)
              of the noun they describe. From <strong>5 (पञ्च) onwards</strong>, the number is completely uniform
              across all three genders!
            </p>
          </div>

          <div className="gender-cards-grid">
            {GENDER_DECLENSIONS_1_TO_4.map((decl) => (
              <div key={decl.number} className="gender-card">
                <div className="gender-card-header">
                  <div>
                    <span className="gender-card-numeral">{decl.devanagariNumeral}</span>
                    <span style={{ fontSize: '1rem', color: '#64748b', marginLeft: '0.5rem' }}>
                      ({decl.number})
                    </span>
                    <div className="gender-card-stem">Stem: {decl.stem}</div>
                  </div>
                  <div style={{ textAlign: 'right', maxWidth: '200px' }}>
                    <span className="gender-card-gram-rule">{decl.grammaticalRule}</span>
                  </div>
                </div>

                <div className="gender-row-comparison">
                  {/* Masculine */}
                  <div className="gender-variant-box gender-variant-box--masc">
                    <div>
                      <span className="gender-variant-label">पुंलिङ्गम् (Masculine)</span>
                      <span className="gender-variant-word">{decl.masculine.form}</span>
                      <span className="gender-variant-iast">({decl.masculine.iast})</span>
                      <div className="gender-variant-example">{decl.masculine.example}</div>
                      <div className="gender-variant-example-en">{decl.masculine.exampleEn}</div>
                    </div>
                    <button
                      type="button"
                      className="gender-play-btn"
                      onClick={() => handleSpeak(decl.masculine.example)}
                      title="Hear masculine example"
                    >
                      🔊
                    </button>
                  </div>

                  {/* Feminine */}
                  <div className="gender-variant-box gender-variant-box--fem">
                    <div>
                      <span className="gender-variant-label">स्त्रीलिङ्गम् (Feminine)</span>
                      <span className="gender-variant-word">{decl.feminine.form}</span>
                      <span className="gender-variant-iast">({decl.feminine.iast})</span>
                      <div className="gender-variant-example">{decl.feminine.example}</div>
                      <div className="gender-variant-example-en">{decl.feminine.exampleEn}</div>
                    </div>
                    <button
                      type="button"
                      className="gender-play-btn"
                      onClick={() => handleSpeak(decl.feminine.example)}
                      title="Hear feminine example"
                    >
                      🔊
                    </button>
                  </div>

                  {/* Neuter */}
                  <div className="gender-variant-box gender-variant-box--neu">
                    <div>
                      <span className="gender-variant-label">नपुंसकलिङ्गम् (Neuter)</span>
                      <span className="gender-variant-word">{decl.neuter.form}</span>
                      <span className="gender-variant-iast">({decl.neuter.iast})</span>
                      <div className="gender-variant-example">{decl.neuter.example}</div>
                      <div className="gender-variant-example-en">{decl.neuter.exampleEn}</div>
                    </div>
                    <button
                      type="button"
                      className="gender-play-btn"
                      onClick={() => handleSpeak(decl.neuter.example)}
                      title="Hear neuter example"
                    >
                      🔊
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 5+ Uniformity Showcase */}
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #cbd5e1',
              borderRadius: '16px',
              padding: '1.5rem',
            }}
          >
            <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem', color: '#0f172a' }}>
              🌟 पञ्च (5) तः अग्रे : त्रिषु लिङ्गेषु समानानि (Uniform from 5 Onwards)
            </h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.94rem', color: '#475569' }}>
              Notice how the word for 5, 6, 7, etc. does NOT change when describing boys, girls, or fruits:
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ fontWeight: 800, color: '#166534' }}>पञ्च बालकाः (5 boys - M)</div>
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#2563eb',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginTop: '0.3rem',
                  }}
                  onClick={() => handleSpeak('पञ्च बालकाः')}
                >
                  🔊 Hear phrase
                </button>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ fontWeight: 800, color: '#9d174d' }}>पञ्च बालिकाः (5 girls - F)</div>
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#2563eb',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginTop: '0.3rem',
                  }}
                  onClick={() => handleSpeak('पञ्च बालिकाः')}
                >
                  🔊 Hear phrase
                </button>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '0.85rem',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                }}
              >
                <div style={{ fontWeight: 800, color: '#0369a1' }}>पञ्च फलानि (5 fruits - N)</div>
                <button
                  type="button"
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: '#2563eb',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    marginTop: '0.3rem',
                  }}
                  onClick={() => handleSpeak('पञ्च फलानि')}
                >
                  🔊 Hear phrase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Ordinal Numbers (पूरण-संख्याः) */}
      {activeTab === 'ordinals' && (
        <div>
          <div
            style={{
              background: '#f8fafc',
              border: '1.5px solid #e2e8f0',
              borderRadius: '14px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.15rem', color: '#0f172a' }}>
              🥇 पूरण-संख्याः (Ordinal Numbers: 1st, 2nd, 3rd...)
            </h3>
            <p style={{ margin: 0, fontSize: '0.94rem', color: '#475569', lineHeight: 1.55 }}>
              Ordinal numbers in Sanskrit denote sequential position or rank. They decline across all three
              genders using endings like <strong>-अः (Masc), -आ / -ई (Fem), -अम् (Neut)</strong>. They are
              widely used in textbook chapter titles (प्रथमोऽध्यायः) and traditional calendars (एकादशी, त्रयोदशी).
            </p>
          </div>

          <div className="num-tab-playbar">
            {renderPlayButton(
              'ordinals',
              '▶ Play all',
              () => handleTogglePlayGroup('ordinals', ORDINAL_NUMBERS_LIST.map((ord) => ord.masculine)),
              {
                className: 'num-play-all-btn',
                titleActive: 'Pause playback',
                ariaActive: 'Pause speaking ordinals',
                titleIdle: 'Hear every ordinal (masculine form) in order',
                ariaIdle: 'Play all ordinals',
              },
            )}
            <span className="num-tab-playbar-hint">Plays the पुंलिङ्गम् (masculine) form of each ordinal, in order.</span>
          </div>

          <div className="ordinal-table-wrapper">
            <table className="ordinal-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>पुंलिङ्गम् (Masc)</th>
                  <th>स्त्रीलिङ्गम् (Fem)</th>
                  <th>नपुंसकलिङ्गम् (Neut)</th>
                  <th>English</th>
                  <th>Cultural Example</th>
                </tr>
              </thead>
              <tbody>
                {ORDINAL_NUMBERS_LIST.map((ord) => (
                  <tr
                    key={ord.rank}
                    data-play-word={ord.masculine}
                    className={playingGroup === 'ordinals' && playingWord === ord.masculine ? 'ordinal-row--playing' : undefined}
                    aria-current={playingGroup === 'ordinals' && playingWord === ord.masculine ? 'true' : undefined}
                  >
                    <td>
                      <span className="ordinal-rank-chip">
                        {ord.numeral} ({ord.rank})
                      </span>
                    </td>
                    <td>
                      <span className="ordinal-masc">{ord.masculine}</span>
                      <span
                        className="ordinal-audio-icon"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSpeak(ord.masculine)}
                        title={`Hear ${ord.masculine}`}
                      >
                        🔊
                      </span>
                    </td>
                    <td>
                      <span className="ordinal-fem">{ord.feminine}</span>
                      <span
                        className="ordinal-audio-icon"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSpeak(ord.feminine)}
                        title={`Hear ${ord.feminine}`}
                      >
                        🔊
                      </span>
                    </td>
                    <td>
                      <span className="ordinal-neu">{ord.neuter}</span>
                      <span
                        className="ordinal-audio-icon"
                        role="button"
                        tabIndex={0}
                        onClick={() => handleSpeak(ord.neuter)}
                        title={`Hear ${ord.neuter}`}
                      >
                        🔊
                      </span>
                    </td>
                    <td>{ord.english}</td>
                    <td>
                      <span
                        style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 600 }}
                        onClick={() => handleSpeak(ord.example)}
                        title="Click to hear example"
                      >
                        {ord.example} 🔊
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Vedic & Classical Powers of 10 Scale */}
      {activeTab === 'vedic' && (
        <div>
          <div className="vedic-scale-intro">
            <h3 className="vedic-scale-intro-title">
              🌌 महा-संख्या-परिमाणम् · Ancient Indian Astronomical Scales
            </h3>
            <p className="vedic-scale-intro-p">
              Centuries before Western mathematics devised words beyond a million, the <strong>Yajurveda</strong>,
              the <strong>Rāmāyaṇa</strong> (Yuddha Kāṇḍa), and mathematician <strong>Bhāskarācārya</strong> in
              his <em>Līlāvatī</em> classified naming conventions for powers of ten all the way to
              <strong> 10¹⁷ (परार्धम् - One Hundred Quadrillion)</strong>!
            </p>
          </div>

          <div className="num-tab-playbar">
            {renderPlayButton(
              'vedic',
              '▶ Play all',
              () => handleTogglePlayGroup('vedic', VEDIC_LARGE_NUMBERS.map((item) => item.sanskritName)),
              {
                className: 'num-play-all-btn',
                titleActive: 'Pause playback',
                ariaActive: 'Pause speaking powers of ten',
                titleIdle: 'Hear every power of ten in order',
                ariaIdle: 'Play all powers of ten',
              },
            )}
            <span className="num-tab-playbar-hint">एकम् → परार्धम् · every power of ten, smallest to largest.</span>
          </div>

          <div className="vedic-scale-timeline">
            {VEDIC_LARGE_NUMBERS.map((item) => (
              <div
                key={item.exponent}
                data-play-word={item.sanskritName}
                aria-current={playingGroup === 'vedic' && playingWord === item.sanskritName ? 'true' : undefined}
                className={`vedic-scale-row${playingGroup === 'vedic' && playingWord === item.sanskritName ? ' vedic-scale-row--playing' : ''}`}
              >
                <div className="vedic-exp-pill">{item.powerOfTen}</div>

                <div className="vedic-info-col">
                  <div className="vedic-name-row">
                    <span className="vedic-sanskrit-name">{item.sanskritName}</span>
                    <span className="vedic-iast-name">({item.iast})</span>
                    <button
                      type="button"
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                      }}
                      onClick={() => handleSpeak(item.sanskritName)}
                      title={`Hear ${item.sanskritName}`}
                    >
                      🔊
                    </button>
                    <span className="vedic-meaning">· {item.englishMeaning}</span>
                  </div>
                  <div className="vedic-numeric-val">Digits: {item.numericDisplay}</div>
                  <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '0.2rem' }}>
                    {item.description}
                  </div>
                </div>

                <div className="vedic-source-tag">{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Word Formation Secrets (Sandhi & Construction Rules) */}
      {activeTab === 'rules' && (
        <div className="rules-tab-content">
          {/* Masterclass Callout: English Labels vs. Sanskrit Algorithm */}
          <div className="num-algorithm-hero">
            <div className="num-algorithm-badge">🧭 शास्त्र-रहस्यम् · The Construction Algorithm</div>
            <h3 className="num-algorithm-title">
              अङ्कानां वामतो गतिः · Grammar is an Arithmetic Engine
            </h3>
            <p className="num-algorithm-lead">
              <strong>English number-words are frozen labels. Sanskrit number-words are an executable place-value algorithm.</strong>
            </p>
            <p className="num-algorithm-desc">
              In English, grammar and arithmetic sit in different rooms. &ldquo;Twenty-four&rdquo; does not compute 24.
              The word order is tens-then-units, the forms are irregular (<em>eleven</em>, <em>twelve</em>, <em>twenty</em>, not &ldquo;two-ten&rdquo;),
              and nothing in the sentence structure tells you how place value works. A child can speak English fluently and still not see that 24 = 4 + 20.
            </p>
            <p className="num-algorithm-desc">
              Sanskrit does not allow that split. <strong>अङ्कानां वामतो गतिः</strong> (digits move leftward) is both a linguistic rule and a place-value algorithm:
            </p>
            <div className="num-algorithm-steps">
              <div className="num-algo-step">
                <span className="num-algo-step-num">1</span>
                <span>Start at the units place (<code>n % 10</code>)</span>
              </div>
              <div className="num-algo-step">
                <span className="num-algo-step-num">2</span>
                <span>Move left to the tens place (<code>floor(n / 10)</code>)</span>
              </div>
              <div className="num-algo-step">
                <span className="num-algo-step-num">3</span>
                <span>Glue the stems as a dvigu-style compound</span>
              </div>
              <div className="num-algo-step">
                <span className="num-algo-step-num">4</span>
                <span>Apply mandatory Sandhi assimilation</span>
              </div>
            </div>

            <div className="num-sastra-box">
              <h4 className="num-sastra-title">🏛️ The Unified Śāstra Stack: Small Pieces, Strict Order, One Result</h4>
              <p className="num-sastra-p">
                This is not a poetic coincidence. In the classical Indian intellectual stack, <strong>व्याकरण</strong> (how forms combine),
                <strong>गणित</strong> (how quantities combine), and <strong>छन्दस्</strong> (how sound-units combine) share the same machine:
                small pieces, strict order, mandatory sandhi/operation, and one resulting form. English names the number;
                <strong>Sanskrit assembles the number from the right</strong>.
              </p>
            </div>
          </div>

          {/* Interactive compose(n) Laboratory */}
          {(() => {
            const compItem = SANSKRIT_NUMBERS_1_TO_100.find((it) => it.value === composerNumber) || SANSKRIT_NUMBERS_1_TO_100[24];
            const compUnits = composerNumber % 10;
            const compTens = Math.floor(composerNumber / 10);
            const presets = [24, 21, 19, 29, 34, 47, 81, 82, 96, 99];

            return (
              <div className="num-composer-card">
                <div className="num-composer-header">
                  <span className="num-composer-tag">⚙️ Interactive Laboratory · The `compose(n)` Engine</span>
                  <h4 className="num-composer-heading">Assemble Any Number from the Right</h4>
                  <p className="num-composer-sub">
                    Pick a number or slide to watch the units place combine with the tens decade in real time:
                  </p>
                </div>

                {/* Preset Chips */}
                <div className="num-composer-presets">
                  <span className="num-presets-label">Quick Examples:</span>
                  {presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`num-preset-chip${composerNumber === p ? ' active' : ''}`}
                      onClick={() => setComposerNumber(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Slider Control */}
                <div className="num-composer-slider-row">
                  <label htmlFor="composer-slider" className="num-slider-label">
                    Select Number: <strong>{composerNumber}</strong> ({compItem.devanagariNumeral})
                  </label>
                  <input
                    id="composer-slider"
                    type="range"
                    min="1"
                    max="99"
                    value={composerNumber}
                    onChange={(e) => setComposerNumber(Number(e.target.value))}
                    className="num-composer-range"
                  />
                </div>

                {/* Real-Time Algorithmic Decomposition Table */}
                <div className="num-algo-table-wrap">
                  <table className="num-algo-table">
                    <thead>
                      <tr>
                        <th>Spoken Order</th>
                        <th>Place Value</th>
                        <th>Extracted Stem</th>
                        <th>Role in Compound</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="num-order-badge num-order-badge--1">1st (Rightmost)</span></td>
                        <td>Units Place (<code>n % 10 = {compUnits}</code>)</td>
                        <td className="num-stem-val">{compItem.breakdown ? compItem.breakdown.split('+')[0]?.trim() : compUnits}</td>
                        <td>Unit prefix attached first</td>
                      </tr>
                      <tr>
                        <td><span className="num-order-badge num-order-badge--2">2nd (Leftward)</span></td>
                        <td>Tens Place (<code>floor(n / 10) = {compTens}</code>)</td>
                        <td className="num-stem-val">{compItem.breakdown ? (compItem.breakdown.split('+')[1] || '').split('=')[0]?.trim() : compTens * 10}</td>
                        <td>Decade base noun</td>
                      </tr>
                      <tr className="num-algo-result-row">
                        <td><span className="num-order-badge num-order-badge--res">Result</span></td>
                        <td>Combined Compound</td>
                        <td colSpan={2}>
                          <div className="num-result-box">
                            <span className="num-result-word">{compItem.word}</span>
                            <span className="num-result-iast">({compItem.iast})</span>
                            <button
                              type="button"
                              className="num-result-speak-btn"
                              onClick={() => handleSpeak(compItem.word)}
                              title={`Hear ${compItem.word}`}
                            >
                              🔊 Hear Classical Pronunciation
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Breakdown Equation Display */}
                {compItem.breakdown && (
                  <div className="num-composer-equation">
                    <span className="num-equation-label">The Grammatical Sum:</span>
                    <span className="num-equation-math">{compItem.breakdown}</span>
                  </div>
                )}

                {/* Code Representation */}
                <div className="num-code-preview">
                  <div className="num-code-header">
                    <span>💻 Executable JavaScript Implementation</span>
                  </div>
                  <pre className="num-code-block">
                    <code>{`function compose(n) {
  const units = n % 10;              // 1. Rightmost digit first (units)
  const tens  = Math.floor(n / 10);  // 2. Next digit leftward (tens)
  
  // 3. Assemble: unit stem + ten name + sandhi / specials
  return applySandhi(unitStem[units], tenName[tens]);
}

// Result for ${composerNumber}:
// ${composerNumber} → ${compItem.breakdown || compItem.word} → ${compItem.word}`}</code>
                  </pre>
                </div>
              </div>
            );
          })()}

          {/* Specific Phonological & Sandhi Rules Grid */}
          <div className="rules-grid" style={{ marginTop: '2rem' }}>
            <div className="rule-box">
              <div className="rule-box-header">
                <span className="rule-box-icon">➖</span>
                <h4 className="rule-box-title">1. एकोन- / ऊन- नियम (Subtractive Naming)</h4>
              </div>
              <p className="rule-box-p">
                Numbers ending in 9 can be expressed either constructively (9 + tens) or subtractively as
                &ldquo;one less than the next decade&rdquo; using <em>एक + ऊन = एकोन</em>:
              </p>
              <div className="rule-formula">
                <strong>19:</strong> <code>नवदश (9+10)</code> OR <code>एकोनविंशतिः (20 - 1)</code>
              </div>
              <div className="rule-formula">
                <strong>29:</strong> <code>नवविंशतिः</code> OR <code>एकोनत्रिंशत् (30 - 1)</code>
              </div>
              <div className="rule-formula">
                <strong>99:</strong> <code>नवनवतिः</code> OR <code>एकोनशतम् (100 - 1)</code>
              </div>
            </div>

            <div className="rule-box">
              <div className="rule-box-header">
                <span className="rule-box-icon">⚡</span>
                <h4 className="rule-box-title">2. The षण्णवतिः Sandhi Mystery (96)</h4>
              </div>
              <p className="rule-box-p">
                Why is 96 written as <strong>षण्णवतिः</strong> instead of षट्-नवतिः?
                According to Panini&rsquo;s aphorism <em>यरोऽनुनासिकेऽनुनासिको वा</em>, when the voiceless retroflex
                stop <strong>ट्</strong> is followed by the nasal <strong>न्</strong>, it assimilates into the
                retroflex nasal <strong>ण्</strong>:
              </p>
              <div className="rule-formula">
                <code>षट् + नवतिः</code> &rarr; <code>षण् + नवतिः</code> = <strong>षण्णवतिः (96)</strong>
              </div>
              <p className="rule-box-p">
                Similarly, before voiced sounds (vowels and semi-vowels), <strong>षट्</strong> softens into <strong>षड्</strong>:
                <code> षट् + विंशतिः = षड्विंशतिः (26)</code> and <code>षट् + अशीतिः = षडशीतिः (86)</code>.
              </p>
            </div>

            <div className="rule-box">
              <div className="rule-box-header">
                <span className="rule-box-icon">☀️</span>
                <h4 className="rule-box-title">3. Yan &amp; Savarna Dirgha in the 80s (अशीतिः)</h4>
              </div>
              <p className="rule-box-p">
                Because 80 is <strong>अशीतिः</strong> (starting with vowel अ), all numbers in the 80s undergo
                dramatic vowel Sandhi shifts:
              </p>
              <div className="rule-formula">
                <code>एक + अशीतिः</code> &rarr; <strong>एकाशीतिः (81)</strong> (a + a = ā)
              </div>
              <div className="rule-formula">
                <code>द्वि + अशीतिः</code> &rarr; <strong>द्व्यशीतिः (82)</strong> (Yan Sandhi: i + a = ya)
              </div>
              <div className="rule-formula">
                <code>त्रि + अशीतिः</code> &rarr; <strong>त्र्यशीतिः (83)</strong> (Yan Sandhi: i + a = ya)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Interactive Number Quiz */}
      {activeTab === 'quiz' && (
        <div>
          <div className="quiz-wrapper">
            <div className="quiz-score-bar">
              <span className="quiz-score-text">
                Question {currentQIndex + 1} of {quizQuestions.length}
              </span>
              <span className="quiz-score-text">
                Score: <span className="quiz-score-val">{quizScore} / {quizTotal}</span>
              </span>
            </div>

            <div className="quiz-question-box">
              {currentQ.numeralDev && <div className="quiz-q-numeral">{currentQ.numeralDev}</div>}
              <h4 className="quiz-q-text">{currentQ.question}</h4>
            </div>

            <div className="quiz-options-grid">
              {currentQ.options.map((option) => {
                let btnClass = 'quiz-option-btn';
                if (isAnswered) {
                  if (option === currentQ.correctWord) {
                    btnClass += ' quiz-option-btn--correct';
                  } else if (option === selectedAnswer) {
                    btnClass += ' quiz-option-btn--incorrect';
                  }
                }
                return (
                  <button
                    key={option}
                    type="button"
                    className={btnClass}
                    onClick={() => handleSelectQuizAnswer(option)}
                    disabled={isAnswered}
                  >
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <>
                <div
                  className={`quiz-feedback-box ${
                    selectedAnswer === currentQ.correctWord
                      ? 'quiz-feedback-box--correct'
                      : 'quiz-feedback-box--incorrect'
                  }`}
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {selectedAnswer === currentQ.correctWord ? '🎉' : '💡'}
                  </span>
                  <div>
                    <strong>
                      {selectedAnswer === currentQ.correctWord
                        ? 'साधु! (Correct!)'
                        : `पुनः स्मर (Remember): Correct answer is ${currentQ.correctWord}`}
                    </strong>
                    <div style={{ marginTop: '0.25rem' }}>{currentQ.explanation}</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="quiz-next-btn"
                  onClick={handleNextQuizQuestion}
                >
                  Next Question →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Read more: existing site articles on the history of Indian numerals */}
      <aside className="num-readmore" aria-labelledby="num-readmore-title">
        <h3 className="num-readmore-title" id="num-readmore-title">📚 Read more · History of Indian numerals</h3>
        <p className="num-readmore-note">
          The digits 0–9 used worldwide grew out of these Indian numerals; in the West they are called
          “Hindu numerals” or “Hindu–Arabic numerals” because they reached Europe through Arab scholars.
        </p>
        <ul className="num-readmore-list">
          {NUMBERS_READ_MORE.map((link) => (
            <li key={link.id}>
              <a
                className="num-readmore-link"
                href={link.href}
                data-readmore={link.id}
                onClick={(e) => openSiteTarget(e, link.target)}
              >
                <span className="num-readmore-emoji" aria-hidden="true">{link.emoji}</span>
                <span className="num-readmore-text">
                  <strong>{link.title}</strong>
                  <span>{link.blurb}</span>
                </span>
                <span className="num-readmore-arrow" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Next step: Numbers → Vedic Maths (shared ordered list) */}
      <VedicLearningPath
        id="numbers-next-vedic-maths"
        heading="🧮 Next step: Numbers → Vedic Maths (Classes 6–8)"
        intro="Now that you can read and say numbers, follow these steps in order. Each one opens that sutra on the Vedic Maths page."
        onOpen={(anchor, e) => openSiteTarget(e, { view: 'vedic-maths', vedicAnchor: anchor })}
      />
    </section>
  );
};
