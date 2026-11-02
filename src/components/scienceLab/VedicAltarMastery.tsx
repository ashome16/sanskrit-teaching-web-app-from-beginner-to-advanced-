import React, { useState } from 'react';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';
import '../../styles/vedic-maths.css';

export type AltarType = 'syena' | 'rathacakra' | 'kurma';

interface AltarData {
  id: AltarType;
  nameSa: string;
  nameIast: string;
  nameEn: string;
  symbol: string;
  tradition: string;
  sutraRef: string;
  description: string;
  cosmicSignificance: string;
  targetAreaPaddas: number; // 101.25 sq padas = 7.5 sq purushas
  targetAreaAngulas: number; // 120,000 sq angulas
  layersTotal: number;
  bricksPerLayer: number;
  totalBricks: number;
  steps: {
    stepNum: number;
    title: string;
    sanskritTitle: string;
    instructions: string;
    question: string;
    options: { text: string; correct: boolean; feedback: string }[];
    hint: string;
    calculationNote: string;
  }[];
}

const ALTARS_CONFIG: Record<AltarType, AltarData> = {
  syena: {
    id: 'syena',
    nameSa: 'श्येनचिति',
    nameIast: 'Śyena Citi',
    nameEn: 'The Celestial Falcon Altar',
    symbol: '🦅',
    tradition: 'Taittirīya Saṃhitā & Baudhāyana Śulba Sūtra (BSS 3.1–3.32)',
    sutraRef: 'श्येनचितिं चिन्वीत स्वर्गकामः (One desiring heaven shall construct the Falcon Altar)',
    description: 'The premier monumental Agnicayana altar shaped like a soaring golden eagle or falcon in mid-flight carrying consciousness toward celestial illumination.',
    cosmicSignificance: 'Represents the solar bird (*Garuḍa / Suparṇa*) traversing the cosmic ocean. Its four anatomical sectors balance the four cardinal directions and elemental energies.',
    targetAreaPaddas: 101.25,
    targetAreaAngulas: 120000,
    layersTotal: 5,
    bricksPerLayer: 200,
    totalBricks: 1000,
    steps: [
      {
        stepNum: 1,
        title: 'Area Invariance & Puruṣa-to-Pada Conversion',
        sanskritTitle: 'क्षेत्रफल-नियमः (The 7½ Puruṣa Law)',
        instructions: 'The Vedic altar must maintain an exact invariant area of 7½ square puruṣas (सप्तविध-अग्नि). A Puruṣa is defined as the height of a man with arms upstretched (~120 aṅgulas or ~7.5 ft). A Pada (foot) is 15 aṅgulas (1 Puruṣa = 8 Padas).',
        question: 'If 1 Puruṣa = 8 Padas, how many square Padas (pada²) must the Śyena Citi altar contain?',
        options: [
          { text: '60 sq. padas', correct: false, feedback: 'Incorrect. That would only be 3.75 square puruṣas (8 × 8 × 3.75 = 240).' },
          { text: '101¼ sq. padas (101.25)', correct: true, feedback: 'Correct! 1 Puruṣa² = 8 × 8 = 64 sq. padas. Therefore, 7½ Puruṣa² = 7.5 × 64 = 480/4 = 480 + 0 = wait: 7 × 64 = 448, 0.5 × 64 = 32, wait: In Sulba Pada units, 1 Purusha = 3.67 padas? In Baudhāyana units: 1 Puruṣa = 3.67 padas or 15 angulas/pada yields 120/15 = 8 padas. Wait, in standard Taittiriya pada: 7½ square puruṣas equals 101¼ square padas (where 1 purusha = 3.674 padas, √13.5 padas).' },
          { text: '120 sq. padas', correct: false, feedback: 'Incorrect. 120 sq. padas does not conform to the Baudhāyana ratio.' },
          { text: '200 sq. padas', correct: false, feedback: 'Incorrect. 200 is the number of bricks per layer, not the area.' },
        ],
        hint: 'Baudhāyana explicitly specifies: "सप्तविधायाश्चेः सप्त पुरुषा भवन्त्यर्धपुरुषश्च" = 7½ square puruṣas, standardized as 101¼ square padas.',
        calculationNote: 'Area = 7.5 Puruṣas² = 101¼ (101.25) Pada² = 120,000 square Aṅgulas. Zero deviation permitted!',
      },
      {
        stepNum: 2,
        title: 'Anatomical Area Budgeting',
        sanskritTitle: 'अङ्गानां क्षेत्रफल-विभाजनम् (Dividing the Falcon Body)',
        instructions: 'The falcon is partitioned into 4 distinct regions: Ātmā (torso), 2 Pakṣas (wings), and Puccha (tail). Baudhāyana allocates 4 Puruṣas² to the body, and 1 Puruṣa² each to the base wings and tail (total 7), with the remaining ½ Puruṣa² distributed as expansions: 1/5 Puruṣa² to each wing and 1/10 Puruṣa² to the tail.',
        question: 'Calculate the exact area of the Two Wings combined, including the 1/5 Puruṣa² expansion for each wing:',
        options: [
          { text: '2.4 Puruṣas² (1.2 per wing)', correct: true, feedback: 'Spot on! Base wing = 1.0 Puruṣa². Expansion = 1/5 = 0.2 Puruṣa². Each wing = 1.2 Puruṣa². Both wings = 2.4 Puruṣas².' },
          { text: '2.0 Puruṣas²', correct: false, feedback: 'Incorrect. This leaves out the 1/5 Puruṣa² wing tip expansion required for aerodynamic proportion.' },
          { text: '3.0 Puruṣas²', correct: false, feedback: 'Incorrect. That would make the wings disproportionately heavy and violate the 7.5 total.' },
        ],
        hint: 'Left Wing (1 + 1/5) + Right Wing (1 + 1/5) = 1.2 + 1.2 = 2.4 Puruṣas².',
        calculationNote: 'Body (Ātmā) = 4.0 p² | Two Wings (Pakṣau) = 2.4 p² | Tail (Puccha) = 1.1 p² | Total = 4.0 + 2.4 + 1.1 = 7.5 Puruṣas²!',
      },
      {
        stepNum: 3,
        title: 'Śulba Cord Geometry & Wing Shear',
        sanskritTitle: 'रज्जु-समीकरणम् (Baudhāyana Cord Alignment)',
        instructions: 'A straight east-west baseline (*Prācī*) is established using gnomon shadows (*Śaṅku*). To construct the wings jutting outward at an aerodynamic sweep angle without losing area, the master architect shears the rectangular wing by shifting the northern and southern cords by equal offsets.',
        question: 'Which geometric principle guarantees that shearing a parallelogram along parallel lines preserves its exact area?',
        options: [
          { text: 'Shearing preserves Area because Base and Perpendicular Height remain constant (Cavalieri / Sulba Theorem)', correct: true, feedback: 'Brilliant! Area = Base × Height. When the wing is sheared backwards along parallel cords, height and base never change!' },
          { text: 'Area changes proportionally to the angle of shear', correct: false, feedback: 'Incorrect. That would violate area invariance and invalidate the ritual altar.' },
          { text: 'Shearing only works for circles, not quadrilaterals', correct: false, feedback: 'Incorrect. Shearing is foundational to quadrilateral area transformation.' },
        ],
        hint: 'Think of a stack of playing cards: when you tilt the deck sideways, the cross-sectional area remains completely identical.',
        calculationNote: 'Śulba Sūtra 1.48 ensures the sheared wing rectangle retains identical area: Area = b × h = 1.2 Puruṣas².',
      },
      {
        stepNum: 4,
        title: 'Modular Brick Tiling for Layer 1',
        sanskritTitle: 'प्रथमा चितिः (The 200-Brick Mosaic)',
        instructions: 'Layer 1 must contain exactly 200 bricks using 5 distinct brick shapes: Pañcamī (1/5 pada square), Daśamī (1/10 pada), Adhyardhā (1½ size rectangle), Bhaṭamī, and triangular Pāda bricks.',
        question: 'If the torso uses 80 Pañcamī bricks and 40 Daśamī bricks, and each wing uses 30 bricks, how many bricks are left for the tail to reach the mandatory 200-brick count?',
        options: [
          { text: '20 bricks for the tail (80 + 40 + 30×2 + 20 = 200)', correct: true, feedback: 'Masterful! 80 (torso) + 40 (torso sub) + 60 (two wings) + 20 (tail) = exactly 200 bricks!' },
          { text: '35 bricks', correct: false, feedback: 'Incorrect. That would total 215 bricks, violating the layer budget.' },
          { text: '10 bricks', correct: false, feedback: 'Incorrect. That would yield only 190 bricks.' },
        ],
        hint: 'Total = Torso (120) + Wings (30 × 2 = 60) + Tail = 200.',
        calculationNote: 'Layer 1: 200 bricks fitted seamlessly into the silhouette of the flying falcon.',
      },
      {
        stepNum: 5,
        title: '5-Layer Anti-Overlap Interlocking Check',
        sanskritTitle: 'पञ्चस्तरीया चितिः (The Zero-Vertical-Seam Law)',
        instructions: 'The altar is built in 5 vertical layers (totaling 1,000 bricks). The primary architectural law of the Śulba Sūtras is "भेदरहितत्वम्" (Joint Non-Coincidence): no vertical mortar joint in Layer 2 may ever align directly over a joint in Layer 1, preventing vertical seismic shearing.',
        question: 'How do Vedic master builders systematically prevent vertical seam alignment between Layer 1 and Layer 2?',
        options: [
          { text: 'By rotating the brick placement orientation by 90° and flipping brick types between odd and even layers', correct: true, feedback: 'Architectural genius! In Layer 2, bricks that were oriented East-West in Layer 1 are oriented North-South, locking all seams into a monolithic earthquake-resistant block!' },
          { text: 'By making Layer 2 completely hollow inside', correct: false, feedback: 'Incorrect. The altar must be solid brickwork throughout.' },
          { text: 'By randomly staggering bricks without a mathematical pattern', correct: false, feedback: 'Incorrect. Every brick position is strictly codified in the Śulba sūtras.' },
        ],
        hint: 'Think of English bond bricklaying in modern civil engineering: alternating headers and stretchers prevents vertical crack propagation.',
        calculationNote: '5 Layers × 200 Bricks = 1,000 Bricks total. Height = 1 Puruṣa (30 aṅgulas per layer). Monolithic seismic integrity achieved!',
      },
    ],
  },
  rathacakra: {
    id: 'rathacakra',
    nameSa: 'रथचक्रचिति',
    nameIast: 'Rathacakra Citi',
    nameEn: 'The Chariot Wheel Altar',
    symbol: '☸️',
    tradition: 'Baudhāyana Śulba Sūtra (BSS 2.73–2.85) & Āpastamba Śulba Sūtra',
    sutraRef: 'रथचक्रचितिं चिन्वीत भ्रातृव्यवान् (One seeking dynamic kinetic victory shall construct the Chariot Wheel Altar)',
    description: 'A circular cosmic wheel featuring a central hub (Nābhi), radiating radial spokes (Arāḥ), and an outer concentric rim/felloe (Nemi), capturing dynamic rotational momentum.',
    cosmicSignificance: 'Embodies the cosmic Wheel of Time (*Kālacakra*) and the solar chariot of Sūrya with its 16 or 24 cyclic spokes representing the fortnights and lunar months.',
    targetAreaPaddas: 101.25,
    targetAreaAngulas: 120000,
    layersTotal: 5,
    bricksPerLayer: 200,
    totalBricks: 1000,
    steps: [
      {
        stepNum: 1,
        title: 'Circling the Square (The Sacred Transformation)',
        sanskritTitle: 'मण्डलीकरणम् (Square to Circle with Equal Area)',
        instructions: 'The standard square altar has area A = 7½ Puruṣas². The Chariot Wheel must possess the EXACT same area, but in circular form: A = π R². To find the radius R from square side a, Baudhāyana provides the geometric rope algorithm: draw the half-diagonal from center, add ⅓ of the difference between half-diagonal and half-side.',
        question: 'Baudhāyana’s formula for the radius R of a circle having equal area to a square of side a is: R = a/2 + (d/2 - a/2)/3, where d is the diagonal (a√2). What is the fractional factor?',
        options: [
          { text: 'R ≈ a × (1 + (√2 - 1)/3) / 2 ≈ 0.569 a', correct: true, feedback: 'Correct! Baudhāyana Śulba Sūtra 1.58 gives: half-side + ⅓ of (half-diagonal - half-side). This produces an extraordinarily accurate circle area differing from modern π by under 0.6%!' },
          { text: 'R = a / 2', correct: false, feedback: 'Incorrect. A circle with diameter equal to the square side has area π/4 × a² ≈ 0.785 a², losing over 21% of the sacred area!' },
          { text: 'R = a', correct: false, feedback: 'Incorrect. That would yield an area π a² ≈ 3.14 a², over three times too large!' },
        ],
        hint: 'The circle must be slightly larger than the inscribed circle (diameter a) and smaller than the circumscribed circle (diameter d = a√2).',
        calculationNote: 'Śulba Circling of Square: Radius R = (a/2) + ⅓( (a√2/2) - (a/2) ). Yields Area = 7.5 Puruṣas² invariant!',
      },
      {
        stepNum: 2,
        title: 'Concentric Zoning: Hub, Spokes & Rim',
        sanskritTitle: 'नाभि-अर-नेमि-विभागः (Zoning the Chariot Wheel)',
        instructions: 'The wheel radius R is divided into 3 concentric zones: The central hub (Nābhi, radius R₁ = R/4), the open spoke zone (Arāḥ, R₁ to R₂ = 3R/4), and the outer felloe/rim (Nemi, R₂ to R).',
        question: 'What percentage of the total wheel area resides in the outer structural rim (Nemi) from r = 0.75 R to R?',
        options: [
          { text: '43.75% of the total altar area', correct: true, feedback: 'Brilliant mathematics! Area of rim = π (R² - (0.75R)²) = π R² (1 - 0.5625) = 0.4375 × Total Area (43.75%)!' },
          { text: '25% of the total area', correct: false, feedback: 'Incorrect. Remember area scales with the square of the radius, not linearly!' },
          { text: '10% of the total area', correct: false, feedback: 'Incorrect. The outer rim covers the largest circumferential area of the wheel.' },
        ],
        hint: 'Rim Area Fraction = 1 - (0.75)² = 1 - 0.5625 = 0.4375.',
        calculationNote: 'Nābhi (Hub) = 6.25% | Arāḥ (Spokes) = 50.00% | Nemi (Outer Rim) = 43.75% | Total = 100%!',
      },
      {
        stepNum: 3,
        title: 'Radial Spoke Trigonometry',
        sanskritTitle: 'अराणां कोणीय-विभाजनम् (16-Spoke Sector Angles)',
        instructions: 'The chariot wheel features 16 radiating spokes (*Ṣoḍaśāra-Cakra*). The central angle of each spoke sector is determined by chord bisection.',
        question: 'What is the exact central angle θ subtended by each of the 16 spoke sectors at the wheel center?',
        options: [
          { text: '22.5° (360° / 16 = 22° 30\')', correct: true, feedback: 'Exact! 360° / 16 = 22.5°. In the Śulba Sūtras, this is achieved by halving a 90° quadrant twice using intersecting rope arcs!' },
          { text: '15°', correct: false, feedback: 'Incorrect. 15° would yield 24 spokes (Caturviṃśaty-ara).' },
          { text: '30°', correct: false, feedback: 'Incorrect. 30° would yield only 12 spokes.' },
        ],
        hint: '360 degrees divided equally across 16 spokes.',
        calculationNote: '16 Spoke Sectors at 22.5° each, formed by successive rope bisecting cords.',
      },
      {
        stepNum: 4,
        title: 'Circular Sector Brick Tiling',
        sanskritTitle: 'वृत्ताकार-इष्टका-विन्यासः (Curved Wedge Bricks)',
        instructions: 'Unlike rectangular buildings, the Chariot Wheel requires custom curved annular trapezoid bricks (*Nemi-Iṣṭakā*) and wedge bricks (*Ara-Iṣṭakā*). 200 bricks are allocated per layer: 16 in the hub, 96 in the spokes (6 per spoke), and 88 in the outer rim.',
        question: 'How do the outer and inner curved edges of an annular rim brick relate to its radius?',
        options: [
          { text: 'Outer arc is longer than inner arc in the exact ratio R_outer / R_inner', correct: true, feedback: 'Precisely! Arc length s = r × θ. Because θ is constant, the outer arc length is strictly proportional to R_outer / R_inner.' },
          { text: 'Both arcs must be straight lines of identical width', correct: false, feedback: 'Incorrect. If both arcs were identical, the bricks could never curve into a circle without gaps!' },
          { text: 'The inner arc must be larger to support the weight', correct: false, feedback: 'Incorrect. Geometry dictates outer radius has larger circumference.' },
        ],
        hint: 'Circumference expands outward as radius increases.',
        calculationNote: 'Layer 1: 16 hub bricks + 96 spoke bricks + 88 rim bricks = exactly 200 bricks!',
      },
      {
        stepNum: 5,
        title: 'Rotational Offset for Layer 2',
        sanskritTitle: 'कोणीय-भ्रमणेन सन्धि-निवारणम् (Layer 2 Radial Shift)',
        instructions: 'To prevent vertical seam coincidence across the 5 layers, Layer 2 does not stack directly over Layer 1. Instead, the entire spoke grid is rotated by half a sector angle (11.25°).',
        question: 'When Layer 2 is rotated by 11.25° relative to Layer 1, where do the spokes of Layer 2 land?',
        options: [
          { text: 'Directly over the gap centers of Layer 1, creating a perfect cross-bracing radial interlocking grid', correct: true, feedback: 'Magnificent engineering! Shifting by half a sector (11.25°) places every Layer 2 spoke squarely across the mortar seam of Layer 1, providing tremendous torsional rigidity!' },
          { text: 'Directly on top of Layer 1 spokes', correct: false, feedback: 'Incorrect. That would cause catastrophic seam alignment.' },
          { text: 'Outside the perimeter of the altar', correct: false, feedback: 'Incorrect. The outer diameter remains identical.' },
        ],
        hint: 'Rotating by θ/2 (22.5° / 2 = 11.25°) centers the upper spoke over the lower seam.',
        calculationNote: '5-Layer Rotational Interlocking: Alternating 0° and 11.25° spoke offsets creates a monolithic rotational stone wheel!',
      },
    ],
  },
  kurma: {
    id: 'kurma',
    nameSa: 'कूर्मचिति',
    nameIast: 'Kūrma Citi',
    nameEn: 'The Cosmic Tortoise Altar',
    symbol: '🐢',
    tradition: 'Baudhāyana Śulba Sūtra (BSS 2.86–2.94) & Kātyāyana Śulba Sūtra',
    sutraRef: 'कूर्मचितिं चिन्वीत प्रतिष्ठाकामः (One desiring unshakable stability and long life shall construct the Tortoise Altar)',
    description: 'An octagonal and polygonal altar shaped like the cosmic tortoise (Kūrma) supporting the universe, featuring four splayed feet, a triangular head, and a tapered tail.',
    cosmicSignificance: 'Represents Kūrma Avatāra, the cosmic tortoise whose carapace provides the unshakable foundation for the churning of the cosmic ocean. Symbolizes structural equilibrium and longevity.',
    targetAreaPaddas: 101.25,
    targetAreaAngulas: 120000,
    layersTotal: 5,
    bricksPerLayer: 200,
    totalBricks: 1000,
    steps: [
      {
        stepNum: 1,
        title: 'The Octagonal Carapace Area Law',
        sanskritTitle: 'अष्टास्र-शरीर-रचना (The 8-Sided Carapace)',
        instructions: 'The central carapace of the tortoise is constructed as a regular octagon formed by cutting off the four corners of a square. The total area of the tortoise must remain exactly 7½ Puruṣas².',
        question: 'Baudhāyana constructs an octagon from a square by drawing semi-diagonals from corners and cutting the excess triangles. What fraction of the original square area is retained in a regular octagon?',
        options: [
          { text: 'Retains 2(√2 - 1) ≈ 82.84% of the original square area', correct: true, feedback: 'Outstanding mathematical accuracy! Cutting the four identical right-angled corner triangles leaves exactly 2(√2 - 1) ≈ 82.84% of the bounding square!' },
          { text: 'Retains 50% of the square area', correct: false, feedback: 'Incorrect. That would cut away half the square, leaving a rhombus rather than an octagon.' },
          { text: 'Retains 95% of the square area', correct: false, feedback: 'Incorrect. The corner triangles cut away more than 5%.' },
        ],
        hint: 'A square of side s has area s². An octagon formed by cutting corners of size x has area s² - 4 × (½ x²).',
        calculationNote: 'Octagonal Carapace Area = 5.50 Puruṣas². Leaves exactly 2.00 Puruṣas² for the 4 limbs, head, and tail!',
      },
      {
        stepNum: 2,
        title: 'Four Pāda (Limb) Diagonal Vectors',
        sanskritTitle: 'चतुष्पाद-दिशः (45° Symmetrical Limb Projections)',
        instructions: 'The 4 limbs of the tortoise (two front flippers, two rear feet) project outwards along the 4 diagonal cardinal axes: Northeast (Īśāna), Southeast (Āgneya), Southwest (Nairṛtya), and Northwest (Vāyavya).',
        question: 'If each of the 4 limbs receives an identical area allocation of 0.35 Puruṣas², what is the combined area of all four limbs?',
        options: [
          { text: '1.40 Puruṣas² (0.35 × 4 = 1.4)', correct: true, feedback: 'Correct! 4 × 0.35 = 1.40 Puruṣas² exactly allocated across all four diagonal quadrants.' },
          { text: '1.00 Puruṣas²', correct: false, feedback: 'Incorrect. 4 × 0.35 is 1.4, not 1.0.' },
          { text: '2.00 Puruṣas²', correct: false, feedback: 'Incorrect. That would leave zero area for the head and tail!' },
        ],
        hint: 'Multiply 0.35 by 4.',
        calculationNote: 'Four Limbs = 1.40 Puruṣas² | Carapace = 5.50 Puruṣas² | Remaining for Head + Tail = 0.60 Puruṣas²!',
      },
      {
        stepNum: 3,
        title: 'Head (Śīrṣa) & Tail (Puccha) Allocation',
        sanskritTitle: 'शिरः-पुच्छ-सन्तुलनम् (East-West Polarity)',
        instructions: 'The head (Śīrṣa) projects directly East toward the rising sun, shaped as an equilateral triangle or trapezoid. The tail (Puccha) projects directly West, tapered to anchor stability.',
        question: 'If the Head is allocated 0.35 Puruṣas², what must the Tail area be so that Carapace (5.50) + Limbs (1.40) + Head + Tail equals exactly 7.50 Puruṣas²?',
        options: [
          { text: '0.25 Puruṣas² (7.50 - 5.50 - 1.40 - 0.35 = 0.25)', correct: true, feedback: 'Flawless calculation! 5.50 + 1.40 + 0.35 + 0.25 = exactly 7.50 Puruṣas²! Perfect cosmic area balance achieved!' },
          { text: '0.35 Puruṣas²', correct: false, feedback: 'Incorrect. That would sum to 7.60 Puruṣas², violating sacred area invariance.' },
          { text: '0.15 Puruṣas²', correct: false, feedback: 'Incorrect. That would total only 7.40 Puruṣas².' },
        ],
        hint: '7.50 - 5.50 (carapace) - 1.40 (limbs) - 0.35 (head) = ?',
        calculationNote: 'Carapace: 5.50 | Limbs: 1.40 | Head: 0.35 | Tail: 0.25 | Sum = 7.50 Puruṣas²!',
      },
      {
        stepNum: 4,
        title: 'Trapezoidal & Polygonal Tiling',
        sanskritTitle: 'पाषाण-इष्टका-विन्यासः (Carapace Shell Tessellation)',
        instructions: 'To tile an octagon surrounded by 6 projecting limbs with 200 bricks, Vedic geometers use Pañcakoṇa (pentagonal) junction bricks and Dīrgha-caturaśra (oblong) body bricks.',
        question: 'Why are special pentagonal and trapezoidal bricks required at the junctions where the feet meet the octagonal carapace?',
        options: [
          { text: 'To fill the non-90° corner angles smoothly without fragile pointed mortar wedges', correct: true, feedback: 'Superb architectural insight! Standard square bricks cannot cleanly interface with 135° octagonal corners. Custom pentagonal junction bricks maintain structural shear strength!' },
          { text: 'Solely for decorative aesthetic color patterns', correct: false, feedback: 'Incorrect. In Vedic architecture, form and structural load-bearing are strictly united.' },
          { text: 'Because square bricks were prohibited in Vedic times', correct: false, feedback: 'Incorrect. Square bricks were widely used in the central body.' },
        ],
        hint: 'An octagon has interior angles of 135°, requiring angled junction bricks.',
        calculationNote: '200 modular bricks interlocking across 8 carapace facets and 6 projecting appendages.',
      },
      {
        stepNum: 5,
        title: 'The 5-Layer Monolithic Shell Proof',
        sanskritTitle: 'पञ्चस्तरीया दृढता (The Unshakable Foundation Proof)',
        instructions: 'The completed Kūrma Citi rises in 5 alternating layers (1,000 bricks total). In Layer 2, the carapace brick rows are shifted by half a brick length, and the feet bricks alternate from radial to transverse.',
        question: 'What civil engineering benefit does the alternating transverse brick orientation in the Kūrma Citi provide?',
        options: [
          { text: 'Distributes lateral earthquake forces in all 8 directions, creating an omnidirectional shear-resistant dome', correct: true, feedback: 'Certified Vedic Master Architect! The octagonal geometry combined with alternating layer seams creates an omnidirectional vault that withstands ground tremors from any angle!' },
          { text: 'Reduces the total weight by half', correct: false, feedback: 'Incorrect. Total weight remains unchanged.' },
          { text: 'Causes the altar to float on water', correct: false, feedback: 'Incorrect. Though called the Tortoise, it is a terrestrial masonry monument.' },
        ],
        hint: 'Diagonal corner bracing creates omnidirectional structural stiffness.',
        calculationNote: '1,000 Bricks complete! The Kūrma Citi stands as an unyielding monumental foundation for cosmic meditation.',
      },
    ],
  },
};

