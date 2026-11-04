import React, { useState, useEffect, useMemo, useRef } from 'react';
import { devanagariToIast } from '../../utils/devanagariToIast';
import { CoreIdea, type LabSegmentProps } from './common';
import { playStoryLine as playStoryLineBase, playPronunciation, playSequence, PANCHABHUTA_NARRATION_RATE } from '../../utils/pronunciation';

/** Pañcabhūta story lines read slower than the shared story default. */
const playStoryLine = (text: string): void => playStoryLineBase(text, PANCHABHUTA_NARRATION_RATE);

/** Sanskrit part of an example label like "🍯 Honeycomb · मधुकोषः". */
const exampleSa = (example: string): string => {
  const parts = example.split('·');
  return parts.length > 1 ? parts[parts.length - 1].trim() : '';
};

/** Speak a shape name, then its Sanskrit example after a short pause. */
const speakShapeWithExample = (dev: string, example: string): void => {
  const ex = exampleSa(example);
  if (ex) playSequence([dev, ex], { gapMs: 650 });
  else playPronunciation(dev);
};

/** Small tap-to-hear 🔊 control usable inside tile buttons (no nested <button>). */
const SayBtn: React.FC<{ text: string; label?: string; className?: string; onSay?: () => void }> = ({ text, label, className, onSay }) => {
  const say = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onSay) onSay(); else playPronunciation(text);
  };
  return (
    <span
      role="button"
      tabIndex={0}
      className={`psw-say-btn ${className ?? ''}`}
      aria-label={`Hear ${text}`}
      title={`Hear ${text}`}
      onClick={say}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') say(e); }}
    >
      🔊{label ? <span className="psw-say-label">{label}</span> : null}
    </span>
  );
};
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';
import JungleCouncilStory from './JungleCouncilStory';
import BharatMapExplorer from './BharatMapExplorer';
import SpiceAdventureDeck from './SpiceAdventureDeck';
import PreschoolVarnamalaGame from './PreschoolVarnamalaGame';
import {
  LivingNatureExplorer,
  YogaPoseStudio,
  ActionPlayStudio,
  ToddlerCardQuestDeck,
  type WordQuestCard,
} from './PreschoolPlaydecks';

type PreschoolTab =
  | 'varnamala'
  | 'shapes'
  | 'colors'
  | 'animals'
  | 'festivals'
  | 'insects'
  | 'birds'
  | 'flowers'
  | 'relations'
  | 'actions'
  | 'spices'
  | 'months'
  | 'work'
  | 'fruits'
  | 'counting'
  | 'instruments'
  | 'moon'
  | 'day'
  | 'seasons'
  | 'vahanas'
  | 'yoga'
  | 'bharat'
  | 'vishva'
  | 'story'
  | 'jungle';

interface ShapeItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  color: string;
  example: string;
  svgType: 'circle' | 'square' | 'triangle' | 'star' | 'oval' | 'crescent' | 'rectangle' | 'diamond' | 'pentagon' | 'hexagon' | 'semicircle' | 'heart' | 'cube' | 'sphere' | 'cone' | 'cylinder';
  fact: string;
}

const EXAMPLE_IAST: Record<string, string> = {"सूर्यः": "sūryaḥ", "चित्रफलकम्": "citraphalakam", "पर्वतः": "parvataḥ", "नक्षत्रम्": "nakṣatram", "अण्डम्": "aṇḍam", "चन्द्रः": "candraḥ", "द्वारम्": "dvāram", "पतङ्गः": "pataṅgaḥ", "पुष्पम्": "puṣpam", "मधुकोषः": "madhukoṣaḥ", "उदयः": "udayaḥ", "प्रेम": "prema", "अक्षः": "akṣaḥ", "कन्दुकः": "kandukaḥ", "शिखरम्": "śikharam", "डमरुः": "ḍamaruḥ"};

const SHAPES: ShapeItem[] = [
  { id: 'circle', example: '☀️ Sun · सूर्यः', dev: 'वृत्तम्', iast: 'vṛttam', en: 'Circle', color: '#f59e0b', svgType: 'circle', fact: 'Round like the warm morning sun and full moon!' },
  { id: 'square', example: '🖼️ Frame · चित्रफलकम्', dev: 'चतुरस्रम्', iast: 'caturasram', en: 'Square', color: '#10b981', svgType: 'square', fact: 'Four equal sides like a sacred altar and picture frame!' },
  { id: 'triangle', example: '⛰️ Mountain · पर्वतः', dev: 'त्रिकोणम्', iast: 'trikoṇam', en: 'Triangle', color: '#ef4444', svgType: 'triangle', fact: 'Three sharp corners like a mountain peak and temple spire!' },
  { id: 'star', example: '⭐ Night star · नक्षत्रम्', dev: 'तारका', iast: 'tārakā', en: 'Star', color: '#8b5cf6', svgType: 'star', fact: 'Twinkling bright in the dark night sky with 5 points!' },
  { id: 'oval', example: '🥚 Egg · अण्डम्', dev: 'अण्डाकारः', iast: 'aṇḍākāraḥ', en: 'Oval', color: '#ec4899', svgType: 'oval', fact: 'Smooth and egg-shaped like a river pebble or seed!' },
  { id: 'crescent', example: '🌙 Moon · चन्द्रः', dev: 'अर्धचन्द्रः', iast: 'ardhacandraḥ', en: 'Crescent', color: '#d97706', svgType: 'crescent', fact: 'A smiling curved moon shining at bedtime!' },
  { id: 'rectangle', example: '🚪 Door · द्वारम्', dev: 'आयतम्', iast: 'āyatam', en: 'Rectangle', color: '#f97316', svgType: 'rectangle', fact: 'Long like a door, a book and a palm-leaf manuscript!' },
  { id: 'diamond', example: '🪁 Kite · पतङ्गः', dev: 'समचतुर्भुजम्', iast: 'samacaturbhujam', en: 'Diamond', color: '#3b82f6', svgType: 'diamond', fact: 'Four equal sides standing on a tip, like a kite in the sky!' },
  { id: 'pentagon', example: '🌸 Flower · पुष्पम्', dev: 'पञ्चकोणम्', iast: 'pañcakoṇam', en: 'Pentagon', color: '#14b8a6', svgType: 'pentagon', fact: 'Five corners, like the five petals of a flower!' },
  { id: 'hexagon', example: '🍯 Honeycomb · मधुकोषः', dev: 'षट्कोणम्', iast: 'ṣaṭkoṇam', en: 'Hexagon', color: '#eab308', svgType: 'hexagon', fact: 'Six corners! Busy bees build honeycomb rooms this way.' },
  { id: 'semicircle', example: '🌅 Rising sun · उदयः', dev: 'अर्धवृत्तम्', iast: 'ardhavṛttam', en: 'Semicircle', color: '#a855f7', svgType: 'semicircle', fact: 'Half a circle, like the sun peeping over the hills!' },
  { id: 'heart', example: '💗 Love · प्रेम', dev: 'हृदयाकारः', iast: 'hṛdayākāraḥ', en: 'Heart', color: '#f472b6', svgType: 'heart', fact: 'The shape of love and kindness for all living beings!' },
  { id: 'cube', example: '🎲 Dice · अक्षः', dev: 'घनः', iast: 'ghanaḥ', en: 'Cube', color: '#22c55e', svgType: 'cube', fact: 'A solid box with six square faces, like a dice or a block!' },
  { id: 'sphere', example: '🌍 Ball / Earth · कन्दुकः', dev: 'गोलः', iast: 'golaḥ', en: 'Sphere', color: '#0ea5e9', svgType: 'sphere', fact: 'Round all over like a ball, a laḍḍu and our Earth!' },
  { id: 'cone', example: '🍦 Ice-cream / temple śikhara · शिखरम्', dev: 'शङ्कुः', iast: 'śaṅkuḥ', en: 'Cone', color: '#fb923c', svgType: 'cone', fact: 'Pointy on top, round below, like an ice-cream cone!' },
  { id: 'cylinder', example: '🥁 Drum / rolling pin · डमरुः', dev: 'बेलनः', iast: 'belanaḥ', en: 'Cylinder', color: '#8b5cf6', svgType: 'cylinder', fact: 'Round and tall like a drum, a pot or a rolling pin!' },
];

/* ==========================================================================
   PRESCHOOL COLORS & MAGIC MIX DATA
   ========================================================================== */
interface ColorItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  hex: string;
  itemEn: string;
  itemDev: string;
  itemIcon: string;
  vedaFact: string;
  isPrimary?: boolean;
}

const COLORS: ColorItem[] = [
  { id: 'red', dev: 'रक्तः', iast: 'raktaḥ', en: 'Red', hex: '#ef4444', itemEn: 'Ripe Apple', itemDev: 'सेवफलम्', itemIcon: '🍎', vedaFact: 'In the morning, the Sun (Sūrya) comes up red, like a big red ball! Look out of the window at sunrise.', isPrimary: true },
  { id: 'yellow', dev: 'पीतः', iast: 'pītaḥ', en: 'Yellow', hex: '#facc15', itemEn: 'Sweet Banana', itemDev: 'कदलीफलम्', itemIcon: '🍌', vedaFact: 'Turmeric (haridrā) is yellow. Amma puts it in dal, and it can colour cloth yellow too!', isPrimary: true },
  { id: 'blue', dev: 'नीलः', iast: 'nīlaḥ', en: 'Blue', hex: '#3b82f6', itemEn: 'Dancing Peacock', itemDev: 'मयूरः', itemIcon: '🦚', vedaFact: "A plant called nīlī makes blue colour for clothes. Its English name, indigo, means 'from India'!", isPrimary: true },
  { id: 'green', dev: 'हरितः', iast: 'haritaḥ', en: 'Green', hex: '#22c55e', itemEn: 'Fresh Leaf', itemDev: 'पर्णम्', itemIcon: '🍃', vedaFact: "Leaves are green. They drink sunshine to grow big, so the old songs thanked the Sun!" },
  { id: 'white', dev: 'श्वेतः', iast: 'śvetaḥ', en: 'White', hex: '#f8fafc', itemEn: 'Graceful Swan', itemDev: 'हंसः', itemIcon: '🦢', vedaFact: "Sunlight looks white, but seven colours hide inside it, like the Sun's seven horses!" },
  { id: 'orange', dev: 'काषायः (नारङ्गः)', iast: 'kāṣāyaḥ', en: 'Saffron / Orange', hex: '#f97316', itemEn: 'Sacred Diya', itemDev: 'दीपः', itemIcon: '🪔', vedaFact: 'A diya flame is orange and warm. Saffron (kuṅkuma) is orange too!' },
  { id: 'purple', dev: 'जाम्बवः', iast: 'jāmbavaḥ', en: 'Purple / Violet', hex: '#a855f7', itemEn: 'Sweet Grapes', itemDev: 'द्राक्षाफलम्', itemIcon: '🍇', vedaFact: "Violet is the last colour in the rainbow, like the seventh horse of the Sun!" },
  { id: 'pink', dev: 'पाटलः', iast: 'pāṭalaḥ', en: 'Pink', hex: '#ec4899', itemEn: 'Sacred Lotus', itemDev: 'कमलम्', itemIcon: '🪷', vedaFact: 'The pink lotus opens when the Sun comes up and closes at night, like going to sleep!' },
];

/* ==========================================================================
   PRESCHOOL ANIMAL SAFARI DATA
   ========================================================================== */
interface AnimalItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  soundLabelEn: string;
  soundLabelSa: string;
  fact: string;
}

const ANIMALS: AnimalItem[] = [
  { id: 'cow', dev: 'धेनुः (गौः)', iast: 'dhenuḥ (gauḥ)', en: 'Sacred Cow', icon: '🐮', soundLabelEn: 'Moo-Moo!', soundLabelSa: 'हम्बा-हम्बा!', fact: 'Gentle mother who gives warm sweet milk to everyone!' },
  { id: 'lion', dev: 'सिंहः', iast: 'siṁhaḥ', en: 'Majestic Lion', icon: '🦁', soundLabelEn: 'Rooaaar!', soundLabelSa: 'गर्जति!', fact: 'Brave king of the forest and companion of Goddess Durga!' },
  { id: 'elephant', dev: 'गजः', iast: 'gajaḥ', en: 'Royal Elephant', icon: '🐘', soundLabelEn: 'Pawoo-Trumpet!', soundLabelSa: 'चिङ्घारः!', fact: 'Gentle giant friend of Ganesha with joyful flapping ears!' },
  { id: 'mouse', dev: 'मूषकः', iast: 'mūṣakaḥ', en: 'Tiny Mouse', icon: '🐭', soundLabelEn: 'Squeak-Squeak!', soundLabelSa: 'चीं-चीं!', fact: 'Quick and clever friend who rides with Lord Ganesha!' },
  { id: 'peacock', dev: 'मयूरः', iast: 'mayūraḥ', en: 'Dancing Peacock', icon: '🦚', soundLabelEn: 'Mayura Cry!', soundLabelSa: 'केका-केका!', fact: 'Spreads stunning rainbow feathers when rain clouds appear!' },
  { id: 'frog', dev: 'मण्डूकः', iast: 'maṇḍūkaḥ', en: 'Jumping Frog', icon: '🐸', soundLabelEn: 'Croak-Croak!', soundLabelSa: 'टर्र-टर्र!', fact: 'Splashes happily into lotus ponds during monsoon rains!' },
  { id: 'crow', dev: 'काकः', iast: 'kākaḥ', en: 'Clever Crow', icon: '🐦‍⬛', soundLabelEn: 'Caw-Caw!', soundLabelSa: 'का-का!', fact: 'Wakes up early at dawn and shares sweet food with friends!' },
  { id: 'dog', dev: 'श्वा (कुक्कुरः)', iast: 'śvā (kukkuraḥ)', en: 'Playful Puppy', icon: '🐶', soundLabelEn: 'Bow-Wow!', soundLabelSa: 'भौ-भौ!', fact: 'Loyal and joyful guardian who loves gentle cuddles!' },
  { id: 'monkey', dev: 'वानरः (कपिः)', iast: 'vānaraḥ', en: 'Leaping Monkey', icon: '🐒', soundLabelEn: 'Chatter-Chatter!', soundLabelSa: 'खिक्-खिक्!', fact: 'Playful tree acrobat who loves juicy sweet fruits!' },
  { id: 'tiger', dev: 'व्याघ्रः', iast: 'vyāghraḥ', en: 'Striped Tiger', icon: '🐯', soundLabelEn: 'Grrr-Roar!', soundLabelSa: 'गर्जति!', fact: 'India’s national animal, with orange-and-black stripes!' },
  { id: 'deer', dev: 'मृगः (हरिणः)', iast: 'mṛgaḥ (hariṇaḥ)', en: 'Spotted Deer', icon: '🦌', soundLabelEn: 'Bleat-Bleat!', soundLabelSa: 'मृग-ध्वनिः!', fact: 'Sītā loved the golden deer in the Rāmāyaṇa! Deer run super fast.' },
  { id: 'bear', dev: 'भल्लूकः', iast: 'bhallūkaḥ', en: 'Big Bear', icon: '🐻', soundLabelEn: 'Grrumph!', soundLabelSa: 'घुर्-घुर्!', fact: 'Wise Jāmbavān the bear helped Śrī Rāma! Bears love honey.' },
  { id: 'snake', dev: 'सर्पः (भुजङ्गः)', iast: 'sarpaḥ (bhujaṅgaḥ)', en: 'Slithery Snake', icon: '🐍', soundLabelEn: 'Hisss!', soundLabelSa: 'फूत्कारः!', fact: 'Śiva wears a snake; Viṣṇu rests on the snake Śeṣa. Snakes have no legs!' },
  { id: 'crocodile', dev: 'नक्रः (मकरः)', iast: 'nakraḥ (makaraḥ)', en: 'River Crocodile', icon: '🐊', soundLabelEn: 'Snap-Snap!', soundLabelSa: 'चट्-चट्!', fact: 'Lives in rivers. Gaṅgā Mātā rides a makara!' },
  { id: 'fox', dev: 'लोमशः (शृगालः)', iast: 'lomaśaḥ (śṛgālaḥ)', en: 'Clever Fox', icon: '🦊', soundLabelEn: 'Yip-Yip!', soundLabelSa: 'हुआँ-हुआँ!', fact: 'The clever fox is in many Pañcatantra stories!' },
];

/* ==========================================================================
   PRESCHOOL SWEET FRUITS DATA
   ========================================================================== */
interface FruitItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  color: string;
  sweetFact: string;
}

const FRUITS: FruitItem[] = [
  { id: 'mango', dev: 'आम्रम्', iast: 'āmram', en: 'Mango', icon: '🥭', color: '#f59e0b', sweetFact: 'The sweet King of Fruits loved by all children!' },
  { id: 'banana', dev: 'कदलीफलम्', iast: 'kadalīphalam', en: 'Banana', icon: '🍌', color: '#eab308', sweetFact: 'Sweet and golden energy snack for active little ones!' },
  { id: 'apple', dev: 'सेवफलम्', iast: 'sevaphalam', en: 'Apple', icon: '🍎', color: '#ef4444', sweetFact: 'Crispy red juicy fruit that keeps doctors away!' },
  { id: 'grapes', dev: 'द्राक्षाफलम्', iast: 'drākṣāphalam', en: 'Grapes', icon: '🍇', color: '#9333ea', sweetFact: 'Juicy purple globes hanging in sweet bunches!' },
  { id: 'coconut', dev: 'नारिकेलम्', iast: 'nārikelam', en: 'Coconut', icon: '🥥', color: '#78350f', sweetFact: 'Cool sweet sacred water inside a sturdy shell!' },
  { id: 'berry', dev: 'तृण-बदरी', iast: 'tṛṇa-badarī', en: 'Strawberry', icon: '🍓', color: '#f43f5e', sweetFact: 'Bright red berry dotted with tiny golden seeds!' },
  { id: 'orange', dev: 'नारङ्गफलम्', iast: 'nāraṅgaphalam', en: 'Orange', icon: '🍊', color: '#ea580c', sweetFact: 'Bursting with sunny sweet vitamin droplets!' },
  { id: 'watermelon', dev: 'कालिङ्गम्', iast: 'kāliṅgam', en: 'Watermelon', icon: '🍉', color: '#10b981', sweetFact: 'Giant green ball with sweet red smiles inside! Its Sanskrit name kāliṅga means “fruit from Kalinga land.”' },
];

/* ==========================================================================
   PRESCHOOL COUNTING 1 TO 10 DATA
   ========================================================================== */
interface CountItem {
  num: number;
  devDigit: string;
  devName: string;
  iast: string;
  en: string;
  icon: string;
  phraseSa: string;
  phraseEn: string;
  color: string;
}

const COUNT_ITEMS: CountItem[] = [
  { num: 1, devDigit: '१', devName: 'एकम्', iast: 'ekam', en: 'One', icon: '☀️', phraseSa: 'एकः सूर्यः', phraseEn: 'One Bright Sun', color: '#f59e0b' },
  { num: 2, devDigit: '२', devName: 'द्वे', iast: 'dve', en: 'Two', icon: '🦢', phraseSa: 'द्वौ हंसौ', phraseEn: 'Two White Swans', color: '#06b6d4' },
  { num: 3, devDigit: '३', devName: 'त्रीणि', iast: 'trīṇi', en: 'Three', icon: '🥭', phraseSa: 'त्रीणि आम्राणि', phraseEn: 'Three Sweet Mangoes', color: '#10b981' },
  { num: 4, devDigit: '४', devName: 'चत्वारि', iast: 'catvāri', en: 'Four', icon: '🐶', phraseSa: 'चत्वारः शुनकाः', phraseEn: 'Four Playful Puppies', color: '#f97316' },
  { num: 5, devDigit: '५', devName: 'पञ्च', iast: 'pañca', en: 'Five', icon: '⭐', phraseSa: 'पञ्च ताराः', phraseEn: 'Five Twinkling Stars', color: '#8b5cf6' },
  { num: 6, devDigit: '६', devName: 'षट्', iast: 'ṣaṭ', en: 'Six', icon: '🐝', phraseSa: 'षट् भ्रमराः', phraseEn: 'Six Buzzing Bees', color: '#ec4899' },
  { num: 7, devDigit: '७', devName: 'सप्त', iast: 'sapta', en: 'Seven', icon: '🌈', phraseSa: 'सप्त वर्णाः', phraseEn: 'Seven Rainbow Colors', color: '#0ea5e9' },
  { num: 8, devDigit: '८', devName: 'अष्ट', iast: 'aṣṭa', en: 'Eight', icon: '🪷', phraseSa: 'अष्ट कमलानि', phraseEn: 'Eight Pink Lotuses', color: '#14b8a6' },
  { num: 9, devDigit: '९', devName: 'नव', iast: 'nava', en: 'Nine', icon: '🪔', phraseSa: 'नव दीपाः', phraseEn: 'Nine Glowing Lamps', color: '#6366f1' },
  { num: 10, devDigit: '१०', devName: 'दश', iast: 'daśa', en: 'Ten', icon: '🍎', phraseSa: 'दश फलानि', phraseEn: 'Ten Yummy Fruits', color: '#eab308' },
];

/* ==========================================================================
   PRESCHOOL SACRED INSTRUMENTS & RHYTHM DATA
   ========================================================================== */
interface InstrumentItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  soundType: 'bell' | 'damaru' | 'conch' | 'strings' | 'drum' | 'cymbals';
  iconImg?: string;
  soundWord: string;
  deityConnect: string;
  bgGradient: string;
}

