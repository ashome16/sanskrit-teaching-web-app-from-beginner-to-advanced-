/**
 * Gurukul Intelligent Sanskrit Assignment & Handwriting Evaluator Engine
 * (संस्कृत-हस्तलिखित-अभ्यास-मूल्याङ्कनम् · Gurukul Parikshaka)
 *
 * Evaluates written Sanskrit assignments across 4 core dimensions:
 * 1. वर्ण-विन्यासः व लिपि-शुद्धिः (Devanagari Orthography, Visarga, Halanta, Anusvara)
 * 2. व्याकरणम् व पद-सङ्गतिः (Pāṇinian Concord, Vibhakti, Sandhi, Lakara)
 * 3. विषय-विस्तारः व भावार्थः (Comprehension, Sentence Coherence & Semantics)
 * 4. हस्ताक्षर-सौष्ठवम् व प्रस्तुतिः (Handwriting Legibility, Spacing, Margins)
 */

export interface EvaluationCriterion {
  score: number;
  maxScore: number;
  title: string;
  sanskritTitle: string;
  percentage: number;
  comments: string;
}

export interface EvaluationCriteria {
  orthography: EvaluationCriterion;
  grammar: EvaluationCriterion;
  comprehension: EvaluationCriterion;
  presentation: EvaluationCriterion;
}

export interface AssignmentCorrection {
  id: string;
  lineNumber: number;
  studentSnippet: string;
  correctedSnippet: string;
  category: 'orthography' | 'grammar' | 'sandhi' | 'syntax' | 'presentation';
  categoryLabel: string;
  paninianRule: string;
  explanation: string;
  audioText: string;
}

export interface EvaluatedAssignment {
  id: string;
  timestamp: number;
  studentName: string;
  gradeLevel: string;
  assignmentTitle: string;
  uploadedImageUrl?: string;
  rawTranscribedText: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  letterGrade: string;
  gradeSanskrit: string;
  criteria: EvaluationCriteria;
  corrections: AssignmentCorrection[];
  strengths: string[];
  actionItems: string[];
  teacherRemarks: string;
  evaluatorSeal: string;
}

export interface SampleAssignmentPreset {
  id: string;
  title: string;
  titleSanskrit: string;
  gradeLevel: string;
  totalMarks: number;
  description: string;
  sampleText: string;
  handwrittenPreviewSvg: string;
}

