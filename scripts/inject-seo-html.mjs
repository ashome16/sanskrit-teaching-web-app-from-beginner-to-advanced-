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
