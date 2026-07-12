import type { Metadata } from 'next'
import { AmaraWidget } from '@/components/demo/AmaraWidget'

export const metadata: Metadata = {
  title: 'Amara — Cinnamon Hotels AI Voice Demo | Mytosis',
  description:
    'Live demo of Amara, the AI voice agent built for Cinnamon Hotels & Resorts by Mytosis. She answers calls, checks availability, and books direct — 24/7.',
  robots: 'noindex, nofollow',
}

export default function CinnamonDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-[Inter,sans-serif]">
      {/* Top bar */}
      <div
        className="border-b border-[#E5E5E5] px-8 flex items-center justify-between shrink-0"
        style={{ height: 56 }}
      >
        <span className="font-semibold text-base text-[#0C0D0E]">Mytosis.</span>
        <span className="text-xs text-[#999999] tracking-wide">Powered by Blackcrest Scaling</span>
      </div>

      {/* Hero block */}
      <div className="bg-[#0C0D0E] text-center" style={{ padding: '80px 48px' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
            Live Demo &nbsp;·&nbsp; Cinnamon Hotels &amp; Resorts
          </p>
          <h1
            className="text-white font-bold"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.03em' }}
          >
            Meet Amara.
          </h1>
          <p className="text-white/60 mt-3 text-lg font-light max-w-lg mx-auto">
            Cinnamon&apos;s AI voice agent. She answers every call, checks live availability, and
            books direct — 24 hours a day.
          </p>
          <p className="text-white/30 text-xs mt-6">
            This is a live demo. Amara is connected to a test environment — not the live Cinnamon
            reservation system.
          </p>
        </div>
      </div>

      {/* Widget area */}
      <div className="bg-white flex flex-col items-center" style={{ padding: '80px 48px' }}>
        <AmaraWidget />
      </div>

      {/* Context block */}
      <div
        className="bg-white border-t border-[#E5E5E5] max-w-3xl mx-auto w-full"
        style={{ padding: '64px 48px' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E5E5] gap-y-10">
          <div className="text-center px-8 pt-10 sm:pt-0">
            <p className="text-xs tracking-[0.15em] uppercase text-[#999999] mb-4">
              What Amara Can Do
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#555555] leading-relaxed">
              <p>Check room availability by date</p>
              <p>Quote live rates</p>
              <p>Make a reservation</p>
              <p>Answer property questions</p>
              <p>Transfer to a human agent</p>
            </div>
          </div>

          <div className="text-center px-8 pt-10 sm:pt-0">
            <p className="text-xs tracking-[0.15em] uppercase text-[#999999] mb-4">Languages</p>
            <div className="flex flex-col gap-2 text-sm text-[#555555] leading-relaxed">
              <p>English</p>
              <p>Sinhala (coming soon)</p>
              <p>Arabic (coming soon)</p>
              <p>Mandarin (coming soon)</p>
            </div>
          </div>

          <div className="text-center px-8 pt-10 sm:pt-0">
            <p className="text-xs tracking-[0.15em] uppercase text-[#999999] mb-4">Powered By</p>
            <div className="flex flex-col gap-2 text-sm text-[#555555] leading-relaxed">
              <p>Vapi voice infrastructure</p>
              <p>ElevenLabs voice cloning</p>
              <p>Mytosis hotel AI layer</p>
              <p>Mews PMS (production)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        className="bg-[#F7F7F7] border-t border-[#E5E5E5] text-center"
        style={{ padding: 48 }}
      >
        <p className="text-sm text-[#555555] max-w-md mx-auto">
          Want Amara answering calls at your property? We&apos;re onboarding hotel groups across
          Sri Lanka and the GCC now.
        </p>
        <a
          href="https://mytosis.io/#contact"
          className="inline-block mt-6 border border-[#0C0D0E] text-[#0C0D0E] px-6 py-3 text-sm font-medium hover:bg-[#0C0D0E] hover:text-white transition-all"
        >
          Get Early Access →
        </a>
      </div>
    </div>
  )
}
