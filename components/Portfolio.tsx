import Link from 'next/link'
import styles from './Portfolio.module.css'

const projects = [
  {
    id: '01',
    title: 'AIOERP — All-in-One Enterprise Resource Planning',
    category: 'ERP · SaaS · Data-Driven',
    desc: 'Running a business is a complex task - handling invoices, tracking stock, managing personnel, and other daily operations. In a market where software is sold separately to manage each of these tasks, AIOERP does all of the above and more.',
    tags: ['ERP', 'Accounting', 'Order Management', 'Manufacturing', 'Asset Management', 'Projects'],
    thumb: <ErpThumb />,
  },
  {
    id: '02',
    title: 'AgriTech AI Protection System',
    category: 'AI · Computer Vision · IoT',
    desc: 'A sustainable AI-powered farm protection system using computer vision, sensors, and ultrasonic repellents to detect and deter animals safely — zero harm, maximum efficiency.',
    tags: ['Computer Vision', 'IoT', 'Sustainability', 'Real-time Alerts'],
    thumb: <AgriThumb />,
  },
  {
    id: '03',
    title: 'Domain & Hosting Platform',
    category: 'SaaS · Infrastructure',
    desc: 'Full-featured web hosting management giving businesses control over domains, SSL, cPanel, and CMS configurations — built for non-technical users and developers alike.',
    tags: ['SaaS', 'cPanel Hosting', 'Free SSL', 'Domain Registration'],
    thumb: <HostingThumb />,
  },
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
          <Link href="/products" className="btn">View All Products</Link>
        </header>
        <div className={styles.list}>
          {projects.map(p => (
            <Link key={p.id} href="/products" className={styles.item}>
              <div className={styles.thumb} aria-hidden="true">
                {p.thumb}
              </div>
              <div className={styles.itemBody}>
                <span className={styles.itemCat}>{p.category}</span>
                <h3 className={`display ${styles.itemTitle}`}>{p.title}</h3>
                <p className={styles.itemDesc}>{p.desc}</p>
                <div className={styles.tags}>
                  {p.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
              <span className={styles.arrow}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SVG Thumbnails — replace with <Image src="…" /> when real photos are ready ──

function AgriThumb() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.thumbSvg}>
      <defs>
        <linearGradient id="agri-bg" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#122012"/><stop offset="1" stopColor="#0a180a"/>
        </linearGradient>
      </defs>
      <rect width="120" height="80" rx="8" fill="url(#agri-bg)"/>
      <rect x="0" y="58" width="120" height="22" fill="#1b4a1b" opacity="0.55"/>
      {/* AI scan orb */}
      <circle cx="95" cy="19" r="10" fill="#c9a96e" opacity="0.20"/>
      <circle cx="95" cy="19" r="6"  fill="#c9a96e" opacity="0.55"/>
      <circle cx="95" cy="19" r="2.5" fill="#f5e0a0"/>
      {/* Scan beams */}
      <line x1="95" y1="28" x2="30" y2="58" stroke="#c9a96e" strokeWidth="0.7" opacity="0.40" strokeDasharray="3 2"/>
      <line x1="95" y1="28" x2="60" y2="58" stroke="#c9a96e" strokeWidth="0.7" opacity="0.40" strokeDasharray="3 2"/>
      <line x1="95" y1="28" x2="88" y2="58" stroke="#c9a96e" strokeWidth="0.7" opacity="0.40" strokeDasharray="3 2"/>
      {/* Plant left */}
      <line x1="30" y1="58" x2="30" y2="38" stroke="#4caf50" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="22" cy="43" rx="9" ry="5" fill="#388e3c" opacity="0.9" transform="rotate(-25 22 43)"/>
      <ellipse cx="39" cy="41" rx="8" ry="4" fill="#4caf50" opacity="0.8" transform="rotate(20 39 41)"/>
      <circle cx="30" cy="58" r="3" fill="#c9a96e"/>
      <circle cx="30" cy="58" r="7"  stroke="#c9a96e" strokeWidth="0.7" opacity="0.35"/>
      {/* Plant centre */}
      <line x1="60" y1="58" x2="60" y2="34" stroke="#4caf50" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="51" cy="39" rx="10" ry="5" fill="#2e7d32" opacity="0.9" transform="rotate(-20 51 39)"/>
      <ellipse cx="70" cy="37" rx="9"  ry="4" fill="#4caf50" opacity="0.8" transform="rotate(15 70 37)"/>
      <circle cx="60" cy="58" r="3" fill="#c9a96e"/>
      <circle cx="60" cy="58" r="7"  stroke="#c9a96e" strokeWidth="0.7" opacity="0.35"/>
      <circle cx="60" cy="58" r="13" stroke="#c9a96e" strokeWidth="0.4" opacity="0.18"/>
    </svg>
  )
}

function ErpThumb() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.thumbSvg}>
      <defs>
        <linearGradient id="erp-bg" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0c1828"/><stop offset="1" stopColor="#081220"/>
        </linearGradient>
      </defs>
      <rect width="120" height="80" rx="8" fill="url(#erp-bg)"/>
      {/* App window */}
      <rect x="7" y="9" width="106" height="62" rx="5" fill="#0f2040" stroke="#1e3a5f" strokeWidth="0.7"/>
      <rect x="7" y="9" width="106" height="10" rx="5" fill="#1e3a5f"/>
      <circle cx="15" cy="14" r="2" fill="#ff5f57" opacity="0.8"/>
      <circle cx="22" cy="14" r="2" fill="#febc2e" opacity="0.8"/>
      <circle cx="29" cy="14" r="2" fill="#28c840" opacity="0.8"/>
      {/* Sidebar */}
      <rect x="7" y="19" width="22" height="52" fill="#0a1e38" opacity="0.8"/>
      <rect x="11" y="25" width="14" height="2" rx="1" fill="#c9a96e" opacity="0.75"/>
      <rect x="11" y="31" width="14" height="2" rx="1" fill="#4a7fb5" opacity="0.5"/>
      <rect x="11" y="37" width="14" height="2" rx="1" fill="#4a7fb5" opacity="0.5"/>
      <rect x="11" y="43" width="14" height="2" rx="1" fill="#4a7fb5" opacity="0.5"/>
      <rect x="11" y="49" width="14" height="2" rx="1" fill="#4a7fb5" opacity="0.5"/>
      {/* KPI cards */}
      <rect x="33" y="22" width="24" height="14" rx="3" fill="#1e3a5f" stroke="#2a4f80" strokeWidth="0.5"/>
      <rect x="61" y="22" width="24" height="14" rx="3" fill="#1e3a5f" stroke="#2a4f80" strokeWidth="0.5"/>
      <rect x="89" y="22" width="20" height="14" rx="3" fill="#1e3a5f" stroke="#2a4f80" strokeWidth="0.5"/>
      <rect x="35" y="25" width="10" height="2" rx="1" fill="#c9a96e" opacity="0.6"/>
      <rect x="35" y="29" width="16" height="3" rx="1" fill="#fff" opacity="0.65"/>
      <rect x="63" y="25" width="10" height="2" rx="1" fill="#c9a96e" opacity="0.6"/>
      <rect x="63" y="29" width="14" height="3" rx="1" fill="#fff" opacity="0.65"/>
      <rect x="91" y="25" width="10" height="2" rx="1" fill="#c9a96e" opacity="0.6"/>
      <rect x="91" y="29" width="12" height="3" rx="1" fill="#fff" opacity="0.65"/>
      {/* Line chart */}
      <rect x="33" y="40" width="48" height="26" rx="3" fill="#1e3a5f" stroke="#2a4f80" strokeWidth="0.5"/>
      <polyline points="37,61 43,53 49,57 55,46 61,51 67,43 73,49" stroke="#c9a96e" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="37,61 43,55 49,59 55,51 61,55 67,47 73,53" stroke="#4a7fb5" strokeWidth="0.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
      {/* Bar chart */}
      <rect x="85" y="40" width="26" height="26" rx="3" fill="#1e3a5f" stroke="#2a4f80" strokeWidth="0.5"/>
      <rect x="88" y="55" width="4" height="8" rx="1" fill="#c9a96e" opacity="0.85"/>
      <rect x="94" y="49" width="4" height="14" rx="1" fill="#4a7fb5" opacity="0.85"/>
      <rect x="100" y="46" width="4" height="17" rx="1" fill="#c9a96e" opacity="0.65"/>
      <rect x="106" y="52" width="4" height="11" rx="1" fill="#4a7fb5" opacity="0.65"/>
    </svg>
  )
}

