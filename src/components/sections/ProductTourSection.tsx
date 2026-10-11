import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  AudioLines,
  Building2,
  Check,
  CheckSquare,
  Command,
  CornerDownLeft,
  Search,
  ShieldCheck,
  UsersRound,
  X,
} from 'lucide-react';
import { DEMO_CALLS, DEMO_DEALS, DEMO_LEADS, DEMO_PALETTE_RECORDS, DEMO_REPORT_METRICS, DEMO_ROLES, DEMO_TASKS } from '../demo/sampleData';

const DemoBadge = () => <span className="inline-flex rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-200">Demo data</span>;
const money = (value: number) => `$${value.toLocaleString()}`;
type DemoTask = { title: string; due: string; owner: string; completed: boolean };
type DemoDeal = { company: string; title: string; value: number; stage: string; owner: string; age: string };

const FeatureBento: React.FC = () => {
  const [tasks, setTasks] = useState<DemoTask[]>(DEMO_TASKS.map((task) => ({ ...task })));

  return (
    <section aria-labelledby="capabilities-title" className="bg-white py-20 dark:bg-[#08110e] sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">One connected workspace</div>
            <h2 id="capabilities-title" className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">The details that move a deal forward.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">A practical view of the everyday work: record context, keep ownership clear, and know what comes next.</p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#f8faf9] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-white/10 dark:bg-[#101b16] dark:hover:border-emerald-400/30 sm:col-span-2 sm:p-7 lg:col-span-7">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">01 · LEAD MANAGEMENT</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Every conversation starts with context.</h3></div>
              <DemoBadge />
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0a1410]">
              <div className="hidden grid-cols-[1.3fr_1fr_.7fr_auto] gap-3 border-b border-slate-100 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:border-white/10 sm:grid">
                <span>Lead</span><span>Company</span><span>Value</span><span>Status</span>
              </div>
              {DEMO_LEADS.slice(0, 3).map((lead, index) => (
                <div key={lead.name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-slate-100 px-3 py-3 last:border-0 dark:border-white/5 sm:grid-cols-[1.3fr_1fr_.7fr_auto] sm:gap-3 sm:px-4">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${['bg-emerald-100 text-emerald-800 dark:bg-emerald-300/15 dark:text-emerald-200', 'bg-indigo-100 text-indigo-800 dark:bg-indigo-300/15 dark:text-indigo-200', 'bg-cyan-100 text-cyan-800 dark:bg-cyan-300/15 dark:text-cyan-200'][index]}`}>{lead.initials}</span>
                    <div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{lead.name}</p><p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:hidden">{lead.company}</p></div>
                  </div>
                  <span className="hidden truncate text-xs text-slate-600 dark:text-slate-300 sm:block">{lead.company}</span>
                  <span className="hidden font-mono text-xs tabular-nums text-slate-700 dark:text-slate-200 sm:block">{money(lead.value)}</span>
                  <span className="justify-self-end rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-800 dark:border-emerald-300/15 dark:bg-emerald-300/10 dark:text-emerald-200">{lead.status}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Keep source, status, owner, and next step close at hand.</p>
          </article>

          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#f5f6ff] p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl dark:border-white/10 dark:bg-[#131521] sm:p-7 lg:col-span-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">02 · PIPELINE</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Momentum, stage by stage.</h3></div><DemoBadge />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                { label: 'Discovery', color: 'bg-indigo-400', deals: DEMO_DEALS.slice(0, 2) },
                { label: 'Proposal', color: 'bg-cyan-400', deals: DEMO_DEALS.slice(1, 3) },
                { label: 'Negotiation', color: 'bg-emerald-400', deals: DEMO_DEALS.slice(2, 4) },
              ].map((column) => (
                <div key={column.label} className="min-w-0 rounded-xl border border-slate-200/80 bg-white/75 p-2 dark:border-white/10 dark:bg-white/[0.035]">
                  <div className="mb-2 flex items-center gap-1.5"><span className={`h-1.5 w-1.5 rounded-full ${column.color}`} /><span className="truncate text-xs font-semibold text-slate-600 dark:text-slate-300">{column.label}</span></div>
                  {column.deals.map((deal) => <div key={deal.company} className="mb-1.5 rounded-lg border border-slate-200 bg-white p-2 last:mb-0 dark:border-white/10 dark:bg-[#0d1712]"><p className="truncate text-xs font-medium text-slate-800 dark:text-slate-100">{deal.company}</p><p className="mt-1 font-mono text-xs tabular-nums text-slate-500">{money(deal.value)}</p></div>)}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs dark:border-white/10"><span className="text-slate-500 dark:text-slate-400">24 active opportunities</span><span className="font-mono font-semibold tabular-nums text-slate-900 dark:text-white">$286.4k</span></div>
          </article>

          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#f4fbf8] p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0d1914] sm:p-7 lg:col-span-4">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">03 · CALL LOGGING</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">A useful history, not just a call count.</h3></div><DemoBadge /></div>
            <div className="mt-5 space-y-3">
              {DEMO_CALLS.slice(0, 2).map((call) => <div key={call.name} className="flex gap-3 border-b border-slate-200 pb-3 last:border-0 last:pb-0 dark:border-white/10"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300"><AudioLines className="h-4 w-4" /></span><div className="min-w-0"><div className="flex flex-wrap items-baseline gap-x-2"><span className="text-xs font-semibold text-slate-900 dark:text-white">{call.name}</span><span className="text-xs text-slate-500">{call.time} · {call.duration}</span></div><p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{call.note}</p></div></div>)}
            </div>
          </article>

          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#fbf8f1] p-5 transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-xl dark:border-white/10 dark:bg-[#19160e] sm:p-7 lg:col-span-4">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">04 · FOLLOW-UPS</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Make the next action obvious.</h3></div><DemoBadge /></div>
            <div className="mt-5 space-y-2.5">
              {tasks.map((task, index) => <label key={task.title} className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white/80 p-3 dark:border-white/10 dark:bg-white/[0.035]"><input type="checkbox" checked={task.completed} onChange={() => setTasks((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, completed: !item.completed } : item))} className="mt-0.5 h-4 w-4 accent-emerald-600 focus-visible:outline-2 focus-visible:outline-emerald-600" /><span className="min-w-0 flex-1"><span className={`block text-xs font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800 dark:text-slate-100'}`}>{task.title}</span><span className="mt-1 block text-xs text-slate-500">{task.due} · {task.owner}</span></span></label>)}
            </div>
          </article>

          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#f5f9ff] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl dark:border-white/10 dark:bg-[#0f1720] sm:p-7 lg:col-span-4">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">05 · TEAM & ROLES</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Clear ownership. Thoughtful access.</h3></div><DemoBadge /></div>
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 dark:border-white/10 dark:bg-white/[0.035]"><span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-100 text-cyan-900 dark:bg-cyan-300/10 dark:text-cyan-200"><UsersRound className="h-5 w-5" /></span><div><p className="text-xs font-semibold text-slate-900 dark:text-white">Revenue team</p><p className="mt-1 text-xs text-slate-500">5 role levels · workspace scoped</p></div><Building2 className="ml-auto h-4 w-4 text-slate-400" /></div>
            <div className="mt-3 flex flex-wrap gap-2">{DEMO_ROLES.map((role, index) => <span key={role} className={`rounded-full border px-2.5 py-1.5 text-xs font-medium ${index === 0 ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-300/20 dark:bg-emerald-300/10 dark:text-emerald-200' : 'border-slate-200 bg-white/70 text-slate-600 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-300'}`}>{role}</span>)}</div>
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />Role-based workspace permissions</p>
          </article>

          <article className="spotlight-card group min-w-0 rounded-3xl border border-slate-200 bg-[#f6f5ff] p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl dark:border-white/10 dark:bg-[#14131d] sm:p-7 lg:col-span-6">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-medium text-slate-500 dark:text-slate-400">06 · REPORTS</p><h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">A signal, not another spreadsheet.</h3></div><DemoBadge /></div>
            <div className="mt-5 grid items-end gap-5 sm:grid-cols-[1fr_.7fr]">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                <div className="flex items-start justify-between"><div><p className="text-xs text-slate-500">Won revenue · 6 months</p><p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-slate-950 dark:text-white">${(DEMO_REPORT_METRICS.totalWonRevenue / 1000).toFixed(0)}k</p></div><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200">Sample</span></div>
                <div className="mt-4 flex h-16 items-end gap-1.5" aria-label="Sample revenue sparkline from May to October">{[32, 45, 40, 62, 70, 92, 78, 100].map((height, index) => <span key={index} className={`flex-1 rounded-t-sm ${index === 7 ? 'bg-emerald-500' : 'bg-indigo-300 dark:bg-indigo-300/50'}`} style={{ height: `${height}%` }} />)}</div>
                <div className="mt-2 flex justify-between text-xs text-slate-500"><span>May</span><span>Oct</span></div>
              </div>
              <div className="space-y-3">
                {[['Win rate', '32.6%', 'bg-emerald-500'], ['Qualified leads', '48', 'bg-indigo-500'], ['Open pipeline', '$286k', 'bg-cyan-500']].map(([label, value, color]) => <div key={label} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white/80 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.035]"><span className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300"><span className={`h-2 w-2 rounded-full ${color}`} />{label}</span><span className="font-mono text-xs font-semibold tabular-nums text-slate-900 dark:text-white">{value}</span></div>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

const TourPanels: React.FC<{ step: number; deals: { company: string; title: string; value: number; stage: string; owner: string; age: string }[]; onMove: (index: number, direction: -1 | 1) => void }> = ({ step, deals, onMove }) => {
  if (step === 0 || step === 1) return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#101a15]">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10"><span className="text-xs font-semibold text-slate-800 dark:text-white">{step === 0 ? 'New lead captured' : 'Lead qualification'}</span><DemoBadge /></div>
      {DEMO_LEADS.slice(0, step === 0 ? 2 : 3).map((lead) => <div key={lead.name} className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-0 dark:border-white/5"><span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200">{lead.initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{lead.name}</p><p className="truncate text-xs text-slate-500">{lead.company} · {lead.source}</p></div><div className="text-right"><div className="font-mono text-xs tabular-nums text-slate-800 dark:text-white">{money(lead.value)}</div><span className="text-xs text-emerald-700 dark:text-emerald-300">{lead.status}</span></div></div>)}
    </div>
  );
  if (step === 2) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#101a15]">
      <div className="mb-3 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Sample pipeline</h3><p className="mt-1 text-xs text-slate-500">Focus a deal card and press ↑ or ↓, or use its move buttons.</p></div><DemoBadge /></div>
      <div className="grid gap-2 sm:grid-cols-2">
        {deals.map((deal, index) => <div key={deal.company} role="group" tabIndex={0} aria-label={`${deal.company}, ${deal.title}, ${deal.stage}`} className="rounded-xl border border-slate-200 bg-slate-50 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:bg-white/[0.035]" onKeyDown={(event) => { if (event.key === 'ArrowUp') { event.preventDefault(); onMove(index, -1); } if (event.key === 'ArrowDown') { event.preventDefault(); onMove(index, 1); } }}>
          <div className="flex items-center justify-between gap-2"><span className="truncate text-xs font-semibold text-slate-900 dark:text-white">{deal.company}</span><span className="shrink-0 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200">{deal.stage}</span></div>
          <p className="mt-1 text-xs text-slate-500">{deal.title} · {deal.age}</p>
          <div className="mt-3 flex items-center justify-between"><span className="font-mono text-xs font-semibold tabular-nums text-slate-800 dark:text-white">{money(deal.value)}</span><div className="flex gap-1"><button type="button" aria-label={`Move ${deal.company} to previous stage`} onClick={() => onMove(index, -1)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"><ArrowUp className="h-3.5 w-3.5" /></button><button type="button" aria-label={`Move ${deal.company} to next stage`} onClick={() => onMove(index, 1)} className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"><ArrowDown className="h-3.5 w-3.5" /></button></div></div>
        </div>)}
      </div>
    </div>
  );
  if (step === 3) return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#101a15]">
      <div className="mb-4 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Call notes stay connected</h3><p className="mt-1 text-xs text-slate-500">Sample logged interactions</p></div><DemoBadge /></div>
      <div className="space-y-4">{DEMO_CALLS.map((call) => <div key={call.name} className="flex gap-3"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300"><AudioLines className="h-4 w-4" /></span><div className="min-w-0 flex-1 border-b border-slate-100 pb-3 last:border-0 dark:border-white/10"><div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold text-slate-900 dark:text-white">{call.name} · {call.company}</span><span className="text-xs text-slate-500">{call.time} · {call.duration}</span></div><p className="typing-line mt-1 max-w-full text-xs leading-relaxed text-slate-600 dark:text-slate-300">{call.note}</p></div></div>)}</div>
    </div>
  );
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#101a15]"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-sm font-semibold text-slate-900 dark:text-white">Performance snapshot</h3><p className="mt-1 text-xs text-slate-500">Sample reporting data · October 2026</p></div><DemoBadge /></div><div className="grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.035]"><p className="text-xs text-slate-500">Won revenue</p><p className="mt-2 font-mono text-xl font-semibold tabular-nums text-slate-900 dark:text-white">${DEMO_REPORT_METRICS.monthlyWonRevenue.toLocaleString()}</p><p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">{DEMO_REPORT_METRICS.dealsWonThisMonth} deals this month</p></div><div className="rounded-xl bg-slate-50 p-4 dark:bg-white/[0.035]"><p className="text-xs text-slate-500">Win rate</p><p className="mt-2 font-mono text-xl font-semibold tabular-nums text-slate-900 dark:text-white">{DEMO_REPORT_METRICS.winRate}%</p><p className="mt-1 text-xs text-indigo-700 dark:text-indigo-300">Across {DEMO_REPORT_METRICS.closedDeals} closed deals</p></div></div><div className="mt-4 flex h-20 items-end gap-2 rounded-xl bg-slate-50 px-4 pt-4 dark:bg-white/[0.035]">{[25, 38, 30, 52, 44, 68, 56, 84, 71, 94].map((height, index) => <span key={index} className="flex-1 rounded-t bg-emerald-500/80 transition-all duration-500" style={{ height: `${height}%` }} />)}</div></div>;
};

const stageNames = ['Discovery', 'Qualified', 'Proposal', 'Negotiation'];

export const ProductTourSection: React.FC = () => {
  const steps = ['Capture lead', 'Qualify', 'Move deal', 'Log a call', 'Report'];
  const details = ['Capture source and context from the first interaction.', 'Keep qualification notes and an owner alongside the record.', 'Move a sample opportunity through your sales stages.', 'Log the outcome and next step on the customer timeline.', 'Review the metrics that help prioritize the next action.'];
  const [step, setStep] = useState(0);
  const [deals, setDeals] = useState<DemoDeal[]>(DEMO_DEALS.map((deal) => ({ ...deal })));
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openPalette = (element?: HTMLElement) => {
    returnFocusRef.current = element ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setQuery('');
    setPaletteOpen(true);
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (paletteOpen) {
          setPaletteOpen(false);
          returnFocusRef.current?.focus();
        } else {
          openPalette();
        }
      }
      if (event.key === 'Escape' && (paletteOpen || createOpen)) {
        setPaletteOpen(false);
        setCreateOpen(false);
        returnFocusRef.current?.focus();
      }
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [paletteOpen, createOpen]);

  useEffect(() => {
    if (!paletteOpen && !createOpen) return;

    const containFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', containFocus);
    return () => document.removeEventListener('keydown', containFocus);
  }, [paletteOpen, createOpen]);

  const filteredCommands = useMemo(() => {
    const options = [...DEMO_PALETTE_RECORDS, 'Go to Leads', 'Go to Pipeline', 'Go to Reports', 'Create a lead'];
    return options.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const moveDeal = (index: number, direction: -1 | 1) => {
    setDeals((current) => current.map((deal, dealIndex) => dealIndex === index ? { ...deal, stage: stageNames[Math.max(0, Math.min(stageNames.length - 1, stageNames.indexOf(deal.stage) + direction))] } : deal));
  };

  return (
    <>
      <FeatureBento />
      <section id="product-tour" aria-labelledby="tour-title" className="border-y border-slate-200 bg-[#f6f8f7] py-20 dark:border-white/10 dark:bg-[#0b1510] sm:py-28">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">A five-minute product tour</p><h2 id="tour-title" className="mt-3 font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">From first hello to a clearer forecast.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">Move through the steps to see how a customer story stays connected. Every record and metric here is illustrative demo data.</p></div>
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-14">
            <div className="space-y-2">
              {steps.map((label, index) => <button key={label} type="button" onClick={() => setStep(index)} aria-current={step === index ? 'step' : undefined} className={`flex min-h-14 w-full items-center gap-3 rounded-xl border px-4 text-left transition focus-visible:outline-2 focus-visible:outline-emerald-600 ${step === index ? 'border-emerald-300 bg-white shadow-sm dark:border-emerald-300/20 dark:bg-white/[0.05]' : 'border-transparent hover:border-slate-200 dark:hover:border-white/10'}`}><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-semibold ${step === index ? 'bg-emerald-500 text-[#052016]' : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>{String(index + 1).padStart(2, '0')}</span><span><span className={`block text-sm font-semibold ${step === index ? 'text-slate-950 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{label}</span>{step === index && <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">{details[index]}</span>}</span><ArrowRight className={`ml-auto h-4 w-4 shrink-0 ${step === index ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-300'}`} /></button>)}
              <button type="button" onClick={(event) => openPalette(event.currentTarget)} className="mt-3 flex min-h-12 w-full items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 text-left text-xs font-medium text-slate-600 hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/15 dark:text-slate-300"><Command className="h-4 w-4" />Open the command palette<span className="ml-auto rounded-md border border-slate-200 px-1.5 py-1 font-mono text-xs dark:border-white/15">Ctrl K</span></button>
            </div>
            <div className="min-w-0 rounded-[26px] border border-slate-200 bg-white p-3 shadow-[0_24px_80px_-42px_rgba(15,23,42,.3)] dark:border-white/10 dark:bg-[#0d1712] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/10"><div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-300/10 dark:text-emerald-300"><CheckSquare className="h-4 w-4" /></span><span className="text-xs font-semibold text-slate-800 dark:text-white">WordbitX workspace</span></div><DemoBadge /></div>
              <TourPanels step={step} deals={deals} onMove={moveDeal} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="command-title" className="bg-white py-20 dark:bg-[#08110e] sm:py-28">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:gap-16 lg:px-8">
          <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Less hunting, more doing</p><h2 id="command-title" className="mt-3 font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl">Your workspace, one shortcut away.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">Search sample records, jump to a product area, or open a clearly labeled create-flow preview. Press Ctrl/⌘ K to try the command palette.</p><button type="button" onClick={(event) => openPalette(event.currentTarget)} className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-sm hover:border-emerald-400 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-white"><Command className="h-4 w-4" />Try the palette<CornerDownLeft className="ml-3 h-4 w-4 text-slate-400" /></button></div>
          <button type="button" onClick={(event) => openPalette(event.currentTarget)} className="group rounded-3xl border border-slate-200 bg-[#f8faf9] p-4 text-left shadow-[0_24px_80px_-42px_rgba(15,23,42,.35)] transition hover:-translate-y-1 hover:border-emerald-300 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:bg-[#101a15] sm:p-6">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-700 dark:text-slate-200">Quick actions</span><DemoBadge /></div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#0b1510]">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-white/10"><Search className="h-4 w-4 text-slate-400" /><span className="text-xs text-slate-400">Search leads, pages, and actions...</span><span className="ml-auto rounded border border-slate-200 px-1.5 py-1 font-mono text-xs text-slate-500 dark:border-white/10">⌘ K</span></div>
              <div className="mt-3 space-y-1">{['Olivia Chen · Northstar Health', 'Go to Pipeline', 'Create a lead'].map((item, index) => <div key={item} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs ${index === 0 ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-300/10 dark:text-emerald-100' : 'text-slate-600 dark:text-slate-300'}`}><span className="grid h-6 w-6 place-items-center rounded-md bg-slate-100 text-xs dark:bg-white/10">{index === 0 ? 'OC' : index === 1 ? '↗' : '+'}</span>{item}<ArrowRight className="ml-auto h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" /></div>)}</div>
            </div>
          </button>
        </div>
      </section>

      {paletteOpen && <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/55 px-4 pt-[15vh] backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) { setPaletteOpen(false); returnFocusRef.current?.focus(); } }}><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="palette-title" className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#101a15]"><div className="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-white/10"><Search className="h-4 w-4 text-slate-400" /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && filteredCommands[0] === 'Create a lead') { setPaletteOpen(false); setCreateOpen(true); } }} aria-labelledby="palette-title" placeholder="Search records or actions..." className="h-14 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" /><span className="hidden text-xs text-slate-400 sm:block">ESC to close</span><button type="button" aria-label="Close command palette" onClick={() => { setPaletteOpen(false); returnFocusRef.current?.focus(); }} className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:hover:bg-white/10"><X className="h-4 w-4" /></button></div><h2 id="palette-title" className="sr-only">Command palette demo</h2><div className="p-2">{filteredCommands.length ? filteredCommands.map((item) => <button key={item} type="button" onClick={() => { if (item === 'Create a lead') { setPaletteOpen(false); setCreateOpen(true); return; } if (item === 'Go to Leads') setStep(0); else if (item === 'Go to Pipeline') setStep(2); else if (item === 'Go to Reports') setStep(4); else setStep(1); setPaletteOpen(false); returnFocusRef.current?.focus(); }} className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-xs text-slate-700 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-slate-200 dark:hover:bg-emerald-300/10"><span className="grid h-7 w-7 place-items-center rounded-md bg-slate-100 text-xs dark:bg-white/10">{item.startsWith('Go') ? '↗' : item.startsWith('Create') ? '+' : '•'}</span>{item}<ArrowRight className="ml-auto h-3.5 w-3.5 text-slate-300" /></button>) : <p className="p-5 text-center text-xs text-slate-500">No sample records or actions match.</p>}</div></section></div>}

      {createOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-sm"><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="create-demo-title" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl dark:border-white/10 dark:bg-[#101a15]"><div className="flex items-start justify-between gap-4"><div><h2 id="create-demo-title" className="text-base font-semibold text-slate-900 dark:text-white">Create lead preview</h2><p className="mt-1 text-xs text-slate-500">This is an in-page demonstration only. It will not save a record.</p></div><button type="button" onClick={() => { setCreateOpen(false); returnFocusRef.current?.focus(); }} aria-label="Close create lead preview" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:hover:bg-white/10"><X className="h-4 w-4" /></button></div><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-100"><DemoBadge /><p className="mt-2">Sample lead preview: Jordan Lee · Windrow Studio</p></div><button type="button" onClick={() => { setCreateOpen(false); returnFocusRef.current?.focus(); }} className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"><Check className="h-4 w-4" />Close preview</button></section></div>}
    </>
  );
};

export default ProductTourSection;
