
export type ArticleBlock =
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };
 
export interface ParsedArticle {
  title: string;
  subtitle?: string;
  blocks: ArticleBlock[];
}
 
/**
 * Parses a lightly-marked-up plain text file into an article:
 *   # Title            -> article title (first line only)
 *   ## Heading          -> first one becomes the subtitle, rest become subheadings
 *   - list item         -> consecutive lines starting with "- " become a list
 *   blank line           -> separates blocks
 *   any other line       -> paragraph text (consecutive lines are joined with a space)
 */
export function parseArticle(raw: string): ParsedArticle {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
 
  let title = '';
  let subtitle: string | undefined;
  const blocks: ArticleBlock[] = [];
 
  let paragraphLines: string[] = [];
  let listItems: string[] = [];
 
  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paragraphLines.join(' ').trim() });
      paragraphLines = [];
    }
  };
 
  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: 'list', items: listItems });
      listItems = [];
    }
  };
 
  for (const rawLine of lines) {
    const line = rawLine.trim();
 
    if (line === '') {
      flushParagraph();
      flushList();
      continue;
    }
 
    if (line.startsWith('# ')) {
      title = line.slice(2).trim();
      continue;
    }
 
    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      const text = line.slice(3).trim();
      if (subtitle === undefined && blocks.length === 0) {
        subtitle = text;
      } else {
        blocks.push({ type: 'subheading', text });
      }
      continue;
    }
 
    if (line.startsWith('- ')) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
      continue;
    }
 
    flushList();
    paragraphLines.push(line);
  }
 
  flushParagraph();
  flushList();
 
  return { title: title || 'Untitled', subtitle, blocks };
}