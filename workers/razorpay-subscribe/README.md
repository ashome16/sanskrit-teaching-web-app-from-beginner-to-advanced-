# Razorpay API (Cloudflare Worker) — one-time Checkout

Primary flow for EdNet Learn Gurukul: **one-time ₹200 order** (no autopay / mandate).

| Method | Path | Body | Response |
|--------|------|------|----------|
| `POST` | `/create-order` | `{ userId?, email? }` | `{ orderId, amount, currency }` |
| `POST` | `/verify` | `{ razorpay_order_id, razorpay_payment_id, razorpay_signature }` | `{ ok: true }` |
| `GET`  | `/health` | — | `{ ok, secretConfigured }` |

Optional scaffolding (not used by main CTA): `/create-subscription`, `/verify-subscription`.

## Public config (`wrangler.toml` `[vars]`)

- Key ID: `rzp_test_TemQRGluBPDb0O`
- Amount: `20000` paise (₹200)
- Plan ID kept for optional subscription scaffolding only

## Deploy

```bash
cd workers/razorpay-subscribe
npm install
# Needs Node ≥ 22 for wrangler 4
npx wrangler login
npx wrangler secret put RAZORPAY_KEY_SECRET
npx wrangler deploy
```

Set in repo `.env.production`:

```
VITE_RAZORPAY_API_URL=https://razorpay-subscribe.<account>.workers.dev
VITE_RAZORPAY_CHECKOUT_MODE=order
```

Rebuild Pages after setting the URL.

## Local

```bash
export RAZORPAY_KEY_SECRET='…'   # do not echo
node scripts/razorpay-subscribe-server.mjs
# → http://127.0.0.1:8787
```

## Security

Never put Key Secret in `src/`, committed `.env`, or the GitHub Pages bundle.
