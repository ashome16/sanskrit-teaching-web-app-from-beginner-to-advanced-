import React, { useState, useEffect } from 'react';
import { CoreIdea, type LabSegmentProps } from './common';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

type PreschoolTab =
  | 'shapes'
  | 'colors'
  | 'animals'
  | 'fruits'
  | 'counting'
  | 'instruments'
  | 'moon'
  | 'day'
  | 'seasons'
  | 'vahanas'
  | 'story';

interface ShapeItem {
  id: string;
  dev: string;
  iast: string;
  en: string;
  color: string;
  svgType: 'circle' | 'square' | 'triangle' | 'star' | 'oval' | 'crescent';
  fact: string;
}

const SHAPES: ShapeItem[] = [
  { id: 'circle', dev: 'वृत्तम्', iast: 'vṛttam', en: 'Circle', color: '#f59e0b', svgType: 'circle', fact: 'Round like the warm morning sun and full moon!' },
  { id: 'square', dev: 'चतुरस्रम्', iast: 'caturasram', en: 'Square', color: '#10b981', svgType: 'square', fact: 'Four equal sides like a sacred altar and picture frame!' },
  { id: 'triangle', dev: 'त्रिकोणम्', iast: 'trikoṇam', en: 'Triangle', color: '#ef4444', svgType: 'triangle', fact: 'Three sharp corners like a mountain peak and temple spire!' },
  { id: 'star', dev: 'तारका', iast: 'tārakā', en: 'Star', color: '#8b5cf6', svgType: 'star', fact: 'Twinkling bright in the dark night sky with 5 points!' },
  { id: 'oval', dev: 'अण्डाकारः', iast: 'aṇḍākāraḥ', en: 'Oval', color: '#ec4899', svgType: 'oval', fact: 'Smooth and egg-shaped like a river pebble or seed!' },
  { id: 'crescent', dev: 'अर्धचन्द्रः', iast: 'ardhacandraḥ', en: 'Crescent', color: '#06b6d4', svgType: 'crescent', fact: 'A smiling curved moon shining at bedtime!' },
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
  isPrimary?: boolean;
}

const COLORS: ColorItem[] = [
  { id: 'red', dev: 'रक्तः', iast: 'raktaḥ', en: 'Red', hex: '#ef4444', itemEn: 'Ripe Apple', itemDev: 'सेवफलम्', itemIcon: '🍎', isPrimary: true },
  { id: 'yellow', dev: 'पीतः', iast: 'pītaḥ', en: 'Yellow', hex: '#facc15', itemEn: 'Sweet Banana', itemDev: 'कदलीफलम्', itemIcon: '🍌', isPrimary: true },
  { id: 'blue', dev: 'नीलः', iast: 'nīlaḥ', en: 'Blue', hex: '#3b82f6', itemEn: 'Dancing Peacock', itemDev: 'मयूरः', itemIcon: '🦚', isPrimary: true },
  { id: 'green', dev: 'हरितः', iast: 'haritaḥ', en: 'Green', hex: '#22c55e', itemEn: 'Fresh Leaf', itemDev: 'पर्णम्', itemIcon: '🍃' },
  { id: 'white', dev: 'श्वेतः', iast: 'śvetaḥ', en: 'White', hex: '#f8fafc', itemEn: 'Graceful Swan', itemDev: 'हंसः', itemIcon: '🦢' },
  { id: 'orange', dev: 'काषायः (नारङ्गः)', iast: 'kāṣāyaḥ', en: 'Saffron / Orange', hex: '#f97316', itemEn: 'Sacred Diya', itemDev: 'दीपः', itemIcon: '🪔' },
  { id: 'purple', dev: 'जाम्बवः', iast: 'jāmbavaḥ', en: 'Purple / Violet', hex: '#a855f7', itemEn: 'Sweet Grapes', itemDev: 'द्राक्षाफलम्', itemIcon: '🍇' },
  { id: 'pink', dev: 'पाटलः', iast: 'pāṭalaḥ', en: 'Pink', hex: '#ec4899', itemEn: 'Sacred Lotus', itemDev: 'कमलम्', itemIcon: '🪷' },
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
  { id: 'watermelon', dev: 'कालिङ्गम्', iast: 'kāliṅgam', en: 'Watermelon', icon: '🍉', color: '#10b981', sweetFact: 'Giant green ball with refreshing sweet red smiles inside!' },
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
  { num: 1, devDigit: '१', devName: 'एकम्', iast: 'ekam', en: 'One', icon: '☀️', phraseSa: 'एकः सूर्यः', phraseEn: 'One Golden Sun', color: '#f59e0b' },
  { num: 2, devDigit: '२', devName: 'द्वे', iast: 'dve', en: 'Two', icon: '🦢', phraseSa: 'द्वौ हंसौ', phraseEn: 'Two Graceful Swans', color: '#06b6d4' },
  { num: 3, devDigit: '३', devName: 'त्रीणि', iast: 'trīṇi', en: 'Three', icon: '🍃', phraseSa: 'त्रीणि बिल्वपत्राणि', phraseEn: 'Three Bilva Leaves', color: '#10b981' },
  { num: 4, devDigit: '४', devName: 'चत्वारि', iast: 'catvāri', en: 'Four', icon: '🦁', phraseSa: 'चत्वारः वेदाः', phraseEn: 'Four Vedas / Lion Paws', color: '#f97316' },
  { num: 5, devDigit: '५', devName: 'पञ्च', iast: 'pañca', en: 'Five', icon: '🖐️', phraseSa: 'पञ्चभूतानि', phraseEn: 'Five Elements & Fingers', color: '#8b5cf6' },
  { num: 6, devDigit: '६', devName: 'षट्', iast: 'ṣaṭ', en: 'Six', icon: '🌸', phraseSa: 'षट् ऋतवः', phraseEn: 'Six Seasons of Nature', color: '#ec4899' },
  { num: 7, devDigit: '७', devName: 'सप्त', iast: 'sapta', en: 'Seven', icon: '🌈', phraseSa: 'सप्त वर्णाः', phraseEn: 'Seven Rainbow Colors', color: '#0ea5e9' },
  { num: 8, devDigit: '८', devName: 'अष्ट', iast: 'aṣṭa', en: 'Eight', icon: '🪷', phraseSa: 'अष्टदल-कमलम्', phraseEn: 'Eight Lotus Petals', color: '#14b8a6' },
  { num: 9, devDigit: '९', devName: 'नव', iast: 'nava', en: 'Nine', icon: '🪐', phraseSa: 'नव ग्रहाः', phraseEn: 'Nine Cosmic Planets', color: '#6366f1' },
  { num: 10, devDigit: '१०', devName: 'दश', iast: 'daśa', en: 'Ten', icon: '🌟', phraseSa: 'दश अवताराः', phraseEn: 'Ten Sparkling Stars', color: '#eab308' },
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
  soundWord: string;
  deityConnect: string;
  bgGradient: string;
}

