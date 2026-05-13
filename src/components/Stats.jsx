import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 30, suffix: '+', label: 'Years Experience', sublabel: 'Elite coaching since 1994' },
  { value: 1, suffix: '', label: 'Kona Ironman Champion', sublabel: 'The pinnacle of the sport' },
  { value: 500, suffix: '+', label: 'Athletes Coached', sublabel: 'From first-timers to Kona qualifiers' },
  { value: 3, suffix: '', label: 'Disciplines. 1 Coach.', sublabel: 'Swim, bike, run — all mastered' },
]

function StatCard({ value, suffix, label, sublabel, index }) {
  const cardRef = useRef(null)
  const numRef = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        once: true,
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power2.out',
      onComplete: () => {
        if (!animated.current) {
          animated.current = true
          gsap.to(
            { val: 0 },
            {
              val: value,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: function () {
                if (numRef.current) {
                  numRef.current.textContent =
                    Math.round(this.targets()[0].val) + suffix
                }
              },
            }
          )
        }
      },
    })
  }, [value, suffix, index])

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-3">
        <div
          ref={numRef}
          className="font-display text-[#0D2B3E] leading-none"
          style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          }}
        >
          0{suffix}
        </div>
        {/* Accent underline */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#F5A623] group-hover:w-12 transition-all duration-300" />
      </div>
      <p
        className="font-semibold text-[#0D2B3E] mb-1"
        style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
      >
        {label}
      </p>
      <p className="text-[#0D2B3E]/50 text-sm leading-snug">{sublabel}</p>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.from(sectionRef.current.querySelector('.section-eyebrow'), {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#FAFAF8] py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section label */}
        <div className="section-eyebrow flex items-center justify-center gap-3 mb-16">
          <div className="h-px flex-1 max-w-16 bg-[#7EC8E3]" />
          <span className="text-[#1A6B8A] text-xs font-semibold tracking-[0.2em] uppercase">
            By the Numbers
          </span>
          <div className="h-px flex-1 max-w-16 bg-[#7EC8E3]" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
