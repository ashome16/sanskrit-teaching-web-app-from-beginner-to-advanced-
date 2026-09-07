import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages needs the long repo path; Vercel serves from domain root.
const base = process.env.VERCEL
  ? '/'
  : '/sanskrit-teaching-web-app-from-beginner-to-advanced-/'

export default defineConfig({
  plugins: [react()],
  base,
})