const INSTRUMENTS: InstrumentItem[] = [
  { id: 'ghanta', dev: 'घण्टा', iast: 'ghaṇṭā', en: 'Temple Bell', icon: '🔔', soundType: 'bell', soundWord: 'किङ्किणी-झणत्कारः · Ting-Ting!', deityConnect: 'Ring before prayers to welcome positive devic energy!', bgGradient: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)' },
  { id: 'damaru', dev: 'डमरू', iast: 'ḍamarū', en: "Shiva's Drum", icon: '🪘', soundType: 'damaru', soundWord: 'डम-डम-डम · Dum-Dum-Dum!', deityConnect: "The sacred rhythm beat from which cosmic sounds flow!", bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' },
  { id: 'shankha', dev: 'शङ्खः', iast: 'śaṅkhaḥ', en: 'Sacred Conch', icon: '🐚', soundType: 'conch', soundWord: 'ओङ्कार-नादः · Deep Horn Call!', deityConnect: 'Blown at dawn and auspicious moments to clear negativity!', bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)' },
  { id: 'veena', dev: 'वीणा', iast: 'vīṇā', en: "Saraswati's Lute", icon: '🪕', soundType: 'strings', soundWord: 'झङ्कारः · Sweet Melody!', deityConnect: 'Tuning the vibrations of divine wisdom and learning!', bgGradient: 'linear-gradient(135deg, #701a75 0%, #a21caf 100%)' },
  { id: 'mridanga', dev: 'मृदङ्गः', iast: 'mṛdaṅgaḥ', en: 'Gurukul Drum', icon: '🥁', soundType: 'drum', soundWord: 'धिम्-ता-किट · Dhim-Tha-Ki-Ta!', deityConnect: 'The heart rhythm drum for cheerful kirtans and dances!', bgGradient: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)' },
  { id: 'manjira', dev: 'मञ्जीरा', iast: 'mañjīrā', en: 'Golden Cymbals', icon: '🪙', soundType: 'cymbals', soundWord: 'झिलमिल-क्विणनम् · Chink-Chink!', deityConnect: 'Twinkling rhythm cymbals keeping joyful time with music!', bgGradient: 'linear-gradient(135deg, #854d0e 0%, #ca8a04 100%)' },
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
  vahanaDev: string;
  vahanaEn: string;
  vahanaIcon: string;
  quote: string;
}

const VAHANAS: VahanaPair[] = [
  { id: 'ganesha', godDev: 'श्रीगणेशः', godEn: 'Ganesha', godIcon: '🐘', vahanaDev: 'मूषकः', vahanaEn: 'Little Mouse', vahanaIcon: '🐭', quote: 'मूषकवाहन मोदकहस्त · Even the tiny mouse is loved and honored!' },
  { id: 'shiva', godDev: 'भगवान् शिवः', godEn: 'Lord Shiva', godIcon: '🔱', vahanaDev: 'नन्दी (वृषभः)', vahanaEn: 'Nandi Bull', vahanaIcon: '🐂', quote: 'नन्दिवाहन महादेव · Loyal, gentle, and strong protector!' },
  { id: 'vishnu', godDev: 'भगवान् विष्णुः', godEn: 'Lord Vishnu', godIcon: '🪷', vahanaDev: 'गरुडः', vahanaEn: 'Garuda Eagle', vahanaIcon: '🦅', quote: 'गरुडध्वज नारायण · Soaring high across the cosmic skies!' },
  { id: 'saraswati', godDev: 'देवी सरस्वती', godEn: 'Goddess Saraswati', godIcon: '🪕', vahanaDev: 'हंसः', vahanaEn: 'Wisdom Swan', vahanaIcon: '🦢', quote: 'हंसवाहिनी विद्यादेवी · The swan who knows truth from illusion!' },
  { id: 'durga', godDev: 'माँ दुर्गा', godEn: 'Maa Durga', godIcon: '⚔️', vahanaDev: 'सिंहः', vahanaEn: 'Brave Lion', vahanaIcon: '🦁', quote: 'सिंहवाहिनी जगन्माता · Courage, strength, and love!' },
  { id: 'kartikeya', godDev: 'भगवान् कार्तिकेयः', godEn: 'Lord Kartikeya', godIcon: '🏹', vahanaDev: 'मयूरः', vahanaEn: 'Dancing Peacock', vahanaIcon: '🦚', quote: 'मयूरवाहन षण्मुख · Radiant beauty and noble leadership!' },
  { id: 'lakshmi', godDev: 'देवी लक्ष्मीः', godEn: 'Goddess Lakshmi', godIcon: '💰', vahanaDev: 'गजः', vahanaEn: 'Royal Elephant', vahanaIcon: '🐘', quote: 'गजलक्ष्मी धनदात्री · Gentle giant blessing all with joy!' },
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
  whisperFinale?: {
    en: string;
    sa: string;
  };
}

const STORY_SLIDES: StorySlide[] = [
  {
    id: 1,
    titleEn: 'Kalu & Isha: Children of Nature',
    titleSa: 'कालुः ईशा च · प्रकृतेः शिशू',
    elementHighlight: 'प्रकृति-वन्दना · Forest Love & Fire Songs',
    icon: '🏕️',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)',
    dialogues: [
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu (Tribal Boy in Forest)',
        speakerLabelSa: 'कालुः (वनवासी बालकः)',
        speakerIcon: '🏹',
        textEn: 'Once upon a time, in a beautiful green forest, lived a little tribal boy named Kalu. Kalu loved the tall trees, the wet mud, and the big blue sky. Every day, Kalu patted the brown earth and whispered, "Thank you, Mother Earth!"',
        textSa: 'एकदा एकस्मिन् सुन्दरे वने कालुः नाम एकः वनवासी बालकः वसति स्म। कालुः उन्नतान् वृक्षान्, आर्द्रमृत्तिकां, विशालं नीलआकाशं च स्निह्यति स्म। सः प्रतिदिनं भूमिस्पर्शं कृत्वा वदति स्म, "माता भूमिः, तुभ्यं नमः!"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha (Vedic Girl on Hill)',
        speakerLabelSa: 'ईशा (वैदिकी बालिका)',
        speakerIcon: '🪔',
        textEn: 'High up on a nearby hill lived a little Vedic girl named Isha. Isha sat with her family around a small, bright fire. Every morning, Isha sang a sweet song to the sun and the wind, "Thank you, holy fire! Thank you, beautiful breeze!"',
        textSa: 'समीपे एकस्मिन् पर्वते ईशा नाम एका वैदिकी बालिका वसति स्म। ईशा प्रतिदिनं प्रातः परिवारेण सह यज्ञकुण्डस्य समीपे उपविशति स्म। सा पवित्रमग्निं वायुं च दृष्ट्वा मधुरं गायति स्म, "पावन पावक, तुभ्यं नमः! मन्द समीर, तुभ्यं नमः!"',
      },
    ],
  },
  {
    id: 2,
    titleEn: 'Meeting at the River · Holy Water',
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
        textEn: 'One sunny afternoon, Kalu and Isha walked to the edge of the river.',
        textSa: 'एकदा सूर्यप्रकाशे कालुः ईशा च नद्याः तीरं प्रति अगच्छताम्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: 'Kalu pointed to the water and said, "Look! The river gives us cool water. Water is a holy giant who keeps the trees alive!"',
        textSa: 'कालुः जलं दर्शितवान्, "पश्य! नदी अस्मभ्यं शीतलं जलं यच्छति। जलं देवस्वरूपम् अस्ति, यत् वृक्षान् जीवयति!"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha clapped her hands. "Yes! In my home, we sing prayers to the holy rivers, Ganga and Saraswathi, who wash away our sorrows!"',
        textSa: 'ईशा करतलाडनं कृतवती। "आम्! मम गृहे अपि वयं पावननद्योः गङ्गा-सरस्वत्योः प्रार्थनां कुर्मः, या अस्मत्कष्टं हरति!"',
      },
    ],
  },
  {
    id: 3,
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
        textEn: 'Just then, a cool breeze blew. Whoosh!',
        textSa: 'तदैव एकः शीतलः वायुः अभवत्। शूँ-शूँ!',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: 'Kalu looked up and said, "The wind is the invisible breath of the forest."',
        textSa: 'कालुः अवदत्, "वायुः वनस्य अदृश्यः श्वासः अस्ति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha smiled. "The wind is our strong friend, Pawanputra Hanuman, who leaps across the sky with supreme energy!"',
        textSa: 'ईशा सस्मितम् अवदत्, "वायुः अस्माकं महाबली मित्रः पवनपुत्रः हनुमान् अस्ति, यः आकाशे महता वेगेन उत्पतति!"',
      },
    ],
  },
  {
    id: 4,
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
        textEn: 'Next, Kalu lit a small campfire to keep them warm.',
        textSa: 'ततः कालुः अग्निकुण्डं प्रज्वालितवान्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"Fire is the spirit that gives us light," he said.',
        textSa: 'सः अवदत्, "अग्निः सः जीवः यः अस्मभ्यं प्रकाशं ददाति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha bowed down. "Fire is the holy Yagna and the beautiful evening Aarthi that carries our love straight to the gods!"',
        textSa: 'ईशा नतमस्तका अभवत्। "अग्निः पावनः यज्ञः सुन्दरी आरतिः च अस्ति, या अस्माकं प्रेम देवान् प्रति नयति!"',
      },
    ],
  },
  {
    id: 5,
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
        textEn: 'Kalu then scooped up a handful of brown soil.',
        textSa: 'कालुः हस्ते मृत्तिकां गृहीतवान्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"The mud grows our fruits. It is our home."',
        textSa: 'सः अवदत्, "मृत्तिका अस्मभ्यं फलानि ददाति। एतत् अस्माकं गृहम् अस्ति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha touched the soil to her forehead. "This earth is our sacred Bharat Mata, the divine mother who feeds all her children!"',
        textSa: 'ईशा मृत्तिकां ललाटे धृतवती। "एषा भूमिः अस्माकं पावनी भारतमाता अस्ति, या सर्वान् शिशून् पालयति!"',
      },
    ],
  },
  {
    id: 6,
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
        textEn: 'Finally, Kalu looked up at the endless empty space above.',
        textSa: 'अन्ते कालुः विशालम् आकाशं दृष्टवान्।',
      },
      {
        speaker: 'kalu',
        speakerLabelEn: 'Kalu',
        speakerLabelSa: 'कालुः',
        speakerIcon: '🏹',
        textEn: '"The sky is a mystery. It holds everything but stays silent."',
        textSa: 'सः अवदत्, "आकाशः एकं रहस्यम् अस्ति। सः सर्वं धारयति परं मौनं तिष्ठति।"',
      },
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: 'Isha pointed to the stars. "Space belongs to the cosmic avatars! Like Lord Narasimha who burst out of a pillar in a room, and Lord Vamana whose giant steps expanded to occupy the whole universe!"',
        textSa: 'ईशा नक्षत्रान् दर्शितवती। "आकाशः दिव्य-अवताराणाम् अस्ति! यथा भगवान् नृसिंहः स्तम्भात् प्राकट्यत्, भगवान् वामनः च विशालपदेन समग्रं ब्रह्माण्डं व्याप्तवान्!"',
      },
    ],
  },
  {
    id: 7,
    titleEn: 'The Secret Revealed: Five Shared Friends',
    titleSa: 'पञ्चमित्राणां रहस्यम् · पञ्चमहाभूतानि',
    elementHighlight: 'पञ्चभूतानि · The 5 Shared Sacred Elements',
    icon: '⭐',
    bgGradient: 'linear-gradient(135deg, #4c1d95 0%, #5b21b6 60%, #7c3aed 100%)',
    dialogues: [
      {
        speaker: 'narrator',
        speakerLabelEn: 'Together in Harmony',
        speakerLabelSa: 'तौ द्वावपि',
        speakerIcon: '🤝',
        textEn: 'They smiled. Whether they called it the forest or the gods, they both loved the exact same Panchabhutas:',
        textSa: 'तौ सस्मितं पश्यतः। वनम् इति वदन्तु वा देवाः इति, तौ द्वावपि एतानि पञ्च तत्त्वानि एव स्निह्यतः:',
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
    titleEn: 'The River Dance: We Are All One!',
    titleSa: 'नदीतीरे एकतानृत्यम् · वयं सर्वे एकाः',
    elementHighlight: 'सनातनधर्मः · All Are One In Nature & Spirit',
    icon: '🎉',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #9d174d 60%, #be185d 100%)',
    dialogues: [
      {
        speaker: 'isha',
        speakerLabelEn: 'Isha',
        speakerLabelSa: 'ईशा',
        speakerIcon: '🪔',
        textEn: '"These five elements of Sanatan Dharma make up our whole world," Isha said.',
        textSa: '"सनातनधर्मस्य एतानि पञ्च तत्त्वानि अस्माकं संसारं रचयन्ति," ईशा अवदत्।',
      },
      {
        speaker: 'narrator',
        speakerLabelEn: 'Narrator',
        speakerLabelSa: 'कथाकारः',
        speakerIcon: '📖',
        textEn: 'They held hands and danced by the river, completely united.',
        textSa: 'तौ हस्तं गृहीत्वा नद्याः तीरे एकरूपेण अनृत्यतः।',
      },
    ],
    whisperFinale: {
      en: 'And the wind whispered, Whoosh! We are all one.',
      sa: 'वायुः च मन्दं अवदत्, शूँ! वयं सर्वे एकाः एव स्मः।',
    },
  },
];

export const PreschoolWonderLab: React.FC<LabSegmentProps> = ({ onNextLab: _onNextLab }) => {
  const [tab, setTab] = useState<PreschoolTab>('shapes');

  // Shapes Game State
  const [selectedShape, setSelectedShape] = useState<ShapeItem>(SHAPES[0]);
  const [shapeQuizTarget, setShapeQuizTarget] = useState<ShapeItem | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Color Game State
  const [selectedColor, setSelectedColor] = useState<ColorItem>(COLORS[0]);
  const [colorMixSlotA, setColorMixSlotA] = useState<ColorItem | null>(null);
  const [colorMixSlotB, setColorMixSlotB] = useState<ColorItem | null>(null);
  const [mixResult, setMixResult] = useState<{ dev: string; en: string; hex: string; icon: string } | null>(null);
  const [colorQuizTarget, setColorQuizTarget] = useState<ColorItem | null>(null);
  const [colorScore, setColorScore] = useState<number>(0);

  // Animal Safari State
  const [activeAnimal, setActiveAnimal] = useState<AnimalItem>(ANIMALS[0]);
  const [animalQuizTarget, setAnimalQuizTarget] = useState<AnimalItem | null>(null);
  const [animalScore, setAnimalScore] = useState<number>(0);

  // Fruits Picker State
  const [basketFruits, setBasketFruits] = useState<FruitItem[]>([]);
  const [lastPickedFruit, setLastPickedFruit] = useState<FruitItem | null>(null);

  // Counting State
  const [selectedCount, setSelectedCount] = useState<CountItem>(COUNT_ITEMS[0]);

  // Instruments State
  const [playingInstrumentId, setPlayingInstrumentId] = useState<string | null>(null);

  // Moon Game State
  const [moonPct, setMoonPct] = useState<number>(50);

  // Day Game State
  const [selectedDay, setSelectedDay] = useState<DaySection>(DAY_SECTIONS[0]);

  // Seasons Game State
  const [selectedSeason, setSelectedSeason] = useState<SeasonItem>(SEASONS[0]);
  const [activeParticles, setActiveParticles] = useState<string[]>([]);

  // Vahanas Matching Game State
  const [selectedGod, setSelectedGod] = useState<VahanaPair | null>(null);
  const [matchedVahanas, setMatchedVahanas] = useState<Set<string>>(new Set());
  const [shuffledVahanas, setShuffledVahanas] = useState<VahanaPair[]>([]);

  // Story State
  const [storySlideIdx, setStorySlideIdx] = useState<number>(0);

  // Shuffle Vahanas initially
  useEffect(() => {
    setShuffledVahanas([...VAHANAS].sort(() => Math.random() - 0.5));
  }, []);

  // Trigger floating particles on season switch
  const triggerSeasonWeather = (season: SeasonItem) => {
    setSelectedSeason(season);
    playPronunciation(season.dev);
    soundEffects.playStrokeChime();
    setActiveParticles(season.particles);
    setTimeout(() => {
      setActiveParticles([]);
    }, 4000);
  };

  // Start / check shape quiz
  const startShapeQuiz = () => {
    const random = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    setShapeQuizTarget(random);
    playPronunciation(random.dev);
    soundEffects.playStrokeChime();
  };

  const handleShapeClick = (shape: ShapeItem) => {
    setSelectedShape(shape);
    playPronunciation(shape.dev);
    if (shapeQuizTarget) {
      if (shape.id === shapeQuizTarget.id) {
        soundEffects.playCelebrationChime();
        setQuizScore((s) => s + 1);
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
    soundEffects.playAnimalWiggle();
    playPronunciation(`${animal.dev} ${animal.soundLabelSa}`);
    if (animalQuizTarget) {
      if (animal.id === animalQuizTarget.id) {
        soundEffects.playCelebrationChime();
        setAnimalScore((s) => s + 1);
        setAnimalQuizTarget(null);
      } else {
        soundEffects.playPuzzleSnap();
      }
    }
  };

  const startAnimalQuiz = () => {
    const random = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    setAnimalQuizTarget(random);
    soundEffects.playStrokeChime();
    playPronunciation(`कः वदति? ${random.soundLabelSa}`);
  };

  // Fruit Picker Logic
  const handleFruitPick = (fruit: FruitItem) => {
    soundEffects.playFruitHarvestPop();
    playPronunciation(fruit.dev);
    setLastPickedFruit(fruit);
    setBasketFruits((prev) => {
      const next = [...prev, fruit];
      if (next.length % 5 === 0) {
        soundEffects.playVictoryFanfare();
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
    soundEffects.playStrokeChime();
    playPronunciation(`${item.devName} ${item.phraseSa}`);
  };

  // Instrument Player Logic
  const handlePlayInstrument = (inst: InstrumentItem) => {
    setPlayingInstrumentId(inst.id);
    if (inst.soundType === 'bell') {
      soundEffects.playTempleBell();
    } else if (inst.soundType === 'damaru') {
      soundEffects.playDamaruBeat();
    } else if (inst.soundType === 'conch') {
      soundEffects.playShankhaConch();
    } else if (inst.soundType === 'strings') {
      soundEffects.playCelebrationChime();
    } else if (inst.soundType === 'drum') {
      soundEffects.playCartoonBoing();
    } else {
      soundEffects.playStrokeChime();
    }
    playPronunciation(inst.dev);
    setTimeout(() => {
      setPlayingInstrumentId(null);
    }, 1200);
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
    setShuffledVahanas([...VAHANAS].sort(() => Math.random() - 0.5));
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

  return (
    <div className="vl-subsim preschool-wonder-root" data-testid="preschool-wonder-lab">
      {/* Preschool Playground Hero Header */}
      <div className="psw-hero-box">
        <div className="psw-hero-badge">
          <span className="psw-hero-icon" aria-hidden="true">🧸</span>
          <div>
            <span className="psw-hero-kicker">शिशु-क्रीडा-वाटिका · AGES 2–6 TACTILE WONDER PLAYGROUND</span>
            <h2 className="psw-hero-title">Preschool Wonder Playground</h2>
          </div>
        </div>
        <p className="psw-hero-desc">
          Gentle, tactile, cheerful play lab for toddlers and preschoolers! Touch shapes, mix rainbow colors,
          hear animal calls, pick orchard fruits, count with sacred friends, tap temple bells, play with moon phases,
          experience seasons, and enjoy the bilingual story of the 5 elements with sweet Sanskrit audio!
        </p>

        {/* 11 Fun Activity Tabs */}
        <div className="psw-tab-nav" role="tablist" aria-label="Preschool activities">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'shapes'}
            className={`psw-tab-btn ${tab === 'shapes' ? 'is-active' : ''}`}
            onClick={() => { setTab('shapes'); soundEffects.playStrokeChime(); }}
          >
            <span>🎨</span>
            <b>आकाराः · Shapes</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'colors'}
            className={`psw-tab-btn ${tab === 'colors' ? 'is-active' : ''}`}
            onClick={() => { setTab('colors'); soundEffects.playStrokeChime(); }}
          >
            <span>🌈</span>
            <b>वर्णाः · Color Magic</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'animals'}
            className={`psw-tab-btn ${tab === 'animals' ? 'is-active' : ''}`}
            onClick={() => { setTab('animals'); soundEffects.playStrokeChime(); }}
          >
            <span>🐮</span>
            <b>पशु-ध्वनयः · Animal Safari</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'fruits'}
            className={`psw-tab-btn ${tab === 'fruits' ? 'is-active' : ''}`}
            onClick={() => { setTab('fruits'); soundEffects.playStrokeChime(); }}
          >
            <span>🍎</span>
            <b>फल-सङ्ग्रहः · Fruit Picker</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'counting'}
            className={`psw-tab-btn ${tab === 'counting' ? 'is-active' : ''}`}
            onClick={() => { setTab('counting'); soundEffects.playStrokeChime(); }}
          >
            <span>🔢</span>
            <b>संख्याः · Count 1–10</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'instruments'}
            className={`psw-tab-btn ${tab === 'instruments' ? 'is-active' : ''}`}
            onClick={() => { setTab('instruments'); soundEffects.playStrokeChime(); }}
          >
            <span>🔔</span>
            <b>वाद्यानि · Bells &amp; Beats</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'moon'}
            className={`psw-tab-btn ${tab === 'moon' ? 'is-active' : ''}`}
            onClick={() => { setTab('moon'); soundEffects.playStrokeChime(); }}
          >
            <span>🌙</span>
            <b>चन्द्र-कलाः · Moon</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'day'}
            className={`psw-tab-btn ${tab === 'day' ? 'is-active' : ''}`}
            onClick={() => { setTab('day'); soundEffects.playStrokeChime(); }}
          >
            <span>🌅</span>
            <b>दिन-भागाः · Day Time</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'seasons'}
            className={`psw-tab-btn ${tab === 'seasons' ? 'is-active' : ''}`}
            onClick={() => { setTab('seasons'); soundEffects.playStrokeChime(); }}
          >
            <span>🌸</span>
            <b>ऋतवः · Seasons</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'vahanas'}
            className={`psw-tab-btn ${tab === 'vahanas' ? 'is-active' : ''}`}
            onClick={() => { setTab('vahanas'); soundEffects.playStrokeChime(); }}
          >
            <span>🦚</span>
            <b>देव-वाहनानि · Match Vāhanas</b>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'story'}
            className={`psw-tab-btn ${tab === 'story' ? 'is-active' : ''}`}
            onClick={() => { setTab('story'); soundEffects.playStrokeChime(); }}
          >
            <span>📖</span>
            <b>५ मित्राणि · 5 Friends Story</b>
          </button>
        </div>
      </div>

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
              {shapeQuizTarget ? `❓ Find: ${shapeQuizTarget.dev} (${shapeQuizTarget.en})` : '⭐ Tap To Play Quiz!'}
            </button>
          </div>

          {shapeQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Little Quest: Tap the <strong>{shapeQuizTarget.dev}</strong> ({shapeQuizTarget.en})! {quizScore > 0 && `⭐ Stars: ${quizScore}`}</span>
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

          <div className="psw-shapes-grid">
            {SHAPES.map((s) => {
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
                        <path d="M 55 12 A 38 38 0 1 0 55 88 A 28 28 0 0 1 55 12 Z" fill={s.color} />
                        <circle cx="34" cy="44" r="4" fill="#ffffff" />
                        <path d="M 30 56 Q 38 64 42 56" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <div className="psw-shape-meta">
                    <span className="psw-shape-dev" lang="sa">{s.dev}</span>
                    <span className="psw-shape-en">{s.en}</span>
                    <small className="psw-shape-iast">{s.iast}</small>
                  </div>
                  <span className="psw-speaker-icon" aria-hidden="true">🔊</span>
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
              <p className="psw-spotlight-desc">{selectedShape.fact}</p>
            </div>
            <button
              type="button"
              className="psw-action-pill"
              onClick={() => playPronunciation(selectedShape.dev)}
            >
              🔊 Pronounce {selectedShape.dev}
            </button>
          </div>
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
              {colorQuizTarget ? `❓ Find: ${colorQuizTarget.dev} (${colorQuizTarget.en})` : '⭐ Tap For Color Quiz!'}
            </button>
          </div>

          {colorQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Little Quest: Tap the <strong>{colorQuizTarget.dev}</strong> ({colorQuizTarget.en})! {colorScore > 0 && `⭐ Stars: ${colorScore}`}</span>
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

          <div className="psw-colors-grid">
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
                  <span className="pcc-en">{c.en}</span>
                  <span className="pcc-example">{c.itemDev} ({c.itemEn})</span>
                  <span className="psc-speaker" aria-hidden="true">🔊</span>
                </button>
              );
            })}
          </div>

          {/* Magic Color Mixing Cauldron */}
          <div className="psw-magic-mixer-box">
            <h4 className="psw-mixer-title">🧪 वर्ण-मिश्रण-क्रीडा · Magic Color Mixing Cauldron!</h4>
            <p className="psw-mixer-sub">
              Tap any two colors above to see what magical new color they create together!
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
                style={{ background: mixResult ? mixResult.hex : '#f1f5f9' }}
              >
                {mixResult ? mixResult.icon : '✨'}
              </div>
            </div>

            {mixResult ? (
              <div className="psw-mixed-result-banner" role="status">
                <span style={{ fontSize: '2.2rem' }}>{mixResult.icon}</span>
                <div>
                  <strong style={{ fontSize: '1.25rem', color: '#0f172a', display: 'block' }} lang="sa">
                    {mixResult.dev}
                  </strong>
                  <span style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 700 }}>
                    {mixResult.en}
                  </span>
                </div>
                <button
                  type="button"
                  className="psw-action-pill"
                  onClick={resetColorMixer}
                >
                  Mix Again ↺
                </button>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e', fontWeight: 700 }}>
                {!colorMixSlotA ? '👉 Tap a color above to place it in Slot 1' : '👉 Now tap a second color above to mix!'}
              </p>
            )}
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
                Tap each friendly animal to see them wiggle, hear their call, and learn their sweet Sanskrit names!
              </p>
            </div>
            <button
              type="button"
              className="psw-quiz-btn"
              onClick={startAnimalQuiz}
            >
              {animalQuizTarget ? `❓ Who calls: "${animalQuizTarget.soundLabelSa}"?` : '⭐ Tap For Animal Sound Quiz!'}
            </button>
          </div>

          {animalQuizTarget && (
            <div className="psw-quiz-banner" role="status">
              <span>🎯 Little Quest: Tap the animal who calls <strong>"{animalQuizTarget.soundLabelSa}"</strong> ({animalQuizTarget.soundLabelEn})! {animalScore > 0 && `⭐ Stars: ${animalScore}`}</span>
              <button
                type="button"
                className="psw-quiz-speaker"
                onClick={() => playPronunciation(`कः वदति? ${animalQuizTarget.soundLabelSa}`)}
                title="Hear sound again"
              >
                🔊 Listen Again
              </button>
            </div>
          )}

          <div className="psw-animals-grid">
            {ANIMALS.map((a) => {
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
                  <strong className="pac-dev" lang="sa">{a.dev}</strong>
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
                soundEffects.playAnimalWiggle();
                playPronunciation(`${activeAnimal.dev} ${activeAnimal.soundLabelSa}`);
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
            <div className="psw-score-pill">
              <span>🧺 In Basket: <strong>{basketFruits.length}</strong></span>
              {basketFruits.length > 0 && (
                <button type="button" className="psw-reset-link" onClick={resetFruitBasket}>
                  Empty Basket ↺
                </button>
              )}
            </div>
          </div>

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
                      Just added: <strong>{lastPickedFruit.icon} {lastPickedFruit.dev}</strong> ({lastPickedFruit.en})
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
        </div>
      )}

      {/* ===================================================================
          TAB: COUNTING 1 TO 10 (संख्या-गणना)
         =================================================================== */}
      {tab === 'counting' && (
        <div className="psw-card-bench">
          <div className="psw-bench-header">
            <div>
              <h3 className="psw-section-heading">🔢 संख्या-गणना · Count 1 to 10 with Sacred Friends</h3>
              <p className="psw-section-sub">
                Tap each number below to see sacred friends appear and count along with cheerful Sanskrit pronunciation!
              </p>
            </div>
            <div className="psw-story-slide-counter">
              Number <strong>{selectedCount.num}</strong> of 10
            </div>
          </div>

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
            </h3>
            <p className="pcs-hero-sub">
              <strong lang="sa">{selectedCount.phraseSa}</strong> · {selectedCount.phraseEn}
            </p>

            {/* Bouncing Grid of Items Matching Count */}
            <div className="psw-count-emojis-grid">
              {Array.from({ length: selectedCount.num }).map((_, i) => (
                <div
                  key={i}
                  className="pce-item"
                  style={{ animationDelay: `${(i * 0.15) % 1.5}s` }}
                  title={`${i + 1} of ${selectedCount.num}`}
                >
                  {selectedCount.icon}
                </div>
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
          </div>

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
                  <div className="pic-ring">{inst.icon}</div>
                  <h4 className="pic-dev" lang="sa">{inst.dev}</h4>
                  <p className="pic-en">{inst.en} ({inst.iast})</p>
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
              <p className="psw-section-sub">Slide the slider or tap any phase to watch the moon smile and grow!</p>
            </div>
          </div>

          <div className="psw-moon-sandbox">
            <div className="psw-moon-sky">
              {/* Stars in Sky */}
              <span className="psw-star" style={{ top: '15%', left: '18%' }}>✨</span>
              <span className="psw-star" style={{ top: '25%', left: '80%' }}>⭐</span>
              <span className="psw-star" style={{ top: '65%', left: '12%' }}>🌟</span>
              <span className="psw-star" style={{ top: '70%', left: '85%' }}>✨</span>
              <span className="psw-star" style={{ top: '35%', left: '30%' }}>★</span>

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
                      soundEffects.playStrokeChime();
                    }}
                  >
                    <span>{p.emoji}</span>
                    <span lang="sa" className="pm-dev">{p.dev}</span>
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
          </div>

          <div className="psw-day-sandbox">
            {/* Dynamic Sky Scene */}
            <div className="psw-day-sky" style={{ background: selectedDay.skyBg }}>
              {/* Sun or Moon representation */}
              <div
                className="psw-sky-orb"
                style={{
                  left: `${selectedDay.sunPos.x}%`,
                  top: `${selectedDay.sunPos.y}%`,
                  boxShadow: selectedDay.id === 'ratri' ? '0 0 35px #e0e7ff' : '0 0 45px #fde047',
                  background: selectedDay.id === 'ratri' ? '#e2e8f0' : '#facc15',
                }}
              >
                {selectedDay.id === 'ratri' ? '🌙' : '☀️'}
              </div>

              {/* Mountains & Ground Silhouette */}
              <div className="psw-landscape-silhouette">
                <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="psw-mountains">
                  <polygon points="0,120 70,40 160,120 250,30 340,120 400,60 400,120" fill="rgba(15, 23, 42, 0.45)" />
                  <polygon points="0,120 120,70 200,120 280,60 400,110 400,120" fill="rgba(15, 23, 42, 0.65)" />
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
                      soundEffects.playStrokeChime();
                    }}
                  >
                    <span className="pdb-btn-icon">{d.icon}</span>
                    <strong lang="sa">{d.dev}</strong>
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
          </div>

          <div className="psw-seasons-sandbox">
            {/* Active Weather Canvas / Showcase */}
            <div
              className="psw-weather-stage"
              style={{
                background: `linear-gradient(145deg, ${selectedSeason.themeColor}22 0%, ${selectedSeason.themeColor}55 100%)`,
                borderColor: selectedSeason.themeColor,
              }}
            >
              <span className="psw-weather-giant-icon">{selectedSeason.icon}</span>

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
                    <strong lang="sa">{s.dev}</strong>
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
              <span>⭐ Matched: <strong>{matchedVahanas.size}</strong> of {VAHANAS.length}</span>
              {matchedVahanas.size > 0 && (
                <button type="button" className="psw-reset-link" onClick={resetVahanaGame}>
                  Reset ↺
                </button>
              )}
            </div>
          </div>

          {matchedVahanas.size === VAHANAS.length && (
            <div className="psw-victory-banner" role="status">
              <span>🎉 <strong>सर्वं सम्यक्! Excellent Work!</strong> You matched all 8 Divine Animal Friends!</span>
              <button type="button" className="psw-quiz-btn" onClick={resetVahanaGame}>
                Play Again ↺
              </button>
            </div>
          )}

          <div className="psw-vahana-match-board">
            {/* Column 1: The Deities */}
            <div className="psw-vahana-col">
              <span className="psw-col-label">1. Tap a God / Goddess</span>
              <div className="psw-vahana-list">
                {VAHANAS.map((v) => {
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
                      <span className="pvb-icon">{v.godIcon}</span>
                      <div className="pvb-meta">
                        <strong lang="sa">{v.godDev}</strong>
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
                        <strong lang="sa">{v.vahanaDev}</strong>
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
                <small>{currentStorySlide.titleEn}</small>
              </h3>

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
                        <small>· {d.speakerLabelEn}</small>
                      </span>
                      <button
                        type="button"
                        className="psw-dialogue-audio-btn"
                        onClick={() => playPronunciation(d.textSa)}
                        title="Listen to Sanskrit"
                      >
                        🔊 Listen
                      </button>
                    </div>
                    <p className="psw-dialogue-sa" lang="sa">{d.textSa}</p>
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
                        <span>({elm.saDesc})</span>
                        <small>{elm.enDesc}</small>
                      </div>
                      <button
                        type="button"
                        className="pesc-speaker"
                        onClick={() => playPronunciation(`${elm.saName} ${elm.saDesc}`)}
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
                  <p className="psw-whisper-en">{currentStorySlide.whisperFinale.en}</p>
                  <button
                    type="button"
                    className="psw-whisper-btn"
                    onClick={() => {
                      playPronunciation(currentStorySlide.whisperFinale!.sa);
                      soundEffects.playSuccessDing();
                    }}
                  >
                    🌬️ Listen to the Whispering Wind
                  </button>
                </div>
              )}

              <div className="psw-story-btn-row">
                <button
                  type="button"
                  className="psw-story-listen-btn"
                  onClick={() => playPronunciation(currentStorySlide.titleSa)}
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

      {/* Bodhi Core Idea */}
      <CoreIdea>
        <strong>बाल-संस्कृत-प्रज्ञा · The Wonder of Childhood:</strong> Young children naturally discover the universe
        through tangible shapes, the smiling moon in the night sky, daily sunrises, changing seasons, and friendly animals.
        In Sanatan Dharma, all aspects of nature—from the smallest mouse (Mūṣaka) to the five elements (Pṛthivī, Jala, Agni, Vāyu, Ākāśa)—are revered as one joyful family (<em>Sarva-bhūta-hita</em>).
      </CoreIdea>
    </div>
  );
};

export default PreschoolWonderLab;
