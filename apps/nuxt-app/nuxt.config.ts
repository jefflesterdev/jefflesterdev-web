import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: { port: 24678 },
    },
  },
  ssr: false,
  app: {
    head: {
      title: 'Jeff Lester — Full Stack Developer',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'description', content: 'Developer resume and portfolio' }],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      nextUrl:    'https://jefflesterdev-next.jeffery-a-lester.workers.dev',
      vanillaUrl: 'https://jefflesterdev-vanilla.jeffery-a-lester.workers.dev',
      apiBaseUrl: 'https://jefflesterdev-api.jeffery-a-lester.workers.dev',
    },
  },
})
