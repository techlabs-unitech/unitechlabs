'use client'
import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const WORDS = ['design', 'develop', 'deploy']
const INTERVAL = 2000
const DURATION = 500

// Festival color orbs — Holi palette
const ORBS = [
  { r: 255, g: 60,  b: 200, size: 520, speed: 0.055, ox:   0, oy:   0 }, // hot-pink
  { r: 0,   g: 210, b: 255, size: 460, speed: 0.040, ox:  90, oy: -70 }, // cyan
  { r: 255, g: 130, b: 0,   size: 420, speed: 0.070, ox: -90, oy:  80 }, // orange
  { r: 140, g: 40,  b: 255, size: 490, speed: 0.048, ox:  70, oy:  70 }, // violet
  { r: 0,   g: 255, b: 140, size: 380, speed: 0.080, ox: -70, oy: -80 }, // lime
]

export default function Hero() {
  const heroRef     = useRef<HTMLElement>(null)
  const cardRef     = useRef<HTMLDivElement>(null)
  const tickerRef   = useRef<HTMLSpanElement>(null)
  const orbLayerRef = useRef<HTMLDivElement>(null)

  const orbPos = useRef(ORBS.map(() => ({ cx: 0.5, cy: 0.5, tx: 0.5, ty: 0.5 })))

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

  // Card parallax + festival orbs
  useEffect(() => {
    let rafId: number
    let tX = 0, tY = 0, cX = 0, cY = 0

    const isDesktop = () => window.innerWidth > 960

    const updateTarget = (clientX: number, clientY: number) => {
      const hero = heroRef.current
      if (!hero) return
      hero.style.setProperty('--mouse-x', `${clientX}px`)
      hero.style.setProperty('--mouse-y', `${clientY}px`)
      const r = hero.getBoundingClientRect()
      const nx = (clientX - r.left) / r.width
      const ny = (clientY - r.top)  / r.height
      if (isDesktop()) {
        tX = (nx * 2 - 1) * 18
        tY = (ny * 2 - 1) * 11
      }
      ORBS.forEach((o, i) => {
        orbPos.current[i].tx = nx + o.ox / (r.width  || 1)
        orbPos.current[i].ty = ny + o.oy / (r.height || 1)
      })
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

      const layer = orbLayerRef.current
      if (layer) {
        const parts = ORBS.map((o, i) => {
          const p = orbPos.current[i]
          p.cx += (p.tx - p.cx) * o.speed
          p.cy += (p.ty - p.cy) * o.speed
          const x = (p.cx * 100).toFixed(2)
          const y = (p.cy * 100).toFixed(2)
          return `radial-gradient(${o.size}px circle at ${x}% ${y}%, rgba(${o.r},${o.g},${o.b},0.55), transparent 72%)`
        })
        layer.style.background = parts.join(', ')
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
      <div className={styles.festivalOrbs} ref={orbLayerRef} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`label anim-fade-up ${styles.eyebrow}`}>Unitechlabs Software &amp; Innovations</p>
          <h1 className={`display anim-fade-up-1 ${styles.headline}`}>
            We{' '}
            <span className={styles.tickerWrap} aria-live="polite">
              <span className={styles.ticker} ref={tickerRef}>design</span>
            </span>
            {' '}end&#8209;to&#8209;end<br />technology solutions
          </h1>
          <p className={`anim-fade-up-2 ${styles.sub}`}>
            UnitechLabs is a Bangalore-based technology company — combining software, IoT, and AI into tailored solutions that tackle your specific industry, business, and technology challenges.
          </p>
          <div className={`anim-fade-up-3 ${styles.ctas}`}>
            <a href="/#services" className="btn btn--primary">Get Started <ArrowRight /></a>
            <a href="#portfolio" className="btn">View Portfolio</a>
          </div>
        </div>
        <div className={`anim-fade-in ${styles.videoWrap}`} ref={cardRef}>
          <video className={styles.video} src="/Digital-Lab.mp4" autoPlay muted loop playsInline
            disablePictureInPicture
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
