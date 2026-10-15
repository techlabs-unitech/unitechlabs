'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Site-wide "celebration" layer: fireworks, click crackers, sparkler cursor, ground fountains,
 * spinning wheels, floating lanterns, marigold petals, string lights, faint rangoli mandalas,
 * rising embers, scroll progress glow, a finale at the page bottom and gentle scroll-reveal.
 *
 *  • Sits on a fixed, pointer-events:none canvas — never blocks clicks, never shifts layout.
 *  • Auto fireworks launch from the side margins on wide screens, so text stays clear.
 *  • Respects prefers-reduced-motion (off by default) and has a visitor toggle (remembered).
 *  • Pauses when the tab is hidden or while someone is typing in a form.
 *
 *  To remove the whole thing later: delete <Festive /> from app/layout.tsx.
 */

const STORE_KEY = 'utl-fx'
const PALETTE = ['#FFB800', '#FF7A1A', '#FF3D81', '#FFD98A', '#2FD3A0', '#8B6CFF', '#FF4D2E', '#C9A96E']
const GOLDS = ['#FFB800', '#FFD98A', '#FF9A1F', '#C9A96E']
const MARIGOLD = ['#FF9F1C', '#FFB627', '#FF7A1A', '#FFC857']

// String lights: deterministic so server and client markup match
const BULBS = Array.from({ length: 56 }, (_, i) => ({
  left: `${((i + 0.5) / 56) * 100}%`,
  h: 8 + ((i * 7) % 5) * 3,
  d: `${((i * 0.37) % 2.4).toFixed(2)}s`,
}))

