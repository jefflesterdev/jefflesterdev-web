'use client'

import { useState } from 'react'
import { type Locale, useTranslations } from '@jld/i18n'
import AppSwitcher from '@/components/AppSwitcher'

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en')
  const t = useTranslations(locale)

  return (
    <main className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold">Jeff Lester</h1>
        <div className="flex items-center">
          <AppSwitcher current="next" />
          <button
            onClick={() => setLocale(locale === 'en' ? 'fr-CA' : 'en')}
            className="ml-4 px-3 py-1 rounded border border-blue-400 text-blue-600 hover:bg-blue-50 transition-colors text-sm"
          >
            {t.language.toggle}
          </button>
        </div>
      </header>
      <p className="text-gray-500">{t.common.comingSoon} — built with Next.js 15</p>
    </main>
  )
}
