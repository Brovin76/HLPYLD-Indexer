import { http, createConfig } from 'wagmi'
import { Chain } from 'viem'
import { API_ENDPOINTS } from '@/config/constants'
// import { injected } from 'wagmi/connectors'

export const hyperEvmTestnet = {
  id: API_ENDPOINTS.HYPEREVM_TESTNET_CHAIN_ID,
  name: 'HyperEVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
  },
  rpcUrls: {
    default: { http: [API_ENDPOINTS.HYPEREVM_TESTNET_RPC] },
    public: { http: [API_ENDPOINTS.HYPEREVM_TESTNET_RPC] },
  },
} as const satisfies Chain

export const config = createConfig({
  chains: [hyperEvmTestnet],
  connectors: [
    // injected(),
  ],
  transports: {
    [hyperEvmTestnet.id]: http(),
  },
}) 