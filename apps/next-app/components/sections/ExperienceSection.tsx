'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Experience } from '@jld/types'
import { api } from '@/lib/api'
import SectionHeading from '../SectionHeading'

export default function ExperienceSection({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<Experience[]>([])
  const t = useTranslations(locale)

  useEffect(() => {
    api.experience().then(setItems).catch(console.error)
  }, [])

  if (!items.length) return null

  return (
    <section id="experience" className="mb-16">
      <SectionHeading label={t.nav.experience} />

      <div className="relative flex flex-col gap-10 pl-6">
        <div className="timeline-line" />

        {items.map(exp => (
          <div key={exp.id} className="relative">
            {/* dot */}
            <div
              className="absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2"
              style={{ borderColor: 'var(--color-accent)', background: 'var(--color-bg)' }}
            />

            {/* date + type */}
            <p className="font-mono text-xs mb-1" style={{ color: 'var(--color-faint)' }}>
              {exp.start_date} – {exp.end_date ?? t.experience.present}
              {exp.employment_type && (
                <span className="ml-2 px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--color-raised)', color: 'var(--color-muted)' }}>
                  {exp.employment_type}
                </span>
              )}
            </p>

            <h3 className="text-base font-semibold" style={{ color: 'var(--color-text)' }}>
              {exp.title}
            </h3>
            <p className="text-sm mb-2" style={{ color: 'var(--color-accent)' }}>
              {exp.company}{exp.location && ` · ${exp.location}`}
            </p>

            {exp.summary && (
              <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {exp.summary}
              </p>
            )}

            {exp.items.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {exp.items.map(item => (
                  <li key={item.id} className="flex gap-2.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                    <span
                      className="font-mono mt-0.5 flex-shrink-0 text-xs"
                      style={{ color: item.type === 'achievement' ? 'var(--color-yellow)' : 'var(--color-faint)' }}
                    >
                      {item.type === 'achievement' ? '★' : '·'}
                    </span>
                    {item.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
