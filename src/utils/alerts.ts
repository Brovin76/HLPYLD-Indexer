import { YieldMetrics, VaultData } from '../indexer/types.js';

export interface Alert {
  severity: 'info' | 'warning' | 'error';
  type: string;
  message: string;
  data: any;
  timestamp: number;
}

export class AlertManager {
  private alerts: Alert[] = [];
  private readonly MAX_ALERTS = 1000;

  constructor(
    private readonly config = {
      maxAprThreshold: 100,
      minTvlThreshold: BigInt(1000), // 1000 tokens
      maxTvlChangePercent: 20, // 20% change
      alertWebhook: process.env.ALERT_WEBHOOK
    }
  ) {}

  async checkVaultMetrics(current: VaultData, previous?: VaultData) {
    // Check performance fee changes
    if (previous && current.performanceFee !== previous.performanceFee) {
      await this.createAlert('warning', 'PerformanceFeeChanged', {
        vault: current.vaultAddress,
        old: previous.performanceFee,
        new: current.performanceFee
      });
    }

    // Check APR thresholds
    if (current.apr > this.config.maxAprThreshold) {
      await this.createAlert('warning', 'HighAPR', {
        vault: current.vaultAddress,
        apr: current.apr
      });
    }

    // Check TVL changes
    if (previous) {
      const tvlChange = Number((current.totalAssets - previous.totalAssets) * 100n / previous.totalAssets);
      if (Math.abs(tvlChange) > this.config.maxTvlChangePercent) {
        await this.createAlert('warning', 'LargeTVLChange', {
          vault: current.vaultAddress,
          changePercent: tvlChange,
          oldTvl: previous.totalAssets.toString(),
          newTvl: current.totalAssets.toString()
        });
      }
    }
  }

  private async createAlert(
    severity: Alert['severity'],
    type: string,
    data: any
  ): Promise<void> {
    const alert: Alert = {
      severity,
      type,
      message: `${type}: ${JSON.stringify(data)}`,
      data,
      timestamp: Date.now()
    };

    this.alerts.unshift(alert);
    if (this.alerts.length > this.MAX_ALERTS) {
      this.alerts.pop();
    }

    console.log(`[ALERT][${severity}] ${alert.message}`);

    // Send to webhook if configured
    if (this.config.alertWebhook) {
      try {
        await fetch(this.config.alertWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(alert)
        });
      } catch (error) {
        console.error('Failed to send alert to webhook:', error);
      }
    }
  }

  getRecentAlerts(limit = 10): Alert[] {
    return this.alerts.slice(0, limit);
  }
} 