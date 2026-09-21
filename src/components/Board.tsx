import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/board.css';
import { iconForExampleWord } from '../data/exampleIcons';
import { playPronunciation } from '../utils/pronunciation';

type ShelfId = 'prarambhah' | 'sariram' | 'ganitam' | 'bhugolah' | 'sanskritih' | 'krida' | 'prakrtih';

interface ShelfButton { id: ShelfId; label: string; }
interface BoardPuzzle { target: string; tiles: string[]; answer?: string; english: string; sentence?: string; highlight?: string; tapHighlight?: string; seed?: string; prompt?: string; gloss?: string; phase?: string; explanation?: string; }
interface BoardShelfLine { shelf: string; native: string; skin: string; puzzles: BoardPuzzle[]; }
interface PackLabel { title: string; gloss: string; }
interface VisitorBlock { heading: 'h2' | 'h3' | 'p'; text: string; }
interface BoardSearchMatch {
  puzzle: BoardPuzzle;
  shelfId: ShelfId;
  shelfName: string;
  shelfIcon: string;
  puzzleIndex: number;
}

export interface BoardProps {
  onNavigateToHome?: () => void;
  onNavigateToReader?: () => void;
  onNavigateToVarnamala?: () => void;
  onNavigateToGrammar?: () => void;
}

const SHELF_DESCRIPTIONS: Record<ShelfId, { title: string; desc: string; icon: string }> = {
  prarambhah: {
    title: 'Beginners · प्रारम्भः',
    desc: 'Vowel combinations, matras & basic syllable joining',
    icon: '🌱',
  },
  sariram: {
    title: 'Body · शरीरम्',
    desc: 'Learn parts of the human body in Sanskrit',
    icon: '👤',
  },
  ganitam: {
    title: 'Maths & Space · गणितम्',
    desc: 'Numbers, counting, time & astronomical terms',
    icon: '🔢',
  },
  bhugolah: {
    title: 'Map · भूगोलः',
    desc: 'Geography, directions & locations in Sanskrit',
    icon: '🗺️',
  },
  sanskritih: {
    title: 'Sanskriti · संस्कृतिः',
    desc: 'Indian culture, heritage & ancient traditions',
    icon: '🪔',
  },
  krida: {
    title: 'Vyakaran · व्याकरण',
    desc: 'Core grammar rules, vibhaktis & declensions',
    icon: '📖',
  },
  prakrtih: {
    title: 'Nature · प्रकृतिः',
    desc: 'Birds, animals, plants, rivers & nature',
    icon: '🌿',
  },
};

const BODY_ANECDOTE = 'नाद-पथः — क lives in the throat.';

const DEFAULT_SHELVES: ShelfButton[] = [
  { id: 'prarambhah', label: 'Beginners' },
  { id: 'sariram', label: 'Body' },
  { id: 'ganitam', label: 'Maths' },
  { id: 'bhugolah', label: 'Map' },
  { id: 'sanskritih', label: 'Sanskriti' },
  { id: 'krida', label: 'Vyakaran · व्याकरण' },
  { id: 'prakrtih', label: 'Nature' },
];

const SHELF_ALIASES: Record<string, ShelfId> = {
  beginners: 'prarambhah',
  body: 'sariram',
  sariram: 'sariram',
  space: 'ganitam',
  ganitam: 'ganitam',
  map: 'bhugolah',
  bhugolah: 'bhugolah',
  sanskriti: 'sanskritih',
  sanskritih: 'sanskritih',
  play: 'krida',
  krida: 'krida',
  vyakaran: 'krida',
  vyakarana: 'krida',
  'व्याकरण': 'krida',
  nature: 'prakrtih',
  prakrtih: 'prakrtih',
};

const parse = (text: string) => text.split(/\r?\n/).filter((line) => line.trim() && !line.startsWith('#')).map((line) => line.split('|').map((part) => part.trim()));
const parseVisitor = (text: string): VisitorBlock[] => text.split(/\r?\n/).reduce<VisitorBlock[]>((blocks, line) => {
  const trimmed = line.trim();
  if (!trimmed) return blocks;
  if (trimmed.startsWith('## ')) return [...blocks, { heading: 'h3', text: trimmed.slice(3) }];
  if (trimmed.startsWith('# ')) return [...blocks, { heading: 'h2', text: trimmed.slice(2) }];
  return [...blocks, { heading: 'p', text: trimmed }];
}, []);
const fetchText = (name: string) => fetch(`./${name}?t=${Date.now()}`).then((response) => response.text());
const cleanTile = (tile: string) => tile.replace(/\u200B/g, '').normalize('NFC').trim();

// Independent vowel tiles must map to combining matras so glueTiles(क+ई)→की, क+ऊ→कू, etc.
const MARK: Record<string, string> = {
  'आ': 'ा', 'इ': 'ि', 'ई': 'ी', 'उ': 'ु', 'ऊ': 'ू', 'ऋ': 'ृ', 'ए': 'े', 'ऐ': 'ै', 'ओ': 'ो', 'औ': 'ौ',
  'अं': 'ं',
  'अः': 'ः',  // future-proof visarga row
};
function glueTiles(tiles: string[]) {
  return tiles.map((tile) => cleanTile(tile)).map((tile) => MARK[tile] ?? tile).join('').normalize('NFC');
}

/** जोडो: any tap order of the same tiles still counts (आ then म = मा). */
function glueMatchesTarget(tiles: string[], target: string) {
  const cleaned = tiles.map((tile) => cleanTile(tile)).filter(Boolean);
  if (!cleaned.length) return false;
  const goal = target.normalize('NFC');
  if (glueTiles(cleaned) === goal) return true;
  if (cleaned.length === 2) return glueTiles([cleaned[1], cleaned[0]]) === goal;
  if (cleaned.length > 3) return false;
  const perms = (arr: string[]): string[][] => {
    if (arr.length <= 1) return [arr];
    return arr.flatMap((item, index) => perms([...arr.slice(0, index), ...arr.slice(index + 1)]).map((rest) => [item, ...rest]));
  };
  return perms(cleaned).some((order) => glueTiles(order) === goal);
}


/** Evaluate whether `tiles` is a correct answer for this puzzle (same rules as isCorrect). */
function evaluateChosen(puzzle: BoardPuzzle | null, tiles: string[]): boolean {
  if (!puzzle) return false;
  const target = (puzzle.answer ?? puzzle.target).normalize('NFC');
  const wholeWordRow = puzzle.tiles.some((tile) => cleanTile(tile).normalize('NFC') === target);
  if (wholeWordRow) {
    return tiles.length === 1 && cleanTile(tiles[0]).normalize('NFC') === target;
  }
  if (puzzle.target === 'का') {
    const chosenSet = new Set(tiles.map((tile) => cleanTile(tile).normalize('NFC')));
    const isKaAaPair = chosenSet.size === 2 && tiles.length === 2
      && (chosenSet.has('क') && (chosenSet.has('आ') || chosenSet.has('ा')));
    return glueMatchesTarget(tiles, 'का') || isKaAaPair;
  }
  return glueMatchesTarget(tiles, target);
}

function highlightedSentence(sentence: string | undefined, highlight: string | undefined, tapHighlight: string | undefined) {
  if (!sentence || !highlight) return sentence;
  const matchStart = sentence.indexOf(highlight);
  if (matchStart < 0) return sentence;
  const before = sentence.slice(0, matchStart);
  const after = sentence.slice(matchStart + highlight.length);
  const tapStart = tapHighlight ? after.indexOf(tapHighlight) : -1;
  const afterNode = tapStart < 0
    ? after
    : <>{after.slice(0, tapStart)}<span className="word-tap">{tapHighlight}</span>{after.slice(tapStart + (tapHighlight as string).length)}</>;
  return <>{before}<span className="word-focus">{highlight}</span>{afterNode}</>;
}

/** Render a Jodo puzzle sentence with an interactive blank / live-assembled tile slot. */
function renderJodoSentenceWithSlot(
  sentence: string | undefined,
  target: string,
  chosen: string[]
): React.ReactNode {
  const normSent = (sentence || '').normalize('NFC');
  const normTarget = (target || '').normalize('NFC');
  const matchIdx = normSent.indexOf(normTarget);

  const slotNode = (
    <span
      className={`jodo-blank-slot ${
        chosen.length === 0
          ? 'jodo-blank-slot--empty'
          : chosen.length === 1
          ? 'jodo-blank-slot--partial'
          : 'jodo-blank-slot--filled'
      }`}
      aria-label={chosen.length ? `Forming: ${glueTiles(chosen)}` : 'Blank to fill'}
    >
      {chosen.length === 0 ? (
        <span className="jodo-blank-underscores">____</span>
      ) : chosen.length === 1 ? (
        <span className="jodo-blank-partial">
          <span className="jodo-slot-first">{cleanTile(chosen[0])}</span>
          <span className="jodo-slot-plus">+</span>
          <span className="jodo-slot-q">?</span>
        </span>
      ) : (
        <span className="jodo-blank-text">{glueTiles(chosen)}</span>
      )}
    </span>
  );

  if (!normSent) {
    return slotNode;
  }

  if (matchIdx < 0) {
    return (
      <>
        {slotNode} <span>{normSent}</span>
      </>
    );
  }

  const before = normSent.slice(0, matchIdx);
  const after = normSent.slice(matchIdx + normTarget.length);

  return (
    <>
      {before}
      {slotNode}
      {after}
    </>
  );
}


