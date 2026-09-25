import React from 'react';
import '../styles/philosophy.css';
import '../styles/free-resources.css';

export interface FreeResourcesPageProps {
  onGoHome?: () => void;
  onOpenGrammar?: () => void;
  onOpenCbseGuide?: () => void;
  onOpenPhilosophy?: () => void;
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
];

const FreeResourcesPage: React.FC<FreeResourcesPageProps> = ({
  onGoHome,
  onOpenGrammar,
  onOpenCbseGuide,
  onOpenPhilosophy,
}) => {
  return (
    <article className="philosophy-page free-resources-page" id="free-resources-page" lang="en">
      <div className="philosophy-container free-resources-container">
        <header className="philosophy-hero">
          <div className="philosophy-hero-top">
            {onGoHome && (
              <button type="button" className="philosophy-crumb-btn" onClick={onGoHome}>
                ← Home
              </button>
            )}
            {onOpenGrammar && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenGrammar}>
                व्याकरणम्
              </button>
            )}
            {onOpenCbseGuide && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenCbseGuide}>
                CBSE Guide
              </button>
            )}
            {onOpenPhilosophy && (
              <button type="button" className="philosophy-crumb-btn" onClick={onOpenPhilosophy}>
                Darśana
              </button>
            )}
          </div>

          <span className="philosophy-kicker">Library · ग्रन्थालयः</span>
          <h1 className="philosophy-title">
            Free Sanskrit Resources · <span lang="sa">संस्कृत-साधनानि</span>
          </h1>
          <p className="philosophy-secondary">
            Courses, dictionaries, texts and grammars to use alongside your lessons here
          </p>
        </header>

        <section className="philosophy-section" aria-labelledby="free-resources-intro">
          <h2
            id="free-resources-intro"
            style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
          >
            Introduction
          </h2>
          <p>
            Learning Sanskrit goes best with plenty of reading, listening and looking things up. This
            page brings together trusted free resources from the wider Sanskrit community, to use
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
        </section>

        {SECTIONS.map((section) => (
          <section
            key={section.id}
            id={`res-${section.id}`}
            className="philosophy-section free-resources-section"
            aria-labelledby={`res-${section.id}-heading`}
          >
            <h2 id={`res-${section.id}-heading`}>
              <span aria-hidden="true">{section.icon}</span> {section.title}{' '}
              <span className="free-resources-section-sa" lang="sa">
                · {section.titleSa}
              </span>
            </h2>
            {section.intro && <p>{section.intro}</p>}
            <div className="free-resources-grid">
              {section.entries.map((entry) => (
                <div key={entry.name} className="free-resources-card">
                  <div className="free-resources-card-head">
                    <h3>
                      {entry.name}
                      {entry.nameSa && (
                        <span className="free-resources-card-sa" lang="sa">
                          {' '}
                          {entry.nameSa}
                        </span>
                      )}
                    </h3>
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
                        {link.label} <span aria-hidden="true">↗</span>
                        <span className="free-resources-sr"> (opens in a new tab)</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="free-resources-footnote">
          Know a great free Sanskrit resource we should list, or found a broken link? Tell us through
          the Help widget. Links last checked: {LAST_CHECKED}.
        </p>
      </div>
    </article>
  );
};

export default FreeResourcesPage;
