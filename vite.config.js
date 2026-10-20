import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'PORT');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(import.meta.dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${process.env.PORT || env.PORT || 3001}`,
          changeOrigin: true,
          secure: false,
        },
      },
      allowedHosts: ["10e4d18ce6cc.ngrok-free.app"],
    },
  };
})
