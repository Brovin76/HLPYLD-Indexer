interface UserPosition {
  userAddress: string;
  vaultAddress: string;
  shares: bigint;
  depositValue: bigint;
  depositTimestamp: number;
  averageEntryPrice: number;
  realizedPnL: bigint;
  unrealizedPnL: bigint;
}

// Add to schema.prisma
model UserPosition {
  id              Int      @id @default(autoincrement())
  userAddress     String
  vaultAddress    String
  shares          BigInt
  depositValue    BigInt
  depositTimestamp DateTime
  averageEntryPrice Float
  realizedPnL    BigInt
  unrealizedPnL  BigInt
  lastUpdateTime DateTime @default(now())

  @@index([userAddress])
  @@index([vaultAddress])
} 