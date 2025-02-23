'use client';

import React from 'react';
import { useVaultPositions } from '@/hooks/useVaultPositions';
import { Loader2 } from 'lucide-react';

interface Position {
  coin: string;
  side: 'Long' | 'Short';
  size: string;
  value: string;
  pnl: string;
  pnlPercent: string;
}

export function VaultPositions() {
  const { positions, isLoading, error } = useVaultPositions();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="bg-[#1A1D24] p-4 border-b border-white/5">
          <h3 className="text-lg font-medium text-white">Current Positions (158)</h3>
        </div>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-hl-green animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden">
      <div className="bg-[#1A1D24] p-4 border-b border-white/5">
        <h3 className="text-lg font-medium text-white">
          Current Positions ({positions.length})
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1F2229]">
            <tr>
              <th className="text-left p-4 text-sm text-gray-400">Coin</th>
              <th className="text-left p-4 text-sm text-gray-400">Side</th>
              <th className="text-right p-4 text-sm text-gray-400">Size</th>
              <th className="text-right p-4 text-sm text-gray-400">Value</th>
              <th className="text-right p-4 text-sm text-gray-400">PnL</th>
              <th className="text-right p-4 text-sm text-gray-400">PnL %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {positions.map((position) => (
              <tr key={position.coin} className="hover:bg-white/5">
                <td className="p-4 text-sm text-white font-medium">
                  {position.coin}
                </td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium
                    ${position.side === 'Long'
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'}`}>
                    {position.side}
                  </span>
                </td>
                <td className="p-4 text-sm text-white text-right">
                  {position.size}
                </td>
                <td className="p-4 text-sm text-white text-right">
                  ${position.value}
                </td>
                <td className={`p-4 text-sm text-right
                  ${Number(position.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${position.pnl}
                </td>
                <td className={`p-4 text-sm text-right
                  ${Number(position.pnlPercent) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {position.pnlPercent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 