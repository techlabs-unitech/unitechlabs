import styles from './Team.module.css'
import { initials, type TeamMember } from '@/lib/team'

export default function TeamCard({ m, showBio = true }: { m: TeamMember; showBio?: boolean }) {
  return (
    <article className={styles.member} id={m.slug}>
      <div className={styles.photoWrap}>
        {m.photo
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={m.photo} alt={`${m.name}, ${m.role}`} className={styles.photo} loading="lazy" />
          : <div className={styles.placeholder} aria-hidden="true">{initials(m.name)}</div>}
      </div>
      <h3 className={styles.name}>{m.name}</h3>
      <p className={styles.role}>{m.role}</p>
      {showBio && <p className={styles.bio}>{m.bio}</p>}
      {(m.linkedin || m.email) && (
        <div className={styles.links}>
          {m.linkedin && (
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className={styles.linkBtn} aria-label={`${m.name} on LinkedIn`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          )}
          {m.email && (
            <a href={`mailto:${m.email}`} className={styles.linkBtn} aria-label={`Email ${m.name}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
            </a>
          )}
        </div>
      )}
    </article>
  )
}
