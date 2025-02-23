const API_URL = 'https://api.hyperliquid.xyz/info';

interface VaultDetails {
  name: string;
  vaultAddress: string;
  leader: string;
  description: string;
  portfolio: [string, {
    accountValueHistory: [number, string][];
    pnlHistory: [number, string][];
    vlm: string;
  }][];
  apr: number;
  followers: {
    user: string;
    vaultEquity: string;
    pnl: string;
    allTimePnl: string;
    daysFollowing: number;
    vaultEntryTime: number;
    lockupUntil: number;
  }[];
  maxDistributable: number;
  maxWithdrawable: number;
  isClosed: boolean;
  allowDeposits: boolean;
}

interface YieldData {
  timestamp: number;
  fixedApr: number;
  variableApr: number;
}

// Add this helper function to generate mock yield data
function generateMockYieldData(timeframe: string): YieldData[] {
  const now = Date.now();
  const points = {
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 365,
    'ALL': 365
  }[timeframe] || 30;

  return Array.from({ length: points }, (_, i) => {
    const timestamp = now - (points - i) * 24 * 60 * 60 * 1000;
    return {
      timestamp,
      fixedApr: 20 + Math.random() * 2, // 20-22% range
      variableApr: 28 + Math.random() * 4, // 28-32% range
    };
  });
}

export const vaultService = {
  async getVaultDetails(vaultAddress: string): Promise<VaultDetails> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'vaultDetails',
        vaultAddress,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vault details');
    }

    return response.json();
  },

  async getUserVaultEquities(userAddress: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'userVaultEquities',
        user: userAddress,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user vault equities');
    }

    return response.json();
  },

  // Format chart data from portfolio history
  formatChartData(portfolio: VaultDetails['portfolio'], timeframe: string) {
    let period;
    switch(timeframe) {
      case '1W':
        period = 'week';
        break;
      case '1M':
        period = 'month';
        break;
      case '3M':
        period = 'quarter';
        break;
      case '1Y':
        period = 'year';
        break;
      default:
        period = 'all';
    }

    const timeframeData = portfolio.find(([p]) => p === period)?.[1];
    if (!timeframeData) return [];

    return timeframeData.accountValueHistory.map(([timestamp, value]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      value: parseFloat(value),
    }));
  },

  async getVaultTrades(vaultAddress: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'vaultTrades',
        vaultAddress,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vault trades');
    }

    return response.json();
  },

  async getVaultPositions(vaultAddress: string) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'vaultPositions',
        vaultAddress,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch vault positions');
    }

    return response.json();
  },

  // Add real-time WebSocket connection for live updates
  subscribeToUpdates(vaultAddress: string, callback: (data: any) => void) {
    const ws = new WebSocket('wss://api.hyperliquid.xyz/ws');
    
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: 'subscribe',
        channel: `vault:${vaultAddress}`,
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };

    return () => ws.close();
  },

  async getYieldHistory(timeframe: string): Promise<YieldData[]> {
    // Mock data for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateMockYieldData(timeframe));
      }, 500); // Simulate API delay
    });
  },

  formatYieldData(portfolio: VaultDetails['portfolio'], timeframe: string) {
    let period;
    switch(timeframe) {
      case '1W':
        period = 'week';
        break;
      case '1M':
        period = 'month';
        break;
      case '3M':
        period = 'quarter';
        break;
      case '1Y':
        period = 'year';
        break;
      default:
        period = 'all';
    }

    const timeframeData = portfolio.find(([p]) => p === period)?.[1];
    if (!timeframeData) return [];

    // Get current APR from vault details
    const currentApr = 3.15; // We should get this from the API

    // Generate historical APR data with small variations around current APR
    return timeframeData.accountValueHistory.map(([timestamp]) => ({
      date: new Date(timestamp).toLocaleDateString(),
      apr: currentApr + (Math.random() * 0.5 - 0.25), // Vary between ±0.25%
    }));
  }
}; 