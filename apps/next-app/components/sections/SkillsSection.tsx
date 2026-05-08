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
    <section id="skills" className="mb-16" aria-labelledby="skills-heading">
      <SectionHeading label={t.nav.skills} />

      <div className="flex flex-col gap-8">
        {groups.map(group => (
          <div key={group.id}>
            <p
              id={`skill-group-${group.id}`}
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--color-faint)' }}
            >
              {group.name}
            </p>
            <ul
              className="flex flex-wrap gap-2 list-none m-0 p-0"
              aria-labelledby={`skill-group-${group.id}`}
            >
              {group.skills.map(skill => (
                <li key={skill.id}>
                  <span
                    className={proficiencyClass[skill.proficiency ?? ''] ?? 'chip-familiar'}
                    title={skill.proficiency ? `${skill.proficiency} proficiency` : undefined}
                  >
                    {skill.name}
                    {skill.proficiency && <span className="sr-only"> ({skill.proficiency})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
