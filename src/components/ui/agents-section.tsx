'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from '@/components/ui/premium-card'

const agents = [
  {
    title: 'Voice Agent',
    subtitle: 'Phone  ·  24/7  ·  PMS-connected',
    description:
      'Answers every inbound call in your brand voice. Checks live availability. Qualifies the guest. Books the reservation directly — no commission, no hold time, no message to call back.',
    bullets: [
      'Handles reservation enquiries and books directly into your PMS (Mews, Cloudbeds, OPERA Cloud)',
      'Quotes live rates and availability in real time — no outdated information',
      'Manages modification and cancellation requests without staff involvement',
      "Handles concurrent calls — peak-hour surges don't break it",
      'Routes complex cases to human staff with full conversation transcript',
      'Cloned voice matched to your brand — not a generic robot',
    ],
  },
  {
    title: 'Chat Agent',
    subtitle: 'Website  ·  WhatsApp  ·  Instagram  ·  Facebook',
    description:
      'Always available across the channels your guests actually use. Captures intent before it reaches an OTA. Converts enquiries into direct bookings across every digital touchpoint.',
    bullets: [
      'Website chat with real-time booking integration',
      'WhatsApp — where GCC and Asian guests actually communicate',
      'Instagram and Facebook DM automation — no enquiry falls through',
      "Multilingual — responds in the guest's language without routing delays",
      'Upsells room upgrades, F&B, and spa packages contextually during the booking flow',
      'Feeds every interaction into your CRM — every conversation becomes a guest data point',
    ],
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function AgentsSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black to-neutral-950 py-24">
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
            The Infrastructure
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Two agents.
            <br />
            Every channel. Every hour.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Mytosis deploys a coordinated voice and chat intelligence layer — trained on your property, connected to your PMS, speaking in your brand voice.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {agents.map((agent, i) => (
            <PremiumCard key={agent.title} delay={0.15 * i} className="p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug">
                {agent.title}
              </h3>
              <div className="mt-2 text-sm font-semibold tracking-widest text-neutral-500 uppercase">
                {agent.subtitle}
              </div>
              <p className="mt-4 text-neutral-300 leading-relaxed">{agent.description}</p>
              <ul className="mt-6 space-y-3">
                {agent.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-neutral-300 leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neutral-500" aria-hidden="true" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </PremiumCard>
          ))}
        </div>
      </div>
    </div>
  )
}
