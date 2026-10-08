import React from 'react';

export const SixPadarthas: React.FC = () => {
  const padarthas = [
    { title: "🪨 Dravya (Substance)", desc: "The foundational substrate of reality. Includes the 9 eternal substances: Earth, Water, Fire, Air, Space, Time, Direction, Soul, and Mind." },
    { title: "🎨 Guṇa (Quality)", desc: "The static attributes inherent in Dravya. Includes properties like color, taste, smell, hot/cold metrics, and quantitative atomic volume." },
    { title: "⚡ Karma (Action/Motion)", desc: "The kinetic force belonging exclusively to material substances, causing physical separation, compression, and velocity displacement." },
    { title: "🌀 Sāmānya (Generality)", desc: "The universal template essence or class properties shared across identical entities (e.g., what makes all earth paramāṇus share Earthness)." },
    { title: "Viśeṣa (Particularity)", desc: "The ultimate individualizing factor that distinguishes identical eternal atoms from one another at the microscopic boundary." },
    { title: "🔗 Samavāya (Inherence)", desc: "The eternal, inseparable relationship connecting qualities or actions permanently to their primary base substance." }
  ];

  return (
    <div style={{ marginTop: '40px', padding: '20px', background: '#0d1b2a', borderRadius: '8px', border: '1px solid #1b263b', color: '#e0e1dd' }}>
      <h3 style={{ color: '#00b4d8', borderBottom: '2px solid #1b263b', paddingBottom: '10px' }}>🏛️ The Six Padārthas Gateway (वैशेषिक षट्-पदार्थाः)</h3>
      <p style={{ color: '#a8dadc', fontSize: '0.95rem' }}>Explore the ontological taxonomy framework of ancient Indian atomic physics:</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', marginTop: '20px' }}>
        {padarthas.map((p, idx) => (
          <div key={idx} style={{ background: '#1b263b', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #ffd700' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#ffd700' }}>{p.title}</h4>
            <p style={{ margin: '0', fontSize: '0.88rem', lineHeight: '1.5', color: '#e0e1dd' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
