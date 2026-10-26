/**
 * After `vite build`, write one index.html per public route so the first
 * HTML response (before JS) carries that route's title, description,
 * Open Graph tags, and canonical. Strings are read from VIEW_METADATA and
 * BARAKHADI_METADATA in src/components/Dashboard.tsx — do not duplicate copy.
 *
 * Vercel serves an existing file before the SPA rewrite. vercel.json also
 * maps each route onto its shell so a trailing-slash request cannot fall
 * through to the homepage document.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'https://ednetlearn.in';

/** Dashboard view key -> public path. Trailing slash only on home. */
const PATH_BY_VIEW = {
  home: '/',
  course: '/course',
  reader: '/reader',
  grammar: '/grammar',
  dhatupatha: '/dhatupatha',
  'vedic-maths': '/vedic-maths',
  board: '/board',
  worksheets: '/worksheets',
  quiz: '/quiz',
  'cbse-guide': '/cbse-sanskrit-guide',
  resources: '/resources',
  philosophy: '/philosophy',
  faq: '/faq',
  certificate: '/certificate',
  'science-lab': '/vignana-lab',
};

const REQUIRED_PATHS = [
  '/',
  '/course',
  '/reader',
  '/barakhadi',
  '/grammar',
  '/dhatupatha',
  '/vedic-maths',
  '/board',
  '/worksheets',
  '/quiz',
  '/cbse-sanskrit-guide',
  '/resources',
  '/philosophy',
  '/faq',
  '/certificate',
  '/vignana-lab',
  '/swar',
  '/learn-sanskrit-online-free',
  '/spoken-sanskrit-course',
  '/sanskrit-for-kids',
  '/cbse-sanskrit-classes',
  '/sanskrit-grammar-lessons',
  '/sanskrit-pronunciation-guide',
  '/science-lab-games',
];

function extractObjectLiteral(source, exportName) {
  const marker = `export const ${exportName}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Could not find ${marker} in Dashboard.tsx`);
  // Skip the TypeScript type annotation (`Record<..., { ... }> = {`).
  const eq = source.indexOf('= {', start);
  if (eq < 0) throw new Error(`Could not find value object for ${exportName}`);
  const brace = eq + 2;
  let depth = 0;
  for (let i = brace; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(brace, i + 1);
    }
  }
  throw new Error(`Unclosed object for ${exportName}`);
}

function parseViewMetadata(objectSrc) {
  const re =
    /(?:'([^']+)'|([A-Za-z_][\w-]*))\s*:\s*\{\s*title:\s*'([^']*)',\s*desc:\s*'([^']*)',/g;
  const out = {};
  for (const match of objectSrc.matchAll(re)) {
    out[match[1] || match[2]] = { title: match[3], desc: match[4] };
  }
  return out;
}

function parseSingleMeta(objectSrc) {
  const title = objectSrc.match(/title:\s*'([^']*)'/);
  const desc = objectSrc.match(/desc:\s*'([^']*)'/);
  if (!title || !desc) throw new Error('Could not parse BARAKHADI_METADATA');
  return { title: title[1], desc: desc[1] };
}

function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceTag(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`SEO inject missed ${label}`);
  pattern.lastIndex = 0;
  return html.replace(pattern, replacement);
}

