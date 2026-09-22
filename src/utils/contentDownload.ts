import type { Worksheet } from '../data/worksheetData';
import type { QuizQuestionItem } from '../data/quizData';

/** Escape text for safe insertion into downloaded HTML. */
export function escapeHtml(text: string): string {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097f]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'ednet-download';
}

/** Trigger a browser file download from a string Blob. */
export function downloadBlob(filename: string, content: string, mime = 'text/html;charset=utf-8'): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const PRINT_CSS = `
  body { font-family: 'Noto Sans Devanagari', Georgia, 'Times New Roman', serif; color: #111827; margin: 1.5rem; line-height: 1.5; }
  h1 { font-size: 1.35rem; margin: 0 0 0.35rem; color: #2b2118; }
  h2 { font-size: 1.05rem; margin: 1.25rem 0 0.5rem; color: #7f231c; border-bottom: 1px solid #ebdcc5; padding-bottom: 0.25rem; }
  .meta { font-size: 0.9rem; color: #4b5563; margin-bottom: 1rem; }
  .brand { font-weight: 800; color: #b3472f; margin-bottom: 0.25rem; }
  .q { margin: 0.75rem 0; padding: 0.55rem 0; border-bottom: 1px dotted #d1d5db; }
  .q-num { font-weight: 800; }
  .opts { margin: 0.35rem 0 0.35rem 1.25rem; }
  .blank { min-height: 1.4rem; border-bottom: 1px dotted #9ca3af; margin-top: 0.35rem; }
  .answer { background: #f0fdf4; border: 1px solid #86efac; border-radius: 6px; padding: 0.4rem 0.6rem; margin-top: 0.4rem; font-size: 0.9rem; color: #166534; }
  .footer { margin-top: 2rem; font-size: 0.8rem; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 0.75rem; }
  @media print { body { margin: 0.75rem; } }
`;

function wrapHtml(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)}</title>
<style>${PRINT_CSS}</style>
</head>
<body>
<div class="brand">EdNet Learn Gurukul · Sanskrit &amp; Vedic Maths</div>
${bodyHtml}
<div class="footer">EdNet Learn Gurukul · care@ednetlearn.in · Offline practice sheet · Open in browser and use Print / Save as PDF if needed.</div>
</body>
</html>`;
}

export function buildWorksheetHtml(ws: Worksheet, includeAnswers: boolean): string {
  const sectionsHtml = ws.sections
    .map((section) => {
      const questionsHtml = section.questions
        .map((q) => {
          const opts =
            q.options && q.options.length > 0
              ? `<div class="opts">${q.options
                  .map((opt, i) => `<div>(${String.fromCharCode(97 + i)}) ${escapeHtml(opt)}</div>`)
                  .join('')}</div>`
              : '';
          const answerBlock = includeAnswers
            ? `<div class="answer"><strong>✓ उत्तरम्:</strong> ${escapeHtml(q.answer)}${
                q.explanation ? `<br/><em>💡 ${escapeHtml(q.explanation)}</em>` : ''
              }</div>`
            : `<div class="blank"></div>`;
          return `<div class="q"><div><span class="q-num">${q.num}.</span> ${escapeHtml(q.question)} <em>[${q.marks}M]</em></div>${opts}${answerBlock}</div>`;
        })
        .join('');
      return `<h2>${escapeHtml(section.sectionTitleSanskrit)} · ${escapeHtml(section.sectionTitle)} [${section.totalMarks} Marks]</h2>
<p class="meta">${escapeHtml(section.instructions)}</p>
${questionsHtml}`;
    })
    .join('');

  const body = `
<h1>${escapeHtml(ws.titleSanskrit)}</h1>
<div class="meta"><strong>${escapeHtml(ws.title)}</strong> (${escapeHtml(ws.grade)}) · Time: ${escapeHtml(ws.timeLimit)} · Max Marks: ${ws.totalMarks}</div>
<p class="meta">छात्रस्य नाम: ______________________ &nbsp; क्रमाङ्कः: ______ &nbsp; दिनाङ्कः: __________</p>
${includeAnswers ? '<p class="meta"><strong>Teacher Mode — Answer Key included</strong></p>' : ''}
${sectionsHtml}`;

  return wrapHtml(ws.title, body);
}

export function downloadWorksheet(ws: Worksheet, includeAnswers: boolean): void {
  const html = buildWorksheetHtml(ws, includeAnswers);
  const suffix = includeAnswers ? 'answer-key' : 'practice';
  downloadBlob(`ednet-worksheet-${slugify(ws.id)}-${suffix}.html`, html);
}

export function buildQuizHtml(
  title: string,
  questions: QuizQuestionItem[],
  options?: {
    includeAnswers?: boolean;
    userAnswers?: Record<string, number>;
    scoreLabel?: string;
  }
): string {
  const includeAnswers = !!options?.includeAnswers;
  const userAnswers = options?.userAnswers;
  const questionsHtml = questions
    .map((q, idx) => {
      const opts = `<div class="opts">${q.options
        .map((opt, i) => {
          const letter = String.fromCharCode(65 + i);
          return `<div>(${letter}) ${escapeHtml(opt)}</div>`;
        })
        .join('')}</div>`;
      let extra = '';
      if (userAnswers && userAnswers[q.id] !== undefined) {
        const ua = userAnswers[q.id];
        const ok = ua === q.correctIndex;
        extra += `<div class="answer" style="background:${ok ? '#f0fdf4' : '#fef2f2'};border-color:${ok ? '#86efac' : '#fca5a5'};color:${ok ? '#166534' : '#991b1b'}"><strong>Your answer:</strong> ${escapeHtml(q.options[ua] ?? '—')}</div>`;
      }
      if (includeAnswers) {
        extra += `<div class="answer"><strong>✓ Correct:</strong> ${escapeHtml(q.options[q.correctIndex])}<br/><em>💡 ${escapeHtml(q.explanation)}</em></div>`;
      } else if (!userAnswers) {
        extra += `<div class="blank"></div>`;
      }
      return `<div class="q"><div><span class="q-num">Q${idx + 1}.</span> ${escapeHtml(q.question)}${
        q.questionSanskrit ? `<br/><strong>${escapeHtml(q.questionSanskrit)}</strong>` : ''
      }</div>${opts}${extra}</div>`;
    })
    .join('');

  const body = `
<h1>${escapeHtml(title)}</h1>
<div class="meta">${questions.length} questions · EdNet Learn Gurukul practice sheet</div>
${options?.scoreLabel ? `<p class="meta"><strong>${escapeHtml(options.scoreLabel)}</strong></p>` : ''}
${includeAnswers ? '<p class="meta"><strong>Answer key included</strong></p>' : ''}
${questionsHtml}`;

  return wrapHtml(title, body);
}

export function downloadQuizSheet(
  title: string,
  questions: QuizQuestionItem[],
  options?: {
    includeAnswers?: boolean;
    userAnswers?: Record<string, number>;
    scoreLabel?: string;
    filenameHint?: string;
  }
): void {
  const html = buildQuizHtml(title, questions, options);
  const hint = options?.filenameHint || title;
  downloadBlob(`ednet-quiz-${slugify(hint)}.html`, html);
}
