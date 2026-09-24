import React from 'react';
import GunitaaksharaGuide from './GunitaaksharaGuide';

const BARAKHADI_ROWS = [
  {
    vowel: 'अ (No extra mark)',
    kaFormula: 'क + अ',
    kaOut: 'क (ka)',
    maFormula: 'म + अ',
    maOut: 'म (ma)',
  },
  {
    vowel: 'आ (Add side bar ा)',
    kaFormula: 'क + आ',
    kaOut: 'का (kā)',
    maFormula: 'म + आ',
    maOut: 'मा (mā)',
  },
  {
    vowel: 'इ (Left side hook ि)',
    kaFormula: 'क + इ',
    kaOut: 'कि (ki)',
    maFormula: 'म + इ',
    maOut: 'मि (mi)',
  },
  {
    vowel: 'ई (Right side hook ी)',
    kaFormula: 'क + ई',
    kaOut: 'की (kī)',
    maFormula: 'म + ई',
    maOut: 'मी (mī)',
  },
  {
    vowel: 'उ (Bottom left loop ु)',
    kaFormula: 'क + उ',
    kaOut: 'कु (ku)',
    maFormula: 'म + उ',
    maOut: 'मु (mu)',
  },
  {
    vowel: 'ऊ (Bottom right tail ू)',
    kaFormula: 'क + ऊ',
    kaOut: 'कू (kū)',
    maFormula: 'म + ऊ',
    maOut: 'मू (mū)',
  },
  {
    vowel: 'ऋ (Bottom crescent ृ)',
    kaFormula: 'क + ऋ',
    kaOut: 'कृ (kṛ)',
    maFormula: 'म + ऋ',
    maOut: 'मृ (mṛ)',
  },
  {
    vowel: 'ए (Single overhead flag े)',
    kaFormula: 'क + ए',
    kaOut: 'के (ke)',
    maFormula: 'म + ए',
    maOut: 'मे (me)',
  },
  {
    vowel: 'ऐ (Double overhead flag ै)',
    kaFormula: 'क + ऐ',
    kaOut: 'कै (kai)',
    maFormula: 'म + ऐ',
    maOut: 'मै (mai)',
  },
  {
    vowel: 'ओ (Bar + single flag ो)',
    kaFormula: 'क + ओ',
    kaOut: 'को (ko)',
    maFormula: 'म + ओ',
    maOut: 'मो (mo)',
  },
  {
    vowel: 'औ (Bar + double flag ौ)',
    kaFormula: 'क + औ',
    kaOut: 'कौ (kau)',
    maFormula: 'म + औ',
    maOut: 'मौ (mau)',
  },
  {
    vowel: 'अं (Overhead dot ं)',
    kaFormula: 'क + अं',
    kaOut: 'कं (kaṁ)',
    maFormula: 'म + अं',
    maOut: 'मं (maṁ)',
  },
  {
    vowel: 'अः (Side dots ः)',
    kaFormula: 'क + अः',
    kaOut: 'कः (kaḥ)',
    maFormula: 'म + अः',
    maOut: 'मः (maḥ)',
  },
];

