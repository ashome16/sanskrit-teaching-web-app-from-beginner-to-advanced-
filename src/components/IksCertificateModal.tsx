import React, { useEffect, useRef, useState } from 'react';

interface IksCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  points: number;
  masteredCount: number;
  isTeacherMode: boolean;
}

const DEV_FONT = '"Noto Sans Devanagari", "Devanagari Sangam MN", "Tiro Devanagari Sanskrit", sans-serif';
const SERIF_FONT = '"Cinzel", "Times New Roman", "Baskerville", Georgia, serif';

function generateCertId(name: string, points: number): string {
  let hash = 0;
  const str = `${name.trim().toLowerCase()}-${points}-${new Date().getFullYear()}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `IKS-2026-${hex.slice(0, 4)}-${hex.slice(4, 8)}`;
}

function renderCertificate(
  canvas: HTMLCanvasElement,
  name: string,
  certId: string,
  points: number,
  masteredCount: number
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const W = 1600;
  const H = 1130;
  canvas.width = W;
  canvas.height = H;

  // Background Parchment Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, '#fdfbf7');
  bgGrad.addColorStop(0.5, '#fefae0');
  bgGrad.addColorStop(1, '#fbf6ea');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Outer Decorative Triple Border
  ctx.strokeStyle = '#78350f'; // Dark amber / bronze
  ctx.lineWidth = 14;
  ctx.strokeRect(40, 40, W - 80, H - 80);

  ctx.strokeStyle = '#d97706'; // Gold accent
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 58, W - 116, H - 116);

  ctx.strokeStyle = '#92400e';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(66, 66, W - 132, H - 132);

  // Corner Medallions
  const drawCorner = (x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#78350f';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  drawCorner(58, 58);
  drawCorner(W - 58, 58);
  drawCorner(58, H - 58);
  drawCorner(W - 58, H - 58);

  // Subtle Watermark in Center (Konark 24-spoke solar motif)
  ctx.save();
  ctx.translate(W / 2, H / 2 + 10);
  ctx.strokeStyle = '#d97706';
  ctx.globalAlpha = 0.055;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 240, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15 * Math.PI) / 180;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(240 * Math.cos(angle), 240 * Math.sin(angle));
    ctx.stroke();
  }
  ctx.restore();

  // Top Header Kicker
  ctx.textAlign = 'center';
  ctx.fillStyle = '#78350f';
  ctx.font = `700 22px ${SERIF_FONT}`;
  ctx.letterSpacing = '0.18em';
  ctx.fillText('EDNET GURUKUL · BHARATIYA JNANA PARAMPARA (IKS)', W / 2, 126);

  // Devanagari Title
  ctx.fillStyle = '#991b1b'; // Maroon
  ctx.font = `700 38px ${DEV_FONT}`;
  ctx.fillText('भारतीय ज्ञान परंपरा — अनुभवात्मक विज्ञान निष्णात-प्रमाणपत्रम्', W / 2, 188);

  // English Title
  ctx.fillStyle = '#1e293b';
  ctx.font = `800 48px ${SERIF_FONT}`;
  ctx.fillText('Certificate of Mastery in Indian Knowledge Systems (IKS)', W / 2, 252);

  // Certify Statement
  ctx.fillStyle = '#64748b';
  ctx.font = `italic 24px ${SERIF_FONT}`;
  ctx.fillText('This is to honorably certify that', W / 2, 310);

  // Student Name
  ctx.fillStyle = '#92400e';
  let nameSize = 64;
  ctx.font = `700 ${nameSize}px ${SERIF_FONT}`;
  while (ctx.measureText(name).width > W - 360 && nameSize > 32) {
    nameSize -= 4;
    ctx.font = `700 ${nameSize}px ${SERIF_FONT}`;
  }
  ctx.fillText(name || 'Dedicated Science Scholar', W / 2, 395);

  // Underline
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 340, 420);
  ctx.lineTo(W / 2 + 340, 420);
  ctx.stroke();

  // Achievement Description
  ctx.fillStyle = '#334155';
  ctx.font = `500 23px ${SERIF_FONT}`;
  ctx.fillText(
    `has successfully completed the sequential inquiry curriculum (${masteredCount}/14 Labs Mastered · ${points} Vidyā Points)`,
    W / 2,
    468
  );
  ctx.fillText(
    'and verified foundational scientific principles across 6 classical Indian STEM disciplines:',
    W / 2,
    504
  );

  // 6 Disciplines Table Grid
  const disciplines = [
    {
      dev: '१. धातुशास्त्रम् (Metallurgy)',
      eng: 'Rust-resistant δ-FeOOH misawite passivation & high-carbon Wootz steel pyrotechnology.',
    },
    {
      dev: '२. सौर-कालज्ञानम् (Astronomy)',
      eng: 'Konark 24-spoke solar shadow ghaṭikā horology & Pañcāṅga celestial coordinate ring.',
    },
    {
      dev: '३. गणित-कूटलेखनम् (Cryptography)',
      eng: 'Mādhava 31-decimal π Kaṭapayādi alphanumeric hashing & Piṅgala binary prosody.',
    },
    {
      dev: '४. पारिस्थितिकी (Ecology & Soil)',
      eng: '5 Mahābhūtas closed-loop biosphere, rhizosphere mycorrhizae & heirloom seed banks.',
    },
    {
      dev: '५. शल्यशास्त्रम् (Surgery & Mind)',
      eng: 'Suśruta 101+ biomimetic surgical instruments & Sage Uddālaka empirical epistemology.',
    },
    {
      dev: '६. प्रमाण-पद्धतिः (Scientific Method)',
      eng: 'Hands-on experiential hypothesis testing aligned with CBSE/NEP national curricula.',
    },
  ];

  const colW = 680;
  const startX = W / 2 - colW - 30;
  const startY = 560;

  disciplines.forEach((disc, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = col === 0 ? startX : W / 2 + 30;
    const y = startY + row * 92;

    // Mini box background
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, colW, 76, 10);
    ctx.fill();
    ctx.stroke();

    // Box left accent
    ctx.fillStyle = col === 0 ? '#b45309' : '#0284c7';
    ctx.beginPath();
    ctx.roundRect(x, y, 6, 76, [10, 0, 0, 10]);
    ctx.fill();

    // Title & Description
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0f172a';
    ctx.font = `700 18px ${DEV_FONT}`;
    ctx.fillText(disc.dev, x + 20, y + 28);

    ctx.fillStyle = '#64748b';
    ctx.font = `400 15px ${SERIF_FONT}`;
    ctx.fillText(disc.eng, x + 20, y + 54);
  });

  // Sanskrit Motto
  ctx.textAlign = 'center';
  ctx.fillStyle = '#991b1b';
  ctx.font = `700 28px ${DEV_FONT}`;
  ctx.fillText('शुभम् अस्तु · ज्ञानाद् एव तु कैवल्यम्', W / 2, 895);

  // Bottom Footer Bar
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  ctx.textAlign = 'left';
  ctx.fillStyle = '#475569';
  ctx.font = `600 20px ${SERIF_FONT}`;
  ctx.fillText(`Conferred: ${today}`, 100, 980);
  ctx.fillText(`Rank: Vidyā Ācārya (Master of Science)`, 100, 1012);

  ctx.textAlign = 'right';
  ctx.fillText(`Certificate ID: ${certId}`, W - 100, 980);
  ctx.font = `400 18px ${SERIF_FONT}`;
  ctx.fillText('Authorized by EdNet Learn IKS Academic Board', W - 100, 1012);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#94a3b8';
  ctx.font = `400 16px ${SERIF_FONT}`;
  ctx.fillText('Verify Credential: https://ednetlearn.in/iks · NEP 2020 Heritage Science Initiative', W / 2, 1060);
}

/** Single-page PDF wrapping the certificate as a JPEG (no external libraries). */
function canvasToPdf(canvas: HTMLCanvasElement): Blob {
  const jpeg = atob(canvas.toDataURL('image/jpeg', 0.95).split(',')[1]);
  const imgBytes = new Uint8Array(jpeg.length);
  for (let i = 0; i < jpeg.length; i += 1) imgBytes[i] = jpeg.charCodeAt(i);
  const pw = 842;
  const ph = 595; // A4 landscape, points
  const content = `q ${pw} 0 0 ${ph} 0 0 cm /Im0 Do Q`;
  const enc = new TextEncoder();
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];
  let len = 0;
  const push = (p: string | Uint8Array) => {
    const b = typeof p === 'string' ? enc.encode(p) : p;
    parts.push(b);
    len += b.length;
  };
  push('%PDF-1.4\n');
  const obj = (n: number, body: string | (() => void)) => {
    offsets[n] = len;
    push(`${n} 0 obj\n`);
    if (typeof body === 'string') push(body);
    else body();
    push('\nendobj\n');
  };
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pw} ${ph}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  obj(4, () => {
    push(
      `<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`
    );
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

export const IksCertificateModal: React.FC<IksCertificateModalProps> = ({
  isOpen,
  onClose,
  points,
  masteredCount,
  isTeacherMode,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [studentName, setStudentName] = useState<string>('Aryabhata Scholar');
  const [certId, setCertId] = useState<string>('');

  useEffect(() => {
    const id = generateCertId(studentName, points);
    setCertId(id);
    if (canvasRef.current) {
      renderCertificate(canvasRef.current, studentName, id, points, masteredCount);
    }
  }, [studentName, points, masteredCount, isOpen]);

  if (!isOpen) return null;

  const handleDownloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `IKS-Mastery-Certificate-${studentName.replace(/\s+/g, '-')}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadPdf = () => {
    if (!canvasRef.current) return;
    const blob = canvasToPdf(canvasRef.current);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IKS-Mastery-Certificate-${studentName.replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };

  return (
    <div className="iks-cert-overlay" role="dialog" aria-modal="true" aria-label="IKS Certificate Studio">
      <div className="iks-cert-modal">
        <div className="iks-cert-header">
          <div>
            <span className="iks-quiz-unit-kicker">Verified Heritage Credential</span>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>
              IKS Vidyā Ācārya · Certificate of Mastery
            </h3>
          </div>
          <button type="button" className="iks-quiz-close-btn" onClick={onClose} aria-label="Close Certificate">
            ✕
          </button>
        </div>

        <div className="iks-cert-body">
          <div className="iks-cert-controls">
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                  Recipient Name (as it appears on certificate):
                </label>
                <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#b45309', fontWeight: 700 }}>
                  ID: {certId}
                </span>
              </div>
              <input
                type="text"
                className="iks-cert-input"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Type your full name..."
                maxLength={45}
              />
            </div>

            <div className="iks-cert-actions">
              <button type="button" className="iks-cert-btn iks-cert-btn--gold" onClick={handleDownloadPng}>
                Download PNG
              </button>
              <button type="button" className="iks-cert-btn iks-cert-btn--primary" onClick={handleDownloadPdf}>
                Download PDF
              </button>
            </div>
          </div>

          <div className="iks-cert-canvas-wrap">
            <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
          </div>

          <p style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center', marginTop: '0.75rem', marginBottom: 0 }}>
            {isTeacherMode
              ? 'Preview Mode Active: Certificate generated with instant credentials for demonstration.'
              : `Mastery Level: ${masteredCount} of 14 Think Labs Completed (${points} Vidyā Points Earned).`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IksCertificateModal;
