import React from 'react';
import { ArrowUpRight, BarChart3, Target, UsersRound } from 'lucide-react';
import { DEMO_DEALS, DEMO_REPORT_METRICS, DEMO_REVENUE, DEMO_SOURCES } from '../demo/sampleData';

const chartPoints = DEMO_REVENUE.map((point, index) => `${35 + index * 70},${145 - point.revenue * 1.45}`).join(' ');
const chartArea = `M35,145 L${chartPoints.replaceAll(' ', ' L')} L385,145 Z`;
const formatCurrency = (value: number) => `$${value.toLocaleString('en-US')}`;

const metrics = [
  {
    label: 'Open deals',
    value: String(DEMO_REPORT_METRICS.openDeals),
    detail: 'Demo data',
    icon: BarChart3,
    tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300',
  },
  {
    label: 'Pipeline value',
    value: formatCurrency(DEMO_REPORT_METRICS.openPipeline),
    detail: `${DEMO_REPORT_METRICS.openDeals} open deals`,
    icon: BarChart3,
    tone: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300',
  },
  {
    label: 'New leads this week',
    value: String(DEMO_REPORT_METRICS.newLeadsThisWeek),
    detail: 'Demo data',
    icon: UsersRound,
    tone: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300',
  },
  {
    label: 'Win rate',
    value: `${DEMO_REPORT_METRICS.winRate}%`,
    detail: 'Demo data',
    icon: Target,
    tone: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300',
  },
];

export const AnalyticsSection: React.FC = () => (
  <section
    id="reports"
    aria-labelledby="analytics-title"
    className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f6f8f7] py-16 dark:border-white/10 dark:bg-[#0b1510] lg:py-24"
  >
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,.08),transparent_72%)]" />
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <div className="mb-7 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Sales analytics</p>
          <h2 id="analytics-title" className="mt-2 text-balance font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl">
            A clear view of sales performance.
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
            See revenue, pipeline health, and team progress at a glance.
          </p>
        </div>
        <span className="w-fit rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-200">
          Sample data
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
          <article key={label} className="flex min-w-0 items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101a15] sm:p-5">
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-2 truncate font-mono text-xl font-semibold tabular-nums tracking-tight text-slate-950 dark:text-white">{value}</p>
              <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{detail}</p>
            </div>
            <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon aria-hidden="true" className="h-4 w-4" />
            </span>
          </article>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101a15] sm:p-5 lg:col-span-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Revenue performance</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Monthly won revenue · USD thousands</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100">Sample data</span>
          </div>
          <div className="mt-3 rounded-xl bg-[#f8faf9] px-2 pt-2 dark:bg-white/[0.025] sm:px-3">
            <svg
              role="img"
              aria-label="Sample revenue chart showing growth from 28 thousand dollars in May to 72 thousand dollars in October"
              viewBox="0 0 420 190"
              className="h-44 w-full sm:h-48"
            >
              <defs>
                <linearGradient id="salesRevenueArea" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity=".2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[35, 75, 115, 155].map((y) => (
                <line key={y} x1="25" x2="400" y1={y} y2={y} stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeDasharray="3 5" />
              ))}
              <path d={chartArea} fill="url(#salesRevenueArea)" />
              <polyline points={chartPoints} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              {DEMO_REVENUE.map((point, index) => (
                <g key={point.month}>
                  <circle cx={35 + index * 70} cy={145 - point.revenue * 1.45} r="4" fill="#10b981" stroke="white" strokeWidth="2" />
                  <text x={35 + index * 70} y="178" textAnchor="middle" className="fill-slate-500 text-xs dark:fill-slate-400">{point.month}</text>
                </g>
              ))}
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-slate-100 px-3 py-2.5 dark:border-white/10">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Revenue this month</p>
              <p className="mt-0.5 font-mono text-lg font-semibold tabular-nums text-slate-950 dark:text-white">{formatCurrency(DEMO_REPORT_METRICS.monthlyWonRevenue)}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-300/10 dark:text-emerald-300">
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              Trending up
            </span>
          </div>
        </article>

        <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101a15] sm:p-5 lg:col-span-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Win rate</h3>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Share of deals won · Sample data</p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center py-4">
            <div className="relative grid h-36 w-36 place-items-center">
              <svg role="img" aria-label={`Sample win rate: ${DEMO_REPORT_METRICS.winRate} percent`} viewBox="0 0 112 112" className="h-full w-full -rotate-90">
                <circle cx="56" cy="56" r="43" fill="none" stroke="currentColor" strokeWidth="9" className="text-slate-100 dark:text-white/10" />
                <circle cx="56" cy="56" r="43" fill="none" stroke="#10b981" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${(DEMO_REPORT_METRICS.winRate / 100) * 270.18} 270.18`} />
              </svg>
              <div className="absolute text-center">
                <p className="font-mono text-2xl font-semibold tabular-nums tracking-tight text-slate-950 dark:text-white">{DEMO_REPORT_METRICS.winRate}%</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">win rate</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-[#f8faf9] px-3 py-2.5 text-center dark:bg-white/[0.035]">
            <p className="text-xs text-slate-600 dark:text-slate-300">Illustrative demo data</p>
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101a15] sm:p-5 lg:col-span-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Lead source performance</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Conversion to qualified leads</p>
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Sample data</span>
          </div>
          <div className="mt-5 space-y-4">
            {DEMO_SOURCES.map((source) => (
              <div key={source.name}>
                <div className="mb-1.5 flex justify-between gap-3 text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-200">{source.name}<span className="ml-1.5 font-normal text-slate-400">{source.leads} leads</span></span>
                  <span className="font-mono font-medium tabular-nums text-slate-800 dark:text-white">{source.rate}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div className="h-full rounded-full bg-emerald-500" style={{ width: `${source.rate * 2.4}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#101a15] sm:p-5 lg:col-span-7">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Open opportunities</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Deals that need a next step</p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-100">Demo data · {DEMO_REPORT_METRICS.openDeals} active</span>
          </div>
          <div className="mt-4 divide-y divide-slate-100 dark:divide-white/10">
            {DEMO_DEALS.slice(0, 3).map((deal) => (
              <div key={deal.company} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-50 text-xs font-semibold text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-200">{deal.owner}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-800 dark:text-slate-100">{deal.company}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{deal.title} · {deal.stage}</p>
                  </div>
                </div>
                <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-slate-900 dark:text-white">{formatCurrency(deal.value)}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">Illustrative values for product preview only · Demo data</p>
    </div>
  </section>
);
