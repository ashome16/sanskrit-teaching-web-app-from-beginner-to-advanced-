import React, { useEffect, useMemo, useState } from 'react';
import {
  LIVE_TICKER_ITEMS,
  QUICK_DOWNLOAD_RESOURCES,
  RESOURCE_ITEMS,
  type QuickDownloadResource,
  type ResourceCategory,
  type ResourceItem,
  type LiveStatus,
} from '../data/resourcesData';
import { downloadCalendarEvent, downloadResourceDocument } from '../utils/contentDownload';
import BodhiTipCallout from './BodhiTipCallout';
import '../styles/philosophy.css';
import '../styles/free-resources.css';
import '../styles/resources.css';

export interface FreeResourcesPageProps {
  onGoHome?: () => void;
  onOpenGrammar?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenPhilosophy?: () => void;
  onOpenRegister?: () => void;
  onOpenQuiz?: () => void;
  onOpenWorksheets?: () => void;
}

interface ResourceLink {
  label: string;
  url: string;
}

interface ResourceEntry {
  name: string;
  nameSa?: string;
  description: string;
  links: ResourceLink[];
  tag?: string;
}

interface ResourceSection {
  id: string;
  title: string;
  titleSa: string;
  icon: string;
  intro?: string;
  entries: ResourceEntry[];
}

/** Links and descriptions checked by hand in September 2026. */
const LAST_CHECKED = 'September 2026';

