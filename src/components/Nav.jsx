import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Nav() {
  const navRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (navRef.current) {
      gsap.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
      })
    }

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Programs', 'About', 'Testimonials']

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7EC8E3] to-[#1A6B8A] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs leading-none">T2</span>
            </div>
            <span
              className="font-display text-xl text-[#0D2B3E] group-hover:text-[#1A6B8A] transition-colors"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              T2 Coaching
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-[#0D2B3E]/70 hover:text-[#0D2B3E] transition-colors tracking-wide"
              >
                {link}
              </a>
            ))}
            <a
              href="https://t2coaching.com/calendar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4201A] hover:bg-[#b81b15] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-200 hover:-translate-y-0.5"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#0D2B3E] transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#0D2B3E] transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#0D2B3E] transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
        <div className="bg-white/98 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-[#0D2B3E]/70 hover:text-[#0D2B3E] py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="https://t2coaching.com/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#D4201A] text-white text-sm font-semibold px-5 py-3 rounded-full"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  )
}
