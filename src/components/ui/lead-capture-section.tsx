'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
}

const inputClasses =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all duration-300 focus:border-white/30 focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(255,255,255,0.06)] disabled:opacity-60'

export function LeadCaptureSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')
  const submitted = status === 'submitted'
  const mountedAt = useRef(Date.now())

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          company: data.get('company'),
          // Honeypot — real users never fill this; bots often fill every field
          website: data.get('website'),
          elapsedMs: Date.now() - mountedAt.current,
        }),
      })

      if (!res.ok) throw new Error('Request failed')
      setStatus('submitted')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      id="lead-capture"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black to-neutral-950 py-24 flex items-center"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="text-sm font-semibold tracking-widest text-neutral-500 uppercase">
            Get Access
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Every missed call is a
            <br />
            decision you&apos;ve already made.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed">
            Leave your details. We&apos;ll reach out within 24 hours to discuss your property, your PMS, and what the recovery looks like for your group specifically.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          {/* Honeypot field — hidden from real users, bots tend to fill every input */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
          />

          <input
            type="text"
            name="name"
            placeholder="Full name"
            required
            disabled={submitted}
            className={inputClasses}
          />
          <input
            type="email"
            name="email"
            placeholder="Work email"
            required
            disabled={submitted}
            className={inputClasses}
          />
          <input
            type="text"
            name="company"
            placeholder="Hotel group / chain name"
            required
            disabled={submitted}
            className={inputClasses}
          />

          <button
            type="submit"
            disabled={status === 'submitting' || submitted}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:from-white/30 hover:to-white/10 hover:shadow-[0_4px_30px_rgba(255,255,255,0.15)] disabled:cursor-default disabled:hover:border-white/10 disabled:hover:from-white/20 disabled:hover:to-white/5 disabled:hover:shadow-[0_2px_20px_rgba(0,0,0,0.5)] sm:text-base"
          >
            {status === 'submitting' && 'Sending…'}
            {status === 'idle' && 'Request Access'}
            {status === 'error' && 'Try again'}
            {submitted && "Submitted — we'll be in touch."}
            {(status === 'idle' || status === 'error') && <span aria-hidden="true">→</span>}
          </button>

          {status === 'error' && (
            <p className="text-center text-sm text-red-400">
              Something went wrong. Please try again in a moment.
            </p>
          )}

          <p className="text-center text-sm text-neutral-500">
            No sales pitch. No deck. A direct conversation about your numbers.
          </p>
        </form>
      </div>
    </div>
  )
}
