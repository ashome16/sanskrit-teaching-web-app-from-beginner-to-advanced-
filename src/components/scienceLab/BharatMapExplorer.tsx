import React, { useMemo, useState } from 'react';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';

export type BharatKind = 'mountain' | 'river' | 'animal' | 'desert' | 'forest';
export type BharatPackId = 'animals' | 'mountains_rivers' | 'nature' | 'all';
export type BharatPlayMode = 'map' | 'cards' | 'quest';
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
  // Animals (6 Iconic Animals - Level 1)
  {
    id: 'simha',
    kind: 'animal',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Gujarat (West)',
    dev: 'सिंहः',
    iast: 'siṃhaḥ',
    en: 'Asiatic Lion',
    icon: '🦁',
    clue: 'Roars proudly in the sunny Gir forest of Gujarat!',
    kidFact: 'Gir in Gujarat is the ONLY home of the golden-maned Asiatic Siṃha in all of Asia!',
    kidAction: '🦁 Shake your wild mane and give a happy, friendly ROAR!',
    x: 18,
    y: 48,
    labelPos: 'right',
  },
  {
    id: 'vyaghra',
    kind: 'animal',
    region: 'east',
    regionLabel: '➡️ पूर्वम् · Bengal Mangroves (East)',
    dev: 'व्याघ्रः',
    iast: 'vyāghraḥ',
    en: 'Royal Bengal Tiger',
    icon: '🐅',
    clue: 'Swims through emerald mangrove rivers in the Sundarbans!',
    kidFact: 'Unlike most cats, the striped Bengal Vyāghra LOVES swimming in cool river water!',
    kidAction: '🐾 Prowl softly on tiptoes like a striped tiger!',
    x: 68,
    y: 49,
    labelPos: 'bottom',
  },
  {
    id: 'gaja',
    kind: 'animal',
    region: 'south',
    regionLabel: '⬇️ दक्षिणम् · Kerala (South)',
    dev: 'गजः',
    iast: 'gajaḥ',
    en: 'Indian Elephant',
    icon: '🐘',
    clue: 'Walks gently through green coconut hills at the southern tip of India!',
    kidFact: 'Gentle Gaja uses its long trunk like a hand, a snorkel, and a joyful water-shower!',
    kidAction: '🐘 Swing one arm in front like a happy elephant trunk!',
    x: 33,
    y: 87,
    labelPos: 'right',
  },
  {
    id: 'khadgi',
    kind: 'animal',
    region: 'east',
    regionLabel: '➡️ पूर्वोत्तरम् · Assam (Far East)',
    dev: 'खड्गी',
    iast: 'khaḍgī',
    en: 'One-horned Rhino',
    icon: '🦏',
    clue: 'Munching tall elephant grass in Kaziranga, Assam!',
    kidFact: 'Khaḍgī wears strong armour-like skin and has ONE special horn right on its nose!',
    kidAction: '☝️ Touch one finger gently to your nose like a friendly rhino horn!',
    x: 84,
    y: 33,
    labelPos: 'left',
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
    clue: 'Walks across warm golden sand dunes in Rajasthan!',
    kidFact: 'Uṣṭra is called the "Ship of the Desert" — its wide soft feet never sink in warm sand!',
    kidAction: '🐪 Bob your shoulders slowly up and down like a gentle camel ride!',
    x: 18,
    y: 34,
    labelPos: 'right',
  },
  {
    id: 'himacitraka',
    kind: 'animal',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Snowy Ladakh (North)',
    dev: 'हिमचित्रकः',
    iast: 'himacitrakaḥ',
    en: 'Snow Leopard',
    icon: '🐆',
    clue: 'Fluffy spotted mountain cat atop the snowy peaks of Ladakh!',
    kidFact: 'Himacitraka wraps its thick fluffy tail around its nose like a warm muffler in the snow!',
    kidAction: '🧣 Hug your arms cozy and warm like you are in snowy Ladakh!',
    x: 31,
    y: 13,
    labelPos: 'bottom',
  },

  // Mountains & Rivers (Level 2)
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
    kidFact: 'Himālaya means "Home of Snow" (hima + ālaya). The tallest snowy peaks shine here!',
    kidAction: '🙌 Stretch both hands high above your head like a tall snowy mountain!',
    x: 44,
    y: 20,
    labelPos: 'bottom',
  },
  {
    id: 'sahyadri',
    kind: 'mountain',
    region: 'south',
    regionLabel: '⬅️⬇️ पश्चिम-दक्षिणम् · Western Coast',
    dev: 'सह्याद्रिः',
    iast: 'sahyādriḥ',
    en: 'Western Ghats',
    icon: '⛰️',
    clue: 'Long green misty hills beside the western sea!',
    kidFact: 'Monsoon clouds hug Sahyādri, filling waterfalls, spice gardens, and rainforests!',
    kidAction: '🌧️ Wiggle your fingers down like gentle mountain rain!',
    x: 23,
    y: 68,
    labelPos: 'right',
  },
  {
    id: 'vindhya',
    kind: 'mountain',
    region: 'center',
    regionLabel: '🎯 मध्य-भारतम् · Heart of India',
    dev: 'विन्ध्यः',
    iast: 'vindhyaḥ',
    en: 'Vindhya Hills',
    icon: '⛰️',
    clue: 'Ancient rocky hills right in the middle of India!',
    kidFact: 'Ancient stories say the Vindhya hills bowed down politely for wise Sage Agastya!',
    kidAction: '🙏 Fold your hands and do a sweet namaste bow!',
    x: 41,
    y: 43,
    labelPos: 'top',
  },
  {
    id: 'ganga',
    kind: 'river',
    region: 'north',
    regionLabel: '⬆️ उत्तर-मैदानम् · Northern Plains',
    dev: 'गङ्गा',
    iast: 'gaṅgā',
    en: 'River Ganga',
    icon: '🌊',
    clue: 'Starts in snowy Himalaya and flows east across northern India!',
    kidFact: 'Sacred Mother Gaṅgā brings sweet water to millions of farms and playful river dolphins!',
    kidAction: '🐬 Wave your hand like a happy river dolphin swimming!',
    x: 52,
    y: 35,
    labelPos: 'top',
  },
  {
    id: 'yamuna',
    kind: 'river',
    region: 'north',
    regionLabel: '⬆️ उत्तरम् · Plains of Vrindavan',
    dev: 'यमुना',
    iast: 'yamunā',
    en: 'River Yamuna',
    icon: '💧',
    clue: 'Flows south-east past Mathura and Vrindavan to join sister Ganga!',
    kidFact: 'Little Kṛṣṇa played his sweet flute beside the cool blue Yamunā river!',
    kidAction: '🪈 Pretend to play a joyful little flute!',
    x: 36,
    y: 29,
    labelPos: 'right',
  },
  {
    id: 'brahmaputra',
    kind: 'river',
    region: 'east',
    regionLabel: '➡️ पूर्वोत्तरम् · Assam (East)',
    dev: 'ब्रह्मपुत्रः',
    iast: 'brahmaputraḥ',
    en: 'River Brahmaputra',
    icon: '🌊',
    clue: 'Mighty wide river flowing through lush green Assam in the far east!',
    kidFact: 'Brahmaputra holds Majuli — a giant green river island full of birds and boats!',
    kidAction: '🚣 Row an imaginary boat across the big wide river!',
    x: 77,
    y: 37,
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
    clue: 'Sparkling middle-India river flowing west into the Arabian Sea!',
    kidFact: 'Narmadā means "Giver of Joy"! It dances through shining white marble rocks.',
    kidAction: '✨ Clap twice like splashing waterfall drops!',
    x: 32,
    y: 48,
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
    x: 35,
    y: 79,
    labelPos: 'right',
  },

  // Nature Biomes & Forests (Level 3)
  {
    id: 'maru',
    kind: 'desert',
    region: 'west',
    regionLabel: '⬅️ पश्चिमम् · Thar Desert',
    dev: 'मरुस्थलम्',
    iast: 'marusthalam',
    en: 'Thar Desert',
    icon: '🏜️',
    clue: 'Sunny golden sand dunes in western Rajasthan!',
    kidFact: 'Golden sand dunes ripple in the wind by day and sparkle under bright stars at night!',
    kidAction: '🌬️ Blow softly — "whoooosh" — like warm desert wind!',
    x: 18,
    y: 39,
    labelPos: 'right',
  },
  {
    id: 'sundaravana',
    kind: 'forest',
    region: 'east',
    regionLabel: '➡️ पूर्वम् · Bengal Delta',
    dev: 'सुन्दरवनम्',
    iast: 'sundaravanam',
    en: 'Sundarbans Forest',
    icon: '🌳',
    clue: 'Lush green mangrove forest where Ganga meets the eastern sea!',
    kidFact: 'Sundarī mangrove trees have special roots that breathe right above the salty water!',
    kidAction: '🌳 Spread your fingers up like breathing mangrove roots!',
    x: 61,
    y: 45,
    labelPos: 'left',
  },
  {
    id: 'keralavana',
    kind: 'forest',
    region: 'south',
    regionLabel: '⬇️ दक्षिणम् · Kerala Rainforest',
    dev: 'केरलारण्यम्',
    iast: 'keralāraṇyam',
    en: 'Kerala Rainforest',
    icon: '🌴',
    clue: 'Emerald tropical spice forest on the south-western coast!',
    kidFact: 'Cardamom, black pepper, hornbills, and giant butterflies thrive in misty Kerala!',
    kidAction: '🦋 Flap your hands gently like a colourful rainforest butterfly!',
    x: 26,
    y: 76,
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
  {
    id: 'animals',
    icon: '🦁',
    sa: 'पशवः',
    en: 'Level 1: Animals of India (6)',
    bg: '#fef3c7',
    border: '#f59e0b',
    filter: (s) => s.kind === 'animal',
  },
  {
    id: 'mountains_rivers',
    icon: '🏔️',
    sa: 'पर्वताः नद्यश्च',
    en: 'Level 2: Mountains & Rivers (8)',
    bg: '#e0f2fe',
    border: '#0284c7',
    filter: (s) => s.kind === 'mountain' || s.kind === 'river',
  },
  {
    id: 'nature',
    icon: '🌳',
    sa: 'वनानि मरुश्च',
    en: 'Level 3: Forests & Deserts (3)',
    bg: '#dcfce7',
    border: '#16a34a',
    filter: (s) => s.kind === 'forest' || s.kind === 'desert',
  },
  {
    id: 'all',
    icon: '🌟',
    sa: 'सम्पूर्ण-भारतम्',
    en: 'All Wonders (17)',
    bg: '#fce7f3',
    border: '#db2777',
    filter: () => true,
  },
];

