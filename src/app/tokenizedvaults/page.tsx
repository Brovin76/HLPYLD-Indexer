'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
// import { getTimeLeft, formatLiquidity } from '@/utils/dateUtils'
// import { ClockIcon, CurrencyDollarIcon, LockClosedIcon, ChartBarIcon } from '@/components/icons'
// import dynamic from 'next/dynamic'
// import { Suspense } from 'react'
// import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
// import { ErrorBoundary } from '@/components/ErrorBoundary'
import Particles from '@/components/ui/Particles'
import { TokenizedVaultCard } from '@/components/TokenizedVaultCard'
import { formatAddress } from '@/lib/utils'

// Vault types
type VaultStatus = 'active' | 'paused' | 'deprecated' | 'test'
// type VaultType = 'stETH' | 'rETH' | 'cbETH'

// interface Vault {
//   id: string
//   name: string
//   type: VaultType
//   status: VaultStatus
//   tvl: number
//   apy: number
//   depositToken: string
//   shareToken: string
// }

// const filterTabs = [
//   { id: 'all', label: 'All Vaults', icon: '💎' },
//   { id: 'active', label: 'Active Vaults', icon: '⚡' },
//   { id: 'paused', label: 'Paused', icon: '⏸️' },
// ]

// Compact version of the vault card with deposit functionality
// function CompactVaultCard({ vault }: { vault: any }) {
//   const [depositAmount, setDepositAmount] = useState<string>('')
//   const [isDeposit, setIsDeposit] = useState(true)
//   const [isApproved, setIsApproved] = useState(false)
//   const maxAmount = 1000000

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^\d.]/g, '')
//     const parts = value.split('.')
//     if (parts.length > 2) return
//     if (parts[1]?.length > 6) return
//     setDepositAmount(value)
//   }

//   return (
//     <div className="bg-[#131722] rounded-lg border border-white/10 p-4">
//       {/* Header */}
//       <div className="flex justify-between items-start mb-3">
//         <div>
//           <h3 className="text-base font-medium text-white">{vault.name}</h3>
//           <div className="text-sm text-gray-400 mt-1">{formatAddress(vault.leader)}</div>
//         </div>
//         <div className="text-right">
//           <span className="text-xs text-gray-400">Liquidity</span>
//           <p className="text-lg font-bold text-hl-green">${vault.tvl.toLocaleString()}</p>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-3 mb-3">
//         <div className="bg-black/20 rounded-lg p-2">
//           <span className="text-xs text-gray-400">APR</span>
//           <p className="text-lg font-bold text-green-400">+{vault.apr}%</p>
//         </div>
//         <div className="bg-black/20 rounded-lg p-2">
//           <span className="text-xs text-gray-400">Monthly</span>
//           <p className="text-lg font-bold text-green-400">+{vault.monthlyReturn}%</p>
//         </div>
//       </div>

//       {/* Toggle */}
//       <div className="flex gap-2 mb-3">
//         <button
//           onClick={() => setIsDeposit(true)}
//           className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200
//             ${isDeposit 
//               ? 'bg-hl-green/25 text-hl-green font-semibold border-2 border-hl-green/40 shadow-sm shadow-hl-green/20' 
//               : 'bg-hl-green/10 text-gray-400 hover:text-hl-green hover:bg-hl-green/20 border border-hl-green/20 hover:border-hl-green/30'}`}
//         >
//           Deposit
//         </button>
//         <button
//           onClick={() => setIsDeposit(false)}
//           className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200
//             ${!isDeposit 
//               ? 'bg-hl-green/25 text-hl-green font-semibold border-2 border-hl-green/40 shadow-sm shadow-hl-green/20' 
//               : 'bg-hl-green/10 text-gray-400 hover:text-hl-green hover:bg-hl-green/20 border border-hl-green/20 hover:border-hl-green/30'}`}
//         >
//           Withdraw
//         </button>
//       </div>

