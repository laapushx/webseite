import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'SUNXBÜ — Premium Webdesign. Stuttgart × Dubai.',
  description:
    'Wir gestalten digitale Präsenzen, die Vertrauen aufbauen, Besucher überzeugen und Unternehmen wachsen lassen. Kein Template. Kein Kompromiss.',
  keywords: [
    'Webdesign Stuttgart',
    'Webdesign Dubai',
    'Premium Webdesign',
    'Professionelle Website',
    'Website erstellen lassen',
    'SUNXBÜ',
  ],
  authors: [{ name: 'Aysun Caliskan & Büsra Alili' }],
  creator: 'SUNXBÜ',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    alternateLocale: 'en_GB',
    title: 'SUNXBÜ — Premium Webdesign. Stuttgart × Dubai.',
    description:
      'Websites, die verkaufen. Nicht nur gefallen. Premium Webdesign ohne Kompromisse.',
    siteName: 'SUNXBÜ',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SUNXBÜ — Premium Webdesign',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SUNXBÜ — Premium Webdesign. Stuttgart × Dubai.',
    description: 'Websites, die verkaufen. Nicht nur gefallen.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
