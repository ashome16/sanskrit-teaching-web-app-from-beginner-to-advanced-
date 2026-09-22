/** Emails permitted to hold admin after passcode unlock (Zoho only). */
export const ADMIN_EMAIL_ALLOWLIST = [
  'care@ednetlearn.in',
  'admin@ednetlearn.in',
] as const;

/** Case-insensitive trim match against ADMIN_EMAIL_ALLOWLIST. */
export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email || typeof email !== 'string') return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized) return false;
  return (ADMIN_EMAIL_ALLOWLIST as readonly string[]).includes(normalized);
}
