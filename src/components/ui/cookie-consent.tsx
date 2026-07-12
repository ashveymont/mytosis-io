'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const GA_MEASUREMENT_ID = 'G-H3QP4TP611'
const CONSENT_KEY = 'mytosis-cookie-consent'

export function CookieConsent() {
  const [consent, setConsent] = useState<'pending' | 'granted' | 'denied'>('pending')
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored)
    } else {
      setShowBanner(true)
    }
  }, [])

  function choose(choice: 'granted' | 'denied') {
    localStorage.setItem(CONSENT_KEY, choice)
    setConsent(choice)
    setShowBanner(false)
  }

  return (
    <>
      {consent === 'granted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
          >
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-5 sm:p-6 shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-neutral-300 leading-relaxed">
                We use cookies for basic analytics to understand how visitors
                use this site. See our{' '}
                <Link href="/privacy" className="text-white underline underline-offset-2">
                  Privacy Policy
                </Link>{' '}
                for details.
              </p>
              <div className="flex gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => choose('denied')}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Decline
                </button>
                <button
                  type="button"
                  onClick={() => choose('granted')}
                  className="rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 px-4 py-2 text-sm font-semibold text-white transition-all hover:from-white/30 hover:to-white/10"
                >
                  Accept
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
