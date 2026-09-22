const {
  getSecret,
  send,
  handleOptions,
  readJson,
  verifyOrderSignature,
} = require('./_razorpay');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return handleOptions(res);
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  const secret = getSecret();
  if (!secret) {
    return send(res, 500, { error: 'Server misconfigured: RAZORPAY_KEY_SECRET missing' });
  }

  try {
    const body = typeof req.body === 'object' && req.body !== null
      ? req.body
      : await readJson(req);

    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      return send(res, 400, { ok: false, error: 'Missing order/payment/signature' });
    }

    if (!verifyOrderSignature(orderId, paymentId, signature)) {
      return send(res, 400, { ok: false, error: 'Invalid signature' });
    }

    return send(res, 200, { ok: true });
  } catch (err) {
    return send(res, 500, { error: err?.message || 'Internal error' });
  }
};
