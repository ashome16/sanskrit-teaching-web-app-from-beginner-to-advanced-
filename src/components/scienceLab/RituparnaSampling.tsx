import React, { useState, useMemo } from 'react';
import { CoreIdea, TermPanel, ChallengeList, type LabTerm, type LabChallenge } from './common';
import '../../styles/science-lab.css';

interface TwigData {
  id: number;
  name: string;
  leaves: number;
  fruits: number;
  cx: number;
  cy: number;
  color: string;
}

const BASE_TWIGS: TwigData[] = [
  { id: 1, name: 'Northwest Branch (वायव्य-शाखा)', leaves: 254, fruits: 41, cx: 160, cy: 110, color: '#15803d' },
  { id: 2, name: 'North Canopy Branch (उत्तर-शिखर)', leaves: 268, fruits: 45, cx: 250, cy: 75, color: '#16a34a' },
  { id: 3, name: 'Northeast Branch (ईशान-शाखा)', leaves: 246, fruits: 39, cx: 335, cy: 105, color: '#15803d' },
  { id: 4, name: 'West Lower Branch (पश्चिम-शाखा)', leaves: 262, fruits: 43, cx: 135, cy: 185, color: '#22c55e' },
  { id: 5, name: 'East Lower Branch (पूर्व-शाखा)', leaves: 255, fruits: 40, cx: 360, cy: 180, color: '#16a34a' },
];

const RITUPARNA_TERMS: LabTerm[] = [
  {
    dev: 'साङ्ख्यानम्',
    iast: 'Saṅkhyānam',
    en: 'Quantitative estimation / empirical statistical sampling',
    note: 'The exact science King Rituparna taught to Prince Nala in Mahābhārata Nalopākhyāna.',
  },
  {
    dev: 'अक्षहृदयम्',
    iast: 'Akṣahṛdayam',
    en: 'The secret science of dice, permutations, and probability',
    note: 'Rituparna traded this knowledge to Nala in exchange for Aśvahṛdaya (equestrian horsemanship).',
  },
  {
    dev: 'विभीतकः',
    iast: 'Vibhītaka',
    en: 'Terminalia bellirica (Bahera tree)',
    note: 'The sprawling forest tree whose fruit seeds were traditionally used as dice tokens in ancient India.',
  },
  {
    dev: 'समष्टि-मानम्',
    iast: 'Samaṣṭi-mānam',
    en: 'Total population parameter (Canopy total)',
    note: 'The entire quantity estimated by scaling sample twig subsets.',
  },
  {
    dev: 'व्यष्टि-गणना',
    iast: 'Vyaṣṭi-gaṇanā',
    en: 'Sample observation count',
    note: 'Empirically counting a representative cluster before multiplying by the canopy ratio.',
  },
];

const RITUPARNA_CHALLENGES: LabChallenge[] = [
  {
    q: 'How did King Rituparna calculate the total leaves on the Vibhītaka tree without felling or counting every leaf?',
    options: [
      'He guessed a supernatural number with divine vision',
      'He sampled a single representative branch, counted its density, and scaled it by the ratio of total canopy volume',
      'He counted the leaves fallen on the forest floor',
      'He used a shadow rod (Śaṅku) length',
    ],
    answer: 1,
    explain: 'Rituparna applied cluster sampling: Sample Count × (Total Canopy Volume / Sample Branch Volume). Skeptical Prince Nala felled the tree and discovered his estimate was exact!',
  },
  {
    q: 'Why was the Vibhītaka tree culturally and mathematically significant to this Mahābhārata episode?',
    options: [
      'It was sacred to Lord Indra',
      'Vibhītaka nuts were the standard dice tokens used in ancient Indian gaming and combinatorics',
      'Its leaves change color every season',
      'It produces golden fruits',
    ],
    answer: 1,
    explain: 'Vibhītaka seeds were the ancient Indian dice cubes (Akṣa). A master of dice combinatorics (Akṣahṛdaya) was inherently a master of probability and sampling!',
  },
  {
    q: 'What fundamental law of modern probability does this ancient experiment demonstrate as the sample fraction increases?',
    options: [
      'The Doppler Effect',
      'The Law of Large Numbers (sampling variance converges toward the true population parameter)',
      'The Theory of General Relativity',
      'Newton’s Third Law',
    ],
    answer: 1,
    explain: 'As sample size increases from 1 twig (20%) to 5 twigs (100%), the variance collapses and the sample estimate converges perfectly to the true population total.',
  },
];

