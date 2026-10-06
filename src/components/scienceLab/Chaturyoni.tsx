import React, { useState } from 'react';
import { CoreIdea, TermPanel, type LabTerm } from './common';
import { isSmallScreen, prefersReducedMotion } from './motion';

type Mode = 'yoni' | 'sthiti' | 'plants';

interface Zone {
  id: string;
  dev: string;
  iast: string;
  en: string;
  icon: string;
  src: string;
  hint: string;
  color: string;
  tint: string;
  /** Operational-definition tag (game-voice heading). */
  tag: string;
  /** Operational definition: what the text says. */
  def: string;
  /** Short modern note under the definition. */
  modern?: string;
}

interface Linnaean {
  rank: string;
  sci: string;
  facts: string;
}

interface Specimen {
  id: string;
  icon: string;
  en: string;
  group: string;
  dev: string;
  iast: string;
  /** Correct zone per mode (only for the modes the specimen appears in). */
  zone: Partial<Record<Mode, string>>;
  note: string;
  modern?: string;
  lin: Linnaean;
}

const ZONES: Record<Mode, Zone[]> = {
  yoni: [
    { id: 'jarayuja', dev: 'जरायुज', iast: 'jarāyuja', en: 'born from a womb', icon: '🐾', src: 'Manu 1.43', hint: 'born alive, wrapped in a birth membrane (jarāyu)', color: '#be123c', tint: '#ffe4e6', tag: 'Placental Vivipary', def: 'Born enclosed in a jarāyu, the membrane around the unborn (chorion, caul). Manu lists cattle, deer, beasts of prey and humans.', modern: 'Modern match: most mammals.' },
    { id: 'andaja', dev: 'अण्डज', iast: 'aṇḍaja', en: 'born from an egg', icon: '🥚', src: 'Manu 1.44', hint: 'hatches from an egg', color: '#b45309', tint: '#fef3c7', tag: 'Oviparous Embryogenesis', def: 'Born from an aṇḍa (egg). Manu lists birds, snakes, crocodiles, fish and tortoises.', modern: 'Modern note: amphibians lay eggs too; some snakes and fish give live birth.' },
    { id: 'svedaja', dev: 'स्वेदज', iast: 'svedaja', en: 'born from moisture and heat', icon: '💧', src: 'Manu 1.45', hint: 'small insects the text says arise from sweat and heat', color: '#0f766e', tint: '#ccfbf1', tag: 'Moisture-born · in the text', def: 'Beings said to arise from sveda (sweat, moisture) and heat. Manu names gnats, mosquitoes, lice, flies and bugs.', modern: 'Modern check: insects hatch from eggs; there is no spontaneous generation.' },
    { id: 'udbhijja', dev: 'उद्भिज्ज', iast: 'udbhijja', en: 'sprouting from the earth', icon: '🌱', src: 'Manu 1.46', hint: 'breaks up through the soil from a seed or cutting', color: '#15803d', tint: '#dcfce7', tag: 'Terrestrial Phytogenesis', def: 'ud (up) + bhid (burst, split) + ja (born): plants that burst up through the earth, from seed or cutting. Covers trees, herbs, creepers and grasses.', modern: 'Modern note: plants build themselves from light, water, air and soil minerals.' },
  ],
  sthiti: [
    { id: 'jangama', dev: 'जङ्गम', iast: 'jaṅgama', en: 'moving', icon: '🏃', src: 'Aitareya Up. 3.3', hint: 'walks, swims, crawls or flies', color: '#c2410c', tint: '#ffedd5', tag: 'Mobile Units', def: 'Beings that move: walking, swimming, crawling or flying. Aitareya 3.3 lists moving (jaṅgama) and flying (patatri) side by side.' },
    { id: 'sthavara', dev: 'स्थावर', iast: 'sthāvara', en: 'stationary', icon: '🪨', src: 'Manu 1.46', hint: 'stays rooted in one place', color: '#047857', tint: '#d1fae5', tag: 'Rooted Units', def: 'Beings fixed in one place. Manu 1.46: all plants (udbhijja) are sthāvara.' },
  ],
  plants: [
    { id: 'vanaspati', dev: 'वनस्पति', iast: 'vanaspati', en: 'fruit without visible flowers', icon: '🌳', src: 'Manu 1.47', hint: 'a tree whose fruit comes with no flowers you can see', color: '#15803d', tint: '#dcfce7', tag: 'Hidden-Bloom Trees', def: 'Manu 1.47: apuṣpāḥ phalavantaḥ, “fruitful without flowers”. Trees with both flowers and fruit are vṛkṣa.', modern: 'Modern note: figs do flower; the tiny flowers are hidden inside the fruit.' },
    { id: 'oshadhi', dev: 'ओषधि', iast: 'oṣadhi', en: 'ends when its fruit ripens', icon: '🌾', src: 'Manu 1.46', hint: 'a crop plant that dies after its grain or fruit ripens', color: '#b45309', tint: '#fef3c7', tag: 'One-Season Crops', def: 'Manu 1.46: many flowers and fruits, and phala-pāka-antāḥ, the plant ends when its fruit ripens.', modern: 'Modern match: annual plants.' },
    { id: 'pratana', dev: 'प्रतान · वल्ली', iast: 'pratāna · vallī', en: 'creepers and climbers', icon: '🍃', src: 'Manu 1.48', hint: 'spreads or climbs with long stems', color: '#0f766e', tint: '#ccfbf1', tag: 'Spreader Vines', def: 'Manu 1.48: pratāna (spreading) and vallī (climbing) plants that grow from seed or cutting.' },
    { id: 'trina', dev: 'तृण', iast: 'tṛṇa', en: 'grasses', icon: '🌿', src: 'Manu 1.48', hint: 'a grass', color: '#c2410c', tint: '#ffedd5', tag: 'Grass Tiles', def: 'Manu 1.48: tṛṇa-jātayaḥ, the kinds of grass.' },
  ],
};

