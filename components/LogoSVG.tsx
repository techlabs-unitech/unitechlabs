interface LogoSVGProps {
  variant?: 'navbar' | 'footer'
}

export default function LogoSVG({ variant = 'navbar' }: LogoSVGProps) {
  const isFooter = variant === 'footer'

  return (
    <svg
      viewBox={isFooter ? '0 0 295 80' : '0 0 275 66'}
      height={isFooter ? 56 : 40}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="UnitechLabs"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ── "U" in gold ── */}
      <text
        x="0" y="43"
        fontFamily="'Georgia', serif"
        fontWeight="900"
        fontSize="60"
        fill="var(--accent)"
      >U</text>

      {/* ── Bar under the "U" ── */}
      <rect x="4" y="56" width="42" height="9" rx="1" fill="var(--accent)" />

      {/* ── "ni" in gold ── */}
      <text
        x="50" y="43"
        fontFamily="'Georgia', serif"
        fontWeight="900"
        fontSize="60"
        fill="var(--accent)"
      >ni</text>

      {/* ── "tech" in theme color ── */}
      <text
        x="112" y="43"
        fontFamily="'Georgia', serif"
        fontWeight="900"
        fontSize="60"
        fill="currentColor"
      >tech</text>

      {/* ── ISO tagline — footer only ── */}
      {(
        <text
          x="55" y="64"
          fontFamily="'Arial', 'DM Sans', sans-serif"
          fontSize="8.8"
          letterSpacing="1.3"
          fill="currentColor"
          opacity="0.5"
        >
          AN ISO 9001:2015 CERTIFIED LABS
        </text>
      )}
    </svg>
  )
}
