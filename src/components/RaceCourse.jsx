import { useEffect, useRef } from 'react'

function lerpHex(a, b, t) {
  const p = s => {
    const n = parseInt(s.replace('#', ''), 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  }
  const [r1, g1, b1] = p(a)
  const [r2, g2, b2] = p(b)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const bv = Math.round(b1 + (b2 - b1) * t)
  return `#${((1 << 24) | (r << 16) | (g << 8) | bv).toString(16).slice(1)}`
}

// Winding path through 0–100 viewBox (preserveAspectRatio="none")
const COURSE_D = [
  'M 50 0',
  'C 76 8,  87 20, 70 31',
  'C 53 42, 13 47, 17 57',
  'C 21 67, 84 76, 74 86',
  'C 64 95, 51 98, 50 100',
].join(' ')

// Path glow colors per discipline
const PATH_COLORS = ['#4AABCC', '#C9A84C', '#E8532A']

// Full-page background tint — saturated so the 75%-white sections pick up the hue
const BG_COLORS = ['#071A26', '#1C1400', '#220600']

export default function RaceCourse() {
  const bgRef      = useRef(null)
  const glowRef    = useRef(null)
  const litRef     = useRef(null)
  const dotRef     = useRef(null)
  const dotRingRef = useRef(null)
  const svgRef     = useRef(null)

  useEffect(() => {
    const bg       = bgRef.current
    const glow     = glowRef.current
    const lit      = litRef.current
    const dot      = dotRef.current
    const dotRing  = dotRingRef.current
    const svg      = svgRef.current
    if (!lit || !svg) return

    const total = lit.getTotalLength()
    glow.style.strokeDasharray  = total
    glow.style.strokeDashoffset = total
    lit.style.strokeDasharray   = total
    lit.style.strokeDashoffset  = total

    let rafId = null

    const update = () => {
      const max      = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      const drawn    = total * progress
      const offset   = total - drawn

      glow.style.strokeDashoffset = offset
      lit.style.strokeDashoffset  = offset

      const t     = progress * 3
      const si    = Math.min(Math.floor(t), 2)
      const sf    = Math.min(t - si, 1)
      const color = lerpHex(PATH_COLORS[si], PATH_COLORS[Math.min(si + 1, 2)], sf)
      const bgCol = lerpHex(BG_COLORS[si], BG_COLORS[Math.min(si + 1, 2)], sf)

      lit.style.stroke  = color
      glow.style.stroke = color
      if (bg) bg.style.background = bgCol

      // Dot position
      if (dot && dotRing) {
        if (progress > 0.005 && progress < 0.998) {
          const pt  = lit.getPointAtLength(drawn)
          const vb  = svg.viewBox.baseVal
          const box = svg.getBoundingClientRect()
          const px  = (pt.x / vb.width)  * box.width
          const py  = (pt.y / vb.height) * box.height

          dot.style.display      = 'block'
          dotRing.style.display  = 'block'
          dot.style.left         = `${px}px`
          dot.style.top          = `${py}px`
          dotRing.style.left     = `${px}px`
          dotRing.style.top      = `${py}px`
          dot.style.background   = color
          dot.style.boxShadow    = `0 0 8px 2px ${color}`
          dotRing.style.borderColor = color
        } else {
          dot.style.display     = 'none'
          dotRing.style.display = 'none'
        }
      }
    }

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Full-page discipline background — sits at z-index 0, behind everything */}
      <div ref={bgRef} style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
        background: BG_COLORS[0],
      }} />

      {/* Race course path — z-index 1, above background but below sections (z-index 3) */}
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 1, pointerEvents: 'none',
      }}>
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="rc-glow-blur" x="-150%" y="-20%" width="400%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Full dim path — shows the entire course ahead */}
          <path
            d={COURSE_D}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Glow halo on drawn portion */}
          <path
            ref={glowRef}
            d={COURSE_D}
            fill="none"
            stroke={PATH_COLORS[0]}
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.6"
            filter="url(#rc-glow-blur)"
          />

          {/* Crisp lit line */}
          <path
            ref={litRef}
            d={COURSE_D}
            fill="none"
            stroke={PATH_COLORS[0]}
            strokeWidth="0.7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Pulsing ring */}
        <div ref={dotRingRef} style={{
          position: 'absolute',
          width: 18, height: 18,
          borderRadius: '50%',
          border: `1.5px solid ${PATH_COLORS[0]}`,
          transform: 'translate(-50%, -50%)',
          display: 'none',
          animation: 'rc-pulse 1.8s ease-out infinite',
        }} />

        {/* Position dot */}
        <div ref={dotRef} style={{
          position: 'absolute',
          width: 6, height: 6,
          borderRadius: '50%',
          background: PATH_COLORS[0],
          transform: 'translate(-50%, -50%)',
          display: 'none',
        }} />
      </div>
    </>
  )
}
