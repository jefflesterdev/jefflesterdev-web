'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@jld/i18n'
import type { Profile } from '@jld/types'
import { api } from '@/lib/api'
import Sidebar from '@/components/Sidebar'
import BioSection from '@/components/sections/BioSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AchievementsSection from '@/components/sections/AchievementsSection'

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    api.profile().then(setProfile).catch(console.error)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="lg:grid lg:grid-cols-[20rem_1fr] min-h-screen">
        <Sidebar profile={profile} locale={locale} onLocaleChange={setLocale} />

        <main id="main-content" className="p-6 sm:p-8 lg:p-12 max-w-3xl" tabIndex={-1}>
          {profile?.bio && <BioSection bio={profile.bio} />}
          <ExperienceSection locale={locale} />
          <SkillsSection locale={locale} />
          <AchievementsSection locale={locale} />
        </main>
      </div>
    </>
  )
}
