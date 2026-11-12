import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';

export interface MysteryCase {
  id: string;
  name: string;
  dev: string;
  clues: string[];
  options: {
    yoni: string;
    modernDomain: string;
    correct: boolean;
    explanation: string;
  }[];
  verdict: string;
}

export const MYSTERY_CASES: MysteryCase[] = [
  {
    id: 'platypus',
    name: 'Duck-Billed Platypus',
    dev: 'विचित्र-चञ्चु जीव',
    clues: [
      'Warm-blooded and possesses thick fur and milk glands.',
      'Does NOT give live birth: lays leathery eggs incubated in an earthen burrow!',
      'Possesses electroreceptors in its bill to detect muscular contractions of prey in murky water.',
    ],
    options: [
      {
        yoni: 'Jarāyuja (Womb-born) · Mammal',
        modernDomain: 'Eukaryota · Mammalia (Monotremata)',
        correct: false,
        explanation: 'It has milk glands like mammals, but it lays eggs rather than having a placenta or womb!',
      },
      {
        yoni: 'Aṇḍaja (Egg-born) · Monotreme Mammal',
        modernDomain: 'Eukaryota · Mammalia · Order Monotremata',
        correct: true,
        explanation: '✨ Correct! In the Catur-yoni lens it is strictly Aṇḍaja (egg-born). In modern cladistics, it is an early branching Monotreme mammal, proving that nature defies rigid folk boundaries!',
      },
      {
        yoni: 'Svedaja (Moisture-born)',
        modernDomain: 'Amphibia',
        correct: false,
        explanation: 'It lives near riverbanks, but is an endothermic vertebrate, not moisture-generated.',
      },
    ],
    verdict: 'The platypus demonstrates why Linnaean cladistics uses evolutionary lineage rather than single traits: it is a true mammal that lays eggs!',
  },
  {
    id: 'methanogen',
    name: 'Deep-Sea Hydrothermal Vent Microbe',
    dev: 'अग्नि-पाताल सूक्ष्मजीव',
    clues: [
      'Thrives at 105°C and 250 atmospheres of hydrostatic pressure near volcanic deep-sea vents.',
      'Single-celled with no membrane-bound nucleus (prokaryotic morphology).',
      'Cell membrane made of unique branched ether lipids; metabolic pathway converts H₂ and CO₂ into methane without oxygen.',
    ],
    options: [
      {
        yoni: 'Svedaja (Heat/Moisture-born)',
        modernDomain: 'Domain Archaea (Methanocaldococcus)',
        correct: true,
        explanation: '✨ Correct! Historically grouped with Svedaja (arising from heat and moisture), modern genomics revealed that Archaea form a distinct 3rd Domain of life, genetically closer to humans than to E. coli!',
      },
      {
        yoni: 'Udbhijja (Sprouting)',
        modernDomain: 'Kingdom Plantae',
        correct: false,
        explanation: 'It is not a photosynthetic plant; it lives in total pitch-black abyssal depths powered by volcanic chemosynthesis.',
      },
      {
        yoni: 'Jarāyuja (Womb-born)',
        modernDomain: 'Kingdom Animalia',
        correct: false,
        explanation: 'It is a microscopic unicellular prokaryote, not a multicellular animal.',
      },
    ],
    verdict: 'Carl Woese discovered in 1977 using 16S ribosomal RNA that Archaea are fundamentally separate from Bacteria, expanding our view beyond traditional categories.',
  },
  {
    id: 'mushroom',
    name: 'Forest Decomposer Fungus (Chhatraka)',
    dev: 'छत्रकम् (कवकम्)',
    clues: [
      'Grows fixed in soil like a plant, but contains ZERO chlorophyll and cannot photosynthesize.',
      'Cell walls are composed of chitin (the same polymer found in insect exoskeletons), not plant cellulose.',
      'Absorbs nutrients through an underground mycelial network via external enzymatic digestion.',
    ],
    options: [
      {
        yoni: 'Udbhijja (Plant / Sprouting)',
        modernDomain: 'Kingdom Fungi (Opisthokonta)',
        correct: true,
        explanation: '✨ Correct! Culturally classed under Udbhijja (sprouting from soil) and Sthāvara (stationary). Genetically, Fungi are more closely related to Animals than to green plants!',
      },
      {
        yoni: 'Aṇḍaja (Egg-born)',
        modernDomain: 'Kingdom Plantae',
        correct: false,
        explanation: 'Fungi reproduce via microscopic spores, not animal eggs with yolks.',
      },
      {
        yoni: 'Jarāyuja (Womb-born)',
        modernDomain: 'Domain Bacteria',
        correct: false,
        explanation: 'Fungi are complex multicellular eukaryotes, not single-celled bacteria.',
      },
    ],
    verdict: 'Fungi break the plant/animal dichotomy: they are sessile like plants, but heterotrophic like animals.',
  },
];

