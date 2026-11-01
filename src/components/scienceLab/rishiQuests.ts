// Ṛṣi-lens kid quests for every Vijñāna Lab game.
// Each game: one clear mission, 3 "what to do" steps, the ṛṣi lens
// (निरीक्षणम् observe · प्रकृति-शिक्षा nature · प्रयोजनम् purpose), and a win line.
export interface RishiQuest {
  goal: string;
  steps: [string, string, string];
  observe: string;
  nature: string;
  purpose: string;
  win: string;
}

export const RISHI_QUESTS: Record<string, RishiQuest> = {
  'preschool-wonder': {
    goal: 'Play little games with shapes, colours, animals and the moon — and say their Sanskrit names!',
    steps: ['Pick a game tile', 'Tap, listen and match', 'Collect your stars'],
    observe: 'Look closely: which colour, which shape, which sound?',
    nature: 'Animals, fruits, seasons and the moon are your first teachers.',
    purpose: 'Name the world around you with love.',
    win: 'Wonderful, little ṛṣi! You looked and listened so well.',
  },
  'asato-ma': {
    goal: 'Melt, boil and burn things — and prove the stuff never disappears.',
    steps: ['Pick a material', 'Heat it and watch it change', 'Check the scale: is the weight still the same?'],
    observe: 'Shapes change, but watch the scale — what stays the same?',
    nature: 'Ice to water to steam: nature changes form, not substance.',
    purpose: 'Learn to see what is real (sat) behind what only looks different.',
    win: 'Mystery solved! Matter changes form but never vanishes.',
  },
  prakriti: {
    goal: 'Keep the forest healthy by balancing Vāta, Pitta and Kapha through the seasons.',
    steps: ['Watch the season and the meters', 'Add wind, sun or water to balance', 'Keep all three in the green zone'],
    observe: 'Notice which meter rises when the season turns.',
    nature: 'Every season shifts the balance — nature teaches rhythm.',
    purpose: 'Balance keeps living things healthy — in forests and in us.',
    win: 'The ecosystem is in balance! You are a Nature Guardian.',
  },
  chaturyoni: {
    goal: 'Sort living beings into the four ways life is born.',
    steps: ['Look at each creature', 'Ask: born from egg, womb, seed or moisture?', 'Drop it in the right home'],
    observe: 'Look at how each creature begins its life.',
    nature: 'Rishis grouped all life by how it is born — try it yourself.',
    purpose: 'Knowing how life begins helps us care for every being.',
    win: 'All beings sorted! You read the map of life.',
  },
  jyotisha: {
    goal: 'Launch a planet so it circles the Sun without crashing or flying away.',
    steps: ['Pick a planet', 'Set its speed', 'Launch and watch it orbit'],
    observe: 'Watch the path: too slow falls in, too fast flies off.',
    nature: 'The sky is a clock — ancient astronomers learned it by watching.',
    purpose: 'Understanding the sky gave us calendars, seasons and festivals.',
    win: 'Steady orbit! You think like an astronomer.',
  },
  'nada-brahman': {
    goal: 'Make sound waves and find which notes make beautiful patterns.',
    steps: ['Pick a tone', 'Change the pitch', 'Find the pattern that sings'],
    observe: 'Listen and look — how does the pattern change with the sound?',
    nature: 'Wind, birds and rivers all make nāda — sound is everywhere.',
    purpose: 'Sound shapes music, speech and mantra.',
    win: 'You found the hidden harmony! Sound Detective badge earned.',
  },
  paramanu: {
    goal: 'Join tiny paramāṇus into pairs, then triads, to build matter you can see.',
    steps: ['Drag two paramāṇus together', 'Join three pairs into a triad', 'Build the element shown'],
    observe: 'Watch how the tiniest pieces join step by step.',
    nature: 'Kaṇāda saw that everything is built from tiny parts.',
    purpose: 'Knowing what things are made of helps us make medicine, food and tools.',
    win: 'Matter made! You are an Atom Architect.',
  },
  chandrayaan: {
    goal: 'Fire the rockets and land softly on the Moon’s south pole.',
    steps: ['Watch speed and height', 'Fire retro-rockets to slow down', 'Touch down gently'],
    observe: 'Keep your eyes on the speed meter — careful watching saves the lander.',
    nature: 'Soma, the Moon, has guided Indian calendars for thousands of years.',
    purpose: 'Space science helps farmers, weather and communication.',
    win: 'Soft landing! Welcome to the Moon, Space Captain.',
  },
  'srishti-sthiti-laya': {
    goal: 'Weave a pattern that is created, kept and dissolved — like nature’s cycles.',
    steps: ['Start a pattern (sṛṣṭi)', 'Keep it steady (sthiti)', 'Let it dissolve and begin again (laya)'],
    observe: 'Spot the repeating cycle in the pattern.',
    nature: 'Seeds grow, live and return to soil — everything moves in cycles.',
    purpose: 'Seeing cycles helps us plan, save and renew.',
    win: 'Cycle complete! You wove the rhythm of nature.',
  },
  agnibana: {
    goal: 'Build a rocket that flies straight and far, like Tipu’s Mysorean rockets.',
    steps: ['Choose casing and fuel', 'Set the angle', 'Launch and measure the distance'],
    observe: 'Watch how weight and angle change the flight path.',
    nature: 'Fire, air and metal follow nature’s laws — learn them by testing.',
    purpose: 'Good engineering protects and serves people.',
    win: 'Liftoff! Your rocket flew true.',
  },
  'vedic-geometry': {
    goal: 'Use only a rope and pegs to draw perfect squares and altars, like the Śulba-sūtras.',
    steps: ['Stretch the rope', 'Mark the pegs', 'Make the right angle and finish the shape'],
    observe: 'Check every corner — is it truly square?',
    nature: 'Shadows and ropes helped builders find true directions.',
    purpose: 'Geometry was used to build fire-altars exactly right.',
    win: 'Perfect shape! You are a Rope Geometer.',
  },
  'mantra-acoustics': {
    goal: 'Chant a sound and watch it shape sand into patterns.',
    steps: ['Pick a syllable', 'Play it', 'Match the pattern shown'],
    observe: 'Listen and watch — each sound draws its own picture.',
    nature: 'Sound moves air and sand the way wind moves leaves.',
    purpose: 'Clear sound helps us learn, remember and speak well.',
    win: 'Pattern matched! You heard the shape of sound.',
  },
  'temple-engineering': {
    goal: 'Stack stones so your temple tower stands strong — without cement!',
    steps: ['Pick stones', 'Lock them with joints', 'Test against shaking'],
    observe: 'Notice which way the weight presses down.',
    nature: 'Mountains stand by balance — builders copied nature.',
    purpose: 'Strong buildings keep people safe for centuries.',
    win: 'Your temple stands tall! Master of Stone.',
  },
  rituparna: {
    goal: 'Count a whole tree’s leaves by sampling just one branch — like King Ṛtuparṇa.',
    steps: ['Count one branch', 'Count the branches', 'Estimate the whole tree'],
    observe: 'A small careful look can tell you about the whole.',
    nature: 'Trees repeat their patterns — use them to estimate.',
    purpose: 'Sampling helps farmers, doctors and scientists decide wisely.',
    win: 'Great estimate! You think like a statistician.',
  },
  kautilya: {
    goal: 'Run a kingdom’s treasury and keep people fed and happy through good and bad years.',
    steps: ['Read the harvest report', 'Set tax and granary choices', 'Keep the kingdom stable'],
    observe: 'Watch the numbers each year before deciding.',
    nature: 'Rain and harvest change — a wise ruler plans for nature.',
    purpose: 'Knowledge for welfare: yogakṣema, the well-being of all.',
    win: 'The kingdom thrives! Wise as Kauṭilya.',
  },
  chandahshastra: {
    goal: 'Find every rhythm made of short and long beats, like Piṅgala.',
    steps: ['Pick the number of beats', 'Build short-long patterns', 'Find them all — spot the number pattern'],
    observe: 'Look for the pattern hidden in the counts.',
    nature: 'Heartbeats and footsteps have rhythm too.',
    purpose: 'Rhythm made verses easy to remember for generations.',
    win: 'All rhythms found! You discovered Piṅgala’s pattern.',
  },
  'ujjain-geodesy': {
    goal: 'Use the Sun’s shadow at Ujjain to find directions and time.',
    steps: ['Place the gnomon', 'Watch the shadow move', 'Mark noon and true north'],
    observe: 'Track the shadow carefully through the day.',
    nature: 'The Sun is nature’s clock and compass.',
    purpose: 'Accurate time and place guided calendars and travel.',
    win: 'Meridian found! You mapped the sky from the ground.',
  },
};
