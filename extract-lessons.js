#!/usr/bin/env node
/**
 * extract-lessons.js
 *
 * Reads the true Sanskrit verse/dialogue text directly out of the uploaded
 * textbook PDFs (public/gsde102.pdf, public/gsde103.pdf) using the `pdftotext`
 * CLI (poppler-utils), locates specific passages by anchor phrase, and writes
 * the resulting lesson registry into src/data/chapters.json.
 *
 * Requires: poppler-utils (`pdftotext`) installed and on PATH.
 * Usage: node extract-lessons.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const CHAPTERS_JSON_PATH = path.join(__dirname, 'src', 'data', 'chapters.json');

// Strip zero-width joiners/non-joiners and known page furniture (footers, page
// numbers, print dates, running headers) that pdftotext pulls out alongside
// the real body text, then collapse all whitespace/newlines to single spaces.
const cleanExtractedText = (raw) => {
  const noiseLinePatterns = [
    /^Reprint\s+\d{4}-\d{2}$/,
    /^Chapter\s+\d+\.indd\s+\d+$/,
    /^\d{2}-\d{2}-\d{4}\s+\d{2}:\d{2}:\d{2}$/,
    /^\d+$/,
    /^दीपकम्.*$/,
  ];

  const withoutNoise = raw
    .split('\n')
    .filter((line) => !noiseLinePatterns.some((pattern) => pattern.test(line.trim())))
    .join('\n');

  return withoutNoise.replace(/[\u200C\u200D]/g, '').replace(/\s+/g, ' ').trim();
};

const extractPdfText = (fileName) => {
  const pdfPath = path.join(PUBLIC_DIR, fileName);
  const raw = execSync(`pdftotext -enc UTF-8 "${pdfPath}" -`, {
    maxBuffer: 1024 * 1024 * 20,
  }).toString('utf8');
  return cleanExtractedText(raw);
};

// Locate a verse starting at `anchor` and ending at the next Sanskrit verse
// marker (।। / ॥), including any trailing numeral marker (e.g. ।।१।।).
const extractVerse = (text, anchor) => {
  const startIdx = text.indexOf(anchor);
  if (startIdx === -1) throw new Error(`Anchor not found in PDF text: "${anchor}"`);
  const rest = text.slice(startIdx);
  const marker = rest.match(/।।|॥/);
  if (!marker) throw new Error(`Verse-ending marker not found after anchor: "${anchor}"`);
  let endIdx = marker.index + marker[0].length;
  const tailMarker = rest.slice(endIdx).match(/^[०-९0-9]*\s*(।।|॥)?/);
  if (tailMarker) endIdx += tailMarker[0].length;
  return rest.slice(0, endIdx).replace(/\s+/g, ' ').trim();
};

// Locate a plain sentence starting at `anchor` and ending at its own danda/question mark.
const extractSentence = (text, anchor) => {
  const startIdx = text.indexOf(anchor);
  if (startIdx === -1) throw new Error(`Anchor not found in PDF text: "${anchor}"`);
  const rest = text.slice(startIdx);
  const marker = rest.match(/।|\?/);
  if (!marker) throw new Error(`Sentence-ending marker not found after anchor: "${anchor}"`);
  const endIdx = marker.index + marker[0].length;
  return rest.slice(0, endIdx).replace(/\s+/g, ' ').trim();
};

// Splits Sanskrit text into clickable words. Standalone punctuation/marker
// tokens (danda, verse numerals, ?, !) are folded onto the previous word so
// every rendered span is an actual word, not a stray punctuation mark.
const isPunctuationOnlyToken = (token) => /^[।॥!?,;:०-९0-9]+$/.test(token);

const toWords = (sanskrit) => {
  const rawTokens = sanskrit.split(' ').filter(Boolean);
  const words = [];
  for (const token of rawTokens) {
    if (isPunctuationOnlyToken(token) && words.length > 0) {
      words[words.length - 1] += token;
    } else {
      words.push(token);
    }
  }
  return words;
};

const buildSentence = (sanskrit, meaning) => ({
  sanskrit,
  meaning,
  words: toWords(sanskrit),
});

const gsde102Text = extractPdfText('gsde102.pdf');
const gsde103Text = extractPdfText('gsde103.pdf');

const lesson1Sentences = [
  buildSentence(
    extractVerse(gsde102Text, 'वस्त्रेण वपुषा'),
    'A man endowed with these five things — proper attire, a healthy body, good speech, knowledge, and humility — becomes honored.'
  ),
  buildSentence(
    extractVerse(gsde102Text, 'अद्भिर्गात्राणि'),
    'The body is purified by water, the mind by truth; the soul is purified by learning and austerity, and the intellect by knowledge.'
  ),
  buildSentence(
    extractVerse(gsde102Text, 'उत्तरं यत्'),
    'The land north of the ocean and south of the Himalayas is called Bharata, where the descendants of Bharati (its people) dwell.'
  ),
];

const lesson2Sentences = [
  buildSentence(
    extractSentence(gsde103Text, 'अहो ! योगिते त्वं'),
    'Oh Yogita! What do you do in the morning?'
  ),
  buildSentence(
    extractSentence(gsde103Text, 'अहं प्रतिदिनं प्रातः'),
    'Every morning, I go to the garden with my father.'
  ),
  buildSentence(
    extractSentence(gsde103Text, 'किन्तु बहवः जनाः'),
    'However, many people do exercise and yoga postures there.'
  ),
];

const registry = {
  lessons: [
    {
      id: 'lesson-1',
      fileName: 'gsde102.pdf',
      title: 'Chapter 1 (Extracted)',
      sentences: lesson1Sentences,
    },
    {
      id: 'lesson-2',
      fileName: 'gsde103.pdf',
      title: 'Chapter 2 (Extracted)',
      sentences: lesson2Sentences,
    },
  ],
};

fs.writeFileSync(CHAPTERS_JSON_PATH, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
console.log(`Wrote ${CHAPTERS_JSON_PATH} from real PDF text.`);
