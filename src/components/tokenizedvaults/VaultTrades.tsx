'use client';

import React from 'react';
import { useVaultTrades } from '@/hooks/useVaultTrades';
import { formatDistance } from 'date-fns';
import { Loader2 } from 'lucide-react';

export function VaultTrades() {
  const { trades, isLoading, error } = useVaultTrades();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <div className="bg-[#1A1D24] p-4 border-b border-white/5">
          <h3 className="text-lg font-medium text-white">Recent Trades</h3>
        </div>
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-hl-green animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
        <p className="text-red-400 text-center">Failed to load trades</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden">
      <div className="bg-[#1A1D24] p-4 border-b border-white/5">
        <h3 className="text-lg font-medium text-white">Recent Trades</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1F2229]">
            <tr>
              <th className="text-left p-4 text-sm text-gray-400">Time</th>
              <th className="text-left p-4 text-sm text-gray-400">Coin</th>
              <th className="text-left p-4 text-sm text-gray-400">Side</th>
              <th className="text-right p-4 text-sm text-gray-400">Price</th>
              <th className="text-right p-4 text-sm text-gray-400">Size</th>
              <th className="text-right p-4 text-sm text-gray-400">Value</th>
              <th className="text-right p-4 text-sm text-gray-400">PnL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {trades.map((trade) => (
              <tr key={trade.timestamp} className="hover:bg-white/5">
                <td className="p-4 text-sm text-gray-400">
                  {formatDistance(new Date(trade.timestamp), new Date(), { addSuffix: true })}
                </td>
                <td className="p-4 text-sm text-white font-medium">{trade.coin}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium
                    ${trade.side.includes('Long') 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'}`}>
                    {trade.side}
                  </span>
                </td>
                <td className="p-4 text-sm text-white text-right">${trade.price}</td>
                <td className="p-4 text-sm text-white text-right">{trade.size}</td>
                <td className="p-4 text-sm text-white text-right">${trade.value}</td>
                <td className={`p-4 text-sm text-right
                  ${Number(trade.pnl) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${trade.pnl}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 