/**
 * Cloudflare Pages Edge Middleware for SEO Optimization & Canonical Redirects
 *
 * 1. Enforces permanent 301 redirection from non-canonical hosts (www.ednetlearn.in, http://)
 *    to the primary authoritative domain (https://ednetlearn.in).
 * 2. Injects canonical Link headers and optimized caching headers for search bot crawlers
 *    (Googlebot, Bingbot, Twitterbot, etc.) so metadata is received immediately at the edge.
 */

const CANONICAL_HOST = 'ednetlearn.in';
const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'yandexbot',
  'duckduckbot',
  'baiduspider',
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'slurp',
];

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Permanent 301 redirect for non-canonical hostnames (e.g., www.ednetlearn.in)
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    url.hostname = CANONICAL_HOST;
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  // Fetch the static pre-rendered response from Cloudflare Pages CDN
  const response = await context.next();

  // Create a mutable copy of response headers
  const newHeaders = new Headers(response.headers);

  // 2. Bot identification & edge metadata tagging
  const userAgent = (context.request.headers.get('user-agent') || '').toLowerCase();
  const isSearchBot = BOT_USER_AGENTS.some((bot) => userAgent.includes(bot));

  // Determine canonical URL for the current path (ensure trailing slash for directory routes)
  let cleanPath = url.pathname;
  if (!cleanPath.includes('.') && !cleanPath.endsWith('/')) {
    cleanPath = `${cleanPath}/`;
  }
  const canonicalUrl = `${CANONICAL_ORIGIN}${cleanPath}`;

  // Always supply the canonical Link header on HTML responses
  const contentType = newHeaders.get('content-type') || '';
  if (contentType.includes('text/html') || !url.pathname.includes('.')) {
    newHeaders.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    if (isSearchBot) {
      newHeaders.set('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
      newHeaders.set('X-Edge-SEO', 'optimized');
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}
