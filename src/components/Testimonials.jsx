import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      "Wendy changed my entire approach to racing. She had me doing things I'd never considered and by race day I felt more prepared than I ever had. I knocked 22 minutes off my Ironman PR.",
    name: 'Mark S.',
    tag: 'Ironman Athlete · 2x Finisher',
    stars: 5,
  },
  {
    quote:
      "I was skeptical about remote coaching, but Wendy's communication and attention to detail are unlike anything I've experienced. She knows my schedule, my strengths, my weaknesses. It's incredibly personal.",
    name: 'Lisa T.',
    tag: 'Age Group Triathlete · Colorado',
    stars: 5,
  },
  {
    quote:
      "Working with a coach who has actually raced Kona is a completely different experience. The race strategy alone was worth the entire season. I qualified for 70.3 Worlds in my second year with Wendy.",
    name: 'David R.',
    tag: '70.3 Worlds Qualifier',
    stars: 5,
  },
  {
    quote:
      "As a beginner, I was intimidated to work with an elite coach. Wendy made me feel welcome and capable from day one. She met me exactly where I was — and pushed me further than I thought possible.",
    name: 'Sarah M.',
    tag: 'Sprint Triathlon Finisher · First Season',
    stars: 5,
  },
  {
    quote:
      "The 12-week plan was an incredible value. Detailed, periodized, specific to my race. It's not a cookie-cutter plan — it had my name on it from the first workout. Highly recommend.",
    name: 'James K.',
    tag: 'Olympic Distance Athlete',
    stars: 5,
  },
]

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    gsap.from(sectionRef.current.querySelector('.section-header'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.from(trackRef.current, {
      scrollTrigger: { trigger: trackRef.current, start: 'top 85%', once: true },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    })
  }, [])

  const goTo = (index) => {
    setActive(index)
  }

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1))
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1))

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="section-header flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#F5A623]" />
              <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em] uppercase">
                Testimonials
              </span>
            </div>
            <h2
              className="font-display text-[#0D2B3E] leading-tight"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
              }}
            >
              Athletes who've crossed<br className="hidden lg:block" /> their finish lines.
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#7EC8E3] hover:bg-[#7EC8E3]/10 flex items-center justify-center transition-all duration-200 group"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 text-[#0D2B3E] group-hover:text-[#1A6B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-11 h-11 rounded-full border border-gray-200 hover:border-[#7EC8E3] hover:bg-[#7EC8E3]/10 flex items-center justify-center transition-all duration-200 group"
              aria-label="Next"
            >
              <svg className="w-5 h-5 text-[#0D2B3E] group-hover:text-[#1A6B8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div ref={trackRef} className="relative">
          {/* Large quote mark */}
          <div
            className="absolute -top-4 -left-2 font-serif text-[120px] text-[#7EC8E3]/15 leading-none pointer-events-none select-none"
            style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
          >
            "
          </div>

          {/* Active card */}
          <div className="grid lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`relative bg-[#FAFAF8] rounded-2xl p-7 border transition-all duration-300 ${
                  i === active
                    ? 'border-[#7EC8E3] shadow-lg shadow-[#7EC8E3]/15 scale-[1.02]'
                    : i === (active + 1) % testimonials.length
                    ? 'border-gray-100'
                    : i === (active + 2) % testimonials.length
                    ? 'border-gray-100 opacity-60 hidden lg:block'
                    : 'hidden'
                }`}
                onClick={() => goTo(i)}
                style={{ cursor: i !== active ? 'pointer' : 'default' }}
              >
                <StarRating count={t.stars} />
                <blockquote className="text-[#0D2B3E]/75 leading-relaxed text-sm lg:text-base mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7EC8E3] to-[#1A6B8A] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-[#0D2B3E] text-sm">{t.name}</p>
                    <p className="text-[#0D2B3E]/45 text-xs">{t.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 h-2 bg-[#1A6B8A]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
