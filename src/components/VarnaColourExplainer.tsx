export default function VarnaColourExplainer() {
  return (
    <section
      aria-label="Why is the alphabet called Varnamala?"
      style={{
        margin: '12px 0 18px', padding: '16px 18px', borderRadius: 16,
        background: 'linear-gradient(135deg,#fff7ed,#fef3c7)', border: '2px solid #f59e0b',
        display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', color: '#3f2a12',
      }}
    >
      <img
        src="/images/varna-colour-mother-child.jpg"
        alt="A little child asks her mother: is varṇa the same as colour? Why is the alphabet called Varṇamālā?"
        loading="lazy"
        style={{ width: 'min(100%, 300px)', borderRadius: 12, flex: '0 0 auto' }}
      />
      <div style={{ flex: '1 1 280px', lineHeight: 1.55 }}>
        <h3 style={{ margin: '0 0 8px', color: '#92400e' }}>🌈 वर्ण = colour? Why is it called वर्णमाला?</h3>
        <p style={{ margin: '0 0 6px' }}><strong>Child:</strong> “Amma, in the colour game, <em>varṇa</em> means colour. Why are our letters called <em>Varṇamālā</em>?”</p>
        <p style={{ margin: '0 0 6px' }}><strong>Mother:</strong> “<strong>Varṇamālā (वर्णमाला)</strong> means a <em>garland of letters</em> — a garland of sounds.
          <strong> Varṇa (वर्ण)</strong> is a letter or sound, and <strong>Mālā (माला)</strong> is a garland.”</p>
        <p style={{ margin: '0 0 6px' }}>“In Sanskrit grammar, a varṇa is the <strong>smallest sound you can't break further</strong> — like अ, क, म.
          The word comes from the root <strong>vṛ (वृ)</strong>. It can mean ‘to cover’ or ‘to choose’, but in grammar it is about
          <strong> sorting, counting and marking out</strong> — each varṇa is its own <em>category of sound</em>.”</p>
        <p style={{ margin: '0 0 6px' }}>“So Varṇamālā is a <strong>neat chain of sound-categories</strong>. And just like we sort sounds, we also sort what we see —
          so the same word <em>varṇa</em> also means <strong>colour</strong>: रक्तवर्णः (red), नीलवर्णः (blue)!”</p>
        <p style={{ margin: '8px 0 0', fontSize: 14 }}>
          🎨 Try the <a href="/vignana-lab">colour game in Wonder Playground</a> · 🐎 Read <a href="/sapta-varna">Sapta-varṇa: Seven Horses of the Sun</a>
        </p>
      </div>
    </section>
  );
}
