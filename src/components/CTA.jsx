import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    gsap.from(contentRef.current.children, {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-36"
      style={{
        background:
          'linear-gradient(135deg, #0D2B3E 0%, #1A6B8A 50%, #0D2B3E 100%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, #4AABCC 0%, transparent 70%)',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border border-white/10 rounded-full" />
      <div className="absolute top-12 left-12 w-8 h-8 border border-white/10 rounded-full" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border border-white/10 rounded-full" />
      <div className="absolute bottom-14 right-14 w-10 h-10 border border-[#F5A623]/20 rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-[#F5A623]" />
            <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em] uppercase">
              Start Your Season
            </span>
            <div className="h-px w-12 bg-[#F5A623]" />
          </div>

          {/* Headline */}
          <h2
            className="font-display text-white leading-tight"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            }}
          >
            Ready to race smarter?
          </h2>

          {/* Sub-line */}
          <p
            className="text-white/65 max-w-lg leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            30 minutes with Wendy could change your entire season. No commitment required — just a conversation about where you are and where you want to go.
          </p>

          {/* CTA Button */}
          <a
            href="https://t2coaching.com/calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#D4201A] hover:bg-[#c01b15] text-white font-bold px-10 py-5 rounded-full transition-all duration-200 hover:shadow-2xl hover:shadow-red-900/50 hover:-translate-y-1 mt-2"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}
          >
            Book a Free Call with Wendy
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Trust note */}
          <p className="text-white/35 text-sm">
            No sales pitch. Just a real conversation about your goals.
          </p>
        </div>
      </div>
    </section>
  )
}