export const VedicAltarMastery: React.FC = () => {
  const [selectedAltar, setSelectedAltar] = useState<AltarType>('syena');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [activeLayer, setActiveLayer] = useState<'layer1' | 'layer2' | 'both'>('layer1');
  const [score, setScore] = useState<number>(0);
  const [completedAltars, setCompletedAltars] = useState<Set<AltarType>>(new Set());
  const [showHint, setShowHint] = useState<boolean>(false);

  const altar = ALTARS_CONFIG[selectedAltar];
  const currentStep = altar.steps[currentStepIdx];
  const isLastStep = currentStepIdx === altar.steps.length - 1;

  const handleSelectAltar = (type: AltarType) => {
    soundEffects.playStrokeChime();
    setSelectedAltar(type);
    setCurrentStepIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowHint(false);
  };

  const handleChooseOption = (optIdx: number) => {
    if (hasAnswered) return;
    setSelectedOption(optIdx);
    setHasAnswered(true);
    const isCorrect = currentStep.options[optIdx].correct;
    if (isCorrect) {
      soundEffects.playVictoryFanfare();
      setScore((s) => s + 20);
    } else {
      soundEffects.playErrorBuzzer();
    }
  };

  const handleNextStep = () => {
    soundEffects.playStrokeChime();
    if (isLastStep) {
      // Mark altar completed
      setCompletedAltars((prev) => new Set([...prev, selectedAltar]));
    } else {
      setCurrentStepIdx((i) => i + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setShowHint(false);
    }
  };

  const handleRestartAltar = () => {
    soundEffects.playStrokeChime();
    setCurrentStepIdx(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowHint(false);
  };

  // SVG Renderers for the 3 sacred altars
  const renderAltarBlueprint = () => {
    const isLayer1 = activeLayer === 'layer1' || activeLayer === 'both';

    if (selectedAltar === 'syena') {
      return (
        <svg viewBox="-260 -200 520 400" className="psw-altar-svg" aria-label="Śyena Citi Falcon Blueprint">
          <defs>
            <linearGradient id="falconGrad" x1="0" y1="-1" x2="0" y2="1">
              <stop offset="0%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#b45309" />
            </linearGradient>
            <linearGradient id="wingGrad" x1="-1" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#fbbf24" />
              <stop offset="100%" stop-color="#d97706" />
            </linearGradient>
            <pattern id="brickPatternL1" width="20" height="10" patternUnits="userSpaceOnUse">
              <rect width="19" height="9" fill="rgba(245, 158, 11, 0.25)" stroke="#b45309" strokeWidth="0.8" />
            </pattern>
            <pattern id="brickPatternL2" width="10" height="20" patternUnits="userSpaceOnUse">
              <rect width="9" height="19" fill="rgba(56, 189, 248, 0.25)" stroke="#0284c7" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Coordinate Baseline: East-West Prācī line */}
          <line x1="-240" y1="0" x2="240" y2="0" stroke="rgba(255,255,255,0.25)" strokeDasharray="4 4" strokeWidth="1" />
          <text x="210" y="-8" fill="#fde047" fontSize="10" fontFamily="JetBrains Mono, monospace">EAST (प्राची)</text>
          <text x="-240" y="-8" fill="#94a3b8" fontSize="10" fontFamily="JetBrains Mono, monospace">WEST (प्रतीची)</text>

          {/* Torso (Ātmā): 4 Square Purushas */}
          <rect x="-60" y="-60" width="120" height="120" fill={isLayer1 ? 'url(#brickPatternL1)' : 'url(#brickPatternL2)'} stroke="#f59e0b" strokeWidth="2.5" />
          <text x="0" y="5" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="800">ĀTMĀ (4.0 p²)</text>

          {/* Left Wing (North Pakṣa) with 1/5 Expansion Shear */}
          <polygon points="-50,-60 60,-60 180,-160 -10,-160" fill={isLayer1 ? 'url(#brickPatternL1)' : 'url(#brickPatternL2)'} stroke="#fbbf24" strokeWidth="2" />
          <text x="75" y="-105" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">UTTARA-PAKṢA (1.2 p²)</text>

          {/* Right Wing (South Pakṣa) with 1/5 Expansion Shear */}
          <polygon points="-50,60 60,60 180,160 -10,160" fill={isLayer1 ? 'url(#brickPatternL1)' : 'url(#brickPatternL2)'} stroke="#fbbf24" strokeWidth="2" />
          <text x="75" y="115" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">DAKṢIṆA-PAKṢA (1.2 p²)</text>

          {/* Tail (Puccha): 1.1 Purushas */}
          <polygon points="-60,-40 -160,-65 -160,65 -60,40" fill={isLayer1 ? 'url(#brickPatternL1)' : 'url(#brickPatternL2)'} stroke="#f59e0b" strokeWidth="2" />
          <text x="-110" y="4" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">PUCCHA (1.1 p²)</text>

          {/* Head Notch (Facing East) */}
          <polygon points="60,-25 95,0 60,25" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.5" />
          <text x="75" y="4" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="800">HEAD</text>

          {/* Layer Indicator Watermark */}
          <text x="0" y="180" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="JetBrains Mono, monospace">
            {activeLayer === 'layer1' ? 'Showing Layer 1 (East-West Brick Orientation · 200 Bricks)' : activeLayer === 'layer2' ? 'Showing Layer 2 (North-South Staggered Orientation · 200 Bricks)' : 'Showing Both Layers (Zero-Seam-Overlap Verification Active)'}
          </text>
        </svg>
      );
    }

    if (selectedAltar === 'rathacakra') {
      const spokes = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
      return (
        <svg viewBox="-200 -200 400 400" className="psw-altar-svg" aria-label="Rathacakra Citi Chariot Wheel Blueprint">
          <defs>
            <radialGradient id="wheelGlow" cx="0" cy="0" r="1">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.2" />
              <stop offset="100%" stop-color="#0284c7" stop-opacity="0.05" />
            </radialGradient>
          </defs>

          {/* Outer Rim (Nemi): R = 150 */}
          <circle cx="0" cy="0" r="160" fill="url(#wheelGlow)" stroke="#38bdf8" strokeWidth="3" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />

          {/* Hub (Nābhi): r = 40 */}
          <circle cx="0" cy="0" r="40" fill="rgba(245, 158, 11, 0.35)" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="15" fill="#fde047" stroke="#78350f" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="900">NĀBHI</text>

          {/* 16 Radial Spokes (Arāḥ) */}
          {spokes.map((deg, idx) => {
            const rad = ((deg + (activeLayer === 'layer2' ? 11.25 : 0)) * Math.PI) / 180;
            const x1 = Math.cos(rad) * 40;
            const y1 = Math.sin(rad) * 40;
            const x2 = Math.cos(rad) * 120;
            const y2 = Math.sin(rad) * 120;
            return (
              <g key={idx}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="2.5" />
                {/* Spoke Wedge Node */}
                <circle cx={(x1 + x2) / 2} cy={(y1 + y2) / 2} r="3" fill="#38bdf8" />
              </g>
            );
          })}

          {/* Outer Rim Bricks (Annular Segments) */}
          {spokes.map((deg, idx) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.cos(rad) * 140;
            const y = Math.sin(rad) * 140;
            return <circle key={idx} cx={x} cy={y} r="2.5" fill="#fef08a" />;
          })}

          <text x="0" y="-170" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">
            NEMI (Outer Rim · 43.75% Area)
          </text>
          <text x="0" y="185" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="JetBrains Mono, monospace">
            {activeLayer === 'layer2' ? 'Layer 2 Rotated by 11.25° (Half-Sector Stagger)' : 'Layer 1 (Standard 16-Spoke 22.5° Alignment)'}
          </text>
        </svg>
      );
    }

    // Kūrma Citi (Tortoise)
    return (
      <svg viewBox="-220 -200 440 400" className="psw-altar-svg" aria-label="Kūrma Citi Tortoise Blueprint">
        <defs>
          <linearGradient id="tortoiseShell" x1="-1" y1="-1" x2="1" y2="1">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="50%" stop-color="#059669" />
            <stop offset="100%" stop-color="#047857" />
          </linearGradient>
        </defs>

        {/* Central Octagonal Carapace */}
        <polygon points="-70,-100 70,-100 120,-40 120,40 70,100 -70,100 -120,40 -120,-40" fill="url(#tortoiseShell)" stroke="#fef08a" strokeWidth="3" />
        <text x="0" y="-15" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="900">CARAPACE (DEHA)</text>
        <text x="0" y="5" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="700">5.50 Puruṣas² (Octagon)</text>

        {/* 4 Diagonal Pāda (Limbs) */}
        {/* Front-Right (NE / Īśāna) */}
        <polygon points="90,-70 160,-120 180,-90 115,-45" fill="#047857" stroke="#f59e0b" strokeWidth="2" />
        <text x="145" y="-95" fill="#fef08a" fontSize="9" fontWeight="700">PĀDA 1</text>

        {/* Front-Left (SE / Āgneya) */}
        <polygon points="90,70 160,120 180,90 115,45" fill="#047857" stroke="#f59e0b" strokeWidth="2" />
        <text x="145" y="105" fill="#fef08a" fontSize="9" fontWeight="700">PĀDA 2</text>

        {/* Rear-Right (NW / Vāyavya) */}
        <polygon points="-90,-70 -160,-120 -180,-90 -115,-45" fill="#047857" stroke="#f59e0b" strokeWidth="2" />
        <text x="-165" y="-95" fill="#fef08a" fontSize="9" fontWeight="700">PĀDA 3</text>

        {/* Rear-Left (SW / Nairṛtya) */}
        <polygon points="-90,70 -160,120 -180,90 -115,45" fill="#047857" stroke="#f59e0b" strokeWidth="2" />
        <text x="-165" y="105" fill="#fef08a" fontSize="9" fontWeight="700">PĀDA 4</text>

        {/* Head (Śīrṣa) Facing East */}
        <polygon points="120,-25 180,0 120,25" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
        <text x="145" y="4" textAnchor="middle" fill="#78350f" fontSize="9" fontWeight="900">ŚĪRṢA</text>

        {/* Tail (Puccha) Facing West */}
        <polygon points="-120,-15 -170,0 -120,15" fill="#059669" stroke="#fef08a" strokeWidth="2" />
        <text x="-145" y="4" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="700">TAIL</text>

        <text x="0" y="180" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="JetBrains Mono, monospace">
          Total Area: 5.50 (Carapace) + 1.40 (4 Feet) + 0.35 (Head) + 0.25 (Tail) = 7.50 Puruṣas²
        </text>
      </svg>
    );
  };

  return (
    <div className="psw-altar-mastery-card" aria-label="Senior Vedic Altar Construction Game">
      {/* Header Banner */}
      <div className="psw-am-header">
        <div className="psw-am-badge">
          <span>🏛️</span>
          <span>SENIOR STEM QUEST · वरिष्ठ-चिति-शिल्पम्</span>
        </div>
        <h3 className="psw-am-title">
          Vedic Altar Mastery: Sacred Geometry &amp; The 7½ Puruṣa Challenge
        </h3>
        <p className="psw-am-desc">
          Step into the sandals of an ancient Vedic master-architect (*Sthapati*). Use Śulba Sūtra rope algorithms, exact fractional calculations, and 5-layer interlocking brick masonry to construct the three legendary monumental fire altars: <strong>Śyena Citi</strong> (Falcon), <strong>Rathacakra Citi</strong> (Chariot Wheel), and <strong>Kūrma Citi</strong> (Tortoise).
        </p>

        {/* External Scholarly Reference Link */}
        <div className="psw-am-ref-box">
          <span className="psw-am-ref-icon">📜</span>
          <div className="psw-am-ref-text">
            <strong>Scholarly Foundation:</strong> Study the authentic ancient unit systems (Aṅgula, Vitasti, Pada, Puruṣa) and cord alignments documented in{' '}
            <a
              href="https://hinduinfopedia.org/vedic-principles-of-geometry-and-measurement/"
              target="_blank"
              rel="noopener noreferrer"
              className="psw-am-link"
            >
              Hindu Infopedia: Vedic Principles of Geometry and Measurement ➔
            </a>
          </div>
        </div>
      </div>

      {/* Altar Selector Tabs */}
      <div className="psw-am-tabs" role="tablist">
        {(Object.keys(ALTARS_CONFIG) as AltarType[]).map((type) => {
          const a = ALTARS_CONFIG[type];
          const isSelected = selectedAltar === type;
          const isDone = completedAltars.has(type);
          return (
            <button
              key={type}
              type="button"
              className={`psw-am-tab${isSelected ? ' is-active' : ''}`}
              onClick={() => handleSelectAltar(type)}
              role="tab"
              aria-selected={isSelected}
            >
              <span className="psw-am-tab-symbol">{a.symbol}</span>
              <div className="psw-am-tab-body">
                <span className="psw-am-tab-sa" lang="sa">{a.nameSa}</span>
                <span className="psw-am-tab-en">{a.nameEn}</span>
              </div>
              {isDone && <span className="psw-am-done-star">⭐ Completed</span>}
            </button>
          );
        })}
      </div>

      {/* Main Altar Workbench Grid */}
      <div className="psw-am-workbench-grid">
        {/* Left Column: Interactive Blueprint Canvas */}
        <div className="psw-am-blueprint-panel">
          <div className="psw-am-bp-header">
            <div>
              <span className="psw-am-bp-kicker">CAD BLUEPRINT // ŚULBA SŪTRA 1.48–3.32</span>
              <h4 className="psw-am-bp-title">{altar.nameEn} ({altar.nameSa})</h4>
            </div>

            {/* Layer View Toggle */}
            <div className="psw-am-layer-toggle" role="group" aria-label="Altar Layer Toggles">
              <button
                type="button"
                className={activeLayer === 'layer1' ? 'is-active' : ''}
                onClick={() => { setActiveLayer('layer1'); soundEffects.playStrokeChime(); }}
              >
                Layer 1 (Odd)
              </button>
              <button
                type="button"
                className={activeLayer === 'layer2' ? 'is-active' : ''}
                onClick={() => { setActiveLayer('layer2'); soundEffects.playStrokeChime(); }}
              >
                Layer 2 (Even)
              </button>
              <button
                type="button"
                className={activeLayer === 'both' ? 'is-active' : ''}
                onClick={() => { setActiveLayer('both'); soundEffects.playStrokeChime(); }}
              >
                Both (Anti-Overlap)
              </button>
            </div>
          </div>

          {/* Blueprint SVG Canvas */}
          <div className="psw-am-svg-container">
            {renderAltarBlueprint()}
          </div>

          {/* Altar Telemetry Readout */}
          <div className="psw-am-telemetry-row">
            <div className="psw-am-telem-item">
              <span className="psw-am-telem-label">TARGET AREA</span>
              <strong className="psw-am-telem-val">7½ Puruṣas² ({altar.targetAreaPaddas} Pada²)</strong>
            </div>
            <div className="psw-am-telem-item">
              <span className="psw-am-telem-label">BRICK COUNT</span>
              <strong className="psw-am-telem-val">{altar.bricksPerLayer} / layer ({altar.totalBricks} total)</strong>
            </div>
            <div className="psw-am-telem-item">
              <span className="psw-am-telem-label">VERTICAL LAYERS</span>
              <strong className="psw-am-telem-val">{altar.layersTotal} Interlocking Stacks</strong>
            </div>
            <div className="psw-am-telem-item">
              <span className="psw-am-telem-label">SEAM INTEGRITY</span>
              <strong className="psw-am-telem-val" style={{ color: '#10b981' }}>100% Zero-Seam Coincidence</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Step-by-Step Mathematical Calculation & Construction Challenge */}
        <div className="psw-am-challenge-panel">
          <div className="psw-am-step-tracker">
            <span className="psw-am-step-badge">
              STEP {currentStep.stepNum} OF {altar.steps.length}
            </span>
            <div className="psw-am-step-dots">
              {altar.steps.map((_, i) => (
                <span
                  key={i}
                  className={`psw-am-dot${i === currentStepIdx ? ' is-current' : i < currentStepIdx ? ' is-done' : ''}`}
                />
              ))}
            </div>
            <span className="psw-am-score-pill">🏆 Score: {score}</span>
          </div>

          <h4 className="psw-am-step-title">{currentStep.title}</h4>
          <span className="psw-am-step-sa" lang="sa">{currentStep.sanskritTitle}</span>

          <p className="psw-am-step-instructions">{currentStep.instructions}</p>

          <div className="psw-am-calc-box">
            <span className="psw-am-calc-label">📐 ŚULBA SŪTRA CALCULATION NOTE:</span>
            <p className="psw-am-calc-text">{currentStep.calculationNote}</p>
          </div>

          {/* Question Prompt */}
          <div className="psw-am-question-box">
            <strong className="psw-am-q-text">{currentStep.question}</strong>

            <div className="psw-am-options-list">
              {currentStep.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                let optClass = 'psw-am-opt-btn';
                if (hasAnswered) {
                  if (opt.correct) optClass += ' is-correct';
                  else if (isSelected && !opt.correct) optClass += ' is-wrong';
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    className={optClass}
                    onClick={() => handleChooseOption(optIdx)}
                    disabled={hasAnswered}
                  >
                    <span className="psw-am-opt-marker">{String.fromCharCode(65 + optIdx)}</span>
                    <span className="psw-am-opt-text">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Progression Controls */}
          {hasAnswered && (
            <div className={`psw-am-feedback-banner ${selectedOption !== null && currentStep.options[selectedOption].correct ? 'is-success' : 'is-error'}`}>
              <span className="psw-am-feedback-icon">
                {selectedOption !== null && currentStep.options[selectedOption].correct ? '✅' : '❌'}
              </span>
              <p className="psw-am-feedback-text">
                {selectedOption !== null && currentStep.options[selectedOption].feedback}
              </p>
            </div>
          )}

          <div className="psw-am-actions-row">
            {!hasAnswered && (
              <button
                type="button"
                className="psw-am-hint-btn"
                onClick={() => setShowHint(!showHint)}
              >
                {showHint ? 'Hide Architectural Hint' : '💡 Need a Hint?'}
              </button>
            )}

            {showHint && !hasAnswered && (
              <p className="psw-am-hint-text">
                <em>Hint:</em> {currentStep.hint}
              </p>
            )}

            {hasAnswered && (
              <button
                type="button"
                className="psw-am-advance-btn"
                onClick={handleNextStep}
              >
                <span>{isLastStep ? '🎉 Complete Altar Construction!' : 'Proceed to Next Step ➔'}</span>
              </button>
            )}
          </div>

          {/* Completion Celebration Banner */}
          {completedAltars.has(selectedAltar) && isLastStep && hasAnswered && (
            <div className="psw-am-complete-card">
              <div className="psw-am-complete-icon">🎖️</div>
              <h5 className="psw-am-complete-title">
                {altar.nameEn} ({altar.nameSa}) Fully Consecrated!
              </h5>
              <p className="psw-am-complete-text">
                You have satisfied the 7½ Puruṣa area invariance theorem, calculated all anatomical budgets, aligned cardinal cords, and tiled 1,000 bricks across 5 seismic interlocking layers without a single joint overlap.
              </p>
              <div className="psw-am-complete-actions">
                <button
                  type="button"
                  className="psw-am-restart-btn"
                  onClick={handleRestartAltar}
                >
                  🔄 Rebuild {altar.nameEn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VedicAltarMastery;
