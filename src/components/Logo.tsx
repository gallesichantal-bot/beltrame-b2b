// Shared logo SVG — fedele all'immagine fornita:
// AFV corsivo rosso | linea | BELTRAME bold + GROUP regular | STEEL SINCE 1896 grigio

export function AfvLogo({
  className = 'h-10 w-auto',
  variant = 'dark',   // 'dark' = su sfondo scuro (testo bianco), 'light' = su sfondo chiaro (testo nero)
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  const textColor  = variant === 'dark' ? '#ffffff' : '#111111'
  const groupColor = variant === 'dark' ? 'rgba(255,255,255,0.75)' : '#444444'
  const subColor   = variant === 'dark' ? 'rgba(255,255,255,0.28)' : '#999999'
  const lineColor  = variant === 'dark' ? 'rgba(255,255,255,0.18)' : '#cccccc'

  return (
    <svg
      viewBox="0 0 310 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AFV Beltrame Group — Steel Since 1896"
    >
      {/* ── AFV: italic, bold, rosso brand ── */}
      <text
        x="2" y="38"
        fill="#de473c"
        fontSize="36"
        fontWeight="900"
        fontStyle="italic"
        fontFamily="Roboto, Arial, sans-serif"
        letterSpacing="-0.5"
      >
        AFV
      </text>

      {/* ── Separatore verticale sottile ── */}
      <line x1="78" y1="6" x2="78" y2="50" stroke={lineColor} strokeWidth="1" />

      {/* ── BELTRAME: extra-bold, tracciatura ampia ── */}
      <text
        x="90" y="34"
        fill={textColor}
        fontSize="22"
        fontWeight="900"
        fontFamily="Roboto, Arial, sans-serif"
        letterSpacing="1"
      >
        BELTRAME
      </text>

      {/* ── GROUP: peso normale, stesso allineamento ── */}
      <text
        x="222" y="34"
        fill={groupColor}
        fontSize="22"
        fontWeight="400"
        fontFamily="Roboto, Arial, sans-serif"
        letterSpacing="0.5"
      >
        {' '}GROUP
      </text>

      {/* ── STEEL SINCE 1896: piccolo, wide tracking ── */}
      <text
        x="91" y="49"
        fill={subColor}
        fontSize="9.5"
        fontWeight="400"
        fontFamily="Roboto, Arial, sans-serif"
        letterSpacing="3"
      >
        STEEL SINCE 1896
      </text>
    </svg>
  )
}
