'use client'
import { useEffect, useRef } from 'react'
import Script from 'next/script'
import styles from './InstagramCarousel.module.css'

// ── Add more post permalinks here as you publish them ──────────────────────
const POSTS = [
  'https://www.instagram.com/p/DYLdMVUjyMJ/',
  'https://www.instagram.com/p/DYLdsImD9Cj/',
  'https://www.instagram.com/p/DYLf-WaD-Wr/',
  'https://www.instagram.com/p/DYbBmvmj4LD/',
  'https://www.instagram.com/p/DYXXLX3j0lZ/',
  'https://www.instagram.com/p/DYXXrFzDxmE/',
  

]
// ──────────────────────────────────────────────────────────────────────────

// Triple-duplicate so the marquee loops seamlessly
const TRACK_POSTS = [...POSTS, ...POSTS, ...POSTS]

export default function InstagramCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const processEmbeds = () => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }

  // Re-process once the component mounts (script may already be loaded)
  useEffect(() => {
    const t = setTimeout(processEmbeds, 600)
    return () => clearTimeout(t)
  }, [])

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  return (
    <section className={`section section--alt ${styles.section}`}>
      {/* Load Instagram embed.js lazily — fires processEmbeds on load */}
      <Script
        src="//www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={processEmbeds}
      />

      <div className="container">
        <header className={styles.header}>
          <p className="label" style={{ display: 'block', marginBottom: 14 }}>Client Voices</p>
          <h2 className={`display ${styles.title}`}>
            What our clients are<br /><em>saying about us</em>
          </h2>
          <p className={styles.sub}>feedback — straight from Instagram.</p>
        </header>
      </div>

      {/* Full-bleed scrolling track */}
      <div
        className={styles.viewport}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-label="Client testimonials carousel"
      >
        <div className={styles.track} ref={trackRef}>
          {TRACK_POSTS.map((url, i) => (
            <div key={`${url}-${i}`} className={styles.slide}>
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: 12,
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: 0,
                  maxWidth: 400,
                  minWidth: 300,
                  padding: 0,
                  width: '100%',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <p className={styles.igLink}>
          Follow us on Instagram{' '}
          <a
            href="https://instagram.com/unitechlabs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igHandle}
          >
            @unitechlabs
          </a>{' '}
          for more updates.
        </p>
      </div>
    </section>
  )
}
