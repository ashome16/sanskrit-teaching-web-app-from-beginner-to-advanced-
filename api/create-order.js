const {
  AMOUNT_PAISE,
  getSecret,
  send,
  handleOptions,
  readJson,
  rzpPost,
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

    const receipt = `ednet_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`.slice(0, 40);
    const { ok, status, data } = await rzpPost('/orders', {
      amount: AMOUNT_PAISE,
      currency: 'INR',
      receipt,
      notes: {
        userId: typeof body.userId === 'string' ? body.userId.slice(0, 120) : '',
        email: typeof body.email === 'string' ? body.email.slice(0, 200) : '',
        product: 'all_access_one_time_pass',
      },
    });

    if (!ok) {
      return send(res, status >= 400 && status < 600 ? status : 502, {
        error: 'Failed to create order',
        details: data?.error?.description || data?.error || data,
      });
    }
    if (!data.id) {
      return send(res, 502, { error: 'Razorpay response missing order id' });
    }

    return send(res, 200, {
      orderId: data.id,
      amount: data.amount ?? AMOUNT_PAISE,
      currency: data.currency || 'INR',
    });
  } catch (err) {
    return send(res, 500, { error: err?.message || 'Internal error' });
  }
};
