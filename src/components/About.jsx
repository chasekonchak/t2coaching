import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CREDS = ['USAT Certified Coach', 'USA Cycling Certified', 'USA Swimming Certified']

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const text = textRef.current
    const image = imageRef.current
    const quote = quoteRef.current

    if (text) {
      gsap.fromTo(text, { x: -50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }
    if (image) {
      gsap.fromTo(image, { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 78%', once: true },
      })
    }
    if (quote) {
      gsap.fromTo(quote, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: quote, start: 'top 86%', once: true },
      })
    }
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{ background: '#ffffff', padding: '80px 0 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div className="about-grid" style={{ display: 'grid', gap: 60, alignItems: 'center' }}>

          {/* Text */}
          <div ref={textRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#F5A623' }} />
              <span style={{
                fontSize: 11, fontWeight: 600, color: '#F5A623',
                letterSpacing: '0.2em', textTransform: 'uppercase',
              }}>About Wendy</span>
            </div>

            <h2 style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)',
              color: '#0D2B3E', lineHeight: 1.2, marginBottom: 28,
            }}>
              I've been in your shoes —<br />
              <em style={{ color: '#1A6B8A', fontStyle: 'italic' }}>and on that finish line.</em>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
              {[
                'Wendy Mader is not a desk-coach. She is a Kona Ironman World Championship finisher who has raced at the highest level of the sport — and spent more than 30 years translating that experience into results for her athletes.',
                "Her philosophy is simple: great coaching meets you where you are. Whether you're a weekend warrior juggling family and a full-time job, or an age grouper with a Kona slot in your sights, Wendy designs training that fits your life — not the other way around.",
                'Based in Colorado, she coaches athletes remotely and in person across all three disciplines with USA Triathlon, USA Cycling, and USA Swimming certifications — making T2 Coaching one of the rare programs where a single elite coach guides every discipline.',
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 16, color: 'rgba(13,43,62,0.64)', lineHeight: 1.72 }}>{text}</p>
              ))}
            </div>

            {/* Credentials */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CREDS.map(c => (
                <span key={c} style={{
                  display: 'inline-block',
                  border: '1px solid rgba(126,200,227,0.55)',
                  color: '#1A6B8A',
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 14px', borderRadius: 100, letterSpacing: '0.03em',
                }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Image + Quote */}
          <div ref={imageRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Photo placeholder */}
            <div style={{
              position: 'relative', borderRadius: 20, overflow: 'hidden',
              aspectRatio: '4 / 5',
              background: 'linear-gradient(135deg, #0D2B3E 0%, #1A6B8A 45%, #4AABCC 80%, #7EC8E3 100%)',
            }}>
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.08,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)',
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
              }}>
                <svg width="56" height="56" viewBox="0 0 80 80" fill="currentColor">
                  <circle cx="40" cy="28" r="12" />
                  <path d="M16 70c0-13.3 10.7-24 24-24s24 10.7 24 24" />
                </svg>
                <p style={{ marginTop: 12, fontSize: 14, fontWeight: 500 }}>Wendy Mader</p>
                <p style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>Photo coming soon</p>
              </div>
              <div style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderTop: '2px solid rgba(245,166,35,0.55)', borderRight: '2px solid rgba(245,166,35,0.55)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, width: 36, height: 36, borderBottom: '2px solid rgba(245,166,35,0.55)', borderLeft: '2px solid rgba(245,166,35,0.55)' }} />
            </div>

            {/* Pull quote */}
            <div ref={quoteRef} style={{ background: '#0D2B3E', borderRadius: 18, padding: '28px 28px 24px', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 12, left: 22,
                fontSize: 56, color: 'rgba(245,166,35,0.45)',
                fontFamily: 'Georgia, serif', lineHeight: 1,
              }}>"</div>
              <blockquote style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                color: '#ffffff', fontStyle: 'italic',
                lineHeight: 1.55, paddingTop: 20,
              }}>
                Crossing that Kona finish line changed everything I understand about what athletes are capable of. I bring that to every training plan I write.
              </blockquote>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
                <div style={{ width: 28, height: 2, background: '#F5A623', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7EC8E3' }}>
                  Wendy Mader — Kona Ironman Champion
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
