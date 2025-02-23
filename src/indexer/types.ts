export interface VaultData {
  vaultAddress: string;
  totalAssets: bigint;
  totalSupply: bigint;
  performanceFee: number;
  lastHarvestTimestamp: number;
  apr: number;
}

export interface LPTokenMovement {
  from: string;
  to: string;
  amount: bigint;
  timestamp: number;
  transactionHash: string;
}

export interface YieldMetrics {
  vaultAddress: string;
  timestamp: number;
  apr: number;
  tvl: bigint;
  harvestAmount: bigint;
} 