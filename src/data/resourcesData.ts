export type ResourceCategory = 'all' | 'news' | 'events' | 'competitions' | 'study_materials';

export type LiveStatus = 'live' | 'upcoming' | 'open' | 'new' | 'featured';

export interface ResourceItem {
  id: string;
  title: string;
  titleSa: string;
  category: 'news' | 'events' | 'competitions' | 'study_materials';
  date: string;
  timestamp: string;
  status: LiveStatus;
  statusLabel: string;
  mode: string;
  organizer: string;
  summary: string;
  highlights: string[];
  actionLabel: string;
  actionType: 'external' | 'download' | 'modal' | 'calendar';
  actionLink?: string;
  downloadFilename?: string;
  isBreaking?: boolean;
}

export interface QuickDownloadResource {
  id: string;
  title: string;
  titleSa: string;
  category: string;
  format: string;
  fileSize: string;
  description: string;
  downloadFilename: string;
  icon: string;
  tag: string;
}

export const LIVE_TICKER_ITEMS: string[] = [
  '🏆 National Sanskrit Olympiad 2026: Free registrations now open for Classes 6–10 school students!',
  '📢 CBSE Circular: Class 7 & 8 Sanskrit Deepakam formative assessment guidelines released.',
  '🗓️ Live Webinar: Master 16 Vedic Mathematics Sutras with Acharya on Sunday at 10:00 AM IST.',
  '📥 New Download: Complete 100 Essential Shabdroop & Dhaturoop Cheat Sheet (PDF) now available.',
  '⚡ Pan-India Shloka Recitation Competition 2026 announced with cash prizes & CSU certification.',
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: 'national-sanskrit-olympiad-2026',
    title: 'National Sanskrit Olympiad 2026 (Classes 6–10)',
    titleSa: 'अखिल-भारतीय-संस्कृत-ओलम्पियाड-स्पर्धा २०२६',
    category: 'competitions',
    date: 'Oct 18, 2026',
    timestamp: '2026-10-18T09:00:00+05:30',
    status: 'open',
    statusLabel: '🏆 Registration Open',
    mode: 'Online Pan-India Exam',
    organizer: 'Central Sanskrit University & EdNet Learn',
    summary:
      'The prestigious nationwide Sanskrit Olympiad for school students covering CBSE NCERT syllabus, shabdroop, sandhi, comprehension, and vocabulary. Over 15,000 students participating from 800+ schools.',
    highlights: [
      'Preliminary round conducted completely online from home or school computer lab.',
      'Syllabus strictly mapped to CBSE NCERT Deepakam & Ruchira (Classes 6, 7, 8).',
      'Merit certificates, medals, and Gurukul scholarships for Top 100 rankers.',
      'Free practice quiz sets and sample question papers provided upon sign-up.',
    ],
    actionLabel: 'Register for Olympiad',
    actionType: 'modal',
    isBreaking: true,
  },
  {
    id: 'live-shloka-masterclass-sunday',
    title: 'Weekly Live Shloka Chanting & Mouth Gym Masterclass',
    titleSa: 'साप्ताहिक-श्लोकोच्चारणं मुख-व्यायाम-शाला च',
    category: 'events',
    date: 'Every Sunday · 10:00 AM IST',
    timestamp: '2026-09-27T10:00:00+05:30',
    status: 'live',
    statusLabel: '🔴 Weekly Live Series',
    mode: 'Interactive Live Zoom Session',
    organizer: 'EdNet Learn Gurukul Acharyas',
    summary:
      'Join our master instructors and mascot Bodhi for a live, interactive vocal recitation session. Learn pure Devanagari pronunciation, Vedic accents (Udātta, Anudātta, Svarita), and Shiva Sutra vocal gymnastics.',
    highlights: [
      'Live interactive video practice with real-time teacher feedback.',
      'Step-by-step recitation of Bhagavad Gita Chapter 2 & 12 verses.',
      'Kids learn anatomical mouth placement (कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ).',
      'Open to all registered EdNet Learn students and parents.',
    ],
    actionLabel: 'Join Live Zoom Session',
    actionType: 'modal',
  },
  {
    id: 'cbse-deepakam-exam-pattern-circular',
    title: 'CBSE Official Guidance: Class 7 & 8 Sanskrit Evaluation Pattern',
    titleSa: 'सीबीएसई-परिपत्रम् — सप्तम-अष्टम-कक्षायाः संस्कृत-मूल्याङ्कन-विधिः',
    category: 'news',
    date: 'Sep 22, 2026',
    timestamp: '2026-09-22T14:30:00+05:30',
    status: 'new',
    statusLabel: '⚡ Official CBSE Circular',
    mode: 'Academic Notice',
    organizer: 'Central Board of Secondary Education (CBSE)',
    summary:
      'CBSE has released updated assessment directives emphasizing experiential learning, reading comprehension, and communicative translation under NEP 2020. Rote memorization weighting has been reduced.',
    highlights: [
      'Section A (अपठित-अवबोधनम्): Increased emphasis on unseen context passage interpretation.',
      'Section B (रचनात्मक-कार्यम्): Picture composition and dialogue completion given higher marks.',
      'Section C (अनुप्रयुक्त-व्याकरणम्): Applied grammar questions focused on sentence context.',
      'Section D (पठित-अवबोधनम्): Deepakam textbook verse translation and anvaya questions.',
    ],
    actionLabel: 'Read Full CBSE Guidelines',
    actionType: 'modal',
    isBreaking: true,
  },
  {
    id: 'vedic-maths-speed-championship',
    title: 'All-India Vedic Maths Speed Calculation Championship',
    titleSa: 'अखिल-भारतीय-वैदिकगणित-द्रुतगणना-प्रतियोगिता',
    category: 'competitions',
    date: 'Nov 08, 2026',
    timestamp: '2026-11-08T11:00:00+05:30',
    status: 'upcoming',
    statusLabel: '🗓️ Upcoming Championship',
    mode: 'Live Digital Speed Arena',
    organizer: 'National Vedic Mathematics Forum & EdNet',
    summary:
      'Test your mental agility in rapid arithmetic, squaring, cross-multiplication, and division using ancient Vedic mathematics sutras (एकाधिकेन पूर्वेण, निखिलं नवतश्चरमं दशतः).',
    highlights: [
      'Age categories: Junior (Classes 5–7) and Senior (Classes 8–10).',
      '30 mental arithmetic challenges to be solved in under 15 minutes.',
      'Instant AI-powered speed scoring and leaderboard generation.',
      'National trophies, certificates, and exciting STEM rewards for winners.',
    ],
    actionLabel: 'Enter Competition Arena',
    actionType: 'modal',
  },
  {
    id: 'bharatiya-bhasha-utsav-2026',
    title: 'Bharatiya Bhasha Utsav: Inter-School Sanskrit Drama & Antakshari',
    titleSa: 'भारतीय-भाषा-उत्सवः — संस्कृत-नाट्यं श्लोकान्त्याक्षरी च',
    category: 'events',
    date: 'Dec 11, 2026',
    timestamp: '2026-12-11T10:00:00+05:30',
    status: 'upcoming',
    statusLabel: '🗓️ National Festival',
    mode: 'Hybrid (Online Video + Regional Centers)',
    organizer: 'Ministry of Education & Shiksha Sanskriti',
    summary:
      'Celebrating the annual national festival honoring classical Indian tongues. School teams present Sanskrit mini-skits, humorous dialogues, Subhashita recitation, and traditional Shloka Antakshari.',
    highlights: [
      'Schools may submit 5-minute video recordings of student Sanskrit plays.',
      'Live Antakshari knockout rounds broadcasted online.',
      'Encourages conversational Sanskrit (सरल-संस्कृत-सम्भाषणम्) among school youth.',
      'Special commendation awards for creative costumes and pronunciation purity.',
    ],
    actionLabel: 'Submit School Entry',
    actionType: 'modal',
  },
  {
    id: 'cbse-mock-drills-and-doubt-clinic',
    title: 'Pre-Term CBSE Sanskrit Simulated Mock Exam & Live Doubt Clinic',
    titleSa: 'सीबीएसई-सत्रपूर्व-परीक्षार्थम् अभ्यास-परीक्षा संशय-निवारणं च',
    category: 'events',
    date: 'Nov 22, 2026 · 04:00 PM IST',
    timestamp: '2026-11-22T16:00:00+05:30',
    status: 'upcoming',
    statusLabel: '🗓️ Live Exam Prep',
    mode: 'Online Interactive Session',
    organizer: 'EdNet Learn Academic Council',
    summary:
      'An intensive 2-hour pre-exam preparatory session. Students take a timed 80-mark CBSE blueprint mock paper followed by an item-by-item walkthrough by senior Sanskrit examiners.',
    highlights: [
      'Learn how to crack the tricky "Kim-Family" question words (कस्य, कस्मै, कस्मात्).',
      'Avoid common student errors in Sandhi splitting and Vibhakti declension tables.',
      'Master sentence translation tricks from English/Hindi to Sanskrit without losing marks.',
      'Comprehensive downloadable PDF marking scheme provided to all attendees.',
    ],
    actionLabel: 'Book Free Seat',
    actionType: 'modal',
  },
  {
    id: 'nep-2020-experiential-sanskrit-launch',
    title: 'Ministry of Education Launches Digital Sanskrit Repository Portal',
    titleSa: 'शिक्षामन्त्रालयेन डिजिटल-संस्कृत-कोश-जालपुटस्य विमोचनम्',
    category: 'news',
    date: 'Sep 15, 2026',
    timestamp: '2026-09-15T12:00:00+05:30',
    status: 'new',
    statusLabel: '📢 National Announcement',
    mode: 'Education News',
    organizer: 'Department of Higher & School Education',
    summary:
      'A new open-access portal hosting digitized Sanskrit manuscripts, child-friendly audio storybooks, and Pāṇinian grammar engines has been made available to all CBSE schools across India.',
    highlights: [
      'Over 5,000 illustrated children stories in simple Sanskrit with spoken audio.',
      'Interactive dictionary linking verbal roots (धातु) to modern Indian languages.',
      'Full integration with DIKSHA and CBSE teacher training workshops.',
      'EdNet Learn featured among recommended gamified pedagogical platforms.',
    ],
    actionLabel: 'Read Press Release',
    actionType: 'modal',
  },
  {
    id: 'free-class7-question-bank-pdf',
    title: 'CBSE Class 7 Sanskrit Deepakam: Master 100-Question Bank & Solutions',
    titleSa: 'सप्तम-कक्षायाः दीपकम-पाठ्यपुस्तकस्य प्रश्नकोशः उत्तराणि च',
    category: 'study_materials',
    date: 'Updated Sep 2026',
    timestamp: '2026-09-24T08:00:00+05:30',
    status: 'featured',
    statusLabel: '📥 Free PDF Resource',
    mode: 'Printable Academic PDF',
    organizer: 'EdNet Learn Curriculum Cell',
    summary:
      'A curated 45-page study booklet covering all 15 chapters of NCERT Deepakam. Includes verse-by-verse word meanings, Sandhi breakdowns, shabdroop fill-in-the-blanks, and model exam papers.',
    highlights: [
      'Complete question bank with accurate grammatical explanations.',
      'Ideal for end-of-term revision and classroom worksheet printing.',
      'Includes Anvaya practice for all shlokas in Chapters 1, 4, 7, 10, and 14.',
      'Instant download in crisp, printable vector PDF format.',
    ],
    actionLabel: 'Download Question Bank (PDF)',
    actionType: 'download',
    downloadFilename: 'CBSE_Class7_Sanskrit_Deepakam_Master_Question_Bank.pdf',
  },
  {
    id: 'shabdroop-dhaturoop-cheat-sheet',
    title: 'The 100 Most Frequent Shabdroop & Dhaturoop Cheat Sheet',
    titleSa: 'शत-प्रमुखाणां शब्दरूपाणां धातुरूपाणां च सूत्र-सारणी',
    category: 'study_materials',
    date: 'Updated Sep 2026',
    timestamp: '2026-09-23T10:00:00+05:30',
    status: 'featured',
    statusLabel: '📥 High-Yield Guide',
    mode: 'Laminated Formula Chart (PDF)',
    organizer: 'EdNet Learn Gurukul Faculty',
    summary:
      'Never get confused between Bālaka, Latā, Phala, Muni, and Asmad/Yushmad again! High-yield color-coded chart consolidating all essential masculine, feminine, neuter, and pronoun declensions plus 5 Lakāras.',
    highlights: [
      'Color-coded Vibhakti markers identifying identical dual and plural forms.',
      'Quick reference rules for identifying लट् (Present), लृट् (Future), and लङ् (Past) verbs.',
      'Includes Pāṇini’s 21 Sup-pratyaya suffixes and 18 Tiṅ-pratyaya verb markers.',
      'Designed to be printed as a double-sided desktop study mat.',
    ],
    actionLabel: 'Download Cheat Sheet (PDF)',
    actionType: 'download',
    downloadFilename: 'Sanskrit_Shabdroop_Dhaturoop_Master_Cheat_Sheet.pdf',
  },
  {
    id: 'vedic-maths-16-sutras-wall-poster',
    title: '16 Vedic Mathematics Sūtras & Sub-Sūtras Wall Reference Poster',
    titleSa: 'षोडश-वैदिक-गणित-सूत्राणां भित्ति-पत्रम्',
    category: 'study_materials',
    date: 'Updated Sep 2026',
    timestamp: '2026-09-20T11:00:00+05:30',
    status: 'featured',
    statusLabel: '📥 Wall Poster PDF',
    mode: 'Hi-Res Printable Poster',
    organizer: 'Vedic Maths Academy & EdNet',
    summary:
      'Beautiful printable wall reference poster depicting all 16 foundational sutras with Sanskrit aphorisms, English translations, and visual calculation examples for lightning-fast mental math.',
    highlights: [
      'Features Ekādhikena Pūrveṇa, Ūrdhva Tiryagbhyām, and Yāvadūnam with diagrams.',
      'Suitable for hanging in children study rooms and school mathematics laboratories.',
      'Includes historical commentary by Swami Bharati Krishna Tirtha.',
      'High-resolution PDF ready for A3/A4 color printing.',
    ],
    actionLabel: 'Download Wall Poster (PDF)',
    actionType: 'download',
    downloadFilename: '16_Vedic_Maths_Sutras_Wall_Reference_Poster.pdf',
  },
];