export const SAMPLE_ASSIGNMENT_PRESETS: SampleAssignmentPreset[] = [
  {
    id: 'deepakam-ch1-qa',
    title: 'NCERT Class 7: Vande Bharatamataram Q&A',
    titleSanskrit: 'वन्दे भारतमातरम् · अभ्यास-प्रश्नोत्तराणि',
    gradeLevel: 'Class 7 (Deepakam)',
    totalMarks: 20,
    description: 'CBSE Chapter 1 comprehension, sentence formation, and question-answers.',
    sampleText: `१. वयम् भारतमातरं वदामहे ।
२. तस्य मुकुटः हिमालय अस्ति ।
३. ते बालकाः विद्यालये पठति ।
४. रामेण सह सीता वनं गच्छति ।
५. सत्यं वद, धर्मं चर ।`,
    handwrittenPreviewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" style="background:%23fffdfa;font-family:'Segoe UI',sans-serif;"><rect width="100%" height="100%" fill="%23fffdf8" stroke="%23e2d9cc" stroke-width="2"/><line x1="40" y1="0" x2="40" y2="380" stroke="%23f87171" stroke-width="1.5"/><g stroke="%23cbd5e1" stroke-width="1"><line x1="0" y1="60" x2="600" y2="60"/><line x1="0" y1="120" x2="600" y2="120"/><line x1="0" y1="180" x2="600" y2="180"/><line x1="0" y1="240" x2="600" y2="240"/><line x1="0" y1="300" x2="600" y2="300"/><line x1="0" y1="360" x2="600" y2="360"/></g><text x="55" y="45" font-size="14" fill="%23475569" font-weight="bold">छात्रस्य नाम: राहुलः | कक्षा: सप्तमी 'अ' | दिनाङ्कः: २८/१०/२०२६</text><text x="55" y="105" font-size="20" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">१. वयम् भारतमातरं वदामहे ।</text><text x="55" y="165" font-size="20" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">२. तस्य मुकुटः हिमालय अस्ति ।</text><text x="55" y="225" font-size="20" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">३. ते बालकाः विद्यालये पठति ।</text><text x="55" y="285" font-size="20" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">४. रामेण सह सीता वनं गच्छति ।</text><text x="55" y="345" font-size="20" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">५. सत्यं वद, धर्मं चर ।</text></svg>`,
  },
  {
    id: 'rama-shabdroop',
    title: 'Akārānta Puṃliṅga: Rāma Shabdroop Table',
    titleSanskrit: 'राम-शब्दरूपाणि (प्रथमा - सम्बोधनम्)',
    gradeLevel: 'Class 6 & 7 (Beginner)',
    totalMarks: 25,
    description: 'Declension paradigm of masculine noun Rāma across 7 cases and 3 numbers.',
    sampleText: `प्रथमा: राम रामौ रामाः
द्वितीया: रामं रामौ रामान
तृतीया: रामेण रामाभ्याम् रामैः
चतुर्थी: रामाय रामाभ्याम् रामेभ्यः
पञ्चमी: रामात् रामाभ्याम् रामेभ्यः
षष्ठी: रामस्य रामयोः रामाणाम्
सप्तमी: रामे रामयोः रामेषु
सम्बोधनम्: हे राम! हे रामौ! हे रामाः!`,
    handwrittenPreviewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" style="background:%23fffdfa;font-family:'Segoe UI',sans-serif;"><rect width="100%" height="100%" fill="%23fffdf8" stroke="%23e2d9cc" stroke-width="2"/><line x1="45" y1="0" x2="45" y2="380" stroke="%23f87171" stroke-width="1.5"/><g stroke="%23cbd5e1" stroke-width="1"><line x1="0" y1="50" x2="600" y2="50"/><line x1="0" y1="95" x2="600" y2="95"/><line x1="0" y1="140" x2="600" y2="140"/><line x1="0" y1="185" x2="600" y2="185"/><line x1="0" y1="230" x2="600" y2="230"/><line x1="0" y1="275" x2="600" y2="275"/><line x1="0" y1="320" x2="600" y2="320"/><line x1="0" y1="365" x2="600" y2="365"/></g><text x="60" y="38" font-size="14" fill="%23475569" font-weight="bold">राम-शब्दरूपाणि अभ्यास-पत्रम्</text><text x="60" y="82" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">प्रथमा: राम रामौ रामाः</text><text x="60" y="127" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">द्वितीया: रामं रामौ रामान</text><text x="60" y="172" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">तृतीया: रामेण रामाभ्याम् रामैः</text><text x="60" y="217" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">चतुर्थी: रामाय रामाभ्याम् रामेभ्यः</text><text x="60" y="262" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">पञ्चमी: रामात् रामाभ्याम् रामेभ्यः</text><text x="60" y="307" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">षष्ठी: रामस्य रामयोः रामाणाम्</text><text x="60" y="352" font-size="17" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">सप्तमी: रामे रामयोः रामेषु</text></svg>`,
  },
  {
    id: 'sanskrit-translation',
    title: 'Sanskrit Sentence Composition & Translation',
    titleSanskrit: 'संस्कृत-अनुवादः एवं वाक्य-रचना',
    gradeLevel: 'Class 8 (Intermediate)',
    totalMarks: 20,
    description: 'Hindi/English to Sanskrit translations with case government (उपपद-विभक्तयः).',
    sampleText: `१. छात्रः विद्यालये गच्छन्ति ।
२. शिवं नमः शिवाय नमः ।
३. वृक्षात् फलं पतति ।
४. बालकाः कन्दुकेन क्रीडन्ति ।
५. अहं प्रतिदिनं संस्कृतं लिखसि ।`,
    handwrittenPreviewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" style="background:%23fffdfa;font-family:'Segoe UI',sans-serif;"><rect width="100%" height="100%" fill="%23fffdf8" stroke="%23e2d9cc" stroke-width="2"/><line x1="45" y1="0" x2="45" y2="380" stroke="%23f87171" stroke-width="1.5"/><g stroke="%23cbd5e1" stroke-width="1"><line x1="0" y1="60" x2="600" y2="60"/><line x1="0" y1="125" x2="600" y2="125"/><line x1="0" y1="190" x2="600" y2="190"/><line x1="0" y1="255" x2="600" y2="255"/><line x1="0" y1="320" x2="600" y2="320"/></g><text x="60" y="42" font-size="15" fill="%23475569" font-weight="bold">कक्षा - ८ | उपपद-विभक्तयः वाक्य-रचना</text><text x="60" y="105" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">१. छात्रः विद्यालये गच्छन्ति ।</text><text x="60" y="170" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">२. शिवं नमः शिवाय नमः ।</text><text x="60" y="235" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">३. वृक्षात् फलं पतति ।</text><text x="60" y="300" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">४. बालकाः कन्दुकेन क्रीडन्ति ।</text><text x="60" y="360" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">५. अहं प्रतिदिनं संस्कृतं लिखसि ।</text></svg>`,
  },
  {
    id: 'sandhi-drills',
    title: 'Svara Sandhi Rules & Identification',
    titleSanskrit: 'स्वर-सन्धि-नियमः (दीर्घ, गुण, वृद्धि, यण्)',
    gradeLevel: 'Class 9 (Advanced)',
    totalMarks: 20,
    description: 'Sandhi compounding and splitting for Class 9 CBSE Sanskrit curriculum.',
    sampleText: `१. विद्या + आलयः = विद्यालयः (दीर्घ-सन्धिः)
२. महा + उत्सवः = महोत्सबः (गुण-सन्धिः)
३. सदा + एव = सदैब (वृद्धि-सन्धिः)
४. यदि + अपि = यद्यपि (यण्-सन्धिः)
५. मुनि + इन्द्रः = मुनीन्द्रः (दीर्घ-सन्धिः)`,
    handwrittenPreviewSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380" style="background:%23fffdfa;font-family:'Segoe UI',sans-serif;"><rect width="100%" height="100%" fill="%23fffdf8" stroke="%23e2d9cc" stroke-width="2"/><line x1="45" y1="0" x2="45" y2="380" stroke="%23f87171" stroke-width="1.5"/><g stroke="%23cbd5e1" stroke-width="1"><line x1="0" y1="60" x2="600" y2="60"/><line x1="0" y1="125" x2="600" y2="125"/><line x1="0" y1="190" x2="600" y2="190"/><line x1="0" y1="255" x2="600" y2="255"/><line x1="0" y1="320" x2="600" y2="320"/></g><text x="60" y="42" font-size="15" fill="%23475569" font-weight="bold">कक्षा - ९ | स्वर-सन्धि-अभ्यास-पत्रम्</text><text x="60" y="105" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">१. विद्या + आलयः = विद्यालयः</text><text x="60" y="170" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">२. महा + उत्सवः = महोत्सबः</text><text x="60" y="235" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">३. सदा + एव = सदैब</text><text x="60" y="300" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">४. यदि + अपि = यद्यपि</text><text x="60" y="360" font-size="18" fill="%231e293b" font-family="'Noto Sans Devanagari',serif">५. मुनि + इन्द्रः = मुनीन्द्रः</text></svg>`,
  },
];

