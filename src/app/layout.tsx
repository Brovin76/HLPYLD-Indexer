import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import '../styles/globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'HypurrYield - The Future of Tokenized Vaults',
  description: 'HypurrYield unlocks liquidity and DeFi integrations by tokenizing Hyperliquid Vaults. The first vault tokenization protocol on Hyperliquid.',
  openGraph: {
    title: 'HypurrYield - The Future of Tokenized Vaults',
    description: 'Unlock liquidity, borrow against LP tokens, and integrate into DeFi. The first vault tokenization protocol on Hyperliquid.',
    url: 'https://hypurryield.xyz',
    siteName: 'HypurrYield',
    images: [
      {
        url: 'https://hypurryield.xyz/meta-image.png',
        width: 1200,
        height: 630,
        alt: 'HypurrYield Protocol',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HypurrYield - The Future of Tokenized Vaults',
    description: 'Unlock liquidity, borrow against LP tokens, and integrate into DeFi. The first vault tokenization protocol on Hyperliquid.',
    images: ['https://hypurryield.xyz/meta-image.png'],
    creator: '@HypurrYield',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative antialiased bg-hl-dark min-h-screen">
        <Providers>
          <Header />
          <main className="pt-16">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 