import React, { useState } from 'react';
import { PadarthaVisualizer, type PadarthaKey, PADARTHA_METAS } from './scienceLab/PadarthaVisualizer';
import { playPronunciation } from '../utils/pronunciation';

export const SixPadarthas: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<PadarthaKey>('dravya');

  return (
    <div style={{ marginTop: '40px', padding: '24px', background: '#090e17', borderRadius: '18px', border: '1.5px solid rgba(56, 189, 248, 0.28)', color: '#e0e1dd', boxShadow: '0 10px 35px rgba(0,0,0,0.6)' }}>
      <div style={{ borderBottom: '1.5px solid rgba(56, 189, 248, 0.2)', paddingBottom: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'inline-block', fontSize: '0.72rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: 800, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '999px', padding: '0.2rem 0.65rem', marginBottom: '0.5rem' }}>
          PHYSICAL ONTOLOGY & NATURAL PHILOSOPHY
        </div>
        <h3 style={{ color: '#f8fafc', margin: '0 0 6px 0', fontSize: '1.35rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏛️ The Six Padārthas Gateway (वैशेषिक षट्-पदार्थाः)</span>
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0, lineHeight: 1.55 }}>
          Explore Sage Kaṇāda's rigorous ontological taxonomy: 6 fundamental categories of reality mapping physical substances, energetic qualities, kinetic motion, universal symmetries, quantum uniqueness, and eternal structural inherence.
        </p>
      </div>

      {/* 🌟 Dynamic 60fps Animated Holographic Gateway Visualizer */}
      <PadarthaVisualizer
        initialPadartha={selectedKey}
        onSelectPadartha={setSelectedKey}
        onPronounce={(word) => playPronunciation(word)}
      />

      {/* Grid of the 6 Categories with interactive selection */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', marginTop: '20px' }}>
        {(Object.keys(PADARTHA_METAS) as PadarthaKey[]).map((key) => {
          const p = PADARTHA_METAS[key];
          const isSelected = selectedKey === key;
          return (
            <div
              key={key}
              onClick={() => {
                setSelectedKey(key);
                playPronunciation(p.dev);
              }}
              style={{
                background: isSelected ? 'rgba(15, 28, 48, 0.95)' : '#0b1322',
                padding: '16px',
                borderRadius: '12px',
                border: isSelected ? `2px solid ${p.color}` : '1.5px solid rgba(148, 163, 184, 0.18)',
                boxShadow: isSelected ? `0 0 20px ${p.glowColor}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.25rem' }}>{p.icon}</span>
                <span style={{ fontSize: '0.7rem', color: p.color, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace' }}>
                  {p.badge}
                </span>
              </div>
              <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc', fontSize: '1rem', fontWeight: 800 }}>
                <span style={{ color: p.color }}>{p.dev}</span> · {p.iast} ({p.en})
              </h4>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.84rem', lineHeight: '1.5', color: '#cbd5e1' }}>
                {p.principle}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid rgba(148, 163, 184, 0.15)', paddingTop: '8px' }}>
                <span>{isSelected ? '👉 Active Visual' : 'Click to Visualize'}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation(p.dev);
                  }}
                  style={{ background: 'transparent', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}
                >
                  🔊 Pronounce
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SixPadarthas;
