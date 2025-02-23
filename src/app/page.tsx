'use client';

import LiquidBackground from '../components/layout/LiquidBackground';
import HeroSection from '../components/landingpage/HeroSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import dynamic from 'next/dynamic';
import FinalCTA from '../components/landingpage/FinalCTA';
import WhySection from '../components/landingpage/WhySection';
import SocialBannerSection from '../components/landingpage/SocialBannerSection';
import '../styles/globals.css';

// Dynamically import heavy components
const PartnersSection = dynamic(() => import('../components/landingpage/PartnersSection'), {
  loading: () => <div>Loading...</div>,
  ssr: false
})

const RoadmapSection = dynamic(() => import('../components/landingpage/RoadmapSection'), {
  loading: () => <div>Loading...</div>
})

export default function Home() {
  return (
    <main className="relative min-h-screen pt-16">
      <LiquidBackground />
      <div className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <WhySection />
        <RoadmapSection />
        <PartnersSection />
        <SocialBannerSection />
        <FinalCTA />
      </div>
    </main>
  );
}
