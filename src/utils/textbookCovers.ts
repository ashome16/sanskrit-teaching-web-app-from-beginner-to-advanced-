/**
 * NCERT Sanskrit Textbook Metadata & Official Cover References
 * Class 7: दीपकम् (Deepakam)
 * Class 8: दीपकम् (Deepakam)
 * Class 9: शारदा (Sharada)
 */

export interface NcertTextbook {
  id: 'class7' | 'class8' | 'class9';
  gradeNumber: number;
  coverUrl: string;
  titleSa: string;
  titleEn: string;
  classSa: string;
  classEn: string;
  subtitle: string;
  firstLessonId: string;
  totalLessons: string;
  pageSpan: string;
  alt: string;
  badgeColor: string;
}

export const NCERT_TEXTBOOKS: readonly NcertTextbook[] = [
  {
    id: 'class7',
    gradeNumber: 7,
    coverUrl: '/textbooks/ncert-deepakam-class7.webp',
    titleSa: 'दीपकम्',
    titleEn: 'Deepakam',
    classSa: 'सप्तमकक्षा',
    classEn: 'Class 7',
    subtitle: 'सप्तमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
    firstLessonId: 'gsde101',
    totalLessons: '15 Lessons & Appendices',
    pageSpan: 'Pages 1–150',
    alt: 'NCERT Deepakam Class 7 Sanskrit Textbook Cover',
    badgeColor: '#059669',
  },
  {
    id: 'class8',
    gradeNumber: 8,
    coverUrl: '/textbooks/ncert-deepakam-class8.jpg',
    titleSa: 'दीपकम्',
    titleEn: 'Deepakam',
    classSa: 'अष्टमकक्षा',
    classEn: 'Class 8',
    subtitle: 'अष्टमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
    firstLessonId: 'grade8_prarthana',
    totalLessons: '13 Chapters & Invocations',
    pageSpan: 'Pages iii–173',
    alt: 'NCERT Deepakam Class 8 Sanskrit Textbook Cover',
    badgeColor: '#b45309',
  },
  {
    id: 'class9',
    gradeNumber: 9,
    coverUrl: '/textbooks/ncert-sharada-class9.jpg',
    titleSa: 'शारदा',
    titleEn: 'Sharada',
    classSa: 'नवमकक्षा',
    classEn: 'Class 9',
    subtitle: 'नवमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
    firstLessonId: 'grade9_prarthana',
    totalLessons: '12 Chapters & Grammar',
    pageSpan: 'Pages 1–244',
    alt: 'NCERT Sharada Class 9 Sanskrit Textbook Cover',
    badgeColor: '#7c3aed',
  },
] as const;

export interface LessonTextbookMeta {
  coverUrl: string;
  bookTitleSa: string;
  bookTitleEn: string;
  gradeLabel: string;
  gradeBadge: string;
  tagline: string;
  alt: string;
  gradeNumber: number;
}

export function getTextbookMetaForLesson(lessonId: string): LessonTextbookMeta {
  if (lessonId.startsWith('grade9_')) {
    return {
      coverUrl: '/textbooks/ncert-sharada-class9.jpg',
      bookTitleSa: 'शारदा',
      bookTitleEn: 'NCERT Sharada 9',
      gradeLabel: 'Class 9 · नवमकक्षा',
      gradeBadge: 'शारदा ९',
      tagline: 'नवमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
      alt: 'NCERT Sharada Class 9 Sanskrit Textbook Cover',
      gradeNumber: 9,
    };
  }
  if (lessonId.startsWith('grade8_')) {
    return {
      coverUrl: '/textbooks/ncert-deepakam-class8.jpg',
      bookTitleSa: 'दीपकम्',
      bookTitleEn: 'NCERT Deepakam 8',
      gradeLabel: 'Class 8 · अष्टमकक्षा',
      gradeBadge: 'दीपकम् ८',
      tagline: 'अष्टमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
      alt: 'NCERT Deepakam Class 8 Sanskrit Textbook Cover',
      gradeNumber: 8,
    };
  }
  // Default to Class 7 Deepakam for all gsde101-115 and foundational lessons
  return {
    coverUrl: '/textbooks/ncert-deepakam-class7.webp',
    bookTitleSa: 'दीपकम्',
    bookTitleEn: 'NCERT Deepakam 7',
    gradeLabel: 'Class 7 · सप्तमकक्षा',
    gradeBadge: 'दीपकम् ७',
    tagline: 'सप्तमकक्षायाः संस्कृत-पाठ्यपुस्तकम् (CBSE / NEP)',
    alt: 'NCERT Deepakam Class 7 Sanskrit Textbook Cover',
    gradeNumber: 7,
  };
}

export function getTextbookMetaForGrade(grade: number | string): LessonTextbookMeta {
  const g = typeof grade === 'string' ? parseInt(grade, 10) : grade;
  if (g === 9) return getTextbookMetaForLesson('grade9_');
  if (g === 8) return getTextbookMetaForLesson('grade8_');
  return getTextbookMetaForLesson('gsde101');
}