//       {/* Input */}
//       <div className="relative mb-3">
//         <input
//           type="text"
//           value={depositAmount}
//           onChange={handleAmountChange}
//           placeholder="0.00"
//           className="w-full bg-black/20 text-white px-4 py-2 rounded-lg 
//                    border border-white/10 focus:border-hl-green/50 focus:ring-1 
//                    focus:ring-hl-green/50 transition-all outline-none"
//         />
//         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
//           <span className="text-sm text-gray-400">USDC</span>
//           <button 
//             onClick={() => setDepositAmount(maxAmount.toString())}
//             className="text-xs text-hl-green hover:text-hl-green/80"
//           >
//             MAX
//           </button>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex gap-2">
//         {!isApproved ? (
//           <button
//             className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200
//               ${parseFloat(depositAmount) > 0
//                 ? 'bg-hl-green/20 text-hl-green hover:bg-hl-green/30 border border-hl-green/30' 
//                 : 'bg-hl-green/10 text-gray-400 border border-white/10'}`}
//             disabled={!parseFloat(depositAmount)}
//             onClick={() => setIsApproved(true)}
//           >
//             Approve USDC
//           </button>
//         ) : (
//           <button
//             className={`w-full px-4 py-3 rounded-lg font-medium transition-all duration-200
//               ${parseFloat(depositAmount) > 0
//                 ? 'bg-hl-green/20 text-hl-green hover:bg-hl-green/30 border border-hl-green/30' 
//                 : 'bg-hl-green/10 text-gray-400 border border-white/10'}`}
//             disabled={!parseFloat(depositAmount)}
//           >
//             {isDeposit ? 'Confirm Deposit' : 'Confirm Withdraw'}
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// Generate more test vaults
const vaults = [
  {
    name: "Hyperliquidity Provider (HLP)",
    description: "This community-owned vault provides liquidity to Hyperliquid through multiple market making strategies, performs liquidations, and accrues platform fees.",
    tvl: 542975553,
    apr: 42.5,
    address: "0xdfc24b077bc1425ad1dea75bcb6f8158e10df303",
    leader: "0xdfc24b077bc1425ad1dea75bcb6f8158e10df303",
    monthlyReturn: 12.3,
    status: 'active' as VaultStatus
  },
  // {
  //   name: "HypurrYield V1",
  //   description: "Protocol-owned liquidity vault that accrues all fees from Hypurryield platform.",
  //   tvl: 42069420,
  //   apr: 32.5,
  //   address: "0x69420treasury1337deadbeef42069",
  //   leader: "0xTREASURY",
  //   monthlyReturn: 8.7,
  //   status: 'active' as VaultStatus
  // },
  // {
  //   name: "Delta Neutral Vault",
  //   description: "Market neutral strategies focusing on perpetual funding rates.",
  //   tvl: 890000,
  //   apr: 28.4,
  //   address: "0xdelta456neutral789",
  //   leader: "0xDELTA",
  //   monthlyReturn: 7.2,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Basis Trading Vault",
  //   description: "Arbitrage opportunities between spot and perpetual markets.",
  //   tvl: 1567000,
  //   apr: 35.2,
  //   address: "0xbasis123trading456",
  //   leader: "0xBASIS",
  //   monthlyReturn: 9.1,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Momentum Strategy Vault",
  //   description: "Trend-following strategies across major crypto pairs.",
  //   tvl: 2345000,
  //   apr: 45.8,
  //   address: "0xmomentum789strategy123",
  //   leader: "0xMOMENTUM",
  //   monthlyReturn: 11.5,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Volatility Harvester",
  //   description: "Options and volatility-based yield generation strategies.",
  //   tvl: 1890000,
  //   apr: 38.6,
  //   address: "0xvol456harvester789",
  //   leader: "0xVOL",
  //   monthlyReturn: 9.8,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Liquidity Sniper",
  //   description: "Quick response to market inefficiencies and liquidation events.",
  //   tvl: 980000,
  //   apr: 52.3,
  //   address: "0xsniper123liquidity456",
  //   leader: "0xSNIPER",
  //   monthlyReturn: 13.2,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Arbitrage Hunter",
  //   description: "Cross-exchange arbitrage opportunities in Hyperliquid markets.",
  //   tvl: 1234000,
  //   apr: 33.7,
  //   address: "0xarb789hunter123",
  //   leader: "0xARB",
  //   monthlyReturn: 8.5,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "Smart Beta Vault",
  //   description: "Risk-adjusted market exposure with enhanced returns.",
  //   tvl: 1678000,
  //   apr: 29.9,
  //   address: "0xbeta456smart789",
  //   leader: "0xBETA",
  //   monthlyReturn: 7.6,
  //   status: 'test' as VaultStatus
  // },
  // {
  //   name: "High Frequency Vault",
  //   description: "Rapid execution strategies across multiple markets.",
  //   tvl: 2100000,
  //   apr: 41.2,
  //   address: "0xhft123vault456",
  //   leader: "0xHFT",
  //   monthlyReturn: 10.4,
  //   status: 'test' as VaultStatus
  // }
]

