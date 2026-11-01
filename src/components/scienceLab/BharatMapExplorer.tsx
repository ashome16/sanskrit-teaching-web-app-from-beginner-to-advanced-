import React, { useMemo, useState } from 'react';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';

export type BharatKind = 'mountain' | 'river' | 'animal' | 'desert' | 'forest';
export type BharatPackId = 'animals' | 'rivers' | 'mountains' | 'nature' | 'all';
export type BharatPlayMode = 'quest' | 'explore' | 'match';
export type BharatRegion = 'north' | 'west' | 'center' | 'east' | 'south';

export interface BharatSpot {
  id: string;
  kind: BharatKind;
  region: BharatRegion;
  regionLabel: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  clue: string;
  kidFact: string;
  kidAction: string;
  x: number;
  y: number;
  labelPos?: 'top' | 'bottom' | 'left' | 'right';
}

export const BHARAT_SPOTS: BharatSpot[] = [
  // Mountains (4)
  {
    id: 'himalaya',
    kind: 'mountain',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Far North',
    dev: 'हिमालयः',
    iast: 'himālayaḥ',
    en: 'Himalaya Mountains',
    icon: '🏔️',
    clue: 'Snowy white crown at the very top of India!',
    kidFact: 'Himālaya means "Home of Snow" (hima + ālaya). The tallest snowy peaks on Earth shine here!',
    kidAction: '🙌 Stretch both hands high above your head like a tall snowy peak!',
    x: 38,
    y: 20,
    labelPos: 'bottom',
  },
  {
    id: 'sahyadri',
    kind: 'mountain',
    region: 'south',
    regionLabel: '⬅️⬇️ पश्चिम-दक्षिणम् · West Coast',
    dev: 'सह्याद्रिः',
    iast: 'sahyādriḥ',
    en: 'Western Ghats',
    icon: '⛰️',
    clue: 'Long green misty hills beside the western sea!',
    kidFact: 'Monsoon clouds hug the green Sahyādri hills, filling waterfalls, spice gardens, and frog ponds!',
    kidAction: '🌧️ Wiggle your fingers down like gentle mountain rain!',
    x: 21,
    y: 69,
    labelPos: 'right',
  },
  {
    id: 'vindhya',
    kind: 'mountain',
    region: 'center',
    regionLabel: '🎯 मध्य-भारतम् · Middle of India',
    dev: 'विन्ध्यः',
    iast: 'vindhyaḥ',
    en: 'Vindhya Hills',
    icon: '⛰️',
    clue: 'Ancient rocky hills right in the heart of India!',
    kidFact: 'Stories say the Vindhya hills bowed down politely for wise Sage Agastya walking south!',
    kidAction: '🙏 Fold your hands and do a sweet namaste bow!',
    x: 41,
    y: 42,
    labelPos: 'top',
  },
  {
    id: 'pariyatra',
    kind: 'mountain',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Rajasthan (West)',
    dev: 'पारियात्रः',
    iast: 'pāriyātraḥ',
    en: 'Aravalli Hills',
    icon: '⛰️',
    clue: 'Warm golden hills of Rajasthan in the north-west!',
    kidFact: 'Pāriyātra (Aravalli) are among the oldest grandfather hills in the whole wide world!',
    kidAction: '🪨 Stand strong and steady like an ancient hill!',
    x: 23,
    y: 35,
    labelPos: 'right',
  },

  // Rivers (6)
  {
    id: 'ganga',
    kind: 'river',
    region: 'north',
    regionLabel: '⬆️ उत्तर-मैदानम् · Northern Plains',
    dev: 'गङ्गा',
    iast: 'gaṅgā',
    en: 'River Ganga',
    icon: '🌊',
    clue: 'Starts in snowy Himalaya and flows east across North India!',
    kidFact: 'Sacred Mother Gaṅgā begins in icy glaciers and brings sweet water to millions of farms and river dolphins!',
    kidAction: '🐬 Wave your hand like a happy river dolphin swimming!',
    x: 51,
    y: 36,
    labelPos: 'top',
  },
  {
    id: 'yamuna',
    kind: 'river',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Joins Ganga',
    dev: 'यमुना',
    iast: 'yamunā',
    en: 'River Yamuna',
    icon: '💧',
    clue: 'Flows south-east in the north and hugs sister Ganga!',
    kidFact: 'Little Kṛṣṇa played flute beside the cool blue Yamunā river in Vrindavan!',
    kidAction: '🪈 Pretend to play a joyful little flute!',
    x: 32,
    y: 28,
    labelPos: 'right',
  },
  {
    id: 'brahmaputra',
    kind: 'river',
    region: 'east',
    regionLabel: '➡️ पूर्वोत्तरम् · Assam (North-East)',
    dev: 'ब्रह्मपुत्रः',
    iast: 'brahmaputraḥ',
    en: 'River Brahmaputra',
    icon: '🌊',
    clue: 'Mighty wide river flowing through green Assam in the far east!',
    kidFact: 'Brahmaputra is so wide it holds Majuli — a giant green river island full of birds and boats!',
    kidAction: '🚣 Row an imaginary boat across the big wide river!',
    x: 80,
    y: 35,
    labelPos: 'bottom',
  },
  {
    id: 'narmada',
    kind: 'river',
    region: 'center',
    regionLabel: '⬅️ मध्य-पश्चिमम् · Flows West',
    dev: 'नर्मदा',
    iast: 'narmadā',
    en: 'River Narmada',
    icon: '💧',
    clue: 'Sparkling middle-India river flowing west to the Arabian Sea!',
    kidFact: 'Narmadā means "Giver of Joy"! It dances through shining white marble rocks and waterfalls.',
    kidAction: '✨ Clap twice like splashing waterfall drops!',
    x: 31,
    y: 48,
    labelPos: 'bottom',
  },
  {
    id: 'godavari',
    kind: 'river',
    region: 'south',
    regionLabel: '⬇️ दक्षिण-पठारः · Deccan',
    dev: 'गोदावरी',
    iast: 'godāvarī',
    en: 'River Godavari',
    icon: '🌊',
    clue: 'Long gentle river flowing east across central-south India!',
    kidFact: 'Godāvarī is lovingly called Dakṣiṇa Gaṅgā — the longest river of South India!',
    kidAction: '🌊 Trace a long curvy wave in the air from left to right!',
    x: 38,
    y: 59,
    labelPos: 'bottom',
  },
  {
    id: 'kaveri',
    kind: 'river',
    region: 'south',
    regionLabel: '⬇️ दक्षिणम् · Deep South',
    dev: 'कावेरी',
    iast: 'kāverī',
    en: 'River Kaveri',
    icon: '💧',
    clue: 'Southern river watering green rice fields in Karnataka & Tamil Nadu!',
    kidFact: 'Golden paddy fields, coconut palms, and temple towns bloom along sweet Mother Kāverī!',
    kidAction: '🌴 Sway gently side to side like a coconut tree by the river!',
    x: 36,
    y: 82,
    labelPos: 'right',
  },

  // Animals (6)
  {
    id: 'khadgi',
    kind: 'animal',
    region: 'east',
    regionLabel: '➡️ पूर्वोत्तरम् · Assam (Far East)',
    dev: 'खड्गी',
    iast: 'khaḍgī',
    en: 'One-horned Rhino',
    icon: '🦏',
    clue: 'Munching tall grass in Kaziranga, Assam (North-East)!',
    kidFact: 'Khaḍgī wears strong armour-like skin and has ONE special horn right on its nose!',
    kidAction: '☝️ Touch one finger gently to your nose like a friendly rhino horn!',
    x: 89,
    y: 31,
    labelPos: 'left',
  },
  {
    id: 'vyaghra',
    kind: 'animal',
    region: 'east',
    regionLabel: '➡️ पूर्वम् · Bengal Coast (East)',
    dev: 'व्याघ्रः',
    iast: 'vyāghraḥ',
    en: 'Royal Bengal Tiger',
    icon: '🐅',
    clue: 'Swims among mangrove rivers in Sundarbans, East India!',
    kidFact: 'Unlike most cats, the striped Bengal Vyāghra LOVES swimming in cool river water!',
    kidAction: '🐾 Prowl softly on tiptoes like a striped tiger!',
    x: 68,
    y: 50,
    labelPos: 'bottom',
  },
  {
    id: 'simha',
    kind: 'animal',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Gujarat (West)',
    dev: 'सिंहः',
    iast: 'siṃhaḥ',
    en: 'Asiatic Lion',
    icon: '🦁',
    clue: 'Roars proudly in Gir forest on the western peninsula!',
    kidFact: 'Gir in Gujarat is the ONLY wild home of the golden-maned Asiatic Siṃha in all of Asia!',
    kidAction: '🦁 Shake your mane and give a happy friendly ROAR!',
    x: 9,
    y: 51,
    labelPos: 'right',
  },
  {
    id: 'gaja',
    kind: 'animal',
    region: 'south',
    regionLabel: '⬇️ दक्षिणम् · Kerala (Far South)',
    dev: 'गजः',
    iast: 'gajaḥ',
    en: 'Indian Elephant',
    icon: '🐘',
    clue: 'Walks through green hills at the southern tip of India!',
    kidFact: 'Gentle Gaja uses its long trunk like a hand, a snorkel, and a joyful water-shower!',
    kidAction: '🐘 Swing one arm in front like a happy elephant trunk!',
    x: 31,
    y: 90,
    labelPos: 'right',
  },
  {
    id: 'himacitraka',
    kind: 'animal',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Ladakh (Top of India)',
    dev: 'हिमचित्रकः',
    iast: 'himacitrakaḥ',
    en: 'Snow Leopard',
    icon: '🐆',
    clue: 'Fluffy spotted cat at the icy top crown of Ladakh!',
    kidFact: 'Himacitraka wraps its thick, fluffy tail around its nose like a warm muffler in the snow!',
    kidAction: '🧣 Hug your arms cozy and warm like you are in snowy Ladakh!',
    x: 31,
    y: 8,
    labelPos: 'bottom',
  },
  {
    id: 'ushtra',
    kind: 'animal',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Rajasthan Desert (West)',
    dev: 'उष्ट्रः',
    iast: 'uṣṭraḥ',
    en: 'Desert Camel',
    icon: '🐪',
    clue: 'Walks across golden sand dunes in north-west Rajasthan!',
    kidFact: 'Uṣṭra is called the "Ship of the Desert" — its wide soft feet never sink into warm sand!',
    kidAction: '🐪 Bob your shoulders slowly up and down like a camel ride!',
    x: 11,
    y: 33,
    labelPos: 'right',
  },

  // Deserts (2) & Forests (4)
  {
    id: 'maru',
    kind: 'desert',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Golden Rajasthan',
    dev: 'मरुस्थलम्',
    iast: 'marusthalam',
    en: 'Thar Desert',
    icon: '🏜️',
    clue: 'Sunny golden sand dunes in western Rajasthan!',
    kidFact: 'Golden sand dunes ripple in the wind by day and sparkle under bright stars at night!',
    kidAction: '🌬️ Blow softly — "whoooosh" — like warm desert wind!',
    x: 16,
    y: 39,
    labelPos: 'right',
  },
  {
    id: 'kaccha',
    kind: 'desert',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · White Salt Flat',
    dev: 'कच्छः',
    iast: 'kacchaḥ',
    en: 'Rann of Kutch',
    icon: '🧂',
    clue: 'Sparkling white salt desert by the western sea in Gujarat!',
    kidFact: 'Under the full moon, the white salt ground of Kaccha shines like snow, and pink flamingos visit!',
    kidAction: '🦩 Balance on one foot for 3 seconds like a Kutch flamingo!',
    x: 8,
    y: 44,
    labelPos: 'right',
  },
  {
    id: 'sundaravana',
    kind: 'forest',
    region: 'east',
    regionLabel: '➡️ पूर्वम् · Bengal Delta (East)',
    dev: 'सुन्दरवनम्',
    iast: 'sundaravanam',
    en: 'Sundarbans Forest',
    icon: '🌳',
    clue: 'Lush green mangrove delta where Ganga meets the eastern sea!',
    kidFact: 'Named after Sundarī mangrove trees whose special roots breathe right above the water!',
    kidAction: '🌳 Spread your fingers up like breathing mangrove roots!',
    x: 61,
    y: 44,
    labelPos: 'left',
  },
  {
    id: 'giravana',
    kind: 'forest',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Gujarat Woods',
    dev: 'गिरिवनम्',
    iast: 'girivanam',
    en: 'Gir Forest',
    icon: '🌲',
    clue: 'Sunny teak woods in Gujarat where lions and peacocks live!',
    kidFact: 'Peacocks dance and Asiatic lions nap under shady teak and banyan trees in Girivanam!',
    kidAction: '🦚 Fan out your arms wide like dancing peacock feathers!',
    x: 15,
    y: 48,
    labelPos: 'right',
  },
  {
    id: 'keralavana',
    kind: 'forest',
    region: 'south',
    regionLabel: '⬇️ दक्षिणम् · Spice Coast (South)',
    dev: 'केरलारण्यम्',
    iast: 'keralāraṇyam',
    en: 'Kerala Rainforest',
    icon: '🌴',
    clue: 'Emerald tropical forest on the south-west Kerala coast!',
    kidFact: 'Cardamom, black pepper, hornbills, and giant butterflies thrive in misty Keralāraṇyam!',
    kidAction: '🦋 Flap your hands gently like a colourful rainforest butterfly!',
    x: 26,
    y: 81,
    labelPos: 'right',
  },
  {
    id: 'himavana',
    kind: 'forest',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Foothill Pines',
    dev: 'हिमवद्वनम्',
    iast: 'himavadvanam',
    en: 'Himalayan Pine Forest',
    icon: '🌲',
    clue: 'Fragrant deodar & pine woods in the cool northern hills!',
    kidFact: 'Tall deodar ("Tree of the Gods") pines smell sweet and stay green even when snow falls!',
    kidAction: '🌲 Join your fingertips overhead to make a pointed pine tree!',
    x: 28,
    y: 17,
    labelPos: 'right',
  },
];

