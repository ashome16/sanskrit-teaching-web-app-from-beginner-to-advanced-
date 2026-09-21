#!/usr/bin/env node
/**
 * Local Razorpay API for Kalpana's testing (order + subscription scaffolding).
 * Uses process.env.RAZORPAY_KEY_SECRET (never logged — status + length only).
 *
 *   node scripts/razorpay-subscribe-server.mjs
 *   # → http://127.0.0.1:8787
 *
 * Routes:
 *   POST /create-order          → { orderId, amount, currency }
 *   POST /verify                → { ok }  (order_id|payment_id)
 *   POST /create-subscription   → { subscriptionId }
 *   POST /verify-subscription   → { ok }  (payment_id|subscription_id)
 */

import http from 'node:http';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '127.0.0.1';

const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TemQRGluBPDb0O';
const PLAN_ID = process.env.RAZORPAY_PLAN_ID || 'plan_TemGs0Xzlbqpu6';
const TOTAL_COUNT = Number(process.env.RAZORPAY_TOTAL_COUNT || 12);
const START_AT = Number(process.env.RAZORPAY_START_AT || 1791225000);
const AMOUNT_PAISE = Number(process.env.RAZORPAY_AMOUNT_PAISE || 20000);
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || '';

const secretStatus = KEY_SECRET ? `set (length=${KEY_SECRET.length})` : 'missing';

function send(res, status, body) {
  const raw = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Length': Buffer.byteLength(raw),
  });
  res.end(raw);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function timingSafeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

function authHeader() {
  return `Basic ${Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64')}`;
}

async function rzpPost(path, payload) {
  const rzpRes = await fetch(`https://api.razorpay.com/v1${path}`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await rzpRes.json().catch(() => ({}));
  return { ok: rzpRes.ok, status: rzpRes.status, data };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    return res.end();
  }

  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/health')) {
    return send(res, 200, {
      ok: true,
      service: 'razorpay-subscribe-local',
      secretConfigured: Boolean(KEY_SECRET),
      supports: ['create-order', 'verify', 'create-subscription', 'verify-subscription'],
    });
  }

  if (!KEY_SECRET) {
    return send(res, 500, { error: 'Server misconfigured: RAZORPAY_KEY_SECRET missing' });
  }

  try {
    if (req.method === 'POST' && url.pathname === '/create-order') {
      const body = await readJson(req);
      const receipt = `ednet_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`.slice(0, 40);
      const { ok, status, data } = await rzpPost('/orders', {
        amount: AMOUNT_PAISE,
        currency: 'INR',
        receipt,
        notes: {
          userId: typeof body.userId === 'string' ? body.userId.slice(0, 120) : '',
          email: typeof body.email === 'string' ? body.email.slice(0, 200) : '',
          product: 'all_access_monthly_pass',
        },
      });
      if (!ok) {
        return send(res, status >= 400 && status < 600 ? status : 502, {
          error: 'Failed to create order',
          details: data?.error?.description || data?.error || data,
        });
      }
      if (!data.id) return send(res, 502, { error: 'Razorpay response missing order id' });
      return send(res, 200, {
        orderId: data.id,
        amount: data.amount ?? AMOUNT_PAISE,
        currency: data.currency || 'INR',
      });
    }

    if (req.method === 'POST' && url.pathname === '/verify') {
      const body = await readJson(req);
      const orderId = body.razorpay_order_id;
      const paymentId = body.razorpay_payment_id;
      const signature = body.razorpay_signature;
      if (!orderId || !paymentId || !signature) {
        return send(res, 400, { ok: false, error: 'Missing order/payment/signature' });
      }
      const expected = crypto
        .createHmac('sha256', KEY_SECRET)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
      if (!timingSafeEqual(expected, signature)) {
        return send(res, 400, { ok: false, error: 'Invalid signature' });
      }
      return send(res, 200, { ok: true });
    }

    if (req.method === 'POST' && url.pathname === '/create-subscription') {
      const body = await readJson(req);
      const { ok, status, data } = await rzpPost('/subscriptions', {
        plan_id: PLAN_ID,
        total_count: TOTAL_COUNT,
        start_at: START_AT,
        customer_notify: 1,
        notes: {
          userId: typeof body.userId === 'string' ? body.userId.slice(0, 120) : '',
          email: typeof body.email === 'string' ? body.email.slice(0, 200) : '',
        },
      });
      if (!ok) {
        return send(res, status >= 400 && status < 600 ? status : 502, {
          error: 'Failed to create subscription',
          details: data?.error?.description || data?.error || data,
        });
      }
      if (!data.id) return send(res, 502, { error: 'Razorpay response missing subscription id' });
      return send(res, 200, { subscriptionId: data.id });
    }

    if (req.method === 'POST' && url.pathname === '/verify-subscription') {
      const body = await readJson(req);
      const paymentId = body.razorpay_payment_id;
      const subscriptionId = body.razorpay_subscription_id;
      const signature = body.razorpay_signature;
      if (!paymentId || !subscriptionId || !signature) {
        return send(res, 400, { ok: false, error: 'Missing payment/subscription/signature' });
      }
      const expected = crypto
        .createHmac('sha256', KEY_SECRET)
        .update(`${paymentId}|${subscriptionId}`)
        .digest('hex');
      if (!timingSafeEqual(expected, signature)) {
        return send(res, 400, { ok: false, error: 'Invalid signature' });
      }
      return send(res, 200, { ok: true });
    }

    return send(res, 404, { error: 'Not found' });
  } catch (err) {
    return send(res, 500, { error: err?.message || 'Internal error' });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[razorpay-api] http://${HOST}:${PORT}`);
  console.log(`[razorpay-api] RAZORPAY_KEY_SECRET: ${secretStatus}`);
  console.log(`[razorpay-api] amount_paise=${AMOUNT_PAISE} plan=${PLAN_ID} start_at=${START_AT}`);
});