function HostingThumb() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.thumbSvg}>
      <defs>
        <linearGradient id="host-bg" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#181828"/><stop offset="1" stopColor="#101020"/>
        </linearGradient>
      </defs>
      <rect width="120" height="80" rx="8" fill="url(#host-bg)"/>
      {/* Cloud */}
      <path d="M40 50 Q27 50 27 39 Q27 29 37 29 Q39 19 52 19 Q63 19 65 29 Q75 27 77 38 Q81 50 70 50 Z"
            fill="#24244a" stroke="#c9a96e" strokeWidth="0.9" opacity="0.9"/>
      {/* Down lines to server */}
      <line x1="43" y1="50" x2="43" y2="60" stroke="#c9a96e" strokeWidth="1" opacity="0.55"/>
      <line x1="57" y1="50" x2="57" y2="60" stroke="#c9a96e" strokeWidth="1" opacity="0.55"/>
      <line x1="70" y1="50" x2="70" y2="60" stroke="#c9a96e" strokeWidth="1" opacity="0.55"/>
      {/* Server bar */}
      <rect x="30" y="60" width="60" height="11" rx="3" fill="#1e1e40" stroke="#c9a96e" strokeWidth="0.6"/>
      <circle cx="38" cy="65.5" r="2.5" fill="#4caf50"/>
      <rect x="44" y="63" width="24" height="2" rx="1" fill="#2a2a60" opacity="0.9"/>
      <rect x="44" y="67" width="16" height="2" rx="1" fill="#2a2a60" opacity="0.6"/>
      <circle cx="82" cy="65.5" r="1.8" fill="#c9a96e" opacity="0.75"/>
      <circle cx="87" cy="65.5" r="1.8" fill="#c9a96e" opacity="0.4"/>
      {/* Domain badges */}
      <rect x="15" y="24" width="20" height="8" rx="2" fill="#c9a96e" opacity="0.12" stroke="#c9a96e" strokeWidth="0.6"/>
      <text x="18.5" y="29.5" fontSize="4.2" fill="#c9a96e" fontFamily="monospace" opacity="0.95">.io</text>
      <rect x="85" y="24" width="22" height="8" rx="2" fill="#c9a96e" opacity="0.12" stroke="#c9a96e" strokeWidth="0.6"/>
      <text x="88" y="29.5" fontSize="4.2" fill="#c9a96e" fontFamily="monospace" opacity="0.95">.com</text>
      {/* SSL lock */}
      <path d="M55 37 L55 33 Q55 29 59 29 Q63 29 63 33 L63 37 L65 37 L65 45 Q65 47 63 47 L55 47 Q53 47 53 45 L53 37 Z"
            fill="#1e3520" stroke="#4caf50" strokeWidth="0.7" opacity="0.9"/>
      <rect x="57" y="39" width="4" height="5" rx="1" fill="#4caf50" opacity="0.85"/>
    </svg>
  )
}

