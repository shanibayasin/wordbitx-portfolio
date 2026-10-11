import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

export const FinalCtaSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section className="px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
      <div className="relative isolate mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 overflow-hidden rounded-xl border border-emerald-900/40 bg-[#06100e] px-5 py-6 text-white shadow-xl sm:rounded-2xl sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:gap-10 lg:px-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_50%,rgba(16,185,129,0.16),transparent_42%),linear-gradient(105deg,#071714_0%,#0b1f1b_55%,#08120f_100%)]"
      />
        <div className="relative max-w-2xl">
          <span className="mb-2 inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-[9px]">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Get started today
          </span>
          <h2 className="text-balance font-display text-xl font-bold leading-[1.12] tracking-tight text-white sm:text-2xl lg:text-[1.75rem]">
            Bring leads, deals, and customer calls into one view.
          </h2>
          <p className="mt-2 max-w-xl text-[10px] leading-relaxed text-emerald-100/75 sm:text-xs">
            Track lead sources, move deals through Kanban stages, log calls, and manage follow-ups with your team.
          </p>
        </div>

        <div className="relative w-full shrink-0 sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('/demo')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 py-2.5 text-[10px] font-bold text-[#071714] shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:w-auto sm:min-w-36 sm:px-5 sm:text-xs"
          >
            Try the live demo
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
