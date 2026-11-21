import React, { useState } from 'react';
import type { LabSegmentId } from './common';

export interface StemVariableSpec {
  symbol: string;
  label: string;
  unit: string;
}

export interface StemBlueprintMeta {
  domainTag: string;
  formula: string;
  modernLaw: string;
  indianSource: string;
  sanskritSutra: string;
  sutraGloss: string;
  realWorldApp: string;
  experimentHint: string;
  winTelemetry: string;
  curriculumTag: string;
  controlMechanics: string;
  variables: StemVariableSpec[];
  difficulty: 1 | 2 | 3;
}

export const STEM_BLUEPRINTS: Record<LabSegmentId, StemBlueprintMeta> = {
  'preschool-wonder': {
    domainTag: 'Early STEM · Sensory',
    formula: 'Shape + Color + Sound → Pattern',
    modernLaw: 'Early Spatial Reasoning, Phonetics & Categorization',
    indianSource: 'Bāla-Saṁskṛta-Prajñā & Ṛtu-Cakra',
    sanskritSutra: 'रूपं वर्णः स्वरश्चैव बालानां प्रथमा गतिः',
    sutraGloss: 'Form, color, and sound are the first pathways of a child’s inquiry.',
    realWorldApp: 'Builds foundational observation, rhythm, and map literacy for ages 3–6.',
    experimentHint: 'Tap any of the 24 sensory games and listen to the gentle Sanskrit pronunciation.',
    winTelemetry: 'Explore 3 sensory stations & match shapes, colors, or regional fauna',
    curriculumTag: 'NEP 2020 Foundational Stage (Ages 3–6)',
    controlMechanics: 'Touch & Audio Discovery Tiles',
    variables: [
      { symbol: 'Ākāra', label: 'Geometric Form', unit: '8 Archetypes' },
      { symbol: 'Varṇa', label: 'Color & Phoneme', unit: 'Primary → Mixed' },
      { symbol: 'Ṛtu', label: 'Seasonal Cycle', unit: '6 Indian Seasons' },
    ],
    difficulty: 1,
  },
  paramanu: {
    domainTag: 'Atomic Physics',
    formula: '2 Paramāṇu → 1 Dvyaṇuka · 3 Dvyaṇuka → 1 Tryaṇuka',
    modernLaw: 'Atomic Bonding, Valence Pairing & Molecular Aggregation',
    indianSource: 'Kaṇāda · Vaiśeṣika Sūtra (c. 600 BCE)',
    sanskritSutra: 'सदकारणवन्नित्यम् — तद्भ्याम् द्व्यणुकम् त्र्यणुकं च',
    sutraGloss: 'The uncaused eternal atom pairs into dyads and triads to cross into visible matter.',
    realWorldApp: 'Explains how invisible sub-nanometer atoms combine into visible matter and crystal lattices.',
    experimentHint: 'Pair 2 single atoms into a dyad (Dvyaṇuka), then fuse 3 dyads to synthesize the first visible speck (Trasareṇu).',
    winTelemetry: 'Synthesize 1 Tryaṇuka (6 Paramāṇus) & balance Pṛthivī/Ap/Tejas/Vāyu qualities',
    curriculumTag: 'NCERT Class 9 Science · Atoms & Molecules',
    controlMechanics: 'Drag-and-Fuse Particle Reactor',
    variables: [
      { symbol: 'N_p', label: 'Paramāṇu Count', unit: '1 → 6 Atoms' },
      { symbol: 'Guṇa', label: 'Elemental Quality', unit: '4 Mahābhūtas' },
      { symbol: 'd_eff', label: 'Lattice Scale', unit: 'Sub-nm → Visible' },
    ],
    difficulty: 2,
  },
  'asato-ma': {
    domainTag: 'Thermodynamics · Mass',
    formula: 'Σm_initial = Σm_final = 100.000 g',
    modernLaw: 'Law of Conservation of Mass & Phase Transitions',
    indianSource: 'Rasaśāstra Andha-Mūṣā (Sealed Crucible) & Satkāryavāda',
    sanskritSutra: 'नासतो विद्यते भावो नाभावो विद्यते सतः',
    sutraGloss: 'From non-existence nothing arises; that which truly exists never ceases to be.',
    realWorldApp: 'Closed-system chemical reactors, metallurgical assaying, and atmospheric water cycles.',
    experimentHint: 'Heat ice through melting, boiling, and combustion inside the sealed crucible while monitoring the precision balance.',
    winTelemetry: 'Cycle Solid → Liquid → Vapor while verifying Δm = 0.000 g invariance',
    curriculumTag: 'NCERT Class 9 Chemistry · Matter & Mass Conservation',
    controlMechanics: 'Thermal Burner Slider & Viveka X-Ray Scanner',
    variables: [
      { symbol: 'T', label: 'Crucible Temp', unit: '-20°C → 600°C' },
      { symbol: 'Σm', label: 'Total Sealed Mass', unit: '100.000 g (Invariant)' },
      { symbol: 'E_k', label: 'Molecular Agitation', unit: 'J / mol' },
    ],
    difficulty: 1,
  },
  prakriti: {
    domainTag: 'Ecology · Homeostasis',
    formula: 'dN/dt = rN(1 − N/K) · Samadoṣa Equilibrium',
    modernLaw: 'Ecosystem Carrying Capacity & Negative Feedback Loops',
    indianSource: 'Āyurveda Tridoṣa & Taittirīya Upaniṣad Food Cycle',
    sanskritSutra: 'अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः',
    sutraGloss: 'Living beings arise from food; food arises from rain and balanced ecological cycles.',
    realWorldApp: 'Climate resilience, sustainable watershed agriculture, and physiological homeostasis.',
    experimentHint: 'Shift rainfall and solar temperature sliders, then rebalance producers, herbivores, and decomposers.',
    winTelemetry: 'Hold Biosphere Stability Index ≥ 85% across 4 seasonal perturbations',
    curriculumTag: 'NCERT Class 7–10 Biology · Our Environment & Ecosystems',
    controlMechanics: 'Multi-Trophic Sliders & Climate Perturbation Dial',
    variables: [
      { symbol: 'K', label: 'Carrying Capacity', unit: 'Biomass Index' },
      { symbol: 'V-P-K', label: 'Tridoṣa Flux', unit: 'Wind · Heat · Moisture' },
      { symbol: 'S_bio', label: 'Homeostasis Score', unit: '0% → 100%' },
    ],
    difficulty: 1,
  },
  chaturyoni: {
    domainTag: 'Bio-Physics · Taxonomy',
    formula: 'V_m(t) = ΔV · e^(−t/τ) (Action Potential)',
    modernLaw: 'Plant Electrophysiology & Biological Classification',
    indianSource: 'Vṛkṣāyurveda Chaturyoni & Sir J.C. Bose Crescograph',
    sanskritSutra: 'अण्डजं जीवजं चैव उद्भिज्जं स्वेदजं तथा',
    sutraGloss: 'Life manifests across four generative matrices: egg-born, womb-born, sprout-born, and moisture-born.',
    realWorldApp: 'Bio-sensors, neuro-signaling, agricultural stress telemetry, and biodiversity mapping.',
    experimentHint: 'Classify organisms into the 4 Yonis, then deliver a gentle stimulus on the Crescograph to record plant microvolt pulses.',
    winTelemetry: 'Sort 8 species accurately & capture a 15 mV Mimosa pudica action potential curve',
    curriculumTag: 'NCERT Class 10–11 Biology · Control, Coordination & Taxonomy',
    controlMechanics: '4-Quadrant Sorter & Oscilloscope Stimulus Probe',
    variables: [
      { symbol: 'V_m', label: 'Membrane Potential', unit: '-70 mV → +20 mV' },
      { symbol: 'τ', label: 'Recovery Constant', unit: 'Milliseconds (ms)' },
      { symbol: 'G', label: 'Crescograph Magnification', unit: '10,000× Optical' },
    ],
    difficulty: 2,
  },
  jyotisha: {
    domainTag: 'Orbital Mechanics',
    formula: 'F = G·m₁m₂ / r²  |  T² ∝ a³',
    modernLaw: 'Newtonian Gravitation & Keplerian Elliptical Orbits',
    indianSource: 'Āryabhaṭīya (499 CE) & Sūrya Siddhānta',
    sanskritSutra: 'अनुलोमगतिर्नौस्थः पश्यत्यचलं विलोमगं यद्वत्',
    sutraGloss: 'Just as a passenger in a boat moving forward sees stationary objects moving backward, so appear the stars from a rotating Earth.',
    realWorldApp: 'Satellite orbit insertion, gravitational slingshots, and synodic eclipse prediction.',
    experimentHint: 'Adjust tangential launch velocity and central mass until the planet settles into a stable closed ellipse.',
    winTelemetry: 'Achieve a stable closed orbit (0.05 ≤ e ≤ 0.60) for 2 full revolutions',
    curriculumTag: 'NCERT Class 9 & 11 Physics · Gravitation & Kepler’s Laws',
    controlMechanics: 'Vector Velocity Launcher & Mass Gravity Wells',
    variables: [
      { symbol: 'v_t', label: 'Tangential Velocity', unit: 'km / s' },
      { symbol: 'e', label: 'Orbital Eccentricity', unit: '0 (Circle) → <1 (Ellipse)' },
      { symbol: 'r', label: 'Radial Distance', unit: 'Astronomical Units (AU)' },
    ],
    difficulty: 2,
  },
  chandrayaan: {
    domainTag: 'Aerospace · Telemetry',
    formula: 'Δv = v_e · ln(m₀ / m_f)  |  a_net = T/m − g_moon',
    modernLaw: 'Powered Lunar Descent & LIBS Atomic Emission Spectroscopy',
    indianSource: 'ISRO Chandrayaan-3 · Shiv Shakti Point Telemetry',
    sanskritSutra: 'सोमयानं चन्द्रतलम् अवतरति — शिवशक्ति-बिन्दुः',
    sutraGloss: 'The lunar craft descends in controlled equilibrium onto the southern polar highlands.',
    realWorldApp: 'Autonomous spacecraft soft landing and remote laser mineral assaying.',
    experimentHint: 'Throttle retro-thrusters smoothly to keep vertical touchdown velocity below 2.0 m/s, then fire the LIBS laser.',
    winTelemetry: 'Soft-land at v_z < 2.0 m/s with fuel > 5% & identify Sulphur (S) + H₂O spectral peaks',
    curriculumTag: 'NCERT Class 11 Physics · Laws of Motion & Atomic Spectra',
    controlMechanics: 'Retro-Thruster Throttle & LIBS Wavelength Spectrometer',
    variables: [
      { symbol: 'v_z', label: 'Vertical Descent Rate', unit: 'Target < 2.0 m/s' },
      { symbol: 'g_m', label: 'Lunar Gravity', unit: '1.62 m/s²' },
      { symbol: 'λ', label: 'LIBS Emission Line', unit: '180 nm → 850 nm' },
    ],
    difficulty: 2,
  },
  'nada-brahman': {
    domainTag: 'Wave Acoustics',
    formula: 'f_n = (n / 2L) · √(T / μ)',
    modernLaw: 'Standing Waves, Harmonics & 2D Chladni Nodal Plates',
    indianSource: 'Nāṭyaśāstra 22 Śrutis & Nāda Brahman',
    sanskritSutra: 'वीणातन्त्रीस्वराणां च प्रमाणं श्रुतिसम्मितम्',
    sutraGloss: 'The pitch ratios of vibrating vīṇā strings are governed by exact invariant harmonic intervals.',
    realWorldApp: 'Architectural acoustics, musical instrument lutherie, and ultrasonic nodal imaging.',
    experimentHint: 'Sweep harmonic mode n = 1 to 5, adjust string tension T, and watch nodal sand patterns lock into geometric yantras.',
    winTelemetry: 'Lock 3 harmonic overtones (n = 2, 3, 4) & reveal symmetric Chladni nodal mandalas',
    curriculumTag: 'NCERT Class 9 & 11 Physics · Sound & Standing Waves',
    controlMechanics: 'Harmonic Node Plucker & 2D Cymatic Plate Resonator',
    variables: [
      { symbol: 'n', label: 'Harmonic Overtone', unit: 'n = 1, 2, 3, 4, 5' },
      { symbol: 'T', label: 'String Tension', unit: 'Newtons (N)' },
      { symbol: 'f_n', label: 'Resonant Frequency', unit: 'Hertz (Hz) · 22 Śrutis' },
    ],
    difficulty: 2,
  },
  'srishti-sthiti-laya': {
    domainTag: 'Field Conservation',
    formula: 'E_total = K + U = Constant',
    modernLaw: 'Conservation of Energy Across Phase-Space System States',
    indianSource: 'Chāndogya Upaniṣad (Uddālaka Āruṇi) & Sāṅkhya',
    sanskritSutra: 'सदेव सोम्येदमग्र आसीदेकमेवाद्वितीयम्',
    sutraGloss: 'In the beginning, this universe was pure conserved Being alone—transforming in form yet invariant in essence.',
    realWorldApp: 'Thermodynamic cycles, phase-space attractors, and closed-loop energy storage.',
    experimentHint: 'Cycle the particle field through Sṛṣṭi (coalescence), Sthiti (orbital dynamic balance), and Laya (dispersion) while tracking total energy.',
    winTelemetry: 'Complete a full Sṛṣṭi → Sthiti → Laya cycle with E_total drift < 0.01%',
    curriculumTag: 'NCERT Class 9 & 11 Physics · Work, Energy & Conservation Laws',
    controlMechanics: 'Phase-Field Attractor & Conservation Energy Gauge',
    variables: [
      { symbol: 'K', label: 'Kinetic Energy', unit: 'Joules (J)' },
      { symbol: 'U', label: 'Potential Field Energy', unit: 'Joules (J)' },
      { symbol: 'E_tot', label: 'Conserved Sum (K + U)', unit: '100.0% Invariant' },
    ],
    difficulty: 2,
  },
  agnibana: {
    domainTag: 'Ballistics · Chemistry',
    formula: 'R = (v₀² · sin 2θ) / g',
    modernLaw: 'Projectile Kinematics & Solid-Propellant Combustion',
    indianSource: 'Śukranīti Agnicūrṇa (5:1:1) & Mysore Iron-Cased Rockets',
    sanskritSutra: 'सुवर्चलवणं पञ्च गन्धकश्चैकभागिकः । अन्तर्धूमविपक्वार्कस्नुह्यादिह्यङ्गारकस्तथा ॥',
    sutraGloss: 'Five parts saltpetre, one part sulphur, and one part charcoal form the propellant charge inside the iron tube.',
    realWorldApp: 'Launch vehicle staging, aerodynamic fin/bamboo-pole stabilization, and stoichiometry.',
    experimentHint: 'Blend the 5:1:1 oxidizer-fuel ratio, choose a hammered-iron chamber pressure, and dial elevation angle θ to hit the target.',
    winTelemetry: 'Calibrate 5:1:1 stoichiometry & hit the 1.8 km range target within ±25 m',
    curriculumTag: 'NCERT Class 11 Physics · Projectile Motion & Stoichiometry',
    controlMechanics: 'Propellant Stoichiometry Mixer & Elevation Quadrant',
    variables: [
      { symbol: 'θ', label: 'Launch Elevation Angle', unit: '15° → 75° (Max R at 45°)' },
      { symbol: 'P_c', label: 'Iron Casing Pressure', unit: 'Up to 80 atm' },
      { symbol: 'v₀', label: 'Burnout Velocity', unit: 'm / s' },
    ],
    difficulty: 2,
  },
  'vedic-geometry': {
    domainTag: 'Constructive Geometry',
    formula: 'c² = a² + b²  |  √2 ≈ 577 / 408',
    modernLaw: 'Area-Preserving Geometric Transformations & Diophantine Approximations',
    indianSource: 'Baudhāyana & Āpastamba Śulbasūtras (c. 800 BCE)',
    sanskritSutra: 'दीर्घचतुरस्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति',
    sutraGloss: 'The diagonal cord of a rectangle produces alone the combined area that the vertical and horizontal sides produce separately.',
    realWorldApp: 'Civil surveying, architectural CAD constraints, and area-invariant mesh morphing.',
    experimentHint: 'Stretch the Rajju (cord) between Śaṅku (pegs) to morph a square altar into an equal-area circle (Caturasra-Maṇḍala) or falcon (Śyena).',
    winTelemetry: 'Construct a 3-4-5 right triangle & complete square-to-circle area preservation (<0.5% error)',
    curriculumTag: 'NCERT Class 8–10 Mathematics · Pythagoras & Mensuration',
    controlMechanics: 'Peg-and-Cord Compass & 8-Archetype Shape Morpher',
    variables: [
      { symbol: 'd', label: 'Diagonal Cord (Akṣṇayā)', unit: 'a·√2 (1.4142156...)' },
      { symbol: 'A', label: 'Conserved Altar Area', unit: '7.5 Sq Puruṣas' },
      { symbol: 'R_c', label: 'Equal-Area Circle Radius', unit: 'a · (2 + √2) / 6' },
    ],
    difficulty: 3,
  },
  'mantra-acoustics': {
    domainTag: 'Phonetics · DSP',
    formula: 'F₁, F₂, F₃ Vocal Formant Resonance',
    modernLaw: 'Acoustic Formant Synthesis, Harmonic Series & Spectral Envelope',
    indianSource: 'Śikṣā & Prātiśākhya 5 Articulation Places (Pañca-Sthāna)',
    sanskritSutra: 'अष्टौ स्थानानि वर्णानामुरः कण्ठः शिरस्तथा । जिह्वामूलं च दन्ताश्च नासिकोष्ठौ च तालु च ॥',
    sutraGloss: 'Eight resonance chambers—chest, throat, roof, tongue-root, teeth, nasal cavity, lips, and palate—shape every phoneme.',
    realWorldApp: 'Speech recognition DSP, acoustic formant synthesis, and linguistic phonology.',
    experimentHint: 'Compare Kaṇṭha (velar), Tālu (palatal), Mūrdhā (retroflex), Danta (dental), and Oṣṭha (labial) formant peaks on the live spectrum.',
    winTelemetry: 'Map all 5 Sthāna articulation zones & verify the 1/n natural harmonic series',
    curriculumTag: 'NCERT Class 11–12 Physics & CS · Waves, Harmonics & Signal Processing',
    controlMechanics: 'Vocal Tract Resonator & FFT Harmonic Spectrum Analyzer',
    variables: [
      { symbol: 'F₁/F₂', label: 'Formant Peaks', unit: '300 Hz → 3,200 Hz' },
      { symbol: 'Mātrā', label: 'Prosodic Duration', unit: '1 (Hrasva) · 2 (Dīrgha) · 3 (Pluta)' },
      { symbol: 'Sthāna', label: 'Articulation Locus', unit: '5 Oral + Nasal Cavities' },
    ],
    difficulty: 3,
  },
  'temple-engineering': {
    domainTag: 'Structural Statics',
    formula: 'ΣF_x = 0, ΣF_y = 0, Στ = 0',
    modernLaw: 'Compressive Load Paths, Seismic Base Isolation & Fractal Self-Similarity',
    indianSource: 'Samarāṅgaṇa Sūtradhāra, Śilpaśāstra & Vāstu Puruṣa Maṇḍala',
    sanskritSutra: 'सन्धिबन्धनयोगेन शिलानां धारणं स्थिरम्',
    sutraGloss: 'Through interlocking mortise-and-tenon stone joints, the towering structure stands unshaken.',
    realWorldApp: 'Seismic-resistant masonry, sand-cushion foundation engineering, and fractal load distribution.',
    experimentHint: 'Assemble interlocking dry-masonry stone courses over a hydro-sand foundation cushion, then trigger a Magnitude 7.0 seismic wave.',
    winTelemetry: 'Keep Śikhara center-of-mass inside the middle-third core during a 7.0 M_w quake test',
    curriculumTag: 'NCERT Class 11 Physics · Equilibrium of Rigid Bodies & Elasticity',
    controlMechanics: 'Corbelled Stone Stacker & Seismic Shake-Table Simulator',
    variables: [
      { symbol: 'Στ', label: 'Overturning Torque', unit: 'kN · m (Target ≈ 0)' },
      { symbol: 'ζ', label: 'Sand-Bed Damping Ratio', unit: '0.15 → 0.35 Seismic Buffer' },
      { symbol: 'N×N', label: 'Vāstu Maṇḍala Grid', unit: '64-Pada (8×8) / 81-Pada (9×9)' },
    ],
    difficulty: 2,
  },
  kautilya: {
    domainTag: 'Systems · Economics',
    formula: 'Net Surplus = Revenue(Kośa) − Risk(Āpad)  |  r_maritime = 20%/mo',
    modernLaw: 'Multi-Variable Resource Optimization & Actuarial Risk Pricing',
    indianSource: 'Kauṭilya Arthaśāstra · Saptāṅga State & Actuarial Interest Model',
    sanskritSutra: 'स्वाम्यमात्यजनपददुर्गकोशदण्डमित्राणि प्रकृतयः',
    sutraGloss: 'Sovereign, ministry, territory-population, fortified infrastructure, treasury, defense, and allies constitute the seven limbs of state.',
    realWorldApp: 'Public finance, actuarial risk pricing, supply-chain resilience, and quantitative policy modeling.',
    experimentHint: 'Balance treasury allocations across agriculture, infrastructure, and trade while pricing overland vs. maritime loan risk.',
    winTelemetry: 'Sustain all 7 Saptāṅga limbs ≥ 70% across 5 fiscal cycles without treasury depletion',
    curriculumTag: 'NCERT Class 11–12 Economics & Applied Math · Risk, Fiscal Policy & Optimization',
    controlMechanics: '7-Limb Saptāṅga Policy Matrix & Actuarial Risk Calculator',
    variables: [
      { symbol: 'Kośa', label: 'Treasury Reserve', unit: 'Paṇas (Silver Standard)' },
      { symbol: 'r_risk', label: 'Actuarial Interest Tier', unit: '1.25% · 5% · 10% · 20% / mo' },
      { symbol: 'S_7', label: 'Saptāṅga Index', unit: '7 Coupled State Variables' },
    ],
    difficulty: 3,
  },
  chandahshastra: {
    domainTag: 'Discrete Math · CS',
    formula: 'N(n) = 2ⁿ  |  C(n, k) = C(n−1, k−1) + C(n−1, k)',
    modernLaw: 'Binary Encoding, Binomial Coefficients (Pascal Triangle) & Fibonacci Recursion',
    indianSource: 'Piṅgala Chandaḥśāstra (c. 300 BCE · Prastāra, Naṣṭa, Uddiṣṭa & Meru)',
    sanskritSutra: 'द्विरर्धे — रूपे शून्ये — द्विः शून्ये — तावदर्धे तद्गुणितम्',
    sutraGloss: 'Halve the exponent and mark zero; when odd, subtract one and multiply—encoding binary powers and fast exponentiation.',
    realWorldApp: 'Digital binary logic, lossless data compression, error-correcting codes, and O(log n) algorithms.',
    experimentHint: 'Toggle Laghu (1/0) and Guru (0/1) syllables to run Piṅgala’s Naṣṭa (index→pattern) and Uddiṣṭa (pattern→index) binary codecs.',
    winTelemetry: 'Decode a 6-syllable Gāyatrī pāda via Naṣṭa/Uddiṣṭa & build 6 rows of Meruprastāra',
    curriculumTag: 'NCERT Class 11–12 Math & CS · Permutations, Binomial Theorem & Binary Logic',
    controlMechanics: 'Laghu-Guru Binary Sequencer & Meruprastāra Pyramid Builder',
    variables: [
      { symbol: 'n', label: 'Syllable Length (Akṣara)', unit: '1 → 8 Bits (2ⁿ States)' },
      { symbol: 'C(n,k)', label: 'Meruprastāra Cell', unit: 'Binomial Coefficient' },
      { symbol: 'F_m', label: 'Mātrāmeru Sum', unit: 'Fibonacci Sequence (1,2,3,5,8...)' },
    ],
    difficulty: 3,
  },
  'ujjain-geodesy': {
    domainTag: 'Geodesy · Solar Optics',
    formula: 'tan(α) = h_gnomon / L_shadow  |  Δt = 4 min / 1° Longitude',
    modernLaw: 'Solar Altitude, Prime Meridian Longitude & Axial Obliquity Drift',
    indianSource: 'Ujjayinī Madhyarekhā (0° Meridian · 75.78° E) & Śaṅku Yantra',
    sanskritSutra: 'लङ्का-उज्जयिनी-कुरुक्षेत्र-मेरुगता मध्यरेखा',
    sutraGloss: 'The prime meridian passes straight from the equator through Ujjayinī and Kurukṣetra to the north pole.',
    realWorldApp: 'Celestial navigation, solar array tilt optimization, and geodetic datum cartography.',
    experimentHint: 'Sweep solar hour and Uttarāyaṇa/Dakṣiṇāyana declination to observe the zero-shadow summer solstice noon at Ujjain.',
    winTelemetry: 'Align the Śaṅku gnomon at Summer Solstice Noon (L_shadow = 0) & compute the +29m IST offset',
    curriculumTag: 'NCERT Class 9–11 Geography & Physics · Geodesy, Time Zones & Solar Geometry',
    controlMechanics: '3D Śaṅku Sundial Gnomon & Meridian Longitude Calibrator',
    variables: [
      { symbol: 'φ', label: 'Ujjain Latitude', unit: '23° 11′ N (Tropic of Cancer)' },
      { symbol: 'L_s', label: 'Noon Shadow Length', unit: '0.00 m at Solstice Zenith' },
      { symbol: 'Δλ', label: 'Meridian Offset (IST)', unit: '82.5°E − 75.78°E = +26m 52s' },
    ],
    difficulty: 3,
  },
  rituparna: {
    domainTag: 'Statistics · Probability',
    formula: 'μ̂ = (1/n) Σ xᵢ  |  SE = σ / √n',
    modernLaw: 'Cluster Sampling, Monte Carlo Estimation & Law of Large Numbers',
    indianSource: 'Mahābhārata Vana Parva · King Ṛtuparṇa’s Akṣahṛdaya (Branch Sampling)',
    sanskritSutra: 'एकस्यां शाखया दृष्ट्या सर्वशाखाः प्रकल्पिताः',
    sutraGloss: 'By carefully sampling a single representative branch and its twigs, the total fruit count of the entire tree is inferred.',
    realWorldApp: 'Forestry biomass audits, industrial quality control, and Monte Carlo computational integration.',
    experimentHint: 'Cast Akṣa random sampling quadrats across the 100-cell Bibhītaka forest grid and watch standard error SE collapse as 1/√n.',
    winTelemetry: 'Estimate total Bibhītaka fruits within ±3% error using n ≤ 15 random quadrat samples',
    curriculumTag: 'NCERT Class 10–12 Mathematics · Statistics, Sampling & Probability',
    controlMechanics: 'Monte Carlo Quadrat Sampler & Live Error Convergence Plot',
    variables: [
      { symbol: 'n', label: 'Sampled Quadrats', unit: '1 → 30 of N = 100' },
      { symbol: 'N·μ̂', label: 'Extrapolated Population', unit: 'Estimated Total Fruits' },
      { symbol: 'SE', label: 'Standard Error (σ/√n)', unit: 'Converges as n Increases' },
    ],
    difficulty: 2,
  },
  citrakavya: {
    domainTag: 'Symmetry · Algorithms',
    formula: 'M[i][j] = M[j][i] = M[n−1−i][n−1−j]',
    modernLaw: '2D Palindromic Matrix Invariance, Hamiltonian Paths & Group Symmetry',
    indianSource: 'Dharmadāsa Vidagdhamukhamaṇḍana & Daṇḍin Kāvyādarśa (Bandha-Kāvya)',
    sanskritSutra: 'सर्वतोभद्रचक्रादिबन्धैर्विदग्धमुखमण्डनम्',
    sutraGloss: 'Syllables woven into four-fold symmetric matrices, lotus petals, and wheel spokes read identically across every axis.',
    realWorldApp: '2D error-correcting matrix codes, cryptographic hashes, and constraint-satisfaction solvers.',
    experimentHint: 'Solve the 3×3 Latin-square riddles and trace the shared hub-and-petal syllable nodes across Padma (Lotus) and Cakra (Wheel) bandhas.',
    winTelemetry: 'Complete a 4-way symmetric Sarvatobhadra matrix & trace all 8 Padma-Bandha petals',
    curriculumTag: 'NCERT Class 11–12 CS & Math · Matrices, Graph Traversal & Combinatorics',
    controlMechanics: '2D Syllable Matrix Solver & Geometric Bandha Vector Tracer',
    variables: [
      { symbol: 'D₄', label: 'Dihedral Symmetry Group', unit: '8-Fold Matrix Invariance' },
      { symbol: 'M[i,j]', label: 'Shared Hub Akṣara', unit: 'Multi-Path Intersection Node' },
      { symbol: 'deg(v)', label: 'Vertex Path Degree', unit: '2 (Petal) → 8 (Lotus Center)' },
    ],
    difficulty: 3,
  },
};

