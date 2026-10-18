import React, { useState, useMemo, useCallback } from 'react';
import { BodhiWisdomCard } from '../BodhiWisdomCard';
import { TermPanel, ChallengeList, LabNextAction, type LabTerm, type LabChallenge } from './common';
import { soundEffects } from '../../utils/soundEffects';
import '../../styles/science-lab.css';

// ---------------------------------------------------------------------------
// DATA: Sanskrit Statecraft Terms
// ---------------------------------------------------------------------------
const STATECRAFT_TERMS: LabTerm[] = [
  {
    dev: 'अर्थशास्त्रम्',
    iast: 'Arthaśāstra',
    en: 'Science of wealth, quantitative administration, and governance',
    note: 'Authored by Kauṭilya (Chāṇakya) in the 4th century BCE, establishing systematic public administration and risk modeling.',
  },
  {
    dev: 'सप्ताङ्ग-राज्यम्',
    iast: 'Saptāṅga-rājyam',
    en: 'The seven organic limbs of the state',
    note: 'Svāmin (Ruler), Amātya (Ministers), Janapada (Territory & People), Durga (Fortifications), Kośa (Treasury), Daṇḍa (Military), and Mitra (Allies).',
  },
  {
    dev: 'गोपः',
    iast: 'Gopa',
    en: 'Village census and statistical survey officer',
    note: 'Mauryan royal officers tasked with compiling exhaustive ledgers of households, occupations, community demographics, livestock, and crop yields.',
  },
  {
    dev: 'समाहर्ता',
    iast: 'Samāhartā',
    en: 'Chief Collector of Revenue and administrative data director',
    note: 'Supervised five to twenty village units (Gopas and Sthānikas), auditing agricultural outputs and preventing fiscal discrepancies.',
  },
  {
    dev: 'वृद्धिः',
    iast: 'Vṛddhi',
    en: 'Interest rate / return on capital tiered by risk',
    note: 'Set systematically by Kauṭilya: 15% standard commercial, 120% for overland forest caravans, and 240% for hazardous maritime voyages.',
  },
  {
    dev: 'सामुद्र-संयानम्',
    iast: 'Sāmudra-saṃyānam',
    en: 'Trans-oceanic maritime trade expedition',
    note: 'Carrying high default risk from monsoons, shoals, and piracy, warranting a 20% monthly (240% annual) risk premium.',
  },
  {
    dev: 'कान्तार-पथः',
    iast: 'Kāntāra-pathaḥ',
    en: 'Overland forest and desert wilderness caravan route',
    note: 'Subject to brigandage, dehydration, and wild beasts, assigned a 10% monthly (120% annual) interest rate.',
  },
  {
    dev: 'सार्थवाहः',
    iast: 'Sārthavāha',
    en: 'Merchant caravan leader employing portfolio diversification',
    note: 'Kauṭilya explicitly mandated splitting cargo across multiple independent carriers to prevent catastrophic ruin.',
  },
  {
    dev: 'कोश-वृद्धिः',
    iast: 'Kośa-vṛddhi',
    en: 'Treasury reserve accumulation',
    note: 'The foundational bedrock of state stability: "All military and administrative endeavors are rooted in the Treasury" (Kośamūlāḥ hi daṇḍāḥ).',
  },
  {
    dev: 'दुर्भिक्ष-प्रतीकारः',
    iast: 'Durbhikṣa-pratīkāra',
    en: 'Strategic famine buffer stock management',
    note: 'Mandated storing half of all royal grain receipts in state granaries to survive multi-year droughts and natural calamities.',
  },
];

// ---------------------------------------------------------------------------
// DATA: Lab Challenges
// ---------------------------------------------------------------------------
const STATECRAFT_CHALLENGES: LabChallenge[] = [
  {
    q: 'What is the primary condition for Saptāṅga state equilibrium?',
    options: ['Maximizing military alone', 'Balancing all seven organic limbs (Svāmin, Amātya, Janapada, Durga, Kośa, Daṇḍa, Mitra)', 'Suppressing rural districts'],
    answer: 1,
    explain: 'Kauṭilya emphasized that no limb can thrive in isolation; a state functions as a living interdependent organism.',
  },
  {
    q: 'What was the statistical role of a Gopa officer in the Mauryan administration?',
    options: ['Leading frontier cavalry', 'Conducting comprehensive village census surveys of households, vocations, and resources', 'Collecting port duties'],
    answer: 1,
    explain: 'Gopas maintained meticulous village ledgers documenting land usage, demographics, livestock, and revenue streams.',
  },
  {
    q: 'How did Mauryan maritime merchants protect against ruin during oceanic trade voyages?',
    options: ['Risk diversification across multi-vessel merchant fleets', 'Putting all wealth into a single largest ship', 'Refusing overseas trade'],
    answer: 0,
    explain: 'Kauṭilya documents risk-splitting across diverse vessels to insure against unpredictable monsoonal storms and piracy.',
  },
  {
    q: 'In the Arthaśāstra, the king’s supreme ethical duty is defined as…',
    options: ['Personal enrichment', 'In the happiness of the subjects lies his happiness (Prajasukhe sukham rajnah)', 'Absolute conquest without restraint'],
    answer: 1,
    explain: 'Prajasukhe sukham rajnah, prajanam ca hite hitam: The ruler’s welfare is bound irrevocably to the welfare of the people.',
  },
];

// ---------------------------------------------------------------------------
// Types & Models
// ---------------------------------------------------------------------------
interface VillageData {
  id: string;
  nameDev: string;
  nameEn: string;
  region: string;
  households: number;
  communities: {
    agriculturists: number;
    artisans: number;
    traders: number;
    pastoralists: number;
  };
  cultivatedAcres: number;
  fallowAcres: number;
  cattle: number;
  grainYieldTons: number;
  declaredTax: number;
  trueTax: number;
  audited: boolean;
}