export const QUICK_DOWNLOAD_RESOURCES: QuickDownloadResource[] = [
  {
    id: 'qd-deepakam-ch-bank',
    title: 'NCERT Deepakam Class 7 Question Bank',
    titleSa: 'दीपकम-प्रश्नकोशः (कक्षा ७)',
    category: 'CBSE Syllabus',
    format: 'PDF',
    fileSize: '3.4 MB',
    description: 'Comprehensive 15-chapter master question bank with verse anvaya, word meanings, and answers.',
    downloadFilename: 'CBSE_Class7_Sanskrit_Deepakam_Master_Question_Bank.pdf',
    icon: '📘',
    tag: 'CBSE Board Prep',
  },
  {
    id: 'qd-shabdroop-dhaturoop',
    title: 'Top 100 Shabdroop & Dhaturoop Cheat Sheet',
    titleSa: 'शब्दरूप-धातुरूप-सारणी',
    category: 'Grammar Essentials',
    format: 'PDF',
    fileSize: '1.8 MB',
    description: 'Color-coded declension paradigms (बालक, लता, फल, मुनि, नदी, अस्मद्) & 5 CBSE Lakāras.',
    downloadFilename: 'Sanskrit_Shabdroop_Dhaturoop_Master_Cheat_Sheet.pdf',
    icon: '📊',
    tag: 'High-Yield Revision',
  },
  {
    id: 'qd-vedic-maths-sutras',
    title: '16 Vedic Mathematics Sūtras Poster',
    titleSa: 'षोडश-वैदिक-गणित-सूत्राणि',
    category: 'Mental Math',
    format: 'PDF',
    fileSize: '2.6 MB',
    description: 'Visual step-by-step calculation formulas for rapid squaring, multiplication, and mental arithmetic.',
    downloadFilename: '16_Vedic_Maths_Sutras_Wall_Reference_Poster.pdf',
    icon: '⚡',
    tag: 'Speed Arithmetic',
  },
  {
    id: 'qd-shiva-sutras-map',
    title: 'Shiva Sutras & Mouth Articulation Map',
    titleSa: 'माहेश्वर-सूत्राणि मुख-स्थान-चित्रम्',
    category: 'Phonetics & IPA',
    format: 'PDF',
    fileSize: '2.1 MB',
    description: 'Anatomical throat-to-lips vocal diagram and Pāṇinian pratyāhāra reference matrix.',
    downloadFilename: 'Paninian_Shiva_Sutras_Phonetic_Mouth_Map.pdf',
    icon: '🧩',
    tag: 'Pāṇinian Acoustics',
  },
];
