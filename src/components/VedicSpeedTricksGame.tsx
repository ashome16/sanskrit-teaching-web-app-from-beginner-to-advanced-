import React, { useState, useEffect, useRef, useCallback } from 'react';
import { soundEffects } from '../utils/soundEffects';
import '../styles/vedic-speed-tricks-game.css';

export type GameMode = 'blitz' | 'practice' | 'detective' | 'zen';

export type VedicTrickCategory =
  | 'all'
  | 'ekadhikena-sq'
  | 'ekadhikena-ten'
  | 'nikhilam-mul'
  | 'nikhilam-sub'
  | 'ekanyunena'
  | 'yavadunam'
  | 'urdhva'
  | 'beejank';

export interface VedicQuestion {
  id: string;
  category: VedicTrickCategory;
  sutraSa: string;
  sutraEn: string;
  sutraMeaning: string;
  prompt: string;
  promptSub: string;
  correctAnswer: number | string;
  options: (number | string)[];
  step1: { label: string; math: string; note: string };
  step2: { label: string; math: string; note: string };
  finalFormula: string;
  // For detective mode (True/False)
  isDetective?: boolean;
  isCorrectEquation?: boolean;
  equationString?: string;
  beejankLeft?: number;
  beejankRight?: number;
}

export interface VedicSpeedTricksGameProps {
  initialTrick?: VedicTrickCategory;
  onOpenSolver?: (solverKey: string) => void;
  onGoHome?: () => void;
}

const TRICK_METADATA: Record<VedicTrickCategory, { nameEn: string; nameSa: string; icon: string }> = {
  all: { nameEn: 'All Tricks Mixed', nameSa: 'सर्व-युक्तयः', icon: '⚡' },
  'ekadhikena-sq': { nameEn: '5-Ending Squares', nameSa: 'एकाधिकेन पूर्वेण', icon: '✨' },
  'ekadhikena-ten': { nameEn: 'Complementary Tens', nameSa: 'अन्त्ययोर्दशकेऽपि', icon: '🎯' },
  'nikhilam-mul': { nameEn: 'Base 100 Multiplier', nameSa: 'निखिलं (गुणनम्)', icon: '🏹' },
  'nikhilam-sub': { nameEn: 'Powers of 10 Subtraction', nameSa: 'निखिलं (घटनम्)', icon: '⚡' },
  ekanyunena: { nameEn: 'The 99/999 Multiplier', nameSa: 'एकन्यूनेन पूर्वेण', icon: '🚀' },
  yavadunam: { nameEn: 'Near-Base Squaring', nameSa: 'यावदूनम्', icon: '🔮' },
  urdhva: { nameEn: 'Vertical & Crosswise', nameSa: 'ऊर्ध्वतिर्यग्भ्याम्', icon: '⚔️' },
  beejank: { nameEn: 'Digital Root Detective', nameSa: 'बीजाङ्क-परीक्षणम्', icon: '🕵️' },
};