// Exact SVG river polylines in 600x623 coordinate space
const RIVER_PATHS: Record<string, string> = {
  ganga: '222.4,127.2 206.0,147.7 249.1,207.2 302.5,242.1 347.6,235.9 405.1,252.4 413.3,297.5',
  yamuna: '210.1,125.1 191.7,155.9 185.5,174.4 201.9,203.1 251.2,227.7 282.0,240.1',
  brahmaputra: '559.0,188.7 542.6,197.0 503.6,217.5 483.1,223.6 448.2,227.7',
  narmada: '277.9,295.5 240.9,287.3 195.8,297.5 130.1,309.8 95.2,316.0',
  kaveri: '152.7,506.9 173.2,506.9 193.7,515.1 216.3,537.7 238.9,535.6',
};

const SEAS_AROUND_INDIA = [
  { id: 'sindhusagara', dev: 'सिन्धुसागरः', iast: 'sindhusāgaraḥ', en: 'Arabian Sea', x: 10, y: 70 },
  { id: 'mahodadhi', dev: 'महोदधिः', iast: 'mahodadhiḥ', en: 'Bay of Bengal', x: 74, y: 68 },
  { id: 'ratnakara', dev: 'रत्नाकरः', iast: 'ratnākaraḥ', en: 'Indian Ocean', x: 50, y: 96 },
];

