'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from '@/components/ui/premium-card'

const tiers = [
  {
    label: '50-room property',
    monthly: '$5,000–8,000',
    annual: '$60,000–96,000',
  },
  {
    label: '150-room property',
    monthly: '$15,000–24,000',
    annual: '$180,000–288,000',
  },
  {
    label: '20-property group',
    monthly: '$300,000–480,000',
    annual: '$3.6M–$5.76M',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function RoiSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-neutral-950 to-black py-24">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
            The ROI Case
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            The math is
            <br />
            uncomfortable.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            This is not a projection. It is the arithmetic of what you are currently losing — and what you recover when every call is answered and every enquiry converts direct.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <PremiumCard key={tier.label} delay={0.1 * i} className="p-8">
              <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {tier.label}
              </div>
              <div className="mt-6 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                Monthly recovery potential
              </div>
              <div className="mt-2 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
                {tier.monthly}
              </div>
              <div className="mt-6 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                Annual recovery potential
              </div>
              <div className="mt-2 text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
                {tier.annual}
              </div>
            </PremiumCard>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-center text-sm text-neutral-500 max-w-2xl mx-auto"
        >
          Based on industry benchmarks: 30–40% missed call rate, $180–$400 avg direct booking value, ~1,500 monthly inbound calls per 50-room property.
        </motion.p>

        <PremiumCard delay={0.1} className="mt-16 p-8 md:p-12 text-center">
          <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
            &lt; 7 days
          </div>
          <div className="mt-3 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            Setup pays back in
          </div>
          <p className="mt-4 text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Setup investment returns in under one week of recovered bookings. One captured call per day at a $200 average room rate generates $73,000 per year.
          </p>
        </PremiumCard>
      </div>
    </div>
  )
}
