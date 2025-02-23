'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { useAccount } from 'wagmi'
import Particles from '@/components/ui/Particles'
// import debounce from 'lodash/debounce'
import { 
  DEPLOYMENT_FEE,
  MIN_DEPOSIT_THRESHOLD,
  PLATFORM_FEE,
} from '@/config/constants'
import { ChevronDown } from 'lucide-react'

// Types
// interface Position {
//   coin: string;
//   size: string | number;
//   notional: string | number;
//   leverage: string | number;
//   pnl: string | number;
//   pnlPercent: string | number;
//   margin: string | number;
//   fundingRate: string | number;
//   liquidationPrice: string | number;
// }

interface VaultDetails {
  name: string;
  vaultAddress: string;
  leader: string;
  description: string;
  portfolio: [string, {
    accountValueHistory: [number, string][];
    pnlHistory: [number, string][];
    vlm: string;
  }][];
  apr: number;
  followers: {
    user: string;
    vaultEquity: string;
    pnl: string;
    allTimePnl: string;
    daysFollowing: number;
  }[];
  maxDistributable: number;
  maxWithdrawable: number;
  isClosed: boolean;
  positions: {
    coin: string;
    size: string;
    notional: string;
    leverage: string;
    pnl: string;
    pnlPercent: string;
  }[];
}

interface VaultInfo {
  name: string;
  tvl: number;
  performance: {
    monthlyReturn: number;
    apr: number;
  };
  positions: {
    count: number;
    totalNotional: number;
    maxLeverage: number;
    totalPnl: number;
    activePositions: {
      coin: string;
      size: number;
      notional: number;
      leverage: number;
      pnl: number;
    }[];
  };
  depositors: {
    count: number;
    totalDeposits: number;
    topDepositors: {
      address: string;
      amount: number;
      pnl: number;
    }[];
  };
  description: string;
  leader: string;
}

// Add this near the top of the file with other constants
const features = [
  {
    title: "Unlock Instant Liquidity",
    description: "Convert your vault into tradeable LP tokens"
  },
  {
    title: "Use as Collateral",
    description: "Borrow against your LP tokens for extra leverage"
  },
  {
    title: "Maximize Capital Efficiency",
    description: "Attract more depositors & inflows"
  },
  {
    title: "Expand DeFi Use Cases",
    description: "Enable trading, staking & composability"
  }
];

// Formatter functions
const formatUSD = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Add helper function for position calculations
// const calculatePositionMetrics = (positions: Position[]) => {
//   if (!positions?.length) {
//     console.log('No positions found');
//     return {
//       count: 0,
//       totalNotional: 0,
//       maxLeverage: 0,
//       totalPnl: 0,
//       activePositions: []
//     };
//   }

//   // Filter and parse active positions
//   const activePositions = positions
//     .map(pos => {
//       // Debug log each position parsing
//       console.log('Processing position:', pos);

//       const parsed = {
//         coin: pos.coin,
//         size: typeof pos.size === 'string' ? parseFloat(pos.size.replace(/[^0-9.-]/g, '')) : pos.size,
//         notional: typeof pos.notional === 'string' ? parseFloat(pos.notional.replace(/[^0-9.-]/g, '')) : pos.notional,
//         leverage: typeof pos.leverage === 'string' ? parseInt(pos.leverage.replace(/[^0-9]/g, '')) : pos.leverage,
//         pnl: typeof pos.pnl === 'string' ? parseFloat(pos.pnl.replace(/[^0-9.-]/g, '')) : pos.pnl,
//         pnlPercent: typeof pos.pnlPercent === 'string' ? parseFloat(pos.pnlPercent.replace(/[^0-9.-]/g, '')) : pos.pnlPercent
//       };

//       console.log('Parsed position:', parsed);
//       return parsed;
//     })
//     .filter(pos => {
//       const isActive = Math.abs(pos.size) > 0;
//       console.log(`Position ${pos.coin} active:`, isActive);
//       return isActive;
//     })
//     .sort((a, b) => Math.abs(b.notional) - Math.abs(a.notional));