export interface BiomeAdaptation {
  biome: string;
  dev: string;
  icon: string;
  stress: string;
  organism: string;
  organismDev: string;
  organismIcon: string;
  adaptationOptions: {
    feature: string;
    correct: boolean;
    explanation: string;
  }[];
}

export const BIOME_ADAPTATIONS: BiomeAdaptation[] = [
  {
    biome: 'Thar Desert (मरुभूमि)',
    dev: 'मरुभूमिः',
    icon: '🏜️',
    stress: 'Extreme heat, daytime desiccation, scarce drinking water.',
    organism: 'Dromedary Camel (उष्ट्रः)',
    organismDev: 'उष्ट्रः',
    organismIcon: '🐫',
    adaptationOptions: [
      {
        feature: 'Fat storage localized in dorsal hump, concentrated urine, and oval red blood cells that withstand dehydration.',
        correct: true,
        explanation: '✨ Correct! Storing fat in a hump prevents body-wide heat insulation, and oval RBCs flow smoothly even in thickened, dehydrated blood.',
      },
      {
        feature: 'Rapid panting and continuous sweat glands across the body surface.',
        correct: false,
        explanation: 'Continuous sweating would rapidly exhaust the animal’s limited water reserves in a desert!',
      },
    ],
  },
  {
    biome: 'Sundarbans Mangrove Wetland (अनूप-वनम्)',
    dev: 'अनूप-वनम्',
    icon: '🌴',
    stress: 'Waterlogged anoxic mud (zero oxygen) and high seawater salinity.',
    organism: 'Sundari Mangrove Tree (सुन्दरी-वृक्षः)',
    organismDev: 'सुन्दरी-वृक्षः',
    organismIcon: '🌳',
    adaptationOptions: [
      {
        feature: 'Deep taproot reaching 50 meters below sea level.',
        correct: false,
        explanation: 'Deep mud is completely anoxic and sulfur-rich; deep roots would suffocate without oxygen.',
      },
      {
        feature: 'Vertical breathing roots (pneumatophores) growing upward out of mud into air, with lenticels for gas exchange.',
        correct: true,
        explanation: '✨ Correct! Pneumatophores act like snorkels, taking in atmospheric oxygen during low tide, while roots filter out 90% of seawater salt.',
      },
    ],
  },
  {
    biome: 'Abyssal Ocean Trench (गम्भीर-समुद्रः)',
    dev: 'गम्भीर-समुद्रः',
    icon: '🌊',
    stress: 'Zero sunlight, near-freezing temperatures (2°C), and 400 atmospheres of crushing pressure.',
    organism: 'Deep-Sea Anglerfish (दीप्ति-मत्स्यः)',
    organismDev: 'दीप्ति-मत्स्यः',
    organismIcon: '🐟',
    adaptationOptions: [
      {
        feature: 'Bioluminescent lure harboring symbiotic Photobacterium to attract prey, and compressible cartilaginous skeleton.',
        correct: true,
        explanation: '✨ Correct! In total darkness, glowing bacteria lure prey directly into its jaws, while pressure-resistant fluid enzymes prevent cell collapse.',
      },
      {
        feature: 'Thick blubber insulation and large air-filled swim bladder.',
        correct: false,
        explanation: 'An air-filled swim bladder would violently crush under 400 atmospheres of hydrostatic water pressure!',
      },
    ],
  },
  {
    biome: 'Himalayan High Alpine (हिमवत्-शिखरम्)',
    dev: 'हिमवत्-शिखरम्',
    icon: '🏔️',
    stress: 'Hypoxia (low atmospheric oxygen at 5,000m) and sub-zero blizzard winds.',
    organism: 'Snow Leopard (हिम-चित्रकः)',
    organismDev: 'हिम-चित्रकः',
    organismIcon: '🐆',
    adaptationOptions: [
      {
        feature: 'Enlarged nasal cavity to warm freezing air before lungs, wide paws acting as snowshoes, and thick 1-meter tail for balance and face insulation.',
        correct: true,
        explanation: '✨ Correct! The massive nasal cavities warm and humidify thin freezing air, and the tail wraps over its face like a blanket during blizzards.',
      },
      {
        feature: 'Seasonal hibernation underground during winter months.',
        correct: false,
        explanation: 'Snow leopards do not hibernate; they follow blue sheep herds along rocky precipices year-round.',
      },
    ],
  },
];

