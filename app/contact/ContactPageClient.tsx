'use client'
import { useState } from 'react'
import styles from '@/components/ContactPage.module.css'

const socials = [
  { name: 'WhatsApp',  href: 'https://wa.me/+919591066613', handle: '+91 9591066613', color: '#25D366', icon: <WAIcon /> },
  { name: 'Instagram', href: 'https://instagram.com/unitechlabs',                      handle: '@unitechlabs',   color: '#E1306C', icon: <IGIcon /> },
  { name: 'LinkedIn',  href: 'https://linkedin.com/company/unitechlabs',               handle: 'UnitechLabs',    color: '#0A66C2', icon: <LIIcon /> },
]

export default function ContactPageClient() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('cp-name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('cp-email')   as HTMLInputElement).value,
      phone:   (form.elements.namedItem('cp-phone')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('cp-subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('cp-message') as HTMLTextAreaElement).value,
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error('Contact API error')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="label" style={{ display: 'block', marginBottom: 16 }}>Get In Touch</p>
          <h1 className={`display ${styles.heroTitle}`}>Let&apos;s build something<br /><em>remarkable together</em></h1>
          <p className={styles.heroSub}>Whether you have a project in mind, need an IT consultation, or just want to explore what&apos;s possible — our team is ready to listen.</p>
        </div>
      </section>

      <section className={styles.socialSection}>
        <div className="container">
          <p className={styles.socialLabel}>Reach us on</p>
          <div className={styles.socialGrid}>
            {socials.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialCard} style={{ '--social-color': s.color } as React.CSSProperties}>
                <span className={styles.socialIcon}>{s.icon}</span>
                <div className={styles.socialInfo}><span className={styles.socialName}>{s.name}</span><span className={styles.socialHandle}>{s.handle}</span></div>
                <span className={styles.socialArrow}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.mainSection}`}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.info}>
              <h2 className={`display ${styles.infoTitle}`}>Contact <em>details</em></h2>
              <p className={styles.infoSub}>Prefer a direct line? Reach us any way you like. We typically respond within one business day.</p>
              <div className={styles.details}>
                {[
                  { icon: <PhoneIcon />, label: 'Phone',   value: '+91 9591066613',                                              href: 'tel:+919591066613' },
                  { icon: <MailIcon />,  label: 'Email',   value: 'info@unitechlabs.io',                                        href: 'mailto:info@unitechlabs.io' },
                  { icon: <PinIcon />,   label: 'Address', value: '31, 17th Cross, MRCR, Bangalore, Karnataka, India — 560040',  href: 'https://maps.google.com/?q=31+17th+Cross+MRCR+Bangalore' },
                ].map(d => (
                  <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer" className={styles.detailRow}>
                    <span className={styles.detailIcon}>{d.icon}</span>
                    <div><span className={styles.detailLabel}>{d.label}</span><span className={styles.detailValue}>{d.value}</span></div>
                  </a>
                ))}
              </div>
              <a href="https://wa.me/+919591066613" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
                <WAIcon /> Chat on WhatsApp
              </a>
            </div>

            <div className={styles.formWrap}>
              {sent ? (
                <div className={styles.success}><span className={styles.successIcon}>✓</span><h3>Message received!</h3><p>We&apos;ll get back to you within one business day.</p></div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formHeader}><h3 className={styles.formTitle}>Send us a message</h3><p className={styles.formSub}>Fill out the form and we&apos;ll be in touch shortly.</p></div>
                  {error && (
                    <div className={styles.errorBanner}>
                      Something went wrong — please try again or email us at{' '}
                      <a href="mailto:info@unitechlabs.io">info@unitechlabs.io</a>.
                    </div>
                  )}
                  <div className={styles.row}>
                    <div className={styles.field}><label htmlFor="cp-name"  className={styles.fieldLabel}>Full Name</label><input id="cp-name"  name="cp-name"  type="text"  placeholder="Your name"          required className={styles.input} /></div>
                    <div className={styles.field}><label htmlFor="cp-email" className={styles.fieldLabel}>Email</label>    <input id="cp-email" name="cp-email" type="email" placeholder="you@company.com"      required className={styles.input} /></div>
                  </div>
                  <div className={styles.field}><label htmlFor="cp-phone"   className={styles.fieldLabel}>Phone (optional)</label><input id="cp-phone"   name="cp-phone"   type="tel"  placeholder="+91 98765 43210"          className={styles.input} /></div>
                  <div className={styles.field}><label htmlFor="cp-subject" className={styles.fieldLabel}>Subject</label>         <input id="cp-subject" name="cp-subject" type="text" placeholder="Project enquiry / IT consultation..." required className={styles.input} /></div>
                  <div className={styles.field}><label htmlFor="cp-message" className={styles.fieldLabel}>Message</label>         <textarea id="cp-message" name="cp-message" rows={5} placeholder="Tell us about your project or question..." required className={styles.textarea} /></div>
                  <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={loading}>{loading ? 'Sending…' : 'Send Message'}{!loading && <ArrowRight />}</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function WAIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> }
function IGIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg> }
function LIIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> }
function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> }
function MailIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function PinIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function ArrowRight(){ return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
