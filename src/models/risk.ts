interface RiskMetrics {
  vaultAddress: string;
  timestamp: number;
  leverageRatio: number;
  collateralRatio: number;
  exposureByMarket: Map<string, number>;
  valueAtRisk: number;
  stressTestResults: {
    scenario: string;
    potentialLoss: number;
  }[];
}

// Add to schema.prisma
model RiskMetrics {
  id              Int      @id @default(autoincrement())
  vaultAddress    String
  timestamp       DateTime
  leverageRatio   Float
  collateralRatio Float
  marketExposures Json    // Store market exposures as JSON
  valueAtRisk     Float
  stressTests     Json    // Store stress test results as JSON

  @@index([vaultAddress])
  @@index([timestamp])
} 