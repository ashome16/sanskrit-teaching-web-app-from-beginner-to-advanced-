import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { SECTION_QUESTIONS, SWAR_SECTIONS, type SectionQ } from '../data/swarBook';

/**
 * /certificate — Certificate of Completion for readers of the book
 * Swar · स्वर — Sanskrit Workbook (The Darśana Series, by Sesha K Penumallu).
 *
 * Flow: book code → quiz with ONE question from each section of the book's
 * Contents (7 Parts + Vedic maths) → score → at 70% or more, name entry and
 * certificate; below 70%, the sections to revisit (with page numbers) and a retry.
 * The certificate ID is deterministic: SHA-256(login id/email, or the name if
 * not signed in + book code). Accounts live in the browser (no server storage).
 */

export const BOOK_CODE = 'SWAR-2026';
const QUIZ_LENGTH = SWAR_SECTIONS.length;
const PASS_PERCENT = 70;
const PASS_MARK = Math.ceil((QUIZ_LENGTH * PASS_PERCENT) / 100);
export const BOOK_TITLE = 'Swar · स्वर — Sanskrit Workbook';

type Q = SectionQ;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** One random question from each section, in book order, options shuffled. */
function pickQuiz(): Q[] {
  return SWAR_SECTIONS.map((s) => {
    const pool = SECTION_QUESTIONS.filter((q) => q.section === s.id);
    const item = pool[Math.floor(Math.random() * pool.length)];
    const order = shuffle(item.options.map((_, i) => i));
    return { ...item, options: order.map((i) => item.options[i]), answer: order.indexOf(item.answer) };
  });
}

