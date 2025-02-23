'use client'

import { useEffect, useState } from 'react'
import { ConnectKitButton } from 'connectkit'

export function ConnectButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <span
                  className="px-4 py-2 bg-hl-green/10 text-hl-green rounded-xl 
                           text-sm font-medium border border-hl-green/20"
                >
                  {ensName || truncatedAddress}
                </span>
                <button
                  className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg 
                           hover:bg-red-500/20 transition-all duration-300 
                           text-xs font-medium border border-red-500/20 
                           hover:border-red-500/30"
                  onClick={show}
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                className="px-6 py-2 bg-hl-green/20 text-hl-green rounded-xl 
                         hover:bg-hl-green/30 transition-all duration-300 
                         text-sm font-medium border border-hl-green/20 
                         hover:border-hl-green/30"
                onClick={show}
              >
                Connect Wallet
              </button>
            )}
          </div>
        )
      }}
    </ConnectKitButton.Custom>
  )
} 