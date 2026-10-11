import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";

// Cloudflare Pages, Vercel, and custom domains serve from root '/'.
// Only use GitHub Pages subpath if explicitly requested via GITHUB_PAGES or GH_PAGES.
const base = (process.env.GITHUB_PAGES || process.env.GH_PAGES)
  ? '/sanskrit-teaching-web-app-from-beginner-to-advanced-/'
  : '/';

export default defineConfig({
  plugins: [react(), cloudflare()],
  base,
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('zustand')
            ) {
              return 'vendor-core';
            }
            return 'vendor-libs';
          }
          if (id.includes('chapters.json')) {
            return 'chapters-data';
          }
        },
      },
    },
  },
})