'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from '@/components/ui/premium-card'

const stats = [
  {
    label: 'The Real Cost of OTA Dependency',
    value: '30–35%',
    caption: 'True cost per OTA booking',
    description:
      'Once commissions, elevated cancellation rates, lost guest data, and brand dilution are factored. The headline 15–18% commission is only the starting point.',
  },
  {
    label: 'Direct vs OTA Cancellation Gap',
    value: '2×',
    caption: 'Higher OTA cancellation rate',
    description:
      'OTA guests cancel at 21.8% vs 10.6% for direct bookings. Hotels pay to acquire the booking twice — once in commission, once in restaffing and remarketing when it cancels.',
  },
  {
    label: 'Revenue at Stake Per Property',
    value: '$73K+',
    caption: 'Per property, per year',
    description:
      'One captured call per day at $200 average room rate = $73,000 recovered per year. For a 20-property group: over $1.4M annually, at near-zero incremental cost after setup.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function WhySection() {
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
            Why This Keeps Happening
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            OTAs don&apos;t win at the booking layer.
            <br />
            They win at the introduction layer.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            The conventional answer to OTA dependency — direct booking incentives, loyalty programmes, metasearch investment — operates after the introduction has already occurred. A guest discovers your property through Booking.com. The commission is structurally embedded the moment that introduction happens.
          </p>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            A hotel can have a perfectly optimised website, a seamless booking engine, a competitive rate guarantee — and still pay 25% OTA commission on a substantial share of revenue. Because the guest who discovered them through Booking.com is an OTA guest forever.
          </p>
          <p className="mt-4 font-bold text-neutral-100 leading-relaxed">
            The only escape is capturing demand before it reaches an OTA at all. Which means being available — at 2am, at peak check-in, during a simultaneous surge of calls — at the precise moment the guest is ready to book direct.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <PremiumCard key={stat.label} delay={0.1 * i} className="p-8">
              <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {stat.label}
              </div>
              <div className="mt-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                {stat.caption}
              </div>
              <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
                {stat.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </div>
    </div>
  )
}
