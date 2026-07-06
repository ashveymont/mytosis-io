'use client'

import { motion } from 'framer-motion'

export function FloatingCTA() {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:from-white/30 hover:to-white/10 sm:text-base"
    >
      Request Early Access
      <span aria-hidden="true">→</span>
    </motion.button>
  )
}
