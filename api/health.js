const { getSecret, send, handleOptions } = require('./_razorpay');

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') return handleOptions(res);
  if (req.method !== 'GET') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  return send(res, 200, {
    ok: true,
    secretConfigured: Boolean(getSecret()),
    resendConfigured: Boolean((process.env.RESEND_API_KEY || '').trim()),
  });
};