interface PackDef {
  id: BharatPackId;
  icon: string;
  sa: string;
  en: string;
  bg: string;
  border: string;
  filter: (s: BharatSpot) => boolean;
}

const PACKS: PackDef[] = [
  { id: 'animals', icon: '🐾', sa: 'पशवः', en: 'Animals (6)', bg: '#fef3c7', border: '#f59e0b', filter: (s) => s.kind === 'animal' },
  { id: 'rivers', icon: '🌊', sa: 'नद्यः', en: 'Rivers (6)', bg: '#e0f2fe', border: '#0284c7', filter: (s) => s.kind === 'river' },
  { id: 'mountains', icon: '🏔️', sa: 'पर्वताः', en: 'Mountains (4)', bg: '#ede9fe', border: '#7c3aed', filter: (s) => s.kind === 'mountain' },
  { id: 'nature', icon: '🌳', sa: 'वनानि मरुश्च', en: 'Forests & Deserts (6)', bg: '#dcfce7', border: '#16a34a', filter: (s) => s.kind === 'forest' || s.kind === 'desert' },
  { id: 'all', icon: '🌟', sa: 'सम्पूर्ण-भारतम्', en: 'All 22 Wonders', bg: '#fce7f3', border: '#db2777', filter: () => true },
];

// Exact SVG polylines in 600x623 coordinate space matching /preschool/india/india-map.svg
const RIVER_PATHS: Record<string, string> = {
  ganga: '222.4,127.2 206.0,147.7 249.1,207.2 302.5,242.1 347.6,235.9 405.1,252.4 413.3,297.5',
  yamuna: '210.1,125.1 191.7,155.9 185.5,174.4 201.9,203.1 251.2,227.7 282.0,240.1',
  brahmaputra: '559.0,188.7 542.6,197.0 503.6,217.5 483.1,223.6 448.2,227.7',
  narmada: '277.9,295.5 240.9,287.3 195.8,297.5 130.1,309.8 95.2,316.0',
  godavari: '111.6,352.9 177.3,369.4 232.7,375.5 261.4,396.0 288.1,420.7',
  kaveri: '152.7,506.9 173.2,506.9 193.7,515.1 216.3,537.7 238.9,535.6',
};

