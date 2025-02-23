'use client'

import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { TESTNET_CONTRACT_ADDRESSES } from '@/config/constants'
import { hyperEvmTestnet } from '@/lib/wallet'
import { isAddress, parseUnits } from 'viem'

const VAULT_ABI = [
  {
    "type": "function",
    "name": "setOperator",
    "inputs": [
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "approved",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "bridgeToHLP",
    "inputs": [
      {
        "name": "amount",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const

export default function AdminPage() {
  const [operatorAddress, setOperatorAddress] = useState('')
  const [bridgeAmount, setBridgeAmount] = useState('')
  const [isSettingOperator, setIsSettingOperator] = useState(false)
  const [isBridging, setIsBridging] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  
  const { address } = useAccount()
  const { data: hash, writeContract } = useWriteContract()

  const handleSetOperator = async () => {
    if (!isAddress(operatorAddress)) {
      setError('Invalid address format')
      return
    }

    try {
      setError('')
      setSuccessMessage('')
      setIsSettingOperator(true)

      console.log('Setting operator:', {
        operator: operatorAddress,
        approved: true
      })

      writeContract({
        abi: VAULT_ABI,
        address: TESTNET_CONTRACT_ADDRESSES.VAULT as `0x${string}`,
        functionName: 'setOperator',
        args: [operatorAddress as `0x${string}`, true],
        chain: hyperEvmTestnet,
        account: address as `0x${string}`
      })

      setSuccessMessage(`Successfully set ${operatorAddress} as operator`)
      setOperatorAddress('')
    } catch (error) {
      console.error('Failed to set operator:', error)
      setError('Failed to set operator. Check console for details.')
    } finally {
      setIsSettingOperator(false)
    }
  }

  const handleBridgeToHLP = async () => {
    if (!bridgeAmount || isNaN(Number(bridgeAmount)) || Number(bridgeAmount) <= 0) {
      setError('Invalid amount')
      return
    }

    try {
      setError('')
      setSuccessMessage('')
      setIsBridging(true)

      const amountInWei = parseUnits(bridgeAmount, 8)
      
      console.log('Bridging to HLP:', {
        amount: bridgeAmount,
        amountInWei: amountInWei.toString()
      })

      writeContract({
        abi: VAULT_ABI,
        address: TESTNET_CONTRACT_ADDRESSES.VAULT as `0x${string}`,
        functionName: 'bridgeToHLP',
        args: [amountInWei],
        chain: hyperEvmTestnet,
        account: address as `0x${string}`
      })

      setSuccessMessage(`Successfully initiated bridge of ${bridgeAmount} USDC to HLP`)
      setBridgeAmount('')
    } catch (error) {
      console.error('Failed to bridge to HLP:', error)
      setError('Failed to bridge to HLP. Check console for details.')
    } finally {
      setIsBridging(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0E11] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="space-y-6">
          <div className="bg-[#131722] rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Set Operator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Operator Address
                </label>
                <input
                  type="text"
                  value={operatorAddress}
                  onChange={(e) => setOperatorAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg 
                           border border-white/10 focus:border-hl-green/50 focus:ring-1 
                           focus:ring-hl-green/50 transition-all outline-none"
                />
              </div>

              <button
                onClick={handleSetOperator}
                disabled={!operatorAddress || isSettingOperator}
                className="w-full px-4 py-3 bg-hl-green text-black rounded-lg 
                         hover:bg-hl-green/90 transition-all duration-200
                         font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSettingOperator ? 'Setting Operator...' : 'Set Operator'}
              </button>
            </div>
          </div>

          <div className="bg-[#131722] rounded-lg border border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-4">Bridge to HLP</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Amount
                </label>
                <input
                  type="text"
                  value={bridgeAmount}
                  onChange={(e) => setBridgeAmount(e.target.value)}
                  placeholder="Enter amount..."
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg 
                           border border-white/10 focus:border-hl-green/50 focus:ring-1 
                           focus:ring-hl-green/50 transition-all outline-none"
                />
              </div>

              <button
                onClick={handleBridgeToHLP}
                disabled={!bridgeAmount || isBridging}
                className="w-full px-4 py-3 bg-hl-green text-black rounded-lg 
                         hover:bg-hl-green/90 transition-all duration-200
                         font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBridging ? 'Bridging...' : 'Bridge to HLP'}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm py-2">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-green-400 text-sm py-2">
              {successMessage}
            </div>
          )}

          {hash && (
            <div className="text-sm py-2">
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
    </div>
  )
} 