const SECTIONS: ResourceSection[] = [
  {
    id: 'courses',
    title: 'Structured Courses',
    titleSa: 'पाठ्यक्रमाः',
    icon: '🎓',
    entries: [
      {
        name: 'learnsanskrit.org · Sanskrit for Beginners',
        description:
          'A completely free guide that takes you from the alphabet through Sanskrit grammar in clear, simple language, without busywork. The same site also has a series on Pāṇini’s Aṣṭādhyāyī (vyākaraṇa-praveśaḥ).',
        links: [{ label: 'Open the guide', url: 'https://www.learnsanskrit.org/guide/' }],
        tag: 'Free',
      },
      {
        name: 'Samskrita Bharati',
        nameSa: 'संस्कृतभारती',
        description:
          'A volunteer movement founded in 1981 that works to bring back Sanskrit as a spoken language, in India and abroad. It is best known for its 10-day spoken-Sanskrit camps (Sambhāṣaṇa Śibiram, 2 hours a day, no prior knowledge needed), and it also runs correspondence courses in many Indian languages and sells books in simple Sanskrit.',
        links: [
          { label: 'samskritabharati.in', url: 'https://www.samskritabharati.in/' },
          { label: 'Spoken classes', url: 'https://www.samskritabharati.in/spoken_samskrit_class' },
          { label: 'Outside India', url: 'https://samskritabharati.org/' },
        ],
        tag: 'Spoken Sanskrit',
      },
      {
        name: 'Sanskrit From Home (Vyoma)',
        nameSa: 'व्योम',
        description:
          'The online learning platform of Vyoma Linguistic Labs (learnsanskrit.org lists it as Vyoma-Saṃskṛta-Pāṭhaśālā). It has recorded and live lecture-style classes from beginner Devanāgarī and spoken Sanskrit up to śāstra texts, with filters for kids, students and adults. Vyoma says about 90% of its courses are free, but some charge a fee or need a paid learning kit.',
        links: [
          { label: 'Browse courses', url: 'https://www.sanskritfromhome.org/course-listing' },
          { label: 'Courses for kids', url: 'https://www.sanskritfromhome.org/course-listing/kids' },
        ],
        tag: 'Mostly free',
      },
      {
        name: 'SWAYAM',
        description:
          'The Government of India’s free MOOC platform. You can study its Sanskrit courses (for example, Introductory Sanskrit: Grammar, and IIT Kharagpur’s spoken-Sanskrit courses) for free. You only pay if you want to sit the proctored exam for a certificate.',
        links: [{ label: 'Search Sanskrit on SWAYAM', url: 'https://swayam.gov.in/explorer?searchText=sanskrit' }],
        tag: 'Free to study',
      },
      {
        name: 'Class Central · Sanskrit hub',
        description:
          'A catalogue of 30+ Sanskrit courses from SWAYAM, YouTube, Udemy, NIOS and IIT programmes, all in one list. Many are free, but some (such as Udemy courses) are paid, so check each listing.',
        links: [{ label: 'See the list', url: 'https://www.classcentral.com/subject/sanskrit' }],
        tag: 'Catalogue',
      },
      {
        name: 'Learn Sanskrit Online (learnsanskritonline.com)',
        description:
          'Informal beginner lessons with audio by teacher Vidyadhar, designed to get you speaking basic conversational Sanskrit within a few lessons. All beginner lessons are free; the separate teacher-led courses are paid.',
        links: [{ label: 'Start lesson 1', url: 'https://learnsanskritonline.com/lessons/introduction' }],
        tag: 'Free lessons',
      },
    ],
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries & Reference Tools',
    titleSa: 'कोशाः साधनानि च',
    icon: '📖',
    entries: [
      {
        name: 'Monier-Williams Sanskrit-English Dictionary',
        description:
          'The standard Sanskrit-English dictionary used in the West (1899 edition). You can search it for free on Cologne University’s Digital Sanskrit Dictionaries site.',
        links: [
          {
            label: 'Search Monier-Williams',
            url: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/MWScan/2020/web/index.php',
          },
        ],
        tag: 'Sanskrit → English',
      },
      {
        name: 'Monier-Williams English-Sanskrit Dictionary',
        description:
          'The reverse dictionary (1851), for looking up an English word to find its Sanskrit equivalents. It is also free to search on the Cologne site.',
        links: [
          {
            label: 'Search English → Sanskrit',
            url: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/MWEScan/2020/web/index.php',
          },
        ],
        tag: 'English → Sanskrit',
      },
      {
        name: 'Apte’s Practical Sanskrit-English Dictionary',
        description:
          'V. S. Apte’s classic Sanskrit-English reference. You can search it online for free at the University of Chicago’s DSAL site or on the Cologne site (1890 edition).',
        links: [
          { label: 'Search at DSAL', url: 'https://dsal.uchicago.edu/dictionaries/apte/' },
          {
            label: 'Cologne (AP90)',
            url: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/AP90Scan/2020/web/index.php',
          },
        ],
        tag: 'Sanskrit → English',
      },
      {
        name: 'Apte’s Student’s English-Sanskrit Dictionary',
        description:
          'Apte’s English-to-Sanskrit companion volume (1920). You can search it for free on the Cologne site.',
        links: [
          {
            label: 'Search Apte English → Sanskrit',
            url: 'https://www.sanskrit-lexicon.uni-koeln.de/scans/AEScan/2020/web/index.php',
          },
        ],
        tag: 'English → Sanskrit',
      },
      {
        name: 'Cologne Digital Sanskrit Dictionaries',
        description:
          'The home page for all the dictionaries above, plus dozens more, including Macdonell’s Sanskrit-English dictionary and Sanskrit-Sanskrit kośas such as the Vācaspatyam and Śabdakalpadruma.',
        links: [{ label: 'All dictionaries', url: 'https://www.sanskrit-lexicon.uni-koeln.de/' }],
        tag: 'Hub',
      },
      {
        name: 'Sanscript (on learnsanskrit.org)',
        description:
          'A free tool that converts Sanskrit text between scripts and romanisations: Devanāgarī, IAST, ITRANS, Harvard-Kyoto, SLP1, and Indian scripts such as Telugu, Kannada, Tamil, Bengali and Gujarati.',
        links: [{ label: 'Open Sanscript', url: 'https://www.learnsanskrit.org/tools/sanscript/' }],
        tag: 'Tool',
      },
    ],
  },
  {
    id: 'texts',
    title: 'Texts & Reading Practice',
    titleSa: 'ग्रन्थाः पठनाभ्यासः च',
    icon: '📜',
    entries: [
      {
        name: 'Amarahasa',
        description:
          'A free online library of Sanskrit stories for all levels, including Panchatantra adaptations, a simple Rāmāyaṇa and Bhagavad Gītā verses. Click any word to see a plain-English meaning. The simpler stories also have full sentence translations.',
        links: [{ label: 'Read stories', url: 'https://en.amarahasa.com/' }],
        tag: 'Beginner-friendly',
      },
      {
        name: 'Ambuda',
        nameSa: 'अम्बुदः',
        description:
          'A separate site (ambuda.org) built by the learnsanskrit.org team. It is a growing library of traditional texts (Upanishads, the Rāmāyaṇa and Mahābhārata, kāvya, stotras) with word-by-word analysis and a built-in dictionary.',
        links: [{ label: 'Open Ambuda', url: 'https://ambuda.org/' }],
        tag: 'Library',
      },
      {
        name: 'Sanskrit Documents',
        description:
          'A large collection of Sanskrit texts (stotras, Gītā, Upaniṣads and much more). You can view them in Devanāgarī, other Indian scripts or IAST, switching script on the page, and many are also available as PDFs.',
        links: [{ label: 'sanskritdocuments.org', url: 'https://sanskritdocuments.org/' }],
        tag: 'Texts',
      },
      {
        name: 'GRETIL',
        description:
          'The Göttingen Register of Electronic Texts in Indian Languages: a large academic collection of machine-readable Sanskrit texts, mostly in IAST. It is useful once you are past the beginner stage. Paste any passage into Sanscript to read it in Devanāgarī.',
        links: [{ label: 'Open GRETIL', url: 'https://gretil.sub.uni-goettingen.de/gretil.html' }],
        tag: 'Advanced',
      },
    ],
  },
  {
    id: 'grammars',
    title: 'Grammar References (Free Classic Texts)',
    titleSa: 'व्याकरणग्रन्थाः',
    icon: '📚',
    intro:
      'These three classic grammars are recommended on learnsanskrit.org’s Resources page. They are now in the public domain, and you can read them free on the Internet Archive and Wikisource.',
    entries: [
      {
        name: 'A Sanskrit Grammar for Students · A. A. Macdonell',
        description:
          'A clear, readable reference grammar that explains Sanskrit from a Western point of view.',
        links: [{ label: 'Read on archive.org', url: 'https://archive.org/details/sanskritgrammarf014425mbp' }],
        tag: 'Reference',
      },
      {
        name: 'A Higher Sanskrit Grammar · M. R. Kale',
        description:
          'A comprehensive grammar written for schools and colleges that explains Sanskrit from the traditional (Pāṇinian) point of view.',
        links: [{ label: 'Read on archive.org', url: 'https://archive.org/details/highersanskritgr00kaleuoft' }],
        tag: 'Reference',
      },
      {
        name: 'Sanskrit Grammar · W. D. Whitney',
        description:
          'The standard English-language reference grammar in the West (1879), covering classical Sanskrit and the older Vedic and Brāhmaṇa language.',
        links: [
          { label: 'Read on Wikisource', url: 'https://en.wikisource.org/wiki/Sanskrit_Grammar_(Whitney)' },
          { label: 'Scan on archive.org', url: 'https://archive.org/details/sanskritgrammari00whituoft' },
        ],
        tag: 'Reference',
      },
    ],
  },
  {
    id: 'video',
    title: 'Video & Conversational Practice',
    titleSa: 'दृश्यश्रव्यम् सम्भाषणं च',
    icon: '🎬',
    entries: [
      {
        name: 'Samskrita Bharati on YouTube',
        description:
          'Samskrita Bharati’s official channel, with talks, programmes and spoken-Sanskrit videos.',
        links: [{ label: 'Visit the channel', url: 'https://www.youtube.com/@samskritbharati' }],
        tag: 'Video',
      },
      {
        name: 'Spoken Sanskrit lessons on YouTube',
        description:
          'Many teachers share free playlists that teach spoken Sanskrit through everyday conversation. Try this search to find a teacher whose pace suits you.',
        links: [
          {
            label: 'Search “spoken Sanskrit conversation lessons”',
            url: 'https://www.youtube.com/results?search_query=spoken+sanskrit+conversation+lessons',
          },
        ],
        tag: 'Video',
      },
    ],
  },
  {
    id: 'vedic-maths',
    title: 'Vedic Mathematics & Mental Arithmetic',
    titleSa: 'वैदिक-गणितम्',
    icon: '⚡',
    intro:
      'Curated free learning hubs, practice academies, speed drilling tools, and community forums aligned with the 16 Foundational Sutras of Vedic Mathematics.',
    entries: [
      {
        name: 'VedicMaths.org (Kenneth Williams)',
        nameSa: 'वैदिक-गणित-केन्द्रम्',
        description:
          'The oldest and most comprehensive Vedic Mathematics site online, run by Kenneth Williams (leading global authority in the field). Hosts free introductory courses through Math2Shine, research articles, community forums, and an extensive global resource library.',
        links: [
          { label: 'Visit VedicMaths.org', url: 'https://vedicmaths.org/' },
          { label: 'Free Introductory Courses', url: 'https://vedicmaths.org/courses/introductory' },
        ],
        tag: 'Core Hub · Free Courses',
      },
      {
        name: 'VedicMaths.org — Free Books & Research Papers',
        description:
          'A rich collection of free downloadable books and academic papers, including rigorous mathematical validations of the sutras, proofs, and historical/critical context for students and researchers.',
        links: [
          { label: 'Browse Free Books & Papers', url: 'https://vedicmaths.org/resources/books/free' },
        ],
        tag: 'Free E-Books & Proofs',
      },
      {
        name: 'Vedic Math School',
        description:
          'US-based learning platform providing structured lessons across multiple skill tiers, from basic sutra applications to more advanced calculation techniques and practice problems.',
        links: [
          { label: 'vedicmathschool.com', url: 'http://www.vedicmathschool.com/' },
        ],
        tag: 'Multi-Level Practice',
      },
      {
        name: 'School of Vedic Mathematics (SOVM)',
        nameSa: 'वेदमठः',
        description:
          'India-based academy with a strong pedagogical emphasis on the "thinking" side of Vedic Maths rather than mere rote formulas, cultivating lateral numerical intuition.',
        links: [
          { label: 'sovm.org', url: 'http://www.sovm.org/' },
        ],
        tag: 'Conceptual Thinking',
      },
      {
        name: 'Vedic Maths Canada',
        description:
          'Straightforward pedagogical explanations of all 16 core sutras and roughly 13 sub-sutras, matching the spirit of our EdNet Learn 16 Foundational Sutras Academy curriculum.',
        links: [
          { label: 'vedicmath.ca', url: 'http://www.vedicmath.ca/' },
        ],
        tag: '16 Sutras Guide',
      },
      {
        name: 'Video Learning Playlists & Khan Academy Foundations',
        description:
          'Free video courses walking through step-by-step worked examples for each sutra (Ekādhikena Pūrveṇa, Nikhilam, Ūrdhva-Tiryagbhyām, Dvandva). Khan Academy serves as an ideal free companion for shoring up foundational arithmetic and algebra concepts that make sutras click faster.',
        links: [
          { label: 'YouTube: Vedic Maths India', url: 'https://www.youtube.com/results?search_query=Vedic+Maths+India' },
          { label: 'YouTube: Vedic Maths Basics', url: 'https://www.youtube.com/results?search_query=Vedic+Maths+basics' },
          { label: 'Khan Academy Arithmetic', url: 'https://www.khanacademy.org/math/arithmetic' },
        ],
        tag: 'Free Video Masterclasses',
      },
      {
        name: 'Mental Math Speed Drills & Reddit Communities',
        description:
          'Free timed mental math speed test generators for building calculation velocity and automatic pattern recognition. Active global communities (r/mentalmath and r/learnmath) where enthusiasts share sutra tricks, ask questions, and solve daily challenge problems.',
        links: [
          { label: 'Search Mental Math Speed Tests', url: 'https://www.google.com/search?q=mental+math+speed+tests' },
          { label: 'Reddit: r/mentalmath', url: 'https://www.reddit.com/r/mentalmath/' },
          { label: 'Reddit: r/learnmath', url: 'https://www.reddit.com/r/learnmath/' },
        ],
        tag: 'Speed Drills & Community',
      },
    ],
  },
];

