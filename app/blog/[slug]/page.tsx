import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, getAllSlugs, posts } from '@/lib/posts'
import postStyles from './post.module.css'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return {}

  const url = `https://unitechlabs.io/blog/${post.slug}`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'UnitechLabs',
      locale: 'en_IN',
      publishedTime: post.dateISO,
      authors: [post.author],
      images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.svg'],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const postUrl = `https://unitechlabs.io/blog/${post.slug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole,
      url: 'https://unitechlabs.io/team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnitechLabs',
      url: 'https://unitechlabs.io',
      logo: { '@type': 'ImageObject', url: 'https://unitechlabs.io/favicon.svg' },
    },
    image: 'https://unitechlabs.io/og-image.svg',
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unitechlabs.io' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://unitechlabs.io/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: postUrl },
    ],
  }

  // Related posts (others, up to 2)
  const related = posts.filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={postStyles.root}>
        {/* ── Breadcrumb ── */}
        <nav className={postStyles.breadcrumb} aria-label="Breadcrumb">
          <div className="container">
            <ol className={postStyles.breadcrumbList}>
              <li><Link href="/">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/blog">Blog</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{post.category}</li>
            </ol>
          </div>
        </nav>

        {/* ── Article header ── */}
        <header className={postStyles.header}>
          <div className={`container ${postStyles.headerInner}`}>
            <div className={postStyles.meta}>
              <span className={postStyles.cat}>{post.category}</span>
              <span className={postStyles.dot}>·</span>
              <span className={postStyles.readTime}>{post.readTime}</span>
            </div>
            <h1 className={`display ${postStyles.title}`}>{post.title}</h1>
            <p className={postStyles.excerpt}>{post.excerpt}</p>
            <div className={postStyles.authorRow}>
              <div className={postStyles.authorAvatar}>{post.author.charAt(0)}</div>
              <div>
                <p className={postStyles.authorName}>{post.author}</p>
                <p className={postStyles.authorRole}>{post.authorRole}</p>
              </div>
              <time className={postStyles.date} dateTime={post.dateISO}>{post.date}</time>
            </div>
          </div>
        </header>

        {/* ── Article body ── */}
        <article className={postStyles.article}>
          <div className={`container ${postStyles.articleInner}`}>
            {post.content.map((section, i) => {
              switch (section.type) {
                case 'h2': return <h2 key={i} className={postStyles.h2}>{section.text}</h2>
                case 'h3': return <h3 key={i} className={postStyles.h3}>{section.text}</h3>
                case 'p':  return <p key={i} className={postStyles.p}>{section.text}</p>
                case 'blockquote': return (
                  <blockquote key={i} className={postStyles.blockquote}>
                    <p>{section.text}</p>
                  </blockquote>
                )
                case 'ul': return (
                  <ul key={i} className={postStyles.list}>
                    {section.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                )
                case 'ol': return (
                  <ol key={i} className={postStyles.list}>
                    {section.items?.map((item, j) => <li key={j}>{item}</li>)}
                  </ol>
                )
                case 'divider': return <hr key={i} className={postStyles.divider} />
                default: return null
              }
            })}
          </div>
        </article>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <section className={postStyles.related}>
            <div className="container">
              <p className="label" style={{ display: 'block', marginBottom: 28 }}>More from UnitechLabs</p>
              <div className={postStyles.relatedGrid}>
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}`} className={postStyles.relatedCard}>
                    <span className={postStyles.relatedCat}>{r.category}</span>
                    <h3 className={postStyles.relatedTitle}>{r.title}</h3>
                    <p className={postStyles.relatedExcerpt}>{r.excerpt}</p>
                    <span className={postStyles.relatedMore}>
                      Read more <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </span>
                  </Link>
                ))}
              </div>
              <div className={postStyles.backRow}>
                <Link href="/blog" className="btn">← All Articles</Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
