'use client'

import { motion } from 'framer-motion'

interface DashboardCardProps {
  title: string
  value: string
  change: React.ReactNode
  isPositive: boolean
}

export default function DashboardCard({ title, value, change, isPositive }: DashboardCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-xl 
                border border-hl-green/10
                bg-gradient-to-br from-[#1A1D24]/90 via-[#1F2229]/90 to-[#1A1D24]/90
                backdrop-blur-xl
                group hover:border-hl-green/20
                hover:shadow-[0_8px_32px_rgba(0,255,176,0.1)]
                transition-all duration-500
                p-6"
    >
      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-sm text-[#848e9c] font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-white mb-2 
                     group-hover:text-hl-green transition-colors">{value}</p>
        <div className="text-sm font-medium">
          {typeof change === 'string' ? (
            <span className={`${
              isPositive ? 'text-hl-green' : 'text-red-400'
            }`}>
              {change}
            </span>
          ) : change}
        </div>
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-radial from-hl-green/5 via-transparent to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <motion.div 
          className="absolute h-full w-[20%] bg-gradient-to-r 
                     from-transparent via-hl-green/30 to-transparent"
          animate={{
            x: ['0%', '500%', '0%']
          }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      </div>
    </motion.div>
  )
} 