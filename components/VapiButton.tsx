'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Vapi from '@vapi-ai/web'
import styles from './VapiButton.module.css'

// Replace with your actual Vapi Public Key and Assistant ID
const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ''

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending'

export default function VapiButton() {
  const vapiRef = useRef<Vapi | null>(null)
  const [status, setStatus] = useState<CallStatus>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)

  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) return
    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on('call-start',  () => setStatus('active'))
    vapi.on('call-end',    () => { setStatus('idle'); setVolumeLevel(0) })
    vapi.on('error',       () => setStatus('idle'))
    vapi.on('volume-level', (level: number) => setVolumeLevel(level))

    return () => {
      vapi.stop()
    }
  }, [])

  const handleToggle = useCallback(async () => {
    const vapi = vapiRef.current
    if (!vapi) return

    if (status === 'active') {
      setStatus('ending')
      vapi.stop()
    } else if (status === 'idle') {
      setStatus('connecting')
      try {
        await vapi.start(VAPI_ASSISTANT_ID)
      } catch {
        setStatus('idle')
      }
    }
  }, [status])

  const handleMute = useCallback(() => {
    const vapi = vapiRef.current
    if (!vapi || status !== 'active') return
    const next = !isMuted
    vapi.setMuted(next)
    setIsMuted(next)
  }, [isMuted, status])

  const isActive     = status === 'active'
  const isConnecting = status === 'connecting'
  const isEnding     = status === 'ending'
  const isBusy       = isConnecting || isEnding

  // Pulse ring scale driven by voice volume (0–1)
  const ringScale = isActive ? 1 + volumeLevel * 0.6 : 1

  return (
    <div className={styles.wrapper} aria-label="Voice assistant">
      {/* Animated pulse ring */}
      <span
        className={`${styles.ring} ${isActive ? styles.ringActive : ''}`}
        style={{ transform: `scale(${ringScale})` }}
        aria-hidden="true"
      />

      {/* Main mic button */}
      <button
        className={`${styles.btn} ${isActive ? styles.btnActive : ''} ${isBusy ? styles.btnBusy : ''}`}
        onClick={handleToggle}
        disabled={isBusy}
        aria-label={isActive ? 'End voice call' : isConnecting ? 'Connecting…' : 'Start voice assistant'}
        title={isActive ? 'End call' : 'Talk to our AI assistant'}
      >
        {isBusy ? (
          <Spinner />
        ) : isActive ? (
          <PhoneOffIcon />
        ) : (
          <MicIcon />
        )}
      </button>

      {/* Mute button — only shown during active call */}
      {isActive && (
        <button
          className={`${styles.muteBtn} ${isMuted ? styles.muteBtnActive : ''}`}
          onClick={handleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          title={isMuted ? 'Unmute mic' : 'Mute mic'}
        >
          {isMuted ? <MicOffIcon /> : <MicIcon size={14} />}
        </button>
      )}

      {/* Status label */}
      <span className={styles.label}>
        {isConnecting ? 'Connecting…' : isEnding ? 'Ending…' : isActive ? (isMuted ? 'Muted' : 'Listening') : 'Ask AI'}
      </span>
    </div>
  )
}

// ── Icons ──────────────────────────────────────────────────────────────────

function MicIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8"  y1="23" x2="16" y2="23" />
    </svg>
  )
}

function MicOffIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8"  y1="23" x2="16" y2="23" />
    </svg>
  )
}

function PhoneOffIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07" />
      <path d="M14.5 2.25A19.79 19.79 0 0 0 2.25 10.88a2 2 0 0 0 2 2.18h3a2 2 0 0 0 2-1.72 12.84 12.84 0 0 1 .7-2.81 2 2 0 0 0-.45-2.11L8.23 5.1" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={styles.spin}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}