const INITIAL_VILLAGES: VillageData[] = [
  {
    id: 'v1',
    nameDev: 'गङ्गा-तीर-ग्रामः',
    nameEn: 'Gangā-Tīra (Riverside)',
    region: 'Pāṭaliputra Delta',
    households: 240,
    communities: { agriculturists: 150, artisans: 40, traders: 30, pastoralists: 20 },
    cultivatedAcres: 1200,
    fallowAcres: 150,
    cattle: 480,
    grainYieldTons: 960,
    declaredTax: 120,
    trueTax: 160,
    audited: false,
  },
  {
    id: 'v2',
    nameDev: 'विन्ध्याटवी-ग्रामः',
    nameEn: 'Vindhyāṭavī (Forest Border)',
    region: 'Central Forest Frontier',
    households: 110,
    communities: { agriculturists: 40, artisans: 25, traders: 15, pastoralists: 30 },
    cultivatedAcres: 450,
    fallowAcres: 300,
    cattle: 620,
    grainYieldTons: 310,
    declaredTax: 45,
    trueTax: 51,
    audited: false,
  },
  {
    id: 'v3',
    nameDev: 'उज्जयिनी-सार्थ-ग्रामः',
    nameEn: 'Ujjayinī-Sārtha (Trade Hub)',
    region: 'Avantī Crossroads',
    households: 380,
    communities: { agriculturists: 110, artisans: 130, traders: 110, pastoralists: 30 },
    cultivatedAcres: 950,
    fallowAcres: 80,
    cattle: 390,
    grainYieldTons: 670,
    declaredTax: 180,
    trueTax: 245,
    audited: false,
  },
  {
    id: 'v4',
    nameDev: 'कलिङ्ग-समुद्र-पत्तनम्',
    nameEn: 'Kaliṅga-Pattana (Coastal Port)',
    region: 'Eastern Bay of Bengal',
    households: 290,
    communities: { agriculturists: 90, artisans: 80, traders: 95, pastoralists: 25 },
    cultivatedAcres: 780,
    fallowAcres: 120,
    cattle: 290,
    grainYieldTons: 540,
    declaredTax: 140,
    trueTax: 200,
    audited: false,
  },
];

interface VoyageLog {
  id: string;
  round: number;
  strategy: 'single' | 'diversified';
  startingSuvarnas: number;
  endingSuvarnas: number;
  event: string;
  survived: boolean;
  roi: number;
}

// ---------------------------------------------------------------------------
export interface KautilyaStatecraftProps {
  onNextLab?: () => void;
}