export const VedicSpeedTricksGame: React.FC<VedicSpeedTricksGameProps> = ({
  initialTrick = 'all',
  onOpenSolver,
}) => {
  const [mode, setMode] = useState<GameMode>('blitz');
  const [selectedTrick, setSelectedTrick] = useState<VedicTrickCategory>(initialTrick);
  const [currentQ, setCurrentQ] = useState<VedicQuestion | null>(null);
  const [selectedAns, setSelectedAns] = useState<string | number | null>(null);
  const [isAnsCorrect, setIsAnsCorrect] = useState<boolean | null>(null);
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // Score & Gameplay States
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sound helper
  const playSnd = useCallback((type: 'click' | 'correct' | 'wrong' | 'celebrate') => {
    if (isSoundMuted) return;
    if (type === 'click') soundEffects.playStrokeChime();
    if (type === 'correct') soundEffects.playSuccessDing();
    if (type === 'wrong') soundEffects.playErrorBuzzer();
    if (type === 'celebrate') soundEffects.playCelebrationChime();
  }, [isSoundMuted]);

  // Speech Helper
  const speakSutra = (sutraSa: string, sutraEn: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${sutraSa}. ${sutraEn}`);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Digital Root (Beejank)
  const getBeejank = (n: number): number => {
    let sum = Math.abs(n);
    while (sum >= 10) {
      sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d, 10), 0);
    }
    return sum;
  };

  // Generate a problem dynamically
  const generateQuestion = useCallback((): VedicQuestion => {
    let chosenCat = selectedTrick;
    if (chosenCat === 'all') {
      const cats: VedicTrickCategory[] = [
        'ekadhikena-sq',
        'ekadhikena-ten',
        'nikhilam-mul',
        'nikhilam-sub',
        'ekanyunena',
        'yavadunam',
        'urdhva',
        'beejank',
      ];
      chosenCat = cats[Math.floor(Math.random() * cats.length)];
    }

    if (mode === 'detective') {
      chosenCat = 'beejank';
    }

    // 1. Ekadhikena Squaring Ending in 5
    if (chosenCat === 'ekadhikena-sq') {
      const presets = [15, 25, 35, 45, 65, 75, 85, 95, 105, 115];
      const n = presets[Math.floor(Math.random() * presets.length)];
      const prev = Math.floor(n / 10);
      const left = prev * (prev + 1);
      const right = 25;
      const ans = left * 100 + right;

      const opts = Array.from(new Set([
        ans,
        (prev * prev) * 100 + 25,
        (prev * (prev + 2)) * 100 + 25,
        ans - 100,
        ans + 100,
      ])).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id: `eka-sq-${Date.now()}`,
        category: 'ekadhikena-sq',
        sutraSa: 'एकाधिकेन पूर्वेण',
        sutraEn: 'Ekādhikena Pūrveṇa',
        sutraMeaning: 'By One More Than the Previous One',
        prompt: `${n}² = ?`,
        promptSub: `Squaring ${n}: Multiply previous digit (${prev}) by (${prev + 1}), then place 25 on the right!`,
        correctAnswer: ans,
        options: opts,
        step1: { label: 'Left Part', math: `${prev} × (${prev} + 1) = ${left}`, note: 'Multiply tens digit by one more' },
        step2: { label: 'Right Part', math: '5² = 25', note: 'Always 25 at the end' },
        finalFormula: `${left} | 25 ➔ ${ans}`,
      };
    }

    // 2. Ekadhikena Complementary Tens
    if (chosenCat === 'ekadhikena-ten') {
      const tens = [2, 3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 7)];
      const u1 = [1, 2, 3, 4, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
      const u2 = 10 - u1;
      const a = tens * 10 + u1;
      const b = tens * 10 + u2;
      const left = tens * (tens + 1);
      const right = u1 * u2;
      const ans = left * 100 + right;

      const rightStr = right < 10 ? `0${right}` : `${right}`;
      const opts = Array.from(new Set([
        ans,
        (tens * tens) * 100 + right,
        ans + 10,
        ans - 10,
        (left + 1) * 100 + right,
      ])).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id: `eka-ten-${Date.now()}`,
        category: 'ekadhikena-ten',
        sutraSa: 'अन्त्ययोर्दशकेऽपि',
        sutraEn: "Antyayordaśake'pi",
        sutraMeaning: 'Sum of the Last Digits is 10 & Tens Equal',
        prompt: `${a} × ${b} = ?`,
        promptSub: `Notice tens are equal (${tens}) and units sum to 10 (${u1} + ${u2} = 10).`,
        correctAnswer: ans,
        options: opts,
        step1: { label: 'Left Part', math: `${tens} × (${tens} + 1) = ${left}`, note: 'Common tens multiplied by (ten + 1)' },
        step2: { label: 'Right Part', math: `${u1} × ${u2} = ${rightStr}`, note: 'Product of the two unit digits' },
        finalFormula: `${left} | ${rightStr} ➔ ${ans}`,
      };
    }

    // 3. Nikhilam Base 100 Multiplication
    if (chosenCat === 'nikhilam-mul') {
      const isBelow = Math.random() > 0.4;
      if (isBelow) {
        const a = Math.floor(Math.random() * 9) + 91; // 91..99
        const b = Math.floor(Math.random() * 9) + 91;
        const da = 100 - a;
        const db = 100 - b;
        const left = a - db;
        const right = da * db;
        const rightStr = right < 10 ? `0${right}` : `${right}`;
        const ans = a * b;

        const opts = Array.from(new Set([
          ans,
          ans - 10,
          ans + 10,
          (left + 1) * 100 + right,
          (a * b) + 100,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `nikh-mul-${Date.now()}`,
          category: 'nikhilam-mul',
          sutraSa: 'निखिलं नवतश्चरमं दशतः',
          sutraEn: 'Nikhilam Navataścaramaṁ Daśataḥ',
          sutraMeaning: 'All from 9 and Last from 10 (Base 100 Multiplication)',
          prompt: `${a} × ${b} = ?`,
          promptSub: `Both near base 100! Deficits: -${da} and -${db}.`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part (Cross)', math: `${a} - ${db} = ${left}`, note: 'Subtract other number deficit from either' },
          step2: { label: 'Right Part (Product)', math: `(-${da}) × (-${db}) = ${rightStr}`, note: 'Multiply the deficits' },
          finalFormula: `${left} | ${rightStr} ➔ ${ans}`,
        };
      } else {
        const a = Math.floor(Math.random() * 8) + 102; // 102..109
        const b = Math.floor(Math.random() * 8) + 102;
        const sa = a - 100;
        const sb = b - 100;
        const left = a + sb;
        const right = sa * sb;
        const rightStr = right < 10 ? `0${right}` : `${right}`;
        const ans = a * b;

        const opts = Array.from(new Set([
          ans,
          ans - 100,
          ans + 100,
          (left - 1) * 100 + right,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `nikh-mul-above-${Date.now()}`,
          category: 'nikhilam-mul',
          sutraSa: 'निखिलं नवतश्चरमं दशतः',
          sutraEn: 'Nikhilam Navataścaramaṁ Daśataḥ',
          sutraMeaning: 'Surplus Base Multiplication (Above 100)',
          prompt: `${a} × ${b} = ?`,
          promptSub: `Both above base 100! Surpluses: +${sa} and +${sb}.`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part (Cross Add)', math: `${a} + ${sb} = ${left}`, note: 'Cross-add surplus to number' },
          step2: { label: 'Right Part (Product)', math: `${sa} × ${sb} = ${rightStr}`, note: 'Multiply the surpluses' },
          finalFormula: `${left} | ${rightStr} ➔ ${ans}`,
        };
      }
    }

    // 4. Nikhilam Subtraction from Power of 10
    if (chosenCat === 'nikhilam-sub') {
      const is1000 = Math.random() > 0.5;
      const base = is1000 ? 1000 : 10000;
      const sub = is1000
        ? Math.floor(Math.random() * 800) + 120
        : Math.floor(Math.random() * 8000) + 1200;
      const ans = base - sub;

      const opts = Array.from(new Set([
        ans,
        ans - 10,
        ans + 10,
        ans - 100,
        ans + 100,
      ])).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id: `nikh-sub-${Date.now()}`,
        category: 'nikhilam-sub',
        sutraSa: 'निखिलं नवतश्चरमं दशतः',
        sutraEn: 'Nikhilam Navataścaramaṁ Daśataḥ',
        sutraMeaning: 'All from 9 and Last from 10 (Instant Subtraction)',
        prompt: `${base.toLocaleString()} - ${sub.toLocaleString()} = ?`,
        promptSub: 'Subtract all leading digits from 9, and the very last digit from 10!',
        correctAnswer: ans,
        options: opts,
        step1: { label: 'Leading Digits', math: 'Subtract each from 9', note: 'No carrying needed from left to right!' },
        step2: { label: 'Final Digit', math: 'Subtract last digit from 10', note: 'Last non-zero digit from 10' },
        finalFormula: `Base ${base.toLocaleString()} - ${sub.toLocaleString()} = ${ans.toLocaleString()}`,
      };
    }

    // 5. Ekanyunena Purvena (Multiplication by 99 or 999)
    if (chosenCat === 'ekanyunena') {
      const is99 = Math.random() > 0.35;
      if (is99) {
        const n = Math.floor(Math.random() * 75) + 14; // 14..88
        const left = n - 1;
        const right = 99 - left;
        const ans = n * 99;

        const opts = Array.from(new Set([
          ans,
          ans - 10,
          ans + 10,
          (n * 100) - n - 9,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `ekan-99-${Date.now()}`,
          category: 'ekanyunena',
          sutraSa: 'एकन्यूनेन पूर्वेण',
          sutraEn: 'Ekanyūnena Pūrveṇa',
          sutraMeaning: 'By One Less Than the Previous (Instant 99 Multiplier)',
          prompt: `${n} × 99 = ?`,
          promptSub: `Reduce ${n} by 1 for Left part (${n - 1}), then complement from 99!`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part', math: `${n} - 1 = ${left}`, note: 'Deduct 1 from the multiplicand' },
          step2: { label: 'Right Part', math: `99 - ${left} = ${right}`, note: 'Subtract left part from 99' },
          finalFormula: `${left} | ${right} ➔ ${ans}`,
        };
      } else {
        const n = Math.floor(Math.random() * 600) + 150; // 150..750
        const left = n - 1;
        const right = 999 - left;
        const ans = n * 999;

        const opts = Array.from(new Set([
          ans,
          ans - 100,
          ans + 100,
          ans - 10,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `ekan-999-${Date.now()}`,
          category: 'ekanyunena',
          sutraSa: 'एकन्यूनेन पूर्वेण',
          sutraEn: 'Ekanyūnena Pūrveṇa',
          sutraMeaning: 'By One Less Than the Previous (Instant 999 Multiplier)',
          prompt: `${n} × 999 = ?`,
          promptSub: `Deduct 1 from ${n} for Left part (${n - 1}), then complement each from 9!`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part', math: `${n} - 1 = ${left}`, note: 'By one less than previous' },
          step2: { label: 'Right Part', math: `999 - ${left} = ${right}`, note: 'Complement against 999' },
          finalFormula: `${left} | ${right} ➔ ${ans}`,
        };
      }
    }

    // 6. Yavadunam Near-Base Squaring
    if (chosenCat === 'yavadunam') {
      const isBelow = Math.random() > 0.5;
      if (isBelow) {
        const deficits = [1, 2, 3, 4, 6, 7, 8];
        const d = deficits[Math.floor(Math.random() * deficits.length)];
        const n = 100 - d;
        const left = n - d;
        const right = d * d;
        const rightStr = right < 10 ? `0${right}` : `${right}`;
        const ans = n * n;

        const opts = Array.from(new Set([
          ans,
          ans - 10,
          ans + 10,
          (left + 1) * 100 + right,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `yav-sq-${Date.now()}`,
          category: 'yavadunam',
          sutraSa: 'यावदूनम्',
          sutraEn: 'Yāvadūnam',
          sutraMeaning: 'Whatever the Deficiency, Lessen by That & Add Square',
          prompt: `${n}² = ?`,
          promptSub: `${n} is deficient by ${d} from 100. Lessen it by ${d} and append ${d}²!`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part (Lessen)', math: `${n} - ${d} = ${left}`, note: 'Deduct the deficiency from number' },
          step2: { label: 'Right Part (Square)', math: `${d}² = ${rightStr}`, note: 'Square of the deficiency' },
          finalFormula: `${left} | ${rightStr} ➔ ${ans}`,
        };
      } else {
        const surplus = [2, 3, 4, 5, 6, 7, 8, 9];
        const s = surplus[Math.floor(Math.random() * surplus.length)];
        const n = 100 + s;
        const left = n + s;
        const right = s * s;
        const rightStr = right < 10 ? `0${right}` : `${right}`;
        const ans = n * n;

        const opts = Array.from(new Set([
          ans,
          ans - 100,
          ans + 100,
          (left - 1) * 100 + right,
        ])).slice(0, 4).sort(() => Math.random() - 0.5);

        return {
          id: `yav-sq-above-${Date.now()}`,
          category: 'yavadunam',
          sutraSa: 'यावदूनम्',
          sutraEn: 'Yāvadūnam',
          sutraMeaning: 'Whatever the Surplus, Increase by That & Add Square',
          prompt: `${n}² = ?`,
          promptSub: `${n} has surplus of +${s} over 100. Add ${s} and append ${s}²!`,
          correctAnswer: ans,
          options: opts,
          step1: { label: 'Left Part (Increase)', math: `${n} + ${s} = ${left}`, note: 'Add surplus to number' },
          step2: { label: 'Right Part (Square)', math: `${s}² = ${rightStr}`, note: 'Square of the surplus' },
          finalFormula: `${left} | ${rightStr} ➔ ${ans}`,
        };
      }
    }

    // 7. Urdhva-Tiryagbhyam 2-digit Multiplication
    if (chosenCat === 'urdhva') {
      const a = Math.floor(Math.random() * 30) + 12; // 12..42
      const b = Math.floor(Math.random() * 30) + 12;
      const ans = a * b;

      const aTens = Math.floor(a / 10);
      const aUnits = a % 10;
      const bTens = Math.floor(b / 10);
      const bUnits = b % 10;

      const step1Val = aUnits * bUnits;
      const step2Val = aTens * bUnits + aUnits * bTens;
      const step3Val = aTens * bTens;

      const opts = Array.from(new Set([
        ans,
        ans - 10,
        ans + 10,
        ans + 100,
        ans - 100,
      ])).slice(0, 4).sort(() => Math.random() - 0.5);

      return {
        id: `urdhva-${Date.now()}`,
        category: 'urdhva',
        sutraSa: 'ऊर्ध्वतिर्यग्भ्याम्',
        sutraEn: 'Ūrdhva-Tiryagbhyām',
        sutraMeaning: 'Vertically and Crosswise (Universal 2-Digit Lightning)',
        prompt: `${a} × ${b} = ?`,
        promptSub: 'Multiply units vertically ➔ Crosswise multiply and add ➔ Multiply tens vertically!',
        correctAnswer: ans,
        options: opts,
        step1: { label: 'Step 1: Units Vertical', math: `${aUnits} × ${bUnits} = ${step1Val}`, note: 'Vertical product of rightmost digits' },
        step2: { label: 'Step 2: Crosswise Sum', math: `(${aTens}×${bUnits}) + (${aUnits}×${bTens}) = ${step2Val}`, note: 'Sum of cross products' },
        finalFormula: `Tens: ${step3Val} | Cross: ${step2Val} | Units: ${step1Val} ➔ ${ans}`,
      };
    }

    // 8. Beejank Detective (True / False)
    const a = Math.floor(Math.random() * 70) + 18;
    const b = Math.floor(Math.random() * 70) + 18;
    const realProd = a * b;
    const isActuallyCorrect = Math.random() > 0.5;
    const errorDelta = (Math.floor(Math.random() * 5) + 1) * 10 + (Math.floor(Math.random() * 7) + 1);
    const displayedAnswer = isActuallyCorrect ? realProd : (Math.random() > 0.5 ? realProd + errorDelta : realProd - errorDelta);

    const bA = getBeejank(a);
    const bB = getBeejank(b);
    const bProdExpected = getBeejank(bA * bB);
    const bDisp = getBeejank(displayedAnswer);

    return {
      id: `beejank-${Date.now()}`,
      category: 'beejank',
      sutraSa: 'बीजाङ्क-परीक्षणम्',
      sutraEn: 'Bījāṅka Digital Root Detective',
      sutraMeaning: 'Guṇitasamuccayaḥ Digit-Sum Verification Check',
      prompt: `${a} × ${b} = ${displayedAnswer}`,
      promptSub: 'Use the Digital Root shortcut to spot if this equation is Correct or Bogus in 3 seconds!',
      correctAnswer: isActuallyCorrect ? 'CORRECT' : 'BOGUS',
      options: ['CORRECT', 'BOGUS'],
      isDetective: true,
      isCorrectEquation: isActuallyCorrect,
      equationString: `${a} × ${b} = ${displayedAnswer}`,
      beejankLeft: bProdExpected,
      beejankRight: bDisp,
      step1: {
        label: 'Digital Root of Factors',
        math: `B(${a})=${bA}, B(${b})=${bB} ➔ ${bA} × ${bB} = ${bA * bB} ➔ B = ${bProdExpected}`,
        note: 'Sum of digits of both factors cast out 9s',
      },
      step2: {
        label: 'Digital Root of Claimed Answer',
        math: `B(${displayedAnswer}) = ${bDisp}`,
        note: isActuallyCorrect ? `Matches! (${bProdExpected} == ${bDisp})` : `Mismatch! (${bProdExpected} ≠ ${bDisp})`,
      },
      finalFormula: isActuallyCorrect
        ? `✅ VERIFIED: Digital root ${bProdExpected} matches ${bDisp}.`
        : `❌ BUSTED: Expected digital root ${bProdExpected}, but claimed answer has ${bDisp}!`,
    };
  }, [selectedTrick, mode]);

  // Load next question
  const loadNextQuestion = useCallback(() => {
    setSelectedAns(null);
    setIsAnsCorrect(null);
    setShowVisualizer(mode === 'zen');
    const q = generateQuestion();
    setCurrentQ(q);
  }, [generateQuestion, mode]);

  // Timer loop for 60s Blitz mode
  useEffect(() => {
    if (mode !== 'blitz' || isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGameOver(true);
          playSnd('celebrate');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, isGameOver, playSnd]);

  // Restart / Initial Question Load
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNextQuestion();
  }, [loadNextQuestion]);

  // Handle player selecting an answer
  const handleSelectOption = (opt: string | number) => {
    if (selectedAns !== null || !currentQ || isGameOver) return;
    setSelectedAns(opt);
    setTotalAnswered((prev) => prev + 1);

    const isMatch = String(opt).trim() === String(currentQ.correctAnswer).trim();
    setIsAnsCorrect(isMatch);

    if (isMatch) {
      playSnd('correct');
      setTotalCorrect((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      const multiplier = Math.min(5, Math.floor(newStreak / 2) + 1);
      setScore((prev) => prev + 100 * multiplier);

      // Blitz bonus time
      if (mode === 'blitz') {
        setTimeLeft((prev) => Math.min(90, prev + 2));
      }

      // Auto advance in blitz after short delay
      if (mode === 'blitz') {
        setTimeout(() => {
          loadNextQuestion();
        }, 650);
      }
    } else {
      playSnd('wrong');
      setStreak(0);
      setShowVisualizer(true);
    }
  };

  // Restart Game
  const handleRestart = () => {
    setScore(0);
    setStreak(0);
    setTotalAnswered(0);
    setTotalCorrect(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setSelectedAns(null);
    setIsAnsCorrect(null);
    loadNextQuestion();
  };

  // Keyboard navigation (1, 2, 3, 4 for options, Space for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCheatSheetOpen || isGameOver || !currentQ) return;
      if (e.key === ' ' && selectedAns !== null && mode !== 'blitz') {
        e.preventDefault();
        loadNextQuestion();
        return;
      }
      if (['1', '2', '3', '4'].includes(e.key) && selectedAns === null) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQ.options[idx] !== undefined) {
          handleSelectOption(currentQ.options[idx]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCheatSheetOpen, isGameOver, currentQ, selectedAns, mode, loadNextQuestion]);

  if (!currentQ) return null;

  return (
    <div className="vst-game-root" id="vedic-speed-tricks-arcade">
      {/* Header */}
      <header className="vst-header">
        <div className="vst-title-col">
          <div className="vst-kicker">
            <span className="vst-kicker-badge">⚡ Interactive Vedic Maths Tricks Game</span>
            <span>· 60s Blitz &amp; Sutra Mastery</span>
          </div>
          <h2 className="vst-main-title">
            <span>Vedic Speed Tricks Arcade</span>
            <span className="vst-title-sa sanskrit-safe-text" lang="sa">· वैदिक-गणित-गति-स्पर्धा</span>
          </h2>
        </div>

        <div className="vst-header-actions">
          <button
            type="button"
            className="vst-action-btn"
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            title={isSoundMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            <span>{isSoundMuted ? '🔇 Muted' : '🔊 Sound ON'}</span>
          </button>
          <button
            type="button"
            className="vst-action-btn vst-action-btn--gold"
            onClick={() => setIsCheatSheetOpen(true)}
            title="Open Vedic Speed Tricks Pocket Cheat Sheet"
          >
            <span>📜 Pocket Cheat Sheet</span>
          </button>
          {onOpenSolver && (
            <button
              type="button"
              className="vst-action-btn"
              onClick={() => onOpenSolver('ekadhikena')}
              title="Open full step-by-step mathematical solver studio"
            >
              <span>🧮 Solvers Studio</span>
            </button>
          )}
        </div>
      </header>

      {/* Mode Switcher Tabs */}
      <div className="vst-modes-bar" role="tablist" aria-label="Game Modes">
        <button
          type="button"
          className={`vst-mode-btn${mode === 'blitz' ? ' is-active' : ''}`}
          onClick={() => {
            setMode('blitz');
            handleRestart();
          }}
          title="60-Second Speed Run: Score combos before time runs out!"
        >
          <span>⚡ 60s Speed Blitz</span>
        </button>
        <button
          type="button"
          className={`vst-mode-btn${mode === 'practice' ? ' is-active' : ''}`}
          onClick={() => {
            setMode('practice');
            handleRestart();
          }}
          title="Targeted Practice: Train on specific tricks with visual hints"
        >
          <span>🎯 Trick Practice</span>
        </button>
        <button
          type="button"
          className={`vst-mode-btn${mode === 'detective' ? ' is-active' : ''}`}
          onClick={() => {
            setMode('detective');
            setSelectedTrick('beejank');
            handleRestart();
          }}
          title="Digital Root Detective: Spot math illusions in 3 seconds!"
        >
          <span>🕵️ Bījāṅka Detective</span>
        </button>
        <button
          type="button"
          className={`vst-mode-btn${mode === 'zen' ? ' is-active' : ''}`}
          onClick={() => {
            setMode('zen');
            setShowVisualizer(true);
            handleRestart();
          }}
          title="Zen Mode: Untimed, relaxed mental calculation"
        >
          <span>🧘 Zen Flow</span>
        </button>
      </div>

      {/* Trick Selection Filter Strip */}
      {mode !== 'detective' && (
        <div className="vst-tricks-strip" role="toolbar" aria-label="Filter by Vedic Trick">
          {(Object.keys(TRICK_METADATA) as VedicTrickCategory[]).map((cat) => {
            const meta = TRICK_METADATA[cat];
            const isActive = selectedTrick === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`vst-trick-pill${isActive ? ' is-active' : ''}`}
                onClick={() => {
                  setSelectedTrick(cat);
                  setSelectedAns(null);
                  setIsAnsCorrect(null);
                }}
              >
                <span>{meta.icon} {meta.nameEn} <span className="sanskrit-safe-text" lang="sa">({meta.nameSa})</span></span>
              </button>
            );
          })}
        </div>
      )}

      {/* HUD Telemetry Bar */}
      <div className="vst-hud-bar">
        {mode === 'blitz' && (
          <div className="vst-hud-item">
            <span className="vst-hud-label">Time Remaining</span>
            <span className={`vst-hud-val is-timer${timeLeft <= 10 ? ' is-urgent' : ''}`}>
              ⏳ {timeLeft}s
            </span>
          </div>
        )}
        <div className="vst-hud-item">
          <span className="vst-hud-label">Streak Combo</span>
          <span className="vst-hud-val is-streak">
            {streak > 0 ? `🔥 ${streak}x` : '0x'}
          </span>
        </div>
        <div className="vst-hud-item">
          <span className="vst-hud-label">Vedic Score</span>
          <span className="vst-hud-val is-score">
            🏆 {score.toLocaleString()}
          </span>
        </div>
        <div className="vst-hud-item">
          <span className="vst-hud-label">Accuracy</span>
          <span className="vst-hud-val">
            {totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '100%'}
          </span>
        </div>
      </div>

      {/* Game Over Summary Screen */}
      {isGameOver ? (
        <div className="vst-summary-card">
          <span className="vst-summary-crown" aria-hidden="true">👑</span>
          <h3 className="vst-summary-title">Blitz Complete!</h3>
          <p className="vst-summary-rank">
            {score >= 2000
              ? '🌟 वैदिक-सम्राट् · Grand Vedic Math Prodigy!'
              : score >= 1000
              ? '⚡ गति-विशारदः · Lightning Calculation Master!'
              : '🌱 सूत्र-साधकः · Vedic Calculation Practitioner!'}
          </p>

          <div className="vst-summary-stats-grid">
            <div className="vst-stat-box">
              <div className="vst-stat-box-val">{score.toLocaleString()}</div>
              <div className="vst-stat-box-lbl">Final Score</div>
            </div>
            <div className="vst-stat-box">
              <div className="vst-stat-box-val">{bestStreak}x</div>
              <div className="vst-stat-box-lbl">Best Streak</div>
            </div>
            <div className="vst-stat-box">
              <div className="vst-stat-box-val">{totalAnswered > 0 ? `${Math.round((totalCorrect / totalAnswered) * 100)}%` : '0%'}</div>
              <div className="vst-stat-box-lbl">Accuracy</div>
            </div>
          </div>

          <div className="vst-summary-btns">
            <button type="button" className="vst-action-btn vst-action-btn--gold" onClick={handleRestart}>
              <span>🔄 Play Again (60s Blitz)</span>
            </button>
            <button
              type="button"
              className="vst-action-btn"
              onClick={() => {
                setMode('practice');
                handleRestart();
              }}
            >
              <span>🎯 Practice Untimed</span>
            </button>
            <button type="button" className="vst-action-btn" onClick={() => setIsCheatSheetOpen(true)}>
              <span>📜 Study Cheat Sheet</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Question Stage Card */
        <div className="vst-stage-card">
          <div className="vst-stage-badge-row">
            <span className="vst-sutra-chip">
              <span className="sanskrit-safe-text" lang="sa">{currentQ.sutraSa}</span>
              <span>· {currentQ.sutraEn}</span>
              <button
                type="button"
                className="vst-sutra-audio-btn"
                onClick={() => speakSutra(currentQ.sutraSa, currentQ.sutraEn)}
                title="Listen to Sanskrit pronunciation"
                aria-label={`Pronounce ${currentQ.sutraSa}`}
              >
                🔊
              </button>
            </span>
            <span className="vst-trick-chip">{currentQ.sutraMeaning}</span>
          </div>

          <h3 className="vst-prompt-text">{currentQ.prompt}</h3>
          <p className="vst-prompt-sub">{currentQ.promptSub}</p>

          {/* Options: Multiple Choice vs Detective True/False */}
          {currentQ.isDetective ? (
            <div className="vst-detective-row">
              <button
                type="button"
                className={`vst-detective-btn vst-detective-btn--correct${
                  selectedAns === 'CORRECT' ? (isAnsCorrect ? ' is-correct' : ' is-wrong') : ''
                }`}
                onClick={() => handleSelectOption('CORRECT')}
                disabled={selectedAns !== null}
              >
                <span>✅ TRUE / CORRECT</span>
                <span className="vst-detective-sub">Digital roots match!</span>
              </button>
              <button
                type="button"
                className={`vst-detective-btn vst-detective-btn--wrong${
                  selectedAns === 'BOGUS' ? (isAnsCorrect ? ' is-correct' : ' is-wrong') : ''
                }`}
                onClick={() => handleSelectOption('BOGUS')}
                disabled={selectedAns !== null}
              >
                <span>❌ FALSE / BOGUS</span>
                <span className="vst-detective-sub">Digital root mismatch!</span>
              </button>
            </div>
          ) : (
            <div className="vst-options-grid">
              {currentQ.options.map((opt, idx) => {
                const isThisSelected = selectedAns === opt;
                const isThisTarget = currentQ.correctAnswer === opt;
                let btnCls = 'vst-option-btn';
                if (selectedAns !== null) {
                  if (isThisTarget) btnCls += ' is-correct';
                  else if (isThisSelected) btnCls += ' is-wrong';
                }
                return (
                  <button
                    key={`${opt}-${idx}`}
                    type="button"
                    className={btnCls}
                    onClick={() => handleSelectOption(opt)}
                    disabled={selectedAns !== null}
                  >
                    <span className="vst-option-num">{idx + 1}</span>
                    <span>{typeof opt === 'number' ? opt.toLocaleString() : opt}</span>
                    <span style={{ width: 18 }} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Step-by-Step Visualizer / Vedic Secret Breakdown */}
          {showVisualizer && (
            <div className="vst-visualizer-box">
              <div className="vst-viz-header">
                <span className="vst-viz-title">
                  <span>💡 Vedic Mental Shortcut Breakdown:</span>
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {currentQ.sutraSa}
                </span>
              </div>

              <div className="vst-viz-diagram">
                <div className="vst-viz-part">
                  <div className="vst-viz-part-lbl">{currentQ.step1.label}</div>
                  <div className="vst-viz-part-math">{currentQ.step1.math}</div>
                </div>
                <div className="vst-viz-sep">|</div>
                <div className="vst-viz-part">
                  <div className="vst-viz-part-lbl">{currentQ.step2.label}</div>
                  <div className="vst-viz-part-math">{currentQ.step2.math}</div>
                </div>
                <div className="vst-viz-arrow">➔</div>
                <div className="vst-viz-result">
                  {typeof currentQ.correctAnswer === 'number'
                    ? currentQ.correctAnswer.toLocaleString()
                    : currentQ.correctAnswer}
                </div>
              </div>

              <p className="vst-viz-text">
                <strong>How the mind computes this:</strong> {currentQ.finalFormula}. {currentQ.step1.note}; {currentQ.step2.note}.
              </p>
            </div>
          )}

          {/* Footer Controls (Next / Hint / Spacebar helper) */}
          <div className="vst-stage-footer">
            <button
              type="button"
              className="vst-hint-toggle-btn"
              onClick={() => setShowVisualizer(!showVisualizer)}
            >
              <span>{showVisualizer ? '🙈 Hide Shortcut' : '💡 Reveal Vedic Shortcut'}</span>
            </button>

            {selectedAns !== null && (
              <button type="button" className="vst-next-btn" onClick={loadNextQuestion}>
                <span>Next Trick ➔ (Press Space)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* POCKET CHEAT SHEET MODAL */}
      {isCheatSheetOpen && (
        <div
          className="vst-modal-backdrop"
          onClick={() => setIsCheatSheetOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="vst-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="vst-modal-close-btn"
              onClick={() => setIsCheatSheetOpen(false)}
              aria-label="Close Cheat Sheet"
            >
              ✕
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '2rem' }}>📜</span>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fde047' }}>
                  Vedic Speed Maths: Pocket Cheat Sheet
                </h3>
                <span className="sanskrit-safe-text" lang="sa" style={{ color: '#fed7aa', fontSize: '0.9rem' }}>
                  षोडश-वैदिक-गणित-सार-सङ्ग्रहः
                </span>
              </div>
            </div>

            <div className="vst-cs-grid">
              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">१. एकाधिकेन पूर्वेण (Squares ending in 5)</h4>
                <div className="vst-cs-rule">Rule: (Ten × (Ten + 1)) | 25</div>
                <div className="vst-cs-example">
                  <strong>75²</strong> ➔ 7 × 8 = 56 | 25 ➔ <strong>5,625</strong>
                </div>
              </div>

              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">२. अन्त्ययोर्दशकेऽपि (Complementary Tens)</h4>
                <div className="vst-cs-rule">Rule: Tens match, units sum to 10</div>
                <div className="vst-cs-example">
                  <strong>43 × 47</strong> ➔ 4 × 5 = 20 | 3 × 7 = 21 ➔ <strong>2,021</strong>
                </div>
              </div>

              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">३. निखिलं नवतश्चरमं दशतः (Near 100 Multiplier)</h4>
                <div className="vst-cs-rule">Rule: Cross-subtract deficits, multiply deficits</div>
                <div className="vst-cs-example">
                  <strong>96 × 97</strong> ➔ 96 - 3 = 93 | 4 × 3 = 12 ➔ <strong>9,312</strong>
                </div>
              </div>

              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">४. एकन्यूनेन पूर्वेण (Lightning 99 Multiplier)</h4>
                <div className="vst-cs-rule">Rule: (Number - 1) | (99 - Left)</div>
                <div className="vst-cs-example">
                  <strong>48 × 99</strong> ➔ 48 - 1 = 47 | 99 - 47 = 52 ➔ <strong>4,752</strong>
                </div>
              </div>

              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">५. यावदूनम् (Near-Base Squaring)</h4>
                <div className="vst-cs-rule">Rule: (Number - Deficit) | (Deficit²)</div>
                <div className="vst-cs-example">
                  <strong>94²</strong> ➔ 94 - 6 = 88 | 6² = 36 ➔ <strong>8,836</strong>
                </div>
              </div>

              <div className="vst-cs-card">
                <h4 className="vst-cs-sutra sanskrit-safe-text" lang="sa">६. बीजाङ्क (Digital Root 3-Second Check)</h4>
                <div className="vst-cs-rule">Rule: Cast out nines to verify product instantaneously</div>
                <div className="vst-cs-example">
                  <strong>43 × 28 = 1204</strong> ➔ 7 × 1 = 7 | B(1204) = 7 (Verified!)
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button
                type="button"
                className="vst-action-btn vst-action-btn--gold"
                onClick={() => window.print()}
              >
                <span>🖨️ Print Cheat Sheet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VedicSpeedTricksGame;
