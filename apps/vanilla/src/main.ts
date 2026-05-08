import './style.css'
import { type Locale, useTranslations } from '@jld/i18n'

const NEXT_URL = import.meta.env.VITE_NEXT_URL ?? 'http://localhost:3000'
const NUXT_URL = import.meta.env.VITE_NUXT_URL ?? 'http://localhost:3001'

let locale: Locale = 'en'

function render() {
  const t = useTranslations(locale)
  const app = document.querySelector<HTMLDivElement>('#app')!

  app.innerHTML = `
    <main class="min-h-screen p-8">
      <header class="flex items-center justify-between mb-12">
        <h1 class="text-2xl font-bold">Jeff Lester</h1>
        <div class="flex items-center gap-3 text-sm">
          <span class="text-gray-500">${t.appSwitcher.label}</span>
          <a href="${NEXT_URL}" class="px-3 py-1 rounded border border-gray-300 hover:border-gray-500 transition-colors">${t.appSwitcher.nextApp}</a>
          <a href="${NUXT_URL}" class="px-3 py-1 rounded border border-gray-300 hover:border-gray-500 transition-colors">${t.appSwitcher.nuxtApp}</a>
          <button id="lang-toggle" class="ml-4 px-3 py-1 rounded border border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors">${t.language.toggle}</button>
        </div>
      </header>
      <p class="text-gray-500">Coming soon — built with Vite + TypeScript</p>
    </main>
  `

  document.querySelector('#lang-toggle')?.addEventListener('click', () => {
    locale = locale === 'en' ? 'fr-CA' : 'en'
    render()
  })
}

render()
