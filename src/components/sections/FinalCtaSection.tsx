import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const FinalCtaSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="relative isolate overflow-hidden bg-[#06130f] px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_100%,rgba(16,185,129,.12),transparent_60%)]" />
      <div className="relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-emerald-200/15 bg-[#071510] px-6 py-12 text-center shadow-[0_30px_90px_-35px_rgba(0,0,0,.7)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,.2),transparent_55%)]" />
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-20" />
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-emerald-100/80"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />One calm place for customer work</span>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-3xl font-semibold tracking-[-.05em] sm:text-4xl lg:text-5xl">Make every next step feel clear.</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">Explore the lead, pipeline, call log, and follow-up experience using clearly labeled demo data.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={() => navigate('/demo')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 text-sm font-semibold text-[#062015] transition hover:-translate-y-0.5 hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Try the live demo<ArrowRight className="h-4 w-4" /></button>
          <button type="button" onClick={() => navigate('/features')} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white transition hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200"><Check className="h-4 w-4 text-emerald-300" />Explore current features</button>
        </div>
        <p className="mt-4 text-xs text-white/65">No claim of a real booking or workspace creation from this preview.</p>
      </div>
    </section>
  );
};
