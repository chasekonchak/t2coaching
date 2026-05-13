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

export default function WhyT2() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    if (!section) return

    if (header) {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      })
    }

    itemsRef.current.forEach((item, i) => {
      if (!item) return
      gsap.fromTo(item,
        { y: 30, opacity: 0, scale: 0.98 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.65, delay: (i % 2) * 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        }
      )
    })
  }, [])

  return (
    <section style={{ background: '#FAFAF8', padding: '80px 0 100px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 18 }}>
            <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#F5A623',
              letterSpacing: '0.2em', textTransform: 'uppercase',
            }}>Why T2</span>
            <div style={{ height: 1, width: 40, background: '#7EC8E3' }} />
          </div>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#0D2B3E', lineHeight: 1.2, marginBottom: 14,
          }}>What makes Wendy different.</h2>
          <p style={{ fontSize: 17, color: 'rgba(13,43,62,0.55)', lineHeight: 1.65 }}>
            Not every coach has stood on the Kona finish line. Not every plan is built with your life in mind.
          </p>
        </div>

        {/* Grid */}
        <div className="why-grid" style={{ display: 'grid', gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              ref={el => itemsRef.current[i] = el}
              style={{
                background: '#ffffff',
                border: '1px solid rgba(0,0,0,0.06)',
                borderRadius: 20,
                padding: '36px 36px 32px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Number badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 44, height: 44, borderRadius: 10,
                background: `${f.accent}1a`,
                color: f.accent,
                fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
                marginBottom: 20,
              }}>{f.num}</div>

              <h3 style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                color: '#0D2B3E', lineHeight: 1.3, marginBottom: 12,
              }}>{f.title}</h3>

              <p style={{ fontSize: 15, color: 'rgba(13,43,62,0.6)', lineHeight: 1.7 }}>{f.body}</p>

              {/* Bottom accent */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 2, background: f.accent, opacity: 0.35,
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
