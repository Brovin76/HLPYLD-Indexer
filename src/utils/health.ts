export class HealthChecker {
  private lastBlockTime: number = Date.now();
  private lastProcessedBlock: number = 0;
  private isHealthy: boolean = true;

  updateBlockInfo(blockNumber: number) {
    this.lastBlockTime = Date.now();
    this.lastProcessedBlock = blockNumber;
  }

  checkHealth(): { healthy: boolean; status: string } {
    const now = Date.now();
    const blockAge = now - this.lastBlockTime;
    
    if (blockAge > 5 * 60 * 1000) { // 5 minutes
      this.isHealthy = false;
      return {
        healthy: false,
        status: `No blocks processed in ${Math.floor(blockAge / 1000)}s`
      };
    }

    return {
      healthy: true,
      status: `Last block: ${this.lastProcessedBlock}, ${Math.floor(blockAge / 1000)}s ago`
    };
  }
} 