const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export async function certificateIdFor(loginKey: string): Promise<string> {
  const data = new TextEncoder().encode(`${loginKey.trim().toLowerCase()}|${BOOK_CODE}`);
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
  let bits = 0;
  let value = 0;
  let out = '';
  for (const b of bytes) {
    value = (value << 8) | b;
    bits += 8;
    while (bits >= 5 && out.length < 6) {
      out += B32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
    if (out.length >= 6) break;
  }
  return `${BOOK_CODE}-${out}`;
}

const DEV = "'Noto Sans Devanagari','Nirmala UI','Mangal','Kohinoor Devanagari',sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/** Original rangoli border: dotted lotus motifs in corners, petal chain along edges. */
function drawRangoli(ctx: CanvasRenderingContext2D, W: number, H: number) {
  const colors = ['#e8590c', '#c2255c', '#0c8599', '#f08c00', '#5f3dc4'];
  ctx.save();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#273b35';
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#f08c00';
  ctx.strokeRect(58, 58, W - 116, H - 116);

  const petal = (x: number, y: number, r: number, rot: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(r * 0.55, -r * 0.5, 0, -r);
    ctx.quadraticCurveTo(-r * 0.55, -r * 0.5, 0, 0);
    ctx.fill();
    ctx.restore();
  };
  const dot = (x: number, y: number, r: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  // edge chain
  const step = 46;
  for (let x = 100; x <= W - 100; x += step) {
    const c = colors[Math.round(x / step) % colors.length];
    petal(x, 24 + 26, 16, Math.PI / 2, c); petal(x, 50, 16, -Math.PI / 2, c);
    petal(x, H - 50, 16, Math.PI / 2, c); petal(x, H - 50, 16, -Math.PI / 2, c);
    dot(x + step / 2, 50, 3.5, '#273b35'); dot(x + step / 2, H - 50, 3.5, '#273b35');
  }
  for (let y = 100; y <= H - 100; y += step) {
    const c = colors[Math.round(y / step) % colors.length];
    petal(50, y, 16, 0, c); petal(50, y, 16, Math.PI, c);
    petal(W - 50, y, 16, 0, c); petal(W - 50, y, 16, Math.PI, c);
    dot(50, y + step / 2, 3.5, '#273b35'); dot(W - 50, y + step / 2, 3.5, '#273b35');
  }
  // corner lotus
  const corners: [number, number][] = [[50, 50], [W - 50, 50], [50, H - 50], [W - 50, H - 50]];
  for (const [cx, cy] of corners) {
    dot(cx, cy, 44, '#fff8ec');
    for (let i = 0; i < 8; i += 1) petal(cx, cy, 40, (i * Math.PI) / 4, colors[i % colors.length]);
    for (let i = 0; i < 8; i += 1) petal(cx, cy, 22, (i * Math.PI) / 4 + Math.PI / 8, '#fff3bf');
    dot(cx, cy, 8, '#c2255c');
    for (let i = 0; i < 12; i += 1) {
      const a = (i * Math.PI) / 6;
      dot(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52, 3, '#273b35');
    }
  }
  ctx.restore();
}

async function drawCertificate(canvas: HTMLCanvasElement, name: string, date: string, id: string, score: number) {
  const W = 1600;
  const H = 1131;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  try { await document.fonts?.ready; } catch { /* ignore */ }
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#fffaf0');
  grad.addColorStop(1, '#fff1e0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  drawRangoli(ctx, W, H);

  const logo = await loadImage('/ednet-learn-logo.jpg');
  if (logo) {
    const lh = 96;
    const lw = (logo.width / logo.height) * lh;
    ctx.drawImage(logo, W / 2 - lw / 2, 112, lw, lh);
  }
  ctx.textAlign = 'center';
  ctx.fillStyle = '#c2255c';
  let ts = 60;
  ctx.font = `700 ${ts}px ${DEV}`;
  while (ctx.measureText(BOOK_TITLE).width > W - 360 && ts > 36) { ts -= 2; ctx.font = `700 ${ts}px ${DEV}`; }
  ctx.fillText(BOOK_TITLE, W / 2, 284);
  ctx.fillStyle = '#273b35';
  ctx.font = `700 58px ${SERIF}`;
  ctx.fillText('Certificate of Completion', W / 2, 372);
  ctx.fillStyle = '#6b6375';
  ctx.font = `italic 28px ${SERIF}`;
  ctx.fillText('This is to certify that', W / 2, 436);

  let size = 76;
  ctx.font = `700 ${size}px ${SERIF}`;
  while (ctx.measureText(name).width > W - 420 && size > 36) {
    size -= 4;
    ctx.font = `700 ${size}px ${SERIF}`;
  }
  ctx.fillStyle = '#e8590c';
  ctx.fillText(name, W / 2, 536);
  ctx.strokeStyle = '#f08c00';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(W / 2 - 380, 562); ctx.lineTo(W / 2 + 380, 562); ctx.stroke();

  ctx.fillStyle = '#273b35';
  ctx.font = `400 34px ${SERIF}`;
  ctx.fillText(`has completed the workbook and passed the quiz (${score} / ${QUIZ_LENGTH})`, W / 2, 628);
  ctx.font = `italic 28px ${SERIF}`;
  ctx.fillStyle = '#0c8599';
  ctx.fillText('The Darśana Series · by Sesha K Penumallu', W / 2, 678);

  ctx.fillStyle = '#c2255c';
  ctx.font = `700 52px ${DEV}`;
  ctx.fillText('शुभम् अस्तु', W / 2, 790);

  ctx.font = `600 26px ${SERIF}`;
  ctx.fillStyle = '#273b35';
  ctx.textAlign = 'left';
  ctx.fillText(`Date: ${date}`, 170, 930);
  ctx.textAlign = 'right';
  ctx.fillText(`Certificate ID: ${id}`, W - 170, 930);
  ctx.textAlign = 'center';
  ctx.font = `400 22px ${SERIF}`;
  ctx.fillStyle = '#6b6375';
  ctx.fillText('EdNet Learn · ednetlearn.in/certificate', W / 2, 1000);
}

/** Single-page PDF wrapping the certificate as a JPEG (no extra libraries). */
function canvasToPdf(canvas: HTMLCanvasElement): Blob {
  const jpeg = atob(canvas.toDataURL('image/jpeg', 0.92).split(',')[1]);
  const imgBytes = new Uint8Array(jpeg.length);
  for (let i = 0; i < jpeg.length; i += 1) imgBytes[i] = jpeg.charCodeAt(i);
  const pw = 842; const ph = 595; // A4 landscape, points
  const content = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let len = 0;
  const push = (p: string | Uint8Array) => { const b = typeof p === 'string' ? enc.encode(p) : p; parts.push(b); len += b.length; };
  push('%PDF-1.4\n');
  const obj = (n: number, body: string | (() => void)) => {
    offsets[n] = len;
    push(`${n} 0 obj\n`);
    if (typeof body === 'string') push(body); else body();
    push('\nendobj\n');
  };
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  obj(4, () => {
    push(`<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`);
    push(imgBytes);
    push('\nendstream');
  });
  obj(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);
  const xref = len;
  let x = 'xref\n0 6\n0000000000 65535 f \n';
  for (let i = 1; i <= 5; i += 1) x += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  push(`${x}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
  return new Blob(parts as BlobPart[], { type: 'application/pdf' });
}

function download(href: string, filename: string) {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const card: React.CSSProperties = {
  background: '#fff', borderRadius: 18, border: '1px solid #e5e4e7',
  boxShadow: '0 10px 30px rgba(39,59,53,0.08)', padding: 'clamp(1.1rem, 3vw, 2rem)',
};
const btn: React.CSSProperties = {
  background: '#273b35', color: '#fff', border: 'none', borderRadius: 999, padding: '0.75rem 1.4rem',
  fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
};
const btnAlt: React.CSSProperties = { ...btn, background: '#fff', color: '#273b35', border: '2px solid #273b35' };
const input: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', padding: '0.75rem 0.9rem', borderRadius: 12,
  border: '1.5px solid #cbd5e1', fontSize: '1rem', marginTop: 6,
};

const linkBtn: React.CSSProperties = { ...btnAlt, padding: '0.5rem 1rem', fontSize: '0.92rem' };

type Step = 'form' | 'quiz' | 'result' | 'certificate';

interface Props {
  onGoHome?: () => void;
  onOpenBodhi?: () => void;
  onOpenWorksheets?: () => void;
  onOpenPuzzles?: () => void;
  onOpenGames?: () => void;
  onOpenReviewPractice?: () => void;
}

const STORE_KEY = 'ednet-swar-certificates';

const CertificatePage: React.FC<Props> = ({ onGoHome, onOpenBodhi, onOpenWorksheets, onOpenPuzzles, onOpenGames, onOpenReviewPractice }) => {
  const { currentUser, isAdminLoggedIn, openAuthModal } = useAuthStore();
  const accountKey = currentUser ? (currentUser.email || currentUser.id) : isAdminLoggedIn ? 'admin' : '';
  const [step, setStep] = useState<Step>('form');
  const [name, setName] = useState(currentUser?.fullName || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [quiz, setQuiz] = useState<Q[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [certId, setCertId] = useState('');
  const [png, setPng] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const date = useMemo(() => new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), []);

  useEffect(() => { if (currentUser?.fullName && !name) setName(currentUser.fullName); }, [currentUser, name]);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [step]);

  const newQuiz = () => {
    const q = pickQuiz();
    setQuiz(q);
    setAnswers(q.map(() => null));
    setError('');
    setStep('quiz');
  };

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() !== BOOK_CODE) { setError('That book code does not match. Look on page 149 of your Swar workbook.'); return; }
    newQuiz();
  };

  const submitQuiz = () => {
    const left = answers.filter((a) => a === null).length;
    if (left) { setError(`Please answer all ${QUIZ_LENGTH} questions (${left} left).`); return; }
    setError('');
    setScore(quiz.reduce((s, item, i) => s + (answers[i] === item.answer ? 1 : 0), 0));
    setStep('result');
  };

  const percent = QUIZ_LENGTH ? Math.round((score / QUIZ_LENGTH) * 100) : 0;
  const passed = score >= PASS_MARK;
  const missed = quiz.filter((item, i) => answers[i] !== item.answer);

  const makeCertificate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) { setError('Please type your name as you want it on the certificate.'); return; }
    setError('');
    const id = await certificateIdFor(accountKey || `name:${name.trim()}`);
    setCertId(id);
    setPng('');
    setStep('certificate');
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
      saved[id] = { id, name: name.trim(), date, score };
      localStorage.setItem(STORE_KEY, JSON.stringify(saved));
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (step !== 'certificate' || !canvasRef.current || !certId) return;
    const c = canvasRef.current;
    drawCertificate(c, name.trim(), date, certId, score).then(() => setPng(c.toDataURL('image/png')));
  }, [step, certId, name, date, score]);

  const printCert = () => {
    if (!png) return;
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`<html><head><title>Swar Certificate</title><style>@page{size:A4 landscape;margin:0}body{margin:0}img{width:100%;display:block}</style></head><body><img src="${png}" onload="setTimeout(function(){window.print()},200)"></body></html>`);
    w.document.close();
  };

  const fileBase = `Swar-certificate-${certId}`;
  const sectionLabel = (id: string) => SWAR_SECTIONS.find((s) => s.id === id);

  const moreLinks = (onOpenBodhi || onOpenWorksheets || onOpenPuzzles || onOpenGames || onOpenReviewPractice) && (
    <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed #e5e4e7' }} data-testid="cert-more">
      <p style={{ margin: '0 0 0.6rem', color: '#6b6375' }}>Keep learning with interactive puzzles, games and worksheets on EdNet Learn, or Ask Bodhi if you are stuck.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {onOpenReviewPractice && <button style={linkBtn} onClick={onOpenReviewPractice}>📝 Swar Review Practice</button>}
        {onOpenPuzzles && <button style={linkBtn} onClick={onOpenPuzzles}>🧩 Puzzles</button>}
        {onOpenGames && <button style={linkBtn} onClick={onOpenGames}>🎮 Games</button>}
        {onOpenWorksheets && <button style={linkBtn} onClick={onOpenWorksheets}>📄 Worksheets</button>}
        {onOpenBodhi && <button style={linkBtn} onClick={onOpenBodhi}>🙋 Ask Bodhi</button>}
      </div>
    </div>
  );

  return (
    <div className="certificate-page" style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 3vw, 1.5rem) 4rem', color: '#273b35' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: 'clamp(1.6rem, 5vw, 2.4rem)', fontWeight: 800, color: '#c2255c', fontFamily: DEV }}>{BOOK_TITLE}</div>
        <h1 style={{ margin: '0.25rem 0', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#273b35' }}>Get your Certificate of Completion</h1>
        <p style={{ margin: 0, color: '#6b6375' }}>The Darśana Series · by Sesha K Penumallu</p>
      </div>

      {step === 'form' && (
        <form style={card} onSubmit={startQuiz} data-testid="cert-form">
          <h2 style={{ marginTop: 0 }}>1 · Your book code</h2>
          <label style={{ display: 'block', fontWeight: 700 }}>Book code
            <input style={{ ...input, textTransform: 'uppercase', letterSpacing: '0.08em' }} value={code} onChange={(e) => setCode(e.target.value)} placeholder="Printed on page 149" autoCapitalize="characters" />
          </label>
          <p style={{ color: '#6b6375', fontSize: '0.95rem' }}>
            Next comes a quiz with <strong>{QUIZ_LENGTH} questions, one from each part of the book</strong>. Get {PASS_MARK} or more right ({PASS_PERCENT}%) to unlock your certificate. You can try again as many times as you like.
          </p>
          {!accountKey && (
            <p style={{ color: '#6b6375', fontSize: '0.88rem' }}>
              Tip: <button type="button" onClick={() => openAuthModal('login')} style={{ background: 'none', border: 'none', padding: 0, color: '#0c8599', textDecoration: 'underline', cursor: 'pointer', font: 'inherit' }}>sign in</button> first if you want the same certificate ID on every device. Signing in is not needed.
            </p>
          )}
          {error && <p role="alert" style={{ color: '#c92a2a', fontWeight: 600 }}>{error}</p>}
          <button type="submit" style={btn}>Start the quiz →</button>
        </form>
      )}

      {step === 'quiz' && (
        <div style={card} data-testid="cert-quiz">
          <h2 style={{ marginTop: 0 }}>2 · Book quiz <span style={{ fontSize: '0.9rem', color: '#6b6375', fontWeight: 500 }}>({PASS_MARK} of {QUIZ_LENGTH} to pass)</span></h2>
          {quiz.map((item, qi) => (
            <fieldset key={qi} style={{ border: '1px solid #e5e4e7', borderRadius: 14, padding: '0.9rem 1rem', margin: '0 0 1rem' }}>
              <legend style={{ fontWeight: 700, padding: '0 0.4rem', fontFamily: DEV }}>
                <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#0c8599', fontFamily: SERIF }}>{sectionLabel(item.section)?.label}</span>
                {qi + 1}. {item.q}
              </legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
                {item.options.map((opt, oi) => {
                  const on = answers[qi] === oi;
                  return (
                    <button type="button" key={oi}
                      aria-pressed={on}
                      onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                      style={{ textAlign: 'left', padding: '0.65rem 0.85rem', borderRadius: 12, cursor: 'pointer', fontSize: '1rem', fontFamily: DEV,
                        border: on ? '2px solid #e8590c' : '1.5px solid #cbd5e1', background: on ? '#fff4e6' : '#fff', color: '#273b35' }}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          {error && <p role="alert" style={{ color: '#c92a2a', fontWeight: 600 }}>{error}</p>}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={btn} onClick={submitQuiz}>Check my answers</button>
            <button style={btnAlt} onClick={() => setStep('form')}>← Back</button>
          </div>
        </div>
      )}

      {step === 'result' && (
        <div style={card} data-testid="cert-result">
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.6rem' }}>{passed ? '🎉' : '🌱'}</div>
            <h2 style={{ marginBottom: 4 }}>You scored {score} / {QUIZ_LENGTH} ({percent}%)</h2>
          </div>
          {passed ? (
            <form onSubmit={makeCertificate} data-testid="cert-name">
              <p style={{ textAlign: 'center' }}>शोभनम्! (śobhanam) Well done! You passed. Type your name for the certificate.</p>
              <label style={{ display: 'block', fontWeight: 700, marginBottom: 14 }}>Your name (as it should appear)
                <input style={input} value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="e.g. Aditi Sharma" autoFocus />
              </label>
              {error && <p role="alert" style={{ color: '#c92a2a', fontWeight: 600 }}>{error}</p>}
              <div style={{ textAlign: 'center' }}><button type="submit" style={btn}>Show my certificate</button></div>
            </form>
          ) : (
            <div data-testid="cert-revisit">
              <p style={{ textAlign: 'center' }}>Good try! Remember your saying: उद्यमेन हि सिध्यन्ति कार्याणि (udyamena hi sidhyanti kāryāṇi), work gets done by effort. You need {PASS_MARK} of {QUIZ_LENGTH} ({PASS_PERCENT}%). Read these pages again, then have another go:</p>
              <ul style={{ lineHeight: 1.7 }}>
                {missed.map((m, i) => (
                  <li key={i}><strong>{sectionLabel(m.section)?.label}</strong>: <span style={{ fontFamily: DEV }}>{m.topic}</span>, page {m.page}</li>
                ))}
              </ul>
              <div style={{ textAlign: 'center' }}><button style={btn} onClick={newQuiz}>Try again with new questions</button></div>
            </div>
          )}
          {moreLinks}
        </div>
      )}

      {step === 'certificate' && (
        <div style={card} data-testid="cert-final">
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          {png ? <img src={png} alt={`Certificate of Completion for ${name}`} style={{ width: '100%', borderRadius: 10, display: 'block' }} /> : <p>Preparing your certificate…</p>}
          <p style={{ textAlign: 'center', margin: '1rem 0 0.5rem' }}>Certificate ID: <strong style={{ letterSpacing: '0.05em' }}>{certId}</strong></p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 8 }}>
            <button style={btn} disabled={!png} onClick={() => download(png, `${fileBase}.png`)}>⬇ Download PNG</button>
            <button style={btn} disabled={!png} onClick={() => { if (canvasRef.current) { const u = URL.createObjectURL(canvasToPdf(canvasRef.current)); download(u, `${fileBase}.pdf`); setTimeout(() => URL.revokeObjectURL(u), 4000); } }}>⬇ Download PDF</button>
            <button style={btnAlt} disabled={!png} onClick={printCert}>🖨 Print</button>
            <button style={btnAlt} onClick={() => setStep('result')}>✏️ Change name</button>
          </div>
          {moreLinks}
        </div>
      )}

      {onGoHome && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button style={{ ...btnAlt, border: 'none', textDecoration: 'underline' }} onClick={onGoHome}>← Back to EdNet Learn</button>
        </p>
      )}
    </div>
  );
};

export default CertificatePage;
