import styles from './Testimonials.module.css'

const testimonials = [
  { quote: 'UnitechLabs has a very simplified interface to manage VPS and Dedicated Servers. A non-technical person can easily host a domain, manage a hosting account, install SSL, and configure CMS platforms.', name: 'Vinay Kumar S', role: 'Research Assistant' },
  { quote: 'Working with UnitechLabs transformed our digital presence. Their team understood our requirements from day one and delivered a solution that exceeded every expectation.', name: 'Elene Claes', role: 'Marketing Manager' },
  { quote: 'The team augmentation service was exactly what we needed. Senior developers who integrated seamlessly with our workflows and added tremendous value from the very first sprint.', name: 'Arjun Mehta', role: 'CTO, Fintech Startup' },
]

const stats = [
  { value: '10M+', label: 'End Users Reached' },
  { value: '200+', label: 'Projects Completed' },
  { value: '4.9/5', label: 'Customer Rating' },
  { value: '90%', label: 'Returning Clients' },
]

export default function Testimonials() {
  return (
    <section className="section section--alt">
      <div className="container">
        <header className={styles.header}>
          <p className="label" style={{ display: 'block', marginBottom: 14 }}>Client Voices</p>
          <h2 className={`display ${styles.title}`}>Positive reviews from<br /><em>our customers</em></h2>
        </header>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.stars}>{'★★★★★'}</div>
              <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>
              <footer className={styles.author}>
                <div className={styles.avatar}>{t.name[0]}</div>
                <div><p className={styles.name}>{t.name}</p><p className={styles.role}>{t.role}</p></div>
              </footer>
            </div>
          ))}
        </div>
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
  )
}
