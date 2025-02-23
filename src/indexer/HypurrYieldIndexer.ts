import { ethers } from 'ethers';
import { VaultData, LPTokenMovement, YieldMetrics } from './types.js';
import HyperVaultABI from '../../artifacts/contracts/HyperVault.json' assert { type: "json" };
import { INDEXER_CONFIG } from './config.js';
import { DatabaseService } from './database.js';
import WebSocket from 'ws';
import { withRetry } from '../utils/retry.js';
import { MetricsCollector } from '../utils/metrics.js';
import { HealthChecker } from '../utils/health.js';

interface HyperliquidMarketData {
  market: string;
  price: number;
  timestamp: number;
}

export class HypurrYieldIndexer {
  private provider: ethers.JsonRpcProvider;
  private vaultAddresses: string[];
  private lastProcessedBlock: number;
  private vaultContracts: Map<string, ethers.Contract>;
  private marketData: Map<string, HyperliquidMarketData>;
  private db: DatabaseService;
  private metrics: MetricsCollector;
  private health: HealthChecker;

  constructor(
    rpcUrl: string = INDEXER_CONFIG.rpcUrl,
    vaultAddresses: string[] = INDEXER_CONFIG.vaultAddresses,
  ) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.vaultAddresses = vaultAddresses;
    this.lastProcessedBlock = 0;
    this.vaultContracts = new Map();
    this.marketData = new Map();
    
    // Initialize vault contracts
    for (const address of vaultAddresses) {
      this.vaultContracts.set(
        address,
        new ethers.Contract(address, HyperVaultABI.abi, this.provider)
      );
    }

