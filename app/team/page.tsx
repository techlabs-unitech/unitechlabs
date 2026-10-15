import type { Metadata } from 'next'
import Link from 'next/link'
import pageStyles from '@/components/Page.module.css'
import styles from '@/components/Team.module.css'
import TeamCard from '@/components/TeamCard'
import { team, teamGroups } from '@/lib/team'

const BASE_URL = 'https://unitechlabs.io'

export const metadata: Metadata = {
  title: 'Leadership Team',
  description: 'Meet the leadership team at UnitechLabs, the Bangalore-based technology company building custom software, IoT systems and AI products for businesses.',
  alternates: { canonical: `${BASE_URL}/team` },
  openGraph: {
    title: 'Leadership Team | UnitechLabs',
    description: 'Meet the people leading UnitechLabs.',
    url: `${BASE_URL}/team`,
  },
}

const values = [
  { title: 'Integrity', text: 'Description*' },
  { title: 'Innovation', text: 'Description*' },
]

const teamSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnitechLabs',
  url: BASE_URL,
  employee: team.map(m => ({
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    worksFor: { '@type': 'Organization', name: 'UnitechLabs' },
    ...(m.photo ? { image: `${BASE_URL}${m.photo}` } : {}),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
  })),
}

export default function TeamPage() {
  return (
    <div className={pageStyles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }} />

      <section className={pageStyles.hero}>
        <div className={`container ${pageStyles.heroInner}`}>
          <p className="label" style={{ display: 'block', marginBottom: 16 }}>Company</p>
          <h1 className={`display ${pageStyles.heroTitle}`}>Leadership <em>Team</em></h1>
          <p className={pageStyles.heroSub}>
            The people guiding UnitechLabs: engineers, designers and operators who care about building technology that lasts.
          </p>
        </div>
      </section>

      <section className={`section ${pageStyles.inner}`}>
        <div className="container">
          {teamGroups.map((g, i) => {
            const members = team.filter(m => m.group === g)
            if (!members.length) return null
            return (
              <div key={g} className={styles.group}>
                <div className={styles.groupHead}>
                  <h2 className={styles.groupTitle}>{g}</h2>
                  <div className={`${styles.grid} ${i === 0 ? styles.gridLead : styles.gridInner}`}>
                    {members.map(m => <TeamCard key={m.slug} m={m} />)}
                  </div>
                </div>
              </div>
            )
          })}

          <div className={styles.group}>
            <p className="label" style={{ display: 'block' }}>How We Work</p>
            <div className={styles.values}>
              {values.map(v => (
                <div key={v.title} className={styles.value}>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueText}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={pageStyles.cta}>
            <p className={pageStyles.ctaText}>Want to work with us, or join the team?</p>
            <Link href="/contact" className="btn btn--primary">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
