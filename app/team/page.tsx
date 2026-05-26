import type { Metadata } from 'next'
import styles from '@/components/Page.module.css'

export const metadata: Metadata = {
  title: 'Meet the Team — Engineers, Designers & Innovators',
  description: 'Meet the people behind UnitechLabs — a passionate team of engineers, designers, and innovators building cutting-edge software, IoT, and AI solutions from Bangalore.',
  alternates: { canonical: 'https://unitechlabs.io/team' },
  openGraph: { title: 'Meet the UnitechLabs Team', url: 'https://unitechlabs.io/team' },
}

const team = [
  { name: 'Sudharshan V R', role: 'Founder & CEO', bio: 'Sudharshan is leading the company’s strategy, systems, and execution across its core business functions. He is overseeing product development, operations, and growth initiatives. His leadership is centered on creating structured, self-sustaining systems that bridge the gap between innovation and real-world application.', image: '/team/sudharshan.png', initial: 'S' },
  { name: 'Sudharsan Kathiresan', role: 'Founder Marketing Advisor', bio: 'Sudharsan is the Founder Marketing Advisor at UnitechLabs and has been with the company since its early days. He guides marketing strategy, brand positioning, and growth initiatives, working closely with CEO to shape how the company\'s products are introduced and scaled in the market.', image: '/team/sudharsan.jpeg', initial: 'S' },
  { name: 'Manjunath Sathya', role: 'Investor | MD @ AQ researchs', bio: 'Manjunath is a strategic partner of UnitechLabs, supporting the company through resources, advisory input, and long-term collaboration for over 4+ years. He works closely with the founder, contributing to operational stability and enabling the development of scalable solutions through a mutually beneficial partnership.', image: '/team/manjunath.jpg', initial: 'M' },
  { name: 'Kedilungdiakbo Z', role: 'President', bio: 'Kedilungdiakbo is the President of UnitechLabs. He leads collaborations & strategic partnerships, ensuring that innovation moves efficiently from ideas to real-world deployment.', image: '/team/kedilungdiakbo.png', initial: 'K' },
  { name: 'Atul Kumar', role: 'Co-Founder', bio: 'Atul Kumar is Co-Founder at UnitechLabs, focusing on management and operational excellence. He ensures timely delivery of products and maintains quality management standards across all development initiatives.', image: '/team/atul.png', initial: 'A' },
]

export default function TeamPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="label" style={{ display: 'block', marginBottom: 16 }}>Unitechlabs leadership team update</p>
          <h1 className={`display ${styles.heroTitle}`}>Our <em>team</em></h1>
          <p className={styles.heroSub}>We’re happy to announce several executive role changes that reflect our recent progress and will ensure continued momentum toward our next major milestones.</p>
        </div>
      </section>
      <section className={`section ${styles.inner}`}>
        <div className="container">
          <div className={styles.teamGrid}>
            {team.map((m, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.avatar}>
                  <img src={m.image} alt={m.name} className={styles.avatarImage} />
                </div>
                <h3 className={styles.name}>{m.name}</h3>
                <p className={styles.role}>{m.role}</p>
                <p className={styles.bio}>{m.bio}</p>
              </div>
            ))}
          </div>
          <div className={styles.cta}>
            <p className={styles.ctaText}>Interested in joining the team?</p>
            <a href="/#contact" className="btn btn--primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  )
}
