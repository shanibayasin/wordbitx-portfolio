import React from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  CalendarClock,
  BriefcaseBusiness,
  CircleDollarSign,
  CheckSquare,
  ChevronDown,
  CircleHelp,
  GitBranch,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Sparkles,
  Search,
  Settings,
  UsersRound,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const navigationItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Leads', icon: UsersRound, active: true },
  { label: 'Deals', icon: BriefcaseBusiness },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Reports', icon: BarChart3 },
];

const metrics = [
  { label: 'New leads', value: '248', change: '+12.8%', color: 'text-[#167d68]', icon: UsersRound },
  { label: 'Active deals', value: '36', change: 'On track', color: 'text-[#167d68]', icon: BriefcaseBusiness },
  { label: 'Conversion rate', value: '34%', change: '+4.2%', color: 'text-[#167d68]', icon: GitBranch },
  { label: 'Revenue won', value: '$48,250', change: 'This month', color: 'text-[#167d68]', icon: CircleDollarSign },
];

export const HeroDashboardPreview: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
  <motion.div
    role="group"
    aria-label="Illustrative CRM dashboard preview with sample data"
    whileHover={shouldReduceMotion ? undefined : { y: -3 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_55px_-28px_rgba(18,49,42,0.28)] dark:border-[#323250] dark:bg-[#20203a]"
  >
    <div className="flex h-11 items-center gap-3 border-b border-slate-200 bg-white px-3.5 dark:border-[#323250] dark:bg-[#20203a] sm:px-4">
      <div aria-hidden="true" className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ef6b63]" />
        <span className="h-2 w-2 rounded-full bg-[#f2c45d]" />
        <span className="h-2 w-2 rounded-full bg-[#5fbd8d]" />
      </div>
      <div className="h-4 w-px bg-slate-200 dark:bg-[#323250]" />
      <div className="flex min-w-0 items-center gap-2 text-[10px] font-semibold text-slate-700 dark:text-slate-200 sm:text-[11px]">
        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[#e8f4f0] text-[10px] font-extrabold text-[#146d5c]">W</span>
        <span className="truncate">WordbitX CRM</span>
        <span className="hidden text-slate-400 sm:inline">/</span>
        <span className="hidden truncate font-medium text-slate-500 sm:inline dark:text-slate-400">Sample Workspace</span>
      </div>
      <div className="ml-auto hidden h-7 w-40 items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2 text-[9px] text-slate-400 dark:border-[#323250] dark:bg-[#17172b] sm:flex">
        <Search className="h-3 w-3" />
        <span>Search anything...</span>
        <span className="ml-auto rounded border border-slate-200 bg-white px-1 py-0.5 font-medium dark:border-[#323250] dark:bg-[#20203a]">⌘ K</span>
      </div>
      <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e7f2ee] text-[9px] font-bold text-[#176d5b]">JD</div>
    </div>

    <div className="grid min-h-[300px] grid-cols-[42px_minmax(0,1fr)] sm:grid-cols-[142px_minmax(0,1fr)]">
      <aside className="border-r border-slate-200 bg-[#fbfcfb] p-1.5 dark:border-[#323250] dark:bg-[#17172b] sm:p-3">
        <div className="mb-4 hidden items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[9px] font-semibold text-slate-600 dark:border-[#323250] dark:bg-[#20203a] dark:text-slate-300 sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ba58e]" />
          Sample workspace
          <ChevronDown className="ml-auto h-3 w-3" />
        </div>
        <div className="space-y-1">
          {navigationItems.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              aria-current={active ? 'page' : undefined}
              className={`flex h-8 items-center justify-center gap-2 rounded-md px-1 text-[10px] font-medium sm:justify-start sm:px-2 ${
                active
                  ? 'bg-[#eaf4f0] text-[#176d5b] dark:bg-[#12352e] dark:text-emerald-300'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 border-t border-slate-200 pt-2 dark:border-[#323250]">
          <div className="flex h-8 items-center justify-center gap-2 rounded-md px-1 text-[10px] font-medium text-slate-500 sm:justify-start sm:px-2 dark:text-slate-400">
            <Settings className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Settings</span>
          </div>
          <div className="flex h-8 items-center justify-center gap-2 rounded-md px-1 text-[10px] font-medium text-slate-500 sm:justify-start sm:px-2 dark:text-slate-400">
            <CircleHelp className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Help center</span>
          </div>
        </div>
      </aside>

      <main className="min-w-0 bg-[#f7f9f8] p-3 dark:bg-[#11111f] sm:p-4 md:p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-[13px] font-bold tracking-tight text-slate-900 dark:text-white sm:text-base">Team overview</div>
            <div className="mt-0.5 text-[9px] text-slate-500 dark:text-slate-400 sm:text-[10px]">A clear view of your customer pipeline.</div>
          </div>
          <div aria-hidden="true" className="inline-flex h-7 items-center gap-1 rounded-md bg-[#126b59] px-2 text-[9px] font-semibold text-white sm:px-2.5">
            <Plus className="h-3 w-3" />
            <span className="hidden sm:inline">Add lead</span>
          </div>
        </div>

        <div className="mb-2 flex items-center gap-1.5 text-[8px] font-medium text-slate-400 sm:text-[9px]">
          <span className="rounded border border-slate-200 bg-white px-1.5 py-1 dark:border-[#323250] dark:bg-[#20203a]">This month</span>
          <ArrowDown className="h-2.5 w-2.5" />
          <span className="ml-auto rounded bg-[#fff5dd] px-1.5 py-0.5 font-semibold text-[#9a6a13]">Sample data</span>
        </div>

        <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.12 + index * 0.07 }}
                className="min-w-0 rounded-md border border-slate-200 bg-white p-2 transition-shadow hover:shadow-sm dark:border-[#323250] dark:bg-[#20203a] sm:p-2.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <div className="truncate text-[8px] font-medium text-slate-500 dark:text-slate-400 sm:text-[9px]">{metric.label}</div>
                  <Icon aria-hidden="true" className="h-3 w-3 shrink-0 text-[#25846e]" />
                </div>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-1 gap-y-0.5">
                  <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white sm:text-base">{metric.value}</span>
                  <span className={`text-[8px] font-semibold ${metric.color}`}>{metric.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-[1.35fr_1fr]">
          <section className="rounded-md border border-slate-200 bg-white p-2.5 dark:border-[#323250] dark:bg-[#20203a]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[9px] font-bold text-slate-800 dark:text-slate-100 sm:text-[10px]">Pipeline activity</h2>
                <p className="mt-0.5 text-[8px] text-slate-400">Illustrative weekly trend</p>
              </div>
              <span aria-hidden="true" className="rounded p-1 text-slate-400">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </span>
            </div>
            <div className="relative mt-2 h-[78px] overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between">
                <span className="border-t border-dashed border-slate-100 dark:border-[#323250]" />
                <span className="border-t border-dashed border-slate-100 dark:border-[#323250]" />
                <span className="border-t border-dashed border-slate-100 dark:border-[#323250]" />
              </div>
              <svg role="img" aria-label="Illustrative weekly CRM pipeline activity trend" viewBox="0 0 320 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <defs>
                  <linearGradient id="lead-activity-fill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4aa58d" stopOpacity=".20" />
                    <stop offset="100%" stopColor="#4aa58d" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0 65 C18 62 21 45 40 50 S64 67 83 50 S107 43 126 48 S151 26 169 35 S192 54 211 39 S236 22 253 31 S277 14 294 22 S309 18 320 8 V80 H0Z"
                  fill="url(#lead-activity-fill)"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: shouldReduceMotion ? 0 : 0.25 }}
                />
                <motion.path
                  d="M0 65 C18 62 21 45 40 50 S64 67 83 50 S107 43 126 48 S151 26 169 35 S192 54 211 39 S236 22 253 31 S277 14 294 22 S309 18 320 8"
                  fill="none"
                  stroke="#24866f"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.1, delay: shouldReduceMotion ? 0 : 0.3, ease: 'easeOut' }}
                />
              </svg>
            </div>
            <div className="mt-1 flex justify-between text-[7px] text-slate-400"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          </section>

          <section className="rounded-md border border-[#164d3e] bg-[#123c32] p-2.5 text-white">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <h2 className="flex items-center gap-1 text-[9px] font-bold sm:text-[10px]">
                  <Sparkles aria-hidden="true" className="h-3 w-3 text-emerald-300" />
                  Recent activity
                </h2>
                <p className="mt-0.5 text-[8px] text-emerald-100/65">Sample workspace updates</p>
              </div>
              <span className="rounded bg-white/10 px-1.5 py-0.5 text-[7px] font-semibold text-emerald-100">TODAY</span>
            </div>
            <div className="space-y-1.5">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.4 }}
                className="flex items-start gap-1.5 rounded border border-white/10 bg-white/[0.06] px-2 py-1.5"
              >
                <UsersRound aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-emerald-300" />
                <div className="min-w-0">
                  <div className="truncate text-[8px] font-semibold">New lead added</div>
                  <div className="truncate text-[7px] text-emerald-100/65">Website inquiry · just now</div>
                </div>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.5 }}
                className="flex items-start gap-1.5 rounded border border-white/10 bg-white/[0.06] px-2 py-1.5"
              >
                <BriefcaseBusiness aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-sky-300" />
                <div className="min-w-0">
                  <div className="truncate text-[8px] font-semibold">Deal moved forward</div>
                  <div className="truncate text-[7px] text-emerald-100/65">Discovery · 18 min ago</div>
                </div>
              </motion.div>
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.3, delay: shouldReduceMotion ? 0 : 0.6 }}
                className="flex items-start gap-1.5 rounded border border-white/10 bg-white/[0.06] px-2 py-1.5"
              >
                <CalendarClock aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0 text-amber-300" />
                <div className="min-w-0">
                  <div className="truncate text-[8px] font-semibold">Follow-up scheduled</div>
                  <div className="truncate text-[7px] text-emerald-100/65">Customer check-in · 42 min ago</div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[8px] text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-[#42a583]" />
          Sample workspace preview
          <ArrowUpRight className="ml-auto h-3 w-3" />
        </div>
      </main>
    </div>
  </motion.div>
  );
};
