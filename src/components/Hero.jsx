import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Hero() {
  const containerRef = useRef(null)
  const taglineRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    if (
      !taglineRef.current ||
      !headlineRef.current ||
      !sublineRef.current ||
      !ctaRef.current ||
      !scrollHintRef.current
    ) return

    const lines = headlineRef.current.querySelectorAll('.headline-line')
    const tl = gsap.timeline({ delay: 0.4 })

    tl.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
      .from(lines, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.3')
      .from(sublineRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')
      .from(ctaRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2')
      .from(scrollHintRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1')

    gsap.to(scrollHintRef.current, {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'sine.inOut',
      delay: 2,
    })
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #0D2B3E 0%, #1A6B8A 35%, #4AABCC 65%, #A8DCEA 85%, #E8F7FC 100%)',
      }}
    >
      {/* Layered abstract water/sky shapes */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(126,200,227,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 opacity-30"
        style={{
          background:
            'linear-gradient(to top, rgba(13,43,62,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Decorative geometric lines */}
      <div className="absolute top-1/4 right-12 w-px h-48 bg-white/10 hidden lg:block" />
      <div className="absolute top-1/3 right-16 w-px h-32 bg-white/10 hidden lg:block" />
      <div className="absolute top-16 left-1/4 w-32 h-px bg-white/10 hidden lg:block" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Eyebrow tag */}
          <div ref={taglineRef} className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F5A623]" />
            <span className="text-[#F5A623] text-sm font-semibold tracking-[0.2em] uppercase">
              Kona Ironman Champion
            </span>
          </div>

          {/* Main headline */}
          <h1
            ref={headlineRef}
            className="font-display text-white mb-6 leading-[1.05]"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
            }}
          >
            <span className="headline-line block">Coached by</span>
            <span className="headline-line block italic text-[#7EC8E3]">
              a Kona Champion.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            ref={sublineRef}
            className="text-white/75 font-light leading-relaxed max-w-xl mb-10"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
          >
            Personalized triathlon plans built around your life —&nbsp;
            <span className="text-white/95">not a template.</span>
            <br className="hidden sm:block" />
            Train smarter with 30+ years of elite coaching experience.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <a
              href="https://t2coaching.com/calendar/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-[#D4201A] hover:bg-[#c01b15] text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-0.5 text-base"
            >
              Book Your Free Call
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#programs"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-base transition-colors border border-white/20 hover:border-white/40 px-8 py-4 rounded-full"
            >
              View Programs
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
