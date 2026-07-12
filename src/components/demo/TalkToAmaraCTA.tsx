'use client'

import { FloatingCTA } from '@/components/ui/floating-cta'

export function TalkToAmaraCTA() {
  return (
    <FloatingCTA
      label="Talk to Amara"
      onClick={() => document.getElementById('amara-widget')?.scrollIntoView({ behavior: 'smooth' })}
    />
  )
}
