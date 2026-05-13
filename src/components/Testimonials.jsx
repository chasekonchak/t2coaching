import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: "Wendy changed my entire approach to racing. She had me doing things I'd never considered and by race day I felt more prepared than I ever had. I knocked 22 minutes off my Ironman PR.",
    name: 'Mark S.',
    tag: 'Ironman Athlete · 2x Finisher',
  },
  {
    quote: "I was skeptical about remote coaching, but Wendy's communication and attention to detail are unlike anything I've experienced. She knows my schedule, my strengths, my weaknesses. It's incredibly personal.",
    name: 'Lisa T.',
    tag: 'Age Group Triathlete · Colorado',
  },
  {
    quote: "Working with a coach who has actually raced Kona is a completely different experience. The race strategy alone was worth the entire season. I qualified for 70.3 Worlds in my second year with Wendy.",
    name: 'David R.',
    tag: '70.3 Worlds Qualifier',
  },
  {
    quote: "As a beginner, I was intimidated to work with an elite coach. Wendy made me feel welcome and capable from day one. She met me exactly where I was — and pushed me further than I thought possible.",
    name: 'Sarah M.',
    tag: 'Sprint Triathlon Finisher · First Season',
  },
  {
    quote: "The 12-week plan was incredible value. Detailed, periodized, specific to my race. Not a cookie-cutter plan — it had my name on it from the first workout. Highly recommend.",
    name: 'James K.',
    tag: 'Olympic Distance Athlete',
  },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
      {[0, 1, 2, 3, 4].map(i => (
        <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill="#F5A623">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const cards = cardsRef.current
    if (!section) return

    if (header) {
      gsap.fromTo(header, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true },
      })
    }
    if (cards) {
      gsap.fromTo(cards, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: cards, start: 'top 85%', once: true },
      })
    }
  }, [])

  const prev = () => setActive(a => (a === 0 ? TESTIMONIALS.length - 1 : a - 1))
  const next = () => setActive(a => (a === TESTIMONIALS.length - 1 ? 0 : a + 1))

  const cards = [
    { t: TESTIMONIALS[active], prominence: 'primary' },
    { t: TESTIMONIALS[(active + 1) % TESTIMONIALS.length], prominence: 'secondary' },
    { t: TESTIMONIALS[(active + 2) % TESTIMONIALS.length], prominence: 'tertiary' },
  ]

  return (
    <section id="testimonials" ref={sectionRef} style={{ background: '#FAFAF8', padding: '80px 0 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>

        {/* Header */}
        <div ref={headerRef} style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20, marginBottom: 56,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 32, height: 1, background: '#F5A623' }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#F5A623',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>Testimonials</span>
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#0D2B3E', lineHeight: 1.2,
            }}>
              Athletes who've crossed<br />their finish lines.
            </h2>
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[
              { fn: prev, d: 'M15 19l-7-7 7-7', label: 'Previous' },
              { fn: next, d: 'M9 5l7 7-7 7', label: 'Next' },
            ].map(({ fn, d, label }) => (
              <button key={label} onClick={fn} aria-label={label} style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid rgba(0,0,0,0.1)',
                background: '#fff', color: '#0D2B3E',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="testimonials-grid" style={{ display: 'grid', gap: 20, position: 'relative' }}>
          <div style={{
            position: 'absolute', top: -20, left: -8,
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 140, color: 'rgba(126,200,227,0.1)',
            lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
          }}>"</div>

          {cards.map(({ t, prominence }, i) => (
            <div
              key={`${active}-${i}`}
              onClick={() => i !== 0 && setActive((active + i) % TESTIMONIALS.length)}
              className={prominence === 'tertiary' ? 't-card-3' : ''}
              style={{
                background: '#ffffff',
                border: `1px solid ${prominence === 'primary' ? '#7EC8E3' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 20,
                padding: 28,
                boxShadow: prominence === 'primary' ? '0 8px 32px rgba(126,200,227,0.15)' : 'none',
                transform: prominence === 'primary' ? 'scale(1.01)' : 'scale(1)',
                opacity: prominence === 'tertiary' ? 0.55 : 1,
                cursor: i !== 0 ? 'pointer' : 'default',
              }}
            >
              <Stars />
              <blockquote style={{
                fontSize: 15, color: 'rgba(13,43,62,0.75)',
                lineHeight: 1.7, marginBottom: 22,
              }}>"{t.quote}"</blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #7EC8E3, #1A6B8A)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0D2B3E' }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: 'rgba(13,43,62,0.45)' }}>{t.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Go to ${i + 1}`} style={{
              borderRadius: 100, border: 'none', cursor: 'pointer', padding: 0,
              width: i === active ? 24 : 8, height: 8,
              background: i === active ? '#1A6B8A' : 'rgba(0,0,0,0.18)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