function Mandala({ className }: { className: string }) {
  const rot = (n: number, total: number) => `rotate(${(n * 360) / total} 300 300)`
  return (
    <div className={`fx-mandala ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="300" cy="300" r="290" />
        <circle cx="300" cy="300" r="272" strokeDasharray="2 7" />
        <circle cx="300" cy="300" r="150" />
        <circle cx="300" cy="300" r="96" />
        <circle cx="300" cy="300" r="40" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={'o' + i} d="M300 22 Q338 96 300 150 Q262 96 300 22Z" transform={rot(i, 8)} />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={'p' + i} cx="300" cy="196" rx="20" ry="52" transform={rot(i, 16)} />
        ))}
        {Array.from({ length: 24 }, (_, i) => (
          <path key={'l' + i} d="M300 262 Q312 282 300 304 Q288 282 300 262Z" transform={rot(i, 24)} />
        ))}
        {Array.from({ length: 36 }, (_, i) => (
          <circle key={'d' + i} cx="300" cy="22" r="3" fill="currentColor" transform={rot(i, 36)} />
        ))}
      </svg>
    </div>
  )
}

type Particle = {
  x: number; y: number; vx: number; vy: number
  life: number; max: number; size: number; color: string
  kind: 0 | 1  // 0 = streak spark, 1 = twinkle dot
  g: number; drag: number; crackle?: boolean
}
type Rocket = { x: number; y: number; vx: number; vy: number; ty: number; color: string; big: boolean }
type Flash = { x: number; y: number; life: number; max: number; r: number; color: string }
type Ember = { x: number; y: number; s: number; r: number; ph: number; sp: number }
type Spinner = { x: number; y: number; a: number; life: number; max: number }
type Fountain = { x: number; y: number; life: number; max: number; lean: number }
type Lantern = { x: number; y: number; vy: number; ph: number; sp: number; size: number }
type Petal = { x: number; y: number; vx: number; vy: number; rot: number; vr: number; ph: number; size: number; color: string }

const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export default function Festive() {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(true)
  const [ready, setReady] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  /* ── read saved preference ── */
  useEffect(() => {
    const saved = localStorage.getItem(STORE_KEY)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(saved ? saved === 'on' : !reduce)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.classList.toggle('fx-off', !enabled)
  }, [enabled, ready])

  const toggle = () => {
    setEnabled(v => {
      localStorage.setItem(STORE_KEY, v ? 'off' : 'on')
      return !v
    })
  }

  /* ── scroll progress glow ── */
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = barRef.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      el.style.transform = `scaleX(${p})`
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  /* ── gentle scroll-reveal for sections (skips the first/hero section) ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return
    let io: IntersectionObserver | null = null
    let failsafe: number
    const t = window.setTimeout(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section, .section'))
        .filter((el, i, arr) => arr.indexOf(el) === i)
      const first = document.querySelector('section')
      const targets = sections.filter(el => el !== first && !el.closest('header, footer, nav'))
      io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('fx-in')
            io?.unobserve(e.target)
          }
        })
      }, { threshold: 0.06, rootMargin: '0px 0px -6% 0px' })
      targets.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.92) return // already visible: leave alone
        el.classList.add('fx-reveal')
        io!.observe(el)
      })
      // failsafe: never leave content hidden
      failsafe = window.setTimeout(() => {
        document.querySelectorAll('.fx-reveal:not(.fx-in)').forEach(el => el.classList.add('fx-in'))
      }, 6000)
    }, 120)
    return () => {
      clearTimeout(t); clearTimeout(failsafe); io?.disconnect()
      document.querySelectorAll('.fx-reveal').forEach(el => el.classList.remove('fx-reveal', 'fx-in'))
    }
  }, [pathname])

  /* ── fireworks engine ── */
  useEffect(() => {
    if (!ready || !enabled) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, dpr = 1
    let dark = document.documentElement.getAttribute('data-theme') === 'dark'
    const themeObs = new MutationObserver(() => {
      dark = document.documentElement.getAttribute('data-theme') === 'dark'
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    const particles: Particle[] = []
    const rockets: Rocket[] = []
    const flashes: Flash[] = []
    let embers: Ember[] = []
    const spinners: Spinner[] = []
    const fountains: Fountain[] = []
    let lanterns: Lantern[] = []
    let petals: Petal[] = []

    const isSmall = () => w < 700
    const cap = () => (isSmall() ? 380 : 800)

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, isSmall() ? 1.5 : 2)
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = isSmall() ? 9 : Math.min(26, Math.floor(w / 60))
      embers = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        s: rnd(0.15, 0.5), r: rnd(0.8, 2.2), ph: Math.random() * 6.28, sp: rnd(0.01, 0.03),
      }))
      const wide = w > 1100
      const sideX = () => (Math.random() < 0.5 ? w * rnd(0.02, 0.17) : w * rnd(0.83, 0.98))
      lanterns = Array.from({ length: isSmall() ? 2 : wide ? 5 : 3 }, () => ({
        x: wide ? sideX() : w * rnd(0.05, 0.95), y: rnd(0, h), vy: rnd(0.22, 0.42),
        ph: Math.random() * 6.28, sp: rnd(0.008, 0.016), size: isSmall() ? rnd(11, 15) : rnd(16, 24),
      }))
      petals = Array.from({ length: isSmall() ? 4 : 10 }, () => ({
        x: wide && Math.random() < 0.6 ? sideX() : Math.random() * w, y: rnd(-h, h),
        vx: rnd(-0.15, 0.15), vy: rnd(0.35, 0.8), rot: Math.random() * 6.28, vr: rnd(-0.03, 0.03),
        ph: Math.random() * 6.28, size: isSmall() ? rnd(3, 4.5) : rnd(4, 6.5), color: pick(MARIGOLD),
      }))
    }
    resize()

    const sparkCols = () => (dark
      ? ['#FFF4D2', '#FFD98A', '#FFB800', '#FFFFFF']
      : ['#FF9A1F', '#FFB800', '#E8892B', '#FF7A1A'])

    // sparkler: fine crackling sparks
    const sparkle = (x: number, y: number, n: number, speed: number) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = rnd(0.5, 1) * speed
        particles.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 0.3, life: 0, max: rnd(12, 26),
          size: rnd(0.8, 1.5), color: pick(sparkCols()), kind: 0, g: 0.07, drag: 0.93,
        })
      }
    }

    const launchFountain = (x?: number) => {
      if (fountains.length > 2) return
      const wide = w > 1100
      const fx = x ?? (wide
        ? (Math.random() < 0.5 ? w * rnd(0.02, 0.16) : w * rnd(0.84, 0.98))
        : (Math.random() < 0.5 ? w * rnd(0.12, 0.3) : w * rnd(0.7, 0.88)))
      fountains.push({ x: fx, y: h, life: 0, max: 140, lean: rnd(-0.3, 0.3) })
    }

    const launchSpinner = (x: number, y: number) => {
      if (spinners.length > 2) return
      spinners.push({ x, y, a: Math.random() * 6.28, life: 0, max: 85 })
    }

    /* effects */
    const burst = (x: number, y: number, o: { n: number; speed: number; pattern: 'peony' | 'ring' | 'willow' | 'crackle'; color: string; color2?: string }) => {
      if (particles.length > cap()) return
      for (let i = 0; i < o.n; i++) {
        const a = o.pattern === 'ring' ? (i / o.n) * Math.PI * 2 : Math.random() * Math.PI * 2
        const sp = o.pattern === 'ring' ? o.speed : o.speed * rnd(0.3, 1)
        const willow = o.pattern === 'willow'
        particles.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
          life: 0, max: willow ? rnd(70, 110) : rnd(40, 70),
          size: willow ? 1.3 : rnd(1.2, 2.4),
          color: o.color2 && Math.random() < 0.35 ? o.color2 : o.color,
          kind: 0, g: willow ? 0.045 : 0.03, drag: willow ? 0.975 : 0.965,
          crackle: o.pattern === 'crackle',
        })
      }
      flashes.push({ x, y, life: 0, max: 14, r: o.speed * 22, color: o.color })
    }

    const explode = (x: number, y: number, big: boolean) => {
      const pattern = pick(['peony', 'ring', 'willow', 'crackle'] as const)
      const color = pattern === 'willow' ? pick(GOLDS) : pick(PALETTE)
      const base = isSmall() ? 3.2 : 4.4
      burst(x, y, {
        n: Math.floor((big ? 100 : 70) * (isSmall() ? 0.65 : 1)),
        speed: base * rnd(0.85, 1.25),
        pattern, color, color2: pick(PALETTE),
      })
    }

    const launch = (opts?: { x?: number; big?: boolean }) => {
      if (rockets.length > 4) return
      const wide = w > 1100
      const x = opts?.x ?? (wide
        ? (Math.random() < 0.5 ? w * rnd(0.03, 0.2) : w * rnd(0.8, 0.97))
        : w * rnd(0.1, 0.9))
      const ty = h * (wide ? rnd(0.12, 0.5) : rnd(0.1, 0.38))
      const frames = rnd(42, 60)
      rockets.push({
        x, y: h + 8, vx: rnd(-0.5, 0.5), vy: -((h + 8 - ty) / frames),
        ty, color: pick(PALETTE), big: !!opts?.big,
      })
    }

    const clickBurst = (x: number, y: number) => {
      burst(x, y, {
        n: isSmall() ? 22 : 34, speed: 2.6,
        pattern: Math.random() < 0.5 ? 'ring' : 'peony', color: pick(PALETTE), color2: pick(GOLDS),
      })
      for (let i = 0; i < 6; i++) {
        particles.push({
          x, y, vx: rnd(-1.4, 1.4), vy: rnd(-2.4, -0.6), life: 0, max: rnd(30, 50),
          size: rnd(1.4, 2.4), color: pick(GOLDS), kind: 1, g: 0.03, drag: 0.97,
        })
      }
    }

    /* input */
    let lastClick = 0, lastMove = 0
    const onDown = (e: PointerEvent) => {
      const now = performance.now()
      if (now - lastClick < 140) return
      lastClick = now
      if (Math.random() < 0.22) launchSpinner(e.clientX, e.clientY)
      else clickBurst(e.clientX, e.clientY)
    }
    let curX = 0, curY = 0, curT = 0
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const now = performance.now()
      if (now - lastMove < 14 || particles.length > cap()) return
      lastMove = now
      curX = e.clientX; curY = e.clientY; curT = now
      sparkle(curX, curY, 4, 3.2)
      const t = e.target as Element | null
      if (t && t.closest && t.closest('.btn')) sparkle(curX, curY, 3, 4.5)
    }
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)

    /* opening finale — once per browser session */
    const introTimers: number[] = []
    let finaleArmed = true
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (max < 200) return
      const p = window.scrollY / max
      if (p > 0.985 && finaleArmed) {
        finaleArmed = false
        ;[0.2, 0.5, 0.8].forEach((fx, i) => introTimers.push(window.setTimeout(() => launch({ x: w * fx, big: true }), i * 260)))
        launchFountain(w * 0.1); launchFountain(w * 0.9)
      } else if (p < 0.8) finaleArmed = true
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    if (!sessionStorage.getItem('utl-fx-intro')) {
      sessionStorage.setItem('utl-fx-intro', '1')
      const wide = window.innerWidth > 1100
      const xs = wide ? [0.1, 0.9, 0.2, 0.8, 0.5] : [0.25, 0.75, 0.5, 0.3, 0.7]
      introTimers.push(window.setTimeout(() => { launchFountain(w * 0.08); launchFountain(w * 0.92) }, 600))
      xs.forEach((fx, i) => introTimers.push(window.setTimeout(() => launch({ x: window.innerWidth * fx, big: true }), 900 + i * 380)))
    }

    /* loop */
    let raf = 0, last = performance.now(), nextLaunch = rnd(2500, 4000), nextFountain = rnd(6000, 10000)
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      const ms = now - last; last = now
      const dt = Math.min(ms / 16.667, 3)

      // auto launches (skip while typing in a form)
      const ae = document.activeElement
      const typing = ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)
      nextLaunch -= ms
      if (nextLaunch <= 0) {
        if (!typing) launch()
        nextLaunch = isSmall() ? rnd(4500, 8000) : rnd(2600, 5200)
      }
      nextFountain -= ms
      if (nextFountain <= 0) {
        if (!typing) launchFountain()
        nextFountain = isSmall() ? rnd(9000, 15000) : rnd(6000, 11000)
      }

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineCap = 'round'

      // marigold petals drifting down
      for (const p of petals) {
        p.y += p.vy * dt; p.ph += 0.02 * dt; p.rot += p.vr * dt
        p.x += (Math.sin(p.ph) * 0.5 + p.vx) * dt
        if (p.y > h + 12) { p.y = -12; p.x = Math.random() * w }
        ctx.globalAlpha = 0.55; ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(p.x, p.y, p.size, p.size * 0.5 * Math.abs(Math.cos(p.ph * 1.5)) + 0.8, p.rot, 0, 6.283)
        ctx.fill()
      }

      // floating lanterns
      for (const l of lanterns) {
        l.y -= l.vy * dt; l.ph += l.sp * dt
        if (l.y < -50) { l.y = h + 50; l.vy = rnd(0.22, 0.42) }
        const x = l.x + Math.sin(l.ph) * 10, y = l.y, sz = l.size
        const fl = 0.85 + 0.15 * Math.sin(l.ph * 9)
        const glow = ctx.createRadialGradient(x, y, 0, x, y, sz * 2.4)
        glow.addColorStop(0, `rgba(255,170,50,${0.45 * fl * (dark ? 1 : 0.65)})`)
        glow.addColorStop(1, 'rgba(255,170,50,0)')
        ctx.globalAlpha = 1; ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(x, y, sz * 2.4, 0, 6.283); ctx.fill()
        const bw = sz * 0.75, bh = sz
        const body = ctx.createLinearGradient(x, y - bh / 2, x, y + bh / 2)
        body.addColorStop(0, '#FFC15A'); body.addColorStop(1, '#FF7A1A')
        ctx.globalAlpha = 0.6 + 0.25 * fl; ctx.fillStyle = body
        ctx.beginPath()
        ctx.moveTo(x - bw * 0.35, y - bh / 2); ctx.lineTo(x + bw * 0.35, y - bh / 2)
        ctx.lineTo(x + bw / 2, y + bh / 2); ctx.lineTo(x - bw / 2, y + bh / 2)
        ctx.closePath(); ctx.fill()
        ctx.globalAlpha = 0.5; ctx.strokeStyle = 'rgba(120,40,0,0.45)'; ctx.lineWidth = 0.8
        ctx.beginPath(); ctx.moveTo(x, y - bh / 2); ctx.lineTo(x, y + bh / 2); ctx.stroke()
        ctx.globalAlpha = 0.9 * fl; ctx.fillStyle = '#FFF1C9'
        ctx.beginPath(); ctx.arc(x, y + bh * 0.18, sz * 0.12, 0, 6.283); ctx.fill()
      }

      ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over'

      // embers
      for (const e of embers) {
        e.y -= e.s * dt; e.ph += e.sp * dt
        e.x += Math.sin(e.ph) * 0.35 * dt
        if (e.y < -10) { e.y = h + 10; e.x = Math.random() * w }
        const a = (0.35 + 0.35 * Math.sin(e.ph * 2.2)) * (dark ? 0.75 : 0.6)
        ctx.globalAlpha = Math.max(0, a)
        ctx.fillStyle = dark ? '#FFB347' : '#E8892B'
        ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, 6.283); ctx.fill()
      }

      // ground fountains
      for (let i = fountains.length - 1; i >= 0; i--) {
        const f = fountains[i]
        f.life += dt
        if (f.life >= f.max) { fountains.splice(i, 1); continue }
        const taper = 1 - (f.life / f.max) * 0.6
        const n = Math.ceil(5 * dt * taper)
        if (particles.length < cap()) {
          for (let k = 0; k < n; k++) {
            particles.push({
              x: f.x + rnd(-3, 3), y: f.y - 2, vx: rnd(-1.1, 1.1) + f.lean, vy: -rnd(5.5, 9) * (isSmall() ? 0.8 : 1),
              life: 0, max: rnd(38, 64), size: rnd(1, 1.8),
              color: Math.random() < 0.7 ? pick(sparkCols()) : pick(GOLDS), kind: 0, g: 0.14, drag: 0.99,
            })
          }
        }
        const gg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 46)
        gg.addColorStop(0, '#FFB800'); gg.addColorStop(1, 'rgba(255,184,0,0)')
        ctx.globalAlpha = taper * (dark ? 0.35 : 0.25); ctx.fillStyle = gg
        ctx.beginPath(); ctx.arc(f.x, f.y, 46, 0, 6.283); ctx.fill()
      }

      // spinning wheels (ground chakra)
      for (let i = spinners.length - 1; i >= 0; i--) {
        const sp = spinners[i]
        sp.life += dt; sp.a += 0.42 * dt
        if (sp.life >= sp.max) { spinners.splice(i, 1); continue }
        if (particles.length < cap()) {
          for (let k = 0; k < 3; k++) {
            const ang = sp.a + k * 2.094
            particles.push({
              x: sp.x + Math.cos(ang) * 4, y: sp.y + Math.sin(ang) * 4,
              vx: Math.cos(ang + 0.9) * 2.6, vy: Math.sin(ang + 0.9) * 2.6, life: 0, max: rnd(16, 26),
              size: 1.4, color: Math.random() < 0.5 ? pick(PALETTE) : pick(GOLDS), kind: 0, g: 0.05, drag: 0.95,
            })
          }
        }
        ctx.globalAlpha = 0.9 * (1 - sp.life / sp.max); ctx.fillStyle = dark ? '#FFF4D2' : '#FF7A1A'
        ctx.beginPath(); ctx.arc(sp.x, sp.y, 3, 0, 6.283); ctx.fill()
      }

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        r.x += r.vx * dt; r.y += r.vy * dt
        if (particles.length < cap()) {
          particles.push({
            x: r.x, y: r.y, vx: rnd(-0.2, 0.2), vy: rnd(0.2, 0.8), life: 0, max: rnd(10, 18),
            size: 1.4, color: '#FFD98A', kind: 1, g: 0.01, drag: 0.95,
          })
        }
        ctx.globalAlpha = 1; ctx.fillStyle = dark ? '#FFF1C9' : '#FF7A1A'
        ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, 6.283); ctx.fill()
        if (r.y <= r.ty) { explode(r.x, r.y, r.big); rockets.splice(i, 1) }
      }

      // flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i]
        f.life += dt
        if (f.life >= f.max) { flashes.splice(i, 1); continue }
        const k = 1 - f.life / f.max
        const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r)
        g.addColorStop(0, f.color); g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.globalAlpha = k * (dark ? 0.35 : 0.22)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill()
      }

      // particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life += dt
        if (p.life >= p.max) {
          if (p.crackle && particles.length < cap()) {
            for (let c = 0; c < 3; c++) {
              particles.push({
                x: p.x, y: p.y, vx: rnd(-1.2, 1.2), vy: rnd(-1.2, 1.2), life: 0, max: rnd(8, 16),
                size: 1.2, color: '#FFF1C9', kind: 1, g: 0.02, drag: 0.94,
              })
            }
          }
          particles.splice(i, 1); continue
        }
        p.vx *= Math.pow(p.drag, dt); p.vy = p.vy * Math.pow(p.drag, dt) + p.g * dt
        p.x += p.vx * dt; p.y += p.vy * dt
        const k = 1 - p.life / p.max
        ctx.globalAlpha = Math.min(1, k * 1.4) * (p.kind === 1 ? 0.5 + 0.5 * Math.random() : 1)
        if (p.kind === 0) {
          ctx.strokeStyle = p.color; ctx.lineWidth = p.size * (0.5 + k * 0.5)
          ctx.beginPath(); ctx.moveTo(p.x - p.vx * 1.8, p.y - p.vy * 1.8); ctx.lineTo(p.x, p.y); ctx.stroke()
        } else {
          ctx.fillStyle = p.color
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size * (0.4 + k * 0.6), 0, 6.283); ctx.fill()
        }
      }
      // sparkler core at the cursor while it moves
      const sinceMove = now - curT
      if (curT > 0 && sinceMove < 220) {
        const ca = 1 - sinceMove / 220
        const cg = ctx.createRadialGradient(curX, curY, 0, curX, curY, 12)
        cg.addColorStop(0, dark ? 'rgba(255,244,210,1)' : 'rgba(255,154,31,1)')
        cg.addColorStop(1, 'rgba(255,184,0,0)')
        ctx.globalAlpha = ca * 0.9; ctx.fillStyle = cg
        ctx.beginPath(); ctx.arc(curX, curY, 12, 0, 6.283); ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame) } }
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = 0 } }
    const onVis = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVis)
    start()

    return () => {
      stop()
      introTimers.forEach(clearTimeout)
      themeObs.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [enabled, ready])

  return (
    <>
      <div className="fx-ambient" aria-hidden="true" />
      <Mandala className="fx-mandala--a" />
      <Mandala className="fx-mandala--b" />
      <div className="fx-lights" aria-hidden="true">
        {BULBS.map((b, i) => (
          <span key={i} className="fx-bulb" style={{ left: b.left, ['--h' as string]: `${b.h}px`, ['--d' as string]: b.d } as React.CSSProperties} />
        ))}
      </div>
      <div className="fx-progress" aria-hidden="true"><div ref={barRef} className="fx-progress__bar" /></div>
      <canvas ref={canvasRef} className="fx-canvas" aria-hidden="true" />
      {ready && (
        <button
          type="button"
          className={`fx-toggle ${enabled ? 'is-on' : ''}`}
          onClick={toggle}
          aria-pressed={enabled}
          aria-label={enabled ? 'Turn off sparkle effects' : 'Turn on sparkle effects'}
          title={enabled ? 'Sparkle effects: on' : 'Sparkle effects: off'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zm7 11l.9 2.6L22.5 16l-2.6.9L19 19.5l-.9-2.6-2.6-.9 2.6-.9L19 13zM5.5 14l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8L3 16.5l1.8-.7.7-1.8z"/>
          </svg>
        </button>
      )}
    </>
  )
}
