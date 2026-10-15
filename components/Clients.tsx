'use client'
import styles from './Clients.module.css'

const clients = [
  { name: 'Sunrise Advertising', logo: '/p-l/sunrise_ads_logo.png' },
  { name: 'Navkis Educational Centre',           logo: '/p-l/NEC-Logo.svg' },
  { name: 'Navkis Educational Centre',           logo: 'https://www.izrasmile.org/_next/image?url=%2Fimages%2FWhatsApp%20Image%202026-10-01%20at%206.47.04%20AM%20(1).jpeg&w=96&q=75' },
  // Fixed: was http:// — mixed-content warning; changed to https
  { name: 'AQ Research',         logo: '/p-l/aq-r.svg' },
  { name: 'Bangalore Realtors',         logo: 'https://bangalorerealtors.com/images/header/logo.png' },
  { name: 'EMBS',                logo: '/p-l/Extra_Mile_Business_Solutions.png' },
  { name: 'Srisai Swamy Seva Foundation',             logo: '/p-l/SSSF_LOGO.png' },
  { name: 'Sanchalana News Kannada',             logo: '/p-l/sanchalana_news-Kannada_Chanel_logo.jpeg' },
  { name: 'VAPI',                logo: '/p-l/vapi.svg' },
  { name: 'SVIT',         logo: '/p-l/sai_vidhya_institute_logo.png' },
  { name: 'Dr. Kite Academy',    logo: '/p-l/dr_kite_academy_logo.png' },
  { name: 'Sparkmindz',          logo: 'https://sparkmindz.com/brand/spark-mindz-logo.webp' },
]
const doubled = [...clients, ...clients]

export default function Clients() {
  return (
    <section className={styles.wrap} aria-label="Trusted by our clients">
      <div className="container">
        <div className={styles.layout}>
          <h2 className={styles.heading}>Trusted by industry leaders</h2>

          {/* Scrolling logo carousel */}
          <div className={styles.track}>
            <div className={styles.list}>
              {doubled.map((c, i) => (
                <span key={i} className={styles.client}>
                  {c.logo
                    ? (
                      <img
                        src={c.logo}
                        alt={c.name}
                        className={styles.logo}
                        loading="lazy"
                        decoding="async"
                      />
                    )
                    : <span className={styles.clientName}>{c.name}</span>
                  }
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
