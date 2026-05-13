import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <path d="M24 14v10l6 4" strokeLinecap="round" />
        <path d="M14 24c0-5.5 4.5-10 10-10" strokeLinecap="round" />
        <path d="M34 24c0 5.5-4.5 10-10 10" strokeLinecap="round" />
      </svg>
    ),
    badge: 'Most Popular',
    title: 'Multisport & Single Sport Coaching',
    description:
      'Full-season personalized coaching across triathlon, duathlon, or individual disciplines. Weekly structured training, unlimited communication, and race-day strategy built around your schedule and goals.',
    highlight: 'Starting at $200/month',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 8C16 8 10 18 10 24s6 16 14 16 14-10 14-16S32 8 24 8z" />
        <path d="M20 24c0-4 1.5-8 4-10M28 24c0 4-1.5 8-4 10" strokeLinecap="round" />
        <path d="M10 24h28" strokeLinecap="round" />
      </svg>
    ),
    badge: null,
    title: 'Private Lessons',
    description:
      'One-on-one focused sessions in swimming, cycling, or running. Perfect for athletes who need targeted technique work, a skills breakthrough, or expert eyes on a specific weakness in their race.',
    highlight: 'Swim · Bike · Run',
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="10" width="32" height="28" rx="3" />
        <path d="M16 10V8M32 10V8" strokeLinecap="round" />
        <path d="M8 20h32" />
        <path d="M16 28h4M16 33h10" strokeLinecap="round" />
        <path d="M28 28l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    badge: 'Budget Friendly',
    title: '12-Week Custom Plan',
    description:
      'A fully customized 12-week training plan delivered to your device — structured periodization, sport-specific workouts, and Wendy\'s signature race-day strategy. Great coaching, accessible price.',
    highlight: 'One-time investment',
  },
]

export default function Programs() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

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

    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 85%', once: true },
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power2.out',
      })
    })
  }, [])

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="section-header max-w-2xl mb-16 lg:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-[#F5A623]" />
            <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em] uppercase">
              Programs
            </span>
          </div>
          <h2
            className="font-display text-[#0D2B3E] leading-tight mb-4"
            style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            Coaching built for how you actually live.
          </h2>
          <p className="text-[#0D2B3E]/60 text-lg leading-relaxed">
            Whether you're chasing your first finish line or gunning for Kona, there's a path designed for you.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {programs.map((program, i) => (
            <div
              key={program.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="relative group flex flex-col bg-[#FAFAF8] border border-gray-100 rounded-2xl p-8 hover:border-[#7EC8E3] hover:shadow-xl hover:shadow-[#7EC8E3]/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Badge */}
              {program.badge && (
                <div className="absolute -top-3 left-8">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                      program.badge === 'Budget Friendly'
                        ? 'bg-[#F5A623] text-white'
                        : 'bg-[#D4201A] text-white'
                    }`}
                  >
                    {program.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div className="w-14 h-14 bg-[#7EC8E3]/15 rounded-xl flex items-center justify-center text-[#1A6B8A] mb-6 group-hover:bg-[#7EC8E3]/25 transition-colors">
                {program.icon}
              </div>

              {/* Content */}
              <h3
                className="font-display text-[#0D2B3E] text-xl mb-3"
                style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
              >
                {program.title}
              </h3>
              <p className="text-[#0D2B3E]/60 text-sm leading-relaxed flex-1 mb-6">
                {program.description}
              </p>

              {/* Highlight pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1A6B8A] bg-[#7EC8E3]/15 px-3 py-1.5 rounded-full">
                  {program.highlight}
                </span>
              </div>

              {/* CTA */}
              <a
                href="https://t2coaching.com/calendar/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-[#0D2B3E] hover:bg-[#1A6B8A] text-white text-sm font-semibold py-3.5 rounded-xl transition-all duration-200 group/btn"
              >
                Book a Call
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
