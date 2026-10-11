export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  tagline: string;
  priceMonthly: number;
  priceYearly: number;
  popular?: boolean;
  ctaText: string;
  features: string[];
  limitations?: string[];
}

const currentCapabilities = [
  'Lead, customer, and company records',
  'Kanban deal pipeline and deal values',
  'Call logs, tasks, notes, and activity history',
  'Organization roles and workflow rules',
  'Reports for win rate, lead source conversion, revenue, and deals by stage'
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Illustrative plan for product evaluation.',
    priceMonthly: 39,
    priceYearly: 29,
    ctaText: 'Try the demo',
    features: currentCapabilities
  },
  {
    id: 'business',
    name: 'Business',
    tagline: 'Illustrative plan for product evaluation.',
    priceMonthly: 99,
    priceYearly: 79,
    popular: true,
    ctaText: 'Try the demo',
    features: currentCapabilities
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Illustrative plan for product evaluation.',
    priceMonthly: 189,
    priceYearly: 149,
    ctaText: 'Contact us',
    features: currentCapabilities
  }
];

export interface ComparisonCategory {
  category: string;
  features: {
    name: string;
    starter: string | boolean;
    business: string | boolean;
    enterprise: string | boolean;
  }[];
}

const available = 'Available in the current product';
const comingSoon = 'Coming soon';

export const PRICING_COMPARISON: ComparisonCategory[] = [
  {
    category: 'Current CRM features',
    features: [
      { name: 'Lead, customer, and company records', starter: available, business: available, enterprise: available },
      { name: 'Kanban deals and deal values', starter: available, business: available, enterprise: available },
      { name: 'Call logs, tasks, notes, and activity history', starter: available, business: available, enterprise: available },
      { name: 'Organization roles and workflow rules', starter: available, business: available, enterprise: available },
      { name: 'Win rate, lead source conversion, revenue, and deals by stage reports', starter: available, business: available, enterprise: available }
    ]
  },
  {
    category: 'Not available yet',
    features: [
      { name: 'Live telephony and call recording', starter: comingSoon, business: comingSoon, enterprise: comingSoon },
      { name: 'Support tickets and SLA timers', starter: comingSoon, business: comingSoon, enterprise: comingSoon },
      { name: 'AI assistance and scoring', starter: comingSoon, business: comingSoon, enterprise: comingSoon },
      { name: 'Billing and enforced plan limits', starter: comingSoon, business: comingSoon, enterprise: comingSoon }
    ]
  }
];
