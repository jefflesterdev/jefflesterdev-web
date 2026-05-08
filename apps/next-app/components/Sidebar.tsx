'use client'

import type { Locale } from '@jld/i18n'
import { useTranslations } from '@jld/i18n'
import type { Profile } from '@jld/types'
import AppSwitcher from './AppSwitcher'

interface Props {
  profile: Profile | null
  locale: Locale
  onLocaleChange: (l: Locale) => void
}

const NAV: { href: string; key: keyof ReturnType<typeof useTranslations>['nav'] }[] = [
  { href: '#experience',   key: 'experience' },
  { href: '#skills',       key: 'skills' },
  { href: '#achievements', key: 'achievements' },
]

export default function Sidebar({ profile, locale, onLocaleChange }: Props) {
  const t = useTranslations(locale)

  return (
    <aside
      className="dot-grid flex flex-col gap-8 p-8 border-r lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      {/* Avatar + identity */}
      <div className="flex flex-col gap-3">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-mono text-xl font-bold border-2 overflow-hidden"
          style={{ borderColor: 'var(--color-accent)', background: 'var(--color-raised)', color: 'var(--color-accent)' }}
        >
          {profile?.photo_url
            ? <img src={profile.photo_url} alt={profile.name} className="w-full h-full object-cover" />
            : 'JL'
          }
        </div>

        <div>
          <h1 className="font-mono text-2xl font-bold name-glow" style={{ color: 'var(--color-accent)' }}>
            {profile?.name ?? 'Jeff Lester'}
          </h1>
          {profile?.tagline && (
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted)' }}>
              {profile.tagline}
            </p>
          )}
        </div>

        {profile?.available && (
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-green)' }}>
            <span className="pulse-dot" />
            {t.availability.open}
          </div>
        )}

        {profile?.location && (
          <p className="text-xs" style={{ color: 'var(--color-faint)' }}>
            📍 {profile.location}
          </p>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {NAV.map(({ href, key }) => (
          <a key={href} href={href} className="nav-link">
            <span className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>›</span>
            {t.nav[key]}
          </a>
        ))}
      </nav>

      {/* Socials */}
      <div className="flex flex-col gap-2">
        {profile?.github_url && (
          <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="social-link">
            ↗ github
          </a>
        )}
        {profile?.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-link">
            ↗ linkedin
          </a>
        )}
        {profile?.email && (
          <a href={`mailto:${profile.email}`} className="social-link">
            ↗ {profile.email}
          </a>
        )}
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <AppSwitcher current="next" />
        <button
          onClick={() => onLocaleChange(locale === 'en' ? 'fr-CA' : 'en')}
          className="self-start font-mono text-xs px-3 py-1.5 rounded border transition-colors"
          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
        >
          {t.language.toggle}
        </button>
      </div>
    </aside>
  )
}
