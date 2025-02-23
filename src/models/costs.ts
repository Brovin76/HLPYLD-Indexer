interface CostMetrics {
  vaultAddress: string;
  timestamp: number;
  gasUsed: bigint;
  gasCost: bigint;
  tradingFees: bigint;
  performanceFees: bigint;
  totalCosts: bigint;
}

// Add to schema.prisma
model CostMetrics {
  id              Int      @id @default(autoincrement())
  vaultAddress    String
  timestamp       DateTime
  gasUsed         BigInt
  gasCost         BigInt
  tradingFees     BigInt
  performanceFees BigInt
  totalCosts      BigInt

  @@index([vaultAddress])
  @@index([timestamp])
} 