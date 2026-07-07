'use client'

import { motion } from 'framer-motion'
import { PremiumCard } from '@/components/ui/premium-card'

const integrations = [
  {
    name: 'Mews',
    description: 'Full native API integration. Availability, rates, and booking in real time.',
  },
  {
    name: 'Cloudbeds',
    description: 'Open API — fastest integration, zero friction for most properties.',
  },
  {
    name: 'OPERA Cloud',
    description: 'Supported with scoping session. Oracle-compliant integration pathway.',
  },
  {
    name: 'WhatsApp Business',
    description: 'Direct API. No third-party relay. Full conversation ownership.',
  },
  {
    name: 'Your Website',
    description: 'Single script embed. Live in under 30 minutes on any platform.',
  },
  {
    name: 'CRM / Email Stack',
    description: 'Every conversation becomes a guest data point for future remarketing.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function IntegrationsSection() {
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
            Integrations
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Plugs into the systems
            <br />
            you already run.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            No ripping out your existing stack. Mytosis connects directly to your PMS via API — live data, real-time sync, zero double-bookings.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {integrations.map((integration, i) => (
            <PremiumCard key={integration.name} delay={0.08 * i} className="p-6">
              <h3 className="text-lg font-bold text-white">{integration.name}</h3>
              <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
                {integration.description}
              </p>
            </PremiumCard>
          ))}
        </div>
      </div>
    </div>
  )
}
