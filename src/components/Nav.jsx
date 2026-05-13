import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const NAVY = '#0D2B3E'
const BLUE = '#1A6B8A'
const SKY = '#7EC8E3'
const RED = '#D4201A'

export default function Nav() {
  const ref = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el,
      { y: -70, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out', delay: 0.2 }
    )
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Programs', href: '#programs' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
  ]

  return (
    <nav
      ref={ref}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9999,
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        background: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', height: 72,
        }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: `linear-gradient(135deg, ${SKY}, ${BLUE})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 12, letterSpacing: '0.04em' }}>T2</span>
            </div>
            <span style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 20, lineHeight: 1,
              color: scrolled ? NAVY : '#ffffff',
              transition: 'color 0.35s ease',
            }}>T2 Coaching</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
            {links.map(({ label, href }) => (
              <a key={label} href={href} style={{
                fontSize: 14, fontWeight: 500, letterSpacing: '0.025em',
                color: scrolled ? 'rgba(13,43,62,0.68)' : 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}>{label}</a>
            ))}
            <a
              href="https://t2coaching.com/calendar/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                whiteSpace: 'nowrap',
                background: RED, color: '#fff',
                fontSize: 14, fontWeight: 600,
                padding: '10px 22px', borderRadius: 100,
                textDecoration: 'none', letterSpacing: '0.01em',
              }}
            >Book a Call</a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="flex md:hidden"
            aria-label="Toggle menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 8, flexDirection: 'column', gap: 5, alignItems: 'center',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 24, height: 2, borderRadius: 2,
                background: scrolled ? NAVY : '#fff',
                transition: 'all 0.25s ease',
                transform: open && i === 0 ? 'rotate(45deg) translateY(7px)' :
                           open && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 300 : 0,
        transition: 'max-height 0.3s ease',
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: open ? '1px solid rgba(0,0,0,0.07)' : 'none',
      }}>
        <div style={{ padding: '16px 32px 28px' }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '13px 0',
              fontSize: 15, fontWeight: 500, color: NAVY,
              textDecoration: 'none',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}>{label}</a>
          ))}
          <a
            href="https://t2coaching.com/calendar/"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 16,
              background: RED, color: '#fff',
              fontSize: 14, fontWeight: 600,
              padding: '14px 0',
              borderRadius: 100, textDecoration: 'none',
            }}
          >Book a Call</a>
        </div>
      </div>
    </nav>
  )
}
