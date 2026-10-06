import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serve em /ReactProject/; a Vercel serve na raiz e injeta VERCEL=1 no build
  base: process.env.VERCEL ? '/' : '/ReactProject/',
  plugins: [react(), tailwindcss()],
})
