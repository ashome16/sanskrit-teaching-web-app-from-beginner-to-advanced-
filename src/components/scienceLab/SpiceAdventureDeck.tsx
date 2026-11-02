import React, { useState, useEffect } from 'react';
import { playPronunciation } from '../../utils/pronunciation';
import { soundEffects } from '../../utils/soundEffects';

export interface SpiceCard {
  id: string;
  kicker: string;
  kickerIcon: string;
  kickerRightIcon: string;
  dev: string;
  iast: string;
  en: string;
  borderColor: string;
  accentColor: string;
  bgTint: string;
  img: string;
  funFact: string;
  dish: string;
  isCover?: boolean;
}

export const SPICE_CARDS: SpiceCard[] = [
  // ROW 1
  {
    id: 'cumin',
    kicker: 'Sizzle Seed',
    kickerIcon: '🫙',
    kickerRightIcon: '🌾',
    dev: 'जीरकम्',
    iast: 'jīrakam',
    en: 'Cumin',
    borderColor: '#e11d48',
    accentColor: '#be123c',
    bgTint: '#fff1f2',
    img: '/preschool/spices/cumin.webp',
    funFact: 'Tiny striped jeera seeds jump and sizzle happily when dropped in warm ghee!',
    dish: 'Jeera Rice & Dal Tadka',
  },
  {
    id: 'pepper',
    kicker: 'Warm Spice',
    kickerIcon: '🫙',
    kickerRightIcon: '⚫',
    dev: 'मरिचम्',
    iast: 'maricam',
    en: 'Black pepper',
    borderColor: '#0284c7',
    accentColor: '#0369a1',
    bgTint: '#f0f9ff',
    img: '/preschool/spices/pepper.webp',
    funFact: 'Black pepper pearls give a cozy warmth to winter soups and sweet rasam!',
    dish: 'Warm Rasam & Khichdi',
  },
  {
    id: 'cardamom',
    kicker: 'Sweet Pod',
    kickerIcon: '🍮',
    kickerRightIcon: '🟢',
    dev: 'एला',
    iast: 'elā',
    en: 'Cardamom',
    borderColor: '#eab308',
    accentColor: '#a16207',
    bgTint: '#fefce8',
    img: '/preschool/spices/cardamom.webp',
    funFact: 'Fragrant green pods holding sweet black seeds that make festive kheer smell magical!',
    dish: 'Sweet Kheer & Payasam',
  },
  {
    id: 'clove',
    kicker: 'Flower Bud',
    kickerIcon: '🌸',
    kickerRightIcon: '📌',
    dev: 'लवङ्गम्',
    iast: 'lavaṅgam',
    en: 'Clove',
    borderColor: '#9333ea',
    accentColor: '#7e22ce',
    bgTint: '#faf5ff',
    img: '/preschool/spices/clove.webp',
    funFact: 'A dried flower bud with a tiny four-petal crown on top that smells like festive chai!',
    dish: 'Fragrant Biryani & Herbal Tea',
  },

  // ROW 2
  {
    id: 'cinnamon',
    kicker: 'Sweet Bark',
    kickerIcon: '🌳',
    kickerRightIcon: '🪵',
    dev: 'त्वक्',
    iast: 'tvak',
    en: 'Cinnamon',
    borderColor: '#b45309',
    accentColor: '#78350f',
    bgTint: '#fffbeb',
    img: '/preschool/spices/cinnamon.webp',
    funFact: 'Tvak means tree bark! It curls into sweet, woody brown rolls while drying under the sun.',
    dish: 'Sweet Rolls & Pulao',
  },
  {
    id: 'coriander',
    kicker: 'Fresh Herb',
    kickerIcon: '🌿',
    kickerRightIcon: '🌿',
    dev: 'धान्यकम्',
    iast: 'dhānyakam',
    en: 'Coriander',
    borderColor: '#65a30d',
    accentColor: '#4d7c0f',
    bgTint: '#f7fee7',
    img: '/preschool/spices/coriander.webp',
    funFact: 'Gives us fresh leafy scalloped sprigs (dhaniya) and crunchy golden seeds for curry!',
    dish: 'Green Chutney & Sambar',
  },
  {
    id: 'fenugreek',
    kicker: 'Green Leaf',
    kickerIcon: '🍃',
    kickerRightIcon: '🍃',
    dev: 'मेथिका',
    iast: 'methikā',
    en: 'Fenugreek',
    borderColor: '#16a34a',
    accentColor: '#15803d',
    bgTint: '#f0fdf4',
    img: '/preschool/spices/methi.webp',
    funFact: 'Methi has three cheerful green leaflets on each stem and bakes into crispy hot parathas!',
    dish: 'Methi Thepla & Aloo Methi',
  },
  {
    id: 'mustard',
    kicker: 'Pop Seed',
    kickerIcon: '💥',
    kickerRightIcon: '🟤',
    dev: 'सर्षपः',
    iast: 'sarṣapaḥ',
    en: 'Mustard',
    borderColor: '#ea580c',
    accentColor: '#c2410c',
    bgTint: '#fff7ed',
    img: '/preschool/spices/mustard.webp',
    funFact: 'Little round rai seeds dance and crackle pop-pop-pop when the kadai is hot!',
    dish: 'Tadka for Dal & Warm Dhokla',
  },

  // ROW 3
  {
    id: 'ginger',
    kicker: 'Cozy Root',
    kickerIcon: '☕',
    kickerRightIcon: '🫚',
    dev: 'आर्द्रकम्',
    iast: 'ārdrakam',
    en: 'Ginger',
    borderColor: '#d97706',
    accentColor: '#b45309',
    bgTint: '#fffbeb',
    img: '/preschool/spices/ginger.webp',
    funFact: 'Grows cozy underground! Warm adrak honey tea warms your throat on rainy days.',
    dish: 'Warm Adrak Chai & Fresh Curry',
  },
  {
    id: 'hing',
    kicker: 'Tiny Pinch',
    kickerIcon: '✨',
    kickerRightIcon: '🫙',
    dev: 'हिङ्गु',
    iast: 'hiṅgu',
    en: 'Asafoetida',
    borderColor: '#7c3aed',
    accentColor: '#6d28d9',
    bgTint: '#f5f3ff',
    img: '/preschool/spices/hing.webp',
    funFact: 'Just one tiny fairy-dust pinch makes the whole kitchen smell delicious and soothes tummies!',
    dish: 'Dal Tadka & Sambar',
  },
  {
    id: 'garlic',
    kicker: 'White Bulb',
    kickerIcon: '🧄',
    kickerRightIcon: '🧄',
    dev: 'लशुनम्',
    iast: 'laśunam',
    en: 'Garlic',
    borderColor: '#a855f7',
    accentColor: '#7e22ce',
    bgTint: '#faf5ff',
    img: '/preschool/spices/garlic.webp',
    funFact: 'A bundle of white moon-shaped cloves tucked snugly inside paper-thin white jackets!',
    dish: 'Garlic Naan & Rasam',
  },
  {
    id: 'cover',
    kicker: 'The Spice Adventure',
    kickerIcon: '👨‍🍳',
    kickerRightIcon: '🌶️',
    dev: 'मसालानि',
    iast: 'masālāni',
    en: 'The Spice Adventure',
    borderColor: '#f97316',
    accentColor: '#ea580c',
    bgTint: '#fff7ed',
    img: '/preschool/spices/cover.webp',
    funFact: 'Meet Chef Bodhi! Explore 11 fragrant spices of India, cook in the pot, and play Spice Quest!',
    dish: 'Gurukul Cooking Adventure',
    isCover: true,
  },
];

