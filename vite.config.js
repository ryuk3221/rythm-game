import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0', // Это позволит подключиться с других устройств в сети
    port: 5173, // Можно указать любой свободный порт
  }
})