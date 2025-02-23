interface TradingMetrics {
  vaultAddress: string;
  timestamp: number;
  winRate: number;         // Percentage of profitable trades
  sharpeRatio: number;     // Risk-adjusted return metric
  maxDrawdown: number;     // Largest peak-to-trough decline
  profitFactor: number;    // Gross profits / gross losses
  averageTradeSize: bigint;
  totalTrades: number;
}

// Add to schema.prisma
model TradingMetrics {
  id              Int      @id @default(autoincrement())
  vaultAddress    String
  timestamp       DateTime
  winRate         Float
  sharpeRatio     Float
  maxDrawdown     Float
  profitFactor    Float
  averageTradeSize BigInt
  totalTrades     Int

  @@index([vaultAddress])
  @@index([timestamp])
} 