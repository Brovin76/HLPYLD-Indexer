'use client';

import { useState, useEffect } from 'react';
import { vaultService } from '@/services/vaultService';

export interface Trade {
  timestamp: string;
  coin: string;
  side: 'Open Long' | 'Open Short' | 'Close Long' | 'Close Short';
  price: number;
  size: string;
  value: string;
  pnl: string;
}

interface UseVaultTradesReturn {
  trades: Trade[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const VAULT_ADDRESS = '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303';

export function useVaultTrades(): UseVaultTradesReturn {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTrades = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await vaultService.getVaultTrades(VAULT_ADDRESS);
      setTrades(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch trades'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return {
    trades,
    isLoading,
    error,
    refetch: fetchTrades
  };
} 