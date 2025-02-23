'use client';

import { motion } from 'framer-motion';

export default function SocialBannerSection() {
  return (
    <section className="h-[400px] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -left-1/4 -top-1/4 w-[100%] h-[100%] rounded-full 
                     bg-gradient-radial from-hl-green/20 via-hl-green/10 to-transparent 
                     blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -right-1/4 -bottom-1/4 w-[100%] h-[100%] rounded-full 
                     bg-gradient-radial from-hl-green/20 via-hl-green/10 to-transparent 
                     blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-7xl sm:text-8xl md:text-[10rem] font-bold 
                         bg-clip-text text-transparent 
                         bg-gradient-to-r from-hl-green via-hl-green to-hl-green
                         leading-none tracking-normal
                         p-8"
          >
            HypurrYield
          </h1>
        </motion.div>
      </div>
    </section>
  );
} 