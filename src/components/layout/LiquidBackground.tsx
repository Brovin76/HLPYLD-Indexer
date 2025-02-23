'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LiquidBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#151b26] via-[#171d29] to-[#1a202d]" />
      
      <div className="absolute inset-0 bg-gradient-radial from-hl-green/5 via-transparent to-transparent" />

      <AnimatePresence>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.6, 0.8, 0.6],
              scale: [1, 1.1, 0.95, 1.05, 1],
              rotate: [0, 20, -20, 10, 0],
              x: [0, 100, -100, 50, 0],
              y: [0, -50, 50, -25, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.2,
            }}
            className="absolute"
            style={{
              width: `${180 + i * 40}px`,
              height: `${180 + i * 40}px`,
              left: `${10 + i * 18}%`,
              top: `${15 + i * 12}%`,
              background: `linear-gradient(135deg, 
                rgba(0, 255, 176, ${0.5 - i * 0.05}) 0%, 
                rgba(0, 255, 176, ${0.3 - i * 0.03}) 50%, 
                rgba(0, 255, 176, ${0.2 - i * 0.02}) 100%
              )`,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 176, 0.3)',
              boxShadow: `
                0 0 40px rgba(0, 255, 176, ${0.3 - i * 0.04}),
                inset 0 0 40px rgba(0, 255, 176, ${0.2 - i * 0.03})
              `,
              willChange: 'transform',
              borderRadius: '60% 40% 50% 50% / 50% 50% 50% 50%',
            }}
          />
        ))}

        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{ opacity: 0, y: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: -800,
              x: Math.sin(i) * 30
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-hl-green/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,255,176,0.1),transparent_70%)]" />
      <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-noise" />
    </div>
  )
} 