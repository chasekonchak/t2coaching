import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Splits text into word-reveal spans for staggered wipe animation
function Words({ text, style }) {
  return (
    <>
      {text.split(' ').map((word, i, arr) => (
        <span key={i} className="wr-outer" style={{ marginRight: i < arr.length - 1 ? '0.28em' : 0 }}>
          <span className="wr-inner" style={style}>{word}</span>
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const glow = glowRef.current
    const eyebrow = eyebrowRef.current
    const headline = headlineRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const scrollHint = scrollRef.current

    if (!eyebrow || !headline || !sub || !cta || !scrollHint) return

    const words = headline.querySelectorAll('.wr-inner')

    const tl = gsap.timeline({ delay: 0.45 })

    tl.fromTo(eyebrow,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' })
      .fromTo(words,
        { yPercent: 108 },
        { yPercent: 0, duration: 0.85, stagger: 0.055, ease: 'power3.out' },
        '-=0.3')
      .fromTo(sub,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out' },
        '-=0.5')
      .fromTo(cta,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
        '-=0.35')
      .fromTo(scrollHint,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1')

    // Scroll hint float
    gsap.to(scrollHint, {
      y: 9, repeat: -1, yoyo: true, duration: 1.2, ease: 'sine.inOut', delay: 2.5,
    })

    // Parallax the radial glow at ~0.4× scroll speed
    if (glow && section) {
      gsap.to(glow, {
        yPercent: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'linear-gradient(155deg, #0D2B3E 0%, #163d57 28%, #1A6B8A 58%, #3a9abc 78%, #7EC8E3 100%)',
    }}>
      {/* Noise / grain texture — very subtle, just enough to feel premium */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 7,
        opacity: 0.042,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='320' height='320' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '320px 320px',
      }} />

      {/* Radial glow — parallaxes at 0.4× speed via GSAP */}
      <div ref={glowRef} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 60% at 65% 40%, rgba(74,171,204,0.24) 0%, transparent 70%)',
        willChange: 'transform',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(13,43,62,0.55), transparent)',
      }} />

      {/* Decorative lines */}
      <div style={{ position: 'absolute', top: '25%', right: 56, width: 1, height: 180, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', top: '15%', left: '28%', height: 1, width: 120, background: 'rgba(255,255,255,0.07)' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1280, margin: '0 auto',
        padding: '128px 32px 80px', width: '100%',
      }}>
        <div style={{ maxWidth: 760 }}>

          {/* Eyebrow */}
          <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 36, height: 1, background: '#F5A623', flexShrink: 0 }} />
            <span style={{ color: '#F5A623', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Kona Ironman Champion
            </span>
          </div>

          {/* Headline — word-by-word wipe reveal */}
          <h1 ref={headlineRef} style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(3.2rem, 7.5vw, 7rem)',
            lineHeight: 1.05,
            marginBottom: 30,
            color: '#ffffff',
          }}>
            <span style={{ display: 'block' }}>
              <Words text="Coached by" />
            </span>
            <span style={{ display: 'block' }}>
              <Words text="a Kona Champion." style={{ color: '#7EC8E3', fontStyle: 'italic' }} />
            </span>
          </h1>

          {/* Sub */}
          <p ref={subRef} style={{
            color: 'rgba(255,255,255,0.72)',
            fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
            fontWeight: 300, lineHeight: 1.7,
            maxWidth: 520, marginBottom: 44,
          }}>
            Personalized triathlon plans built around your life —{' '}
            <strong style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 500 }}>not a template.</strong>
            <br />
            Train smarter with 30+ years of elite coaching experience.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
            <a
              href="https://t2coaching.com/calendar/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                gap: 8, whiteSpace: 'nowrap',
                background: '#D4201A', color: '#fff',
                fontSize: 16, fontWeight: 600,
                padding: '16px 36px', borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(212,32,26,0.35)',
              }}
            >
              Book Your Free Call
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#programs" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, whiteSpace: 'nowrap',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 16, fontWeight: 500,
              padding: '15px 32px', borderRadius: 100,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.25)',
            }}>View Programs</a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div ref={scrollRef} style={{
        position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.38)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
