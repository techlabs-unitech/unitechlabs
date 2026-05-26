'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import Vapi from '@vapi-ai/web'
import styles from './VapiButton.module.css'

const VAPI_PUBLIC_KEY   = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY   || ''
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ''

type CallStatus = 'idle' | 'connecting' | 'active' | 'ending'

export default function VapiButton() {
  const vapiRef = useRef<Vapi | null>(null)
  const [status, setStatus]           = useState<CallStatus>('idle')
  const [isMuted, setIsMuted]         = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)

  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) return
    const vapi = new Vapi(VAPI_PUBLIC_KEY)
    vapiRef.current = vapi

    vapi.on('call-start',   () => setStatus('active'))
    vapi.on('call-end',     () => { setStatus('idle'); setVolumeLevel(0) })
    vapi.on('error',        () => setStatus('idle'))
    vapi.on('volume-level', (level: number) => setVolumeLevel(level))

    return () => { vapi.stop() }
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

  const ringScale = isActive ? 1 + volumeLevel * 0.6 : 1

  return (
    <div className={styles.wrapper} aria-label="Voice assistant">
      <span
        className={`${styles.ring} ${isActive ? styles.ringActive : ''}`}
        style={{ transform: `scale(${ringScale})` }}
        aria-hidden="true"
      />
      <button
        className={`${styles.btn} ${isActive ? styles.btnActive : ''} ${isBusy ? styles.btnBusy : ''}`}
        onClick={handleToggle}
        disabled={isBusy}
        aria-label={isActive ? 'End voice call' : isConnecting ? 'Connecting…' : 'Start voice assistant'}
        title={isActive ? 'End call' : 'Talk to our AI assistant'}
      >
        {isBusy ? <Spinner /> : isActive ? <EndCallIcon /> : <MicIcon />}
      </button>

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

/**
 * EndCallIcon — clean "hang up" symbol.
 * Solid filled handset rotated 135° so it reads as "put down / end".
 * No diagonal strike-through lines that can look broken at small sizes.
 */
function EndCallIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      {/*
        Standard phone handset path, rotated 135° around centre (12,12).
        Rotation is applied inline so the path data stays canonical.
      */}
      <g transform="rotate(135 12 12)">
        <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24
                 c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1
                 C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1
                 c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02L6.62 10.79z" />
      </g>
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
