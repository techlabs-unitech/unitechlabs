import Link from 'next/link'
import styles from './Blog.module.css'
import { posts } from '@/lib/posts'

const preview = posts.slice(0, 3)

export default function Blog() {
  return (
    <section id="blog" className="section">
      <div className="container">
        <header className={styles.header}>
          <div>
            <p className="label" style={{ display: 'block', marginBottom: 14 }}>Latest Thinking</p>
            <h2 className={`display ${styles.title}`}>Blog &amp; <em>Insights</em></h2>
          </div>
          <Link href="/blog" className="btn">All Articles</Link>
        </header>
        <div className={styles.grid}>
          {preview.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className={styles.card}>
              <div className={styles.cardMeta}>
                <span className={styles.cat}>{p.category}</span>
                <span className={styles.dot}>·</span>
                <span className={styles.read}>{p.readTime}</span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardExcerpt}>{p.excerpt}</p>
              <footer className={styles.cardFooter}>
                <span className={styles.date}>{p.date}</span>
                <span className={styles.more}>
                  Read more{' '}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </span>
              </footer>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