//   console.log('Active positions:', activePositions);

//   return {
//     count: activePositions.length,
//     totalNotional: activePositions.reduce((sum, pos) => sum + Math.abs(pos.notional), 0),
//     maxLeverage: Math.max(...activePositions.map(pos => pos.leverage), 0),
//     totalPnl: activePositions.reduce((sum, pos) => sum + pos.pnl, 0),
//     activePositions
//   };
// };

// Add depositor metrics calculation
const calculateDepositorMetrics = (followers: VaultDetails['followers']) => {
  if (!followers?.length) return {
    count: followers.length,
    totalDeposits: 0,
    topDepositors: []
  };

  const topDepositors = followers
    .map(f => ({
      address: f.user,
      amount: parseFloat(f.vaultEquity),
      pnl: parseFloat(f.pnl)
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);

  return {
    count: followers.length,
    totalDeposits: followers.reduce((sum, f) => sum + parseFloat(f.vaultEquity), 0),
    topDepositors
  };
};

// Update the performance calculation to use API values
const calculatePerformanceMetrics = (portfolio: VaultDetails['portfolio'], vaultDetails: VaultDetails) => {
  try {
    // Get monthly data for return calculation
    const monthData = portfolio.find(([period]) => period === 'month')?.[1];
    if (!monthData?.accountValueHistory?.length) return { monthlyReturn: 0, apr: 0 };

    // Calculate monthly return
    const latest = parseFloat(monthData.accountValueHistory[0][1]) || 0;
    const oldest = parseFloat(monthData.accountValueHistory[monthData.accountValueHistory.length - 1][1]) || 0;
    const monthlyReturn = oldest !== 0 ? ((latest - oldest) / oldest) * 100 : 0;

    // Use APR directly from the API
    return { 
      monthlyReturn: Number(monthlyReturn.toFixed(2)),
      apr: vaultDetails.apr || 0 // Use API value directly
    };
  } catch (error) {
    console.error('Error calculating performance metrics:', error);
    return { monthlyReturn: 0, apr: 0 };
  }
};

export default function FactoryPage() {
  // const { address, isConnected } = useAccount()
  // const [mounted, setMounted] = useState(false)
  const [vaultAddress, setVaultAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isVaultManager, setIsVaultManager] = useState(false)
  const [vaultBalance, setVaultBalance] = useState(0)
  // const [isApproved, setIsApproved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [vaultInfo, setVaultInfo] = useState<VaultInfo>({
    name: '',
    tvl: 0,
    performance: {
      monthlyReturn: 0,
      apr: 0
    },
    positions: {
      count: 0,
      totalNotional: 0,
      maxLeverage: 0,
      totalPnl: 0,
      activePositions: []
    },
    depositors: {
      count: 0,
      totalDeposits: 0,
      topDepositors: []
    },
    description: '',
    leader: ''
  })

  // Add state for token configuration
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [isHypeApproved, setIsHypeApproved] = useState(false)
  // const [isDepositing, setIsDepositing] = useState(false)

  // Add more state for transaction steps
  const [isHypeApproveInProgress, setIsHypeApproveInProgress] = useState(false)
  const [isDepositApproveInProgress, setIsDepositApproveInProgress] = useState(false)
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false)

  // Add loading states for each step
  // const [isLoadingVaultDetails, setIsLoadingVaultDetails] = useState(false);
  // const [isLoadingPositions, setIsLoadingPositions] = useState(false);
  // const [isLoadingUserState, setIsLoadingUserState] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  // Helper functions for calculations
  // const calculateMonthlyReturn = (portfolio: VaultDetails['portfolio']): number => {
  //   try {
  //     const monthData = portfolio.find(([period]) => period === 'month')?.[1];
  //     if (!monthData?.accountValueHistory?.length) return 0;

  //     const latest = parseFloat(monthData.accountValueHistory[0][1]) || 0;
  //     const oldest = parseFloat(monthData.accountValueHistory[monthData.accountValueHistory.length - 1][1]) || 0;

  //     if (oldest === 0) return 0;
  //     return Number(((latest - oldest) / oldest * 100).toFixed(2));
  //   } catch (error) {
  //     console.error('Error calculating monthly return:', error);
  //     return 0;
  //   }
  // }

  // const calculatePositionsValue = (positions: Position[]): number => {
  //   try {
  //     return positions.reduce((sum: number, pos) => {
  //       const notional = parseFloat(pos.notional) || 0;
  //       return sum + notional;
  //     }, 0);
  //   } catch (error) {
  //     console.error('Error calculating positions value:', error);
  //     return 0;
  //   }
  // }

  // Validation function
  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  // Verify vault access and fetch data
  const verifyVaultAccess = async (address: string) => {
    setError(null);
    setIsLoading(true);

    if (!isValidAddress(address)) {
      setError('Invalid vault address format');
      setIsLoading(false);
      return;
    }

    try {
      // First get vault details
      const vaultDetailsResponse = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'vaultDetails',
          vaultAddress: address
        })
      });

      if (!vaultDetailsResponse.ok) {
        throw new Error(`API error: ${vaultDetailsResponse.statusText}`);
      }

      const vaultDetails: VaultDetails = await vaultDetailsResponse.json();
      console.log('Vault Details:', vaultDetails);

      // Get positions from metaAndAssetCtxs
      const assetCtxResponse = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'metaAndAssetCtxs'
        })
      });

      const [, assetCtxs] = await assetCtxResponse.json();
      console.log('Asset Contexts:', assetCtxs);

      // Get user positions
      const userStateResponse = await fetch('https://api.hyperliquid.xyz/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'clearinghouseState',
          user: address
        })
      });

      const userState = await userStateResponse.json();
      console.log('User State:', userState);

      // Parse positions from assetPositions
      const positions = userState.assetPositions?.map(ap => ({
        coin: ap.position.coin,
        size: ap.position.szi,
        notional: parseFloat(ap.position.positionValue),
        leverage: ap.position.leverage.value,
        pnl: parseFloat(ap.position.unrealizedPnl),
        pnlPercent: ap.position.returnOnEquity * 100,
        margin: ap.position.marginUsed
      })) || [];

      console.log('Parsed Positions:', positions);

      // Check if connected wallet is the vault leader
      const isLeader = vaultDetails.leader?.toLowerCase() === address.toLowerCase();
      setIsVaultManager(isLeader);

      // Safely calculate values with null checks
      // const positionsValue = vaultDetails.positions ? calculatePositionsValue(vaultDetails.positions) : 0;
      // const depositorsTotalValue = vaultDetails.followers ? 
      //   vaultDetails.followers.reduce((sum, f) => sum + (parseFloat(f.vaultEquity) || 0), 0) : 0;

      // Update vault info with proper calculations
      setVaultInfo({
        name: vaultDetails.name || 'Unknown Vault',
        tvl: vaultDetails.maxDistributable || 0,
        performance: calculatePerformanceMetrics(vaultDetails.portfolio || [], vaultDetails),
        positions: {
          count: positions.length,
          totalNotional: positions.reduce((sum: number, pos) => sum + Math.abs(pos.notional), 0),
          maxLeverage: Math.max(...positions.map(pos => pos.leverage), 0),
          totalPnl: positions.reduce((sum, pos) => sum + pos.pnl, 0),
          activePositions: positions.sort((a, b) => Math.abs(b.notional) - Math.abs(a.notional))
        },
        depositors: calculateDepositorMetrics(vaultDetails.followers || []),
        description: vaultDetails.description || 'No description available',
        leader: vaultDetails.leader || address
      });

      setVaultBalance(vaultDetails.maxWithdrawable || 0);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to verify vault access');
      setIsVaultManager(false);
      setVaultBalance(0);

      // Reset vault info on error
      setVaultInfo({
        name: '',
        tvl: 0,
        performance: {
          monthlyReturn: 0,
          apr: 0
        },
        positions: {
          count: 0,
          totalNotional: 0,
          maxLeverage: 0,
          totalPnl: 0,
          activePositions: []
        },
        depositors: {
          count: 0,
          totalDeposits: 0,
          topDepositors: []
        },
        description: '',
        leader: ''
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMax = () => {
    setAmount(vaultBalance.toString());
  }

  // Add more validation for token name and symbol
  // const validateTokenDetails = () => {
  //   if (!tokenName || tokenName.length < 3) {
  //     setError('Token name must be at least 3 characters');
  //     return false;
  //   }
  //   if (!tokenSymbol || tokenSymbol.length < 2) {
  //     setError('Token symbol must be at least 2 characters');
  //     return false;
  //   }
  //   return true;
  // };

  // Memoize expensive calculations
  // const memoizedPositionMetrics = useMemo(() => 
  //   calculatePositionMetrics(vaultInfo.positions.activePositions), 
  //   [vaultInfo.positions.activePositions]
  // );

  // Add debounce for address validation
  // const debouncedVerifyVaultAccess = useCallback(
  //   debounce((address: string) => verifyVaultAccess(address), 500),
  //   []
  // );

  return (
    <div className="relative z-20 max-w-6xl mx-auto px-4 py-6 space-y-4">
      <Particles 
        className="fixed inset-0 -z-10" 
        quantity={80}
        staticity={30}
        ease={30}
      />

      <div className="fixed inset-0 -z-20 h-full w-full bg-hl-background">
        <div className="absolute h-full w-full bg-[radial-gradient(#222,transparent_1px)] [background-size:12px_12px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>
      <div className="pointer-events-none fixed inset-0 -z-20 h-full w-full bg-hl-background [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,#000_90%)]" />
      <div className="fixed left-1/3 top-1/4 -z-20 h-[400px] w-[400px] rounded-full bg-hl-green/10 blur-[100px]" />
      <div className="fixed right-1/3 bottom-1/4 -z-20 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[100px]" />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white">Factory</h1>
          <p className="text-gray-400 mt-1">Tokenize your Hyperliquid Vault</p>

          {/* Value Propositions */}
          <motion.div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer group flex items-center justify-between"
          >
            <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-hl-green transition-colors">
              Why Tokenize Your Hyperliquid Vault?
            </h2>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-6 h-6 text-hl-green" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated content section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white/5 rounded-xl p-6 border border-white/10
                             hover:border-hl-green/50 hover:scale-[1.02] 
                             transition-all duration-500 overflow-hidden
                             hover:shadow-[0_0_30px_rgba(0,255,176,0.15)]"
                >
                  {/* Enhanced liquid shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    {/* Main blob */}
                    <div className="absolute w-[300px] h-[300px] -right-20 -bottom-20
                                  bg-gradient-radial from-hl-green/20 to-transparent
                                  animate-morph-blob blur-2xl" />

                    {/* Secondary blob */}
                    <div className="absolute w-[200px] h-[200px] -left-20 -top-20
                                  bg-gradient-radial from-hl-green/15 to-transparent
                                  animate-morph-blob blur-xl delay-300" />

                    {/* Liquid flow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-hl-green/[0.05] to-transparent
                                  animate-liquid-flow opacity-70" />

                    {/* Enhanced glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-hl-green/[0.08] to-transparent 
                                  opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-700" />
                  </div>

                  {/* Content with stronger hover effect */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2
                                 group-hover:text-hl-green group-hover:translate-x-1
                                 transition-all duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-white 
                                transition-colors duration-500">
                      {feature.description}
                    </p>
                  </div>

                  {/* Enhanced corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 
                                group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br 
                                  from-hl-green/20 via-hl-green/10 to-transparent rotate-45 
                                  transform origin-top-right scale-0 
                                  group-hover:scale-100 transition-transform duration-700" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Requirements Card */}
      <div className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-3 text-center hover:border-hl-green/20 transition-colors border border-white/5">
              <p className="text-xs text-gray-400">Deployment Fee</p>
              <p className="text-lg font-bold text-hl-green mt-1">{DEPLOYMENT_FEE} HYPE</p>
              <p className="text-xs text-gray-500">One-time fee</p>
            </div>

            <div className="bg-white/5 rounded-lg p-3 text-center hover:border-hl-green/20 transition-colors border border-white/5">
              <p className="text-xs text-gray-400">Minimum Deposit</p>
              <p className="text-lg font-bold text-hl-green mt-1">${MIN_DEPOSIT_THRESHOLD.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Required balance</p>
            </div>

            <div className="bg-white/5 rounded-lg p-3 text-center hover:border-hl-green/20 transition-colors border border-white/5">
              <p className="text-xs text-gray-400">Platform Fee</p>
              <p className="text-lg font-bold text-hl-green mt-1">{PLATFORM_FEE * 100}%</p>
              <p className="text-xs text-gray-500">Of total AUM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column - Vault Info */}
        <div className="space-y-4">
          {/* Vault Address Input */}
          <div className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
            <div className="p-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Vault Address
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={vaultAddress}
                    onChange={(e) => setVaultAddress(e.target.value)}
                    placeholder="0x..."
                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-2.5 py-1.5 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-hl-green/50 text-sm"
                  />
                  <button 
                    onClick={() => verifyVaultAccess(vaultAddress)}
                    className="px-3 py-1.5 bg-hl-green/20 hover:bg-hl-green/30 
                              text-hl-green text-sm font-medium rounded-lg 
                              border border-hl-green/20 hover:border-hl-green/30
                              transition-all duration-200 whitespace-nowrap"
                  >
                    Query Vault
                  </button>
                </div>
                {/* Validation Messages */}
                {vaultAddress && (
                  <div className="mt-1">
                    {isVaultManager ? (
                      <p className="text-hl-green text-xs flex items-center">
                        <span className="mr-1">✓</span> Verified vault manager
                      </p>
                    ) : (
                      <p className="text-red-400 text-xs flex items-center">
                        <span className="mr-1">✗</span> Not authorized
                      </p>
                    )}
                    {vaultBalance < MIN_DEPOSIT_THRESHOLD && (
                      <p className="text-red-400 text-xs flex items-center">
                        <span className="mr-1">✗</span> Min deposit: ${MIN_DEPOSIT_THRESHOLD.toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vault Information */}
          {vaultAddress && (
            <div className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
              <div className="p-3">
                {/* Header Info */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{vaultInfo.name}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-400">Leader:</span>
                      <span className="text-xs font-mono text-gray-300">{formatAddress(vaultInfo.leader)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span 
                      className="text-xs text-gray-400"
                      title="Total Value Locked - The total amount of assets in the vault"
                    >
                      Liquidity
                    </span>
                    <p className="text-lg font-bold text-hl-green">{formatUSD(vaultInfo.tvl)}</p>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/5 rounded-lg p-2">
                    <span className="text-xs text-gray-400">Past Month Return</span>
                    <p className={`text-lg font-bold ${vaultInfo.performance.monthlyReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercentage(vaultInfo.performance.monthlyReturn)}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <span className="text-xs text-gray-400">APR</span>
                    <p className={`text-lg font-bold ${vaultInfo.performance.apr >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {formatPercentage(vaultInfo.performance.apr * 100)}
                    </p>
                  </div>
                </div>

                {/* Position & Depositor Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Depositors</span>
                      <span className="text-sm font-bold text-white">{vaultInfo.depositors.count}</span>
                    </div>

                    {/* Top Depositors */}
                    <div className="space-y-1">
                      {vaultInfo.depositors.topDepositors?.slice(0, 3).map((depositor, index) => (
                        <div key={depositor.address} className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">
                            {index === 0 ? '��' : index === 1 ? '🥈' : '🥉'} 
                            {formatAddress(depositor.address)}
                          </span>
                          <span className="text-white">{formatUSD(depositor.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Active Positions ({vaultInfo.positions.count})</span>
                      <span className={`text-xs ${vaultInfo.positions.totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatUSD(vaultInfo.positions.totalPnl)}
                      </span>
                    </div>

                    {/* Position List */}
                    {vaultInfo.positions.activePositions?.length > 0 ? (
                      <div className="space-y-1">
                        {vaultInfo.positions.activePositions.slice(0, 3).map((pos) => (
                          <div key={pos.coin} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="text-white">{pos.coin}</span>
                              <span className="text-gray-400">{pos.leverage}x</span>
                            </div>
                            <div className="text-right space-x-2">
                              <span className="text-white">{formatUSD(pos.notional)}</span>
                              <span className={pos.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {formatPercentage(pos.pnl)}
                              </span>
                            </div>
                          </div>
                        ))}
                        {vaultInfo.positions.count > 3 && (
                          <div className="text-xs text-gray-400 text-center mt-1">
                            +{vaultInfo.positions.count - 3} more positions
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 text-center">
                        No active positions
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white/5 rounded-lg p-2">
                  <span className="text-xs text-gray-400">Description</span>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{vaultInfo.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Deposit & Create */}
        <div className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
          <div className="p-3 space-y-4">
            {/* Tokenization Steps */}
            <div className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Step 1: Configure LP Token */}
                <div className={!tokenName || !tokenSymbol ? 'opacity-50' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-hl-green/10 flex items-center justify-center text-sm text-hl-green">
                      1
                    </div>
                    <h3 className="text-sm font-medium text-white">Configure LP Token</h3>
                    {!!tokenName && !!tokenSymbol && (
                      <span className="text-xs text-hl-green">✓ Configured</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Token Name
                      </label>
                      <input 
                        type="text"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}
                        placeholder="e.g., Alpha Vault LP"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 
                                 text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                                 focus:ring-hl-green/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2">
                        Token Symbol
                      </label>
                      <input 
                        type="text"
                        value={tokenSymbol}
                        onChange={(e) => setTokenSymbol(e.target.value)}
                        placeholder="e.g., aVLP"
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 
                                 text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                                 focus:ring-hl-green/50 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Approve HYPE Fee */}
                <div className={!tokenName || !tokenSymbol ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-hl-green/10 flex items-center justify-center text-sm text-hl-green">
                      2
                    </div>
                    <h3 className="text-sm font-medium text-white">Approve HYPE Fee</h3>
                    {isHypeApproved && (
                      <span className="text-xs text-hl-green">✓ Approved</span>
                    )}
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Required HYPE</span>
                      <span className="text-white font-medium">{DEPLOYMENT_FEE} HYPE</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Your Balance</span>
                      <span className="text-white">0 HYPE</span>
                    </div>
                  </div>

                  {!isHypeApproved && (
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        className="w-full px-4 py-2 bg-hl-green/20 text-hl-green rounded-lg 
                                 hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setIsHypeApproveInProgress(true)}
                        disabled={isHypeApproveInProgress}
                      >
                        {isHypeApproveInProgress ? 'Approving...' : 'Approve HYPE'}
                      </button>
                      <button 
                        className="w-full px-4 py-2 bg-hl-green/20 text-hl-green rounded-lg 
                                 hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                 border border-hl-green/20 hover:border-hl-green/30
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setIsHypeApproved(true)}
                        disabled={!isHypeApproveInProgress}
                      >
                        Confirm Approval
                      </button>
                    </div>
                  )}
                </div>

                {/* Step 3: Initial Deposit */}
                <div className={!isHypeApproved ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-hl-green/10 flex items-center justify-center text-sm text-hl-green">
                      3
                    </div>
                    <h3 className="text-sm font-medium text-white">Initial Deposit</h3>
                    {isDepositConfirmed && (
                      <span className="text-xs text-hl-green">✓ Confirmed</span>
                    )}
                  </div>

                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 
                               text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                               focus:ring-hl-green/50 text-sm pr-16"
                    />
                    <button 
                      onClick={handleMax}
                      className="absolute right-2 top-1/2 -translate-y-1/2 
                               px-2 py-1 text-xs text-hl-green hover:bg-hl-green/10 
                               rounded transition-colors"
                    >
                      MAX
                    </button>
                  </div>

                  {!isDepositConfirmed && (
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        className="w-full px-4 py-2 bg-hl-green/20 text-hl-green rounded-lg 
                                 hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setIsDepositApproveInProgress(true)}
                        disabled={!amount || parseFloat(amount) < MIN_DEPOSIT_THRESHOLD || isDepositApproveInProgress}
                      >
                        {isDepositApproveInProgress ? 'Approving...' : 'Approve Deposit'}
                      </button>
                      <button 
                        className="w-full px-4 py-2 bg-hl-green/20 text-hl-green rounded-lg 
                                 hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                                 border border-hl-green/20 hover:border-hl-green/30
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setIsDepositConfirmed(true)}
                        disabled={!isDepositApproveInProgress}
                      >
                        Confirm Deposit
                      </button>
                    </div>
                  )}
                </div>

                {/* Step 4: Finalize */}
                <div className={!isDepositConfirmed ? 'opacity-50 pointer-events-none' : ''}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-hl-green/10 flex items-center justify-center text-sm text-hl-green">
                      4
                    </div>
                    <h3 className="text-sm font-medium text-white">Finalize Tokenization</h3>
                  </div>

                  <button 
                    className="w-full px-4 py-3 bg-hl-green/20 text-hl-green rounded-lg 
                             hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                             border border-hl-green/20 hover:border-hl-green/30
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!isDepositConfirmed}
                  >
                    Tokenize My Vault
                  </button>
                </div>
              </div>
            </div>

            {/* Summary and Create Button */}
            <div className={!isDepositConfirmed ? 'opacity-50 pointer-events-none' : ''}>
              <div className="bg-white/5 rounded-lg p-2.5 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Initial LP Supply</span>
                  <span className="text-white">1,000 LP Tokens</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Deposit Value</span>
                  <span className="text-white">{formatUSD(parseFloat(amount) || 0)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Platform Fee</span>
                  <span className="text-white">{PLATFORM_FEE * 100}% of AUM</span>
                </div>
              </div>

              <button 
                disabled={!isDepositConfirmed}
                className="w-full px-4 py-2 bg-hl-green/20 text-hl-green rounded-lg 
                         hover:bg-hl-green/30 transition-all duration-200 text-sm font-medium
                         border border-hl-green/20 hover:border-hl-green/30
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create LP Token
              </button>
            </div>

            {/* Requirements List */}
            <div className="space-y-1">
              <RequirementItem
                met={!!tokenName && !!tokenSymbol}
                text="Configure token details"
              />
              <RequirementItem
                met={isHypeApproved}
                text="Approve HYPE token"
              />
              <RequirementItem
                met={isDepositConfirmed}
                text={`Deposit minimum ${formatUSD(MIN_DEPOSIT_THRESHOLD)}`}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hl-green"></div>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-xs flex items-center mt-1">
          <span className="mr-1">✗</span> {error}
        </div>
      )}
    </div>
  )
}

// Add this component for requirement items
const RequirementItem = ({ met, text }: { met: boolean; text: string }) => (
  <div className="flex items-center text-xs">
    <span className={met ? 'text-hl-green' : 'text-gray-500'}>
      {met ? '✓' : '○'}
    </span>
    <span className={`ml-2 ${met ? 'text-gray-300' : 'text-gray-500'}`}>
      {text}
    </span>
  </div>
); 