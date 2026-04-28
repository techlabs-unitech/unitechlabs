import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact UnitechLabs — Start Your Project Today',
  description: 'Get in touch with UnitechLabs. Reach us via WhatsApp, Instagram, LinkedIn, or email. Based in Bangalore — serving clients worldwide.',
  alternates: { canonical: 'https://unitechlabs.io/contact' },
  openGraph: { title: 'Contact UnitechLabs', url: 'https://unitechlabs.io/contact' },
}

export default function ContactPage() {
  return <ContactPageClient />
}