function AppDevThumb() {
  return (
    <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.thumbSvg}>
      <defs>
        <linearGradient id="app-bg" x1="0" y1="0" x2="120" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d1a1a"/><stop offset="1" stopColor="#081212"/>
        </linearGradient>
      </defs>
      <rect width="120" height="80" rx="8" fill="url(#app-bg)"/>
      {/* Browser window */}
      <rect x="6" y="7" width="70" height="52" rx="4" fill="#111f1f" stroke="#1e3535" strokeWidth="0.8"/>
      <rect x="6" y="7" width="70" height="10" rx="4" fill="#1e3535"/>
      <circle cx="13" cy="12" r="2" fill="#ff5f57" opacity="0.8"/>
      <circle cx="19" cy="12" r="2" fill="#febc2e" opacity="0.8"/>
      <circle cx="25" cy="12" r="2" fill="#28c840" opacity="0.8"/>
      <rect x="30" y="9"  width="38" height="6" rx="2" fill="#0d1a1a" opacity="0.7"/>
      {/* Code lines */}
      <rect x="12" y="22" width="7"  height="2" rx="1" fill="#c9a96e" opacity="0.85"/>
      <rect x="21" y="22" width="20" height="2" rx="1" fill="#4caf50" opacity="0.7"/>
      <rect x="12" y="27" width="4"  height="2" rx="1" fill="#4a7fb5" opacity="0.9"/>
      <rect x="18" y="27" width="24" height="2" rx="1" fill="#fff"    opacity="0.28"/>
      <rect x="16" y="32" width="6"  height="2" rx="1" fill="#c9a96e" opacity="0.65"/>
      <rect x="24" y="32" width="15" height="2" rx="1" fill="#4a7fb5" opacity="0.75"/>
      <rect x="41" y="32" width="9"  height="2" rx="1" fill="#4caf50" opacity="0.65"/>
      <rect x="12" y="37" width="4"  height="2" rx="1" fill="#4a7fb5" opacity="0.9"/>
      <rect x="18" y="37" width="32" height="2" rx="1" fill="#fff"    opacity="0.22"/>
      <rect x="12" y="42" width="10" height="2" rx="1" fill="#c9a96e" opacity="0.55"/>
      <rect x="24" y="42" width="22" height="2" rx="1" fill="#4caf50" opacity="0.5"/>
      <rect x="12" y="47" width="4"  height="2" rx="1" fill="#4a7fb5" opacity="0.8"/>
      <rect x="18" y="47" width="18" height="2" rx="1" fill="#fff"    opacity="0.2"/>
      {/* Phone mockup */}
      <rect x="82" y="10" width="32" height="58" rx="6" fill="#111f1f" stroke="#1e3535" strokeWidth="0.8"/>
      <rect x="85" y="19" width="26" height="40" rx="2" fill="#0a1515" opacity="0.9"/>
      <circle cx="98" cy="15" r="1.8" fill="#1e3535"/>
      <circle cx="98" cy="62" r="3.5" fill="#1e3535" stroke="#2a4545" strokeWidth="0.5"/>
      {/* App UI on phone */}
      <rect x="87" y="21" width="22" height="7" rx="2" fill="#1e3535"/>
      <rect x="87" y="30" width="10" height="11" rx="2" fill="#c9a96e" opacity="0.18" stroke="#c9a96e" strokeWidth="0.5"/>
      <rect x="99" y="30" width="10" height="11" rx="2" fill="#4a7fb5" opacity="0.18" stroke="#4a7fb5" strokeWidth="0.5"/>
      <rect x="87" y="43" width="22" height="3"  rx="1" fill="#1e3535" opacity="0.85"/>
      <rect x="87" y="48" width="16" height="3"  rx="1" fill="#1e3535" opacity="0.6"/>
      <rect x="87" y="53" width="20" height="3"  rx="1" fill="#1e3535" opacity="0.4"/>
      {/* Connecting wire */}
      <path d="M76 35 Q79 35 82 35" stroke="#c9a96e" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.45"/>
    </svg>
  )
}
