'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { SkillGroup } from '@jld/types'
import { api } from '@/lib/api'
import SectionHeading from '../SectionHeading'

const proficiencyClass: Record<string, string> = {
  expert:     'chip-expert',
  proficient: 'chip-proficient',
  familiar:   'chip-familiar',
}

export default function SkillsSection({ locale }: { locale: Locale }) {
  const [groups, setGroups] = useState<SkillGroup[]>([])
  const t = useTranslations(locale)

  useEffect(() => {
    api.skills().then(setGroups).catch(console.error)
  }, [])

  if (!groups.length) return null

  return (
    <section id="skills" className="mb-16">
      <SectionHeading label={t.nav.skills} />

      <div className="flex flex-col gap-8">
        {groups.map(group => (
          <div key={group.id}>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-faint)' }}
            >
              {group.name}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map(skill => (
                <span
                  key={skill.id}
                  className={proficiencyClass[skill.proficiency] ?? 'chip-familiar'}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
