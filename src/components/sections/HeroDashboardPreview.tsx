import React from 'react';
import { ArrowUpRight, Bell, ChevronDown, Command, Search } from 'lucide-react';
import { DEMO_DEALS, DEMO_LEADS, DEMO_REPORT_METRICS } from '../demo/sampleData';

const formatValue = (value: number) => `$${(value / 1000).toFixed(1)}k`;

export const HeroDashboardPreview: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[1180px] [perspective:1800px]">
    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-12 -bottom-12 -top-10 rounded-[48px] bg-emerald-500/20 blur-[90px]" />
    <div className="relative [transform:rotateX(4deg)_rotateY(-3deg)] rounded-[24px] border border-white/15 bg-[#0b1813]/95 p-2 shadow-[0_40px_120px_-35px_rgba(0,0,0,.9)] backdrop-blur-xl sm:p-3">
      <div className="overflow-hidden rounded-[17px] border border-white/10 bg-[#0e1914]">
        <div className="flex h-12 items-center gap-3 border-b border-white/10 bg-[#101c16] px-3 sm:px-5">
          <div aria-hidden="true" className="hidden gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-white/80">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-400 text-xs font-black text-[#062015]">W</span>
            <span className="truncate">Northstar workspace</span>
            <ChevronDown className="h-3.5 w-3.5 text-white/40" />
          </div>
          <div className="ml-auto hidden h-8 w-48 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 text-xs text-white/40 sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search anything</span>
            <span className="ml-auto inline-flex items-center gap-0.5 rounded border border-white/10 px-1 py-0.5"><Command className="h-2.5 w-2.5" /> K</span>
          </div>
          <button aria-label="Notifications" className="ml-auto rounded-lg p-2 text-white/55 hover:bg-white/5 sm:ml-0">
            <Bell className="h-4 w-4" />
          </button>
          <span aria-label="Demo user" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 bg-indigo-300/20 text-xs font-bold text-indigo-100">JD</span>
        </div>

        <div className="grid min-h-[440px] grid-cols-[52px_minmax(0,1fr)] sm:grid-cols-[168px_minmax(0,1fr)]">
          <aside aria-label="Illustrative CRM navigation" className="border-r border-white/10 bg-[#0b1510] p-2 sm:p-3">
            <div className="mb-4 hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-2 text-xs font-medium text-white/65 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Revenue team
              <ChevronDown className="ml-auto h-3 w-3" />
            </div>
            <nav className="space-y-1 text-xs font-medium sm:text-xs">
              {[
                ['Overview', '⌂'],
                ['Leads', '◎'],
                ['Pipeline', '▦'],
                ['Customers', '◌'],
                ['Tasks', '✓'],
                ['Reports', '⌁'],
              ].map(([label, icon]) => (
                <div key={label} className={`flex h-9 items-center justify-center gap-2 rounded-lg sm:justify-start sm:px-2 ${label === 'Overview' ? 'bg-emerald-400/12 text-emerald-300 ring-1 ring-inset ring-emerald-300/10' : 'text-white/50'}`}>
                  <span aria-hidden="true" className="text-sm">{icon}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              ))}
            </nav>
            <div className="mt-5 hidden border-t border-white/10 pt-4 sm:block">
              <div className="px-2 text-xs font-semibold uppercase tracking-[.16em] text-white/30">Workspace</div>
              <div className="mt-2 flex items-center gap-2 px-2 text-xs text-white/50"><span className="h-2 w-2 rounded-full bg-cyan-300" /> Northstar Health</div>
            </div>
          </aside>

          <main className="min-w-0 bg-[#101b15] p-3 sm:p-5">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <div className="text-xs text-white/40">Monday, October 12, 2026</div>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">Good morning, Jordan</h2>
                <p className="mt-1 text-xs text-white/45 sm:text-xs">Here’s what’s moving across your pipeline.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-white/55 sm:text-xs">
                This month <ChevronDown className="h-3 w-3" />
              </div>
            </div>

            <div className="mb-3 flex items-center justify-end">
              <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-xs font-medium text-emerald-200">Demo data</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
              {[
                ['Open pipeline', `$${DEMO_REPORT_METRICS.openPipeline.toLocaleString()}`, '+8.4%', 'text-emerald-300'],
                ['Active deals', String(DEMO_REPORT_METRICS.activeDeals), '6 closing soon', 'text-cyan-200'],
                ['New leads', String(DEMO_REPORT_METRICS.newLeadsThisMonth), 'This month', 'text-indigo-200'],
                ['Win rate', `${DEMO_REPORT_METRICS.winRate}%`, '+3.2 pts', 'text-emerald-300'],
              ].map(([label, value, detail, accent]) => (
                <div key={label} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-3.5">
                  <div className="truncate text-xs text-white/45 sm:text-xs">{label}</div>
                  <div className="mt-2 font-mono text-base font-semibold tabular-nums tracking-tight text-white sm:text-xl">{value}</div>
                  <div className={`mt-1 text-xs font-medium ${accent}`}>{detail}</div>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
              <section aria-label="Sample lead activity" className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-white sm:text-sm">Recently active leads</h3>
                    <p className="mt-1 text-xs text-white/40">Latest updates from your team</p>
                  </div>
                  <button aria-label="View lead activity" className="rounded-md p-1.5 text-white/40 hover:bg-white/5"><ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
                <div className="space-y-1">
                  {DEMO_LEADS.slice(0, 3).map((lead, index) => (
                    <div key={lead.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-1 py-2.5 sm:grid-cols-[minmax(0,1.25fr)_minmax(70px,.9fr)_auto]">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${['bg-emerald-300/15 text-emerald-200', 'bg-indigo-300/15 text-indigo-200', 'bg-cyan-300/15 text-cyan-100'][index]}`}>{lead.initials}</span>
                        <div className="min-w-0">
                          <div className="truncate text-xs font-medium text-white sm:text-xs">{lead.name}</div>
                          <div className="truncate text-xs text-white/40">{lead.company}</div>
                        </div>
                      </div>
                      <div className="hidden truncate text-xs text-white/50 sm:block">{lead.source}</div>
                      <div className="text-right">
                        <div className="font-mono text-xs tabular-nums text-white/75">{formatValue(lead.value)}</div>
                        <div className="mt-1 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-1.5 py-0.5 text-xs text-white/55">{lead.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section aria-label="Sample pipeline stages" className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-white sm:text-sm">Pipeline snapshot</h3>
                    <p className="mt-1 text-xs text-white/40">{DEMO_REPORT_METRICS.activeDeals} open opportunities</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/45">Sample</span>
                </div>
                <div className="space-y-2.5">
                  {DEMO_DEALS.slice(0, 4).map((deal, index) => (
                    <div key={deal.company}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                        <span className="truncate text-white/65">{deal.stage}</span>
                        <span className="shrink-0 font-mono text-white/45">{formatValue(deal.value)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div className={`h-full rounded-full ${['bg-emerald-400', 'bg-cyan-300', 'bg-indigo-300', 'bg-emerald-200'][index]}`} style={{ width: `${[84, 65, 72, 48][index]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>

    <div aria-hidden="true" className="absolute -left-3 top-[28%] hidden animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-[#14251c]/90 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:block lg:-left-8">
      <div className="text-xs text-white/45">New lead</div>
      <div className="mt-1 text-xs font-semibold">Olivia Chen</div>
      <div className="mt-1 text-xs text-emerald-300">Northstar Health</div>
    </div>
    <div aria-hidden="true" className="absolute -right-2 top-[22%] hidden animate-[float_7s_ease-in-out_infinite] rounded-2xl border border-white/15 bg-[#14251c]/90 px-4 py-3 text-white shadow-xl backdrop-blur-xl sm:block lg:-right-8">
      <div className="text-xs text-white/45">Deal moved</div>
      <div className="mt-1 text-xs font-semibold">Cedar &amp; Finch</div>
      <div className="mt-1 text-xs text-cyan-200">Proposal → Negotiation</div>
    </div>
  </div>
);
