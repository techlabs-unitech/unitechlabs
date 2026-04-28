import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '@/components/Page.module.css'
import { posts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Blog & Insights — Technology, AI & Sustainability',
  description: 'Ideas, perspectives, and deep-dives from the UnitechLabs team on software development, IoT, AI, sustainability, and building technology products that last.',
  alternates: { canonical: 'https://unitechlabs.io/blog' },
  openGraph: {
    title: 'UnitechLabs Blog — Ideas & Perspectives',
    description: 'Deep-dives on software, IoT, AI, and sustainability from the UnitechLabs team.',
    url: 'https://unitechlabs.io/blog',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'UnitechLabs Blog' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unitechlabs.io' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://unitechlabs.io/blog' },
  ],
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className={styles.page}>
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <p className="label" style={{ display: 'block', marginBottom: 16 }}>Latest Thinking</p>
            <h1 className={`display ${styles.heroTitle}`}>Blog &amp; <em>Insights</em></h1>
            <p className={styles.heroSub}>
              Ideas, perspectives, and deep-dives from the UnitechLabs team on technology,
              sustainability, and building digital products that last.
            </p>
          </div>
        </section>

        <section className={`section ${styles.inner}`}>
          <div className="container">
            <div className={styles.blogGrid}>
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.blogCard}>
                  <div className={styles.blogMeta}>
                    <span className={styles.blogCat}>{p.category}</span>
                    <span className={styles.blogDot}>·</span>
                    <span className={styles.blogRead}>{p.readTime}</span>
                  </div>
                  <h2 className={styles.blogTitle}>{p.title}</h2>
                  <p className={styles.blogExcerpt}>{p.excerpt}</p>
                  <footer className={styles.blogFooter}>
                    <span className={styles.blogDate}>{p.date}</span>
                    <span className={styles.blogMore}>
                      Read more{' '}
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </footer>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
