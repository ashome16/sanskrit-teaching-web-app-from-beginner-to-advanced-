import React, { useState } from 'react';
import {
  RELATIVE_CLAUSE_RIDDLES,
  type RelativeClauseRiddle,
} from '../data/relativeClauseRiddlesData';
import { playPronunciation, stopPronunciation } from '../utils/pronunciation';
import { soundEffects } from '../utils/soundEffects';
import '../styles/pencil-sketch-matcher.css';

interface PencilSketchRelativeClauseMatcherProps {
  onSelectWord?: (word: string) => void;
  onGoHome?: () => void;
}

export const PencilSketchRelativeClauseMatcher: React.FC<PencilSketchRelativeClauseMatcherProps> = ({
  onSelectWord,
}) => {
  const [activeTab, setActiveTab] = useState<'puzzle' | 'gallery'>('puzzle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMatched, setIsMatched] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

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

  const handleSpeak = (text: string) => {
    stopPronunciation();
    playPronunciation(text);
  };

  // Render authentic graphite pencil sketch SVG for the scene
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
          {/* Charcoal Crosshatch Pattern */}
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
        <rect width="600" height="240" fill="url(#hatchPencil)" opacity="0.18" />

        {/* 1. MOUNTAIN & FIRE (यत्र धूमः तत्र अग्निः) */}
        {sketchId === 'mountain_fire' && (
          <g id="mountain-fire-scene">
            {/* Distant mountain ridges */}
            <path d="M40 210 L140 110 L230 180 L320 80 L440 210 Z" fill="#e7e0cf" stroke="#57534e" strokeWidth="2.5" strokeDasharray="6 2" />
            <path d="M140 110 L180 150 L200 210" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M320 80 L350 140 L380 210" stroke="#78716c" strokeWidth="1.5" />
            
            {/* Heavy shading on mountain slope */}
            <path d="M320 80 L380 210 L440 210 Z" fill="url(#crossHatchDark)" opacity={matched ? "0.85" : "0.35"} />

            {/* Rising smoke curls */}
            <path
              d="M315 75 Q300 45 325 30 T310 10"
              stroke="#57534e"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={matched ? "none" : "4 3"}
            />
            <path
              d="M325 70 Q345 40 330 25 T345 5"
              stroke="#78716c"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Hidden / Revealed Fire on peak */}
            {matched ? (
              <g transform="translate(305, 50)">
                <path d="M15 25 Q5 15 15 0 Q25 15 15 25 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                <path d="M15 25 Q10 18 15 10 Q20 18 15 25 Z" fill="#ef4444" opacity="0.85" />
                <circle cx="15" cy="18" r="8" fill="#fbbf24" opacity="0.6" />
                <text x="35" y="15" fill="#92400e" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                  तत्र अग्निः (Fire Revealed!)
                </text>
              </g>
            ) : (
              <text x="340" y="70" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ? (Hidden Cause)
              </text>
            )}

            {/* Fore-ground ground line */}
            <path d="M20 215 Q250 205 580 215" stroke="#44403c" strokeWidth="2.5" />
            <text x="40" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र धूमः (Where smoke rises from the peak...)
            </text>
          </g>
        )}

        {/* 2. KING & SUBJECTS (यथा राजा तथा प्रजा) */}
        {sketchId === 'king_subjects' && (
          <g id="king-subjects-scene">
            {/* Palace Archways */}
            <path d="M60 215 L60 90 Q120 40 180 90 L180 215" stroke="#57534e" strokeWidth="2.5" fill="none" />
            <path d="M180 215 L180 90 Q240 40 300 90 L300 215" stroke="#78716c" strokeWidth="2" fill="none" />
            <line x1="50" y1="215" x2="550" y2="215" stroke="#44403c" strokeWidth="2.5" />

            {/* King with Crown and Sceptre */}
            <g transform="translate(100, 80)">
              {/* Crown */}
              <path d="M10 20 L15 5 L20 15 L25 5 L30 20 Z" fill={matched ? "#f59e0b" : "#e7e0cf"} stroke="#44403c" strokeWidth="2" />
              {/* Head & halo */}
              <circle cx="20" cy="30" r="10" stroke="#44403c" strokeWidth="2" fill="#fdfcf9" />
              {/* Royal robe */}
              <path d="M10 40 L5 90 L35 90 L30 40 Z" fill="url(#crossHatchDark)" stroke="#44403c" strokeWidth="2" />
              {/* Sceptre */}
              <line x1="36" y1="35" x2="40" y2="90" stroke="#57534e" strokeWidth="2.5" />
              <circle cx="36" cy="32" r="4" fill="#f59e0b" />
            </g>

            {/* Right: Citizens in harmony */}
            <g transform="translate(360, 100)">
              <circle cx="30" cy="25" r="9" stroke="#44403c" strokeWidth="1.8" />
              <path d="M22 35 L16 85 L44 85 L38 35 Z" fill="#e7e0cf" stroke="#57534e" strokeWidth="1.8" />
              <circle cx="70" cy="30" r="9" stroke="#44403c" strokeWidth="1.8" />
              <path d="M62 40 L56 85 L84 85 L78 40 Z" fill="#e7e0cf" stroke="#57534e" strokeWidth="1.8" />
              {matched && (
                <text x="15" y="-10" fill="#15803d" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                  तथा प्रजा (Virtuous Citizens!)
                </text>
              )}
            </g>

            <text x="80" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यथा राजा (When the monarch rules with virtue...)
            </text>
          </g>
        )}

        {/* 3. RAIN & MEADOW (यदि वर्षति तर्हि तृणं रोहति) */}
        {sketchId === 'rain_meadow' && (
          <g id="rain-meadow-scene">
            {/* Billowing Rainclouds */}
            <path
              d="M80 60 Q110 30 160 40 Q210 20 270 40 Q330 30 360 65 Q390 90 350 110 L90 110 Q50 90 80 60 Z"
              fill={matched ? "#cbd5e1" : "#e7e0cf"}
              stroke="#44403c"
              strokeWidth="2.5"
            />
            {/* Cloud shading */}
            <path d="M90 90 Q220 105 350 90 L350 110 L90 110 Z" fill="url(#crossHatchDark)" opacity="0.5" />

            {/* Falling rain strokes */}
            <g stroke="#64748b" strokeWidth="1.8" strokeLinecap="round">
              <line x1="120" y1="125" x2="105" y2="165" />
              <line x1="160" y1="130" x2="145" y2="175" />
              <line x1="200" y1="120" x2="185" y2="170" />
              <line x1="240" y1="135" x2="225" y2="180" />
              <line x1="280" y1="125" x2="265" y2="170" />
              <line x1="320" y1="130" x2="305" y2="175" />
            </g>

            {/* Soil Ground */}
            <path d="M40 210 Q300 200 560 210" stroke="#44403c" strokeWidth="2.5" />
            {/* Sprouting grass */}
            {matched ? (
              <g stroke="#15803d" strokeWidth="2.2" strokeLinecap="round">
                <path d="M120 210 Q122 185 115 175" />
                <path d="M120 210 Q128 190 135 180" />
                <path d="M220 208 Q223 180 215 170" />
                <path d="M220 208 Q230 185 238 175" />
                <path d="M340 208 Q343 182 335 170" />
                <path d="M340 208 Q350 186 358 174" />
                <path d="M440 210 Q443 185 435 175" />
                <text x="360" y="150" fill="#15803d" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                  तर्हि तृणं रोहति (Grass Sprouting!)
                </text>
              </g>
            ) : (
              <text x="380" y="195" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...parched soil waits...
              </text>
            )}

            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदि वर्षति (If the skies pour soothing showers...)
            </text>
          </g>
        )}

        {/* 4. SUNRISE & LOTUS (यदा सूर्यः उदेति तदा कमलं विकसति) */}
        {sketchId === 'sun_lotus' && (
          <g id="sun-lotus-scene">
            {/* Morning horizon hills */}
            <path d="M30 160 Q150 100 280 150 Q420 110 570 170" stroke="#78716c" strokeWidth="2" fill="#f5efe6" />
            
            {/* Rising Sun */}
            <g transform="translate(180, 80)">
              <circle cx="30" cy="30" r="28" fill={matched ? "#fef08a" : "#f5efe6"} stroke="#ca8a04" strokeWidth="2.5" />
              {/* Radiating sunbeams */}
              <g stroke="#ca8a04" strokeWidth="2" strokeLinecap="round">
                <line x1="30" y1="-8" x2="30" y2="-2" />
                <line x1="68" y1="30" x2="74" y2="30" />
                <line x1="-8" y1="30" x2="-2" y2="30" />
                <line x1="56" y1="4" x2="62" y2="-2" />
                <line x1="4" y1="4" x2="-2" y2="-2" />
              </g>
            </g>

            {/* Lake Surface Ripples */}
            <g stroke="#94a3b8" strokeWidth="1.5">
              <ellipse cx="420" cy="190" rx="90" ry="12" fill="#f1f5f9" />
              <path d="M350 200 Q420 208 490 200" />
              <path d="M370 210 Q420 216 470 210" />
            </g>

            {/* Lotus Flower */}
            <g transform="translate(400, 150)">
              {matched ? (
                <>
                  {/* Blooming petals */}
                  <path d="M20 35 C-5 20 -5 5 20 -5 C45 5 45 20 20 35 Z" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
                  <path d="M20 35 C-15 30 -10 15 5 5 C20 18 20 28 20 35 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.8" />
                  <path d="M20 35 C55 30 50 15 35 5 C20 18 20 28 20 35 Z" fill="#f472b6" stroke="#db2777" strokeWidth="1.8" />
                  <circle cx="20" cy="18" r="5" fill="#facc15" />
                  <text x="-50" y="-12" fill="#db2777" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                    तदा कमलं विकसति (Lotus Blooms!)
                  </text>
                </>
              ) : (
                <>
                  {/* Closed bud */}
                  <path d="M20 35 C10 25 10 10 20 0 C30 10 30 25 20 35 Z" fill="#e7e0cf" stroke="#78716c" strokeWidth="2" />
                  <text x="35" y="15" fill="#a8a29e" fontSize="11" fontStyle="italic">
                    Closed Bud
                  </text>
                </>
              )}
            </g>

            <text x="50" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यदा सूर्यः उदेति (When the dawn awakens the horizon...)
            </text>
          </g>
        )}

        {/* 5. EFFORT & ACCOMPLISHMENT (यावत् प्रयत्नः तावत् सिद्धिः) */}
        {sketchId === 'sculptor_siddhi' && (
          <g id="sculptor-scene">
            {/* Raw Stone Block */}
            <path d="M280 60 L440 60 L480 205 L260 205 Z" fill={matched ? "#fdfbf7" : "#e7e0cf"} stroke="#44403c" strokeWidth="2.5" />
            <path d="M280 60 L260 205 L300 205 L320 60 Z" fill="url(#crossHatchDark)" opacity="0.35" />

            {/* Hand with Mallet & Chisel */}
            <g transform="translate(140, 70)">
              {/* Sculptor arm */}
              <path d="M-40 80 Q20 50 70 60" stroke="#44403c" strokeWidth="12" strokeLinecap="round" />
              {/* Mallet */}
              <rect x="60" y="20" width="24" height="40" fill="#78716c" stroke="#44403c" strokeWidth="2" rx="4" />
              <line x1="72" y1="40" x2="72" y2="90" stroke="#57534e" strokeWidth="5" />
              {/* Chisel */}
              <line x1="120" y1="80" x2="155" y2="95" stroke="#44403c" strokeWidth="4" />
              {/* Sparks / chips */}
              <circle cx="160" cy="95" r="2.5" fill="#f59e0b" />
              <circle cx="165" cy="85" r="2" fill="#f59e0b" />
              <circle cx="155" cy="105" r="1.8" fill="#f59e0b" />
            </g>

            {/* Revealed Statue on the stone */}
            {matched ? (
              <g transform="translate(350, 80)">
                <circle cx="25" cy="25" r="14" stroke="#ca8a04" strokeWidth="2" fill="#fef08a" />
                <path d="M10 45 Q25 35 40 45 L45 100 L5 100 Z" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
                <text x="-60" y="-10" fill="#ca8a04" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                  तावत् सिद्धिः (Divine Masterpiece!)
                </text>
              </g>
            ) : (
              <text x="330" y="130" fill="#a8a29e" fontSize="12" fontStyle="italic">
                ...raw marble awaiting chisel...
              </text>
            )}

            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यावत् प्रयत्नः (In proportion to the artist\'s dedication...)
            </text>
          </g>
        )}

        {/* 6. SCHOLAR & SCRIPTURE (यः पठति सः जानाति) */}
        {sketchId === 'student_manuscript' && (
          <g id="scholar-scene">
            {/* Banyan canopy overhanging */}
            <path d="M20 20 Q120 5 220 25 Q320 0 420 30 Q520 10 580 40 L580 70 Q400 50 20 80 Z" fill="url(#hatchPencil)" stroke="#57534e" strokeWidth="2" />
            
            {/* Student in Padmasana */}
            <g transform="translate(180, 90)">
              {/* Head */}
              <circle cx="40" cy="25" r="12" stroke="#44403c" strokeWidth="2" fill="#fdfcf9" />
              <path d="M40 13 Q48 10 46 22" stroke="#44403c" strokeWidth="3" fill="none" /> {/* Shikha */}
              {/* Body */}
              <path d="M28 40 L15 100 L65 100 L52 40 Z" fill="#e7e0cf" stroke="#57534e" strokeWidth="2" />
              {/* Crossed legs */}
              <ellipse cx="40" cy="100" rx="36" ry="12" fill="#d6cebe" stroke="#57534e" strokeWidth="2" />
            </g>

            {/* Palm-Leaf Manuscript Grantha */}
            <g transform="translate(260, 150)">
              <rect x="0" y="0" width="130" height="26" fill="#fef3c7" stroke="#78716c" strokeWidth="1.8" rx="2" />
              <line x1="65" y1="0" x2="65" y2="26" stroke="#b45309" strokeWidth="1.5" />
              <line x1="10" y1="8" x2="55" y2="8" stroke="#78716c" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="10" y1="16" x2="55" y2="16" stroke="#78716c" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="75" y1="8" x2="120" y2="8" stroke="#78716c" strokeWidth="1.2" strokeDasharray="3 2" />
              <line x1="75" y1="16" x2="120" y2="16" stroke="#78716c" strokeWidth="1.2" strokeDasharray="3 2" />
            </g>

            {/* Glowing Wisdom Aura */}
            {matched && (
              <g transform="translate(200, 80)">
                <circle cx="20" cy="35" r="45" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                <text x="120" y="30" fill="#b45309" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  सः जानाति (True Illumination!)
                </text>
              </g>
            )}

            <line x1="50" y1="215" x2="550" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यः पठति (He who studies the sacred words with devotion...)
            </text>
          </g>
        )}

        {/* 7. HONORING WOMEN & REJOICING DEITIES (यत्र नार्यस्तु पूज्यन्ते रमन्ते तत्र देवताः) */}
        {sketchId === 'sacred_home' && (
          <g id="sacred-home-scene">
            {/* Traditional Carved Doorframe */}
            <rect x="80" y="50" width="180" height="160" fill="#fdfbf7" stroke="#44403c" strokeWidth="3" />
            <path d="M70 50 L270 50 L260 35 L80 35 Z" fill="#e7e0cf" stroke="#44403c" strokeWidth="2" />
            {/* Mango-leaf Toranam */}
            <g fill="#15803d" stroke="#166534" strokeWidth="1">
              <path d="M90 50 Q95 65 100 50 Z" />
              <path d="M120 50 Q125 65 130 50 Z" />
              <path d="M150 50 Q155 65 160 50 Z" />
              <path d="M180 50 Q185 65 190 50 Z" />
              <path d="M210 50 Q215 65 220 50 Z" />
              <path d="M240 50 Q245 65 250 50 Z" />
            </g>

            {/* Lit Brass Deepam */}
            <g transform="translate(150, 160)">
              <ellipse cx="20" cy="30" rx="18" ry="6" fill="#ca8a04" stroke="#854d0e" strokeWidth="1.8" />
              <rect x="18" y="30" width="4" height="15" fill="#ca8a04" />
              <ellipse cx="20" cy="45" rx="14" ry="4" fill="#854d0e" />
              {/* Flame */}
              <path d="M20 28 Q15 15 20 5 Q25 15 20 28 Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="3" fill="#ffffff" />
            </g>

            {/* Rangoli on floor */}
            <g transform="translate(340, 160)" stroke="#e11d48" strokeWidth="1.5" fill="none">
              <circle cx="50" cy="30" r="25" />
              <path d="M50 5 L50 55" />
              <path d="M25 30 L75 30" />
              <circle cx="50" cy="30" r="8" fill="#ffe4e6" />
            </g>

            {/* Divine Blessings Shower */}
            {matched && (
              <g transform="translate(320, 60)">
                <text x="0" y="20" fill="#ca8a04" fontSize="14" fontWeight="bold" fontFamily="Georgia">
                  रमन्ते तत्र देवताः (Divine Blessings Abide!)
                </text>
                <circle cx="40" cy="50" r="4" fill="#f59e0b" />
                <circle cx="90" cy="40" r="3" fill="#f59e0b" />
                <circle cx="140" cy="60" r="3.5" fill="#f59e0b" />
              </g>
            )}

            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यत्र नार्यस्तु पूज्यन्ते (Where noble women are cherished with reverence...)
            </text>
          </g>
        )}

        {/* 8. SEED & HARVEST (यद् बीजं वपते तद् फलं लभते) */}
        {sketchId === 'seed_harvest' && (
          <g id="seed-harvest-scene">
            {/* Cupped Sowing Hands */}
            <g transform="translate(80, 100)">
              <path d="M10 40 Q40 20 70 30 Q100 45 105 70 L60 80 Z" fill="#f5f0e4" stroke="#44403c" strokeWidth="2" />
              {/* Dropping seeds */}
              <circle cx="90" cy="75" r="3" fill="#78716c" />
              <circle cx="95" cy="90" r="2.8" fill="#78716c" />
              <circle cx="102" cy="105" r="3" fill="#78716c" />
            </g>

            {/* Furrowed Soil */}
            <path d="M40 210 Q280 205 560 210" stroke="#44403c" strokeWidth="2.5" />
            <path d="M60 215 Q280 210 540 215" stroke="#78716c" strokeWidth="1.5" strokeDasharray="5 3" />

            {/* Mature Mango Bough on Right */}
            <g transform="translate(340, 50)">
              {/* Thick tree branch */}
              <path d="M0 60 Q80 40 180 50" stroke="#44403c" strokeWidth="6" strokeLinecap="round" />
              {/* Leaves */}
              <path d="M40 60 Q60 40 80 55" stroke="#15803d" strokeWidth="3" fill="none" />
              <path d="M100 50 Q120 30 140 45" stroke="#15803d" strokeWidth="3" fill="none" />
              
              {matched ? (
                <>
                  {/* Golden ripe mangoes */}
                  <g fill="#f59e0b" stroke="#b45309" strokeWidth="1.8">
                    <path d="M60 70 Q75 65 75 90 Q75 110 58 105 Q45 95 60 70 Z" />
                    <path d="M120 65 Q135 60 135 85 Q135 105 118 100 Q105 90 120 65 Z" />
                  </g>
                  <text x="-40" y="140" fill="#b45309" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                    तद् फलं लभते (The Golden Harvest!)
                  </text>
                </>
              ) : (
                <text x="20" y="100" fill="#a8a29e" fontSize="12" fontStyle="italic">
                  ...waiting for seed to mature...
                </text>
              )}
            </g>

            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यद् बीजं वपते (Whatever seed is sown in the earth...)
            </text>
          </g>
        )}

        {/* 9. CRAVING & ANXIETY (यावती तृष्णा तावती चिन्ता) */}
        {sketchId === 'treasure_worry' && (
          <g id="treasure-worry-scene">
            {/* Open Strongbox */}
            <g transform="translate(100, 110)">
              {/* Chest base */}
              <rect x="0" y="30" width="120" height="70" fill="#78716c" stroke="#44403c" strokeWidth="2.5" rx="3" />
              <line x1="0" y1="65" x2="120" y2="65" stroke="#292524" strokeWidth="2" />
              {/* Open lid */}
              <path d="M0 30 L30 -5 L150 -5 L120 30 Z" fill="#57534e" stroke="#44403c" strokeWidth="2" />
              {/* Gold coins spilling */}
              <g fill="#f59e0b" stroke="#b45309" strokeWidth="1">
                <circle cx="30" cy="25" r="8" />
                <circle cx="45" cy="22" r="7" />
                <circle cx="60" cy="24" r="8" />
                <circle cx="75" cy="20" r="7" />
                <circle cx="90" cy="26" r="8" />
                <circle cx="105" cy="35" r="7" />
              </g>
            </g>

            {/* Long dark graphite shadows */}
            <path d="M220 180 L420 180 L460 215 L180 215 Z" fill="url(#crossHatchDark)" opacity="0.6" />

            {/* Pensive figure holding head */}
            <g transform="translate(420, 90)">
              <circle cx="30" cy="25" r="12" stroke="#44403c" strokeWidth="2" fill="#e7e0cf" />
              <path d="M20 40 L10 100 L50 100 L40 40 Z" fill="#57534e" stroke="#292524" strokeWidth="2" />
              {/* Hand to forehead in worry */}
              <path d="M38 22 Q46 15 42 32" stroke="#44403c" strokeWidth="3" strokeLinecap="round" />
            </g>

            {matched && (
              <text x="320" y="70" fill="#b91c1c" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                तावती चिन्ता (Endless Anxiety!)
              </text>
            )}

            <line x1="50" y1="215" x2="550" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="12" fontFamily="Georgia" fontStyle="italic">
              यावती तृष्णा (As vast as endless hoarding grows...)
            </text>
          </g>
        )}

        {/* 10. BANYAN & SINCERE EFFORT (यथा बीजं विना वृक्षः न भवति तथा पुरुषार्थं विना दैवं न सिद्ध्यति) */}
        {sketchId === 'banyan_effort' && (
          <g id="banyan-effort-scene">
            {/* Grand Banyan Canopy */}
            <path
              d="M180 120 Q120 70 200 40 Q280 10 380 30 Q480 20 460 80 Q520 120 440 140 Z"
              fill="#d6cebe"
              stroke="#44403c"
              strokeWidth="2.5"
            />
            {/* Trunk & Aerial roots */}
            <path d="M300 120 L280 210 L340 210 L320 120 Z" fill="#78716c" stroke="#44403c" strokeWidth="2" />
            <line x1="240" y1="120" x2="235" y2="210" stroke="#57534e" strokeWidth="2.5" />
            <line x1="400" y1="110" x2="410" y2="210" stroke="#57534e" strokeWidth="2.5" />

            {/* Tiny guarded seedling on Left */}
            <g transform="translate(100, 160)">
              {/* Bamboo protective fence */}
              <line x1="0" y1="20" x2="0" y2="50" stroke="#b45309" strokeWidth="2" />
              <line x1="15" y1="15" x2="15" y2="50" stroke="#b45309" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="50" stroke="#b45309" strokeWidth="2" />
              <line x1="-5" y1="30" x2="35" y2="30" stroke="#b45309" strokeWidth="1.5" />
              {/* Sprout */}
              <path d="M15 50 Q16 35 12 28 Q18 32 24 26" stroke="#15803d" strokeWidth="2.2" fill="none" />
            </g>

            {matched && (
              <text x="240" y="25" fill="#15803d" fontSize="13" fontWeight="bold" fontFamily="Georgia">
                पुरुषार्थेन दैवसिद्धिः (Puruṣārtha Fulfills Destiny!)
              </text>
            )}

            <line x1="40" y1="215" x2="560" y2="215" stroke="#44403c" strokeWidth="2" />
            <text x="60" y="232" fill="#57534e" fontSize="11" fontFamily="Georgia" fontStyle="italic">
              यथा बीजं विना वृक्षः न भवति (Without a seed no banyan can rise...)
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
          <span className="psm-badge">PENCIL-SKETCH VISUAL PUZZLE</span>
          <span className="psm-tag">यत्-तत् चित्रात्मक-संयोजनम् · Relative Clause Matching</span>
        </div>
        <h2 className="psm-title">Pencil-Sketch Block Matching</h2>
        <p className="psm-subtitle">
          Connect relative clause blocks (like यत्र धूमः) with correlative answer blocks (like तत्र अग्निः) to reveal authentic hand-drawn graphite riddle scenes and Vedic insights.
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
            <span>Riddle Scene Canvas</span>
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
            <span>Sketchbook Gallery ({unlockedIds.size} / {RELATIVE_CLAUSE_RIDDLES.length})</span>
          </button>
        </div>
      </header>

      {/* ===================================================================
          TAB 1: INTERACTIVE SKETCH RIDDLE PUZZLE
          =================================================================== */}
      {activeTab === 'puzzle' && (
        <section aria-label="Pencil Sketch Riddle Arena">
          <div className="psm-canvas-pod">
            <div className="psm-scene-header">
              <span className="psm-scene-title">{currentRiddle.title}</span>
              <span className="psm-scene-theme-pill">{currentRiddle.theme}</span>
            </div>

            {/* Hand-Drawn SVG Sketch Artwork */}
            <div className={`psm-artwork-viewport ${isMatched ? 'matched' : 'unmatched'}`}>
              {renderPencilSketchArt(currentRiddle.sketchId, isMatched)}
            </div>

            {/* Visual Riddle Clue Box */}
            <div className="psm-riddle-clue-box">
              <div className="psm-rc-label">🔍 Visual Riddle Clue:</div>
              <div className="psm-rc-text">"{currentRiddle.riddleClue}"</div>
            </div>

            {/* Block Matching Arena */}
            <div className="psm-matching-arena">
              {/* Left Column: Lead Relative Clause Block */}
              <div className="psm-lead-card">
                <div className="psm-lead-tag">Relative Clause (सम्बन्धवाक्यम्)</div>
                <div className="psm-lead-devanagari">{currentRiddle.relativeBlock}</div>
                <div className="psm-lead-translit">({currentRiddle.relativeTranslit})</div>
                <div className="psm-lead-meaning">"{currentRiddle.relativeMeaning}"</div>
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
                      <span className="psm-opt-text">{opt}</span>
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
                    <span>Riddle Mastered &amp; Sketch Completed!</span>
                  </span>
                  <button
                    type="button"
                    className="psm-btn-listen"
                    onClick={() => handleSpeak(currentRiddle.fullSanskrit)}
                  >
                    <span>🔊</span>
                    <span>Speak Proverb</span>
                  </button>
                </div>

                <div className="psm-full-sanskrit">{currentRiddle.fullSanskrit}</div>
                <div className="psm-full-translit">{currentRiddle.fullTranslit}</div>
                <div className="psm-full-english">"{currentRiddle.englishTranslation}"</div>

                <div className="psm-philosophical-insight">
                  <strong>🌿 Philosophical Background: </strong>
                  {currentRiddle.philosophicalInsight}
                </div>

                <div className="psm-rp-footer">
                  <span style={{ fontSize: '0.85rem', color: '#78716c' }}>
                    Scene {currentIndex + 1} of {RELATIVE_CLAUSE_RIDDLES.length}
                  </span>
                  <button
                    type="button"
                    className="psm-btn-next"
                    onClick={handleNextRiddle}
                  >
                    Next Riddle Scene ➜
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================================================
          TAB 2: SKETCHBOOK GALLERY
          =================================================================== */}
      {activeTab === 'gallery' && (
        <section aria-label="Sketchbook Gallery">
          <div className="psm-gallery-grid">
            {RELATIVE_CLAUSE_RIDDLES.map((riddle) => {
              const isUnlocked = unlockedIds.has(riddle.id);

              return (
                <div key={riddle.id} className="psm-gallery-card">
                  <div className="psm-gc-header">
                    <span>{riddle.theme}</span>
                    <span style={{ float: 'right' }}>{isUnlocked ? '✓ Unlocked' : '🔒 Locked'}</span>
                  </div>
                  <div className="psm-gc-sanskrit">{riddle.fullSanskrit}</div>
                  <div className="psm-gc-english">"{riddle.englishTranslation}"</div>
                  <button
                    type="button"
                    className="psm-btn-listen"
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
                    onClick={() => handleSpeak(riddle.fullSanskrit)}
                  >
                    <span>🔊</span>
                    <span>Hear Audio</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
