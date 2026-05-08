import AppSwitcher from '@/components/AppSwitcher'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="flex items-center justify-between mb-12">
        <h1 className="text-2xl font-bold">Jeff Lester</h1>
        <AppSwitcher current="next" />
      </header>
      <p className="text-gray-500">Coming soon — built with Next.js 15</p>
    </main>
  )
}