const INSTRUMENTS: InstrumentItem[] = [
  { id: 'ghanta', dev: 'घण्टा', iast: 'ghaṇṭā', en: 'Temple Bell', icon: '🔔', soundType: 'bell', soundWord: 'किङ्किणी-झणत्कारः · Ting-Ting!', deityConnect: 'Ring before prayers to welcome positive devic energy!', bgGradient: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)' },
  { id: 'damaru', dev: 'डमरू', iast: 'ḍamarū', en: "Shiva's Drum", icon: '🪘', soundType: 'damaru', soundWord: 'डम-डम-डम · Dum-Dum-Dum!', deityConnect: "The sacred rhythm beat from which cosmic sounds flow!", bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' },
  { id: 'shankha', dev: 'शङ्खः', iast: 'śaṅkhaḥ', en: 'Sacred Conch', icon: '🐚', soundType: 'conch', soundWord: 'ओङ्कार-नादः · Deep Horn Call!', deityConnect: 'Blown at dawn and auspicious moments to clear negativity!', bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' },
  { id: 'veena', dev: 'वीणा', iast: 'vīṇā', en: "Saraswati's Lute", icon: '🪕', soundType: 'strings', soundWord: 'झङ्कारः · Sweet Melody!', deityConnect: 'Tuning the vibrations of divine wisdom and learning!', bgGradient: 'linear-gradient(135deg, #701a75 0%, #a21caf 100%)' },
  { id: 'mridanga', iconImg: '/preschool/instruments/mridanga.svg', dev: 'मृदङ्गः', iast: 'mṛdaṅgaḥ', en: 'Gurukul Drum', icon: '🥁', soundType: 'drum', soundWord: 'धिम्-ता-किट · Dhim-Tha-Ki-Ta!', deityConnect: 'The heart rhythm drum for cheerful kirtans and dances!', bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)' },
  { id: 'manjira', iconImg: '/preschool/instruments/manjira.svg', dev: 'मञ्जीरा', iast: 'mañjīrā', en: 'Golden Cymbals', icon: '🪙', soundType: 'cymbals', soundWord: 'झिलमिल-क्विणनम् · Chink-Chink!', deityConnect: 'Twinkling rhythm cymbals keeping joyful time with music!', bgGradient: 'linear-gradient(135deg, #854d0e 0%, #ca8a04 100%)' },
];

interface MoonPhase {
  id: string;
  pct: number;
  dev: string;
  iast: string;
  en: string;
  desc: string;
  emoji: string;
}

const MOON_PHASES: MoonPhase[] = [
  { id: 'amavasya', pct: 0, dev: 'अमावास्या', iast: 'amāvāsyā', en: 'New Moon', desc: 'The quiet night sky is dark and filled with sparkling stars!', emoji: '🌑' },
  { id: 'balacandra', pct: 25, dev: 'बालचन्द्रः', iast: 'bālacandraḥ', en: 'Baby Crescent', desc: 'A thin, sweet smile of silver light in the evening sky!', emoji: '🌙' },
  { id: 'ardhacandra', pct: 50, dev: 'अर्धचन्द्रः', iast: 'ardhacandraḥ', en: 'Half Moon', desc: 'Half silver and half shadow, perfectly balanced!', emoji: '🌓' },
  { id: 'vardhamana', pct: 75, dev: 'वर्धमान-चन्द्रः', iast: 'vardhamāna-candraḥ', en: 'Growing Moon', desc: 'Growing rounder and brighter every single night!', emoji: '🌔' },
  { id: 'purnima', pct: 100, dev: 'पूर्णिमा', iast: 'pūrṇimā', en: 'Full Moon', desc: 'A big, radiant silver plate illuminating the whole Earth!', emoji: '🌕' },
];

interface DaySection {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  greeting: string;
  greetingSa: string;
  desc: string;
  skyBg: string;
  sunPos: { x: number; y: number };
}

const DAY_SECTIONS: DaySection[] = [
  {
    id: 'prabhata',
    dev: 'प्रभातः',
    iast: 'prabhātaḥ',
    en: 'Early Morning / Dawn',
    icon: '🌅',
    greeting: 'Good Morning!',
    greetingSa: 'सुप्रभातम्!',
    desc: 'The rooster crows! The golden sun wakes up, birds chirp, and flowers open.',
    skyBg: 'linear-gradient(180deg, #fdba74 0%, #fed7aa 40%, #bfdbfe 100%)',
    sunPos: { x: 20, y: 65 },
  },
  {
    id: 'madhyahna',
    dev: 'मध्याह्नः',
    iast: 'madhyāhnaḥ',
    en: 'Bright Midday / Afternoon',
    icon: '☀️',
    greeting: 'Bright Afternoon!',
    greetingSa: 'शुभ-मध्याह्नः!',
    desc: 'The sun shines high and bright! Bees buzz happily and lotuses bask in warmth.',
    skyBg: 'linear-gradient(180deg, #38bdf8 0%, #7dd3fc 60%, #bae6fd 100%)',
    sunPos: { x: 50, y: 18 },
  },
  {
    id: 'sayangkala',
    dev: 'सायङ्कालः',
    iast: 'sāyaṅkālaḥ',
    en: 'Evening Sunset / Dusk',
    icon: '🌇',
    greeting: 'Good Evening!',
    greetingSa: 'शुभ-सायङ्कालः!',
    desc: 'The sky turns violet and coral! Temple bells chime, birds fly home, and little diyas are lit.',
    skyBg: 'linear-gradient(180deg, #7c3aed 0%, #db2777 40%, #f97316 100%)',
    sunPos: { x: 80, y: 62 },
  },
  {
    id: 'ratri',
    dev: 'रात्रिः',
    iast: 'rātriḥ',
    en: 'Peaceful Night / Bedtime',
    icon: '🌙',
    greeting: 'Good Night!',
    greetingSa: 'शुभरात्रिः!',
    desc: 'Velvet dark sky with silver moonbeams and fireflies. Sweet dreams and peaceful rest!',
    skyBg: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 60%, #172554 100%)',
    sunPos: { x: 50, y: 25 },
  },
];

interface SeasonItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  desc: string;
  weatherAction: string;
  particles: string[];
  themeColor: string;
}

const SEASONS: SeasonItem[] = [
  {
    id: 'vasanta',
    dev: 'वसन्तः',
    iast: 'vasantaḥ',
    en: 'Spring (Flowers & Joy)',
    icon: '🌸',
    desc: 'Mother Nature puts on a dress of colorful blossoms! Cuckoos sing and butterflies dance.',
    weatherAction: 'Shower Petals 🌸',
    particles: ['🌸', '🌺', '🦋', '🌷', '🌿'],
    themeColor: '#ec4899',
  },
  {
    id: 'grishma',
    dev: 'ग्रीष्मः',
    iast: 'grīṣmaḥ',
    en: 'Summer (Warm Sunshine)',
    icon: '☀️',
    desc: 'Warm golden sunbeams! Sweet juicy mangoes ripen and cold lemonade tastes delicious.',
    weatherAction: 'Golden Sunbeams ☀️',
    particles: ['☀️', '🥭', '🍉', '🌻', '✨'],
    themeColor: '#f59e0b',
  },
  {
    id: 'varsha',
    dev: 'वर्षा',
    iast: 'varṣā',
    en: 'Monsoon (Raindrops & Clouds)',
    icon: '🌧️',
    desc: 'Pitter-patter cool raindrops! Peacocks spread their magnificent feathers and paper boats float.',
    weatherAction: 'Rain Shower 🌧️',
    particles: ['🌧️', '💧', '🦚', '⛵', '🌈'],
    themeColor: '#0284c7',
  },
  {
    id: 'sharad',
    dev: 'शरद्',
    iast: 'śarad',
    en: 'Autumn (Clear Harvest)',
    icon: '🌾',
    desc: 'Clear sparkling skies, cool evening breeze, golden harvest grains, and quiet ponds.',
    weatherAction: 'Golden Breeze 🌾',
    particles: ['🌾', '🍁', '🍂', '🌕', '🪷'],
    themeColor: '#d97706',
  },
  {
    id: 'hemanta',
    dev: 'हेमन्तः',
    iast: 'hemantaḥ',
    en: 'Pre-Winter (Misty Dew)',
    icon: '🍂',
    desc: 'Golden misty mornings, sparkling dewdrops on grass, cozy shawls, and warm jaggery sweets!',
    weatherAction: 'Misty Dewdrops 🍂',
    particles: ['🍂', '💧', '🌾', '🪔', '🧣'],
    themeColor: '#ea580c',
  },
  {
    id: 'shishira',
    dev: 'शिशिरः',
    iast: 'śiśiraḥ',
    en: 'Winter (Snow & Cozy Hugs)',
    icon: '❄️',
    desc: 'Chilly morning fog, sparkling snowflakes, warm cozy blankets, and sweet warm milk.',
    weatherAction: 'Drop Snowflakes ❄️',
    particles: ['❄️', '☃️', '🧣', '🔥', '✨'],
    themeColor: '#6366f1',
  },
];

interface VahanaPair {
  id: string;
  godDev: string;
  godEn: string;
  godIcon: string;
  godImg?: string;
  vahanaDev: string;
  vahanaEn: string;
  vahanaIcon: string;
  quote: string;
}

const VAHANAS: VahanaPair[] = [
  { id: 'ganesha', godDev: 'श्रीगणेशः', godEn: 'Ganesha', godIcon: '🐘', godImg: '/preschool/festivals/ganesha.webp', vahanaDev: 'मूषकः', vahanaEn: 'Little Mouse', vahanaIcon: '🐭', quote: 'मूषकवाहन मोदकहस्त · Even the tiny mouse is loved and honored!' },
  { id: 'shiva', godDev: 'भगवान् शिवः', godEn: 'Lord Shiva', godIcon: '🔱', vahanaDev: 'नन्दी (वृषभः)', vahanaEn: 'Nandi Bull', vahanaIcon: '🐂', quote: 'नन्दिवाहन महादेव · Loyal, gentle, and strong protector!' },
  { id: 'vishnu', godDev: 'भगवान् विष्णुः', godEn: 'Lord Vishnu', godIcon: '☸️', godImg: '/preschool/vahanas/vishnu.webp', vahanaDev: 'गरुडः', vahanaEn: 'Garuda Eagle', vahanaIcon: '🦅', quote: 'गरुडध्वज नारायण · Soaring high across the cosmic skies!' },
  { id: 'saraswati', godDev: 'देवी सरस्वती', godEn: 'Goddess Saraswati', godIcon: '🪕', vahanaDev: 'हंसः', vahanaEn: 'Wisdom Swan', vahanaIcon: '🦢', quote: 'हंसवाहिनी विद्यादेवी · The swan who knows truth from illusion!' },
  { id: 'durga', godDev: 'माँ दुर्गा', godEn: 'Maa Durga', godIcon: '⚔️', vahanaDev: 'सिंहः', vahanaEn: 'Brave Lion', vahanaIcon: '🦁', quote: 'सिंहवाहिनी जगन्माता · Courage, strength, and love!' },
  { id: 'kartikeya', godDev: 'भगवान् कार्तिकेयः', godEn: 'Lord Kartikeya', godIcon: '🏹', vahanaDev: 'मयूरः', vahanaEn: 'Dancing Peacock', vahanaIcon: '🦚', quote: 'मयूरवाहन षण्मुख · Radiant beauty and noble leadership!' },
  { id: 'lakshmi', godDev: 'देवी लक्ष्मीः', godEn: 'Goddess Lakshmi', godIcon: '🪙', godImg: '/preschool/vahanas/lakshmi.webp', vahanaDev: 'उलूकः', vahanaEn: 'Wise Owl', vahanaIcon: '🦉', quote: 'उलूकवाहिनी लक्ष्मीः · The wise owl sees clearly even in the dark!' },
  { id: 'yama', godDev: 'यमराजः', godEn: 'Yamaraja', godIcon: '⚖️', vahanaDev: 'महिषः', vahanaEn: 'Water Buffalo', vahanaIcon: '🦬', quote: 'महिषवाहन धर्मराज · Steadfast, disciplined, and calm justice!' },
];

interface CharacterDialogue {
  speaker: 'kalu' | 'isha' | 'narrator';
  speakerLabelEn: string;
  speakerLabelSa: string;
  speakerIcon: string;
  textEn: string;
  textSa: string;
}

interface StorySlide {
  id: number;
  titleEn: string;
  titleSa: string;
  elementHighlight: string;
  icon: string;
  bgGradient: string;
  bookImages?: string[];
  dialogues: CharacterDialogue[];
  elementsList?: Array<{
    num: string;
    saName: string;
    saDesc: string;
    enName: string;
    enDesc: string;
    icon: string;
    color: string;
  }>;
  endNote?: { titleEn: string; en: string; sa: string };
  introQuestion?: { en: string; sa: string };
  whisperFinale?: {
    en: string;
    sa: string;
  };
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 1,
    bookImages: ['/stories/panchabhuta/p01.webp', '/stories/panchabhuta/p02.webp', '/stories/panchabhuta/p03.webp'],
    titleEn: 'Kalu & Isha: Children of Nature',
    titleSa: 'कालुः ईशा च · प्रकृतेः शिशू',
    introQuestion: { en: 'Have you ever wondered what our world is made of?', sa: 'अस्माकं जगत् केन निर्मितम् इति कदापि चिन्तितवान् असि?' },
    elementHighlight: 'प्रकृति-वन्दना · Forest Love & Fire Songs',
    icon: '🏕️',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
    dialogues: [
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: 'Deep inside the emerald forest lived Kalu, a free-spirited boy who loved the wet mud, tall trees, and endless sky. Hugging a giant banyan trunk, he softly whispered, "Mātā Bhūmiḥ, tubhyaṁ namaḥ!" — Mother Earth, I bow to you!',
        textSa: 'हरितवनस्य अन्तः कालुः नाम स्वच्छन्दः बालकः वसति स्म। सः आर्द्रमृत्तिकां, उन्नतान् वृक्षान्, अनन्तम् आकाशं च स्निह्यति स्म। विशालं वटवृक्षम् आलिङ्ग्य सः मन्दम् अवदत्, "माता भूमिः, तुभ्यं नमः!"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'High up on the nearby green hill lived Isha, a Vedic girl with a serene smile. Sitting near a glowing fire pit, she sang sweet mantras with her family, chanting, "Pāvana Pāvaka, tubhyaṁ namaḥ!" — Pure Fire, I bow to you!',
        textSa: 'समीपस्थे हरितपर्वते ईशा नाम शान्तस्मिता वैदिकी बालिका वसति स्म। दीप्यमानस्य अग्निकुण्डस्य समीपे उपविश्य सा परिवारेण सह मधुरमन्त्रान् अगायत्, "पावन पावक, तुभ्यं नमः!"',
      },
    ],
  },
  {
    id: 2,
    bookImages: ['/stories/panchabhuta/p04.webp'],
    titleEn: 'Where the River Bends · Holy Water',
    titleSa: 'नदीतीरे मिलनम् · पवित्रं जलम्',
    elementHighlight: '१. जलम् · Holy Water (Ganga & Saraswathi)',
    icon: '🌊',
    bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #075985 60%, #0284c7 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'One sparkling morning, Kalu and Isha met where the rushing river curved around the bend.',
        textSa: 'एकस्मिन् उज्ज्वले प्रभाते यत्र वेगवती नदी वक्रा भवति, तत्र कालुः ईशा च अमिलताम्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"This is Jalam (जलम् - Water)," Kalu smiled, splashing gently. "It is the giant helper that keeps every plant alive!"',
        textSa: 'कालुः मन्दं जलं क्षिपन् सस्मितम् अवदत्, "इदं जलम्। एतत् महत् सहायकं यत् सर्वान् वनस्पतीन् जीवयति!"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha folded her hands respectfully, adding, "It is the sacred stream of Ganga and Saraswati, washing away all worries."',
        textSa: 'ईशा सादरं करौ योजयित्वा अवदत्, "एषः गङ्गा-सरस्वत्योः पावनः प्रवाहः, यः सर्वाः चिन्ताः क्षालयति।"',
      },
    ],
  },
  {
    id: 3,
    bookImages: ['/stories/panchabhuta/p05.webp'],
    titleEn: 'The Cool Breeze · Pawanputra Hanuman',
    titleSa: 'शीतलः वायुः · पवनपुत्रः हनुमान्',
    elementHighlight: '२. वायुः · Wind & Pawanputra Hanuman',
    icon: '💨',
    bgGradient: 'linear-gradient(135deg, #134e4a 0%, #0f766e 60%, #14b8a6 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'Suddenly, a fresh breeze rustled through the treetops.',
        textSa: 'सहसा नूतनः वायुः वृक्षशिखरेषु मर्मरम् अकरोत्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"Feel Vāyuḥ (वायुः - Air)!" Kalu giggled as his hair blew wildly. "It is the invisible breath of our forest."',
        textSa: 'केशेषु वायुना विकीर्णेषु कालुः अहसत्, "वायुम् अनुभव! एषः अस्माकं वनस्य अदृश्यः श्वासः।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha closed her eyes with delight. "Yes! It carries the strength of Pawanputra Hanuman leaping across the open sky."',
        textSa: 'ईशा सानन्दं नेत्रे निमील्य अवदत्, "आम्! एषः विशाले आकाशे उत्पततः पवनपुत्रस्य हनुमतः बलं वहति।"',
      },
    ],
  },
  {
    id: 4,
    bookImages: ['/stories/panchabhuta/p06.webp'],
    titleEn: 'The Campfire · Yagna and Aarthi',
    titleSa: 'अग्निकुण्डम् · यज्ञः आरतिः च',
    elementHighlight: '३. अग्निः · Fire & Divine Light (Yagna & Aarthi)',
    icon: '🔥',
    bgGradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 60%, #ea580c 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'As dusk fell, Kalu gathered dry sticks to light a small, cozy fire.',
        textSa: 'सायंकाले कालुः लघुम् अग्निं प्रज्वालयितुं शुष्ककाष्ठानि समाहरत्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"Agniḥ (अग्निः - Fire) gives us warmth and warm light," he said softly.',
        textSa: 'सः मन्दम् अवदत्, "अग्निः अस्मभ्यम् ऊष्माणं प्रकाशं च ददाति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha watched the dancing orange embers. "Agni is the holy fire of Yagya and evening Aarthi, carrying our love up to the gods."',
        textSa: 'ईशा नृत्यन्तः अङ्गारान् अपश्यत्। "अग्निः यज्ञस्य सायमारत्याः च पावनः अग्निः, यः अस्माकं प्रेम देवान् प्रति वहति।"',
      },
    ],
  },
  {
    id: 5,
    bookImages: ['/stories/panchabhuta/p07.webp'],
    titleEn: 'The Brown Soil · Sacred Bharat Mata',
    titleSa: 'आर्द्रमृत्तिका · पावनी भारतमाता',
    elementHighlight: '४. पृथिवी · Nourishing Earth & Mother Bharat',
    icon: '🌱',
    bgGradient: 'linear-gradient(135deg, #78350f 0%, #92400e 60%, #b45309 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'Kalu knelt down and scooped up a handful of rich brown soil.',
        textSa: 'कालुः जानुभ्यां स्थित्वा हस्तेन समृद्धां मृत्तिकाम् अगृह्णात्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"Pṛthivī (पृथिवी - Earth) grows sweet fruits and gives us a home."',
        textSa: '"पृथिवी मधुराणि फलानि जनयति, अस्मभ्यं गृहं च ददाति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha cupped her hands to touch the earth too. "Mother Earth feeds all living beings like a loving mother."',
        textSa: 'ईशा अपि अञ्जलिना भूमिम् अस्पृशत्। "भूमाता स्नेहमयी माता इव सर्वान् प्राणिनः पोषयति।"',
      },
    ],
  },
  {
    id: 6,
    bookImages: ['/stories/panchabhuta/p08.webp'],
    titleEn: 'The Endless Sky · Cosmic Avatars',
    titleSa: 'विशालम् आकाशम् · दिव्यावताराः',
    elementHighlight: '५. आकाशः · Silent Mystery & Cosmic Avatars',
    icon: '🌌',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'They looked up into the twilight above.',
        textSa: 'तौ उपरि सन्ध्याकाशम् अपश्यताम्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"Ākāśaḥ (आकाशः - Space) is the grand mystery holding the moon and stars," whispered Kalu.',
        textSa: 'कालुः मन्दम् अवदत्, "आकाशः महत् रहस्यम्, यः चन्द्रं तारकाः च धारयति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha gazed at the night sky. "It is the vast cosmos where Lord Vamana measured the universe and Lord Narasimha revealed His divine glory."',
        textSa: 'ईशा रात्र्याकाशम् अपश्यत्। "एतत् विशालं ब्रह्माण्डं यत्र भगवान् वामनः विश्वम् अमिमीत, भगवान् नृसिंहः च दिव्यं तेजः प्राकटयत्।"',
      },
    ],
  },
  {
    id: 7,
    bookImages: ['/stories/panchabhuta/p09.webp'],
    titleEn: 'The Secret Revealed: Five Shared Friends',
    titleSa: 'पञ्चमित्राणां रहस्यम् · पञ्चमहाभूतानि',
    elementHighlight: 'पञ्चभूतानि · The 5 Shared Sacred Elements',
    icon: '⭐',
    bgGradient: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 60%, #7c3aed 100%)',
    dialogues: [
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: 'Kalu gasped with delight. "We see the world in different ways, but we love the exact same five friends!"',
        textSa: 'कालुः सानन्दम् अवदत्, "आवां जगत् भिन्नरीत्या पश्यावः, परन्तु एतानि एव पञ्च मित्राणि स्निह्यावः!"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha clapped her hands happily. "Yes! Earth, Water, Fire, Air, and Space — the Pañcabhūtāni (पञ्चभूतानि - Five Great Elements)!"',
        textSa: 'ईशा सहर्षं करतलौ अताडयत्। "आम्! पृथिवी, जलम्, अग्निः, वायुः, आकाशः च — एतानि पञ्चभूतानि!"',
      },
    ],
    elementsList: [
      { num: '१', saName: 'पृथिवी', saDesc: 'भारतमाता', enName: 'Prithvi (Earth)', enDesc: 'Bharat Mata', icon: '🌱', color: '#10b981' },
      { num: '२', saName: 'जलम्', saDesc: 'गङ्गा च सरस्वती', enName: 'Jala (Water)', enDesc: 'Ganga & Saraswathi', icon: '💧', color: '#06b6d4' },
      { num: '३', saName: 'अग्निः', saDesc: 'यज्ञः च आरतिः', enName: 'Agni (Fire)', enDesc: 'Yagna & Aarthi', icon: '🔥', color: '#f97316' },
      { num: '४', saName: 'वायुः', saDesc: 'पवनपुत्रः', enName: 'Vayu (Air)', enDesc: 'Pawanputra', icon: '💨', color: '#14b8a6' },
      { num: '५', saName: 'आकाशः', saDesc: 'दिव्यावताराः', enName: 'Akasha (Space)', enDesc: 'Cosmic Avatars', icon: '🌌', color: '#8b5cf6' },
    ],
  },
  {
    id: 8,
    bookImages: ['/stories/panchabhuta/p10.webp'],
    titleEn: 'Under the Banyan: We Are All One!',
    titleSa: 'वटवृक्षस्य अधः · वयं सर्वे एकाः',
    elementHighlight: 'सनातनधर्मः · All Are One In Nature & Spirit',
    icon: '🎉',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #9d174d 60%, #be185d 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'The gentle night breeze rustled the leaves, whispering a sweet message to both children: "Vayaṁ sarve ekāḥ eva smaḥ" — We are all one. And under the big blue sky, Kalu and Isha rested peacefully, beloved children of Mother Nature.',
        textSa: 'मन्दः रात्रिवायुः पर्णानि अचालयत्, उभाभ्यां बालकाभ्यां मधुरं सन्देशम् अवदत्, "वयं सर्वे एकाः एव स्मः।" विशाले नीलाकाशे अधः कालुः ईशा च प्रकृतिमातुः प्रियशिशू शान्त्या अस्वपताम्।',
      },
    ],
    whisperFinale: {
      en: 'And the wind whispered, Whoosh! We are all one.',
      sa: 'वायुः च मन्दं अवदत्, शूँ! वयं सर्वे एकाः एव स्मः।',
    },
    endNote: {
      titleEn: 'A Little Secret About Their Names',
      en: 'Kalu is named after Mahākāla (Mahakaal), great Lord Śiva. And so is Isha! Īśa means “the Lord,” and Īśā is His shining Śakti. Śiva and Śakti are One and the Same, just like Kalu and Isha!',
      sa: 'कालुः महाकालस्य नाम्ना। ईशा अपि तथैव। शिवः शक्तिः च एकः एव।',
    },
  },
];

type ClusterCategory = 'all' | 'creative' | 'nature' | 'gurukul';
type WonderLevelTier = 'preschool' | 'next' | 'all';

interface ActivityItem {
  id: PreschoolTab;
  labelSa: string;
  labelEn: string;
  icon: string;
  level?: 'preschool' | 'next';
  cluster: 'creative' | 'nature' | 'gurukul';
  clusterLabel: string;
  gradeBadge: string;
  desc: string;
  features: string[];
  bannerGradient: string;
  accentColor: string;
  bannerVisual: {
    image?: string;
    imageAlt?: string;
    emojiLead: string;
    decorEmojis: string[];
    taglineSa: string;
  };
}

interface FestivalItem { id: string; dev: string; iast: string; en: string; emoji: string; bg: string; when: string; fact: string; symbols?: string; symbolNote?: string; img?: string; }

const FESTIVALS: FestivalItem[] = [
  { id: 'deepavali', img: '/preschool/festivals/diwali.webp', dev: 'दीपावली', iast: 'dīpāvalī', en: 'Diwali', emoji: '🪔', bg: '#fef3c7', when: 'Autumn · Kārttika new moon', fact: 'Dīpāvalī means "a row of lamps". We light little diyas to welcome Śrī Rāma home!', symbols: '🪔 🎆 🧨', symbolNote: 'Diyas, firecrackers & sparklers light up the night sky!' },
  { id: 'holi', img: '/preschool/festivals/holi.webp', dev: 'होली', iast: 'holī', en: 'Holi', emoji: '🎨', bg: '#fce7f3', when: 'Spring · Phālguna full moon', fact: 'The festival of colours! We splash happy colours to welcome spring.', symbols: '🎨 🔫💦 🌈', symbolNote: 'Pichkārī water squirters splash coloured water on friends!' },
  { id: 'navaratri', img: '/preschool/festivals/navaratri.webp', dev: 'नवरात्रिः', iast: 'navarātriḥ', en: 'Navarātri', emoji: '💃', bg: '#ede9fe', when: 'Autumn · nine nights', fact: 'Nava means nine, rātri means night — nine nights for Devī Durgā, with garba dance!', symbols: '💃 🥢 🔱', symbolNote: 'Dāṇḍiyā sticks and garba dance for Devī Durgā!' },
  { id: 'sankranti', img: '/preschool/festivals/sankranti.webp', dev: 'मकरसङ्क्रान्तिः', iast: 'makarasaṅkrāntiḥ', en: 'Makara Saṅkrānti', emoji: '🪁', bg: '#dbeafe', when: 'Mid-January', fact: 'The Sun (Sūrya) moves into Makara. We fly kites and share sweet til-gud!', symbols: '☀️ 🪁 🍬', symbolNote: 'Sūrya Deva begins his northward journey — kites fly to greet him!' },
  { id: 'pongal', img: '/preschool/festivals/pongal.webp', dev: 'पोङ्गल्', iast: 'poṅgal', en: 'Pongal', emoji: '🍚', bg: '#fef9c3', when: 'Mid-January · Tamil Nadu', fact: 'A harvest thank-you! Sweet rice boils over the pot — "Pongalo Pongal!"', symbols: '🍚 🐂 🌾', symbolNote: 'Jallikaṭṭu: brave youths hug the hump of the strong bulls, and cows are thanked on Māṭṭu Pongal!' },
  { id: 'onam', img: '/preschool/festivals/onam.webp', dev: 'ओणम्', iast: 'oṇam', en: 'Onam', emoji: '🌼', bg: '#fef9c3', when: 'Late summer · Kerala', fact: 'Families make a flower rangoli (pūkkaḷam) to welcome kind King Mahābali.', symbols: '🌼 🚣 👑', symbolNote: 'Vaḷḷam-kaḷi: long snake boats race on Kerala\'s rivers!' },
  { id: 'gombe', img: '/preschool/festivals/gombe-habba.webp', dev: 'बोम्मलकोलुवु', iast: 'gombe habba', en: 'Dolls Festival', emoji: '🪆', bg: '#fdf2f8', when: 'Autumn · during Navarātri', fact: 'Families arrange rows of colourful dolls on steps and invite friends to see them!', symbols: '🪆 🎎 🪜', symbolNote: 'Doll steps with gods, kings, animals and village scenes!' },
  { id: 'ganesha', img: '/preschool/festivals/ganesha.webp', dev: 'गणेशचतुर्थी', iast: 'gaṇeśacaturthī', en: 'Gaṇeśa Caturthī', emoji: '🐘', bg: '#ffe4e6', when: 'Late summer · Bhādrapada', fact: 'Gaṇeśa\'s birthday! We share modakas — his favourite sweet.', symbols: '🐘 🏺 🍡 🟠 🐭', symbolNote: 'A clay Gaṇeśa mūrti, sweet modakas and laḍḍūs, and his little mouse friend Mūṣaka!' },
  { id: 'rakhi', img: '/preschool/festivals/raksha-bandhan.webp', dev: 'रक्षाबन्धनम्', iast: 'rakṣābandhanam', en: 'Rakṣā Bandhan', emoji: '🧵', bg: '#e0f2fe', when: 'Śrāvaṇa full moon', fact: 'Rakṣā means "protection". Sisters tie a rākhī on brothers\' wrists with love.', symbols: '🧵 🎁 🤝', symbolNote: 'A rākhī thread and a gift for a promise of care!' },
  { id: 'janmashtami', img: '/preschool/festivals/janmashtami.webp', dev: 'जन्माष्टमी', iast: 'janmāṣṭamī', en: 'Janmāṣṭamī', emoji: '🦚', bg: '#e0e7ff', when: 'Late summer · midnight', fact: 'Baby Kṛṣṇa\'s birthday! Children climb to break the butter pot (dahi-handi).', symbols: '🦚 🧈 🪈', symbolNote: 'Butter pot, peacock feather and Kṛṣṇa\'s flute!' },
];

const INSECTS: FestivalItem[] = [
  { id: 'butterfly', dev: 'चित्रपतङ्गः', iast: 'citrapataṅgaḥ', en: 'Butterfly', emoji: '🦋', bg: '#fce7f3', when: 'Flower gardens', fact: 'Starts as a tiny caterpillar, then grows pretty painted wings!' },
  { id: 'bee', dev: 'भ्रमरः (मधुमक्षिका)', iast: 'bhramaraḥ (madhumakṣikā)', en: 'Bee', emoji: '🐝', bg: '#fef9c3', when: 'Flowers & hives', fact: 'Bees buzz from flower to flower and make sweet honey (madhu)!' },
  { id: 'ant', dev: 'पिपीलिका', iast: 'pipīlikā', en: 'Ant', emoji: '🐜', bg: '#ffedd5', when: 'Under the ground', fact: 'Tiny but strong! An ant can carry things much heavier than itself.' },
  { id: 'firefly', img: '/preschool/bugs/firefly.svg', dev: 'खद्योतः', iast: 'khadyotaḥ', en: 'Firefly', emoji: '🪲', bg: '#e0e7ff', when: 'Summer nights', fact: 'Khadyota means "shining in the sky" — its tummy glows like a little lamp!' },
  { id: 'mosquito', dev: 'मशकः', iast: 'maśakaḥ', en: 'Mosquito', emoji: '🦟', bg: '#e0f2fe', when: 'Near still water', fact: 'Bzzz! Mosquitoes bite, so we use a net at bedtime.' },
  { id: 'fly', dev: 'मक्षिका', iast: 'makṣikā', en: 'Housefly', emoji: '🪰', bg: '#dcfce7', when: 'Around the house', fact: 'A fly has big eyes that see all around! Keep food covered.' },
  { id: 'ladybug', dev: 'इन्द्रगोपः', iast: 'indragopaḥ', en: 'Red Bug (Ladybird)', emoji: '🐞', bg: '#ffe4e6', when: 'Rainy grass', fact: 'Indragopa is a little red bug that pops out after the rains!' },
  { id: 'cricket', dev: 'झिल्ली', iast: 'jhillī', en: 'Cricket', emoji: '🦗', bg: '#ecfccb', when: 'Grass at night', fact: 'Chirp-chirp! Crickets sing by rubbing their wings.' },
  { id: 'spider', dev: 'ऊर्णनाभः', iast: 'ūrṇanābhaḥ', en: 'Spider (bug friend)', emoji: '🕷️', bg: '#f1f5f9', when: 'Corners & webs', fact: 'Ūrṇanābha means "thread from the belly" — it spins a web! (Spiders have 8 legs, so they are not true insects.)' },
];

const FLOWERS: FestivalItem[] = [
  { id: 'lotus', dev: 'कमलम्', iast: 'kamalam', en: 'Lotus', emoji: '🪷', bg: '#fce7f3', when: 'Ponds · Summer', fact: 'Devī Lakṣmī sits on a lotus, and it opens its petals when Sūrya rises!' },
  { id: 'jasmine', dev: 'मल्लिका', iast: 'mallikā', en: 'Jasmine', emoji: '🤍', bg: '#f8fafc', when: 'Gardens · Summer', fact: 'Tiny white jasmine smells so sweet — girls wear it in their hair!' },
  { id: 'rose', dev: 'पाटलम्', iast: 'pāṭalam', en: 'Rose', emoji: '🌹', bg: '#ffe4e6', when: 'Gardens · Winter', fact: 'Roses are soft and pink-red, but watch out for the prickly thorns!' },
  { id: 'hibiscus', dev: 'जपाकुसुमम्', iast: 'japākusumam', en: 'Hibiscus', emoji: '🌺', bg: '#fee2e2', when: 'Bushes · All year', fact: 'Bright red japā flowers are offered to Gaṇeśa and Devī.' },
  { id: 'champak', dev: 'चम्पकम्', iast: 'campakam', en: 'Champak', emoji: '🌼', bg: '#fef9c3', when: 'Tall trees · Summer', fact: 'Golden campaka flowers smell lovely all through the evening.' },
  { id: 'sunflower', dev: 'सूर्यमुखी', iast: 'sūryamukhī', en: 'Sunflower', emoji: '🌻', bg: '#fef3c7', when: 'Fields · Summer', fact: 'Sūryamukhī means "Sun-face" — it turns to look at the Sun!' },
  { id: 'bluelily', dev: 'नीलोत्पलम्', iast: 'nīlotpalam', en: 'Blue Water Lily', emoji: '💙', bg: '#dbeafe', when: 'Lakes · Monsoon', fact: 'The blue lily floats on water like a little blue star.' },
  { id: 'kunda', dev: 'कुन्दम्', iast: 'kundam', en: 'Star Jasmine', emoji: '⚪', bg: '#f1f5f9', when: 'Creepers · Winter', fact: 'Kunda flowers are so white that poets compare smiles to them!' },
  { id: 'parijata', dev: 'पारिजातः', iast: 'pārijātaḥ', en: 'Night Jasmine', emoji: '✨', bg: '#ffedd5', when: 'Trees · Autumn nights', fact: 'Pārijāta came from the heavens! Its flowers fall softly at dawn.' },
  { id: 'marigold', dev: 'स्थलपद्मम्', iast: 'sthalapadmam', en: 'Marigold', emoji: '🧡', bg: '#fed7aa', when: 'Gardens · Festivals', fact: 'Orange marigold garlands decorate homes for every festival.' },
];

