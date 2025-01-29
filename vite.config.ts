import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: false, // Disable TypeScript type checking
    })
  ],
  optimizeDeps: {
    include: ['fabric']
  },
 
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
  }
})
