'use client';

import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight } from 'lucide-react';

interface Phase {
  status: 'Phase 1' | 'soon' | 'planned';
  title: string;
  features: string[];
  description: string;
}

export default function RoadmapSection() {
  const phases: Phase[] = [
    {
      status: 'Phase 1',
      title: 'Tokenized HLP Vault',
      description: 'Convert your HLP vault shares into tradeable tokens and unlock new DeFi opportunities.',
      features: [
        'Tokenized vault shares',
        'Instant liquidity access',
        'Composable DeFi assets'
      ]
    },
    {
      status: 'soon',
      title: 'Vault Tokenization Suite',
      description: 'Enabling vault managers to tokenize their own vaults and unlock new possibilities.',
      features: [
        'Self-service tokenization',
        'Liquidity deployment tools',
        'Early adopter points program'
      ]
    },
    {
      status: 'planned',
      title: 'Fixed & Liquid Yield Tranches',
      description: 'Structured products offering both fixed-rate returns and leveraged yield opportunities.',
      features: [
        'Fixed-rate & variable yield',
        'Optimized risk-adjusted returns',
        'Advanced DeFi integration'
      ]
    }
  ];

  const getStatusIcon = (status: Phase['status']) => {
    switch (status) {
      case 'Phase 1':
        return <Check className="w-5 h-5 text-hl-green" />;
      case 'soon':
        return <Clock className="w-5 h-5 text-blue-400" />;
      default:
        return <ArrowRight className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-hl-green/5 via-transparent to-transparent opacity-50" />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-white">
            The <span className="text-hl-green">HypurrYield</span> Roadmap
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are building a scalable liquidity layer for tokenized vaults.
          </p>
        </div>

        <div className="grid gap-8 relative">
          {/* Connecting line */}
          <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-hl-green/30 via-hl-green/20 to-transparent" />
          
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl
                            border-2 border-hl-green/30 flex items-center justify-center">
                {getStatusIcon(phase.status)}
              </div>

              {/* Content card */}
              <div className={`w-full md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:text-right' : 'md:text-left'
              }`}>
                <motion.div 
                  className="group relative bg-[#1A1D24] rounded-xl p-8 border border-hl-green/5
                             transition-all duration-700 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Morphing liquid blobs */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    {/* Main morphing blob */}
                    <div className="absolute w-[300px] h-[300px] -right-20 -bottom-20
                                    bg-gradient-radial from-hl-green/10 to-transparent
                                    animate-morph-blob blur-2xl" />
                    
                    {/* Floating bubbles */}
                    <div className="absolute w-20 h-20 left-10 top-10
                                    bg-gradient-radial from-hl-green/5 to-transparent
                                    rounded-full blur-xl animate-bubble-float" />
                    <div className="absolute w-16 h-16 right-20 top-20
                                    bg-gradient-radial from-hl-green/5 to-transparent
                                    rounded-full blur-xl animate-bubble-float delay-300" />
                    
                    {/* Liquid flow effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-hl-green/[0.02] to-transparent
                                    animate-liquid-flow opacity-50" />
                  </div>

                  {/* Very subtle permanent glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-hl-green/[0.01] to-transparent 
                                  opacity-30 blur-xl" />

                  {/* Content container */}
                  <div className="relative z-10">
                    {/* Status badge with permanent glow */}
                    <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4
                      shadow-[0_0_15px_-5px_rgba(0,255,176,0.3)]
                      ${phase.status === 'Phase 1' 
                        ? 'bg-gradient-to-r from-hl-green/30 to-hl-green/10 text-hl-green border border-hl-green/30' 
                        : phase.status === 'soon'
                          ? 'bg-gradient-to-r from-hl-green/20 to-hl-green/5 text-hl-green/90 border border-hl-green/20'
                          : 'bg-gradient-to-r from-white/10 to-transparent text-white/80 border border-white/10'
                      }`}
                    >
                      {phase.status === 'Phase 1' ? 'Phase 1'
                        : phase.status === 'soon' ? '🔜 Coming Soon' 
                        : '📋 Planned'}
                    </div>

                    {/* Title with permanent gradient */}
                    <h3 className="text-2xl font-bold mb-3 
                                   bg-gradient-to-r from-white via-white to-gray-200 
                                   bg-clip-text text-transparent 
                                   group-hover:text-hl-green
                                   transition-colors duration-500">
                      {phase.title}
                    </h3>

                    {/* Description with better contrast */}
                    <p className="text-gray-200 mb-4 group-hover:text-white transition-colors duration-500">
                      {phase.description}
                    </p>

                    {/* Features with glowing dots */}
                    <div className="space-y-3">
                      {phase.features.map((feature, i) => (
                        <div key={i} 
                             className="text-gray-300 text-sm flex items-center gap-3
                                        group-hover:text-white transition-colors duration-500">
                          <div className="w-2 h-2 rounded-full 
                                         bg-gradient-to-r from-hl-green/60 to-hl-green/40
                                         shadow-[0_0_10px_rgba(0,255,176,0.3)]
                                         group-hover:shadow-[0_0_12px_rgba(0,255,176,0.4)]
                                         group-hover:scale-110
                                         transition-all duration-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 