import emailjs from '@emailjs/browser';

/**
 * Free-tier EmailJS + Zoho Mail SMTP (ednetlearn.in).
 * Requires VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.
 * Template should include {{to_email}} and {{otp_code}} (and optionally {{to_name}}).
 * Never invent credentials — if env vars are missing, returns { configured: false }.
 */
export async function sendPasswordResetEmail(
  email: string,
  otp: string
): Promise<{ configured: boolean; error?: string }> {
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();

  if (!serviceId || !templateId || !publicKey) {
    return { configured: false };
  }

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        to_email: email,
        otp_code: otp,
      },
      { publicKey }
    );
    return { configured: true };
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'text' in err
        ? String((err as { text?: string }).text)
        : err instanceof Error
          ? err.message
          : 'Email send failed';
    console.error('EmailJS password-reset send failed:', message);
    return { configured: true, error: message };
  }
}

export function isEmailJsConfigured(): boolean {
  const serviceId = (import.meta.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const templateId = (import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '').trim();
  const publicKey = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '').trim();
  return Boolean(serviceId && templateId && publicKey);
}
