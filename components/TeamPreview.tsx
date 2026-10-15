import Link from 'next/link'
import styles from './Team.module.css'
import TeamCard from './TeamCard'
import { team } from '@/lib/team'

export default function TeamPreview() {
  const featured = team.filter(m => m.featured).slice(0, 4)
  return (
    <section id="team" className="section section--alt">
      <div className="container">
        <header className={styles.header}>
          <div>
            <p className="label" style={{ display: 'block', marginBottom: 14 }}>From the founder's desk</p>
            <h2 className={`display ${styles.title}`}>Leadership <em>Team</em></h2>
          </div>
          <Link href="/team" className="btn">Meet the Team</Link>
        </header>
        <div className={styles.grid}>
          {featured.map(m => <TeamCard key={m.slug} m={m} showBio={false} />)}
        </div>
      </div>
    </section>
  )
}
