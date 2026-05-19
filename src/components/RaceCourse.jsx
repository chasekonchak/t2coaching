import { useEffect, useRef } from 'react'

// Interpolate between two #rrggbb hex colors
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

// Race course SVG path in 0-100 viewBox space (preserveAspectRatio="none")
// Three organic segments: swim (top), bike (middle), run (bottom)
const COURSE_D = [
  'M 50 0',
  'C 76 8,  87 20, 70 31',   // swim: sweeps right
  'C 53 42, 13 47, 17 57',   // bike: sweeps left
  'C 21 67, 84 76, 74 86',   // run:  sweeps right
  'C 64 95, 51 98, 50 100',  // final: returns to center
].join(' ')

// Discipline color palette
const SWIM_COLOR = '#4AABCC'
const BIKE_COLOR = '#C9A84C'
const RUN_COLOR  = '#E8532A'
const PATH_COLORS = [SWIM_COLOR, BIKE_COLOR, RUN_COLOR]

// Very subtle background tints for each discipline
const BG_COLORS = ['#071820', '#120e03', '#1e0600']

export default function RaceCourse() {
  const bgRef    = useRef(null)
  const glowRef  = useRef(null)
  const litRef   = useRef(null)
  const dotRef   = useRef(null)
  const dotRingRef = useRef(null)
  const svgRef   = useRef(null)

  useEffect(() => {
    const bg       = bgRef.current
    const glow     = glowRef.current
    const lit      = litRef.current
    const dot      = dotRef.current
    const dotRing  = dotRingRef.current
    const svg      = svgRef.current
    if (!lit || !svg) return

    // getTotalLength works after d is set (which it is via JSX)
    const total = lit.getTotalLength()

    glow.style.strokeDasharray  = total
    glow.style.strokeDashoffset = total
    lit.style.strokeDasharray   = total
    lit.style.strokeDashoffset  = total

    let currentColor = SWIM_COLOR
    let rafId = null

    const update = () => {
      const max      = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      const drawn    = total * progress
      const offset   = total - drawn

      glow.style.strokeDashoffset = offset
      lit.style.strokeDashoffset  = offset

      // Smooth color across 3 disciplines
      const t  = progress * 3
      const si = Math.min(Math.floor(t), 2)
      const sf = Math.min(t - si, 1)
      const color = lerpHex(PATH_COLORS[si], PATH_COLORS[Math.min(si + 1, 2)], sf)
      const bgCol = lerpHex(BG_COLORS[si], BG_COLORS[Math.min(si + 1, 2)], sf)

      lit.style.stroke  = color
      glow.style.stroke = color
      if (bg) bg.style.background = bgCol

      // Update dot at drawn tip
      if (progress > 0.005 && progress < 0.999) {
        const pt = lit.getPointAtLength(drawn)
        // Convert viewBox coords → viewport pixels
        const vb  = svg.viewBox.baseVal
        const box = svg.getBoundingClientRect()
        const px  = (pt.x / vb.width)  * box.width
        const py  = (pt.y / vb.height) * box.height

        dot.style.display     = 'block'
        dotRing.style.display = 'block'
        dot.style.left        = `${px}px`
        dot.style.top         = `${py}px`
        dotRing.style.left    = `${px}px`
        dotRing.style.top     = `${py}px`
        dot.style.background  = color
        dot.style.boxShadow   = `0 0 10px 3px ${color}`
        dotRing.style.borderColor = color
      } else {
        dot.style.display     = 'none'
        dotRing.style.display = 'none'
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
      {/* Subtle discipline background tint — sits behind all sections */}
      <div ref={bgRef} style={{
        position: 'fixed', inset: 0,
        zIndex: 0, pointerEvents: 'none',
        background: BG_COLORS[0],
        transition: 'background 0.6s ease',
        opacity: 0.45,
      }} />

      {/* Race course SVG — floats above all content */}
      <div style={{
        position: 'fixed', inset: 0,
        zIndex: 9998, pointerEvents: 'none',
      }}>
        <svg
          ref={svgRef}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <filter id="rc-glow-blur" x="-100%" y="-20%" width="300%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dim unlit path — the full course ahead */}
          <path
            d={COURSE_D}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Segment boundary markers — subtle tick marks */}
          {/* Swim/Bike boundary at y=33 */}
          <line
            x1="46" y1="38" x2="54" y2="38"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bike/Run boundary at y=67 */}
          <line
            x1="19" y1="64" x2="27" y2="64"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />

          {/* Glow halo on lit portion */}
          <path
            ref={glowRef}
            d={COURSE_D}
            fill="none"
            stroke={SWIM_COLOR}
            strokeWidth="2.2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity="0.55"
            filter="url(#rc-glow-blur)"
          />

          {/* Crisp lit line */}
          <path
            ref={litRef}
            d={COURSE_D}
            fill="none"
            stroke={SWIM_COLOR}
            strokeWidth="0.55"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Pulsing ring behind the dot */}
        <div ref={dotRingRef} style={{
          position: 'absolute',
          width: 20, height: 20,
          borderRadius: '50%',
          border: `1.5px solid ${SWIM_COLOR}`,
          transform: 'translate(-50%, -50%)',
          display: 'none',
          animation: 'rc-pulse 1.6s ease-out infinite',
          opacity: 0.5,
        }} />

        {/* Traveling dot */}
        <div ref={dotRef} style={{
          position: 'absolute',
          width: 6, height: 6,
          borderRadius: '50%',
          background: SWIM_COLOR,
          transform: 'translate(-50%, -50%)',
          display: 'none',
        }} />
      </div>
    </>
  )
}
