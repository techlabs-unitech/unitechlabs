import type { Metadata } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'
import VapiButton from '@/components/VapiButton'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const BASE_URL = 'https://unitechlabs.io'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'UnitechLabs — End-to-End Technology Solutions | Software, IoT & AI',
    template: '%s | UnitechLabs',
  },
  description: 'UnitechLabs is a Bangalore-based technology company combining software, IoT, and AI into efficient, tailored solutions for your specific industry and business challenges.',
  keywords: [
    'software development', 'IoT solutions', 'AI development', 'web development',
    'IT consultation', 'workflow automation', 'Bangalore technology company',
    'custom software Bangalore', 'IoT company India', 'AI solutions India',
    'n8n automation', 'agritech AI', 'technology startup Bengaluru',
    'end-to-end software development', 'software company Bangalore',
  ],
  authors: [{ name: 'UnitechLabs', url: BASE_URL }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    siteName: 'UnitechLabs',
    title: 'UnitechLabs — Where Code Meets the Real World',
    description: 'Custom software, IoT systems, and AI — engineered end-to-end for businesses that refuse to settle for off-the-shelf.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnitechLabs — End-to-End Technology Solutions' }],
    locale: 'en_IN',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnitechLabs — Where Code Meets the Real World',
    description: 'Custom software, IoT systems, and AI — engineered end-to-end for businesses that refuse to settle.',
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
  description: 'Bangalore-based technology company offering custom software, IoT systems, and AI solutions.',
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
  description: 'End-to-end technology solutions — software, IoT, and AI for businesses.',
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
          <Navbar />
          {children}
          <Footer />
          <VapiButton />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