const SoundTeamsArticle: React.FC = () => {
  return (
    <article className="sound-teams">
      <p className="sound-teams-intro">
        All human speech sounds divide into <strong>5 distinct teams</strong>. Every letter on your
        chart finds a squad — and each squad has a special job in Bārakhadī.
      </p>

      <section className="sound-teams-section" aria-labelledby="team-vowels">
        <h3 id="team-vowels" className="sound-teams-heading">
          🌟 Team 1: स्वर (Vowels) — The Solo Singers
        </h3>
        <p>
          These are the solo superstars of the language. They can be sung all by themselves without
          your tongue, teeth, or lips blocking the air.
        </p>
        <ul>
          <li>
            <strong>Short vowels (Hrasva — 1 beat):</strong> अ (a), इ (i), उ (u), ऋ (ṛ).
          </li>
          <li>
            <strong>Long vowels (Dīrgha — 2 beats):</strong> आ (ā), ई (ī), ऊ (ū), ए (e), ओ (o).
          </li>
        </ul>
        <p>
          <strong>Grid count:</strong> There are <strong>13 vowels</strong> in total on your chart
          (like a, ā, i, ī, u, ū…).
        </p>
        <p>
          <strong>Bārakhadī role:</strong> These vowels turn into secret codes called{' '}
          <strong>mātrās</strong> — the little hats, flags, or hooks you draw around a letter — to
          change how a consonant sounds!
        </p>
      </section>

      <section className="sound-teams-section" aria-labelledby="team-consonants">
        <h3 id="team-consonants" className="sound-teams-heading">
          🛠️ Team 2: व्यंजन (Consonants) — The Core Grid
        </h3>
        <p>
          These sounds are trapped inside your mouth until a vowel comes to rescue them! Try saying
          a pure &quot;k&quot; without adding an &quot;uh&quot; at the end — it&apos;s almost
          impossible. They need vowels to be spoken out loud.
        </p>
        <p>They are arranged strictly by mouth zones:</p>
        <ul>
          <li>
            <strong>Zone 1 (Throat):</strong> क (ka), ग (ga) → IPA: [k], [g]
          </li>
          <li>
            <strong>Zone 2 (Ceiling):</strong> च (ca), ज (ja) → IPA: [c], [ɟ]
          </li>
          <li>
            <strong>Zone 3 (Roof Peak / Retroflex):</strong> ट (ṭa), ड (ḍa) → IPA: [ʈ], [ɖ] (tongue
            tip flips backward)
          </li>
          <li>
            <strong>Zone 4 (Teeth):</strong> त (ta), द (da) → IPA: [t̪], [d̪]
          </li>
          <li>
            <strong>Zone 5 (Lips):</strong> प (pa), ब (ba) → IPA: [p], [b]
          </li>
        </ul>
        <p>
          <strong>Grid count:</strong> There are <strong>33 consonants</strong> in total (from Ka
          to Ha).
        </p>
        <p>
          <strong>Bārakhadī role:</strong> These are the base characters that get modified by the
          vowel signs.
        </p>
      </section>

      <section className="sound-teams-section" aria-labelledby="team-sliders">
        <h3 id="team-sliders" className="sound-teams-heading">
          🔀 Team 3: अन्तःस्थ (Semivowels) — The Sliders
        </h3>
        <p>
          These are the cool hybrid sounds caught right between vowels and consonants — smooth,
          sliding transitions.
        </p>
        <p>
          <strong>The four:</strong> य (ya), र (ra), ल (la), व (va).
        </p>
        <p>
          <strong>Playful secret:</strong> They are hidden vowels in disguise! Say the vowel{' '}
          <em>i</em> and the vowel <em>a</em> really fast together (i-a… i-a… i-a) — it
          automatically turns into the semivowel <strong>य (ya)</strong>!
        </p>
      </section>

      <section className="sound-teams-section" aria-labelledby="team-hissers">
        <h3 id="team-hissers" className="sound-teams-heading">
          💨 Team 4: ऊष्म (Sibilants &amp; Aspirates) — The Hissers
        </h3>
        <p>
          These are the hot, hissing sounds made by squeezing your breath through a narrow gap in
          your mouth — a continuous flow of warm air.
        </p>
        <p>
          <strong>The four:</strong> श (śa), ष (ṣa), स (sa), and the deep breath ह (ha).
        </p>
        <p>
          <strong>Playful secret:</strong> The word <em>ūṣma</em> literally means &quot;heat&quot;
          or &quot;steam.&quot; Hold your hand in front of your mouth and say &quot;Haaaa&quot; —
          you will feel a blast of hot air!
        </p>
      </section>

      <section className="sound-teams-section" aria-labelledby="team-fusion">
        <h3 id="team-fusion" className="sound-teams-heading">
          ⚔️ Team 5: संयुक्त (Conjuncts) — The Fusion Blocks
        </h3>
        <p>
          What happens when two or more tough consonants crash into each other without a vowel to
          separate them? They fuse together into a super-character!
        </p>
        <ul>
          <li>
            <strong>Example:</strong> त् (t) + र् (r) + अ (a) = <strong>त्र (tra)</strong>
          </li>
          <li>
            <strong>Another fusion:</strong> When क (ka) fuses with ष (ṣa), they merge into the new
            shape <strong>क्ष (kṣa)</strong> — like the beginning of <em>Kshatriya</em> or{' '}
            <em>Kshama</em> (forgiveness).
          </li>
        </ul>
      </section>

      {/* Comprehensive Guṇitākṣarāṇi Masterclass & Symbols Guide */}
      <GunitaaksharaGuide />

      <section className="sound-teams-section" aria-labelledby="barakhadi-matrix">
        <h3 id="barakhadi-matrix" className="sound-teams-heading">
          The Matrix in Action: The Bārakhadī Grid
        </h3>
        <p>
          When you build the actual Bārakhadī rows, you take a base consonant from Team 2 and
          steadily march it across every structural vowel sign from Team 1.
        </p>
        <p>Here is a full row using क (Ka) and म (Ma):</p>

        <div className="sound-teams-table-wrap" role="region" aria-label="Bārakhadī grid for ka and ma">
          <table className="sound-teams-table">
            <thead>
              <tr>
                <th>Vowel Mātrā Code</th>
                <th>The &quot;Ka&quot; Formula</th>
                <th>Output Sound</th>
                <th>The &quot;Ma&quot; Formula</th>
                <th>Output Sound</th>
              </tr>
            </thead>
            <tbody>
              {BARAKHADI_ROWS.map((row) => (
                <tr key={row.vowel}>
                  <td>{row.vowel}</td>
                  <td className="sound-teams-deva">{row.kaFormula}</td>
                  <td className="sound-teams-deva">{row.kaOut}</td>
                  <td className="sound-teams-deva">{row.maFormula}</td>
                  <td className="sound-teams-deva">{row.maOut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="sound-teams-card-list" aria-label="Bārakhadī grid as cards">
          {BARAKHADI_ROWS.map((row) => (
            <li key={`card-${row.vowel}`} className="sound-teams-card-item">
              <div className="sound-teams-card-vowel">{row.vowel}</div>
              <div className="sound-teams-card-pair">
                <span>
                  {row.kaFormula} → <strong>{row.kaOut}</strong>
                </span>
                <span>
                  {row.maFormula} → <strong>{row.maOut}</strong>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default SoundTeamsArticle;
