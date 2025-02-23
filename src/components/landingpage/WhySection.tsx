'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WhySection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Why <span className="text-hl-green">HypurrYield</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-3xl mx-auto">
            HypurrYield is more than just tokenization—it's a{' '}
            <span className="text-hl-green">liquidity layer</span> for DeFi vaults.
          </p>

          {/* Top Row - Two Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Vault Managers",
                desc: "Vault Managers tokenize their vaults & attract liquidity."
              },
              {
                title: "Investors",
                desc: "Investors deploy capital into tokenized vaults & earn."
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/[0.08] rounded-xl p-6 border border-white/10
                          hover:border-hl-green/50 hover:scale-[1.02] 
                          transition-all duration-500 overflow-hidden"
              >
                {/* Factory card effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute w-[300px] h-[300px] -right-20 -bottom-20
                                bg-gradient-radial from-hl-green/20 to-transparent
                                animate-morph-blob blur-2xl" />
                  <div className="absolute w-[200px] h-[200px] -left-20 -top-20
                                bg-gradient-radial from-hl-green/15 to-transparent
                                animate-morph-blob blur-xl delay-300" />
                  <div className="absolute inset-0 bg-gradient-to-b from-hl-green/[0.05] to-transparent
                                animate-liquid-flow opacity-70" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2
                               group-hover:text-hl-green group-hover:translate-x-1
                               transition-all duration-500">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-white 
                              transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row - Four Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                title: "Tokenize Your Vault",
                desc: "Convert vault shares into tradeable LP tokens."
              },
              {
                title: "Use as Collateral",
                desc: "Borrow against vault LP tokens to increase liquidity."
              },
              {
                title: "Deploy Capital",
                desc: "Invest in top-performing vaults & earn yield."
              },
              {
                title: "Trade, Stake, & Earn",
                desc: "Expand your DeFi opportunities with composable assets."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group relative bg-white/[0.08] rounded-xl p-6 border border-white/10
                          hover:border-hl-green/50 hover:scale-[1.02] 
                          transition-all duration-500 overflow-hidden"
              >
                {/* Factory card effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute w-[300px] h-[300px] -right-20 -bottom-20
                                bg-gradient-radial from-hl-green/20 to-transparent
                                animate-morph-blob blur-2xl" />
                  <div className="absolute w-[200px] h-[200px] -left-20 -top-20
                                bg-gradient-radial from-hl-green/15 to-transparent
                                animate-morph-blob blur-xl delay-300" />
                  <div className="absolute inset-0 bg-gradient-to-b from-hl-green/[0.05] to-transparent
                                animate-liquid-flow opacity-70" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2
                               group-hover:text-hl-green group-hover:translate-x-1
                               transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-white 
                              transition-colors duration-500">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Benefits - Two Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {[
              {
                title: "Protocol Fees Flow Into the HypurrYield Vault",
                desc: "Creating sustainable rewards."
              },
              {
                title: "Users Earn Points for Future Rewards",
                desc: "Early adopters program"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group relative bg-white/[0.08] rounded-xl p-6 border border-white/10
                          hover:border-hl-green/50 hover:scale-[1.02] 
                          transition-all duration-500 overflow-hidden"
              >
                {/* Factory card effects */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                  <div className="absolute w-[300px] h-[300px] -right-20 -bottom-20
                                bg-gradient-radial from-hl-green/20 to-transparent
                                animate-morph-blob blur-2xl" />
                  <div className="absolute w-[200px] h-[200px] -left-20 -top-20
                                bg-gradient-radial from-hl-green/15 to-transparent
                                animate-morph-blob blur-xl delay-300" />
                  <div className="absolute inset-0 bg-gradient-to-b from-hl-green/[0.05] to-transparent
                                animate-liquid-flow opacity-70" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2
                               group-hover:text-hl-green group-hover:translate-x-1
                               transition-all duration-500">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-white 
                              transition-colors duration-500">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/vaults" className="mt-16 inline-block">
            <motion.button
              className="pointer-events-none opacity-50 group px-10 py-4 bg-hl-green/20 text-hl-green rounded-xl 
                       hover:bg-hl-green/30 transition-all duration-300 
                       text-sm font-medium border border-hl-green/20 
                       hover:border-hl-green/30 flex items-center gap-2"
            >
              Start Earning with Vaults
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
} 