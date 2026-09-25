import {
  type LetterStrokeAnimation,
  interpolateStrokePoints,
} from '../data/varnamalaStrokePaths';
import type { LetterMnemonic } from '../data/varnamalaMnemonics';

export interface Point {
  x: number;
  y: number;
}

export interface UserStroke {
  points: Point[];
  color?: string;
  width?: number;
}

export interface AssessmentResult {
  score: number; // 0 to 100
  grade: 'excellent' | 'good' | 'practice' | 'incomplete';
  title: string;
  badgeEmoji: string;
  stars: number; // 1 to 5
  coveragePct: number;
  precisionPct: number;
  strokeCount: {
    userCount: number;
    expectedCount: number;
    status: 'exact' | 'close' | 'few' | 'many';
    message: string;
  };
  shirorekhaCheck?: {
    present: boolean;
    isLast: boolean;
    message: string;
  };
  feedback: string;
  calligraphyTip: string;
}

/**
 * Intelligent Sanskrit Calligraphy & Handwriting Evaluation Engine
 * Evaluates tracing against canonical Pāṇinian stroke order, spatial coverage,
 * trajectory precision, stroke count discipline, and shirorekha sequencing.
 */
export function evaluateHandwriting(
  userStrokes: UserStroke[],
  canvasWidth: number,
  canvasHeight: number,
  refAnimation: LetterStrokeAnimation,
  letterMnemonic: LetterMnemonic
): AssessmentResult {
  const userCount = userStrokes.length;
  const expectedCount = refAnimation?.strokes?.length || 3;

  // 1. Check for empty slate
  if (!userStrokes || userStrokes.length === 0) {
    return {
      score: 0,
      grade: 'incomplete',
      title: '✏️ रिक्त-फलकम् · Canvas is Empty',
      badgeEmoji: '✏️',
      stars: 0,
      coveragePct: 0,
      precisionPct: 0,
      strokeCount: {
        userCount: 0,
        expectedCount,
        status: 'few',
        message: `0 / ${expectedCount} strokes drawn`,
      },
      feedback: `Please write or trace the letter "${letterMnemonic.letter}" (${letterMnemonic.wordSan}) on the slate before checking.`,
      calligraphyTip: 'Tap "▶️ Watch How to Write" above to watch the stroke demonstration first!',
    };
  }

  // Fallback safe canvas dimensions
  const cWidth = canvasWidth > 10 ? canvasWidth : 400;
  const cHeight = canvasHeight > 10 ? canvasHeight : 400;

  // Flatten and normalize user points to 0-100 coordinate space
  const allUserPoints: Point[] = [];
  let totalUserLength = 0;

  userStrokes.forEach((stroke) => {
    if (!stroke || !Array.isArray(stroke.points)) return;
    for (let i = 0; i < stroke.points.length; i++) {
      const p = stroke.points[i];
      if (typeof p.x !== 'number' || typeof p.y !== 'number' || isNaN(p.x) || isNaN(p.y)) continue;

      const normX = (p.x / cWidth) * 100;
      const normY = (p.y / cHeight) * 100;
      allUserPoints.push({ x: normX, y: normY });

      if (i > 0) {
        const prev = stroke.points[i - 1];
        const dx = ((p.x - prev.x) / cWidth) * 100;
        const dy = ((p.y - prev.y) / cHeight) * 100;
        totalUserLength += Math.hypot(dx, dy);
      }
    }
  });

  // 2. Check for trivial dot / tiny click
  if (allUserPoints.length < 5 || totalUserLength < 14) {
    return {
      score: 15,
      grade: 'incomplete',
      title: '✏️ अपूर्णम् · Incomplete Tracing',
      badgeEmoji: '✏️',
      stars: 1,
      coveragePct: Math.round(Math.min(15, (totalUserLength / 100) * 20)),
      precisionPct: 20,
      strokeCount: {
        userCount,
        expectedCount,
        status: 'few',
        message: `${userCount} stroke drawn (Expected ${expectedCount}).`,
      },
      feedback: `You only placed a tiny mark on the canvas. Trace over the full body curves, vertical stem, and top roof bar of "${letterMnemonic.letter}".`,
      calligraphyTip: 'Hold and drag your finger or stylus along the faint grey letter guide.',
    };
  }

  // 3. Dense reference points by interpolating canonical stroke trajectories
  const allRefPoints: { x: number; y: number; strokeIndex: number }[] = [];
  const strokesList = refAnimation?.strokes || [];

  strokesList.forEach((s) => {
    if (!s.points || s.points.length === 0) return;
    const interpolated = interpolateStrokePoints(s.points, 10);
    interpolated.forEach((pt) => {
      allRefPoints.push({
        x: pt.x,
        y: pt.y,
        strokeIndex: s.strokeIndex,
      });
    });
  });

  if (allRefPoints.length === 0) {
    return {
      score: 85,
      grade: 'good',
      title: '👍 उत्तमम्! Good Effort!',
      badgeEmoji: '👍',
      stars: 4,
      coveragePct: 85,
      precisionPct: 85,
      strokeCount: { userCount, expectedCount, status: 'exact', message: 'Strokes captured.' },
      feedback: `Well drawn! You practiced ${letterMnemonic.letter}.`,
      calligraphyTip: 'Keep your strokes smooth and steady.',
    };
  }

  // 4. Measure Coverage: What fraction of canonical path was touched by user?
  // Threshold: 13.5 units in 0-100 normalized space
  const COVERAGE_RADIUS = 13.5;
  let coveredRefCount = 0;

  allRefPoints.forEach((rp) => {
    let minDist = Infinity;
    for (let i = 0; i < allUserPoints.length; i++) {
      const up = allUserPoints[i];
      const dist = Math.hypot(rp.x - up.x, rp.y - up.y);
      if (dist < minDist) {
        minDist = dist;
        if (dist <= COVERAGE_RADIUS) break;
      }
    }
    if (minDist <= COVERAGE_RADIUS) {
      coveredRefCount++;
    }
  });

  const rawCoverage = (coveredRefCount / allRefPoints.length) * 100;
  const coveragePct = Math.min(100, Math.round(rawCoverage));

  // 5. Measure Precision: How close was the user to the reference? (Penalize stray scribbles)
  let precisionSum = 0;
  allUserPoints.forEach((up) => {
    let minDist = Infinity;
    for (let i = 0; i < allRefPoints.length; i++) {
      const rp = allRefPoints[i];
      const dist = Math.hypot(up.x - rp.x, up.y - rp.y);
      if (dist < minDist) {
        minDist = dist;
        if (dist <= 6) break;
      }
    }

    if (minDist <= 10) {
      precisionSum += 1.0;
    } else if (minDist <= 24) {
      precisionSum += Math.max(0, 1.0 - (minDist - 10) / 14);
    } else {
      precisionSum += 0; // stray scribble outside target letter
    }
  });

  const rawPrecision = (precisionSum / allUserPoints.length) * 100;
  const precisionPct = Math.min(100, Math.round(rawPrecision));

  // 6. Stroke Count Analysis
  let strokeStatus: 'exact' | 'close' | 'few' | 'many' = 'close';
  let strokeCountMsg = `${userCount} / ${expectedCount} strokes`;
  let strokeScoreBonus = 85;

  if (userCount === expectedCount) {
    strokeStatus = 'exact';
    strokeCountMsg = `${userCount} / ${expectedCount} strokes (Exact stroke count!)`;
    strokeScoreBonus = 100;
  } else if (Math.abs(userCount - expectedCount) === 1) {
    strokeStatus = 'close';
    strokeCountMsg = `${userCount} / ${expectedCount} strokes (Very close to standard order)`;
    strokeScoreBonus = 92;
  } else if (userCount < expectedCount) {
    strokeStatus = 'few';
    strokeCountMsg = `${userCount} / ${expectedCount} strokes (Drawn in fewer strokes)`;
    strokeScoreBonus = 72;
  } else {
    strokeStatus = 'many';
    strokeCountMsg = `${userCount} / ${expectedCount} strokes (Fragmented strokes)`;
    strokeScoreBonus = 76;
  }

  // 7. Shirorekha (Top Roof Bar) Analysis
  const lastRefStroke = strokesList[strokesList.length - 1];
  const hasRoofBar =
    lastRefStroke &&
    (lastRefStroke.label?.toLowerCase().includes('roof') ||
      lastRefStroke.label?.includes('शिरोरेखा') ||
      (lastRefStroke.points[0]?.y <= 32 &&
        Math.abs(
          (lastRefStroke.points[lastRefStroke.points.length - 1]?.x || 0) -
            (lastRefStroke.points[0]?.x || 0)
        ) > 15));

  let shirorekhaCheck: AssessmentResult['shirorekhaCheck'] = undefined;

  if (hasRoofBar && userStrokes.length >= 2) {
    const lastUserStroke = userStrokes[userStrokes.length - 1];
    const firstUserStroke = userStrokes[0];

    const lastPts = lastUserStroke.points.map((p) => ({
      x: (p.x / cWidth) * 100,
      y: (p.y / cHeight) * 100,
    }));
    const avgY = lastPts.reduce((acc, p) => acc + p.y, 0) / (lastPts.length || 1);
    const spanX = Math.abs(lastPts[lastPts.length - 1].x - lastPts[0].x);
    const isTopHorizontal = avgY <= 38 && spanX >= 12;

    const firstPts = firstUserStroke.points.map((p) => ({
      x: (p.x / cWidth) * 100,
      y: (p.y / cHeight) * 100,
    }));
    const firstAvgY = firstPts.reduce((acc, p) => acc + p.y, 0) / (firstPts.length || 1);
    const firstSpanX = Math.abs(firstPts[firstPts.length - 1].x - firstPts[0].x);
    const isFirstTopHorizontal = firstAvgY <= 38 && firstSpanX >= 12;

    if (isTopHorizontal) {
      shirorekhaCheck = {
        present: true,
        isLast: true,
        message: '👑 Pāṇinian Rule followed: शिरोरेखा (top roof bar) was drawn last!',
      };
    } else if (isFirstTopHorizontal) {
      shirorekhaCheck = {
        present: true,
        isLast: false,
        message: 'Order note: You drew the top bar first. In Sanskrit calligraphy, the roof bar is always drawn last!',
      };
    } else {
      shirorekhaCheck = {
        present: false,
        isLast: false,
        message: 'Calligraphy note: Top horizontal roof bar (शिरोरेखा) seems incomplete or missing.',
      };
    }
  }

  // 8. Calculate Weighted Composite Score
  // Coverage: 50%, Precision: 35%, Stroke Discipline: 15%
  let finalScore = Math.round(
    coveragePct * 0.5 + precisionPct * 0.35 + strokeScoreBonus * 0.15
  );

  // Bonus for correct shirorekha sequence
  if (shirorekhaCheck?.isLast) {
    finalScore = Math.min(100, finalScore + 3);
  }

  finalScore = Math.max(10, Math.min(100, finalScore));

  // 9. Letter-Specific Feedback & Tips
  let letterTip = 'Use the 3-line ruling grid (top bar, midline, baseline) as your guide for height and proportions.';
  const char = letterMnemonic.letter;

  if (char === 'अ' || char === 'आ') {
    letterTip = 'Ensure the middle horizontal connector connects cleanly to the vertical standing stem.';
  } else if (char === 'इ' || char === 'ई') {
    letterTip = 'Keep the top C-curve and bottom reverse curve aligned vertically before curling the bottom tail.';
  } else if (char === 'उ' || char === 'ऊ') {
    letterTip = 'Situate the upper curve right at the dashed midline, and extend the lower curve down to the baseline.';
  } else if (char === 'ऋ') {
    letterTip = 'Form the left diagonal branch rays first, then the right vertical stem and loop.';
  } else if (char === 'ए' || char === 'ऐ') {
    letterTip = 'Draw the left standing hook first, then the right diagonal leg, and finally the top roof bar.';
  } else if (char === 'क') {
    letterTip = 'Draw the central vertical stem, the closed left loop, and the open drooping right loop.';
  } else if (char === 'ख') {
    letterTip = 'Connect the initial curved hook smoothly to the bottom loop, then join with the standing stem.';
  } else if (char === 'ग') {
    letterTip = 'The left curved loop is shorter and terminates higher than the full-length right vertical stem.';
  } else if (char === 'घ') {
    letterTip = 'Double curves on the left must rest snugly above the baseline before touching the vertical stem.';
  } else if (char === 'च') {
    letterTip = 'Start with the horizontal dash, curve down to the baseline, and ascend to meet the vertical stem.';
  } else if (char === 'ज') {
    letterTip = 'Draw the vertical stem, the horizontal mid-bar, and then the deep rounded bottom scoop.';
  } else if (char === 'ट' || char === 'ठ' || char === 'ड' || char === 'ढ') {
    letterTip = 'Drop a very short vertical neck from the roof bar before developing the main round curve.';
  } else if (char === 'ण') {
    letterTip = 'The left U-cup loop must hang suspended above the baseline, accompanied by the right vertical stem.';
  } else if (char === 'त') {
    letterTip = 'Draw the vertical stem first, then hook the left downward curving arm cleanly.';
  } else if (char === 'प') {
    letterTip = 'Create a rounded right-angle cup from the top bar before connecting to the vertical stem.';
  } else if (char === 'म' || char === 'भ') {
    letterTip = 'Keep the bottom-left corner loop compact and connect straight horizontally to the standing stem.';
  } else if (char === 'र') {
    letterTip = 'Smoothly transition from the upper rounded curve into the sweeping diagonal tail.';
  } else if (char === 'श') {
    letterTip = 'Form the upper ornamental loop first, extend the left leg, then place the right vertical stem.';
  }

  // 10. Grade Categorization
  let grade: AssessmentResult['grade'] = 'good';
  let title = '👍 उत्तमम्! Great Job!';
  let badgeEmoji = '👍';
  let stars = 4;
  let feedback = '';

  if (finalScore >= 88 && coveragePct >= 80) {
    grade = 'excellent';
    title = '✨ अति-उत्तमम्! Outstanding Calligraphy!';
    badgeEmoji = '🏆';
    stars = 5;
    feedback = `Flawless execution! You wrote "${letterMnemonic.letter}" (${letterMnemonic.wordSan} ${letterMnemonic.emoji}) with exceptional stroke balance, alignment, and symmetry.`;
  } else if (finalScore >= 72 && coveragePct >= 65) {
    grade = 'good';
    title = '👍 उत्तमम्! Very Good Work!';
    badgeEmoji = '⭐';
    stars = 4;
    feedback = `Good hand control! You captured the main contours and proportions of "${letterMnemonic.letter}" (${letterMnemonic.wordSan}) nicely.`;
  } else if (finalScore >= 48 && coveragePct >= 38) {
    grade = 'practice';
    title = '🌱 प्रयतस्व! Good Effort — Keep Practicing';
    badgeEmoji = '✍️';
    stars = 3;
    feedback = `You have the general layout of "${letterMnemonic.letter}", but some strokes either drifted outside the lines or were left incomplete.`;
  } else {
    grade = 'incomplete';
    title = '✏️ पुनः कुरु · Keep Tracing';
    badgeEmoji = '🔄';
    stars = coveragePct >= 25 ? 2 : 1;
    feedback =
      coveragePct < 40
        ? `Incomplete letter. Significant portions of "${letterMnemonic.letter}" were left untraced.`
        : `Your strokes wandered far from the guide letter. Slow down and trace directly over the faint template.`;
  }

  return {
    score: finalScore,
    grade,
    title,
    badgeEmoji,
    stars,
    coveragePct,
    precisionPct,
    strokeCount: {
      userCount,
      expectedCount,
      status: strokeStatus,
      message: strokeCountMsg,
    },
    shirorekhaCheck,
    feedback,
    calligraphyTip: letterTip,
  };
}
