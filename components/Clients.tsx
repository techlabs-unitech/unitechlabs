'use client'
import Image from 'next/image'
import styles from './Clients.module.css'

const clients = [
  { name: 'Sunrise Advertising', logo: 'https://sunriseadvertising.org/images/hero/logo.svg' },
  { name: 'Craftuary',           logo: 'https://craftuary.com/favicon.ico' },
  { name: 'Navkis',           logo: 'https://navkis.in/wp-content/uploads/2024/09/NEC-Logo_page-0001-1.svg' },
  // Fixed: was http:// — mixed-content warning; changed to https
  { name: 'Aroush Tech',         logo: 'https://aroushtech.in/wp-content/uploads/2025/06/AS-ED-LOGO-11_-_Edited-removebg-preview.png' },
  { name: 'AQ Research',         logo: '/p-l/aq-r.svg' },
  { name: 'EMBS',                logo: 'https://extramilesolutions.in/img/logo1.jpg' },
  { name: 'Coolify',             logo: '/p-l/coolify-nextjs.png' },
  { name: 'VAPI',                logo: '/p-l/vapi.svg' },
  { name: 'SVIT',         logo: 'https://saividya.ac.in/assets/images/logo/svit_tra.png' },
  { name: 'Dr. Kite Academy',    logo: 'https://www.drkiteacademy.com/gallery_images/favicon.svg' },
]
const doubled = [...clients, ...clients]

export default function Clients() {
  return (
    <section className={styles.wrap} aria-label="Trusted by our clients">
      <div className="container">
        <div className={styles.layout}>

          {/* Badge — desktop: left of carousel | mobile: above carousel */}
          <div className={styles.badgeContainer}>
            <Image
              src="/goodfirms-and-google.png"
              alt="GoodFirms, Google Verified badges & Justdail Top Rated"
              width={400}
              height={120}
              className={styles.badgeImage}
              priority
            />
          </div>

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
