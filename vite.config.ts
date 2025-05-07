import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Air_Transport_Management/",
  build: {
    chunkSizeWarningLimit: 3000,
  },
})
