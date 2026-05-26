import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Our Products — AgriTech, Hosting, AIOERP & More',
  description: 'Explore UnitechLabs products: AIOERP — our all-in-one enterprise resource planning platform, AI-powered AgriTech systems, Domain & Web Host Complete management system, and more.',
  alternates: { canonical: 'https://unitechlabs.io/products' },
  openGraph: { title: 'UnitechLabs Products — Making Business Smarter', url: 'https://unitechlabs.io/products' },
}

const products = [
  { id: '01', name: 'Web Hosting & Domains', category: 'Infrastructure', description: 'Managed cPanel hosting, domain registration, SSL certificates, and one-click CMS installs. Built for non-technical users and developers alike.', features: ['cPanel Hosting', 'Domain Registration', 'Free SSL', 'CMS Installation', '24/7 Support'], href: 'https://desk.unitechlabs.io', cta: 'Browse Plans', external: true },
  { id: '02', name: 'AgriTech AI Protection System', category: 'AI · IoT · Sustainability', description: 'A sustainable AI-powered farm protection system using computer vision, precision sensors, and ultrasonic repellents. Detects and deters animals safely — zero harm, maximum efficiency.', features: ['Computer Vision', 'Real-time Alerts', 'IoT Sensors', 'Ultrasonic Deterrents', 'Cloud Dashboard'], href: '/contact', cta: 'Enquire Now', external: false },
  { id: '03', name: 'AIOERP — All-in-One Enterprise Resource Planning', category: 'ERP · SaaS · Data-Driven', description: 'A Powerful, scalable and unified ERP System to help you run your business. From Accounting, Order Management, Manufacturing, Inventory, and more.', features: ['Finance & Accounting', 'HR & Payroll', 'Inventory & Procurement', 'CRM & Sales Pipeline', 'Custom Modules & Integrations'], href: '/contact', cta: 'Enquire Now', external: false },
]

export default function ProductsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="label" style={{ display: 'block', marginBottom: 16 }}>What We&apos;ve Built</p>
          <h1 className={`display ${styles.heroTitle}`}>Our <em>Products</em></h1>
          <p className={styles.heroSub}>From AI-powered agriculture systems to managed cloud hosting — every product we build is engineered to solve a real problem and scale with your business.</p>
        </div>
      </section>
      <section className={`section ${styles.inner}`}>
        <div className="container">
          <div className={styles.productList}>
            {products.map(p => (
              <div key={p.id} className={styles.productCard}>
                <div className={styles.productLeft}>
                  <span className={styles.productNum}>{p.id}</span>
                  <div>
                    <span className={styles.productCat}>{p.category}</span>
                    <h3 className={`display ${styles.productName}`}>{p.name}</h3>
                    <p className={styles.productDesc}>{p.description}</p>
                    {p.external
                      ? <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>{p.cta}</a>
                      : <Link href={p.href} className="btn btn--primary" style={{ marginTop: 24, display: 'inline-flex' }}>{p.cta}</Link>
                    }
                  </div>
                </div>
                <div className={styles.productFeatures}>
                  <p className={styles.featuresLabel}>Key Features</p>
                  <ul className={styles.featuresList}>
                    {p.features.map(f => (
                      <li key={f} className={styles.featureItem}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.cta}>
            <p className={styles.ctaText}>Need a custom product built for your business?</p>
            <Link href="/contact" className="btn btn--primary">Start a Conversation</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