const ZONE_BY_ID: Record<string, Zone> = Object.fromEntries(
  (Object.values(ZONES) as Zone[][]).flat().map((z) => [z.id, z]),
);

/** The specimen's full Sanskrit taxonomy: mobility → origin → (plant class). */
const taxonomy = (sp: Specimen): { m: Mode; z: Zone }[] => {
  const out: { m: Mode; z: Zone }[] = [
    { m: 'sthiti', z: ZONE_BY_ID[sp.zone.sthiti ?? 'sthavara'] },
    { m: 'yoni', z: ZONE_BY_ID[sp.zone.yoni ?? 'udbhijja'] },
  ];
  if (sp.zone.plants) out.push({ m: 'plants', z: ZONE_BY_ID[sp.zone.plants] });
  return out;
};

const HUB: Record<Mode, { dev: string; iast: string }> = {
  yoni: { dev: 'योनि', iast: 'yoni · origin' },
  sthiti: { dev: 'गति', iast: 'gati · motion' },
  plants: { dev: 'उद्भिद्', iast: 'udbhid · plant' },
};

const ANIMALS_AND_PLANTS: Specimen[] = [
  { id: 'deer', icon: '🦌', en: 'Deer', group: 'Mammals', dev: 'मृगः', iast: 'mṛgaḥ', zone: { yoni: 'jarayuja', sthiti: 'jangama' }, note: 'Manu 1.43 names mṛgāḥ (wild animals) among the womb-born.', lin: { rank: 'Class Mammalia', sci: 'Deer family, Cervidae (e.g. chital, Axis axis)', facts: 'Warm-blooded (endothermic), milk glands, and like most mammals gives live birth after growing in a womb with a placenta.' } },
  { id: 'cow', icon: '🐄', en: 'Cow', group: 'Mammals', dev: 'गौः', iast: 'gauḥ', zone: { yoni: 'jarayuja', sthiti: 'jangama' }, note: 'Manu 1.43 opens the womb-born list with paśavaḥ (domestic animals).', lin: { rank: 'Class Mammalia', sci: 'Cattle, Bos taurus and Bos indicus', facts: 'Warm-blooded (endothermic), milk glands; calves are born alive after about nine months in the womb.' } },
  { id: 'human', icon: '🧍', en: 'Human', group: 'Mammals', dev: 'मनुष्यः', iast: 'manuṣyaḥ', zone: { yoni: 'jarayuja', sthiti: 'jangama' }, note: 'Manu 1.43 lists manuṣyāḥ (humans) as jarāyuja.', lin: { rank: 'Class Mammalia', sci: 'Homo sapiens (order Primates)', facts: 'Warm-blooded (endothermic), milk glands; babies grow in the womb, fed through a placenta.' } },
  { id: 'swan', icon: '🦢', en: 'Swan', group: 'Birds', dev: 'हंसः', iast: 'haṃsaḥ', zone: { yoni: 'andaja', sthiti: 'jangama' }, note: 'Manu 1.44: pakṣiṇaḥ (birds) are egg-born.', lin: { rank: 'Class Aves', sci: 'Swans, genus Cygnus (duck family, Anatidae)', facts: 'Internal fertilization; hard, calcium-shelled eggs kept warm by the parents.' } },
  { id: 'cobra', icon: '🐍', en: 'Cobra', group: 'Reptiles', dev: 'सर्पः', iast: 'sarpaḥ', zone: { yoni: 'andaja', sthiti: 'jangama' }, note: 'Manu 1.44 names sarpāḥ (snakes) among the egg-born.', lin: { rank: 'Reptiles (traditional class Reptilia)', sci: 'Indian cobra, Naja naja (order Squamata)', facts: 'Internal fertilization; leathery-shelled eggs. Modern cladistics places birds inside the reptile group.' } },
  { id: 'fish', icon: '🐟', en: 'Fish', group: 'Fish', dev: 'मत्स्यः', iast: 'matsyaḥ', zone: { yoni: 'andaja', sthiti: 'jangama' }, note: 'Manu 1.44 names matsyāḥ (fish).', lin: { rank: 'Fishes (Pisces is an informal grouping, not one class)', sci: 'e.g. rohu, Labeo rohita (ray-finned fishes)', facts: 'Most lay eggs with external fertilization; the young first feed on a yolk sac.' } },
  { id: 'tortoise', icon: '🐢', en: 'Tortoise', group: 'Reptiles', dev: 'कच्छपः', iast: 'kacchapaḥ', zone: { yoni: 'andaja', sthiti: 'jangama' }, note: 'Manu 1.44 names kacchapāḥ (tortoises).', lin: { rank: 'Reptiles (traditional class Reptilia)', sci: 'Tortoises and turtles, order Testudines', facts: 'Internal fertilization; hard or leathery-shelled eggs buried in nests. Birds sit inside the reptile group in modern cladistics.' } },
  {
    id: 'mosquito', icon: '🦟', en: 'Mosquito', group: 'Insects', dev: 'मशकः', iast: 'maśakaḥ', zone: { yoni: 'svedaja', sthiti: 'jangama' },
    note: 'Manu 1.45 names maśaka (mosquito) among the sweat-born.',
    modern: 'Modern check: mosquitoes hatch from eggs laid by adult females, often on still water. Nothing is born from sweat or heat alone.',
    lin: { rank: 'Phylum Arthropoda · Class Insecta', sci: 'Mosquitoes, family Culicidae (e.g. Aedes, Anopheles)', facts: 'Complete metamorphosis: egg → larva → pupa → adult. Larvae live in still water, likely why old texts linked them to moisture.' },
  },
  {
    id: 'fly', icon: '🪰', en: 'Housefly', group: 'Insects', dev: 'मक्षिका', iast: 'makṣikā', zone: { yoni: 'svedaja', sthiti: 'jangama' },
    note: 'Manu 1.45 names makṣika (fly) among the sweat-born.',
    modern: 'Modern check: flies lay eggs on rotting food, so maggots seemed to appear from it. Francesco Redi’s covered jars (1668) showed: no eggs, no maggots.',
    lin: { rank: 'Phylum Arthropoda · Class Insecta', sci: 'Housefly, Musca domestica (order Diptera)', facts: 'Complete metamorphosis: egg → larva (maggot) → pupa → adult. Larvae thrive in warm, moist, decaying matter, likely why old texts linked them to moisture and heat.' },
  },
  { id: 'lotus', icon: '🪷', en: 'Lotus', group: 'Plants', dev: 'पद्मम्', iast: 'padmam', zone: { yoni: 'udbhijja', sthiti: 'sthavara' }, note: 'Manu 1.46: all stationary plants are udbhijja, growing from seed or cutting.', lin: { rank: 'Kingdom Plantae', sci: 'Sacred lotus, Nelumbo nucifera', facts: 'A flowering plant (angiosperm) rooted in pond mud; grows from seed or rhizome.' } },
  { id: 'banyan', icon: '🌳', en: 'Banyan', group: 'Plants', dev: 'न्यग्रोधः', iast: 'nyagrodhaḥ', zone: { yoni: 'udbhijja', sthiti: 'sthavara' }, note: 'Trees sprout from seed: udbhijja and sthāvara (Manu 1.46).', lin: { rank: 'Kingdom Plantae', sci: 'Banyan, Ficus benghalensis (fig family, Moraceae)', facts: 'A flowering plant (angiosperm): its tiny flowers hide inside the fig, which is why figs fit Manu’s vanaspati, “fruit without (visible) flowers” (1.47).' } },
  { id: 'rice', icon: '🌾', en: 'Rice', group: 'Plants', dev: 'व्रीहिः', iast: 'vrīhiḥ', zone: { yoni: 'udbhijja', sthiti: 'sthavara' }, note: 'A crop that sprouts from seed: udbhijja and sthāvara (Manu 1.46).', lin: { rank: 'Kingdom Plantae', sci: 'Rice, Oryza sativa (grass family, Poaceae)', facts: 'A flowering grass grown as an annual: the plant dies after the grain ripens, matching Manu’s oṣadhi (1.46).' } },
];

