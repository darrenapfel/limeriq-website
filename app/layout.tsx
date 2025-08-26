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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  )
}