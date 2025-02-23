'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      title: "Unlock Instant Liquidity",
      description: "Convert your vault into tradeable LP tokens"
    },
    {
      title: "Use as Collateral",
      description: "Borrow against your LP tokens for extra leverage"
    },
    {
      title: "Maximize Capital Efficiency",
      description: "Attract more depositors & inflows"
    },
    {
      title: "Expand DeFi Use Cases",
      description: "Enable trading, staking & composability"
    }
  ];

  // Simple oval shapes that match background
  const getOrbShape = (index: number) => {
    const shapes = [
      'rounded-[60%_40%_40%_60%/50%]',
      'rounded-[40%_60%_60%_40%/50%]',
      'rounded-[55%_45%_45%_55%/50%]',
      'rounded-[45%_55%_55%_45%/50%]',
    ];
    return shapes[index];
  };

  // Even more spread out positioning
  const positions = [
    'left-[4%] top-[18%]',       // Top left (more left)
    'left-[25%] top-[26%]',      // Upper middle
    'right-[25%] top-[34%]',     // Lower middle
    'right-[4%] top-[42%]',      // Bottom right (more right)
  ];

  // More dynamic animations with stronger movement
  const animations = [
    {
      y: [0, -35, 0],          // Increased range
      x: [0, 25, 0],           // Wider movement
      scale: [1, 1.08, 1],     // More dramatic scale
    },
    {
      y: [-8, -45, -8],
      x: [0, 30, 0],
      scale: [1, 1.08, 1],
    },
    {
      y: [-8, -45, -8],
      x: [0, -30, 0],
      scale: [1, 1.08, 1],
    },
    {
      y: [0, -35, 0],
      x: [0, -25, 0],
      scale: [1, 1.08, 1],
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hl-green/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-3 text-white">
            Why <span className="text-[#00FFB0]">Tokenize</span> Your Vault?
          </h2>
        </motion.div>

        {/* Desktop Orbs - Hidden on Mobile */}
        <div className="hidden md:block relative h-[450px]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`absolute ${positions[index]} w-[220px] aspect-square group`}
            >
              <motion.div
                animate={animations[index]}
                transition={{ 
                  duration: 10 + (index * 2),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: -index * 3,
                }}
                className="relative w-full h-full"
              >
                {/* Enhanced liquid effect */}
                <div className={`absolute inset-0 ${getOrbShape(index)}
                              bg-gradient-radial from-[#00FFB0]/40 via-[#00FFB0]/25 to-transparent
                              backdrop-blur-sm transition-all duration-500
                              border border-[#00FFB0]/30
                              group-hover:border-[#00FFB0]/50`}>
                  
                  {/* Liquid shine */}
                  <div className={`absolute inset-0 ${getOrbShape(index)}
                                bg-gradient-to-b from-white/30 via-white/10 to-transparent 
                                opacity-60 group-hover:opacity-80 
                                transition-opacity duration-700`} />
                  
                  {/* Enhanced glow */}
                  <div className="absolute inset-0 -z-10 scale-150">
                    <div className={`absolute inset-0 bg-gradient-to-r 
                                  from-[#00FFB0]/30 via-[#00FFB0]/20 to-[#00FFB0]/30
                                  ${getOrbShape(index)} blur-[70px] opacity-70
                                  group-hover:opacity-90 
                                  transition-all duration-1000`} />
                  </div>
                  
                  {/* Additional liquid layer */}
                  <div className={`absolute inset-0 ${getOrbShape(index)}
                                bg-gradient-to-br from-[#00FFB0]/10 via-transparent to-[#00FFB0]/5
                                group-hover:from-[#00FFB0]/20 group-hover:to-[#00FFB0]/10
                                transition-all duration-700`} />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <h3 className="text-xl font-bold mb-2 text-white
                                 group-hover:text-[#00FFB0]
                                 transition-all duration-700">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm
                                group-hover:text-white 
                                transition-colors duration-700 leading-relaxed
                                max-w-[85%]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards - Hidden on Desktop */}
        <div className="md:hidden space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-r from-white/[0.05] to-white/[0.02] 
                        backdrop-blur-sm rounded-xl p-6
                        border border-hl-green/20 hover:border-hl-green/30
                        transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${getOrbShape(index)}
                                bg-gradient-radial from-hl-green/30 to-transparent
                                border border-hl-green/30
                                flex items-center justify-center`}
                >
                  {/* You can add feature-specific icons here */}
                  <div className="text-hl-green text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {feature.title}
                  </div>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <motion.div className="text-center mt-6">
          <motion.a
            href="/factory"
            className="pointer-events-none opacity-50 inline-flex items-center gap-2 px-10 py-4 
                     bg-gradient-to-r from-hl-green/20 to-emerald-500/20
                     hover:from-hl-green/30 hover:to-emerald-500/30
                     text-hl-green rounded-xl
                     transition-all duration-500 
                     text-sm font-medium border border-hl-green/20 
                     hover:border-hl-green/30
                     shadow-[0_8px_32px_rgba(0,255,176,0.1)]
                     hover:shadow-[0_8px_32px_rgba(0,255,176,0.2)]"
          >
            Tokenize Your Vault Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 