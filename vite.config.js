import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Emit fonts as files: the production CSP (font-src 'self') blocks inlined data: URIs.
    assetsInlineLimit: (filePath) => (/\.woff2?$/.test(filePath) ? false : undefined),
  },
  resolve: {
    alias: {
      // Resolve the PDF worker path issue
      'pdfjs-dist': path.resolve(__dirname, 'node_modules/pdfjs-dist')
    }
  }
})