export const ChaturyoniExpansions: React.FC = () => {
  const [subTab, setSubTab] = useState<'mystery' | 'adaptation' | 'framing'>('mystery');
  const [activeMysteryIdx, setActiveMysteryIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const [activeBiomeIdx, setActiveBiomeIdx] = useState<number>(0);
  const [selectedBiomeOptionIdx, setSelectedBiomeOptionIdx] = useState<number | null>(null);

  const currentMystery = MYSTERY_CASES[activeMysteryIdx] || MYSTERY_CASES[0];
  const currentBiome = BIOME_ADAPTATIONS[activeBiomeIdx] || BIOME_ADAPTATIONS[0];

  return (
    <div style={{ marginTop: '1.25rem', background: 'rgba(15, 23, 42, 0.75)', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(148, 163, 184, 0.25)' }}>
      {/* Tab Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <b style={{ color: '#f8fafc', fontSize: '1rem' }}>🔬 Life Sciences &amp; Taxonomy Suite (जीव-विज्ञान &amp; वर्गीकरणम्)</b>
        <div className="vl-btn-row">
          <button
            type="button"
            className={`vl-chip${subTab === 'mystery' ? ' is-on' : ''}`}
            onClick={() => {
              setSubTab('mystery');
              setSelectedOptionIdx(null);
            }}
          >
            🕵️ Mystery Organism Mode
          </button>
          <button
            type="button"
            className={`vl-chip${subTab === 'adaptation' ? ' is-on' : ''}`}
            onClick={() => {
              setSubTab('adaptation');
              setSelectedBiomeOptionIdx(null);
            }}
          >
            🌍 Biome Adaptation Challenges
          </button>
          <button
            type="button"
            className={`vl-chip${subTab === 'framing' ? ' is-on' : ''}`}
            onClick={() => setSubTab('framing')}
          >
            📜 Cultural vs. Modern Cladistics
          </button>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 1. MYSTERY ORGANISM MODE                                              */}
      {/* --------------------------------------------------------------------- */}
      {subTab === 'mystery' && (
        <div style={{ background: 'rgba(30, 41, 59, 0.55)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700 }}>Mystery Case #{activeMysteryIdx + 1}:</span>
              <h4 style={{ margin: '0.1rem 0 0', color: '#f8fafc', fontSize: '1rem' }}>{currentMystery.name} · <span lang="sa">{currentMystery.dev}</span></h4>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {MYSTERY_CASES.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  className={`vl-chip${activeMysteryIdx === idx ? ' is-on' : ''}`}
                  onClick={() => {
                    setActiveMysteryIdx(idx);
                    setSelectedOptionIdx(null);
                  }}
                  style={{ fontSize: '0.75rem' }}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Clues Box */}
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.85rem' }}>
            <b style={{ color: '#fde047', fontSize: '0.78rem', display: 'block', marginBottom: '0.35rem' }}>🔍 Diagnostic Observational Clues:</b>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: '1.55' }}>
              {currentMystery.clues.map((clue, i) => (
                <li key={i}>{clue}</li>
              ))}
            </ul>
          </div>

          {/* Classification Options */}
          <div style={{ marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
              DEDUCE: WHERE DOES THIS ORGANISM SIT CULTURALLY &amp; SCIENTIFICALLY?
            </span>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {currentMystery.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className={`vl-btn ${selectedOptionIdx === i ? (opt.correct ? 'vl-btn--cyber' : 'vl-btn--danger') : 'vl-btn--cyber-ghost'}`}
                  style={{ textAlign: 'left', padding: '0.55rem 0.85rem', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                  onClick={() => {
                    setSelectedOptionIdx(i);
                    if (opt.correct) soundEffects.playStrokeChime();
                    else soundEffects.playErrorBuzzer();
                  }}
                >
                  <div>
                    <strong>{opt.yoni}</strong> <span style={{ color: '#94a3b8' }}>({opt.modernDomain})</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedOptionIdx !== null && (
            <div style={{ padding: '0.75rem', borderRadius: '8px', background: currentMystery.options[selectedOptionIdx].correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `1px solid ${currentMystery.options[selectedOptionIdx].correct ? '#22c55e' : '#ef4444'}`, fontSize: '0.8rem', color: '#f8fafc' }}>
              <p style={{ margin: '0 0 0.35rem' }}>{currentMystery.options[selectedOptionIdx].explanation}</p>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.35rem' }}>
                💡 <em>Insight:</em> {currentMystery.verdict}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 2. BIOME ADAPTATION CHALLENGES                                        */}
      {/* --------------------------------------------------------------------- */}
      {subTab === 'adaptation' && (
        <div style={{ background: 'rgba(30, 41, 59, 0.55)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(251, 191, 36, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.4rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: 700 }}>Ecosystem Biome #{activeBiomeIdx + 1}:</span>
              <h4 style={{ margin: '0.1rem 0 0', color: '#f8fafc', fontSize: '1rem' }}>
                {currentBiome.icon} {currentBiome.biome}
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {BIOME_ADAPTATIONS.map((b, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`vl-chip${activeBiomeIdx === idx ? ' is-on' : ''}`}
                  onClick={() => {
                    setActiveBiomeIdx(idx);
                    setSelectedBiomeOptionIdx(null);
                  }}
                  style={{ fontSize: '0.75rem' }}
                >
                  {b.icon} {b.biome.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.85rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700, marginBottom: '0.2rem' }}>
              ⚠️ ENVIRONMENTAL SELECTIVE STRESS:
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>{currentBiome.stress}</div>
            <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: '#fde047' }}>
              Organism: {currentBiome.organismIcon} <strong>{currentBiome.organism}</strong> (<span lang="sa">{currentBiome.organismDev}</span>)
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>
              WHICH ANATOMICAL / PHYSIOLOGICAL ADAPTATION ENABLES SURVIVAL?
            </span>
            <div style={{ display: 'grid', gap: '0.45rem' }}>
              {currentBiome.adaptationOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  className={`vl-btn ${selectedBiomeOptionIdx === i ? (opt.correct ? 'vl-btn--cyber' : 'vl-btn--danger') : 'vl-btn--cyber-ghost'}`}
                  style={{ textAlign: 'left', padding: '0.6rem 0.85rem', fontSize: '0.78rem', justifyContent: 'flex-start' }}
                  onClick={() => {
                    setSelectedBiomeOptionIdx(i);
                    if (opt.correct) soundEffects.playStrokeChime();
                    else soundEffects.playErrorBuzzer();
                  }}
                >
                  {opt.feature}
                </button>
              ))}
            </div>
          </div>

          {selectedBiomeOptionIdx !== null && (
            <div style={{ marginTop: '0.75rem', padding: '0.75rem', borderRadius: '8px', background: currentBiome.adaptationOptions[selectedBiomeOptionIdx].correct ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', border: `1px solid ${currentBiome.adaptationOptions[selectedBiomeOptionIdx].correct ? '#22c55e' : '#ef4444'}`, fontSize: '0.8rem', color: '#f8fafc' }}>
              {currentBiome.adaptationOptions[selectedBiomeOptionIdx].explanation}
            </div>
          )}
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* 3. CULTURAL FRAMING VS MODERN CLADISTICS                              */}
      {/* --------------------------------------------------------------------- */}
      {subTab === 'framing' && (
        <div style={{ background: 'rgba(30, 27, 75, 0.55)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '1.3rem' }}>📜</span>
            <h4 style={{ margin: 0, color: '#c084fc', fontSize: '1rem' }}>
              Classical Observational Categories vs. Modern Genomic Cladistics
            </h4>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.6', margin: '0.35rem 0' }}>
            Traditional classifications such as <strong lang="sa">चतुर्योनि (Catur-yoni)</strong> and <strong lang="sa">स्थावर-जङ्गम (Sthāvara-Jaṅgama)</strong> were brilliant early attempts by ancient Indian thinkers (in texts like the <em>Chāndogya Upaniṣad</em>, <em>Manusmṛti</em>, and <em>Caraka Saṃhitā</em>) to organize biodiversity using naked-eye macro observations:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginTop: '0.65rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #f59e0b' }}>
              <b style={{ color: '#fbbf24', fontSize: '0.82rem' }}>🏛️ Traditional Taxonomy (Observational Folk Lens)</b>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0' }}>
                Classifies life by <em>how it appears to generate</em> (womb, egg, moisture, seed) and <em>how it moves</em> (rooted or roaming). Highly effective for practical agriculture, ayurvedic pharmacology, and cultural memory, but unaware of microscopic cells or spontaneous generation fallacies.
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
              <b style={{ color: '#38bdf8', fontSize: '0.82rem' }}>🧬 Modern Biology (Phylogenetic Cladistics)</b>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '0.25rem 0' }}>
                Classifies life by <strong>evolutionary common ancestry</strong>, <strong>DNA/RNA sequencing</strong>, and <strong>cellular architecture</strong> (3 Domains: <em>Bacteria, Archaea, Eukaryota</em>). Proves that all insects hatch from eggs (dispelling spontaneous generation), and reveals that fungi are more closely related to animals than to plants!
              </p>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.5rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', color: '#fde047' }}>
            🌿 <strong>Pedagogical Harmony:</strong> Traditional heritage classifications can be appreciated as valuable cultural and historical frameworks, while science learners rigorously apply evidence-based molecular biology and evolution to understand the true tree of life.
          </div>
        </div>
      )}
    </div>
  );
};
