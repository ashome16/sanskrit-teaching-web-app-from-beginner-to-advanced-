/**
 * Razorpay Standard Checkout helpers (frontend — Key ID only, never Key Secret).
 *
 * Checkout mode (switchable):
 *   VITE_RAZORPAY_CHECKOUT_MODE=order         → one-time ₹200 (DEFAULT, recommended)
 *   VITE_RAZORPAY_CHECKOUT_MODE=subscription  → recurring plan scaffolding (autopay)
 */

export type RazorpayCheckoutMode = 'order' | 'subscription';

export const RAZORPAY_KEY_ID =
  (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) || 'rzp_test_TemQRGluBPDb0O';

export const RAZORPAY_PLAN_ID =
  (import.meta.env.VITE_RAZORPAY_PLAN_ID as string | undefined) || 'plan_TemGs0Xzlbqpu6';

/** Public HTTPS API (Cloudflare Worker) or local `scripts/razorpay-subscribe-server.mjs`. */
export const RAZORPAY_API_URL = (
  (import.meta.env.VITE_RAZORPAY_API_URL as string | undefined) || ''
).replace(/\/$/, '');

/** First billing for subscription mode: 2026-10-06T00:00:00+05:30 IST */
export const RAZORPAY_START_AT = 1791225000;

export const RAZORPAY_AMOUNT_PAISE = 20000;
export const RAZORPAY_AMOUNT_INR = 200;

/**
 * Primary CTA mode. Defaults to one-time order — Indians often prefer no autopay.
 * Flip to `subscription` only after an explicit product decision.
 */
export const RAZORPAY_CHECKOUT_MODE: RazorpayCheckoutMode = (
  (import.meta.env.VITE_RAZORPAY_CHECKOUT_MODE as string | undefined) || 'order'
).toLowerCase() === 'subscription'
  ? 'subscription'
  : 'order';

export const RAZORPAY_TRUST_NOTICE_ORDER =
  'You pay ₹200 once. No auto-debit. Secured by Razorpay.';

export const RAZORPAY_TRUST_NOTICE_SUBSCRIPTION =
  'First billing of ₹200 will occur automatically on 6 Oct 2026. Secured by Razorpay. Cancel anytime before then.';

/** Trust copy next to the primary CTA — follows checkout mode. */
export const RAZORPAY_TRUST_NOTICE =
  RAZORPAY_CHECKOUT_MODE === 'subscription'
    ? RAZORPAY_TRUST_NOTICE_SUBSCRIPTION
    : RAZORPAY_TRUST_NOTICE_ORDER;

export const RAZORPAY_CTA_LABEL =
  RAZORPAY_CHECKOUT_MODE === 'subscription'
    ? '🔒 Subscribe with Razorpay · ₹200/mo'
    : '🔒 Pay ₹200 with Razorpay';

export const RAZORPAY_THEME_COLOR = '#273b35';

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance;
  }
}

export interface RazorpayOrderSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpaySubscriptionSuccessResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: unknown) => void) => void;
}

interface RazorpayCheckoutOptions {
  key: string;
  amount?: number;
  currency?: string;
  order_id?: string;
  subscription_id?: string;
  name: string;
  description: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayOrderSuccessResponse & Partial<RazorpaySubscriptionSuccessResponse>) => void;
  modal?: { ondismiss?: () => void };
}

let checkoutScriptPromise: Promise<void> | null = null;

export function loadRazorpayCheckoutScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Razorpay requires a browser'));
  }
  if (window.Razorpay) return Promise.resolve();
  if (checkoutScriptPromise) return checkoutScriptPromise;

  checkoutScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-razorpay-checkout="1"]'
    );
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load Razorpay checkout.js'))
      );
      if (window.Razorpay) resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.dataset.razorpayCheckout = '1';
    script.onload = () => resolve();
    script.onerror = () => {
      checkoutScriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout.js'));
    };
    document.body.appendChild(script);
  });

  return checkoutScriptPromise;
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  if (!RAZORPAY_API_URL) {
    throw new Error(
      'Razorpay API URL is not configured. Set VITE_RAZORPAY_API_URL to your Worker or local server.'
    );
  }
  const res = await fetch(`${RAZORPAY_API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & {
    error?: string;
    details?: unknown;
    ok?: boolean;
  };
  if (!res.ok) {
    const detail =
      typeof data.details === 'string'
        ? data.details
        : data.error || `HTTP ${res.status}`;
    throw new Error(String(detail));
  }
  return data;
}

export async function createRazorpayOrder(params: {
  userId?: string;
  email?: string;
}): Promise<{ orderId: string; amount: number; currency: string }> {
  const data = await apiPost<{
    orderId?: string;
    amount?: number;
    currency?: string;
  }>('/create-order', {
    userId: params.userId || '',
    email: params.email || '',
  });
  if (!data.orderId) throw new Error('Razorpay response missing order id');
  return {
    orderId: data.orderId,
    amount: data.amount ?? RAZORPAY_AMOUNT_PAISE,
    currency: data.currency || 'INR',
  };
}

export async function verifyRazorpayOrder(
  payload: RazorpayOrderSuccessResponse
): Promise<boolean> {
  const data = await apiPost<{ ok?: boolean }>('/verify', payload);
  if (!data.ok) throw new Error('Signature verification failed');
  return true;
}

export async function createRazorpaySubscription(params: {
  userId?: string;
  email?: string;
}): Promise<{ subscriptionId: string }> {
  const data = await apiPost<{ subscriptionId?: string }>('/create-subscription', {
    userId: params.userId || '',
    email: params.email || '',
  });
  if (!data.subscriptionId) throw new Error('Razorpay response missing subscription id');
  return { subscriptionId: data.subscriptionId };
}

export async function verifyRazorpaySubscription(
  payload: RazorpaySubscriptionSuccessResponse
): Promise<boolean> {
  const data = await apiPost<{ ok?: boolean }>('/verify-subscription', payload);
  if (!data.ok) throw new Error('Signature verification failed');
  return true;
}

export async function openRazorpayOrderCheckout(args: {
  orderId: string;
  amount: number;
  currency?: string;
  name?: string;
  email?: string;
  onSuccess: (response: RazorpayOrderSuccessResponse) => void | Promise<void>;
  onDismiss?: () => void;
}): Promise<void> {
  await loadRazorpayCheckoutScript();
  if (!window.Razorpay) throw new Error('Razorpay SDK failed to initialize');

  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY_ID,
    amount: args.amount,
    currency: args.currency || 'INR',
    order_id: args.orderId,
    name: 'EdNet Learn Gurukul',
    description: 'All-Access Monthly Pass',
    prefill: {
      name: args.name || '',
      email: args.email || '',
    },
    theme: { color: RAZORPAY_THEME_COLOR },
    handler: (response) => {
      void Promise.resolve(
        args.onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        })
      );
    },
    modal: { ondismiss: () => args.onDismiss?.() },
  });
  rzp.open();
}

export async function openRazorpaySubscriptionCheckout(args: {
  subscriptionId: string;
  name?: string;
  email?: string;
  onSuccess: (response: RazorpaySubscriptionSuccessResponse) => void | Promise<void>;
  onDismiss?: () => void;
}): Promise<void> {
  await loadRazorpayCheckoutScript();
  if (!window.Razorpay) throw new Error('Razorpay SDK failed to initialize');

  const rzp = new window.Razorpay({
    key: RAZORPAY_KEY_ID,
    subscription_id: args.subscriptionId,
    name: 'EdNet Learn Gurukul',
    description: 'All-Access Monthly Pass',
    prefill: {
      name: args.name || '',
      email: args.email || '',
    },
    theme: { color: RAZORPAY_THEME_COLOR },
    handler: (response) => {
      void Promise.resolve(
        args.onSuccess({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_subscription_id: String(response.razorpay_subscription_id || ''),
          razorpay_signature: response.razorpay_signature,
        })
      );
    },
    modal: { ondismiss: () => args.onDismiss?.() },
  });
  rzp.open();
}