/** Bold Click Next (and legacy phrases) inside tip or welcome copy (labels loop + visitor **markdown**). */
function emphasizeTipText(text: string): React.ReactNode {
  const pattern = /(Read the sentence|click\s+Next|Click\s+Next|\*\*[^*]+\*\*|\bNext\b)/g;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const phrase = match[0];
    if (phrase.startsWith('**') && phrase.endsWith('**')) {
      const inner = phrase.slice(2, -2);
      const isNext = /next/i.test(inner);
      nodes.push(<strong key={key++} className={isNext ? 'tip-next' : undefined}>{inner}</strong>);
    } else {
      const isNext = /next/i.test(phrase);
      const label = isNext && !/^click\s/i.test(phrase) ? 'Click Next' : phrase;
      nodes.push(<strong key={key++} className={isNext ? 'tip-next' : undefined}>{label}</strong>);
    }
    last = match.index + phrase.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? <>{nodes}</> : text;
}


/** Matra section chips for Beginners · मात्रा (scan for first matching target). */
const MATRA_SECTION_DEFS: { label: string; exemplar: string; mark: string }[] = [
  { label: 'आ', exemplar: 'का', mark: 'ा' },
  { label: 'इ', exemplar: 'कि', mark: 'ि' },
  { label: 'ई', exemplar: 'की', mark: 'ी' },
  { label: 'उ', exemplar: 'कु', mark: 'ु' },
  { label: 'ऊ', exemplar: 'कू', mark: 'ू' },
  { label: 'ए', exemplar: 'के', mark: 'े' },
  { label: 'ऐ', exemplar: 'कै', mark: 'ै' },
  { label: 'ओ', exemplar: 'को', mark: 'ो' },
  { label: 'औ', exemplar: 'कौ', mark: 'ौ' },
  { label: 'ऋ', exemplar: 'कृ', mark: 'ृ' },
  { label: 'अं', exemplar: 'कं', mark: 'ं' },
  { label: 'अः', exemplar: 'कः', mark: 'ः' },
];

type BoardSectionChip = { id: string; label: string; start: number };

function isPrashnaPuzzle(puzzle: BoardPuzzle): boolean {
  if ((puzzle.phase || '').trim() === 'prashna') return true;
  return false;
}

function findMatraSectionStart(puzzles: BoardPuzzle[], exemplar: string, mark: string): number {
  const byExemplar = puzzles.findIndex((p) => {
    if (isPrashnaPuzzle(p)) return false;
    const t = (p.target || '').normalize('NFC');
    return t === exemplar || t.startsWith(exemplar);
  });
  if (byExemplar >= 0) return byExemplar;
  return puzzles.findIndex((p) => {
    if (isPrashnaPuzzle(p)) return false;
    return (p.target || '').normalize('NFC').includes(mark);
  });
}

function findPrashnaSectionStart(puzzles: BoardPuzzle[]): number {
  const byPhase = puzzles.findIndex((p) => (p.phase || '').trim() === 'prashna');
  if (byPhase >= 0) return byPhase;
  // First whole-word question row (target appears as a full cream tile).
  return puzzles.findIndex((p) => {
    const target = ((p.answer ?? p.target) || '').normalize('NFC');
    if (!target) return false;
    return p.tiles.some((tile) => cleanTile(tile).normalize('NFC') === target);
  });
}

