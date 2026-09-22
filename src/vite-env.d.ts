/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional base URL for reset OTP API (no trailing slash). Empty → same-origin `/api/send-reset-otp`. */
  readonly VITE_RESET_API_URL?: string;
  /** Set to "false" to force-disable password-reset emails. */
  readonly VITE_RESET_EMAIL_ENABLED?: string;
  /** @deprecated EmailJS no longer used for password reset */
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  /** @deprecated */
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  /** @deprecated */
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
  readonly VITE_RAZORPAY_KEY_ID?: string;
  readonly VITE_RAZORPAY_PLAN_ID?: string;
  /** `order` (default, one-time) or `subscription` (scaffolding only) */
  readonly VITE_RAZORPAY_CHECKOUT_MODE?: string;
  /** Public Worker / local API base URL (no trailing slash). Never put Key Secret here. */
  readonly VITE_RAZORPAY_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
