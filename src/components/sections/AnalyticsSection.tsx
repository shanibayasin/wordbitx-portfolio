import React from 'react';
import { BarChart3, CircleDollarSign, GitBranch, Target } from 'lucide-react';

const reportMetrics = [
  { label: 'Win rate', detail: 'See the share of deals won.', icon: Target },
  { label: 'Lead source conversion', detail: 'Compare conversion across lead sources.', icon: GitBranch },
  { label: 'Revenue', detail: 'Review revenue from won deals.', icon: CircleDollarSign },
  { label: 'Deals by stage', detail: 'See how deals are distributed across stages.', icon: BarChart3 },
];

export const AnalyticsSection: React.FC = () => (
  <section
    aria-labelledby="analytics-title"
    className="border-b border-slate-200/80 bg-[#f5f8f6] py-20 dark:border-[#183932] dark:bg-[#071714] md:py-28"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            Reports
          </div>
          <h2 id="analytics-title" className="text-balance font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
            A clear view of sales performance.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300">
            Review win rate, lead source conversion, revenue, and deals by stage in your reports.
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Sample data
        </span>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reportMetrics.map(({ label, detail, icon: Icon }) => (
          <article
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-[#183932] dark:bg-[#0e2722]"
          >
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Icon aria-hidden="true" className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
              <h3 className="text-[11px] font-semibold">{label}</h3>
            </div>
            <div className="mt-3 text-lg font-bold text-slate-800 dark:text-white">Preview</div>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">{detail}</p>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-[#183932] dark:bg-[#0e2722] lg:col-span-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-950 dark:text-white">Revenue from won deals</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Sample report layout</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Sample revenue report fields">
            {['Reporting period', 'Won deals', 'Revenue'].map((label) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
                <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{label}</div>
                <div className="mt-2 h-5 rounded bg-slate-200/80 dark:bg-white/10" aria-hidden="true" />
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-zinc-300">
            Report values come from the records in your workspace.
          </div>
        </section>

        <div className="space-y-6 lg:col-span-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-[#183932] dark:bg-[#0e2722]">
            <h3 className="text-xs font-semibold text-slate-950 dark:text-white">Lead source conversion</h3>
            <div className="mt-4 space-y-2">
              {['Lead source', 'Converted leads', 'Conversion rate'].map((label) => (
                <div key={label} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-[10px] text-slate-600 dark:bg-white/5 dark:text-zinc-300">
                  <span>{label}</span>
                  <span className="h-3 w-12 rounded bg-slate-200 dark:bg-white/10" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-[#183932] dark:bg-[#0e2722]">
            <h3 className="text-xs font-semibold text-slate-950 dark:text-white">Deals by stage</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {['Stage', 'Deal count', 'Deal value'].map((label) => (
                <span key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] text-slate-600 dark:border-white/5 dark:bg-white/5 dark:text-zinc-300">
                  {label}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
);