const KIND_STYLE: Record<BharatKind, { bg: string; border: string; badge: string }> = {
  mountain: { bg: '#ede9fe', border: '#8b5cf6', badge: '🏔️ Mountain' },
  river: { bg: '#e0f2fe', border: '#0284c7', badge: '🌊 River' },
  animal: { bg: '#fef3c7', border: '#d97706', badge: '🐾 Animal' },
  desert: { bg: '#ffedd5', border: '#ea580c', badge: '🏜️ Desert' },
  forest: { bg: '#dcfce7', border: '#16a34a', badge: '🌳 Forest' },
};

interface BharatMapExplorerProps {
  onEarnStar?: (reason?: string) => void;
}

export const BharatMapExplorer: React.FC<BharatMapExplorerProps> = ({ onEarnStar }) => {
  const [mode, setMode] = useState<BharatPlayMode>('map');
  const [packId, setPackId] = useState<BharatPackId>('animals');
  const [, setRound] = useState<number>(0);

  // Solved items in current pack
  const [done, setDone] = useState<string[]>([]);
  const [activeSpotlight, setActiveSpotlight] = useState<BharatSpot>(BHARAT_SPOTS[0]);
  const [friendlyDiscovery, setFriendlyDiscovery] = useState<string>('');
  const [isWigglingId, setIsWigglingId] = useState<string | null>(null);
  const [popupSpot, setPopupSpot] = useState<BharatSpot | null>(null);

  const activePack = useMemo(() => PACKS.find((p) => p.id === packId) || PACKS[0], [packId]);
  const packSpots = useMemo(() => BHARAT_SPOTS.filter(activePack.filter), [activePack]);

  // Current quest target
  const questTarget: BharatSpot | null = useMemo(() => {
    if (mode !== 'quest') return null;
    return packSpots.find((s) => !done.includes(s.id)) || null;
  }, [mode, packSpots, done]);

  // Audio helper: authentic sound first, then Sanskrit pronunciation
  const playSpotAudio = (spot: BharatSpot) => {
    soundEffects.playBharatSpotSound(spot.id);
    setTimeout(() => playPronunciation(spot.dev), 220);
  };

  const switchPack = (nextPack: BharatPackId) => {
    setPackId(nextPack);
    setDone([]);
    setFriendlyDiscovery('');
    setPopupSpot(null);
    setRound((r) => r + 1);
    soundEffects.playStrokeChime();
    const targetObj = BHARAT_SPOTS.filter(PACKS.find((p) => p.id === nextPack)?.filter || (() => true))[0];
    if (targetObj) setActiveSpotlight(targetObj);
  };

  const resetPack = () => {
    setDone([]);
    setFriendlyDiscovery('');
    setPopupSpot(null);
    setRound((r) => r + 1);
    soundEffects.playSuccessDing();
  };

  // Toddler-friendly tap on any map token or card
  const handleSpotTap = (spot: BharatSpot) => {
    setActiveSpotlight(spot);
    setPopupSpot(spot);
    setIsWigglingId(spot.id);
    setTimeout(() => setIsWigglingId(null), 500);

    // MODE 1: MAP EXPLORE or CARDS DECK
    if (mode === 'map' || mode === 'cards') {
      playSpotAudio(spot);
      setFriendlyDiscovery(`${spot.icon} ${spot.dev} (${spot.en}) · ${spot.kidFact}`);
      if (!done.includes(spot.id)) {
        setDone((d) => [...d, spot.id]);
        onEarnStar?.(`bharat-explore-${spot.id}`);
      }
      return;
    }

    // MODE 2: QUEST
    if (!questTarget) {
      playSpotAudio(spot);
      return;
    }

    if (spot.id === questTarget.id) {
      // MATCH!
      const nextDone = [...done, spot.id];
      setDone(nextDone);
      playSpotAudio(spot);
      soundEffects.playCelebrationChime();
      onEarnStar?.(`bharat-${spot.id}`);

      if (nextDone.length === packSpots.length) {
        setFriendlyDiscovery(`🏆 अद्भुतम्! (Adbhutam!) You found all ${packSpots.length} wonders in ${activePack.en}!`);
        setTimeout(() => soundEffects.playVictoryFanfare(), 300);
      } else {
        setFriendlyDiscovery(`🎉 साधु! You found ${spot.icon} ${spot.dev} (${spot.en}) in ${spot.regionLabel}!`);
      }
    } else {
      // GENTLE DISCOVERY (Never negative shaking or red error states!)
      playSpotAudio(spot);
      setFriendlyDiscovery(
        `That's ${spot.icon} ${spot.dev} (${spot.en})! Look towards ${questTarget.regionLabel} for ${questTarget.icon} ${questTarget.dev}!`
      );
    }
  };

  const isPackFinished = packSpots.length > 0 && done.length === packSpots.length;

  return (
    <div className="psw-card-bench bharat-preschool-shell" data-testid="bharat-map-explorer">
      {/* Top Banner with Sanskrit heading & Level selector */}
      <div className="bharat-top-banner">
        <div>
          <h3 className="psw-section-heading">
            🗺️ <span lang="sa">भारत-मानचित्रम्</span> · Living Map &amp; Wonders of Bhārata
          </h3>
          <p className="psw-section-sub">
            Touch lions, tigers, elephants, sacred rivers &amp; snowy Himālaya peaks to hear their calls &amp; Sanskrit names!
          </p>
        </div>

        {/* Level Switcher Tabs (Large, Tactile, Toddler-Friendly) */}
        <div className="bharat-pack-tabs" role="tablist">
          {PACKS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`bharat-pack-tab ${packId === p.id ? 'is-active' : ''}`}
              style={{
                borderColor: packId === p.id ? p.border : 'transparent',
                background: packId === p.id ? p.bg : '#ffffff',
              }}
              onClick={() => switchPack(p.id)}
            >
              <span className="bpt-icon">{p.icon}</span>
              <span className="bpt-text">
                <strong lang="sa">{p.sa}</strong>
                <small>{p.en}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3 Play Modes Bar: Storybook Map | Picture Cards Deck | Where in India Quest */}
      <div className="bharat-mode-bar">
        <div className="bharat-mode-toggle">
          <button
            type="button"
            className={`bharat-mt-btn ${mode === 'map' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('map');
              soundEffects.playStrokeChime();
            }}
          >
            🗺️ Living Storybook Map
          </button>
          <button
            type="button"
            className={`bharat-mt-btn ${mode === 'cards' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('cards');
              soundEffects.playStrokeChime();
            }}
          >
            🃏 Picture Cards Deck
          </button>
          <button
            type="button"
            className={`bharat-mt-btn ${mode === 'quest' ? 'is-active' : ''}`}
            onClick={() => {
              setMode('quest');
              soundEffects.playStrokeChime();
            }}
          >
            🎯 “Where in India?” Quest
          </button>
        </div>

        <div className="bharat-progress-badge">
          ⭐ Found: <strong>{done.length}</strong> / {packSpots.length}
          {isPackFinished && (
            <button type="button" className="bharat-replay-btn" onClick={resetPack}>
              🔁 Play Again
            </button>
          )}
        </div>
      </div>

      {/* Prominent Toddler Quest Prompt Bar (When in Quest Mode) */}
      {mode === 'quest' && !isPackFinished && questTarget && (
        <div
          className="bharat-quest-hero-banner"
          style={{
            background: KIND_STYLE[questTarget.kind].bg,
            borderColor: KIND_STYLE[questTarget.kind].border,
          }}
        >
          {/* Giant Sound & Token Button */}
          <button
            type="button"
            className="bqh-giant-token"
            onClick={() => playSpotAudio(questTarget)}
            title="Tap to hear Sanskrit name &amp; sound!"
          >
            <span className="bqh-giant-emoji">{questTarget.icon}</span>
            <span className="bqh-audio-chip">🔊</span>
          </button>

          {/* Prompt Titles */}
          <div className="bqh-content">
            <div className="bqh-kicker-pill">
              Where in Bhārata is…
            </div>
            <div className="bqh-name-row">
              <h3 className="bqh-dev" lang="sa">{questTarget.dev}</h3>
              <span className="bqh-iast"><em>{questTarget.iast}</em></span>
              <span className="bqh-en">({questTarget.en})</span>
            </div>
            <div className="bqh-clue-row">
              <span className="bqh-region-tag">{questTarget.regionLabel}</span>
              <span className="bqh-clue-text">🔎 {questTarget.clue}</span>
            </div>
            <div className="bqh-hint-pill">
              👉 <strong>Hint:</strong> Look for the glowing gold ring in <strong>{questTarget.regionLabel}</strong>!
            </div>
          </div>

          {/* Quick Sound Button */}
          <div className="bqh-actions">
            <button
              type="button"
              className="bqh-sound-btn"
              onClick={() => playSpotAudio(questTarget)}
            >
              🔊 Hear Sanskrit
            </button>
          </div>
        </div>
      )}

      {/* Celebration Card When All Spots in Level are Found */}
      {isPackFinished && (
        <div className="bharat-quest-hero-banner is-victory">
          <div className="bqh-giant-token">🏆</div>
          <div className="bqh-content">
            <h3 className="bqh-dev" lang="sa">शोभनम्! अद्भुतम्!</h3>
            <p style={{ margin: 0, fontWeight: 700, color: '#166534' }}>
              Hooray! You discovered all <strong>{packSpots.length}</strong> wonders in <strong>{activePack.en}</strong>!
            </p>
          </div>
          <div className="bqh-actions">
            <button type="button" className="psw-quiz-btn" onClick={resetPack}>
              🔁 Play Again
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 1: STORYBOOK MAP VIEW (Map Mode & Quest Mode)
          ========================================================================= */}
      {(mode === 'map' || mode === 'quest') && (
        <div className="bharat-map-stage-centered">
          <div className="bharat-map-canvas" role="region" aria-label="Interactive Map of India">
            {/* Base Storybook Map Image */}
            <img
              src="/preschool/india/india-map.svg"
              alt="Illustrated Map of Bhārata (India)"
              className="bharat-map-base-img"
              draggable={false}
            />

            {/* Interactive SVG Flowing Rivers Overlay */}
            <svg viewBox="0 0 600 623" className="bharat-map-svg-overlay" aria-hidden="true">
              {Object.entries(RIVER_PATHS).map(([rId, pts]) => {
                const isFound = done.includes(rId) || activeSpotlight.id === rId;
                if (packId !== 'mountains_rivers' && packId !== 'all' && !isFound) return null;

                return (
                  <g key={rId}>
                    <polyline
                      points={pts}
                      fill="none"
                      stroke={isFound ? '#0284c7' : '#93c5fd'}
                      strokeWidth={isFound ? 8 : 5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.85"
                    />
                    {isFound && (
                      <polyline
                        points={pts}
                        fill="none"
                        stroke="#f0f9ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="8 10"
                        className="bharat-river-flow-anim"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Cute Toddler Vedic Compass (Top Right Ocean) */}
            <div className="bharat-compass-rose" aria-label="Sanskrit directions compass">
              <button
                type="button"
                className="bcr-dir bcr-n"
                title="उत्तरम् · North (Himalaya)"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation('उत्तरम्');
                  setFriendlyDiscovery('⬆️ उत्तरम् (uttaram) = North — Snowy Himālaya!');
                }}
              >
                उ
              </button>
              <button
                type="button"
                className="bcr-dir bcr-w"
                title="पश्चिमम् · West (Desert & Lions)"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation('पश्चिमम्');
                  setFriendlyDiscovery('⬅️ पश्चिमम् (paścimam) = West — Thar Desert & Gir Lions!');
                }}
              >
                प
              </button>
              <span className="bcr-center" aria-hidden="true">🧭</span>
              <button
                type="button"
                className="bcr-dir bcr-e"
                title="पूर्वम् · East (Tigers & Rhinos)"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation('पूर्वम्');
                  setFriendlyDiscovery('➡️ पूर्वम् (pūrvam) = East — Sunrise, Bengal Tigers & Rhinos!');
                }}
              >
                पू
              </button>
              <button
                type="button"
                className="bcr-dir bcr-s"
                title="दक्षिणम् · South (Elephants & Ocean)"
                onClick={() => {
                  soundEffects.playStrokeChime();
                  playPronunciation('दक्षिणम्');
                  setFriendlyDiscovery('⬇️ दक्षिणम् (dakṣiṇam) = South — Kerala Elephants & Ocean!');
                }}
              >
                द
              </button>
            </div>

            {/* 3 Clickable Sacred Oceans */}
            {SEAS_AROUND_INDIA.map((sea) => (
              <button
                key={sea.id}
                type="button"
                className="bharat-sea-label"
                style={{ left: `${sea.x}%`, top: `${sea.y}%` }}
                onClick={() => {
                  soundEffects.playBharatSpotSound('ganga');
                  setTimeout(() => playPronunciation(sea.dev), 120);
                  setFriendlyDiscovery(`🌊 ${sea.dev} (${sea.iast}) · ${sea.en}!`);
                }}
                title={`Tap to hear ${sea.dev} (${sea.en})`}
              >
                <span lang="sa">{sea.dev}</span>
                <small>{sea.en}</small>
              </button>
            ))}

            {/* LARGE, VISIBLE, VIBRANT PICTURE TOKENS */}
            {packSpots.map((spot) => {
              const isSolved = done.includes(spot.id);
              const isTarget = mode === 'quest' && questTarget?.id === spot.id;
              const isSelected = activeSpotlight.id === spot.id;
              const isWiggling = isWigglingId === spot.id;

              return (
                <button
                  key={spot.id}
                  type="button"
                  aria-label={`${spot.dev} (${spot.en}) in ${spot.regionLabel}`}
                  onClick={() => handleSpotTap(spot)}
                  className={[
                    'bharat-map-pin',
                    'is-revealed',
                    isTarget ? 'is-target-glow' : '',
                    isSolved ? 'is-solved' : '',
                    isSelected ? 'is-spotlight' : '',
                    isWiggling ? 'is-wiggling' : '',
                  ].filter(Boolean).join(' ')}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    borderColor: isSolved ? '#16a34a' : isTarget ? '#f59e0b' : KIND_STYLE[spot.kind].border,
                    background: isSolved ? '#dcfce7' : '#ffffff',
                  }}
                  title={`${spot.dev} (${spot.en})`}
                >
                  {/* The Always Visible Emoji/Icon */}
                  <span className="bmp-emoji" aria-hidden="true">
                    {spot.icon}
                  </span>

                  {/* Sanskrit Name Pill Tag */}
                  <span
                    lang="sa"
                    className={`bmp-tag bmp-tag--${spot.labelPos || 'bottom'}`}
                  >
                    {spot.dev}
                  </span>

                  {/* Solved Star Checkmark */}
                  {isSolved && (
                    <span className="bmp-star-check" aria-hidden="true">
                      ★
                    </span>
                  )}
                </button>
              );
            })}

            {/* Floating Quick-Info Mascot Speech Card over the Map */}
            {popupSpot && (
              <div className="bharat-map-floating-speech">
                <span className="bmfs-icon">{popupSpot.icon}</span>
                <div className="bmfs-text">
                  <strong>
                    <span lang="sa">{popupSpot.dev}</span> ({popupSpot.en})
                  </strong>
                  <p>{popupSpot.kidFact}</p>
                </div>
                <button
                  type="button"
                  className="bmfs-hear-btn"
                  onClick={() => playSpotAudio(popupSpot)}
                  title="Hear pronunciation & sound"
                >
                  🔊
                </button>
                <button
                  type="button"
                  className="bmfs-close-btn"
                  onClick={() => setPopupSpot(null)}
                  title="Close popup"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: TACTILE PICTURE CARDS DECK (Cards Mode - Like Spices Deck)
          ========================================================================= */}
      {mode === 'cards' && (
        <div className="bharat-cards-deck-wrap">
          <div className="bharat-deck-info-bar">
            <span>🃏 <strong>{packSpots.length} Wonder Flashcards</strong> · Tap any card to hear its authentic sound and Sanskrit name!</span>
          </div>

          <div className="bharat-flashcards-grid">
            {packSpots.map((spot) => {
              const isFound = done.includes(spot.id);
              const isTapped = isWigglingId === spot.id;
              const isSelected = activeSpotlight.id === spot.id;

              return (
                <div
                  key={spot.id}
                  className={`bharat-flashcard ${isTapped ? 'is-popping' : ''} ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    '--bcard-border': KIND_STYLE[spot.kind].border,
                    '--bcard-bg': KIND_STYLE[spot.kind].bg,
                  } as React.CSSProperties}
                  onClick={() => handleSpotTap(spot)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleSpotTap(spot);
                  }}
                  title={`Tap to hear ${spot.dev} (${spot.en})`}
                >
                  <div className="bfc-outer-frame">
                    <div className="bfc-inner-canvas">
                      {/* Top Pill Region Badge */}
                      <div className="bfc-top-banner">
                        <span className="bfc-kind-tag">{KIND_STYLE[spot.kind].badge}</span>
                        <span className="bfc-region-tag">{spot.regionLabel.split('·')[0]}</span>
                      </div>

                      {/* Card Content Row */}
                      <div className="bfc-body-row">
                        <div className="bfc-art-col">
                          <span className="bfc-giant-emoji">{spot.icon}</span>
                        </div>
                        <div className="bfc-text-col">
                          <h4 className="bfc-dev" lang="sa">{spot.dev}</h4>
                          <div className="bfc-iast"><em>{spot.iast}</em></div>
                          <div className="bfc-en"><strong>{spot.en}</strong></div>
                        </div>
                      </div>

                      {/* Kid Action / Clue */}
                      <div className="bfc-action-bar">
                        {spot.kidAction}
                      </div>

                      {/* Solved Star Checkmark */}
                      {isFound && (
                        <span className="bfc-star-pill">
                          ★ Discovered!
                        </span>
                      )}

                      <span className="bfc-audio-pill" aria-hidden="true">
                        🔊
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Discovery & Kid Action Drawer (Always Positive & Engaging) */}
      <div
        className="bharat-discovery-drawer"
        style={{
          borderColor: KIND_STYLE[activeSpotlight.kind].border,
          background: KIND_STYLE[activeSpotlight.kind].bg,
        }}
      >
        <div className="bdd-icon-col">
          <span className="bdd-giant-icon">{activeSpotlight.icon}</span>
        </div>
        <div className="bdd-text-col">
          <div className="bdd-title-row">
            <h4 className="bdd-dev" lang="sa">{activeSpotlight.dev}</h4>
            <span className="bdd-iast">{activeSpotlight.iast}</span>
            <span className="bdd-en">({activeSpotlight.en})</span>
            <span className="bdd-region">{activeSpotlight.regionLabel}</span>
          </div>
          <p className="bdd-fact">
            💡 <strong>Kid Fact:</strong> {activeSpotlight.kidFact}
          </p>
          <div className="bdd-action-pill">
            {activeSpotlight.kidAction}
          </div>
          {friendlyDiscovery && (
            <div className="bdd-friendly-toast" role="status">
              {friendlyDiscovery}
            </div>
          )}
        </div>
        <div className="bdd-sound-col">
          <button
            type="button"
            className="psw-quiz-btn"
            onClick={() => playSpotAudio(activeSpotlight)}
          >
            🔊 Hear Sound &amp; Sanskrit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BharatMapExplorer;