export const KautilyaStatecraft: React.FC<KautilyaStatecraftProps> = ({ onNextLab }) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'saptanga' | 'census' | 'voyage' | 'arena'>('saptanga');

  // Tab 1: Saptanga Sliders (0 - 100)
  const [svamin, setSvamin] = useState(85);
  const [amatya, setAmatya] = useState(70);
  const [janapada, setJanapada] = useState(75);
  const [durga, setDurga] = useState(65);
  const [kosa, setKosa] = useState(80);
  const [danda, setDanda] = useState(70);
  const [mitra, setMitra] = useState(60);

  // Tab 2: Gopa Census Data
  const [villages, setVillages] = useState<VillageData[]>(INITIAL_VILLAGES);
  const [selectedVillageId, setSelectedVillageId] = useState<string>('v1');
  const [gopaAuditFeedback, setGopaAuditFeedback] = useState<string | null>(null);

  // Tab 3: Maritime Voyage Simulator
  const [voyageMode, setVoyageMode] = useState<'single' | 'diversified'>('diversified');
  const [voyageRoute, setVoyageRoute] = useState<'samudra' | 'kantara' | 'samanya'>('samudra');
  const [suvarnas, setSuvarnas] = useState(10000);
  const [isSailing, setIsSailing] = useState(false);
  const [voyageLogs, setVoyageLogs] = useState<VoyageLog[]>([]);
  const [currentEventText, setCurrentEventText] = useState<string | null>(null);

  // Tab 4: Arena & Level-Up Quizzes
  const [arenaLevel, setArenaLevel] = useState<1 | 2 | 3>(1);
  const [arenaScore, setArenaScore] = useState(0);
  const [arenaStreak, setArenaStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);

  // Audio helper
  const playChime = useCallback(() => {
    soundEffects.playCelebrationChime();
  }, []);

  const playSnap = useCallback(() => {
    soundEffects.playPuzzleSnap();
  }, []);

  const playClick = useCallback(() => {
    soundEffects.playStrokeChime();
  }, []);

  // ---------------------------------------------------------------------------
  // Saptāṅga Mathematical Metrics
  // ---------------------------------------------------------------------------
  const saptangaMetrics = useMemo(() => {
    const values = [svamin, amatya, janapada, durga, kosa, danda, mitra];
    const avg = values.reduce((a, b) => a + b, 0) / 7;
    const minVal = Math.min(...values);

    // Kautilyan Three-Fold Powers (Trividha Śakti)
    // 1. Utsāha-Śakti (Energy/Resolve of Ruler)
    const utsaha = svamin;
    // 2. Prabhāva-Śakti (Material Power of Treasury and Force)
    const prabhava = Math.round((kosa * 0.55 + danda * 0.45));
    // 3. Mantra-Śakti (Intellectual Power of Counsel, People, Allies, Forts)
    const mantra = Math.round((amatya * 0.35 + janapada * 0.3 + mitra * 0.2 + durga * 0.15));

    // Overall State Strength Index
    const statePower = Math.round(utsaha * 0.3 + prabhava * 0.4 + mantra * 0.3);

    // Vyasana (Vulnerability): if any limb falls below 35, system vulnerability spikes
    const isVulnerable = minVal < 35;
    const lowestLimbName =
      minVal === svamin ? 'Svāmin (Ruler Leadership)' :
      minVal === amatya ? 'Amātya (Bureaucratic Integrity)' :
      minVal === janapada ? 'Janapada (Agrarian Health)' :
      minVal === durga ? 'Durga (Border Fortifications)' :
      minVal === kosa ? 'Kośa (Treasury Reserves)' :
      minVal === danda ? 'Daṇḍa (Military Discipline)' : 'Mitra (Diplomatic Network)';

    return {
      avg: Math.round(avg),
      utsaha,
      prabhava,
      mantra,
      statePower,
      isVulnerable,
      lowestLimbName,
      minVal,
    };
  }, [svamin, amatya, janapada, durga, kosa, danda, mitra]);

  // ---------------------------------------------------------------------------
  // Gopa Census Actions
  // ---------------------------------------------------------------------------
  const activeVillage = useMemo(() => {
    return villages.find((v) => v.id === selectedVillageId) || villages[0];
  }, [villages, selectedVillageId]);

  const _totalAuditedTaxRecovered = useMemo(() => {
    return villages.reduce((acc, v) => acc + (v.audited ? v.trueTax - v.declaredTax : 0), 0);
  }, [villages]);
  void _totalAuditedTaxRecovered;

  const handleAuditVillage = (villageId: string) => {
    playSnap();
    setVillages((prev) =>
      prev.map((v) => {
        if (v.id === villageId) {
          return { ...v, audited: true };
        }
        return v;
      })
    );
    const target = villages.find((v) => v.id === villageId);
    if (target && !target.audited) {
      const recovered = target.trueTax - target.declaredTax;
      setGopaAuditFeedback(
        `✓ Audit Complete for ${target.nameEn}: Discrepancy detected! Recovered ${recovered} Suvarṇas in unrecorded grain and market levy.`
      );
      setArenaScore((s) => s + 50);
    }
  };

  const handleAuditAll = () => {
    playChime();
    setVillages((prev) => prev.map((v) => ({ ...v, audited: true })));
    setGopaAuditFeedback('✓ Grand Imperial Audit Executed across all 4 Mauryan districts! Complete transparency established.');
    setArenaScore((s) => s + 150);
  };

  // ---------------------------------------------------------------------------
  // Maritime Voyage Simulation
  // ---------------------------------------------------------------------------
  const interestRate = useMemo(() => {
    if (voyageRoute === 'samudra') return { label: 'Maritime (समुद्र)', annual: 240, monthly: 20 };
    if (voyageRoute === 'kantara') return { label: 'Wilderness Caravan (कान्तार)', annual: 120, monthly: 10 };
    return { label: 'Standard Commercial (सामान्य)', annual: 15, monthly: 1.25 };
  }, [voyageRoute]);

  const handleLaunchVoyage = () => {
    if (suvarnas < 2000) {
      setCurrentEventText('⚠️ Treasury reserves too low to outfit an expedition. Collect village taxes first!');
      return;
    }

    setIsSailing(true);
    playClick();

    setTimeout(() => {
      setIsSailing(false);
      const roll = Math.random();
      const investment = 5000;
      let ending = suvarnas;
      let logEvent = '';
      let survived = true;

      if (voyageMode === 'single') {
        // High variance: single ship either makes 100% profit or 100% loss
        if (roll < 0.35) {
          // Catastrophe: Shipwreck in Indian Ocean monsoon squall
          ending = suvarnas - investment;
          logEvent = '⚡ Catastrophic Shipwreck off Barygaza! 100% cargo lost with single carrier.';
          survived = false;
        } else if (roll < 0.6) {
          // Moderate pirate harassment
          ending = suvarnas - Math.round(investment * 0.4);
          logEvent = '⚔️ Pirate raid off the Malabar coast; forced to jettison 40% cargo.';
        } else {
          // Safe high-margin arrival
          const profit = Math.round(investment * (interestRate.monthly / 10));
          ending = suvarnas + profit;
          logEvent = `⛵ Favorable Monsoon! Single vessel arrived safely with +${profit} Suvarṇas profit!`;
          playChime();
        }
      } else {
        // Diversified: 4 independent vessels (investment divided by 4 = 1250 each)
        // Law of large numbers protects against total ruin
        const shipLosses = [Math.random() < 0.3, Math.random() < 0.3, Math.random() < 0.3, Math.random() < 0.3];
        const lostCount = shipLosses.filter(Boolean).length;
        const savedCount = 4 - lostCount;

        const returnedValue = savedCount * 1250 * (1 + interestRate.monthly / 100 * 3);
        const netChange = Math.round(returnedValue - investment);
        ending = suvarnas + netChange;

        if (lostCount === 0) {
          logEvent = `🌟 Flawless Diversification: All 4 ships docked safely! Net profit: +${netChange} Suvarṇas.`;
          playChime();
        } else if (lostCount < 4) {
          logEvent = `🛡️ Portfolio Defense: ${lostCount} ship(s) damaged by storm, but ${savedCount} ships arrived safely! Net result: ${netChange >= 0 ? '+' : ''}${netChange} Suvarṇas.`;
          playSnap();
        } else {
          logEvent = '🌊 Rare 100-year oceanic cyclone damaged entire fleet. Net loss incurred.';
          survived = false;
        }
      }

      setSuvarnas(ending);
      setCurrentEventText(logEvent);

      setVoyageLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          round: prev.length + 1,
          strategy: voyageMode,
          startingSuvarnas: suvarnas,
          endingSuvarnas: ending,
          event: logEvent,
          survived,
          roi: Math.round(((ending - suvarnas) / investment) * 100),
        },
        ...prev.slice(0, 9),
      ]);
    }, 1100);
  };

  // ---------------------------------------------------------------------------
  // Statecraft Arena Quizzes
  // ---------------------------------------------------------------------------
  const QUIZ_TIERS = useMemo(
    () => ({
      1: [
        {
          q: 'What role did the Gopa fulfill in the Mauryan administrative framework?',
          options: [
            'Supreme military commander of chariot divisions',
            'Village statistical census registrar tracking households, vocations, and crops',
            'Foreign diplomatic envoy stationed in Seleucid lands',
            'Temple architect overseeing stone carving',
          ],
          correct: 1,
          explanation:
            'In Arthaśāstra Book II, Gopas were royal census officers assigned to clusters of 5 to 20 villages to maintain granular ledgers of households, community vocations, and livestock.',
          devQuote: 'गोपः पञ्चग्रामीं दशग्रामीं वा चिन्तयेत्। ग्रामे च कुल-संख्यानं कुर्यात्॥',
        },
        {
          q: 'Which limb (Aṅga) is famously described by Kauṭilya as the bedrock sustaining the military and administration?',
          options: ['Durga (Fortifications)', 'Mitra (Allies)', 'Kośa (The Treasury)', 'Janapada (Territory)'],
          correct: 2,
          explanation:
            'Kauṭilya states "Kośamūlāḥ hi daṇḍāḥ" — the armed forces and administration are entirely rooted in a well-managed royal treasury.',
          devQuote: 'कोशपूर्वाः सर्वारम्भाः। तस्मात् पूर्वं कोशमवेक्षेत॥',
        },
      ],
      2: [
        {
          q: 'Why did Kauṭilya assign an exorbitant 240% annual (20% monthly) interest rate to maritime sea voyages (Sāmudra-saṃyāna)?',
          options: [
            'To prohibit overseas travel for religious orthodox reasons',
            'Because merchants were foreigners exempt from royal protection',
            'To mathematically reflect the extreme default risk and vessel loss from oceanic hazards',
            'To fund royal pirate bounties',
          ],
          correct: 2,
          explanation:
            'Rather than fixing flat interest rates, the Arthaśāstra pioneered actuarial risk pricing: commercial rates escalated from 15% (standard) to 120% (forests) to 240% (maritime) to compensate lenders for catastrophic default risk.',
          devQuote: 'सामुद्राणां तु विंशतिपणा भवति। कान्ताराणां दशपणा॥',
        },
        {
          q: 'How did Kauṭilya instruct Sārthavāhas (caravan leaders) to protect their trade capital from total destruction?',
          options: [
            'Deposit all gold into temple vaults before departing',
            'Divide cargo across multiple independent carriers and vessels (portfolio diversification)',
            'Travel exclusively during monsoons to avoid highway bandits',
            'Carry only light silk fabrics rather than heavy spices',
          ],
          correct: 1,
          explanation:
            'Kauṭilya explicitly mandated dividing precious cargo across diverse vessels and pack caravans, preventing single-point catastrophic failure.',
          devQuote: 'न चैकत्र सर्वं द्रव्यं निक्षिपेत्। बहुधा विभज्य प्रेषयेत्॥',
        },
      ],
      3: [
        {
          q: 'What institutional measure did Kauṭilya mandate to mitigate severe agricultural droughts (Durbhikṣa-pratīkāra)?',
          options: [
            'Impose immediate 100% tax on all gold merchants',
            'Permanently store half of all royal grain receipts as an emergency buffer stock',
            'Evacuate the capital city immediately to foreign kingdoms',
            'Ban the cultivation of rice across all provinces',
          ],
          correct: 1,
          explanation:
            'The Arthaśāstra required state granaries to retain half the collected grain in permanent storage, releasing reserves to stabilize grain prices during famines.',
          devQuote: 'ततोऽर्धं रक्षेदापत्प्रतीकारार्थम्। नवीनं चान्यदाहरेत्॥',
        },
        {
          q: 'In Kauṭilya’s Saptāṅga theory, what are the three foundational powers (Trividha Śakti) of a sovereign state?',
          options: [
            'Bhūmi-Śakti, Vāyu-Śakti, Jala-Śakti',
            'Utsāha-Śakti (Energy), Prabhāva-Śakti (Material/Fiscal), Mantra-Śakti (Intellect/Counsel)',
            'Krodha-Śakti, Lobha-Śakti, Moha-Śakti',
            'Aśva-Śakti, Gaja-Śakti, Ratha-Śakti',
          ],
          correct: 1,
          explanation:
            'Kauṭilya ranks Mantra-Śakti (deliberative wisdom & counsel) as superior to Prabhāva-Śakti (treasury & arms), which is in turn superior to raw Utsāha-Śakti (enthusiasm).',
          devQuote: 'उत्साहप्रभावमन्त्रशक्तीनाम् उत्तरोत्तरा गरीयसी॥',
        },
      ],
    }),
    []
  );

  const currentQuestions = QUIZ_TIERS[arenaLevel];
  const currentQuiz = currentQuestions[activeQuizIndex] || currentQuestions[0];

  const handleSelectQuizOption = (idx: number) => {
    if (quizSubmitted) return;
    playClick();
    setSelectedAnswer(idx);
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer === null || quizSubmitted) return;
    setQuizSubmitted(true);
    const isCorrect = selectedAnswer === currentQuiz.correct;

    if (isCorrect) {
      playChime();
      setArenaScore((s) => s + 100 * arenaLevel);
      setArenaStreak((st) => st + 1);
    } else {
      soundEffects.playEncouragementDing();
      setArenaStreak(0);
    }
  };

  const handleNextQuiz = () => {
    playClick();
    setSelectedAnswer(null);
    setQuizSubmitted(false);

    if (activeQuizIndex + 1 < currentQuestions.length) {
      setActiveQuizIndex((i) => i + 1);
    } else {
      // Level progression
      if (arenaLevel < 3) {
        setArenaLevel((lvl) => (lvl + 1) as 1 | 2 | 3);
        setActiveQuizIndex(0);
        playChime();
      } else {
        setActiveQuizIndex(0);
      }
    }
  };

  return (
    <div className="vl-container" style={{ maxWidth: '1180px', margin: '0 auto', padding: '1rem' }}>
      {/* --------------------------------------------------------------------- */}
      {/* HERO BANNER */}
      {/* --------------------------------------------------------------------- */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #451a03 100%)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          marginBottom: '1.5rem',
          color: '#f8fafc',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            fontSize: '9rem',
            opacity: 0.08,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ⚖️
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.8rem' }}>👑</span>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#f59e0b',
              background: 'rgba(245, 158, 11, 0.15)',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
            }}
          >
            Arthaśāstra Vigyan Lab · 4th Century BCE
          </span>
        </div>

        <h1
          style={{
            margin: '0.25rem 0 0.5rem',
            fontSize: '2.1rem',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #fef3c7, #fde047, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          कौटिलीय-अर्थशास्त्रम् · Quantitative Statecraft &amp; Actuarial Lab
        </h1>

        <p style={{ margin: '0 0 1rem', fontSize: '0.98rem', color: '#d6d3d1', maxWidth: '850px', lineHeight: 1.6 }}>
          Step into the empirical administrative data science of the Mauryan Empire. Explore the <strong>Saptāṅga</strong> balance
          wheel, conduct demographic village audits with royal <strong>Gopas</strong>, navigate <strong>tiered maritime risk</strong> (15% to 240%), and master <strong>portfolio diversification</strong> against catastrophic ruin.
        </p>

        {/* Live Score Strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#fbbf24', fontSize: '1.1rem' }}>🪙</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a8a29e', textTransform: 'uppercase' }}>State Treasury</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fef3c7' }}>{suvarnas.toLocaleString()} Suvarṇas</div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#34d399', fontSize: '1.1rem' }}>📜</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a8a29e', textTransform: 'uppercase' }}>Census Audited</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#a7f3d0' }}>
                {villages.filter((v) => v.audited).length} / {villages.length} Villages
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ color: '#c084fc', fontSize: '1.1rem' }}>🎓</span>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#a8a29e', textTransform: 'uppercase' }}>Vidyā Score</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#e9d5ff' }}>
                {arenaScore} pts {arenaStreak > 1 ? `(🔥 ×${arenaStreak})` : ''}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Bodhi Wisdom & Civilizational Context Card */}
      <div style={{ marginBottom: '1.5rem' }}>
        <BodhiWisdomCard gameId="kautilya" gameTitle="Kauṭilya’s Arthaśāstra: Quantitative Statecraft & Actuarial Governance" />
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* NAVIGATION TABS */}
      {/* --------------------------------------------------------------------- */}
      <nav
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          background: 'rgba(28, 25, 23, 0.7)',
          padding: '0.4rem',
          borderRadius: '14px',
          border: '1px solid rgba(245, 158, 11, 0.2)',
        }}
      >
        {[
          { id: 'saptanga', icon: '🏛️', dev: 'सप्ताङ्ग-सन्तुलनम्', label: '1. Saptāṅga Wheel' },
          { id: 'census', icon: '📋', dev: 'गोप-जनगणना', label: '2. Gopa Village Census' },
          { id: 'voyage', icon: '⛵', dev: 'जोखिम-सार्थवाहः', label: '3. Actuarial Risk Sandbox' },
          { id: 'arena', icon: '🎯', dev: 'कौटिल्य-वेदी', label: '4. Level-Up Quiz Arena' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id as any);
              }}
              style={{
                flex: '1 1 200px',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                border: isActive ? '1px solid #f59e0b' : '1px solid transparent',
                background: isActive ? 'linear-gradient(135deg, #78350f 0%, #451a03 100%)' : 'transparent',
                color: isActive ? '#fef3c7' : '#a8a29e',
                fontWeight: isActive ? 800 : 600,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.2rem',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.92rem' }}>
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              <span style={{ fontSize: '0.75rem', opacity: 0.8, fontFamily: 'serif' }}>{tab.dev}</span>
            </button>
          );
        })}
      </nav>

      {/* --------------------------------------------------------------------- */}
      {/* TAB 1: SAPTĀṄGA STATE RESILIENCE WHEEL */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'saptanga' && (
        <section
          style={{
            background: 'rgba(28, 25, 23, 0.85)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.45rem', color: '#fde047' }}>
                🏛️ सप्ताङ्ग-राज्य-मण्डलम् · The Organic State Power Wheel
              </h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#a8a29e' }}>
                In Arthaśāstra 6.1, Kauṭilya models the state as an integrated organism of 7 symbiotic elements. Adjust allocations to maximize State Power while preventing single-limb crisis (व्यसनम्).
              </p>
            </div>

            {/* Power Status Badge */}
            <div
              style={{
                background: saptangaMetrics.isVulnerable ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                border: saptangaMetrics.isVulnerable ? '1px solid #ef4444' : '1px solid #10b981',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                textAlign: 'right',
              }}
            >
              <div style={{ fontSize: '0.72rem', color: saptangaMetrics.isVulnerable ? '#fca5a5' : '#a7f3d0' }}>
                {saptangaMetrics.isVulnerable ? '⚠️ VYASANA ALERT (CRITICAL VULNERABILITY)' : '✓ SAPTĀṄGA IN HARMONY'}
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: saptangaMetrics.isVulnerable ? '#ef4444' : '#10b981' }}>
                State Power: {saptangaMetrics.statePower}%
              </div>
            </div>
          </div>

          {/* Three-fold Powers Dashboard */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '0.78rem', color: '#d97706', textTransform: 'uppercase', fontWeight: 700 }}>
                1. Utsāha-Śakti (उत्साहशक्तिः)
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fef3c7', margin: '0.2rem 0' }}>
                {saptangaMetrics.utsaha} pts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a8a29e' }}>Personal resolve, energetic leadership, and virtue of the Svāmin.</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: '0.78rem', color: '#059669', textTransform: 'uppercase', fontWeight: 700 }}>
                2. Prabhāva-Śakti (प्रभावशक्तिः)
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#d1fae5', margin: '0.2rem 0' }}>
                {saptangaMetrics.prabhava} pts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a8a29e' }}>Material might: Treasury reserves (Kośa) &amp; Armed deterrence (Daṇḍa).</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.35)', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid #8b5cf6' }}>
              <div style={{ fontSize: '0.78rem', color: '#7c3aed', textTransform: 'uppercase', fontWeight: 700 }}>
                3. Mantra-Śakti (मन्त्रशक्तिः)
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ede9fe', margin: '0.2rem 0' }}>
                {saptangaMetrics.mantra} pts
              </div>
              <div style={{ fontSize: '0.75rem', color: '#a8a29e' }}>Strategic intellect, counsel (Amātya), diplomacy (Mitra), and rural loyalty.</div>
            </div>
          </div>

          {/* Sliders for the 7 Limbs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '1.25rem' }}>
            {[
              { label: 'स्वामिन् (Svāmin)', sub: 'Sovereign / King', val: svamin, set: setSvamin, color: '#f59e0b' },
              { label: 'अमात्य (Amātya)', sub: 'Ministers & Civil Service', val: amatya, set: setAmatya, color: '#8b5cf6' },
              { label: 'जनपद (Janapada)', sub: 'Rural Territory & People', val: janapada, set: setJanapada, color: '#10b981' },
              { label: 'दुर्ग (Durga)', sub: 'Fortifications & Border Defenses', val: durga, set: setDurga, color: '#06b6d4' },
              { label: 'कोश (Kośa)', sub: 'Treasury & Gold Reserves', val: kosa, set: setKosa, color: '#eab308' },
              { label: 'दण्ड (Daṇḍa)', sub: 'Standing Military Army', val: danda, set: setDanda, color: '#ef4444' },
              { label: 'मित्र (Mitra)', sub: 'Allies & Foreign Treaties', val: mitra, set: setMitra, color: '#3b82f6' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: item.color, fontSize: '0.9rem' }}>{item.label}</span>
                    <span style={{ fontSize: '0.75rem', color: '#a8a29e', marginLeft: '0.4rem' }}>({item.sub})</span>
                  </div>
                  <span style={{ fontWeight: 800, color: '#fef3c7', fontSize: '0.9rem' }}>{item.val}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={item.val}
                  onChange={(e) => {
                    item.set(Number(e.target.value));
                  }}
                  style={{ width: '100%', accentColor: item.color, cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>

          {saptangaMetrics.isVulnerable && (
            <div
              style={{
                marginTop: '1.25rem',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                color: '#fca5a5',
                fontSize: '0.85rem',
                lineHeight: 1.5,
              }}
            >
              <strong>Kauṭilya’s Diagnostic Warning (व्यसन-प्रशमनम्):</strong> Severe systemic deficit detected in{' '}
              <strong>{saptangaMetrics.lowestLimbName}</strong> ({saptangaMetrics.minVal}%). In Arthaśāstra 8.1, Kauṭilya cautions that neglect in even one limb creates a cascading failure across neighboring elements. Reallocate resources immediately.
            </div>
          )}
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 2: GOPA CENSUS & VILLAGE DATA SCIENCE */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'census' && (
        <section
          style={{
            background: 'rgba(28, 25, 23, 0.85)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.45rem', color: '#fde047' }}>
                📋 गोप-जनगणना · Mauryan Village Data Science Ledger
              </h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#a8a29e' }}>
                In Arthaśāstra 2.35, the <em>Samāhartā</em> (Chief Revenue Collector) commanded <em>Gopas</em> to maintain exact household registers, vocational community counts, livestock, and arable tracts.
              </p>
            </div>

            <button
              onClick={handleAuditAll}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                color: '#fff',
                border: 'none',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>🔍</span> Execute Imperial Audit (All Villages)
            </button>
          </div>

          {gopaAuditFeedback && (
            <div
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                color: '#6ee7b7',
                fontSize: '0.88rem',
                marginBottom: '1.25rem',
              }}
            >
              {gopaAuditFeedback}
            </div>
          )}

          {/* Village Grid Selector */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            {villages.map((v) => {
              const isSel = v.id === selectedVillageId;
              return (
                <div
                  key={v.id}
                  onClick={() => {
                    playClick();
                    setSelectedVillageId(v.id);
                  }}
                  style={{
                    background: isSel ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0,0,0,0.3)',
                    border: isSel ? '2px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800, color: '#fef3c7', fontSize: '1rem' }}>{v.nameDev}</div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '999px',
                        background: v.audited ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: v.audited ? '#6ee7b7' : '#fca5a5',
                        border: v.audited ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                      }}
                    >
                      {v.audited ? '✓ Audited' : 'Pending Audit'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#a8a29e', margin: '0.2rem 0 0.5rem' }}>{v.nameEn} · {v.region}</div>
                  <div style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    Households: <strong>{v.households}</strong> · Grain: <strong>{v.grainYieldTons} tons</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Village Detail Ledger */}
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '14px',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#fde047', fontSize: '1.2rem' }}>
                  🏛️ Ledger of {activeVillage.nameDev} ({activeVillage.nameEn})
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#a8a29e' }}>Imperial Gopa Registry · Pāṭaliputra Census District</span>
              </div>

              {!activeVillage.audited ? (
                <button
                  onClick={() => handleAuditVillage(activeVillage.id)}
                  style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.55rem 1.15rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Audit Village Record (+50 pts)
                </button>
              ) : (
                <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.88rem' }}>
                  ✓ Official Stamp: Verified Accurate
                </span>
              )}
            </div>

            {/* Granular Demographics Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Community Distribution</div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '0.4rem', lineHeight: 1.5 }}>
                  🌾 Farmers (Kārṣaka): <strong>{activeVillage.communities.agriculturists}</strong>
                  <br />
                  🔨 Artisans (Kāru): <strong>{activeVillage.communities.artisans}</strong>
                  <br />
                  ⚖️ Traders (Vaidehaka): <strong>{activeVillage.communities.traders}</strong>
                  <br />
                  🐄 Herdsmen (Paśupāla): <strong>{activeVillage.communities.pastoralists}</strong>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Arable Land Mapping</div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '0.4rem', lineHeight: 1.5 }}>
                  🌱 Cultivated (Kṛṣṭa): <strong>{activeVillage.cultivatedAcres} acres</strong>
                  <br />
                  🍂 Fallow (Akṛṣṭa): <strong>{activeVillage.fallowAcres} acres</strong>
                  <br />
                  🐃 Domestic Cattle: <strong>{activeVillage.cattle} head</strong>
                  <br />
                  🌾 Annual Yield: <strong>{activeVillage.grainYieldTons} tons</strong>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.85rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Tax Accounting (Bhāga 1/6th)</div>
                <div style={{ fontSize: '0.82rem', color: '#e2e8f0', marginTop: '0.4rem', lineHeight: 1.5 }}>
                  Declared Tax: <strong>{activeVillage.declaredTax} Suvarṇas</strong>
                  <br />
                  Calculated True Tax: <strong style={{ color: '#38bdf8' }}>{activeVillage.trueTax} Suvarṇas</strong>
                  <br />
                  Discrepancy: <strong style={{ color: activeVillage.trueTax > activeVillage.declaredTax ? '#f87171' : '#34d399' }}>
                    {activeVillage.trueTax - activeVillage.declaredTax} Suvarṇas
                  </strong>
                </div>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
              "By recording community demographics, land yields, and livestock independently of village headmen, Kauṭilya’s census prevented both fiscal embezzlement and extortion of the peasantry."
            </p>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 3: ACTUARIAL RISK & MARITIME VOYAGE SANDBOX */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'voyage' && (
        <section
          style={{
            background: 'rgba(28, 25, 23, 0.85)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.45rem', color: '#fde047' }}>
              ⛵ जोखिम-सार्थवाहः · Actuarial Risk &amp; Maritime Diversification Simulator
            </h2>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#a8a29e' }}>
              In Arthaśāstra 3.11, Kauṭilya establishes mathematical risk-adjusted interest rates: 15% standard, 120% for overland forest routes, and 240% for maritime ventures. Test why he commanded merchants to split cargo across multiple carriers.
            </p>
          </div>

          {/* Risk Rate Matrix Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.75rem' }}>
            {[
              { id: 'samanya', title: 'Standard Commercial (सामान्य)', rate: '15% / yr (1.25% / mo)', desc: 'Zero-peril domestic credit within peaceful city limits.', color: '#10b981' },
              { id: 'kantara', title: 'Forest Caravan (कान्तार-पथ)', rate: '120% / yr (10% / mo)', desc: 'Overland caravans subject to drought, predators, and bandits.', color: '#f59e0b' },
              { id: 'samudra', title: 'Maritime Sea-Vessel (सामुद्र)', rate: '240% / yr (20% / mo)', desc: 'Trans-oceanic expeditions facing monsoons, shoals, and pirates.', color: '#ef4444' },
            ].map((tier) => {
              const isSelected = voyageRoute === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    playClick();
                    setVoyageRoute(tier.id as any);
                  }}
                  style={{
                    background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.3)',
                    border: isSelected ? `2px solid ${tier.color}` : '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: tier.color }}>{tier.title}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fef3c7', margin: '0.25rem 0' }}>{tier.rate}</div>
                  <div style={{ fontSize: '0.78rem', color: '#a8a29e' }}>{tier.desc}</div>
                </div>
              );
            })}
          </div>

          {/* Voyage Outfit & Strategy Controls */}
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '14px',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: '#fde047' }}>
              ⚓ Outfit the Expedition (Capital: 5,000 Suvarṇas at Stake)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              {/* Strategy Selector */}
              <div>
                <label style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 700, display: 'block', marginBottom: '0.4rem' }}>
                  Risk Strategy:
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      playClick();
                      setVoyageMode('single');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '8px',
                      border: voyageMode === 'single' ? '2px solid #ef4444' : '1px solid #44403c',
                      background: voyageMode === 'single' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(0,0,0,0.2)',
                      color: voyageMode === 'single' ? '#fca5a5' : '#a8a29e',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                    }}
                  >
                    1 Mega-Ship (All in One)
                  </button>
                  <button
                    onClick={() => {
                      playClick();
                      setVoyageMode('diversified');
                    }}
                    style={{
                      flex: 1,
                      padding: '0.65rem',
                      borderRadius: '8px',
                      border: voyageMode === 'diversified' ? '2px solid #10b981' : '1px solid #44403c',
                      background: voyageMode === 'diversified' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.2)',
                      color: voyageMode === 'diversified' ? '#6ee7b7' : '#a8a29e',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                    }}
                  >
                    4-Vessel Diversification
                  </button>
                </div>
              </div>

              {/* Launch Action */}
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button
                  disabled={isSailing}
                  onClick={handleLaunchVoyage}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '10px',
                    border: 'none',
                    background: isSailing
                      ? '#44403c'
                      : 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: isSailing ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.3)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSailing ? '🌊 Navigating Ocean Currents...' : '🚀 Launch Oceanic Voyage (5,000 Suvarṇas)'}
                </button>
              </div>
            </div>

            {currentEventText && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '10px',
                  color: '#fef3c7',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                }}
              >
                {currentEventText}
              </div>
            )}
          </div>

          {/* Voyage Log History */}
          {voyageLogs.length > 0 && (
            <div>
              <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem', color: '#a8a29e', textTransform: 'uppercase' }}>
                Expedition Logbook (Last {voyageLogs.length} Voyages)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {voyageLogs.map((log) => (
                  <div
                    key={log.id}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.84rem',
                      borderLeft: log.roi >= 0 ? '3px solid #10b981' : '3px solid #ef4444',
                    }}
                  >
                    <div>
                      <span style={{ color: '#f59e0b', fontWeight: 700 }}>#{log.round}</span> ·{' '}
                      <span style={{ color: '#94a3b8' }}>{log.strategy === 'single' ? '1 Vessel' : '4-Ship Fleet'}:</span>{' '}
                      <span style={{ color: '#e2e8f0' }}>{log.event}</span>
                    </div>
                    <span
                      style={{
                        fontWeight: 800,
                        color: log.roi >= 0 ? '#34d399' : '#f87171',
                      }}
                    >
                      {log.roi >= 0 ? `+${log.roi}%` : `${log.roi}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* TAB 4: KAUTILYA LEVEL-UP QUIZ ARENA */}
      {/* --------------------------------------------------------------------- */}
      {activeTab === 'arena' && (
        <section
          style={{
            background: 'rgba(28, 25, 23, 0.85)',
            borderRadius: '16px',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.45rem', color: '#fde047' }}>
                🎯 कौटिल्य-विद्या-वेदी · 3-Level Statecraft Certification
              </h2>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#a8a29e' }}>
                Test your mastery of Mauryan administrative accounting, Saptāṅga balance, and actuarial economics.
              </p>
            </div>

            {/* Level Tier Badges */}
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {[
                { lvl: 1, label: 'Level 1: Gopa Auditor' },
                { lvl: 2, label: 'Level 2: Sārthavāha Actuary' },
                { lvl: 3, label: 'Level 3: Mahāmātya' },
              ].map((t) => {
                const isActiveLvl = arenaLevel === t.lvl;
                return (
                  <span
                    key={t.lvl}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: isActiveLvl ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255,255,255,0.05)',
                      border: isActiveLvl ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                      color: isActiveLvl ? '#fef3c7' : '#78716c',
                    }}
                  >
                    {t.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Active Question Box */}
          <div
            style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '14px',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Question {activeQuizIndex + 1} of {currentQuestions.length} · Level {arenaLevel}
            </div>

            <h3 style={{ margin: '0 0 1.25rem', fontSize: '1.15rem', color: '#f8fafc', lineHeight: 1.5 }}>
              {currentQuiz.q}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
              {currentQuiz.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                let bg = 'rgba(255,255,255,0.04)';
                let border = '1px solid rgba(255,255,255,0.1)';

                if (quizSubmitted) {
                  if (idx === currentQuiz.correct) {
                    bg = 'rgba(16, 185, 129, 0.2)';
                    border = '1px solid #10b981';
                  } else if (isSelected) {
                    bg = 'rgba(239, 68, 68, 0.2)';
                    border = '1px solid #ef4444';
                  }
                } else if (isSelected) {
                  bg = 'rgba(245, 158, 11, 0.2)';
                  border = '1px solid #f59e0b';
                }

                return (
                  <button
                    key={idx}
                    disabled={quizSubmitted}
                    onClick={() => handleSelectQuizOption(idx)}
                    style={{
                      padding: '0.85rem 1.15rem',
                      borderRadius: '10px',
                      background: bg,
                      border,
                      color: '#f8fafc',
                      fontSize: '0.92rem',
                      textAlign: 'left',
                      cursor: quizSubmitted ? 'default' : 'pointer',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                    }}
                  >
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit / Next Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              {!quizSubmitted ? (
                <button
                  disabled={selectedAnswer === null}
                  onClick={handleSubmitQuiz}
                  style={{
                    background: selectedAnswer !== null ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' : '#44403c',
                    color: '#fff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuiz}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '0.65rem 1.5rem',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Next Challenge ▶
                </button>
              )}
            </div>

            {/* Explanation & Sanskrit Sutra */}
            {quizSubmitted && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  borderLeft: '4px solid #f59e0b',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#fde047', fontWeight: 700, marginBottom: '0.25rem' }}>
                  📜 Classical Arthaśāstra Rationale:
                </div>
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.55 }}>{currentQuiz.explanation}</div>
                <div style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '0.4rem', fontFamily: 'serif' }}>
                  {currentQuiz.devQuote}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* MONOGRAPH: THE QUANTITATIVE STATECRAFT OF KAUṬILYA */}
      {/* --------------------------------------------------------------------- */}
      <article
        style={{
          background: 'linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          color: '#f8fafc',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem' }}>📜</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f59e0b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Historical &amp; Mathematical Dossier
          </span>
        </div>

        <h2
          style={{
            margin: '0 0 1rem',
            fontSize: '1.65rem',
            fontWeight: 800,
            background: 'linear-gradient(90deg, #fef3c7, #fde047)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          The Quantitative Mind of Kauṭilya: Administrative Data Science in Antiquity
        </h2>

        <p style={{ fontSize: '0.92rem', color: '#d6d3d1', lineHeight: 1.65, margin: '0 0 1.25rem' }}>
          Centuries prior to European political economy and actuarial insurance matrices, Kauṭilya’s <em>Arthaśāstra</em> (4th century BCE) treated statecraft not as divine whim or dynastic pageantry, but as an empirical science of resource optimization, quantitative risk modeling, and demographic accounting.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#fde047', fontSize: '1rem' }}>1. The Gopa Census Network</h4>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              The Mauryan bureaucracy deployed <em>Gopas</em> across clusters of 5 to 20 villages to record household sizes, vocational community rosters, arable land acreage, and domestic animals. This eliminated administrative opacity, preventing local lords from underreporting agricultural output.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#fde047', fontSize: '1rem' }}>2. Actuarial Interest Rates (15% to 240%)</h4>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              Rather than enforcing flat usury caps, Kauṭilya linked interest rates directly to hazard probability: 15% annual for standard commerce, 120% for overland forest journeys, and 240% for oceanic voyages. This explicitly priced default risk and sea-borne perils into loan contracts.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h4 style={{ margin: '0 0 0.5rem', color: '#fde047', fontSize: '1rem' }}>3. Portfolio Diversification &amp; Buffer Stocks</h4>
            <p style={{ margin: 0, fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55 }}>
              To insulate private merchants from ruin, the <em>Arthaśāstra</em> commanded splitting valuable merchandise across independent carriers. For sovereign protection, state granaries maintained a 50% buffer stock ratio (<em>Durbhikṣa-pratīkāra</em>) to stabilize market food prices against droughts.
            </p>
          </div>
        </div>
      </article>

      {/* --------------------------------------------------------------------- */}
      {/* SANSKRIT TERMS & CHALLENGES LIST */}
      {/* --------------------------------------------------------------------- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <TermPanel title="Sanskrit Statecraft & Actuarial Vocabulary" terms={STATECRAFT_TERMS} />
        <ChallengeList items={STATECRAFT_CHALLENGES} />
      </div>

      <LabNextAction
        nextTitle="Chandaḥśāstra Combinatorics & Binary Metrics"
        nextCode="SEC-15"
        nextDev="पिङ्गलस्य छन्दःशास्त्रम्"
        nextIcon="🪘"
        onNextLab={onNextLab}
        message="Advance to Sector SEC-15: Piṅgala’s Binary Combinatorics, Meruprastāra & Mātrāmeru"
      />
    </div>
  );
};

export default KautilyaStatecraft;
