import Link from 'next/link'
import styles from './Portfolio.module.css'

const projects = [
  { id: '01', title: 'Agriculture Technology', category: 'AI · Computer Vision · IoT', desc: 'A sustainable AI-powered farm protection system using computer vision, sensors, and ultrasonic repellents to detect and deter animals safely.', tags: ['Computer Vision', 'IoT', 'Sustainability'] },
  { id: '02', title: 'Enterprise Software', category: 'Data-Driven · SaaS · ERP', desc: 'Custom-built enterprise software engineered around your business processes — from CRM pipelines and ERP workflows to medical billing and learning platforms. Scalable, integrated, and built to last.', tags: ['CRM Systems', 'ERP Systems', 'LMS Platforms', 'Medical Stock-Inventory & Billing', 'Custom Enterprise SaaS'] },
  { id: '03', title: 'Domain & Hosting Platform', category: 'SaaS · Infrastructure', desc: 'Full-featured web hosting management panel giving businesses control over domains, SSL, cPanel, and CMS configurations — built for non-technical users.', tags: ['SaaS', 'Hosting', 'UX'] },
  { id: '04', title: 'Workflow Automation Suite', category: 'n8n · API · IoT', desc: 'Custom n8n-powered automation that connects apps, IoT devices, and data pipelines — eliminating manual overhead across operations.', tags: ['Automation', 'n8n', 'Enterprise'] },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section">
      <div className="container">
        <header className={styles.header}>
          <div>
            <p className="label" style={{ display: 'block', marginBottom: 12 }}>Selected Work</p>
            <h2 className={`display ${styles.title}`}>Our <em>Products</em></h2>
          </div>
          <Link href="/products" className="btn">View All Projects</Link>
        </header>
        <div className={styles.list}>
          {projects.map(p => (
            <Link key={p.id} href="/products" className={styles.item}>
              <span className={styles.itemNum}>{p.id}</span>
              <div className={styles.itemBody}>
                <span className={styles.itemCat}>{p.category}</span>
                <h3 className={`display ${styles.itemTitle}`}>{p.title}</h3>
                <p className={styles.itemDesc}>{p.desc}</p>
                <div className={styles.tags}>{p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
              </div>
              <span className={styles.arrow}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
