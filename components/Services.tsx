import styles from './Services.module.css'

const services = [
  { num: '01', title: 'Web Essential Tools', desc: 'cPanel, domains, hosting, and themes — all at your fingertips. Build it yourself or reach out to our developers for support.', icon: <WebIcon /> },
  { num: '02', title: 'Application Development & Support', desc: 'Custom web and mobile applications built with modern frameworks, designed for performance, scalability and long-term maintainability.', icon: <CodeIcon /> },
  { num: '03', title: 'Internet of Things (IoT) & Smart Devices', desc: 'End-to-end IoT solutions — from sensor integration to cloud dashboards — enabling intelligent automation for any industry.', icon: <IotIcon /> },
  { num: '04', title: 'AI & Machine Learning', desc: 'Intelligent systems leveraging computer vision, NLP, and predictive analytics to solve complex real-world business problems.', icon: <AiIcon /> },
  { num: '05', title: 'IT Consultation', desc: 'Strategic technology advisory — architecture reviews, digital transformation roadmaps, vendor selection, and hands-on guidance from senior engineers.', icon: <ConsultIcon /> },
  { num: '06', title: 'Workflow Automation & Integrations', desc: 'Connect your tools, automate your workflows. From API integrations and webhook triggers to IoT-driven pipelines — we eliminate manual overhead end to end.', icon: <WorkflowIcon /> },
]

export default function Services() {
  return (
    <section id="services" className={`section section--alt ${styles.section}`}>
      <div className="container">
        <header className={styles.header}>
          <p className="label" style={{ display: 'block', marginBottom: 14 }}>What We Offer</p>
          <h2 className={`display ${styles.title}`}>Everything you need to bring<br /><em>your vision to life</em></h2>
          <p className={styles.sub}>Whether you&apos;re looking for web, mobile, IoT, or AI solutions, our team is ready to support you with custom work and innovation.</p>
        </header>
        <div className={styles.grid}>
          {services.map(s => (
            <div key={s.num} className={styles.card}>
              <div className={styles.cardHead}><span className={styles.num}>{s.num}</span><span className={styles.icon}>{s.icon}</span></div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              <a href="#contact" className={styles.cardLink}>Learn more <ChevRight /></a>
            </div>
          ))}
        </div>
        <div className={styles.ctas}>
          <a href="#contact" className="btn btn--primary">Discuss Your Project</a>
          <a href="/services" className="btn">Services</a>
        </div>
      </div>
    </section>
  )
}

function WebIcon()     { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function CodeIcon()    { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> }
function IotIcon()     { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> }
function AiIcon()      { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg> }
function ConsultIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> }
function WorkflowIcon(){ return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="6" height="6" rx="1"/><rect x="16" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><line x1="12" y1="13" x2="12" y2="15"/></svg> }
function ChevRight()   { return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> }