type MainTab = 'feed' | 'vault' | 'library';

const getStatusBadgeStyle = (status: LiveStatus) => {
  switch (status) {
    case 'live':
      return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' };
    case 'open':
      return { bg: '#fef3c7', color: '#b45309', border: '#fcd34d' };
    case 'new':
      return { bg: '#e0f2fe', color: '#0369a1', border: '#7dd3fc' };
    case 'upcoming':
      return { bg: '#f3e8ff', color: '#7e22ce', border: '#d8b4fe' };
    case 'featured':
    default:
      return { bg: '#ecfdf5', color: '#047857', border: '#6ee7b7' };
  }
};

export const FreeResourcesPage: React.FC<FreeResourcesPageProps> = ({
  onGoHome,
  onOpenGrammar,
  onOpenCbseGuide,
  onOpenPhilosophy,
  onOpenRegister,
  onOpenQuiz,
  onOpenWorksheets,
}) => {
  const [activeTab, setActiveTab] = useState<MainTab>('feed');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [selectedItemModal, setSelectedItemModal] = useState<ResourceItem | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  const [submitForm, setSubmitForm] = useState({
    title: '',
    category: 'events',
    organizer: '',
    date: '',
    mode: 'Online (Zoom / Meet)',
    description: '',
    contactEmail: '',
  });

  // Rotate breaking ticker every 5.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % LIVE_TICKER_ITEMS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyLink = (item: ResourceItem) => {
    const url = `${window.location.origin}/resources#item-${item.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showToast(`🔗 Link for "${item.title}" copied to clipboard!`);
      });
    } else {
      showToast('🔗 Link copied to clipboard!');
    }
  };

  const handleAddToCalendar = (item: ResourceItem) => {
    const desc = `${item.summary}\n\nOrganizer: ${item.organizer}\nKey Highlights:\n- ${item.highlights.join('\n- ')}\n\nOfficial Link: ${item.actionLink || 'https://ednetlearn.in/resources'}`;
    downloadCalendarEvent(item.title, desc, item.mode || 'Online · EdNet Learn');
    showToast(`📅 Calendar event (.ics) downloaded for "${item.title}"!`);
  };

  const handleQuickDownload = (res: QuickDownloadResource) => {
    if (res.id === 'qd-vedic-maths-sutras') {
      const a = document.createElement('a');
      a.href = '/vedic-maths-16-sutras-poster.jpg';
      a.download = 'EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('📥 16 Foundational Sutras Poster downloaded!');
      return;
    }
    downloadResourceDocument(
      res.title,
      res.titleSa,
      res.category,
      `<p>${res.description}</p><p><strong>Format:</strong> ${res.format} · <strong>Size:</strong> ${res.fileSize} · <strong>Tag:</strong> ${res.tag}</p>`,
      res.downloadFilename
    );
    showToast(`📥 Solved guide downloaded: "${res.title}"`);
  };

  // Filter feed items based on category and live search query
  const filteredFeedItems = useMemo(() => {
    return RESOURCE_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSa = item.titleSa.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchOrg = item.organizer.toLowerCase().includes(q);
      const matchHighlights = item.highlights.some((h) => h.toLowerCase().includes(q));

      return matchTitle || matchSa || matchSummary || matchOrg || matchHighlights;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.title || !submitForm.organizer) return;
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setSubmitForm({
        title: '',
        category: 'events',
        organizer: '',
        date: '',
        mode: 'Online (Zoom / Meet)',
        description: '',
        contactEmail: '',
      });
      showToast('🎉 Thank you! Your Sanskrit event was submitted for review.');
    }, 1800);
  };

  return (
    <article className="philosophy-page free-resources-page resources-page" id="free-resources-page" lang="en">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="resources-toast-banner" role="status">
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="philosophy-container free-resources-container">
        {/* Navigation Breadcrumb */}
        <header className="philosophy-hero" style={{ paddingBottom: '1.25rem' }}>
          <div className="philosophy-hero-top">
            {onGoHome && (
              <button type="button" className="philosophy-crumb-btn" onClick={onGoHome} title="Return to Homepage">
                ← Home
              </button>
            )}
            {onOpenGrammar && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenGrammar} title="Open Sanskrit Grammar">
                व्याकरणम्
              </button>
            )}
            {onOpenCbseGuide && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenCbseGuide} title="Open CBSE Sanskrit Guide">
                CBSE Guide
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenPhilosophy} title="Open Philosophy">
                Darśana
              </button>
            )}
          </div>

          <span className="philosophy-kicker">Live News, Events &amp; Library · साधनानि</span>
          <h1 className="philosophy-title">
            Sanskrit Resources &amp; Live Events Feed · <span lang="sa">संस्कृत-वार्ताः साधनानि च</span>
          </h1>
          <p className="philosophy-secondary">
            CBSE circulars, National Sanskrit Olympiads, weekly shloka webinars, study vaults and hand-curated learning libraries
          </p>

          {/* Quick Action CTA Pill Bar */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            <button
              type="button"
              className="resources-submit-cta-btn"
              onClick={() => setIsSubmitModalOpen(true)}
              title="Submit your school's Sanskrit event or notice"
            >
              <span>📢</span>
              <span>Submit School Event / Notice</span>
            </button>
            {onOpenQuiz && (
              <button
                type="button"
                className="resources-hero-aux-btn"
                onClick={onOpenQuiz}
                title="Practice Sanskrit quizzes"
              >
                <span>🎯</span>
                <span>Chapter Quizzes</span>
              </button>
            )}
            {onOpenWorksheets && (
              <button
                type="button"
                className="resources-hero-aux-btn"
                onClick={onOpenWorksheets}
                title="Download printable worksheets"
              >
                <span>📑</span>
                <span>Worksheets</span>
              </button>
            )}
            {onOpenRegister && (
              <button
                type="button"
                className="resources-hero-aux-btn"
                onClick={onOpenRegister}
                title="Register for full Gurukul live access and premium study vault"
              >
                <span>⭐</span>
                <span>Join Gurukul</span>
              </button>
            )}
          </div>
        </header>

        {/* Live Breaking News Ticker */}
        <div className="resources-ticker-wrap" role="region" aria-label="Live Sanskrit News Ticker">
          <div className="resources-ticker-pill">
            <span className="resources-ticker-dot" />
            <span>Live Updates</span>
          </div>
          <div className="resources-ticker-content" title={LIVE_TICKER_ITEMS[tickerIndex]}>
            {LIVE_TICKER_ITEMS[tickerIndex]}
          </div>
        </div>

        {/* Mascot Guidance Callout */}
        <BodhiTipCallout
          title="Bodhi's Resource Desk (बोधि-मार्गदर्शनम्)"
          sanskritTitle="विद्याधनं सर्वधनप्रधानम्"
          mood="scholar"
        >
          <p>
            Welcome to the <strong>Gurukul Live Feed &amp; Resources Hub</strong>! Whether preparing for CBSE Class 7/8 exams, joining the <em>National Sanskrit Olympiad 2026</em>, or exploring classical dictionaries, sync upcoming dates directly to your calendar or download 1-click printable revision sheets below.
          </p>
        </BodhiTipCallout>

        {/* Main Tab Segment Switcher */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            margin: '1.75rem 0 1.25rem',
            padding: '0.4rem',
            background: '#f4ede2',
            borderRadius: '14px',
            border: '1px solid #ebdcc5',
            flexWrap: 'wrap',
          }}
          role="tablist"
          aria-label="Resources views"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'feed'}
            onClick={() => setActiveTab('feed')}
            style={{
              flex: '1 1 200px',
              padding: '0.75rem 1.1rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.92rem',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'feed' ? '#ffffff' : 'transparent',
              color: activeTab === 'feed' ? '#b45309' : '#57534e',
              boxShadow: activeTab === 'feed' ? '0 2px 8px rgba(180, 83, 9, 0.15)' : 'none',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
            }}
          >
            <span>🔴</span>
            <span>Live News &amp; Events Feed</span>
            <span style={{ fontSize: '0.75rem', background: '#fef3c7', padding: '0.1rem 0.45rem', borderRadius: '999px', color: '#92400e' }}>
              {RESOURCE_ITEMS.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'vault'}
            onClick={() => setActiveTab('vault')}
            style={{
              flex: '1 1 200px',
              padding: '0.75rem 1.1rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.92rem',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'vault' ? '#ffffff' : 'transparent',
              color: activeTab === 'vault' ? '#0f766e' : '#57534e',
              boxShadow: activeTab === 'vault' ? '0 2px 8px rgba(15, 118, 110, 0.15)' : 'none',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
            }}
          >
            <span>📥</span>
            <span>Study Vault &amp; Solved Guides</span>
            <span style={{ fontSize: '0.75rem', background: '#ccfbf1', padding: '0.1rem 0.45rem', borderRadius: '999px', color: '#0f766e' }}>
              4 Free
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'library'}
            onClick={() => setActiveTab('library')}
            style={{
              flex: '1 1 200px',
              padding: '0.75rem 1.1rem',
              borderRadius: '10px',
              fontWeight: 800,
              fontSize: '0.92rem',
              border: 'none',
              cursor: 'pointer',
              background: activeTab === 'library' ? '#ffffff' : 'transparent',
              color: activeTab === 'library' ? '#1e3a8a' : '#57534e',
              boxShadow: activeTab === 'library' ? '0 2px 8px rgba(30, 58, 138, 0.15)' : 'none',
              transition: 'all 0.18s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
            }}
          >
            <span>📚</span>
            <span>Curated Web Library</span>
            <span style={{ fontSize: '0.75rem', background: '#dbeafe', padding: '0.1rem 0.45rem', borderRadius: '999px', color: '#1e3a8a' }}>
              6 Sections
            </span>
          </button>
        </div>

        {/* TAB 1: LIVE NEWS & EVENTS FEED */}
        {activeTab === 'feed' && (
          <section aria-labelledby="live-feed-heading">
            <h2 id="live-feed-heading" className="free-resources-sr">Live News &amp; Events Feed</h2>
            
            {/* Filter Pills and Live Search Box */}
            <div className="resources-filters-bar">
              <div className="resources-filter-pills" role="radiogroup" aria-label="Filter events by category">
                <button
                  type="button"
                  className={`resources-filter-btn${selectedCategory === 'all' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('all')}
                >
                  🌟 All Updates ({RESOURCE_ITEMS.length})
                </button>
                <button
                  type="button"
                  className={`resources-filter-btn${selectedCategory === 'news' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('news')}
                >
                  📢 News &amp; Circulars
                </button>
                <button
                  type="button"
                  className={`resources-filter-btn${selectedCategory === 'events' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('events')}
                >
                  🗓️ Live Events &amp; Webinars
                </button>
                <button
                  type="button"
                  className={`resources-filter-btn${selectedCategory === 'competitions' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('competitions')}
                >
                  🏆 Olympiads &amp; Competitions
                </button>
                <button
                  type="button"
                  className={`resources-filter-btn${selectedCategory === 'study_materials' ? ' active' : ''}`}
                  onClick={() => setSelectedCategory('study_materials')}
                >
                  📥 Study Guides &amp; Vault
                </button>
              </div>

              <div className="resources-search-box">
                <span className="resources-search-icon" aria-hidden="true">🔍</span>
                <input
                  type="search"
                  className="resources-search-input"
                  placeholder="Filter news, events, circulars, webinars…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Filter news and events"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="resources-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search query"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: '#6b7280', fontSize: '0.86rem', fontWeight: 600 }}>
              <span>Showing {filteredFeedItems.length} active updates &amp; opportunities</span>
              {searchQuery && <span>Filtering for: "{searchQuery}"</span>}
            </div>

            {/* Feed Cards Grid */}
            <div className="resources-feed-grid">
              {filteredFeedItems.map((item) => {
                const badgeStyle = getStatusBadgeStyle(item.status);
                const isCalendarSupported = item.category === 'events' || item.category === 'competitions';

                return (
                  <article key={item.id} className="resource-feed-card" id={`item-${item.id}`}>
                    <div className="resource-card-header">
                      <span
                        className="resource-card-badge"
                        style={{
                          background: badgeStyle.bg,
                          color: badgeStyle.color,
                          border: `1px solid ${badgeStyle.border}`,
                        }}
                      >
                        {item.statusLabel}
                      </span>
                      <span className="resource-card-meta-date">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="resource-card-title">
                      {item.title}
                      <span className="resource-card-title-sa">{item.titleSa}</span>
                    </h3>

                    <div className="resource-card-organizer">
                      <span>🏛️ {item.organizer}</span>
                      {item.mode && <span className="resource-card-mode-pill">· {item.mode}</span>}
                    </div>

                    <p className="resource-card-desc">{item.summary}</p>

                    <div className="resource-card-highlights">
                      <span className="resource-highlights-title">Highlights:</span>
                      <ul>
                        {item.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="resource-card-footer">
                      {item.actionLink ? (
                        <a
                          href={item.actionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="resource-action-primary-btn"
                        >
                          <span>{item.actionLabel || 'Visit / Participate'}</span>
                          <span aria-hidden="true">↗</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="resource-action-primary-btn"
                          onClick={() => setSelectedItemModal(item)}
                        >
                          <span>{item.actionLabel || 'View Details'}</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      )}

                      <div className="resource-card-aux-actions">
                        {isCalendarSupported && (
                          <button
                            type="button"
                            className="resource-action-icon-btn"
                            onClick={() => handleAddToCalendar(item)}
                            title="Add to Calendar (.ics)"
                          >
                            <span aria-hidden="true">📅</span>
                            <span>Calendar</span>
                          </button>
                        )}
                        <button
                          type="button"
                          className="resource-action-icon-btn"
                          onClick={() => handleCopyLink(item)}
                          title="Copy shareable link"
                        >
                          <span aria-hidden="true">🔗</span>
                          <span>Share</span>
                        </button>
                        <button
                          type="button"
                          className="resource-action-icon-btn"
                          onClick={() => setSelectedItemModal(item)}
                          title="View full details"
                        >
                          <span aria-hidden="true">👁️</span>
                          <span>Details</span>
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {filteredFeedItems.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#fff', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
                <h3 style={{ margin: '0 0 0.25rem', color: '#1f2937' }}>No updates match your search</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>
                  Try clearing your search query or selecting "All Updates".
                </p>
                <button
                  type="button"
                  className="resources-submit-cta-btn"
                  style={{ marginTop: '1.25rem' }}
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* TAB 2: STUDY VAULT & 1-CLICK DOWNLOADS */}
        {activeTab === 'vault' && (
          <section className="resources-vault-section" aria-labelledby="study-vault-heading">
            <div className="resources-vault-header">
              <span className="resources-vault-badge">✦ Instant Study Vault · निःशुल्क-साधनानि ✦</span>
              <h2 id="study-vault-heading" className="resources-vault-title">
                Printable Sanskrit Guides, Question Banks &amp; Posters
              </h2>
              <p className="resources-vault-desc">
                High-yield revision tools designed specifically for CBSE Sanskrit students and teachers. Click to generate instant printable study documents.
              </p>
            </div>

            {/* Featured Official Academy Wall Poster Banner */}
            <div className="vedic-poster-banner">
              <div
                className="vedic-poster-thumb-wrap"
                onClick={() => setIsPosterModalOpen(true)}
                title="Click to preview full-size poster"
              >
                <img
                  src="/vedic-maths-16-sutras-poster.jpg"
                  alt="EdNet Learn 16 Foundational Sutras of Vedic Mathematics Infographic Poster"
                  className="vedic-poster-thumb-img"
                />
              </div>
              <div className="vedic-poster-content">
                <span className="vedic-poster-badge">✦ Official Academy Wall Poster ✦</span>
                <h3 className="vedic-poster-title">16 Foundational Sutras of Vedic Mathematics</h3>
                <p className="vedic-poster-quote">
                  "Vedic Mathematics is not just a method, it is a way of thinking." — Swami Bharati Krishna Tirtha
                </p>
                <p className="vedic-poster-desc">
                  The complete 16 sutras with Sanskrit aphorisms, English translations, and worked arithmetic &amp; algebraic examples for rapid mental calculation (Ekādhikena, Nikhilam, Ūrdhva-Tiryagbhyām, Parāvartya, and more).
                </p>
                <div className="vedic-poster-actions">
                  <button
                    type="button"
                    className="vedic-poster-btn-primary"
                    onClick={() => setIsPosterModalOpen(true)}
                  >
                    <span>🔍</span>
                    <span>View Full Poster</span>
                  </button>
                  <a
                    href="/vedic-maths-16-sutras-poster.jpg"
                    download="EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.jpg"
                    className="vedic-poster-btn-secondary"
                  >
                    <span>📥</span>
                    <span>Download High-Res (JPG)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="resources-vault-grid">
              {QUICK_DOWNLOAD_RESOURCES.map((res) => (
                <div key={res.id} className="resource-vault-card">
                  <div className="resource-vault-head">
                    <span className="resource-vault-icon" aria-hidden="true">{res.icon}</span>
                    <span className="resource-vault-cat">{res.category}</span>
                  </div>
                  <h3 className="resource-vault-card-title">
                    {res.title}
                    <span className="resource-vault-card-sa">{res.titleSa}</span>
                  </h3>
                  <p className="resource-vault-card-desc">{res.description}</p>
                  <div className="resource-vault-card-meta">
                    <span>📄 {res.fileSize}</span>
                    <span>⭐ {res.format}</span>
                  </div>
                  <button
                    type="button"
                    className="resource-vault-download-btn"
                    onClick={() => handleQuickDownload(res)}
                  >
                    <span>📥</span>
                    <span>Download Solved Guide</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 3: CURATED EXTERNAL SANSKRIT WEB LIBRARY */}
        {activeTab === 'library' && (
          <section className="philosophy-section" aria-labelledby="free-resources-intro">
            <h2 id="free-resources-intro" className="free-resources-sr">Curated Sanskrit Web Library</h2>
            <p>
              Learning Sanskrit goes best with plenty of reading, listening and looking things up. This
              directory brings together trusted free resources from the wider Sanskrit community, to use
              alongside your Gurukul lessons here. Use a dictionary while you read a Deepakam chapter,
              try a spoken-Sanskrit class, or look up a rule in a classic grammar.
            </p>
            <p className="free-resources-note">
              <strong>Note:</strong> All links below open external websites that EdNet Learn does not
              run. We checked every link and description in {LAST_CHECKED}, but sites can change their
              content, pricing or addresses.
            </p>
            <nav className="free-resources-toc" aria-label="Resource sections">
              {SECTIONS.map((section) => (
                <a key={section.id} href={`#res-${section.id}`} className="free-resources-toc-link">
                  <span aria-hidden="true">{section.icon}</span> {section.title}
                </a>
              ))}
            </nav>

            {SECTIONS.map((section) => (
              <section
                key={section.id}
                id={`res-${section.id}`}
                className="philosophy-section free-resources-section"
                aria-labelledby={`res-${section.id}-heading`}
                style={{ marginTop: '2rem' }}
              >
                <h3 id={`res-${section.id}-heading`} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '1.25rem', color: '#9a3423' }}>
                  <span aria-hidden="true">{section.icon}</span> {section.title}{' '}
                  <span className="free-resources-section-sa" lang="sa">
                    · {section.titleSa}
                  </span>
                </h3>
                {section.intro && <p style={{ fontSize: '0.94rem', color: '#57534e' }}>{section.intro}</p>}

                {section.id === 'vedic-maths' && (
                  <>
                    <div className="vedic-starting-path-card">
                      <div className="vedic-path-badge">🎯 Recommended 4-Step Learning Sequence</div>
                      <h3>A Practical Starting Path with the 16 Sutras</h3>
                      <ol className="vedic-path-steps">
                        <li>
                          <strong>Pick 2–3 Frequent Sutras:</strong> Start with sutras that solve arithmetic problems you actually encounter often — e.g., <em>Nikhilaṁ Navataścaramam</em> for multiplication near powers of 10 (like 98 × 97), or <em>Dvandva / Ekādhikena</em> for squaring numbers ending in 5 (like 65², 75²).
                        </li>
                        <li>
                          <strong>Watch a Video Walkthrough:</strong> Focus on just those 2–3 sutras on YouTube to absorb the visual cross-multiplication or base-complement patterns with worked examples.
                        </li>
                        <li>
                          <strong>Drill 10–15 Problems Daily:</strong> Pair sutra techniques with a free timed mental-math test site (5 minutes a day) until the calculation pattern becomes automatic without scratch paper.
                        </li>
                        <li>
                          <strong>Add One New Sutra per Week:</strong> Expand gradually through the remaining 14 sutras rather than trying to absorb all 16 at once.
                        </li>
                      </ol>
                    </div>

                    <div className="vedic-poster-banner" style={{ margin: '1.5rem 0' }}>
                      <div
                        className="vedic-poster-thumb-wrap"
                        onClick={() => setIsPosterModalOpen(true)}
                        title="Click to preview full-size poster"
                      >
                        <img
                          src="/vedic-maths-16-sutras-poster.jpg"
                          alt="EdNet Learn 16 Foundational Sutras of Vedic Mathematics Infographic Poster"
                          className="vedic-poster-thumb-img"
                        />
                      </div>
                      <div className="vedic-poster-content">
                        <span className="vedic-poster-badge">✦ Official Academy Wall Poster ✦</span>
                        <h4 className="vedic-poster-title">16 Foundational Sutras of Vedic Mathematics</h4>
                        <p className="vedic-poster-quote">
                          "These sutras are not merely rules for calculation, but keys to a higher way of thinking." — Swami Bharati Krishna Tirtha
                        </p>
                        <p className="vedic-poster-desc">
                          The official EdNet Learn Vedic Maths Academy reference poster matching our core curriculum. Features all 16 foundational formulas with clear step-by-step examples.
                        </p>
                        <div className="vedic-poster-actions">
                          <button
                            type="button"
                            className="vedic-poster-btn-primary"
                            onClick={() => setIsPosterModalOpen(true)}
                          >
                            <span>🔍</span>
                            <span>View Full Poster</span>
                          </button>
                          <a
                            href="/vedic-maths-16-sutras-poster.jpg"
                            download="EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.jpg"
                            className="vedic-poster-btn-secondary"
                          >
                            <span>📥</span>
                            <span>Download High-Res (JPG)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="free-resources-grid">
                  {section.entries.map((entry) => (
                    <div key={entry.name} className="free-resources-card">
                      <div className="free-resources-card-head">
                        <h4>
                          {entry.name}
                          {entry.nameSa && (
                            <span className="free-resources-card-sa" lang="sa">
                              {' '}
                              {entry.nameSa}
                            </span>
                          )}
                        </h4>
                        {entry.tag && <span className="free-resources-tag">{entry.tag}</span>}
                      </div>
                      <p>{entry.description}</p>
                      <div className="free-resources-links">
                        {entry.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="free-resources-link"
                          >
                            <span>{link.label}</span>
                            <span className="free-resources-sr"> (opens external website)</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </section>
        )}

        <footer className="free-resources-footnote" style={{ marginTop: '3rem', borderTop: '1px solid #ebdcc5', paddingTop: '1.5rem' }}>
          <p>
            Suggestions or corrections? If you maintain a high-quality free Sanskrit resource or notice a broken link,{' '}
            <button
              type="button"
              className="resources-crumb-text-btn"
              style={{ background: 'none', border: 'none', color: '#9a3423', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => setIsSubmitModalOpen(true)}
            >
              let us know via our event notice submission desk
            </button>.
          </p>
        </footer>
      </div>

      {/* EVENT DETAILS MODAL */}
      {selectedItemModal && (
        <div
          className="resources-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
          onClick={() => setSelectedItemModal(null)}
        >
          <div className="resources-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resources-modal-header">
              <span
                className="resource-card-badge"
                style={{
                  background: getStatusBadgeStyle(selectedItemModal.status).bg,
                  color: getStatusBadgeStyle(selectedItemModal.status).color,
                  border: `1px solid ${getStatusBadgeStyle(selectedItemModal.status).border}`,
                }}
              >
                {selectedItemModal.statusLabel}
              </span>
              <button
                type="button"
                className="resources-modal-close-btn"
                onClick={() => setSelectedItemModal(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <h3 id="modal-event-title" className="resources-modal-title">
              {selectedItemModal.title}
              <span className="resource-card-title-sa">{selectedItemModal.titleSa}</span>
            </h3>

            <div className="resources-modal-meta-grid">
              <div>
                <span className="resources-meta-label">Organizer:</span>
                <strong>{selectedItemModal.organizer}</strong>
              </div>
              <div>
                <span className="resources-meta-label">Date:</span>
                <strong>{selectedItemModal.date}</strong>
              </div>
              <div>
                <span className="resources-meta-label">Format / Mode:</span>
                <strong>{selectedItemModal.mode || 'Online'}</strong>
              </div>
            </div>

            <div className="resources-modal-body">
              <p className="resources-modal-desc">{selectedItemModal.summary}</p>
              <h4>Key Highlights &amp; Syllabus Details:</h4>
              <ul>
                {selectedItemModal.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            <div className="resources-modal-actions">
              {(selectedItemModal.category === 'events' || selectedItemModal.category === 'competitions') && (
                <button
                  type="button"
                  className="resource-action-icon-btn"
                  onClick={() => handleAddToCalendar(selectedItemModal)}
                >
                  <span>📅</span>
                  <span>Add to Calendar (.ics)</span>
                </button>
              )}
              <button
                type="button"
                className="resource-action-icon-btn"
                onClick={() => handleCopyLink(selectedItemModal)}
              >
                <span>🔗</span>
                <span>Copy Link</span>
              </button>
              {selectedItemModal.actionLink && (
                <a
                  href={selectedItemModal.actionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resource-action-primary-btn"
                >
                  <span>{selectedItemModal.actionLabel || 'Visit Official Link'}</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION MODAL FOR SCHOOLS AND TEACHERS */}
      {isSubmitModalOpen && (
        <div
          className="resources-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-submit-title"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div className="resources-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resources-modal-header">
              <span className="resource-card-badge" style={{ background: '#fef3c7', color: '#92400e' }}>
                📢 Sanskrit Community Notice Desk
              </span>
              <button
                type="button"
                className="resources-modal-close-btn"
                onClick={() => setIsSubmitModalOpen(false)}
                aria-label="Close form modal"
              >
                ✕
              </button>
            </div>

            <h3 id="modal-submit-title" className="resources-modal-title">
              Submit Your School Event or Sanskrit Announcement
              <span className="resource-card-title-sa">कार्यक्रम-विज्ञापन-प्रस्तावः</span>
            </h3>

            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#065f46' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem' }}>Event Submitted Successfully!</h4>
                <p style={{ margin: 0, fontSize: '0.92rem', color: '#047857' }}>
                  Our Gurukul editorial team will review and publish your notice on the live feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitEvent} className="resources-submit-form">
                <div className="resources-form-grid">
                  <div className="resources-form-field">
                    <label htmlFor="ev-title">Event Title *</label>
                    <input
                      id="ev-title"
                      type="text"
                      required
                      placeholder="e.g., Inter-School Sanskrit Shloka Recitation 2026"
                      value={submitForm.title}
                      onChange={(e) => setSubmitForm({ ...submitForm, title: e.target.value })}
                    />
                  </div>

                  <div className="resources-form-field">
                    <label htmlFor="ev-cat">Category *</label>
                    <select
                      id="ev-cat"
                      value={submitForm.category}
                      onChange={(e) => setSubmitForm({ ...submitForm, category: e.target.value })}
                    >
                      <option value="events">Live Event / Webinar</option>
                      <option value="competitions">Competition / Olympiad</option>
                      <option value="news">Academic Notice / Circular</option>
                    </select>
                  </div>

                  <div className="resources-form-field">
                    <label htmlFor="ev-org">Organizing School / Institution *</label>
                    <input
                      id="ev-org"
                      type="text"
                      required
                      placeholder="e.g., Kendriya Vidyalaya / Sanskrit Bharati"
                      value={submitForm.organizer}
                      onChange={(e) => setSubmitForm({ ...submitForm, organizer: e.target.value })}
                    />
                  </div>

                  <div className="resources-form-field">
                    <label htmlFor="ev-date">Date &amp; Time</label>
                    <input
                      id="ev-date"
                      type="text"
                      placeholder="e.g., October 12, 2026 · 10:00 AM IST"
                      value={submitForm.date}
                      onChange={(e) => setSubmitForm({ ...submitForm, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="resources-form-field" style={{ marginTop: '0.75rem' }}>
                  <label htmlFor="ev-desc">Event Summary &amp; Eligibility</label>
                  <textarea
                    id="ev-desc"
                    rows={3}
                    placeholder="Brief description of the event, eligibility grades (e.g. Classes 6–10), and instructions..."
                    value={submitForm.description}
                    onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                  />
                </div>

                <div className="resources-form-field" style={{ marginTop: '0.75rem' }}>
                  <label htmlFor="ev-email">Contact Email (for verification)</label>
                  <input
                    id="ev-email"
                    type="email"
                    placeholder="teacher@school.edu.in"
                    value={submitForm.contactEmail}
                    onChange={(e) => setSubmitForm({ ...submitForm, contactEmail: e.target.value })}
                  />
                </div>

                <div className="resources-form-actions">
                  <button
                    type="button"
                    className="resources-form-cancel-btn"
                    onClick={() => setIsSubmitModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="resources-form-submit-btn">
                    Submit Event Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* POSTER LIGHTBOX MODAL */}
      {isPosterModalOpen && (
        <div
          className="resources-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-poster-title"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div className="resources-modal-content" style={{ maxWidth: '900px' }} onClick={(e) => e.stopPropagation()}>
            <div className="resources-modal-header">
              <span className="resource-card-badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                EdNet Learn Vedic Maths Academy
              </span>
              <button
                type="button"
                className="resources-modal-close-btn"
                onClick={() => setIsPosterModalOpen(false)}
                aria-label="Close poster modal"
              >
                ✕
              </button>
            </div>

            <h3 id="modal-poster-title" className="resources-modal-title" style={{ marginBottom: '0.25rem' }}>
              16 Foundational Sutras of Vedic Mathematics
              <span className="resource-card-title-sa">षोडश-वैदिक-गणित-सूत्राणि</span>
            </h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: '#4338ca', fontStyle: 'italic' }}>
              "Vedic Mathematics is not just a method, it is a way of thinking." — Swami Bharati Krishna Tirtha
            </p>

            <div className="vedic-modal-image-wrap">
              <img
                src="/vedic-maths-16-sutras-poster.jpg"
                alt="16 Foundational Sutras of Vedic Mathematics Wall Poster"
                className="vedic-modal-image"
              />
            </div>

            <div className="resources-modal-actions" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                className="resource-action-icon-btn"
                onClick={() => setIsPosterModalOpen(false)}
              >
                <span>✕</span>
                <span>Close</span>
              </button>
              <a
                href="/vedic-maths-16-sutras-poster.jpg"
                download="EdNet_Learn_16_Foundational_Sutras_Vedic_Maths.jpg"
                className="vedic-poster-btn-primary"
              >
                <span>📥</span>
                <span>Download High-Resolution Poster (JPG)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default FreeResourcesPage;