const BIRDS: FestivalItem[] = [
  { id: 'parrot', dev: 'शुकः', iast: 'śukaḥ', en: 'Parrot', emoji: '🦜', bg: '#dcfce7', when: 'Fruit trees', fact: 'Green parrots can copy words! Sage Śuka was named like this bird.' },
  { id: 'swan', dev: 'हंसः', iast: 'haṁsaḥ', en: 'Swan', emoji: '🦢', bg: '#f8fafc', when: 'Lakes', fact: 'The white haṁsa is the vāhana of Devī Sarasvatī.' },
  { id: 'eagle', dev: 'गरुडः', iast: 'garuḍaḥ', en: 'Eagle (Garuḍa)', emoji: '🦅', bg: '#fef3c7', when: 'High in the sky', fact: 'Mighty Garuḍa carries Lord Viṣṇu. Eagles see far, far away!' },
  { id: 'owl', dev: 'उलूकः', iast: 'ulūkaḥ', en: 'Owl', emoji: '🦉', bg: '#ede9fe', when: 'Night trees', fact: 'Owls are awake at night. The owl is Devī Lakṣmī’s vāhana!' },
  { id: 'cuckoo', img: '/preschool/birds/cuckoo.svg', dev: 'कोकिलः', iast: 'kokilaḥ', en: 'Cuckoo (Koel)', emoji: '🐦', bg: '#e0f2fe', when: 'Mango trees in spring', fact: 'Kuhu-kuhu! The koel sings the sweetest song in spring.' },
  { id: 'pigeon', dev: 'कपोतः', iast: 'kapotaḥ', en: 'Pigeon / Dove', emoji: '🕊️', bg: '#f1f5f9', when: 'Rooftops', fact: 'Coo-coo! Pigeons always find their way home.' },
  { id: 'sparrow', img: '/preschool/birds/sparrow.svg', dev: 'चटकः', iast: 'caṭakaḥ', en: 'Sparrow', emoji: '🐤', bg: '#ffedd5', when: 'Near our homes', fact: 'Little chirpy sparrows love grains — put out water for them!' },
  { id: 'hen', dev: 'कुक्कुटः', iast: 'kukkuṭaḥ', en: 'Rooster', emoji: '🐓', bg: '#ffe4e6', when: 'Farms', fact: 'Cock-a-doodle-doo! The rooster wakes everyone at sunrise.' },
  { id: 'crane', dev: 'बकः', iast: 'bakaḥ', en: 'Crane / Heron', emoji: '🪿', bg: '#dbeafe', when: 'Ponds', fact: 'Stands on one leg very still, waiting to catch a fish!' },
];

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'varnamala',
    labelSa: 'वर्णमाला',
    labelEn: 'Varṇamālā: Letter Garden',
    icon: '🔤',
    cluster: 'creative',
    clusterLabel: 'रचना · Creative Play',
    gradeBadge: 'Ages 3–6 · Letters & Swaras',
    desc: 'Play “Sound and picture”: match friendly animals and objects (अश्वः 🐴, आम्रम् 🥭, कमलम् 🪷, गजः 🐘) to their initial Sanskrit sound!',
    features: ['🔊🖼️ “Sound & Picture” Phonics Match', '🔊 Letter & Animal Audio', '🎯 Find-the-Letter Game', '🚂 Alphabet Sing-Along Train'],
    bannerGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%)',
    accentColor: '#a855f7',
    bannerVisual: {
      image: '/images/sanskrit-devanagari-emblem-opt.jpg',
      imageAlt: 'वर्णमाला · Sanskrit Alphabet Letter Garden',
      emojiLead: '🔤',
      decorEmojis: ['🐴', '🥭', '🪷', '🐘', '🚂', '⭐'],
      taglineSa: 'अ आ इ ई उ ऊ ऋ ... क ख ग घ ङ',
    },
  },
  {
    id: 'shapes',
    labelSa: 'आकाराः',
    labelEn: 'Shapes & Indian Geometry',
    icon: '🎨',
    cluster: 'creative',
    clusterLabel: 'रचना · Creative Play',
    gradeBadge: 'Ages 2–6 · Shapes & ज्यामिति',
    desc: 'Tap a shape. Hear its Sanskrit name! Discover ज्यामिति (Jyāmiti) Earth-measurement.',
    features: ['🔊 Sanskrit Audio', '📐 ज्यामिति Jyāmiti Note', '⭐ Shape Quiz'],
    bannerGradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    accentColor: '#f59e0b',
    bannerVisual: {
      image: '/images/jyamiti-shapes.webp',
      imageAlt: 'आकाराः · Sacred & Everyday Shapes | Shapes & Forms under the Gurukul Tree',
      emojiLead: '📐',
      decorEmojis: ['🔴', '🟩', '🔺', '⭐', '🥚', '🌙'],
      taglineSa: 'वृत्त-चतुरस्र-त्रिकोण-तारकाः',
    },
  },
  {
    id: 'colors',
    labelSa: 'वर्ण-मेलनम्',
    labelEn: 'Color Magic Cauldron',
    icon: '🧪',
    cluster: 'creative',
    clusterLabel: 'रचना · Creative Play',
    gradeBadge: 'Ages 2–6 · Colors',
    desc: 'Mix two colors. See a new one appear!',
    features: ['🔊 Sanskrit Audio', '🧪 Magic Mixer', '🌈 8 Pure Hues'],
    bannerGradient: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    accentColor: '#ec4899',
    bannerVisual: {
      image: '/images/varna-colour-mother-child.jpg',
      imageAlt: 'वर्ण-मेलनम् · Colour Magic Cauldron',
      emojiLead: '🧪',
      decorEmojis: ['🫧', '🍎', '🍌', '🦚', '🪔', '✨'],
      taglineSa: 'रक्त-पीत-नील-वर्ण-मेलनम्',
    },
  },
  {
    id: 'fruits',
    labelSa: 'फल-सङ्ग्रहः',
    labelEn: 'Orchard Fruit Picker',
    icon: '🍎',
    cluster: 'creative',
    clusterLabel: 'रचना · Creative Play',
    gradeBadge: 'Ages 2–6 · Fruits',
    desc: 'Pick fruits from the tree into your basket.',
    features: ['🔊 Sanskrit Audio', '🧺 Fruit Basket', '🍎 8 Sweet Fruits'],
    bannerGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    accentColor: '#10b981',
    bannerVisual: {
      emojiLead: '🌳',
      decorEmojis: ['🥭', '🍎', '🍌', '🍇', '🍓', '🧺'],
      taglineSa: 'आम्र-कदली-सेव-द्राक्षाफलानि',
    },
  },
  {
    id: 'animals',
    labelSa: 'पशु-ध्वनयः',
    labelEn: 'Animal Safari & Sounds',
    icon: '🐮',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 2–6 · Animals',
    desc: 'Tap 15 animals to hear real synthesized roars, trumpets, croaks & calls!',
    features: ['🔊 15 Real Calls', '🐾 Habitat Packs', '👂 Sound Safari'],
    bannerGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    accentColor: '#f97316',
    bannerVisual: {
      image: '/images/jungle-council/page-01.jpg',
      imageAlt: 'पशु-ध्वनयः · Animal Safari & Sounds',
      emojiLead: '🐮',
      decorEmojis: ['🦁', '🐘', '🦚', '🐭', '🐸', '🎵'],
      taglineSa: 'पशु-पक्षिणां मधुरध्वनयः',
    },
  },
  {
    id: 'bharat',
    labelSa: 'भारत-मानचित्रम्',
    labelEn: 'Living Map of India',
    icon: '🗺️',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 3–6 · Living Map',
    desc: 'Touch & hear animals, rivers, mountains & forests across Bhārata!',
    features: ['🧭 Explore & Quest', '🗺️ 22 Wonders', '🔊 Real Nature Sounds'],
    bannerGradient: 'linear-gradient(135deg, #38bdf8 0%, #4ade80 55%, #facc15 100%)',
    accentColor: '#0284c7',
    bannerVisual: {
      image: '/preschool/india/india-map.svg',
      imageAlt: 'भारत-मानचित्रम् · Living Map of India',
      emojiLead: '🗺️',
      decorEmojis: ['🏔️', '🌊', '🦁', '🐅', '🐘', '🐪'],
      taglineSa: 'भारतं मम देशः',
    },
  },
  {
    id: 'vishva',
    labelSa: 'विश्व-नामानि',
    labelEn: 'Oceans & Lands',
    icon: '🌏',
    level: 'next',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Read & match 3 Seas of India, 7 World Oceans & ancient Sanskrit lands!',
    features: ['🔊 Sanskrit Audio', '🌊 4 Chapter Packs', '📜 Ancient & New'],
    bannerGradient: 'linear-gradient(135deg, #7dd3fc 0%, #c4b5fd 100%)',
    accentColor: '#38bdf8',
    bannerVisual: {
      emojiLead: '🌏',
      decorEmojis: ['🌊', '🐋', '🏝️', '🏛️', '🐧', '✨'],
      taglineSa: 'वसुधैव कुटुम्बकम्',
    },
  },
  {
    id: 'yoga',
    labelSa: 'योगासनानि',
    labelEn: 'Yoga Pose Match',
    icon: '🧘',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 2–6 · Yoga',
    desc: 'Hold poses with the 5-second breathing timer or play 4-Pose Quest!',
    features: ['🧘 5s Pose Timer', '🎯 4-Pose Quest', '🔊 10 Āsanas'],
    bannerGradient: 'linear-gradient(135deg, #c4b5fd 0%, #86efac 100%)',
    accentColor: '#a78bfa',
    bannerVisual: {
      image: '/preschool/yoga/padma.webp',
      imageAlt: 'योगासनानि · Yoga Pose Match',
      emojiLead: '🧘',
      decorEmojis: ['🌳', '🐍', '🪷', '⛰️', '🦋', '🐱'],
      taglineSa: 'योगः कर्मसु कौशलम्',
    },
  },
  {
    id: 'festivals',
    labelSa: 'उत्सवाः',
    labelEn: 'Indian Festivals & Match',
    icon: '🪔',
    level: 'next',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Explore 10 classical Indian festivals, lunar dates & read-and-match challenges!',
    features: ['🔊 Sanskrit Audio', '🪔 10 Festivals', '🧩 Reading Match'],
    bannerGradient: 'linear-gradient(135deg, #f472b6 0%, #60a5fa 100%)',
    accentColor: '#f472b6',
    bannerVisual: {
      emojiLead: '🪔',
      decorEmojis: ['🎨', '🪁', '🌼', '💃', '🐘', '✨'],
      taglineSa: 'उत्सवाः आनन्दाय',
    },
  },
  {
    id: 'insects', labelSa: 'कीटाः', labelEn: 'Bug Garden', icon: '🦋', cluster: 'nature', clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 2–5 · Insects', desc: 'Hear buzzing bees & glowing fireflies, play Picture Quest or Memory Flip!',
    features: ['🔊 Bug Sounds', '🎯 Picture Quest', '🃏 Memory Flip'],
    bannerGradient: 'linear-gradient(135deg, #86efac 0%, #fde68a 100%)', accentColor: '#4ade80',
    bannerVisual: { emojiLead: '🦋', decorEmojis: ['🐝', '🐜', '🐞', '🦗', '✨', '🌼'], taglineSa: 'लघवः कीटाः' },
  },
  {
    id: 'birds', labelSa: 'पक्षिणः', labelEn: 'Bird Sky', icon: '🦜', cluster: 'nature', clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 2–5 · Birds', desc: 'Hear singing koels, owls & roosters, play Bird Quest or Memory Flip!',
    features: ['🔊 Bird Songs', '🎯 Picture Quest', '🃏 Memory Flip'],
    bannerGradient: 'linear-gradient(135deg, #93c5fd 0%, #c4b5fd 100%)', accentColor: '#60a5fa',
    bannerVisual: { emojiLead: '🦜', decorEmojis: ['🦢', '🦉', '🦅', '🕊️', '🐓', '☁️'], taglineSa: 'पक्षिणः उड्डयन्ते' },
  },
  {
    id: 'flowers', labelSa: 'पुष्पाणि', labelEn: '10 Classical Flowers', icon: '🌸', level: 'next', cluster: 'nature', clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: '🚀 Next Level · Ages 6–10', desc: 'Discover 10 poetic Sanskrit blossoms (Nīlotpalam, Pārijātaḥ, Kundam & more)!',
    features: ['🔊 Harp Chimes', '🎯 Picture Quest', '🃏 Memory Flip'],
    bannerGradient: 'linear-gradient(135deg, #f9a8d4 0%, #fde68a 100%)', accentColor: '#f472b6',
    bannerVisual: { emojiLead: '🌸', decorEmojis: ['🪷', '🌹', '🌺', '🌻', '🌼', '🦋'], taglineSa: 'पुष्पाणि विकसन्ति' },
  },
  {
    id: 'moon',
    labelSa: 'चन्द्र-कलाः',
    labelEn: 'Moon Phases & Tithis',
    icon: '🌙',
    level: 'next',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Explore Amāvāsyā to Pūrṇimā lunar tithis as the moon waxes full!',
    features: ['🔊 Lullaby Chime', '🌙 5 Lunar Tithis', '✨ Twinkling Stars'],
    bannerGradient: 'linear-gradient(135deg, #3b82f6 0%, #1e1b4b 100%)',
    accentColor: '#38bdf8',
    bannerVisual: {
      emojiLead: '🌙',
      decorEmojis: ['✨', '🌑', '🌓', '🌕', '☁️', '💤'],
      taglineSa: 'अमावास्या-पूर्णिमान्त-चन्द्रकलाः',
    },
  },
  {
    id: 'day',
    labelSa: 'दिन-भागाः',
    labelEn: 'Day Routine & Sun',
    icon: '🌅',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: 'Ages 2–5 · My Day',
    desc: 'Tap morning, noon, evening or night.',
    features: ['🔊 Sanskrit Audio', '☀️ Moving Sun', '🌅 4 Day Quarters'],
    bannerGradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    accentColor: '#f59e0b',
    bannerVisual: {
      emojiLead: '🌅',
      decorEmojis: ['☀️', '🌤️', '🌇', '🌌', '🐓', '🪔'],
      taglineSa: 'प्रातः-मध्याह्न-सायं-दिनचर्या',
    },
  },
  {
    id: 'seasons',
    labelSa: 'ऋतवः',
    labelEn: '6 Seasons & Months',
    icon: '🌸',
    level: 'next',
    cluster: 'nature',
    clusterLabel: 'प्रकृति · Living Nature',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Discover all 6 classical Indian Ṛtus (Vasanta to Śiśira) & weather!',
    features: ['🔊 Sanskrit Audio', '🌧️ Falling Weather', '🌸 6 Classical Ṛtus'],
    bannerGradient: 'linear-gradient(135deg, #06b6d4 0%, #10b981 100%)',
    accentColor: '#06b6d4',
    bannerVisual: {
      emojiLead: '🌸',
      decorEmojis: ['☀️', '🌧️', '🍂', '❄️', '🌈', '🌾'],
      taglineSa: 'वसन्त-ग्रीष्म-वर्षा-ऋतवः',
    },
  },
  {
    id: 'spices', labelSa: 'उपस्कराः', labelEn: 'Spice Aroma Adventure', icon: '🌶️', cluster: 'gurukul', clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: 'Ages 2–6 · Spices Deck', desc: 'Learn 12 fragrant kitchen spices with interactive flashcards, sizzle pot & 4-picture quest!',
    features: ['🃏 12 Flashcards', '🍲 Amma\'s Kadai', '🎯 4-Picture Quest'],
    bannerGradient: 'linear-gradient(135deg, #fde68a 0%, #fecaca 100%)', accentColor: '#ea580c',
    bannerVisual: {
      image: '/preschool/spices/cover.webp',
      imageAlt: 'The Spice Adventure · उपस्कराः',
      emojiLead: '🌶️',
      decorEmojis: ['🫚', '🧄', '🌿', '🟡', '⚫', '🟤'],
      taglineSa: 'पाकशालायाः सुगन्धः',
    },
  },
  {
    id: 'months', labelSa: 'मासाः', labelEn: '12 Lunar Months', icon: '🗓️', level: 'next', cluster: 'gurukul', clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10', desc: 'Explore all 12 Sanskrit lunar months (Caitra–Phālguna) across 6 Ṛtus!',
    features: ['🌸 6 Ṛtu Badges', '🎯 4-Picture Quest', '🗓️ 12 Months'],
    bannerGradient: 'linear-gradient(135deg, #bae6fd 0%, #fbcfe8 100%)', accentColor: '#0ea5e9',
    bannerVisual: { emojiLead: '🗓️', decorEmojis: ['🌸', '☀️', '🌧️', '🪔', '❄️', '🎨'], taglineSa: 'द्वादश मासाः' },
  },
  {
    id: 'work', labelSa: 'व्यवसायाः', labelEn: 'Trades & Professions', icon: '🧑‍🌾', level: 'next', cluster: 'gurukul', clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10', desc: 'Discover 12 Sanskrit trades & professions (Kṛṣiḥ, Vāṇijyam, Śilpam & more)!',
    features: ['🧑‍🌾 12 Vocations', '🎯 4-Picture Quest', '🧩 Cozy Packs'],
    bannerGradient: 'linear-gradient(135deg, #d9f99d 0%, #c7d2fe 100%)', accentColor: '#65a30d',
    bannerVisual: { emojiLead: '🧑‍🌾', decorEmojis: ['💂', '👩‍🏫', '🩺', '🎶', '🎣', '🍳'], taglineSa: 'कर्म एव पूजा' },
  },
  {
    id: 'actions', labelSa: 'क्रियाः', labelEn: 'Action Words', icon: '🏃', cluster: 'gurukul', clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: 'Ages 2–5 · Actions', desc: 'Play “Ācārya Says!” movement game & 4-Picture Action Quest!',
    features: ['🎬 Ācārya Says!', '🎯 4-Action Quest', '🏃 12 Verbs'],
    bannerGradient: 'linear-gradient(135deg, #bbf7d0 0%, #fde68a 100%)', accentColor: '#22c55e',
    bannerVisual: { emojiLead: '🏃', decorEmojis: ['🧘', '🤾', '🏊', '🤸', '🚶', '😴'], taglineSa: 'वयं क्रीडामः' },
  },
  {
    id: 'relations', labelSa: 'परिवारः', labelEn: 'Kinship & 5-Script Cognates', icon: '👪', level: 'next', cluster: 'gurukul', clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10', desc: '3-generation Sanskrit kinship words paired with Tamil, Malayalam, Telugu & Kannada!',
    features: ['👪 12 Kinship Terms', '🎯 4-Picture Quest', '🗣️ 5 Indian Scripts'],
    bannerGradient: 'linear-gradient(135deg, #fbcfe8 0%, #bfdbfe 100%)', accentColor: '#f472b6',
    bannerVisual: { emojiLead: '👪', decorEmojis: ['👩', '👨', '👦', '👧', '👴', '🤝'], taglineSa: 'मम परिवारः' },
  },
  {
    id: 'counting',
    labelSa: 'संख्या-गणनम्',
    labelEn: 'Count 1 to 10',
    icon: '🔢',
    cluster: 'gurukul',
    clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: 'Ages 2–5 · Counting',
    desc: 'Count 1 to 10 in Sanskrit with puppies, stars, mangoes & bees!',
    features: ['🔊 Pronunciation', '🔢 Step Navigation', '🐶 Friendly Icons'],
    bannerGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
    accentColor: '#818cf8',
    bannerVisual: {
      emojiLead: '🔢',
      decorEmojis: ['१', '२', '३', '४', '५', '🐶'],
      taglineSa: 'एकं द्वे त्रीणि चत्वारि पञ्च',
    },
  },
  {
    id: 'instruments',
    labelSa: 'वाद्य-ध्वनिः',
    labelEn: 'Sacred Bells & Beats',
    icon: '🔔',
    cluster: 'gurukul',
    clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: 'Ages 2–5 · Music',
    desc: 'Tap an instrument. Hear it play!',
    features: ['🔊 Real Synthesizers', '🪘 6 Instruments', '🎶 Pulse Rings'],
    bannerGradient: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
    accentColor: '#fbbf24',
    bannerVisual: {
      emojiLead: '🔔',
      decorEmojis: ['🪘', '🐚', '🪕', '🎶', '🥁', '✨'],
      taglineSa: 'घण्टा-डमरु-शङ्ख-मृदङ्ग-नादः',
    },
  },
  {
    id: 'vahanas',
    labelSa: 'देव-वाहनानि',
    labelEn: 'Match Divine Vāhanas',
    icon: '🦚',
    level: 'next',
    cluster: 'gurukul',
    clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Read & match 8 deities to their sacred animal carriers & Sanskrit epithets!',
    features: ['🔊 Sanskrit Audio', '🧩 Easy 4 & All 8', '✨ Blessing Quotes'],
    bannerGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    accentColor: '#a78bfa',
    bannerVisual: {
      emojiLead: '🦚',
      decorEmojis: ['🐭', '🐂', '🦢', '🦁', '🦉', '🧩'],
      taglineSa: 'देवतानां प्रिय-पशुवाहनानि',
    },
  },
  {
    id: 'jungle',
    labelSa: 'वनसभा',
    labelEn: 'Pañcatantra Fable & Quiz',
    icon: '🦁',
    level: 'next',
    cluster: 'gurukul',
    clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Read full Sanskrit sentences in the Jungle Council fable & solve the 9-question quiz!',
    features: ['📖 Sanskrit Sentences', '🧠 9-Question Quiz', '📜 Pañcatantra Lore'],
    bannerGradient: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
    accentColor: '#fbbf24',
    bannerVisual: {
      emojiLead: '🦁',
      decorEmojis: ['🐘', '🦊', '🐦‍⬛', '🐭', '🐊', '🤝'],
      taglineSa: 'सङ्घे शक्तिः · बाल-कथा',
    },
  },
  {
    id: 'story',
    labelSa: '५ मित्राणि',
    labelEn: '5 Elements (Pañcabhūtas) Story',
    icon: '📖',
    level: 'next',
    cluster: 'gurukul',
    clusterLabel: 'गुरुकुल · Gurukul Wonder',
    gradeBadge: '🚀 Next Level · Ages 6–10',
    desc: 'Read & listen to Kalu and Isha’s philosophical story of the 5 Cosmic Elements.',
    features: ['🔊 Audio Playback', '📖 8 Story Slides', '🌱 Pañcabhūtas'],
    bannerGradient: 'linear-gradient(135deg, #059669 0%, #065f46 100%)',
    accentColor: '#34d399',
    bannerVisual: {
      emojiLead: '📖',
      decorEmojis: ['🌿', '🔥', '💧', '💨', '🌍', '🤝'],
      taglineSa: 'पञ्चमित्राणां नृत्यम् · बाल-कथा',
    },
  },
];


const DaySkyArt: React.FC<{ d: DaySection }> = ({ d }) => {
  const night = d.id === 'ratri';
  const dawn = d.id === 'prabhata';
  const dusk = d.id === 'sayangkala';
  return (
    <div className="psw-dsky-art" aria-hidden="true">
      {night && Array.from({ length: 18 }, (_, i) => (
        <span key={i} className="psw-dsky-star" style={{ left: `${(i * 37) % 96 + 2}%`, top: `${(i * 23) % 55 + 4}%`, animationDelay: `${(i % 6) * 0.4}s` }}>✦</span>
      ))}
      {!night && [0, 1, 2].map((i) => (
        <svg key={i} className="psw-dsky-cloud" viewBox="0 0 80 40" style={{ top: `${10 + i * 16}%`, animationDuration: `${26 + i * 8}s`, animationDelay: `${-i * 9}s` }}>
          <g fill="#fff" opacity="0.9"><circle cx="22" cy="24" r="12" /><circle cx="40" cy="18" r="16" /><circle cx="58" cy="25" r="11" /><rect x="14" y="24" width="52" height="12" rx="6" /></g>
        </svg>
      ))}
      {(dawn || dusk) && [0, 1, 2].map((i) => (
        <svg key={i} className="psw-dsky-bird" viewBox="0 0 24 10" style={{ top: `${22 + i * 7}%`, animationDelay: `${i * 1.3}s` }}>
          <path d="M1 6 Q6 0 12 6 Q18 0 23 6" stroke="#475569" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      ))}
      <div className={`psw-dsky-orb ${night ? 'is-moon' : 'is-sun'}`} style={{ left: `${d.sunPos.x}%`, top: `${d.sunPos.y}%` }}>
        {night ? (
          <svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="22" fill="#fef9c3" /><circle cx="42" cy="26" r="20" fill="#312e81" opacity="0.0" /><circle cx="24" cy="26" r="3" fill="#fde68a" /><circle cx="36" cy="40" r="4" fill="#fde68a" /><circle cx="26" cy="30" r="1.6" fill="#78716c" /><circle cx="38" cy="30" r="1.6" fill="#78716c" /><path d="M26 38 Q32 42 38 38" stroke="#78716c" strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
        ) : (
          <svg viewBox="0 0 64 64">
            <g className="psw-dsky-rays" stroke={dusk ? '#fb923c' : '#facc15'} strokeWidth="3" strokeLinecap="round">
              {Array.from({ length: 12 }, (_, i) => { const a = (i * Math.PI) / 6; return <line key={i} x1={32 + Math.cos(a) * 22} y1={32 + Math.sin(a) * 22} x2={32 + Math.cos(a) * 30} y2={32 + Math.sin(a) * 30} />; })}
            </g>
            <circle cx="32" cy="32" r="17" fill={dusk ? '#fdba74' : '#fde047'} />
            <circle cx="26" cy="30" r="1.8" fill="#92400e" /><circle cx="38" cy="30" r="1.8" fill="#92400e" />
            <path d="M25 36 Q32 42 39 36" stroke="#92400e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <circle cx="22" cy="35" r="2.5" fill="#fb7185" opacity="0.5" /><circle cx="42" cy="35" r="2.5" fill="#fb7185" opacity="0.5" />
          </svg>
        )}
      </div>
    </div>
  );
};


