import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 30, suffix: '+', label: 'Years Experience', sub: 'Elite coaching since 1994' },
  { value: 1,  suffix: '',  label: 'Kona Champion',    sub: 'The pinnacle of the sport' },
  { value: 500,suffix: '+', label: 'Athletes Coached', sub: 'From first-timers to qualifiers' },
  { value: 3,  suffix: '',  label: 'Disciplines. 1 Coach.', sub: 'Swim, bike, run — all mastered' },
]

function StatCard({ value, suffix, label, sub, index }) {
  const cardRef = useRef(null)
  const numRef  = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const obj = { val: 0 }

    // Alternate: even → from left, odd → from right
    const fromX = index % 2 === 0 ? -55 : 55

    gsap.fromTo(card,
      { x: fromX, y: 20, opacity: 0 },
      {
        x: 0, y: 0, opacity: 1,
        duration: 0.75, delay: index * 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        onComplete: () => {
          if (animated.current) return
          animated.current = true
          gsap.to(obj, {
            val: value, duration: 1.8, ease: 'power2.out',
            onUpdate: () => {
              const el = numRef.current
              if (el) el.textContent = Math.round(obj.val) + suffix
            },
          })
        },
      }
    )
  }, [value, suffix, index])

  return (
    <div ref={cardRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div ref={numRef} style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          color: '#0D2B3E', lineHeight: 1,
        }}>0{suffix}</div>
        <div style={{
          position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
          width: 32, height: 2, background: '#F5A623', borderRadius: 2,
        }} />
      </div>
      <p style={{ fontSize: 15, fontWeight: 600, color: '#0D2B3E', marginTop: 8, marginBottom: 5 }}>{label}</p>
      <p style={{ fontSize: 13, color: 'rgba(13,43,62,0.5)', lineHeight: 1.4 }}>{sub}</p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const eyebrow = eyebrowRef.current
    if (!section || !eyebrow) return
    gsap.fromTo(eyebrow,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 82%', once: true } }
    )
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: 'rgba(250,250,248,0.75)',
      padding: '80px 0 100px',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div ref={eyebrowRef} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, marginBottom: 64,
        }}>
          <div style={{ height: 1, width: 48, background: '#7EC8E3' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#1A6B8A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            By the Numbers
          </span>
          <div style={{ height: 1, width: 48, background: '#7EC8E3' }} />
        </div>

        <div className="stats-grid" style={{ display: 'grid', gap: '48px 32px' }}>
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
