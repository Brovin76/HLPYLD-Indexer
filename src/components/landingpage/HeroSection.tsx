'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HeroSection() {
  return (
    <section className="py-24 px-4">
      <motion.div 
        className="max-w-5xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-6xl sm:text-6xl md:text-7xl font-bold text-white mb-6 md:mb-10 leading-tight"
        >
          <span className="text-hl-green">Hypurr</span>
          <span className="text-white">Yield</span>
          <span className="block text-4xl sm:text-5xl md:text-5xl mt-4">
            The <span className="text-hl-green">Vault Liquidity Marketplace</span> for{' '}
            <span className="text-hl-green">HyperEVM</span>
          </span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          <span className="text-hl-green">Tokenize</span>, trade, and deploy capital into{' '}
          <span className="text-hl-green">top-performing DeFi vaults</span>—all in one place.
        </motion.p>

        {/* Stats with hover effects */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-center gap-8 mb-16"
        >
          {[
            { value: '$500M+', label: 'TVL in Hyperliquid Vaults' },
            { value: '350k+', label: 'Active Hyperliquid Users' }
          ].map((stat) => (
            <div 
              key={stat.value}
              className="group bg-white/5 backdrop-blur-lg rounded-xl p-6
                        border border-white/10 hover:border-hl-green/20
                        transition-all duration-500 min-w-[250px]
                        hover:bg-white/[0.07] hover:-translate-y-1
                        hover:shadow-[0_0_15px_rgba(0,255,176,0.1)]"
            >
              <div className="text-4xl font-bold text-hl-green mb-2 
                            group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
          <motion.a
            href="/vaults"
            className="pointer-events-none opacity-50 group px-10 py-4 bg-gradient-to-r from-hl-green/20 via-hl-green/30 to-hl-green/20 
                      text-hl-green rounded-xl 
                      hover:bg-hl-green/30 transition-all duration-300 
                      text-sm font-medium border border-hl-green/30 
                      hover:border-hl-green/50 hover:shadow-[0_0_15px_rgba(0,255,176,0.15)]
                      flex items-center gap-2"
          >
            Explore Vaults
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="/factory"
            className="pointer-events-none opacity-50 group px-10 py-4 bg-hl-green/20 text-hl-green rounded-xl 
                      hover:bg-hl-green/30 transition-all duration-300 
                      text-sm font-medium border border-hl-green/20 
                      hover:border-hl-green/30 flex items-center gap-2"
          >
            Tokenize your Vault Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
} 