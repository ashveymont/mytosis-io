'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const stats = [
  { value: '30–40%', label: 'Calls go unanswered' },
  { value: '15–25%', label: 'OTA commission rate' },
  { value: '21.8%', label: 'OTA cancellation rate' },
]

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  // Background drifts at a fraction of scroll speed for a floating, cinematic depth effect
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  // Content fades in as the strip scrolls through the middle of the viewport,
  // driven directly by scroll progress rather than an intersection threshold.
  const introOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const introY = useTransform(scrollYProgress, [0.3, 0.5], [24, 0])

  const statsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
  const statsY = useTransform(scrollYProgress, [0.4, 0.6], [24, 0])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-950 to-black py-16 md:py-20"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 scale-125">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-lg md:text-xl font-bold text-neutral-200 leading-relaxed">
            Missed calls become Booking.com reservations. OTA commissions consume margins you can&apos;t recover. Front desks handle everything — and fail everything simultaneously.
          </div>
          <span className="block text-lg text-neutral-400 mt-4 font-semibold">
            Mytosis installs AI voice and chat agents that stop the bleed.
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: statsOpacity, y: statsY }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-3 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