/** Consonant rows (त / द …): first target matching consonant + matra. */
const CONSONANT_ROW_CHIP_DEFS: { id: string; consonant: string }[] = [
  { id: 'त', consonant: 'त' },
  { id: 'द', consonant: 'द' },
  { id: 'ब', consonant: 'ब' },
  { id: 'भ', consonant: 'भ' },
  { id: 'ध', consonant: 'ध' },
  { id: 'य', consonant: 'य' },
  { id: 'र', consonant: 'र' },
  { id: 'ल', consonant: 'ल' },
  { id: 'व', consonant: 'व' },
  { id: 'श', consonant: 'श' },
  { id: 'ष', consonant: 'ष' },
  { id: 'स', consonant: 'स' },
  { id: 'ह', consonant: 'ह' },
  { id: 'ट', consonant: 'ट' },
  { id: 'ठ', consonant: 'ठ' },
  { id: 'ड', consonant: 'ड' },
  { id: 'ढ', consonant: 'ढ' },
  { id: 'ण', consonant: 'ण' },
  { id: 'क', consonant: 'क' },
  { id: 'ख', consonant: 'ख' },
  { id: 'ग', consonant: 'ग' },
  { id: 'घ', consonant: 'घ' },
  { id: 'ङ', consonant: 'ङ' },
  { id: 'च', consonant: 'च' },
  { id: 'छ', consonant: 'छ' },
  { id: 'ज', consonant: 'ज' },
  { id: 'झ', consonant: 'झ' },
  { id: 'ञ', consonant: 'ञ' },
  { id: 'प', consonant: 'प' },
  { id: 'फ', consonant: 'फ' },
  { id: 'म', consonant: 'म' },
  { id: 'न', consonant: 'न' },
  { id: 'थ', consonant: 'थ' },
  { id: 'क्ष', consonant: 'क्ष' },
  { id: 'ज्ञ', consonant: 'ज्ञ' },
  { id: 'त्र', consonant: 'त्र' },
  { id: 'श्र', consonant: 'श्र' },
  { id: 'प्र', consonant: 'प्र' },
  { id: 'क्र', consonant: 'क्र' },
  { id: 'ग्र', consonant: 'ग्र' },
  { id: 'द्र', consonant: 'द्र' },
  { id: 'ब्र', consonant: 'ब्र' },
  { id: 'द्व', consonant: 'द्व' },
  { id: 'त्व', consonant: 'त्व' },
  { id: 'स्त', consonant: 'स्त' },
  { id: 'स्व', consonant: 'स्व' },
  { id: 'स्म', consonant: 'स्म' },
  { id: 'स्न', consonant: 'स्न' },
  { id: 'ष्ट', consonant: 'ष्ट' },
  { id: 'ह्र', consonant: 'ह्र' },
  { id: 'ह्य', consonant: 'ह्य' },
  { id: 'स्त्र', consonant: 'स्त्र' },
  { id: 'ङ्क', consonant: 'ङ्क' },
  { id: 'च्छ', consonant: 'च्छ' },
  { id: 'क्त', consonant: 'क्त' },
  { id: 'र्थ', consonant: 'र्थ' },
  { id: 'र्ण', consonant: 'र्ण' },
  { id: 'ष्ण', consonant: 'ष्ण' },
  { id: 'त्त', consonant: 'त्त' },
  { id: 'द्ध', consonant: 'द्ध' },
  { id: 'ब्ध', consonant: 'ब्ध' },
  { id: 'म्भ', consonant: 'म्भ' },
  { id: 'ञ्ज', consonant: 'ञ्ज' },
  { id: 'ञ्च', consonant: 'ञ्च' },
  { id: 'त्थ', consonant: 'त्थ' },
  { id: 'द्द', consonant: 'द्द' },
  { id: 'प्प', consonant: 'प्प' },
  { id: 'च्च', consonant: 'च्च' },
  { id: 'ल्ल', consonant: 'ल्ल' },
  { id: 'र्त', consonant: 'र्त' },
  { id: 'र्ध', consonant: 'र्ध' },
  { id: 'र्भ', consonant: 'र्भ' },
  { id: 'र्ग', consonant: 'र्ग' },
  { id: 'र्म', consonant: 'र्म' },
  { id: 'न्न', consonant: 'न्न' },
  { id: 'म्म', consonant: 'म्म' },
  { id: 'य्य', consonant: 'य्य' },
  { id: 'र्र', consonant: 'र्र' },
  { id: 'व्व', consonant: 'व्व' },
  { id: 'स्क', consonant: 'स्क' },
  { id: 'स्प', consonant: 'स्प' },
  { id: 'त्न', consonant: 'त्न' },
  { id: 'द्न', consonant: 'द्न' },
  { id: 'ल्प', consonant: 'ल्प' },
  { id: 'त्क', consonant: 'त्क' },
  { id: 'त्प', consonant: 'त्प' },
  { id: 'त्म', consonant: 'त्म' },
  { id: 'द्ग', consonant: 'द्ग' },
  { id: 'द्ब', consonant: 'द्ब' },
  { id: 'ङ्ग', consonant: 'ङ्ग' },
  { id: 'ङ्ख', consonant: 'ङ्ख' },
  { id: 'ट्ट', consonant: 'ट्ट' },
  { id: 'ड्ड', consonant: 'ड्ड' },
  { id: 'ब्ब', consonant: 'ब्ब' },
  { id: 'ह्न', consonant: 'ह्न' },
  { id: 'ह्म', consonant: 'ह्म' },
  { id: 'च्ज', consonant: 'च्ज' },
  { id: 'प्न', consonant: 'प्न' },
  { id: 'म्न', consonant: 'म्न' },
  { id: 'स्फ', consonant: 'स्फ' },
  { id: 'स्थ', consonant: 'स्थ' },
  { id: 'श्च', consonant: 'श्च' },
  { id: 'श्क', consonant: 'श्क' },
  { id: 'ल्क', consonant: 'ल्क' },
  { id: 'र्व', consonant: 'र्व' },
  { id: 'र्प', consonant: 'र्प' },
  { id: 'र्ल', consonant: 'र्ल' },
  { id: 'र्ज', consonant: 'र्ज' },
  { id: 'र्च', consonant: 'र्च' },
  { id: 'न्द', consonant: 'न्द' },
  { id: 'न्ध', consonant: 'न्ध' },
  { id: 'न्ग', consonant: 'न्ग' },
  { id: 'न्ज', consonant: 'न्ज' },
  { id: 'न्ब', consonant: 'न्ब' },
  { id: 'ल्ग', consonant: 'ल्ग' },
  { id: 'ल्म', consonant: 'ल्म' },
  { id: 'श्व', consonant: 'श्व' },
  { id: 'ष्व', consonant: 'ष्व' },
  { id: 'ह्व', consonant: 'ह्व' },
  { id: 'ज्ज', consonant: 'ज्ज' },
  { id: 'ट्ठ', consonant: 'ट्ठ' },
  { id: 'ड्ढ', consonant: 'ड्ढ' },
  { id: 'क्क', consonant: 'क्क' },
  { id: 'ग्ग', consonant: 'ग्ग' },
  { id: 'म्प', consonant: 'म्प' },
  { id: 'म्ब', consonant: 'म्ब' },
  { id: 'त्स', consonant: 'त्स' },
  { id: 'द्स', consonant: 'द्स' },
  { id: 'ह्ल', consonant: 'ह्ल' },
  { id: 'त्य', consonant: 'त्य' },
  { id: 'द्य', consonant: 'द्य' },
  { id: 'व्य', consonant: 'व्य' },
  { id: 'श्य', consonant: 'श्य' },
  { id: 'क्य', consonant: 'क्य' },
  { id: 'ग्य', consonant: 'ग्य' },
  { id: 'च्य', consonant: 'च्य' },
  { id: 'ज्य', consonant: 'ज्य' },
  { id: 'प्य', consonant: 'प्य' },
  { id: 'भ्य', consonant: 'भ्य' },
  { id: 'म्य', consonant: 'म्य' },
  { id: 'न्य', consonant: 'न्य' },
  { id: 'ल्य', consonant: 'ल्य' },
  { id: 'र्य', consonant: 'र्य' },
  { id: 'व्र', consonant: 'व्र' },
  { id: 'क्ल', consonant: 'क्ल' },
  { id: 'ग्ल', consonant: 'ग्ल' },
  { id: 'प्ल', consonant: 'प्ल' },
  { id: 'फ्ल', consonant: 'फ्ल' },
  { id: 'ब्ल', consonant: 'ब्ल' },
  { id: 'श्ल', consonant: 'श्ल' },
  { id: 'स्ल', consonant: 'स्ल' },
  { id: 'त्ल', consonant: 'त्ल' },
  { id: 'ष्ठ', consonant: 'ष्ठ' },
  { id: 'ष्प', consonant: 'ष्प' },
  { id: 'ध्य', consonant: 'ध्य' },
  { id: 'थ्य', consonant: 'थ्य' },
  { id: 'फ्य', consonant: 'फ्य' },
  { id: 'ख्य', consonant: 'ख्य' },
  { id: 'घ्य', consonant: 'घ्य' },
  { id: 'त्त्र', consonant: 'त्त्र' },
  { id: 'द्र्य', consonant: 'द्र्य' },
  { id: 'ह्र्य', consonant: 'ह्र्य' },
  { id: 'ञ्च्य', consonant: 'ञ्च्य' },
  { id: 'ष्ट्र', consonant: 'ष्ट्र' },
  { id: 'क्ष्य', consonant: 'क्ष्य' },
  { id: 'ज्ञ्य', consonant: 'ज्ञ्य' },
  { id: 'त्र्य', consonant: 'त्र्य' },
  { id: 'श्र्य', consonant: 'श्र्य' },
  { id: 'प्र्य', consonant: 'प्र्य' },
  { id: 'क्र्य', consonant: 'क्र्य' },
  { id: 'ग्र्य', consonant: 'ग्र्य' },
  { id: 'ब्र्य', consonant: 'ब्र्य' },
  { id: 'त्व्य', consonant: 'त्व्य' },
  { id: 'स्त्य', consonant: 'स्त्य' },
  { id: 'म्र्य', consonant: 'म्र्य' },
  { id: 'न्र्य', consonant: 'न्र्य' },
  { id: 'स्र्य', consonant: 'स्र्य' },
  { id: 'ब्य', consonant: 'ब्य' },
  { id: 'ष्य', consonant: 'ष्य' },
  { id: 'स्व्य', consonant: 'स्व्य' },
  { id: 'स्म्य', consonant: 'स्म्य' },
  { id: 'स्न्य', consonant: 'स्न्य' },
  { id: 'ह्व्य', consonant: 'ह्व्य' },
  { id: 'ष्ट्य', consonant: 'ष्ट्य' },
  { id: 'झ्य', consonant: 'झ्य' },
  { id: 'ट्य', consonant: 'ट्य' },
  { id: 'ठ्य', consonant: 'ठ्य' },
  { id: 'ड्य', consonant: 'ड्य' },
  { id: 'ढ्य', consonant: 'ढ्य' },
  { id: 'ण्य', consonant: 'ण्य' },
  { id: 'क्ल्य', consonant: 'क्ल्य' },
  { id: 'ग्ल्य', consonant: 'ग्ल्य' },
  { id: 'प्ल्य', consonant: 'प्ल्य' },
  { id: 'म्ल्य', consonant: 'म्ल्य' },
  { id: 'स्ल्य', consonant: 'स्ल्य' },
  { id: 'श्ल्य', consonant: 'श्ल्य' },
  { id: 'ष्ठ्य', consonant: 'ष्ठ्य' },
  { id: 'फ्ल्य', consonant: 'फ्ल्य' },
  { id: 'त्ल्य', consonant: 'त्ल्य' },
  { id: 'ब्ल्य', consonant: 'ब्ल्य' },
  { id: 'ह्ल्य', consonant: 'ह्ल्य' },
  { id: 'ज्र्य', consonant: 'ज्र्य' },
  { id: 'ध्र्य', consonant: 'ध्र्य' },
  { id: 'भ्र्य', consonant: 'भ्र्य' },
  { id: 'च्र्य', consonant: 'च्र्य' },
  { id: 'ख्र्य', consonant: 'ख्र्य' },
  { id: 'थ्र्य', consonant: 'थ्र्य' },
  { id: 'फ्र्य', consonant: 'फ्र्य' },
  { id: 'व्र्य', consonant: 'व्र्य' },
  { id: 'घ्र्य', consonant: 'घ्र्य' },
  { id: 'झ्र्य', consonant: 'झ्र्य' },
  { id: 'ट्र्य', consonant: 'ट्र्य' },
  { id: 'ड्र्य', consonant: 'ड्र्य' },
  { id: 'ढ्र्य', consonant: 'ढ्र्य' },
  { id: 'ञ्य', consonant: 'ञ्य' },
  { id: 'छ्य', consonant: 'छ्य' },
  { id: 'ज्ज्य', consonant: 'ज्ज्य' },
  { id: 'ट्ट्य', consonant: 'ट्ट्य' },
  { id: 'ड्ड्य', consonant: 'ड्ड्य' },
  { id: 'ब्ब्य', consonant: 'ब्ब्य' },
  { id: 'ग्ग्य', consonant: 'ग्ग्य' },
  { id: 'क्क्य', consonant: 'क्क्य' },
  { id: 'प्प्य', consonant: 'प्प्य' },
  { id: 'च्च्य', consonant: 'च्च्य' },
  { id: 'ल्ल्य', consonant: 'ल्ल्य' },
  { id: 'म्म्य', consonant: 'म्म्य' },
  { id: 'न्न्य', consonant: 'न्न्य' },
  { id: 'र्र्य', consonant: 'र्र्य' },
  { id: 'व्व्य', consonant: 'व्व्य' },
  { id: 'स्क्य', consonant: 'स्क्य' },
  { id: 'स्प्य', consonant: 'स्प्य' },
  { id: 'स्थ्य', consonant: 'स्थ्य' },
  { id: 'श्च्य', consonant: 'श्च्य' },
  { id: 'श्क्य', consonant: 'श्क्य' },
  { id: 'ल्क्य', consonant: 'ल्क्य' },
  { id: 'न्द्य', consonant: 'न्द्य' },
  { id: 'न्ध्य', consonant: 'न्ध्य' },
  { id: 'ङ्घ्य', consonant: 'ङ्घ्य' },
  { id: 'त्क्य', consonant: 'त्क्य' },
  { id: 'त्प्य', consonant: 'त्प्य' },
  { id: 'त्म्य', consonant: 'त्म्य' },
  { id: 'द्ग्य', consonant: 'द्ग्य' },
  { id: 'द्ब्य', consonant: 'द्ब्य' },
  { id: 'ह्न्य', consonant: 'ह्न्य' },
  { id: 'ह्म्य', consonant: 'ह्म्य' },
  { id: 'म्प्य', consonant: 'म्प्य' },
  { id: 'म्ब्य', consonant: 'म्ब्य' },
  { id: 'त्स्य', consonant: 'त्स्य' },
  { id: 'द्स्य', consonant: 'द्स्य' },
  { id: 'ष्व्य', consonant: 'ष्व्य' },
  { id: 'श्व्य', consonant: 'श्व्य' },
  { id: 'ल्ग्य', consonant: 'ल्ग्य' },
  { id: 'ल्म्य', consonant: 'ल्म्य' },
  { id: 'र्क्य', consonant: 'र्क्य' },
  { id: 'र्प्य', consonant: 'र्प्य' },
  { id: 'र्त्य', consonant: 'र्त्य' },
  { id: 'र्ध्य', consonant: 'र्ध्य' },
  { id: 'न्ज्य', consonant: 'न्ज्य' },
  { id: 'र्व्य', consonant: 'र्व्य' },
  { id: 'र्भ्य', consonant: 'र्भ्य' },
  { id: 'र्ग्य', consonant: 'र्ग्य' },
  { id: 'र्म्य', consonant: 'र्म्य' },
  { id: 'न्ब्य', consonant: 'न्ब्य' },
  { id: 'र्ज्य', consonant: 'र्ज्य' },
  { id: 'र्च्य', consonant: 'र्च्य' },
  { id: 'र्ष्य', consonant: 'र्ष्य' },
  { id: 'र्ह्य', consonant: 'र्ह्य' },
  { id: 'द्म्य', consonant: 'द्म्य' },
  { id: 'ङ्क्य', consonant: 'ङ्क्य' },
  { id: 'ब्ज्य', consonant: 'ब्ज्य' },
  { id: 'क्ष्म्य', consonant: 'क्ष्म्य' },
  { id: 'क्व्य', consonant: 'क्व्य' },
  { id: 'ङ्ग्य', consonant: 'ङ्ग्य' },
  { id: 'ग्म्य', consonant: 'ग्म्य' },
  { id: 'ष्म्य', consonant: 'ष्म्य' },
  { id: 'ब्ध्य', consonant: 'ब्ध्य' },
  { id: 'ष्प्य', consonant: 'ष्प्य' },
  { id: 'त्त्य', consonant: 'त्त्य' },
  { id: 'र्ल्य', consonant: 'र्ल्य' },
  { id: 'द्द्य', consonant: 'द्द्य' },
  { id: 'द्भ्य', consonant: 'द्भ्य' },
  { id: 'ठ्ठ्य', consonant: 'ठ्ठ्य' },
  { id: 'ड्ढ्य', consonant: 'ड्ढ्य' },
  { id: 'ट्ठ्य', consonant: 'ट्ठ्य' },
  { id: 'त्थ्य', consonant: 'त्थ्य' },
  { id: 'ञ्ज्य', consonant: 'ञ्ज्य' },
  { id: 'प्स्य', consonant: 'प्स्य' },
  { id: 'ग्ध्य', consonant: 'ग्ध्य' },
];

