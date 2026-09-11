import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Vite не прокидывает .env автоматически в process.env для самого конфига —
  // грузим явно, иначе VITE_PROXY_TARGET из .env тут не увидит.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Прокси только для dev (npm run dev). В докере роль проксирования на /api
        // выполняет nginx перед статикой фронта — конфиг сюда не переносится.
        // Цель без rewrite: backend смонтирован на /api (backend/src/index.ts),
        // и refresh-кука ограничена path=/api/auth — префикс должен доезжать как есть.
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  }
})
