interface HyperliquidRequest {
  method: string
  params: any[]
}

interface HyperliquidApi {
  evm: (body: HyperliquidRequest) => Promise<any>
}

const API_URL = process.env.NODE_ENV === 'development'
  ? '/api/proxy'
  : 'https://api.hyperliquid-testnet.xyz'

export const getHyperliquidApi = (): HyperliquidApi => {
  return {
    evm: async (body: HyperliquidRequest) => {
      const response = await fetch(`${API_URL}/evm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      })
      return response.json()
    }
  }
}

export const hyperliquid = getHyperliquidApi() 