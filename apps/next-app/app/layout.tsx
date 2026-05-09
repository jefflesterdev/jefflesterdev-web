import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const description = 'Full stack developer specializing in TypeScript, React, Vue, and Cloudflare Workers. View my interactive resume and portfolio.'
const url = 'https://jefflesterdev-next.jeffery-a-lester.workers.dev'

export const metadata: Metadata = {
  title: 'Jeff Lester — Full Stack Developer',
  description,
  openGraph: {
    type: 'website',
    url,
    siteName: 'Jeff Lester',
    title: 'Jeff Lester — Full Stack Developer',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'Jeff Lester — Full Stack Developer',
    description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
