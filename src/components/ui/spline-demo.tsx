'use client'

import { SplineScene } from "@/components/ui/splite"
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { FloatingCTA } from "@/components/ui/floating-cta"
import { motion } from 'framer-motion'
 
export function SplineSceneBasic() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-black to-neutral-950">
      <Card className="relative w-full min-h-screen md:absolute md:inset-0 border-0 rounded-none overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col md:flex-row h-full w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left content */}
        <motion.div
          className="flex-1 p-8 relative z-10 flex flex-col justify-center items-center text-center md:items-start md:text-left h-full"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 leading-tight tracking-tight">
            Mytosis AI
          </h1>
          <motion.div 
            className="mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-xl md:text-2xl text-neutral-400 italic mb-1">
              Hotel AI Infrastructure by Blackcrest Scaling
            </div>
            <div className="mt-8">
              <FloatingCTA />
            </div>
          </motion.div>
        </motion.div>

        {/* Right content */}
        <motion.div
          className="flex-1 relative h-full min-h-[50vh] md:min-h-0 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="absolute inset-0 w-full h-full scale-[1.15] md:scale-[1] md:relative md:inset-auto"
          />
        </motion.div>
      </div>
      
      {/* Subtle gradient at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </Card>
  </div>  
  )
}
