/**
 * Cloudflare Worker — Razorpay Standard Checkout
 *
 * Primary (recommended): one-time order
 *   POST /create-order         → { orderId, amount, currency }
 *   POST /verify               → { ok: true }  (order_id|payment_id HMAC)
 *
 * Optional scaffolding (autopay / subscriptions) — enable via checkout mode on frontend:
 *   POST /create-subscription  → { subscriptionId }
 *   POST /verify-subscription  → { ok: true }  (payment_id|subscription_id HMAC)
 *
 * Secrets: RAZORPAY_KEY_SECRET (wrangler secret)
 * Vars:    RAZORPAY_KEY_ID, RAZORPAY_PLAN_ID, RAZORPAY_TOTAL_COUNT, RAZORPAY_START_AT,
 *          RAZORPAY_AMOUNT_PAISE (default 20000 = ₹200)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

function basicAuthHeader(keyId, keySecret) {
  const token = btoa(`${keyId}:${keySecret}`);
  return `Basic ${token}`;
}

async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
      return json({
        ok: true,
        service: 'razorpay-subscribe',
        secretConfigured: Boolean(env.RAZORPAY_KEY_SECRET),
        supports: ['create-order', 'verify', 'create-subscription', 'verify-subscription'],
      });
    }

    const keyId = env.RAZORPAY_KEY_ID || 'rzp_test_TemQRGluBPDb0O';
    const keySecret = env.RAZORPAY_KEY_SECRET;
    const planId = env.RAZORPAY_PLAN_ID || 'plan_TemGs0Xzlbqpu6';
    const totalCount = Number(env.RAZORPAY_TOTAL_COUNT || 12);
    const startAt = Number(env.RAZORPAY_START_AT || 1791225000);
    const amountPaise = Number(env.RAZORPAY_AMOUNT_PAISE || 20000);

    if (!keySecret) {
      return json({ error: 'Server misconfigured: RAZORPAY_KEY_SECRET missing' }, 500);
    }

    // ——— One-time order (primary recommendation) ———
    if (request.method === 'POST' && url.pathname === '/create-order') {
      let body = {};
      try {
        body = await request.json();
      } catch {
        body = {};
      }
      const userId = typeof body.userId === 'string' ? body.userId.slice(0, 120) : '';
      const email = typeof body.email === 'string' ? body.email.slice(0, 200) : '';
      const receipt = `ednet_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`.slice(0, 40);

      const payload = {
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: { userId, email, product: 'all_access_one_time_pass' },
      };

      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: basicAuthHeader(keyId, keySecret),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const rzpData = await rzpRes.json().catch(() => ({}));
      if (!rzpRes.ok) {
        return json(
          {
            error: 'Failed to create order',
            details: rzpData?.error?.description || rzpData?.error || rzpData,
          },
          rzpRes.status >= 400 && rzpRes.status < 600 ? rzpRes.status : 502
        );
      }
      if (!rzpData.id) {
        return json({ error: 'Razorpay response missing order id' }, 502);
      }

      return json({
        orderId: rzpData.id,
        amount: rzpData.amount ?? amountPaise,
        currency: rzpData.currency || 'INR',
      });
    }

    if (request.method === 'POST' && url.pathname === '/verify') {
      let body = {};
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: 'Invalid JSON' }, 400);
      }

      const orderId = body.razorpay_order_id;
      const paymentId = body.razorpay_payment_id;
      const signature = body.razorpay_signature;

      if (!orderId || !paymentId || !signature) {
        return json({ ok: false, error: 'Missing order/payment/signature' }, 400);
      }

      const expected = await hmacSha256Hex(keySecret, `${orderId}|${paymentId}`);
      if (!timingSafeEqual(expected, String(signature))) {
        return json({ ok: false, error: 'Invalid signature' }, 400);
      }
      return json({ ok: true });
    }

    // ——— Subscription scaffolding (optional / switchable) ———
    if (request.method === 'POST' && url.pathname === '/create-subscription') {
      let body = {};
      try {
        body = await request.json();
      } catch {
        body = {};
      }
      const userId = typeof body.userId === 'string' ? body.userId.slice(0, 120) : '';
      const email = typeof body.email === 'string' ? body.email.slice(0, 200) : '';

      const payload = {
        plan_id: planId,
        total_count: totalCount,
        start_at: startAt,
        customer_notify: 1,
        notes: { userId, email },
      };

      const rzpRes = await fetch('https://api.razorpay.com/v1/subscriptions', {
        method: 'POST',
        headers: {
          Authorization: basicAuthHeader(keyId, keySecret),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const rzpData = await rzpRes.json().catch(() => ({}));
      if (!rzpRes.ok) {
        return json(
          {
            error: 'Failed to create subscription',
            details: rzpData?.error?.description || rzpData?.error || rzpData,
          },
          rzpRes.status >= 400 && rzpRes.status < 600 ? rzpRes.status : 502
        );
      }
      if (!rzpData.id) {
        return json({ error: 'Razorpay response missing subscription id' }, 502);
      }
      return json({ subscriptionId: rzpData.id });
    }

    if (request.method === 'POST' && url.pathname === '/verify-subscription') {
      let body = {};
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: 'Invalid JSON' }, 400);
      }

      const paymentId = body.razorpay_payment_id;
      const subscriptionId = body.razorpay_subscription_id;
      const signature = body.razorpay_signature;

      if (!paymentId || !subscriptionId || !signature) {
        return json({ ok: false, error: 'Missing payment/subscription/signature' }, 400);
      }

      const expected = await hmacSha256Hex(keySecret, `${paymentId}|${subscriptionId}`);
      if (!timingSafeEqual(expected, String(signature))) {
        return json({ ok: false, error: 'Invalid signature' }, 400);
      }
      return json({ ok: true });
    }

    return json({ error: 'Not found' }, 404);
  },
};