const PLANTS: Specimen[] = [
  { id: 'udumbara', icon: '🌳', en: 'Cluster fig', group: 'Udumbara', dev: 'उदुम्बरः', iast: 'udumbaraḥ', zone: { plants: 'vanaspati' }, note: 'A fig: its tiny flowers are hidden inside the fruit, so it fits Manu 1.47’s “fruit without flowers”.', lin: { rank: 'Kingdom Plantae', sci: 'Cluster fig, Ficus racemosa (Moraceae)', facts: 'A flowering plant (angiosperm). Its tiny flowers line the inside of the fig and are pollinated by fig wasps.' } },
  { id: 'ashvattha', icon: '🍃', en: 'Peepal', group: 'Aśvattha', dev: 'अश्वत्थः', iast: 'aśvatthaḥ', zone: { plants: 'vanaspati' }, note: 'Another fig: the flowers sit hidden inside the little figs.', lin: { rank: 'Kingdom Plantae', sci: 'Peepal, Ficus religiosa (Moraceae)', facts: 'A flowering plant (angiosperm) with flowers hidden inside its small figs; also pollinated by fig wasps.' } },
  { id: 'vrihi', icon: '🌾', en: 'Rice', group: 'Vrīhi', dev: 'व्रीहिः', iast: 'vrīhiḥ', zone: { plants: 'oshadhi' }, note: 'Rice plants die after the grain ripens: phala-pāka-antāḥ, “ending with the ripening of the fruit” (Manu 1.46).', lin: { rank: 'Kingdom Plantae', sci: 'Rice, Oryza sativa (Poaceae)', facts: 'Botanically a grass, grown as an annual: the plant dies after its grain ripens.' } },
  { id: 'yava', icon: '🌾', en: 'Barley', group: 'Yava', dev: 'यवः', iast: 'yavaḥ', zone: { plants: 'oshadhi' }, note: 'Barley too lives one season and ends when its grain ripens.', lin: { rank: 'Kingdom Plantae', sci: 'Barley, Hordeum vulgare (Poaceae)', facts: 'An annual cereal grass: it dies after its grain ripens.' } },
  { id: 'draksha', icon: '🍇', en: 'Grapevine', group: 'Drākṣā', dev: 'द्राक्षा', iast: 'drākṣā', zone: { plants: 'pratana' }, note: 'A climber that holds on with tendrils: a vallī.', lin: { rank: 'Kingdom Plantae', sci: 'Grapevine, Vitis vinifera (Vitaceae)', facts: 'A woody climber that grips supports with tendrils.' } },
  { id: 'guduchi', icon: '🌿', en: 'Guḍūcī vine', group: 'Tinospora', dev: 'गुडूची', iast: 'guḍūcī', zone: { plants: 'pratana' }, note: 'A climbing vine that winds around trees.', lin: { rank: 'Kingdom Plantae', sci: 'Guḍūcī, Tinospora cordifolia (Menispermaceae)', facts: 'A twining climber that drops long aerial roots.' } },
  { id: 'durva', icon: '🌱', en: 'Dūrvā grass', group: 'Bermuda grass', dev: 'दूर्वा', iast: 'dūrvā', zone: { plants: 'trina' }, note: 'A low creeping grass: tṛṇa (Manu 1.48: tṛṇa-jātayaḥ).', lin: { rank: 'Kingdom Plantae', sci: 'Bermuda grass, Cynodon dactylon (Poaceae)', facts: 'A perennial grass that spreads by runners.' } },
  { id: 'kusha', icon: '🌾', en: 'Kuśa grass', group: 'Kuśa', dev: 'कुशः', iast: 'kuśaḥ', zone: { plants: 'trina' }, note: 'A grass spread out in Vedic rituals and woven into seats: tṛṇa.', lin: { rank: 'Kingdom Plantae', sci: 'Kuśa, Desmostachya bipinnata (Poaceae)', facts: 'A tall, tough perennial grass.' } },
];

