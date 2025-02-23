'use client'

import { motion } from 'framer-motion'
import { formatAddress } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { useAccount, useBalance, useReadContract, useWriteContract, useWatchContractEvent } from 'wagmi'
import { TESTNET_CONTRACT_ADDRESSES, ERC20_ABI, VAULT_ABI } from '@/config/constants'
import { formatUSDC } from '@/lib/utils'
import { parseUnits } from 'viem'
import { hyperEvmTestnet } from '@/lib/wallet'

interface TokenizedVaultCardProps {
  name: string
  description: string
  tvl: number
  apr: number
  address: string
  leader: string
  monthlyReturn: number
  status: 'active' | 'paused' | 'deprecated' | 'test'
  initialAction?: 'deposit' | 'withdraw' | null
  onDeploy: () => void
}

export function TokenizedVaultCard(props: TokenizedVaultCardProps) {
  const [usdcAmount, setUsdcAmount] = useState<string>('')
  const [isApproving, setIsApproving] = useState(false)
  const [isDepositing, setIsDepositing] = useState(false)
  const { address } = useAccount()
  
  const { data: usdcBalance, refetch: refetchBalance } = useBalance({
    address,
    token: TESTNET_CONTRACT_ADDRESSES.USDC as `0x${string}`,
  })

  // Get current allowance
  const { data: currentAllowance, refetch: refetchAllowance } = useReadContract({
    address: TESTNET_CONTRACT_ADDRESSES.USDC as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: [
      address as `0x${string}`, 
      TESTNET_CONTRACT_ADDRESSES.VAULT as `0x${string}`
    ],
    query: {
      enabled: Boolean(address),
    }
  })

  // Watch for Approval events
  useWatchContractEvent({
    address: TESTNET_CONTRACT_ADDRESSES.USDC as `0x${string}`,
    abi: ERC20_ABI,
    eventName: 'Approval',
    onLogs: async (logs) => {
      console.log('Approval event received:', logs)
      // Check if this approval event is for our transaction
      const relevantLog = logs.find(
        log => {
          console.log('Comparing addresses:', {
            logOwner: log.args.owner?.toLowerCase(),
            userAddress: address?.toLowerCase(),
            logSpender: log.args.spender?.toLowerCase(),
            vaultAddress: TESTNET_CONTRACT_ADDRESSES.VAULT.toLowerCase()
          })
          return (
            log.args.owner?.toLowerCase() === address?.toLowerCase() &&
            log.args.spender?.toLowerCase() === TESTNET_CONTRACT_ADDRESSES.VAULT.toLowerCase()
          )
        }
      )
      
      if (relevantLog) {
        console.log('Relevant approval event found:', {
          owner: relevantLog.args.owner,
          spender: relevantLog.args.spender,
          value: relevantLog.args.value.toString()
        })
        await refetchAllowance()
        setIsApproving(false)
      } else {
        console.log('Event was not relevant to this transaction')
      }
    },
  })

  const { data:hash, writeContract } = useWriteContract()

  // Check if amount is approved
  const requiredAmount = usdcAmount ? parseUnits(usdcAmount, 8) : BigInt(0)
  const isApproved = currentAllowance >= requiredAmount

  const handleUsdcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '')
    const parts = value.split('.')
    if (parts.length > 2) return
    if (parts[1]?.length > 6) return
    setUsdcAmount(value)
  }

  const handleMaxClick = () => {
    if (usdcBalance) {
      setUsdcAmount(formatUSDC(Number(usdcBalance.value)))
    }
  }

  const handleApprove = async () => {
    if (!usdcAmount || !address) return

    try {
      setIsApproving(true)
      console.log('Initiating approval:', {
        spender: TESTNET_CONTRACT_ADDRESSES.VAULT,
        amount: parseUnits(usdcAmount, 8).toString(),
        currentAllowance: currentAllowance?.toString()
      })
      
      writeContract({
        abi: ERC20_ABI,
        address: TESTNET_CONTRACT_ADDRESSES.USDC as `0x${string}`,
        functionName: 'approve',
        args: [
          TESTNET_CONTRACT_ADDRESSES.VAULT as `0x${string}`,
          parseUnits(usdcAmount, 8)
        ],
        chain: hyperEvmTestnet,
        account: address as `0x${string}`
      })
      
      console.log('Approval transaction submitted')
      
      // Start polling for allowance updates
      const startTime = Date.now()
      const maxDuration = 120000 // 2 minutes
      const pollInterval = setInterval(async () => {
        console.log('Polling for allowance update...')
        const updated = await refetchAllowance()
        console.log('Updated allowance:', updated.data?.toString())
        
        if (updated.data >= parseUnits(usdcAmount, 8)) {
          console.log('Sufficient allowance found')
          clearInterval(pollInterval)
          setIsApproving(false)
        } else if (Date.now() - startTime > maxDuration) {
          console.log('Polling timeout reached')
          clearInterval(pollInterval)
          setIsApproving(false)
        }
      }, 2000)

    } catch (error) {
      console.error('Failed to approve:', error)
      setIsApproving(false)
    }
  }

  const handleDeposit = async () => {
    if (!usdcAmount || !address || !isApproved) return

    try {
      setIsDepositing(true)
      const depositAmount = parseUnits(usdcAmount, 8)
      const initialBalance = usdcBalance?.value || BigInt(0)
      
      console.log('Initiating deposit request:', {
        amount: depositAmount.toString(),
        controller: address,
        operator: address,
        initialBalance: initialBalance.toString()
      })

      // Send the transaction
      writeContract({
        abi: VAULT_ABI,
        address: TESTNET_CONTRACT_ADDRESSES.VAULT as `0x${string}`,
        functionName: 'requestDeposit',
        args: [
          depositAmount,
          address as `0x${string}`,
          address as `0x${string}`
        ],
        chain: hyperEvmTestnet,
        account: address as `0x${string}`
      })

      // Start polling for balance updates
      const startTime = Date.now()
      const maxDuration = 120000 // 2 minutes
      const pollInterval = setInterval(async () => {
        try {
          const { data: newBalance } = await refetchBalance()
          console.log('Polling balance:', {
            newBalance: newBalance?.value.toString(),
            initialBalance: initialBalance.toString(),
            expectedDecrease: depositAmount.toString()
          })
          
          if (newBalance && newBalance.value <= initialBalance - depositAmount) {
            console.log('Balance decreased by expected amount')
            clearInterval(pollInterval)
            setIsDepositing(false)
            setUsdcAmount('') // Reset form
          } else if (Date.now() - startTime > maxDuration) {
            console.log('Polling timeout reached')
            clearInterval(pollInterval)
            setIsDepositing(false)
          }
        } catch (error) {
          console.error('Error polling balance:', error)
        }
      }, 2000)

    } catch (error) {
      console.error('Failed to deposit:', error)
      setIsDepositing(false)
    }
  }

  // Effect to check approval status when amount changes
  useEffect(() => {
    if (currentAllowance !== undefined) {
      const requiredAmount = usdcAmount ? parseUnits(usdcAmount, 8) : BigInt(0)
      const hasApproval = currentAllowance >= requiredAmount
      console.log('Checking approval status:', {
        currentAllowance: currentAllowance.toString(),
        requiredAmount: requiredAmount.toString(),
        hasApproval
      })
      if (hasApproval && isApproving) {
        console.log('Setting isApproving to false due to sufficient allowance')
        setIsApproving(false)
      }
    }
  }, [currentAllowance, usdcAmount, isApproving])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#131722] rounded-lg border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-white">{props.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Leader:</span>
              <span className="text-xs font-mono text-gray-300">
                {formatAddress(props.leader)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-gray-400">Liquidity</span>
            <p className="text-lg font-bold text-hl-green">
              ${props.tvl.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-lg p-3">
            <span className="text-xs text-gray-400">Past Month Return</span>
            <p className={`text-xl font-bold mt-1 ${
              props.monthlyReturn >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {props.monthlyReturn > 0 ? '+' : ''}{props.monthlyReturn.toFixed(2)}%
            </p>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <span className="text-xs text-gray-400">APR</span>
            <p className={`text-xl font-bold mt-1 ${
              props.apr >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {props.apr > 0 ? '+' : ''}{props.apr.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 rounded-lg p-3">
          <span className="text-xs text-gray-400">Description</span>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">
            {props.description}
          </p>
        </div>

        {/* USDC Input */}
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Enter USDC Amount</span>
            <button 
              onClick={handleMaxClick}
              className="text-xs text-hl-green hover:text-hl-green/80 transition-colors"
            >
              MAX ({usdcBalance ? formatUSDC(Number(usdcBalance.value)) : '0.00'})
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={usdcAmount}
              onChange={handleUsdcChange}
              placeholder="0.00"
              className="w-full bg-black/20 text-white text-right pr-16 pl-12 py-3 rounded-lg 
                       border border-white/10 focus:border-hl-green/50 focus:ring-1 
                       focus:ring-hl-green/50 transition-all outline-none"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-400">$</span>
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium text-gray-400">USDC</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleApprove}
            disabled={!usdcAmount || isApproved || isApproving || isDepositing}
            className="px-4 py-3 bg-hl-green/10 text-hl-green rounded-lg 
                     hover:bg-hl-green/20 transition-all duration-200
                     border border-hl-green/20 hover:border-hl-green/30
                     font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isApproving ? 'Approving...' : isApproved ? 'Approved' : 'Approve'}
          </button>
          <button
            onClick={handleDeposit}
            className="px-4 py-3 bg-hl-green text-black rounded-lg 
                     hover:bg-hl-green/90 transition-all duration-200
                     font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!parseFloat(usdcAmount) || !isApproved || isApproving || isDepositing}
          >
            {isDepositing ? 'Depositing...' : 'Confirm'}
          </button>
          {hash && (
            <div className="col-span-2 text-sm py-2">
              Transaction Hash:{' '}
              <a 
                href={`https://testnet.purrsec.com/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-hl-green hover:text-hl-green/80 transition-colors"
              >
                {hash}
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 