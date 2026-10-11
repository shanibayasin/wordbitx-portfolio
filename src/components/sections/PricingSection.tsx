import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PRICING_TIERS } from '../../data/pricingData';
import { Button } from '../ui/Button';
import { useNavigation } from '../../context/NavigationContext';

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);
  const { navigate } = useNavigation();

  return (
    <section id="pricing" className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f6f8f7] py-16 dark:border-white/10 dark:bg-[#0b1510] lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,.07),transparent_74%)]" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Straightforward plans</p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">Find your team’s starting point.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">Compare illustrative plan options while you explore the product.</p>
          <p className="mt-3 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-200">Demo pricing, billing not live</p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 text-xs dark:border-white/10 dark:bg-white/[0.03]">
            <span className={`px-2 ${!isYearly ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button type="button" onClick={() => setIsYearly((value) => !value)} aria-label="Toggle annual equivalent pricing" aria-pressed={isYearly} className={`relative h-7 w-12 rounded-full p-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${isYearly ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-600'}`}><span className={`block h-5 w-5 rounded-full bg-white shadow transition-transform ${isYearly ? 'translate-x-5' : ''}`} /></button>
            <span className={`px-2 ${isYearly ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-500'}`}>Annual equivalent</span>
          </div>
        </div>
        <div className="grid items-stretch gap-5 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => {
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;
            return <article key={tier.id} className={`relative flex flex-col rounded-3xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl dark:bg-[#101a15] sm:p-7 ${tier.popular ? 'border-emerald-400 shadow-lg ring-1 ring-emerald-400/20 dark:border-emerald-300/35' : 'border-slate-200 shadow-sm dark:border-white/10'}`}>
              {tier.popular && <span className="absolute right-5 top-5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200">{tier.badge || 'Popular'}</span>}
              <div><h3 className="text-lg font-semibold text-slate-950 dark:text-white">{tier.name}</h3><p className="mt-2 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">{tier.tagline}</p></div>
              <div className="mt-7 flex items-baseline gap-1"><span className="font-mono text-4xl font-semibold tracking-tight tabular-nums text-slate-950 dark:text-white">${price}</span><span className="text-xs text-slate-500">/ user / mo</span></div>
              <p className="mt-1 text-xs text-slate-500">{isYearly ? 'Annual equivalent · demo only' : 'Monthly display · demo only'}</p>
              <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />
              <ul className="flex-1 space-y-3">{tier.features.slice(0, 5).map((feature) => <li key={feature} className="flex gap-2.5 text-xs leading-relaxed text-slate-600 dark:text-slate-300"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />{feature}</li>)}</ul>
              <Button variant={tier.popular ? 'primary' : 'outline'} size="md" onClick={() => navigate(tier.id === 'enterprise' ? '/contact' : '/demo')} className={`mt-7 min-h-11 w-full justify-center rounded-xl ${tier.popular ? 'border-emerald-600 bg-emerald-600 text-white hover:border-emerald-700 hover:bg-emerald-700 dark:border-emerald-400 dark:bg-emerald-400 dark:text-[#062015] dark:hover:bg-emerald-300' : 'dark:border-white/15 dark:bg-white/[0.04] dark:text-white'}`}>{tier.id === 'enterprise' ? 'Talk to our team' : 'Try the live demo'}<ArrowRight className="h-4 w-4" /></Button>
            </article>;
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <button type="button" onClick={() => navigate('/pricing')} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition hover:border-emerald-500 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-emerald-300 dark:hover:text-emerald-200">
            Compare all plans<ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">Prices and plans are illustrative only. Billing and plan limits are not live or enforced.</p>
      </div>
    </section>
  );
};
