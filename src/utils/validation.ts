import { VaultData, LPTokenMovement, YieldMetrics } from '../indexer/types.js';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateVaultData(data: VaultData): void {
  if (!data.vaultAddress || !data.vaultAddress.startsWith('0x')) {
    throw new ValidationError('Invalid vault address format');
  }
  if (data.totalAssets < 0n) {
    throw new ValidationError('Total assets cannot be negative');
  }
  if (data.totalSupply < 0n) {
    throw new ValidationError('Total supply cannot be negative');
  }
  if (data.performanceFee < 0 || data.performanceFee > 100) {
    throw new ValidationError('Performance fee must be between 0 and 100');
  }
  if (data.apr < 0 || data.apr > 1000) {
    throw new ValidationError('APR must be between 0 and 1000');
  }
}

export function validateLPMovement(data: LPTokenMovement): void {
  if (!data.from || !data.from.startsWith('0x')) {
    throw new ValidationError('Invalid from address');
  }
  if (!data.to || !data.to.startsWith('0x')) {
    throw new ValidationError('Invalid to address');
  }
  if (data.amount < 0n) {
    throw new ValidationError('Amount cannot be negative');
  }
  if (!data.transactionHash || !data.transactionHash.startsWith('0x')) {
    throw new ValidationError('Invalid transaction hash');
  }
}

export function validateYieldMetrics(data: YieldMetrics): void {
  if (!data.vaultAddress || !data.vaultAddress.startsWith('0x')) {
    throw new ValidationError('Invalid vault address');
  }
  if (data.tvl < 0n) {
    throw new ValidationError('TVL cannot be negative');
  }
  if (data.harvestAmount < 0n) {
    throw new ValidationError('Harvest amount cannot be negative');
  }
  if (data.apr < 0 || data.apr > 1000) {
    throw new ValidationError('APR must be between 0 and 1000');
  }
} 