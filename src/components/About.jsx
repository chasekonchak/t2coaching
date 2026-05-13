import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const quoteRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    if (textRef.current) {
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    if (imageRef.current) {
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        x: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power2.out',
      })
    }

    if (quoteRef.current) {
      gsap.from(quoteRef.current, {
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%', once: true },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 lg:py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div ref={textRef}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-[#F5A623]" />
              <span className="text-[#F5A623] text-xs font-semibold tracking-[0.2em] uppercase">
                About Wendy
              </span>
            </div>

            <h2
              className="font-display text-[#0D2B3E] leading-tight mb-8"
              style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
              }}
            >
              I've been in your shoes —<br />
              <em className="text-[#1A6B8A]">and on that finish line.</em>
            </h2>

            <div className="space-y-4 text-[#0D2B3E]/65 leading-relaxed text-base lg:text-lg">
              <p>
                Wendy Mader is not a desk-coach. She is a Kona Ironman World Championship finisher who has raced at the highest level of the sport — and spent more than 30 years translating that experience into results for her athletes. When she builds your plan, she's drawing from real race intelligence, not textbook theory.
              </p>
              <p>
                Her philosophy is simple: great coaching meets you where you are. Whether you're a weekend warrior juggling a family and a full-time job, or an age grouper with a Kona slot in your sights, Wendy designs training that fits your life — not the other way around. She's worked with hundreds of athletes across every level, from first-timers crossing their first finish line to podium regulars.
              </p>
              <p>
                Based in Colorado, Wendy coaches athletes remotely and in person. She is a USA Triathlon Certified Coach, a USA Cycling certified coach, and a certified USA Swimming coach — making T2 Coaching one of the rare programs where a single, elite coach can guide all three disciplines with true expertise.
              </p>
            </div>

            {/* Credentials row */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                'USAT Certified Coach',
                'USA Cycling Certified',
                'USA Swimming Certified',
              ].map((cred) => (
                <span
                  key={cred}
                  className="text-xs font-semibold text-[#1A6B8A] border border-[#7EC8E3] px-3 py-1.5 rounded-full"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>

          {/* Image + Quote side */}
          <div ref={imageRef} className="flex flex-col gap-6">
            {/* Photo placeholder — styled to evoke finish line / open water */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ aspectRatio: '4/5' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, #0D2B3E 0%, #1A6B8A 40%, #4AABCC 70%, #7EC8E3 100%)',
                }}
              />
              {/* Overlay pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 21px)',
                }}
              />
              {/* Centered label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <svg viewBox="0 0 80 80" className="w-16 h-16 mx-auto mb-3 opacity-50" fill="currentColor">
                    <circle cx="40" cy="28" r="12" />
                    <path d="M16 70c0-13.3 10.7-24 24-24s24 10.7 24 24" />
                  </svg>
                  <p className="text-sm">Wendy Mader</p>
                  <p className="text-xs opacity-60">Photo coming soon</p>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-[#F5A623] opacity-60" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-[#F5A623] opacity-60" />
            </div>

            {/* Kona pull quote */}
            <div
              ref={quoteRef}
              className="relative bg-[#0D2B3E] rounded-2xl p-6 lg:p-8"
            >
              <div className="absolute top-4 left-6 text-[#F5A623] text-5xl font-serif leading-none opacity-60">"</div>
              <blockquote
                className="font-display text-white italic leading-snug pt-4"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                }}
              >
                Crossing that Kona finish line changed everything I understand about what athletes are capable of. I bring that to every single training plan I write.
              </blockquote>
              <div className="flex items-center gap-3 mt-5">
                <div className="w-8 h-0.5 bg-[#F5A623]" />
                <span className="text-[#7EC8E3] text-sm font-semibold">
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
