'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from '@/components/ui/premium-card'

const leaks = [
  {
    label: 'Leak 01',
    title: 'The 2am Call That Books on Booking.com',
    body: [
      'A guest calls at 2am. Your evening clerk is with another guest. The phone rings four times. Voicemail. The caller does what every modern traveler does — opens Booking.com and books there instead.',
    ],
    callout: 'You paid nothing to acquire that guest. You lose 15–25% to acquire them back.',
    detail:
      'For a 150-room property, industry data shows this costs $15,000–$24,000 per month in recoverable revenue. Not lost demand. Lost capture.',
    stat: '30–40% of inbound hotel calls go unanswered',
  },
  {
    label: 'Leak 02',
    title: 'The Commission You Call a Distribution Cost',
    body: [
      'A hotel generating $7.6M in annual revenue with 60% OTA dependency at 20% commission writes a check for $912,000 every year. Not to staff. Not to renovations. Not to the guest experience. To a platform that also owns the guest data, controls the cancellation policy, and can bury your listing on a whim.',
    ],
    callout:
      'Most GMs see the 15–18% commission rate and call it the cost of doing business. The real cost — once cancellations, lost data, and brand dilution are factored — is 30–35%.',
    stat: 'OTA cancellations run at double the rate of direct bookings',
  },
  {
    label: 'Leak 03',
    title: 'The Front Desk That Does Everything and Fails Everything',
    body: [
      "Your evening clerk is the receptionist, the bellhop, the maintenance dispatcher, the breakfast prep, and the security check — simultaneously. When they're physically with a guest, the phone goes unanswered and the chat goes unread.",
    ],
    callout:
      "This isn't a staffing problem. More headcount doesn't solve simultaneous demand. It's a system design problem. And the cost compounds across every property in your group.",
    stat: 'Peak call volume concentrates into 2–3 hour windows daily',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function RevenueLeaksSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black to-neutral-950 py-24">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Three revenue leaks.
            <br />
            One systemic failure.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Your hotel can be 75% occupied and still losing money. Most GMs watch RevPAR. The ones who understand the business watch net operating profit after loyalty, commission, and channel costs — the number that actually matters.
          </p>
        </motion.div>

        <div className="mt-20 space-y-16">
          {leaks.map((leak, i) => (
            <motion.div
              key={leak.label}
              {...fadeUp}
              transition={{ duration: 0.8, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {leak.label}
              </div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold text-white leading-snug">
                {leak.title}
              </h3>
              {leak.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-neutral-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <p className="mt-4 font-bold text-neutral-100 leading-relaxed">
                {leak.callout}
              </p>
              {leak.detail && (
                <p className="mt-4 text-neutral-300 leading-relaxed">{leak.detail}</p>
              )}
              <div className="mt-6 border-l-2 border-white/20 pl-4 text-sm font-semibold tracking-widest text-neutral-400 uppercase">
                {leak.stat}
              </div>
            </motion.div>
          ))}
        </div>

        <PremiumCard delay={0.1} className="mt-20 p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
            Compound Effect — For a Chain, Multiply Everything by Twenty
          </h3>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            A single 150-room property loses $15,000–24,000/month to missed calls. For a 20-property group, that&apos;s $300,000–$480,000 per month in recoverable revenue — before OTA commission losses are counted.
          </p>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            The structural cause is identical across every property. Which means a single infrastructure fix scales the recovery across your entire portfolio.
          </p>
          <p className="mt-6 text-lg font-semibold text-neutral-100">
            One infrastructure decision. Every property benefits immediately.
          </p>
        </PremiumCard>
      </div>
    </div>
  )
}
