// SVG recreation of The ROSA Group logo mark + wordmark
export default function RosaLogo({ size = 40, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Icon: simplified puzzle-piece mark from logo */}
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left red block */}
        <rect x="4" y="4" width="22" height="22" rx="3" fill="#CC1F1F"/>
        <rect x="28" y="4" width="10" height="10" rx="2" fill="#E05A1A"/>
        {/* Top-right orange */}
        <rect x="40" y="4" width="18" height="18" rx="3" fill="#E8843A"/>
        <rect x="60" y="4" width="16" height="10" rx="2" fill="#C8B820"/>
        {/* Mid-left yellow-green */}
        <rect x="4" y="28" width="14" height="14" rx="2" fill="#88BB22"/>
        <rect x="20" y="28" width="18" height="22" rx="3" fill="#22AA88"/>
        {/* Mid teal */}
        <rect x="4" y="44" width="14" height="18" rx="2" fill="#2288CC"/>
        {/* Bottom purple */}
        <rect x="40" y="40" width="18" height="18" rx="3" fill="#6633AA"/>
        <rect x="60" y="52" width="16" height="24" rx="2" fill="#1A2E6B"/>
        {/* Bottom dots */}
        <circle cx="12" cy="68" r="5" fill="#CC1F1F"/>
        <circle cx="36" cy="72" r="4" fill="#E8843A"/>
        <circle cx="52" cy="68" r="3" fill="#6633AA"/>
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '2px' }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: '15px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
          }}>The ROSA Group</span>
          <span style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '12px',
            color: '#1A2E6B',
            letterSpacing: '0.03em',
          }}>Delivering Expectations</span>
        </div>
      )}
    </div>
  )
}
