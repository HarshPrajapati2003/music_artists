import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests that start with /api
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // No rewrite needed, /api remains /api
      },
    },
  },
});