// Region halo circles in 600x623 SVG space for toddler compass hints
const REGION_HALOS: Record<BharatRegion, { cx: number; cy: number; rx: number; ry: number; title: string }> = {
  north: { cx: 235, cy: 135, rx: 115, ry: 95, title: '⬆️ Look in the NORTH (Top of India)!' },
  west: { cx: 88, cy: 265, rx: 82, ry: 88, title: '⬅️ Look in the WEST (Left side of India)!' },
  center: { cx: 225, cy: 278, rx: 85, ry: 68, title: '🎯 Look in the MIDDLE of India!' },
  east: { cx: 455, cy: 255, rx: 110, ry: 90, title: '➡️ Look in the EAST (Right side of India)!' },
  south: { cx: 195, cy: 485, rx: 95, ry: 105, title: '⬇️ Look in the SOUTH (Bottom of India)!' },
};

const SEAS_AROUND_INDIA = [
  { id: 'sindhusagara', dev: 'सिन्धुसागरः', iast: 'sindhusāgaraḥ', en: 'Arabian Sea', x: 10, y: 69 },
  { id: 'mahodadhi', dev: 'महोदधिः', iast: 'mahodadhiḥ', en: 'Bay of Bengal', x: 69, y: 67 },
  { id: 'ratnakara', dev: 'रत्नाकरः', iast: 'ratnākaraḥ', en: 'Indian Ocean', x: 48, y: 95 },
];

