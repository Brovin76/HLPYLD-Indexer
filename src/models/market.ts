interface MarketMetrics {
  timestamp: number;
  marketId: string;
  price: number;
  volume24h: number;
  openInterest: number;
  fundingRate: number;
  volatility: number;
  liquidations24h: number;
}

// Add to schema.prisma
model MarketMetrics {
  id              Int      @id @default(autoincrement())
  timestamp       DateTime
  marketId        String
  price           Float
  volume24h       Float
  openInterest    Float
  fundingRate     Float
  volatility      Float
  liquidations24h Float

  @@index([marketId])
  @@index([timestamp])
} 