'use client';

import { useState, useEffect } from 'react';
import { vaultService } from '@/services/vaultService';

export interface Position {
  coin: string;
  side: 'Long' | 'Short';
  size: string;
  value: string;
  pnl: string;
  pnlPercent: string;
}

interface UseVaultPositionsReturn {
  positions: Position[];
  isLoading: boolean;
  error: Error | null;
}

export function useVaultPositions(): UseVaultPositionsReturn {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const data = await vaultService.getVaultPositions(
          '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303'
        );
        setPositions(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch positions'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPositions();
  }, []);

  return { positions, isLoading, error };
} 