export function getExplorerRank(totalStars: number): { rankEn: string; rankSa: string; nextAt: number } {
  if (totalStars >= 36) return { rankEn: 'Master Polymath', rankSa: 'आचार्यः', nextAt: 51 };
  if (totalStars >= 21) return { rankEn: 'STEM Investigator', rankSa: 'विज्ञानी', nextAt: 36 };
  if (totalStars >= 9) return { rankEn: 'Lab Explorer', rankSa: 'अन्वेषकः', nextAt: 21 };
  return { rankEn: 'Curious Apprentice', rankSa: 'शिष्यः', nextAt: 9 };
}

/** Crisp dark-blueprint SVG engineering schematic for all 18 STEM simulations (zero fallback placeholders). */
export const LabSchematicGraphic: React.FC<{ labId: LabSegmentId; className?: string }> = ({
  labId,
  className = '',
}) => {
  const meta = STEM_BLUEPRINTS[labId];
  const isPreschool = labId === 'preschool-wonder';
  return (
    <svg
      className={`vl-schematic-svg${isPreschool ? ' vl-schematic-svg--preschool' : ''} ${className}`}
      viewBox="0 0 180 86"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={isPreschool ? 'Sunny Storybook Preschool Playland illustration' : `${meta.domainTag} schematic blueprint`}
    >
      {isPreschool ? (
        <>
          <defs>
            <linearGradient id="ps-sky-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="55%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#fef9c3" />
            </linearGradient>
            <linearGradient id="ps-hill-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
          {/* Bright Sunny Sky */}
          <rect width="180" height="86" rx="10" fill="url(#ps-sky-grad)" />
          {/* Soft Pastel Rainbow Arch */}
          <path d="M 32 62 A 58 46 0 0 1 148 62" fill="none" stroke="#f43f5e" strokeWidth="3.2" strokeLinecap="round" opacity="0.84" />
          <path d="M 36 62 A 54 42 0 0 1 144 62" fill="none" stroke="#fb923c" strokeWidth="3.2" strokeLinecap="round" opacity="0.86" />
          <path d="M 40 62 A 50 38 0 0 1 140 62" fill="none" stroke="#facc15" strokeWidth="3.2" strokeLinecap="round" opacity="0.9" />
          <path d="M 44 62 A 46 34 0 0 1 136 62" fill="none" stroke="#22c55e" strokeWidth="3.2" strokeLinecap="round" opacity="0.84" />
          <path d="M 48 62 A 42 30 0 0 1 132 62" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.84" />

          {/* Smiling Golden Sun */}
          <g className="vl-ps-sun">
            <circle cx="24" cy="20" r="10.5" fill="#fde047" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="21" cy="18.5" r="1.1" fill="#92400e" />
            <circle cx="27" cy="18.5" r="1.1" fill="#92400e" />
            <path d="M 21 22.5 Q 24 25 27 22.5" fill="none" stroke="#92400e" strokeWidth="1.3" strokeLinecap="round" />
            <g stroke="#f59e0b" strokeWidth="1.4" strokeLinecap="round">
              <line x1="24" y1="5" x2="24" y2="7.5" />
              <line x1="37" y1="20" x2="39.5" y2="20" />
              <line x1="33" y1="11" x2="35" y2="9" />
              <line x1="15" y1="11" x2="13" y2="9" />
              <line x1="9" y1="20" x2="11.5" y2="20" />
            </g>
          </g>

          {/* Fluffy Clouds */}
          <g fill="#ffffff" opacity="0.94">
            <ellipse cx="146" cy="18" rx="11" ry="5.5" />
            <circle cx="140" cy="16" r="5" />
            <circle cx="151" cy="15.5" r="6" />
            <ellipse cx="74" cy="14" rx="8" ry="4" />
            <circle cx="70" cy="13" r="3.8" />
            <circle cx="77" cy="12.5" r="4.2" />
          </g>

          {/* Rolling Green Hills */}
          <path d="M 0 64 Q 44 48 92 60 T 180 56 L 180 86 L 0 86 Z" fill="#86efac" />
          <path d="M 0 68 Q 55 56 115 66 T 180 62 L 180 86 L 0 86 Z" fill="url(#ps-hill-grad)" />

          {/* Colorful Toy Steam Train */}
          <g transform="translate(26, 40)">
            {/* Steam Puffs */}
            <circle cx="13" cy="-3" r="3" fill="#ffffff" opacity="0.92" />
            <circle cx="19" cy="-6" r="3.8" fill="#ffffff" opacity="0.82" />
            <circle cx="27" cy="-8" r="4.2" fill="#ffffff" opacity="0.68" />
            {/* Locomotive */}
            <rect x="8" y="6" width="24" height="14" rx="4" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
            <rect x="21" y="1" width="12" height="19" rx="3" fill="#f97316" stroke="#c2410c" strokeWidth="1.2" />
            <rect x="24" y="4" width="6" height="6" rx="1.5" fill="#fef08a" />
            <rect x="11" y="1" width="5" height="6" rx="1.5" fill="#334155" />
            <polygon points="8,14 3,20 8,20" fill="#fbbf24" />
            {/* Coach 1 (Sunshine Yellow with अ) */}
            <line x1="33" y1="15" x2="39" y2="15" stroke="#475569" strokeWidth="2" />
            <rect x="39" y="5" width="26" height="15" rx="4" fill="#facc15" stroke="#ca8a04" strokeWidth="1.2" />
            <rect x="43" y="8" width="18" height="9" rx="2" fill="#ffffff" />
            <text x="52" y="15.2" fill="#dc2626" fontSize="8.5" fontWeight="900" textAnchor="middle">अ</text>
            {/* Coach 2 (Sky Mint with Star) */}
            <line x1="65" y1="15" x2="71" y2="15" stroke="#475569" strokeWidth="2" />
            <rect x="71" y="5" width="26" height="15" rx="4" fill="#06b6d4" stroke="#0e7490" strokeWidth="1.2" />
            <rect x="75" y="8" width="18" height="9" rx="2" fill="#ffffff" />
            <polygon points="84,9.2 85.4,12 88.4,12.4 86.2,14.5 86.7,17.4 84,16 81.3,17.4 81.8,14.5 79.6,12.4 82.6,12" fill="#f59e0b" />
            {/* Coach 3 (Berry Pink with Circle) */}
            <line x1="97" y1="15" x2="103" y2="15" stroke="#475569" strokeWidth="2" />
            <rect x="103" y="5" width="22" height="15" rx="4" fill="#ec4899" stroke="#be185d" strokeWidth="1.2" />
            <rect x="107" y="8" width="14" height="9" rx="2" fill="#ffffff" />
            <circle cx="114" cy="12.5" r="3" fill="#a855f7" />
            {/* Wheels */}
            <circle cx="14" cy="21" r="3.4" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
            <circle cx="27" cy="21" r="3.4" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
            <circle cx="46" cy="21" r="3.2" fill="#1e293b" stroke="#fb923c" strokeWidth="1.1" />
            <circle cx="58" cy="21" r="3.2" fill="#1e293b" stroke="#fb923c" strokeWidth="1.1" />
            <circle cx="78" cy="21" r="3.2" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
            <circle cx="90" cy="21" r="3.2" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
            <circle cx="109" cy="21" r="3.2" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
            <circle cx="119" cy="21" r="3.2" fill="#1e293b" stroke="#fde047" strokeWidth="1.1" />
          </g>

          {/* Cheerful Ribbon Pill Banner */}
          <rect x="12" y="68" width="156" height="14" rx="7" fill="#ffffff" fillOpacity="0.95" stroke="#f97316" strokeWidth="1.2" />
          <text x="90" y="77.4" fill="#c2410c" fontSize="6.9" fontWeight="900" textAnchor="middle" letterSpacing="0.02em">
            24 FUN KIDS GAMES · PLAY, SING &amp; EXPLORE
          </text>
        </>
      ) : (
        <>
          <defs>
            <pattern id={`grid-${labId}`} width="12" height="12" patternUnits="userSpaceOnUse">
              <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="180" height="86" rx="8" fill="#0f172a" />
          <rect width="180" height="86" rx="8" fill={`url(#grid-${labId})`} />
          {/* Corner Blueprint Registration Ticks */}
          <path d="M 6 12 L 6 6 L 12 6 M 168 6 L 174 6 L 174 12 M 6 74 L 6 80 L 12 80 M 168 80 L 174 80 L 174 74" fill="none" stroke="rgba(148,163,184,0.38)" strokeWidth="1" />
        </>
      )}

      {labId === 'paramanu' && (
        <g strokeLinecap="round">
          <line x1="58" y1="44" x2="90" y2="22" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="90" y1="22" x2="122" y2="44" stroke="#f59e0b" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="58" y1="44" x2="122" y2="44" stroke="#34d399" strokeWidth="1.6" />
          <circle cx="58" cy="44" r="9" fill="rgba(245,158,11,0.22)" stroke="#fbbf24" strokeWidth="1.8" />
          <circle cx="90" cy="22" r="9" fill="rgba(16,185,129,0.22)" stroke="#34d399" strokeWidth="1.8" />
          <circle cx="122" cy="44" r="9" fill="rgba(56,189,248,0.22)" stroke="#38bdf8" strokeWidth="1.8" />
          <circle cx="90" cy="38" r="25" fill="none" stroke="rgba(251,191,36,0.35)" strokeDasharray="2 3" />
          <text x="58" y="47" fill="#fef3c7" fontSize="6.5" fontWeight="800" textAnchor="middle">2p</text>
          <text x="90" y="25" fill="#d1fae5" fontSize="6.5" fontWeight="800" textAnchor="middle">2p</text>
          <text x="122" y="47" fill="#e0f2fe" fontSize="6.5" fontWeight="800" textAnchor="middle">2p</text>
          <text x="90" y="76" fill="#fde68a" fontSize="7.8" fontWeight="800" textAnchor="middle">2 PARAMAṆU &rarr; DVYAṆUKA &rarr; TRYAṆUKA</text>
        </g>
      )}

      {labId === 'asato-ma' && (
        <g>
          <line x1="34" y1="54" x2="146" y2="54" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="90,54 83,66 97,66" fill="#0f766e" stroke="#34d399" strokeWidth="1.2" />
          <rect x="40" y="22" width="28" height="28" rx="4" fill="rgba(56,189,248,0.25)" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M 78 36 L 102 36" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M 112 48 Q 126 18 140 48 Z" fill="rgba(245,158,11,0.28)" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="54" y="39" fill="#bae6fd" fontSize="7.5" fontWeight="800" textAnchor="middle">SOLID</text>
          <text x="126" y="42" fill="#fde68a" fontSize="7.5" fontWeight="800" textAnchor="middle">VAPOR</text>
          <text x="90" y="77" fill="#6ee7b7" fontSize="8" fontWeight="800" textAnchor="middle">&Sigma;m = 100.000 g INVARIANT</text>
        </g>
      )}

      {labId === 'prakriti' && (
        <g>
          <rect x="20" y="26" width="140" height="26" rx="4" fill="rgba(16,185,129,0.14)" stroke="rgba(52,211,153,0.45)" strokeDasharray="3 2" />
          <line x1="20" y1="39" x2="160" y2="39" stroke="rgba(251,191,36,0.5)" strokeWidth="1" />
          <path d="M 20 42 C 45 16, 75 62, 100 38 C 125 20, 145 48, 160 39" fill="none" stroke="#34d399" strokeWidth="2.2" />
          <circle cx="100" cy="38" r="3.5" fill="#fbbf24" />
          <circle cx="160" cy="39" r="3.5" fill="#34d399" />
          <text x="142" y="22" fill="#fde68a" fontSize="6.8" fontWeight="700" textAnchor="end">K (CAPACITY)</text>
          <text x="90" y="77" fill="#a7f3d0" fontSize="7.8" fontWeight="800" textAnchor="middle">SAMADOṢA HOMEOSTASIS · dN/dt</text>
        </g>
      )}

      {labId === 'chaturyoni' && (
        <g>
          {/* Left: 4-Quadrant Yoni Matrix | Right: J.C. Bose Action Potential Spike */}
          <rect x="20" y="16" width="44" height="44" rx="4" fill="rgba(16,185,129,0.12)" stroke="#34d399" strokeWidth="1.3" />
          <line x1="42" y1="16" x2="42" y2="60" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
          <line x1="20" y1="38" x2="64" y2="38" stroke="rgba(52,211,153,0.45)" strokeWidth="1" />
          <circle cx="31" cy="27" r="3.5" fill="#fbbf24" />
          <circle cx="53" cy="27" r="3.5" fill="#38bdf8" />
          <circle cx="31" cy="49" r="3.5" fill="#34d399" />
          <circle cx="53" cy="49" r="3.5" fill="#f472b6" />
          {/* Oscilloscope waveform */}
          <polyline points="74,48 92,48 98,16 106,56 116,38 134,46 160,46" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinejoin="round" />
          <circle cx="98" cy="16" r="3" fill="#fde047" />
          <text x="128" y="24" fill="#fed7aa" fontSize="7" fontWeight="700">ΔV (mV)</text>
          <text x="90" y="77" fill="#fdba74" fontSize="7.8" fontWeight="800" textAnchor="middle">4-YONI TAXONOMY &amp; BOSE CRESCOGRAPH</text>
        </g>
      )}

      {labId === 'jyotisha' && (
        <g>
          <ellipse cx="90" cy="40" rx="58" ry="24" fill="none" stroke="#818cf8" strokeWidth="1.6" strokeDasharray="4 2" />
          <circle cx="68" cy="40" r="9.5" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.5" />
          <circle cx="144" cy="32" r="5" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="1.2" />
          <line x1="144" y1="32" x2="118" y2="36" stroke="#34d399" strokeWidth="1.5" />
          <line x1="144" y1="32" x2="139" y2="12" stroke="#f472b6" strokeWidth="1.5" />
          <text x="125" y="15" fill="#f9a8d4" fontSize="6.8" fontWeight="700">v_t</text>
          <text x="115" y="45" fill="#6ee7b7" fontSize="6.8" fontWeight="700">F_g</text>
          <text x="90" y="77" fill="#c7d2fe" fontSize="7.8" fontWeight="800" textAnchor="middle">ELLIPTICAL ORBIT · F = G m₁m₂ / r²</text>
        </g>
      )}

      {labId === 'chandrayaan' && (
        <g>
          <path d="M 22 16 Q 86 18 112 56" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="4 2" />
          <path d="M 16 64 Q 90 54 164 64" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <rect x="105" y="44" width="14" height="10" rx="2" fill="#fbbf24" stroke="#fef3c7" strokeWidth="1.2" />
          <polygon points="109,54 115,54 112,63" fill="#f97316" />
          <line x1="119" y1="49" x2="148" y2="60" stroke="#34d399" strokeWidth="1.6" strokeDasharray="2 2" />
          <circle cx="148" cy="60" r="3" fill="#34d399" />
          <text x="145" y="48" fill="#6ee7b7" fontSize="6.8" fontWeight="700" textAnchor="end">LIBS λ</text>
          <text x="90" y="77" fill="#7dd3fc" fontSize="7.8" fontWeight="800" textAnchor="middle">SHIV SHAKTI SOFT DESCENT &amp; LIBS</text>
        </g>
      )}

      {labId === 'nada-brahman' && (
        <g>
          <path d="M 18 40 Q 42 10 66 40 T 114 40 T 162 40" fill="none" stroke="#c084fc" strokeWidth="2" />
          <path d="M 18 40 Q 42 70 66 40 T 114 40 T 162 40" fill="none" stroke="#38bdf8" strokeWidth="1.4" strokeDasharray="3 2" />
          <circle cx="18" cy="40" r="2.8" fill="#e2e8f0" />
          <circle cx="66" cy="40" r="3.2" fill="#fbbf24" />
          <circle cx="114" cy="40" r="3.2" fill="#fbbf24" />
          <circle cx="162" cy="40" r="2.8" fill="#e2e8f0" />
          <text x="90" y="77" fill="#e9d5ff" fontSize="7.8" fontWeight="800" textAnchor="middle">STANDING HARMONICS · f_n = (n/2L)√(T/μ)</text>
        </g>
      )}

      {labId === 'srishti-sthiti-laya' && (
        <g>
          {/* Phase-space conservation rings: Srishti -> Sthiti -> Laya */}
          <circle cx="90" cy="38" r="23" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="90" cy="38" r="13" fill="rgba(244,63,94,0.18)" stroke="#fda4af" strokeWidth="1.5" />
          <circle cx="90" cy="38" r="4" fill="#fde047" />
          {/* Energy bars K and U on left/right */}
          <rect x="24" y="22" width="10" height="32" rx="2" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" strokeWidth="1.2" />
          <rect x="24" y="34" width="10" height="20" rx="2" fill="#38bdf8" />
          <rect x="146" y="22" width="10" height="32" rx="2" fill="rgba(251,191,36,0.2)" stroke="#fbbf24" strokeWidth="1.2" />
          <rect x="146" y="26" width="10" height="28" rx="2" fill="#fbbf24" />
          <text x="29" y="18" fill="#7dd3fc" fontSize="6.8" fontWeight="800" textAnchor="middle">K</text>
          <text x="151" y="18" fill="#fde68a" fontSize="6.8" fontWeight="800" textAnchor="middle">U</text>
          <text x="90" y="77" fill="#fda4af" fontSize="7.8" fontWeight="800" textAnchor="middle">FIELD CONSERVATION · E = K + U = CONST</text>
        </g>
      )}

      {labId === 'agnibana' && (
        <g>
          <path d="M 26 58 Q 92 6 156 58" fill="none" stroke="#fb923c" strokeWidth="1.8" strokeDasharray="4 2" />
          <line x1="26" y1="58" x2="62" y2="32" stroke="#fbbf24" strokeWidth="2.2" />
          <path d="M 42 58 A 16 16 0 0 0 38 48" fill="none" stroke="#38bdf8" strokeWidth="1.3" />
          <text x="48" y="54" fill="#7dd3fc" fontSize="7" fontWeight="800">θ</text>
          <circle cx="91" cy="32" r="3" fill="#fde047" />
          <circle cx="156" cy="58" r="4.5" fill="rgba(52,211,153,0.3)" stroke="#34d399" strokeWidth="1.5" />
          <line x1="20" y1="58" x2="164" y2="58" stroke="#64748b" strokeWidth="1.2" />
          <text x="90" y="77" fill="#fed7aa" fontSize="7.8" fontWeight="800" textAnchor="middle">5:1:1 BALLISTICS · R = v₀² sin(2θ)/g</text>
        </g>
      )}

      {labId === 'vedic-geometry' && (
        <g>
          <rect x="38" y="18" width="42" height="42" fill="rgba(245,158,11,0.16)" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="38" y1="60" x2="80" y2="18" stroke="#34d399" strokeWidth="1.8" strokeDasharray="3 2" />
          <path d="M 88 39 L 102 39" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="130" cy="39" r="23.7" fill="rgba(56,189,248,0.14)" stroke="#38bdf8" strokeWidth="1.6" />
          <line x1="130" y1="39" x2="153.7" y2="39" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="2 2" />
          <text x="59" y="42" fill="#fde68a" fontSize="7" fontWeight="800" textAnchor="middle">a√2</text>
          <text x="130" y="35" fill="#bae6fd" fontSize="7" fontWeight="800" textAnchor="middle">Area A</text>
          <text x="90" y="77" fill="#fde68a" fontSize="6.7" fontWeight="800" textAnchor="middle">ŚULBA INVARIANT · c² = a² + b² · √2 ≈ 577/408</text>
        </g>
      )}

      {labId === 'mantra-acoustics' && (
        <g>
          {/* 5 Sthana Articulation Loci + Formant Spectral Envelope F1, F2, F3 */}
          <path d="M 22 56 C 36 56, 44 18, 56 56 C 66 56, 76 24, 88 56 C 98 56, 110 32, 122 56 L 158 56" fill="rgba(192,132,252,0.18)" stroke="#c084fc" strokeWidth="1.8" />
          <circle cx="46" cy="27" r="3" fill="#fbbf24" />
          <circle cx="78" cy="32" r="3" fill="#34d399" />
          <circle cx="112" cy="38" r="3" fill="#38bdf8" />
          <text x="46" y="20" fill="#fde68a" fontSize="6.8" fontWeight="800" textAnchor="middle">F₁</text>
          <text x="78" y="25" fill="#6ee7b7" fontSize="6.8" fontWeight="800" textAnchor="middle">F₂</text>
          <text x="112" y="31" fill="#7dd3fc" fontSize="6.8" fontWeight="800" textAnchor="middle">F₃</text>
          <text x="144" y="28" fill="#e9d5ff" fontSize="6.8" fontWeight="700" textAnchor="middle">5 STHĀNA</text>
          <text x="90" y="77" fill="#e9d5ff" fontSize="7.8" fontWeight="800" textAnchor="middle">VOCAL FORMANTS (F₁, F₂, F₃) &amp; HARMONICS</text>
        </g>
      )}

      {labId === 'temple-engineering' && (
        <g>
          <polygon points="90,12 56,58 124,58" fill="rgba(245,158,11,0.16)" stroke="#fbbf24" strokeWidth="1.6" />
          <line x1="66" y1="44" x2="114" y2="44" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="76" y1="28" x2="104" y2="28" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="90" y1="14" x2="90" y2="58" stroke="#34d399" strokeWidth="1.8" strokeDasharray="3 2" />
          {/* Sand-cushion seismic isolation bed */}
          <rect x="48" y="58" width="84" height="6" rx="2" fill="rgba(56,189,248,0.28)" stroke="#38bdf8" strokeWidth="1" />
          <text x="90" y="77" fill="#fde68a" fontSize="7.8" fontWeight="800" textAnchor="middle">CORBELLED LOAD PATH &amp; SEISMIC BED · &Sigma;F = 0</text>
        </g>
      )}

      {labId === 'kautilya' && (
        <g>
          {/* Saptanga 7-node network + Actuarial risk bar chart */}
          <polygon points="54,16 74,26 70,48 38,48 34,26" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="1.4" />
          <circle cx="54" cy="34" r="4" fill="#fbbf24" />
          <circle cx="54" cy="16" r="2.5" fill="#34d399" />
          <circle cx="74" cy="26" r="2.5" fill="#38bdf8" />
          <circle cx="70" cy="48" r="2.5" fill="#38bdf8" />
          <circle cx="38" cy="48" r="2.5" fill="#34d399" />
          <circle cx="34" cy="26" r="2.5" fill="#34d399" />
          {/* Actuarial Risk Tiers: 1.25%, 5%, 10%, 20% */}
          <rect x="98" y="48" width="10" height="8" fill="#34d399" />
          <rect x="114" y="40" width="10" height="16" fill="#38bdf8" />
          <rect x="130" y="30" width="10" height="26" fill="#fbbf24" />
          <rect x="146" y="18" width="10" height="38" fill="#f87171" />
          <text x="127" y="15" fill="#fde68a" fontSize="6.5" fontWeight="800" textAnchor="middle">RISK TIERS (1.25%–20%)</text>
          <text x="90" y="77" fill="#fde68a" fontSize="7.8" fontWeight="800" textAnchor="middle">SAPTĀṄGA SYSTEMS &amp; ACTUARIAL RISK</text>
        </g>
      )}

      {labId === 'chandahshastra' && (
        <g>
          <line x1="90" y1="16" x2="58" y2="38" stroke="#38bdf8" strokeWidth="1.5" />
          <line x1="90" y1="16" x2="122" y2="38" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="58" y1="38" x2="42" y2="56" stroke="#38bdf8" strokeWidth="1.3" />
          <line x1="58" y1="38" x2="74" y2="56" stroke="#fbbf24" strokeWidth="1.3" />
          <line x1="122" y1="38" x2="106" y2="56" stroke="#38bdf8" strokeWidth="1.3" />
          <line x1="122" y1="38" x2="138" y2="56" stroke="#fbbf24" strokeWidth="1.3" />
          <circle cx="90" cy="16" r="4" fill="#e2e8f0" />
          <circle cx="58" cy="38" r="3.5" fill="#38bdf8" />
          <circle cx="122" cy="38" r="3.5" fill="#fbbf24" />
          <text x="48" y="30" fill="#7dd3fc" fontSize="7" fontWeight="800">L(0)</text>
          <text x="126" y="30" fill="#fde68a" fontSize="7" fontWeight="800">G(1)</text>
          <text x="90" y="77" fill="#fde68a" fontSize="7.8" fontWeight="800" textAnchor="middle">PIṄGALA BINARY MERU · 2ⁿ &amp; C(n,k)</text>
        </g>
      )}

      {labId === 'ujjain-geodesy' && (
        <g>
          <line x1="24" y1="58" x2="156" y2="58" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="64" y1="58" x2="64" y2="22" stroke="#fbbf24" strokeWidth="2.5" />
          <line x1="64" y1="22" x2="132" y2="58" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="42" cy="16" r="6" fill="#f59e0b" />
          <text x="54" y="42" fill="#fde68a" fontSize="7" fontWeight="800">h</text>
          <text x="98" y="54" fill="#7dd3fc" fontSize="7" fontWeight="800">L_shadow</text>
          <text x="140" y="24" fill="#6ee7b7" fontSize="6.8" fontWeight="800" textAnchor="middle">23°11′ N · 0°</text>
          <text x="90" y="77" fill="#bae6fd" fontSize="7.8" fontWeight="800" textAnchor="middle">UJJAIN 0° MERIDIAN · tan(α) = h / L</text>
        </g>
      )}

      {labId === 'rituparna' && (
        <g>
          {/* Sampling quadrats on left + 1/sqrt(n) convergence curve on right */}
          <rect x="22" y="18" width="40" height="40" fill="rgba(20,184,166,0.12)" stroke="#2dd4bf" strokeWidth="1.3" />
          <line x1="35" y1="18" x2="35" y2="58" stroke="rgba(45,212,191,0.35)" strokeWidth="0.8" />
          <line x1="48" y1="18" x2="48" y2="58" stroke="rgba(45,212,191,0.35)" strokeWidth="0.8" />
          <line x1="22" y1="31" x2="62" y2="31" stroke="rgba(45,212,191,0.35)" strokeWidth="0.8" />
          <line x1="22" y1="44" x2="62" y2="44" stroke="rgba(45,212,191,0.35)" strokeWidth="0.8" />
          <rect x="35" y="31" width="13" height="13" fill="rgba(251,191,36,0.45)" stroke="#fbbf24" strokeWidth="1.2" />
          <rect x="48" y="18" width="14" height="13" fill="rgba(251,191,36,0.45)" stroke="#fbbf24" strokeWidth="1.2" />
          {/* Convergence funnel */}
          <line x1="76" y1="38" x2="158" y2="38" stroke="#34d399" strokeWidth="1.2" strokeDasharray="2 2" />
          <path d="M 76 18 Q 104 34 158 36" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
          <path d="M 76 58 Q 104 42 158 40" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
          <text x="132" y="26" fill="#fde68a" fontSize="6.8" fontWeight="800">SE = σ/√n</text>
          <text x="90" y="77" fill="#5eead4" fontSize="7.8" fontWeight="800" textAnchor="middle">MONTE CARLO SAMPLING · μ̂ = (1/n)&Sigma;xᵢ</text>
        </g>
      )}

      {labId === 'citrakavya' && (
        <g>
          {/* Left: 3x3 Sarvatobhadra Palindromic Matrix | Right: 8-Petal Padma Bandha */}
          <rect x="24" y="18" width="42" height="42" rx="3" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="1.4" />
          <line x1="38" y1="18" x2="38" y2="60" stroke="#38bdf8" strokeWidth="1" />
          <line x1="52" y1="18" x2="52" y2="60" stroke="#38bdf8" strokeWidth="1" />
          <line x1="24" y1="32" x2="66" y2="32" stroke="#38bdf8" strokeWidth="1" />
          <line x1="24" y1="46" x2="66" y2="46" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="45" cy="39" r="3.5" fill="#fbbf24" />
          {/* Right: Padma-Bandha 8-spoke wheel */}
          <circle cx="126" cy="39" r="20" fill="rgba(244,114,182,0.14)" stroke="#f472b6" strokeWidth="1.5" />
          <circle cx="126" cy="39" r="9" fill="none" stroke="#fbbf24" strokeWidth="1.2" strokeDasharray="2 2" />
          <line x1="106" y1="39" x2="146" y2="39" stroke="#f472b6" strokeWidth="1.1" />
          <line x1="126" y1="19" x2="126" y2="59" stroke="#f472b6" strokeWidth="1.1" />
          <line x1="112" y1="25" x2="140" y2="53" stroke="#f472b6" strokeWidth="1.1" />
          <line x1="140" y1="25" x2="112" y2="53" stroke="#f472b6" strokeWidth="1.1" />
          <circle cx="126" cy="39" r="3.5" fill="#fde047" />
          <text x="90" y="77" fill="#7dd3fc" fontSize="7.8" fontWeight="800" textAnchor="middle">SARVATOBHADRA MATRIX &amp; PADMA-BANDHA</text>
        </g>
      )}
    </svg>
  );
};

