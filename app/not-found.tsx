import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/NotFoundPage.module.css'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: "The page you're looking for doesn't exist. Return to UnitechLabs.",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={`display ${styles.title}`}>Page not <em>found</em></h1>
        <p className={styles.sub}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn--primary">Back to Home</Link>
          <Link href="/contact" className="btn">Contact Us</Link>
        </div>
        <div className={styles.links}>
          <p className={styles.linksLabel}>You might be looking for</p>
          <div className={styles.linkGrid}>
            {[{ label: 'Our Services', href: '/#services' }, { label: 'Products', href: '/products' }, { label: 'Blog', href: '/blog' }, { label: 'Team', href: '/team' }].map(l => (
              <Link key={l.label} href={l.href} className={styles.linkItem}>
                {l.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
