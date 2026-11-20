import React from 'react';

/**
 * Small SVG tokens for Vijñāna Lab games. Used in place of emoji icons.
 * Names are specimen / zone / station ids (and a few shared aliases).
 */
interface Props {
  name: string;
  size?: number;
  color?: string;
  title?: string;
  className?: string;
}

const S = (children: React.ReactNode, color: string, size: number, title?: string, className?: string, name?: string) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    role="img"
    aria-hidden={title ? undefined : true}
    aria-label={title}
    data-token={name}
    style={{ color }}
  >
    {title ? <title>{title}</title> : null}
    <g>{children}</g>
  </svg>
);

const PATHS: Record<string, { color: string; node: React.ReactNode }> = {
  // ---- Chaturyoni zones ----
  jarayuja: { color: '#be123c', node: <><ellipse cx="16" cy="18" rx="10" ry="8" opacity="0.25" /><path d="M8 18c0-7 4.5-12 8-12s8 5 8 12c0 4-3 8-8 9-5-1-8-5-8-9z" opacity="0.9" /><ellipse cx="16" cy="18" rx="4" ry="5" fill="#fff" opacity="0.85" /></> },
  andaja: { color: '#b45309', node: <><ellipse cx="16" cy="17" rx="7" ry="9" /><ellipse cx="14" cy="13" rx="2.2" ry="3" fill="#fff" opacity="0.7" /></> },
  svedaja: { color: '#0f766e', node: <><path d="M16 6c0 0 8 10 8 16a8 8 0 1 1-16 0c0-6 8-16 8-16z" /><circle cx="14" cy="18" r="2" fill="#fff" opacity="0.55" /></> },
  udbhijja: { color: '#15803d', node: <><path d="M16 28V14" stroke="#15803d" strokeWidth="2.2" fill="none" strokeLinecap="round" /><path d="M16 20c-6-1-8-7-8-12 5 1 8 5 8 12z" /><path d="M16 18c6-1 8-7 8-11-5 1-8 5-8 11z" /><circle cx="16" cy="11" r="2.2" fill="#86efac" /></> },
  jangama: { color: '#c2410c', node: <><path d="M8 20l4-8 4 5 4-9 4 12" fill="none" stroke="#c2410c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="8" cy="20" r="1.8" /><circle cx="24" cy="20" r="1.8" /></> },
  sthavara: { color: '#047857', node: <><rect x="14.2" y="16" width="3.6" height="11" rx="1" /><path d="M16 6c-6 3-8 9-8 12 5-1 8-4 8-12z" /><path d="M16 6c6 3 8 9 8 12-5-1-8-4-8-12z" /><path d="M8 28h16" stroke="#047857" strokeWidth="2" fill="none" strokeLinecap="round" /></> },
  vanaspati: { color: '#15803d', node: <><rect x="14.5" y="16" width="3" height="12" rx="1" /><circle cx="16" cy="12" r="8" /><circle cx="11" cy="16" r="4.5" /><circle cx="21" cy="16" r="4.5" /></> },
  oshadhi: { color: '#b45309', node: <><path d="M16 28V10" stroke="#b45309" strokeWidth="2" fill="none" /><path d="M16 12l-6-4 1 5zM16 12l6-4-1 5zM16 18l-6-3 1 4zM16 18l6-3-1 4z" /><circle cx="16" cy="8" r="2.4" /></> },
  pratana: { color: '#0f766e', node: <><path d="M6 24c6-8 6-8 10-14 4 6 4 6 10 14" fill="none" stroke="#0f766e" strokeWidth="2.2" strokeLinecap="round" /><circle cx="16" cy="8" r="3" /><path d="M12 16c3 0 4-4 4-4M20 16c-3 0-4-4-4-4" fill="none" stroke="#0f766e" strokeWidth="1.6" /></> },
  trina: { color: '#c2410c', node: <><path d="M10 28c0-12 2-20 2-20M16 28c0-16 0-22 0-22M22 28c0-12-2-20-2-20" fill="none" stroke="#c2410c" strokeWidth="2.1" strokeLinecap="round" /></> },

  // ---- animals / plants ----
  deer: { color: '#92400e', node: <><ellipse cx="18" cy="20" rx="8" ry="5.5" /><circle cx="10" cy="16" r="4" /><path d="M8 13l-2-6 4 3M12 13l3-7 1 5" fill="none" stroke="#92400e" strokeWidth="1.8" strokeLinecap="round" /><circle cx="8.5" cy="15.2" r="0.8" fill="#fff" /></> },
  cow: { color: '#78716c', node: <><ellipse cx="18" cy="20" rx="9" ry="6" /><circle cx="9" cy="17" r="4.2" /><rect x="16" y="24" width="2.2" height="5" rx="1" /><rect x="22" y="24" width="2.2" height="5" rx="1" /><path d="M6 13l-2-4M12 13l2-4" fill="none" stroke="#78716c" strokeWidth="1.7" /><circle cx="7.8" cy="16.4" r="0.8" fill="#1e293b" /></> },
  human: { color: '#0369a1', node: <><circle cx="16" cy="9" r="4.2" /><path d="M8 28c1-8 3-12 8-12s7 4 8 12" /></> },
  swan: { color: '#0369a1', node: <><path d="M6 22c4-2 8-2 12 0 4 2 6 2 8-1-2 6-8 8-14 7-5-1-8-3-6-6z" /><path d="M8 18c0-8 6-10 8-4 1-1 3-2 5-1" fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" /><circle cx="8" cy="14" r="1" fill="#0f172a" /></> },
  cobra: { color: '#15803d', node: <><path d="M10 28c0-10 12-8 12-16 0-5-4-8-8-6-3 1-4 4-2 6 3 3 10 2 10 8 0 6-6 8-12 8z" /><path d="M8 10c-3 2-3 6 0 7 2 0 3-2 3-3.5S9.5 9 8 10z" /><circle cx="7.2" cy="12.2" r="0.7" fill="#fff" /></> },
  fish: { color: '#0369a1', node: <><ellipse cx="15" cy="16" rx="9" ry="6" /><path d="M24 16l6-5v10z" /><circle cx="10" cy="14.5" r="1.2" fill="#fff" /><circle cx="10.2" cy="14.5" r="0.6" fill="#0f172a" /></> },
  tortoise: { color: '#3f6212', node: <><ellipse cx="16" cy="17" rx="10" ry="7" /><ellipse cx="16" cy="17" rx="6" ry="4" fill="#a3e635" opacity="0.35" /><circle cx="6" cy="16" r="2.3" /><circle cx="26" cy="16" r="2" /><circle cx="11" cy="24" r="1.8" /><circle cx="21" cy="24" r="1.8" /></> },
  mosquito: { color: '#0f766e', node: <><ellipse cx="16" cy="17" rx="3.5" ry="5" /><path d="M16 12V6M8 14l8 3 8-3M8 22l8-3 8 3M16 22v6" fill="none" stroke="#0f766e" strokeWidth="1.6" strokeLinecap="round" /><circle cx="16" cy="10" r="1.5" /></> },
  fly: { color: '#334155', node: <><ellipse cx="16" cy="18" rx="4" ry="5.5" /><ellipse cx="10" cy="16" rx="5" ry="3" opacity="0.45" /><ellipse cx="22" cy="16" rx="5" ry="3" opacity="0.45" /><circle cx="16" cy="12" r="2" /></> },
  lotus: { color: '#be185d', node: <><circle cx="16" cy="18" r="3" /><path d="M16 8c-2 6 0 8 0 8s2-2 0-8zM8 14c6 4 8 4 8 4s-2-2-8-4zM24 14c-6 4-8 4-8 4s2-2 8-4zM10 24c5-5 6-6 6-6s0 2-6 6zM22 24c-5-5-6-6-6-6s0 2 6 6z" /></> },
  banyan: { color: '#166534', node: <><rect x="14.5" y="14" width="3" height="14" /><circle cx="16" cy="11" r="7.5" /><path d="M12 20v8M20 18v10" stroke="#166534" strokeWidth="1.5" fill="none" /></> },
  rice: { color: '#a16207', node: <><path d="M16 28V8" stroke="#a16207" strokeWidth="2" fill="none" /><path d="M16 10l-5-3 1 4zM16 10l5-3-1 4zM16 16l-5-3 1 4zM16 16l5-3-1 4zM16 21l-4-2 1 3zM16 21l4-2-1 3z" /></> },
  frog: { color: '#15803d', node: <><ellipse cx="16" cy="20" rx="9" ry="6" /><circle cx="11" cy="14" r="3.2" /><circle cx="21" cy="14" r="3.2" /><circle cx="11" cy="13.5" r="1" fill="#052e16" /><circle cx="21" cy="13.5" r="1" fill="#052e16" /></> },
  peafowl: { color: '#0f766e', node: <><path d="M16 26c-8-2-10-12-4-18 8 2 10 8 4 18z" opacity="0.55" /><ellipse cx="20" cy="18" rx="5" ry="4" /><path d="M24 16l5-4" stroke="#0f766e" strokeWidth="1.7" fill="none" /><circle cx="26" cy="10" r="2" /></> },
  elephant: { color: '#57534e', node: <><ellipse cx="17" cy="20" rx="9" ry="6.5" /><circle cx="8" cy="16" r="5" /><path d="M5 18c-2 4-2 8 1 10" fill="none" stroke="#57534e" strokeWidth="2.2" strokeLinecap="round" /><rect x="12" y="25" width="2.2" height="5" rx="1" /><rect x="21" y="25" width="2.2" height="5" rx="1" /></> },
  bee: { color: '#a16207', node: <><ellipse cx="16" cy="18" rx="6" ry="4.5" /><rect x="12" y="15" width="2" height="6" fill="#0f172a" /><rect x="18" y="15" width="2" height="6" fill="#0f172a" /><ellipse cx="10" cy="14" rx="4" ry="2.4" opacity="0.4" /><ellipse cx="22" cy="14" rx="4" ry="2.4" opacity="0.4" /></> },
  octopus: { color: '#7e22ce', node: <><circle cx="16" cy="13" r="6.5" /><path d="M10 18c-2 5-4 9-2 10M13 19c0 6-1 10 1 10M16 19c0 7 0 10 0 10M19 19c0 6 1 10-1 10M22 18c2 5 4 9 2 10" fill="none" stroke="#7e22ce" strokeWidth="1.8" strokeLinecap="round" /><circle cx="13.5" cy="12" r="1.1" fill="#fff" /><circle cx="18.5" cy="12" r="1.1" fill="#fff" /></> },
  coral: { color: '#be123c', node: <><path d="M16 28V14M16 20l-7-8M16 18l7-7M16 14l-4-6M16 14l4-5" fill="none" stroke="#be123c" strokeWidth="2.3" strokeLinecap="round" /><circle cx="9" cy="11" r="2" /><circle cx="23" cy="12" r="2" /><circle cx="12" cy="7" r="1.8" /><circle cx="20" cy="8" r="1.8" /></> },
  mushroom: { color: '#9a3412', node: <><path d="M8 16c0-8 16-8 16 0H8z" /><rect x="13.5" y="16" width="5" height="10" rx="1.5" fill="#fef3c7" /><circle cx="12" cy="12" r="1.4" fill="#fef3c7" /><circle cx="18" cy="11" r="1.2" fill="#fef3c7" /></> },
  bacteria: { color: '#0f766e', node: <><ellipse cx="16" cy="16" rx="11" ry="6" /><circle cx="12" cy="15" r="1.3" fill="#ccfbf1" /><circle cx="17" cy="17" r="1.3" fill="#ccfbf1" /><circle cx="21" cy="15" r="1.1" fill="#ccfbf1" /></> },
  archaea: { color: '#b45309', node: <><path d="M8 26c2-10 4-16 8-20 4 4 6 10 8 20" fill="none" stroke="#b45309" strokeWidth="2.2" /><circle cx="12" cy="18" r="2" /><circle cx="20" cy="16" r="2" /><circle cx="16" cy="12" r="1.6" /></> },
  udumbara: { color: '#166534', node: <><rect x="14.5" y="16" width="3" height="12" /><circle cx="16" cy="12" r="7" /><circle cx="16" cy="12" r="2.4" fill="#fde68a" /></> },
  ashvattha: { color: '#166534', node: <><rect x="14.5" y="16" width="3" height="12" /><path d="M16 5l9 14H7z" /></> },
  vrihi: { color: '#a16207', node: <><path d="M16 28V8" stroke="#a16207" strokeWidth="2" fill="none" /><path d="M16 10l-5-3 1 4zM16 10l5-3-1 4zM16 16l-5-3 1 4zM16 16l5-3-1 4z" /></> },
  yava: { color: '#a16207', node: <><path d="M16 28V8" stroke="#a16207" strokeWidth="2" fill="none" /><path d="M16 12l-6 0 2 3zM16 12l6 0-2 3zM16 18l-6 0 2 3zM16 18l6 0-2 3z" /></> },
  draksha: { color: '#6b21a8', node: <><circle cx="13" cy="14" r="3.2" /><circle cx="19" cy="14" r="3.2" /><circle cx="16" cy="19" r="3.2" /><path d="M16 8c0 4 2 5 4 6" fill="none" stroke="#166534" strokeWidth="1.6" /></> },
  guduchi: { color: '#15803d', node: <><path d="M8 26c8-10 6-16 16-20" fill="none" stroke="#15803d" strokeWidth="2.2" strokeLinecap="round" /><ellipse cx="14" cy="16" rx="3" ry="2" /><ellipse cx="20" cy="11" rx="3" ry="2" /></> },
  durva: { color: '#15803d', node: <><path d="M8 28c2-14 3-20 3-20M16 28c0-18 0-22 0-22M24 28c-2-14-3-20-3-20" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" /></> },
  kusha: { color: '#a16207', node: <><path d="M10 28c1-16 2-22 2-22M16 28V4M22 28c-1-16-2-22-2-22" fill="none" stroke="#a16207" strokeWidth="2" strokeLinecap="round" /></> },

  // ---- Paramāṇu stations / bhutas ----
  akasa_sutra: { color: '#b45309', node: <><path d="M10 12h12l-1.5 14H11.5z" /><ellipse cx="16" cy="11" rx="7" ry="3.2" /></> },
  guna_matrix: { color: '#7c3aed', node: <><rect x="7" y="7" width="18" height="18" rx="3" fill="none" stroke="#7c3aed" strokeWidth="2" /><circle cx="12" cy="12" r="2.2" /><circle cx="20" cy="12" r="2.2" /><circle cx="12" cy="20" r="2.2" /><circle cx="20" cy="20" r="2.2" /></> },
  pilupaka: { color: '#ea580c', node: <><path d="M16 6c6 8 8 12 8 16a8 8 0 1 1-16 0c0-4 2-8 8-16z" /><path d="M16 14c3 4 4 6 4 8a4 4 0 1 1-8 0c0-2 1-4 4-8z" fill="#fde68a" /></> },
  history: { color: '#b45309', node: <><path d="M8 6h14c2 0 3 1 3 3v18H10c-2 0-3-1-3-3V6z" /><path d="M11 12h10M11 17h8" stroke="#fef3c7" strokeWidth="1.6" /></> },
  padarthas: { color: '#0369a1', node: <><rect x="6" y="12" width="5" height="14" /><rect x="13.5" y="8" width="5" height="18" /><rect x="21" y="14" width="5" height="12" /><path d="M4 26h24" stroke="#0369a1" strokeWidth="2" /></> },
  biocosmic: { color: '#0f766e', node: <><circle cx="16" cy="16" r="10" fill="none" stroke="#0f766e" strokeWidth="2" /><path d="M10 16h12M16 10c3 3 3 9 0 12-3-3-3-9 0-12z" fill="none" stroke="#0f766e" strokeWidth="1.7" /></> },
  quiz: { color: '#b45309', node: <><circle cx="16" cy="16" r="10" fill="none" stroke="#b45309" strokeWidth="2.2" /><path d="M11 16l3.2 3.2L21 12" fill="none" stroke="#b45309" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></> },
  prthivi: { color: '#a16207', node: <><rect x="6" y="18" width="20" height="8" rx="1.5" /><path d="M6 18l10-10 10 10" /></> },
  ap: { color: '#0284c7', node: <><path d="M16 5c0 0 9 11 9 17a9 9 0 1 1-18 0c0-6 9-17 9-17z" /></> },
  tejas: { color: '#ea580c', node: <><path d="M16 4c7 9 9 13 9 18a9 9 0 1 1-18 0c0-5 2-9 9-18z" /><path d="M16 14c3 4 4 6 4 8a4 4 0 1 1-8 0c0-2 1-4 4-8z" fill="#fde68a" /></> },
  vayu: { color: '#7c3aed', node: <><path d="M6 12c6-6 14-2 18 2M6 18c7-4 14-1 18 3M8 24c5-3 10-1 16 1" fill="none" stroke="#7c3aed" strokeWidth="2.2" strokeLinecap="round" /></> },
  akasha: { color: '#0369a1', node: <><circle cx="16" cy="16" r="10" fill="none" stroke="#0369a1" strokeWidth="1.8" /><circle cx="16" cy="16" r="3" /><circle cx="22" cy="10" r="1.4" /><circle cx="10" cy="11" r="1" /></> },

  // ---- shared lab tokens ----
  sitar: { color: '#b45309', node: <><ellipse cx="11" cy="22" rx="7" ry="6" /><rect x="14" y="6" width="3.2" height="16" rx="1" /><path d="M14 7h12M14 11h10" stroke="#b45309" strokeWidth="1.5" /></> },
  lander: { color: '#b45309', node: <><rect x="11" y="10" width="10" height="10" rx="1.5" /><rect x="12" y="7" width="8" height="3" fill="#1e3a8a" /><path d="M12 20l-4 7M20 20l4 7" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" /></> },
  rover: { color: '#0369a1', node: <><rect x="8" y="14" width="16" height="7" rx="1.5" /><circle cx="12" cy="23" r="3" /><circle cx="22" cy="23" r="3" /><rect x="18" y="8" width="3" height="6" /></> },
  moon: { color: '#64748b', node: <><circle cx="16" cy="16" r="10" /><circle cx="12" cy="13" r="3" fill="#334155" opacity="0.5" /><circle cx="20" cy="18" r="2.2" fill="#334155" opacity="0.45" /></> },
  gnomon: { color: '#b45309', node: <><path d="M10 26h16L14 6z" /><path d="M14 26h14" stroke="#92400e" strokeWidth="2" /></> },
  temple: { color: '#0369a1', node: <><path d="M16 4l12 8H4z" /><rect x="7" y="12" width="18" height="14" /><rect x="14" y="18" width="4" height="8" fill="#e0f2fe" /></> },

  // ---- Round 3 shared tokens ----
  rocket: { color: '#b45309', node: <><rect x="11" y="8" width="10" height="14" rx="2" /><polygon points="11,8 16,3 21,8" /><path d="M11 22l-3 6M21 22l3 6" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" /><path d="M14 24l2 5 2-5" fill="#f97316" /></> },
  flask: { color: '#0f766e', node: <><path d="M12 4h8v6l5 14H7l5-14z" fill="none" stroke="#0f766e" strokeWidth="2" /><path d="M10 20h12" stroke="#0f766e" strokeWidth="1.6" /><circle cx="15" cy="22" r="1.4" fill="#5eead4" /></> },
  shield: { color: '#0369a1', node: <><path d="M16 4l12 5v8c0 7-6 11-12 13C10 28 4 24 4 17V9z" /><path d="M16 8v14" stroke="#e0f2fe" strokeWidth="1.6" /></> },
  spark: { color: '#d97706', node: <><path d="M16 3l2.2 8.2L26 14l-7.8 3.2L16 26l-2.2-8.8L6 14l7.8-2.8z" /></> },
  vial: { color: '#0369a1', node: <><rect x="12" y="4" width="8" height="6" rx="1" /><path d="M12 10h8l2 16H10z" /><path d="M12 20h8" stroke="#e0f2fe" strokeWidth="1.5" /></> },
  charcoal: { color: '#57534e', node: <><ellipse cx="12" cy="20" rx="6" ry="4.5" /><ellipse cx="20" cy="18" rx="7" ry="5" /><ellipse cx="16" cy="12" rx="5" ry="3.5" /></> },
  foundry: { color: '#b45309', node: <><rect x="6" y="14" width="20" height="12" /><path d="M6 14l4-8h12l4 8" /><rect x="14" y="18" width="4" height="8" fill="#fde68a" /></> },
  bamboo: { color: '#15803d', node: <><path d="M12 28V6M20 28V6" stroke="#15803d" strokeWidth="3.2" strokeLinecap="round" /><path d="M11 12h10M11 20h10" stroke="#14532d" strokeWidth="1.8" /></> },
  firework: { color: '#ea580c', node: <><circle cx="16" cy="16" r="2.4" /><path d="M16 4v6M16 22v6M4 16h6M22 16h6M7 7l4 4M21 21l4 4M25 7l-4 4M11 21l-4 4" stroke="#ea580c" strokeWidth="1.8" fill="none" strokeLinecap="round" /></> },
  tree: { color: '#15803d', node: <><rect x="14.5" y="18" width="3" height="10" fill="#78350f" /><circle cx="16" cy="14" r="8" /><circle cx="10" cy="16" r="4.5" /><circle cx="22" cy="16" r="4.5" /></> },
  dice: { color: '#0369a1', node: <><rect x="6" y="6" width="20" height="20" rx="3" fill="none" stroke="#0369a1" strokeWidth="2" /><circle cx="12" cy="12" r="1.6" /><circle cx="20" cy="12" r="1.6" /><circle cx="16" cy="16" r="1.6" /><circle cx="12" cy="20" r="1.6" /><circle cx="20" cy="20" r="1.6" /></> },
  mic: { color: '#0369a1', node: <><rect x="12" y="4" width="8" height="14" rx="4" /><path d="M10 14c0 4 2.6 7 6 7s6-3 6-7M16 21v5M12 26h8" fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round" /></> },
  wave: { color: '#0369a1', node: <><path d="M4 16c3-8 5-8 8 0s5 8 8 0 5-8 8 0" fill="none" stroke="#0369a1" strokeWidth="2.2" strokeLinecap="round" /></> },
  grid: { color: '#0369a1', node: <><rect x="5" y="5" width="22" height="22" rx="2" fill="none" stroke="#0369a1" strokeWidth="2" /><path d="M5 13h22M5 21h22M13 5v22M21 5v22" fill="none" stroke="#0369a1" strokeWidth="1.5" /></> },
  cakra: { color: '#7c3aed', node: <><circle cx="16" cy="16" r="11" fill="none" stroke="#7c3aed" strokeWidth="2" /><circle cx="16" cy="16" r="3" /><path d="M16 5v8M16 19v8M5 16h8M19 16h8M8 8l6 6M18 18l6 6M24 8l-6 6M14 18l-6 6" stroke="#7c3aed" strokeWidth="1.6" fill="none" /></> },
  drum: { color: '#b45309', node: <><ellipse cx="16" cy="10" rx="10" ry="4" /><path d="M6 10v12c0 2.2 4.5 4 10 4s10-1.8 10-4V10" fill="none" stroke="#b45309" strokeWidth="2" /><path d="M8 12l4 12M24 12l-4 12" fill="none" stroke="#b45309" strokeWidth="1.5" /></> },
  crown: { color: '#d97706', node: <><path d="M5 22l2-12 7 6 4-8 4 8 7-6 2 12z" /></> },
  coin: { color: '#d97706', node: <><circle cx="16" cy="16" r="11" fill="none" stroke="#d97706" strokeWidth="2.2" /><circle cx="16" cy="16" r="6" /></> },
  scales: { color: '#d97706', node: <><path d="M16 6v18M8 26h16" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" /><path d="M16 8l-8 8h16z" /><circle cx="8" cy="18" r="3.2" fill="none" stroke="#d97706" strokeWidth="1.6" /><circle cx="24" cy="18" r="3.2" fill="none" stroke="#d97706" strokeWidth="1.6" /></> },
  listen: { color: '#0369a1', node: <><path d="M8 12v8h5l7 5V7l-7 5H8z" /><path d="M23 12c1.4 1.2 1.4 6.8 0 8" fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinecap="round" /></> },
  sun: { color: '#d97706', node: <><circle cx="16" cy="16" r="6" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6 6l3 3M23 23l3 3M26 6l-3 3M6 26l3-3" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" /></> },
};

const ALIAS: Record<string, string> = {
  potter: 'akasa_sutra',
  flame: 'pilupaka',
  scroll: 'history',
  check: 'quiz',
  pot: 'akasa_sutra',
  speaker: 'listen',
  alchemy: 'flask',
  gunpowder: 'vial',
  wheel: 'cakra',
  lotusbandha: 'lotus',
  templetab: 'temple',
};

export const LabTokenIcon: React.FC<Props> = ({ name, size = 24, color, title, className }) => {
  const key = ALIAS[name] || name;
  const item = PATHS[key];
  if (item) return S(item.node, color || item.color, size, title, className, name);
  const letter = (name || '?').trim().charAt(0).toUpperCase() || '?';
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} role="img" aria-hidden={title ? undefined : true} aria-label={title} data-token={name}>
      {title ? <title>{title}</title> : null}
      <circle cx="16" cy="16" r="13" fill={color || '#0369a1'} />
      <text x="16" y="21" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">{letter}</text>
    </svg>
  );
};

export default LabTokenIcon;
