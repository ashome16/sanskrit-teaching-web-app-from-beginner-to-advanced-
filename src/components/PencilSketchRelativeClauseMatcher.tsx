import React, { useState } from 'react';
import {
  RELATIVE_CLAUSE_RIDDLES,
  type RelativeClauseRiddle,
} from '../data/relativeClauseRiddlesData';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import { transliterateSanskrit, type IndicScript } from '../utils/indicTransliteration';
import '../styles/pencil-sketch-matcher.css';

interface PencilSketchRelativeClauseMatcherProps {
  onSelectWord?: (word: string) => void;
  onGoHome?: () => void;
}

type LearnLanguage = 'en' | 'ta' | 'ml';

export const PencilSketchRelativeClauseMatcher: React.FC<PencilSketchRelativeClauseMatcherProps> = ({
  onSelectWord,
}) => {
  const [activeTab, setActiveTab] = useState<'puzzle' | 'gallery'>('puzzle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  // Multilingual medium & script state
  const [learnLang, setLearnLang] = useState<LearnLanguage>(() => {
    try {
      const saved = localStorage.getItem('sanskrit_learn_lang');
      if (saved === 'ta' || saved === 'ml' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [displayScript, setDisplayScript] = useState<IndicScript>(() => {
    try {
      const saved = localStorage.getItem('sanskrit_display_script');
      if (saved === 'devanagari' || saved === 'tamil' || saved === 'malayalam') return saved;
    } catch {
      // ignore
    }
    return 'devanagari';
  });

  const handleSetLearnLang = (lang: LearnLanguage) => {
    setLearnLang(lang);
    try {
      localStorage.setItem('sanskrit_learn_lang', lang);
    } catch {
      // ignore
    }
    // Auto-adjust script for natural reading
    if (lang === 'ta' && displayScript === 'devanagari') {
      setDisplayScript('tamil');
      try { localStorage.setItem('sanskrit_display_script', 'tamil'); } catch {}
    } else if (lang === 'ml' && displayScript === 'devanagari') {
      setDisplayScript('malayalam');
      try { localStorage.setItem('sanskrit_display_script', 'malayalam'); } catch {}
    }
  };

  const handleSetDisplayScript = (script: IndicScript) => {
    setDisplayScript(script);
    try {
      localStorage.setItem('sanskrit_display_script', script);
    } catch {
      // ignore
    }
  };

  const tr = (text: string) => transliterateSanskrit(text, displayScript);

  const currentRiddle: RelativeClauseRiddle = RELATIVE_CLAUSE_RIDDLES[currentIndex % RELATIVE_CLAUSE_RIDDLES.length];

  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt);
    soundEffects.playPuzzleSnap();

    if (opt === currentRiddle.correlativeBlock) {
      soundEffects.playStrokeChime();
      soundEffects.playSuccessDing();
      setIsMatched(true);
      setUnlockedIds((prev) => new Set(prev).add(currentRiddle.id));
      playPronunciation(currentRiddle.fullSanskrit);
      if (onSelectWord) {
        onSelectWord(currentRiddle.fullSanskrit);
      }
    } else {
      soundEffects.playErrorBuzzer();
      setIsMatched(false);
    }
  };

  const handleNextRiddle = () => {
    setSelectedOption(null);
    setIsMatched(false);
    setCurrentIndex((prev) => (prev + 1) % RELATIVE_CLAUSE_RIDDLES.length);
  };

  const handleJumpToRiddle = (idx: number) => {
    setSelectedOption(null);
    setIsMatched(false);
    setCurrentIndex(idx);
    setActiveTab('puzzle');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleSpeak = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  // Render authentic graphite pencil sketch SVG for all 20 scenes
  const renderPencilSketchArt = (sketchId: string, matched: boolean) => {
    return (
      <svg
        className="psm-artwork-svg"
        viewBox="0 0 600 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Pencil Sketch Riddle Scene"
      >
        <defs>
          {/* Charcoal Crosshatch Patterns */}
          <pattern id="hatchPencil" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#78716c" strokeWidth="1.2" strokeOpacity="0.35" />
          </pattern>
          <pattern id="crossHatchDark" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#44403c" strokeWidth="1" strokeOpacity="0.45" />
            <line x1="0" y1="0" x2="6" y2="0" stroke="#44403c" strokeWidth="1" strokeOpacity="0.45" />
          </pattern>
        </defs>

        {/* Paper texture backdrop */}
        <rect width="600" height="240" fill="#faf7f0" />
        <rect width="600" height="240" fill="url(#hatchPencil)" opacity="0.16" />

        {/* 1. LIGHT & DARKNESS (यत्र प्रकाशः भवति, तत्र अन्धकारः नश्यति) */}
        {sketchId === 'light_darkness' && (
          <g id="scene-light-darkness">
            {/* Cavern walls with dark charcoal shading */}
            <path d="M0 0 L200 0 L140 240 L0 240 Z" fill="url(#crossHatchDark)" opacity={matched ? "0.3" : "0.75"} />
            <path d="M600 0 L400 0 L460 240 L600 240 Z" fill="url(#crossHatchDark)" opacity={matched ? "0.3" : "0.75"} />
            {/* Central Radiating Diya */}
            <g transform="translate(280, 110)">
              <ellipse cx="20" cy="35" rx="28" ry="10" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              <path d="M20 30 Q12 15 20 0 Q28 15 20 30 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
              <circle cx="20" cy="20" r="5" fill="#fef08a" />
              {/* Radiating beams */}
              <g stroke="#ca8a04" strokeWidth="2" strokeDasharray="5 3">
                <line x1="20" y1="-15" x2="20" y2="-45" />
                <line x1="-15" y1="5" x2="-45" y2="-10" />
                <line x1="55" y1="5" x2="85" y2="-10" />
                <line x1="-20" y1="35" x2="-60" y2="35" />
                <line x1="60" y1="35" x2="100" y2="35" />
              </g>
            </g>
            {matched ? (
              <text x="210" y="45" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र अन्धकारः नश्यति (Darkness Vanishes!)
              </text>
            ) : (
              <text x="220" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...dark shadows linger...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र प्रकाशः भवति (Where the sacred light shines...)
            </text>
          </g>
        )}

        {/* 2. CUCKOO & SPRING (यदा कोकिलः कूजति, तदा वसन्तः आयाति) */}
        {sketchId === 'cuckoo_spring' && (
          <g id="scene-cuckoo-spring">
            {/* Tree branch */}
            <path d="M50 160 Q200 120 400 150 Q500 160 580 140" stroke="#44403c" strokeWidth="7" strokeLinecap="round" />
            <path d="M220 135 Q260 90 280 60" stroke="#44403c" strokeWidth="4" />
            {/* Kokila Bird */}
            <g transform="translate(240, 70)">
              {/* Body */}
              <ellipse cx="40" cy="45" rx="30" ry="18" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              {/* Head */}
              <circle cx="68" cy="35" r="12" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              {/* Beak */}
              <path d="M78 35 L90 32 L78 40 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
              {/* Eye */}
              <circle cx="72" cy="33" r="2" fill="#ef4444" />
              {/* Long tail */}
              <path d="M15 50 L-25 75 L-10 60 Z" fill="#292524" stroke="#1c1917" strokeWidth="2" />
              {/* Music notes */}
              <text x="85" y="20" fill="#b45309" fontSize="18">♪ ♫</text>
            </g>
            {/* Spring blossoms */}
            {matched ? (
              <g fill="#f472b6" stroke="#db2777" strokeWidth="1.5">
                <circle cx="160" cy="140" r="8" />
                <circle cx="340" cy="135" r="9" />
                <circle cx="440" cy="145" r="8" />
                <circle cx="280" cy="55" r="9" />
                <text x="350" y="55" fill="#db2777" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  तदा वसन्तः आयाति (Spring Arrives!)
                </text>
              </g>
            ) : (
              <text x="350" y="55" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...waiting for the song...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदा कोकिलः कूजति (When the black cuckoo sings...)
            </text>
          </g>
        )}

        {/* 3. WATER & CROPS (यदि जलं प्रवहति, तर्हि सस्यं रोहति) */}
        {sketchId === 'water_crops' && (
          <g id="scene-water-crops">
            {/* Flowing Irrigation Canal */}
            <path d="M60 215 L220 80 L300 80 L180 215 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <path d="M90 200 Q150 140 250 80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
            {/* Furrows with crops */}
            <path d="M280 80 L560 80 L520 215 L200 215 Z" fill="#fdfbf7" stroke="#57534e" strokeWidth="2" />
            {matched ? (
              <g stroke="#15803d" strokeWidth="2.5" strokeLinecap="round">
                <path d="M260 200 Q265 170 255 160 Q270 175 275 165" />
                <path d="M340 190 Q345 160 335 150 Q350 165 355 155" />
                <path d="M420 180 Q425 150 415 140 Q430 155 435 145" />
                <path d="M300 130 Q305 110 295 100" />
                <path d="M380 125 Q385 105 375 95" />
                <text x="320" y="45" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  तर्हि सस्यं रोहति (Crops Sprout Green!)
                </text>
              </g>
            ) : (
              <text x="320" y="150" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...dry furrows wait for water...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदि जलं प्रवहति (If pure stream water flows...)
            </text>
          </g>
        )}

        {/* 4. DHARMA & PROTECTION (यः धर्मं रक्षति, सः धर्मेण रक्षितः) */}
        {sketchId === 'dharmo_rakshati' && (
          <g id="scene-dharma-protect">
            {/* Radiant Dharma Wheel in center */}
            <g transform="translate(260, 60)">
              <circle cx="40" cy="40" r="38" stroke="#ca8a04" strokeWidth="3" fill="#fef08a" />
              <circle cx="40" cy="40" r="10" stroke="#854d0e" strokeWidth="2" fill="#fef9c3" />
              {/* Spokes */}
              <g stroke="#ca8a04" strokeWidth="2">
                <line x1="40" y1="2" x2="40" y2="78" />
                <line x1="2" y1="40" x2="78" y2="40" />
                <line x1="13" y1="13" x2="67" y2="67" />
                <line x1="67" y1="13" x2="13" y2="67" />
              </g>
            </g>
            {/* Upright Hero figure with shield */}
            <g transform="translate(140, 80)">
              <circle cx="30" cy="25" r="12" stroke="#44403c" strokeWidth="2" fill="#fdfbf7" />
              <path d="M20 40 L10 100 L50 100 L40 40 Z" fill="#e7e0cf" stroke="#44403c" strokeWidth="2" />
              <path d="M45 45 Q70 65 45 90 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
            </g>
            {matched ? (
              <text x="360" y="90" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                सः धर्मेण रक्षितः (Dharma Protects Him!)
              </text>
            ) : (
              <text x="360" y="90" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...protecting truth...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यः धर्मं रक्षति (He who protects righteousness...)
            </text>
          </g>
        )}

        {/* 5. HUMILITY & PRAISE (या विनयशीला अस्ति, सा सर्वत्र श्लाघ्यते) */}
        {sketchId === 'humble_maiden' && (
          <g id="scene-humble-maiden">
            {/* Humble Scholar maiden in Anjali Mudra */}
            <g transform="translate(260, 70)">
              <circle cx="30" cy="25" r="12" stroke="#44403c" strokeWidth="2" fill="#fdfbf7" />
              <path d="M18 40 L10 105 L50 105 L42 40 Z" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
              {/* Anjali Mudra folded palms */}
              <ellipse cx="30" cy="55" rx="6" ry="10" fill="#fdfbf7" stroke="#be185d" strokeWidth="1.8" />
            </g>
            {/* Floral garland blessings */}
            {matched ? (
              <g transform="translate(180, 50)">
                <path d="M20 20 Q110 50 200 20" stroke="#f59e0b" strokeWidth="4" strokeDasharray="8 4" fill="none" />
                <text x="40" y="-10" fill="#be185d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  सा सर्वत्र श्लाघ्यते (Praised Everywhere!)
                </text>
              </g>
            ) : (
              <text x="340" y="80" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...modest grace...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              या विनयशीला अस्ति (The maiden who is humble...)
            </text>
          </g>
        )}

        {/* 6. THOUGHT & SPEECH (यथा चिन्तनं भवति, तथा भाषणं जायते) */}
        {sketchId === 'thought_speech' && (
          <g id="scene-thought-speech">
            {/* Meditating Seeker */}
            <g transform="translate(180, 80)">
              <circle cx="30" cy="25" r="14" stroke="#44403c" strokeWidth="2" fill="#fdfbf7" />
              <path d="M18 42 L8 100 L52 100 L42 42 Z" fill="#e7e0cf" stroke="#44403c" strokeWidth="2" />
              <ellipse cx="30" cy="100" rx="30" ry="10" fill="#d6cebe" stroke="#44403c" strokeWidth="2" />
            </g>
            {/* Flowing golden words banner */}
            <g transform="translate(280, 90)">
              <path d="M0 20 Q80 -10 160 20 Q240 50 280 20" stroke="#ca8a04" strokeWidth="3" fill="none" />
              {matched ? (
                <text x="20" y="10" fill="#854d0e" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  तथा भाषणं जायते (Noble Speech Flows!)
                </text>
              ) : (
                <text x="20" y="10" fill="#a8a29e" fontSize="12" fontStyle="italic">
                  ...mind in contemplation...
                </text>
              )}
            </g>
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यथा चिन्तनं भवति (As the thoughts and mind are...)
            </text>
          </g>
        )}

        {/* 7. GIVING & CONTENTMENT (यावत् धनं यच्छति, तावत् सन्तोषं लभते) */}
        {sketchId === 'giving_joy' && (
          <g id="scene-giving-joy">
            {/* Open Cupped Hands Pouring Wealth/Grain */}
            <g transform="translate(160, 90)">
              <path d="M20 40 Q50 20 80 30 Q110 45 115 70 L70 80 Z" fill="#f5f0e4" stroke="#44403c" strokeWidth="2" />
              <circle cx="95" cy="75" r="4" fill="#f59e0b" />
              <circle cx="100" cy="90" r="3.5" fill="#f59e0b" />
              <circle cx="108" cy="105" r="4" fill="#f59e0b" />
            </g>
            {/* Smiling Heart / Joy on Right */}
            <g transform="translate(360, 90)">
              <circle cx="40" cy="40" r="35" stroke="#e11d48" strokeWidth="2.5" fill="#ffe4e6" />
              <path d="M25 45 Q40 60 55 45" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="30" cy="32" r="3" fill="#e11d48" />
              <circle cx="50" cy="32" r="3" fill="#e11d48" />
            </g>
            {matched ? (
              <text x="260" y="50" fill="#e11d48" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तावत् सन्तोषं लभते (Deep Inner Joy!)
              </text>
            ) : (
              <text x="260" y="50" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...hands open in charity...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यावत् धनं यच्छति (As much wealth as one gives...)
            </text>
          </g>
        )}

        {/* 8. CONTENTMENT & HAPPINESS (यत्र सन्तोषः वर्तते, तत्र सुखं शाश्वतम्) */}
        {sketchId === 'contentment_bliss' && (
          <g id="scene-contentment-bliss">
            {/* Peaceful hermitage cottage */}
            <path d="M120 180 L120 110 L200 60 L280 110 L280 180 Z" fill="#f5efe6" stroke="#44403c" strokeWidth="2.5" />
            <path d="M100 110 L200 50 L300 110 Z" fill="url(#crossHatchDark)" stroke="#44403c" strokeWidth="2" />
            <rect x="180" y="130" width="35" height="50" fill="#78716c" />
            {/* Gentle resting deer */}
            <g transform="translate(360, 130)">
              <ellipse cx="40" cy="30" rx="30" ry="18" fill="#d97706" stroke="#92400e" strokeWidth="1.8" />
              <circle cx="65" cy="18" r="10" fill="#d97706" stroke="#92400e" strokeWidth="1.8" />
              <path d="M68 10 L75 0" stroke="#92400e" strokeWidth="2" />
            </g>
            {matched ? (
              <text x="280" y="45" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र सुखं शाश्वतम् (Eternal Peace & Joy!)
              </text>
            ) : (
              <text x="280" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...quiet sanctuary...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र सन्तोषः वर्तते (Where true contentment dwells...)
            </text>
          </g>
        )}

        {/* 9. TEMPLE BELL & PRAYER (यदा घण्टा नादति, तदा पूजा आरभते) */}
        {sketchId === 'temple_bell' && (
          <g id="scene-temple-bell">
            {/* Hanging Bronze Bell */}
            <g transform="translate(180, 50)">
              <line x1="40" y1="0" x2="40" y2="30" stroke="#44403c" strokeWidth="4" />
              <path d="M20 70 C20 40 30 30 40 30 C50 30 60 40 60 70 Z" fill="#ca8a04" stroke="#854d0e" strokeWidth="2.5" />
              <ellipse cx="40" cy="70" rx="20" ry="6" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              <circle cx="40" cy="78" r="5" fill="#854d0e" />
              {/* Sound vibration waves */}
              <g stroke="#ca8a04" strokeWidth="2" fill="none">
                <path d="M75 45 Q85 55 75 65" />
                <path d="M85 40 Q98 55 85 70" />
                <path d="M5 45 Q-5 55 5 65" />
                <path d="M-5 40 Q-18 55 -5 70" />
              </g>
            </g>
            {/* Puja Thali with deepa and flowers */}
            <g transform="translate(360, 110)">
              <ellipse cx="50" cy="40" rx="45" ry="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="50" cy="35" r="8" fill="#f59e0b" />
              <circle cx="30" cy="38" r="5" fill="#ef4444" />
              <circle cx="70" cy="38" r="5" fill="#ef4444" />
            </g>
            {matched ? (
              <text x="280" y="40" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तदा पूजा आरभते (Worship Begins!)
              </text>
            ) : (
              <text x="280" y="40" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...bell resonates...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदा घण्टा नादति (When the temple bell rings...)
            </text>
          </g>
        )}

        {/* 10. POISON TO NECTAR (यत् विषं मन्यते, तत् अमृतं भवितुं अर्हति) */}
        {sketchId === 'neelakantha_nectar' && (
          <g id="scene-poison-nectar">
            {/* Ayurvedic Stone Mortar & Pestle */}
            <g transform="translate(180, 90)">
              <path d="M10 30 Q50 90 90 30 Z" fill="#78716c" stroke="#44403c" strokeWidth="2.5" />
              <line x1="30" y1="10" x2="65" y2="50" stroke="#57534e" strokeWidth="6" strokeLinecap="round" />
            </g>
            {/* Glowing Golden Kalasha of Amrita */}
            <g transform="translate(360, 80)">
              <path d="M20 20 L40 20 L40 30 L55 55 C55 80 5 80 5 55 L20 30 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
              <circle cx="30" cy="15" r="6" fill="#15803d" />
              <circle cx="30" cy="5" r="4" fill="#f59e0b" />
            </g>
            {matched ? (
              <text x="260" y="45" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत् अमृतं भवितुं अर्हति (Transforms to Nectar!)
              </text>
            ) : (
              <text x="260" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...bitter herb transforms...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत् विषं मन्यते (What is deemed bitter poison...)
            </text>
          </g>
        )}

        {/* 11. ANGER & WISDOM (यत्र क्रोधः प्रविशति, तत्र विवेकः नश्यति) */}
        {sketchId === 'anger_wisdom' && (
          <g id="scene-anger-wisdom">
            {/* Jagged storm clouds & lightning */}
            <path d="M80 60 Q130 30 180 55 Q240 30 280 65" stroke="#ef4444" strokeWidth="3" fill="none" />
            <path d="M180 60 L160 90 L190 95 L170 130" stroke="#ef4444" strokeWidth="3" fill="none" />
            {/* Cracked mirror */}
            <g transform="translate(340, 70)">
              <ellipse cx="40" cy="50" rx="35" ry="45" fill="#f1f5f9" stroke="#44403c" strokeWidth="2.5" />
              <path d="M20 20 L45 55 L35 80 L55 90" stroke="#44403c" strokeWidth="2" fill="none" />
            </g>
            {matched ? (
              <text x="240" y="40" fill="#b91c1c" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र विवेकः नश्यति (Wisdom is Extinguished!)
              </text>
            ) : (
              <text x="240" y="40" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...storm clouding judgment...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र क्रोधः प्रविशति (Where blinding anger enters...)
            </text>
          </g>
        )}

        {/* 12. DAWN & SUN (यदा प्रभातः जायते, तदा सूर्यः दृश्यते) */}
        {sketchId === 'dawn_sun' && (
          <g id="scene-dawn-sun">
            {/* Eastern Hill Skyline */}
            <path d="M40 180 Q160 110 300 150 Q440 120 560 170" stroke="#57534e" strokeWidth="2" fill="#f5efe6" />
            {/* Rising Sun */}
            <g transform="translate(260, 90)">
              <circle cx="40" cy="40" r="32" fill="#fef08a" stroke="#ca8a04" strokeWidth="2.5" />
              <g stroke="#ca8a04" strokeWidth="2" strokeLinecap="round">
                <line x1="40" y1="-2" x2="40" y2="8" />
                <line x1="75" y1="15" x2="85" y2="5" />
                <line x1="5" y1="15" x2="-5" y2="5" />
              </g>
            </g>
            {/* Birds in flight */}
            <path d="M120 80 Q130 70 140 80 Q150 70 160 80" stroke="#44403c" strokeWidth="2" fill="none" />
            <path d="M420 70 Q430 60 440 70 Q450 60 460 70" stroke="#44403c" strokeWidth="2" fill="none" />
            {matched ? (
              <text x="240" y="45" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तदा सूर्यः दृश्यते (The Sun Beholds Creation!)
              </text>
            ) : (
              <text x="240" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...dawn breaks...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदा प्रभातः जायते (When the golden dawn awakens...)
            </text>
          </g>
        )}

        {/* 13. TRUTH & FEARLESSNESS (यदि सत्यं वदसि, तर्हि भयं न भवति) */}
        {sketchId === 'truth_fearless' && (
          <g id="scene-truth-fearless">
            {/* Upright Young Seeker */}
            <g transform="translate(260, 70)">
              <circle cx="30" cy="25" r="14" stroke="#44403c" strokeWidth="2" fill="#fdfbf7" />
              <path d="M18 42 L8 105 L52 105 L42 42 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
              {/* Upright gesture */}
              <line x1="50" y1="55" x2="75" y2="35" stroke="#b45309" strokeWidth="2.5" />
            </g>
            {matched ? (
              <text x="230" y="45" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तर्हि भयं न भवति (Fear Is Banished!)
              </text>
            ) : (
              <text x="230" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...truth grants fearlessness...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदि सत्यं वदसि (If you speak absolute truth...)
            </text>
          </g>
        )}

        {/* 14. SWEET FRUIT & PARROT (यत्र मधुरं फलम्, तत्र कीरः आगच्छति) */}
        {sketchId === 'parrot_fruit' && (
          <g id="scene-parrot-fruit">
            {/* Branch with Pomegranate */}
            <path d="M40 160 Q200 120 400 140" stroke="#44403c" strokeWidth="6" strokeLinecap="round" />
            <g transform="translate(180, 100)">
              <circle cx="30" cy="30" r="24" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <path d="M22 6 L30 0 L38 6 Z" fill="#b91c1c" />
            </g>
            {/* Green Parrot landing */}
            <g transform="translate(320, 80)">
              <ellipse cx="40" cy="40" rx="26" ry="15" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
              <circle cx="65" cy="30" r="10" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
              <path d="M72 30 Q80 32 75 40 Z" fill="#ef4444" />
              <path d="M15 45 L-15 65" stroke="#15803d" strokeWidth="3" />
            </g>
            {matched ? (
              <text x="280" y="45" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र कीरः आगच्छति (The Parrot Alights!)
              </text>
            ) : (
              <text x="280" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...sweet fruit beckons...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र मधुरं फलम् (Where the sweet fruit ripens...)
            </text>
          </g>
        )}

        {/* 15. RAIN & RIVER (यथा वृष्टिः जायते, तथा नदी पूर्यते) */}
        {sketchId === 'rain_river' && (
          <g id="scene-rain-river">
            {/* Torrential Rain from clouds */}
            <g stroke="#0284c7" strokeWidth="2" strokeLinecap="round">
              <line x1="120" y1="40" x2="105" y2="90" />
              <line x1="180" y1="35" x2="165" y2="95" />
              <line x1="240" y1="40" x2="225" y2="90" />
              <line x1="300" y1="35" x2="285" y2="95" />
            </g>
            {/* Winding River Rapids */}
            <path d="M60 215 Q200 140 400 150 Q500 160 560 215" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
            {matched ? (
              <text x="260" y="45" fill="#0284c7" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तथा नदी पूर्यते (The River Swells Full!)
              </text>
            ) : (
              <text x="260" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...rains pour into valley...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यथा वृष्टिः जायते (As the soothing rain falls...)
            </text>
          </g>
        )}

        {/* 16. TRUTH & PEACE (यः सत्यं पश्यति, सः शान्तिं प्राप्नोति) */}
        {sketchId === 'truth_peace' && (
          <g id="scene-truth-peace">
            {/* Seated Sage with Peaceful Halo */}
            <g transform="translate(250, 70)">
              <circle cx="40" cy="40" r="42" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="5 3" fill="none" />
              <circle cx="40" cy="30" r="14" stroke="#44403c" strokeWidth="2" fill="#fdfbf7" />
              <path d="M28 46 L18 105 L62 105 L52 46 Z" fill="#f5efe6" stroke="#44403c" strokeWidth="2" />
              <ellipse cx="40" cy="105" rx="36" ry="12" fill="#d6cebe" stroke="#44403c" strokeWidth="2" />
            </g>
            {matched ? (
              <text x="210" y="40" fill="#15803d" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                सः शान्तिं प्राप्नोति (Attains Absolute Peace!)
              </text>
            ) : (
              <text x="210" y="40" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...gazing upon truth...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यः सत्यं पश्यति (He who beholds the eternal truth...)
            </text>
          </g>
        )}

        {/* 17. LION & ELEPHANT (यदा सिंहः गर्जति, तदा गजः कम्पते) */}
        {sketchId === 'lion_elephant' && (
          <g id="scene-lion-elephant">
            {/* Roaring Lion on Rock */}
            <g transform="translate(140, 80)">
              <path d="M-20 80 L80 80 L60 40 L-10 40 Z" fill="#78716c" stroke="#44403c" strokeWidth="2" />
              {/* Lion head with mane */}
              <circle cx="50" cy="30" r="22" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
              <path d="M65 30 L80 25 L70 38 Z" fill="#b45309" />
              <text x="75" y="15" fill="#b45309" fontSize="14" fontWeight="bold">ROAR!</text>
            </g>
            {/* Trembling Elephant */}
            <g transform="translate(360, 90)">
              <ellipse cx="50" cy="45" rx="45" ry="32" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <circle cx="15" cy="35" r="18" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
              <path d="M5 45 Q-15 70 0 85" stroke="#475569" strokeWidth="6" strokeLinecap="round" fill="none" />
            </g>
            {matched ? (
              <text x="260" y="45" fill="#b45309" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तदा गजः कम्पते (The Elephant Trembles!)
              </text>
            ) : (
              <text x="260" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...lion roars on the cliff...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदा सिंहः गर्जति (When the king of beasts roars...)
            </text>
          </g>
        )}

        {/* 18. GANGA & SACRED EARTH (यत्र गङ्गा वहति, तत्र भूमिः पवित्रा) */}
        {sketchId === 'ganga_sacred' && (
          <g id="scene-ganga-sacred">
            {/* Holy river flowing past stone ghats */}
            <path d="M50 180 Q250 120 400 150 Q520 180 580 160" stroke="#0284c7" strokeWidth="8" strokeLinecap="round" />
            {/* Stone Ghat Steps */}
            <g stroke="#57534e" strokeWidth="2" fill="#e7e0cf">
              <rect x="80" y="180" width="100" height="15" />
              <rect x="90" y="195" width="80" height="15" />
            </g>
            {/* Diya floating on river */}
            <circle cx="280" cy="145" r="5" fill="#f59e0b" />
            {matched ? (
              <text x="240" y="45" fill="#0369a1" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र भूमिः पवित्रा (Sacred Holy Earth!)
              </text>
            ) : (
              <text x="240" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...holy river flows...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र गङ्गा वहति (Where Mother Ganga flows...)
            </text>
          </g>
        )}

        {/* 19. CLOTH & WASHING (यत् वस्त्रं मलिनम्, तत् क्षालनेन शुध्यति) */}
        {sketchId === 'washing_cloth' && (
          <g id="scene-washing-cloth">
            {/* River Stone with clean white garment */}
            <ellipse cx="280" cy="150" rx="90" ry="25" fill="#78716c" stroke="#44403c" strokeWidth="2" />
            <path d="M220 145 Q280 130 340 145 Q310 160 250 155 Z" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
            {/* Water droplets */}
            <g fill="#38bdf8">
              <circle cx="220" cy="125" r="3.5" />
              <circle cx="260" cy="115" r="4" />
              <circle cx="310" cy="120" r="3.5" />
            </g>
            {matched ? (
              <text x="210" y="45" fill="#0284c7" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत् क्षालनेन शुध्यति (Purified by Washing!)
              </text>
            ) : (
              <text x="210" y="45" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...cleansing the fabric...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत् वस्त्रं मलिनम् (Whatever garment is stained...)
            </text>
          </g>
        )}

        {/* 20. LAMP & DARKNESS (यत्र दीपः तिष्ठति, तत्र तमः दूरीभवति) */}
        {sketchId === 'lamp_darkness' && (
          <g id="scene-lamp-darkness">
            {/* Standing Deepastambha Brass Lamp */}
            <g transform="translate(280, 50)">
              <rect x="18" y="20" width="4" height="120" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.5" />
              <ellipse cx="20" cy="140" rx="28" ry="10" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              <ellipse cx="20" cy="30" rx="20" ry="7" fill="#ca8a04" stroke="#854d0e" strokeWidth="2" />
              {/* Flame */}
              <path d="M20 25 Q14 12 20 0 Q26 12 20 25 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.8" />
              <circle cx="20" cy="15" r="4" fill="#fef08a" />
            </g>
            {matched ? (
              <text x="210" y="35" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                तत्र तमः दूरीभवति (Darkness Driven Away!)
              </text>
            ) : (
              <text x="210" y="35" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...solitary flame stands...
              </text>
            )}
            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र दीपः तिष्ठति (Where the steady lamp stands...)
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="pencil-sketch-matcher" id="pencil-sketch-matcher">
      {/* Header */}
      <header className="psm-header">
        <div className="psm-eyebrow">
          <span className="psm-badge">20 VISUAL RIDDLES · GRAPHITE SKETCHBOOK</span>
          <span className="psm-tag">यत्-तत् चित्रात्मक-संयोजनम् · Relative Clause Matching</span>
        </div>
        <h2 className="psm-title">Pencil-Sketch Block Matching</h2>
        <p className="psm-subtitle">
          Connect relative clause blocks (like यत्र प्रकाशः भवति) with correlative answer blocks (like तत्र अन्धकारः नश्यति) to complete authentic hand-drawn graphite riddle scenes and reveal classical Sanskrit wisdom.
        </p>

        {/* Navigation Tabs */}
        <div className="psm-nav-tabs" role="tablist">
          <button
            type="button"
            className={`psm-nav-tab ${activeTab === 'puzzle' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('puzzle');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>✏️</span>
            <span>
              {learnLang === 'ta'
                ? `புதிர் காட்சி #${currentIndex + 1}`
                : learnLang === 'ml'
                ? `സമസ്യ രംഗം #${currentIndex + 1}`
                : `Riddle Scene #${currentIndex + 1}`}
            </span>
          </button>
          <button
            type="button"
            className={`psm-nav-tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('gallery');
              soundEffects.playPuzzleSnap();
            }}
          >
            <span>🖼️</span>
            <span>
              {learnLang === 'ta'
                ? `ஓவியக் கூடம் (${unlockedIds.size} / ${RELATIVE_CLAUSE_RIDDLES.length})`
                : learnLang === 'ml'
                ? `ചിത്രശാല (${unlockedIds.size} / ${RELATIVE_CLAUSE_RIDDLES.length})`
                : `Sketchbook Gallery (${unlockedIds.size} / ${RELATIVE_CLAUSE_RIDDLES.length})`}
            </span>
          </button>
        </div>

        {/* Multilingual Medium & Sanskrit Script Switcher */}
        <div className="psm-lang-selector-strip" aria-label="Language and Script Options">
          <div className="psm-lang-group">
            <span className="psm-lang-label">
              🌐 {learnLang === 'ta' ? 'கற்கும் மொழி' : learnLang === 'ml' ? 'പഠന മാധ്യമം' : 'Learning Medium'}:
            </span>
            <div className="psm-lang-buttons">
              <button
                type="button"
                className={`psm-lang-btn ${learnLang === 'en' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('en')}
              >
                🇬🇧 English
              </button>
              <button
                type="button"
                className={`psm-lang-btn ${learnLang === 'ta' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('ta')}
              >
                தமிழ் (Tamil)
              </button>
              <button
                type="button"
                className={`psm-lang-btn ${learnLang === 'ml' ? 'active' : ''}`}
                onClick={() => handleSetLearnLang('ml')}
              >
                മലയാളം (Malayalam)
              </button>
            </div>
          </div>

          <div className="psm-lang-group">
            <span className="psm-lang-label">
              📜 {learnLang === 'ta' ? 'சமஸ்கிருத எழுத்துரு' : learnLang === 'ml' ? 'സംസ്കൃത ലിപി' : 'Sanskrit Script'}:
            </span>
            <div className="psm-lang-buttons">
              <button
                type="button"
                className={`psm-lang-btn ${displayScript === 'devanagari' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('devanagari')}
              >
                देवनागरी (Devanagari)
              </button>
              <button
                type="button"
                className={`psm-lang-btn ${displayScript === 'tamil' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('tamil')}
              >
                தமிழ் (கிரந்தம்)
              </button>
              <button
                type="button"
                className={`psm-lang-btn ${displayScript === 'malayalam' ? 'active' : ''}`}
                onClick={() => handleSetDisplayScript('malayalam')}
              >
                മലയാളം (Malayalam)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================
          TAB 1: INTERACTIVE SKETCH RIDDLE PUZZLE
          =================================================================== */}
      {activeTab === 'puzzle' && (
        <section aria-label="Pencil Sketch Riddle Arena">
          <div className="psm-canvas-pod">
            <div className="psm-scene-header">
              <span className="psm-scene-title">
                {learnLang === 'ta'
                  ? currentRiddle.titleTamil
                  : learnLang === 'ml'
                  ? currentRiddle.titleMalayalam
                  : currentRiddle.title}
              </span>
              <span className="psm-scene-theme-pill">
                {learnLang === 'ta'
                  ? currentRiddle.themeTamil
                  : learnLang === 'ml'
                  ? currentRiddle.themeMalayalam
                  : currentRiddle.theme}
              </span>
            </div>

            {/* Hand-Drawn SVG Sketch Artwork */}
            <div className={`psm-artwork-viewport ${isMatched ? 'matched' : 'unmatched'}`}>
              {renderPencilSketchArt(currentRiddle.sketchId, isMatched)}
            </div>

            {/* Visual Riddle Clue Box */}
            <div className="psm-riddle-clue-box">
              <div className="psm-rc-label">
                🔍{' '}
                {learnLang === 'ta'
                  ? 'காட்சி புதிர் குறிப்பு'
                  : learnLang === 'ml'
                  ? 'ദൃശ്യ സമസ്യ സൂചന'
                  : 'Visual Riddle Clue'}
                :
              </div>
              <div className="psm-rc-text">
                "
                {learnLang === 'ta'
                  ? currentRiddle.riddleClueTamil
                  : learnLang === 'ml'
                  ? currentRiddle.riddleClueMalayalam
                  : currentRiddle.riddleClue}
                "
              </div>
            </div>

            {/* Block Matching Arena */}
            <div className="psm-matching-arena">
              {/* Left Column: Lead Relative Clause Block */}
              <div className="psm-lead-card">
                <div className="psm-lead-tag">
                  Clause A (
                  {learnLang === 'ta'
                    ? 'தொடர்பு வாக்கியம்'
                    : learnLang === 'ml'
                    ? 'സംബന്ധ വാക്യം'
                    : 'सम्बन्धवाक्यम्'}
                  )
                </div>
                <div className="psm-lead-devanagari">{tr(currentRiddle.relativeBlock)}</div>
                <div className="psm-lead-translit">({currentRiddle.relativeTranslit})</div>
                <div className="psm-lead-meaning">
                  "
                  {learnLang === 'ta'
                    ? currentRiddle.relativeTamil
                    : learnLang === 'ml'
                    ? currentRiddle.relativeMalayalam
                    : currentRiddle.relativeMeaning}
                  "
                </div>
              </div>

              {/* Middle: Dashed Pencil Connector */}
              <div className="psm-connector-rail" aria-hidden="true">
                <div className="psm-connector-wire" />
                <span className="psm-connector-symbol">✏️</span>
                <div className="psm-connector-wire" />
              </div>

              {/* Right Column: Correlative Candidate Blocks */}
              <div className="psm-options-station">
                {currentRiddle.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = isMatched && isSelected;
                  const isWrong = !isMatched && isSelected;

                  return (
                    <button
                      type="button"
                      key={opt}
                      className={`psm-option-block ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                      onClick={() => handleSelectOption(opt)}
                    >
                      <span className="psm-opt-text">{tr(opt)}</span>
                      <span className="psm-opt-pin" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Unlocked Riddle Reveal Pod */}
            {isMatched && (
              <div className="psm-reveal-pod">
                <div className="psm-rp-header">
                  <span className="psm-rp-badge">
                    <span>✨</span>
                    <span>
                      {learnLang === 'ta'
                        ? 'புதிர் தீர்க்கப்பட்டது! ஓவியம் பூர்த்தியடைந்தது!'
                        : learnLang === 'ml'
                        ? 'സമസ്യ പരിഹരിച്ചു! ചിത്രം പൂർണ്ണമായി!'
                        : 'Riddle Solved & Hand-Drawn Scene Completed!'}
                    </span>
                  </span>
                  <button
                    type="button"
                    className="psm-btn-listen"
                    onClick={() => handleSpeak(currentRiddle.fullSanskrit)}
                  >
                    <span>🔊</span>
                    <span>
                      {learnLang === 'ta'
                        ? 'சுலோகம் கேளுங்கள்'
                        : learnLang === 'ml'
                        ? 'സുഭാഷിതം കേൾക്കുക'
                        : 'Speak Proverb'}
                    </span>
                  </button>
                </div>

                <div className="psm-full-sanskrit">{tr(currentRiddle.fullSanskrit)}</div>
                <div className="psm-full-translit">{currentRiddle.fullTranslit}</div>
                <div className="psm-full-english">
                  "
                  {learnLang === 'ta'
                    ? currentRiddle.tamilTranslation
                    : learnLang === 'ml'
                    ? currentRiddle.malayalamTranslation
                    : currentRiddle.englishTranslation}
                  "
                </div>

                <div className="psm-philosophical-insight">
                  <strong>
                    🌿{' '}
                    {learnLang === 'ta'
                      ? 'தத்துவ விளக்கம்: '
                      : learnLang === 'ml'
                      ? 'തത്ത്വചിന്താ പശ്ചാത്തലം: '
                      : 'Philosophical Background: '}
                  </strong>
                  {learnLang === 'ta'
                    ? currentRiddle.philosophicalInsightTamil
                    : learnLang === 'ml'
                    ? currentRiddle.philosophicalInsightMalayalam
                    : currentRiddle.philosophicalInsight}
                </div>

                <div className="psm-rp-footer">
                  <span style={{ fontSize: '0.85rem', color: '#78716c' }}>
                    {learnLang === 'ta'
                      ? `புதிர் #${currentRiddle.riddleNumber} / ${RELATIVE_CLAUSE_RIDDLES.length}`
                      : learnLang === 'ml'
                      ? `സമസ്യ #${currentRiddle.riddleNumber} / ${RELATIVE_CLAUSE_RIDDLES.length}`
                      : `Riddle #${currentRiddle.riddleNumber} of ${RELATIVE_CLAUSE_RIDDLES.length}`}
                  </span>
                  <button
                    type="button"
                    className="psm-btn-next"
                    onClick={handleNextRiddle}
                  >
                    {learnLang === 'ta'
                      ? 'அடுத்த புதிர்'
                      : learnLang === 'ml'
                      ? 'അടുത്ത സമസ്യ'
                      : 'Next Riddle'}{' '}
                    #{((currentIndex + 1) % RELATIVE_CLAUSE_RIDDLES.length) + 1} ➜
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================================================
          TAB 2: SKETCHBOOK GALLERY (All 20 Scenes)
          =================================================================== */}
      {activeTab === 'gallery' && (
        <section aria-label="Sketchbook Gallery">
          <div className="psm-gallery-grid">
            {RELATIVE_CLAUSE_RIDDLES.map((riddle, idx) => {
              const isUnlocked = unlockedIds.has(riddle.id);

              return (
                <div key={riddle.id} className="psm-gallery-card">
                  <div className="psm-gc-header">
                    <span>
                      #{riddle.riddleNumber} ·{' '}
                      {learnLang === 'ta'
                        ? riddle.themeTamil
                        : learnLang === 'ml'
                        ? riddle.themeMalayalam
                        : riddle.theme}
                    </span>
                    <span style={{ float: 'right' }}>
                      {isUnlocked
                        ? learnLang === 'ta'
                          ? '✓ தீர்க்கப்பட்டது'
                          : learnLang === 'ml'
                          ? '✓ പരിഹരിച്ചത്'
                          : '✓ Solved'
                        : learnLang === 'ta'
                        ? '🔒 புதிர்'
                        : learnLang === 'ml'
                        ? '🔒 സമസ്യ'
                        : '🔒 Riddle'}
                    </span>
                  </div>
                  <div className="psm-gc-sanskrit">{tr(riddle.fullSanskrit)}</div>
                  <div className="psm-gc-english">
                    "
                    {learnLang === 'ta'
                      ? riddle.tamilTranslation
                      : learnLang === 'ml'
                      ? riddle.malayalamTranslation
                      : riddle.englishTranslation}
                    "
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      className="psm-btn-listen"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                      onClick={() => handleSpeak(riddle.fullSanskrit)}
                    >
                      <span>🔊</span>
                      <span>{learnLang === 'ta' ? 'கேளுங்கள்' : learnLang === 'ml' ? 'കേൾക്കുക' : 'Listen'}</span>
                    </button>
                    <button
                      type="button"
                      className="psm-btn-listen"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', background: '#faf7f0' }}
                      onClick={() => handleJumpToRiddle(idx)}
                    >
                      <span>✏️</span>
                      <span>
                        {learnLang === 'ta'
                          ? 'காட்சியை விளையாடு'
                          : learnLang === 'ml'
                          ? 'കളിക്കുക'
                          : 'Play Scene'}
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