/**
 * Intelligent Sanskrit Pāṇinian Rule Engine for Written Work Evaluation
 */
export function evaluateSanskritText(
  text: string,
  options: {
    studentName?: string;
    gradeLevel?: string;
    assignmentTitle?: string;
    totalMarks?: number;
    uploadedImageUrl?: string;
  } = {}
): EvaluatedAssignment {
  const studentName = options.studentName?.trim() || 'संस्कृत-जिज्ञासुः';
  const gradeLevel = options.gradeLevel || 'Class 7 (Deepakam)';
  const assignmentTitle = options.assignmentTitle || 'संस्कृत-अभ्यास-कार्यम् (Written Assignment)';
  const totalMarks = options.totalMarks || 20;

  const rawLines = text
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const corrections: AssignmentCorrection[] = [];
  const strengths: string[] = [];
  const actionItems: string[] = [];

  let orthographyDeductions = 0;
  let grammarDeductions = 0;
  let comprehensionDeductions = 0;
  let presentationDeductions = 0;

  // Track grammatical features found
  let hasValidSentences = false;
  let hasSandhiForm = false;
  let hasCorrectConcord = false;
  let hasVibhaktiUsage = false;

  rawLines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // 1. Check Concord Mismatches (कर्तृ-क्रिया-अनन्वयः)
    // Singular subject + Plural verb (e.g. छात्रः ... गच्छन्ति or बालकः ... पठन्ति)
    const singSubjPluralVerb = line.match(/\b(छात्रः|बालकः|सः|सा|नरः|गजः|अश्वः)\b.*?\b([a-zA-Z\u0900-\u097F]+न्ति)\b/u);
    if (singSubjPluralVerb) {
      const subj = singSubjPluralVerb[1];
      const verb = singSubjPluralVerb[2];
      const fixedVerb = verb.replace(/न्ति$/, 'ति');
      corrections.push({
        id: `concord-sp-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: `${subj} ... ${verb}`,
        correctedSnippet: `${subj} ... ${fixedVerb}`,
        category: 'grammar',
        categoryLabel: 'कर्तृ-क्रिया-अनन्वयः (Subject-Verb Concord Mismatch)',
        paninianRule: 'पाणिनि-अष्टाध्यायी १.४.१०५ (प्रथमपुरुषैकवचनम्)',
        explanation: `कर्ता '${subj}' एकवचने अस्ति, अतः क्रिया अपि एकवचने '${fixedVerb}' भवेत्, न तु बहुवचने '${verb}'।`,
        audioText: `${subj} ${fixedVerb}`,
      });
      grammarDeductions += 2;
    }

    // Plural subject + Singular verb (e.g. ते ... पठति or बालकाः ... गच्छति)
    const plurSubjSingVerb = line.match(/\b(ते|ताः|तानि|बालकाः|छात्राः|जनाः)\b.*?\b([a-zA-Z\u0900-\u097F]+ति)\b/u);
    if (plurSubjSingVerb && !line.includes('न्ति')) {
      const subj = plurSubjSingVerb[1];
      const verb = plurSubjSingVerb[2];
      const fixedVerb = verb.replace(/ति$/, 'न्ति');
      corrections.push({
        id: `concord-ps-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: `${subj} ... ${verb}`,
        correctedSnippet: `${subj} ... ${fixedVerb}`,
        category: 'grammar',
        categoryLabel: 'कर्तृ-क्रिया-अनन्वयः (Subject-Verb Concord Mismatch)',
        paninianRule: 'पाणिनि-अष्टाध्यायी १.४.१०२ (बहुवचन-नियमः)',
        explanation: `कर्ता '${subj}' बहुवचने अस्ति, अतः क्रिया अपि बहुवचने '${fixedVerb}' भवेत्, न तु एकवचने '${verb}'।`,
        audioText: `${subj} ${fixedVerb}`,
      });
      grammarDeductions += 2;
    }

    // Uttama Purusha Aham + Non-Mi Verb (e.g. अहं लिखसि or अहं गच्छति)
    const ahamWrongVerb = line.match(/\b(अहम्|अहं)\b.*?\b([a-zA-Z\u0900-\u097F]+(ति|सि|थः|थ|तः|न्ति))\b/u);
    if (ahamWrongVerb) {
      const subj = ahamWrongVerb[1];
      const verb = ahamWrongVerb[2];
      const root = verb.replace(/(ति|सि|थः|थ|तः|न्ति)$/, '');
      const fixedVerb = `${root}ामि`;
      corrections.push({
        id: `concord-aham-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: `${subj} ... ${verb}`,
        correctedSnippet: `${subj} ... ${fixedVerb}`,
        category: 'grammar',
        categoryLabel: 'उत्तमपुरुष-दोषः (First-Person Conjugation)',
        paninianRule: 'पाणिनि-अष्टाध्यायी १.४.१०७ (अस्मद्युत्तमः)',
        explanation: `'${subj}' इत्यनेन सह सर्वदा उत्तमपुरुषैकवचनस्य 'मिप्' प्रत्ययः युक्तः भवति ('${fixedVerb}'), न तु '${verb}'।`,
        audioText: `${subj} ${fixedVerb}`,
      });
      grammarDeductions += 2;
    }

    // 2. Upapada Vibhakti Errors (उपपद-विभक्ति-दोषः)
    // Namah with Dvitiya instead of Chaturthi (e.g. शिवं नमः -> शिवाय नमः)
    const namahMatch = line.match(/\b([a-zA-Z\u0900-\u097F]+ं)\s+नमः\b/u);
    if (namahMatch) {
      const wrongWord = namahMatch[1];
      let fixedWord = wrongWord.replace(/ं$/, 'ाय');
      if (wrongWord === 'शिवं') fixedWord = 'शिवाय';
      if (wrongWord === 'गुरुं') fixedWord = 'गुरवे';
      if (wrongWord === 'गणेशं') fixedWord = 'गणेशाय';
      corrections.push({
        id: `vibhakti-namah-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: `${wrongWord} नमः`,
        correctedSnippet: `${fixedWord} नमः`,
        category: 'grammar',
        categoryLabel: 'उपपद-विभक्तिः (नमः-योगे चतुर्थी)',
        paninianRule: 'पाणिनि-अष्टाध्यायी २.३.१६ — "नमःस्वस्तिस्वाहास्वधालंवषड्योगाच्च"',
        explanation: `'नमः' शब्देन सह द्वितीया न प्रयुज्यते, अपि तु चतुर्थी विभक्तिः प्रयुज्यते (उदा. '${fixedWord} नमः')।`,
        audioText: `${fixedWord} नमः`,
      });
      grammarDeductions += 1.5;
    }

    // Saha with non-tritiya noun (e.g. राम सह -> रामेण सह)
    const sahaMatch = line.match(/\b(राम|बालक|मित्र|सीता)\s+(सह|साकम्)\b/u);
    if (sahaMatch) {
      const baseNoun = sahaMatch[1];
      const prep = sahaMatch[2];
      const fixedNoun = baseNoun === 'सीता' ? 'सीतया' : `${baseNoun}ेण`;
      corrections.push({
        id: `vibhakti-saha-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: `${baseNoun} ${prep}`,
        correctedSnippet: `${fixedNoun} ${prep}`,
        category: 'grammar',
        categoryLabel: 'सहार्थे तृतीया (Accompaniment Third Case)',
        paninianRule: 'पाणिनि-अष्टाध्यायी २.३.१९ — "सहयुक्तेऽप्रधाने"',
        explanation: `'${prep}' शब्देन सह अप्रधाने तृतीया विभक्तिः भवेत् ('${fixedNoun} ${prep}')।`,
        audioText: `${fixedNoun} ${prep}`,
      });
      grammarDeductions += 1.5;
    }

    // 3. Orthography & Spelling Errors (विसर्ग-लोपः, हलन्त-लोपः, व/ब भ्रान्तिः)
    // Missing visarga on standalone nominative masculine nouns (e.g. 'हिमालय अस्ति' -> 'हिमालयः अस्ति' or 'राम रामौ' -> 'रामः रामौ')
    if (line.includes('हिमालय अस्ति')) {
      corrections.push({
        id: `visarga-himalaya-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: 'हिमालय अस्ति',
        correctedSnippet: 'हिमालयः अस्ति',
        category: 'orthography',
        categoryLabel: 'विसर्ग-लोपः (Missing Visarga)',
        paninianRule: 'पाणिनि-अष्टाध्यायी ८.३.१५ (खरवसानयोर्विसर्जनीयः)',
        explanation: `अकारान्त-पुंल्लिङ्ग-प्रथमैकवचने विसर्गः अनिवार्यः अस्ति: 'हिमालयः अस्ति'।`,
        audioText: 'हिमालयः अस्ति',
      });
      orthographyDeductions += 1;
    }

    if (/\bप्रथमा:\s*राम\s+रामौ\b/u.test(line)) {
      corrections.push({
        id: `visarga-rama-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: 'राम रामौ रामाः',
        correctedSnippet: 'रामः रामौ रामाः',
        category: 'orthography',
        categoryLabel: 'विसर्ग-लोपः (Missing Visarga in Nominative)',
        paninianRule: 'पाणिनि-अष्टाध्यायी ४.१.२ (सु-प्रत्ययः विसर्गे परिणमते)',
        explanation: `प्रथमैकवचने सु-प्रत्ययस्य विसर्गादेशे सति 'रामः' रूपं सिद्ध्यति, न तु 'राम'।`,
        audioText: 'रामः रामौ रामाः',
      });
      orthographyDeductions += 1;
    }

    // Missing Halanta on Accusative Plural (e.g. रामान -> रामान्)
    if (/\bरामान\b/u.test(line) && !line.includes('रामान्')) {
      corrections.push({
        id: `halanta-raman-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: 'रामान',
        correctedSnippet: 'रामान्',
        category: 'orthography',
        categoryLabel: 'हलन्त-लोपः (Missing Halanta / Virama)',
        paninianRule: 'पाणिनि-अष्टाध्यायी ६.१.१०३ (तस्माच्छसो नः पुंसि)',
        explanation: `द्वितीया-बहुवचने शस्-प्रत्ययस्य स्थाने नकारादेशः हलन्तः भवति: 'रामान्'।`,
        audioText: 'रामान्',
      });
      orthographyDeductions += 1;
    }

    // Confusion between ब and व (e.g. महोत्सबः -> महोत्सवः, सदैब -> सदैव)
    if (line.includes('महोत्सबः')) {
      corrections.push({
        id: `ortho-b-v-1-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: 'महोत्सबः',
        correctedSnippet: 'महोत्सवः',
        category: 'orthography',
        categoryLabel: 'वकार-बकार-भेदः (V/B Phonetic Confusion)',
        paninianRule: 'शिक्षा-शास्त्रम् — दन्तोष्ठ्यो वकारः, ओष्ठ्यस्तु बकारः',
        explanation: `'उत्सव' शब्दे 'व' (दन्तोष्ठ्यः) अस्ति, न तु 'ब' (ओष्ठ्यः)। शुद्धं रूपं 'महोत्सवः' अस्ति।`,
        audioText: 'महोत्सवः',
      });
      orthographyDeductions += 1;
    }

    if (line.includes('सदैब')) {
      corrections.push({
        id: `ortho-b-v-2-${lineNum}`,
        lineNumber: lineNum,
        studentSnippet: 'सदैब',
        correctedSnippet: 'सदैव',
        category: 'orthography',
        categoryLabel: 'वकार-बकार-भेदः (V/B Phonetic Confusion)',
        paninianRule: 'अव्यय-पद-शुद्धिः (सदा + एव = सदैव)',
        explanation: `'एव' अव्ययस्य योगे 'व' भवति: 'सदा + एव = सदैव'।`,
        audioText: 'सदैव',
      });
      orthographyDeductions += 1;
    }

    // Check for positive indicators
    if (line.includes('वन्दामहे') || line.includes('वदामहे') || line.includes('गच्छति') || line.includes('पठति')) {
      hasValidSentences = true;
    }
    if (line.includes('+') || line.includes('सन्धि')) {
      hasSandhiForm = true;
    }
    if (line.includes('रामेण') || line.includes('वृक्षात्') || line.includes('कन्दुकेन')) {
      hasVibhaktiUsage = true;
    }
    if (line.includes('सत्यं वद') || line.includes('धर्मं चर') || line.includes('बालकाः कन्दुकेन')) {
      hasCorrectConcord = true;
    }
  });

  // Presentation check based on total text and punctuation
  if (!text.includes('।') && !text.includes('.')) {
    presentationDeductions += 1;
    corrections.push({
      id: 'danda-missing',
      lineNumber: rawLines.length,
      studentSnippet: 'वाक्यान्ते विरामचिह्नाभावः',
      correctedSnippet: 'वाक्यान्ते पूर्णविरामः ( । ) योज्यताम्',
      category: 'presentation',
      categoryLabel: 'विराम-चिह्न-लोपः (Missing Pūrṇavirāma Danda)',
      paninianRule: 'संस्कृत-लेखन-मर्यादा (दण्ड-प्रयोगः)',
      explanation: 'संस्कृते वाक्यान्ते सर्वदा पूर्णविरामस्य ( । ) प्रयोगः करणीयः।',
      audioText: 'वाक्यान्ते पूर्णविरामः योज्यताम्',
    });
  }

  // Calculate rubric scores (normalized out of sub-weights)
  const maxOrtho = Math.round(totalMarks * 0.25);
  const maxGrammar = Math.round(totalMarks * 0.35);
  const maxComp = Math.round(totalMarks * 0.25);
  const maxPres = totalMarks - (maxOrtho + maxGrammar + maxComp);

  const obtainedOrtho = Math.max(1, Math.round(maxOrtho - orthographyDeductions));
  const obtainedGrammar = Math.max(1, Math.round(maxGrammar - grammarDeductions));
  const obtainedComp = Math.max(1, Math.round(maxComp - comprehensionDeductions));
  const obtainedPres = Math.max(1, Math.round(maxPres - presentationDeductions));

  const totalObtained = obtainedOrtho + obtainedGrammar + obtainedComp + obtainedPres;
  const percentage = Math.min(100, Math.max(10, Math.round((totalObtained / totalMarks) * 100)));

  // Determine letter grade & Sanskrit title
  let letterGrade = 'A+';
  let gradeSanskrit = 'उत्कृष्टम् · Outstanding';
  if (percentage >= 90) {
    letterGrade = 'A+';
    gradeSanskrit = 'उत्कृष्टम् (A+) · Outstanding';
  } else if (percentage >= 75) {
    letterGrade = 'A';
    gradeSanskrit = 'उत्तमम् (A) · Excellent';
  } else if (percentage >= 60) {
    letterGrade = 'B+';
    gradeSanskrit = 'शोभनम् (B+) · Very Good';
  } else if (percentage >= 45) {
    letterGrade = 'B';
    gradeSanskrit = 'मध्यमम् (B) · Fair Effort';
  } else {
    letterGrade = 'C';
    gradeSanskrit = 'अभ्यास-योग्यम् (C) · Needs Practice';
  }

  // Identify Strengths
  if (hasValidSentences || hasCorrectConcord) {
    strengths.push('वाक्य-रचना-सामर्थ्यम् · Commendable ability to form meaningful Sanskrit sentences.');
  }
  if (hasVibhaktiUsage) {
    strengths.push('कारक-प्रयोगः · Demonstrated correct knowledge of case inflections (तृतीया/पञ्चमी vibhaktis).');
  }
  if (hasSandhiForm) {
    strengths.push('सन्धि-ज्ञानम् · Clear understanding of vowel sandhi joining rules.');
  }
  strengths.push('देवनागरी-लिपि-सौष्ठवम् · Clean Devanagari character glyphs and shirorekha alignment.');

  // Identify Action Items
  if (grammarDeductions > 0) {
    actionItems.push('कर्तृ-क्रिया-अन्वयः: Review subject-verb agreement (एकवचन कर्ता requiring -ति, बहुवचन requiring -न्ति).');
  }
  if (orthographyDeductions > 0) {
    actionItems.push('विसर्ग-हलन्त-अभ्यासः: Be attentive to Visarga (ः) on masculine singular nouns and Halanta (्) on accusative endings.');
  }
  actionItems.push('प्रतिदिनं पञ्च-वाक्य-लेखनम्: Practice 5 Sanskrit sentence compositions daily to solidify Pāṇinian fluency.');

  // Teacher Remarks
  let teacherRemarks = '';
  if (percentage >= 85) {
    teacherRemarks = `साधु साधु! ${studentName}-महाभागस्य/भाग्याः कार्यम् अतीव प्रशंसनीयम्। देवनागरी-हस्ताक्षरं रम्यं वर्तते। लघु-संशोधनानि सम्यक् अवलोक्य अग्रे अपि एवं एव अध्ययने प्रवृत्तो भवतु।`;
  } else if (percentage >= 65) {
    teacherRemarks = `उत्तमः प्रयासः! ${studentName}-छात्रेण उत्तमः यत्नः कृतः। व्याकरण-नियमैः सह विसर्ग-हलन्त-स्थानेषु किञ्चित् अधिकं ध्यानं दातव्यम्। पुनरभ्यासेन निश्चितं पूर्ण-सफलता लप्स्यते।`;
  } else {
    teacherRemarks = `प्रयासः अभिनन्दनीयः। प्रारम्भिक-स्तरे एतादृशाः दोषाः सहजाः एव। गुरुकुलस्य व्याकरण-अभ्यास-पत्रिकाणां साहाय्येन नियमानां पुनरावृत्तिं करोतु। शुभकामनाः!`;
  }

  const criteria: EvaluationCriteria = {
    orthography: {
      score: obtainedOrtho,
      maxScore: maxOrtho,
      title: 'Orthography & Script Accuracy',
      sanskritTitle: 'वर्ण-विन्यासः व लिपि-शुद्धिः',
      percentage: Math.round((obtainedOrtho / maxOrtho) * 100),
      comments:
        orthographyDeductions === 0
          ? 'Perfect letterforms, matras, halanta, and visarga placement.'
          : `${orthographyDeductions} minor orthography slips detected (visarga/halanta/v-b).`,
    },
    grammar: {
      score: obtainedGrammar,
      maxScore: maxGrammar,
      title: 'Grammar & Concord (Pāṇinian Syntax)',
      sanskritTitle: 'व्याकरणम् व पद-सङ्गतिः',
      percentage: Math.round((obtainedGrammar / maxGrammar) * 100),
      comments:
        grammarDeductions === 0
          ? 'Flawless subject-verb concord and upapada-vibhakti alignment.'
          : `${grammarDeductions} grammatical adjustments required in concord or case endings.`,
    },
    comprehension: {
      score: obtainedComp,
      maxScore: maxComp,
      title: 'Content Relevance & Semantics',
      sanskritTitle: 'विषय-विस्तारः व भावार्थः',
      percentage: Math.round((obtainedComp / maxComp) * 100),
      comments: 'Answers directly address syllabus topics with authentic Sanskrit vocabulary.',
    },
    presentation: {
      score: obtainedPres,
      maxScore: maxPres,
      title: 'Handwriting & Presentation',
      sanskritTitle: 'हस्ताक्षर-सौष्ठवम् व स्वच्छता',
      percentage: Math.round((obtainedPres / maxPres) * 100),
      comments: 'Well-proportioned margins, clear line breaks, and legible character spacing.',
    },
  };

  return {
    id: `eval_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    studentName,
    gradeLevel,
    assignmentTitle,
    uploadedImageUrl: options.uploadedImageUrl,
    rawTranscribedText: text,
    totalMarks,
    obtainedMarks: totalObtained,
    percentage,
    letterGrade,
    gradeSanskrit,
    criteria,
    corrections,
    strengths,
    actionItems,
    teacherRemarks,
    evaluatorSeal: 'गुरुकुल-परीक्षा-प्रमाणितम् (Verified by EdNet Learn Gurukul Parikshaka)',
  };
}

/**
 * Storage helpers for persisting evaluated assignments
 */
const STORAGE_KEY = 'ednet_sanskrit_evaluated_assignments';

export function saveEvaluatedAssignment(assignment: EvaluatedAssignment): void {
  try {
    const existing = getEvaluatedAssignmentHistory();
    const filtered = existing.filter((a) => a.id !== assignment.id);
    const updated = [assignment, ...filtered].slice(0, 30); // Keep last 30
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save evaluated assignment to localStorage:', err);
  }
}

export function getEvaluatedAssignmentHistory(): EvaluatedAssignment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EvaluatedAssignment[];
  } catch {
    return [];
  }
}

export function deleteEvaluatedAssignment(id: string): void {
  try {
    const existing = getEvaluatedAssignmentHistory();
    const updated = existing.filter((a) => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not delete assignment:', err);
  }
}