    this.db = new DatabaseService();
    this.metrics = new MetricsCollector();
    this.health = new HealthChecker();
  }

  async initialize() {
    // Get the latest block number
    this.lastProcessedBlock = await this.provider.getBlockNumber();
    console.log(`Initialized indexer at block ${this.lastProcessedBlock}`);

    // Ensure we're on the correct network
    const network = await this.provider.getNetwork();
    const chainId = Number(network.chainId); // Convert to number
    if (chainId !== INDEXER_CONFIG.chainId) {
      throw new Error(`Wrong network: expected chainId ${INDEXER_CONFIG.chainId}, got ${chainId}`);
    }
    console.log(`Connected to network with chainId ${chainId}`);
  }

  async processNewBlocks() {
    this.metrics.startTimer('process_blocks');
    
    try {
      const currentBlock = await withRetry(() => this.provider.getBlockNumber());
      
      if (currentBlock <= this.lastProcessedBlock) {
        return;
      }

      console.log(`Processing blocks ${this.lastProcessedBlock + 1} to ${currentBlock}`);
      
      for (const vaultAddress of this.vaultAddresses) {
        await this.processVaultEvents(vaultAddress, this.lastProcessedBlock + 1, currentBlock);
      }

      this.lastProcessedBlock = currentBlock;
      this.health.updateBlockInfo(currentBlock);
      this.metrics.increment('blocks_processed', currentBlock - this.lastProcessedBlock);
    } catch (error) {
      console.error('Error processing blocks:', error);
      this.metrics.increment('process_blocks_errors');
    } finally {
      this.metrics.endTimer('process_blocks');
    }
  }

  private async processVaultEvents(
    vaultAddress: string,
    fromBlock: number,
    toBlock: number
  ) {
    // We'll implement these methods next
    await this.processDepositWithdrawEvents(vaultAddress, fromBlock, toBlock);
    await this.processHarvestEvents(vaultAddress, fromBlock, toBlock);
    await this.updateVaultMetrics(vaultAddress);
  }

  private async processDepositWithdrawEvents(
    vaultAddress: string,
    fromBlock: number,
    toBlock: number
  ) {
    const vault = this.vaultContracts.get(vaultAddress)!;

    try {
      // Get deposit events
      const depositFilter = vault.filters.Deposit();
      const depositEvents = await vault.queryFilter(depositFilter, fromBlock, toBlock);

      // Get withdraw events
      const withdrawFilter = vault.filters.Withdraw();
      const withdrawEvents = await vault.queryFilter(withdrawFilter, fromBlock, toBlock);

      // Process events
      for (const event of depositEvents) {
        const block = await event.getBlock();
        const movement: LPTokenMovement = {
          from: ethers.ZeroAddress,
          to: event.args!.receiver,
          amount: event.args!.assets,
          timestamp: block.timestamp,
          transactionHash: event.hash
        };
        await this.storeLPMovement(movement);
      }

      for (const event of withdrawEvents) {
        const block = await event.getBlock();
        const movement: LPTokenMovement = {
          from: event.args!.owner,
          to: event.args!.receiver,
          amount: event.args!.assets,
          timestamp: block.timestamp,
          transactionHash: event.hash
        };
        await this.storeLPMovement(movement);
      }
    } catch (error) {
      console.error('Error processing deposit/withdraw events:', error);
    }
  }

  private async processHarvestEvents(
    vaultAddress: string,
    fromBlock: number,
    toBlock: number
  ) {
    const vault = this.vaultContracts.get(vaultAddress)!;
    
    try {
      // Get the current metrics first
      const totalHLPEquity = await vault.getTotalHLPEquity();
      const timestamp = Math.floor(Date.now() / 1000);

      const metrics: YieldMetrics = {
        vaultAddress,
        timestamp,
        apr: await this.calculateAPR(vaultAddress, BigInt(0)), // We'll update APR calculation
        tvl: totalHLPEquity,
        harvestAmount: BigInt(0) // We'll track this separately
      };

      await this.storeYieldMetrics(metrics);
      console.log('Stored initial yield metrics for block range', fromBlock, 'to', toBlock);
    } catch (error) {
      console.error('Error processing harvest events:', error);
    }
  }

  private async calculateAPR(vaultAddress: string, harvestAmount: bigint): Promise<number> {
    const vault = this.vaultContracts.get(vaultAddress)!;
    
    try {
      // Get historical metrics for APR calculation
      const historicalMetrics = await this.db.getVaultMetricsHistory(vaultAddress, 24); // Last 24 data points
      if (historicalMetrics.length < 2) {
        return 0;
      }

      // Calculate APR based on TVL change
      const oldest = historicalMetrics[historicalMetrics.length - 1];
      const newest = historicalMetrics[0];
      const tvlChange = Number(newest.totalAssets) - Number(oldest.totalAssets);
      const timeChange = (newest.timestamp.getTime() - oldest.timestamp.getTime()) / 1000; // in seconds
      
      // Annualize the return
      const yearInSeconds = 365 * 24 * 60 * 60;
      const apr = (tvlChange / Number(oldest.totalAssets)) * (yearInSeconds / timeChange) * 100;
      
      return Math.max(0, apr); // Ensure non-negative APR
    } catch (error) {
      console.error('Error calculating APR:', error);
      return 0;
    }
  }

  private async storeYieldMetrics(metrics: YieldMetrics) {
    await this.db.storeYieldMetrics(metrics);
    console.log('Stored yield metrics:', metrics);
  }

  private async updateVaultMetrics(vaultAddress: string) {
    const vault = this.vaultContracts.get(vaultAddress)!;
    
    try {
      const [totalSupply, totalHLPEquity, performanceFee] = await Promise.all([
        vault.totalSupply(),
        vault.getTotalHLPEquity(),
        vault.performanceFee() // Assuming this exists in the contract
      ]);

      const lastHarvestTimestamp = Math.floor(Date.now() / 1000); // We'll update this when we track harvests
      const apr = await this.calculateAPR(vaultAddress, totalHLPEquity);

      const vaultData: VaultData = {
        vaultAddress,
        totalAssets: totalHLPEquity,
        totalSupply,
        performanceFee: Number(performanceFee) / 100, // Convert from basis points if needed
        lastHarvestTimestamp,
        apr
      };

      await this.storeVaultData(vaultData);
      console.log('Updated vault metrics:', {
        ...vaultData,
        totalAssets: vaultData.totalAssets.toString(),
        totalSupply: vaultData.totalSupply.toString()
      });
    } catch (error) {
      console.error('Error updating vault metrics:', error);
    }
  }

  // Storage methods to be implemented based on your database choice
  private async storeLPMovement(movement: LPTokenMovement) {
    await this.db.storeLPMovement(movement);
    console.log('Stored LP movement:', movement);
  }

  private async storeVaultData(data: VaultData) {
    await this.db.storeVaultMetrics(data);
    console.log('Stored vault data:', data);
  }

  async startMarketDataSubscription() {
    const ws = new WebSocket(INDEXER_CONFIG.hyperliquidConfig.wsUrl);
    
    ws.on('open', () => {
      console.log('Connected to Hyperliquid WebSocket');
      // Subscribe to market data
      for (const market of INDEXER_CONFIG.hyperliquidConfig.markets) {
        ws.send(JSON.stringify({
          method: 'subscribe',
          channel: 'trades',
          market
        }));
      }
    });

    ws.on('message', (data) => {
      const message = JSON.parse(data.toString());
      this.updateMarketData(message);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  private updateMarketData(data: any) {
    // Implementation of updateMarketData method
  }

  async cleanup() {
    await this.db.disconnect();
  }

  getHealth() {
    return this.health.checkHealth();
  }

  getMetrics() {
    return this.metrics.getMetrics();
  }

  // Additional methods to be implemented
} 