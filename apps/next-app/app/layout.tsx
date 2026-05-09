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

const description = 'Senior full stack developer with 20+ years of production experience. Expert in C#, TypeScript, React, and Vue, with a strong business analysis background and a record of delivering high-impact systems under pressure.'
const url = 'https://jefflesterdev-next.jeffery-a-lester.workers.dev'

export const metadata: Metadata = {
  title: 'Jeff Lester - Senior-level Full Stack Developer',
  description,
  openGraph: {
    type: 'website',
    url,
    siteName: 'Jeff Lester',
    title: 'Jeff Lester - Senior-level Full Stack Developer',
    description,
  },
  twitter: {
    card: 'summary',
    title: 'Jeff Lester - Senior-level Full Stack Developer',
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
