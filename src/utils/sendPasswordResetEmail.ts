/**
 * Password-reset email via Vercel serverless + Resend.
 * Client generates the OTP and keeps it in activeOtpSession; the API only sends mail.
 * Never display OTP on screen; API must not echo it back.
 *
 * Config:
 *   VITE_RESET_API_URL — optional base URL (no trailing slash). Empty → same-origin `/api/send-reset-otp`.
 *   VITE_RESET_EMAIL_ENABLED — set to "false" to force-disable the reset email path.
 *
 * Local `npm run dev` without a proxy to the serverless function is not configured
 * unless VITE_RESET_API_URL points at a running API (e.g. vercel dev / production).
 */

function getResetEndpoint(): string {
  const base = (import.meta.env.VITE_RESET_API_URL || '').trim().replace(/\/$/, '');
  if (!base) return '/api/send-reset-otp';
  if (base.endsWith('/api/send-reset-otp')) return base;
  return `${base}/api/send-reset-otp`;
}

/** True when the app should attempt Resend-backed reset emails. */
export function isResetEmailConfigured(): boolean {
  if (import.meta.env.VITE_RESET_EMAIL_ENABLED === 'false') return false;
  const customUrl = (import.meta.env.VITE_RESET_API_URL || '').trim();
  if (customUrl) return true;
  // Plain Vite dev has no /api serverless — require explicit URL.
  if (import.meta.env.DEV) return false;
  // Production / preview on Vercel: same-origin /api/send-reset-otp.
  return true;
}

const FALLBACK_CARE =
  'Contact care@ednetlearn.in, or ask an admin to use Admin → Students → Reset PW.';

/** Map Resend / API failure into a safe user-facing message (never includes OTP). */
export function formatResetEmailUserError(opts: {
  error?: string;
  details?: string;
  hint?: string;
  restriction?: string;
  httpStatus?: number;
}): string {
  const details = (opts.details || '').trim();
  const hint = (opts.hint || '').trim();
  const lower = details.toLowerCase();

  const isRestriction =
    opts.restriction === 'domain_or_testing' ||
    lower.includes('domain is not verified') ||
    lower.includes('only send testing emails') ||
    lower.includes('testing email') ||
    lower.includes('verify a domain') ||
    lower.includes('verify your domain') ||
    lower.includes('add and verify') ||
    lower.includes('use our testing email');

  if (isRestriction) {
    return (
      (hint ||
        'Password reset email could not be delivered yet. Until the ednetlearn.in domain is verified in Resend, email may only work for the Resend account owner\'s address.') +
      ' ' +
      FALLBACK_CARE
    );
  }

  // Prefer Resend details when present; generic "Failed to send reset email" alone is not useful.
  if (details && details.toLowerCase() !== 'failed to send reset email') {
    const base = opts.error && opts.error !== details ? `${opts.error}: ${details}` : details;
    return `${base} ${FALLBACK_CARE}`;
  }

  if (opts.error && opts.error.trim()) {
    return `${opts.error.trim()} ${FALLBACK_CARE}`;
  }

  if (opts.httpStatus) {
    return `Reset email failed (HTTP ${opts.httpStatus}). ${FALLBACK_CARE}`;
  }

  return `Could not send the reset email. Please try again, or ${FALLBACK_CARE.toLowerCase()}`;
}

export async function sendPasswordResetEmail(
  email: string,
  otp: string,
  toName?: string
): Promise<{ configured: boolean; error?: string }> {
  if (!isResetEmailConfigured()) {
    return { configured: false };
  }

  const endpoint = getResetEndpoint();

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        otp,
        ...(toName ? { toName } : {}),
      }),
    });

    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      details?: string;
      hint?: string;
      restriction?: string;
    };

    if (!res.ok || !data.ok) {
      const message = formatResetEmailUserError({
        error: typeof data.error === 'string' ? data.error : undefined,
        details: typeof data.details === 'string' ? data.details : undefined,
        hint: typeof data.hint === 'string' ? data.hint : undefined,
        restriction: typeof data.restriction === 'string' ? data.restriction : undefined,
        httpStatus: res.status,
      });
      // Log details for debugging; never log OTP.
      console.error('Password-reset email send failed:', data.details || data.error || res.status);
      return { configured: true, error: message };
    }

    return { configured: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Email send failed';
    console.error('Password-reset email send failed:', message);
    return {
      configured: true,
      error: formatResetEmailUserError({ error: message }),
    };
  }
}
