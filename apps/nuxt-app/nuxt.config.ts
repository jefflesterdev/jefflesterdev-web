import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  experimental: {
    viteEnvironmentApi: true,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [tailwindcss() as any],
    server: {
      hmr: { port: 24678 },
    },
  },
  ssr: false,
  app: {
    head: {
      title: 'Jeff Lester — Full Stack Developer',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Full stack developer specializing in TypeScript, React, Vue, and Cloudflare Workers. View my interactive resume and portfolio.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://jefflesterdev-nuxt.jeffery-a-lester.workers.dev' },
        { property: 'og:site_name', content: 'Jeff Lester' },
        { property: 'og:title', content: 'Jeff Lester — Full Stack Developer' },
        { property: 'og:description', content: 'Full stack developer specializing in TypeScript, React, Vue, and Cloudflare Workers. View my interactive resume and portfolio.' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Jeff Lester — Full Stack Developer' },
        { name: 'twitter:description', content: 'Full stack developer specializing in TypeScript, React, Vue, and Cloudflare Workers. View my interactive resume and portfolio.' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap' },
      ],
    },
  },
})
