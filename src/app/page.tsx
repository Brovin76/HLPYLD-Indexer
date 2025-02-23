'use client';

import LiquidBackground from '../components/layout/LiquidBackground';
import HeroSection from '../components/landingpage/HeroSection';
import FeaturesSection from '../components/landingpage/FeaturesSection';
import RoadmapSection from '../components/landingpage/RoadmapSection';
import PartnersSection from '../components/landingpage/PartnersSection';
import FinalCTA from '../components/landingpage/FinalCTA';
import WhySection from '../components/landingpage/WhySection';
import SocialBannerSection from '../components/landingpage/SocialBannerSection';
import '../styles/globals.css';

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
