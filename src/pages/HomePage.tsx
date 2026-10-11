import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStrip } from '../components/sections/TrustStrip';
import { CustomerOperationsSection } from '../components/sections/CustomerOperationsSection';
import { AlternatingFeatureShowcase } from '../components/sections/AlternatingFeatureShowcase';
import { IntegrationHighlightsSection } from '../components/sections/IntegrationHighlightsSection';
import { AnalyticsSection } from '../components/sections/AnalyticsSection';
import { MultiWorkspaceSection } from '../components/sections/MultiWorkspaceSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FaqSection } from '../components/sections/FaqSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      {/* 3. Hero + 4. Interactive CRM Preview */}
      <HeroSection />
      {/* 5. Trusted businesses */}
      <TrustStrip />
      {/* 7. Customer operations overview */}
      <CustomerOperationsSection />
      {/* 8. Interactive sales, calls, and lead showcase */}
      <AlternatingFeatureShowcase />
      {/* 16. Analytics */}
      <AnalyticsSection />
      {/* 21. Integration highlights */}
      <IntegrationHighlightsSection />
      {/* Multi-workspace, roles, and security facts */}
      <MultiWorkspaceSection />
      {/* 27. Pricing Preview */}
      <PricingSection />
      {/* 28. FAQ Preview */}
      <FaqSection />
      {/* Final call to action above the footer */}
      <FinalCtaSection />
    </div>
  );
};
