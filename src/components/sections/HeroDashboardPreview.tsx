import React from 'react';
import { ArrowUpRight, Bell, ChevronDown, Command, Search } from 'lucide-react';
import { DEMO_CALLS, DEMO_DEALS, DEMO_LEADS, DEMO_REPORT_METRICS } from '../demo/sampleData';

const formatValue = (value: number) => `$${value.toLocaleString('en-US')}`;

export const HeroDashboardPreview: React.FC = () => (
  <div className="relative mx-auto w-full max-w-[1360px] [perspective:1800px]">
    <div aria-hidden="true" className="pointer-events-none absolute -inset-x-12 -bottom-16 -top-10 rounded-[48px] bg-emerald-400/30 blur-[100px]" />
    <div className="relative [transform:rotateX(4deg)_rotateY(-2deg)_scale(1.04)] rounded-[28px] border border-white/20 bg-[#102219]/95 p-2 shadow-[0_48px_140px_-32px_rgba(0,0,0,.85)] backdrop-blur-xl sm:p-4 lg:[transform:rotateX(4deg)_rotateY(-2deg)_scale(1.08)]">
      <div className="overflow-hidden rounded-[20px] border border-white/15 bg-[#12251c] shadow-[inset_0_1px_0_rgba(255,255,255,.08)]">
        <div className="flex h-12 items-center gap-3 border-b border-white/10 bg-[#101c16] px-3 sm:px-5">
          <div aria-hidden="true" className="hidden gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="flex min-w-0 items-center gap-2 text-xs font-semibold text-white/80">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-400 text-xs font-black text-[#062015]">W</span>
            <span className="truncate">Cortexa workspace</span>
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
          <span aria-label="Demo user" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-emerald-200/20 bg-emerald-300/15 text-xs font-bold text-emerald-100">JD</span>
        </div>

        <div className="grid min-h-[500px] grid-cols-[52px_minmax(0,1fr)] sm:min-h-[570px] sm:grid-cols-[180px_minmax(0,1fr)]">
          <aside aria-label="Illustrative CRM navigation" className="border-r border-white/10 bg-[#0b1711] p-2 sm:p-4">
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
              <div className="mt-2 flex items-center gap-2 px-2 text-xs text-white/75"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Cortexa Health</div>
            </div>
          </aside>

          <main className="min-w-0 bg-[#14271e] p-3 sm:p-6">
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
                ['Pipeline value', `$${DEMO_REPORT_METRICS.openPipeline.toLocaleString()}`, 'Demo data', 'text-emerald-300'],
                ['Open deals', String(DEMO_REPORT_METRICS.openDeals), 'Demo data', 'text-cyan-200'],
                ['New leads this week', String(DEMO_REPORT_METRICS.newLeadsThisWeek), 'Demo data', 'text-emerald-200'],
                ['Win rate', `${DEMO_REPORT_METRICS.winRate}%`, 'Demo data', 'text-emerald-300'],
              ].map(([label, value, detail, accent]) => (
                <div key={label} className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] p-3 sm:p-3.5">
                  <div className="truncate text-xs text-white/75">{label}</div>
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
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">Demo data</span>
                  <button aria-label="View lead activity" className="rounded-md p-1.5 text-white/40 hover:bg-white/5"><ArrowUpRight className="h-3.5 w-3.5" /></button>
                </div>
                <div className="space-y-1">
                  {DEMO_LEADS.slice(0, 3).map((lead, index) => (
                    <div key={lead.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-1 py-2.5 sm:grid-cols-[minmax(0,1.25fr)_minmax(70px,.9fr)_auto]">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-300/15 text-xs font-bold text-emerald-100">{lead.initials}</span>
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
                    <p className="mt-1 text-xs text-white/60">{DEMO_REPORT_METRICS.openDeals} open opportunities</p>
                  </div>
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">Demo data</span>
                </div>
                <div className="space-y-2.5">
                  {DEMO_DEALS.map((deal, index) => (
                    <div key={deal.company}>
                      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                        <span className="truncate text-white/80">{deal.stage}</span>
                        <span className="shrink-0 font-mono text-white/75">{formatValue(deal.value)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <div className={`h-full rounded-full ${['bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200'][index]}`} style={{ width: `${[84, 65, 72][index]}%` }} />
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

    <div aria-hidden="true" className="absolute -left-2 top-[14%] hidden animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/20 bg-[#14251c]/90 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-xl sm:block lg:-left-10">
      <div className="text-xs font-semibold text-emerald-200">DEMO DATA</div>
      <div className="mt-1 text-xs text-white/65">New leads this week</div>
      <div className="mt-1 font-mono text-lg font-semibold tabular-nums">36</div>
    </div>
    <div aria-hidden="true" className="absolute -right-2 top-[16%] hidden animate-[float_7s_ease-in-out_infinite] rounded-2xl border border-white/20 bg-[#14251c]/90 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-xl sm:block lg:-right-10">
      <div className="text-xs font-semibold text-emerald-200">DEMO DATA</div>
      <div className="mt-1 text-xs text-white/65">Open deals</div>
      <div className="mt-1 font-mono text-lg font-semibold tabular-nums">42</div>
    </div>
    <div aria-hidden="true" className="absolute -top-8 left-[42%] hidden animate-[float_8s_ease-in-out_infinite] rounded-2xl border border-white/20 bg-[#14251c]/90 px-4 py-3 text-white shadow-[0_18px_50px_rgba(0,0,0,.35)] backdrop-blur-xl sm:block">
      <div className="text-xs font-semibold text-emerald-200">DEMO DATA</div>
      <div className="mt-1 text-xs text-white/65">Pipeline value</div>
      <div className="mt-1 font-mono text-lg font-semibold tabular-nums">$384,500</div>
    </div>

    <div aria-hidden="true" className="absolute -bottom-6 -left-2 z-20 hidden w-[290px] rounded-2xl border border-white/20 bg-[#102219]/95 p-3 text-white shadow-[0_24px_70px_rgba(0,0,0,.55)] backdrop-blur-xl lg:-left-6 lg:block">
      <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-white">Pipeline board</span><span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">Demo data</span></div>
      <div className="grid grid-cols-3 gap-2">
        {DEMO_DEALS.map((deal) => (
          <div key={deal.company} className="min-w-0 rounded-lg border border-white/10 bg-white/[0.05] p-2">
            <span className="block truncate text-xs font-medium text-white/70">{deal.stage}</span>
            <span className="mt-2 block truncate text-xs font-semibold text-white">{deal.company}</span>
            <span className="mt-1 block font-mono text-xs text-emerald-200">{formatValue(deal.value)}</span>
          </div>
        ))}
      </div>
    </div>
    <div aria-hidden="true" className="absolute -bottom-8 -right-2 z-20 hidden w-[310px] rounded-2xl border border-white/20 bg-[#102219]/95 p-4 text-white shadow-[0_24px_70px_rgba(0,0,0,.55)] backdrop-blur-xl lg:-right-6 lg:block">
      <div className="mb-3 flex items-center justify-between"><span className="text-xs font-semibold text-white">Recent calls</span><span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 text-xs text-emerald-100">Demo data</span></div>
      {DEMO_CALLS.slice(0, 2).map((call) => (
        <div key={call.company} className="flex items-center justify-between gap-3 border-t border-white/10 py-2 first:border-0 first:pt-0">
          <div className="min-w-0"><span className="block truncate text-xs font-medium">{call.company}</span><span className="block text-xs text-white/60">{call.time} · {call.duration}</span></div>
          <span className="shrink-0 text-xs text-emerald-200">Logged</span>
        </div>
      ))}
    </div>
  </div>
);
