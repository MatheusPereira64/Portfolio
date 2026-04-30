import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  root: './WebDesignPortfolio',
  build: {
    // Saída em `docs/` para GitHub Pages (fonte Branch → pasta /docs; não existe opção /dist na UI)
    outDir: '../docs',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})

