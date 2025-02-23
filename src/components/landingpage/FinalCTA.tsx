'use client';

import { motion } from 'framer-motion';
import { Twitter, MessageCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Join the Future of <span className="text-hl-green">Vault Liquidity</span>
        </h2>
        
        <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          <span className="text-hl-green">HypurrYield</span> is more than just tokenization—it's a <span className="text-hl-green">liquidity marketplace</span> where users deploy capital and vault managers maximize returns. Be among the first vault managers to tokenize and unlock the next wave of <span className="text-hl-green">DeFi growth</span>.
        </p>

        <p className="text-lg text-hl-green mb-8">
          Start with HLP Today – Expand to More Vaults Soon
        </p>

        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-400">Follow us:</span>
          <motion.a
            href="https://twitter.com/HypurrYield"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                     border border-white/10 hover:border-white/20 
                     transition-all duration-300 text-white text-sm"
          >
            HypurrYield on X
          </motion.a>
        </div>

        <div className="flex justify-center gap-6 pt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 
                     bg-hl-green/10 text-hl-green rounded-xl 
                     hover:bg-hl-green/20 transition-all duration-300 
                     text-sm font-medium border border-hl-green/20 
                     hover:border-hl-green/30"
            disabled
          >
            <MessageCircle className="w-5 h-5" />
            Discord Soon
          </motion.button>
        </div>
      </div>
    </section>
  );
} 