export interface Grade9Chapter {
  id: string;
  num: string;
  chNumber: string;
  title: string;
  hindiTitle?: string;
  englishTitle: string;
  page: string;
  category: "shlokas" | "stories" | "dialogue" | "grammar" | "preface" | "anthem";
  genreBadge: string;
  theme: string;
  grammarFocus: string;
  sampleVerse?: string;
  status: "available" | "in_curriculum" | "overview";
  icon: string;
}

export const GRADE_9_SYLLABUS: Grade9Chapter[] = [
  {
    id: "g9_purovak",
    num: "पुरोवाक्",
    chNumber: "पुरोवाक्",
    title: "पुरोवाक्",
    hindiTitle: "प्राक्कथन / प्रस्तावना",
    englishTitle: "Foreword",
    page: "Page iii",
    category: "preface",
    genreBadge: "प्राक्कथनम् · Preface",
    theme: "Curricular vision, pedagogical architecture, and national standards for Class 9 Sanskrit education under the NEP framework.",
    grammarFocus: "भाषा-शिक्षण-उद्देश्यानि",
    status: "overview",
    icon: "📜"
  },
  {
    id: "g9_bhumika",
    num: "भूमिका",
    chNumber: "भूमिका",
    title: "भूमिका",
    hindiTitle: "परिचय / भूमिका",
    englishTitle: "Introduction",
    page: "Page v",
    category: "preface",
    genreBadge: "भूमिका · Pedagogical Guide",
    theme: "Introduction to Sharda Class 9 syllabus structure, experiential Sanskrit learning methods, and communicative skill building.",
    grammarFocus: "अध्ययन-पद्धतिः सम्भाषणकौशलं च",
    status: "overview",
    icon: "📖"
  },
  {
    id: "grade9_rashtrageetam",
    num: "राष्ट्रगीतम्",
    chNumber: "राष्ट्रगीतम्",
    title: "राष्ट्रगीतम् (वन्दे मातरम्)",
    hindiTitle: "राष्ट्रगीत (वन्दे मातरम्)",
    englishTitle: "National Song (Vande Mataram)",
    page: "Page 12",
    category: "anthem",
    genreBadge: "राष्ट्रभक्तिः · National Song",
    theme: "Bankim Chandra Chattopadhyay's celebrated anthem venerating Mother India as rich with sweet waters, golden fruits, and green fields.",
    grammarFocus: "द्वितीया-विभक्तिः, विशेषण-विशेष्य-सम्बन्धः, सम्बोधनम्",
    sampleVerse: "वन्दे मातरम्, वन्दे मातरम् । सुजलां सुफलां मलयजशीतलां शस्यश्यामलां मातरम् । वन्दे मातरम् ॥",
    status: "available",
    icon: "🇮🇳"
  },
  {
    id: "grade9_prarthana",
    num: "सरस्वतीप्रार्थना",
    chNumber: "मङ्गलाचरणम्",
    title: "सरस्वतीप्रार्थना (शारदा-वन्दना)",
    hindiTitle: "सरस्वती प्रार्थना (शारदा वन्दना)",
    englishTitle: "Prayer to Goddess Saraswati (Sharada Vandana)",
    page: "Page xviii (Page 18)",
    category: "shlokas",
    genreBadge: "मङ्गलाचरणम् · Sacred Invocation",
    theme: "Majestic classical Shardulavikridita hymn meditating on Goddess Sharada holding the book of wisdom, rosary, pot of nectar, and the divine vina.",
    grammarFocus: "शार्दूलविक्रीडित-छन्दः, द्वितीया-विभक्तिः, बहुव्रीहि-समासः",
    sampleVerse: "शुभ्रां स्वच्छविलेपमाल्यवसनां शीतांशुखण्डोज्ज्वलाम् व्याख्यामक्षगुणं सुधाढ्यकलशं विद्यां च हस्ताम्बुजैः ।",
    status: "available",
    icon: "🪕"
  },
  {
    id: "grade9_ch1",
    num: "Chapter 1",
    chNumber: "प्रथमः पाठः",
    title: "१. प्रथमः पाठः : सत्यं शिवं सुन्दरं संस्कृतम्",
    hindiTitle: "सत्य, शिव और सुंदर संस्कृत",
    englishTitle: "Sanskrit is Truth, Auspiciousness, and Beauty",
    page: "Pages 1–8",
    category: "shlokas",
    genreBadge: "भाषा-माहात्म्यम् · Cultural Heritage",
    theme: "Celebration of the timeless beauty, scientific precision, phonetic elegance, and ethical richness of the Sanskrit language.",
    grammarFocus: "विशेषण-विशेष्य-प्रयोगः, प्रथम-विभक्तिः, सन्धि-परिचयः",
    status: "available",
    icon: "🌸"
  },
  {
    id: "grade9_ch2",
    num: "Chapter 2",
    chNumber: "द्वितीयः पाठः",
    title: "२. द्वितीयः पाठः : सुखस्य मूलं धर्मः धर्मस्य मूलम् अर्थः",
    hindiTitle: "सुख का मूल धर्म है, धर्म का मूल अर्थ है",
    englishTitle: "Righteousness is the Root of Happiness; Wealth is the Root of Righteousness",
    page: "Pages 9–21",
    category: "stories",
    genreBadge: "नीतिशास्त्रम् · Chanakya Niti / Arthashastra",
    theme: "Classical aphorisms on governance, personal conduct, the balance of Dharma, Artha, and Kama, and moral economics.",
    grammarFocus: "षष्ठी-विभक्तिः (सम्बन्धः), कृदन्त-प्रत्ययाः, वाक्य-रचना",
    status: "available",
    icon: "⚖️"
  },
  {
    id: "grade9_ch3",
    num: "Chapter 3",
    chNumber: "तृतीयः पाठः",
    title: "३. तृतीयः पाठः : आत्मवत्सर्वभूतेषु यः पश्यति सः पण्डितः",
    hindiTitle: "जो सभी प्राणियों को अपने समान देखता है, वही विद्वान है",
    englishTitle: "He Who Sees All Living Beings as Himself is Wise",
    page: "Pages 22–37",
    category: "shlokas",
    genreBadge: "सदाचारः · Universal Empathy & Wisdom",
    theme: "Universal compassion, non-harming (Ahimsa), equanimity, and viewing every sentient being with the warmth of one's own self.",
    grammarFocus: "यत्-तत् सर्वनाम-प्रयोगः, प्रथमा-द्वितीया विभक्तिः, उपपद-विभक्तयः",
    status: "available",
    icon: "👁️"
  },
  {
    id: "grade9_ch4",
    num: "Chapter 4",
    chNumber: "चतुर्थः पाठः",
    title: "४. चतुर्थः पाठः : न खलु वयस्तेजसो हेतुः",
    hindiTitle: "आयु निश्चित रूप से योग्यता (तेज) का कारण नहीं होती",
    englishTitle: "Age is Truly Not the Measure of Brilliance",
    page: "Pages 38–50",
    category: "dialogue",
    genreBadge: "नाट्यांशः · Classical Sanskrit Drama",
    theme: "Dramatic excerpts demonstrating that wisdom, courage, and inner brilliance transcend physical age and youth.",
    grammarFocus: "अव्यय-पदानि (खलु, न, अपि, एव), लट् एवं लङ् लकारः",
    status: "available",
    icon: "⚡"
  },
  {
    id: "grade9_ch5",
    num: "Chapter 5",
    chNumber: "पञ्चमः पाठः",
    title: "५. पञ्चमः पाठः : एषा सा कृतकबुद्धिः मानवबुद्धेः सहकरी",
    hindiTitle: "यह कृत्रिम बुद्धि (AI) है, जो मानव बुद्धि की सहायक है",
    englishTitle: "This is Artificial Intelligence, the Helper of Human Intellect",
    page: "Pages 51–66",
    category: "dialogue",
    genreBadge: "आधुनिक-संस्कृतम् · Technology & AI",
    theme: "Cutting-edge modern Sanskrit prose examining Artificial Intelligence (Kritaka-Buddhi), machine learning, natural language processing, and ethical AI assistance.",
    grammarFocus: "नूतन-पारिभाषिक-शब्दावली, षष्ठी-सप्तमी विभक्तयः, सन्धयः",
    status: "available",
    icon: "🤖"
  },
  {
    id: "grade9_ch6",
    num: "Chapter 6",
    chNumber: "षष्ठः पाठः",
    title: "६. षष्ठः पाठः : मनःपूतं समाचरेत्",
    hindiTitle: "मन से पवित्र आचरण करना चाहिए",
    englishTitle: "One Should Act as Guided by a Pure Conscience",
    page: "Pages 67–78",
    category: "shlokas",
    genreBadge: "नीति-सुभाषितानि · Moral Ethics",
    theme: "Purification of action through a clear, stainless mind and conscience; moral integrity according to timeless Subhashitas.",
    grammarFocus: "विधिलिङ्-लकारः (Potential/Optative Mood), क्त-प्रत्ययः",
    status: "available",
    icon: "🧘"
  },
  {
    id: "grade9_ch7",
    num: "Chapter 7",
    chNumber: "सप्तमः पाठः",
    title: "७. सप्तमः पाठः : उपायं चिन्तयेत् प्राज्ञस्तथापायं च चिन्तयेत्",
    hindiTitle: "बुद्धिमान व्यक्ति को उपाय के साथ-साथ आने वाले संकट का भी विचार करना चाहिए",
    englishTitle: "A Wise Person Should Think of the Remedy as Well as the Danger",
    page: "Pages 79–91",
    category: "stories",
    genreBadge: "पञ्चतन्त्र-कथा · Prudence & Foresight",
    theme: "Strategic prudence from the Panchatantra illustrating that planning must calculate collateral dangers and risks alongside benefits.",
    grammarFocus: "विधिलिङ्-लकारः, विसर्ग-सन्धिः, ल्यप् एवं तुमुन् प्रत्ययाः",
    status: "available",
    icon: "💡"
  },
  {
    id: "grade9_ch8",
    num: "Chapter 8",
    chNumber: "अष्टमः पाठः",
    title: "८. अष्टमः पाठः : अन्नाद् आनन्दं प्रति",
    hindiTitle: "अन्न से आनंद की ओर",
    englishTitle: "From Food Towards Bliss",
    page: "Pages 92–111",
    category: "stories",
    genreBadge: "उपनिषद्-दर्शनम् · Taittiriya Upanishad",
    theme: "Taittiriya philosophical trajectory from Annamaya-kosha (food body) to Anandamaya-kosha (blissful self); reverence for organic food and nutrition.",
    grammarFocus: "पञ्चमी-विभक्तिः (अन्नात्), प्रति-योगे द्वितीया, उपपद-विभक्तयः",
    status: "available",
    icon: "🌾"
  },
  {
    id: "grade9_ch9",
    num: "Chapter 9",
    chNumber: "नवमः पाठः",
    title: "९. नवमः पाठः : कृतं प्रतिकृतं भूयादेष धर्मः सनातनः",
    hindiTitle: "उपकार का बदला उपकार से और अपकार का अपकार से होना चाहिए, यही सनातन नियम है",
    englishTitle: "Action Should be Met with Counter-Action, This is the Eternal Law",
    page: "Pages 112–126",
    category: "stories",
    genreBadge: "महाभारत-कथा / नीतिः · Reciprocity & Justice",
    theme: "Reciprocity, justice, upholding commitments, and answering benevolence with gratitude as an eternal ethical pillar.",
    grammarFocus: "आशीर्लिङ्/विधिलिङ् (भूयात्), कृदन्त-रूपाणि (कृतम्, प्रतिकृतम्)",
    status: "available",
    icon: "🔄"
  },
  {
    id: "grade9_ch10",
    num: "Chapter 10",
    chNumber: "दशमः पाठः",
    title: "१०. दशमः पाठः : णमो अरिहन्ताणम्",
    hindiTitle: "अरिहंतों को नमस्कार",
    englishTitle: "Salutations to the Arihantas (Enlightened Souls)",
    page: "Pages 127–144",
    category: "shlokas",
    genreBadge: "प्राकृत-संस्कृत-समन्वयः · Prakrit Heritage & Jain Philosophy",
    theme: "The sacred Namokar Mahamantra celebrating universal virtues of enlightened teachers, conquerors of inner vices, and spiritual guides.",
    grammarFocus: "प्राकृत-भाषा-परिचयः, नमः-योगे चतुर्थी विभक्तिः, पद-तुलना",
    status: "available",
    icon: "🙏"
  },
  {
    id: "grade9_ch11",
    num: "Chapter 11",
    chNumber: "एकादशः पाठः",
    title: "११. एकादशः पाठः : वर्णोच्चारण-शिक्षा २",
    hindiTitle: "वर्णों के उच्चारण की शिक्षा २",
    englishTitle: "Phonetics / Education of Articulation 2",
    page: "Pages 145–160",
    category: "grammar",
    genreBadge: "व्याकरणम् · Paninian Phonetics & Shiksha",
    theme: "Comprehensive scientific study of Sanskrit phonetics: places of articulation (उच्चारण-स्थानानि) and internal/external phonetic efforts (प्रयत्नाः).",
    grammarFocus: "उच्चारण-स्थानानि (कण्ठ, तालु, मूर्धा, दन्त, ओष्ठ), आभ्यन्तर-बाह्य-प्रयत्नाः",
    status: "available",
    icon: "🗣️"
  },
  {
    id: "grade9_ch12",
    num: "Chapter 12",
    chNumber: "द्वादशः पाठः",
    title: "१२. द्वादशः पाठः : अन्वय-शिक्षा (दण्डान्वयः खण्डान्वयश्च)",
    hindiTitle: "अन्वय-शिक्षा : दण्डान्वय एवं खण्डान्वय विधि",
    englishTitle: "The Science and Art of Anvaya (Poetic Prose Reordering)",
    page: "Pages 161–176",
    category: "grammar",
    genreBadge: "व्याकरणम् · Poetic Syntax & Hermeneutics",
    theme: "Systematic methodologies of poetic prose construction in Sanskrit: Dandanvaya, Khandanvaya, and the four auxiliary sentence comprehension factors (आकाङ्क्षा, योग्यता, आसत्तिः, तात्पर्यम्).",
    grammarFocus: "अन्वय-रचना, विशेषण-विशेष्य-सम्बन्धः, आकाङ्क्षा-योग्यता-आसत्ति-तात्पर्यम्, कृदन्तरूपाणि",
    status: "available",
    icon: "📜"
  }
];
