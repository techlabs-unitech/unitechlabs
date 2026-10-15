'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './PWAInstallBanner.module.css'

// Shared event store — capture beforeinstallprompt as early as possible
// so the banner can use it even if it mounts after the event fires.
let _deferredPrompt: BeforeInstallPromptEvent | null = null

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const DISMISSED_KEY = 'unitech_pwa_dismissed'

function wasDismissed(): boolean {
  try { return !!localStorage.getItem(DISMISSED_KEY) } catch { return false }
}
function markDismissed(): void {
  try { localStorage.setItem(DISMISSED_KEY, '1') } catch { /* noop */ }
}

export default function PWAInstallBanner() {
  const [visible, setVisible]   = useState(false)
  const [installed, setInstalled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // Already installed as standalone PWA — never show
    if (window.matchMedia('(display-mode: standalone)').matches) return
    // User previously dismissed — never show
    if (wasDismissed()) return

    const onPrompt = (e: Event) => {
      e.preventDefault()
      _deferredPrompt = e as BeforeInstallPromptEvent
      // Start the 20-second timer once we have the prompt
      timerRef.current = setTimeout(() => setVisible(true), 20_000)
    }

    // If the event already fired before this component mounted
    if (_deferredPrompt && !wasDismissed()) {
      timerRef.current = setTimeout(() => setVisible(true), 20_000)
    }

    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', () => {
      setVisible(false)
      setInstalled(true)
      _deferredPrompt = null
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleInstall = async () => {
    if (!_deferredPrompt) return
    await _deferredPrompt.prompt()
    const { outcome } = await _deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setVisible(false)
      setInstalled(true)
    }
    _deferredPrompt = null
  }

  const handleDismiss = () => {
    setVisible(false)
    markDismissed()
  }

  if (!visible) return null

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Install UnitechLabs app">
      <div className={styles.banner}>
        <button
          className={styles.close}
          onClick={handleDismiss}
          aria-label="Dismiss install prompt"
          type="button"
        >
          <CloseIcon />
        </button>

        <div className={styles.icon} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon-192.png" alt="" width={52} height={52} />
        </div>

        <div className={styles.body}>
          <p className={styles.eyebrow}>Available as an App</p>
          <h3 className={styles.title}>Install UnitechLabs</h3>
          <p className={styles.desc}>
            Get instant access — no browser needed. Works offline &amp; loads instantly.
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className={`btn btn--primary ${styles.installBtn}`}
            onClick={handleInstall}
            type="button"
          >
            <DownloadIcon /> Install App
          </button>
          <button
            className={`btn ${styles.laterBtn}`}
            onClick={handleDismiss}
            type="button"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Inline install button for use anywhere on the page ──────────────────────
export function PWAInstallButton({ className = '' }: { className?: string }) {
  const [ready, setReady]       = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) return
    if (_deferredPrompt) { setReady(true); return }

    const onPrompt = (e: Event) => {
      e.preventDefault()
      _deferredPrompt = e as BeforeInstallPromptEvent
      setReady(true)
    }
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', () => { setInstalled(true); setReady(false) })
    return () => window.removeEventListener('beforeinstallprompt', onPrompt)
  }, [])

  if (installed) {
    return (
      <span className={`${styles.installedBadge} ${className}`}>
        <CheckIcon /> App Installed
      </span>
    )
  }
  if (!ready) return null

  const handleInstall = async () => {
    if (!_deferredPrompt) return
    await _deferredPrompt.prompt()
    const { outcome } = await _deferredPrompt.userChoice
    if (outcome === 'accepted') { setInstalled(true); setReady(false) }
    _deferredPrompt = null
  }

  return (
    <button
      className={`btn btn--primary ${styles.inlineInstallBtn} ${className}`}
      onClick={handleInstall}
      type="button"
    >
      <DownloadIcon /> Install App
    </button>
  )
}

function CloseIcon()    { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function DownloadIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> }
function CheckIcon()    { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> }
