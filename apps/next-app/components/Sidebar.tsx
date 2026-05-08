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
  { href: '#bio',          key: 'bio' },
  { href: '#experience',   key: 'experience' },
  { href: '#skills',       key: 'skills' },
  { href: '#achievements', key: 'achievements' },
]

export default function Sidebar({ profile, locale, onLocaleChange }: Props) {
  const t = useTranslations(locale)
  const nextLocale = locale === 'en' ? 'fr-CA' : 'en'

  return (
    <aside
      aria-label="Profile and navigation"
      className="dot-grid flex flex-col gap-8 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto"
      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      {/* Avatar + identity */}
      <div className="flex flex-col gap-3">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center font-mono text-xl font-bold border-2 overflow-hidden"
          style={{ borderColor: 'var(--color-accent)', background: 'var(--color-raised)', color: 'var(--color-accent)' }}
          role="img"
          aria-label={profile?.name ? `${profile.name} profile photo` : 'Profile photo placeholder'}
        >
          {profile?.photo_url
            ? <img src={profile.photo_url} alt="" />
            : <span aria-hidden="true">JL</span>
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
            <span className="pulse-dot" aria-hidden="true" />
            {t.availability.open}
          </div>
        )}

        {profile?.location && (
          <p className="text-xs" style={{ color: 'var(--color-faint)' }}>
            <span aria-hidden="true">📍</span>{' '}
            <span>{profile.location}</span>
          </p>
        )}
      </div>

      {/* Nav */}
      <nav aria-label="Page sections">
        <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
          {NAV.map(({ href, key }) => (
            <li key={href}>
              <a href={href} className="nav-link">
                <span aria-hidden="true" className="font-mono text-xs" style={{ color: 'var(--color-accent)' }}>›</span>
                {t.nav[key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Socials */}
      <div className="flex flex-col gap-0.5" role="list" aria-label="Social links">
        {profile?.github_url && (
          <a
            role="listitem"
            href={profile.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub profile (opens in new tab)"
          >
            <span aria-hidden="true">↗</span> github
          </a>
        )}
        {profile?.linkedin_url && (
          <a
            role="listitem"
            href={profile.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn profile (opens in new tab)"
          >
            <span aria-hidden="true">↗</span> linkedin
          </a>
        )}
        {profile?.email && (
          <a
            role="listitem"
            href={`mailto:${profile.email}`}
            className="social-link"
            aria-label={`Send email to ${profile.email}`}
          >
            <span aria-hidden="true">↗</span> {profile.email}
          </a>
        )}
      </div>

      <div className="flex-1" />

      {/* Footer */}
      <div className="flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <AppSwitcher current="next" />
        <button
          onClick={() => onLocaleChange(nextLocale)}
          className="self-start font-mono text-xs px-3 py-2 rounded border transition-colors min-h-11"
          style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
          aria-label={`Switch language to ${nextLocale === 'fr-CA' ? 'French (Canada)' : 'English'}`}
        >
          {t.language.toggle}
        </button>
      </div>
    </aside>
  )
}