const CONSONANT_ROW_MATRA_CHARS = new Set([
  '\u093E', '\u093F', '\u0940', '\u0941', '\u0942', '\u0943',
  '\u0947', '\u0948', '\u094B', '\u094C', '\u0902', '\u0903',
]);

/** True when target is exactly base (one or more code points) + a single matra — so क्षा≠क, त्रा≠त, ज्ञा≠ज. */
function isConsonantMatraTarget(target: string, consonant: string): boolean {
  const t = target.normalize('NFC');
  const base = consonant.normalize('NFC');
  if (!base || !t.startsWith(base)) return false;
  const rest = t.slice(base.length);
  return rest.length === 1 && CONSONANT_ROW_MATRA_CHARS.has(rest);
}

/** First cons+matra at index >= minIndex (skips early रा/ला/सा once prior row ended). */
function findConsonantRowStart(puzzles: BoardPuzzle[], consonant: string, minIndex = 0): number {
  for (let i = Math.max(0, minIndex); i < puzzles.length; i++) {
    const p = puzzles[i];
    if (isPrashnaPuzzle(p)) continue;
    const t = (p.target || '').normalize('NFC');
    if (isConsonantMatraTarget(t, consonant)) return i;
  }
  return -1;
}

/** Exclusive end index of a contiguous cons+matra block starting at `start`. */
function consonantRowEnd(puzzles: BoardPuzzle[], consonant: string, start: number): number {
  let end = start;
  for (let i = start; i < puzzles.length; i++) {
    const p = puzzles[i];
    if (isPrashnaPuzzle(p)) break;
    const t = (p.target || '').normalize('NFC');
    if (!isConsonantMatraTarget(t, consonant)) break;
    end = i + 1;
  }
  return end;
}

function buildMatraSectionChips(puzzles: BoardPuzzle[]): BoardSectionChip[] {
  const chips: BoardSectionChip[] = [];
  for (const def of MATRA_SECTION_DEFS) {
    const start = findMatraSectionStart(puzzles, def.exemplar, def.mark);
    if (start >= 0) chips.push({ id: def.label, label: def.label, start });
  }
  // Sequential: each row starts at/after the previous consonant row's end (so ल≠early ला, स≠early सा).
  let minIndex = 0;
  for (const row of CONSONANT_ROW_CHIP_DEFS) {
    const start = findConsonantRowStart(puzzles, row.consonant, minIndex);
    if (start >= 0) {
      chips.push({ id: row.id, label: row.id, start });
      minIndex = consonantRowEnd(puzzles, row.consonant, start);
    }
  }
  const prashnaStart = findPrashnaSectionStart(puzzles);
  if (prashnaStart >= 0) chips.push({ id: 'प्रश्न', label: 'प्रश्न', start: prashnaStart });
  return chips.sort((a, b) => a.start - b.start);
}

function buildNatureSectionChips(puzzles: BoardPuzzle[]): BoardSectionChip[] {
  const defs: { id: string; label: string; match: (p: BoardPuzzle) => boolean }[] = [
    { id: 'रिक्तम्', label: 'रिक्तम्', match: (p) => {
      const ph = (p.phase || '').trim();
      return ph !== 'learn' && ph !== 'match-meaning';
    } },
    { id: 'शिक्षा', label: 'शिक्षा', match: (p) => (p.phase || '').trim() === 'learn' },
    { id: 'अर्थ', label: 'अर्थ', match: (p) => (p.phase || '').trim() === 'match-meaning' },
  ];
  const chips: BoardSectionChip[] = [];
  for (const def of defs) {
    const start = puzzles.findIndex(def.match);
    if (start >= 0) chips.push({ id: def.id, label: def.label, start });
  }
  return chips;
}

function activeSectionChipId(chips: BoardSectionChip[], puzzleIndex: number): string | null {
  if (!chips.length) return null;
  let active = chips[0].id;
  for (const chip of chips) {
    if (puzzleIndex >= chip.start) active = chip.id;
    else break;
  }
  return active;
}

