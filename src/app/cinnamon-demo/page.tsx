import type { Metadata } from 'next'
import { AmaraWidget } from '@/components/demo/AmaraWidget'
import { TalkToAmaraCTA } from '@/components/demo/TalkToAmaraCTA'
import { Spotlight } from '@/components/ui/spotlight'
import { FloatingCTA } from '@/components/ui/floating-cta'

export const metadata: Metadata = {
  title: 'Amara — Cinnamon Hotels AI Voice Demo | Mytosis',
  description:
    'Live demo of Amara, the AI voice agent built for Cinnamon Hotels & Resorts by Mytosis. She answers calls, checks availability, and books direct — 24/7.',
  robots: 'noindex, nofollow',
}

export default function CinnamonDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Top bar */}
      <div className="border-b border-white/10 px-8 flex items-center justify-between shrink-0 bg-black relative z-20" style={{ height: 56 }}>
        <span className="font-semibold text-base text-white">Mytosis.</span>
        <span className="text-xs text-neutral-500 tracking-wide">Powered by Blackcrest Scaling</span>
      </div>

      {/* Hero block */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black to-neutral-950" style={{ padding: '96px 48px' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase mb-4">
            Live Demo &nbsp;·&nbsp; Cinnamon Hotels &amp; Resorts
          </p>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Meet Amara.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-400 italic max-w-lg mx-auto">
            Cinnamon&apos;s AI voice agent. She answers every call, checks live availability, and
            books direct — 24 hours a day.
          </p>
          <p className="text-neutral-600 text-xs mt-6">
            This is a live demo. Amara is connected to a test environment — not the live Cinnamon
            reservation system.
          </p>
          <div className="mt-10 flex justify-center">
            <TalkToAmaraCTA />
          </div>
        </div>
      </div>

      {/* Widget area */}
      <div id="amara-widget" className="bg-neutral-950 flex flex-col items-center relative" style={{ padding: '80px 48px' }}>
        <AmaraWidget />
      </div>

      {/* Context block */}
      <div className="bg-neutral-950 border-t border-white/10 max-w-3xl mx-auto w-full" style={{ padding: '64px 48px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10 gap-y-10">
          <div className="text-center px-8 pt-10 sm:pt-0">
            <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">
              What Amara Can Do
            </p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400 leading-relaxed">
              <p>Check room availability by date</p>
              <p>Quote live rates</p>
              <p>Make a reservation</p>
              <p>Answer property questions</p>
              <p>Transfer to a human agent</p>
            </div>
          </div>

          <div className="text-center px-8 pt-10 sm:pt-0">
            <p className="text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">Languages</p>
            <div className="flex flex-col gap-2 text-sm text-neutral-400 leading-relaxed">
              <p>English</p>
              <p>Sinhala (coming soon)</p>
              <p>Arabic (coming soon)</p>
              <p>Mandarin (coming soon)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-black to-neutral-950 border-t border-white/10 text-center" style={{ padding: 64 }}>
        <p className="text-sm text-neutral-400 max-w-md mx-auto">
          Want Amara answering calls at your property? We&apos;re onboarding hotel groups across
          Sri Lanka and the GCC now.
        </p>
        <div className="mt-8 flex justify-center">
          <FloatingCTA label="Get Early Access" href="https://mytosis.io/#contact" />
        </div>
      </div>
    </div>
  )
}
