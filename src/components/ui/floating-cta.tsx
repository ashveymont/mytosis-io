'use client'

import { motion } from 'framer-motion'

type FloatingCTAProps = {
  label?: string
  href?: string
  onClick?: () => void
}

export function FloatingCTA({ label = 'Request Early Access', href, onClick }: FloatingCTAProps) {
  function handleClick() {
    if (onClick) {
      onClick()
      return
    }
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' })
  }

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    className:
      'inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-br from-white/20 to-white/5 px-6 py-3 text-sm font-semibold text-white shadow-[0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:from-white/30 hover:to-white/10 hover:shadow-[0_4px_30px_rgba(255,255,255,0.15)] sm:text-base',
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {label}
        <span aria-hidden="true">→</span>
      </motion.a>
    )
  }

  return (
    <motion.button type="button" onClick={handleClick} {...motionProps}>
      {label}
      <span aria-hidden="true">→</span>
    </motion.button>
  )
}
