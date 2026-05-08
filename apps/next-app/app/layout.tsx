import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jeff Lester — Next.js',
  description: 'Jeff Lester developer resume and portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
