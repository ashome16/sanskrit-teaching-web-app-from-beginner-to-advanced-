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
  '/science-lab',
  '/vignana-lab',
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

  if (pathname === '/reader') {
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
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Sanskrit: The Science of Sound & Vocal Articulation',
      description: 'Acoustic and phonetic demonstration of Sanskrit mouth articulation places and Maheshwara Sutras.',
      thumbnailUrl: 'https://img.youtube.com/vi/tkvYjNZSsZA/hqdefault.jpg',
      uploadDate: '2026-01-15T09:00:00+05:30',
      duration: 'PT12M34S',
      contentUrl: 'https://www.youtube.com/watch?v=tkvYjNZSsZA',
      embedUrl: 'https://www.youtube.com/embed/tkvYjNZSsZA',
    });
  } else if (pathname === '/vedic-maths') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Līlāvatī Gaṇitam: Poetic Mental Mathematics of Bhāskarācārya',
      description: 'Exposition of Vedic mathematical sutras, rapid multiplication, and poetic arithmetic by Dr. Remella Avadhanulu.',
      thumbnailUrl: 'https://img.youtube.com/vi/SuEoIxU8itY/hqdefault.jpg',
      uploadDate: '2026-03-01T11:00:00+05:30',
      duration: 'PT41M00S',
      contentUrl: 'https://www.youtube.com/watch?v=SuEoIxU8itY',
      embedUrl: 'https://www.youtube.com/embed/SuEoIxU8itY',
    });
  } else if (pathname === '/vignana-lab' || pathname === '/science-lab') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Sulba Sūtras Geometric Proofs: Baudhayana Theorem & Vedic Astronomy',
      description: 'Demonstration of ancient Indian geometric rope measurements, Baudhayana theorem, and Vedic geometry.',
      thumbnailUrl: 'https://img.youtube.com/vi/bp9m53Tp6xg/hqdefault.jpg',
      uploadDate: '2026-03-15T12:00:00+05:30',
      duration: 'PT30M40S',
      contentUrl: 'https://www.youtube.com/watch?v=bp9m53Tp6xg',
      embedUrl: 'https://www.youtube.com/embed/bp9m53Tp6xg',
    });
  } else if (pathname === '/philosophy') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Sūrya Siddhānta Ahargaṇa Formulations & Planetary Motion in Sanskrit',
      description: 'Mathematical analysis of astronomical day-counts and planetary coordinates in classical Indian treatises.',
      thumbnailUrl: 'https://img.youtube.com/vi/7u7Nl0pBh2Y/hqdefault.jpg',
      uploadDate: '2026-04-05T14:00:00+05:30',
      duration: 'PT53M00S',
      contentUrl: 'https://www.youtube.com/watch?v=7u7Nl0pBh2Y',
      embedUrl: 'https://www.youtube.com/embed/7u7Nl0pBh2Y',
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
  }

  return `\n    <script type="application/ld+json">\n${JSON.stringify(schemas, null, 2)}\n    </script>\n`;
}

function applyMeta(html, meta, pathname) {
  const canonical = pathname === '/' ? `${HOST}/` : `${HOST}${pathname}`;
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
if (views['science-lab']) {
  routes.push({ pathname: '/science-lab', ...views['science-lab'] });
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
    const dir = path.join(root, 'dist', route.pathname.slice(1));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), html);
  }
  const canonical = route.pathname === '/' ? `${HOST}/` : `${HOST}${route.pathname}`;
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
