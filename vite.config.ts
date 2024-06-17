import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ['swiper', 'swiper/react', 'swiper/modules', 'swiper/core']
  },
  base: "/ECommerceStore-Frontend/"
})
