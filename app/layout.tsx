import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/layout/ChatWidget';
import MetaPixel from '@/components/analytics/MetaPixel';
import StructuredData from '@/components/seo/StructuredData';
import { site } from '@/lib/site';

import './globals.css';

/*
  Both faces are self-hosted (see scripts/fetch-fonts.mjs) so the production
  build makes no external request and visitors load nothing from a third party.
*/

/** Display face, chosen to sit alongside the serif wordmark in the logo. */
const cormorant = localFont({
  src: './fonts/CormorantGaramond-Variable.woff2',
  weight: '300 700',
  style: 'normal',
  variable: '--font-cormorant',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
});

const urbanist = localFont({
  src: './fonts/Urbanist-Variable.woff2',
  weight: '300 800',
  style: 'normal',
  variable: '--font-urbanist',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Professional House Cleaning in Westerville & Columbus, OH`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'house cleaning Westerville Ohio',
    'cleaning services Columbus Ohio',
    'residential cleaning Central Ohio',
    'deep cleaning Westerville',
    'move out cleaning Columbus',
    'commercial cleaning Columbus OH',
    'family owned cleaning company Ohio',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Professional House Cleaning in Westerville & Columbus, OH`,
    description: site.description,
    images: [
      {
        url: '/images/og/dolane-cleaning-og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | Professional House Cleaning in Central Ohio`,
    description: site.description,
    images: ['/images/og/dolane-cleaning-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Cleaning Services',
};

export const viewport: Viewport = {
  themeColor: '#01271A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${cormorant.variable} ${urbanist.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-gold-300"
        >
          Skip to main content
        </a>
        <MetaPixel />
        <StructuredData />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
