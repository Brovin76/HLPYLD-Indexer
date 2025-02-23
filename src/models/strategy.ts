interface StrategyMetrics {
  vaultAddress: string;
  timestamp: number;
  strategyName: string;
  parameters: Record<string, any>;
  performance: {
    timeframe: string;
    returns: number;
    volatility: number;
  }[];
  signals: {
    indicator: string;
    value: number;
    action: string;
  }[];
}

// Add to schema.prisma
model StrategyMetrics {
  id              Int      @id @default(autoincrement())
  vaultAddress    String
  timestamp       DateTime
  strategyName    String
  parameters      Json     // Store strategy parameters
  performance     Json     // Store performance metrics
  signals         Json     // Store trading signals

  @@index([vaultAddress])
  @@index([timestamp])
} 