'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function VaultDescription() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 p-6 rounded-xl border border-hl-green/10
                bg-gradient-to-br from-[#1A1D24]/90 via-[#1F2229]/90 to-[#1A1D24]/90"
    >
      <h3 className="text-xl font-medium text-white mb-3">About HLP Vault</h3>
      <p className="text-gray-400 leading-relaxed">
        This community-owned vault provides liquidity to Hyperliquid through multiple 
        market making strategies, performs liquidations, and accrues platform fees. 
        The vault has no additional profit share for vault owners and is fully 
        community-owned with a 4-day lock-up period.
      </p>
    </motion.div>
  );
} 