/** In-Workbench STEM Blueprint & Interactive 4-Step Gaming Schematic HUD */
export const LabStemBlueprintCard: React.FC<{
  labId: LabSegmentId;
  isCompleted: boolean;
  starsForLab: number;
  totalStars: number;
  onCompleteMission?: () => void;
}> = ({ labId, isCompleted, starsForLab, totalStars, onCompleteMission }) => {
  const meta = STEM_BLUEPRINTS[labId];
  const rank = getExplorerRank(totalStars);
  const [activeStage, setActiveStage] = useState<1 | 2 | 3 | 4>(2);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const stageDescriptions: Record<1 | 2 | 3 | 4, { title: string; badge: string; text: string; code: string }> = {
    1: {
      title: '01. Observe Principle & Sūtra',
      badge: meta.indianSource,
      text: `${meta.sutraGloss} (${meta.realWorldApp})`,
      code: meta.sanskritSutra,
    },
    2: {
      title: '02. Tune Variables & Experiment',
      badge: meta.controlMechanics,
      text: meta.experimentHint,
      code: meta.formula,
    },
    3: {
      title: '03. Verify Empirical STEM Law',
      badge: meta.modernLaw,
      text: `Target Telemetry: ${meta.winTelemetry}`,
      code: meta.curriculumTag,
    },
    4: {
      title: '04. Mastery & Vidyā Star Reward',
      badge: isCompleted ? `Mastered (${starsForLab || 3} ★)` : 'Ready to Claim +3 ★',
      text: isCompleted
        ? `You verified ${meta.modernLaw} and unlocked ${starsForLab || 3} Vidyā Stars toward ${rank.rankEn} (${rank.rankSa}).`
        : `Verify "${meta.winTelemetry}" in the simulator below, then click "Claim +3 Stars" to log your discovery!`,
      code: `Explorer Rank: ${rank.rankEn} (${rank.rankSa}) · ${totalStars} / ${rank.nextAt} ★`,
    },
  };

  const currentStageInfo = stageDescriptions[activeStage];

  return (
    <div className="vl-stem-hud" aria-label="STEM Blueprint and Mission Schematic">
      {/* Interactive 4-Step Gaming Schematic Flow Bar */}
      <div className="vl-schematic-flow">
        <div className="vl-flow-steps-mini" role="tablist" aria-label="Interactive 4-Stage Gaming Schematic Loop">
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 1}
            className={`vl-flow-node vl-flow-node--btn is-done ${activeStage === 1 ? 'is-focused' : ''}`}
            onClick={() => { setActiveStage(1); setIsExpanded(true); }}
          >
            01. Observe Sūtra
          </button>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 2}
            className={`vl-flow-node vl-flow-node--btn ${isCompleted ? 'is-done' : 'is-active'} ${activeStage === 2 ? 'is-focused' : ''}`}
            onClick={() => { setActiveStage(2); setIsExpanded(true); }}
          >
            02. Tune Variables
          </button>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 3}
            className={`vl-flow-node vl-flow-node--btn ${isCompleted ? 'is-done' : ''} ${activeStage === 3 ? 'is-focused' : ''}`}
            onClick={() => { setActiveStage(3); setIsExpanded(true); }}
          >
            03. Verify Law
          </button>
          <span className="vl-flow-arrow" aria-hidden="true">&rarr;</span>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 4}
            className={`vl-flow-node vl-flow-node--btn ${isCompleted ? 'is-done' : ''} ${activeStage === 4 ? 'is-focused' : ''}`}
            onClick={() => { setActiveStage(4); setIsExpanded(true); }}
          >
            04. {isCompleted ? `Mastered (${starsForLab || 3} ★)` : 'Unlock +3 ★'}
          </button>
        </div>

        <div className="vl-schematic-flow-right">
          <div className="vl-rank-pill" title={`Total Vidyā Stars: ${totalStars} (Next rank at ${rank.nextAt})`}>
            <span className="vl-rank-sa" lang="sa">{rank.rankSa}</span>
            <span className="vl-rank-en">{rank.rankEn}</span>
            <span className="vl-rank-stars">{totalStars} ★</span>
          </div>
          <button
            type="button"
            className="vl-blueprint-collapse-btn"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Hide Blueprint ▲' : 'Show STEM Blueprint ▼'}
          </button>
        </div>
      </div>

      {/* Collapsible STEM Engineering Blueprint, Variables & Indian Tradition Console */}
      {isExpanded && (
        <div className="vl-blueprint-details">
          <div className="vl-blueprint-summary">
            <div className="vl-blueprint-summary-left">
              <span className="vl-blueprint-domain">{meta.domainTag}</span>
              <span className="vl-blueprint-curriculum">{meta.curriculumTag}</span>
              <span className="vl-blueprint-formula">{meta.formula}</span>
            </div>
            <span className="vl-blueprint-mechanics-pill">
              Mechanics: <strong>{meta.controlMechanics}</strong> · Tier {meta.difficulty}/3
            </span>
          </div>

          <div className="vl-blueprint-body">
            {/* Left Column: Engineering Schematic SVG + Active Stage Callout */}
            <div className="vl-blueprint-visual">
              <LabSchematicGraphic labId={labId} />
              <div className="vl-bp-variables-strip" aria-label="Simulation variables">
                {meta.variables.map((v) => (
                  <div key={v.symbol} className="vl-bp-var-chip">
                    <code className="vl-bp-var-sym">{v.symbol}</code>
                    <span className="vl-bp-var-lbl">{v.label}</span>
                    <small className="vl-bp-var-unit">{v.unit}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 3-Pillar STEM + IKS + Active Stage Telemetry Matrix */}
            <div className="vl-blueprint-right-col">
              {/* Highlighted Stage Focus Banner */}
              <div className="vl-bp-stage-focus">
                <div className="vl-bp-stage-focus-head">
                  <span className="vl-bp-stage-title">{currentStageInfo.title}</span>
                  <span className="vl-bp-stage-badge">{currentStageInfo.badge}</span>
                </div>
                <p className="vl-bp-stage-text">{currentStageInfo.text}</p>
                <div className="vl-bp-stage-footer">
                  <code className="vl-bp-stage-code" lang={activeStage === 1 ? 'sa' : undefined}>
                    {currentStageInfo.code}
                  </code>
                  {activeStage === 4 && onCompleteMission && !isCompleted && (
                    <button
                      type="button"
                      className="vl-bp-claim-btn"
                      onClick={onCompleteMission}
                    >
                      Claim +3 Vidyā Stars ★
                    </button>
                  )}
                </div>
              </div>

              <div className="vl-blueprint-grid">
                <div className="vl-bp-cell">
                  <span className="vl-bp-label">Modern STEM Principle &amp; Equation</span>
                  <strong>{meta.modernLaw}</strong>
                  <code className="vl-bp-code">{meta.formula}</code>
                </div>
                <div className="vl-bp-cell">
                  <span className="vl-bp-label">Classical Sūtra &amp; IKS Source</span>
                  <strong>{meta.indianSource}</strong>
                  <p className="vl-bp-sutra-line" lang="sa">{meta.sanskritSutra}</p>
                  <p>{meta.sutraGloss}</p>
                </div>
                <div className="vl-bp-cell vl-bp-cell--hint">
                  <span className="vl-bp-label">Win Telemetry &amp; Experiment Goal</span>
                  <strong>{meta.winTelemetry}</strong>
                  <p>{meta.experimentHint}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
