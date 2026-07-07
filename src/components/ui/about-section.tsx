'use client'

import { motion } from 'framer-motion'
import { FloatingCTA } from '@/components/ui/floating-cta'
import { PremiumCard } from '@/components/ui/premium-card'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

export function AboutSection() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-neutral-950 to-black py-24">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
            Built By
          </div>
          <h2 className="mt-4 text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Blackcrest Scaling.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Blackcrest Scaling is a Dubai-based AI revenue infrastructure firm. Mytosis is our dedicated hotel vertical — purpose-built for the specific operational and revenue dynamics of hospitality groups.
          </p>
          <p className="mt-4 font-bold text-neutral-100 leading-relaxed">
            We don&apos;t sell software. We install operational infrastructure that generates measurable revenue from day one.
          </p>
        </motion.div>

        <PremiumCard delay={0.15} className="mt-16 p-8 md:p-12 text-center">
          <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
            Currently Accepting
          </div>
          <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white leading-snug">
            Early Access
            <br />
            Properties.
          </h3>
          <p className="mt-4 text-neutral-300 leading-relaxed">
            Mytosis is currently onboarding its first cohort of hotel groups and chains. Early access properties receive priority integration support and founding client pricing.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Sri Lanka pilot programme is active. UAE and GCC expansion begins Q3 2026.
          </p>
          <div className="mt-8 flex justify-center">
            <FloatingCTA label="Apply for Early Access" />
          </div>
        </PremiumCard>
      </div>
    </div>
  )
}
