'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'

const navigationItems = [
  { name: 'HypurrYield', href: '/vault' },
  { name: 'Markets', href: '/markets' }
  // Removed Trade and Manage since they don't exist yet
] as const

export function Navbar({ variant = 'app' }: { variant?: 'app' | 'marketing' }) {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <header 
      className={`
        ${variant === 'app' 
          ? 'fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5' 
          : 'absolute top-0 left-0 right-0 z-50'
        }
      `}
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Consistent across both variants */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative">
            <img src="/logo.svg" alt="HypurrYield Logo" className="h-8 w-8" />
            {variant === 'marketing' && (
              <div className="absolute inset-0 bg-white/20 blur-lg -z-10" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white">HypurrYield</span>
            {variant === 'marketing' && (
              <span className="text-xs text-gray-400">Optimized Yield Protocol</span>
            )}
          </div>
        </Link>

        {/* Navigation - Different based on variant */}
        {variant === 'app' ? (
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const isHovered = hoveredPath === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredPath(item.href)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative group"
                >
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                  </div>

                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1.5
                                  bg-gray-900 text-xs text-gray-300 rounded-lg whitespace-nowrap
                                  border border-white/5">
                      {item.description}
                    </div>
                  )}

                  {/* Active/Hover Indicator */}
                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute -bottom-px left-2 right-2 h-px
                        ${isActive ? 'bg-hl-green' : 'bg-white/20'}`}
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
            <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
          </div>
        )}

        {/* Right side - Different CTAs based on variant */}
        <div className="flex items-center gap-4">
          {variant === 'app' ? (
            <>
              <button className="px-3 py-1.5 text-sm text-gray-400 hover:text-white 
                             hover:bg-white/5 rounded-lg transition-colors">
                Docs
              </button>
              <ConnectButton />
            </>
          ) : (
            <Link 
              href="/app" 
              className="px-6 py-2.5 rounded-lg font-medium text-black
                       bg-gradient-to-r from-hl-green to-emerald-400
                       hover:from-hl-green hover:to-emerald-300
                       transition-all duration-300 shadow-lg shadow-hl-green/20"
            >
              Launch App
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
} 