// Add this to suppress the favicon warnings
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = 'data:;base64,iVBORw0KGgo='; // Blank favicon
  document.head.appendChild(link);
}

// For the "No positions found" warning, we can add a check:
// const handlePositions = (positions: any) => {
//   if (positions && positions.length > 0) {
//     console.log('Positions:', positions);
//   }
//   // Remove the console.log for no positions, or make it debug only
//   // console.log('No positions found');
// };

export default function TokenizedVaultsPage() {
  const [selectedVault, setSelectedVault] = useState<typeof vaults[0] | null>(null)
  const [selectedAction, setSelectedAction] = useState<'deposit' | 'withdraw' | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'standard'>('table')
  const [statusFilter, setStatusFilter] = useState<VaultStatus | null>(null)
  const [sortBy, setSortBy] = useState<'liquidity' | 'apr' | null>(null)

  // Filter and sort the vaults
  const filteredAndSortedVaults = vaults
    .filter(vault => !statusFilter || vault.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'liquidity') {
        return b.tvl - a.tvl;
      }
      if (sortBy === 'apr') {
        return b.apr - a.apr;
      }
      return 0;
    });

  const handleVaultAction = (vault: typeof vaults[0], action: 'deposit' | 'withdraw', e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click when clicking buttons
    setSelectedVault(vault)
    setSelectedAction(action)
  }

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-hl-background">
        <div className="absolute h-full w-full bg-[radial-gradient(#222,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3CCF91,transparent_100%)] opacity-20" />
      </div>
      <Particles className="absolute inset-0 -z-10" quantity={100} />

      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Title section */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white mb-2">Tokenized Vaults</h1>
            <p className="text-gray-400">Deposit into tokenized vaults to earn yield on your assets</p>
          </div>

          {/* Filters and View Toggle section */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-6">
            {/* View Toggle - Left */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => setViewMode('table')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${viewMode === 'table'
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20 shadow-lg shadow-hl-green/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                <span className="font-medium">Table View</span>
              </motion.button>
              <motion.button
                onClick={() => setViewMode('standard')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${viewMode === 'standard'
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20 shadow-lg shadow-hl-green/5'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                <span className="font-medium">Standard View</span>
              </motion.button>
            </div>

            {/* Filters - Center but shifted left */}
            <div className="flex items-center gap-2 -ml-20">
              <motion.button
                onClick={() => setStatusFilter(null)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${!statusFilter
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                All
              </motion.button>

              <motion.button
                onClick={() => setStatusFilter('active')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${statusFilter === 'active'
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                Active
              </motion.button>

              <motion.button
                onClick={() => setStatusFilter('test')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${statusFilter === 'test'
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                Test
              </motion.button>

              <motion.button
                onClick={() => setSortBy('liquidity')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${sortBy === 'liquidity'
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                By Liquidity
              </motion.button>

              <motion.button
                onClick={() => setSortBy('apr')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition-all duration-200
                  ${sortBy === 'apr'
                    ? 'bg-hl-green/10 text-hl-green border border-hl-green/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
              >
                By APR
              </motion.button>
            </div>

            {/* Empty space - Right */}
            <div></div>
          </div>

          {/* Use filteredAndSortedVaults instead of vaults */}
          {viewMode === 'table' ? (
            // Table View Content
            <div className="flex gap-6">
              <div className="bg-[#131722]/50 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden max-w-[1000px]">
                <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-[#131722] z-10">
                      <tr className="bg-black/20">
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Vault</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">Liquidity</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">APR</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">Monthly</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">Position</th>
                        <th className="text-right px-4 py-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredAndSortedVaults.map((vault) => (
                        <tr 
                          key={vault.address} 
                          className="hover:bg-white/5 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedVault(vault)
                            setSelectedAction('deposit')
                          }}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-hl-green/20 to-hl-green/5 
                                           flex items-center justify-center border border-hl-green/20 group-hover:border-hl-green/30 transition-colors">
                                <span className="text-hl-green text-base font-medium">H</span>
                              </div>
                              <div>
                                <div className="text-white font-medium flex items-center gap-2">
                                  {vault.name}
                                  <span className={`text-xs px-1.5 py-0.5 rounded-full border
                                    ${vault.status === 'test' 
                                      ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                      : 'bg-hl-green/10 text-hl-green border-hl-green/20'
                                    }`}>
                                    {vault.status === 'test' ? 'Test' : 'Active'}
                                  </span>
                                </div>
                                <div className="text-sm text-gray-400 mt-0.5 flex items-center gap-2">
                                  {formatAddress(vault.leader)} 
                                  <a 
                                    href={`https://app.hyperliquid.xyz/vaults/${vault.address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-hl-green hover:text-hl-green/80"
                                  >
                                    ↗
                                  </a>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-right">
                              <div className="text-white font-medium">${vault.tvl.toLocaleString()}</div>
                              <div className="text-xs text-gray-400 mt-0.5">
                                {((vault.tvl / 43300000) * 100).toFixed(1)}% of Liquidity
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-right">
                              <div className="text-hl-green font-medium flex items-center justify-end gap-1">
                                <span className="text-xs">▲</span>
                                {vault.apr}%
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">Annual</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-right">
                              <div className="text-hl-green font-medium flex items-center justify-end gap-1">
                                <span className="text-xs">▲</span>
                                {vault.monthlyReturn}%
                              </div>
                              <div className="text-xs text-gray-400 mt-0.5">30D</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-right">
                              <div className="text-white font-medium">0.00</div>
                              <div className="text-xs text-gray-400 mt-0.5">USDC</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex justify-end gap-1.5">
                              <button 
                                className="px-3 py-1.5 bg-hl-green/20 text-hl-green rounded-lg 
                                         hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                         border border-hl-green/20 hover:border-hl-green/30"
                                onClick={(e) => handleVaultAction(vault, 'deposit', e)}
                              >
                                Deposit
                              </button>
                              <button 
                                className="px-3 py-1.5 bg-hl-green/20 text-hl-green rounded-lg 
                                         hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                         border border-hl-green/20 hover:border-hl-green/30"
                                onClick={(e) => handleVaultAction(vault, 'withdraw', e)}
                              >
                                Withdraw
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Slide-out Vault Details */}
              <div className={`w-[400px] transition-all duration-300 ease-in-out ${
                selectedVault ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                {selectedVault && (
                  <div className="sticky top-8">
                    {/* Clean header with colored icons */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center border
                          ${selectedAction === 'withdraw' 
                            ? 'bg-red-500/10 border-red-500/20 text-red-500'
                            : 'bg-gradient-to-br from-hl-green/20 to-hl-green/5 border-hl-green/20 text-hl-green'
                          }`}
                        >
                          {selectedAction === 'withdraw' ? '↑' : '↓'}
                        </div>
                        <div className="text-white font-medium">
                          {selectedAction === 'withdraw' ? 'Withdraw from Vault' : 'Deposit to Vault'}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setSelectedVault(null)
                          setSelectedAction(null)
                        }}
                        className="h-7 w-7 rounded-lg bg-white/5 border border-white/10 
                                   flex items-center justify-center text-gray-400 
                                   hover:text-white hover:bg-white/10 transition-all"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Added hover effects wrapper */}
                    <div className="relative group isolate">
                      {/* Gradient hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-hl-green/40 via-hl-green/30 to-hl-green/40 
                                     rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                     blur-[1px] pointer-events-none" />

                      {/* Card with hover animation */}
                      <div className="relative transform transition-all duration-300 ease-out
                                     hover:-translate-y-2 hover:scale-[1.02]
                                     hover:shadow-2xl hover:shadow-hl-green/20">
                        <TokenizedVaultCard
                          {...selectedVault}
                          initialAction={selectedAction}
                          onDeploy={() => {
                            console.log("Open deposit modal for", selectedVault.address)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Standard View Content
            <div className="flex flex-wrap gap-6">
              {filteredAndSortedVaults.map((vault) => (
                <div key={vault.address} className="w-[400px]">
                  <div className="relative group isolate">
                    {/* Gradient hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-hl-green/40 via-hl-green/30 to-hl-green/40 
                                   rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                   blur-[1px] pointer-events-none" />

                    {/* Card with hover animation */}
                    <div className="relative transform transition-all duration-300 ease-out
                                   hover:-translate-y-2 hover:scale-[1.02]
                                   hover:shadow-2xl hover:shadow-hl-green/20">
                      <TokenizedVaultCard 
                        {...vault}
                        onDeploy={() => {}}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
} 