const SPECIMENS: Record<Mode, Specimen[]> = { yoni: ANIMALS_AND_PLANTS, sthiti: ANIMALS_AND_PLANTS, plants: PLANTS };

const MODE_LABEL: Record<Mode, string> = { yoni: 'Chaturyoni', sthiti: 'Sthāvara / Jaṅgama', plants: 'Plant Shelf' };

const TERMS: LabTerm[] = [
  { dev: 'जरायुज', iast: 'jarāyuja', tag: 'SPAWN CLASS // Womb Protocol', game: 'Born alive from a membrane-wrapped womb: deer, cows, humans (Manu 1.43).', en: 'womb-born; jarāyu is the membrane around an unborn young' },
  { dev: 'अण्डज', iast: 'aṇḍaja', tag: 'SPAWN CLASS // Shell Boot', game: 'Hatches from an egg: birds, snakes, fish, tortoises (Manu 1.44).', en: 'egg-born' },
  { dev: 'स्वेदज', iast: 'svedaja', tag: 'SPAWN CLASS // Heat-Mist Glitch', game: 'The old spawn rule for gnats, mosquitoes, lice, flies and bugs: from sweat and heat (Manu 1.45). Patched by modern biology: they hatch from eggs.', en: 'sweat-born, moisture-born' },
  { dev: 'उद्भिज्ज', iast: 'udbhijja', tag: 'SPAWN CLASS // Ground Breach', game: 'Bursts up through the soil from seed or cutting: every stationary plant (Manu 1.46).', en: 'sprouting, breaking through the earth' },
  { dev: 'स्थावर', iast: 'sthāvara', tag: 'MOBILITY // Anchored Unit', game: 'Stays put in one place: plants.', en: 'stationary, fixed' },
  { dev: 'जङ्गम', iast: 'jaṅgama', tag: 'MOBILITY // Roaming Unit', game: 'Moves about: animals and people.', en: 'moving, mobile' },
  { dev: 'वनस्पति', iast: 'vanaspati', tag: 'PLANT CLASS // Hidden-Bloom Tree', game: 'Fruit with no visible flowers (Manu 1.47). Figs such as udumbara fit: their tiny flowers hide inside the fruit.', en: 'lord of the forest; a large tree', note: 'Manu 1.47 gives the narrow sense' },
  { dev: 'ओषधि', iast: 'oṣadhi', tag: 'PLANT CLASS // One-Season Crop', game: 'Many flowers and fruits, and the plant ends when its fruit ripens (Manu 1.46): rice, barley.', en: 'herb, annual plant' },
  { dev: 'वीरुध्', iast: 'vīrudh', tag: 'PLANT CLASS // Spreader Vine', game: 'A spreading creeper in the Amarakośa (2.4.9); Manu 1.48 calls creepers pratāna and vallī.', en: 'plant, creeper', note: 'In the Vedas often plants in general' },
  { dev: 'तृण', iast: 'tṛṇa', tag: 'PLANT CLASS // Grass Tile', game: 'Grasses such as dūrvā and kuśa (Manu 1.48: tṛṇa-jātayaḥ).', en: 'grass' },
  { dev: 'कृमि', iast: 'kṛmi', tag: 'THREAT CLASS // Stealth Pest', game: 'Worms and pests in the Atharvaveda, both seen and unseen (dṛṣṭa, adṛṣṭa; AV 2.31.2).', en: 'worm, insect, pest' },
  { dev: 'योनि', iast: 'yoni', en: 'origin, source; place of birth' },
];

const MODE_INTRO: Record<Mode, { sa: string; en: string }> = {
  yoni: { sa: 'चतुर्योनि।', en: 'Four kinds of birth (Manusmṛti 1.43–46): womb, egg, moisture-and-heat, sprout.' },
  sthiti: { sa: 'स्थावरं जङ्गमं च।', en: 'Stationary or moving? (Aitareya Upaniṣad 3.3; Manusmṛti 1.46)' },
  plants: { sa: 'उद्भिज्ज-भेदाः।', en: 'Plant shelf: four plant groups from Manusmṛti 1.46–48.' },
};

