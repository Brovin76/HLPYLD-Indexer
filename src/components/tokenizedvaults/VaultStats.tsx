'use client';

import React from 'react';
import { useVaultStats } from '@/hooks/useVaultStats';
import { Loader2 } from 'lucide-react';

export default function VaultStats() {
  const { stats, isLoading } = useVaultStats();

  if (isLoading) {
    return <Loader2 className="w-6 h-6 text-hl-green animate-spin" />;
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-[#131722]/50 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <h3 className="text-gray-400 text-sm mb-1">Total Value Locked</h3>
        <p className="text-2xl font-bold text-white">$542,975,553</p>
      </div>
      <div className="bg-[#131722]/50 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <h3 className="text-gray-400 text-sm mb-1">Active Vaults</h3>
        <p className="text-2xl font-bold text-white">10</p>
      </div>
      <div className="bg-[#131722]/50 backdrop-blur-xl rounded-xl border border-white/10 p-4">
        <h3 className="text-gray-400 text-sm mb-1">Average APR</h3>
        <p className="text-2xl font-bold text-hl-green">38.01%</p>
      </div>
    </div>
  );
} 