export const RituparnaSampling: React.FC = () => {
  const [numTwigsSampled, setNumTwigsSampled] = useState<number>(1);
  const [selectedTwigsOffset, setSelectedTwigsOffset] = useState<number>(0);
  const [revealedTrueCount, setRevealedTrueCount] = useState<boolean>(false);

  // Pick consecutive twigs based on offset and sample count
  const activeTwigIds = useMemo(() => {
    const ids: number[] = [];
    for (let i = 0; i < numTwigsSampled; i++) {
      const idx = (selectedTwigsOffset + i) % BASE_TWIGS.length;
      ids.push(BASE_TWIGS[idx].id);
    }
    return ids;
  }, [numTwigsSampled, selectedTwigsOffset]);

  // Totals
  const trueTotalLeaves = useMemo(() => BASE_TWIGS.reduce((s, t) => s + t.leaves, 0), []);
  const trueTotalFruits = useMemo(() => BASE_TWIGS.reduce((s, t) => s + t.fruits, 0), []);

  const sampleLeaves = useMemo(() => {
    return BASE_TWIGS.filter((t) => activeTwigIds.includes(t.id)).reduce((s, t) => s + t.leaves, 0);
  }, [activeTwigIds]);

  const sampleFruits = useMemo(() => {
    return BASE_TWIGS.filter((t) => activeTwigIds.includes(t.id)).reduce((s, t) => s + t.fruits, 0);
  }, [activeTwigIds]);

  const multiplier = Number((5 / numTwigsSampled).toFixed(2));
  const estimatedLeaves = Math.round(sampleLeaves * multiplier);
  const estimatedFruits = Math.round(sampleFruits * multiplier);

  const leavesErrorPct = Number((((estimatedLeaves - trueTotalLeaves) / trueTotalLeaves) * 100).toFixed(2));
  const fruitsErrorPct = Number((((estimatedFruits - trueTotalFruits) / trueTotalFruits) * 100).toFixed(2));

  const handleResample = () => {
    setSelectedTwigsOffset((prev) => (prev + 1) % BASE_TWIGS.length);
  };

  return (
    <div className="vl-subsim" aria-label="King Rituparna’s Statistical Sampling Simulator">
      <CoreIdea
        note={
          <span>
            Preserved in the <em>Mahābhārata</em> (Vana Parva, Nalopākhyāna, ch. 72). King Rituparna of Ayodhya reveals
            to Prince Nala the power of <em>Saṅkhyāna</em> (statistical cluster estimation) by calculating the exact count of
            thousands of leaves and fruits on a massive Vibhītaka tree within moments.
          </span>
        }
      >
        <strong>The World’s Earliest Empirical Statistical Sampling:</strong> Long before 17th-century European probability,
        Indian mathematicians understood that a population parameter (<em>N</em>) can be accurately estimated by sampling
        a measurable fraction (<em>n</em>) and applying canopy scaling: <code>Estimate = Sample Count × (Total Canopy Volume / Sample Volume)</code>.
      </CoreIdea>

      {/* Simulator Bench */}
      <div className="vl-bench" style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '16px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#0f766e', fontWeight: 800 }}>
              King Rituparna’s Statistical Sampling Simulator
            </h3>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.86rem', color: '#64748b' }}>
              Explore cluster sampling variance, canopy scaling multipliers, and the Law of Large Numbers.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              className="vl-btn vl-btn--ghost"
              onClick={handleResample}
              title="Select different branch twigs to examine sampling variance"
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}
            >
              🔄 Resample Branches
            </button>
            <button
              type="button"
              className="vl-btn"
              onClick={() => setRevealedTrueCount((v) => !v)}
              style={{
                fontSize: '0.85rem',
                padding: '0.4rem 0.8rem',
                background: revealedTrueCount ? '#0f766e' : '#b45309',
                color: '#ffffff',
                border: 'none',
              }}
            >
              {revealedTrueCount ? '✓ True Count Revealed' : '🪓 Nala’s True Count Verify'}
            </button>
          </div>
        </div>

        {/* Tree Interactive SVG & Strategy Card Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.25rem', alignItems: 'center' }}>
          {/* Tree SVG */}
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '0.75rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '12px', fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
              🌳 Vibhītaka Tree (Population)
            </div>

            <svg viewBox="0 0 500 360" style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* Ground */}
              <ellipse cx="250" cy="335" rx="160" ry="18" fill="#e2e8f0" />
              <rect x="0" y="330" width="500" height="30" fill="#f1f5f9" />

              {/* Trunk & Main Branches */}
              <path
                d="M 235 330 L 235 220 L 175 160 L 190 150 L 243 200 L 243 140 L 257 140 L 257 200 L 310 150 L 325 160 L 265 220 L 265 330 Z"
                fill="#78350f"
              />
              {/* Lower branch splits */}
              <path d="M 205 185 L 145 195 L 150 205 L 210 195 Z" fill="#78350f" />
              <path d="M 295 185 L 355 195 L 350 205 L 290 195 Z" fill="#78350f" />

              {/* Twig Foliage Clusters */}
              {BASE_TWIGS.map((twig) => {
                const isSampled = activeTwigIds.includes(twig.id);
                return (
                  <g key={twig.id} style={{ cursor: 'pointer' }} onClick={() => {
                    if (activeTwigIds.includes(twig.id)) {
                      if (numTwigsSampled > 1) setNumTwigsSampled((n) => n - 1);
                    } else {
                      if (numTwigsSampled < 5) setNumTwigsSampled((n) => n + 1);
                    }
                  }}>
                    {/* Active highlight ring / halo */}
                    {isSampled && (
                      <ellipse
                        cx={twig.cx}
                        cy={twig.cy}
                        rx="56"
                        ry="38"
                        fill="rgba(56, 189, 248, 0.22)"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />
                    )}

                    {/* Twig Leaf Foliage cloud */}
                    <circle cx={twig.cx - 20} cy={twig.cy - 10} r="26" fill={twig.color} opacity="0.9" />
                    <circle cx={twig.cx + 20} cy={twig.cy - 10} r="26" fill={twig.color} opacity="0.9" />
                    <circle cx={twig.cx} cy={twig.cy - 18} r="28" fill={twig.color} />
                    <circle cx={twig.cx} cy={twig.cy + 12} r="22" fill={twig.color} opacity="0.95" />

                    {/* Leaves details */}
                    <circle cx={twig.cx - 10} cy={twig.cy - 6} r="4" fill="#86efac" />
                    <circle cx={twig.cx + 12} cy={twig.cy + 2} r="4" fill="#86efac" />
                    <circle cx={twig.cx - 2} cy={twig.cy + 8} r="4" fill="#4ade80" />

                    {/* Vibhitaka Nuts / Fruits (Orange-brown spheres) */}
                    <circle cx={twig.cx - 14} cy={twig.cy + 10} r="5.5" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
                    <circle cx={twig.cx + 15} cy={twig.cy - 12} r="5.5" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
                    <circle cx={twig.cx + 6} cy={twig.cy + 14} r="5.5" fill="#f97316" stroke="#c2410c" strokeWidth="1" />
                    <circle cx={twig.cx - 5} cy={twig.cy - 18} r="5.5" fill="#f97316" stroke="#c2410c" strokeWidth="1" />

                    {/* Twig Label */}
                    <text
                      x={twig.cx}
                      y={twig.cy + 32}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#ffffff"
                      stroke="#0f172a"
                      strokeWidth="2.5"
                      paintOrder="stroke"
                    >
                      {twig.leaves} 🍃 · {twig.fruits} 🌰
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Sampling Strategy Analysis Card */}
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.2rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ margin: 0, fontSize: '1rem', color: '#0f766e', fontWeight: 800 }}>
                Sampling Strategy Analysis
              </h4>
              <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 700 }}>
                {activeTwigIds.length} of 5 Twigs ({activeTwigIds.length * 20}%)
              </span>
            </div>

            <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '0.75rem', marginBottom: '0.85rem', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <span style={{ color: '#64748b' }}>Counted Leaves in Sample:</span>
                <strong style={{ color: '#15803d' }}>{sampleLeaves}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Counted Fruits in Sample:</span>
                <strong style={{ color: '#c2410c' }}>{sampleFruits}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.84rem', color: '#0f766e', fontWeight: 700, marginBottom: '0.35rem' }}>
                Rituparna’s Mathematical Estimate:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem', marginBottom: '0.3rem' }}>
                <span>Est. Total Leaves (\(N_L\)):</span>
                <strong style={{ color: '#0f766e', fontSize: '1.1rem' }}>{estimatedLeaves}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <span>Est. Total Fruits (\(N_F\)):</span>
                <strong style={{ color: '#b45309', fontSize: '1.1rem' }}>{estimatedFruits}</strong>
              </div>
            </div>

            {/* Revealed True Population Comparison */}
            {revealedTrueCount && (
              <div style={{ marginTop: '0.85rem', padding: '0.75rem', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#92400e', marginBottom: '0.3rem' }}>
                  👑 Prince Nala’s Tree-Felling Count:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#78350f', display: 'flex', justifyContent: 'space-between' }}>
                  <span>True Leaves: <strong>{trueTotalLeaves}</strong></span>
                  <span style={{ color: Math.abs(leavesErrorPct) < 2 ? '#15803d' : '#b45309' }}>
                    Error: {leavesErrorPct > 0 ? `+${leavesErrorPct}%` : `${leavesErrorPct}%`}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#78350f', display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                  <span>True Fruits: <strong>{trueTotalFruits}</strong></span>
                  <span style={{ color: Math.abs(fruitsErrorPct) < 2 ? '#15803d' : '#b45309' }}>
                    Error: {fruitsErrorPct > 0 ? `+${fruitsErrorPct}%` : `${fruitsErrorPct}%`}
                  </span>
                </div>
                <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.76rem', color: '#854d0e' }}>
                  Rituparna was within ~1% accuracy! Nala dropped his weapon and bowed to the power of Saṅkhyāna.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Multiplier & Stat Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', margin: '1.25rem 0 1rem 0' }}>
          <div style={{ background: '#ffffff', borderRadius: '10px', padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Canopy Multiplier</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f766e' }}>×{multiplier}</div>
          </div>
          <div style={{ background: '#ffffff', borderRadius: '10px', padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Estimated Leaves</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>{estimatedLeaves}</div>
          </div>
          <div style={{ background: '#ffffff', borderRadius: '10px', padding: '0.75rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Estimated Fruits</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#b45309' }}>{estimatedFruits}</div>
          </div>
        </div>

        {/* Slider: Sampling Fraction (Number of Twigs) */}
        <div style={{ background: '#ffffff', borderRadius: '10px', padding: '0.9rem 1.25rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label htmlFor="sampling-fraction-slider" style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>
              Sampling Fraction (Number of Twigs)
            </label>
            <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f766e' }}>
              {numTwigsSampled} / 5 Twigs ({numTwigsSampled * 20}%)
            </span>
          </div>
          <input
            id="sampling-fraction-slider"
            type="range"
            min="1"
            max="5"
            step="1"
            value={numTwigsSampled}
            onChange={(e) => setNumTwigsSampled(Number(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.25rem' }}>
            <span>1 Twig (High variance, fastest)</span>
            <span>3 Twigs (Moderate sample)</span>
            <span>5 Twigs (Full census, 0% variance)</span>
          </div>
        </div>
      </div>

      <TermPanel terms={RITUPARNA_TERMS} />
      <ChallengeList items={RITUPARNA_CHALLENGES} title="Akṣahṛdaya & Sampling Challenges" />

      {/* ===================================================================
          THE ANALYTICAL MIND OF ANCIENT INDIA:
          From Vedic Combinatorics to Statistical Sampling
         =================================================================== */}
      <section
        className="vl-panel"
        style={{
          marginTop: '2rem',
          background: 'linear-gradient(180deg, #090e17 0%, #0d1527 100%)',
          color: '#f8fafc',
          border: '1.5px solid #0d9488',
          borderRadius: '20px',
          padding: '1.85rem',
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35)',
        }}
        aria-label="The Analytical Mind of Ancient India"
      >
        {/* Monograph Header */}
        <div
          style={{
            borderBottom: '1px solid rgba(20, 184, 166, 0.25)',
            paddingBottom: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.85rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 800,
                color: '#2dd4bf',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '0.35rem',
              }}
            >
              प्राचीन-भारतस्य विश्लेषणात्मक-प्रज्ञा · Epistemology &amp; Exact Sciences
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '1.45rem',
                fontWeight: 900,
                color: '#fef08a',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
              }}
            >
              <span>📐</span> The Analytical Mind of Ancient India: From Vedic Combinatorics to Statistical Sampling
            </h3>
          </div>
          <span
            style={{
              fontSize: '0.8rem',
              background: 'rgba(13, 148, 136, 0.2)',
              color: '#5eead4',
              padding: '0.35rem 0.75rem',
              borderRadius: '8px',
              border: '1px solid rgba(45, 212, 191, 0.35)',
              fontWeight: 700,
            }}
          >
            Mahābhārata · Arthaśāstra · Chandaḥśāstra · Aṣṭādhyāyī
          </span>
        </div>

        <p style={{ fontSize: '0.94rem', color: '#cbd5e1', lineHeight: 1.65, marginTop: 0, marginBottom: '1.5rem' }}>
          Long before the development of modern probability theory and inferential statistics in seventeenth-century Europe,
          thinkers in ancient India were wrestling with quantitative estimation, empirical record-keeping, and discrete mathematics.
          Far from being confined to mysticism or speculative philosophy, classical Sanskrit scholarship systematically employed
          structural and statistical thinking in statecraft, literature, and generative linguistics.
        </p>

        {/* 4 Pillars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.4rem' }}>
          {/* Pillar 1: Rituparna's Tree */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(20, 184, 166, 0.3)',
              padding: '1.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>🌳</span>
              <h4 style={{ margin: 0, color: '#5eead4', fontSize: '1.08rem', fontWeight: 800 }}>
                1. Rituparna’s Tree: The World’s Earliest Statistical Sampling
              </h4>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
              The most vivid narrative precursor to statistical estimation appears in the <em>Nalopākhyāna</em> (the story of Nala and Damayanti) in the <em>Mahābhārata</em> (Vana Parva, ch. 72).
              While traveling through the forest, King Rituparna of Ayodhya encounters Prince Nala beside a sprawling Vibhītaka (<em>Terminalia bellirica</em>) tree and boldly deduces the entire population of leaves and fruits:
            </p>

            {/* Formula Box */}
            <div
              style={{
                background: 'rgba(2, 44, 34, 0.75)',
                border: '1px solid #14b8a6',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                textAlign: 'center',
                margin: '0.75rem 0',
                color: '#fef08a',
                fontSize: '0.88rem',
                fontWeight: 700,
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              Total Count ≈ (Sample Count in Branch) × (Canopy Volume / Branch Volume)
            </div>

            <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: '#67e8f9' }}>The Methodology:</strong> Rituparna isolates a single representative branch, counts its leaves and nuts, and scales it by the estimated ratio of the branch to the canopy.
              </li>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: '#fde047' }}>The Empirical Verification:</strong> Skeptical of such an impossible calculation, Nala halts the chariot and meticulously counts every fruit on the felled tree, discovering Rituparna’s estimate was remarkably accurate!
              </li>
              <li>
                <strong style={{ color: '#a78bfa' }}>The Conceptual Link:</strong> Rituparna attributes his ability to <em>Saṅkhyāna</em> (the science of numbers and calculation) and connects it directly to mastery of dice gambling (<em>Akṣahṛdaya</em>)—demonstrating that ancient thinkers understood the practical link between probabilistic estimation and randomness.
              </li>
            </ul>
          </div>

          {/* Pillar 2: Kautilya's Arthashastra */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              padding: '1.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>⚖️</span>
              <h4 style={{ margin: 0, color: '#fde047', fontSize: '1.08rem', fontWeight: 800 }}>
                2. Quantitative Statecraft in Kauṭilya’s Arthaśāstra
              </h4>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.85rem' }}>
              Written in the 4th century BCE, Kauṭilya’s <em>Arthaśāstra</em> provides a masterclass in administrative data compilation, actuarial accounting, and risk management:
            </p>

            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#fde047' }}>Census &amp; Demographic Tracking:</strong> The royal bureaucracy (<em>Gopas</em>) was tasked with collecting empirical data on every village: household counts, occupations, caste distribution, land yields, domestic animals, and tax revenues.
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: '#f87171' }}>Risk Premiums &amp; Tiered Interest Rates:</strong> Rather than charging flat rates of interest, Kauṭilya instituted a risk-adjusted model. Standard commercial loans were set at 15% annually, but high-risk maritime trade ventures—subject to shipwrecks and piracy—were assigned rates as high as 240% to account for default risk.
              </li>
              <li>
                <strong style={{ color: '#38bdf8' }}>Asset Protection &amp; Diversification:</strong> Merchants were explicitly instructed to divide cargo across multiple carriers to prevent catastrophic loss, establishing an early doctrine of portfolio diversification.
              </li>
            </ul>
          </div>

          {/* Pillar 3: Pingala's Chandaḥśāstra */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              padding: '1.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>📜</span>
              <h4 style={{ margin: 0, color: '#c4b5fd', fontSize: '1.08rem', fontWeight: 800 }}>
                3. Piṅgala’s Chandaḥśāstra: Binary Systems &amp; Combinatorics
              </h4>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.75rem' }}>
              In the study of Sanskrit poetic meters (<em>chandas</em>), syllables are classified into two binary states: light (<em>laghu</em>, ◡ = 0) and heavy (<em>guru</em>, — = 1). In the 2nd–3rd century BCE, Ācārya Piṅgala computed every possible combination of meters of length <em>n</em>:
            </p>

            {/* Table */}
            <div style={{ overflowX: 'auto', marginBottom: '0.75rem' }}>
              <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse', color: '#cbd5e1' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: '#fef08a', textAlign: 'left' }}>
                    <th style={{ padding: '0.35rem 0.5rem' }}>Ancient Technique</th>
                    <th style={{ padding: '0.35rem 0.5rem' }}>Modern Equivalent</th>
                    <th style={{ padding: '0.35rem 0.5rem' }}>Mathematical Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '0.35rem 0.5rem', color: '#67e8f9', fontWeight: 700 }}>प्रस्तार (Prastāra)</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Exhaustive Binary Permutations (2ⁿ)</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Systematically enumerating all meter states</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <td style={{ padding: '0.35rem 0.5rem', color: '#67e8f9', fontWeight: 700 }}>सङ्ख्या (Saṅkhyā)</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Total Combinations / Powers of 2</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Total meters for n syllables</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.35rem 0.5rem', color: '#fde047', fontWeight: 700 }}>मेरुप्रस्तार (Meruprastāra)</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Pascal’s Triangle / Binomial Coefficients</td>
                    <td style={{ padding: '0.35rem 0.5rem' }}>Calculating combinations (ⁿCₖ) with k long syllables</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>
              Piṅgala’s <em>Meruprastāra</em> preceded Blaise Pascal’s triangle by over a millennium (described later in detail by Halāyudha in the 10th century CE) and formed the foundational bedrock of combinatorial counting.
            </p>
          </div>

          {/* Pillar 4: Panini's Ashtadhyayi */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              borderRadius: '14px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              padding: '1.35rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.3rem' }}>💻</span>
              <h4 style={{ margin: 0, color: '#93c5fd', fontSize: '1.08rem', fontWeight: 800 }}>
                4. Algorithmic Precision in Pāṇini’s Aṣṭādhyāyī: The Ancient Compiler
              </h4>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.55, margin: '0 0 0.75rem' }}>
              In the 5th–4th century BCE, the grammarian Pāṇini created a generative framework of roughly 4,000 rules (<em>sūtras</em>).
              In 1967, computer scientist P.Z. Ingerman proposed renaming BNF (Backus-Naur Form) to the <strong>Pāṇini-Backus Form</strong> because Pāṇini’s generative meta-syntax maps directly onto modern Context-Free Grammars (CFGs):
            </p>

            {/* BNF Code Snippet */}
            <pre
              style={{
                background: '#030712',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                borderRadius: '8px',
                padding: '0.65rem 0.85rem',
                fontSize: '0.78rem',
                color: '#38bdf8',
                fontFamily: 'ui-monospace, monospace',
                margin: '0.5rem 0 0.75rem',
                overflowX: 'auto',
                lineHeight: 1.45,
              }}
            >
              <code>{`(* Paninian production rule in BNF style *)
<Sanskrit_Word>        ::= <Base_Root> <Morphological_Suffix>
<Morphological_Suffix> ::= <Internal_Transformation> | <Context_Modifier>`}</code>
            </pre>

            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: '#93c5fd' }}>Context-Sensitive Rewriting:</strong> Rules take the form of <code>A → B in environment of C</code>, anticipating lexical scope.
              </li>
              <li style={{ marginBottom: '0.35rem' }}>
                <strong style={{ color: '#38bdf8' }}>Inheritance &amp; Ellipsis (Anuvṛtti):</strong> Conditions flow downward until explicitly overwritten, optimizing memory and data compression.
              </li>
              <li>
                <strong style={{ color: '#fde047' }}>Deterministic Conflict Resolution:</strong> Rule precedence hierarchy (<em>Utsarga</em> general vs <em>Apavāda</em> exception) prevents syntax ambiguity and compiler halts.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RituparnaSampling;