function getRouteJsonLd(pathname, meta) {
  const canonical = pathname === '/' ? `${HOST}/` : `${HOST}${pathname}`;
  const baseBreadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${HOST}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: meta.title.split('|')[0].trim(),
        item: canonical,
      },
    ],
  };

  const schemas = [baseBreadcrumbs];

  if (pathname === '/') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Sanskrit Online Classes with Bodhi: Beginner to Advanced Gurukul',
      description: 'Interactive Sanskrit online classes guided by Bodhi: Spoken Sanskrit, CBSE NCERT Classes 6–10, Pāṇinian Vyakaran, and Vedic Mathematics with live audio pronunciation.',
      provider: {
        '@type': 'EducationalOrganization',
        name: 'EdNet Learn Gurukul',
        url: canonical,
        logo: `${HOST}/logo.jpg`,
      },
      hasCourseInstance: [
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT15M/day',
          name: 'Spoken Sanskrit & Varṇamālā Foundation',
          description: '15-minute daily micro-classes on 400+ Sanskrit sounds, conversational greetings, and spoken vocabulary.',
        },
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT30M/day',
          name: 'CBSE & NCERT Sanskrit School Coaching (Classes 6–10)',
          description: 'NCERT Deepakam line-by-line solutions, question formation (प्रश्ननिर्माणम्), and board exam blueprint preparation.',
        },
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT30M/day',
          name: 'Pāṇinian Vyakaran & Shloka Recitation',
          description: 'Scientific derivation of Sanskrit words, 7 Vibhaktis, 5 Lakāras, and sacred shloka chanting cadence.',
        },
        {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: 'PT20M/day',
          name: 'Vedic Mathematics & Astronomical Science',
          description: '16 Vedic Sutras for lightning mental arithmetic, Baudhayana geometry, and astronomical calculations.',
        },
      ],
    });
    // Embedded educational video showcases on homepage
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Sanskrit: The Science of Sound · ध्वनि-विज्ञानम्',
      description: 'Explore the neuro-acoustic precision, 5 articulation points (Kaṇṭha, Tālu, Mūrdhā, Danta, Oṣṭha), and resonant frequencies of Sanskrit phonetics.',
      thumbnailUrl: [
        'https://img.youtube.com/vi/tkvYjNZSsZA/maxresdefault.jpg',
        'https://img.youtube.com/vi/tkvYjNZSsZA/hqdefault.jpg',
      ],
      uploadDate: '2024-01-01T08:00:00+05:30',
      duration: 'PT12M34S',
      contentUrl: 'https://www.youtube.com/watch?v=tkvYjNZSsZA',
      embedUrl: 'https://www.youtube-nocookie.com/embed/tkvYjNZSsZA?start=32&rel=0',
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vedic Mathematics: The Ancient Secret of Mental Calculation',
      description: 'Masterclass on the 16 Vedic Mathematics Sūtras, lightning cross-multiplication, and ancient Indian computational algorithms.',
      thumbnailUrl: [
        'https://img.youtube.com/vi/bp9m53Tp6xg/maxresdefault.jpg',
        'https://img.youtube.com/vi/bp9m53Tp6xg/hqdefault.jpg',
      ],
      uploadDate: '2024-01-01T08:00:00+05:30',
      duration: 'PT30M40S',
      contentUrl: 'https://www.youtube.com/watch?v=bp9m53Tp6xg',
      embedUrl: 'https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=11&rel=0',
    });
  } else if (pathname === '/reader') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'NCERT Class 7 Sanskrit Deepakam Solutions & Interactive Reader',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Class 7 CBSE / NCERT Middle School',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: ['Textbook', 'Interactive Exercise', 'Word-by-Word Translation', 'Audio Guide'],
      teaches: 'Sanskrit Language, NCERT Deepakam Textbook, Sandhi, Shabdroop, Anvaya',
    });
  } else if (pathname === '/vedic-maths') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Vedic Mathematics: The Ancient Secret of Mental Calculation',
      description: 'Masterclass on the 16 Vedic Mathematics Sūtras, lightning cross-multiplication, and ancient Indian computational algorithms.',
      thumbnailUrl: [
        'https://img.youtube.com/vi/bp9m53Tp6xg/maxresdefault.jpg',
        'https://img.youtube.com/vi/bp9m53Tp6xg/hqdefault.jpg',
      ],
      uploadDate: '2024-01-01T08:00:00+05:30',
      duration: 'PT30M40S',
      contentUrl: 'https://www.youtube.com/watch?v=bp9m53Tp6xg',
      embedUrl: 'https://www.youtube-nocookie.com/embed/bp9m53Tp6xg?start=11&rel=0',
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Vedic Mathematics Mental Arithmetic Lab',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Beginner to Advanced',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: ['Course', 'Interactive Exercise'],
      teaches: '16 Vedic Mathematics Sutras, Mental Calculation, Baudhayana Geometry',
    });
  } else if (pathname === '/vignana-lab' || pathname === '/science-lab' || pathname === '/science-lab-games') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Science Lab Games · Vijñāna Lab STEM Simulations',
      applicationCategory: 'EducationalGame',
      operatingSystem: 'Any (Web browser)',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      description: meta.desc,
      url: canonical,
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Vijñāna Science Lab: STEM Games & Physics Sandboxes with Sanskrit',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Preschool, Primary CBSE 3–5, Middle CBSE 6–8, High School CBSE 9–12, Scholar',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: ['EducationalGame', 'Interactive Simulation', 'Lab Manual'],
      teaches: 'Atomic Physics, Celestial Gravity, Lunar Rocketry, Cymatic Acoustics, Vedic Geometry, Cellular Homeostasis',
    });
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Sulba Sūtras Geometric Proofs: Baudhayana Theorem & Vedic Astronomy',
      description: 'Demonstration of ancient Indian geometric rope measurements, Baudhayana theorem, and Vedic geometry.',
      thumbnailUrl: [
        'https://img.youtube.com/vi/bp9m53Tp6xg/maxresdefault.jpg',
        'https://img.youtube.com/vi/bp9m53Tp6xg/hqdefault.jpg',
      ],
      uploadDate: '2026-03-15T12:00:00+05:30',
      duration: 'PT30M40S',
      contentUrl: 'https://www.youtube.com/watch?v=bp9m53Tp6xg',
      embedUrl: 'https://www.youtube-nocookie.com/embed/bp9m53Tp6xg',
    });
  } else if (pathname === '/philosophy') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Classical Sanskrit Philosophy & Darśana Systems',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Intermediate to Scholar',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: 'Course',
      teaches: 'Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṁsā, Vedānta',
    });
  } else if (pathname === '/quiz') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: 'Interactive Sanskrit & Vedic Mathematics Quizzes',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Beginner to Advanced',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: 'Assessment',
      teaches: 'Sanskrit Alphabet, Paninian Grammar, Sandhi, Vedic Maths Sutras',
    });
  } else if (pathname === '/barakhadi') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Sanskrit Varṇamālā & Barakhadi 400+ Audio Chart',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Beginner to Intermediate',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: 'Pronunciation Guide',
      teaches: 'Sanskrit Phonetics, Devanagari Aksharas, Barakhadi Matras',
    });
  } else if (pathname === '/worksheets') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Printable & Interactive Sanskrit Practice Worksheets',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Class 6–10 CBSE / NCERT',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: 'Worksheet',
      teaches: 'NCERT Sanskrit Solutions, Devanagari Handwriting, Grammar Exercises',
    });
  } else if (pathname === '/dhatupatha') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Pāṇinian Dhātupāṭha Root Verb Engine (2000+ Roots)',
      description: meta.desc,
      url: canonical,
      inLanguage: ['sa', 'en'],
      teaches: 'Sanskrit Verb Roots (Dhātus), 10 Gaṇas, Paninian Morpho-syntax',
    });
  } else if (pathname === '/grammar') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Pāṇinian Sanskrit Grammar Studio & Sandhi Engine',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Intermediate to Advanced',
      inLanguage: ['sa', 'en', 'hi'],
      learningResourceType: 'Interactive Simulation',
      teaches: 'Paninian Grammar, Sandhi Rules, Subanta Declensions, Tinganta Conjugations',
    });
  } else if (pathname === '/faq') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can a complete beginner learn Sanskrit online at EdNet Learn Gurukul?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. EdNet Learn Gurukul starts with interactive Varṇamālā phonetics, mouth articulation diagrams, and gentle daily 15-minute lessons suitable for all ages.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does EdNet Learn cover CBSE and NCERT Sanskrit syllabus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we provide chapter-by-chapter coverage for NCERT Deepakam (Class 6, 7, 8) with word-by-word translations, anvaya, worksheets, and mock exams.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Vedic Mathematics help students?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Vedic Mathematics uses 16 core Sanskrit sutras to perform rapid mental arithmetic, cross-multiplication, and algebra up to 10x faster than conventional methods.',
          },
        },
      ],
    });
  } else if (pathname === '/cbse-sanskrit-guide') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Master CBSE NCERT Sanskrit Exams (Classes 7–10)',
      description: 'Step-by-step strategy for solving CBSE Sanskrit papers: Question formation (प्रश्ननिर्माणम्), unseen passage decoding, and applied grammar.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Section A (अपठित-अवबोधनम्)',
          text: 'Read the unseen passage twice; locate direct nominative (प्रथमा) and accusative (द्वितीया) answers; identify passage title using the core subject noun.',
        },
        {
          '@type': 'HowToStep',
          name: 'Section B (रचनात्मक-कार्यम्)',
          text: 'Fill letter blanks using the help box (मञ्जूषा); construct five simple sentences for picture description (चित्रवर्णनम्) using asti/santi.',
        },
        {
          '@type': 'HowToStep',
          name: 'Section C (अनुप्रयुक्त-व्याकरणम्)',
          text: 'Apply Sandhi rules (दीर्घ, गुण, वृद्धि, यण्, अयादि); match vibhakti endings for shabdroop; select correct lakāra for dhaturoop.',
        },
        {
          '@type': 'HowToStep',
          name: 'Section D (पठित-अवबोधनम्)',
          text: 'Fill verse anvaya by rearranging shloka meter into prose order; master Kim-family question words (कः, का, किम्, केन, कस्मै, कस्मात्, कस्य, कस्मिन्, कुत्र, कदा, कति, कथम्, किमर्थम्).',
        },
      ],
    });
  } else if (pathname === '/learn-sanskrit-online-free') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Learn Sanskrit Online Free: Step-by-Step Audio & Interactive Practice',
      description: meta.desc,
      url: canonical,
      isAccessibleForFree: true,
      educationalLevel: 'Beginner to Intermediate',
      inLanguage: ['sa', 'en', 'hi'],
      provider: {
        '@type': 'EducationalOrganization',
        name: 'EdNet Learn Gurukul',
        url: `${HOST}/`,
      },
    });
  } else if (pathname === '/spoken-sanskrit-course') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Spoken Sanskrit Course: Conversational Sanskrit & Daily Dialogues',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Beginner to Fluent',
      inLanguage: ['sa', 'en', 'hi'],
      teaches: 'Sanskrit Conversation, Daily Greetings, Sentence Structure, Listening Comprehension',
    });
  } else if (pathname === '/sanskrit-for-kids') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Sanskrit for Kids: Interactive Games, Jodo Tiles & Syllable Audio',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Early Childhood & Primary School',
      inLanguage: ['sa', 'en', 'hi'],
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'Children and Young Beginners',
      },
    });
  } else if (pathname === '/cbse-sanskrit-classes') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'CBSE Sanskrit Classes 6–10: NCERT Solutions & Exam Blueprint',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Class 6–10 CBSE Middle & High School',
      inLanguage: ['sa', 'en', 'hi'],
      teaches: 'NCERT Sanskrit Textbooks, Question Formation, Grammar Directives, Board Exam Blueprints',
    });
  } else if (pathname === '/sanskrit-grammar-lessons') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'Pāṇinian Sanskrit Grammar Lessons: Sandhi, Vibhakti & Dhātupāṭha',
      description: meta.desc,
      url: canonical,
      educationalLevel: 'Intermediate to Scholar',
      inLanguage: ['sa', 'en'],
      teaches: 'Paninian Vyakaran, Sandhi Rules, Subanta Declensions, Tinganta Verb Conjugations',
    });
  } else if (pathname === '/sanskrit-pronunciation-guide') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Sanskrit Pronunciation Guide: 400+ Audio Syllables & Articulation Science',
      description: meta.desc,
      url: canonical,
      learningResourceType: 'Pronunciation Guide',
      inLanguage: ['sa', 'en'],
      teaches: 'Sanskrit Phonetics, Sthāna and Karaṇa, Aspirated Sounds, Vedic Recitation Cadence',
    });
  }

  return `\n    <script type="application/ld+json">\n${JSON.stringify(schemas, null, 2)}\n    </script>\n`;
}

