import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01', accent: '#7EC8E3',
    title: 'Your trajectory is my specialty.',
    body: 'Most programs hand you a generic plan and call it personalized. Wendy analyzes where you are today — fitness history, lifestyle constraints, race goals — and builds a dynamic plan that evolves with you every single week.',
  },
  {
    num: '02', accent: '#F5A623',
    title: 'Real dirt & sweat, not just data.',
    body: "Wendy has trained in wind, altitude, cold, and heat. She's raced the bike course at Kona. The coaching she provides is grounded in lived experience — she knows what your body goes through because she's been there.",
  },
  {
    num: '03', accent: '#D4201A',
    title: 'Insider race strategy — including Kona.',
    body: "From pacing the Queen K highway to managing the energy of a local sprint — Wendy has race-specific intelligence most coaches simply don't have. Your pre-race brief will feel like a military op, not a pep talk.",
  },
  {
    num: '04', accent: '#4AABCC',
    title: 'Built for busy people.',
    body: "Life doesn't pause for training. Wendy designs plans around your real schedule — not an idealized one. Family, work, travel. Your plan bends. Your progress doesn't have to.",
  },
]

function FeatureCard({ f, style }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 20,
      padding: '36px 36px 32px',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 44, height: 44, borderRadius: 10,
        background: `${f.accent}1a`, color: f.accent,
        fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
        marginBottom: 20,
      }}>{f.num}</div>

      <h3 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
        color: '#0D2B3E', lineHeight: 1.3, marginBottom: 12,
      }}>{f.title}</h3>

      <p style={{ fontSize: 15, color: 'rgba(13,43,62,0.6)', lineHeight: 1.7 }}>{f.body}</p>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 2, background: f.accent, opacity: 0.35,
      }} />
    </div>
  )
}

export default function WhyT2() {
  const wrapRef   = useRef(null)
  const headerRef = useRef(null)
  const trackRef  = useRef(null)   // desktop horizontal track
  const mobileRef = useRef([])     // mobile card refs

  useEffect(() => {
    const wrap   = wrapRef.current
    const header = headerRef.current
    const track  = trackRef.current
    if (!wrap) return

    const mm = gsap.matchMedia()

    // ── DESKTOP: horizontal pinned scroll ──────────────────────────────────
    mm.add('(min-width: 768px)', () => {
      if (!track) return

      // Header slides down from above
      if (header) {
        gsap.fromTo(header,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: wrap, start: 'top 85%', once: true } }
        )
      }

      // Pin the section and scroll the track horizontally
      const st = gsap.to(track, {
        x: () => -(track.scrollWidth - wrap.offsetWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${track.scrollWidth - wrap.offsetWidth + 80}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => { st.scrollTrigger?.kill() }
    })

    // ── MOBILE: vertical stagger ───────────────────────────────────────────
    mm.add('(max-width: 767px)', () => {
      if (header) {
        gsap.fromTo(header,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: wrap, start: 'top 80%', once: true } }
        )
      }
      mobileRef.current.forEach((item, i) => {
        if (!item) return
        const fromX = i % 2 === 0 ? -50 : 50
        gsap.fromTo(item,
          { x: fromX, y: 20, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 86%', once: true } }
        )
      })
    })

    return () => mm.revert()
  }, [])

  const headerContent = (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#F5A623', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Why T2</span>
        <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
      </div>
      <h2 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
        color: '#0D2B3E', lineHeight: 1.2, marginBottom: 10,
      }}>
        What makes Wendy{' '}
        <em style={{ color: '#7EC8E3', fontStyle: 'italic' }}>different.</em>
      </h2>
      <p style={{ fontSize: 16, color: 'rgba(13,43,62,0.5)', lineHeight: 1.6 }}>
        Not every coach has stood on the Kona finish line.
      </p>
    </div>
  )

  return (
    <section ref={wrapRef} className="why-section" style={{ background: '#FAFAF8', position: 'relative' }}>

      {/* ── DESKTOP: fixed header + horizontal track ── */}
      <div className="why-desktop-track" style={{ height: '100%', flexDirection: 'column', position: 'relative' }}>
        {/* Header absolute top-left */}
        <div ref={headerRef} style={{
          position: 'absolute', top: 60, left: '6vw',
          maxWidth: 460, zIndex: 10,
        }}>
          {headerContent}
        </div>

        {/* Horizontal card track */}
        <div style={{
          position: 'absolute',
          top: '50%', transform: 'translateY(-30%)',
          width: '100%', overflow: 'hidden',
          paddingTop: 80,
        }}>
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: 28,
              paddingLeft: '6vw',
              paddingRight: '12vw',
              width: 'max-content',
              willChange: 'transform',
            }}
          >
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} f={f} style={{ width: 'min(420px, 80vw)', flexShrink: 0 }} />
            ))}
          </div>
        </div>

        {/* Scroll hint — desktop only */}
        <div style={{
          position: 'absolute', right: 48, bottom: 40,
          display: 'flex', alignItems: 'center', gap: 8,
          color: 'rgba(13,43,62,0.3)',
          fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
            <path d="M0 5h28M24 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Scroll to explore
        </div>
      </div>

      {/* ── MOBILE: stacked grid ── */}
      <div className="why-mobile-grid" style={{ padding: '80px 32px 100px' }}>
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
          {headerContent}
        </div>
        <div className="why-grid" style={{ display: 'grid', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} ref={el => mobileRef.current[i] = el}>
              <FeatureCard f={f} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
