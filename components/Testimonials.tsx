import InstagramCarousel from './InstagramCarousel'
import styles from './Testimonials.module.css'

const stats = [
  { value: '10M+', label: 'End Users Reached' },
  { value: '200+', label: 'Projects Completed' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '90%',  label: 'Returning Clients' },
]

export default function Testimonials() {
  return (
    <>
      <InstagramCarousel />
      <section className="section">
        <div className="container">
          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={`display ${styles.statVal}`}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
