'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  count?: number
  card?: boolean
}

export function LoadingSkeleton({ count = 1, card = false }: LoadingSkeletonProps) {
  return (
    <div className="space-y-2">
      {[...Array(count)].map((_, i) => (
        card ? (
          <div 
            key={i} 
            className="relative border border-white/5 rounded-md p-3 bg-hl-dark-lighter overflow-hidden"
          >
            {/* Shimmer effect overlay */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent 
                         via-white/5 to-transparent"
              animate={{
                translateX: ["0%", "200%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Top colored bar */}
            <div className="h-0.5 w-full bg-hl-green/20 rounded-t absolute top-0 left-0" />

            {/* Content skeleton */}
            <div className="space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="h-2 bg-white/5 rounded w-12" />
                  <div className="h-3 bg-white/10 rounded w-16" />
                </div>
                <div className="h-4 bg-white/5 rounded-full w-16" />
              </div>

              {/* Liquidity section */}
              <div className="h-8 bg-white/5 rounded w-full" />

              {/* APR sections */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="space-y-1 bg-white/5 p-1.5 rounded">
                  <div className="h-2 bg-white/10 rounded w-12" />
                  <div className="h-3 bg-white/10 rounded w-10" />
                </div>
                <div className="space-y-1 bg-white/5 p-1.5 rounded">
                  <div className="h-2 bg-white/10 rounded w-12" />
                  <div className="h-3 bg-white/10 rounded w-10" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div 
            key={i} 
            className="relative rounded bg-hl-dark-lighter p-2 overflow-hidden"
          >
            {/* Shimmer effect overlay */}
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent 
                         via-white/5 to-transparent"
              animate={{
                translateX: ["0%", "200%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            <div className="space-y-1.5">
              <div className="h-3 bg-white/5 rounded w-1/3" />
              <div className="h-2 bg-white/10 rounded w-1/2" />
            </div>
          </div>
        )
      ))}
    </div>
  )
} 