import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStrip } from '../components/sections/TrustStrip';
import { AnalyticsSection } from '../components/sections/AnalyticsSection';
import { MultiWorkspaceSection } from '../components/sections/MultiWorkspaceSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';
import { ProductTourSection } from '../components/sections/ProductTourSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <HeroSection />
      <TrustStrip />
      <ProductTourSection />
      <AnalyticsSection />
      <MultiWorkspaceSection />
      <PricingSection />
      <FaqSection />
      <FinalCtaSection />
    </div>
  );
};