const Board: React.FC<BoardProps> = ({
  onNavigateToHome,
  onNavigateToReader,
  onNavigateToVarnamala,
  onNavigateToGrammar,
}) => {
  const [shelfButtons, setShelfButtons] = useState<ShelfButton[]>(DEFAULT_SHELVES);
  const [boardShelves, setBoardShelves] = useState<BoardShelfLine[]>([]);
  const [fallbackPuzzles, setFallbackPuzzles] = useState<BoardPuzzle[]>([]);
  const [packLabels, setPackLabels] = useState<PackLabel[]>([]);
  const [visitorBlocks, setVisitorBlocks] = useState<VisitorBlock[]>([]);
  const [activeShelf, setActiveShelf] = useState<ShelfId>(() => (localStorage.getItem('last-board-shelf') as ShelfId) || 'prarambhah');
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);
  const [puzzleIndexByShelf, setPuzzleIndexByShelf] = useState<Partial<Record<ShelfId, number>>>({});
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isChipsExpanded, setIsChipsExpanded] = useState(false);
  const activeChipRef = useRef<HTMLButtonElement | null>(null);
  const puzzleBoardRef = useRef<HTMLElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState<'all' | 'current'>('all');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if (
        (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);
  const [showHelp, setShowHelp] = useState<boolean>(() => {
    try {
      return localStorage.getItem('jodo-help-collapsed') !== 'true';
    } catch {
      return true;
    }
  });

  const toggleHelp = () => {
    setShowHelp((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('jodo-help-collapsed', next ? 'false' : 'true');
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const [labelsText, boardText, puzzleText, visitorText] = await Promise.all([
          fetchText('labels.txt').catch(() => ''),
          fetchText('board.json').catch(() => ''),
          fetchText('puzzles.txt').catch(() => ''),
          fetchText('visitor.txt').catch(() => ''),
        ]);

        const labelRows = parse(labelsText);
        const parsedShelves = labelRows.filter((parts) => parts[0] === 'shelf' && parts[1]);
        if (parsedShelves.length > 0) {
          setShelfButtons(parsedShelves.map(([, id, title]) => ({ id: (SHELF_ALIASES[id] ?? id) as ShelfId, label: title })));
        }
        const parsedPackLabels = labelRows
          .filter((parts) => parts[0] === 'pack' && parts[2])
          .map(([, , title, gloss]) => ({ title, gloss: gloss ?? '' }));
        setPackLabels(parsedPackLabels);
        if (visitorText.trim()) setVisitorBlocks(parseVisitor(visitorText));

        if (boardText.trim()) {
          const parsedBoard = JSON.parse(boardText) as BoardShelfLine[];
          if (Array.isArray(parsedBoard)) {
            setBoardShelves(parsedBoard);
          }
        }

        if (puzzleText.trim()) {
          const parsedPuzzles = parse(puzzleText)
            .map(([_shape, target, answer, tiles, sentence, english, seed]) => ({
              target,
              answer,
              tiles: tiles.split(',').map((tile) => cleanTile(tile)).filter(Boolean),
              sentence,
              english,
              seed,
            }))
            .filter((item) => item.target);
          setFallbackPuzzles(parsedPuzzles);
        }
      } catch {
        setError('The board files could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    void loadBoard();
  }, []);

  const activeBoardShelf = boardShelves.find((entry) => SHELF_ALIASES[entry.shelf.toLowerCase()] === activeShelf || entry.shelf.toLowerCase() === activeShelf) ?? null;
  const activePuzzles = activeBoardShelf?.puzzles.length
    ? activeBoardShelf.puzzles
    : fallbackPuzzles.filter((item) => item.target === 'का' || item.target === 'मा' || item.target === 'सा' || item.target === 'बालः');
  const rawPuzzleIndex = puzzleIndexByShelf[activeShelf] ?? 0;
  const puzzleIndex = activePuzzles.length
    ? Math.max(0, Math.min(rawPuzzleIndex, activePuzzles.length - 1))
    : 0;
  const activePuzzle = activePuzzles[puzzleIndex] ?? activePuzzles[0] ?? fallbackPuzzles[0] ?? null;
  const activePackLabel = packLabels.find((item) => item.title === activeBoardShelf?.native) ?? null;
  const packTitle = activePackLabel?.title ?? activeBoardShelf?.native ?? '';
  const packGloss = activePackLabel?.gloss ?? '';
  const puzzlePhase = (activePuzzle?.phase || '').trim();
  const isLearnPhase = puzzlePhase === 'learn';
  const isMatchMeaningPhase = puzzlePhase === 'match-meaning';

  const isCorrect = evaluateChosen(activePuzzle, chosen);

  const chooseShelf = (nextShelf: ShelfId) => {
    const switched = nextShelf !== activeShelf;
    setActiveShelf(nextShelf);
    if (switched) {
      setPuzzleIndexByShelf((current) => ({ ...current, [nextShelf]: 0 }));
    }
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
    localStorage.setItem('last-board-shelf', nextShelf);
    setTimeout(() => {
      puzzleBoardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const allShelvesWithPuzzles = useMemo(() => {
    const groups: { shelfId: ShelfId; shelfName: string; shelfIcon: string; puzzles: BoardPuzzle[] }[] = [];
    if (boardShelves.length > 0) {
      for (const entry of boardShelves) {
        const shelfKey = entry.shelf.toLowerCase().trim();
        const shelfId = (SHELF_ALIASES[shelfKey] ?? shelfKey) as ShelfId;
        const meta = SHELF_DESCRIPTIONS[shelfId];
        groups.push({
          shelfId,
          shelfName: meta?.title ?? entry.shelf,
          shelfIcon: meta?.icon ?? '🧩',
          puzzles: entry.puzzles ?? [],
        });
      }
    } else if (fallbackPuzzles.length > 0) {
      const meta = SHELF_DESCRIPTIONS['prarambhah'];
      groups.push({
        shelfId: 'prarambhah',
        shelfName: meta?.title ?? 'Beginners',
        shelfIcon: meta?.icon ?? '🌱',
        puzzles: fallbackPuzzles,
      });
    }
    return groups;
  }, [boardShelves, fallbackPuzzles]);

  const searchResults = useMemo<BoardSearchMatch[]>(() => {
    const q = searchQuery.trim().toLowerCase().normalize('NFC');
    if (!q) return [];

    const results: BoardSearchMatch[] = [];
    const targetGroups = searchScope === 'current'
      ? allShelvesWithPuzzles.filter((g) => g.shelfId === activeShelf)
      : allShelvesWithPuzzles;

    for (const group of targetGroups) {
      const puzzles = group.puzzles;
      for (let i = 0; i < puzzles.length; i++) {
        const p = puzzles[i];
        const target = (p.target || '').toLowerCase().normalize('NFC');
        const answer = (p.answer || '').toLowerCase().normalize('NFC');
        const english = (p.english || '').toLowerCase();
        const gloss = (p.gloss || '').toLowerCase();
        const sentence = (p.sentence || '').toLowerCase().normalize('NFC');
        const prompt = (p.prompt || '').toLowerCase().normalize('NFC');
        const explanation = (p.explanation || '').toLowerCase();
        const tiles = (p.tiles || []).map((t) => t.toLowerCase().normalize('NFC'));

        const isMatch =
          target.includes(q) ||
          answer.includes(q) ||
          english.includes(q) ||
          gloss.includes(q) ||
          sentence.includes(q) ||
          prompt.includes(q) ||
          explanation.includes(q) ||
          tiles.some((t) => t.includes(q));

        if (isMatch) {
          results.push({
            puzzle: p,
            shelfId: group.shelfId,
            shelfName: group.shelfName,
            shelfIcon: group.shelfIcon,
            puzzleIndex: i,
          });
        }
      }
    }
    return results;
  }, [searchQuery, searchScope, activeShelf, allShelvesWithPuzzles]);

  const handleSelectSearchResult = (match: BoardSearchMatch) => {
    if (match.shelfId !== activeShelf) {
      setActiveShelf(match.shelfId);
      localStorage.setItem('last-board-shelf', match.shelfId);
    }
    setPuzzleIndexByShelf((current) => ({
      ...current,
      [match.shelfId]: match.puzzleIndex,
    }));
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
    setIsSearchOpen(false);
    setTimeout(() => {
      puzzleBoardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 70);
  };

  const targetWord = ((activePuzzle?.answer ?? activePuzzle?.target) || '').normalize('NFC');
  const targetIsWholeTile = !!activePuzzle?.tiles?.some((tile) => cleanTile(tile).normalize('NFC') === targetWord);
  // प्रश्न-पदानि is Beginners Part 2 only — never hijack Sanskriti/Vastu रिक्तम् rows
  const isPrashnaPart = activeShelf === 'prarambhah' && targetIsWholeTile;
  const displaySkin = isLearnPhase
    ? 'शिक्षा'
    : isMatchMeaningPhase
      ? 'अर्थ'
      : (isPrashnaPart ? 'प्रश्न' : (activeBoardShelf?.skin ?? ''));
  const displayPackTitle = isPrashnaPart ? 'प्रश्न-पदानि' : packTitle;
  const displayPackGloss = isPrashnaPart ? 'who · what · where · when · how' : packGloss;
  // जोडो: no Part banner — board-tip alone covers the instructions
  const phaseBanner = isPrashnaPart
    ? 'Part 2 — question words.'
    : '';

  // जोडो joins (क+आ) stay multi-tap. Question-words (कः on a tile) are one tap.
  const isJodoSkin = (!activeBoardShelf || activeBoardShelf.skin === 'जोडो') && !targetIsWholeTile;

  const shownTarget = (activePuzzle?.prompt ?? activePuzzle?.target) || '';
  const hasBlank = !isLearnPhase && !isMatchMeaningPhase && (
    shownTarget.includes('____')
    || activeBoardShelf?.skin === 'रिक्तम्'
    || isPrashnaPart
  );
  const wrongAttemptMessage = isMatchMeaningPhase
    ? 'Not that cream word — try another cream tile.'
    : isJodoSkin
      ? 'Not those tiles. Click the right letter and vowel (any order), or try another cream tile.'
      : hasBlank
        ? 'Not that cream tile — try another cream tile.'
        : 'Not that cream tile — try another cream tile.';

  /** Apply a new cream-tile selection and immediately reveal sentence/graphic if correct. */
  const applySelection = (nextChosen: string[]) => {
    setChosen(nextChosen);
    if (!isJodoSkin) {
      if (nextChosen.length === 0) {
        setChecked(false);
        setWrongAttempt(false);
        return;
      }
      if (evaluateChosen(activePuzzle, nextChosen)) {
        setChecked(true);
        setWrongAttempt(false);
      } else {
        setChecked(false);
        setWrongAttempt(true);
      }
      return;
    }
    // जोडो: wait until two tiles, then auto-reveal or tip
    if (nextChosen.length < 2) {
      setChecked(false);
      setWrongAttempt(false);
      return;
    }
    if (evaluateChosen(activePuzzle, nextChosen)) {
      setChecked(true);
      setWrongAttempt(false);
    } else {
      setChecked(false);
      setWrongAttempt(true);
    }
  };

  const toggleTile = (tile: string) => {
    const clean = cleanTile(tile);
    if (!clean) return;
    // Selecting a tile must always work — never freeze. Wrong/other click replaces and re-evaluates.
    if (!isJodoSkin) {
      applySelection([clean]);
      return;
    }
    // जोडो: after success, a new tap starts a fresh pair; otherwise toggle membership (any order).
    if (checked && isCorrect) {
      applySelection([clean]);
      return;
    }
    // Never accumulate more than 2 tiles — a third tap starts fresh with that tile.
    if (chosen.includes(clean)) {
      applySelection(chosen.filter((item) => item !== clean));
      return;
    }
    if (chosen.length >= 2) {
      applySelection([clean]);
      return;
    }
    applySelection([...chosen, clean]);
  };

  const hasNextPuzzle = (isLearnPhase || isCorrect) && activePuzzles.length > 0;
  const isLastPuzzle = activePuzzles.length > 0 && puzzleIndex + 1 >= activePuzzles.length;

  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!(checked && isCorrect)) return;
    nextBtnRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [checked, isCorrect, puzzleIndex, activeShelf]);


  // If shelf grew/shrank or index is stale, keep progress in range (avoids wild N / length vs puzzle 0).
  useEffect(() => {
    const len = activePuzzles.length;
    if (len === 0) return;
    setPuzzleIndexByShelf((current) => {
      const idx = current[activeShelf] ?? 0;
      const clamped = Math.max(0, Math.min(idx, len - 1));
      if (clamped === idx) return current;
      return { ...current, [activeShelf]: clamped };
    });
  }, [activeShelf, activePuzzles.length]);

  const resetPuzzleUi = () => {
    setChecked(false);
    setWrongAttempt(false);
    setChosen([]);
  };

  // Unlock cream tiles on every puzzle advance / shelf change (guards race or sticky checked+chosen,
  // especially back-to-back same targets like नदी → नदी).
  useEffect(() => {
    setChosen([]);
    setChecked(false);
    setWrongAttempt(false);
  }, [puzzleIndex, activeShelf]);

  /** Navigate to previous puzzle on this shelf. */
  const goPrev = () => {
    if (!activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => {
      const idx = current[activeShelf] ?? 0;
      if (idx <= 0) return current;
      return { ...current, [activeShelf]: idx - 1 };
    });
    resetPuzzleUi();
  };

  /** Advance without wrapping — used by Next and auto-advance. */
  const goNext = () => {
    if (!activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => {
      const idx = current[activeShelf] ?? 0;
      if (idx + 1 >= activePuzzles.length) return current;
      return { ...current, [activeShelf]: idx + 1 };
    });
    resetPuzzleUi();
  };

  /** Again on the last puzzle — restart shelf at 0. */
  const restartShelf = () => {
    if (!activePuzzles.length) return;
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: 0 }));
    resetPuzzleUi();
  };

  const onNextOrAgain = () => {
    if (isLastPuzzle) restartShelf();
    else goNext();
  };

  // After a correct cream-tile reveal, auto-advance so later मात्रा rows still appear if Next is missed.
  // Learn cards never auto-advance — child must hear, then click Next.
  // Do not wrap on the last puzzle (that felt like the chain broke).
  useEffect(() => {
    if (isLearnPhase) return undefined;
    if (!checked || !isCorrect || activePuzzles.length < 2) return undefined;
    if (puzzleIndex + 1 >= activePuzzles.length) return undefined;
    const timer = window.setTimeout(() => {
      goNext();
    }, 8000);
    return () => window.clearTimeout(timer);
    // goNext closes over puzzleIndex/activeShelf; listing those deps avoids stale advance / double-fire.
  }, [checked, isCorrect, puzzleIndex, activeShelf, activePuzzles.length, isLearnPhase]);

  const sectionChips: BoardSectionChip[] =
    activeShelf === 'prarambhah' ? buildMatraSectionChips(activePuzzles)
      : activeShelf === 'prakrtih' ? buildNatureSectionChips(activePuzzles)
        : [];
  const activeChipId = activeSectionChipId(sectionChips, puzzleIndex);

  useEffect(() => {
    if (!isChipsExpanded && activeChipRef.current) {
      activeChipRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeChipId, isChipsExpanded]);

  const jumpToSection = (start: number) => {
    if (start < 0 || !activePuzzles.length) return;
    const clamped = Math.max(0, Math.min(start, activePuzzles.length - 1));
    setPuzzleIndexByShelf((current) => ({ ...current, [activeShelf]: clamped }));
    setChosen([]);
    setChecked(false);
    setWrongAttempt(false);
    setTimeout(() => {
      puzzleBoardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 60);
  };

  const activeStep = (checked && isCorrect) ? 2 : 1;
  const graphicWord = ((activePuzzle?.answer ?? activePuzzle?.target ?? activePuzzle?.highlight) || '').normalize('NFC');
  const puzzleGraphic = graphicWord ? iconForExampleWord(graphicWord) : '✨';
  const activeShelfInfo = SHELF_DESCRIPTIONS[activeShelf];

  return <main className="board-shell">
    {/* Top Website Navigation Breadcrumbs & Badge */}
    <div className="board-top-nav">
      <nav className="board-breadcrumbs" aria-label="Website Navigation">
        {onNavigateToHome && (
          <>
            <button type="button" className="board-nav-link" onClick={onNavigateToHome} title="Go to Homepage">
              🏠 Home
            </button>
            <span className="board-nav-sep" aria-hidden="true">/</span>
          </>
        )}
        <span className="board-nav-current">🧩 जोडो Tile Puzzle</span>
      </nav>
      <div className="board-site-shortcuts">
        {onNavigateToReader && (
          <button type="button" className="board-shortcut-btn" onClick={onNavigateToReader}>
            📖 Deepakam Reader
          </button>
        )}
        {onNavigateToVarnamala && (
          <button type="button" className="board-shortcut-btn" onClick={onNavigateToVarnamala}>
            🔤 Varṇamālā
          </button>
        )}
        {onNavigateToGrammar && (
          <button type="button" className="board-shortcut-btn" onClick={onNavigateToGrammar}>
            📚 Grammar
          </button>
        )}
      </div>
    </div>

    <div className="board-heading">
      <div>
        <p className="eyebrow">शब्द-निर्माण-क्रीडा · BUILD SANSKRIT WORDS</p>
        <h2>जोडो · Tile Puzzle Studio</h2>
        <p>Blend sounds into words, solve puzzles, and discover daily Sanskrit vocabulary.</p>
      </div>
      <div className="board-mark" aria-hidden="true">ॐ</div>
    </div>

    {/* Instructions Banner for Beginners (Collapsible) */}
    <div className="jodo-guide-banner">
      <div className="jodo-guide-header" onClick={toggleHelp} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleHelp(); }}>
        <div className="jodo-guide-title">
          <span className="jodo-guide-icon">💡</span>
          <strong>How to Play जोडो (Instructions)</strong>
        </div>
        <button type="button" className="jodo-guide-toggle-btn" aria-label={showHelp ? 'Hide Instructions' : 'Show Instructions'}>
          {showHelp ? 'Hide ▲' : 'Show Help ▼'}
        </button>
      </div>
      {showHelp && (
        <div className="jodo-guide-content">
          <div className="jodo-guide-step">
            <span className="jodo-step-badge">Step 1</span>
            <p><strong>Observe the target word</strong> displayed in large Sanskrit letters inside the puzzle card.</p>
          </div>
          <div className="jodo-guide-step">
            <span className="jodo-step-badge">Step 2</span>
            <p><strong>Tap cream tiles in sequence</strong> to blend consonants and vowel matras (e.g., tap <span className="jodo-sample-tile">क</span> then <span className="jodo-sample-tile">ा</span> to make <span className="jodo-sample-tile">का</span>).</p>
          </div>
          <div className="jodo-guide-step">
            <span className="jodo-step-badge">Step 3</span>
            <p><strong>Success!</strong> The illustration, meaning, and sentence will appear automatically. Tap <span className="jodo-sample-next">Next Puzzle ▶</span> to advance.</p>
          </div>
        </div>
      )}
    </div>

    <nav className="wing-nav" aria-label="Shelves">
      {shelfButtons.map((item) => (
        <button
          key={item.id}
          className={activeShelf === item.id ? 'wing-button active' : 'wing-button'}
          onClick={() => chooseShelf(item.id)}
        >
          {SHELF_DESCRIPTIONS[item.id]?.icon ? `${SHELF_DESCRIPTIONS[item.id].icon} ` : ''}{item.label}
        </button>
      ))}
    </nav>

    {/* Search Bar for Tile Puzzles */}
    <section className="board-search-section" aria-label="Search Tile Puzzles">
      <div className="board-search-bar-wrap">
        <div className="board-search-input-box">
          <span className="board-search-icon" aria-hidden="true">🔍</span>
          <input
            ref={searchInputRef}
            type="search"
            className="board-search-input"
            placeholder="Search tile puzzles by word, meaning, or letter (e.g. का, नेत्रम्, जलम्, girl, eye)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isSearchOpen && e.target.value.trim().length > 0) {
                setIsSearchOpen(true);
              }
            }}
            onFocus={() => {
              if (searchQuery.trim().length > 0) {
                setIsSearchOpen(true);
              }
            }}
            aria-label="Search Tile Puzzles"
          />
          {searchQuery && (
            <button
              type="button"
              className="board-search-clear-btn"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
                searchInputRef.current?.focus();
              }}
              aria-label="Clear Search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Search Scope Toggle */}
        <div className="board-search-scope-toggle" role="group" aria-label="Search Scope">
          <button
            type="button"
            className={`board-scope-btn ${searchScope === 'all' ? 'active' : ''}`}
            onClick={() => setSearchScope('all')}
            title="Search across all 7 puzzle shelves"
          >
            🌍 All Shelves
          </button>
          <button
            type="button"
            className={`board-scope-btn ${searchScope === 'current' ? 'active' : ''}`}
            onClick={() => setSearchScope('current')}
            title={`Search only in ${activeShelfInfo?.title || 'Current Shelf'}`}
          >
            📂 {activeShelfInfo?.title ? activeShelfInfo.title.split('·')[0].trim() : 'Current Shelf'}
          </button>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="board-search-suggestions">
        <span className="board-suggestion-label">💡 Try searching:</span>
        {[
          { label: 'का (Who)', query: 'का' },
          { label: 'बालिका (Girl)', query: 'बालिका' },
          { label: 'नेत्रम् (Eye)', query: 'नेत्रम्' },
          { label: 'जलम् (Water)', query: 'जलम्' },
          { label: 'वृक्षः (Tree)', query: 'वृक्षः' },
          { label: 'हस्तः (Hand)', query: 'हस्त' },
          { label: 'Question words', query: 'who' },
        ].map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="board-search-chip"
            onClick={() => {
              setSearchQuery(chip.query);
              setIsSearchOpen(true);
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Search Results Drawer / Panel */}
      {isSearchOpen && searchQuery.trim().length > 0 && (
        <div className="board-search-results-panel" role="region" aria-label="Puzzle Search Results">
          <div className="board-search-results-header">
            <div className="board-search-header-meta">
              <strong>
                {searchResults.length} {searchResults.length === 1 ? 'puzzle' : 'puzzles'} found
              </strong>
              <span className="board-search-query-badge">
                matching &ldquo;{searchQuery}&rdquo; {searchScope === 'all' ? 'across all shelves' : `in ${activeShelfInfo?.title || 'current shelf'}`}
              </span>
            </div>
            <button
              type="button"
              className="board-search-close-btn"
              onClick={() => setIsSearchOpen(false)}
              title="Close search results (Esc)"
            >
              ✕ Close
            </button>
          </div>

          {searchResults.length > 0 ? (
            <>
              <div className="board-search-results-list">
                {searchResults.slice(0, 50).map((match) => (
                  <div
                    key={`${match.shelfId}-${match.puzzleIndex}-${match.puzzle.target}`}
                    className="board-search-result-card"
                    onClick={() => handleSelectSearchResult(match)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectSearchResult(match);
                      }
                    }}
                  >
                    <div className="board-search-card-main">
                      <div className="board-search-card-top">
                        <span className="board-search-target-word">{match.puzzle.target}</span>
                        <span className="board-search-shelf-pill">
                          {match.shelfIcon} {match.shelfName.split('·')[0].trim()} · #{match.puzzleIndex + 1}
                        </span>
                      </div>
                      {match.puzzle.english && (
                        <div className="board-search-english">{match.puzzle.english}</div>
                      )}
                      {match.puzzle.sentence && (
                        <div className="board-search-sentence">{match.puzzle.sentence}</div>
                      )}
                      {match.puzzle.tiles && match.puzzle.tiles.length > 0 && (
                        <div className="board-search-tiles-preview">
                          <span className="board-search-tiles-label">Tiles:</span>
                          {match.puzzle.tiles.map((t, idx) => (
                            <span key={idx} className="board-search-tile-pill">{cleanTile(t)}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="board-search-card-action">
                      <button
                        type="button"
                        className="board-search-play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectSearchResult(match);
                        }}
                      >
                        Play ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {searchResults.length > 50 && (
                <div className="board-search-overflow-note">
                  ⚡ Showing first 50 of {searchResults.length} matching puzzles. Type more specific letters to refine.
                </div>
              )}
            </>
          ) : (
            <div className="board-search-empty">
              <span className="board-search-empty-icon">🔎</span>
              <p><strong>No puzzles found matching &ldquo;{searchQuery}&rdquo;</strong></p>
              <p className="board-search-empty-hint">
                {searchScope === 'current'
                  ? 'Try switching to "🌍 All Shelves" above, or search by English meaning (e.g. eye, girl, water, tree) or Devanagari letter.'
                  : 'Try searching with a shorter root word, an English keyword (e.g. eye, water, boy, temple), or single letter.'}
              </p>
              {searchScope === 'current' && (
                <button
                  type="button"
                  className="board-search-switch-scope-btn"
                  onClick={() => setSearchScope('all')}
                >
                  Switch to 🌍 All Shelves
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>

    {/* Active Shelf Info Banner */}
    {activeShelfInfo && (
      <div className="board-shelf-banner">
        <span className="shelf-banner-icon">{activeShelfInfo.icon}</span>
        <div className="shelf-banner-details">
          <span className="shelf-banner-title">{activeShelfInfo.title}</span>
          <span className="shelf-banner-desc">{activeShelfInfo.desc}</span>
        </div>
        <div className="shelf-banner-count">
          <span className="shelf-count-badge">
            🧩 {activePuzzles.length} Puzzles
          </span>
        </div>
      </div>
    )}

    {/* Compact Section Chips Bar — Single Row Carousel by Default to prevent vertical scrolling */}
    {sectionChips.length > 0 && (
      <div className="board-sections-container">
        <div className="board-sections-header">
          <div className="board-sections-meta">
            <span className="board-sections-tag">अक्षर-विभागः · Jump to Letter:</span>
            {activeChipId && (
              <span className="board-active-chip-badge">
                Current: <strong>{activeChipId}</strong> ({puzzleIndex + 1}/{activePuzzles.length})
              </span>
            )}
          </div>
          {sectionChips.length > 15 && (
            <button
              type="button"
              className="board-chips-expand-btn"
              onClick={() => setIsChipsExpanded(!isChipsExpanded)}
              title={isChipsExpanded ? 'Collapse to single row' : 'View all letter chips'}
            >
              {isChipsExpanded ? '▲ Single Row' : `▼ All Letters (${sectionChips.length})`}
            </button>
          )}
        </div>

        <div
          className={`board-sections ${isChipsExpanded ? 'board-sections--expanded' : 'board-sections--carousel'}`}
          role="group"
          aria-label="Jump to section"
        >
          {sectionChips.map((chip) => {
            const isActive = activeChipId === chip.id;
            return (
              <button
                key={chip.id}
                ref={isActive ? activeChipRef : null}
                type="button"
                className={isActive ? 'board-section-chip active' : 'board-section-chip'}
                onClick={() => jumpToSection(chip.start)}
                title={`Jump to ${chip.label}`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    )}

    <div className="board-tip-row">
      <p className="board-tip">{isLearnPhase
        ? <>Hear the word, read the meaning, then <strong className="tip-next">Click Next</strong>.</>
        : isJodoSkin
          ? <>Click letter chips to join them (e.g. क then आ) — picture and sentence appear. Then <strong className="tip-next">Click Next</strong>.</>
          : emphasizeTipText('Click a cream tile. The picture and sentence appear. Then Click Next.')}</p>
      {phaseBanner ? <p className="board-phase">{phaseBanner}</p> : null}
      <button className="welcome-open" type="button" aria-label="Open Welcome" onClick={() => setWelcomeOpen(true)}>?</button>
    </div>

    {loading && <p className="board-status">Loading today&apos;s shelf…</p>}
    {error && <p className="board-status error">{error}</p>}

    {!loading && !error && activePuzzle && <>
      {packTitle && <div className="pack-shelf" aria-label="Packs">
        <div className="pack-card active">
          <strong>{displayPackTitle}</strong>
          {displayPackGloss && <small>{displayPackGloss}</small>}
        </div>
      </div>}

      <section ref={puzzleBoardRef} className="puzzle-board">
        <div className="puzzle-meta">
          <div className="meta-left">
            <span className="meta-skin-badge">{displaySkin}</span>
            <span className="meta-hint-pill">
              {isLearnPhase
                ? '📖 Learn word'
                : isJodoSkin
                  ? '🎯 जोडो · Join tiles'
                  : '👆 1 tile → Next'}
            </span>
          </div>
          <div className="puzzle-nav-controls">
            <button
              type="button"
              className="puzzle-nav-arrow"
              onClick={goPrev}
              disabled={puzzleIndex <= 0}
              title="Previous Puzzle (पूर्वतन-पहेलिका)"
              aria-label="Previous Puzzle"
            >
              ◀
            </button>
            <span className="meta-progress">
              <strong>{puzzleIndex + 1}</strong> <span className="meta-total">/ {activePuzzles.length}</span>
            </span>
            <button
              type="button"
              className="puzzle-nav-arrow"
              onClick={goNext}
              disabled={puzzleIndex + 1 >= activePuzzles.length}
              title="Next Puzzle (अग्रिम-पहेलिका)"
              aria-label="Next Puzzle"
            >
              ▶
            </button>
          </div>
        </div>

        <div className="puzzle-progress-track" aria-hidden="true">
          <div
            className="puzzle-progress-bar"
            style={{ width: `${Math.min(100, Math.round(((puzzleIndex + 1) / Math.max(1, activePuzzles.length)) * 100))}%` }}
          />
        </div>

        {!isLearnPhase && !isJodoSkin && (
          <ol className="puzzle-steps" aria-label="Puzzle steps">
            <li className={activeStep === 1 ? 'active' : undefined}>
              <span className="step-num" aria-hidden="true">1</span>
              <span className="step-label">
                <>Click a cream tile <small>(numbers on tiles)</small></>
              </span>
            </li>
            <li className={activeStep === 2 ? 'active' : undefined}>
              <span className="step-num" aria-hidden="true">2</span>
              <span className="step-label">Click Next</span>
            </li>
          </ol>
        )}

        {isLearnPhase ? (
          <div className="learn-card">
            <p className="learn-word">{activePuzzle.target}</p>
            <p className="learn-gloss">{activePuzzle.gloss ?? activePuzzle.english}</p>
            <button
              className="hear-button"
              type="button"
              onClick={() => playPronunciation(activePuzzle.target)}
            >
              🔊 Hear
            </button>
            <div className="tile-row learn-tile-row">
              {activePuzzle.tiles.map((tile, index) => (
                <button
                  key={`${tile}-${index}`}
                  className="puzzle-tile"
                  type="button"
                  onClick={() => playPronunciation(cleanTile(tile))}
                >
                  <span className="tile-num" aria-hidden="true">{index + 1}</span>
                  <span>{tile}</span>
                </button>
              ))}
            </div>
            <div className="puzzle-actions">
              <button ref={nextBtnRef} className="next-button learn-next" type="button" onClick={onNextOrAgain}>
                {isLastPuzzle ? 'Play Again ↺' : 'I learnt it · Next ▶'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {isJodoSkin ? (
              <div className="jodo-prompt-card">
                <div className="jodo-goal-bar">
                  <span className="jodo-goal-tag">🎯 जोडो (Join):</span>
                  <span className="jodo-goal-target">{activePuzzle.target}</span>
                  {activePuzzle.english && (
                    <span className="jodo-goal-meaning" title="Meaning in English">
                      ({activePuzzle.english})
                    </span>
                  )}
                  <button
                    type="button"
                    className="jodo-sound-btn"
                    onClick={() => playPronunciation(activePuzzle.target)}
                    title={`Hear pronunciation for ${activePuzzle.target}`}
                    aria-label={`Hear ${activePuzzle.target}`}
                  >
                    🔊
                  </button>
                </div>
                <div className="jodo-sentence-line">
                  {renderJodoSentenceWithSlot(activePuzzle.sentence, activePuzzle.target, chosen)}
                </div>
              </div>
            ) : (
              <div className="standard-prompt-block">
                <p className="puzzle-prompt">
                  {isMatchMeaningPhase
                    ? (activePuzzle.prompt ?? `Which word means · ${activePuzzle.gloss ?? activePuzzle.english}?`)
                    : (activePuzzle.prompt ?? activePuzzle.target)}
                </p>
                {isPrashnaPart && activePuzzle.english && (
                  <p className="prashna-english-clue">({activePuzzle.english})</p>
                )}
              </div>
            )}

            <div className="tile-row">
              {activePuzzle.tiles.map((tile, index) => (
                <button key={`${tile}-${index}`} className={chosen.includes(cleanTile(tile)) ? 'puzzle-tile chosen' : 'puzzle-tile'} onClick={() => toggleTile(tile)}>
                  <span className="tile-num" aria-hidden="true">{index + 1}</span>
                  <span>{tile}</span>
                </button>
              ))}
            </div>

            {checked && isCorrect && (
              <div className="puzzle-result correct">
                <div className="puzzle-success-banner">
                  <span className="success-emoji">🎉</span>
                  <span className="success-text">उत्तमम्! Correct!</span>
                </div>
                <div className="puzzle-graphic" aria-hidden="true">{puzzleGraphic}</div>
                <p className="result-sanskrit">{highlightedSentence(activePuzzle.sentence, activePuzzle.highlight, activePuzzle.tapHighlight)}</p>
                <p className="result-english">{activePuzzle.english}</p>
                <div className="result-audio-row">
                  <button
                    className="hear-button hear-button--inline"
                    type="button"
                    onClick={() => playPronunciation(activePuzzle.sentence || activePuzzle.target)}
                    title="Hear complete sentence"
                  >
                    🔊 Hear Sentence
                  </button>
                  {isJodoSkin && activePuzzle.target && (
                    <button
                      className="hear-button hear-button--inline hear-button--subtle"
                      type="button"
                      onClick={() => playPronunciation(activePuzzle.target)}
                      title={`Hear letter sound: ${activePuzzle.target}`}
                    >
                      🔊 Hear &apos;{activePuzzle.target}&apos;
                    </button>
                  )}
                </div>
                {activePuzzle.explanation && <p className="result-explanation">💡 {activePuzzle.explanation}</p>}
                {activePuzzle.seed && <p className="result-seed">{activePuzzle.seed}</p>}
                {hasNextPuzzle && <button ref={nextBtnRef} className="next-button" type="button" onClick={onNextOrAgain}>{isLastPuzzle ? 'Play Again ↺' : 'Next Puzzle ▶'}</button>}
              </div>
            )}
            {wrongAttempt && (
              <div className="puzzle-result wrong-feedback">
                <span className="wrong-icon">🤔</span>
                <div className="wrong-content">
                  <strong>{wrongAttemptMessage}</strong>
                  <button type="button" className="reset-try-btn" onClick={resetPuzzleUi}>Reset selection</button>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {activeShelf === 'sariram' && <aside className="board-sidebar" aria-label="Body anecdote">
        <p>{BODY_ANECDOTE}</p>
      </aside>}
    </>}

    {welcomeOpen && <>
      <div className="welcome-scrim" role="presentation" onClick={() => setWelcomeOpen(false)} />
      <aside className="welcome-overlay" aria-label="Welcome">
        <button className="welcome-close" type="button" aria-label="Close Welcome" onClick={() => setWelcomeOpen(false)}>×</button>
        {visitorBlocks.map((block, index) => React.createElement(block.heading, { key: `${block.heading}-${index}` }, emphasizeTipText(block.text)))}
      </aside>
    </>}
  </main>;
};

export default Board;