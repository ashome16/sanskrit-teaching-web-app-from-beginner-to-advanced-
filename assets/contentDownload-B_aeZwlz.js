function e(e){return String(e).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#39;`)}function t(e){return e.toLowerCase().replace(/[^a-z0-9\u0900-\u097f]+/gi,`-`).replace(/^-+|-+$/g,``).slice(0,80)||`ednet-download`}function n(e,t,n=`text/html;charset=utf-8`){let r=new Blob([t],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,a.rel=`noopener`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}function r(t,n){return`<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${e(t)}</title>
<style>
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
</style>
</head>
<body>
<div class="brand">EdNet Learn Gurukul · Sanskrit &amp; Vedic Maths</div>
${n}
<div class="footer">EdNet Learn Gurukul · care@ednetlearn.in · Offline practice sheet · Open in browser and use Print / Save as PDF if needed.</div>
</body>
</html>`}function i(t,n){let i=t.sections.map(t=>{let r=t.questions.map(t=>{let r=t.options&&t.options.length>0?`<div class="opts">${t.options.map((t,n)=>`<div>(${String.fromCharCode(97+n)}) ${e(t)}</div>`).join(``)}</div>`:``,i=n?`<div class="answer"><strong>✓ उत्तरम्:</strong> ${e(t.answer)}${t.explanation?`<br/><em>💡 ${e(t.explanation)}</em>`:``}</div>`:`<div class="blank"></div>`;return`<div class="q"><div><span class="q-num">${t.num}.</span> ${e(t.question)} <em>[${t.marks}M]</em></div>${r}${i}</div>`}).join(``);return`<h2>${e(t.sectionTitleSanskrit)} · ${e(t.sectionTitle)} [${t.totalMarks} Marks]</h2>
<p class="meta">${e(t.instructions)}</p>
${r}`}).join(``),a=`
<h1>${e(t.titleSanskrit)}</h1>
<div class="meta"><strong>${e(t.title)}</strong> (${e(t.grade)}) · Time: ${e(t.timeLimit)} · Max Marks: ${t.totalMarks}</div>
<p class="meta">छात्रस्य नाम: ______________________ &nbsp; क्रमाङ्कः: ______ &nbsp; दिनाङ्कः: __________</p>
${n?`<p class="meta"><strong>Teacher Mode — Answer Key included</strong></p>`:``}
${i}`;return r(t.title,a)}function a(e,r){let a=i(e,r),o=r?`answer-key`:`practice`;n(`ednet-worksheet-${t(e.id)}-${o}.html`,a)}function o(t,n,i){let a=!!i?.includeAnswers,o=i?.userAnswers,s=n.map((t,n)=>{let r=`<div class="opts">${t.options.map((t,n)=>`<div>(${String.fromCharCode(65+n)}) ${e(t)}</div>`).join(``)}</div>`,i=``;if(o&&o[t.id]!==void 0){let n=o[t.id],r=n===t.correctIndex;i+=`<div class="answer" style="background:${r?`#f0fdf4`:`#fef2f2`};border-color:${r?`#86efac`:`#fca5a5`};color:${r?`#166534`:`#991b1b`}"><strong>Your answer:</strong> ${e(t.options[n]??`—`)}</div>`}return a?i+=`<div class="answer"><strong>✓ Correct:</strong> ${e(t.options[t.correctIndex])}<br/><em>💡 ${e(t.explanation)}</em></div>`:o||(i+=`<div class="blank"></div>`),`<div class="q"><div><span class="q-num">Q${n+1}.</span> ${e(t.question)}${t.questionSanskrit?`<br/><strong>${e(t.questionSanskrit)}</strong>`:``}</div>${r}${i}</div>`}).join(``);return r(t,`
<h1>${e(t)}</h1>
<div class="meta">${n.length} questions · EdNet Learn Gurukul practice sheet</div>
${i?.scoreLabel?`<p class="meta"><strong>${e(i.scoreLabel)}</strong></p>`:``}
${a?`<p class="meta"><strong>Answer key included</strong></p>`:``}
${s}`)}function s(e,r,i){let a=o(e,r,i);n(`ednet-quiz-${t(i?.filenameHint||e)}.html`,a)}function c(e,r,i=`Online · EdNet Learn`){let a=new Date().toISOString().replace(/[-:]/g,``).split(`.`)[0]+`Z`,o=[`BEGIN:VCALENDAR`,`VERSION:2.0`,`PRODID:-//EdNet Learn Gurukul//Sanskrit Events//EN`,`CALSCALE:GREGORIAN`,`METHOD:PUBLISH`,`BEGIN:VEVENT`,`UID:${Date.now()}@ednetlearn.in`,`DTSTAMP:${a}`,`DTSTART:${a}`,`SUMMARY:${e.replace(/[,;\n]/g,` `)}`,`DESCRIPTION:${r.replace(/\n/g,`\\n`)}`,`LOCATION:${i}`,`STATUS:CONFIRMED`,`END:VEVENT`,`END:VCALENDAR`].join(`\r
`);n(`${t(e)}.ics`,o,`text/calendar;charset=utf-8`)}function l(i,a,o,s,c){let l=r(i,`
<h1>${e(i)}</h1>
<div style="font-size: 1.25rem; font-weight: 700; color: #b3472f; margin-bottom: 0.5rem; font-family: 'Noto Sans Devanagari', serif;">${e(a)}</div>
<div class="meta">${e(o)} · Official EdNet Learn Gurukul Academic Study Vault</div>
<div style="background: #fffdf8; border: 1.5px solid #eed0ae; border-radius: 8px; padding: 1.25rem; margin-top: 1rem; line-height: 1.6;">
  ${s}
</div>
`);n(c||`ednet-resource-${t(i)}.html`,l)}export{a,l as i,c as n,e as o,s as r,n as t};
//# sourceMappingURL=contentDownload-B_aeZwlz.js.map