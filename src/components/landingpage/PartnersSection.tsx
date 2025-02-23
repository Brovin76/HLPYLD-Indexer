'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { ContactFormModal } from './ContactFormModal';

export default function PartnersSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add these helper functions from Features section
  const getOrbShape = (index: number) => {
    const shapes = [
      'rounded-[60%_40%_40%_60%/50%]',
      'rounded-[40%_60%_60%_40%/50%]',
      'rounded-[55%_45%_45%_55%/50%]',
    ];
    return shapes[index];
  };

  const positions = [
    'left-[10%] md:left-[10%] top-[15%] md:top-[25%]',
    'left-[50%] -translate-x-1/2 top-[40%] md:top-[30%]',
    'right-[10%] md:right-[10%] top-[65%] md:top-[25%]',
  ];

  const animations = [
    {
      y: [0, -5, 0],
      x: [0, 2, 0],
      scale: [1, 1.01, 1],
    },
    {
      y: [-2, 5, -2],
      x: [0, 0, 0],
      scale: [1, 1.01, 1],
    },
    {
      y: [0, -5, 0],
      x: [0, -2, 0],
      scale: [1, 1.01, 1],
    },
  ];

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hl-green/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-3 text-white">
            Backed by trusted partners in the <span className="text-[#00FFB0]">DeFi</span> ecosystem
          </h2>
        </motion.div>

        {/* Desktop Orbs - Hidden on Mobile */}
        <div className="hidden md:block relative h-[450px]">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`absolute ${positions[index]} w-[140px] md:w-[200px] aspect-square group`}
            >
              <motion.div
                animate={animations[index]}
                transition={{ 
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * -3,
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
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="text-xl font-bold text-white mb-4">Coming Soon</div>
                    <p className="text-gray-400">More partnerships to be announced</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Cards - Hidden on Desktop */}
        <div className="md:hidden space-y-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
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
                                border border-hl-green/30`}
                />
                <div>
                  <div className="text-lg font-bold text-white">Coming Soon</div>
                  <p className="text-gray-400 text-sm">More partnerships to be announced</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Get in Touch Button */}
        <div className="text-center mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="group px-10 py-4 bg-gradient-to-r from-hl-green/20 via-hl-green/30 to-hl-green/20 
                     text-hl-green rounded-xl 
                     hover:bg-hl-green/30 transition-all duration-300 
                     text-sm font-medium border border-hl-green/30 
                     hover:border-hl-green/50 hover:shadow-[0_0_15px_rgba(0,255,176,0.15)]
                     flex items-center gap-3 mx-auto"
          >
            <span className="text-base">Get in Touch</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <Mail className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <ContactFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
} 