type App = 'next' | 'nuxt' | 'vanilla'

const apps: Record<App, { label: string; stack: string; url: string }> = {
  next:    { label: 'Next.js',    stack: 'React / Next.js',       url: '/' },
  nuxt:    { label: 'Nuxt',       stack: 'Vue / Nuxt',            url: process.env.NEXT_PUBLIC_NUXT_URL    ?? 'http://localhost:3001' },
  vanilla: { label: 'Vanilla TS', stack: 'Vanilla TypeScript',    url: process.env.NEXT_PUBLIC_VANILLA_URL ?? 'http://localhost:3002' },
}

export default function AppSwitcher({ current }: { current: App }) {
  const others = (Object.entries(apps) as [App, { label: string; stack: string; url: string }][]).filter(
    ([key]) => key !== current
  )

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs" style={{ color: 'var(--color-faint)' }}>
        built with <span style={{ color: 'var(--color-muted)' }}>{apps[current].stack}</span>
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs" style={{ color: 'var(--color-faint)' }}>
          view in
        </span>
        {others.map(([key, app]) => (
          <a
            key={key}
            href={app.url}
            className="font-mono text-xs px-2 py-1 rounded border transition-colors"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
          >
            {app.label}
          </a>
        ))}
      </div>
    </div>
  )
}
