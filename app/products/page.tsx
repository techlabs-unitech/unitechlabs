import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Our Products — AgriTech, Hosting, Automation & More',
  description: 'Explore UnitechLabs products: AI-powered AgriTech systems, managed web hosting, enterprise software, and enterprise workflow automation built on n8n.',
  alternates: { canonical: 'https://unitechlabs.io/products' },
  openGraph: { title: 'UnitechLabs Products — Built for the Real World', url: 'https://unitechlabs.io/products' },
}

const products = [
  { id: '01', name: 'Web Hosting & Domains', category: 'Infrastructure', description: 'Managed cPanel hosting, domain registration, SSL certificates, and one-click CMS installs. Built for non-technical users and developers alike.', features: ['cPanel Hosting', 'Domain Registration', 'Free SSL', 'CMS Installation', '24/7 Support'], href: 'https://whmcs.unitechclub.com', cta: 'Browse Plans', external: true },
  { id: '02', name: 'AgriTech AI Protection System', category: 'AI · IoT · Sustainability', description: 'A sustainable AI-powered farm protection system using computer vision, precision sensors, and ultrasonic repellents. Detects and deters animals safely — zero harm, maximum efficiency.', features: ['Computer Vision', 'Real-time Alerts', 'IoT Sensors', 'Ultrasonic Deterrents', 'Cloud Dashboard'], href: '/contact', cta: 'Enquire Now', external: false },
  { id: '03', name: 'Enterprise Software', category: 'Data-Driven · SaaS · ERP', description: 'Custom-built enterprise software engineered around your business processes — from CRM pipelines and ERP workflows to medical billing and learning platforms. Scalable, integrated, and built to last.', features: ['CRM Systems', 'ERP Systems', 'LMS Platforms', 'Medical Stock-Inventory & Billing', 'Custom Enterprise SaaS'], href: '/contact', cta: 'Enquire Now', external: false },
  { id: '04', name: 'Workflow Automation & Integrations', category: 'n8n · API · IoT', description: 'Connect your tools, automate your workflows. From API integrations and webhook triggers to IoT-driven pipelines — we build custom n8n automation that eliminates manual overhead.', features: ['n8n Workflow Design', 'API & Webhook Integration', 'IoT Triggers', 'Scheduled Pipelines', 'Custom Nodes'], href: '/contact', cta: 'Enquire Now', external: false },
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
