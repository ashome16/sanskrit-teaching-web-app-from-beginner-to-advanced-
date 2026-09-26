/**
 * COURSE ADDENDUM DATA
 * 
 * Title: षड्दर्शनानि साङ्ख्यं च — तत्त्वमीमांसा, आत्मसाक्षात्कारः, वैदिकगणितस्य च विकासः
 * Subtitle: Foundations of Reality: The Six Darśanas, Sāṅkhya Taxonomy, and Vedic Mathematics
 * 
 * 4 Comprehensive Parts:
 * Part 1: The Shad Darshanas – The Six Luminescent Pathways to Reality
 * Part 2: The Singular Foundation – Self-Discovery and Universal Phenomenon
 * Part 3: Quantitative Enumeration of Matter – Sankhya Darshan's Tattva System
 * Part 4: Evolution of Vedic Mathematics – Math as Structure, Vibration as Brick
 */

export interface DarshanaSutra {
  sanskrit: string;
  transliteration: string;
  meaning: string;
  source: string;
  /** Render with the recitation player (see src/data/mantrasShlokas.ts). */
  mantraId?: string;
}

export interface DarshanaSection {
  /** Optional DOM id (deep-link anchor inside the unit). */
  anchorId?: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  callout?: {
    title: string;
    text: string;
    type: 'philosophical' | 'scientific' | 'cosmological' | 'insight';
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  sutras?: DarshanaSutra[];
  /** Optional button to another addendum unit. */
  addendumLink?: { label: string; addendumId: string };
}

export interface DarshanaAddendumArticle {
  id: string;
  partNumber: number;
  /** Sidebar / meta label override (e.g. 'Companion'); default Prologue / Part N. */
  partLabel?: string;
  slug: string;
  titleDevanagari: string;
  titleEnglish: string;
  subtitle: string;
  readingTimeMinutes: number;
  kicker: string;
  summary: string;
  heroImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  sections: DarshanaSection[];
  keyTakeaways: string[];
}

export const DARSHANAS_COURSE_ADDENDUM: DarshanaAddendumArticle[] = [
  // ==========================================
  // PROLOGUE: THE TWO PREMISES & SAHA NĀV AVATU
  // ==========================================
  {
    id: 'addendum-prologue-saha-nav-avatu',
    partNumber: 0,
    slug: 'two-premises-and-the-study-bond-saha-nav-avatu',
    titleDevanagari: 'आमुखम् — विद्या-सम्बन्धः (सह नाववतु)',
    titleEnglish: 'Guru-Paramparā, The Two Premises & The Study-Bond: Saha Nāv Avatu',
    subtitle: 'Living Lineage vs. Generation · Knowledge without Duty is Dangerous · The Dual Verb that Refuses the Solo User',
    readingTimeMinutes: 8,
    kicker: 'Course Addendum · Foundational Prologue · The Living Covenant',
    summary:
      'Ask a model to invent a language and it will do so in seconds; that is generation, not paramparā. Guru-paramparā is living transmission through prāṇa—breath carrying intention and responsibility. Knowledge that is only stored, quoted, or generated is still anyone’s individual content. It has no adhikāra. Speech without obligation is how a mantra becomes chatter and a verse becomes a weapon. Sanskrit refuses the solo user before a single lesson starts: Saha Nāv Avatu demands a living bind where knowledge is food, not cargo, and study is finished only when it participates in cosmic existence.',
    sections: [
      {
        anchorId: 'guru-not-model',
        heading: 'The Guru is Not a Faster Model (गुरु-परम्परा)',
        subheading: 'Living Paramparā vs. Generative Output · Prāṇa as the Living Medium',
        paragraphs: [
          'Ask a large model to invent a language and it will do so in seconds: phonemes, grammar, sample sentences, even a myth of origin. That is generation. It is not paramparā (परम्परा).',
          'Guru-paramparā is living transmission. A human being who has held a sound until it changed them gives that sound to another human being, with a rule of use. The syllables may already be public. What travels is not a rare string. What travels is prāṇa (प्राणः) in speech: breath carrying vibration, intention riding the breath, a mind that has consented to be responsible for the sound.',
          'In the language of the sages, prāṇa is not a poetic extra. It is breath as the living current that moves through body and world — the same current they treated as purposeful, meaningful, and controlled, not random noise in matter. Whether one speaks of it in the vocabulary of śāstra or of physiology, the claim is practical: a spoken line is not only data leaving a mouth. It is an imprint of the speaker’s state. Intention, held long enough, becomes invocation. Words are powerful because they are thought made audible, not because they are tokens in a vocabulary list.',
          'A machine operates as recipient, processor, and exporter. It takes text, transforms text, returns text. It does not stand in the middle as a being who must interpret, choose, and answer for the outcome. The human is the medium: receiving, transferring, and infusing information with thought. That middle piece is the whole of knowledge as a civilisation meant it — not storage of propositions, but interpretation and use, so that one can master what follows from speech.',
          'This is why a guru cannot be replaced by a generator. The generator has no prāṇa to imprint and no life to stake on the meaning. The guru is not faster content. The guru is the living constraint that keeps speech from becoming random: purposeful, meaningful, controlled — the same discipline that made mantra an experiment rather than chatter.',
        ],
        table: {
          headers: ['Dimension', 'The Generator · Model (उत्पादकः)', 'The Living Guru · Paramparā (गुरु-परम्परा)'],
          rows: [
            ['Role & Stance', 'Recipient, processor, exporter of tokens without stakes', 'Living medium receiving, holding, and answering for sound'],
            ['Medium', 'Silicon weights, statistical probabilities, zero prāṇa', 'Prāṇa (breath), intentionality, mind-state made audible'],
            ['Transmission', 'Generates strings instantly on demand', 'Imparts a sound with its rule of use and ethical boundary'],
            ['Relationship', 'Anonymous query–response loop; isolated user', 'Shared protection and shared heat (saha nāv avatu)'],
          ],
        },
        callout: {
          title: 'The Principle of Use',
          text: '“AI can print the mantra. Only a living lineage can give the principle of its use. AI can move information. Only a human, breathing, can turn intention into invocation.”',
          type: 'philosophical',
        },
      },
      {
        heading: 'Premise 1 — Knowledge without purpose and duty is not only useless. It can be harmful.',
        subheading: 'Why Stored or Generated Information Lacks Adhikāra',
        paragraphs: [
          'Knowledge that is only stored, quoted, or generated is still anyone’s individual content. It has no adhikāra.',
          'Then it can:',
          '• be repeated without care',
          '• be displayed as display',
          '• be turned into a slogan',
          '• be used as fluent error (a model that sounds sure)',
          'Speech without obligation is how a mantra becomes chatter and a verse becomes a weapon.',
          'Understanding is not more information. It is knowing what the knowledge is for, and answering for how it is used.',
          'This is the same hinge as the article: transfer without bind; syllables without duty; AI as recipient–processor–exporter with no life staked on the meaning.',
        ],
        callout: {
          title: 'The Danger of Fluent Error',
          text: 'Speech without obligation is how a mantra becomes chatter and a verse becomes a weapon. Understanding is not more information; it is knowing what the knowledge is for, and answering for how it is used.',
          type: 'philosophical',
        },
      },
      {
        heading: 'Premise 2 — Knowledge is not finished when it is scholarly.',
        subheading: 'Pedantry vs. Standing Mindfully in Cosmic Existence',
        paragraphs: [
          'Pedantry can keep Sanskrit as a dataset and never enter it as a way of standing in the world.',
          'The older aim was not only to be correct about a sūtra. It was to become a mindful part of cosmic existence:',
          '• speech bound to breath',
          '• thought bound to purpose',
          '• the person bound to what the sound demands',
          'Scholarship is a tool on that path. It is not the destination.',
          'That is the ṛṣi’s inner seeing, the temple as tool, japa as experiment — not a footnote apparatus.',
        ],
        callout: {
          title: 'Living Participation Over Footnotes',
          text: 'The older aim was not only to be correct about a sūtra. It was to become a mindful part of cosmic existence: speech bound to breath, thought bound to purpose, and the person bound to what the sound demands.',
          type: 'insight',
        },
      },
      {
        heading: 'How the Two Premises Lock to the Learning Journey',
        subheading: 'Comparing Unanchored Information with Bound Practice',
        paragraphs: [
          'When we place these two premises against each layer of learning and technology, the difference between dead transfer and living transformation becomes unmistakable:',
        ],
        table: {
          headers: ['Article Layer', 'Without the Premises', 'With the Premises'],
          rows: [
            ['AI / transfer', 'Fast, useful gloss', 'Dangerous if treated as enough'],
            ['Bind / mouth', 'Presence', 'Presence still needs purpose'],
            ['Guru', 'Living constraint', 'Confers duty, not extra data'],
            ['Adhikāra', 'Eligibility jargon', 'Standing that makes knowledge answerable'],
            ['Sanskrit study', 'Grammar + verses', 'Grammar in service of participation'],
          ],
        },
      },
      {
        heading: 'Saha Nāv Avatu — The Study-Bond Said Aloud',
        subheading: 'The Ancient Invocation Refusing the Solo User',
        paragraphs: [
          'The first word is saha — together. The grammar is dual throughout (nau, nāv, karavāvahai, vidviṣāvahai). The mantra refuses the solo user before a single lesson starts. That is already the opposite of anyone’s individual content.',
        ],
        sutras: [
          {
            sanskrit: 'ओं सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥ ओं शान्तिः शान्तिः शान्तिः ॥',
            transliteration: 'oṃ saha nāvavatu | saha nau bhunaktu | saha vīryaṃ karavāvahai | tejasvi nāvadhītamastu mā vidviṣāvahai || oṃ śāntiḥ śāntiḥ śāntiḥ ||',
            meaning: 'Oṃ. May That (Brahman) protect us both together; may That nourish us both together; may we both work together with vigour; may what we study be radiant; may we never hate one another. Oṃ, peace, peace, peace.',
            source: 'Taittirīya Upaniṣad 2.2 · Kaṭha Upaniṣad Śānti-pāṭha',
          },
        ],
      },
      {
        heading: 'Deconstruction of the Invocatory Lines',
        subheading: 'Line-by-Line Exegesis of the Study Covenant',
        paragraphs: [
          '• Saha nāv avatu — May that protect us both.\nThe “that” is not the app, not the dataset, not even the guru as a personality. It is the reality the study serves. Protection is not a firewall around private files. It is shelter for a living bond. A solo download protects nothing; a shared covenant can be protected.',
          '• Saha nau bhunaktu — May that nourish us both.\nKnowledge here is food, not cargo. Cargo is shifted across drives without altering the carrier; food metabolizes into the living tissue of consciousness. Guru and student are both fed by the same sacred source; neither is a vending machine. If only one is nourished, the mantra has already failed.',
          '• Saha vīryaṃ karavāvahai — May we two work with energy.\nVīrya is not screen-time. It is shared heat (tapas): the student parsing and testing, the teacher holding the line steady. AI can generate drills, but it cannot enter karavāvahai — a dual verb, we two shall do. Effort that is not shared is still anyone’s individual content, however hard one works alone.',
          '• Tejasvi nāv adhītam astu — May what we have studied be brilliant in us.\nTejas is not a high quiz score. Pedantry can be correct and spiritually dark. This line asks that study radiate as living clarity and active cosmic participation — knowledge finished only when it participates in cosmic existence, not when it is merely footnoted.',
          '• Mā vidviṣāvahai — May we not quarrel; may we not hate.\nThis is the first premise spoken as a solemn vow. Knowledge without purpose and duty turns easily to contempt and dispute: teacher against student, school against school, fluent model against humble speaker. The mantra forbids that turn before the lesson begins. Harm is anticipated, bound, and refused.',
          '• Oṃ śāntiḥ śāntiḥ śāntiḥ — Peace three times.\nIn the body that speaks (ādhyātmika). Between the two who study (ādhibhautika). In the cosmic world that must receive what they send (ādhidaivika). The field must stay clear or the bind collapses into noise. Temple, mantra, guru — all are ways of keeping that field from becoming an echo chamber of the ego.',
        ],
        table: {
          headers: ['Mantra Line (पदम्)', 'What It Binds (सम्बन्धः)', 'Living Realization vs. Solo Download'],
          rows: [
            ['saha nāv avatu (सह नाववतु)', 'Protection is shared — not a solo download', 'The “that” is not an app or server firewall; it is shelter for a living bond. A download protects nothing; a shared covenant can be protected.'],
            ['saha nau bhunaktu (सह नौ भुनक्तु)', 'Nourishment is shared — knowledge as food, not cargo', 'Cargo is shifted across drives without altering the carrier; food metabolizes into the living tissue of consciousness. Guru and student are fed by the same sacred source.'],
            ['saha vīryaṃ karavāvahai (सह वीर्यं करवावहै)', 'Effort is shared — guru and student under one work', 'Shared heat (tapas): the student parsing and testing, the teacher holding the line steady. An AI model can generate drills, but it cannot enter karavāvahai (the dual verb: we two shall do).'],
            ['tejasvi nāv adhītam astu (तेजस्वि नावधीतमस्तु)', 'Study should shine — not pedantry, not a dead dataset', 'Study must radiate as living clarity and direct cosmic participation, not pedantic trivia or cold footnote apparatus.'],
            ['mā vidviṣāvahai (मा विद्विषावहै)', 'No hostility — knowledge without duty becomes harm', 'Knowledge without obligation turns into arrogance, slogans, or weaponized debate. This line proactively forbids and dissolves hostility before the lesson can begin.'],
            ['oṃ śāntiḥ × 3 (ओं शान्तिः शान्तिः शान्तिः)', 'The field must stay clear: self, other, world', 'Threefold peace guarding the speech-body (ādhyātmika), the interpersonal student-teacher bond (ādhibhautika), and the cosmic environment (ādhidaivika).'],
          ],
        },
      },
      {
        heading: 'The Guru–Śiṣya Bond and Adhikāra in the Age of AI',
        subheading: 'Why a Model Cannot Stand Inside Saha',
        paragraphs: [
          'It is the opposite of “anyone’s individual content.” The first word is saha — together. The grammar is dual throughout (nau, nāv, karavāvahai, vidviṣāvahai). The mantra refuses the solo user before a single lesson starts.',
          'Purpose and duty are spoken before the lesson, so speech does not start as a private file and does not end as quarrel.',
          'A model can print this mantra in a second. It cannot stand inside saha. It has no dual. It cannot be protected with you, fed with you, heated with you, or refuse hatred with you.',
          'That is the guru–śiṣya bond, and that is adhikāra begun aloud: standing inside an unbroken covenant that makes knowledge answerable, transformative, and awake.',
        ],
        callout: {
          title: 'The Inescapable Dual',
          text: '“It is the opposite of anyone’s individual content. The first word is saha — together. A model can print this mantra in a second. It cannot stand inside saha. It cannot enter karavāvahai—we two shall do. That is the guru–śiṣya bond: purpose and duty spoken before the lesson, so speech does not start as a private file and does not end as quarrel.”',
          type: 'cosmological',
        },
      },
      {
        heading: 'Not a Polite “Let Us Begin” — Clearing the Field Before Knowledge Arrives',
        subheading: 'Śaṅkara on the Triple Disturbance (Tāpatraya) and the Root √śam',
        paragraphs: [
          'A śānti mantra is not a polite “let us begin.” For a disciple starting a spiritual path it is the first act of the path: clear the field, name the bond, refuse harm before knowledge arrives.',
          'In this context, śānti is not “feeling calm” or a temporary psychological mood. It is the settling of disturbance so that study and a spiritual bond can exist.',
          'The word is derived from the verbal root √śam (शम्) — to quiet, to still, to bring to rest. In a śānti mantra it means: let the trouble that would break this sacred work come to rest.',
          'Traditional commentary on the triple śāntiḥ (Śaṅkara on the Taittirīya) names the three layers matching the triple disturbance (tāpatraya):',
          '• In the disciple (ādhyātmika / आध्यात्मिक) — fever, fear, restlessness, pride, the inner noise that makes hearing impossible.',
          '• Between beings (ādhibhautika / आधिभौतिक) — quarrel, contempt, other people’s pull, the social world pressing on the pair who study.',
          '• From what no one controls (ādhidaivika / आधिदैविक) — sudden event, fate, the large elemental forces that can end a path without argument.',
          'So śānti here is a cleared field, not a mood. It is closer to the pacification of obstacles than to “peace of mind” as a wellness product. It is the indispensable condition in which:',
          '1. Saha can hold (two people under one shared protection)',
          '2. Adhikāra can be conferred (duty needs a steady, receptive vessel)',
          '3. Speech can bind instead of scatter into chatter',
          '4. Knowledge does not turn into harm (mā vidviṣāvahai)',
          'Śaṅkara, on the Taittirīya ending, explains that the word is uttered three times precisely to ward off the troubles that arise on the path to wisdom from organism, external beings, and cosmic powers. The lesson cannot begin inside a storm.',
        ],
        callout: {
          title: 'The Core Gloss for Learners',
          text: '“Śānti is the stilling of whatever would stop the teaching from landing — in the body, between teacher and student, and in the world around them.”',
          type: 'insight',
        },
      },
      {
        heading: 'Why the Guru Gives It to a New Disciple',
        subheading: 'The Six Pillars of the Living Invocatory Covenant',
        paragraphs: [
          '1. The path is easily obstructed.\nFever, fear, pride, comparison, family noise, accident, drought, sudden loss — any of these can swallow study. The mantra does not pretend the disciple is already peaceful. It asks for peace in the three places trouble comes from, so adhikāra has a chance to form.',
          '2. Knowledge without a clear field turns into harm.\nThis is the first premise, already spoken as liturgy. Mā vidviṣāvahai — may we not hate. A spiritual journey inflames the ego as often as it refines it: teacher against student, student against student, “my realisation” against another’s. The śānti mantra forbids that turn before the first sentence of doctrine. Purpose and duty are set while the mind is still unarmed.',
          '3. The disciple is not a solo user.\nSaha nāv avatu is dual. Protection, nourishment, effort, brilliance — us both. A beginner’s default is anyone’s individual content: my notes, my app, my private chant. The guru puts saha in the mouth so the journey is a bond, not a download. Both are fed; both are answerable.',
          '4. Speech itself must be purified before it is used as instrument.\nThe journey will use mantra, study, and eventually invocation. If the first sounds are restless, the instrument is already bent. Śānti is śikṣā of the field: hold the room still the way śikṣā holds the syllable still. Same experiment, larger scale.',
          '5. Cosmic standing, not only classroom manners.\nThe second premise: knowledge is not finished when it is scholarly. Śānti mantras of the Upanishads ask peace in earth, waters, plants, sky, and in Brahman — not only “good behaviour in class.” The disciple is being placed as a mindful part of existence, not as a consumer of verses. Three peaces: in the speaker, between the two who study, in the world that will receive what they send.',
          '6. The guru accepts responsibility aloud.\nWhen teacher and student say it together, the guru is not a content provider. The guru enters the same protection and the same vow. That is living transmission. A model can print the lines. It cannot stand under avatu mām, avatu vaktāram — protect me, protect the speaker.',
        ],
      },
      {
        heading: 'In One Chain: The Architecture of Embarking',
        subheading: 'Four Unbreakable Conditions Before Any Path Can Begin',
        paragraphs: [
          'Embarking = leaving ordinary chatter for a bound use of speech and life.',
          'That requires four foundational anchors:',
          '1. A field (threefold śāntiḥ clearing body, beings, and cosmos)',
          '2. A bond (saha: the dual verb refusing the isolated ego)',
          '3. A duty (adhikāra: answering for what the sound demands)',
          '4. A refusal of harm (mā vidviṣāvahai: disarming ego before doctrine)',
          'The śānti mantra is how the guru puts all four in the disciple’s mouth on day one — before philosophy, before secret syllables, before anyone’s individual content can pretend to be a path.',
        ],
        callout: {
          title: 'The Fourfold Seal of the Path',
          text: '“Embarking = leaving ordinary chatter for a bound use of speech and life. That requires a field (three śāntiḥ), a bond (saha), a duty (adhikāra), and a refusal of harm (mā vidviṣāvahai). The śānti mantra is how the guru puts all four in the disciple’s mouth on day one.”',
          type: 'philosophical',
        },
      },
      {
        heading: 'The Culture Behind the Knowledge: Bhūmi Vandanam & The Living Ethic of Touch',
        subheading: 'Pāda-sparśa-kṣamāpana · Attitude Before Skill',
        paragraphs: [
          'This is part of your training: state of mind and inner attitude matter, not just technical skill.',
          'The knowledge you seek comes from a civilization where you do not step out of bed onto the floor without asking forgiveness from the living earth. Before the feet touch the ground at dawn, both palms are placed upon the earth: pāda-sparśaṃ kṣamasva me — forgive me the touch of my feet.',
          'The oral gloss many of us grew up with at home says it plainly: by hand, by foot, or by any means whatsoever — do not do violence (hiṃsā) to the earth. The Īśāvāsya Upaniṣad gives the same duty its Vedic form: tena tyaktena bhuñjīthā mā gṛdhaḥ — enjoy by letting go; do not seize. And the Yajurveda’s peace does not start with the ego: it moves through sky, waters, herbs and trees before the seeker asks, sā mā śāntir edhi — may that peace be mine.',
          'The full verses — Bhūmi Vandanam, the Vasundharā and Mṛttikā mantras, Īśāvāsya 1 and Dyauḥ Śāntiḥ — are in the companion unit “मन्त्राः श्लोकाश्च · Mantras & Ślokas”, each with line-by-line recitation.',
          'Without this attitude, Sanskrit becomes an analytical toy or empty data manipulation. With it, study becomes a mindful participation in the living cosmic order.',
        ],
        addendumLink: { label: '🪔 Open Mantras & Ślokas — recite them line by line', addendumId: 'addendum-mantras-shlokas' },
        callout: {
          title: 'Attitude Precedes Skill',
          text: '“Sanskrit is not a disembodied skill. State of mind and attitude matter, not just dexterity. The knowledge comes from a culture where you bow to the earth with your palms before your feet dare to touch her.”',
          type: 'insight',
        },
      },
      {
        heading: 'The Collective Resource: The Well, The Bank & Śabda-Brahman',
        subheading: 'Using Without Seizing · The Built-in Prayojana of Sacred Knowledge',
        paragraphs: [
          'Sanskrit is not a private accomplishment. Speech is a collective resource — like earth, water, a teacher’s time, a temple field.',
          'Saha already said it: nourishment is shared (saha nau bhunaktu). The Bhūmi verse says it with the body: do not harm what you must stand on. Triple śāntiḥ says it with the world: waters, herbs, trees, not only the classroom.',
          'So the journey of learning is also the journey of becoming a person who can use without seizing.',
          '• The Collective Well (You may drink): Saha nau bhunaktu is the well — both are fed. Speech, grammar, mantra, the earth, and the teacher’s lineage were already waiting before you arrived. If you only draw without depositing, your study is seizure with better manners.',
          '• The Collective Bank (You must put back): Saha vīryaṃ karavāvahai is the bank — both put heat in. Your breath, your care, your correct sound, your refusal to harm. If you only deposit slogans, the bank is mere display.',
          'Adhikāra is the right to draw and the obligation to deposit. A better person is not a decorated scholar. It is someone who leaves the well fuller than their thirst, and the bank heavier than their name.',
          'For the sages, the point was not that Sanskrit is old. It was that this knowledge exists for a foundational reason: Śabda-Brahman (शब्दब्रह्म) — reality as sound-vibration, not an arbitrary label stuck on things.',
          'If śabda is foundational, language is not a gadget you pick up when convenient. It is how the real becomes speakable. Therefore, use without purpose is a contradiction:',
          '1. The existence of this knowledge is not accidental. The sages held that śabda is a primordial principle of being, not a human gadget.',
          '2. Therefore the language refined to hold that principle — meter, śikṣā, grammar, mantra — has a built-in prayojana (purpose).',
          '3. Therefore Sanskrit may not be used as dead prestige, a dataset, or a slogan. Purpose is what the knowledge is for.',
          '4. Adhikāra is that purpose made personal: you draw from the well of śabda only if you deposit duty back — still speech, answered meaning, and a field you do not harm.',
        ],
        callout: {
          title: 'The Purpose of Śabda-Brahman',
          text: '“The sages did not leave us a language and then look for a use. They held Śabda-Brahman as a foundational principle — so the existence of this knowledge already contains its purpose. To learn Sanskrit is to consent to that purpose: not to own the word, but to use it as the real uses sound — held still, answered for, and offered back to the living whole.”',
          type: 'philosophical',
        },
      },
    ],
    keyTakeaways: [
      'The Guru is not a faster model: generation produces strings without stakes, while guru-paramparā transmits prāṇa (breath, intention, and responsibility) with a rule of use.',
      'A śānti mantra is not a polite opener; it is the first act of the path: clear the field, name the bond, refuse harm before knowledge arrives.',
      'Śānti is derived from √śam (to bring to rest); it is a cleared field and the pacification of obstacles, not a passive wellness mood.',
      'The triple śāntiḥ addresses the three disturbances (tāpatraya): ādhyātmika (self), ādhibhautika (others), and ādhidaivika (unseen forces).',
      'Knowledge without purpose and duty turns into harm (mā vidviṣāvahai disarms the mind before doctrine inflames the ego).',
      'Saha nāv avatu is grammatically dual throughout—refusing the solo user and transforming a download into a living covenant.',
      'State of mind and attitude matter, not just skill: Bhūmi Vandanam (pāda-sparśaṃ kṣamasva me) establishes reverence before taking the first step.',
      'The living oral ethic — by hand, by foot, or by any means, do not harm the earth — grounds study in the Īśāvāsya rule: tena tyaktena bhuñjīthā (enjoy without seizing).',
      'The cosmic peace of Yajurveda (Dyauḥ śāntiḥ) encompasses sky, earth, waters, herbs, and trees—placing the learner within cosmic order.',
      'Speech is a collective resource: the Well (saha nau bhunaktu) gives nourishment, and the Bank (saha vīryaṃ karavāvahai) demands the deposit of breath, tapas, and care.',
      'Adhikāra balances the right to draw and the duty to deposit: leaving the well fuller than one’s thirst, and the bank heavier than one’s name.',
      'Śabda-Brahman is reality as sound: Sanskrit has built-in prayojana (purpose). To learn is to use sound as the real uses sound—held still, answered for, and offered back.',
    ],
  },

  // ==========================================
  // COMPANION: MANTRAS & ŚLOKAS (मन्त्राः श्लोकाश्च)
  // ==========================================
  {
    id: 'addendum-mantras-shlokas',
    partNumber: 0,
    partLabel: 'Mantras & Ślokas',
    slug: 'mantras-and-shlokas',
    titleDevanagari: 'मन्त्राः श्लोकाश्च — भूमि-वन्दनं शान्ति-पाठश्च',
    titleEnglish: 'Mantras & Ślokas: Bhūmi Vandanam & Cosmic Peace',
    subtitle: 'Recite, Don’t Just Read · The Verses Behind the Study-Bond, the Ethic of Touch, and the Universal Peace',
    readingTimeMinutes: 6,
    kicker: 'Course Addendum · Companion to the Prologue · Recitation Practice',
    summary:
      'The verses that frame the Gurukul way of study, gathered in one place so they can be spoken, not only read. Each is recited line by line by the same calm recitation voice: tap a line to hear it, or recite the whole verse. Say them slowly, with the breath, as lesson 6.1 (Recitation and Focus) teaches — the attitude is part of the training.',
    sections: [
      {
        anchorId: 'mantra-saha-navavatu',
        heading: 'ओं सह नाववतु — The Study-Bond (in the Prologue)',
        subheading: 'Taittirīya Upaniṣad 2.2 · Said Together Before Every Lesson',
        paragraphs: [
          'The first mantra of the path is the study-bond itself: protection, nourishment, effort and brilliance asked for “us both”, and hostility refused before the lesson begins. Its recitation player, word-by-word meanings and line-by-line exegesis live in the Prologue.',
        ],
        addendumLink: { label: '🤝 Recite सह नाववतु in the Prologue', addendumId: 'addendum-prologue-saha-nav-avatu' },
      },
      {
        anchorId: 'mantra-bhumi-vandanam',
        heading: 'भूमि-वन्दनम् — Bhūmi Vandanam at Dawn',
        subheading: 'Pāda-sparśa-kṣamāpana · Asking Forgiveness Before the Feet Touch the Ground',
        paragraphs: [
          'Before stepping out of bed, both palms are placed on the floor and this verse is said. You do not begin the day by trampling reality; you begin by asking the Mother’s forgiveness for the touch of your feet.',
        ],
        sutras: [
          {
            mantraId: 'bhumi-vandanam',
            sanskrit: 'समुद्रवसने देवि पर्वतस्तनमण्डले । विष्णुपत्नि नमस्तुभ्यं पादस्पर्शं क्षमस्व मे ॥',
            transliteration: 'samudravasane devi parvatastanamaṇḍale | viṣṇupatni namastubhyaṃ pādasparśaṃ kṣamasva me ||',
            meaning: 'O Goddess whose garment is the ocean and whose bosom is the mountain ranges, O consort of Viṣṇu — I bow to you. Forgive me for touching you with my feet.',
            source: 'Traditional morning prayer (prātaḥ-smaraṇa)',
          },
        ],
        callout: {
          title: 'The Oral Gloss',
          text: '“By hand, by foot, or by any means whatsoever — do not do violence to the earth.” That sentence is the meaning; the verse that carries it across generations is pāda-sparśaṃ kṣamasva me.',
          type: 'insight',
        },
      },
      {
        anchorId: 'mantra-vasundhara',
        heading: 'वसुन्धरा-मृत्तिका — Walking On and Taking Up the Earth',
        subheading: 'Taittirīya Āraṇyaka 10.1 (Mahānārāyaṇa Upaniṣad)',
        paragraphs: [
          'When walking upon the earth or taking up soil, tradition pairs the dawn greeting with these lines to Vasundharā — the bearer of wealth — and to Mṛttikā, the earth taken in the hand.',
        ],
        sutras: [
          {
            mantraId: 'vasundhara-mrttika',
            sanskrit: 'अश्वक्रान्ते रथक्रान्ते विष्णुक्रान्ते वसुन्धरे । शिरसा धारयिष्यामि रक्षस्व मां पदे पदे ॥ मृत्तिके हन मे पापं यन्मया दुष्कृतं कृतम् । मृत्तिके ब्रह्मदत्तासि काश्यपेनाभिमन्त्रिता । मृत्तिके देहि मे पुष्टिं त्वयि सर्वं प्रतिष्ठितम् ॥',
            transliteration: 'aśvakrānte rathakrānte viṣṇukrānte vasundhare | śirasā dhārayiṣyāmi rakṣasva māṃ pade pade || mṛttike hana me pāpaṃ yanmayā duṣkṛtaṃ kṛtam | mṛttike brahmadattāsi kāśyapenābhimantritā | mṛttike dehi me puṣṭiṃ tvayi sarvaṃ pratiṣṭhitam ||',
            meaning: 'O Vasundharā, trodden by horses, chariots and the strides of Viṣṇu — I shall bear you upon my head; protect me at every step. O Earth, strike away the wrong I have done; you are Brahmā’s gift, consecrated by Kāśyapa; grant me nourishment — in you everything is established.',
            source: 'Taittirīya Āraṇyaka 10.1',
          },
        ],
      },
      {
        anchorId: 'mantra-ishavasya',
        heading: 'ईशा वास्यमिदं सर्वम् — The Ethic Behind the Verses',
        subheading: 'Īśāvāsya Upaniṣad 1 · Tena Tyaktena Bhuñjīthāḥ',
        paragraphs: [
          'The Bhūmi verse speaks the duty with the body; the Īśāvāsya speaks it as principle: receive what is given without violence, exploitation or greed. This is the Well and the Bank of the Prologue in one line — use without seizing.',
        ],
        sutras: [
          {
            mantraId: 'ishavasya',
            sanskrit: 'ईशा वास्यमिदं सर्वं यत्किञ्च जगत्यां जगत् । तेन त्यक्तेन भुञ्जीथा मा गृधः कस्यस्विद्धनम् ॥',
            transliteration: 'īśā vāsyam idaṃ sarvaṃ yat kiñca jagatyāṃ jagat | tena tyaktena bhuñjīthā mā gṛdhaḥ kasyasvid dhanam ||',
            meaning: 'All this, whatever moves in the moving world, is pervaded by the Lord. Enjoy by letting go; do not seize — whose, indeed, is wealth?',
            source: 'Īśāvāsya Upaniṣad 1',
          },
        ],
      },
      {
        anchorId: 'mantra-dyauh-shanti',
        heading: 'ॐ द्यौः शान्तिः — The Universal Cosmic Peace',
        subheading: 'Śukla Yajurveda 36.17 · Peace That Does Not Begin With the Ego',
        paragraphs: [
          'Notice the order. Peace descends from the sky (dyauḥ) through the mid-space (antarikṣam), anchors in the earth (pṛthivī), fills the waters (āpaḥ), the healing herbs (oṣadhayaḥ) and the trees (vanaspatayaḥ), spans the divine powers (viśve devāḥ) and Brahman — and only then does the seeker whisper sā mā śāntir edhi: may that peace come to me.',
          'Individual peace cannot exist in isolation; it is the natural consequence of cosmic alignment. The closing triple śāntiḥ is the same threefold clearing the Prologue describes — in the body, between beings, and in what no one controls.',
        ],
        sutras: [
          {
            mantraId: 'dyauh-shanti',
            sanskrit: 'ॐ द्यौः शान्तिरन्तरिक्षं शान्तिः पृथिवी शान्तिरापः शान्तिरोषधयः शान्तिः । वनस्पतयः शान्तिर्विश्वे देवाः शान्तिर्ब्रह्म शान्तिः सर्वं शान्तिः शान्तिरेव शान्तिः सा मा शान्तिरेधि ॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
            transliteration: 'oṃ dyauḥ śāntir antarikṣaṃ śāntiḥ pṛthivī śāntir āpaḥ śāntir oṣadhayaḥ śāntiḥ | vanaspatayaḥ śāntir viśve devāḥ śāntir brahma śāntiḥ sarvaṃ śāntiḥ śāntir eva śāntiḥ sā mā śāntir edhi || oṃ śāntiḥ śāntiḥ śāntiḥ ||',
            meaning: 'Peace in the sky, in the mid-space, on the earth, in the waters, in the herbs, in the trees, in all the divine powers, in Brahman — peace in everything, peace itself. May that peace be mine.',
            source: 'Śukla Yajurveda 36.17',
          },
        ],
        callout: {
          title: 'How to Practise',
          text: 'Recite one verse a day, slowly, with a long exhale at each daṇḍa. Then sit in silence for thirty seconds. Tap a single line to hear it again until the mouth knows it — this is the “one inefficient practice” the Darśana essay asks you to keep.',
          type: 'philosophical',
        },
      },
    ],
    keyTakeaways: [
      'Mantras are for the mouth, not only the eye: recite each line with the breath, then the whole verse.',
      'ओं सह नाववतु (in the Prologue) sets the study-bond; Bhūmi Vandanam sets the attitude before the first step of the day.',
      'Bhūmi Vandanam: samudravasane devi … pāda-sparśaṃ kṣamasva me — ask forgiveness before your feet touch the earth.',
      'Vasundharā & Mṛttikā (Taittirīya Āraṇyaka 10.1): protect me at every step; grant me nourishment — in you everything is established.',
      'Īśāvāsya 1: tena tyaktena bhuñjīthā mā gṛdhaḥ — use without seizing.',
      'Dyauḥ Śāntiḥ (Yajurveda 36.17): peace moves through sky, waters, herbs and trees before it is asked for oneself — sā mā śāntir edhi.',
    ],
  },

  // ==========================================
  // PART 1: THE SHAD DARSHANAS
  // ==========================================
  {
    id: 'addendum-part-1-shad-darshanas',
    partNumber: 1,
    slug: 'shad-darshanas-pathways-to-reality',
    titleDevanagari: 'षड्दर्शनानि — षड्दीप्तमार्गाः',
    titleEnglish: 'The Shad Darshanas: The Six Luminescent Pathways to Reality',
    subtitle: 'The Systematic Dismantling of Illusion to Perceive the Baseline Architecture of Existence',
    readingTimeMinutes: 9,
    kicker: 'Course Addendum · Part 1 of 4 · Epistemology & Ontology',
    summary:
      'For millennia, classical Indian thought has approached reality not as a dogmatic belief, but as an empirical science of perception. Derived from the root dṛś ("to see"), the six orthodox Darśanas operate as three symbiotic pairs of lenses—from Nyāya’s rigorous logic and Vaiśeṣika’s atomic physics, to Sāṅkhya’s cosmic taxonomy and Yoga’s psychophysical mechanics, culminating in Mīmāṃsā’s acoustic duty and Vedānta’s non-dual realization.',
    sections: [
      {
        heading: 'Instruments of Vision, Not Passive Theories',
        subheading: 'The Etymology and Teleology of Darśana',
        paragraphs: [
          'For millennia, the Indian subcontinent has harbored a profound obsession: the systematic dismantling of illusion to perceive the baseline architecture of existence. This intellectual and spiritual quest crystalized into the Shad Darshanas (षड्दर्शनानि)—the six orthodox (Āstika) schools of classical Indian philosophy.',
          'Derived from the Sanskrit verbal root dṛś (दृश्, meaning "to see" or "to perceive"), a Darśana is not a passive academic hypothesis or speculative theology. It is an "instrument of direct vision" (दृश्यते अनेन इति दर्शनम्). It is a precision-engineered cognitive lens designed to perceive ultimate reality (Tattva), dissolve fundamental suffering (Duḥkha-nivṛtti), and engineer the liberation (Mokṣa) of human consciousness.',
          'These six systems do not compete as hostile dogmas; rather, they operate as three symbiotic pairs. Each pair provides a complementary methodology—ranging from rigorous formal logic and atomic physics to psycho-spiritual mechanics and metaphysical synthesis. Together, they form a cohesive, multi-layered spectrum of inquiry that approaches the cosmos simultaneously from the physical, the logical, the psychological, and the transcendent planes.',
        ],
        callout: {
          title: 'The Core Definition of Darśana',
          text: '“दृश्यते अनेन इति दर्शनम्” — That through which Reality is directly seen, apprehended, and verified in conscious experience.',
          type: 'philosophical',
        },
      },
      {
        heading: 'Pair 1: The Analytical Systems — Nyāya and Vaiśeṣika',
        subheading: 'Epistemology (How We Know) and Ontology (What Exists)',
        paragraphs: [
          'The first pair establishes the foundational rules of verification. Before the intellect can dare to contemplate the unmanifest absolute, it must ensure that its instruments of perception, deduction, and linguistic meaning are entirely free of defect.',
          'Nyāya (The School of Logic): Codified by Sage Akṣapāda Gautama in the Nyāya Sūtras, Nyāya is the bedrock of Indian logical realism. It asserts that human suffering is born of ignorance (Mithyā-jñāna), which can only be eradicated through flawless, verifiable knowledge (Tattva-jñāna). Nyāya introduces an exhaustive 16-category system of dialectical inquiry (Padārthas like Pramāṇa, Prameya, Saṃśaya, and Tarka) and pioneers a rigorous four-factor epistemology. It validates truth strictly through Pramāṇas (valid means of knowledge): Direct Perception (Pratyakṣa), Inference (Anumāna), Analogical Comparison (Upamāna), and Valid Verbal Testimony (Śabda). Nyāya establishes that unassailable, disciplined logic is the irreplaceable first step toward inner liberation.',
          'Vaiśeṣika (Atomistic Pluralism): Founded by Sage Kaṇāda (traditionally depicted as picking up scattered grains in fields to contemplate the smallest units of matter), Vaiśeṣika complements Nyāya’s epistemological engine by turning its gaze to the physical universe. Centuries before Democritus, Kaṇāda formulated a thorough atomic cosmology.',
          'Vaiśeṣika posits that the entire physical universe is reducible to Paramāṇu (परमाणु — indivisible, dimensionless, indestructible point-particles of matter). These eternal atoms are animated and assembled by an unseen cosmic dynamic principle (Adṛṣṭa). Vaiśeṣika systematically categorizes the entire knowable cosmos into seven Padārthas (categories of reality): Substance (Dravya), Quality (Guṇa), Action (Karma), Universality (Sāmānya), Particularity (Viśeṣa — from which the school derives its name), Inherence (Samavāya), and Non-existence (Abhāva). By understanding the precise mathematical mechanics of matter, the conscious observer learns to disentangle its identity from physical substrate.',
        ],
        table: {
          headers: ['Category (Padārtha)', 'Definition', 'Physical & Cognitive Function'],
          rows: [
            ['Dravya (द्रव्य)', 'Substance', '9 foundational substances: 5 elements (Earth, Water, Fire, Air, Space) + Time, Space, Soul (Ātman), and Mind (Manas)'],
            ['Guṇa (गुण)', 'Quality / Attribute', '24 distinct qualities residing in substances (color, taste, number, dimension, conjunction, velocity)'],
            ['Karma (कर्म)', 'Motion / Dynamic Action', 'Physical displacement and activity (upward, downward, contraction, expansion, locomotion)'],
            ['Sāmānya (सामान्य)', 'Generality / Universal', 'The common essence that unites particulars into classes (e.g. cowness in all cows, mass in matter)'],
            ['Viśeṣa (विशेष)', 'Particularity / Individuation', 'The ultimate discriminator distinguishing individual eternal atoms and liberated souls'],
            ['Samavāya (समवाय)', 'Inseparable Inherence', 'The eternal, indivisible relation binding whole and parts, quality and substance (e.g. fire and heat)'],
            ['Abhāva (अभाव)', 'Non-Existence / Negation', 'Recognized as an objective reality: prior absence, destruction, absolute negation, and mutual exclusion'],
          ],
        },
      },
      {
        heading: 'Pair 2: The Experiential Systems — Sāṅkhya and Yoga',
        subheading: 'Internal Mechanics of Consciousness, Matter, and the Psyche',
        paragraphs: [
          'The second pair shifts inquiry from external objects and logical categories to the deep interior mechanics of consciousness, the human mind, and evolutionary biology.',
          'Sāṅkhya (The Dualistic Enumeration): Founded by Sage Kapila, Sāṅkhya is an intensely analytical, rationalist system that maps the cosmos through numbers, components, and cause-and-effect sequences. Rejecting the necessity of an interventionist creator deity, Sāṅkhya models the cosmos through a profound dualism: Puruṣa (pure, unattached, uncaused witness-consciousness) and Prakṛti (primordial, dynamic, unmanifested nature composed of the three Guṇas).',
          'Sāṅkhya enumerates the 25 Tattvas (cosmic principles) through which the universe evolves when Puruṣa casts its proximity upon Prakṛti. It represents humanity’s earliest evolutionary blueprint explaining how spirit becomes entangled in the software and hardware of matter.',
          'Yoga (The Psychophysical Disciplines): Codified by Sage Patañjali in the Yoga Sūtras, Yoga accepts the theoretical cosmology and 25 Tattvas of Sāṅkhya, but transforms it into an empirical, experimental laboratory. Recognizing that intellectual understanding alone cannot shatter psychological suffering, Yoga provides the practical methodology to directly experience the independence of Puruṣa from Prakṛti.',
          'Through the Eight Limbs of Yoga (Aṣṭāṅga Yoga)—spanning ethical restraints (Yama), internal observances (Niyama), physical posture (Āsana), breath regulation (Prāṇāyāma), sensory withdrawal (Pratyāhāra), focused concentration (Dhāraṇā), unbroken meditative contemplation (Dhyāna), and transcendental absorption (Samādhi)—Yoga systematically quietens the fluctuating waves of the mental apparatus (Citta-vṛtti-nirodha). It is the empirical technology used to realize the freedom that Sāṅkhya mathematically maps.',
        ],
        sutras: [
          {
            sanskrit: 'योगश्चित्तवृत्तिनिरोधः ॥',
            transliteration: 'yogaś citta-vṛtti-nirodhaḥ',
            meaning: 'Yoga is the intentional stilling of the fluctuating modifications of the mind-field.',
            source: 'Patañjali Yoga Sūtra 1.2',
          },
          {
            sanskrit: 'तदा द्रष्टुः स्वरूपेऽवस्थानम् ॥',
            transliteration: 'tadā draṣṭuḥ sva-rūpe \'vasthānam',
            meaning: 'Then the Witness (Puruṣa) rests established in its own true, unconditioned nature.',
            source: 'Patañjali Yoga Sūtra 1.3',
          },
        ],
      },
      {
        heading: 'Pair 3: The Transcendent Systems — Mīmāṃsā and Vedānta',
        subheading: 'Acoustic Duty and Non-Dual Realization of the Absolute',
        paragraphs: [
          'The final pair returns directly to the source wellspring of Indian civilization—the Vedic texts—progressing from righteous action in human life to the final realization of non-dual reality.',
          'Mīmāṃsā (Ritualistic Hermeneutics / Pūrva Mīmāṃsā): Founded by Sage Jaimini, Mīmāṃsā focuses on the Karma-Kāṇḍa (the action and ritual sections of the Vedas). It is a school of immense linguistic sophistication, investigating the acoustic eternity of sound, the nature of duty (Dharma), and sentence interpretation. Mīmāṃsā argues that the cosmos is uncreated and cyclical, sustained by the precise execution of Vedic sound frequencies and sacrificial action. By harmonizing one’s actions with cosmic rhythm, an individual exhausts karmic debt and upholds cosmic equilibrium (Ṛta).',
          'Vedānta (The Upanishadic Apex / Uttara Mīmāṃsā): Codified by Sage Bādarāyaṇa in the Brahma Sūtras and expounded by Adi Śaṅkara, Rāmānuja, and Madhva, Vedānta shifts inquiry to the Jñāna-Kāṇḍa (the wisdom section of the Upaniṣads). Vedānta transcends physical rituals, logic, and dualistic models to reveal the singular, non-dual foundation of reality.',
          'In Advaita Vedānta, the ultimate truth is captured in the great Mahāvākyas: the individual self (Ātman) is fundamentally identical to the infinite, non-dual substratum of existence (Brahman). The perceived multiplicity of the universe is an apparent superimposition (Māyā / Vivarta). Liberation is not the acquisition of something new, but the sudden, unshakeable awakening to who one has always been.',
        ],
        callout: {
          title: 'The Vedāntic Equation',
          text: '“ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः” — Brahman alone is the ultimate unchanging reality; the empirical world is transient and context-dependent; the individual soul is none other than Brahman itself.',
          type: 'insight',
        },
      },
      {
        heading: 'The Progressive Staircase of Human Inquiry',
        subheading: 'How Six Distinct Perspectives Form One Unified Path',
        paragraphs: [
          'Though these six Darśanas appear distinct on the surface—some emphasizing syllogistic inference, others atomic physics, others dualistic evolution, and still others non-dual transcendence—they are neither contradictory nor fragmented. Classical tradition visualizes them as a calibrated, progressive staircase of human understanding:',
          '1. You sharpen the instrument of the intellect with Nyāya logic, eliminating cognitive bias and invalid deduction.',
          '2. You deconstruct physical matter with Vaiśeṣika, understanding that the sensory universe is composed of atomic configurations.',
          '3. You map the 25 evolutionary layers of mind, ego, and senses with Sāṅkhya, discerning the difference between conscious observer and mechanical nature.',
          '4. You apply the experimental psychophysical tools of Yoga to quieten the nervous system and experience pure consciousness directly.',
          '5. You execute your duty with Mīmāṃsā, harmonizing speech and action with cosmic order.',
          '6. And finally, you dissolve all artificial boundaries in Vedānta, resting in the singular, undivided ground of existence.',
        ],
      },
    ],
    keyTakeaways: [
      'A Darśana is an active "instrument of seeing," calibrated to eliminate suffering and produce direct realization.',
      'The six orthodox systems operate as three symbiotic pairs: Logic/Physics (Nyāya/Vaiśeṣika), Psychology/Practice (Sāṅkhya/Yoga), and Action/Realization (Mīmāṃsā/Vedānta).',
      'Rather than mutually contradictory beliefs, they constitute a progressive epistemological ladder from atomic physical analysis to unitive consciousness.',
    ],
  },

  // ==========================================
  // PART 2: THE SINGULAR FOUNDATION
  // ==========================================
  {
    id: 'addendum-part-2-singular-foundation',
    partNumber: 2,
    slug: 'singular-foundation-self-discovery-universal-phenomenon',
    titleDevanagari: 'एकमेवाद्वितीयम् — आत्मसाक्षात्कारश्च वैश्विकप्रपञ्चश्च',
    titleEnglish: 'The Singular Foundation: Self-Discovery and Universal Phenomenon',
    subtitle: 'How Looking Inward Through Self-Realization Discloses the Singular Architecture of the Cosmos',
    readingTimeMinutes: 10,
    kicker: 'Course Addendum · Part 2 of 4 · Metaphysics & Epistemology',
    summary:
      'While the Shad Darshanas utilize vastly different entry points—ranging from the atomic materialism of Vaisheshika to the fierce logic of Nyaya—they are not competing ideologies. Instead, they represent a unified, multi-tiered assault on human ignorance with a singular objective: the elimination of suffering through the experiential discovery of a solitary, foundational reality.',
    sections: [
      {
        heading: 'The Inseparable Cosmos and Mind',
        subheading: 'Why Cosmology and Psychology Are One',
        paragraphs: [
          'While the Shad Darshanas utilize vastly different entry points—ranging from the atomic materialism of Vaisheshika to the fierce logic of Nyaya—they are not competing ideologies. Instead, they represent a unified, multi-tiered assault on human ignorance. They share a singular, radical objective: the elimination of suffering through the experiential discovery of a solitary, foundational reality.',
          'In the Western philosophical tradition, cosmology (the study of the universe) and psychology (the study of the mind) are frequently treated as distinct disciplines. In classical Indian thought, they are fundamentally inseparable. The macrocosm of the universe is mirrored entirely within the microcosm of the human individual. Therefore, the quest to understand the ultimate reality of the cosmos inevitably resolves into an intense journey of personal self-discovery.',
        ],
        callout: {
          title: 'The Microcosm-Macrocosm Axiom',
          text: 'The macrocosm of the universe is mirrored entirely within the microcosm of the human individual. To understand the cosmos, one must decode the conscious observer.',
          type: 'cosmological',
        },
      },
      {
        heading: 'The Architecture of Illusion: Why We Suffer',
        subheading: 'Avidyā and the Systemic Error in Perception',
        paragraphs: [
          'At the core of all six orthodox systems lies a shared diagnostic premise: human suffering (Duḥkha) is not an intrinsic property of existence, but a systemic error in perception.',
          'We experience pain, anxiety, and limitation because we misidentify ourselves. We mistake the transient instruments of existence—our physical bodies, our fluctuating thoughts, our societal egos, and our sensory cravings—for our true, unchanging identity.',
          'This state of fundamental ignorance (Avidyā) creates a false fracture in reality, splitting a unified universe into a chaotic matrix of "me" versus "not-me."',
          'To heal this fracture, the Darshanas do not ask for blind faith. They demand an active, experimental dismantling of this illusion. By systematically peeling back the layers of what we are not, the baseline foundation of what we are naturally reveals itself.',
        ],
        callout: {
          title: 'The Root Diagnostic',
          text: '“अविद्यास्मितारागद्वेषाभिनिवेशाः क्लेशाः” — Fundamental ignorance (Avidyā) splits the indivisible continuum into the false friction of me vs not-me, generating all suffering.',
          type: 'philosophical',
        },
      },
      {
        heading: 'The Inward Mirror: Mapping the Self to the Cosmos',
        subheading: 'Three Stages of Inward Navigation',
        paragraphs: [
          'The bridge between self-discovery and the universal phenomenon is built on a profound metaphysical law: the fundamental structural mechanics of the universe can be accessed directly by looking inward. Each school provides a unique methodology to navigate this inward path, mapping the micro-macrocosm connection:',
          '• From Atoms to Detachment: In Vaiśeṣika, when an individual understands that the physical body is merely a temporary collection of cosmic atoms (Paramāṇu) governed by universal laws, the personal ego begins to dissolve. The realization that "I am not this flesh, but the consciousness witnessing its atomic dance" brings profound liberation.',
          '• From Cognition to Pure Witness: In Sāṅkhya and Yoga, self-discovery is treated as an exact psychological science. By tracking the evolutionary descent of matter, the seeker learns to separate Prakṛti (the physical body, mind, and thoughts) from Puruṣa (pure, unattached consciousness). Yoga provides the experiential technology to quiet the mind’s ripples, allowing the individual to rest in the silent depths of the true Self.',
          '• From Individual Soul to Cosmic Absolute: This inward journey reaches its absolute zenith in Vedānta. Vedānta declares that the deepest, innermost core of an individual—the Ātman (the true Soul)—is not separate, isolated, or finite. It is entirely identical to Brahman, the singular, uncaused, infinite foundation of the entire cosmos.',
        ],
        sutras: [
          {
            sanskrit: 'अयमात्मा ब्रह्म ॥',
            transliteration: 'ayam ātmā brahma',
            meaning: 'This individual Self (Atman) is identical to the ultimate cosmic reality (Brahman).',
            source: 'Māṇḍūkya Upaniṣad 1.2',
          },
        ],
      },
      {
        heading: 'The Discovery of the Singular Foundation',
        subheading: 'The Collapse of Multiplicity into the Screen of Being',
        paragraphs: [
          'When self-discovery is pushed to its logical and experiential limits across these schools, the seeker breaks through the illusion of multiplicity. They discover the Universal Phenomenon: a singular foundation that underlies all changing forms.',
          'This singular foundation is described not as a vacuum of nothingness, but as a boundless ocean of consciousness. It is the silent, unmoving screen upon which the cinematic masterpiece of the universe is projected.',
          'Matter changes, stars collapse, bodies age, and thoughts flicker by, but the foundational screen remains entirely untouched, pristine, and eternal.',
        ],
        table: {
          headers: ['Cosmic Dimension', 'Individual Dimension', 'Experiential Realization'],
          rows: [
            ['Brahman (The Infinite Reality underlying the entire universe)', 'Ātman (The Unchanging Core of the human individual)', 'The individual soul is fundamentally identical to cosmic reality.'],
            ['Prakṛti (The Primordial Energy forming all physical matter)', 'Puruṣa (The Silent Witness observing sensory & mental states)', 'Consciousness is the sovereign witness, disentangled from mechanical nature.'],
            ['Universal Cosmos (Macrocosm)', 'Individual Being (Microcosm)', 'The ultimate realization that the Individual and the Cosmic are fundamentally ONE.'],
          ],
        },
      },
      {
        heading: 'Liberation: The Ultimate Awakening',
        subheading: 'The Drop Recognizing Itself as the Entire Ocean',
        paragraphs: [
          'In this traditional framework, self-discovery is not an intellectual pastime or an emotional coping mechanism. It is a total, irreversible transformation of consciousness known as Mokṣa or Kaivalya (liberation).',
          'When the seeker realizes that their true identity is identical to the singular foundation of the universe, the fear of death, limitation, and lack vanishes entirely.',
          'You no longer see yourself as a fragile drop of water desperately fighting to survive in a hostile world. You realize that you are the entire ocean, momentarily expressing itself as a drop.',
          'The quest to understand outer reality ends precisely where it began: in the silent, luminous depths of your own being.',
        ],
        callout: {
          title: 'The Culmination',
          text: '“You are not a drop in the ocean fighting to survive; you are the entire ocean expressing itself momentarily as a drop.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Cosmology and psychology are fundamentally inseparable in Indian philosophy; the macrocosm is mirrored in the human microcosm.',
      'Suffering (Duḥkha) is a systemic error in perception (Avidyā) born from misidentifying temporary instruments for our true identity.',
      'Vaiśeṣika dissolves bodily ego through atomic physics; Sāṅkhya & Yoga separate mechanical mind from pure witness; Vedānta reveals the identity of Ātman and Brahman.',
      'Mokṣa (liberation) is the awakening that you are not a fragile drop fighting reality, but the infinite ocean of being itself.',
    ],
  },

  // ==========================================
  // PART 3: QUANTITATIVE ENUMERATION OF MATTER
  // ==========================================
  {
    id: 'addendum-part-3-sankhya-tattvas',
    partNumber: 3,
    slug: 'quantitative-enumeration-of-matter-sankhya-tattvas',
    titleDevanagari: 'साङ्ख्यदर्शनम् — तत्त्वानां संख्यात्मकं वर्गीकरणम्',
    titleEnglish: "Quantitative Enumeration of Matter: Sankhya Darshan's Tattva System",
    subtitle: "The 25 Tattvas: Mapping the Architecture of Reality with the Precision of a Cosmic Software Programmer",
    readingTimeMinutes: 12,
    kicker: 'Course Addendum · Part 3 of 4 · Cosmology & Taxonomy',
    summary:
      'If Vedanta is the poetic, non-dual climax of Indian philosophy, Sankhya Darshan is its rigorous, mathematical blueprint. Founded by Sage Kapila, Sankhya literally means "to enumerate," "to calculate," or "to define through numbers." Rather than relying on mystical assertions, Sankhya maps the architecture of reality with the cold, diagnostic precision of a cosmic software programmer.',
    sections: [
      {
        heading: 'The Rigorous Mathematical Blueprint',
        subheading: 'Sage Kapila and the Software Architecture of Existence',
        paragraphs: [
          'If Vedanta is the poetic, non-dual climax of Indian philosophy, Sankhya Darshan is its rigorous, mathematical blueprint. Founded by Sage Kapila, the word Sankhya literally means "to enumerate," "to calculate," or "to define through numbers."',
          'Rather than relying on mystical assertions, Sankhya maps the architecture of reality with the cold, diagnostic precision of a cosmic software programmer.',
          'Sankhya posits that the entire universe—from a dense block of granite to the most subtle, fleeting human thought—is an evolutionary dance between two ultimate, uncreated realities: Purusha (Pure, silent witness consciousness) and Prakriti (Primordial, unmanifested matter/energy).',
          'To explain how the universe transforms from unmanifested potential into the tangible world, Sankhya outlines a strict taxonomic descent of 25 Tattvas (cosmic principles or elements).',
        ],
        callout: {
          title: 'The Algorithmic Essence',
          text: '“सम्यक् ख्यायते प्रकाश्यते वस्तुतत्त्वम् अनया इति साङ्ख्यम्” — Sankhya maps the cosmos not through mythological personification, but through precise numerical taxonomy and cause-and-effect invariants.',
          type: 'scientific',
        },
      },
      {
        heading: 'The Primordial Binary: Purusha and Prakriti',
        subheading: 'Consciousness, Unmanifest Nature, and the Three Guṇas',
        paragraphs: [
          'Before counting begins, Sankhya establishes a foundational dualism. Reality is divided into two distinct, eternal principles:',
          '1. Purusha (Consciousness): The ultimate, unattached Seer. It possesses no qualities, performs no actions, and undergoes no changes. It is pure, contentless consciousness that simply witnesses reality. It is numbered as the First Tattva.',
          '2. Prakriti (Primordial Nature): The ultimate Seen. It is the unmanifested matrix of all physical, energetic, and mental phenomena. It is unconscious but possesses boundless dynamic potential. It is numbered as the Second Tattva.',
          'In its primal state, Prakriti is perfectly balanced by three fundamental cosmic forces or cords known as the Gunas:',
          '• Sattva: The force of light, equilibrium, purity, and intelligence.',
          '• Rajas: The force of kinetic energy, passion, motion, and change.',
          '• Tamas: The force of inertia, darkness, mass, and stability.',
          'Evolution (Sristi) begins the moment the silent presence of Purusha disturbs the equilibrium of Prakriti’s three Gunas—acting like a magnet drawing iron filings into a distinct, complex pattern.',
        ],
      },
      {
        heading: 'The Internal Instrument (Antaḥkaraṇa)',
        subheading: 'The First Differentiation of Intellect and Ego',
        paragraphs: [
          '3. Mahat / Buddhi (Cosmic Intelligence): The first product of evolution. It is the capacity to discern, judge, and hold universal intelligence.',
          '4. Ahamkara (The Ego/I-maker): The principle of individuation. It takes the universal insights of Buddhi and claims them, creating the concept of "I," "me," and "mine."',
          'From Ahamkara, the evolutionary path splits into two parallel streams based on the dominant Guna: the subjective path of consciousness/perception (driven by Sattva) and the objective path of physical matter (driven by Tamas).',
        ],
      },
      {
        heading: 'The Subjective Stream (Sattva-Dominant)',
        subheading: 'Mind, The Five Senses, and Five Organs of Action',
        paragraphs: [
          '5. Manas (The Lower Mind): The central sensory processing unit. It coordinates sensory inputs and motor outputs.',
          '6–10. Jnanendriyas (Five Sensory Organs): The faculties of perception—hearing (ears), touching (skin), seeing (eyes), tasting (tongue), and smelling (nose).',
          '11–15. Karmendriyas (Five Organs of Action): The faculties of physical interaction—speaking (mouth), grasping (hands), locomoting (feet), excreting (anus), and procreating (genitals).',
        ],
        table: {
          headers: ['Cognitive Sense (Jñānendriya)', 'Faculty / Organ', 'Executive Action (Karmendriya)', 'Operational Instrument'],
          rows: [
            ['Śrotra (Hearing)', 'Ears / Acoustic perception', 'Vāk (Speaking)', 'Mouth / Vocal apparatus'],
            ['Tvak (Touching)', 'Skin / Tactile perception', 'Pāṇi (Grasping)', 'Hands / Manual dexterity'],
            ['Cakṣus (Seeing)', 'Eyes / Visual perception', 'Pāda (Locomotion)', 'Feet / Physical movement'],
            ['Rasana (Tasting)', 'Tongue / Gustatory perception', 'Pāyu (Excretion)', 'Excretory organs'],
            ['Ghrāṇa (Smelling)', 'Nose / Olfactory perception', 'Upastha (Generation)', 'Generative organs'],
          ],
        },
      },
      {
        heading: 'The Objective Stream (Tamas-Dominant)',
        subheading: 'Quantum Blueprints (Tanmātras) and Physical Elements (Mahābhūtas)',
        paragraphs: [
          '16–20. Tanmatras (Subtle Vibrational Elements): The quantum blueprints of matter. They are the pure potentials of sensory experience—sound (Shabda), touch (Sparsha), form (Rupa), taste (Rasa), and smell (Gandha).',
          '21–25. Mahabhutas (Gross Physical Elements): The final, densest crystallization of matter that forms our physical world—space/ether (Akasha), air (Vayu), fire (Agni), water (Jala), and earth (Prithvi).',
        ],
        sutras: [
          {
            sanskrit: 'मूलप्रकृतिरविकृतिर्महदाद्याः प्रकृतिविकृतयः सप्त । षोडशकस्तु विकारो न प्रकृतिर्न विकृतिः पुरुषः ॥',
            transliteration: 'mūla-prakṛtir avikṛtir mahad-ādyāḥ prakṛti-vikṛtayaḥ sapta | ṣoḍaśakas tu vikāro na prakṛtir na vikṛtiḥ puruṣaḥ',
            meaning: 'Primordial Nature is unevolved; the seven beginning with Mahat are both cause and effect; the sixteen are modifications only; Purusha is neither cause nor effect.',
            source: 'Īśvarakṛṣṇa, Sāṅkhya Kārikā 3',
          },
        ],
      },
      {
        heading: 'The Mathematical Implications of Sankhya',
        subheading: 'From Mythological Metaphor to Quantitative Taxonomy',
        paragraphs: [
          'By defining the universe as an exact sequence of 25 distinct categories, Sankhya fundamentally shifted Indian thought away from mythological explanations and toward quantitative analysis.',
          'It proved that the physical universe is not chaotic; it is a highly ordered, structured system governed by cause and effect (Satkaryavada). If you know the exact composition of the cause, you can mathematically predict the nature of the effect.',
          'This precise, structured taxonomy of matter laid the conceptual foundation for ancient Indian sciences, including Ayurveda and, most notably, the evolution of structural mathematics.',
        ],
        callout: {
          title: 'The Predictive Architecture',
          text: '“Because matter is quantitatively mapped, ancient India approached mathematics not as an abstract human fiction, but as the literal structural blueprint of nature.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Sankhya literally means "to enumerate" or "to define through numbers"—mapping reality with the precision of a cosmic software programmer.',
      'The cosmos evolves from the interaction of Purusha (pure witness consciousness) and Prakriti (unmanifest matter/energy governed by Sattva, Rajas, and Tamas).',
      'The 25 Tattvas cleanly descend: Purusha (1), Prakriti (2), Mahat (3), Ahamkara (4), the internal sensory stream (5–15), the subtle Tanmatras (16–20), and the gross Mahabhutas (21–25).',
      'Satkaryavada (causal conservation) and quantitative taxonomy directly catalyzed Indian structural mathematics and Ayurveda.',
    ],
  },

  // ==========================================
  // PART 4: EVOLUTION OF VEDIC MATHEMATICS
  // ==========================================
  {
    id: 'addendum-part-4-vedic-mathematics-vibration',
    partNumber: 4,
    slug: 'evolution-vedic-mathematics-math-structure-vibration-brick',
    titleDevanagari: 'वैदिकगणितस्य विकासः — गणितं विन्यासः, स्पन्दनं च शिला',
    titleEnglish: 'Evolution of Vedic Mathematics: Math as Structure, Vibration as the Brick',
    subtitle: 'Cosmology, the Śulba Sūtras, and Acoustic Standing Waves: The Blueprint of Cosmic Creation',
    readingTimeMinutes: 14,
    kicker: 'Course Addendum · Part 4 of 4 · Sacred Geometry & Cymatics',
    summary:
      'By mapping the cosmos through the 25 concrete categories of the Tattva system, Sankhya Darshan established a monumental premise: the universe is structured numerically, logically, and predictably. This structural worldview directly birthed the evolution of Vedic mathematics—where geometry provides the cosmic framework, and acoustic vibration serves as the material brick.',
    sections: [
      {
        heading: 'The Foundational Premise',
        subheading: 'Mathematics as the Living Cosmic Blueprint',
        paragraphs: [
          'By mapping the cosmos through the 25 concrete categories of the Tattva system, Sankhya Darshan established a monumental premise: the universe is structured numerically, logically, and predictably. This structural worldview directly birthed the evolution of Vedic mathematics.',
          'In this traditional scientific paradigm, mathematics is not an arbitrary, human-made language used to measure dead matter. Instead, mathematics is recognized as the underlying geometric blueprint of reality, while subtle, acoustic frequencies—vibrations—act as the fundamental bricks that occupy that structural frame.',
        ],
        callout: {
          title: 'The Core Equation',
          text: '“गणितं विन्यासः, स्पन्दनं च शिला” — Mathematics is the invariant geometric matrix; vibrational frequency is the energetic brick filling that structural frame.',
          type: 'cosmological',
        },
      },
      {
        heading: 'The Mathematical Canopy: The Śulba Sūtras and Sacrificial Altars',
        subheading: 'Ancient Geometry as Cosmological Simulation',
        paragraphs: [
          'The earliest formal expression of this mathematical cosmology is found in the Sulba Sutras (appendices to the Vedic literature dating back to the 1st millennium BCE). The word Sulba refers to a measuring chord or rope. These texts are the world\'s oldest manuals for structural geometry, detailing the design and construction of complex fire altars (Agnicayana).',
          'To the ancient Vedic rishis, building an altar was a precise cosmological simulation. If the cosmos was structured according to exact numerical principles, then a physical structure built on those exact ratios would act as a resonant antenna, harmonizing the earth with cosmic forces.',
          'This requirement for absolute geometric perfection led to several groundbreaking mathematical discoveries centuries before their Western counterparts:',
          '• The "Pythagorean" Theorem: Formulated explicitly by Sage Baudhayana long before Pythagoras: "The rope stretched along the length of the diagonal produces an area which the vertical and horizontal sides make together."',
          '• Squaring the Circle: Developing highly sophisticated fractional approximations to construct circular altars that possessed the exact same surface area as square altars.',
          '• Irrational Numbers: Calculating the square root of 2 (√2) to a stunning degree of five decimal precision: 1 + 1/3 + 1/(3·4) - 1/(3·4·34) ≈ 1.4142156...',
        ],
        sutras: [
          {
            sanskrit: 'दीर्घचतुरश्रस्याक्ष्णया रज्जुः पार्श्वमानी तिर्यङ्ग्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ॥',
            transliteration: 'dīrghasyākṣṇayā rajjuḥ pārśvamānī tiryaṅmānī ca yatpṛthagbhūte kurutastadubhayaṃ karoti',
            meaning: 'The diagonal rope of an oblong produces both areas which the flanking length and transverse breadth produce separately.',
            source: 'Baudhāyana Śulba Sūtra 1.48 (Centuries before Pythagoras)',
          },
        ],
      },
      {
        heading: 'Math as the Structure: The Geometric Matrix',
        subheading: 'Invariant Spatial Laws Preceding Physical Matter',
        paragraphs: [
          'In this Vedic synthesis, geometry represents the unchanging, static framework of space—the architectural rules of the universe.',
          'Just as Sankhya asserts that Mahat (universal intelligence) precedes the creation of physical matter, Vedic mathematics asserts that geometric relationships exist before physical objects do. The empty space of the universe is not a vacuum; it is an invisible matrix of mathematical symmetry.',
          'When we plot a geometric form—like the precise concentric triangles of a Yantra or the exact layout of a Sulba Sutras fire altar—we are tracing the invariant lines of cosmic stress. Math is the structural skeleton of the cosmos.',
        ],
        table: {
          headers: ['Geometric Matrix (Math)', 'Frequency Modulation (Vibration)', 'Physical Reality (Matter)'],
          rows: [
            ['The invariant spatial laws of the cosmic framework', 'The dynamic, oscillating energy acting as material bricks', 'The dense, visible world of the 25 Tattvas'],
            ['Rekhā-Gaṇita / Sacred Geometry (Śulba Sūtras)', 'Śabda / Tanmātras / Chanted Chandas Harmonics', 'Crystallized physical elements (Mahābhūtas)'],
          ],
        },
      },
      {
        heading: 'Vibration as the Brick: The Tanmātras and Acoustic Materialism',
        subheading: 'Standing Waves of Energy Oscillating Across Densities',
        paragraphs: [
          'If mathematics provides the empty, structural matrix, what fills it to create dense, physical matter? Sankhya answers this through the concept of the Tanmatras—the subtle, vibrational potencies that precede the gross physical elements.',
          'The primary Tanmatra is Shabda (sound or vibrational frequency). In Vedic physics, matter is not composed of hard, static marbles. Instead, it is composed of standing waves of energy oscillating at different frequencies.',
          '• High Frequencies, Subtle Matter: Frequencies that are incredibly rapid and fine express themselves as thoughts, intelligence, and the sensory mind.',
          '• Low Frequencies, Dense Matter: Frequencies that slow down, condensing into heavy standing waves, express themselves as dense physical matter like water or earth.',
          'Therefore, vibration is the brick. A physical object is simply a specific frequency of acoustic energy locked inside a specific mathematical structure.',
        ],
        callout: {
          title: 'Acoustic Standing Waves',
          text: '“In Vedic physics, matter is not made of static hard marbles. Matter is standing waves of sound energy locked inside geometric coordinates.”',
          type: 'scientific',
        },
      },
      {
        heading: 'Visualizing Sound Form: Cymatics and the Vedic Paradigm',
        subheading: 'Sound Frequencies Ordering Matter into Sacred Symmetry',
        paragraphs: [
          'This relationship can be perfectly understood through the modern science of cymatics, where sound frequencies are passed through a physical medium (like sand on a metal plate). At random frequencies, the sand is chaotic. But the moment a precise, harmonic frequency is played, the sand instantly arranges itself into beautiful, flawless geometric patterns.',
          'The sound frequency (the vibration) acts as the literal brick, while the resulting pattern demonstrates the underlying mathematical matrix (the structure). Change the frequency, and the physical geometry changes instantly.',
        ],
      },
      {
        heading: 'The Unified Equation of Reality',
        subheading: 'Navigating, Altering, and Transcending Materiality',
        paragraphs: [
          'The evolution of Vedic mathematics, fueled by the analytical division of Sankhya, culminated in a breathtakingly modern realization: the universe is a living continuum of mathematical geometry and energetic vibration.',
          'By understanding the mathematical laws of the universe (Math as Structure) and mastering the sonic, vibrational keys of mantras and elements (Vibration as the Brick), the ancient thinkers believed they could navigate, alter, and ultimately transcend material reality entirely—returning the mind back up the ladder of the 25 Tattvas to rest in pure, eternal consciousness.',
        ],
        callout: {
          title: 'The Ultimate Synthesis',
          text: '“By understanding the geometry of space (Math as Structure) and mastering the resonant keys of sound (Vibration as Brick), consciousness ascends the 25 Tattvas back to its native unconditioned source.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Mathematics in Vedic thought is the underlying geometric blueprint of reality, not a detached artificial tool.',
      'Acoustic frequencies (vibrations / Tanmatras) act as the material bricks that fill spatial geometric matrices.',
      'The Sulba Sutras anticipated the Pythagorean theorem, irrational number approximations (√2 to five decimal places), and squaring the circle.',
      'Modern cymatics proves the Vedic premise: vibrational sound frequencies directly crystallize chaotic matter into symmetrical geometric order.',
      'Mastering the math of structure and the frequency of vibration allows consciousness to transcend material entrapment and rest in Purusha.',
    ],
  },

  // ==========================================
  // PART 5 / MASTERCLASS: THE ETERNAL CHARIOTEER AND THE CAGE BIRD
  // ==========================================
  {
    id: 'addendum-tagore-sanskrit-genius',
    partNumber: 5,
    partLabel: 'Masterclass 5',
    slug: 'eternal-charioteer-cage-bird-tagore-sanskrit-upanishads',
    titleDevanagari: 'चिरसारथिः पञ्जरस्थविहगश्च — रवीन्द्रनाथस्य काव्यप्रतिभायाम् उपनिषदः',
    titleEnglish: 'The Eternal Charioteer and the Cage Bird: How Sanskrit and the Upanishads Shaped Rabindranath Tagore’s Creative Genius',
    subtitle: 'Vedic Upbringing at Jorasanko · Sanskrit in Jana Gana Mana · The Parthasarathy Metaphor · Dui Pakhi & Mundaka Upanishad',
    readingTimeMinutes: 14,
    kicker: 'Course Addendum · Masterclass 5 · The Sanskrit Blueprint of Indian Literature',
    summary:
      'The sprawling Jorasanko mansion in 19th-century Calcutta was more than a family home; it was the vibrant crucible of the Bengal Renaissance, where ancient Indian heritage collided with modern intellectual awakening. At its center was a young Rabindranath Tagore, whose spiritual worldview was fundamentally anchored in Vedic and Upanishadic traditions. From the Tatsama architecture of India’s national anthem to the Dvā Suparṇā parable in "Dui Pakhi" and the cosmic Chirasarathi of the Gita, explore how classical Sanskrit provided the foundational blueprint for Tagore’s creative genius.',
    heroImage: {
      src: '/philosophy/tagore-sanskrit-charioteer.jpg',
      alt: 'Rabindranath Tagore: The Eternal Charioteer and the Cage Bird — Sanskrit and Upanishadic Heritage Infographic',
      caption: 'Visual Symphony: Jorasanko, Himalayan Vedic Awakening (सत्यं ज्ञानम् अनन्तम्), Jana Gana Mana Etymology, The Eternal Charioteer (चिरसारथिः), and the Two Birds of Mundaka Upanishad (द्वा सुपर्णा).'
    },
    sections: [
      {
        anchorId: 'upanishadic-upbringing',
        heading: '1. The Upanishadic Upbringing of a Polymath',
        subheading: 'Jorasanko Crucible · Himalayan Retreat · Sanskrit Grammar & The Gayatri Awakening',
        paragraphs: [
          'The sprawling Jorasanko mansion in 19th-century Calcutta was more than a family home; it was the vibrant crucible of the Bengal Renaissance. Within its walls, ancient Indian heritage collided with modern intellectual awakening. At the center of this world was a young Rabindranath Tagore, whose spiritual worldview was fundamentally anchored in the Vedic and Upanishadic traditions.',
          'Though born into the Brahmo Samaj—a reformist movement that rejected idol worship—Tagore’s literature remains profoundly tied to classical Indian heritage, rich in Sanskrit imagery, and deeply embedded with Puranic metaphors. Rabindranath grew up under the strict yet profoundly spiritual guidance of his father, Debendranath Tagore, who was affectionately known as Maharshi (the Great Sage).',
          'At age eleven, Tagore underwent the Upanayana (sacred thread coming-of-age ceremony). Following this milestone, his father took him on an extensive retreat into the Himalayas. It was during these formative travels that Debendranath systematically instructed the young boy in classical Sanskrit grammar, the Vedas, and the Upanishads.',
          'The daily routine at Jorasanko involved the chanting of Upanishadic verses and the Gayatri Mantra. Tagore later identified these early morning recitations as a core awakening of his consciousness to the oneness of the universe.',
          'Tagore’s lifelong spiritual manifesto, Sadhana: The Realisation of Life, explicitly relies on these ancient texts. He adopted the Vedic concepts of Brahman (the Infinite Cosmic Consciousness) and Advaita (non-duality), viewing nature not as passive, dead matter but as a living, divine entity.',
        ],
        callout: {
          title: 'The Jorasanko Awakening',
          text: '“Daily morning chanting of Upanishadic verses and the Gayatri Mantra at Jorasanko formed the primordial acoustic soil from which Tagore’s universal vision of consciousness emerged.”',
          type: 'philosophical',
        },
      },
      {
        anchorId: 'sanskrit-in-jana-gana-mana',
        heading: '2. Sanskrit Elements in "Jana Gana Mana"',
        subheading: 'Linguistic DNA of the National Anthem · Tatsama Vocabulary as a Universal Bridge',
        paragraphs: [
          'Although Jana Gana Mana was originally composed as a five-stanza song titled Bharoto Bhagyo Bidhata in Sadhu Bhasha (a highly formal, literary register of Bengali), its linguistic DNA is almost entirely Sanskrit.',
          'Nearly every noun and adjective in the anthem functions natively in Sanskrit:',
          '• Jana (जन): People or individual souls.\n• Gana (गण): The masses or plurality.\n• Mana (मनस् / मन): The mind or collective consciousness.\n• Adhinayaka (अधिनायक): Supreme sovereign ruler or moral leader.\n• Bhagya Vidhata (भाग्य विधाता): The divine dispenser of destiny.',
          'Because of this intense saturation of Tatsama words (direct Sanskrit loanwords preserved without phonetic alteration), the anthem bypasses regional linguistic barriers. It acts as a universal bridge, enabling speakers of diverse modern Indian languages to instantly grasp its sacred, unifying meaning.',
        ],
        table: {
          headers: ['Sanskrit Term (पदम्)', 'Devanagari / Root', 'Classical Meaning', 'Anthem Architectural Role'],
          rows: [
            ['Jana', 'जन (√जन् · to be born)', 'Individual person, embodied soul', 'The diverse populace across provinces'],
            ['Gana', 'गण (√गण् · to count / assemble)', 'The collective plurality, community', 'The democratic brotherhood of India'],
            ['Mana', 'मनस् / मन (√मन् · to think / perceive)', 'Inner mind, psyche, cognition', 'The collective national conscience'],
            ['Adhinayaka', 'अधिनायक (अधि + नायक)', 'Supreme sovereign guide, moral helmsman', 'The perennial director of destiny'],
            ['Bhagya Vidhata', 'भाग्य विधाता (वि + √धा)', 'Divine dispenser of cosmic destiny', 'Supreme Providence guiding the nation'],
          ],
        },
        callout: {
          title: 'The Universal Linguistic Bridge',
          text: '“Saturated with Tatsama words, Jana Gana Mana bypasses regional linguistic barriers, operating natively in Bengali, Hindi, Marathi, Gujarati, Odia, and Malayalam alike.”',
          type: 'insight',
        },
      },
      {
        anchorId: 'eternal-charioteer-krishna',
        heading: '3. The Puranic Krishna Reference: The Eternal Charioteer',
        subheading: 'Stanza 3 of Bharoto Bhagyo Bidhata · Chirasarathi as Parthasarathy · The Panchajanya Conch',
        paragraphs: [
          'While a historical misconception once circulated that Tagore wrote the song to praise the visiting British monarch King George V, Tagore himself fiercely debunked this. In letters written in 1937 and 1939, he clarified that the song was dedicated to the perennial guide of India’s destiny, not a mortal king.',
          'When examining the lesser-known third stanza of the full, uncut poem, Tagore’s imagery reveals a clear inspiration drawn from the Bhagavad Gita and Puranic descriptions of Sri Krishna:',
          '“Patana-Abhyudaya-Shana-Bandhura Pantha, Yuga Yuga Dhavita Yatri\nHey Chirasarathi, Tava Ratha-Chakre Mukharita Patha Dina Ratri...”',
          '• The Eternal Charioteer (Chirasarathi / चिरसारथि): When Tagore translated this stanza into English, he purposefully capitalized the phrase as the "Eternal Charioteer". This is a direct reference to Krishna’s role as Parthasarathy (पार्थसारथि), the divine charioteer steering humanity through the tumultuous battlefield of life.',
          '• The Sound of the Conch (Sankha-Dhwani / शङ्खध्वनि): The stanza continues to describe a divine conch shell blowing amidst the chaos of revolutionary struggle to dispel terror and grief. This mirrors the Panchajanya (पाञ्चजन्य), the sacred conch blown by Krishna to signal the triumph of righteousness (Dharma).',
          '• The Wheel of Time (Yuga-Chakra / युगचक्र): The reference to the wheels of the cosmic chariot guiding weary pilgrims through ages (Yuga Yuga) echoes the Puranic concepts of divine cosmic order and the cyclic flow of time directed by the Supreme Divinity.',
        ],
        sutras: [
          {
            sanskrit: 'पतन-अभ्युदय-बन्धुर पन्था, युग-युग धावित यात्री । हे चिरसारथि, तव रथचक्रे मुखरित पथ दिन-रात्रि ॥ दारुण विप्लव-माझे तव शङ्खध्वनि बाजे...',
            transliteration: 'patana-abhyudaya-bandhura panthā, yuga-yuga dhāvita yātrī | he chirasārathi, tava ratha-cakre mukharita patha dina-rātri || dāruṇa viplava-mājhe tava śaṅkha-dhvani bāje...',
            meaning: 'Along the rugged road of rise and fall, pilgrims have journeyed age after age. O Eternal Charioteer, the wheels of Thy chariot echo day and night along the path! Amidst dire turmoil, Thy sacred conch resounds...',
            source: 'Rabindranath Tagore · Bharoto Bhagyo Bidhata (Original Complete National Poem, Stanza 3) · 1911',
          },
        ],
        callout: {
          title: 'The Divine Helmsman (पार्थसारथिः)',
          text: '“By capitalizing ‘Eternal Charioteer’ (चिरसारथि), Tagore invoked neither monarch nor empire, but Krishna at the reins of the cosmic chariot, steering humanity through historical crisis.”',
          type: 'cosmological',
        },
      },
      {
        anchorId: 'parable-of-two-birds-dui-pakhi',
        heading: '4. The Parable of the Two Birds (Dui Pakhi)',
        subheading: 'Dvā Suparṇā Mantra of Mundaka Upanishad 3.1.1 & Rigveda 1.164.20 · Forest Bird vs. Cage Bird',
        paragraphs: [
          'One of the most striking examples of how Tagore repackaged Vedic philosophy into modern literature is his famous poem "Dui Pakhi" (Two Birds). The poem draws direct inspiration from the celebrated Dvā Suparṇā mantra found in both the Mundaka Upanishad (3.1.1) and the Rigveda (1.164.20).',
          'The ancient Upanishadic allegory describes two inseparable companion birds perched on the exact same tree:',
          'In the original text, the first bird (Jiva, the individual soul) hops from branch to branch, eating the sweet and bitter fruits of the world, getting caught up in earthly joys and sorrows. The second bird (Paramatman, the Supreme Consciousness) merely sits on a higher branch, watching calmly as a silent witness (Sakshi) without consuming anything.',
          'In his poem "Dui Pakhi", Tagore masterfully adapts this abstract metaphysical duality into a poignant narrative dialogue between a free forest-bird and a captive cage-bird.',
          'The forest-bird represents boundless infinity, absolute freedom, and the vast, unknown skies—mirroring the detached Paramatman. The cage-bird represents the finite self bound by safe limits, material habits, and domestic comfort—mirroring the conditioned Jiva.',
          'By translating a static, philosophical concept into an active, emotional conversation between two entities longing to unite, Tagore gave a modern, human heartbeat to an ancient Upanishadic truth.',
        ],
        sutras: [
          {
            sanskrit: 'द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते । तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥',
            transliteration: 'dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte | tayoranyaḥ pippalaṃ svādvatti-anaśnannanyo abhicākaśīti ||',
            meaning: 'Two birds of beautiful plumage, inseparable companions, cling to the very same tree. One of them eats the sweet and bitter fruits; the other looks on calmly without eating, a radiant silent witness.',
            source: 'Muṇḍaka Upaniṣad 3.1.1 · Ṛgveda 1.164.20 · Śvetāśvatara Upaniṣad 4.6',
          },
        ],
        callout: {
          title: 'From Metaphysics to Human Longing',
          text: '“In Dui Pakhi, the abstract polarity of Jīva and Paramātman is transformed into a tender dialogue between a forest bird and a cage bird, yearning for union across the bars of finite existence.”',
          type: 'philosophical',
        },
      },
      {
        anchorId: 'vedic-echoes-in-nature-prakriti',
        heading: '5. Vedic Echoes in Tagore’s Nature Poetry (Prakriti)',
        subheading: 'Nature as a Living, Conscious Cosmic Force · Sarvam Khalvidam Brahma',
        paragraphs: [
          'Tagore’s nature poetry (Prakriti-Giti) is not merely a romantic appreciation of scenic beauty; it is a direct continuation of the Vedic worldview.',
          'In the Rigveda, elements of nature like the dawn (Ushas), wind (Vayu), and rain (Parjanya) are treated as living, conscious, cosmic forces (Devatas). Tagore revived this ancient perception, viewing nature as a vast theater where the infinite manifests through the finite.',
          '• The Universe as a Living Entity: For Tagore, the rustling of leaves, the cresting of river waves, and the shifting seasons were expressions of a singular, cosmic heartbeat. This mirrors the Upanishadic dictum, "Sarvam Khalvidam Brahma" (All this universe is indeed Brahman).',
          '• The Spiritual Bond: Unlike Western Romantic poets who often viewed nature as a canvas for the human ego, Tagore saw nature as a spiritual kin. In his poems, the human soul and the natural world are two notes in the same eternal symphony, constantly seeking communion.',
        ],
        callout: {
          title: 'The Cosmic Heartbeat',
          text: '“‘Sarvam Khalvidam Brahma’ (सर्वं खल्विदं ब्रह्म) — For Tagore, nature was never a passive backdrop for the ego, but a living sanctuary where the finite soul communes with its own infinite essence.”',
          type: 'scientific',
        },
      },
      {
        anchorId: 'comparative-text-analysis',
        heading: '6. Comparative Text Analysis: Upanishadic Roots vs. Tagorean Verses',
        subheading: 'The Light of Consciousness & The Abundance of Joy (Ananda)',
        paragraphs: [
          'To truly appreciate how seamlessly Tagore translated ancient Sanskrit philosophy into the cadence of modern Bengali verse, we can examine direct conceptual parallels across canonical verses.',
          '1. The Light of Consciousness (प्रकाशः):\n• The Upanishadic Root (From the Isha Upanishad 15):\n"Hiranmayena Patrena Satyasya Apihitam Mukham | Tat Tvam Pushan Apavrinu Satya Dharmaya Drishtaye ||"\n(The face of Truth is covered with a golden vessel. Unveil it, O Sun, so that I, who love the Truth, may see it.)\n• Tagore’s Resonance (From Gitanjali, Song 57):\n"Light, my light, the world-filling light, the eye-kissing light, heart-sweetening light! Ah, the light dances, my darling, at the center of my life; the light strikes, my darling, the chords of my love..."\n• The Connection: Both texts move from contemplating the physical sun to experiencing an ecstatic, internal awakening of spiritual truth and cosmic illumination.',
          '2. The Abundance of Joy (आनन्दः):\n• The Upanishadic Root (From the Taittiriya Upanishad 3.6):\n"Anandaddhyeva khalvimani bhutani jayante | Anandena jatani jivanti ||"\n(From joy all these beings are born; by joy they are sustained when born; and into joy they enter upon departing.)\n• Tagore’s Resonance (From Anandadhara Bahiche Bhubane):\n"Anandadhara bahiche bhubane / Dina rajani kataro amrito raso nabhane..."\n(A torrent of joy flows through the universe, night and day the nectar of immortality pours from the skies...)\n• The Connection: Tagore takes the abstract philosophical concept of Ananda (infinite cosmic joy) and transforms it into a highly visual, emotionally accessible lyrical river that washes over the everyday human experience.',
        ],
        sutras: [
          {
            sanskrit: 'हिरण्मयेन पात्रेण सत्यस्यापिहितं मुखम् । तत्त्वं पूषन्नपावृणु सत्यधर्माय दृष्टये ॥',
            transliteration: 'hiraṇmayena pātreṇa satyasyāpihitaṃ mukham | tat tvaṃ pūṣann apāvṛṇu satyadharmāya dṛṣṭaye ||',
            meaning: 'The face of Truth is covered with a golden vessel. Unveil it, O Sustainer (Pūṣan), so that I, dedicated to Truth, may behold it.',
            source: 'Īśa Upaniṣad 15',
          },
          {
            sanskrit: 'आनन्दाद्ध्येव खल्विमानि भूतानि जायन्ते । आनन्देन जातानि जीवन्ति । आनन्दं प्रयन्त्यभिसंविशन्तीति ॥',
            transliteration: 'ānandāddhy eva khalv imāni bhūtāni jāyante | ānandena jātāni jīvanti | ānandaṃ prayanty abhisaṃviśantīti ||',
            meaning: 'From Infinite Joy (Ānanda) indeed all these beings are born; by Joy they are sustained when born; and into Joy they dissolve upon departure.',
            source: 'Taittirīya Upaniṣad 3.6.1',
          },
        ],
      },
      {
        anchorId: 'shared-blueprint-indian-heritage',
        heading: '7. Conclusion: The Shared Blueprint of Indian Heritage',
        subheading: 'How Sanskrit Unifies Modern Indian Languages · Philosophical Depth, Rasa & Chandas',
        paragraphs: [
          'Learning Sanskrit and its foundational literature is essential to gaining a complete picture of India\'s roots, heritage, and poetic references. Languages like Hindi, Bengali, Marathi, Gujarati, Odia, and Malayalam operate within this shared conceptual ecosystem.',
          'Tagore did not let Sanskrit restrict his modern style; instead, he used it as an expansive toolkit to elevate the emotion and texture of his poetry. By understanding the linguistic and philosophical foundations he leaned on, we do not just read modern Indian literature—we hear the ancient, eternal echoes built directly into its vocabulary.',
        ],
        table: {
          headers: ['Dimension', 'Role of Sanskrit Roots', 'Modern Language Impact'],
          rows: [
            ['Philosophical Depth', 'Direct loaning of complex conceptual words (Tatsama).', 'Allows abstract ideas like Mukti (liberation), Chetana (consciousness), and Satya (truth) to hold identical meanings across distinct regional borders.'],
            ['Emotional Landscape', 'Aesthetic frameworks borrowed from classical texts (Navarasa).', 'Words denoting deep emotional states like Viraha (the painful longing of separation) convey the exact same cultural weight in a Hindi bhajan as they do in a Malayalam poem.'],
            ['Rhythmic Architecture', 'Metrical patterns and sound arrangements (Chandas).', 'The innate, mathematical cadence of Sanskrit verses directly shaped the lyrical flow and structural rhythm of medieval and modern regional devotional poetry.'],
          ],
        },
        callout: {
          title: 'Hearing the Eternal Echoes',
          text: '“By understanding the linguistic and philosophical foundations Tagore leaned on, we don’t just read modern Indian literature—we hear the ancient, eternal echoes built directly into its vocabulary.”',
          type: 'insight',
        },
      },
    ],
    keyTakeaways: [
      'Rabindranath Tagore’s childhood immersion in Sanskrit grammar, the Vedas, and the Upanishads under Maharshi Debendranath formed the bedrock of his literary universe.',
      'Jana Gana Mana is composed in Tatsama-saturated Sadhu Bhasha, making its vocabulary native to Sanskrit and universally intelligible across all Indian linguistic traditions.',
      'The third stanza of Bharoto Bhagyo Bidhata addresses the Supreme as Chirasarathi (Eternal Charioteer), directly evoking Krishna as Parthasarathy in the Gita with the conch of victory (Panchajanya).',
      'Tagore’s celebrated poem "Dui Pakhi" (Two Birds) is a lyrical dramatization of the famous Dvā Suparṇā mantra from the Mundaka Upanishad and Rigveda.',
      'In Tagore’s nature songs (Prakriti-Giti), the natural world is not passive scenery but the living embodiment of Brahman ("Sarvam Khalvidam Brahma").',
      'Classical Sanskrit serves as the unifying linguistic and aesthetic motherboard for modern Indian literatures across Hindi, Bengali, Marathi, Gujarati, Odia, and Malayalam.',
    ],
  },
];
