'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useVaultDetails } from '@/hooks/useVaultDetails';
import { Loader2 } from 'lucide-react';

export function VaultInfo() {
  const { data: vault } = useVaultDetails();

  if (!vault) return null;

  return (
    <div className="space-y-4">
      {/* APR Display */}
      <div>
        <h3>Current APR</h3>
        <p>{vault.apr !== undefined ? (vault.apr * 100).toFixed(2) : '0.00'}%</p>
      </div>

      {/* Follower State */}
      {typeof vault.followerState === 'object' && vault.followerState && (
        <>
          <div>
            <h3>Vault Equity</h3>
            <p>${Number(vault.followerState.vaultEquity || 0).toLocaleString()}</p>
          </div>
          <div>
            <h3>PNL</h3>
            <p>${Number(vault.followerState.pnl || 0).toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
} 