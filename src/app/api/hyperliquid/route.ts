import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  const response = await fetch('https://api.hyperliquid-testnet.xyz/evm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })

  const data = await response.json()
  return NextResponse.json(data)
} 