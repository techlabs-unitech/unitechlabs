import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import SocialProof from '@/components/SocialProof'
import TeamPreview from '@/components/TeamPreview'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'

const BASE_URL = 'https://unitechlabs.io'

export const metadata: Metadata = {
  title: 'UnitechLabs — Software, IoT & AI Development in Bangalore',
  description: 'We design, develop, and deploy custom software, IoT systems, and AI-driven products — from a small Bangalore team that stays with the project end to end.',
  alternates: { canonical: `${BASE_URL}/` },
  openGraph: {
    title: 'UnitechLabs — Software, IoT & AI Development in Bangalore',
    description: 'Custom software, IoT systems, and AI products, designed and built by a Bangalore-based team.',
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
  name: 'UnitechLabs Digital Lab — Demo Reel',
  description:
    'A quick look inside our Digital Lab in Bangalore, and the software, IoT, and AI work we build for clients across industries.',
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
        <SocialProof />
        <TeamPreview />
        <Blog />
        <Contact />
      </main>
    </>
  )
}
