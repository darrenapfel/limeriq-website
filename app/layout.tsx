import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import './globals.css'

export const metadata: Metadata = {
  title: 'limerIQ - The IQ Behind Your AI',
  description: 'Open source intelligent workflow composer for AI agents. Structure beats instructions.',
  keywords: 'ai orchestration, workflow automation, ai agents, claude automation',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'limerIQ - The IQ Behind Your AI',
    description: 'We got tired of AI agents hallucinating. So we added IQ.',
    type: 'website',
    images: ['/images/limerIQ-wordmark.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <PlausibleProvider domain="limeriq.dev" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  )
}