function applyMeta(html, meta, pathname) {
  const normalizedPath = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const canonical = `${HOST}${normalizedPath}`;
  const title = escapeAttr(meta.title);
  const desc = escapeAttr(meta.desc);
  const url = escapeAttr(canonical);
  let out = html;
  out = replaceTag(out, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title');
  out = replaceTag(
    out,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${desc}" />`,
    'description',
  );
  out = replaceTag(
    out,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
    'og:title',
  );
  out = replaceTag(
    out,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${desc}" />`,
    'og:description',
  );
  out = replaceTag(
    out,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  );
  out = replaceTag(
    out,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical',
  );
  out = replaceTag(
    out,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
    'twitter:title',
  );
  out = replaceTag(
    out,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${desc}" />`,
    'twitter:description',
  );
  if (process.env.GITHUB_PAGES || process.env.GH_PAGES) {
    const ghBase = '/sanskrit-teaching-web-app-from-beginner-to-advanced-';
    out = out.replaceAll('href="/manifest.json"', `href="${ghBase}/manifest.json"`);
    out = out.replaceAll('href="/favicon.ico"', `href="${ghBase}/favicon.ico"`);
    out = out.replaceAll('href="/apple-touch-icon.png"', `href="${ghBase}/apple-touch-icon.png"`);
    out = out.replaceAll('content="/logo.jpg"', `content="${ghBase}/logo.jpg"`);
  }

  // Inject structural schema (VideoObject, LearningResource, HowTo, BreadcrumbList) before </head>
  const structuredDataScript = getRouteJsonLd(pathname, meta);
  out = out.replace('</head>', `${structuredDataScript}</head>`);

  return out;
}

const dashboard = fs.readFileSync(path.join(root, 'src/components/Dashboard.tsx'), 'utf8');
const views = parseViewMetadata(extractObjectLiteral(dashboard, 'VIEW_METADATA'));
const barakhadi = parseSingleMeta(extractObjectLiteral(dashboard, 'BARAKHADI_METADATA'));

const routes = [];
for (const [view, pathname] of Object.entries(PATH_BY_VIEW)) {
  const meta = views[view];
  if (!meta?.title || !meta?.desc) {
    throw new Error(`VIEW_METADATA is missing title/desc for "${view}"`);
  }
  routes.push({ pathname, ...meta });
}
routes.push({ pathname: '/barakhadi', ...barakhadi });
routes.push({
  pathname: '/swar',
  title: 'Swar · स्वर — Sanskrit Workbook, Quizzes & Foundation Hub | EdNet Learn',
  desc: 'Learn Sanskrit vowels (स्वराः), first words, counting 1–10, interactive Swar review quizzes (pp. 23–24), handwriting tracing slate, and printable workbooks.',
});
routes.push({
  pathname: '/learn-sanskrit-online-free',
  title: 'Learn Sanskrit Online Free · Step-by-Step Audio & Interactive Practice | EdNet Learn',
  desc: 'Start learning Sanskrit online for free. Explore Devanagari Varṇamālā, 400+ audio syllables, basic words, interactive grammar tools, and NCERT Class 6–10 lessons.',
});
routes.push({
  pathname: '/spoken-sanskrit-course',
  title: 'Spoken Sanskrit Course · Conversational Sanskrit & Daily Dialogues | EdNet Learn',
  desc: 'Master conversational spoken Sanskrit (सम्भाषण-संस्कृतम्). Learn everyday greetings, sentence construction, verb conjugations, and audio pronunciation.',
});
routes.push({
  pathname: '/sanskrit-for-kids',
  title: 'Sanskrit for Kids · Fun Interactive Games, Jodo Tiles & Stories | EdNet Learn',
  desc: 'Engaging Sanskrit learning for children and young beginners. Interactive Jodo word-building tiles, animal names, picture puzzles, counting, and playful audio.',
});
routes.push({
  pathname: '/cbse-sanskrit-classes',
  title: 'CBSE Sanskrit Classes 6–10 · NCERT Deepakam Solutions & Exam Blueprint | EdNet Learn',
  desc: 'CBSE Sanskrit classes for grades 6 to 10. NCERT chapter explanations, word-by-word sandhi deconstruction, question formation (प्रश्ननिर्माणम्), and 80-mark blueprints.',
});
routes.push({
  pathname: '/sanskrit-grammar-lessons',
  title: 'Sanskrit Grammar Lessons · Pāṇinian Vyakaran, Sandhi & Dhātupāṭha | EdNet Learn',
  desc: 'Comprehensive Sanskrit grammar lessons: 17 masterclasses covering Sandhi rules, Subanta noun cases, Tinganta verb conjugations, Samāsa, and Dhātupāṭha.',
});
routes.push({
  pathname: '/sanskrit-pronunciation-guide',
  title: 'Sanskrit Pronunciation Guide · 400+ Audio Syllables & Articulation Science | EdNet Learn',
  desc: 'Authentic Sanskrit pronunciation guide. Master the 5 articulation points (स्थान-करण), aspirated consonants, Visarga, Anusvāra, and Vedic recitation cadence with audio.',
});
if (views['science-lab']) {
  routes.push({ pathname: '/science-lab', ...views['science-lab'] });
  routes.push({ pathname: '/science-lab-games', ...views['science-lab'] });
}

const got = new Set(routes.map((route) => route.pathname));
for (const pathname of REQUIRED_PATHS) {
  if (!got.has(pathname)) throw new Error(`Missing SEO shell for ${pathname}`);
}

const distIndex = path.join(root, 'dist/index.html');
if (!fs.existsSync(distIndex)) {
  throw new Error('dist/index.html not found. Run vite build first.');
}
const shell = fs.readFileSync(distIndex, 'utf8');

for (const route of routes) {
  const html = applyMeta(shell, route, route.pathname);
  if (route.pathname === '/') {
    fs.writeFileSync(distIndex, html);
  } else {
    const slug = route.pathname.replace(/^\/+|\/+$/g, '');
    const dir = path.join(root, 'dist', slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    fs.writeFileSync(path.join(root, 'dist', `${slug}.html`), html);
  }
  const canonical = route.pathname.endsWith('/') ? `${HOST}${route.pathname}` : `${HOST}${route.pathname}/`;
  if (!html.includes(`<title>${escapeAttr(route.title)}</title>`)) {
    throw new Error(`Title check failed for ${route.pathname}`);
  }
  if (!html.includes(`href="${canonical}"`) || !html.includes(`content="${canonical}"`)) {
    throw new Error(`Canonical check failed for ${route.pathname}`);
  }
}

console.log(`inject-seo-html: wrote ${routes.length} route shells`);

// GitHub Pages SPA fallback: ensure 404.html serves the full root shell
fs.copyFileSync(distIndex, path.join(root, 'dist/404.html'));
console.log('inject-seo-html: generated dist/404.html for SPA routing fallback');
