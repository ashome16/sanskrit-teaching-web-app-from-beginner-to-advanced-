export type ArticleBlock =
  | { type: 'subheading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; text: string };

export interface ParsedArticle {
  title: string;
  subtitle?: string;
  blocks: ArticleBlock[];
}

/**
 * Parses a lightly-marked-up plain text file into an article:
 *   # Title              -> article title (first line only)
 *   ## Heading           -> first one becomes the subtitle, rest become subheadings
 *   - list item          -> consecutive lines starting with "- " become a list
 *   | a | b | c |        -> consecutive "| ... |" rows become a table (first row = header)
 *   ```                  -> a fenced block (```...```) becomes a preformatted code block
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
  let tableRows: string[][] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

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

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [headers, ...rows] = tableRows;
      blocks.push({ type: 'table', headers, rows });
      tableRows = [];
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith('```')) {
      if (inCodeBlock) {
        blocks.push({ type: 'code', text: codeLines.join('\n') });
        codeLines = [];
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        flushTable();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (line === '') {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    if (line.startsWith('# ')) {
      title = line.slice(2).trim();
      continue;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      flushTable();
      const text = line.slice(3).trim();
      if (subtitle === undefined && blocks.length === 0) {
        subtitle = text;
      } else {
        blocks.push({ type: 'subheading', text });
      }
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      flushParagraph();
      flushList();
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((cell) => cell.trim());
      tableRows.push(cells);
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      flushTable();
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList();
    flushTable();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  flushTable();

  return { title: title || 'Untitled', subtitle, blocks };
}