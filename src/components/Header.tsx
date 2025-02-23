'use client';

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'

const navigationItems = [
  { 
    name: 'Home', 
    href: '/',
    disabled: false
  },
  { 
    name: 'Tokenized Vaults', 
    href: '/tokenizedvaults',
    disabled: false
  },
  { 
    name: 'Factory', 
    href: '/factory',
    disabled: false
  }
] as const

export default function Header() {
  const pathname = usePathname()
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Pure glass effect without dark background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/[0.02] border-b border-white/10" />
      
      <nav className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo - Clean version without gradient */}
        <Link 
          href="/" 
          className="group flex items-center"
        >
          <span className="text-xl font-bold text-hl-green">
            HypurrYield
          </span>
        </Link>
        
        {/* Main Navigation */}
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
                className={`relative group ${item.disabled ? 'cursor-not-allowed' : ''}`}
              >
                <div className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2
                  ${isActive
                    ? 'bg-hl-green/10 text-hl-green hover:bg-hl-green/20 border border-hl-green/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }
                  ${item.disabled ? 'opacity-50' : ''}`}
                >
                  {item.name}
                </div>

                {/* Hover indicator */}
                {isHovered && !isActive && !item.disabled && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-px left-2 right-2 h-px bg-white/20"
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

        {/* Right side - only ConnectButton */}
        <div className="flex items-center">
          <ConnectButton />
        </div>
      </nav>
    </header>
  )
} 