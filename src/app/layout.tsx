import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

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
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
