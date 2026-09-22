/**
 * Vercel serverless: send password-reset OTP via Resend.
 * Client generates OTP and stores it in activeOtpSession; this endpoint only emails it.
 * Never echo OTP in API responses.
 *
 * Env:
 *   RESEND_API_KEY (required)
 *   RESEND_FROM_EMAIL (optional) — default uses Resend onboarding sender for unverified domains.
 *     After verifying ednetlearn.in in Resend, set:
 *     RESEND_FROM_EMAIL=EdNet Learn <care@ednetlearn.in>
 *     Do NOT use @example.com placeholders — they are ignored and fall back to the default.
 */
const { send, handleOptions, readJson } = require('./_razorpay');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_RE = /^\d{6}$/;
const DEFAULT_FROM = 'EdNet Learn <beth.t@example.com>';

/** Reject placeholder / unverified-example senders that Resend will always refuse. */
function resolveFromAddress() {
  const configured = (process.env.RESEND_FROM_EMAIL || '').trim();
  if (!configured) return { from: DEFAULT_FROM, usedDefault: true };
  const lower = configured.toLowerCase();
  if (
    lower.includes('@example.com') ||
    lower.includes('@example.org') ||
    lower.includes('@example.net') ||
    lower.includes('yourdomain') ||
    lower.includes('noreply@localhost')
  ) {
    return { from: DEFAULT_FROM, usedDefault: true, ignoredConfigured: true };
  }
  return { from: configured, usedDefault: false };
}

function extractResendDetail(data) {
  if (!data || typeof data !== 'object') return null;
  const candidates = [data.message, data.error, data.name, data.details];
  for (const c of candidates) {
    if (typeof c === 'string' && c.trim()) return c.trim();
    if (c && typeof c === 'object') {
      if (typeof c.message === 'string' && c.message.trim()) return c.message.trim();
      try {
        const s = JSON.stringify(c);
        if (s && s !== '{}') return s;
      } catch {
        /* ignore */
      }
    }
  }
  return null;
}

function isDomainOrTestingRestriction(detail) {
  const d = (detail || '').toLowerCase();
  return (
    d.includes('domain is not verified') ||
    d.includes('only send testing emails') ||
    d.includes('testing email') ||
    d.includes('verify a domain') ||
    d.includes('verify your domain') ||
    d.includes('add and verify')
  );
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return handleOptions(res);
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) {
    return send(res, 500, {
      error: 'Server misconfigured: RESEND_API_KEY missing',
      resendConfigured: false,
    });
  }

  try {
    const body =
      typeof req.body === 'object' && req.body !== null ? req.body : await readJson(req);

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const otp = typeof body.otp === 'string' ? body.otp.trim() : String(body.otp || '').trim();
    const toName =
      typeof body.toName === 'string' ? body.toName.trim().slice(0, 120) : '';

    if (!email || !otp) {
      return send(res, 400, { error: 'Missing email or otp' });
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return send(res, 400, { error: 'Invalid email format' });
    }
    if (!OTP_RE.test(otp)) {
      return send(res, 400, { error: 'otp must be 6 digits' });
    }

    const { from } = resolveFromAddress();
    const greeting = toName ? `Hi ${toName},` : 'Hi,';
    const subject = 'Your EdNet Learn password reset code';
    const text = [
      greeting,
      '',
      'You asked to reset your EdNet Learn password.',
      `Your 6-digit code is: ${otp}`,
      '',
      'This code expires in 10 minutes.',
      'If you did not ask for a reset, you can ignore this email — your password will stay the same.',
      '',
      '— EdNet Learn (care@ednetlearn.in)',
    ].join('\n');

    const html = `
<!DOCTYPE html>
<html>
<body style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; line-height: 1.5; color: #1e293b; max-width: 520px; margin: 0 auto; padding: 24px;">
  <p>${escapeHtml(greeting)}</p>
  <p>You asked to reset your <strong>EdNet Learn</strong> password.</p>
  <p style="font-size: 1.05rem;">Your 6-digit code is:</p>
  <p style="font-size: 2rem; letter-spacing: 0.35em; font-weight: 700; background: #f1f5f9; padding: 12px 20px; border-radius: 10px; display: inline-block;">${otp}</p>
  <p>This code <strong>expires in 10 minutes</strong>.</p>
  <p style="color: #64748b; font-size: 0.9rem;">If you did not ask for a reset, you can safely ignore this email — your password will stay the same.</p>
  <p style="margin-top: 2rem; color: #94a3b8; font-size: 0.85rem;">— EdNet Learn · care@ednetlearn.in</p>
</body>
</html>`.trim();

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email],
        subject,
        text,
        html,
      }),
    });

    const data = await resendRes.json().catch(() => ({}));

    if (!resendRes.ok) {
      const detail =
        extractResendDetail(data) || `Resend HTTP ${resendRes.status}`;
      const payload = {
        error: 'Failed to send reset email',
        details: typeof detail === 'string' ? detail : 'Resend error',
      };
      if (isDomainOrTestingRestriction(payload.details)) {
        payload.restriction = 'domain_or_testing';
        payload.hint =
          'Reset email may only reach the Resend account owner until ednetlearn.in is verified in Resend. Contact care@ednetlearn.in or use Admin → Students → Reset PW.';
      }
      return send(res, resendRes.status >= 400 && resendRes.status < 600 ? resendRes.status : 502, payload);
    }

    // Never echo otp (or Resend payload that might contain it).
    return send(res, 200, { ok: true });
  } catch (err) {
    return send(res, 500, { error: err?.message || 'Internal error' });
  }
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
