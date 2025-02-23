'use client';

import { useState, useEffect } from 'react';
import { vaultService } from '@/services/vaultService';

export interface VaultDetails {
  name: string;
  vaultAddress: string;
  leader: string;
  description: string;
  portfolio: [string, {
    accountValueHistory: [number, string][];
    pnlHistory: [number, string][];
    vlm: string;
  }][];
  apr?: number;
  followerState: {
    vaultEquity: string;
    pnl: string;
    allTimePnl: string;
    lockupUntil: number;
  } | null;
  leaderFraction: number;
  leaderCommission: number;
  followers: {
    user: string;
    vaultEquity: string;
    pnl: string;
    allTimePnl: string;
    daysFollowing: number;
    vaultEntryTime: number;
    lockupUntil: number;
  }[];
  maxDistributable?: number;
  maxWithdrawable: number;
  isClosed: boolean;
  allowDeposits: boolean;
}

interface UseVaultDetailsReturn {
  data: VaultDetails | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  handleSetData: (details: Partial<VaultDetails>) => void;
}

const VAULT_ADDRESS = '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303';

export function useVaultDetails(): UseVaultDetailsReturn {
  const [data, setData] = useState<VaultDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const details = await vaultService.getVaultDetails(VAULT_ADDRESS);
      if (
        'followerState' in details &&
        'leaderFraction' in details &&
        'leaderCommission' in details
      ) {
        setData(details as VaultDetails);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch vault details'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetData = (details: Partial<VaultDetails>) => {
    setData(prev => {
      if (!prev) return details as VaultDetails;
      return { ...prev, ...details };
    });
  };

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    handleSetData
  };
} 