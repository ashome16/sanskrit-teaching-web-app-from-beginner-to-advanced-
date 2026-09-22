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
    };

    if (!res.ok || !data.ok) {
      const message =
        (typeof data.error === 'string' && data.error) ||
        (typeof data.details === 'string' && data.details) ||
        `Reset email failed (HTTP ${res.status})`;
      console.error('Password-reset email send failed:', message);
      return { configured: true, error: message };
    }

    return { configured: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Email send failed';
    console.error('Password-reset email send failed:', message);
    return { configured: true, error: message };
  }
}
