import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // scripts/prerender.mjs reads this to link each page's CSS/JS chunk.
    manifest: true,
  },
  ssr: {
    // CommonJS packages that must be bundled for the build-time prerender.
    noExternal: ['react-scroll'],
  },
  server: {
    port: 3000,
    open: true,
  },
})
