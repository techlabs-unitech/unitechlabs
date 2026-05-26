'use client'
import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    const form = e.currentTarget
    const data = {
      name:    (form.elements.namedItem('name')    as HTMLInputElement).value,
      email:   (form.elements.namedItem('email')   as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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
    <section id="contact" className={`section section--alt ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.info}>
            <p className="label" style={{ display: 'block', marginBottom: 14 }}>Get In Touch</p>
            <h2 className={`display ${styles.title}`}>Let&apos;s build something<br /><em>remarkable together</em></h2>
            <p className={styles.sub}>Whether you have a project in mind or just want to explore what&apos;s possible, our team is ready to listen and help you find the right solution.</p>
            <div className={styles.details}>
              {[
                { icon: <PhoneIcon />, label: 'Phone',   value: '+91 9591066613',                                             href: 'tel:+919591066613' },
                { icon: <MailIcon />,  label: 'Email',   value: 'info@unitechlabs.io',                                       href: 'mailto:info@unitechlabs.io' },
                { icon: <PinIcon />,   label: 'Address', value: '31, 17th Cross, MRCR, Bangalore, Karnataka, India — 560040', href: 'https://maps.google.com/?q=31+17th+Cross+MRCR+Bangalore' },
              ].map(d => (
                <a key={d.label} href={d.href} target="_blank" rel="noopener noreferrer" className={styles.detailRow}>
                  <span className={styles.detailIcon}>{d.icon}</span>
                  <div><span className={styles.detailLabel}>{d.label}</span><span className={styles.detailValue}>{d.value}</span></div>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.formWrap}>
            {sent ? (
              <div className={styles.success}>
                <span className={styles.successIcon}>✓</span>
                <h3>Message received!</h3>
                <p>We&apos;ll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                {error && (
                  <div className={styles.errorBanner}>
                    Something went wrong — please try again or email us directly at{' '}
                    <a href="mailto:info@unitechlabs.io">info@unitechlabs.io</a>.
                  </div>
                )}
                <div className={styles.row}>
                  <div className={styles.field}><label htmlFor="name" className={styles.fieldLabel}>Full Name</label><input id="name" name="name" type="text" placeholder="Your name" required className={styles.input} /></div>
                  <div className={styles.field}><label htmlFor="email" className={styles.fieldLabel}>Email</label><input id="email" name="email" type="email" placeholder="you@company.com" required className={styles.input} /></div>
                </div>
                <div className={styles.field}><label htmlFor="subject" className={styles.fieldLabel}>Subject</label><input id="subject" name="subject" type="text" placeholder="Project enquiry..." required className={styles.input} /></div>
                <div className={styles.field}><label htmlFor="message" className={styles.fieldLabel}>Message</label><textarea id="message" name="message" rows={5} placeholder="Tell us about your project..." required className={styles.textarea} /></div>
                <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message'}{!loading && <ArrowRight />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> }
function MailIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> }
function PinIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> }
function ArrowRight(){ return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
