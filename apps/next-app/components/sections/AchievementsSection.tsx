'use client'

import { useState, useEffect } from 'react'
import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Achievement } from '@jld/types'
import { api } from '@/lib/api'
import SectionHeading from '../SectionHeading'

function dateRange(start: string, end: string | null, present: string): string {
  const fmt = (d: string) => d.slice(0, 7).replace('-', '/')
  return end ? `${fmt(start)} – ${fmt(end)}` : `${fmt(start)} – ${present}`
}

export default function AchievementsSection({ locale }: { locale: Locale }) {
  const [items, setItems] = useState<Achievement[]>([])
  const t = useTranslations(locale)

  useEffect(() => {
    api.achievements().then(setItems).catch(console.error)
  }, [])

  if (!items.length) return null

  return (
    <section id="achievements" className="mb-16" aria-labelledby="achievements-heading">
      <SectionHeading label={t.nav.achievements} />

      <ul className="grid gap-4 sm:grid-cols-2 list-none m-0 p-0">
        {items.map(item => (
          <li
            key={item.id}
            className="flex flex-col gap-2 p-4 rounded-lg border transition-colors"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <span aria-hidden="true" className="font-mono text-lg leading-none" style={{ color: 'var(--color-yellow)' }}>★</span>
              <span className="font-mono text-xs shrink-0" style={{ color: 'var(--color-faint)' }}>
                <span className="sr-only">Date range: </span>
                {dateRange(item.start_date, item.end_date, t.experience.present)}
              </span>
            </div>

            <h3 className="text-sm font-semibold leading-snug" style={{ color: 'var(--color-text)' }}>
              {item.title}
            </h3>

            <p className="text-xs font-mono" style={{ color: 'var(--color-accent)' }}>
              {item.company}
            </p>

            {item.description && (
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                {item.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
