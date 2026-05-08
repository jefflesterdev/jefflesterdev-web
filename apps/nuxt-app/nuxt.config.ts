import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  ssr: false,
  runtimeConfig: {
    public: {
      nextUrl: '',
      vanillaUrl: '',
      apiBaseUrl: 'https://jefflesterdev-api.jeffery-a-lester.workers.dev',
    },
  },
})
