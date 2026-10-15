'use client'
import { useRef } from 'react'
import styles from './Partners.module.css'

// ── Add / edit your partners here ──────────────────────────────────────────
// logo: path in /public (e.g. '/p-l/your-partner.svg') or a full https:// URL
// description: one short line on what the partnership is / what they do
type Partner = { name: string; logo?: string; description: string; href?: string }

const PARTNERS: Partner[] = [
  { name: 'GitHub',   logo: 'https://www.pngall.com/wp-content/uploads/13/Github-Logo.png', description: 'Short description of the partnership goes here.' },
  { name: 'Hostinger',   logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Hostinger_Logo.svg/960px-Hostinger_Logo.svg.png',            description: 'Short description of the partnership goes here.' },
  { name: 'GoDaddy', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/GoDaddy_logo.svg/3840px-GoDaddy_logo.svg.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Cloudflare', logo: 'https://www.realclipart.com/png/middle/146-1469373_cloudflare-logo-cloudflare-logo-svg.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Vapi', logo: '/p-l/vapi.svg',            description: 'Short description of the partnership goes here.' },
  { name: 'Razorpay', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/3840px-Razorpay_logo.svg.png',            description: 'Short description of the partnership goes here.' },
  { name: 'OpenAI', logo: 'https://latestlogo.com/media/uploads/2026/09/openai-icon.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Anthropic', logo: 'https://cdn.kmjournal.net/news/photo/202509/3968_7632_5220.jpg',            description: 'Short description of the partnership goes here.' },
  { name: 'Ollama', logo: 'https://images.cloudclusters.io/a32714277ca64812b5e5015fa78b00a7/ollama.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Next.js', logo: 'https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Nvidia', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/4/47/Nvidia_(logo).svg/3840px-Nvidia_(logo).svg.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Google', logo: 'https://freelogopng.com/images/all_img/1657952641google-logo-png-image.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Microsoft Cloud', logo: 'https://static.vecteezy.com/system/resources/previews/021/514/825/non_2x/microsoft-software-brand-logo-symbol-with-name-design-illustration-with-black-background-free-vector.jpg',            description: 'Short description of the partnership goes here.' },
  { name: 'AWS', logo: 'https://logos-world.net/wp-content/uploads/2021/08/Amazon-Web-Services-AWS-Logo.png',            description: 'Short description of the partnership goes here.' },
  { name: 'Coolify', logo: '/p-l/coolify-nextjs.png',            description: 'Short description of the partnership goes here.' },
  // Add more partners above — duplicate a line and edit the fields.
]
// ─────────────────────────────────────────────────────────────────────────

// Triple-duplicate so the marquee loops seamlessly
const TRACK_PARTNERS = [...PARTNERS, ...PARTNERS, ...PARTNERS]

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  return (
    <section className={`section section--alt ${styles.section}`} aria-label="Our partners">
      <div className="container">
        <header className={styles.header}>
          <p className="label" style={{ display: 'block', marginBottom: 14 }}>Our Partners</p>
          <h2 className={`display ${styles.title}`}>
            Companies we <em>build alongside</em>
          </h2>
          <p className={styles.sub}>The technology partners that help us deploy faster, automate smarter and deliver reliable solutions for our clients.</p>
        </header>
      </div>

      <div
        className={styles.viewport}
        onMouseEnter={pause}
        onMouseLeave={resume}
        aria-label="Partner logos carousel"
      >
        <div className={styles.track} ref={trackRef}>
          {TRACK_PARTNERS.map((p, i) => (
            <a
              key={`${p.name}-${i}`}
              className={styles.card}
              href={p.href ?? '#'}
              target={p.href ? '_blank' : undefined}
              rel={p.href ? 'noopener noreferrer' : undefined}
              tabIndex={p.href ? 0 : -1}
              aria-hidden={p.href ? undefined : true}
            >
              <div className={styles.logoWrap}>
                {p.logo
                  ? <img src={p.logo} alt={p.name} className={styles.logo} loading="lazy" decoding="async" />
                  : <span className={styles.logoFallback}>{p.name.charAt(0)}</span>
                }
              </div>
              <span className={styles.name}>{p.name}</span>
              <p className={styles.description}>{p.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
