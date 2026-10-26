import React, { useEffect, useMemo, useState } from 'react';
import type { LessonSentence } from '../types/chapters';
import {
  lookupAnalyseGloss,
  englishMeaningFromGloss,
  type AnalyseRegistry,
} from '../utils/analyseGloss';
import { playPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';

export interface ParagraphWordMatchTestProps {
  sentence: LessonSentence;
  sentenceNumber: number;
  totalSentences: number;
  activeLessonId: string;
  glosses: AnalyseRegistry;
  onNext: () => void;
  isLastSentence: boolean;
  onOpenQuiz?: () => void;
}

export interface WordMatchPair {
  id: string;
  sanskrit: string;
  english: string;
}

const COMMON_PARTICLES = new Set([
  'च',
  'अपि',
  'न',
  'इति',
  'तु',
  'वा',
  'एव',
  'इव',
  'अत्र',
  'तत्र',
  'कुत्र',
  'यत्र',
  'कदा',
  'तदा',
  'यदा',
]);

const cleanDevanagariWord = (w: string): string =>
  (w || '')
    .replace(/[\s।॥,;:!?()[\]{}<>\x27"“”‘’—–०-९./\\=+#*~_`]+/g, '')
    .trim();

const cleanEnglishGloss = (str: string): string => {
  if (!str) return '';
  if (str.includes('used in Grade')) return '';
  // Remove parenthesized grammatical hints for clean display in matching tiles
  let clean = str.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
  // If multiple alternative meanings exist, take the first 1-2 for concise card presentation
  const parts = clean.split(/[/;]\s*/).map((s) => s.trim()).filter(Boolean);
  if (parts.length > 2) {
    clean = parts.slice(0, 2).join(' / ');
  }
  if (clean.length > 48) {
    clean = clean.slice(0, 45).trim() + '...';
  }
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
};

// Shuffles an array deterministically or pseudo-randomly
const shuffleList = <T,>(items: T[]): T[] => {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const extractParagraphPairs = (
  sentence: LessonSentence,
  glosses: AnalyseRegistry
): WordMatchPair[] => {
  if (!sentence) return [];

  // Gather candidate words from sentence.words or split from sentence.sanskrit
  const rawWords =
    sentence.words && sentence.words.length > 0
      ? sentence.words
      : sentence.sanskrit.split(/\s+/);

  const seenSanskrit = new Set<string>();
  const seenEnglish = new Set<string>();
  const scoredPairs: { sanskrit: string; english: string; score: number }[] = [];

  for (const raw of rawWords) {
    const clean = cleanDevanagariWord(raw);
    if (!clean || clean.length < 2 || !/[\u0900-\u097F]/.test(clean)) continue;
    if (seenSanskrit.has(clean)) continue;

    // Lookup gloss
    let entry = lookupAnalyseGloss(glosses, clean);
    if (!entry) {
      // Try stripping common vibhakti / inflection endings
      const stems = [
        clean.endsWith('स्य') ? clean.slice(0, -3) : null,
        clean.endsWith('ेण') ? clean.slice(0, -2) : null,
        clean.endsWith('िना') ? clean.slice(0, -3) : null,
        clean.endsWith('िणा') ? clean.slice(0, -3) : null,
        clean.endsWith('णा') ? clean.slice(0, -2) : null,
        clean.endsWith('ना') ? clean.slice(0, -2) : null,
        clean.endsWith('ाय') ? clean.slice(0, -2) : null,
        clean.endsWith('ये') ? clean.slice(0, -2) : null,
        clean.endsWith('योः') ? clean.slice(0, -3) : null,
        clean.endsWith('ाः') ? clean.slice(0, -2) : null,
        clean.endsWith('े') ? clean.slice(0, -1) : null,
        clean.endsWith('तः') ? clean.slice(0, -2) : null,
        clean.endsWith('म्') ? clean.slice(0, -2) : null,
        clean.endsWith('ं') ? clean.slice(0, -1) : null,
        clean.endsWith('ः') ? clean.slice(0, -1) : null,
      ].filter(Boolean) as string[];

      for (const stem of stems) {
        entry = lookupAnalyseGloss(glosses, stem);
        if (entry) break;
      }
    }

    if (!entry) continue;

    const rawEn = englishMeaningFromGloss(entry);
    const cleanEn = cleanEnglishGloss(rawEn);
    if (!cleanEn || cleanEn.length < 2) continue;

    const enKey = cleanEn.toLowerCase();
    if (seenEnglish.has(enKey)) continue;

    seenSanskrit.add(clean);
    seenEnglish.add(enKey);

    const isParticle = COMMON_PARTICLES.has(clean);
    // Prioritize richer, longer words over trivial particles
    const score = (isParticle ? 1 : 12) + Math.min(clean.length, 10);
    scoredPairs.push({ sanskrit: clean, english: cleanEn, score });
  }

  // If sentence has explicit sanskrit_gloss or answer_sanskrit (glossary items)
  if (sentence.kind === 'glossary' && sentence.sanskrit && sentence.meaning) {
    const cleanHead = cleanDevanagariWord(sentence.sanskrit);
    const cleanMean = cleanEnglishGloss(sentence.meaning);
    if (cleanHead && cleanMean && !seenSanskrit.has(cleanHead)) {
      scoredPairs.unshift({ sanskrit: cleanHead, english: cleanMean, score: 30 });
    }
  }

  // Sort descending by score
  scoredPairs.sort((a, b) => b.score - a.score);

  // Take top 4 pairs
  return scoredPairs.slice(0, 4).map((p, idx) => ({
    id: `pair-${idx}-${p.sanskrit}`,
    sanskrit: p.sanskrit,
    english: p.english,
  }));
};

export const ParagraphWordMatchTest: React.FC<ParagraphWordMatchTestProps> = ({
  sentence,
  sentenceNumber,
  totalSentences,
  activeLessonId,
  glosses,
  onNext,
  isLastSentence,
  onOpenQuiz,
}) => {
  // Extract pairs for current paragraph
  const pairs = useMemo(
    () => extractParagraphPairs(sentence, glosses),
    [sentence, glosses]
  );

  // Map of Sanskrit -> English for verification
  const answerMap = useMemo(() => {
    const map = new Map<string, string>();
    pairs.forEach((p) => map.set(p.sanskrit, p.english));
    return map;
  }, [pairs]);

  // Shuffled English items
  const [shuffledEnglish, setShuffledEnglish] = useState<string[]>([]);
  const [selectedSanskrit, setSelectedSanskrit] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedSanskrit, setMatchedSanskrit] = useState<Set<string>>(new Set());
  const [wrongAttempt, setWrongAttempt] = useState<{
    sanskrit?: string;
    english?: string;
  } | null>(null);
  const [resetCount, setResetCount] = useState<number>(0);

  // Reset state on sentence change or reset
  useEffect(() => {
    setSelectedSanskrit(null);
    setSelectedEnglish(null);
    setMatchedSanskrit(new Set());
    setWrongAttempt(null);
    if (pairs.length > 0) {
      // Ensure shuffled order differs from original if > 1 item
      const list = pairs.map((p) => p.english);
      let shuffled = shuffleList(list);
      if (
        pairs.length > 1 &&
        shuffled.every((en, idx) => en === pairs[idx].english)
      ) {
        shuffled = [...shuffled].reverse();
      }
      setShuffledEnglish(shuffled);
    } else {
      setShuffledEnglish([]);
    }
  }, [pairs, sentenceNumber, activeLessonId, resetCount]);

  if (pairs.length < 2) {
    return null;
  }

  const isCompleted = matchedSanskrit.size === pairs.length;
  const matchCount = matchedSanskrit.size;

  const handleSanskritClick = (word: string) => {
    if (matchedSanskrit.has(word) || wrongAttempt) return;

    // Pronounce the word aloud for multi-sensory feedback
    playPronunciation(word);

    if (selectedSanskrit === word) {
      setSelectedSanskrit(null);
      return;
    }

    if (selectedEnglish) {
      // Check match with previously selected English
      const expectedEn = answerMap.get(word);
      if (expectedEn === selectedEnglish) {
        soundEffects.playEncouragementDing();
        setMatchedSanskrit((prev) => {
          const next = new Set(prev);
          next.add(word);
          if (next.size === pairs.length) {
            soundEffects.playCelebrationChime();
          }
          return next;
        });
        setSelectedSanskrit(null);
        setSelectedEnglish(null);
      } else {
        soundEffects.playCartoonBoing();
        setWrongAttempt({ sanskrit: word, english: selectedEnglish });
        setTimeout(() => {
          setWrongAttempt(null);
          setSelectedSanskrit(null);
          setSelectedEnglish(null);
        }, 550);
      }
    } else {
      setSelectedSanskrit(word);
    }
  };

  const handleEnglishClick = (en: string) => {
    // Check if this English meaning is already matched
    const isAlreadyMatched = pairs.some(
      (p) => p.english === en && matchedSanskrit.has(p.sanskrit)
    );
    if (isAlreadyMatched || wrongAttempt) return;

    if (selectedEnglish === en) {
      setSelectedEnglish(null);
      return;
    }

    if (selectedSanskrit) {
      // Check match with previously selected Sanskrit
      const expectedEn = answerMap.get(selectedSanskrit);
      if (expectedEn === en) {
        soundEffects.playEncouragementDing();
        setMatchedSanskrit((prev) => {
          const next = new Set(prev);
          next.add(selectedSanskrit);
          if (next.size === pairs.length) {
            soundEffects.playCelebrationChime();
          }
          return next;
        });
        setSelectedSanskrit(null);
        setSelectedEnglish(null);
      } else {
        soundEffects.playCartoonBoing();
        setWrongAttempt({ sanskrit: selectedSanskrit, english: en });
        setTimeout(() => {
          setWrongAttempt(null);
          setSelectedSanskrit(null);
          setSelectedEnglish(null);
        }, 550);
      }
    } else {
      setSelectedEnglish(en);
    }
  };

  const handleReset = () => {
    setResetCount((c) => c + 1);
  };

  return (
    <div
      className={`paragraph-match-container${isCompleted ? ' paragraph-match-container--completed' : ''}`}
      role="region"
      aria-label="Paragraph Word Match Test"
    >
      <div className="paragraph-match-header">
        <div className="paragraph-match-title-group">
          <span className="paragraph-match-badge">🧩 शब्दार्थ-मेलनम् · Word Match Test</span>
          <span className="paragraph-match-subtitle">
            Relate each Sanskrit word with its English meaning:
          </span>
        </div>
        <div className="paragraph-match-status">
          <span className="paragraph-match-counter">
            {isCompleted ? '✓ All Matched!' : `${matchCount} / ${pairs.length} Matched`}
          </span>
          <div className="paragraph-match-progress-bar" aria-hidden="true">
            <div
              className="paragraph-match-progress-fill"
              style={{ width: `${(matchCount / pairs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Auditory Learner Full Sentence Recitation Player */}
      {sentence?.sanskrit && (
        <div className="paragraph-match-sentence-recitation-bar">
          <div className="paragraph-match-sentence-sa-wrap">
            <span className="paragraph-match-sentence-tag">
              📖 वाक्यम् ({sentenceNumber}/{totalSentences}):
            </span>
            <span className="paragraph-match-sentence-sa-text">{sentence.sanskrit}</span>
          </div>
          <button
            type="button"
            className="paragraph-match-sentence-audio-btn"
            onClick={() => playPronunciation(sentence.sanskrit)}
            title="Listen to full Sanskrit sentence pronunciation"
            aria-label="Listen to full sentence"
          >
            🔊 Recite Sentence
          </button>
        </div>
      )}

      <div className="paragraph-match-columns">
        {/* Sanskrit Words Column */}
        <div className="paragraph-match-col">
          <div className="paragraph-match-col-label">संस्कृत-पदानि (Sanskrit)</div>
          <div className="paragraph-match-card-list">
            {pairs.map((pair) => {
              const isMatched = matchedSanskrit.has(pair.sanskrit);
              const isSelected = selectedSanskrit === pair.sanskrit;
              const isWrong = wrongAttempt?.sanskrit === pair.sanskrit;

              return (
                <button
                  key={pair.id}
                  type="button"
                  className={`match-tile match-tile--sanskrit${isSelected ? ' match-tile--selected' : ''}${isMatched ? ' match-tile--matched' : ''}${isWrong ? ' match-tile--wrong' : ''}`}
                  onClick={() => handleSanskritClick(pair.sanskrit)}
                  disabled={isMatched}
                  title={isMatched ? `Matched: ${pair.english}` : `Select ${pair.sanskrit}`}
                >
                  <span className="match-tile-dev">{pair.sanskrit}</span>
                  <span className="match-tile-action">
                    {isMatched ? (
                      <span className="match-tile-check" aria-hidden="true">✓</span>
                    ) : (
                      <span className="match-tile-audio-btn" aria-hidden="true">🔊</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* English Meanings Column */}
        <div className="paragraph-match-col">
          <div className="paragraph-match-col-label">आङ्ग्लार्थः (English Meaning)</div>
          <div className="paragraph-match-card-list">
            {shuffledEnglish.map((en, idx) => {
              const matchingPair = pairs.find((p) => p.english === en);
              const isMatched = matchingPair ? matchedSanskrit.has(matchingPair.sanskrit) : false;
              const isSelected = selectedEnglish === en;
              const isWrong = wrongAttempt?.english === en;

              return (
                <button
                  key={`en-${idx}-${en}`}
                  type="button"
                  className={`match-tile match-tile--english${isSelected ? ' match-tile--selected' : ''}${isMatched ? ' match-tile--matched' : ''}${isWrong ? ' match-tile--wrong' : ''}`}
                  onClick={() => handleEnglishClick(en)}
                  disabled={isMatched}
                  title={isMatched ? 'Matched!' : `Select: ${en}`}
                >
                  <span className="match-tile-en">{en}</span>
                  {isMatched && (
                    <span className="match-tile-check" aria-hidden="true">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion & Move-On Action Banner */}
      {isCompleted && (
        <div className="paragraph-match-celebration" role="status">
          <div className="celebration-content">
            <span className="celebration-icon" aria-hidden="true">🎉</span>
            <div className="celebration-text">
              <h5 className="celebration-title">उत्तमम्! All Words Matched!</h5>
              <p className="celebration-desc">
                Great job! You have related all words in this paragraph. Ready to advance!
              </p>
            </div>
          </div>

          <div className="celebration-actions">
            <button
              type="button"
              className="celebration-reset-btn"
              onClick={handleReset}
              title="Practice matching these words again"
            >
              ↺ Practice Again
            </button>

            {!isLastSentence ? (
              <button
                type="button"
                className="celebration-next-btn"
                onClick={onNext}
                title={`Move to Paragraph ${sentenceNumber + 1}`}
              >
                <span>Move to Next Paragraph ({sentenceNumber + 1} of {totalSentences})</span>
                <span className="celebration-next-arrow">➔</span>
              </button>
            ) : onOpenQuiz ? (
              <button
                type="button"
                className="celebration-next-btn celebration-next-btn--quiz"
                onClick={onOpenQuiz}
                title="Chapter completed! Open Chapter Quiz"
              >
                <span>🏆 Lesson Complete! Take Chapter Quiz</span>
                <span className="celebration-next-arrow">➔</span>
              </button>
            ) : (
              <button
                type="button"
                className="celebration-next-btn"
                onClick={onNext}
                title="Finish lesson"
              >
                <span>Complete Lesson ➔</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ParagraphWordMatchTest;
