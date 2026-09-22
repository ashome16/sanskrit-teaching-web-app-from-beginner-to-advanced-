/**
 * Shared Razorpay helpers for Vercel serverless (Node).
 * Secret from process.env.RAZORPAY_KEY_SECRET only — never commit.
 */
const crypto = require('crypto');

const KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_TemQRGluBPDb0O';
const AMOUNT_PAISE = Number(process.env.RAZORPAY_AMOUNT_PAISE || 20000);

function getSecret() {
  return process.env.RAZORPAY_KEY_SECRET || '';
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

function send(res, status, body) {
  res.statusCode = status;
  const headers = {
    'Content-Type': 'application/json',
    ...corsHeaders(),
  };
  for (const [k, v] of Object.entries(headers)) {
    res.setHeader(k, v);
  }
  res.end(JSON.stringify(body));
}

function handleOptions(res) {
  res.statusCode = 204;
  for (const [k, v] of Object.entries(corsHeaders())) {
    res.setHeader(k, v);
  }
  res.end();
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
  return `Basic ${Buffer.from(`${KEY_ID}:${getSecret()}`).toString('base64')}`;
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

function verifyOrderSignature(orderId, paymentId, signature) {
  const expected = crypto
    .createHmac('sha256', getSecret())
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return timingSafeEqual(expected, signature);
}

module.exports = {
  KEY_ID,
  AMOUNT_PAISE,
  getSecret,
  send,
  handleOptions,
  readJson,
  rzpPost,
  verifyOrderSignature,
};
