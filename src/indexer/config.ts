import { TESTNET_CONTRACT_ADDRESSES, API_ENDPOINTS } from '../config/constants.js';

export const INDEXER_CONFIG = {
  rpcUrl: process.env.RPC_URL || API_ENDPOINTS.HYPEREVM_TESTNET_RPC,
  chainId: API_ENDPOINTS.HYPEREVM_TESTNET_CHAIN_ID,
  refreshInterval: 15000, // 15 seconds
  vaultAddresses: [
    TESTNET_CONTRACT_ADDRESSES.VAULT // '0x5dFB5c9DA01b0353bcF433Ce64D1E291D4B616a6'
  ],
  contracts: {
    usdc: TESTNET_CONTRACT_ADDRESSES.USDC
  },
  hyperliquidConfig: {
    apiUrl: API_ENDPOINTS.HYPERLIQUID,
    wsUrl: 'wss://api.hyperliquid-testnet.xyz/ws',
    markets: ['BTC-USD', 'ETH-USD'], // We'll need to confirm which markets you're using
    updateInterval: 60000, // 1 minute
    nativeToken: 'HYPE'
  }
}; 