const SEASON_SCENE_CAPTION: Record<string, string> = {
  vasanta: '🦚 मयूरः नृत्यति · The peacock dances!',
  grishma: '🥭 आम्राणि आगच्छन्ति · Mangoes are here!',
  varsha: '🌊 नद्यः पूर्णाः · Rivers fill and flood!',
  sharad: '🐂 शकटानि धान्यपूर्णानि · Bullock carts full of food!',
  hemanta: '🍂 नीहार-प्रभातः · Cozy misty dew mornings!',
  shishira: '🏔️ हिमालयः हिमेन शुभ्रः · Snow-capped Himālaya!',
};
const SeasonScene: React.FC<{ id: string }> = ({ id }) => {
  const sky = { vasanta: '#fce7f3', grishma: '#fef3c7', varsha: '#cbd5e1', sharad: '#e0f2fe', hemanta: '#ffedd5', shishira: '#e0e7ff' }[id] ?? '#f1f5f9';
  return (
    <svg className={`psw-sscene psw-sscene-${id}`} viewBox="0 0 200 160" role="img" aria-label={SEASON_SCENE_CAPTION[id] ?? id}>
      <rect width="200" height="160" rx="24" fill={sky} />
      {id === 'vasanta' && (<g>
        <rect y="122" width="200" height="38" fill="#bbf7d0" />
        {[20, 170, 40, 155].map((x, i) => <circle key={i} cx={x} cy={128 + (i % 2) * 10} r="5" fill={['#f472b6', '#facc15', '#c084fc', '#fb7185'][i]} />)}
        <g className="psw-ss-tail">
          {Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (1 + i / 8); return (<g key={i}><line x1="100" y1="110" x2={100 + Math.cos(a) * 70} y2={110 + Math.sin(a) * 70} stroke="#16a34a" strokeWidth="3" /><circle cx={100 + Math.cos(a) * 68} cy={110 + Math.sin(a) * 68} r="9" fill="#22c55e" /><circle cx={100 + Math.cos(a) * 68} cy={110 + Math.sin(a) * 68} r="5" fill="#1d4ed8" /><circle cx={100 + Math.cos(a) * 68} cy={110 + Math.sin(a) * 68} r="2" fill="#facc15" /></g>); })}
        </g>
        <g className="psw-ss-bob"><ellipse cx="100" cy="108" rx="13" ry="18" fill="#2563eb" /><path d="M100 92 Q96 76 102 66" stroke="#2563eb" strokeWidth="7" fill="none" strokeLinecap="round" /><circle cx="103" cy="64" r="7" fill="#2563eb" /><circle cx="105" cy="62" r="1.5" fill="#fff" /><path d="M109 64 L115 66 L109 67Z" fill="#f59e0b" /><path d="M102 57 l-2 -8 M104 57 l2 -8 M106 57 l5 -6" stroke="#1e3a8a" strokeWidth="1.2" /><line x1="95" y1="125" x2="93" y2="134" stroke="#a16207" strokeWidth="2" /><line x1="105" y1="125" x2="107" y2="134" stroke="#a16207" strokeWidth="2" /></g>
      </g>)}
      {id === 'grishma' && (<g>
        <circle className="psw-ss-spin" cx="168" cy="28" r="14" fill="#fde047" />
        <rect y="130" width="200" height="30" fill="#d9f99d" />
        <rect x="88" y="80" width="16" height="55" rx="4" fill="#a16207" />
        <ellipse cx="96" cy="66" rx="62" ry="40" fill="#4ade80" /><ellipse cx="70" cy="58" rx="28" ry="20" fill="#22c55e" /><ellipse cx="122" cy="60" rx="28" ry="20" fill="#22c55e" />
        {[[62, 80], [92, 88], [125, 82], [78, 54], [112, 50]].map(([x, y], i) => (<g key={i} className="psw-ss-sway" style={{ animationDelay: `${i * 0.3}s`, transformOrigin: `${x}px ${y - 8}px` }}><line x1={x} y1={y - 9} x2={x} y2={y - 4} stroke="#15803d" strokeWidth="1.5" /><ellipse cx={x} cy={y + 2} rx="7" ry="9" fill="#fbbf24" /><ellipse cx={x + 2} cy={y + 4} rx="3" ry="4" fill="#fb923c" opacity=".6" /></g>))}
        <g className="psw-ss-drop"><ellipse cx="150" cy="128" rx="8" ry="10" fill="#fbbf24" /><ellipse cx="38" cy="132" rx="7" ry="9" fill="#f59e0b" /></g>
      </g>)}
      {id === 'varsha' && (<g>
        <g fill="#94a3b8"><circle cx="50" cy="28" r="16" /><circle cx="72" cy="22" r="20" /><circle cx="95" cy="30" r="14" /><circle cx="140" cy="26" r="16" /><circle cx="162" cy="20" r="18" /></g>
        {Array.from({ length: 14 }, (_, i) => <line key={i} className="psw-ss-rain" style={{ animationDelay: `${(i % 5) * 0.2}s` }} x1={20 + i * 12} y1="48" x2={16 + i * 12} y2="58" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />)}
        <path d="M0 96 Q40 86 80 100 L80 160 L0 160Z" fill="#86efac" /><path d="M120 102 Q160 88 200 96 L200 160 L120 160Z" fill="#86efac" />
        <path className="psw-ss-wave" d="M-20 112 Q10 100 40 112 T100 112 T160 112 T220 112 L220 160 L-20 160Z" fill="#60a5fa" />
        <path className="psw-ss-wave2" d="M-20 126 Q10 116 40 126 T100 126 T160 126 T220 126 L220 160 L-20 160Z" fill="#3b82f6" opacity=".85" />
        <path className="psw-ss-boat" d="M86 116 L114 116 L108 124 L92 124Z" fill="#f97316" /><line x1="100" y1="116" x2="100" y2="102" stroke="#78350f" strokeWidth="1.5" /><path d="M100 103 L110 112 L100 112Z" fill="#fff" />
      </g>)}
      {id === 'sharad' && (<g>
        <rect y="112" width="200" height="48" fill="#fde68a" />
        {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${8 + i * 20} 112 q2 -16 6 -22 q-2 10 0 22`} fill="#eab308" />)}
        <g className="psw-ss-cart">
          <g><ellipse cx="44" cy="108" rx="18" ry="11" fill="#f8fafc" stroke="#cbd5e1" /><circle cx="26" cy="100" r="7" fill="#f8fafc" stroke="#cbd5e1" /><path d="M21 93 l-4 -5 M30 93 l3 -5" stroke="#78716c" strokeWidth="2" /><circle cx="24" cy="99" r="1.2" fill="#111" /><line x1="34" y1="117" x2="34" y2="128" stroke="#e2e8f0" strokeWidth="3" /><line x1="54" y1="117" x2="54" y2="128" stroke="#e2e8f0" strokeWidth="3" /></g>
          <line x1="58" y1="106" x2="78" y2="110" stroke="#78350f" strokeWidth="3" />
          <rect x="76" y="96" width="70" height="20" rx="3" fill="#b45309" />
          <ellipse cx="90" cy="92" rx="12" ry="9" fill="#f59e0b" /><ellipse cx="110" cy="88" rx="13" ry="11" fill="#facc15" /><ellipse cx="132" cy="92" rx="12" ry="9" fill="#fb923c" /><circle cx="100" cy="80" r="6" fill="#ef4444" /><circle cx="120" cy="79" r="6" fill="#84cc16" />
          <g className="psw-ss-wheel" style={{ transformOrigin: '94px 122px' }}><circle cx="94" cy="122" r="12" fill="none" stroke="#78350f" strokeWidth="3" /><line x1="82" y1="122" x2="106" y2="122" stroke="#78350f" strokeWidth="2" /><line x1="94" y1="110" x2="94" y2="134" stroke="#78350f" strokeWidth="2" /></g>
          <g className="psw-ss-wheel" style={{ transformOrigin: '130px 122px' }}><circle cx="130" cy="122" r="12" fill="none" stroke="#78350f" strokeWidth="3" /><line x1="118" y1="122" x2="142" y2="122" stroke="#78350f" strokeWidth="2" /><line x1="130" y1="110" x2="130" y2="134" stroke="#78350f" strokeWidth="2" /></g>
        </g>
      </g>)}
      {id === 'hemanta' && (<g>
        <circle cx="155" cy="36" r="18" fill="#fdba74" opacity="0.85" />
        <rect y="114" width="200" height="46" fill="#fed7aa" />
        <ellipse cx="55" cy="95" rx="68" ry="12" fill="#ffffff" opacity="0.65" />
        <ellipse cx="145" cy="82" rx="60" ry="10" fill="#ffffff" opacity="0.58" />
        {/* Cozy Gurukul Cottage with Warm Diya Glow */}
        <rect x="68" y="80" width="64" height="42" rx="5" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
        <polygon points="58,82 100,52 142,82" fill="#ea580c" stroke="#9a3412" strokeWidth="2" />
        <rect x="92" y="96" width="16" height="26" rx="4" fill="#92400e" />
        <circle cx="80" cy="98" r="5" fill="#fde047" />
        <circle cx="120" cy="98" r="5" fill="#fde047" />
        {[24, 42, 156, 174].map((x, i) => <circle key={i} cx={x} cy={126 + (i % 2) * 8} r="3" fill="#bae6fd" stroke="#38bdf8" strokeWidth="1" />)}
      </g>)}
      {id === 'shishira' && (<g>
        <polygon points="-10,130 50,40 110,130" fill="#a5b4fc" /><polygon points="30,70 50,40 70,70 60,64 50,72 40,64" fill="#fff" />
        <polygon points="60,130 130,22 200,130" fill="#818cf8" /><polygon points="106,58 130,22 154,58 142,52 130,62 118,52" fill="#fff" />
        <polygon points="140,130 185,60 230,130" fill="#a5b4fc" /><polygon points="170,84 185,60 200,84 192,79 185,86 178,79" fill="#fff" />
        <rect y="124" width="200" height="36" fill="#f8fafc" />
        {Array.from({ length: 14 }, (_, i) => <circle key={i} className="psw-ss-snow" style={{ animationDelay: `${(i % 7) * 0.5}s` }} cx={8 + i * 14} cy={10 + (i % 4) * 8} r="2.2" fill="#fff" />)}
      </g>)}
    </svg>
  );
};

const FEST_CLUES: Record<string, string> = {
  deepavali: 'Rows of little lamps 🪔', holi: 'Splashing colours 🎨', navaratri: 'Nine nights of dāṇḍiyā dance 💃',
  sankranti: 'Kites fly to greet Sūrya 🪁', pongal: 'Sweet rice boils over the pot 🍚', onam: 'Flower rangoli & snake boats 🌼',
  gombe: 'Dolls arranged on steps 🪆', ganesha: 'Clay Gaṇeśa & modakas 🐘', rakhi: 'A rākhī thread of love 🧵', janmashtami: 'Baby Kṛṣṇa, flute & butter 🦚',
};
const shuffleArr = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const FestivalMatchGame: React.FC<{ onEarnStar?: () => void }> = ({ onEarnStar }) => {
  const [packHalf, setPackHalf] = useState<0 | 1>(0);
  const slice = useMemo(() => (packHalf === 0 ? FESTIVALS.slice(0, 5) : FESTIVALS.slice(5, 10)), [packHalf]);
  const [round, setRound] = useState(0);
  const left = useMemo(() => shuffleArr(slice), [slice, round]);
  const right = useMemo(() => shuffleArr(slice), [slice, round]);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [msg, setMsg] = useState('Tap a Sanskrit festival name, then tap its matching picture!');
  const reset = (nextHalf?: 0 | 1) => {
    if (nextHalf !== undefined) setPackHalf(nextHalf);
    setRound((r) => r + 1); setPick(null); setDone([]); setWrong(null);
    setMsg('Tap a Sanskrit festival name, then its picture!');
  };
  const tapRight = (id: string) => {
    if (done.includes(id)) return;
    if (!pick) { setMsg('👈 First tap a festival name on the left, then tap its picture on the right!'); return; }
    if (pick === id) {
      const nd = [...done, id]; setDone(nd); setPick(null); soundEffects.playCelebrationChime(); onEarnStar?.();
      setMsg(nd.length === slice.length ? '🎉 शोभनम्! (śobhanam!) Pack matched!' : '✅ Correct match!');
    } else { setWrong(id); soundEffects.playPuzzleSnap(); setMsg('🙂 Not this one — try again!'); setTimeout(() => setWrong(null), 600); }
  };
  const box = (on: boolean, ok: boolean, bad: boolean, bg: string): React.CSSProperties => ({
    background: ok ? '#dcfce7' : bg, border: bad ? '3px solid #f87171' : on ? '3px solid #f472b6' : ok ? '2px solid #4ade80' : '2px solid #bfdbfe',
    borderRadius: 16, padding: 8, cursor: ok ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#1e293b', textAlign: 'left', opacity: ok ? 0.75 : 1, width: '100%',
  });
  return (
    <div style={{ marginTop: 20, background: '#fdf4ff', border: '2px dashed #c084fc', borderRadius: 20, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <h3 className="psw-section-heading" style={{ margin: 0 }}>🧩 <span lang="sa">उत्सव-मेलनम्</span> · Match the Festivals</h3>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button type="button" className={`bharat-pack-chip ${packHalf === 0 ? 'is-active' : ''}`} style={{ background: '#fef3c7', borderColor: packHalf === 0 ? '#ec4899' : '#cbd5e1' }} onClick={() => reset(0)}>🪔 Set 1 (5)</button>
          <button type="button" className={`bharat-pack-chip ${packHalf === 1 ? 'is-active' : ''}`} style={{ background: '#e0f2fe', borderColor: packHalf === 1 ? '#ec4899' : '#cbd5e1' }} onClick={() => reset(1)}>🌼 Set 2 (5)</button>
          <button type="button" className="psw-quiz-btn" onClick={() => reset()}>🔀 Shuffle</button>
        </div>
      </div>
      <p role="status" style={{ margin: '10px 0 12px', fontWeight: 700 }}>{msg} ⭐ {done.length}/{slice.length}</p>
      <div className="psw-two-col-match-grid" style={{ background: 'transparent', padding: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {left.map((f) => {
            const ok = done.includes(f.id);
            return (
              <button key={f.id} type="button" disabled={ok} onClick={() => { setPick(f.id); playPronunciation(f.dev); }} style={box(pick === f.id, ok, false, f.bg)}>
                <span><strong lang="sa" style={{ fontSize: 18 }}>{f.dev}</strong><br /><small style={{ fontStyle: 'italic', color: '#475569' }}>{f.iast}</small></span>
                <span style={{ marginLeft: 'auto' }}>{ok ? '✅' : pick === f.id ? '👉' : '🔊'}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {right.map((f) => {
            const ok = done.includes(f.id);
            return (
              <button key={f.id} type="button" disabled={ok} onClick={() => tapRight(f.id)} style={box(false, ok, wrong === f.id, '#fff')}>
                {f.img && <img src={f.img} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: 'contain', flexShrink: 0 }} />}
                <span style={{ fontSize: 14 }}>{FEST_CLUES[f.id]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface YogaPose { id: string; dev: string; iast: string; en: string; icon: string; clue: string; bg: string; }
const YOGA_POSES: YogaPose[] = [
  { id: 'vrksha', dev: 'वृक्षासनम्', iast: 'vṛkṣāsanam', en: 'Tree Pose', icon: '🌳', clue: 'Stand on one leg, tall like a tree', bg: '#d9f99d' },
  { id: 'bhujanga', dev: 'भुजङ्गासनम्', iast: 'bhujaṅgāsanam', en: 'Cobra Pose', icon: '🐍', clue: 'Lie on your tummy, lift your head like a cobra', bg: '#fef9c3' },
  { id: 'padma', dev: 'पद्मासनम्', iast: 'padmāsanam', en: 'Lotus Pose', icon: '🪷', clue: 'Sit cross-legged, calm like a lotus', bg: '#fce7f3' },
  { id: 'tada', dev: 'ताडासनम्', iast: 'tāḍāsanam', en: 'Mountain Pose', icon: '⛰️', clue: 'Stand straight and strong like a mountain', bg: '#e0f2fe' },
  { id: 'shava', dev: 'शवासनम्', iast: 'śavāsanam', en: 'Resting Pose', icon: '😴', clue: 'Lie flat on your back and rest quietly', bg: '#ede9fe' },
  { id: 'marjara', dev: 'मार्जारासनम्', iast: 'mārjārāsanam', en: 'Cat Pose', icon: '🐱', clue: 'On hands and knees, round your back like a cat', bg: '#ffedd5' },
  { id: 'bala', dev: 'बालासनम्', iast: 'bālāsanam', en: "Child's Pose", icon: '👶', clue: 'Fold forward, forehead down, curl up small', bg: '#fef3c7' },
  { id: 'titali', dev: 'तितली-आसनम्', iast: 'titalī-āsanam', en: 'Butterfly Pose', icon: '🦋', clue: 'Feet together, flap your knees like wings', bg: '#cffafe' },
  { id: 'shvana', dev: 'अधोमुखश्वानासनम्', iast: 'adhomukha-śvānāsanam', en: 'Downward Dog', icon: '🐕', clue: 'Hands and feet down, hips up like a stretching dog', bg: '#f1f5f9' },
  { id: 'utkata', dev: 'उत्कटासनम्', iast: 'utkaṭāsanam', en: 'Chair Pose', icon: '🪑', clue: 'Bend knees and sit on an invisible chair', bg: '#fae8ff' },
];

const RELATIONS_CARDS: WordQuestCard[] = [
  { id: 'mata', cognates: 'தாய் · അമ്മ · తల్లి · ತಾಯಿ', dev: 'माता', iast: 'mātā', en: 'Mother', emoji: '👩', clue: 'Mother · Warm hug from Amma', bg: '#fce7f3', subBadge: '💖 Amma' },
  { id: 'pita', cognates: 'தந்தை · അച്ഛൻ · తండ్రి · ತಂದೆ', dev: 'पिता', iast: 'pitā', en: 'Father', emoji: '👨', clue: 'Father · Nanna carries me high', bg: '#dbeafe', subBadge: '💙 Nanna / Papa' },
  { id: 'bhrata', cognates: 'சகோதரன் · സഹോദരൻ · సోదరుడు · ಸಹೋದರ', dev: 'भ्राता', iast: 'bhrātā', en: 'Brother', emoji: '👦', clue: 'Brother · Plays ball with me', bg: '#e0f2fe', subBadge: '⚽ Brother' },
  { id: 'bhagini', cognates: 'சகோதரி · സഹോദരി · సోదరి · ಸಹೋದರಿ', dev: 'भगिनी', iast: 'bhaginī', en: 'Sister', emoji: '👧', clue: 'Sister · Ties my rākhī', bg: '#fef9c3', subBadge: '🧵 Sister' },
  { id: 'putra', cognates: 'மகன் · മകൻ · కొడుకు · ಮಗ', dev: 'पुत्रः', iast: 'putraḥ', en: 'Son', emoji: '👩‍👦', clue: 'Son · Amma’s little boy', bg: '#e0f2fe', subBadge: '🌟 Son' },
  { id: 'duhita', cognates: 'மகள் · മകൾ · కూతురు · ಮಗಳು', dev: 'दुहिता', iast: 'duhitā', en: 'Daughter', emoji: '👨‍👧', clue: 'Daughter · Nanna’s little girl', bg: '#ffe4e6', subBadge: '🌸 Daughter' },
  { id: 'mitra', cognates: 'நண்பன் · സുഹൃത്ത് · స్నేహితుడు · ಸ್ನೇಹಿತ', dev: 'मित्रम्', iast: 'mitram', en: 'Friend', emoji: '🤝', clue: 'Friend · We share and play', bg: '#ede9fe', subBadge: '🤝 Best Friend' },
  { id: 'pautra', cognates: 'பேரன் · കൊച്ചുമകൻ · మనవడు · ಮೊಮ್ಮಗ', dev: 'पौत्रः', iast: 'pautraḥ', en: 'Grandson', emoji: '👴👦', clue: 'Grandson · Tātā’s little boy', bg: '#ffedd5', subBadge: '🧡 Grandson' },
  { id: 'pautri', cognates: 'பேத்தி · കൊച്ചുമകൾ · మనవరాలు · ಮೊಮ್ಮಗಳು', dev: 'पौत्री', iast: 'pautrī', en: 'Granddaughter', emoji: '👵👧', clue: 'Granddaughter · Nānamma’s little girl', bg: '#fae8ff', subBadge: '💜 Granddaughter' },
  { id: 'pitamaha', cognates: 'தாத்தா · മുത്തച്ഛൻ · తాత · ಅಜ್ಜ', dev: 'पितामहः', iast: 'pitāmahaḥ', en: 'Grandfather', emoji: '👴', clue: 'Grandfather · Tells me stories', bg: '#f1f5f9', subBadge: '📖 Grandfather' },
  { id: 'pitamahi', cognates: 'பாட்டி · മുത്തശ്ശി · నానమ్మ · ಅಜ್ಜಿ', dev: 'पितामही', iast: 'pitāmahī', en: 'Grandmother', emoji: '👵', clue: 'Grandmother · Sings me lullabies', bg: '#ecfccb', subBadge: '🎶 Grandmother' },
];

interface ActionItem { id: string; dev: string; iast: string; en: string; emoji: string; clue: string; bg: string; }
const ACTIONS: ActionItem[] = [
  { id: 'sit', dev: 'उपविशति', iast: 'upaviśati', en: 'sits', emoji: '🧘', clue: 'Sit · Sit down on the floor', bg: '#fef3c7' },
  { id: 'stand', dev: 'तिष्ठति', iast: 'tiṣṭhati', en: 'stands', emoji: '🧍', clue: 'Stand · Stand up tall', bg: '#e0f2fe' },
  { id: 'run', dev: 'धावति', iast: 'dhāvati', en: 'runs', emoji: '🏃', clue: 'Run · Run fast, fast!', bg: '#fee2e2' },
  { id: 'play', dev: 'क्रीडति', iast: 'krīḍati', en: 'plays', emoji: '🤸', clue: 'Play · Play with friends', bg: '#fae8ff' },
  { id: 'catch', dev: 'गृह्णाति', iast: 'gṛhṇāti', en: 'catches', emoji: '🤾', clue: 'Catch · Catch the ball', bg: '#ffedd5' },
  { id: 'stop', dev: 'विरमति', iast: 'viramati', en: 'stops', emoji: '✋', clue: 'Stop · Stop and freeze!', bg: '#fecaca' },
  { id: 'jump', dev: 'कूर्दति', iast: 'kūrdati', en: 'jumps', emoji: '🦘', clue: 'Jump · Jump up high like a kangaroo', bg: '#ecfccb' },
  { id: 'swim', dev: 'तरति', iast: 'tarati', en: 'swims', emoji: '🏊', clue: 'Swim · Swim in the water', bg: '#cffafe' },
  { id: 'walk', dev: 'चलति', iast: 'calati', en: 'walks', emoji: '🚶', clue: 'Walk · Walk slowly, step by step', bg: '#f1f5f9' },
  { id: 'eat', dev: 'खादति', iast: 'khādati', en: 'eats', emoji: '🍽️', clue: 'Eat · Eat yummy food', bg: '#fef9c3' },
  { id: 'drink', dev: 'पिबति', iast: 'pibati', en: 'drinks', emoji: '🥛', clue: 'Drink · Drink a glass of milk', bg: '#dbeafe' },
  { id: 'sleep', dev: 'स्वपिति', iast: 'svapiti', en: 'sleeps', emoji: '😴', clue: 'Sleep · Sleep tight at night', bg: '#ede9fe' },
];

export const SPICES: WordQuestCard[] = [
  { id: 'turmeric', dev: 'हरिद्रा', iast: 'haridrā', emoji: '🟡', clue: 'Turmeric · Golden yellow haldi for warm milk & dal!', bg: '#fef9c3', subBadge: '🫙 Golden Jar' },
  { id: 'cumin', dev: 'जीरकम्', iast: 'jīrakam', emoji: '🌰', img: '/preschool/spices/cumin.svg', clue: 'Cumin · Tiny striped jeera seeds that sizzle in ghee!', bg: '#fef3c7', subBadge: '🥄 Jeera Seeds' },
  { id: 'pepper', dev: 'मरिचम्', iast: 'maricam', emoji: '⚫', clue: 'Black pepper · Tiny black kali-mirch pearls!', bg: '#e2e8f0', subBadge: '🫙 Warm Spice' },
  { id: 'cardamom', dev: 'एला', iast: 'elā', emoji: '🟢', clue: 'Cardamom · Sweet-smelling green elaichi for kheer!', bg: '#dcfce7', subBadge: '🍮 Sweet Pod' },
  { id: 'clove', dev: 'लवङ्गम्', iast: 'lavaṅgam', emoji: '🌺', img: '/preschool/spices/clove.svg', clue: 'Clove · Fragrant dried flower-bud (lavang) with a 4-petal crown!', bg: '#ffedd5', subBadge: '🌸 Clove Bud' },
  { id: 'cinnamon', dev: 'त्वक्', iast: 'tvak', emoji: '🪵', clue: 'Cinnamon · Sweet rolled brown tree bark (dalchini)!', bg: '#fed7aa', subBadge: '🌳 Sweet Bark' },
  { id: 'coriander', dev: 'धान्यकम्', iast: 'dhānyakam', emoji: '🌿', img: '/preschool/spices/coriander.svg', clue: 'Coriander · Scalloped green dhaniya leaves & round ribbed seeds!', bg: '#ecfccb', subBadge: '🌿 Dhaniya' },
  { id: 'fenugreek', dev: 'मेथिका', iast: 'methikā', emoji: '🍃', img: '/preschool/spices/methi.svg', clue: 'Fenugreek · Three-leaflet green methi sprigs & golden square seeds!', bg: '#d1fae5', subBadge: '🌱 Methi' },
  { id: 'mustard', dev: 'सर्षपः', iast: 'sarṣapaḥ', emoji: '🟤', clue: 'Mustard · Little round rai seeds that go pop-pop!', bg: '#fde68a', subBadge: '💥 Pop Seed' },
  { id: 'ginger', dev: 'आर्द्रकम्', iast: 'ārdrakam', emoji: '🫚', clue: 'Ginger · Cozy warm adrak root for rainy days!', bg: '#fef3c7', subBadge: '☕ Cozy Root' },
  { id: 'hing', dev: 'हिङ्गु', iast: 'hiṅgu', emoji: '✨', img: '/preschool/spices/hing.svg', clue: 'Asafoetida · Golden pinch of fragrant hing makes tummy happy!', bg: '#fef9c3', subBadge: '🥄 Hing Pinch' },
  { id: 'garlic', dev: 'लशुनम्', iast: 'laśunam', emoji: '🧄', clue: 'Garlic · White lahsun cloves wrapped like a bulb!', bg: '#f8fafc', subBadge: '🧄 White Bulb' },
];
const MONTHS: WordQuestCard[] = [
  { id: 'm1', dev: 'चैत्रः', iast: 'caitraḥ', emoji: '🌸', clue: '1 · Chaitra · Spring blossoms & New Year (Mar–Apr)', bg: '#fce7f3', subBadge: '🌸 १ · वसन्तः' },
  { id: 'm2', dev: 'वैशाखः', iast: 'vaiśākhaḥ', emoji: '🌼', clue: '2 · Vaishakha · Sunny spring harvest (Apr–May)', bg: '#fef9c3', subBadge: '🌸 २ · वसन्तः' },
  { id: 'm3', dev: 'ज्येष्ठः', iast: 'jyeṣṭhaḥ', emoji: '☀️', clue: '3 · Jyeshtha · Sweet ripe mangoes & hot sun (May–Jun)', bg: '#fed7aa', subBadge: '☀️ ३ · ग्रीष्मः' },
  { id: 'm4', dev: 'आषाढः', iast: 'āṣāḍhaḥ', emoji: '🌦️', clue: '4 · Ashadha · First dark rain clouds arrive (Jun–Jul)', bg: '#e0f2fe', subBadge: '☀️ ४ · ग्रीष्मः' },
  { id: 'm5', dev: 'श्रावणः', iast: 'śrāvaṇaḥ', emoji: '🌧️', clue: '5 · Shravana · Monsoon rains & Rakshabandhan (Jul–Aug)', bg: '#bae6fd', subBadge: '🌧️ ५ · वर्षा' },
  { id: 'm6', dev: 'भाद्रपदः', iast: 'bhādrapadaḥ', emoji: '🐘', clue: '6 · Bhadrapada · Ganesha Chaturthi & Janmashtami (Aug–Sep)', bg: '#ddd6fe', subBadge: '🌧️ ६ · वर्षा' },
  { id: 'm7', dev: 'आश्विनः', iast: 'āśvinaḥ', emoji: '🏹', clue: '7 · Ashvina · Navaratri garba & Dussehra (Sep–Oct)', bg: '#fee2e2', subBadge: '🌕 ७ · शरद्' },
  { id: 'm8', dev: 'कार्तिकः', iast: 'kārtikaḥ', emoji: '🪔', clue: '8 · Kartika · Sparkling Diwali lamps (Oct–Nov)', bg: '#fef3c7', subBadge: '🌕 ८ · शरद्' },
  { id: 'm9', dev: 'मार्गशीर्षः', iast: 'mārgaśīrṣaḥ', emoji: '🍂', clue: '9 · Margashirsha · Gentle misty mornings (Nov–Dec)', bg: '#ffedd5', subBadge: '🍂 ९ · हेमन्तः' },
  { id: 'm10', dev: 'पौषः', iast: 'pauṣaḥ', emoji: '❄️', clue: '10 · Pausha · Cozy winter blankets (Dec–Jan)', bg: '#f1f5f9', subBadge: '🍂 १० · हेमन्तः' },
  { id: 'm11', dev: 'माघः', iast: 'māghaḥ', emoji: '🪁', clue: '11 · Magha · Colorful kites & Sankranti (Jan–Feb)', bg: '#cffafe', subBadge: '❄️ ११ · शिशिरः' },
  { id: 'm12', dev: 'फाल्गुनः', iast: 'phālgunaḥ', emoji: '🎨', clue: '12 · Phalguna · Joyful Holi colours! (Feb–Mar)', bg: '#fae8ff', subBadge: '❄️ १२ · शिशिरः' },
];
const WORK_TYPES: WordQuestCard[] = [
  { id: 'agri', dev: 'कृषिः', iast: 'kṛṣiḥ', emoji: '🧑‍🌾', clue: 'Farming · Growing golden rice, wheat & fruits', bg: '#ecfccb', subBadge: '🌾 Farmer' },
  { id: 'army', dev: 'सैन्यम्', iast: 'sainyam', emoji: '💂', clue: 'Army · Brave soldiers who protect our land', bg: '#d1fae5', subBadge: '🛡️ Protector' },
  { id: 'teach', dev: 'अध्यापनम्', iast: 'adhyāpanam', emoji: '👩‍🏫', clue: 'Teaching · Kind Guru teaching stories & songs', bg: '#e0f2fe', subBadge: '📚 Teacher' },
  { id: 'trade', dev: 'वाणिज्यम्', iast: 'vāṇijyam', emoji: '🏪', clue: 'Trade · Sharing goods in the busy bazaar', bg: '#fef3c7', subBadge: '⚖️ Shopkeeper' },
  { id: 'med', dev: 'वैद्यकम्', iast: 'vaidyakam', emoji: '🩺', clue: 'Medicine · Caring Vaidya / Doctor helping us heal', bg: '#fee2e2', subBadge: '💚 Healer' },
  { id: 'craft', dev: 'शिल्पम्', iast: 'śilpam', emoji: '🔨', clue: 'Craft · Shaping clay pots, toys & carvings', bg: '#ffedd5', subBadge: '🏺 Artisan' },
  { id: 'music', dev: 'सङ्गीतम्', iast: 'saṅgītam', emoji: '🎶', clue: 'Music · Singing sweet ragas and playing beats', bg: '#fae8ff', subBadge: '🎵 Musician' },
  { id: 'fish', dev: 'मत्स्यग्रहणम्', iast: 'matsyagrahaṇam', emoji: '🎣', clue: 'Fishing · Sailing boats across blue waves', bg: '#cffafe', subBadge: '⛵ Sailor' },
  { id: 'cattle', dev: 'पशुपालनम्', iast: 'paśupālanam', emoji: '🐄', clue: 'Cattle care · Loving & feeding gentle cows', bg: '#f5f5f4', subBadge: '🐄 Caretaker' },
  { id: 'cook', dev: 'पाककर्म', iast: 'pākakarma', emoji: '🍳', clue: 'Cooking · Making warm yummy meals with love', bg: '#fef9c3', subBadge: '🍲 Chef' },
  { id: 'weave', dev: 'वयनम्', iast: 'vayanam', emoji: '🧶', clue: 'Weaving · Spinning colourful threads into cloth', bg: '#ede9fe', subBadge: '🧵 Weaver' },
  { id: 'write', dev: 'लेखनम्', iast: 'lekhanam', emoji: '✍️', clue: 'Writing · Writing poems, books and letters', bg: '#f1f5f9', subBadge: '✒️ Writer' },
];

interface VishvaName { id: string; group: 'india-seas' | 'world-oceans' | 'ancient-lands'; dev: string; iast: string; en: string; icon: string; clue: string; note: 'ancient' | 'modern'; bg: string; }
const VISHVA_NAMES: VishvaName[] = [
  { id: 'ratnakara', group: 'india-seas', dev: 'रत्नाकरः', iast: 'ratnākaraḥ', en: 'Indian Ocean', icon: '🌊', clue: 'The “jewel-mine” sea south of India (Hindu Mahāsāgara)', note: 'ancient', bg: '#e0f2fe' },
  { id: 'sindhusagara', group: 'india-seas', dev: 'सिन्धुसागरः', iast: 'sindhusāgaraḥ', en: 'Arabian Sea', icon: '🌊', clue: 'Sea west of India where the Sindhu river ends', note: 'ancient', bg: '#e0f2fe' },
  { id: 'mahodadhi', group: 'india-seas', dev: 'महोदधिः', iast: 'mahodadhiḥ', en: 'Bay of Bengal', icon: '🌊', clue: 'The “great sea” east of India, beside Puri', note: 'ancient', bg: '#e0f2fe' },
  { id: 'prashanta', group: 'world-oceans', dev: 'प्रशान्तमहासागरः', iast: 'praśānta-mahāsāgaraḥ', en: 'Pacific Ocean', icon: '🐋', clue: 'The “peaceful” ocean — the biggest of all', note: 'modern', bg: '#dbeafe' },
  { id: 'andha', group: 'world-oceans', dev: 'अन्धमहासागरः', iast: 'andha-mahāsāgaraḥ', en: 'Atlantic Ocean', icon: '🐬', clue: 'Ocean between Africa–Europe and the Americas', note: 'modern', bg: '#dbeafe' },
  { id: 'uttara', group: 'world-oceans', dev: 'उत्तरध्रुवसागरः', iast: 'uttara-dhruva-sāgaraḥ', en: 'Arctic Ocean', icon: '🐻‍❄️', clue: 'Icy ocean at the North Pole', note: 'modern', bg: '#f1f5f9' },
  { id: 'dakshina', group: 'world-oceans', dev: 'दक्षिणमहासागरः', iast: 'dakṣiṇa-mahāsāgaraḥ', en: 'Southern Ocean', icon: '🐧', clue: 'Cold ocean around Antarctica', note: 'modern', bg: '#f1f5f9' },
  { id: 'jambudvipa', group: 'ancient-lands', dev: 'जम्बूद्वीपः', iast: 'jambūdvīpaḥ', en: 'Jambudvīpa (our land, Bhārata)', icon: '🍇', clue: 'The rose-apple island of the Purāṇas, home of Bhāratavarṣa', note: 'ancient', bg: '#fce7f3' },
  { id: 'lanka', group: 'ancient-lands', dev: 'सिंहलः / लङ्का', iast: 'siṃhalaḥ / laṅkā', en: 'Sri Lanka', icon: '🏝️', clue: 'Island just south of India', note: 'ancient', bg: '#ccfbf1' },
  { id: 'cina', group: 'ancient-lands', dev: 'चीनः', iast: 'cīnaḥ', en: 'China', icon: '🐉', clue: 'Big land north-east beyond the Himalaya', note: 'ancient', bg: '#fef3c7' },
  { id: 'yavana', group: 'ancient-lands', dev: 'यवनदेशः', iast: 'yavanadeśaḥ', en: 'Greece (Ionia)', icon: '🏛️', clue: 'Land of the Yavanas, far to the west', note: 'ancient', bg: '#ede9fe' },
  { id: 'parasika', group: 'ancient-lands', dev: 'पारसीकः', iast: 'pārasīkaḥ', en: 'Persia (Iran)', icon: '🏺', clue: 'Land of the Pārasīkas, west of the Sindhu', note: 'ancient', bg: '#ffedd5' },
  { id: 'gandhara', group: 'ancient-lands', dev: 'गान्धारः', iast: 'gāndhāraḥ', en: 'Gandhāra (Afghanistan–NW region)', icon: '🏔️', clue: 'Home of Queen Gāndhārī in the Mahābhārata', note: 'ancient', bg: '#fae8ff' },
  { id: 'suvarna', group: 'ancient-lands', dev: 'सुवर्णद्वीपः', iast: 'suvarṇadvīpaḥ', en: 'Southeast Asia islands (Sumatra–Java)', icon: '✨', clue: 'The “golden island” where sailors traded', note: 'ancient', bg: '#fef9c3' },
  { id: 'brahmadesha', group: 'ancient-lands', dev: 'ब्रह्मदेशः', iast: 'brahmadeśaḥ', en: 'Myanmar (Burma)', icon: '🛕', clue: 'Golden-pagoda land east of Assam', note: 'ancient', bg: '#cffafe' },
];

const VishvaMatchGame: React.FC<{ onEarnStar?: () => void }> = ({ onEarnStar }) => {
  const [pack, setPack] = useState<'india-seas' | 'oceans' | 'lands' | 'all'>('india-seas');
  const [round, setRound] = useState(0);
  const filtered = useMemo(() => {
    if (pack === 'india-seas') return VISHVA_NAMES.filter((v) => v.group === 'india-seas');
    if (pack === 'oceans') return VISHVA_NAMES.filter((v) => v.group === 'india-seas' || v.group === 'world-oceans');
    if (pack === 'lands') return VISHVA_NAMES.filter((v) => v.group === 'ancient-lands');
    return VISHVA_NAMES;
  }, [pack]);
  const left = useMemo(() => shuffleArr(filtered), [filtered, round]);
  const right = useMemo(() => shuffleArr(filtered), [filtered, round]);
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [msg, setMsg] = useState('Tap a Sanskrit name on the left, then tap the ocean or land it means!');
  const reset = (nextPack?: 'india-seas' | 'oceans' | 'lands' | 'all') => {
    if (nextPack) setPack(nextPack);
    setRound((r) => r + 1); setPick(null); setDone([]); setWrong(null);
    soundEffects.playStrokeChime();
    setMsg('Tap a Sanskrit name, then tap its matching ocean or land!');
  };
  const tapRight = (id: string) => {
    if (done.includes(id)) return;
    if (!pick) { setMsg('👈 First tap a Sanskrit name on the left to hear it!'); return; }
    if (pick === id) {
      const nd = [...done, id]; setDone(nd); setPick(null); soundEffects.playCelebrationChime(); onEarnStar?.();
      setMsg(nd.length === filtered.length ? '🎉 शोभनम्! (śobhanam!) Pack complete — try the next world pack!' : '✅ Correct! Great match!');
    } else { setWrong(id); soundEffects.playPuzzleSnap(); setMsg('🙂 Not this one — listen & try again!'); setTimeout(() => setWrong(null), 600); }
  };
  const box = (on: boolean, ok: boolean, bad: boolean, bg: string): React.CSSProperties => ({
    background: ok ? '#dcfce7' : bg, border: bad ? '3px solid #f87171' : on ? '3px solid #0284c7' : ok ? '2px solid #4ade80' : '2px solid #bfdbfe',
    borderRadius: 16, padding: 10, cursor: ok ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 10, color: '#1e293b', textAlign: 'left', opacity: ok ? 0.78 : 1, width: '100%',
  });
  return (
    <div className="psw-card-bench">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>🌏 <span lang="sa">विश्व-नामानि</span> · Oceans &amp; Lands</h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>Start with the 3 Seas around India, then sail to all 7 Oceans &amp; ancient lands!</p>
        </div>
        <button type="button" className="psw-quiz-btn" onClick={() => reset()}>🔀 Shuffle / Reset</button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '12px 0 8px' }} role="tablist" aria-label="World packs">
        {([
          { id: 'india-seas', label: '🌊 3 Seas of India (Easy!)', bg: '#e0f2fe' },
          { id: 'oceans', label: '🐋 All 7 Oceans', bg: '#dbeafe' },
          { id: 'lands', label: '🏝️ 8 Ancient Lands', bg: '#fef3c7' },
          { id: 'all', label: '🌟 All 15 Places', bg: '#fce7f3' },
        ] as const).map((p) => (
          <button key={p.id} type="button" role="tab" aria-selected={pack === p.id} onClick={() => reset(p.id)}
            style={{ background: p.bg, border: pack === p.id ? '3px solid #0284c7' : '2px solid #cbd5e1', borderRadius: 999, padding: '6px 14px', fontWeight: 800, cursor: 'pointer', color: '#0f172a' }}>
            {p.label}
          </button>
        ))}
      </div>

      <p role="status" style={{ margin: '8px 0 12px', fontWeight: 700, color: '#0f172a' }}>{msg} ⭐ {done.length}/{filtered.length}</p>
      <div className="psw-two-col-match-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {left.map((v) => {
            const ok = done.includes(v.id);
            return (
              <button key={v.id} type="button" disabled={ok} onClick={() => { setPick(v.id); playPronunciation(v.dev.split(' / ')[0]); }} style={box(pick === v.id, ok, false, '#fff')}>
                <span><strong lang="sa" style={{ fontSize: 17 }}>{v.dev}</strong> <small>{v.note === 'ancient' ? '📜' : '🆕'}</small><br /><small style={{ fontStyle: 'italic', color: '#475569' }}>{v.iast}</small></span>
                <span style={{ marginLeft: 'auto' }}>{ok ? '✅' : pick === v.id ? '👉' : '🔊'}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {right.map((v) => {
            const ok = done.includes(v.id);
            return (
              <button key={v.id} type="button" disabled={ok} onClick={() => tapRight(v.id)} style={box(false, ok, wrong === v.id, v.bg)}>
                <span aria-hidden="true" style={{ fontSize: 30, flexShrink: 0 }}>{v.icon}</span>
                <span style={{ fontSize: 14 }}><b>{v.en}</b><br />{v.clue}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p style={{ fontSize: 12, color: '#64748b', marginTop: 10 }}>📜 = traditional name found in old Sanskrit texts · 🆕 = modern Sanskrit name for far oceans.</p>
    </div>
  );
};

export interface PreschoolWonderLabProps extends LabSegmentProps {
  initialActivity?: string | null;
  onBrowseMainLabs?: () => void;
  onSelectMainLab?: (targetId: string) => void;
}

export const PreschoolWonderLab: React.FC<PreschoolWonderLabProps> = ({
  onNextLab,
  onBrowseMainLabs,
  onSelectMainLab,
  initialActivity,
}) => {
  const [tab, setTab] = useState<PreschoolTab>(() => {
    if (initialActivity && ACTIVITIES.some((a) => a.id === initialActivity)) {
      return initialActivity as PreschoolTab;
    }
    return 'shapes';
  });
  const [festival, setFestival] = useState<FestivalItem>(FESTIVALS[0]);
  const [festQuiz, setFestQuiz] = useState<FestivalItem | null>(null);
  const [festStars, setFestStars] = useState(0);
  const [festMsg, setFestMsg] = useState('');
  const [showFestivalMatch, setShowFestivalMatch] = useState<boolean>(true);
  const [levelTier, setLevelTier] = useState<WonderLevelTier>('preschool');
  const [selectedCluster, setSelectedCluster] = useState<ClusterCategory>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'play'>(() => {
    if (initialActivity && ACTIVITIES.some((a) => a.id === initialActivity)) {
      return 'play';
    }
    return 'cards';
  });
  const playArenaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialActivity && ACTIVITIES.some((a) => a.id === initialActivity)) {
      setTab(initialActivity as PreschoolTab);
      setViewMode('play');
    }
  }, [initialActivity]);

  // Persistent Preschool Star Jar & Sticker Progress
  const [totalStars, setTotalStars] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem('ednet_preschool_stars_v1') || '0');
      return Number.isFinite(saved) && saved >= 0 ? saved : 0;
    } catch { return 0; }
  });
  const [playedTabs, setPlayedTabs] = useState<string[]>(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('ednet_preschool_played_v1') || '[]');
      return Array.isArray(raw) ? raw : [];
    } catch { return []; }
  });

  const [winBurst, setWinBurst] = useState<number>(0);
  const awardPreschoolStar = () => {
    setTotalStars((prev) => {
      const next = prev + 1;
      try { localStorage.setItem('ednet_preschool_stars_v1', String(next)); } catch { /* ignore */ }
      return next;
    });
  };
  const celebrateWin = () => {
    awardPreschoolStar();
    setWinBurst(Date.now());
    setTimeout(() => setWinBurst(0), 1600);
  };

  const launchActivity = (actId: PreschoolTab) => {
    setTab(actId);
    setViewMode('play');
    setPlayedTabs((prev) => {
      if (prev.includes(actId)) return prev;
      const next = [...prev, actId];
      try { localStorage.setItem('ednet_preschool_played_v1', JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
    soundEffects.playCelebrationChime();
    setTimeout(() => {
      playArenaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  // Shapes Game State
  const [shapePack, setShapePack] = useState<'first6' | 'more2d' | '3d' | 'all'>('first6');
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES[0]);
  const [shapeQuizTarget, setShapeQuizTarget] = useState<ShapeItem | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [activeShapePoster, setActiveShapePoster] = useState<'shapes' | 'patterns'>('shapes');
  const [isShareCopied, setIsShareCopied] = useState(false);

  const handleSharePreschool = async () => {
    soundEffects.playStrokeChime();
    const shareData = {
      title: 'Free Preschool Games for Ages 3–6 | Play 2 Learn – EdNet Learn',
      text: 'Play free preschool games that build letters, numbers, shapes, memory, and early Sanskrit sounds. Safe, simple, and fun for ages 3–6.',
      url: window.location.origin + '/preschool',
    };
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        /* ignore abort */
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setIsShareCopied(true);
        setTimeout(() => setIsShareCopied(false), 2400);
      } catch {
        /* ignore */
      }
    }
  };

  const visibleShapes = useMemo(() => {
    if (shapePack === 'first6') return SHAPES.slice(0, 6);
    if (shapePack === 'more2d') return SHAPES.slice(6, 12);
    if (shapePack === '3d') return SHAPES.slice(12, 16);
    return SHAPES;
  }, [shapePack]);

  // Color Game State
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLORS[0]);
  const [colorMixSlotA, setColorMixSlotA] = useState<ColorItem | null>(null);
  const [colorMixSlotB, setColorMixSlotB] = useState<ColorItem | null>(null);
  const [mixResult, setMixResult] = useState<{ dev: string; en: string; hex: string; icon: string } | null>(null);
  const [mixRatio, setMixRatio] = useState(50);
  const [colorQuizTarget, setColorQuizTarget] = useState<ColorItem | null>(null);
  const [colorScore, setColorScore] = useState<number>(0);

  // Animal Safari State
  const [animalPack, setAnimalPack] = useState<'all' | 'home' | 'woods' | 'jungle'>('home');
  const [activeAnimal, setActiveAnimal] = useState<AnimalItem>(ANIMALS[0]);
  const [animalQuizTarget, setAnimalQuizTarget] = useState<AnimalItem | null>(null);
  const [animalScore, setAnimalScore] = useState<number>(0);

  const visibleAnimals = useMemo(() => {
    if (animalPack === 'home') return ANIMALS.filter((a) => ['cow', 'dog', 'mouse', 'crow'].includes(a.id));
    if (animalPack === 'woods') return ANIMALS.filter((a) => ['peacock', 'frog', 'monkey', 'deer', 'fox', 'snake'].includes(a.id));
    if (animalPack === 'jungle') return ANIMALS.filter((a) => ['lion', 'tiger', 'elephant', 'bear', 'crocodile'].includes(a.id));
    return ANIMALS;
  }, [animalPack]);

  // Fruits Picker State + Hungry Monkey Order Quest
  const [basketFruits, setBasketFruits] = useState<FruitItem[]>([]);
  const [lastPickedFruit, setLastPickedFruit] = useState<FruitItem | null>(null);
  const [fruitOrderTarget, setFruitOrderTarget] = useState<FruitItem | null>(null);

  // Counting State + How Many Friends Quiz
  const [selectedCount, setSelectedCount] = useState<CountItem>(COUNT_ITEMS[0]);
  const [countQuizTarget, setCountQuizTarget] = useState<CountItem | null>(null);

  // Instruments State + Mystery Sound Quest
  const [playingInstrumentId, setPlayingInstrumentId] = useState<string | null>(null);
  const [instQuizTarget, setInstQuizTarget] = useState<InstrumentItem | null>(null);

  // Moon Game State + Wise Owl Moon Quest
  const [moonPct, setMoonPct] = useState<number>(50);
  const [moonQuizTarget, setMoonQuizTarget] = useState<MoonPhase | null>(null);

  // Day Game State + Sky Time Quiz
  const [selectedDay, setSelectedDay] = useState<DaySection>(DAY_SECTIONS[0]);
  const [dayQuizTarget, setDayQuizTarget] = useState<DaySection | null>(null);

  // Seasons Game State + Weather Season Quiz
  const [selectedSeason, setSelectedSeason] = useState<SeasonItem>(SEASONS[0]);
  const [activeParticles, setActiveParticles] = useState<string[]>([]);
  const [seasonQuizTarget, setSeasonQuizTarget] = useState<SeasonItem | null>(null);

  // Vahanas Matching Game State
  const [vahanaPack, setVahanaPack] = useState<'easy4' | 'all8'>('easy4');
  const [selectedGod, setSelectedGod] = useState<VahanaPair | null>(null);
  const [matchedVahanas, setMatchedVahanas] = useState<Set<string>>(new Set());
  const [shuffledVahanas, setShuffledVahanas] = useState<VahanaPair[]>([]);
  const [lastVahanaBlessing, setLastVahanaBlessing] = useState<VahanaPair | null>(null);

  const activeVahanas = useMemo(
    () => (vahanaPack === 'easy4' ? VAHANAS.slice(0, 4) : VAHANAS),
    [vahanaPack],
  );

  // Story State
  const [storySlideIdx, setStorySlideIdx] = useState<number>(0);

  // Shuffle Vahanas whenever pack changes
  useEffect(() => {
    setMatchedVahanas(new Set());
    setSelectedGod(null);
    setLastVahanaBlessing(null);
    setShuffledVahanas([...activeVahanas].sort(() => Math.random() - 0.5));
  }, [activeVahanas]);

  // Trigger floating particles on season switch
  const triggerSeasonWeather = (season: SeasonItem) => {
    setSelectedSeason(season);
    playPronunciation(season.dev);
    setActiveParticles(season.particles);
    setTimeout(() => {
      setActiveParticles([]);
    }, 4000);
    if (seasonQuizTarget) {
      if (season.id === seasonQuizTarget.id) {
        soundEffects.playCelebrationChime();
        celebrateWin();
        setSeasonQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    } else {
      soundEffects.playStrokeChime();
    }
  };

  // Start / check shape quiz
  const startShapeQuiz = () => {
    const random = visibleShapes[Math.floor(Math.random() * visibleShapes.length)];
    setShapeQuizTarget(random);
    playPronunciation(random.dev);
    soundEffects.playStrokeChime();
  };

  const handleShapeClick = (shape: ShapeItem) => {
    setSelectedShape(shape);
    speakShapeWithExample(shape.dev, shape.example);
    if (shapeQuizTarget) {
      if (shape.id === shapeQuizTarget.id) {
        soundEffects.playCelebrationChime();
        setQuizScore((s) => s + 1);
        celebrateWin();
        setShapeQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    } else {
      soundEffects.playStrokeChime();
    }
  };

  // Color Game Logic
  const handleColorTap = (c: ColorItem) => {
    setSelectedColor(c);
    soundEffects.playBubblePop();
    playPronunciation(c.dev);

    if (colorQuizTarget) {
      if (c.id === colorQuizTarget.id) {
        soundEffects.playCelebrationChime();
        setColorScore((s) => s + 1);
        celebrateWin();
        setColorQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
      return;
    }

    if (!colorMixSlotA) {
      setColorMixSlotA(c);
      setMixResult(null);
    } else if (!colorMixSlotB) {
      setColorMixSlotB(c);
      executeColorMix(colorMixSlotA, c);
    } else {
      setColorMixSlotA(c);
      setColorMixSlotB(null);
      setMixResult(null);
    }
  };

  const executeColorMix = (a: ColorItem, b: ColorItem) => {
    const ids = [a.id, b.id].sort();
    let res = { dev: `${a.dev} + ${b.dev}`, en: `${a.en} + ${b.en} Blend`, hex: '#8b5cf6', icon: '✨' };
    if (ids[0] === 'red' && ids[1] === 'yellow') {
      res = { dev: 'काषायः (नारङ्गः)', en: 'Saffron / Orange!', hex: '#f97316', icon: '🪔' };
    } else if (ids[0] === 'blue' && ids[1] === 'yellow') {
      res = { dev: 'हरितः', en: 'Fresh Green!', hex: '#22c55e', icon: '🍃' };
    } else if (ids[0] === 'blue' && ids[1] === 'red') {
      res = { dev: 'जाम्बवः', en: 'Royal Purple / Violet!', hex: '#a855f7', icon: '🍇' };
    } else if (ids[0] === 'red' && ids[1] === 'white') {
      res = { dev: 'पाटलः', en: 'Lotus Pink!', hex: '#ec4899', icon: '🪷' };
    } else if (ids[0] === 'blue' && ids[1] === 'white') {
      res = { dev: 'आकाश-नीलः', en: 'Sky Blue!', hex: '#38bdf8', icon: '☁️' };
    } else if (ids[0] === 'green' && ids[1] === 'yellow') {
      res = { dev: 'हरित-पीतः', en: 'Lime Glow!', hex: '#84cc16', icon: '🍋' };
    }
    setMixResult(res);
    setMixRatio(50);
    soundEffects.playCelebrationChime();
    playPronunciation(res.dev);
  };

  const startColorQuiz = () => {
    const random = COLORS[Math.floor(Math.random() * COLORS.length)];
    setColorQuizTarget(random);
    playPronunciation(random.dev);
    soundEffects.playStrokeChime();
  };

  const resetColorMixer = () => {
    setColorMixSlotA(null);
    setColorMixSlotB(null);
    setMixResult(null);
    soundEffects.playStrokeChime();
  };

  // Animal Safari Logic
  const handleAnimalTap = (animal: AnimalItem) => {
    setActiveAnimal(animal);
    soundEffects.playSafariAnimalSound(animal.id);
    setTimeout(() => playPronunciation(`${animal.dev} ${animal.soundLabelSa}`), 260);
    if (animalQuizTarget) {
      if (animal.id === animalQuizTarget.id) {
        soundEffects.playCelebrationChime();
        setAnimalScore((s) => s + 1);
        celebrateWin();
        setAnimalQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    }
  };

  const startAnimalQuiz = () => {
    const random = visibleAnimals[Math.floor(Math.random() * visibleAnimals.length)];
    setAnimalQuizTarget(random);
    soundEffects.playSafariAnimalSound(random.id);
    setTimeout(() => playPronunciation(`कः वदति? ${random.soundLabelSa}`), 320);
  };

  // Fruit Picker Logic
  const handleFruitPick = (fruit: FruitItem) => {
    soundEffects.playFruitHarvestPop();
    playPronunciation(fruit.dev);
    setLastPickedFruit(fruit);
    if (fruitOrderTarget) {
      if (fruit.id === fruitOrderTarget.id) {
        soundEffects.playCelebrationChime();
        celebrateWin();
        setFruitOrderTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    }
    setBasketFruits((prev) => {
      const next = [...prev, fruit];
      if (next.length % 5 === 0) {
        soundEffects.playVictoryFanfare();
        awardPreschoolStar();
      }
      return next;
    });
  };

  const resetFruitBasket = () => {
    setBasketFruits([]);
    setLastPickedFruit(null);
    soundEffects.playSuccessDing();
  };

  // Counting Logic
  const selectCountNumber = (item: CountItem) => {
    setSelectedCount(item);
    playPronunciation(`${item.devName} ${item.phraseSa}`);
    if (countQuizTarget) {
      if (item.num === countQuizTarget.num) {
        soundEffects.playCelebrationChime();
        celebrateWin();
        setCountQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    } else {
      soundEffects.playStrokeChime();
    }
  };

  const playInstrumentAcousticOnly = (inst: InstrumentItem) => {
    if (inst.soundType === 'bell') soundEffects.playTempleBell();
    else if (inst.soundType === 'damaru') soundEffects.playDamaruBeat();
    else if (inst.soundType === 'conch') soundEffects.playShankhaHorn();
    else if (inst.soundType === 'strings') soundEffects.playVeenaPluck();
    else if (inst.soundType === 'drum') soundEffects.playMridangaBeat();
    else if (inst.soundType === 'cymbals') soundEffects.playManjiraChink();
    else soundEffects.playStrokeChime();
  };

  // Instrument Player Logic
  const handlePlayInstrument = (inst: InstrumentItem) => {
    setPlayingInstrumentId(inst.id);
    playInstrumentAcousticOnly(inst);
    if (instQuizTarget) {
      if (inst.id === instQuizTarget.id) {
        setTimeout(() => soundEffects.playCelebrationChime(), 500);
        celebrateWin();
        setInstQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    }
    if (inst.soundType === 'bell' || inst.soundType === 'damaru') playPronunciation(inst.dev);
    else setTimeout(() => playPronunciation(inst.dev), 1400);
    setTimeout(() => {
      setPlayingInstrumentId(null);
    }, 1800);
  };

  // Vahana Matching Logic
  const handleGodTap = (pair: VahanaPair) => {
    if (matchedVahanas.has(pair.id)) return;
    setSelectedGod(pair);
    playPronunciation(pair.godDev);
    soundEffects.playStrokeChime();
  };

  const handleVahanaAnimalTap = (vahana: VahanaPair) => {
    if (matchedVahanas.has(vahana.id)) return;
    playPronunciation(vahana.vahanaDev);
    if (selectedGod) {
      if (selectedGod.id === vahana.id) {
        soundEffects.playCelebrationChime();
        setMatchedVahanas((prev) => new Set([...prev, vahana.id]));
        setLastVahanaBlessing(vahana);
        celebrateWin();
        setSelectedGod(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    } else {
      soundEffects.playStrokeChime();
    }
  };

  const resetVahanaGame = () => {
    setMatchedVahanas(new Set());
    setSelectedGod(null);
    setLastVahanaBlessing(null);
    setShuffledVahanas([...activeVahanas].sort(() => Math.random() - 0.5));
    soundEffects.playSuccessDing();
  };

  // Determine current moon phase by percentage
  const currentMoonPhase = (() => {
    if (moonPct <= 10) return MOON_PHASES[0];
    if (moonPct <= 35) return MOON_PHASES[1];
    if (moonPct <= 65) return MOON_PHASES[2];
    if (moonPct <= 85) return MOON_PHASES[3];
    return MOON_PHASES[4];
  })();

  const currentStorySlide = STORY_SLIDES[storySlideIdx];

  const preschoolCount = useMemo(
    () => ACTIVITIES.filter((a) => (a.level ?? 'preschool') === 'preschool').length,
    [],
  );
  const nextLevelCount = useMemo(
    () => ACTIVITIES.filter((a) => a.level === 'next').length,
    [],
  );

  const levelActivities = useMemo(() => {
    if (levelTier === 'all') return ACTIVITIES;
    return ACTIVITIES.filter((a) => (a.level ?? 'preschool') === levelTier);
  }, [levelTier]);

  const displayedActivities = useMemo(() => {
    if (selectedCluster === 'all') return levelActivities;
    return levelActivities.filter((a) => a.cluster === selectedCluster);
  }, [levelActivities, selectedCluster]);

  const currentActivity = ACTIVITIES.find((a) => a.id === tab) || ACTIVITIES[0];
  const stepperActivities = levelActivities.length > 0 ? levelActivities : ACTIVITIES;
  const stepperIdx = Math.max(0, stepperActivities.findIndex((a) => a.id === tab));

  const switchLevelTier = (nextTier: WonderLevelTier) => {
    setLevelTier(nextTier);
    setSelectedCluster('all');
    setViewMode('cards');
    const pool =
      nextTier === 'all'
        ? ACTIVITIES
        : ACTIVITIES.filter((a) => (a.level ?? 'preschool') === nextTier);
    if (pool.length > 0 && !pool.some((a) => a.id === tab)) {
      setTab(pool[0].id);
    }
    soundEffects.playStrokeChime();
  };

  return (
    <div className="vl-subsim preschool-wonder-root" data-testid="preschool-wonder-lab">
      {/* Direct Portal Bar: Quick access to Main Vijñāna Lab */}
      <div className="psw-main-lab-portal-bar">
        <div className="psw-mlp-left">
          {onBrowseMainLabs && (
            <button
              type="button"
              className="psw-mlp-browse-btn"
              onClick={onBrowseMainLabs}
              title="Return to the Main Vijñāna Lab to explore all 17 simulations"
            >
              <span aria-hidden="true">🔬 ◀</span>
              <span>All 17 Vijñāna Lab Simulations</span>
            </button>
          )}
          <span className="psw-mlp-tagline">
            Older kids &amp; scholar STEM labs:
          </span>
        </div>
        <div className="psw-mlp-chips" role="navigation" aria-label="Elder science simulations">
          <button type="button" className="psw-mlp-chip" onClick={() => onSelectMainLab ? onSelectMainLab('paramanu') : onNextLab?.()} title="Atom Builder: Make Matter (Ages 11–14)">
            ⚛️ Atom Builder (11–14)
          </button>
          <button type="button" className="psw-mlp-chip" onClick={() => onSelectMainLab ? onSelectMainLab('jyotisha') : onNextLab?.()} title="Planet Pull Gravity (Ages 8–10)">
            🪐 Planet Pull (8–10)
          </button>
          <button type="button" className="psw-mlp-chip" onClick={() => onSelectMainLab ? onSelectMainLab('chandrayaan') : onNextLab?.()} title="Moon Mission (Ages 11–14)">
            🛰️ Moon Mission (11–14)
          </button>
          <button type="button" className="psw-mlp-chip" onClick={() => onSelectMainLab ? onSelectMainLab('prakriti') : onNextLab?.()} title="Nature Balance (Ages 8–10)">
            🌿 Nature Balance (8–10)
          </button>
          <button type="button" className="psw-mlp-chip" onClick={() => onSelectMainLab ? onSelectMainLab('agnibana') : onNextLab?.()} title="Rocket Builder (Ages 12–14)">
            🚀 Rocket Lab (12–14)
          </button>
        </div>
      </div>

      {/* Preschool Playground Hero Header */}
      <div className="psw-hero-box">
        <div className="psw-hero-badge" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="psw-hero-icon" aria-hidden="true">{levelTier === 'next' ? '🚀' : '🌱'}</span>
            <div>
              <span className="psw-hero-kicker">
                {levelTier === 'next' ? (
                  <>Next Level Games · Ages 6–10 · <span className="sanskrit-safe-text" lang="sa">बाल-अन्वेषणम्</span></>
                ) : (
                  <>Level 1 · Play 2 Learn · Ages 3–6 · <span className="sanskrit-safe-text" lang="sa">शिशु-क्रीडा</span></>
                )}
              </span>
              <h2 className="psw-hero-title">
                {levelTier === 'next' ? (
                  <>Next Level Games <span className="sanskrit-safe-text" lang="sa">· अग्रिम-स्तर-क्रीडाः</span></>
                ) : (
                  <>Play 2 Learn: Free Preschool Games <span className="sanskrit-safe-text" lang="sa">· शिशु-क्रीडा-वाटिका</span></>
                )}
              </h2>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="psw-share-btn"
              onClick={handleSharePreschool}
              title="Share Play 2 Learn: Free Preschool Games with parents and teachers"
              aria-label="Share Play 2 Learn preschool games"
            >
              <span>{isShareCopied ? '✅ Link Copied!' : '📤 Share'}</span>
            </button>
            <div className="psw-star-jar-pill" aria-label="Your golden star jar">
              <span>🏺⭐ <strong>{totalStars}</strong> Stars</span>
              <span className="psw-star-jar-sep">·</span>
              <span>🏅 <strong>{playedTabs.length}</strong>/{ACTIVITIES.length} Explored</span>
            </div>
          </div>
        </div>
        <p className="psw-hero-desc">
          {levelTier === 'next' ? (
            <>
              Ready for a bigger challenge? Explore 12 Sanskrit lunar months, 6 classical seasons, kitchen spices, trades, lunar tithis, world oceans &amp; the 5 elements!
            </>
          ) : (
            <>
              Fun, safe activities for ages 3–6 that build early literacy, numeracy, and thinking skills.
              <span className="psw-hero-motto-chip" aria-label="Preschool motto: Touch, listen, play">
                <span className="psw-hero-motto-icon" aria-hidden="true">✨</span>
                <span lang="sa" className="psw-hero-motto-sa">स्पृश · शृणु · क्रीड</span>
                <span className="psw-hero-motto-sep">·</span>
                <span className="psw-hero-motto-en">Touch, Listen, Play!</span>
              </span>
            </>
          )}
        </p>

        {/* Progressive Level Ladder Switcher: Preschool (Default) vs Next Level Games */}
        <div
          role="tablist"
          aria-label="Choose Game Level"
          className="psw-level-ladder-bar"
        >
          <span className="psw-level-ladder-label">
            🎯 Choose Level:
          </span>
          <button
            type="button"
            role="tab"
            aria-selected={levelTier === 'preschool'}
            onClick={() => switchLevelTier('preschool')}
            className={`psw-level-tab-btn ${levelTier === 'preschool' ? 'is-active psw-tab--preschool' : ''}`}
          >
            🌱 Level 1 · Play 2 Learn (Ages 3–6) ({preschoolCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={levelTier === 'next'}
            onClick={() => switchLevelTier('next')}
            className={`psw-level-tab-btn ${levelTier === 'next' ? 'is-active psw-tab--next' : ''}`}
          >
            🚀 Next Level Games · Ages 6–10 ({nextLevelCount})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={levelTier === 'all'}
            onClick={() => switchLevelTier('all')}
            className={`psw-level-tab-btn ${levelTier === 'all' ? 'is-active psw-tab--all' : ''}`}
          >
            🌟 All 24 Games ({ACTIVITIES.length})
          </button>
        </div>

        {/* Quick-launch: every game in the chosen level is one tap away */}
        <div role="tablist" aria-label="Game groups" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '10px 0 10px' }}>
          {([
            { id: 'all', icon: '🌟', sa: 'सर्वाः', en: 'All in Level', bg: '#fef3c7' },
            { id: 'creative', icon: '🎨', sa: 'रचना', en: 'Creative', bg: '#fce7f3' },
            { id: 'nature', icon: '🐾', sa: 'प्रकृतिः', en: 'Nature & World', bg: '#dcfce7' },
            { id: 'gurukul', icon: '🪔', sa: 'गुरुकुलम्', en: 'Gurukul', bg: '#ede9fe' },
          ] as const).map((g) => {
            const n = g.id === 'all' ? levelActivities.length : levelActivities.filter((x) => x.cluster === g.id).length;
            if (n === 0 && g.id !== 'all') return null;
            const on = selectedCluster === g.id;
            return (
              <button key={g.id} type="button" role="tab" aria-selected={on}
                onClick={() => { setSelectedCluster(g.id); setViewMode('cards'); soundEffects.playStrokeChime(); }}
                style={{ background: g.bg, border: on ? '3px solid #f472b6' : '2px solid #e2e8f0', borderRadius: 999, padding: '6px 14px', fontWeight: 700, color: '#1e293b', cursor: 'pointer' }}>
                {g.icon} <span lang="sa">{g.sa}</span> · {g.en} <span style={{ background: '#fff', borderRadius: 999, padding: '0 8px', marginLeft: 4 }}>{n}</span>
              </button>
            );
          })}
        </div>
        <div className="psw-quick-nav-header">
          <p className="psw-quick-nav-prompt">👇 Tap any picture card to jump straight into the game!</p>
          <span className="psw-quick-nav-counter">🌟 <strong>{displayedActivities.length}</strong> Games in this Level</span>
        </div>
        <nav aria-label="Wonder Playground games" className="psw-quick-nav-grid">
          {displayedActivities.map((act) => {
            const on = viewMode === 'play' && act.id === tab;
            const wasPlayed = playedTabs.includes(act.id);
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => launchActivity(act.id)}
                aria-current={on ? 'page' : undefined}
                className={`psw-quick-tile ${on ? 'is-active-tile' : ''}`}
                style={{
                  background: act.bannerGradient,
                  borderColor: on ? '#0f172a' : '#ffffff',
                }}
                title={`Play ${act.labelSa} (${act.labelEn})`}
              >
                {wasPlayed && (
                  <span className="psw-qt-star-badge" aria-label="Explored">
                    ⭐
                  </span>
                )}
                <span className="psw-qt-icon" aria-hidden="true">{act.icon}</span>
                <span className="psw-qt-en">{act.labelEn}</span>
                <span className="psw-qt-dev" lang="sa">{act.labelSa}</span>
              </button>
            );
          })}
        </nav>

        {/* View Mode Toggle Row */}
        <div className="psw-view-toggle-row">
          <div className="psw-vtr-kicker">
            <span>🌟</span>
            <span><strong>{displayedActivities.length}</strong> games · pick one and tap Play!</span>
          </div>
          <div className="psw-view-toggle-btns" role="tablist">
            <button
              type="button"
              className={`psw-view-mode-pill ${viewMode === 'cards' ? 'is-active' : ''}`}
              onClick={() => { setViewMode('cards'); soundEffects.playStrokeChime(); }}
            >
              <span>🎴</span> All games
            </button>
            <button
              type="button"
              className={`psw-view-mode-pill ${viewMode === 'play' ? 'is-active' : ''}`}
              onClick={() => launchActivity(tab)}
            >
              <span>{currentActivity.icon}</span> Playing: {currentActivity.labelEn}
            </button>
          </div>
        </div>
      </div>

      {/* Activity Cards Catalog Grid */}
      {viewMode === 'cards' && (
        <div className="psw-phet-catalog-grid" role="region" aria-label="Preschool Activity Cards">
          {displayedActivities.map((act) => {
            const isCurrent = act.id === tab;
            const wasPlayed = playedTabs.includes(act.id);
            return (
              <article
                key={act.id}
                className={`psw-code-card${isCurrent ? ' is-playing' : ''}`}
                style={{
                  '--card-accent': act.accentColor,
                  '--banner-bg': act.bannerGradient,
                } as React.CSSProperties}
              >
                <div className="psw-cc-banner">
                  {wasPlayed && (
                    <span className="psw-card-sticker-badge" title="Explored!">
                      ⭐ Explored
                    </span>
                  )}
                  {act.bannerVisual.image ? (
                    <div className="psw-cc-hero-art-wrap">
                      <img
                        src={act.bannerVisual.image}
                        alt={act.bannerVisual.imageAlt || act.labelEn}
                        className="psw-cc-hero-img"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.endsWith('.webp')) {
                            target.src = target.src.replace(/\.webp$/, '.jpg');
                          }
                        }}
                      />
                      <div className="psw-cc-hero-scrim" />
                    </div>
                  ) : (
                    <>
                      <div className="psw-cc-hero-pod">
                        <span className="psw-cc-lead-emoji" aria-hidden="true">{act.bannerVisual.emojiLead}</span>
                      </div>
                      <div className="psw-cc-decor-row" aria-hidden="true">
                        {act.bannerVisual.decorEmojis.slice(0, 4).map((em, i) => (
                          <span key={i} className="psw-cc-decor-bubble">{em}</span>
                        ))}
                      </div>
                    </>
                  )}
                  <div className="psw-cc-sa-ribbon" lang="sa">
                    {act.bannerVisual.taglineSa}
                  </div>
                </div>

                <div className="psw-cc-body">
                  <div className="psw-cc-meta-row">
                    <span className="psw-cc-grade-badge">{act.gradeBadge}</span>
                    <span className="psw-cc-cluster-badge">{act.clusterLabel}</span>
                  </div>

                  <h3 className="psw-cc-title">
                    <span className="psw-cc-title-icon" aria-hidden="true">{act.icon}</span>
                    <div className="psw-cc-title-text">
                      <strong className="psw-cc-title-en">{act.labelEn}</strong>
                      <span className="psw-cc-title-sa" lang="sa">{act.labelSa}</span>
                    </div>
                  </h3>

                  <p className="psw-cc-desc">{act.desc}</p>

                  <div className="psw-cc-feats-row">
                    {act.features.map((feat) => (
                      <span key={feat} className="psw-cc-feat-pill">{feat}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={`psw-cc-play-btn${isCurrent ? ' is-active-btn' : ''}`}
                    onClick={() => launchActivity(act.id)}
                  >
                    {isCurrent ? '▶ Keep Playing' : '▶ Play'}
                  </button>
                </div>
              </article>
            );
          })}

          {/* Cheerful Next-Level Upgrade Card at the end of Level 1 Preschool Catalog */}
          {levelTier === 'preschool' && (
            <article
              className="psw-code-card"
              style={{
                '--card-accent': '#6366f1',
                '--banner-bg': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 55%, #ec4899 100%)',
              } as React.CSSProperties}
            >
              <div className="psw-cc-banner" style={{ position: 'relative' }}>
                <span className="psw-cc-lead-emoji" aria-hidden="true">🚀</span>
                <div className="psw-cc-decor-row" aria-hidden="true">
                  <span>🌏</span><span>🗓️</span><span>🌶️</span><span>🌙</span><span>🌸</span><span>📖</span>
                </div>
                <div className="psw-cc-sa-ribbon" lang="sa">
                  <span className="sanskrit-safe-text">अग्रिम-स्तर-क्रीडाः</span> · Next Level!
                </div>
              </div>
              <div className="psw-cc-body">
                <div className="psw-cc-meta-row">
                  <span className="psw-cc-grade-badge">🚀 Ages 6–10</span>
                  <span className="psw-cc-cluster-badge">{nextLevelCount} Games</span>
                </div>
                <h3 className="psw-cc-title">
                  <span>🚀</span>
                  <span>Ready for Next Level Games?</span>
                </h3>
                <p className="psw-cc-desc">
                  Explore World Oceans &amp; Ancient Lands, 12 Lunar Months, 6 Seasons, Kitchen Spices, Professions, Moon Tithis &amp; 5 Elements!
                </p>
                <button
                  type="button"
                  className="psw-cc-play-btn"
                  onClick={() => switchLevelTier('next')}
                >
                  🚀 Open Next Level Games ➔
                </button>
              </div>
            </article>
          )}
        </div>
      )}

      {/* Active Game Play Arena */}
      {viewMode === 'play' && (
        <div ref={playArenaRef}>
          <div className="psw-play-arena-banner">
            <div className="psw-pab-left-nav">
              <button
                type="button"
                className="psw-pab-back-btn"
                onClick={() => {
                  setViewMode('cards');
                  soundEffects.playStrokeChime();
                }}
                title="Return to 24 Preschool Games Grid"
              >
                🎴 All 24 Preschool Games
              </button>
              {onBrowseMainLabs && (
                <button
                  type="button"
                  className="psw-pab-main-lab-btn"
                  onClick={onBrowseMainLabs}
                  title="Return to Complete Games Directory"
                >
                  🎮 🧭 All Games Hub
                </button>
              )}
            </div>

            <div className="psw-pab-info">
              <span className="psw-pab-hero-emoji">{currentActivity.icon}</span>
              <div className="psw-pab-titles">
                <span className="psw-pab-playing-kicker">Playing Game:</span>
                <strong className="psw-pab-en">{currentActivity.labelEn}</strong>
                <span className="psw-pab-sa" lang="sa">{currentActivity.labelSa}</span>
              </div>
              <SayBtn text={currentActivity.labelSa} label="Hear" className="psw-pab-say-chip" />

              {/* Quick Jump Selector */}
              <div className="psw-pab-switcher-wrap">
                <label htmlFor="psw-inarena-select" className="sr-only">
                  Switch game
                </label>
                <select
                  id="psw-inarena-select"
                  className="psw-pab-select"
                  value={tab}
                  onChange={(e) => launchActivity(e.target.value as PreschoolTab)}
                  title="Quick-switch to any of the 24 games"
                >
                  <optgroup label="🌱 Level 1 · Preschool (Ages 2–5)">
                    {ACTIVITIES.filter((a) => (a.level ?? 'preschool') !== 'next').map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.icon} {a.labelEn} · {a.labelSa}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🚀 Next Level Games (Ages 6–10)">
                    {ACTIVITIES.filter((a) => a.level === 'next').map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.icon} {a.labelEn} · {a.labelSa}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="psw-pab-right-group">
              <span className="psw-pab-cluster-badge">{currentActivity.clusterLabel.split('·')[0]}</span>
              <span className="psw-pab-counter">
                {stepperIdx + 1} / {stepperActivities.length}
              </span>
              <div className="psw-pab-stepper-pair">
                <button
                  type="button"
                  className="psw-pab-prev-btn"
                  disabled={stepperIdx <= 0}
                  onClick={() => {
                    if (stepperIdx > 0) {
                      const prev = stepperActivities[stepperIdx - 1];
                      launchActivity(prev.id);
                    }
                  }}
                  title={stepperIdx > 0 ? `Prev game: ${stepperActivities[stepperIdx - 1].labelEn}` : 'At first game in this tier'}
                >
                  ◀ Prev
                </button>
                <button
                  type="button"
                  className="psw-pab-next-btn"
                  disabled={stepperIdx >= stepperActivities.length - 1}
                  onClick={() => {
                    if (stepperIdx < stepperActivities.length - 1) {
                      const next = stepperActivities[stepperIdx + 1];
                      launchActivity(next.id);
                    }
                  }}
                  title={stepperIdx < stepperActivities.length - 1 ? `Next game: ${stepperActivities[stepperIdx + 1].labelEn}` : 'At last game in this tier'}
                >
                  Next ▶
                </button>
              </div>
            </div>
          </div>
          <div className="psw-what-to-do" role="status" aria-live="polite">
            <span className="psw-wtd-label">👉 What to do:</span>
            <span className="psw-wtd-text">{currentActivity.desc}</span>
          </div>
          {winBurst > 0 && (
            <div className="psw-win-burst" key={winBurst} role="status" aria-live="assertive">
              <span>⭐</span><span>🌟</span><span>⭐</span>
              <strong>Great job! शोभनम्!</strong>
            </div>
          )}

      {/* ===================================================================
          TAB 0: VARNAMALA LETTER GARDEN (वर्णमाला-वाटिका)
         =================================================================== */}
      {tab === 'varnamala' && (
        <PreschoolVarnamalaGame onEarnStar={celebrateWin} />
      )}

      {/* ===================================================================
          TAB 1: SHAPES PLAYGROUND (आकाराः)
         =================================================================== */}
      {tab === 'shapes' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🎨 आकाराः · Sacred &amp; Everyday Shapes</h3>
              <p className="psw-section-sub">Tap any shape to hear its sweet Sanskrit name and see it dance!</p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={startShapeQuiz}
            >
              {shapeQuizTarget ? `❓ Find: ${shapeQuizTarget.dev} (${shapeQuizTarget.en})` : '⭐ Find this shape!'}
            </button>
          </div>

          {shapeQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Find and tap the <strong>{shapeQuizTarget.dev}</strong> ({shapeQuizTarget.en})! {quizScore > 0 && `⭐ Stars: ${quizScore}`}</span>
              <button
                type="button"
                className="psw-quiz-speaker"
                onClick={() => playPronunciation(shapeQuizTarget.dev)}
                title="Hear again"
              >
                🔊 Listen Again
              </button>
            </div>
          )}

          {/* =========================================================
              INTERACTIVE TWIN GAME CARDS (आकाराः & ज्यामितीय प्रतिरूप)
             ========================================================= */}
          <div className="psw-shape-posters-wrap">
            <div className="psw-sp-header-row">
              <div className="psw-sp-title-area">
                <span className="psw-sp-kicker">🎴 Authentic Game Card Illustrations</span>
                <h4 className="psw-sp-title">Interactive Gurukul Geometry Cards</h4>
              </div>
              <div className="psw-sp-pill-group" role="tablist" aria-label="Game card illustrations">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeShapePoster === 'shapes'}
                  className={`psw-sp-pill ${activeShapePoster === 'shapes' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveShapePoster('shapes');
                    soundEffects.playStrokeChime();
                  }}
                >
                  🎨 Card 1: Shapes &amp; Forms (आकाराः)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeShapePoster === 'patterns'}
                  className={`psw-sp-pill ${activeShapePoster === 'patterns' ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveShapePoster('patterns');
                    soundEffects.playStrokeChime();
                  }}
                >
                  📐 Card 2: Patterns (ज्यामितीय प्रतिरूप)
                </button>
              </div>
            </div>

            {/* Poster Card Display Frame */}
            <div className="psw-sp-card-frame">
              {activeShapePoster === 'shapes' ? (
                <div className="psw-sp-view">
                  <div className="psw-sp-img-box">
                    <img
                      src="/images/jyamiti-shapes.webp"
                      alt="आकाराः • Sacred & Everyday Shapes | Shapes & Forms • आकाराः"
                      className="psw-sp-hero-image"
                      loading="eager"
                      width="1024"
                      height="764"
                    />
                    <div className="psw-sp-overlay-tag">
                      🔍 Tap any shape pill below to highlight it &amp; hear Sanskrit pronunciation!
                    </div>
                  </div>
                  {/* Interactive Shape Chips matching the image */}
                  <div className="psw-sp-chips-bar">
                    <span className="psw-sp-chips-lead">Find in Picture:</span>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'circle')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      ☀️ वृत्तम् (Circle · Sun)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'square')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      🟩 चतुरस्रम् (Square · Frame)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'triangle')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      🔺 त्रिकोणम् (Triangle · Blocks)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'star')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      ⭐ तारका (Star · Shooting Star)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'oval')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      🥚 अण्डाकारः (Oval · Nest Egg)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'crescent')!;
                        setSelectedShape(s);
                        speakShapeWithExample(s.dev, s.example);
                      }}
                    >
                      🌙 अर्धचन्द्रः (Crescent · Moon)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="psw-sp-view">
                  <div className="psw-sp-img-box">
                    <img
                      src="/images/jyamiti-patterns.webp"
                      alt="आकाराः • Sacred & Everyday Shapes | Geometrical Patterns • ज्यामितीय प्रतिरूप"
                      className="psw-sp-hero-image"
                      loading="eager"
                      width="1024"
                      height="600"
                    />
                    <div className="psw-sp-overlay-tag">
                      💠 Explore symmetry, polygon wooden tiles &amp; sacred mandalas!
                    </div>
                  </div>
                  {/* Interactive Pattern Chips */}
                  <div className="psw-sp-chips-bar">
                    <span className="psw-sp-chips-lead">Explore Patterns:</span>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'triangle')!;
                        setSelectedShape(s);
                        playPronunciation('त्रिकोणम्');
                      }}
                    >
                      🔺 त्रिकोणम् (Triangle Tiles)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'diamond')!;
                        setSelectedShape(s);
                        playPronunciation('समचतुर्भुजम्');
                      }}
                    >
                      🪁 समचतुर्भुजम् (Diamond Rhombus)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        const s = SHAPES.find(x => x.id === 'hexagon')!;
                        setSelectedShape(s);
                        playPronunciation('षट्कोणम्');
                      }}
                    >
                      ⬡ षट्कोणम् (Hexagon Symmetry)
                    </button>
                    <button
                      type="button"
                      className="psw-sp-chip"
                      onClick={() => {
                        soundEffects.playCelebrationChime();
                        playPronunciation('ज्यामितीय प्रतिरूप');
                      }}
                    >
                      🌸 मण्डल-प्रतिरूपम् (Mandala Tangram)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ppd-pack-bar" role="tablist" aria-label="Shape packs">
            {([
              { id: 'first6', label: '🟢 Level 1: First 6 Shapes (Ages 2–4)', bg: '#dcfce7' },
              { id: 'more2d', label: '🚀 Next Level: Polygons (6)', bg: '#e0f2fe' },
              { id: '3d', label: '🎲 Next Level: 3D Solids (4)', bg: '#ede9fe' },
              { id: 'all', label: '🌟 All 16 Shapes', bg: '#fef3c7' },
            ] as const).map((pk) => (
              <button
                key={pk.id}
                type="button"
                role="tab"
                aria-selected={shapePack === pk.id}
                className={`bharat-pack-chip ${shapePack === pk.id ? 'is-active' : ''}`}
                style={{ background: pk.bg, borderColor: shapePack === pk.id ? '#ec4899' : '#cbd5e1' }}
                onClick={() => {
                  setShapePack(pk.id);
                  setShapeQuizTarget(null);
                  soundEffects.playStrokeChime();
                }}
              >
                {pk.label}
              </button>
            ))}
          </div>

          <div className="psw-shapes-grid">
            {visibleShapes.map((s) => {
              const isSelected = selectedShape.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className={`psw-shape-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleShapeClick(s)}
                  style={{ '--shape-color': s.color } as React.CSSProperties}
                  aria-pressed={isSelected}
                >
                  <div className="psw-shape-svg-wrap">
                    {s.svgType === 'circle' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <circle cx="50" cy="50" r="42" fill={s.color} />
                        <circle cx="38" cy="42" r="5" fill="#ffffff" />
                        <circle cx="62" cy="42" r="5" fill="#ffffff" />
                        <path d="M 38 60 Q 50 72 62 60" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'square' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <rect x="15" y="15" width="70" height="70" rx="14" fill={s.color} />
                        <circle cx="38" cy="42" r="5" fill="#ffffff" />
                        <circle cx="62" cy="42" r="5" fill="#ffffff" />
                        <path d="M 38 60 Q 50 72 62 60" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'triangle' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="50,14 88,82 12,82" fill={s.color} />
                        <circle cx="42" cy="54" r="4" fill="#ffffff" />
                        <circle cx="58" cy="54" r="4" fill="#ffffff" />
                        <path d="M 44 68 Q 50 74 56 68" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'star' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="50,10 61,38 92,38 67,56 76,86 50,68 24,86 33,56 8,38 39,38" fill={s.color} />
                        <circle cx="44" cy="48" r="4" fill="#ffffff" />
                        <circle cx="56" cy="48" r="4" fill="#ffffff" />
                        <path d="M 45 58 Q 50 63 55 58" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'oval' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <ellipse cx="50" cy="50" rx="42" ry="30" fill={s.color} />
                        <circle cx="40" cy="44" r="4" fill="#ffffff" />
                        <circle cx="60" cy="44" r="4" fill="#ffffff" />
                        <path d="M 40 58 Q 50 68 60 58" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'crescent' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <path d="M 55 12 A 38 38 0 1 0 55 88 A 28 28 0 0 1 55 12 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="4" strokeLinejoin="round" />
                        <path d="M 52 18 A 32 32 0 0 0 52 82" stroke="#f59e0b" strokeWidth="3" fill="none" opacity="0.55" strokeLinecap="round" />
                        <circle cx="34" cy="44" r="4" fill="#78350f" />
                        <path d="M 30 56 Q 38 64 42 56" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'rectangle' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <rect x="8" y="24" width="84" height="52" rx="12" fill={s.color} />
                        <circle cx="40" cy="42" r="4" fill="#ffffff" />
<circle cx="60" cy="42" r="4" fill="#ffffff" />
<path d="M 41 55 Q 50 64 59 55" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'diamond' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="50,8 90,50 50,92 10,50" fill={s.color} />
                        <circle cx="40" cy="44" r="4" fill="#ffffff" />
<circle cx="60" cy="44" r="4" fill="#ffffff" />
<path d="M 41 57 Q 50 66 59 57" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'pentagon' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="50,8 92,40 76,90 24,90 8,40" fill={s.color} />
                        <circle cx="40" cy="46" r="4" fill="#ffffff" />
<circle cx="60" cy="46" r="4" fill="#ffffff" />
<path d="M 41 59 Q 50 68 59 59" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'hexagon' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="28,12 72,12 94,50 72,88 28,88 6,50" fill={s.color} />
                        <circle cx="40" cy="44" r="4" fill="#ffffff" />
<circle cx="60" cy="44" r="4" fill="#ffffff" />
<path d="M 41 57 Q 50 66 59 57" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'semicircle' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <path d="M 6 70 A 44 44 0 0 1 94 70 Z" fill={s.color} />
                        <circle cx="40" cy="48" r="4" fill="#ffffff" />
<circle cx="60" cy="48" r="4" fill="#ffffff" />
<path d="M 41 61 Q 50 70 59 61" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'heart' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <path d="M 50 90 C 10 62 4 40 14 24 C 26 8 46 14 50 30 C 54 14 74 8 86 24 C 96 40 90 62 50 90 Z" fill={s.color} />
                        <circle cx="40" cy="40" r="4" fill="#ffffff" />
<circle cx="60" cy="40" r="4" fill="#ffffff" />
<path d="M 41 53 Q 50 62 59 53" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'cube' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="18,32 34,16 86,16 70,32" fill={s.color} opacity="0.7" /><polygon points="70,32 86,16 86,68 70,84" fill={s.color} opacity="0.5" /><rect x="18" y="32" width="52" height="52" fill={s.color} />
                        <circle cx="40" cy="50" r="4" fill="#ffffff" />
<circle cx="60" cy="50" r="4" fill="#ffffff" />
<path d="M 41 63 Q 50 72 59 63" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'sphere' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <circle cx="50" cy="50" r="42" fill={s.color} /><ellipse cx="50" cy="50" rx="42" ry="12" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="2" /><circle cx="34" cy="30" r="8" fill="#ffffff" opacity="0.45" />
                        <circle cx="40" cy="44" r="4" fill="#ffffff" />
<circle cx="60" cy="44" r="4" fill="#ffffff" />
<path d="M 41 57 Q 50 66 59 57" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'cone' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <polygon points="50,8 86,80 14,80" fill={s.color} /><ellipse cx="50" cy="80" rx="36" ry="10" fill={s.color} opacity="0.7" />
                        <circle cx="40" cy="54" r="4" fill="#ffffff" />
<circle cx="60" cy="54" r="4" fill="#ffffff" />
<path d="M 41 67 Q 50 76 59 67" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                    {s.svgType === 'cylinder' && (
                      <svg viewBox="0 0 100 100" className="psw-shape-svg">
                        <rect x="18" y="20" width="64" height="62" fill={s.color} /><ellipse cx="50" cy="82" rx="32" ry="10" fill={s.color} /><ellipse cx="50" cy="20" rx="32" ry="10" fill={s.color} opacity="0.65" />
                        <circle cx="40" cy="42" r="4" fill="#ffffff" />
<circle cx="60" cy="42" r="4" fill="#ffffff" />
<path d="M 41 55 Q 50 64 59 55" stroke="#ffffff" strokeWidth="4" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <div className="psw-shape-meta">
                    <span className="psw-shape-dev" lang="sa">{s.dev}</span>
                    <span className="psw-shape-en">{s.en}</span>
                    <small className="psw-shape-iast">{s.iast}</small>
                    <small className="psw-shape-example">{s.example}</small>
                    {EXAMPLE_IAST[exampleSa(s.example) || ''] && <small className="psw-shape-iast psw-example-iast">{EXAMPLE_IAST[exampleSa(s.example) || '']}</small>}
                  </div>
                  <span className="psw-say-row">
                    <SayBtn text={s.dev} label="Name" />
                    {exampleSa(s.example) && <SayBtn text={exampleSa(s.example)} label="Example" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Shape Detail Card */}
          <div className="psw-detail-spotlight" style={{ borderColor: selectedShape.color }}>
            <span className="psw-spotlight-icon" style={{ background: selectedShape.color }}>★</span>
            <div>
              <div className="psw-spotlight-title">
                <span lang="sa">{selectedShape.dev}</span> · {selectedShape.en} ({selectedShape.iast})
              </div>
              <p className="psw-spotlight-desc">{selectedShape.fact} <strong>Like: {selectedShape.example}</strong></p>
            </div>
            <button
              type="button"
              className="psw-action-pill"
              onClick={() => speakShapeWithExample(selectedShape.dev, selectedShape.example)}
            >
              🔊 Hear Sanskrit: {selectedShape.dev}{exampleSa(selectedShape.example) ? ` → ${exampleSa(selectedShape.example)}` : ''}
            </button>
          </div>

          {/* =========================================================
              TRADITIONAL INDIAN GEOMETRY NOTE: ज्यामिति (Jyāmiti)
             ========================================================= */}
          <section className="psw-jyamiti-card" aria-label="Indian Origins of Geometry">
            <div className="psw-jc-header">
              <div className="psw-jc-badge-row">
                <span className="psw-jc-badge">📐 भारतीय-गणित-परम्परा · Ancient Indian Geometry</span>
                <button
                  type="button"
                  className="psw-jc-audio-chip"
                  onClick={() => {
                    soundEffects.playStrokeChime();
                    playPronunciation('ज्यामिति');
                  }}
                  title="Hear pronunciation of ज्यामिति"
                >
                  🔊 Hear "ज्यामिति" (Jyāmiti)
                </button>
              </div>
              <h4 className="psw-jc-title">
                The Traditional Indian Term for Geometry: <span lang="sa" className="psw-jc-sa">ज्यामिति</span> <span className="psw-jc-iast">(Jyāmiti)</span>
              </h4>
              <p className="psw-jc-lead">
                The traditional Indian term for geometry is <strong>ज्यामिति (Jyāmiti)</strong>, made of two core Sanskrit words:
              </p>
            </div>

            {/* Etymological breakdown equation */}
            <div className="psw-jc-breakdown">
              <div className="psw-jcb-card">
                <div className="psw-jcb-role">Word 1 · संस्कृत-पदम्</div>
                <div className="psw-jcb-word" lang="sa">ज्या</div>
                <div className="psw-jcb-translit">Jyā</div>
                <div className="psw-jcb-meaning">
                  Originally meaning an <strong>earth-boundary</strong>, a <strong>chord</strong>, or an <strong>arc</strong>.
                </div>
                <button
                  type="button"
                  className="psw-jcb-say-btn"
                  onClick={() => {
                    soundEffects.playBubblePop();
                    playPronunciation('ज्या');
                  }}
                >
                  🔊 ज्या (Jyā)
                </button>
              </div>

              <div className="psw-jcb-operator" aria-hidden="true">➕</div>

              <div className="psw-jcb-card">
                <div className="psw-jcb-role">Word 2 · संस्कृत-पदम्</div>
                <div className="psw-jcb-word" lang="sa">मिति</div>
                <div className="psw-jcb-translit">Miti</div>
                <div className="psw-jcb-meaning">
                  Meaning <strong>measurement</strong> or the <strong>act of measuring</strong>.
                </div>
                <button
                  type="button"
                  className="psw-jcb-say-btn"
                  onClick={() => {
                    soundEffects.playBubblePop();
                    playPronunciation('मिति');
                  }}
                >
                  🔊 मिति (Miti)
                </button>
              </div>

              <div className="psw-jcb-operator" aria-hidden="true">🟰</div>

              <div className="psw-jcb-card psw-jcb-card--result">
                <div className="psw-jcb-role">Compound Result · सामासिक-पदम्</div>
                <div className="psw-jcb-word psw-jcb-word--accent" lang="sa">ज्यामिति</div>
                <div className="psw-jcb-translit">Jyāmiti</div>
                <div className="psw-jcb-meaning">
                  Literal Meaning: <strong className="psw-jcb-highlight">"Earth-measurement"</strong>
                </div>
                <button
                  type="button"
                  className="psw-jcb-say-btn psw-jcb-say-btn--primary"
                  onClick={() => {
                    soundEffects.playSuccessDing();
                    playPronunciation('ज्यामिति');
                  }}
                >
                  🔊 ज्यामिति (Jyāmiti)
                </button>
              </div>
            </div>

            {/* Mirror with Greek Geometry callout */}
            <div className="psw-jc-mirror-box">
              <div className="psw-jcm-icon">🌍 ↔️ 📐</div>
              <div className="psw-jcm-content">
                <div className="psw-jcm-title">Mirroring the Greek Origin: Earth + Measurement</div>
                <p className="psw-jcm-text">
                  Therefore, the literal meaning of the word is <strong>"Earth-measurement"</strong>, which perfectly mirrors the Greek origin of the word <strong>Geometry</strong> (<em>Geo</em> = Earth + <em>Metron</em> = Measurement).
                </p>
                <div className="psw-jcm-pills">
                  <span className="psw-jcm-pill">
                    🇮🇳 <strong>Sanskrit</strong>: ज्या (Jyā = Earth/Chord) + मिति (Miti = Measurement) = <em>ज्यामिति (Jyāmiti)</em>
                  </span>
                  <span className="psw-jcm-pill">
                    🏛️ <strong>Greek</strong>: Geo (Earth) + Metron (Measurement) = <em>Geometry</em>
                  </span>
                </div>
              </div>
            </div>

            {/* Regional Variations Section */}
            <div className="psw-jc-regional">
              <h5 className="psw-jcr-title">🌐 Regional Variations</h5>
              <p className="psw-jcr-desc">
                Depending on the language and script, you will encounter these closely related variations:
              </p>
              <div className="psw-jcr-grid">
                <div className="psw-jcr-card">
                  <div className="psw-jcr-head">
                    <span className="psw-jcr-flag">🕉️</span>
                    <span className="psw-jcr-lang">Sanskrit / Hindi</span>
                  </div>
                  <div className="psw-jcr-script" lang="sa">ज्यामिति</div>
                  <div className="psw-jcr-roman">Jyāmiti</div>
                  <button
                    type="button"
                    className="psw-jcr-audio"
                    onClick={() => {
                      soundEffects.playStrokeChime();
                      playPronunciation('ज्यामिति');
                    }}
                  >
                    🔊 Hear ज्यामिति
                  </button>
                </div>

                <div className="psw-jcr-card">
                  <div className="psw-jcr-head">
                    <span className="psw-jcr-flag">🌸</span>
                    <span className="psw-jcr-lang">Bengali / Odia / Assamese</span>
                  </div>
                  <div className="psw-jcr-script" lang="bn">জ্যামিতি</div>
                  <div className="psw-jcr-roman">Jōmiti or Jyāmiti</div>
                  <button
                    type="button"
                    className="psw-jcr-audio"
                    onClick={() => {
                      soundEffects.playStrokeChime();
                      playPronunciation('জ্যামিতি');
                    }}
                  >
                    🔊 Hear জ্যামিতি
                  </button>
                </div>
              </div>
            </div>

            {/* Sacred Geometry & Everyday Shapes Visual Gallery */}
            <div className="psw-jc-gallery">
              <h5 className="psw-jcg-title">🖼️ Visual Exploration: Sacred &amp; Everyday Shapes</h5>
              <div className="psw-jcg-grid">
                <figure className="psw-jcg-figure">
                  <div className="psw-jcg-frame">
                    <picture>
                      <source srcSet="/images/jyamiti-shapes.webp" type="image/webp" />
                      <img
                        src="/images/jyamiti-shapes.jpg"
                        alt="आकाराः · Sacred & Everyday Shapes | Shapes & Forms under the Gurukul Tree"
                        className="psw-jcg-img"
                        loading="lazy"
                        width="600"
                        height="450"
                      />
                    </picture>
                    <span className="psw-jcg-tag">आकाराः · Shapes &amp; Forms</span>
                  </div>
                  <figcaption className="psw-jcg-caption">
                    <strong>Gurukul Shapes Playground:</strong> Children exploring triangles (त्रिकोण), squares (चतुरस्र), circles (वृत्त), stars (तारका), and crescent moons under the sacred banyan tree.
                  </figcaption>
                </figure>

                <figure className="psw-jcg-figure">
                  <div className="psw-jcg-frame">
                    <picture>
                      <source srcSet="/images/jyamiti-patterns.webp" type="image/webp" />
                      <img
                        src="/images/jyamiti-patterns.jpg"
                        alt="ज्यामितीय प्रतिरूप · Geometrical Patterns & Mandala Tangram Puzzle"
                        className="psw-jcg-img"
                        loading="lazy"
                        width="1024"
                        height="600"
                      />
                    </picture>
                    <span className="psw-jcg-tag">ज्यामितीय प्रतिरूप · Geometrical Patterns</span>
                  </div>
                  <figcaption className="psw-jcg-caption">
                    <strong>Geometrical Patterns (ज्यामितीय प्रतिरूप):</strong> Traditional mandala &amp; tangram pattern board with polygon wooden tiles exploring symmetry and spatial harmony.
                  </figcaption>
                </figure>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ===================================================================
          TAB: COLORS & MAGIC MIX PLAYGROUND (वर्णाः)
         =================================================================== */}
      {tab === 'colors' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🌈 वर्णाः · Rainbow Colors &amp; Magic Mixing</h3>
              <p className="psw-section-sub">
                Tap vibrant colors to hear their sweet Sanskrit names! Then mix any two colors in the Magic Cauldron!
              </p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={startColorQuiz}
            >
              {colorQuizTarget ? `❓ Find: ${colorQuizTarget.dev} (${colorQuizTarget.en})` : '⭐ Find this color!'}
            </button>
          </div>

          {colorQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Find and tap the <strong>{colorQuizTarget.dev}</strong> ({colorQuizTarget.en})! {colorScore > 0 && `⭐ Stars: ${colorScore}`}</span>
              <button
                type="button"
                className="psw-quiz-speaker"
                onClick={() => playPronunciation(colorQuizTarget.dev)}
                title="Hear again"
              >
                🔊 Listen Again
              </button>
            </div>
          )}

          <div className="psw-colors-row">
          <div className="psw-colors-grid psw-colors-row-grid">
            {COLORS.map((c) => {
              const isSelected = selectedColor.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`psw-color-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => handleColorTap(c)}
                  style={{ borderColor: isSelected ? c.hex : undefined }}
                >
                  <div className="pcc-blob" style={{ background: c.hex }}>
                    <span>{c.itemIcon}</span>
                  </div>
                  <strong className="pcc-sa" lang="sa">{c.dev}</strong>
                  <span className="pcc-iast" style={{ fontSize: '0.82rem', fontStyle: 'italic', color: '#64748b', fontWeight: 600 }}>{c.iast}</span>
                  <span className="pcc-en">{c.en}</span>
                  <span className="pcc-example">{c.itemDev} ({c.itemEn}) <SayBtn text={c.itemDev} /></span>
                  <SayBtn text={c.dev} label="Hear" />
                </button>
              );
            })}
          </div>

          {/* Magic Color Mixing Cauldron */}
          <div className="psw-magic-mixer-box psw-colors-mixer-side">
            <h4 className="psw-mixer-title">🧪 <span className="sanskrit-safe-text" lang="sa">वर्ण-मिश्रण-क्रीडा</span> · Magic Color Mixing Cauldron!</h4>
            <p className="psw-mixer-sub">
              Tap any two colors, then slide to add more of one — watch the colour change!
            </p>
            <div className="psw-mixer-slots">
              <div
                className={`psw-mixer-slot ${colorMixSlotA ? 'has-color' : ''}`}
                style={{ background: colorMixSlotA ? colorMixSlotA.hex : undefined }}
              >
                {colorMixSlotA ? colorMixSlotA.itemIcon : '🎨 1'}
              </div>
              <span className="psw-mixer-plus">+</span>
              <div
                className={`psw-mixer-slot ${colorMixSlotB ? 'has-color' : ''}`}
                style={{ background: colorMixSlotB ? colorMixSlotB.hex : undefined }}
              >
                {colorMixSlotB ? colorMixSlotB.itemIcon : '🎨 2'}
              </div>
              <span className="psw-mixer-equals">=</span>
              <div
                className="psw-mixer-slot has-color"
                style={{ background: mixResult && colorMixSlotA && colorMixSlotB ? pswMixAt(colorMixSlotA.hex, mixResult.hex, colorMixSlotB.hex, mixRatio) : '#f1f5f9' }}
              >
                {mixResult ? mixResult.icon : '✨'}
              </div>
            </div>

            {mixResult && colorMixSlotA && colorMixSlotB ? (() => {
              const a = colorMixSlotA, b = colorMixSlotB;
              const live = pswMixAt(a.hex, mixResult.hex, b.hex, mixRatio);
              const partsB = Math.round(mixRatio / 25), partsA = 4 - partsB;
              const stops = [0, 25, 50, 75, 100];
              return (
              <div className="psw-blend-box" role="group" aria-label="Colour blend slider">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div aria-hidden style={{ width: 64, height: 64, borderRadius: '50%', background: live, border: '4px solid #fff', boxShadow: '0 4px 14px rgba(0,0,0,.15)', transition: 'background .15s', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '1.15rem', color: '#0f172a', display: 'block' }} lang="sa">
                      {mixRatio <= 10 ? a.dev : mixRatio >= 90 ? b.dev : mixResult.dev}
                    </strong>
                    <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>
                      {mixRatio <= 10 ? `Almost all ${a.en}` : mixRatio >= 90 ? `Almost all ${b.en}` : mixRatio < 40 ? `${mixResult.en} · more ${a.en}` : mixRatio > 60 ? `${mixResult.en} · more ${b.en}` : `${mixResult.icon} ${mixResult.en} (equal)`}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, color: '#78350f', marginBottom: 4 }}>
                  <span>⬅ More <span lang="sa">{a.dev}</span></span>
                  <span>⚖️ Equal</span>
                  <span>More <span lang="sa">{b.dev}</span> ➡</span>
                </div>
                <div style={{ position: 'relative', height: 26, borderRadius: 999, border: '3px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,.12)', background: `linear-gradient(90deg, ${a.hex}, ${mixResult.hex}, ${b.hex})` }}>
                  <div aria-hidden style={{ position: 'absolute', top: -6, left: `calc(${mixRatio}% - 16px)`, width: 32, height: 32, borderRadius: '50%', background: live, border: '4px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,.3)', pointerEvents: 'none', transition: 'left .1s' }} />
                  <input type="range" min={0} max={100} step={1} value={mixRatio}
                    onChange={(e) => setMixRatio(Number(e.target.value))}
                    aria-label={`Amount of ${b.en}`}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', margin: 0 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginTop: 12 }}>
                  {stops.map((r) => (
                    <button key={r} type="button" onClick={() => { setMixRatio(r); soundEffects.playStrokeChime(); }}
                      title={`${4 - r / 25} ${a.en} + ${r / 25} ${b.en}`}
                      style={{ flex: 1, padding: '6px 2px', borderRadius: 14, border: mixRatio === r ? '3px solid #f59e0b' : '2px solid #fde68a', background: '#fffbeb', cursor: 'pointer' }}>
                      <span aria-hidden style={{ display: 'block', width: 28, height: 28, margin: '0 auto 2px', borderRadius: '50%', background: pswMixAt(a.hex, mixResult.hex, b.hex, r), border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,.2)' }} />
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#78350f' }}>{a.itemIcon}{4 - r / 25} {b.itemIcon}{r / 25}</span>
                    </button>
                  ))}
                </div>
                <p style={{ margin: '10px 0 6px', fontSize: '0.85rem', color: '#92400e', fontWeight: 700 }}>
                  🥄 {partsA} spoon{partsA === 1 ? '' : 's'} of {a.en} + {partsB} spoon{partsB === 1 ? '' : 's'} of {b.en} — slide to add more of one colour!
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button type="button" className="psw-action-pill" onClick={() => playPronunciation(mixRatio <= 10 ? a.dev : mixRatio >= 90 ? b.dev : mixResult.dev)}>🔊 Hear</button>
                  <button type="button" className="psw-action-pill" onClick={resetColorMixer}>Mix Again ↺</button>
                </div>
              </div>
              );
            })() : (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e', fontWeight: 700 }}>
                {!colorMixSlotA ? '👉 Tap a color to place it in Slot 1' : '👉 Now tap a second color to mix!'}
              </p>
            )}
          </div>
          </div>

          <details style={{ margin: '14px 0 4px', padding: '12px 16px', borderRadius: 18, background: 'linear-gradient(135deg,#fffbeb 0%,#fef3c7 50%,#fce7f3 100%)', border: '2px solid #f59e0b', color: '#1e293b' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 800, color: '#7c2d12', fontSize: '0.95rem' }}>
              🚀 Next Level &amp; Parent Story Corner: Sapta-varṇa, Veda Facts &amp; Ancient Dyes
            </summary>
            <div style={{ marginTop: 10 }}>
              <div className="psw-veda-fact" role="status" style={{ margin: '0 0 10px', padding: '10px 14px', borderRadius: 14, background: '#ffffffd9', border: `2px solid ${selectedColor.hex === '#f8fafc' ? '#e2e8f0' : selectedColor.hex}`, color: '#78350f', fontWeight: 700, fontSize: '0.92rem' }}>
                📜 Veda fact · <span lang="sa">{selectedColor.dev}</span> <em style={{ color: '#92400e' }}>({selectedColor.iast})</em>: {selectedColor.vedaFact}
              </div>
              <p style={{ margin: '0 0 6px', fontSize: '0.9rem', fontWeight: 600 }}>
                ☀️🐎 <strong lang="sa">सप्तवर्णाः</strong> · Wise poets sang that Sūrya rides a chariot pulled by seven horses — seven rainbow colours hidden inside white sunlight! <SayBtn text="सप्त वर्णाः" />
              </p>
              <p style={{ margin: '0 0 8px', fontSize: '0.86rem', color: '#334155' }}>
                🧑‍🏫 <strong>Chāndogya Upaniṣad &amp; Ajanta dyes:</strong> Indian master dyers blended blue from <em>nīlī</em> (indigo), red from <em>mañjiṣṭhā</em> (madder), and yellow from <em>haridrā</em> (turmeric).
              </p>
              <a href="/sapta-varna" className="psw-action-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>
                📖 Read the full Sapta-varṇa story →
              </a>
            </div>
          </details>

        </div>
      )}

      {tab === 'insects' && (
        <LivingNatureExplorer
          items={INSECTS}
          title="🦋 कीटाः · Bug Garden"
          sub="Tap a little bug to hear its buzz or chime, play Picture Quest, or flip Memory Twins!"
          whereLabel="📍 Lives:"
          accent="#22c55e"
          onEarnStar={celebrateWin}
        />
      )}
      {tab === 'birds' && (
        <LivingNatureExplorer
          items={BIRDS}
          title="🦜 पक्षिणः · Bird Sky"
          sub="Hear koels, owls & roosters sing, play Bird Picture Quest, or flip Memory Twins!"
          whereLabel="📍 Lives:"
          accent="#3b82f6"
          onEarnStar={celebrateWin}
        />
      )}
      {tab === 'flowers' && (
        <LivingNatureExplorer
          items={FLOWERS}
          title="🌸 पुष्पाणि · Flower Garden"
          sub="Touch blooming flowers to hear gentle harp chimes, play Flower Quest, or Memory Flip!"
          whereLabel="📍 Grows:"
          accent="#ec4899"
          onEarnStar={celebrateWin}
        />
      )}

      {tab === 'yoga' && <YogaPoseStudio poses={YOGA_POSES} onEarnStar={celebrateWin} />}
      {tab === 'relations' && (
        <ToddlerCardQuestDeck
          items={RELATIONS_CARDS}
          icon="👪"
          titleSa="परिवारः"
          titleEn="My Family & Friends"
          subtitle="Tap family frames to hear Sanskrit & home-language words, or play 4-Picture Quest!"
          accentColor="#ec4899"
          packLabels={['💖 Home Family', '👴 Grandparents & Friends']}
          onEarnStar={celebrateWin}
        />
      )}
      {tab === 'actions' && <ActionPlayStudio actions={ACTIONS} onEarnStar={celebrateWin} />}
      {tab === 'spices' && <SpiceAdventureDeck onEarnStar={celebrateWin} />}
      {tab === 'months' && (
        <ToddlerCardQuestDeck
          items={MONTHS}
          icon="🗓️"
          titleSa="द्वादश मासाः"
          titleEn="12 Sanskrit Months & Seasons"
          subtitle="Explore all 12 months paired with India’s 6 Ṛtus (Seasons) & play Calendar Quest!"
          accentColor="#0284c7"
          packLabels={['🌸 Spring to Monsoon', '🪔 Autumn to Holi']}
          onEarnStar={celebrateWin}
        />
      )}
      {tab === 'work' && (
        <ToddlerCardQuestDeck
          items={WORK_TYPES}
          icon="🧑‍🌾"
          titleSa="व्यवसायाः"
          titleEn="Village Helpers & Work"
          subtitle="Meet farmers, gurus, doctors & artisans — tap to hear Sanskrit or play 4-Picture Quest!"
          accentColor="#65a30d"
          packLabels={['🌾 Village Pillars', '🎶 Arts & Care']}
          onEarnStar={celebrateWin}
        />
      )}
      {tab === 'bharat' && <BharatMapExplorer onEarnStar={celebrateWin} />}
      {tab === 'vishva' && <VishvaMatchGame onEarnStar={celebrateWin} />}

      {tab === 'festivals' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🪔 उत्सवाः · Festival Fair</h3>
              <p className="psw-section-sub">Tap a festival to hear its Sanskrit name and learn one happy fact!</p>
            </div>
            <button type="button" className="psw-quiz-btn" onClick={() => {
              const r = FESTIVALS[Math.floor(Math.random() * FESTIVALS.length)];
              setFestQuiz(r); setFestMsg(''); playPronunciation(r.dev);
            }}>
              {festQuiz ? `❓ Find: ${festQuiz.dev}` : '⭐ Festival Quiz'}
            </button>
          </div>
          {festQuiz && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Tap <strong lang="sa">{festQuiz.dev}</strong> ({festQuiz.iast}) <SayBtn text={festQuiz.dev} /> {festStars > 0 && `⭐ Stars: ${festStars}`} {festMsg}</span>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {FESTIVALS.map((f) => (
              <button key={f.id} type="button" onClick={() => {
                setFestival(f); playPronunciation(f.dev); soundEffects.playStrokeChime();
                if (festQuiz) {
                  if (f.id === festQuiz.id) { soundEffects.playCelebrationChime(); celebrateWin(); setFestStars((n) => n + 1); setFestMsg('🎉 Yes!'); setFestQuiz(null); }
                  else setFestMsg('🙂 Try again!');
                }
              }} style={{ background: f.bg, border: festival.id === f.id ? '3px solid #f472b6' : '2px solid #bfdbfe', borderRadius: 18, padding: '14px 8px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#1e293b' }}>
                {f.img ? <img src={f.img} alt={f.en} loading="lazy" width={112} height={112} style={{ width: 112, height: 112, objectFit: 'contain' }} /> : <span style={{ fontSize: 40 }}>{f.emoji}</span>}
                <strong lang="sa" style={{ fontSize: 18 }}>{f.dev} <SayBtn text={f.dev} /></strong>
                <small style={{ fontStyle: 'italic', color: '#475569' }}>{f.iast}</small>
                <span style={{ fontSize: 13 }}>{f.en}</span>
                {f.symbols && !f.img && <span aria-hidden="true" style={{ fontSize: 20, letterSpacing: 2 }}>{f.symbols}</span>}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, background: festival.bg, border: '2px dashed #f9a8d4', borderRadius: 18, padding: 16, color: '#1e293b' }}>
            {festival.img && <img src={festival.img} alt={festival.en} width={200} height={200} style={{ width: 200, height: 200, objectFit: 'contain', float: 'right', marginLeft: 12 }} />}
            <div style={{ fontSize: 22 }}>{festival.img ? null : festival.emoji} <strong lang="sa">{festival.dev}</strong> <em>({festival.iast})</em> <SayBtn text={festival.dev} /></div>
            <div style={{ fontSize: 13, color: '#64748b', margin: '4px 0' }}>📅 {festival.when}</div>
            <p style={{ margin: 0 }}>{festival.fact}</p>
            {festival.symbols && <p style={{ margin: '8px 0 0', fontWeight: 600 }}><span style={{ fontSize: 18 }}>{festival.symbols}</span> {festival.symbolNote}</p>}
            <div style={{ clear: 'both' }} />
          </div>
          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              onClick={() => {
                setShowFestivalMatch((v) => !v);
                soundEffects.playStrokeChime();
              }}
              style={{
                background: showFestivalMatch ? '#ede9fe' : 'linear-gradient(135deg, #fdf4ff, #ede9fe)',
                border: '2px solid #c084fc',
                borderRadius: 999,
                padding: '9px 18px',
                fontWeight: 800,
                color: '#6b21a8',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>🚀</span>
              <span>
                {showFestivalMatch
                  ? 'Hide Next Level Reading Match ▲'
                  : 'Next Level Challenge: Read & Match Festival Names ▼'}
              </span>
            </button>
            {showFestivalMatch && <FestivalMatchGame onEarnStar={celebrateWin} />}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB: ANIMAL SOUNDS SAFARI (पशु-ध्वनयः)
         =================================================================== */}
      {tab === 'animals' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🐮 पशवः पक्षिणः च · Animal Sounds Safari</h3>
              <p className="psw-section-sub">
                Tap any friendly animal to hear its real safari call and sweet Sanskrit name!
              </p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={startAnimalQuiz}
            >
              {animalQuizTarget ? `❓ Who calls: "${animalQuizTarget.soundLabelSa}"?` : '⭐ Mystery Animal Call!'}
            </button>
          </div>

          <div className="ppd-pack-bar" role="tablist" aria-label="Animal habitats">
            {([
              { id: 'home', label: '🏡 Level 1: Home & Farm (4)', bg: '#dcfce7' },
              { id: 'woods', label: '🌿 Pond & Woods (6)', bg: '#e0f2fe' },
              { id: 'jungle', label: '🦁 Big Jungle (5)', bg: '#ffedd5' },
              { id: 'all', label: '🌟 All 15 Friends', bg: '#fef3c7' },
            ] as const).map((pk) => (
              <button
                key={pk.id}
                type="button"
                role="tab"
                aria-selected={animalPack === pk.id}
                className={`bharat-pack-chip ${animalPack === pk.id ? 'is-active' : ''}`}
                style={{ background: pk.bg, borderColor: animalPack === pk.id ? '#2563eb' : '#cbd5e1' }}
                onClick={() => {
                  setAnimalPack(pk.id);
                  setAnimalQuizTarget(null);
                  soundEffects.playStrokeChime();
                }}
              >
                {pk.label}
              </button>
            ))}
          </div>

          {animalQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Listen! Find and tap the animal who calls <strong>"{animalQuizTarget.soundLabelSa}"</strong> ({animalQuizTarget.soundLabelEn})! {animalScore > 0 && `⭐ Stars: ${animalScore}`}</span>
              <button
                type="button"
                className="psw-quiz-speaker"
                onClick={() => {
                  soundEffects.playSafariAnimalSound(animalQuizTarget.id);
                  setTimeout(() => playPronunciation(`कः वदति? ${animalQuizTarget.soundLabelSa}`), 300);
                }}
                title="Hear sound again"
              >
                🔊 Hear Call Again
              </button>
            </div>
          )}

          <div className="psw-animals-grid">
            {visibleAnimals.map((a) => {
              const isActive = activeAnimal.id === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  className="psw-animal-card"
                  onClick={() => handleAnimalTap(a)}
                  style={{ borderColor: isActive ? '#3b82f6' : undefined }}
                >
                  <span className="pac-icon" aria-hidden="true">{a.icon}</span>
                  <strong className="pac-dev" lang="sa">{a.dev} <SayBtn text={a.dev} /></strong>
                  <span className="pac-en">{a.en}</span>
                  <small style={{ color: '#64748b', fontStyle: 'italic' }}>{a.iast}</small>
                  <span className="pac-sound-bubble">🔊 {a.soundLabelSa}</span>
                </button>
              );
            })}
          </div>

          {/* Active Animal Spotlight */}
          <div className="psw-detail-spotlight" style={{ borderColor: '#3b82f6' }}>
            <span className="psw-spotlight-icon" style={{ background: '#3b82f6' }}>{activeAnimal.icon}</span>
            <div>
              <div className="psw-spotlight-title">
                <span lang="sa">{activeAnimal.dev}</span> · {activeAnimal.en} ({activeAnimal.soundLabelSa})
              </div>
              <p className="psw-spotlight-desc">{activeAnimal.fact}</p>
            </div>
            <button
              type="button"
              className="psw-action-pill"
              onClick={() => {
                soundEffects.playSafariAnimalSound(activeAnimal.id);
                setTimeout(() => playPronunciation(`${activeAnimal.dev} ${activeAnimal.soundLabelSa}`), 260);
              }}
            >
              🔊 Hear {activeAnimal.en} Call
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB: FRUIT PICKER BASKET (मधुराणि फलानि)
         =================================================================== */}
      {tab === 'fruits' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🍎 मधुराणि फलानि · Gurukul Orchard Fruit Picker</h3>
              <p className="psw-section-sub">
                Tap ripe fruits hanging on the orchard tree! Pick 5 fruits into your woven basket for a celebratory fanfare!
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => {
                  const pick = FRUITS[Math.floor(Math.random() * FRUITS.length)];
                  setFruitOrderTarget(pick);
                  soundEffects.playStrokeChime();
                  playPronunciation(pick.dev);
                }}
              >
                {fruitOrderTarget ? `🐵 Pick: ${fruitOrderTarget.dev}!` : '🐵 Monkey’s Fruit Wish!'}
              </button>
              <div className="psw-score-pill">
                <span>🧺 In Basket: <strong>{basketFruits.length}</strong></span>
                {basketFruits.length > 0 && (
                  <button type="button" className="psw-reset-link" onClick={resetFruitBasket}>
                    Empty Basket ↺
                  </button>
                )}
              </div>
            </div>
          </div>

          {fruitOrderTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🐵 Friendly Vānara says: “Please pick sweet <strong lang="sa">{fruitOrderTarget.dev}</strong> <em>({fruitOrderTarget.iast})</em> · {fruitOrderTarget.en} from the tree!”</span>
              <button type="button" className="psw-quiz-speaker" onClick={() => playPronunciation(fruitOrderTarget.dev)}>
                🔊 Hear Fruit
              </button>
            </div>
          )}

          {basketFruits.length >= 5 && (
            <div className="psw-victory-banner" role="status">
              <span>🎉 <strong>आनन्दः! Delicious Basket Full!</strong> You collected {basketFruits.length} sweet fruits for the Gurukul!</span>
              <button type="button" className="psw-quiz-btn" onClick={resetFruitBasket}>
                Pick More ↺
              </button>
            </div>
          )}

          {/* The Gurukul Orchard Tree Stage */}
          <div className="psw-fruit-picker-stage">
            <div className="psw-tree-box">
              <div className="psw-tree-crown">
                {FRUITS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    className="psw-tree-fruit-item"
                    onClick={() => handleFruitPick(f)}
                    title={`Pick ${f.en} (${f.dev})`}
                  >
                    <span>{f.icon}</span>
                    <b lang="sa">{f.dev}</b>
                    <small className="psw-iast-line">{f.iast}</small>
                    <SayBtn text={f.dev} />
                  </button>
                ))}
              </div>
              <div className="psw-tree-trunk" />
            </div>

            {/* The Woven Basket Tray */}
            <div className="psw-basket-tray">
              <div className="pbt-left">
                <span className="pbt-basket-icon" aria-hidden="true">🧺</span>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: '#78350f', display: 'block' }}>
                    {basketFruits.length === 0
                      ? 'Basket is empty — Tap sweet fruits on the green tree above!'
                      : `Collected: ${basketFruits.length} fruit${basketFruits.length > 1 ? 's' : ''}!`}
                  </strong>
                  {lastPickedFruit && (
                    <span style={{ fontSize: '0.88rem', color: '#92400e' }}>
                      Just added: <strong>{lastPickedFruit.icon} {lastPickedFruit.dev}</strong> <em>({lastPickedFruit.iast})</em> · {lastPickedFruit.en}
                    </span>
                  )}
                </div>
              </div>

              <div className="pbt-collected-list">
                {basketFruits.map((bf, idx) => (
                  <span key={idx} className="pbt-pill" title={bf.en}>
                    {bf.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <details style={{ marginTop: 16, padding: '12px 16px', borderRadius: 18, background: 'linear-gradient(135deg,#f3e8ff 0%,#dcfce7 100%)', border: '2px solid #8b5cf6', color: '#1e293b' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 800, color: '#4c1d95', fontSize: '0.95rem' }}>
              🚀 Next Level &amp; Parent Story Corner: Jambudvīpa &amp; Kāliṅgam Word Origins
            </summary>
            <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
              <div style={{ padding: '12px 14px', borderRadius: 14, background: '#ffffffd9' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#4c1d95' }}>
                  🍇🌏 <span lang="sa">जम्बूद्वीपः</span> · Jambudvīpa: India’s jamun-tree name <SayBtn text="जम्बू द्वीपः" />
                </h4>
                <p style={{ margin: '0 0 8px', fontSize: '0.88rem', color: '#334155' }}>
                  In Sanskrit, purple jamun fruit is <em>jambū</em> (जम्बू). Long ago, India was called <strong>Jambudvīpa</strong> — “the island of the jamun tree”, one of seven lands surrounded by seven seas!
                </p>
                <a href="/jambudvipa" className="psw-action-pill" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  📖 Read the seven-island story &amp; saṅkalpa →
                </a>
              </div>
              <div style={{ padding: '12px 14px', borderRadius: 14, background: '#ffffffd9' }}>
                <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#065f46' }}>
                  🍉 <span lang="sa">कालिङ्गम्</span> · kāliṅgam: the watermelon’s place-name <SayBtn text="कालिङ्गम्" />
                </h4>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#334155' }}>
                  <em>Kāliṅga</em> means “fruit from Kalinga” (coastal Odisha), with an alternative scholarly link to <span lang="sa">कालिन्द</span> (<em>kālinda</em>, the Yamunā/Kalindī region).
                </p>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* ===================================================================
          TAB: COUNTING 1 TO 10 (संख्या-गणना)
         =================================================================== */}
      {tab === 'counting' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🔢 संख्या-गणना · Count 1 to 10</h3>
              <p className="psw-section-sub">
                Tap each number below or tap every bouncing friend one-by-one to count aloud in Sanskrit!
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => {
                  const r = COUNT_ITEMS[Math.floor(Math.random() * COUNT_ITEMS.length)];
                  setCountQuizTarget(r);
                  soundEffects.playStrokeChime();
                  playPronunciation(r.devName);
                }}
              >
                {countQuizTarget ? `❓ Count & Tap!` : '🎯 How Many? Quiz'}
              </button>
              <div className="psw-story-slide-counter">
                Number <strong>{selectedCount.num}</strong> of 10
              </div>
            </div>
          </div>

          {countQuizTarget && (
            <div className="psw-quiz-banner" role="status" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
                <span>🎯 Count the friends below and tap the right Sanskrit number chip!</span>
                <button type="button" className="psw-quiz-speaker" onClick={() => playPronunciation(countQuizTarget.devName)}>
                  🔊 Hear Hint
                </button>
              </div>
              <div style={{ fontSize: 30, letterSpacing: 4, background: '#fff', borderRadius: 14, padding: '6px 14px', border: '2px dashed #f59e0b' }}>
                {Array.from({ length: countQuizTarget.num }).map((_, k) => (
                  <span key={k}>{countQuizTarget.icon}</span>
                ))}
              </div>
            </div>
          )}

          {/* Number 1 to 10 Bar */}
          <div className="psw-count-number-bar" role="tablist" aria-label="Number selection">
            {COUNT_ITEMS.map((item) => {
              const isActive = selectedCount.num === item.num;
              return (
                <button
                  key={item.num}
                  type="button"
                  className={`psw-count-chip ${isActive ? 'is-active' : ''}`}
                  onClick={() => selectCountNumber(item)}
                >
                  <strong>{item.devDigit}</strong>
                  <small>{item.num}</small>
                  <small className="psw-iast-line">{item.iast}</small>
                  <SayBtn text={item.devName} />
                </button>
              );
            })}
          </div>

          {/* Display Stage */}
          <div
            className="psw-count-stage"
            style={{
              background: `linear-gradient(135deg, ${selectedCount.color}dd 0%, ${selectedCount.color} 100%)`,
            }}
          >
            <span className="pcs-hero-num">{selectedCount.devDigit}</span>
            <h3 className="pcs-hero-title" lang="sa">
              {selectedCount.devName} · {selectedCount.en}
              <small className="psw-iast-line psw-iast-on-dark">{selectedCount.iast}</small>
            </h3>
            <p className="pcs-hero-sub">
              <strong lang="sa">{selectedCount.phraseSa}</strong> <em>({devanagariToIast(selectedCount.phraseSa)})</em> · {selectedCount.phraseEn}
            </p>

            {/* Bouncing Grid of Items Matching Count — Each Friend Speaks Its Count Number When Tapped! */}
            <div className="psw-count-emojis-grid">
              {Array.from({ length: selectedCount.num }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="pce-item"
                  style={{ animationDelay: `${(i * 0.15) % 1.5}s`, cursor: 'pointer', border: 'none' }}
                  title={`Tap to count ${i + 1}: ${COUNT_ITEMS[i]?.devName ?? ''}`}
                  onClick={() => {
                    soundEffects.playBubblePop();
                    const stepItem = COUNT_ITEMS[i];
                    if (stepItem) playPronunciation(stepItem.devName);
                  }}
                >
                  {selectedCount.icon}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="psw-whisper-btn"
              onClick={() => {
                soundEffects.playStrokeChime();
                playPronunciation(`${selectedCount.devName} ${selectedCount.phraseSa}`);
              }}
            >
              🔊 Hear "{selectedCount.devName} ({selectedCount.phraseSa})"
            </button>

            {/* Stepper buttons for easy toddler tapping */}
            <div className="psw-count-stepper-row">
              <button
                type="button"
                className="psw-count-step-btn"
                disabled={selectedCount.num === 1}
                onClick={() => {
                  const prev = COUNT_ITEMS[selectedCount.num - 2];
                  if (prev) selectCountNumber(prev);
                }}
              >
                ⬅️ Previous
              </button>
              <span className="psw-count-step-indicator">
                {selectedCount.devDigit} · {selectedCount.devName} ({selectedCount.num}/10)
              </span>
              <button
                type="button"
                className="psw-count-step-btn"
                disabled={selectedCount.num === 10}
                onClick={() => {
                  const next = COUNT_ITEMS[selectedCount.num];
                  if (next) selectCountNumber(next);
                }}
              >
                Next ➡️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB: SACRED INSTRUMENTS & RHYTHM (मङ्गल-वाद्यानि)
         =================================================================== */}
      {tab === 'instruments' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🔔 मङ्गल-वाद्यानि · Sacred Bells &amp; Divine Rhythm</h3>
              <p className="psw-section-sub">
                Tap each divine musical instrument to hear its real acoustic chime, drum beat, or conch resonance!
              </p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={() => {
                const r = INSTRUMENTS[Math.floor(Math.random() * INSTRUMENTS.length)];
                setInstQuizTarget(r);
                playInstrumentAcousticOnly(r);
              }}
            >
              {instQuizTarget ? '👂 Replay Mystery Sound!' : '👂 Mystery Sound Game'}
            </button>
          </div>

          {instQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>👂 Listen closely! Which sacred instrument made that sound? Tap its card below!</span>
              <button
                type="button"
                className="psw-quiz-speaker"
                onClick={() => playInstrumentAcousticOnly(instQuizTarget)}
              >
                🎵 Play Sound Again
              </button>
            </div>
          )}

          <div className="psw-instruments-grid">
            {INSTRUMENTS.map((inst) => {
              const isPlaying = playingInstrumentId === inst.id;
              return (
                <div
                  key={inst.id}
                  className={`psw-instrument-card ${isPlaying ? 'is-playing' : ''}`}
                  style={{ background: inst.bgGradient }}
                  onClick={() => handlePlayInstrument(inst)}
                >
                  <div className="pic-ring">{inst.iconImg ? <img src={inst.iconImg} alt={inst.en} width={56} height={56} style={{ width: 56, height: 56 }} /> : inst.icon}</div>
                  <h4 className="pic-dev" lang="sa">{inst.dev} <SayBtn text={inst.dev} /></h4>
                  <small className="psw-iast-line psw-iast-on-dark">{inst.iast}</small>
                  <p className="pic-en">{inst.en}</p>
                  <span className="pic-sound-badge">{inst.soundWord}</span>
                  <p className="pic-deity-note">{inst.deityConnect}</p>
                  <button
                    type="button"
                    className="pic-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayInstrument(inst);
                    }}
                  >
                    🎵 Tap To Play Beat
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 2: MOON PHASES PLAYGROUND (चन्द्र-कलाः)
         =================================================================== */}
      {tab === 'moon' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🌙 चन्द्र-कलाः · The Smiling Moon in the Sky</h3>
              <p className="psw-section-sub">Slide the slider, tap musical sky stars, or play Wise Owl’s Moon Quest!</p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={() => {
                const r = MOON_PHASES[Math.floor(Math.random() * MOON_PHASES.length)];
                setMoonQuizTarget(r);
                soundEffects.playStrokeChime();
                playPronunciation(r.dev);
              }}
            >
              {moonQuizTarget ? `🦉 Find: ${moonQuizTarget.dev}!` : '🦉 Owl’s Moon Quest'}
            </button>
          </div>

          {moonQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🦉 Wise Ulūka asks: “Can you tap <strong lang="sa">{moonQuizTarget.dev}</strong> <em>({moonQuizTarget.iast})</em> · {moonQuizTarget.en} below?”</span>
              <button type="button" className="psw-quiz-speaker" onClick={() => playPronunciation(moonQuizTarget.dev)}>
                🔊 Hear Phase
              </button>
            </div>
          )}

          <div className="psw-moon-sandbox">
            <div className="psw-moon-sky">
              {/* Clickable Musical Twinkling Stars in Sky */}
              <span role="button" tabIndex={0} className="psw-star" style={{ top: '15%', left: '18%', cursor: 'pointer' }} onClick={() => { soundEffects.playStrokeChime(); playPronunciation('तारा'); }} title="Tap star! तारा">✨</span>
              <span role="button" tabIndex={0} className="psw-star" style={{ top: '25%', left: '80%', cursor: 'pointer' }} onClick={() => { soundEffects.playSuccessDing(); playPronunciation('नक्षत्रम्'); }} title="Tap star! नक्षत्रम्">⭐</span>
              <span role="button" tabIndex={0} className="psw-star" style={{ top: '65%', left: '12%', cursor: 'pointer' }} onClick={() => { soundEffects.playStrokeChime(); }} title="Twinkle!">🌟</span>
              <span role="button" tabIndex={0} className="psw-star" style={{ top: '70%', left: '85%', cursor: 'pointer' }} onClick={() => { soundEffects.playSuccessDing(); }} title="Twinkle!">✨</span>
              <span role="button" tabIndex={0} className="psw-star" style={{ top: '35%', left: '30%', cursor: 'pointer' }} onClick={() => { soundEffects.playCelebrationChime(); }} title="Twinkle!">★</span>

              {/* Glowing Smiling Moon */}
              <div
                className="psw-moon-face-wrap"
                onClick={() => {
                  playPronunciation(currentMoonPhase.dev);
                  soundEffects.playStrokeChime();
                }}
                title="Tap the Moon!"
              >
                <div className="psw-moon-sphere">
                  <div
                    className="psw-moon-shadow"
                    style={{ width: `${100 - moonPct}%` }}
                  />
                  <div className="psw-moon-eyes">
                    <span>👀</span>
                  </div>
                  <div className="psw-moon-smile">
                    <svg viewBox="0 0 40 20" width="36" height="18">
                      <path d="M 6 4 Q 20 18 34 4" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="psw-moon-current-badge">
                <span className="pmb-emoji">{currentMoonPhase.emoji}</span>
                <div>
                  <strong lang="sa">{currentMoonPhase.dev}</strong> · {currentMoonPhase.en} ({currentMoonPhase.iast})
                  <p>{currentMoonPhase.desc}</p>
                </div>
                <button
                  type="button"
                  className="psw-mini-speaker"
                  onClick={() => playPronunciation(currentMoonPhase.dev)}
                  aria-label="Listen"
                >
                  🔊
                </button>
              </div>
            </div>

            {/* Slider Control */}
            <div className="psw-slider-box">
              <label htmlFor="psw-moon-slider" className="psw-slider-label">
                <span>Drag the Moon Slider:</span>
                <strong>{moonPct}% Illuminated</strong>
              </label>
              <input
                id="psw-moon-slider"
                type="range"
                min="0"
                max="100"
                step="5"
                value={moonPct}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setMoonPct(val);
                }}
                className="psw-range"
              />
            </div>

            {/* 5 1-Tap Quick Moon Phase Buttons */}
            <div className="psw-moon-quick-btns">
              {MOON_PHASES.map((p) => {
                const isActive = currentMoonPhase.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`psw-moon-pill ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setMoonPct(p.pct);
                      playPronunciation(p.dev);
                      if (moonQuizTarget) {
                        if (p.id === moonQuizTarget.id) {
                          soundEffects.playCelebrationChime();
                          celebrateWin();
                          setMoonQuizTarget(null);
                        } else {
                          soundEffects.playPuzzleSnap();
                        }
                      } else {
                        soundEffects.playStrokeChime();
                      }
                    }}
                  >
                    <span>{p.emoji}</span>
                    <span lang="sa" className="pm-dev">{p.dev} <SayBtn text={p.dev} /></span>
                    <small className="psw-iast-line">{p.iast}</small>
                    <span className="pm-en">{p.en}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 3: DAY SECTIONS PLAYGROUND (दिन-भागाः)
         =================================================================== */}
      {tab === 'day' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🌅 दिन-भागाः · Day &amp; Sky Routine</h3>
              <p className="psw-section-sub">Tap the 4 times of day to watch the sky change from morning dawn to starry night!</p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={() => {
                const r = DAY_SECTIONS[Math.floor(Math.random() * DAY_SECTIONS.length)];
                setDayQuizTarget(r);
                soundEffects.playStrokeChime();
                playPronunciation(r.dev);
              }}
            >
              {dayQuizTarget ? `❓ Find: ${dayQuizTarget.dev}!` : '⭐ Sky Time Quiz'}
            </button>
          </div>

          {dayQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Tap <strong lang="sa">{dayQuizTarget.dev}</strong> <em>({dayQuizTarget.iast})</em> — {dayQuizTarget.desc}</span>
              <button type="button" className="psw-quiz-speaker" onClick={() => playPronunciation(dayQuizTarget.dev)}>
                🔊 Hear Again
              </button>
            </div>
          )}

          <div className="psw-day-sandbox">
            {/* Dynamic Sky Scene */}
            <div className="psw-day-sky" style={{ background: selectedDay.skyBg }}>
              {/* Sun or Moon representation */}
              <DaySkyArt d={selectedDay} />

              {/* Mountains & Ground Silhouette */}
              <div className="psw-landscape-silhouette">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="psw-mountains">
                  <polygon points="0,120 70,40 160,120 250,30 340,120 400,60 400,120" fill={selectedDay.id === 'ratri' ? '#4c1d95' : '#86efac'} opacity="0.8" />
                  <polygon points="0,120 120,70 200,120 280,60 400,110 400,120" fill={selectedDay.id === 'ratri' ? '#312e81' : '#4ade80'} />
                </svg>
              </div>

              {/* Floating Story Text Inside Sky */}
              <div className="psw-day-greeting-bubble">
                <span className="pdb-icon">{selectedDay.icon}</span>
                <div>
                  <h4 lang="sa">{selectedDay.greetingSa} {selectedDay.dev}</h4>
                  <p>{selectedDay.desc}</p>
                </div>
                <button
                  type="button"
                  className="psw-mini-speaker"
                  onClick={() => playPronunciation(selectedDay.dev)}
                  aria-label="Listen"
                >
                  🔊
                </button>
              </div>
            </div>

            {/* 4 Day Section Buttons */}
            <div className="psw-day-btn-grid">
              {DAY_SECTIONS.map((d) => {
                const isActive = selectedDay.id === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    className={`psw-day-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      setSelectedDay(d);
                      playPronunciation(d.dev);
                      if (dayQuizTarget) {
                        if (d.id === dayQuizTarget.id) {
                          soundEffects.playCelebrationChime();
                          celebrateWin();
                          setDayQuizTarget(null);
                        } else {
                          soundEffects.playPuzzleSnap();
                        }
                      } else {
                        soundEffects.playStrokeChime();
                      }
                    }}
                  >
                    <span className="pdb-btn-icon">{d.icon}</span>
                    <strong lang="sa">{d.dev} <SayBtn text={d.dev} /></strong>
                    <span>{d.en}</span>
                    <small>{d.iast}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 4: SEASONS OF NATURE (ऋतवः)
         =================================================================== */}
      {tab === 'seasons' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🌸 ऋतवः · 6 Seasons of Nature Playground</h3>
              <p className="psw-section-sub">Make it rain, drop snowflakes, shower flower petals, or bathe in golden sunshine!</p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={() => {
                const r = SEASONS[Math.floor(Math.random() * SEASONS.length)];
                setSeasonQuizTarget(r);
                soundEffects.playStrokeChime();
                playPronunciation(r.dev);
              }}
            >
              {seasonQuizTarget ? `❓ Find: ${seasonQuizTarget.dev}!` : '⭐ Weather Season Quiz'}
            </button>
          </div>

          {seasonQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🌦️ Tap the season <strong lang="sa">{seasonQuizTarget.dev}</strong> <em>({seasonQuizTarget.iast})</em> — {seasonQuizTarget.desc}</span>
              <button type="button" className="psw-quiz-speaker" onClick={() => playPronunciation(seasonQuizTarget.dev)}>
                🔊 Hear Again
              </button>
            </div>
          )}

          <div className="psw-seasons-sandbox">
            {/* Active Weather Canvas / Showcase */}
            <div
              className="psw-weather-stage"
              style={{
                background: `linear-gradient(145deg, ${selectedSeason.themeColor}22 0%, ${selectedSeason.themeColor}55 100%)`,
                borderColor: selectedSeason.themeColor,
              }}
            >
              <div className="psw-sscene-wrap"><SeasonScene id={selectedSeason.id} />{SEASON_SCENE_CAPTION[selectedSeason.id] && <div className="psw-sscene-cap" lang="sa">{SEASON_SCENE_CAPTION[selectedSeason.id]}</div>}</div>

              {/* Floating Active Particle Rain */}
              {activeParticles.length > 0 && (
                <div className="psw-particles-overlay" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <span
                      key={i}
                      className="psw-floating-particle"
                      style={{
                        left: `${(i * 19) % 100}%`,
                        animationDelay: `${(i * 0.25) % 2.5}s`,
                        fontSize: `${1.4 + (i % 3) * 0.4}rem`,
                      }}
                    >
                      {activeParticles[i % activeParticles.length]}
                    </span>
                  ))}
                </div>
              )}

              <div className="psw-weather-info">
                <span className="pwi-tag" style={{ background: selectedSeason.themeColor }}>Nature Season</span>
                <h3 lang="sa" className="pwi-title">
                  {selectedSeason.dev} · {selectedSeason.en}
                </h3>
                <p className="pwi-desc">{selectedSeason.desc}</p>
                <button
                  type="button"
                  className="psw-trigger-weather-btn"
                  style={{ background: selectedSeason.themeColor }}
                  onClick={() => triggerSeasonWeather(selectedSeason)}
                >
                  <span>✨ {selectedSeason.weatherAction}</span>
                </button>
              </div>
            </div>

            {/* 5 Season Pills */}
            <div className="psw-seasons-grid">
              {SEASONS.map((s) => {
                const isActive = selectedSeason.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    className={`psw-season-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => triggerSeasonWeather(s)}
                    style={{ '--season-color': s.themeColor } as React.CSSProperties}
                  >
                    <span className="psc-icon">{s.icon}</span>
                    <strong lang="sa">{s.dev} <SayBtn text={s.dev} /></strong>
                    <span>{s.en.split(' ')[0]}</span>
                    <small>{s.iast}</small>
                    <span className="psc-speaker" aria-hidden="true">🔊</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 5: MATCH VAHANAS OF HINDU GODS (देव-वाहनानि)
         =================================================================== */}
      {tab === 'vahanas' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🦚 देवतानां वाहनानि · Match the Divine Animal Friends</h3>
              <p className="psw-section-sub">
                Every Hindu God has a beloved animal companion (Vāhana)! Tap a deity on the left, then tap their animal friend on the right!
              </p>
            </div>
            <div className="psw-score-pill">
              <span>⭐ Matched: <strong>{matchedVahanas.size}</strong> of {activeVahanas.length}</span>
              {matchedVahanas.size > 0 && (
                <button type="button" className="psw-reset-link" onClick={resetVahanaGame}>
                  Reset ↺
                </button>
              )}
            </div>
          </div>

          <div className="ppd-pack-bar" role="tablist" aria-label="Vahana pack size">
            <button
              type="button"
              role="tab"
              aria-selected={vahanaPack === 'easy4'}
              className={`bharat-pack-chip ${vahanaPack === 'easy4' ? 'is-active' : ''}`}
              style={{ background: '#fef3c7', borderColor: vahanaPack === 'easy4' ? '#d97706' : '#cbd5e1' }}
              onClick={() => { setVahanaPack('easy4'); soundEffects.playStrokeChime(); }}
            >
              🐘 First 4 Friends (Ages 2–4)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={vahanaPack === 'all8'}
              className={`bharat-pack-chip ${vahanaPack === 'all8' ? 'is-active' : ''}`}
              style={{ background: '#fae8ff', borderColor: vahanaPack === 'all8' ? '#a21caf' : '#cbd5e1' }}
              onClick={() => { setVahanaPack('all8'); soundEffects.playStrokeChime(); }}
            >
              🦚 All 8 Divine Vāhanas
            </button>
          </div>

          {lastVahanaBlessing && (
            <div className="ppd-blessing-banner" role="status">
              <span className="ppd-blessing-icons" aria-hidden="true">
                {lastVahanaBlessing.godIcon} 💖 {lastVahanaBlessing.vahanaIcon}
              </span>
              <div style={{ flex: 1 }}>
                <strong lang="sa" style={{ color: '#92400e', fontSize: '1.05rem', display: 'block' }}>
                  {lastVahanaBlessing.godDev} + {lastVahanaBlessing.vahanaDev}
                </strong>
                <span style={{ color: '#78350f', fontWeight: 700, fontSize: '0.92rem' }}>
                  ✨ {lastVahanaBlessing.quote}
                </span>
              </div>
              <button
                type="button"
                className="bqc-btn bqc-btn--primary"
                onClick={() => playPronunciation(lastVahanaBlessing.quote.split('·')[0].trim())}
              >
                🔊 Hear Blessing
              </button>
            </div>
          )}

          {matchedVahanas.size === activeVahanas.length && (
            <div className="psw-victory-banner" role="status">
              <span>🎉 <strong>सर्वं सम्यक्! Excellent Work!</strong> You matched all {activeVahanas.length} Divine Animal Friends!</span>
              <button
                type="button"
                className="psw-quiz-btn"
                onClick={() => {
                  if (vahanaPack === 'easy4') {
                    setVahanaPack('all8');
                    soundEffects.playSuccessDing();
                  } else {
                    resetVahanaGame();
                  }
                }}
              >
                {vahanaPack === 'easy4' ? 'Try All 8 Vāhanas →' : 'Play Again ↺'}
              </button>
            </div>
          )}

          <div className="psw-vahana-match-board">
            {/* Column 1: The Deities */}
            <div className="psw-vahana-col">
              <span className="psw-col-label">1. Tap a God / Goddess</span>
              <div className="psw-vahana-list">
                {activeVahanas.map((v) => {
                  const isDone = matchedVahanas.has(v.id);
                  const isSel = selectedGod?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isDone}
                      className={`psw-vahana-btn ${isDone ? 'is-done' : ''} ${isSel ? 'is-selected' : ''}`}
                      onClick={() => handleGodTap(v)}
                    >
                      <span className="pvb-icon">{v.godImg ? <img src={v.godImg} alt={v.godEn} width={48} height={48} style={{ width: 48, height: 48, objectFit: 'contain', verticalAlign: 'middle' }} /> : v.godIcon}</span>
                      <div className="pvb-meta">
                        <strong lang="sa">{v.godDev} {!isDone && <SayBtn text={v.godDev} />}</strong>
                        <small className="psw-iast-line">{devanagariToIast(v.godDev)}</small>
                        <span>{v.godEn}</span>
                      </div>
                      {isDone && <span className="pvb-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: The Animals (Shuffled!) */}
            <div className="psw-vahana-col">
              <span className="psw-col-label">2. Tap Their Animal Companion (Vāhana)</span>
              <div className="psw-vahana-list">
                {shuffledVahanas.map((v) => {
                  const isDone = matchedVahanas.has(v.id);
                  return (
                    <button
                      key={v.id}
                      type="button"
                      disabled={isDone}
                      className={`psw-vahana-btn psw-vahana-animal-btn ${isDone ? 'is-done' : ''}`}
                      onClick={() => handleVahanaAnimalTap(v)}
                    >
                      <span className="pvb-icon">{v.vahanaIcon}</span>
                      <div className="pvb-meta">
                        <strong lang="sa">{v.vahanaDev} {!isDone && <SayBtn text={v.vahanaDev} />}</strong>
                        <small className="psw-iast-line">{devanagariToIast(v.vahanaDev)}</small>
                        <span>{v.vahanaEn}</span>
                      </div>
                      {isDone && <span className="pvb-check">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          TAB 6: THE DANCE OF THE FIVE FRIENDS (पञ्चमित्राणां नृत्यम्)
         =================================================================== */}
      {tab === 'story' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">📖 पञ्चमित्राणां नृत्यम् · The Dance of the Five Friends</h3>
              <p className="psw-section-sub">
                How nature worship of a tribal boy and Vedic girl converge in the Five Elements (Pañcabhūtāni) of Sanatan Dharma!
              </p>
            </div>
            <div className="psw-story-slide-counter">
              Slide <strong>{storySlideIdx + 1}</strong> of {STORY_SLIDES.length}
            </div>
          </div>

          <div
            className="psw-story-stage"
            style={{ background: currentStorySlide.bgGradient }}
          >
            <div className="psw-story-icon-bubble">{currentStorySlide.icon}</div>
            <div className="psw-story-content">
              <span className="psw-story-element-tag">{currentStorySlide.elementHighlight}</span>
              <h3 className="psw-story-slide-title">
                <span lang="sa">{currentStorySlide.titleSa}</span>
                <small className="psw-iast-line psw-iast-on-dark">{devanagariToIast(currentStorySlide.titleSa)}</small>
                <small>{currentStorySlide.titleEn}</small>
              </h3>

              {currentStorySlide.introQuestion && (
                <div className="psw-story-intro-question" style={{ textAlign: 'center', padding: '18px 12px 22px', margin: '4px 0 14px', borderRadius: 18, background: 'rgba(255,255,255,0.12)' }}>
                  <p style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, margin: 0, color: '#fef3c7' }}>{currentStorySlide.introQuestion.en}</p>
                  <p lang="sa" style={{ fontSize: 'clamp(1.1rem, 3vw, 1.6rem)', margin: '10px 0 0', color: '#fde68a' }}>{currentStorySlide.introQuestion.sa}</p>
                </div>
              )}

              {currentStorySlide.bookImages && (
                <div className="psw-story-book-images" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '6px 0 16px' }}>
                  {currentStorySlide.bookImages.map((src) => (
                    <img key={src} src={src} alt={currentStorySlide.titleEn} loading="lazy" style={{ width: currentStorySlide.bookImages!.length > 1 ? 'min(31%, 240px)' : 'min(100%, 360px)', minWidth: 140, borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,0.35)', objectFit: 'cover' }} />
                  ))}
                </div>
              )}

              {/* Character Dialogues List */}
              <div className="psw-dialogues-list">
                {currentStorySlide.dialogues.map((d, dIdx) => (
                  <div
                    key={dIdx}
                    className={`psw-dialogue-card psw-dialogue--${d.speaker}`}
                  >
                    <div className="psw-dialogue-header">
                      <span className="psw-dialogue-speaker-badge">
                        <span>{d.speakerIcon}</span>
                        <b>{d.speakerLabelSa}</b>
                        <small><em>({devanagariToIast(d.speakerLabelSa)})</em> · {d.speakerLabelEn}</small>
                      </span>
                      <button
                        type="button"
                        className="psw-dialogue-audio-btn"
                        onClick={() => playStoryLine(d.textSa)}
                        title="Listen to Sanskrit"
                      >
                        🔊 Listen
                      </button>
                    </div>
                    <p className="psw-dialogue-sa" lang="sa">{d.textSa}</p>
                    <p className="psw-iast-line psw-dialogue-iast">{devanagariToIast(d.textSa)}</p>
                    <p className="psw-dialogue-en">{d.textEn}</p>
                  </div>
                ))}
              </div>

              {/* Slide 7: Five Panchabhutas Grid Showcase */}
              {currentStorySlide.elementsList && (
                <div className="psw-elements-showcase-grid">
                  {currentStorySlide.elementsList.map((elm, eIdx) => (
                    <div key={eIdx} className="psw-element-showcase-card">
                      <span className="pesc-icon">{elm.icon}</span>
                      <div className="pesc-meta">
                        <span className="pesc-num">{elm.num}. {elm.enName}</span>
                        <strong lang="sa">{elm.saName}</strong>
                        <small className="psw-iast-line">{devanagariToIast(elm.saName)}</small>
                        <span>({elm.saDesc}) <em>{devanagariToIast(elm.saDesc)}</em></span>
                        <small>{elm.enDesc}</small>
                      </div>
                      <button
                        type="button"
                        className="pesc-speaker"
                        onClick={() => playStoryLine(`${elm.saName} ${elm.saDesc}`)}
                        title={`Listen to ${elm.saName}`}
                      >
                        🔊
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Slide 8: Whispering Wind Finale Banner */}
              {currentStorySlide.whisperFinale && (
                <div className="psw-whisper-banner">
                  <span className="psw-whisper-icon" aria-hidden="true">🍃 💨</span>
                  <p className="psw-whisper-sa" lang="sa">{currentStorySlide.whisperFinale.sa}</p>
                  <p className="psw-iast-line psw-iast-on-dark">{devanagariToIast(currentStorySlide.whisperFinale.sa)}</p>
                  <p className="psw-whisper-en">{currentStorySlide.whisperFinale.en}</p>
                  <button
                    type="button"
                    className="psw-whisper-btn"
                    onClick={() => {
                      playStoryLine(currentStorySlide.whisperFinale!.sa);
                      soundEffects.playSuccessDing();
                    }}
                  >
                    🌬️ Listen to the Whispering Wind
                  </button>
                </div>
              )}

              {currentStorySlide.endNote && (
                <div className="psw-whisper-banner" style={{ marginTop: 12 }}>
                  <span className="psw-whisper-icon" aria-hidden="true">🔱 📝</span>
                  <p className="psw-whisper-en"><strong>Note · {currentStorySlide.endNote.titleEn}</strong></p>
                  <p className="psw-whisper-en">{currentStorySlide.endNote.en}</p>
                  <p className="psw-whisper-sa" lang="sa">{currentStorySlide.endNote.sa}</p>
                  <p className="psw-iast-line psw-iast-on-dark">{devanagariToIast(currentStorySlide.endNote.sa)}</p>
                  <button type="button" className="psw-whisper-btn" onClick={() => playStoryLine(currentStorySlide.endNote!.sa)}>
                    🔊 Listen to the Note
                  </button>
                </div>
              )}

              <div className="psw-story-btn-row">
                <button
                  type="button"
                  className="psw-story-listen-btn"
                  onClick={() => playStoryLine(currentStorySlide.titleSa)}
                >
                  🔊 Listen to Slide Title
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="psw-story-nav-row">
            <button
              type="button"
              className="psw-nav-arrow-btn"
              disabled={storySlideIdx === 0}
              onClick={() => {
                setStorySlideIdx((i) => Math.max(0, i - 1));
                soundEffects.playStrokeChime();
              }}
            >
              ← Previous Slide
            </button>

            <div className="psw-story-dots">
              {STORY_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  className={`psw-dot ${idx === storySlideIdx ? 'is-active' : ''}`}
                  onClick={() => {
                    setStorySlideIdx(idx);
                    soundEffects.playStrokeChime();
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="psw-nav-arrow-btn"
              disabled={storySlideIdx === STORY_SLIDES.length - 1}
              onClick={() => {
                setStorySlideIdx((i) => Math.min(STORY_SLIDES.length - 1, i + 1));
                soundEffects.playStrokeChime();
              }}
            >
              Next Slide →
            </button>
          </div>
        </div>
      )}

      {tab === 'jungle' && <JungleCouncilStory />}

      {/* Bottom Floating Activity Stepper Bar */}
      <div className="psw-bottom-stepper-bar">
        <button
          type="button"
          className="psw-stepper-nav-btn"
          disabled={stepperIdx <= 0}
          onClick={() => {
            if (stepperIdx > 0) {
              const prevTab = stepperActivities[stepperIdx - 1].id;
              setTab(prevTab);
              soundEffects.playStrokeChime();
            }
          }}
        >
          ⬅️ Previous Game
        </button>

        <button
          type="button"
          className="psw-stepper-pill"
          onClick={() => {
            setViewMode('cards');
            soundEffects.playStrokeChime();
          }}
          title={`Click to browse all ${stepperActivities.length} cards in this level`}
        >
          <span aria-hidden="true">{currentActivity.icon}</span>
          <b>{currentActivity.labelSa} · {currentActivity.labelEn}</b>
          <small>({stepperIdx + 1} of {stepperActivities.length} · 🎴 Cards)</small>
        </button>

        <button
          type="button"
          className="psw-stepper-nav-btn"
          disabled={stepperIdx >= stepperActivities.length - 1}
          onClick={() => {
            if (stepperIdx < stepperActivities.length - 1) {
              const nextTab = stepperActivities[stepperIdx + 1].id;
              setTab(nextTab);
              soundEffects.playStrokeChime();
            }
          }}
        >
          Next Game ➡️
        </button>
      </div>

      {/* Code.org Style "More Adventures" Carousel scoped to Current Level + Next Level Upgrade */}
      <div className="psw-more-carousel-wrap">
        <div className="psw-mc-header">
          <h4 className="psw-mc-title">
            <span>{levelTier === 'next' ? '🚀' : '🌱'}</span>{' '}
            {levelTier === 'next' ? 'More Next Level Games (Ages 6–10)' : 'More Preschool Adventures to Explore'}
          </h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {levelTier === 'preschool' && (
              <button
                type="button"
                className="psw-pab-back-btn"
                style={{ background: '#eef2ff', borderColor: '#818cf8', color: '#3730a3' }}
                onClick={() => switchLevelTier('next')}
              >
                🚀 Next Level Games ({nextLevelCount}) ➔
              </button>
            )}
            <button
              type="button"
              className="psw-pab-back-btn"
              onClick={() => {
                setViewMode('cards');
                soundEffects.playStrokeChime();
              }}
            >
              View All {stepperActivities.length} Cards 🎴
            </button>
          </div>
        </div>
        <div className="psw-mc-cards-strip">
          {stepperActivities.filter((a) => a.id !== tab).map((item) => (
            <div
              key={item.id}
              className="psw-mc-card"
              onClick={() => launchActivity(item.id)}
            >
              <div className="psw-mc-banner" style={{ background: item.bannerGradient }}>
                {item.bannerVisual.image ? (
                  <img src={item.bannerVisual.image} alt={item.labelEn} className="psw-mc-banner-img" />
                ) : (
                  <span>{item.bannerVisual.emojiLead}</span>
                )}
              </div>
              <div className="psw-mc-body">
                <span className="psw-mc-grade">{item.gradeBadge}</span>
                <span className="psw-mc-name">{item.icon} {item.labelSa} · {item.labelEn}</span>
                <button
                  type="button"
                  className="psw-mc-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    launchActivity(item.id);
                  }}
                >
                  Play Now ➔
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

      {/* Bridge Card: Graduate to the Main Vijñāna Lab (All 17 STEM Labs) */}
      <div className="psw-bridge-banner" role="region" aria-label="Graduate to Main Vijñāna Lab">
        <div className="psw-bb-content">
          <div className="psw-bb-badge">🚀 NEXT STEPS · उच्च-विज्ञानम्</div>
          <h3 className="psw-bb-title">
            Ready for More Science Adventures? Explore the Main Vijñāna Lab!
          </h3>
          <p className="psw-bb-desc">
            For inquisitive minds and elder siblings: dive into <strong>17 interactive STEM simulations</strong> rooted in classical Indian science — from atomic particles and celestial mechanics to lunar landings and rocket propulsion.
          </p>
          <div className="psw-bb-actions">
            {onBrowseMainLabs && (
              <button
                type="button"
                className="psw-bb-cta-btn"
                onClick={onBrowseMainLabs}
              >
                🔬 Browse All 17 Vijñāna Lab Simulations ➔
              </button>
            )}
          </div>
        </div>
        <div className="psw-bb-cards">
          <button
            type="button"
            className="psw-bb-card"
            onClick={() => (onSelectMainLab ? onSelectMainLab('paramanu') : onNextLab?.())}
          >
            <span className="psw-bbc-icon">⚛️</span>
            <div className="psw-bbc-info">
              <strong>परमाणु · Atom Builder</strong>
              <small>Protons, neutrons &amp; electrons: craft elements (Ages 10–14)</small>
            </div>
            <span className="psw-bbc-arrow">➔</span>
          </button>
          <button
            type="button"
            className="psw-bb-card"
            onClick={() => (onSelectMainLab ? onSelectMainLab('chandrayaan') : onNextLab?.())}
          >
            <span className="psw-bbc-icon">🛰️</span>
            <div className="psw-bbc-info">
              <strong>चन्द्रयानम् · Moon Mission</strong>
              <small>Orbit injection, lunar transfer &amp; soft landing (Ages 11–14)</small>
            </div>
            <span className="psw-bbc-arrow">➔</span>
          </button>
          <button
            type="button"
            className="psw-bb-card"
            onClick={() => (onSelectMainLab ? onSelectMainLab('jyotisha') : onNextLab?.())}
          >
            <span className="psw-bbc-icon">🪐</span>
            <div className="psw-bbc-info">
              <strong>ज्योतिष · Celestial Orbits</strong>
              <small>Planet pull, gravitational orbits &amp; solar systems (Ages 8–12)</small>
            </div>
            <span className="psw-bbc-arrow">➔</span>
          </button>
          <button
            type="button"
            className="psw-bb-card"
            onClick={() => (onSelectMainLab ? onSelectMainLab('agnibana') : onNextLab?.())}
          >
            <span className="psw-bbc-icon">🚀</span>
            <div className="psw-bbc-info">
              <strong>अग्निबाणः · Rocket Builder</strong>
              <small>Stage engines, optimize thrust &amp; launch to orbit (Ages 12–14)</small>
            </div>
            <span className="psw-bbc-arrow">➔</span>
          </button>
        </div>
      </div>

      {/* Bodhi Core Idea */}
      <CoreIdea>
        <strong>बाल-संस्कृत-प्रज्ञा · The Wonder of Childhood:</strong> Young children naturally discover the universe
        through tangible shapes, the smiling moon in the night sky, daily sunrises, changing seasons, and friendly animals.
        In Sanatan Dharma, all aspects of nature—from the smallest mouse (Mūṣaka) to the five elements (Pṛthivī, Jala, Agni, Vāyu, Ākāśa)—are revered as one joyful family (<em>Sarva-bhūta-hita</em>).
      </CoreIdea>
    </div>
  );
};


const pswHexToRgb = (h: string) => {
  const x = h.replace('#', '');
  const f = x.length === 3 ? x.split('').map((c) => c + c).join('') : x;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};
const pswLerpHex = (a: string, b: string, t: number) => {
  const A = pswHexToRgb(a), B = pswHexToRgb(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
/** ratio 0 = all A, 50 = equal mix (named result), 100 = all B */
const pswMixAt = (a: string, mid: string, b: string, ratio: number) =>
  ratio <= 50 ? pswLerpHex(a, mid, ratio / 50) : pswLerpHex(mid, b, (ratio - 50) / 50);

export default PreschoolWonderLab;
