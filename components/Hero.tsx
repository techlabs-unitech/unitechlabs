'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const WORDS = ['Lifelong Learning', 'Outcome Mapping', 'Academic', 'ERP', 'AI Compliance', 'Accreditation', 'Examination']
const INTERVAL = 2000
const DURATION = 500

export default function Hero() {
  const heroRef   = useRef<HTMLElement>(null)
  const cardRef   = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLSpanElement>(null)

  // Word ticker
  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    let idx = 0
    const advance = () => {
      el.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1), opacity ${DURATION}ms ease`
      el.style.transform = 'translateY(-60%)'
      el.style.opacity = '0'
      setTimeout(() => {
        idx = (idx + 1) % WORDS.length
        el.textContent = WORDS[idx]
        el.style.transition = 'none'
        el.style.transform = 'translateY(60%)'
        el.style.opacity = '0'
        void el.offsetHeight
        el.style.transition = `transform ${DURATION}ms cubic-bezier(0.4,0,0.2,1), opacity ${DURATION}ms ease`
        el.style.transform = 'translateY(0)'
        el.style.opacity = '1'
      }, DURATION)
    }
    const timer = setInterval(advance, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  // Card parallax + grid glow
  useEffect(() => {
    let rafId: number
    let tX = 0, tY = 0, cX = 0, cY = 0

    const isDesktop = () => window.innerWidth > 960

    const updateTarget = (clientX: number, clientY: number) => {
      const hero = heroRef.current
      if (!hero) return
      hero.style.setProperty('--mouse-x', `${clientX}px`)
      hero.style.setProperty('--mouse-y', `${clientY}px`)
      if (isDesktop()) {
        const r = hero.getBoundingClientRect()
        const nx = (clientX - r.left) / r.width
        const ny = (clientY - r.top)  / r.height
        tX = (nx * 2 - 1) * 18
        tY = (ny * 2 - 1) * 11
      }
    }

    const onMove  = (e: MouseEvent) => updateTarget(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) updateTarget(t.clientX, t.clientY)
    }

    const tick = () => {
      if (isDesktop()) {
        cX += (tX - cX) * 0.065
        cY += (tY - cY) * 0.065
        if (cardRef.current) cardRef.current.style.transform = `translate(${-cX}px, ${-cY}px)`
      } else {
        tX = 0; tY = 0; cX = 0; cY = 0
        if (cardRef.current) cardRef.current.style.transform = 'none'
      }
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`label anim-fade-up ${styles.eyebrow}`}>Unitechlabs Software &amp; Innovations</p>
          <h1 className={`display anim-fade-up-1 ${styles.headline}`}>
            One platform. Every standard.{' '}
            <span className={styles.tickerWrap} aria-live="polite">
              <span className={styles.ticker} ref={tickerRef}>Lifelong Learning</span>
            </span>
            {' '}
          </h1>
          <p className={`anim-fade-up-2 ${styles.sub}`}>
            UnitechLabs is a Bangalore-based technology company — combining software, IoT, and AI into tailored solutions that tackle your specific industry, business, and technology challenges.
          </p>
          <div className={`anim-fade-up-3 ${styles.ctas}`}>
            <a href="/#services" className="btn btn--primary">Get Started <ArrowRight /></a>
            <a href="#portfolio" className="btn">View Portfolio</a>
          </div>
        </div>

        {/* ── Video card ──
            poster="/og-image.png" is critical for Google Video Indexing.
            Replace with a dedicated video thumbnail image when available.
        ── */}
        <div className={`anim-fade-in ${styles.videoWrap}`} ref={cardRef}>
          <video
            className={styles.video}
            src="/Digital-Lab.mp4"
            poster="/og-image.png"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            aria-label="UnitechLabs — End-to-End Technology Solutions demo reel"
            title="UnitechLabs Digital Lab — Software, IoT & AI Solutions"
            onContextMenu={e => e.preventDefault()}
          />
          <div className={styles.videoOverlay} aria-hidden="true" />
        </div>
      </div>
      <div className={styles.scroll}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  )
}

function ArrowRight() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
}