const KIND_STYLE: Record<BharatKind, { bg: string; border: string; badge: string }> = {
  mountain: { bg: '#ede9fe', border: '#8b5cf6', badge: '🏔️ Mountain' },
  river: { bg: '#e0f2fe', border: '#0284c7', badge: '🌊 River' },
  animal: { bg: '#fef3c7', border: '#d97706', badge: '🐾 Animal' },
  desert: { bg: '#ffedd5', border: '#ea580c', badge: '🏜️ Desert' },
  forest: { bg: '#dcfce7', border: '#16a34a', badge: '🌳 Forest' },
};

const shuffleList = <T,>(arr: T[]): T[] => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

interface BharatMapExplorerProps {
  onEarnStar?: (reason?: string) => void;
}

export const BharatMapExplorer: React.FC<BharatMapExplorerProps> = ({ onEarnStar }) => {
  const [mode, setMode] = useState<BharatPlayMode>('quest');
  const [packId, setPackId] = useState<BharatPackId>('animals');
  const [round, setRound] = useState<number>(0);

  // Shared discovered / matched spots in current pack
  const [done, setDone] = useState<string[]>([]);
  const [explored, setExplored] = useState<string[]>(['simha']);
  const [selectedSpotId, setSelectedSpotId] = useState<string>('simha');
  const [pickId, setPickId] = useState<string | null>(null);
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [showRegionHint, setShowRegionHint] = useState<boolean>(false);
  const [justMatchedSpot, setJustMatchedSpot] = useState<BharatSpot | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>('Tap the right place on the map of Bhārata!');

  const activePack = useMemo(() => PACKS.find((p) => p.id === packId) || PACKS[0], [packId]);
  const packSpots = useMemo(() => BHARAT_SPOTS.filter(activePack.filter), [activePack]);
  const shuffledQueue = useMemo(() => shuffleList(packSpots), [packSpots, round]);

  // Current quest target = first unfinished item in shuffledQueue
  const questTarget: BharatSpot | null = useMemo(() => {
    if (mode !== 'quest') return null;
    return shuffledQueue.find((s) => !done.includes(s.id)) || null;
  }, [mode, shuffledQueue, done]);

  // In 'All 22' Guided Quest mode, keep candidate pins toddler-friendly (target + up to 5 decoys + already found pins)
  const visibleMapSpots = useMemo(() => {
    if (mode === 'explore') return BHARAT_SPOTS;
    if (mode === 'match') return packSpots;
    // Quest mode:
    if (packSpots.length <= 8 || !questTarget) return packSpots;
    const foundSpots = packSpots.filter((s) => done.includes(s.id));
    const remainingOthers = packSpots.filter((s) => s.id !== questTarget.id && !done.includes(s.id));
    // Deterministic slice per questTarget id so pins don't jump on re-render
    const seed = questTarget.id.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), round);
    const rotated = remainingOthers.map((s, idx) => ({ s, k: (idx * 7 + seed) % 31 })).sort((a, b) => a.k - b.k).slice(0, 5).map((x) => x.s);
    return [...foundSpots, questTarget, ...rotated];
  }, [mode, packSpots, questTarget, done, round]);

  const activeSpotlight: BharatSpot = useMemo(() => {
    if (mode === 'quest' && justMatchedSpot) return justMatchedSpot;
    if (mode === 'quest' && questTarget) return questTarget;
    if (mode === 'match' && pickId) return BHARAT_SPOTS.find((s) => s.id === pickId) || BHARAT_SPOTS[0];
    return BHARAT_SPOTS.find((s) => s.id === selectedSpotId) || BHARAT_SPOTS[0];
  }, [mode, justMatchedSpot, questTarget, pickId, selectedSpotId]);

  const playSpotAudioAndSound = (spot: BharatSpot, speak = true) => {
    soundEffects.playBharatSpotSound(spot.id);
    if (speak) {
      setTimeout(() => playPronunciation(spot.dev), 180);
    }
  };

  const switchPack = (nextPack: BharatPackId) => {
    setPackId(nextPack);
    setDone([]);
    setPickId(null);
    setWrongId(null);
    setShowRegionHint(false);
    setJustMatchedSpot(null);
    setRound((r) => r + 1);
    soundEffects.playStrokeChime();
    const packObj = PACKS.find((p) => p.id === nextPack);
    if (packObj) {
      setStatusMsg(`${packObj.icon} ${packObj.en} ready! Let's discover Bhārata!`);
    }
  };

  const switchMode = (nextMode: BharatPlayMode) => {
    setMode(nextMode);
    setDone([]);
    setPickId(null);
    setWrongId(null);
    setShowRegionHint(false);
    setJustMatchedSpot(null);
    soundEffects.playStrokeChime();
    if (nextMode === 'explore') {
      setStatusMsg('🧭 Touch any animal, river, mountain or forest on the map to hear it!');
    } else if (nextMode === 'quest') {
      setStatusMsg('🎯 Look at the Quest Card and tap its home on the map!');
    } else {
      setStatusMsg('🧩 Tap a Sanskrit card first, then tap its pin on the map!');
    }
  };

  const resetPack = () => {
    setRound((r) => r + 1);
    setDone([]);
    setPickId(null);
    setWrongId(null);
    setShowRegionHint(false);
    setJustMatchedSpot(null);
    soundEffects.playSuccessDing();
    setStatusMsg('🔀 Fresh adventure! Ready to play again!');
  };

  const handlePinTap = (spot: BharatSpot) => {
    // MODE 1: EXPLORE
    if (mode === 'explore') {
      setSelectedSpotId(spot.id);
      playSpotAudioAndSound(spot, true);
      if (!explored.includes(spot.id)) {
        const nextExp = [...explored, spot.id];
        setExplored(nextExp);
        if (nextExp.length % 3 === 0) {
          onEarnStar?.(`bharat-explore-${nextExp.length}`);
        }
      }
      setStatusMsg(`${spot.icon} ${spot.dev} (${spot.en}) — ${spot.kidFact}`);
      return;
    }

    // Already solved pin: replay its joyful sound & name!
    if (done.includes(spot.id)) {
      setSelectedSpotId(spot.id);
      playSpotAudioAndSound(spot, true);
      setStatusMsg(`${spot.icon} ${spot.dev} · ${spot.en}!`);
      return;
    }

    const expectedId = mode === 'quest' ? questTarget?.id : pickId;
    if (!expectedId) {
      soundEffects.playStrokeChime();
      setStatusMsg('👈 First tap a Sanskrit card on the left, then tap its pin on the map!');
      return;
    }

    if (spot.id === expectedId) {
      const nextDone = [...done, spot.id];
      setDone(nextDone);
      setPickId(null);
      setWrongId(null);
      setShowRegionHint(false);
      setJustMatchedSpot(spot);
      setSelectedSpotId(spot.id);
      playSpotAudioAndSound(spot, true);
      onEarnStar?.(`bharat-${spot.id}`);

      if (nextDone.length === packSpots.length) {
        setTimeout(() => soundEffects.playVictoryFanfare(), 350);
        setStatusMsg(`🏆 अद्भुतम्! (Adbhutam!) You found all ${packSpots.length} wonders in ${activePack.en}!`);
      } else {
        soundEffects.playCelebrationChime();
        setStatusMsg(`🎉 शाबाश्! You found ${spot.icon} ${spot.dev} (${spot.en})!`);
      }
    } else {
      setWrongId(spot.id);
      soundEffects.playPuzzleSnap();
      const targetObj = BHARAT_SPOTS.find((b) => b.id === expectedId);
      setStatusMsg(
        targetObj
          ? `🙂 Almost! Try ${targetObj.regionLabel} — tap 💡 Hint if you want a warm glow!`
          : '🙂 Try another spot on the map!'
      );
      setTimeout(() => setWrongId(null), 650);
    }
  };

  const hintRegion: BharatRegion | null = useMemo(() => {
    if (!showRegionHint) return null;
    if (mode === 'quest' && questTarget) return questTarget.region;
    if (mode === 'match' && pickId) {
      return BHARAT_SPOTS.find((s) => s.id === pickId)?.region || null;
    }
    return null;
  }, [showRegionHint, mode, questTarget, pickId]);

  const highlightedRiverIds = useMemo(() => {
    const ids = new Set<string>();
    if (mode === 'explore') {
      if (activeSpotlight.kind === 'river') ids.add(activeSpotlight.id);
      explored.forEach((id) => { if (RIVER_PATHS[id]) ids.add(id); });
    } else {
      done.forEach((id) => { if (RIVER_PATHS[id]) ids.add(id); });
      if (justMatchedSpot?.kind === 'river') ids.add(justMatchedSpot.id);
    }
    return ids;
  }, [mode, activeSpotlight, explored, done, justMatchedSpot]);

  const isPackFinished = mode !== 'explore' && packSpots.length > 0 && done.length === packSpots.length;

  return (
    <div className="psw-card-bench bharat-explorer-shell" data-testid="bharat-map-explorer">
      {/* Top Header & Play Mode Switcher */}
      <div className="bharat-top-bar">
        <div>
          <h3 className="psw-section-heading" style={{ margin: 0 }}>
            🗺️ <span lang="sa">भारत-मानचित्रम्</span> · Living Map of Bhārata
          </h3>
          <p className="psw-section-sub" style={{ margin: '4px 0 0' }}>
            Touch &amp; hear roaring lions, sacred rivers, snowy Himālaya peaks, golden dunes, and lush forests of India!
          </p>
        </div>

        <div className="bharat-mode-pills" role="tablist" aria-label="Map game modes">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'quest'}
            className={`bharat-mode-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => switchMode('quest')}
          >
            🎯 Guided Quest
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'explore'}
            className={`bharat-mode-btn ${mode === 'explore' ? 'is-active' : ''}`}
            onClick={() => switchMode('explore')}
          >
            🧭 Explore &amp; Hear
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'match'}
            className={`bharat-mode-btn ${mode === 'match' ? 'is-active' : ''}`}
            onClick={() => switchMode('match')}
            title="Next Level reading challenge: read a Sanskrit name and pin its place on the map"
          >
            🚀 Next Level: Read &amp; Pin
          </button>
        </div>
      </div>

      {/* Bite-Sized Chapter Packs (For Guided Quest & Pick-and-Pin, or Quick Jump in Explore!) */}
      <div className="bharat-pack-strip" role="group" aria-label="Choose India adventure pack">
        {PACKS.map((p) => {
          const isCurrent = packId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => switchPack(p.id)}
              className={`bharat-pack-chip ${isCurrent ? 'is-active' : ''}`}
              style={{
                background: p.bg,
                borderColor: isCurrent ? p.border : '#e2e8f0',
              }}
            >
              <span aria-hidden="true">{p.icon}</span>
              <span lang="sa" style={{ fontWeight: 800 }}>{p.sa}</span>
              <span>· {p.en}</span>
            </button>
          );
        })}
      </div>

      {/* Live Progress & Status Strip */}
      <div className="bharat-status-strip" role="status" aria-live="polite">
        <span className="bharat-status-text">{statusMsg}</span>
        <div className="bharat-status-right">
          {mode === 'explore' ? (
            <span className="bharat-progress-pill">
              🌟 Explored: <strong>{explored.length}</strong> / {BHARAT_SPOTS.length}
            </span>
          ) : (
            <span className="bharat-progress-pill">
              ⭐ Found: <strong>{done.length}</strong> / {packSpots.length}
            </span>
          )}
          {mode !== 'explore' && (
            <button type="button" className="bharat-mini-action" onClick={resetPack}>
              🔀 New Round
            </button>
          )}
        </div>
      </div>

      {/* Main Responsive Two-Column Stage: Story/Quest Console + Interactive SVG Map */}
      <div className="bharat-stage-grid">
        {/* LEFT / TOP PANEL: Kid-Friendly Spotlight, Guided Quest Card, or Pack Cards */}
        <div className="bharat-side-panel">
          {/* GUIDED QUEST MODE PANEL */}
          {mode === 'quest' && !isPackFinished && questTarget && (
            <div
              className="bharat-quest-card"
              style={{
                background: KIND_STYLE[questTarget.kind].bg,
                borderColor: KIND_STYLE[questTarget.kind].border,
              }}
            >
              <div className="bqc-kicker-row">
                <span className="bqc-badge">{KIND_STYLE[questTarget.kind].badge}</span>
                <span className="bqc-step">
                  Wonder {done.length + 1} of {packSpots.length}
                </span>
              </div>

              <div className="bqc-hero-row">
                <div
                  className="bqc-giant-icon"
                  onClick={() => playSpotAudioAndSound(questTarget, true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') playSpotAudioAndSound(questTarget, true); }}
                  title="Tap to hear sound and Sanskrit name!"
                >
                  {questTarget.icon}
                </div>
                <div className="bqc-titles">
                  <span className="bqc-prompt-label">Where in Bhārata is…</span>
                  <h4 className="bqc-dev" lang="sa">{questTarget.dev}</h4>
                  <div className="bqc-sub-names">
                    <em>{questTarget.iast}</em> · <strong>{questTarget.en}</strong>
                  </div>
                </div>
              </div>

              <div className="bqc-clue-box">
                <div className="bqc-region-pill">{questTarget.regionLabel}</div>
                <p className="bqc-clue-text">🔎 {questTarget.clue}</p>
              </div>

              <div className="bqc-audio-actions">
                <button
                  type="button"
                  className="bqc-btn bqc-btn--primary"
                  onClick={() => playPronunciation(questTarget.dev)}
                >
                  🔊 Hear Sanskrit
                </button>
                <button
                  type="button"
                  className="bqc-btn bqc-btn--sound"
                  onClick={() => soundEffects.playBharatSpotSound(questTarget.id)}
                >
                  🎵 Hear Sound
                </button>
                <button
                  type="button"
                  className={`bqc-btn bqc-btn--hint ${showRegionHint ? 'is-on' : ''}`}
                  onClick={() => {
                    setShowRegionHint((v) => !v);
                    soundEffects.playStrokeChime();
                  }}
                >
                  {showRegionHint ? '✨ Glow On!' : '💡 Show Hint'}
                </button>
              </div>

              {justMatchedSpot && justMatchedSpot.id !== questTarget.id && (
                <div className="bqc-last-win">
                  <span>✅ Last found: <strong>{justMatchedSpot.icon} {justMatchedSpot.dev}</strong> — {justMatchedSpot.kidAction}</span>
                </div>
              )}
            </div>
          )}

          {/* PACK VICTORY CELEBRATION CARD */}
          {isPackFinished && (
            <div className="bharat-victory-card" role="status">
              <div className="bvc-trophy">🏆🇮🇳🎉</div>
              <h4 lang="sa" style={{ margin: '4px 0', fontSize: '1.45rem', color: '#14532d' }}>
                शोभनम्! भारत-यात्री!
              </h4>
              <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#166534' }}>
                Hooray! You discovered all <strong>{packSpots.length}</strong> wonders in <strong>{activePack.en}</strong>!
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                <button type="button" className="psw-quiz-btn" onClick={resetPack}>
                  🔁 Play Pack Again
                </button>
                {PACKS.filter((p) => p.id !== packId).slice(0, 2).map((np) => (
                  <button
                    key={np.id}
                    type="button"
                    className="bqc-btn bqc-btn--primary"
                    onClick={() => switchPack(np.id)}
                  >
                    Next: {np.icon} {np.en} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* EXPLORE MODE SPOTLIGHT CARD */}
          {mode === 'explore' && (
            <div
              className="bharat-quest-card"
              style={{
                background: KIND_STYLE[activeSpotlight.kind].bg,
                borderColor: KIND_STYLE[activeSpotlight.kind].border,
              }}
            >
              <div className="bqc-kicker-row">
                <span className="bqc-badge">{KIND_STYLE[activeSpotlight.kind].badge}</span>
                <button
                  type="button"
                  className="bharat-mini-action"
                  onClick={() => {
                    const pool = packSpots.filter((s) => s.id !== activeSpotlight.id);
                    const next = pool[Math.floor(Math.random() * pool.length)] || BHARAT_SPOTS[0];
                    handlePinTap(next);
                  }}
                >
                  🎲 Surprise Wonder!
                </button>
              </div>

              <div className="bqc-hero-row">
                <div
                  className="bqc-giant-icon"
                  onClick={() => playSpotAudioAndSound(activeSpotlight, true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') playSpotAudioAndSound(activeSpotlight, true); }}
                >
                  {activeSpotlight.icon}
                </div>
                <div className="bqc-titles">
                  <span className="bqc-prompt-label">{activeSpotlight.regionLabel}</span>
                  <h4 className="bqc-dev" lang="sa">{activeSpotlight.dev}</h4>
                  <div className="bqc-sub-names">
                    <em>{activeSpotlight.iast}</em> · <strong>{activeSpotlight.en}</strong>
                  </div>
                </div>
              </div>

              <div className="bqc-clue-box">
                <p className="bqc-clue-text" style={{ marginBottom: 6 }}>✨ {activeSpotlight.kidFact}</p>
                <p className="bqc-action-prompt">{activeSpotlight.kidAction}</p>
              </div>

              <div className="bqc-audio-actions">
                <button
                  type="button"
                  className="bqc-btn bqc-btn--primary"
                  onClick={() => playPronunciation(activeSpotlight.dev)}
                >
                  🔊 Say "{activeSpotlight.dev}"
                </button>
                <button
                  type="button"
                  className="bqc-btn bqc-btn--sound"
                  onClick={() => soundEffects.playBharatSpotSound(activeSpotlight.id)}
                >
                  🎵 Play Nature Sound
                </button>
              </div>

              {/* Quick Icon Strip for Current Category */}
              <div className="bharat-explore-mini-grid" aria-label="Quick jump wonders">
                {packSpots.map((s) => {
                  const isSel = s.id === activeSpotlight.id;
                  const wasSeen = explored.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handlePinTap(s)}
                      className={`bharat-mini-tile ${isSel ? 'is-selected' : ''}`}
                      title={`${s.dev} · ${s.en}`}
                    >
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <span lang="sa" style={{ fontSize: 12, fontWeight: 800 }}>{s.dev}</span>
                      {wasSeen && <span className="bmt-dot" aria-hidden="true">★</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* PICK & PIN CLASSIC MATCH MODE PANEL */}
          {mode === 'match' && !isPackFinished && (
            <div className="bharat-match-list-wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <strong style={{ fontSize: 14, color: '#334155' }}>
                  1️⃣ Tap a Sanskrit card ({done.length}/{packSpots.length}):
                </strong>
                {pickId && (
                  <button
                    type="button"
                    className={`bharat-mini-action ${showRegionHint ? 'is-on' : ''}`}
                    onClick={() => setShowRegionHint((v) => !v)}
                  >
                    {showRegionHint ? '✨ Glow On' : '💡 Hint'}
                  </button>
                )}
              </div>

              {pickId && (
                <div className="bqc-clue-box" style={{ marginBottom: 8 }}>
                  <strong>🔎 {activeSpotlight.icon} {activeSpotlight.en}:</strong> {activeSpotlight.clue} ({activeSpotlight.regionLabel})
                </div>
              )}

              <div className="bharat-match-cards">
                {shuffledQueue.map((b) => {
                  const ok = done.includes(b.id);
                  const isPicked = pickId === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      disabled={ok}
                      onClick={() => {
                        setPickId(b.id);
                        setShowRegionHint(false);
                        playSpotAudioAndSound(b, true);
                        setStatusMsg(`2️⃣ Now find ${b.icon} ${b.dev} (${b.en}) on the map!`);
                      }}
                      className={`bharat-name-row-btn ${isPicked ? 'is-picked' : ''} ${ok ? 'is-done' : ''}`}
                      style={{
                        background: ok ? '#dcfce7' : KIND_STYLE[b.kind].bg,
                        borderColor: isPicked ? '#ec4899' : ok ? '#22c55e' : KIND_STYLE[b.kind].border,
                      }}
                    >
                      <span aria-hidden="true" style={{ fontSize: 24 }}>{b.icon}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <strong lang="sa" style={{ fontSize: 17 }}>{b.dev}</strong>{' '}
                        <small style={{ fontStyle: 'italic', color: '#475569' }}>{b.iast}</small>
                        <br />
                        <small style={{ fontWeight: 600, color: '#334155' }}>{b.en}</small>
                      </span>
                      <span>{ok ? '✅' : isPicked ? '👉' : '🔊'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT / MAIN PANEL: Interactive Living Map of Bhārata */}
        <div className="bharat-map-canvas" role="region" aria-label="Interactive Map of India">
          <img
            src="/preschool/india/india-map.svg"
            alt="Illustrated Map of Bhārata (India)"
            className="bharat-map-base-img"
            draggable={false}
          />

          {/* Interactive SVG Overlay: Flowing Rivers, Mountain Glows, Region Compass Hint */}
          <svg
            viewBox="0 0 600 623"
            className="bharat-map-svg-overlay"
            aria-hidden="true"
          >
            {/* Warm Golden Region Hint Halo for Young Kids */}
            {hintRegion && (
              <g className="bharat-region-halo-group">
                <ellipse
                  cx={REGION_HALOS[hintRegion].cx}
                  cy={REGION_HALOS[hintRegion].cy}
                  rx={REGION_HALOS[hintRegion].rx}
                  ry={REGION_HALOS[hintRegion].ry}
                  fill="#fde047"
                  fillOpacity="0.34"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeDasharray="10 7"
                />
              </g>
            )}

            {/* Shimmering Animated Sacred Rivers when Explored or Discovered */}
            {Object.entries(RIVER_PATHS).map(([rId, pts]) => {
              const isLit = highlightedRiverIds.has(rId);
              if (!isLit) return null;
              const isSelected = activeSpotlight.id === rId;
              return (
                <g key={rId}>
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={isSelected ? '#0284c7' : '#38bdf8'}
                    strokeWidth={isSelected ? 9 : 6.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.88"
                  />
                  <polyline
                    points={pts}
                    fill="none"
                    stroke="#e0f2fe"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="8 10"
                    className="bharat-river-flow-anim"
                  />
                </g>
              );
            })}
          </svg>

          {/* Cute Clickable Vedic Compass Rose (Top-Right Ocean Space) */}
          <div className="bharat-compass-rose" aria-label="Sanskrit directions compass">
            <button
              type="button"
              className="bcr-dir bcr-n"
              title="उत्तरम् · North"
              onClick={() => { soundEffects.playStrokeChime(); playPronunciation('उत्तरम्'); setStatusMsg('⬆️ उत्तरम् (uttaram) = North — Snowy Himālaya!'); }}
            >
              उ
            </button>
            <button
              type="button"
              className="bcr-dir bcr-w"
              title="पश्चिमम् · West"
              onClick={() => { soundEffects.playStrokeChime(); playPronunciation('पश्चिमम्'); setStatusMsg('⬅️ पश्चिमम् (paścimam) = West — Desert & Gir Lions!'); }}
            >
              प
            </button>
            <span className="bcr-center" aria-hidden="true">🧭</span>
            <button
              type="button"
              className="bcr-dir bcr-e"
              title="पूर्वम् · East"
              onClick={() => { soundEffects.playStrokeChime(); playPronunciation('पूर्वम्'); setStatusMsg('➡️ पूर्वम् (pūrvam) = East — Sunrise, Tigers & Rhinos!'); }}
            >
              पू
            </button>
            <button
              type="button"
              className="bcr-dir bcr-s"
              title="दक्षिणम् · South"
              onClick={() => { soundEffects.playStrokeChime(); playPronunciation('दक्षिणम्'); setStatusMsg('⬇️ दक्षिणम् (dakṣiṇam) = South — Coconut Palms & Ocean!'); }}
            >
              द
            </button>
          </div>

          {/* 3 Clickable Sacred Seas Around India */}
          {SEAS_AROUND_INDIA.map((sea) => (
            <button
              key={sea.id}
              type="button"
              className="bharat-sea-label"
              style={{ left: `${sea.x}%`, top: `${sea.y}%` }}
              onClick={() => {
                soundEffects.playBharatSpotSound('ganga');
                setTimeout(() => playPronunciation(sea.dev), 140);
                setStatusMsg(`🌊 ${sea.dev} (${sea.iast}) · ${sea.en}!`);
              }}
              title={`Tap to hear ${sea.dev} (${sea.en})`}
            >
              <span lang="sa">{sea.dev}</span>
              <small>{sea.en}</small>
            </button>
          ))}

          {/* Interactive Wonder Pins on the Map */}
          {visibleMapSpots.map((spot) => {
            const isExplore = mode === 'explore';
            const isSolved = done.includes(spot.id);
            const isRevealed = isExplore || isSolved;
            const isActivePin = isExplore
              ? activeSpotlight.id === spot.id
              : justMatchedSpot?.id === spot.id;
            const isWrong = wrongId === spot.id;
            const showLabel = isActivePin || (isSolved && packSpots.length <= 8);

            return (
              <button
                key={spot.id}
                type="button"
                aria-label={isRevealed ? `${spot.dev} (${spot.en})` : `Mystery spot in ${spot.regionLabel}`}
                onClick={() => handlePinTap(spot)}
                className={[
                  'bharat-map-pin',
                  isRevealed ? 'is-revealed' : 'is-mystery',
                  isActivePin ? 'is-spotlight' : '',
                  isWrong ? 'is-wrong' : '',
                ].filter(Boolean).join(' ')}
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  borderColor: isWrong
                    ? '#ef4444'
                    : isSolved
                      ? '#16a34a'
                      : isExplore
                        ? KIND_STYLE[spot.kind].border
                        : '#ec4899',
                  background: isWrong
                    ? '#fee2e2'
                    : isSolved
                      ? '#dcfce7'
                      : isExplore
                        ? '#ffffff'
                        : '#fff1f2',
                }}
              >
                <span className="bmp-emoji" aria-hidden="true">
                  {isRevealed ? spot.icon : '❓'}
                </span>
                {showLabel && (
                  <span
                    lang="sa"
                    className={`bmp-tag bmp-tag--${spot.labelPos || 'bottom'}`}
                  >
                    {spot.dev}
                  </span>
                )}
              </button>
            );
          })}

          {/* Region Hint Floating Caption Banner */}
          {hintRegion && (
            <div className="bharat-hint-toast" role="status">
              {REGION_HALOS[hintRegion].title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BharatMapExplorer;
