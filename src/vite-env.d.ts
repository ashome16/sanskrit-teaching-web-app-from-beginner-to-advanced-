/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
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
