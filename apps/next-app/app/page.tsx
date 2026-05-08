'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@jld/i18n'
import type { Profile } from '@jld/types'
import { api } from '@/lib/api'
import Sidebar from '@/components/Sidebar'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    api.profile().then(setProfile).catch(console.error)
  }, [])

  return (
    <div className="lg:grid lg:grid-cols-[20rem_1fr] min-h-screen">
      <Sidebar profile={profile} locale={locale} onLocaleChange={setLocale} />

      <main className="p-8 lg:p-12 max-w-3xl">
        <ExperienceSection locale={locale} />
        <SkillsSection locale={locale} />
        <AchievementsSection locale={locale} />
      </main>
    </div>
  )
}
