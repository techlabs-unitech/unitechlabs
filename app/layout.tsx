import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PWAInstallBanner from '@/components/PWAInstallBanner'
import Festive from '@/components/Festive'

const BASE_URL = 'https://unitechlabs.io'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'UnitechLabs — Software, IoT & AI Development in Bangalore',
    template: '%s | UnitechLabs',
  },
  description: 'UnitechLabs builds custom software, IoT systems, and AI tools for businesses in Bangalore and beyond. We design, develop, and deploy — one team, start to finish.',
  keywords: [
    'software development company Bangalore', 'IoT solutions India', 'AI development company',
    'custom software development', 'web app development Bangalore', 'IT consulting',
    'workflow automation', 'n8n automation', 'LMS software India', 'CRM software India', 'ERP software India',
    'software company Bengaluru', 'app development company India',
  ],
  authors: [{ name: 'UnitechLabs', url: BASE_URL }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    siteName: 'UnitechLabs',
    title: 'UnitechLabs — Software, IoT & AI Development in Bangalore',
    description: 'We design, develop, and deploy custom software, IoT systems, and AI tools — one team, start to finish.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnitechLabs — Software, IoT & AI Development' }],
    locale: 'en_IN',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitechLabs — Software, IoT & AI Development in Bangalore',
    description: 'We design, develop, and deploy custom software, IoT systems, and AI tools — one team, start to finish.',
    images: ['/og-image.png'],
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon-192.png',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnitechLabs',
  url: BASE_URL,
  logo: `${BASE_URL}/favicon.svg`,
  description: 'A Bangalore-based team building custom software, IoT systems, and AI tools for businesses across industries.',
  foundingDate: '2022',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '31, 17th Cross, MRCR',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560040',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9591066613',
    contactType: 'customer service',
    email: 'info@unitechlabs.io',
    areaServed: 'IN',
    availableLanguage: 'English',
  },
  sameAs: [
    'https://instagram.com/unitechlabs',
    'https://linkedin.com/company/unitechlabs',
  ],
  hasCredential: 'ISO 9001:2015',
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'UnitechLabs',
  url: BASE_URL,
  description: 'Custom software, IoT, and AI development for businesses, built by a Bangalore-based team.',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'UnitechLabs',
  image: `${BASE_URL}/og-image.svg`,
  url: BASE_URL,
  telephone: '+91-9591066613',
  email: 'info@unitechlabs.io',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '31, 17th Cross, MRCR',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560040',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
}


const swScript = `
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js');
  });
}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#C9A96E" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="UnitechLabs" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <script dangerouslySetInnerHTML={{ __html: swScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      </head>
      <body>
        <ThemeProvider>
          <Festive />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <PWAInstallBanner />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