const CULINARY_SPICES = SPICE_CARDS.filter((c) => !c.isCover);

interface SpiceAdventureDeckProps {
  onEarnStar?: (count: number) => void;
}

export const SpiceAdventureDeck: React.FC<SpiceAdventureDeckProps> = ({ onEarnStar }) => {
  const [playMode, setPlayMode] = useState<'cards' | 'pot' | 'quest'>('cards');
  const [activeCard, setActiveCard] = useState<SpiceCard>(SPICE_CARDS[0]);
  const [tappedId, setTappedId] = useState<string | null>(null);
  const [cardStyle, setCardStyle] = useState<'photo' | 'illustrated'>('photo');

  // Cooking Pot Mode State
  const [potStep, setPotStep] = useState<number>(0);
  const [addedSpices, setAddedSpices] = useState<string[]>([]);
  const [potFeedback, setPotFeedback] = useState<string>('Welcome to Chef Bodhi\'s Kitchen! Tap a spice to drop it in the kadai!');
  const [isPotSizzling, setIsPotSizzling] = useState<boolean>(false);
  const [potRecipeIndex, setPotRecipeIndex] = useState<number>(0);

  // 4-Picture Quest Mode State
  const [questTarget, setQuestTarget] = useState<SpiceCard>(CULINARY_SPICES[0]);
  const [questChoices, setQuestChoices] = useState<SpiceCard[]>([]);
  const [questScore, setQuestScore] = useState<number>(0);
  const [questFeedback, setQuestFeedback] = useState<string>('');
  const [questSolved, setQuestSolved] = useState<boolean>(false);

  // Init Quest round
  const initQuestRound = (targetCard?: SpiceCard) => {
    const target = targetCard || CULINARY_SPICES[Math.floor(Math.random() * CULINARY_SPICES.length)];
    setQuestTarget(target);
    setQuestSolved(false);
    setQuestFeedback('');

    const others = CULINARY_SPICES.filter((c) => c.id !== target.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const allFour = [target, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setQuestChoices(allFour);

    playPronunciation(target.dev);
    soundEffects.playSpiceSound(target.id);
  };

  useEffect(() => {
    if (playMode === 'quest') {
      initQuestRound();
    }
  }, [playMode]);

  // Handle Flashcard Click
  const handleCardClick = (card: SpiceCard) => {
    setActiveCard(card);
    setTappedId(card.id);
    setTimeout(() => setTappedId(null), 600);

    playPronunciation(card.dev);
    soundEffects.playSpiceSound(card.id);
  };

  // Recipes for Cooking Pot
  const RECIPES = [
    {
      name: 'सुगन्धि-खिचडी · Fragrant Gurukul Khichdi',
      needed: ['cumin', 'pepper', 'ginger', 'hing'],
      instructions: [
        'First, sizzle the seeds in warm ghee: जीरकम् (Cumin)!',
        'Now add cozy underground root: आर्द्रकम् (Ginger)!',
        'Add a tiny magical fairy pinch: हिङ्गु (Asafoetida)!',
        'Finish with warm crushed black pepper: मरिचम् (Black Pepper)!',
      ],
    },
    {
      name: 'मधुर-पायसम् · Sweet Festival Kheer',
      needed: ['cardamom', 'cinnamon', 'clove'],
      instructions: [
        'Crush the sweet fragrant green pods: एला (Cardamom)!',
        'Stir in sweet curled tree bark: त्वक् (Cinnamon)!',
        'Add aromatic four-petal flower buds: लवङ्गम् (Clove)!',
      ],
    },
    {
      name: 'वर्ण-तडका-दाल · Sizzling Tadka Dal',
      needed: ['mustard', 'cumin', 'garlic', 'coriander'],
      instructions: [
        'Pop the dancing seeds in hot oil: सर्षपः (Mustard)!',
        'Add striped aromatic seeds: जीरकम् (Cumin)!',
        'Add peeled golden white cloves: लशुनम् (Garlic)!',
        'Garnish with fresh green scalloped leaves: धान्यकम् (Coriander)!',
      ],
    },
  ];

  const currentRecipe = RECIPES[potRecipeIndex % RECIPES.length];
  const currentNeededId = currentRecipe.needed[potStep];
  const targetSpiceForPot = CULINARY_SPICES.find((s) => s.id === currentNeededId);

  // Cooking Pot Spice Drop
  const handleDropIntoPot = (spice: SpiceCard) => {
    if (!targetSpiceForPot) return;

    if (spice.id === targetSpiceForPot.id) {
      // Correct spice dropped!
      setIsPotSizzling(true);
      soundEffects.playCookingSizzle();
      playPronunciation(spice.dev);

      const nextAdded = [...addedSpices, spice.id];
      setAddedSpices(nextAdded);

      if (potStep + 1 >= currentRecipe.needed.length) {
        // Recipe complete!
        setPotStep(0);
        setAddedSpices([]);
        setPotFeedback(`🎉 उत्तमम्! You cooked delicious ${currentRecipe.name}!`);
        soundEffects.playVictoryFanfare();
        onEarnStar?.(2);
        setTimeout(() => {
          setPotRecipeIndex((prev) => prev + 1);
          setIsPotSizzling(false);
        }, 2200);
      } else {
        setPotStep((prev) => prev + 1);
        setPotFeedback(`✨ वाह! ${spice.dev} (${spice.en}) sizzles into the pot!`);
        onEarnStar?.(1);
        setTimeout(() => setIsPotSizzling(false), 900);
      }
    } else {
      // Friendly, encouraging feedback
      soundEffects.playAnimalWiggle();
      playPronunciation(spice.dev);
      setPotFeedback(`That's ${spice.dev} (${spice.en})! For this step, Chef Bodhi needs: ${targetSpiceForPot.dev} (${targetSpiceForPot.en})!`);
    }
  };

  // Quest Choice Tap
  const handleQuestPick = (picked: SpiceCard) => {
    if (questSolved) return;

    if (picked.id === questTarget.id) {
      setQuestSolved(true);
      setQuestScore((s) => s + 1);
      soundEffects.playCelebrationChime();
      playPronunciation(picked.dev);
      setQuestFeedback(`🎉 साधु! Exactly right: ${picked.dev} (${picked.en}) — ${picked.kicker}!`);
      onEarnStar?.(1);
      setTimeout(() => {
        initQuestRound();
      }, 1800);
    } else {
      soundEffects.playAnimalWiggle();
      playPronunciation(picked.dev);
      setQuestFeedback(`That's ${picked.dev} (${picked.en})! Try to find ${questTarget.dev} (${questTarget.en})!`);
    }
  };

  return (
    <div className="psw-spices-adventure" role="region" aria-label="Preschool Spices Adventure">
      {/* Top Play Mode Tabs */}
      <div className="psw-mode-pill-bar">
        <button
          type="button"
          className={`psw-mode-pill ${playMode === 'cards' ? 'is-active' : ''}`}
          onClick={() => {
            setPlayMode('cards');
            soundEffects.playStrokeChime();
          }}
        >
          🃏 12 Flashcards Deck
        </button>
        <button
          type="button"
          className={`psw-mode-pill ${playMode === 'pot' ? 'is-active' : ''}`}
          onClick={() => {
            setPlayMode('pot');
            soundEffects.playStrokeChime();
          }}
        >
          🍲 Amma’s Cooking Pot
        </button>
        <button
          type="button"
          className={`psw-mode-pill ${playMode === 'quest' ? 'is-active' : ''}`}
          onClick={() => {
            setPlayMode('quest');
            soundEffects.playStrokeChime();
          }}
        >
          🎯 4-Picture Quest
        </button>
      </div>

      {/* =========================================================================
          MODE 1: 12 FLASHCARDS DECK (Matching the Exact Photo Uploaded)
          ========================================================================= */}
      {playMode === 'cards' && (
        <div className="psw-spices-deck-wrap">
          <div className="psw-spices-deck-header">
            <div>
              <h3 className="psw-section-heading">
                🌶️ मसालानि · The Spice Adventure
              </h3>
              <p className="psw-section-sub">
                Tap any flashcard to hear its authentic Sanskrit pronunciation, lively sizzle sound, and chef facts!
              </p>
            </div>
            {/* Quick Mascot Bodhi Pill & Card Style Switcher */}
            <div className="psw-spices-header-actions">
              <div className="psw-spices-style-toggle" role="group" aria-label="Card View Style">
                <button
                  type="button"
                  className={`psw-spices-style-btn ${cardStyle === 'photo' ? 'is-active' : ''}`}
                  onClick={() => {
                    setCardStyle('photo');
                    soundEffects.playStrokeChime();
                  }}
                >
                  📷 Authentic Photo Cards
                </button>
                <button
                  type="button"
                  className={`psw-spices-style-btn ${cardStyle === 'illustrated' ? 'is-active' : ''}`}
                  onClick={() => {
                    setCardStyle('illustrated');
                    soundEffects.playStrokeChime();
                  }}
                >
                  🎨 Interactive Studio
                </button>
              </div>

              <div className="psw-spices-chef-badge" onClick={() => handleCardClick(SPICE_CARDS[11])} role="button" tabIndex={0}>
                <img src="/preschool/spices/cover.webp" alt="Chef Bodhi" className="psw-mini-chef-avatar" />
                <div>
                  <strong>Chef Bodhi (पाचकः)</strong>
                  <small>Tap cards to sizzle &amp; learn!</small>
                </div>
              </div>
            </div>
          </div>

          {/* 12-Card Grid (3 Rows of 4 Cards Exactly as in Photo) */}
          <div className="psw-spices-card-grid">
            {SPICE_CARDS.map((card) => {
              const isTapped = tappedId === card.id;
              const isSelected = activeCard.id === card.id;

              return (
                <div
                  key={card.id}
                  className={`psw-spice-flashcard ${cardStyle === 'photo' ? 'is-photo-mode' : ''} ${isTapped ? 'is-popping' : ''} ${isSelected ? 'is-selected' : ''}`}
                  style={{
                    '--card-border-color': card.borderColor,
                    '--card-accent-color': card.accentColor,
                    '--card-tint': card.bgTint,
                  } as React.CSSProperties}
                  onClick={() => handleCardClick(card)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') handleCardClick(card);
                  }}
                  title={`Tap to hear ${card.dev} (${card.en})`}
                >
                  {cardStyle === 'photo' ? (
                    <div className="psw-sfc-photo-card-wrap">
                      <img
                        src={card.img}
                        alt={`${card.dev} (${card.en}) - ${card.kicker}`}
                        className="psw-sfc-full-photo-img"
                        loading="lazy"
                        width="230"
                        height="160"
                      />
                      <span className="psw-sfc-photo-sound-hint">🔊 Tap</span>
                    </div>
                  ) : (
                    /* Outer Patterned Border Frame */
                    <div className="psw-sfc-outer-border">
                      {/* Inner Clean Card Surface */}
                      <div className="psw-sfc-inner-canvas">
                        {/* Top Pill Kicker Banner */}
                        <div className="psw-sfc-top-banner">
                          <span className="psw-sfc-icon-left">{card.kickerIcon}</span>
                          <span className="psw-sfc-kicker-text">
                            {card.isCover ? 'Game Cover Card' : card.kicker}
                          </span>
                          <span className="psw-sfc-icon-right">{card.kickerRightIcon}</span>
                        </div>

                        {/* Cover Card vs Regular Spice Card Content */}
                        {card.isCover ? (
                          <div className="psw-sfc-cover-content">
                            <h4 className="psw-sfc-cover-title">“The Spice Adventure”</h4>
                            <div className="psw-sfc-cover-art-wrap">
                              <img
                                src={card.img}
                                alt="The Spice Adventure Mascot"
                                className="psw-sfc-cover-img"
                              />
                            </div>
                            <span className="psw-sfc-cover-sa" lang="sa">मसालानि</span>
                          </div>
                        ) : (
                          <div className="psw-sfc-body-row">
                            {/* Art on Left for Cumin, Pepper, Cardamom, Clove, Coriander, Fenugreek (matching uploaded flashcard photo) */}
                            {['cumin', 'pepper', 'cardamom', 'clove', 'coriander', 'fenugreek'].includes(card.id) ? (
                              <>
                                <div className="psw-sfc-art-col">
                                  <img
                                    src={card.img}
                                    alt={card.en}
                                    className="psw-sfc-spice-img"
                                  />
                                </div>
                                <div className="psw-sfc-text-col">
                                  <h4 className="psw-sfc-dev" lang="sa">{card.dev}</h4>
                                  <div className="psw-sfc-iast">{card.iast}</div>
                                  <div className="psw-sfc-en">{card.en}</div>
                                </div>
                              </>
                            ) : (
                              /* Art on Right for Cinnamon, Mustard, Ginger, Hing, Garlic */
                              <>
                                <div className="psw-sfc-text-col">
                                  <h4 className="psw-sfc-dev" lang="sa">{card.dev}</h4>
                                  <div className="psw-sfc-iast">{card.iast}</div>
                                  <div className="psw-sfc-en">{card.en}</div>
                                </div>
                                <div className="psw-sfc-art-col">
                                  <img
                                    src={card.img}
                                    alt={card.en}
                                    className="psw-sfc-spice-img"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        )}

                        {/* Tap Audio Indicator Icon */}
                        <span className="psw-sfc-audio-pill" aria-hidden="true">
                          🔊
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Active Spotlight Card Info Drawer */}
          {activeCard && (
            <div
              className="psw-spice-spotlight-drawer"
              style={{
                borderColor: activeCard.borderColor,
                background: activeCard.bgTint,
              }}
            >
              <div className="psw-ssd-left">
                <img
                  src={activeCard.img}
                  alt={activeCard.en}
                  className="psw-ssd-giant-img"
                />
              </div>
              <div className="psw-ssd-info">
                <div className="psw-ssd-kicker">
                  <span className="psw-ssd-kicker-pill" style={{ background: activeCard.borderColor }}>
                    {activeCard.kickerIcon} {activeCard.kicker}
                  </span>
                  <span className="psw-ssd-dish-pill">
                    🍲 Famous in: <strong>{activeCard.dish}</strong>
                  </span>
                </div>
                <div className="psw-ssd-names">
                  <h3 className="psw-ssd-dev" lang="sa">{activeCard.dev}</h3>
                  <span className="psw-ssd-iast">{activeCard.iast}</span>
                  <span className="psw-ssd-en">({activeCard.en})</span>
                </div>
                <p className="psw-ssd-fact">
                  💡 <strong>Kid Fact:</strong> {activeCard.funFact}
                </p>
                <div className="psw-ssd-actions">
                  <button
                    type="button"
                    className="psw-quiz-btn"
                    onClick={() => {
                      playPronunciation(activeCard.dev);
                      soundEffects.playSpiceSound(activeCard.id);
                    }}
                  >
                    🔊 Hear Sanskrit &amp; Sizzle Sound
                  </button>
                  <button
                    type="button"
                    className="psw-mode-pill"
                    onClick={() => {
                      setPlayMode('pot');
                    }}
                  >
                    🍲 Cook with {activeCard.dev} in the Pot →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          MODE 2: AMMA'S COOKING POT (पाकशाला · Interactive Kitchen Game)
          ========================================================================= */}
      {playMode === 'pot' && (
        <div className="psw-spices-pot-stage">
          <div className="psw-pot-recipe-banner">
            <div className="psw-prb-recipe-name">
              <span>👨‍🍳 Chef Bodhi’s Recipe:</span>
              <strong>{currentRecipe.name}</strong>
            </div>
            <div className="psw-prb-progress">
              Step {potStep + 1} of {currentRecipe.needed.length} ⭐
            </div>
          </div>

          {/* Steaming Bubbling Kadai Stage */}
          <div className="psw-pot-kadai-wrap">
            <div className={`psw-pot-kadai ${isPotSizzling ? 'is-sizzling' : ''}`}>
              {/* Rising Steam Elements */}
              <div className="psw-pot-steam-particles" aria-hidden="true">
                <span className="psw-steam psw-steam-1">♨️</span>
                <span className="psw-steam psw-steam-2">♨️</span>
                <span className="psw-steam psw-steam-3">✨</span>
              </div>

              {/* The Golden Kadai Bowl */}
              <div className="psw-pot-kadai-bowl">
                <div className="psw-pot-golden-ghee">
                  {/* Floating added spices in the pot */}
                  {addedSpices.map((sId, idx) => {
                    const sp = CULINARY_SPICES.find((s) => s.id === sId);
                    if (!sp) return null;
                    return (
                      <span key={idx} className="psw-floating-spice" title={sp.en}>
                        <img src={sp.img} alt={sp.en} />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Prompt Speech Bubble from Chef Bodhi */}
            <div className="psw-pot-chef-bubble">
              <img src="/preschool/spices/cover.svg" alt="Chef Bodhi" className="psw-pot-chef-img" />
              <div className="psw-pot-speech-content">
                <div className="psw-pot-speech-target">
                  {targetSpiceForPot && (
                    <>
                      <span>Next Ingredient:</span>
                      <strong lang="sa">{targetSpiceForPot.dev}</strong>
                      <small>({targetSpiceForPot.kicker} · {targetSpiceForPot.en})</small>
                    </>
                  )}
                </div>
                <p className="psw-pot-speech-text">{currentRecipe.instructions[potStep]}</p>
                <div className="psw-pot-audio-btn-row">
                  {targetSpiceForPot && (
                    <button
                      type="button"
                      className="psw-mini-sound-btn"
                      onClick={() => {
                        playPronunciation(targetSpiceForPot.dev);
                        soundEffects.playSpiceSound(targetSpiceForPot.id);
                      }}
                    >
                      🔊 Hear Clue ({targetSpiceForPot.dev})
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live Status Toast */}
          <div className="psw-pot-status-toast" role="status">
            {potFeedback}
          </div>

          {/* Spice Pantry Shelf (Tap to Drop Into Pot) */}
          <div className="psw-pot-pantry-section">
            <h4 className="psw-pot-pantry-title">
              👇 Tap a spice to drop into Amma’s pot:
            </h4>
            <div className="psw-pot-pantry-grid">
              {CULINARY_SPICES.map((spice) => {
                const isTarget = targetSpiceForPot && spice.id === targetSpiceForPot.id;
                const wasAdded = addedSpices.includes(spice.id);

                return (
                  <button
                    key={spice.id}
                    type="button"
                    className={`psw-pot-spice-tile ${isTarget ? 'is-target-hint' : ''} ${wasAdded ? 'is-already-added' : ''}`}
                    onClick={() => handleDropIntoPot(spice)}
                    style={{
                      borderColor: spice.borderColor,
                      background: spice.bgTint,
                    }}
                    title={`Drop ${spice.dev} (${spice.en}) into the pot!`}
                  >
                    <img src={spice.img} alt={spice.en} className="psw-pst-img" />
                    <span className="psw-pst-badge" style={{ color: spice.accentColor }}>
                      {spice.kickerIcon} {spice.kicker}
                    </span>
                    <strong className="psw-pst-dev" lang="sa">{spice.dev}</strong>
                    <small className="psw-pst-en">{spice.en}</small>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODE 3: 4-PICTURE SPICE QUEST
          ========================================================================= */}
      {playMode === 'quest' && questTarget && (
        <div className="psw-spices-quest-stage">
          <div className="psw-sq-header-card" style={{ borderColor: questTarget.borderColor }}>
            <div className="psw-sq-kicker">
              ⭐ 4-Picture Quest · Score: <strong>{questScore}</strong>
            </div>
            <div className="psw-sq-prompt-row">
              <div className="psw-sq-audio-giant">
                <button
                  type="button"
                  className="psw-giant-sound-circle"
                  onClick={() => {
                    playPronunciation(questTarget.dev);
                    soundEffects.playSpiceSound(questTarget.id);
                  }}
                  title="Hear the Sanskrit word again!"
                >
                  🔊
                </button>
              </div>
              <div className="psw-sq-titles">
                <span className="psw-sq-sublabel">Which spice card is…</span>
                <h3 className="psw-sq-dev" lang="sa">{questTarget.dev}</h3>
                <div className="psw-sq-iast"><em>{questTarget.iast}</em> ({questTarget.kicker})</div>
              </div>
            </div>
            {questFeedback && (
              <div className="psw-sq-feedback-toast" role="status">
                {questFeedback}
              </div>
            )}
          </div>

          {/* 4 Large Picture Option Cards */}
          <div className="psw-sq-choices-grid">
            {questChoices.map((choice) => {
              const isMatch = questSolved && choice.id === questTarget.id;

              return (
                <button
                  key={choice.id}
                  type="button"
                  className={`psw-sq-card-choice ${isMatch ? 'is-correct' : ''}`}
                  style={{
                    borderColor: choice.borderColor,
                    background: choice.bgTint,
                  }}
                  onClick={() => handleQuestPick(choice)}
                  title={`Pick ${choice.dev} (${choice.en})`}
                >
                  <div className="psw-sqc-top-badge">
                    <span>{choice.kickerIcon}</span>
                    <strong>{choice.kicker}</strong>
                    <span>{choice.kickerRightIcon}</span>
                  </div>
                  <div className="psw-sqc-img-wrap">
                    <img src={choice.img} alt={choice.en} className="psw-sqc-img" />
                  </div>
                  <div className="psw-sqc-labels">
                    <strong className="psw-sqc-dev" lang="sa">{choice.dev}</strong>
                    <small className="psw-sqc-en">{choice.en}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpiceAdventureDeck;
