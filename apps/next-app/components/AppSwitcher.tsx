type App = 'next' | 'nuxt' | 'vanilla'

const apps: Record<App, { label: string; url: string }> = {
  next: { label: 'Next.js', url: '/' },
  nuxt: { label: 'Nuxt', url: process.env.NEXT_PUBLIC_NUXT_URL ?? 'http://localhost:3001' },
  vanilla: { label: 'Vanilla TS', url: process.env.NEXT_PUBLIC_VANILLA_URL ?? 'http://localhost:3002' },
}

export default function AppSwitcher({ current }: { current: App }) {
  const others = (Object.entries(apps) as [App, { label: string; url: string }][]).filter(
    ([key]) => key !== current
  )

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="text-gray-500">View in</span>
      {others.map(([key, app]) => (
        <a
          key={key}
          href={app.url}
          className="px-3 py-1 rounded border border-gray-300 hover:border-gray-500 transition-colors"
        >
          {app.label}
        </a>
      ))}
    </div>
  )
}
