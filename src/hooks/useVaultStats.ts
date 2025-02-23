'use client';

import { useState, useEffect } from 'react';
import { vaultService } from '@/services/vaultService';

interface Trade {
  pnl: string;
  value: string;
  timestamp: string;
}

interface VaultStats {
  winRate: number;
  avgTradeSize: string;
  dailyVolume: string;
  totalTrades: number;
}

interface UseVaultStatsReturn {
  stats: VaultStats;
  isLoading: boolean;
  error: Error | null;
}

export function useVaultStats(): UseVaultStatsReturn {
  const [stats, setStats] = useState<VaultStats>(defaultStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const trades = await vaultService.getVaultTrades(
          '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303'
        ) as Trade[];

        // Calculate stats from trades
        const winningTrades = trades.filter((trade: Trade) => Number(trade.pnl) > 0);
        const totalVolume = trades.reduce((sum: number, trade: Trade) => 
          sum + Number(trade.value), 0
        );

        setStats({
          winRate: (winningTrades.length / trades.length) * 100,
          avgTradeSize: (totalVolume / trades.length).toLocaleString(),
          dailyVolume: totalVolume.toLocaleString(),
          totalTrades: trades.length
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stats'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
}

const defaultStats: VaultStats = {
  winRate: 0,
  avgTradeSize: '0',
  dailyVolume: '0',
  totalTrades: 0
}; 