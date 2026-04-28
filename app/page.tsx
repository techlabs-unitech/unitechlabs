import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
  title: 'UnitechLabs — End-to-End Technology Solutions | Software, IoT & AI',
  description: 'UnitechLabs is a Bangalore-based technology company combining software, IoT, and AI into efficient, tailored solutions for your specific industry and business challenges.',
  alternates: { canonical: 'https://unitechlabs.io/' },
  openGraph: {
    title: 'UnitechLabs — Where Code Meets the Real World',
    description: 'Custom software, IoT systems, and AI — engineered end-to-end for businesses that refuse to settle for off-the-shelf.',
    url: 'https://unitechlabs.io/',
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Clients />
      <Services />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  )
}
