import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 4 L36 34 L20 28 L4 34 Z" strokeLinejoin="round" />
        <path d="M20 14v8" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#7EC8E3',
    tag: '01',
    title: 'Your trajectory is my specialty.',
    body: "Most coaching programs hand you a generic plan and call it personalized. Wendy analyzes where you are today — your fitness history, lifestyle constraints, and race goals — and builds a dynamic plan that evolves with you every week.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 32L20 8l12 24" strokeLinejoin="round" />
        <path d="M12 24h16" strokeLinecap="round" />
        <circle cx="20" cy="36" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    accentColor: '#F5A623',
    tag: '02',
    title: 'Real dirt & sweat, not just data.',
    body: "Wendy has trained in wind, altitude, cold, and heat. She's raced the bike course at Kona. The coaching she provides is grounded in lived experience — she knows what your body goes through because she's been there.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M20 10v10l7 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8l3 3M32 8l-3 3M8 32l3-3M32 32l-3-3" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#D4201A',
    tag: '03',
    title: 'Insider race strategy — including Kona.',
    body: "From pacing the Queen K highway to managing the energy of a local sprint — Wendy has race-specific intelligence most coaches simply don't have. Your pre-race brief will feel like a military op, not a pep talk.",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="8" width="28" height="24" rx="3" />
        <path d="M14 8V6M26 8V6" strokeLinecap="round" />
        <path d="M6 16h28" />
        <path d="M12 22h6M12 27h10" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#4AABCC',
    tag: '04',
    title: 'Built for busy people.',
    body: "Life doesn't pause for training. Wendy designs plans around your real schedule — not an idealized one. Family, work, travel. Your plan bends. Your progress doesn't have to.",
  },
]

export default function WhyT2() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const header = sectionRef.current.querySelector('.section-header')
    if (header) {
      gsap.from(header, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    itemsRef.current.forEach((item, i) => {
      if (!item) return
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        y: 30,
        opacity: 0,
        scale: 0.97,
        duration: 0.65,
        delay: (i % 2) * 0.12,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section
      className="py-20 lg:py-32 bg-[#FAFAF8]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 100% 50% at 50% 0%, rgba(126,200,227,0.08) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="section-header text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-12 bg-[#7EC8E3]" />
            <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em] uppercase">
              Why T2
            </span>
            <div className="h-px flex-1 max-w-12 bg-[#7EC8E3]" />
          </div>
          <h2
            className="font-display text-[#0D2B3E] leading-tight mb-4"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            What makes Wendy different.
          </h2>
          <p className="text-[#0D2B3E]/55 text-lg leading-relaxed">
            Not every coach has stood on the Kona finish line. Not every plan is built with your life in mind.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              ref={(el) => (itemsRef.current[i] = el)}
              className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Accent corner */}
              <div
                className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${feat.accentColor}20, transparent 70%)`,
                }}
              />

              {/* Tag */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${feat.accentColor}20`, color: feat.accentColor }}
                >
                  {feat.icon}
                </div>
                <span
                  className="text-xs font-bold tracking-[0.2em] opacity-40"
                  style={{ color: feat.accentColor }}
                >
                  {feat.tag}
                </span>
              </div>

              <h3
                className="font-display text-[#0D2B3E] mb-3"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                }}
              >
                {feat.title}
              </h3>
              <p className="text-[#0D2B3E]/60 leading-relaxed text-sm lg:text-base">
                {feat.body}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: feat.accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
