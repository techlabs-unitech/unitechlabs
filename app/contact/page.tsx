import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a project in mind? Reach the UnitechLabs team by WhatsApp, email, or LinkedIn. We\u2019re based in Bangalore and work with clients across India and abroad.',
  alternates: { canonical: 'https://unitechlabs.io/contact' },
  openGraph: { title: 'Contact UnitechLabs', url: 'https://unitechlabs.io/contact' },
}

export default function ContactPage() {
  return <ContactPageClient />
}