let feedSeq = 0;
const nextFeedId = () => ++feedSeq;

type Feed = { id: number; ok: boolean; sa: string; en: string; modern?: string };

const emptyPlaced = (): Record<Mode, Record<string, string>> => ({ yoni: {}, sthiti: {}, plants: {} });

const Chaturyoni: React.FC = () => {
  const [mode, setMode] = useState<Mode>('yoni');
  const [placed, setPlaced] = useState(emptyPlaced);
  const [misses, setMisses] = useState<Record<Mode, number>>({ yoni: 0, sthiti: 0, plants: 0 });
  const [selected, setSelected] = useState<string | null>('deer');
  const [feed, setFeed] = useState<Feed[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const [pop, setPop] = useState<string | null>(null);
  const [paused, setPaused] = useState(() => prefersReducedMotion());
  const [zoom, setZoom] = useState(100);
  const [notes, setNotes] = useState(() => !isSmallScreen());
  const [dragOver, setDragOver] = useState<string | null>(null);

  const zones = ZONES[mode];
  const specs = SPECIMENS[mode];
  const here = placed[mode];
  const left = specs.filter((s) => !here[s.id]);
  const done = specs.length - left.length;
  const cur = specs.find((s) => s.id === selected && !here[s.id]) || null;
  const curPlaced = specs.find((s) => s.id === selected && here[s.id]) || null;
  const complete = left.length === 0;

  const push = (f: Omit<Feed, 'id'>) => setFeed((old) => [{ ...f, id: nextFeedId() }, ...old].slice(0, 3));

  const switchMode = (m: Mode) => {
    setMode(m);
    const first = SPECIMENS[m].find((s) => !placed[m][s.id]);
    setSelected(first ? first.id : null);
    setFeed([{ id: nextFeedId(), ok: true, sa: MODE_INTRO[m].sa, en: MODE_INTRO[m].en }]);
  };

  const assign = (zoneId: string, specId: string | null = selected) => {
    const sp = specs.find((s) => s.id === specId);
    if (!sp || here[sp.id]) {
      push({ ok: false, sa: 'प्रथमं नमूनं चिनु।', en: 'Pick a specimen first (tap one in the tray, or drag it onto a tile).' });
      return;
    }
    const z = zones.find((x) => x.id === zoneId)!;
    const right = sp.zone[mode];
    if (right === zoneId) {
      const nextPlaced = { ...here, [sp.id]: zoneId };
      setPlaced((p) => ({ ...p, [mode]: nextPlaced }));
      setPop(zoneId);
      window.setTimeout(() => setPop((x) => (x === zoneId ? null : x)), 700);
      push({ ok: true, sa: `साधु! ${sp.dev} → ${z.dev}`, en: `${sp.en} → ${z.iast} (${z.en}). ${sp.note}`, modern: sp.modern });
      // Keep the matched specimen selected so its unlocked readout stays on screen.
      setSelected(sp.id);
      const next = specs.find((s) => !nextPlaced[s.id] && s.id !== sp.id);
      if (!next) push({ ok: true, sa: 'सर्वं सम्यक्!', en: `All ${specs.length} matched in ${MODE_LABEL[mode]}. Map complete.` });
    } else {
      setMisses((m) => ({ ...m, [mode]: m[mode] + 1 }));
      setPop(null);
      setShake(zoneId);
      window.setTimeout(() => setShake((x) => (x === zoneId ? null : x)), 500);
      const rz = zones.find((x) => x.id === right)!;
      push({ ok: false, sa: `न, पुनः प्रयतस्व। (${z.dev} न)`, en: `Not ${z.iast} (${z.en}). Hint: the text’s group for a ${sp.en.toLowerCase()} is the one that ${rz.hint}.` });
    }
  };

  const reset = () => {
    setPlaced((p) => ({ ...p, [mode]: {} }));
    setMisses((m) => ({ ...m, [mode]: 0 }));
    setSelected(specs[0].id);
    setFeed([]);
  };

  const shown = cur || curPlaced;
  const shownZone = curPlaced ? zones.find((z) => z.id === here[curPlaced.id]) : null;

  return (
    <div className="vl-sim cy-sim">
      <CoreIdea>
        Ancient Indian texts classify life by origin (<em>Chaturyoni</em>) and by movement (<em>Sthāvara–Jaṅgama</em>). The
        fourfold layout is preserved in <em>Manusmṛti</em> (1.43–46), which sorts beings into four groups: womb-born
        (placental vivipary), egg-born (oviparous), sweat/moisture-born (an old belief in generation from moisture and heat),
        and earth-sprouting plants. The <em>Chāndogya Upaniṣad</em> (6.3.1), generally dated earlier, names only three:
        āṇḍaja, jīvaja and udbhijja; Ādi Śaṅkarācārya’s commentary (bhāṣya, भाष्य) explains the missing sweat-born as folded into these groups. Match
        each specimen to the text’s group, then check what modern biology says.
      </CoreIdea>

      <div className={`cy-lab${paused ? ' is-paused' : ''}`} data-testid="cy-lab" data-mode={mode} style={{ '--cy-zoom': zoom / 100 } as React.CSSProperties}>
        <div className="cy-main">
          <div className="cy-window">
            <div className="cy-window-head">
              <span className="cy-window-title">
                {mode === 'yoni' ? 'SPAWN MAP' : mode === 'sthiti' ? 'MOBILITY MAP' : 'PLANT SHELF'} <i>//</i>{' '}
                <span lang="sa">{mode === 'yoni' ? 'चतुर्योनि' : mode === 'sthiti' ? 'स्थावर-जङ्गम' : 'उद्भिज्ज-भेदाः'}</span>
              </span>
              <span className="cy-head-btns">
              <button
                type="button"
                className={`cy-notes${notes ? ' is-on' : ''}`}
                onClick={() => setNotes((x) => !x)}
                aria-pressed={notes}
                data-testid="cy-notes"
              >
                📖 <span>Field notes</span>
              </button>
              <button
                type="button"
                className="cy-pause"
                onClick={() => setPaused((x) => !x)}
                aria-label={paused ? 'Play the board animation' : 'Pause the board animation'}
                aria-pressed={paused}
                data-testid="cy-pause"
              >
                {paused ? (
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M6 4l10 6-10 6z" fill="currentColor" /></svg>
                ) : (
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><rect x="5" y="4" width="3.4" height="12" rx="1" fill="currentColor" /><rect x="11.6" y="4" width="3.4" height="12" rx="1" fill="currentColor" /></svg>
                )}
              </button>
              </span>
            </div>
            <div className={`cy-board cy-board--${zones.length}${notes ? ' has-notes' : ''}`} data-testid="cy-board">
              {zones.map((z) => {
                const items = specs.filter((s) => here[s.id] === z.id);
                return (
                  <button
                    key={z.id}
                    type="button"
                    className={`cy-zone${shake === z.id ? ' is-wrong' : ''}${pop === z.id ? ' is-right' : ''}${dragOver === z.id ? ' is-over' : ''}`}
                    style={{ '--z': z.color, '--zt': z.tint } as React.CSSProperties}
                    onClick={() => assign(z.id)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(z.id);
                    }}
                    onDragLeave={() => setDragOver((x) => (x === z.id ? null : x))}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(null);
                      const id = e.dataTransfer.getData('text/plain');
                      if (id) {
                        setSelected(id);
                        assign(z.id, id);
                      }
                    }}
                    aria-label={`${z.iast}, ${z.en}. ${items.length} placed. ${cur ? `Place ${cur.en} here.` : ''}`}
                    data-testid={`cy-zone-${z.id}`}
                    data-count={items.length}
                  >
                    <span className="cy-badge">
                      <span className="cy-badge-icon" aria-hidden="true">{z.icon}</span>
                      <span className="cy-badge-dev" lang="sa">{z.dev}</span>
                    </span>
                    <span className="cy-zone-iast">{z.iast}</span>
                    <span className="cy-zone-en">{z.en}</span>
                    <span className="cy-zone-src">{z.src}</span>
                    <span className="cy-zone-tag">{z.tag}</span>
                    {notes && (
                      <span className="cy-zone-def" data-testid={`cy-def-${z.id}`}>
                        {z.def}
                        {z.modern && <span className="cy-zone-modern">{z.modern}</span>}
                      </span>
                    )}
                    {items.length > 0 && (
                      <span className="cy-zone-items">
                        {items.map((s) => (
                          <span key={s.id} className="cy-placed" title={`${s.en} · ${s.dev}`}>
                            <span aria-hidden="true">{s.icon}</span> {s.en}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
              <div className="cy-hub" aria-hidden="true">
                <span lang="sa">{HUB[mode].dev}</span>
                <small>{HUB[mode].iast}</small>
              </div>
            </div>
            <div className="cy-ticker" role="log" aria-live="polite" aria-label="Feedback" data-testid="cy-ticker">
              {feed.length === 0 ? (
                <p className="cy-feed is-idle">
                  <b lang="sa">आरभस्व!</b> Start: pick a specimen, then tap its tile (or drag it there).
                </p>
              ) : (
                feed.map((f, i) => (
                  <p key={f.id} className={`cy-feed${f.ok ? ' is-ok' : ' is-no'}${i === 0 ? ' is-new' : ''}`}>
                    <b lang="sa">{f.sa}</b> <span>{f.en}</span>
                    {f.modern && <span className="cy-modern">🔬 {f.modern}</span>}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>

        <aside className="cy-panel" aria-label="Control panel">
          <div className="cy-stats" data-testid="cy-stats">
            <div>
              <span>CURRENT UNIT</span>
              <b data-testid="cy-current">{shown ? <><span aria-hidden="true">{shown.icon}</span> {shown.en}</> : '—'}</b>
              <small>{shown ? shown.group : 'all placed'}</small>
            </div>
            <div>
              <span>SANSKRIT MODE</span>
              <b lang="sa">{shownZone ? shownZone.dev : shown ? shown.dev : '—'}</b>
              <small>{shownZone ? shownZone.iast : shown ? shown.iast : ''}</small>
            </div>
            <div>
              <span>SCORE / MATCH</span>
              <b data-testid="cy-score">{done}/{specs.length}</b>
              <small data-testid="cy-misses">misses: {misses[mode]}</small>
            </div>
          </div>

          {shown && (
            <section className="cy-readout" data-testid="cy-readout" aria-label={`Readout: ${shown.en}`}>
              <div className="cy-ro-head">
                <span className="cy-ro-icon" aria-hidden="true">{shown.icon}</span>
                <span>
                  <b>{shown.en}</b> <span lang="sa">{shown.dev}</span> <i>{shown.iast}</i>
                </span>
              </div>
              <span className="cy-ro-label">Sanskrit Taxonomy</span>
              <div className="cy-ro-chain" data-testid="cy-ro-chain">
                {taxonomy(shown).map((l, i, arr) => {
                  const locked = l.m === mode && !here[shown.id];
                  return (
                    <React.Fragment key={l.m}>
                      <span className={`cy-ro-step${locked ? ' is-locked' : ''}`} style={{ '--z': l.z.color, '--zt': l.z.tint } as React.CSSProperties}>
                        {locked ? (
                          <>🔒 <small>match to reveal</small></>
                        ) : (
                          <>
                            <b lang="sa">{l.z.dev}</b> <i>{l.z.iast}</i>
                            <small>{l.z.en}{l.z.id === 'svedaja' ? ' (in the text)' : ''}</small>
                          </>
                        )}
                      </span>
                      {i < arr.length - 1 && <span className="cy-ro-arrow" aria-hidden="true">→</span>}
                    </React.Fragment>
                  );
                })}
              </div>
              <span className="cy-ro-label">Linnaean Counterpart</span>
              <div className="cy-ro-lin" data-testid="cy-ro-lin">
                <b>{shown.lin.rank}</b>
                <i>{shown.lin.sci}</i>
                <p>{shown.lin.facts}</p>
              </div>
            </section>
          )}

          <div className="cy-group">
            <span className="cy-label" id="cy-sys">Classification System</span>
            <div className="cy-seg" role="radiogroup" aria-labelledby="cy-sys">
              {(['yoni', 'sthiti', 'plants'] as Mode[]).map((m) => (
                <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? 'is-on' : ''} onClick={() => switchMode(m)} data-testid={`cy-mode-${m}`}>
                  {MODE_LABEL[m]}
                </button>
              ))}
            </div>
            <button type="button" className="cy-reset" onClick={reset} data-testid="cy-reset">↺ Reset Map</button>
          </div>

          <div className="cy-group">
            <span className="cy-label">Select Specimen to Match</span>
            <div className="cy-tray" data-testid="cy-tray">
              {left.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', s.id);
                    e.dataTransfer.effectAllowed = 'move';
                    // No re-render here: changing the readout mid-drag would shift the tray under the pointer.
                  }}
                  onDragEnd={() => setDragOver(null)}
                  className={`cy-chip${selected === s.id ? ' is-sel' : ''}`}
                  aria-pressed={selected === s.id}
                  onClick={() => setSelected(s.id)}
                  data-testid={`cy-spec-${s.id}`}
                >
                  <span className="cy-chip-icon" aria-hidden="true">{s.icon}</span>
                  <span className="cy-chip-text">
                    <b>{s.en}</b>
                    <small>{s.group}</small>
                  </span>
                </button>
              ))}
              {complete && (
                <p className="cy-complete" role="status" data-testid="cy-complete">
                  🏆 <b lang="sa">सर्वं सम्यक्!</b> All {specs.length} matched. Try another system, or Reset Map.
                </p>
              )}
            </div>
          </div>

          <div className="cy-group">
            <span className="cy-label">Assign {mode === 'plants' ? 'Plant Class' : mode === 'sthiti' ? 'Mobility' : 'Yoni Category'}</span>
            <div className={`cy-assign cy-assign--${zones.length}`}>
              {zones.map((z) => (
                <button key={z.id} type="button" disabled={!cur} style={{ '--z': z.color, '--zt': z.tint } as React.CSSProperties} onClick={() => assign(z.id)} data-testid={`cy-assign-${z.id}`}>
                  <span lang="sa">{z.dev}</span> <small>{z.iast}</small>
                </button>
              ))}
            </div>
          </div>

          <label className="cy-group cy-zoom">
            <span className="cy-label">
              Diagram Zoom Scale <b>{zoom}%</b>
            </span>
            <input type="range" min={80} max={130} step={5} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} aria-label="Diagram zoom scale" data-testid="cy-zoom" />
          </label>
        </aside>
      </div>

      {mode === 'sthiti' && (
        <p className="vl-small cy-note">
          The Aitareya Upaniṣad (3.3) lists “whatever breathes, moving (jaṅgama) and flying (patatri), and whatever is
          stationary (sthāvara)”. In this game flying counts as moving. Manusmṛti 1.46 calls all plants sthāvara.
        </p>
      )}
      {mode === 'plants' && (
        <p className="vl-small cy-note">
          Plant classes follow Manusmṛti 1.46–48. The text also names vṛkṣa (trees with both flowers and fruit) and bushes
          (guccha, gulma); this shelf uses four of its groups. Vanaspati usually just means a big tree; 1.47 gives the narrow sense.
        </p>
      )}

      <div className="cy-lore-grid">
        <section className="cy-lore" aria-label="Chāndogya Upaniṣad 6.3.1">
          <h3 className="cy-lore-title">📜 Scroll I <i>//</i> Chāndogya Upaniṣad 6.3.1 · three seeds</h3>
          <figure className="vl-quote">
            <blockquote lang="sa">तेषां खल्वेषां भूतानां त्रीण्येव बीजानि भवन्त्याण्डजं जीवजमुद्भिज्जमिति ॥</blockquote>
            <div className="vl-term-iast">teṣāṃ khalv eṣāṃ bhūtānāṃ trīṇy eva bījāni bhavanty āṇḍajaṃ jīvajam udbhijjam iti</div>
            <figcaption>“Of these beings there are only three seeds: the egg-born, the born-from-a-living-being, and the sprouting.”</figcaption>
          </figure>
          <p className="vl-small">
            Only three here, with no svedaja. Ādi Śaṅkarācārya’s commentary (bhāṣya, भाष्य) folds the sweat-born into the egg-born and sprouting groups.
          </p>
        </section>
        <section className="cy-lore" aria-label="Aitareya Upaniṣad 3.3">
          <h3 className="cy-lore-title">📜 Scroll II <i>//</i> Aitareya Upaniṣad 3.3 · four, moving and still</h3>
          <figure className="vl-quote">
            <blockquote lang="sa">… अण्डजानि च जारुजानि च स्वेदजानि चोद्भिज्जानि च … जङ्गमं च पतत्रि च यच्च स्थावरम् …</blockquote>
            <div className="vl-term-iast">… aṇḍajāni ca jārujāni ca svedajāni codbhijjāni ca … jaṅgamaṃ ca patatri ca yac ca sthāvaram …</div>
            <figcaption>“… egg-born, womb-born (jāruja), sweat-born and sprouting … what moves, what flies, and what stands still …”</figcaption>
          </figure>
          <p className="vl-small">The list sits inside a teaching that all of these rest on prajñāna (awareness).</p>
        </section>
        <section className="cy-lore" aria-label="Manusmṛti 1.43 to 1.48">
          <h3 className="cy-lore-title">📜 Scroll III <i>//</i> Manusmṛti 1.43–48 · the game’s rulebook</h3>
          <ul className="cy-list">
            <li><b>1.43 jarāyuja:</b> domestic and wild animals, beasts of prey, humans (and, in the text, rākṣasas and piśācas).</li>
            <li><b>1.44 aṇḍaja:</b> birds, snakes, crocodiles, fish, tortoises, on land and in water.</li>
            <li><b>1.46 udbhijja:</b> all stationary plants, growing from seed or cutting; oṣadhis end when their fruit ripens.</li>
            <li><b>1.48:</b> bushes, grasses (tṛṇa) and creepers (pratāna, vallī).</li>
          </ul>
          <figure className="vl-quote">
            <blockquote lang="sa">स्वेदजं दंशमशकं यूकामक्षिकमत्कुणम् । ऊष्मणश्चोपजायन्ते यच्चान्यत्किंचिदीदृशम् ॥ १.४५</blockquote>
            <figcaption>“Gnats and mosquitoes, lice, flies and bugs are sweat-born; they, and whatever else is like them, arise from heat.”</figcaption>
          </figure>
          <figure className="vl-quote">
            <blockquote lang="sa">अपुष्पाः फलवन्तो ये ते वनस्पतयः स्मृताः । पुष्पिणः फलिनश्चैव वृक्षास्तूभयतः स्मृताः ॥ १.४७</blockquote>
            <figcaption>“Those that bear fruit without flowers are called vanaspati; those with both flowers and fruit are called vṛkṣa.”</figcaption>
          </figure>
        </section>
        <section className="cy-lore" aria-label="Atharvaveda 2.31 on kṛmi">
          <h3 className="cy-lore-title">📜 Scroll IV <i>//</i> Atharvaveda 2.31 · kṛmi, seen and unseen</h3>
          <figure className="vl-quote">
            <blockquote lang="sa">दृष्टमदृष्टमतृहमथो कुरूरुमतृहम् ।</blockquote>
            <div className="vl-term-iast">dṛṣṭam adṛṣṭam atṛham atho kurūrum atṛham (2.31.2)</div>
            <figcaption>“The seen and the unseen I have crushed, and the kurūru too.”</figcaption>
          </figure>
          <p className="vl-small">
            A charm against kṛmi (worms and pests) “on mountains, in forests, in plants, in cattle, in the waters, and inside
            our bodies” (2.31.5). It is a prayer-charm, not a study of microbes.
          </p>
        </section>
      </div>

      <section className="vl-panel vl-modern" aria-label="Modern comparison for fun">
        <h3 className="vl-panel-title">🔬 Modern comparison (for fun) <span className="vl-panel-hint">not what the texts say</span></h3>
        <ul className="vl-list">
          <li><b>Jarāyuja ↔ most mammals</b>, which give live birth. Not all: the platypus and echidnas lay eggs.</li>
          <li><b>Aṇḍaja ↔ birds, reptiles, amphibians and most fish.</b> Some snakes (many vipers and boas) and some fish (guppies, many sharks) give live birth.</li>
          <li><b>Svedaja ↔ insects and other small arthropods.</b> They hatch from eggs. Redi (1668) and Pasteur (1859–62) showed that life does not arise on its own from moisture, meat or broth.</li>
          <li><b>Udbhijja ↔ plants</b>, which grow from seeds, cuttings or runners and build their bodies from light, water, carbon dioxide and soil minerals.</li>
          <li><b>Kṛmi ↔ ?</b> The “unseen” pests are interesting to read next to microbes, but the hymn does not describe bacteria; microbes were first seen with microscopes in the 1670s (Leeuwenhoek).</li>
          <li>Modern biology groups living things by shared ancestry (evolution and DNA), not by how they are born.</li>
        </ul>
        <p className="vl-small">“Chaturyoni” (four origins) is this lab’s name for the fourfold list; the texts above give the groups themselves.</p>
      </section>

      <TermPanel title="Vocabulary Codex // Sanskrit words in this lab" terms={TERMS} />
    </div>
  );
};

export default Chaturyoni;
