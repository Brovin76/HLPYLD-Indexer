import { PrismaClient } from '@prisma/client';
import type { VaultData, LPTokenMovement, YieldMetrics } from './types.js';

export class DatabaseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async storeVaultMetrics(data: VaultData) {
    return this.prisma.vaultMetrics.create({
      data: {
        vaultAddress: data.vaultAddress,
        totalAssets: data.totalAssets.toString(),
        totalSupply: data.totalSupply.toString(),
        performanceFee: data.performanceFee,
        lastHarvestTimestamp: data.lastHarvestTimestamp ? new Date(data.lastHarvestTimestamp * 1000) : null,
        apr: data.apr
      }
    });
  }

  async storeLPMovement(data: LPTokenMovement) {
    return this.prisma.lPMovement.create({
      data: {
        from: data.from,
        to: data.to,
        amount: data.amount.toString(),
        timestamp: new Date(data.timestamp * 1000),
        transactionHash: data.transactionHash
      }
    });
  }

  async storeYieldMetrics(data: YieldMetrics) {
    return this.prisma.yieldMetric.create({
      data: {
        vaultAddress: data.vaultAddress,
        timestamp: new Date(data.timestamp * 1000),
        apr: data.apr,
        tvl: data.tvl.toString(),
        harvestAmount: data.harvestAmount.toString()
      }
    });
  }

  async getLatestVaultMetrics(vaultAddress: string) {
    return this.prisma.vaultMetrics.findFirst({
      where: { vaultAddress },
      orderBy: { timestamp: 'desc' }
    });
  }

  async getVaultMetricsHistory(vaultAddress: string, limit: number) {
    return this.prisma.vaultMetrics.findMany({
      where: { vaultAddress },
      orderBy: { timestamp: 'desc' },
      take: limit
    });
  }

  async storeLPMovementBatch(movements: LPTokenMovement[]) {
    return this.prisma.lPMovement.createMany({
      data: movements.map(m => ({
        from: m.from,
        to: m.to,
        amount: m.amount.toString(),
        timestamp: new Date(m.timestamp * 1000),
        transactionHash: m.transactionHash
      }))
    });
  }

  async storeYieldMetricsBatch(metrics: YieldMetrics[]) {
    return this.prisma.yieldMetric.createMany({
      data: metrics.map(m => ({
        vaultAddress: m.vaultAddress,
        timestamp: new Date(m.timestamp * 1000),
        apr: m.apr,
        tvl: m.tvl.toString(),
        harvestAmount: m.harvestAmount.toString()
      }))
    });
  }

  async getVaultMetricsInRange(
    vaultAddress: string,
    startTime: Date,
    endTime: Date
  ) {
    return this.prisma.vaultMetrics.findMany({
      where: {
        vaultAddress,
        timestamp: {
          gte: startTime,
          lte: endTime
        }
      },
      orderBy: { timestamp: 'desc' }
    });
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
} 