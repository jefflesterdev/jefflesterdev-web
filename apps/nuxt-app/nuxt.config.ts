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
      title: 'Jeff Lester - Senior-level Full Stack Developer',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Senior full stack developer with 20+ years of production experience. Expert in C#, TypeScript, React, and Vue, with a strong business analysis background and a record of delivering high-impact systems under pressure.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://jefflesterdev-nuxt.jeffery-a-lester.workers.dev' },
        { property: 'og:site_name', content: 'Jeff Lester' },
        { property: 'og:title', content: 'Jeff Lester - Senior-level Full Stack Developer' },
        { property: 'og:description', content: 'Senior full stack developer with 20+ years of production experience. Expert in C#, TypeScript, React, and Vue, with a strong business analysis background and a record of delivering high-impact systems under pressure.' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: 'Jeff Lester - Senior-level Full Stack Developer' },
        { name: 'twitter:description', content: 'Senior full stack developer with 20+ years of production experience. Expert in C#, TypeScript, React, and Vue, with a strong business analysis background and a record of delivering high-impact systems under pressure.' },
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
