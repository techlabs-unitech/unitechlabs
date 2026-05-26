import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'

const BASE_URL = 'https://unitechlabs.io'

export const metadata: Metadata = {
  title: 'UnitechLabs — End-to-End Technology Solutions | Software, IoT & AI',
  description: 'UnitechLabs is a Bangalore-based technology company combining software, IoT, and AI into efficient, tailored solutions for your specific industry and business challenges.',
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: 'UnitechLabs — Where Code Meets the Real World',
    description: 'Custom software, IoT systems, and AI — engineered end-to-end for businesses that refuse to settle for off-the-shelf.',
    url: `${BASE_URL}/`,
    videos: [
      {
        url: `${BASE_URL}/Digital-Lab.mp4`,
        width: 1280,
        height: 720,
        type: 'video/mp4',
      },
    ],
  },
}

// ── VideoObject structured data — on the home page only ──
// Google requires: name, description, thumbnailUrl (JPG/PNG), uploadDate, contentUrl
// See: https://developers.google.com/search/docs/appearance/video
const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: 'UnitechLabs — End-to-End Technology Solutions Demo Reel',
  description:
    'UnitechLabs is a Bangalore-based technology company combining software, IoT, and AI into tailored solutions. This demo reel showcases our Digital Lab and the work we do across industries.',
  thumbnailUrl: `${BASE_URL}/og-image.png`,   // PNG — required by Google (SVG not accepted)
  uploadDate: '2026-03-29T00:00:00+05:30',
  duration: 'PT2M30S',                        // Update to actual video duration (ISO 8601)
  contentUrl: `${BASE_URL}/Digital-Lab.mp4`,
  embedUrl: `${BASE_URL}/`,
  inLanguage: 'en',
  isFamilyFriendly: true,
  publisher: {
    '@type': 'Organization',
    name: 'UnitechLabs',
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/favicon.svg`,
    },
  },
  author: {
    '@type': 'Organization',
    name: 'UnitechLabs',
    url: BASE_URL,
  },
}

export default function HomePage() {
  return (
    <>
      {/* VideoObject schema — injected only on the home page where the video lives */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <main>
        <Hero />
        <Clients />
        <Services />
        <Portfolio />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
    </>
  )
}
