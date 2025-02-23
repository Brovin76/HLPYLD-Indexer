// Platform Constants
export const DEPLOYMENT_FEE = 100 // HYPE
export const MIN_DEPOSIT_THRESHOLD = 10000 // USD
export const PLATFORM_FEE = 0.02 // 2% of AUM

// API Endpoints
export const API_ENDPOINTS = {
  HYPERLIQUID: 'https://api.hyperliquid.xyz/info',
  HYPEREVM_TESTNET_RPC: 'https://rpc.hyperliquid-testnet.xyz/evm',
  HYPEREVM_TESTNET_CHAIN_ID: 998,
  HYPEREVM_MAINNET_RPC: 'https://rpc.hyperliquid.xyz/evm',
  HYPEREVM_MAINNET_CHAIN_ID: 999
} 

// Contract addresses
export const TESTNET_CONTRACT_ADDRESSES = {
  USDC: '0xd9CBEC81df392A88AEff575E962d149d57F4d6bc',
  VAULT: '0x5dFB5c9DA01b0353bcF433Ce64D1E291D4B616a6'
}

// Contract ABIs
export const ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  }
] as const

// Vault ABI
export const VAULT_ABI = [
  {
    "type": "function",
    "name": "requestDeposit",
    "inputs": [
      {
        "name": "assets",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "controller",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "operator",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "nonpayable"
  }
] as const