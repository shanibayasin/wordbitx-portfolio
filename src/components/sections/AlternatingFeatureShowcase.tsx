import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Headphones,
  Phone,
  PhoneOff,
  Plus,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';

interface Deal {
  id: number;
  name: string;
  value: string;
  stage: string;
  stageStyle: string;
  closeDate: string;
  dotColor: string;
}

const initialDeals: Deal[] = [
  {
    id: 1,
    name: 'Web Redesign',
    value: '$14,500',
    stage: 'Proposal',
    stageStyle: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    closeDate: 'Apr 14, 2026',
    dotColor: 'bg-purple-500',
  },
  {
    id: 2,
    name: 'Marketing campaign',
    value: '$9,200',
    stage: 'Negotiation',
    stageStyle: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    closeDate: 'Apr 28, 2026',
    dotColor: 'bg-amber-500',
  },
  {
    id: 3,
    name: 'Software License',
    value: '$8,400',
    stage: 'Qualified',
    stageStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    closeDate: 'May 05, 2026',
    dotColor: 'bg-emerald-500',
  },
  {
    id: 4,
    name: 'Consulting Service',
    value: '$4,800',
    stage: 'Contacted',
    stageStyle: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    closeDate: 'May 12, 2026',
    dotColor: 'bg-blue-500',
  },
];

const panelClass =
  'rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-lg transition-colors dark:border-white/10 dark:bg-[#0e1517] sm:p-7';
const textClass = 'text-slate-600 dark:text-zinc-300';
const rowClass =
  'flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 transition-colors dark:border-white/5 dark:bg-white/5';

export const AlternatingFeatureShowcase: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { navigate, openExploreDemo } = useNavigation();
  const isDark = resolvedTheme === 'dark';
  const [deals, setDeals] = useState(initialDeals);
  const [callStatus, setCallStatus] = useState<'incoming' | 'accepted' | 'declined'>('incoming');

  const addDeal = () => {
    const newDeal: Deal = {
      id: Date.now(),
      name: 'Enterprise Cloud License',
      value: '$24,000',
      stage: 'Proposal',
      stageStyle: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      closeDate: 'Jun 02, 2026',
      dotColor: 'bg-emerald-500',
    };
    setDeals((currentDeals) => [newDeal, ...currentDeals.slice(0, 3)]);
  };

  return (
    <section className="relative isolate overflow-hidden border-t border-slate-200/60 py-16 transition-colors dark:border-white/5 sm:py-24">
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 top-1/4 -z-10 h-[400px] w-[600px] rounded-full blur-[150px] ${
          isDark ? 'bg-emerald-500/10' : 'bg-emerald-300/20'
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-20 -left-24 -z-10 h-[350px] w-[550px] rounded-full blur-[140px] ${
          isDark ? 'bg-teal-500/10' : 'bg-teal-200/25'
        }`}
      />

      <div className="relative mx-auto max-w-[1400px] space-y-20 px-4 sm:px-6 lg:space-y-28 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-5">
            <SectionEyebrow>Sales &amp; pipeline engine</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Turn every inquiry into a verified closed contract.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Track deal progression with a clear pipeline. Forecast close dates with automated
              probability scores and keep every opportunity moving forward.
            </p>
            <ActionLink onClick={() => navigate('/app/deals')}>
              Explore deal flow features
            </ActionLink>
          </div>

          <div className="lg:col-span-7">
            <div className={panelClass}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-base">
                    Active Deals
                  </h3>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 sm:text-[11px]">
                    12 Deals · $415,200
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="hidden text-xs text-slate-500 dark:text-zinc-400 sm:inline">
                    Filter by: All Stages
                  </span>
                  <button
                    type="button"
                    onClick={addDeal}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black shadow-sm transition-colors hover:bg-emerald-400"
                  >
                    <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                    New Deal
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-xs">
                  <thead>
                    <tr className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                      <th className="pb-3 font-mono">Deal / Client</th>
                      <th className="pb-3 font-mono">Value</th>
                      <th className="pb-3 font-mono">Stage</th>
                      <th className="pb-3 text-right font-mono">Close Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {deals.map((deal) => (
                      <tr key={deal.id} className="transition-colors hover:bg-slate-50/70 dark:hover:bg-white/5">
                        <td className="py-3.5 pr-3">
                          <span className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
                            <span className={`h-2 w-2 shrink-0 rounded-full ${deal.dotColor}`} />
                            {deal.name}
                          </span>
                        </td>
                        <td className="py-3.5 pr-3 font-mono font-bold text-slate-800 dark:text-zinc-200">
                          {deal.value}
                        </td>
                        <td className="py-3.5 pr-3">
                          <span className={`rounded-md border px-2.5 py-0.5 text-[10px] font-semibold ${deal.stageStyle}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td className="py-3.5 text-right font-mono text-[10px] text-slate-500 dark:text-zinc-400">
                          {deal.closeDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className={panelClass}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Live Calls
                    <span className="rounded-md bg-emerald-500/20 px-1.5 text-[10px]">Active (3)</span>
                  </span>
                  <span className="hidden text-xs text-slate-500 sm:inline dark:text-zinc-400">
                    Omnichannel Messages
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase text-slate-500 dark:text-zinc-400">
                  Auto codec · SIP01 · 18ms
                </span>
              </div>

              <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#081215] p-4 text-white shadow-inner sm:p-5">
                <div className="min-w-0">
                  <div className="text-[10px] font-medium text-emerald-400">
                    {callStatus === 'incoming'
                      ? 'Incoming call routed to Sarah K.'
                      : callStatus === 'accepted'
                        ? 'Call accepted · Sarah K. is connected'
                        : 'Call declined · Returned to queue'}
                  </div>
                  <div className="mb-1 mt-0.5 font-mono text-lg font-extrabold tracking-tight sm:text-2xl">
                    +01 300 1234567
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Acquisition intent · <span className="font-semibold text-teal-400">High urgency</span>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCallStatus('accepted')}
                    aria-label="Answer call"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 transition hover:scale-105 hover:bg-emerald-400 active:scale-95"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 fill-black" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCallStatus('declined')}
                    aria-label="Decline call"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-600/30 transition hover:scale-105 hover:bg-rose-500 active:scale-95"
                  >
                    <PhoneOff aria-hidden="true" className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <span className="mb-2.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                  Recent Call Activities
                </span>
                <div className="space-y-2 text-xs">
                  <ActivityRow label="Closed deal call with Apex Log." time="2 min ago" />
                  <ActivityRow label="Warm call from Synapse lead" time="8 min ago" icon />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2 lg:col-span-5">
            <SectionEyebrow>Call center &amp; routing desk</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Never miss a customer signal across voice or chat.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Equip every frontline agent with call context, recordings, sentiment tags and
              one-click ticket creation during the conversation.
            </p>
            <ActionLink onClick={() => navigate('/app/calls')}>Explore call center features</ActionLink>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-5">
            <SectionEyebrow>Lead intake &amp; enrichment</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Capture. Qualify. Convert without data decay.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Capture leads from forms and inbound channels, enrich company details, and route each
              opportunity to the right person.
            </p>
            <ActionLink onClick={() => navigate('/app/leads')}>View lead distribution engine</ActionLink>
          </div>

          <div className="lg:col-span-7">
            <div className={panelClass}>
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  Recent Incoming Leads
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('/app/leads')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
                >
                  View all: Leads
                  <ChevronDown aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <LeadRow initials="AL" name="Apollo Labs" source="Website Webform" score="98%" tone="emerald" owner="A.E. Vance" />
                <LeadRow initials="KP" name="Kinetic Poly" source="Outbound In-Mail" score="Qualified" tone="blue" owner="Sarah Rost." />
                <LeadRow initials="FC" name="FinCore Trust" source="Referral Partner" score="Wait-list" tone="purple" owner="David Eng." />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[10px] text-slate-500 dark:border-white/5 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5"><Radio aria-hidden="true" className="h-3 w-3 text-emerald-500" /> Real-time lead routing</span>
                <button
                  type="button"
                  onClick={openExploreDemo}
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-600 dark:text-emerald-400"
                >
                  <Sparkles aria-hidden="true" className="h-3 w-3" /> Explore interactive demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionEyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 sm:text-[10px]">
    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    {children}
  </div>
);

const ActionLink: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group inline-flex items-center gap-2 pt-1 text-sm font-bold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
  >
    {children}
    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </button>
);

const ActivityRow: React.FC<{ label: string; time: string; icon?: boolean }> = ({ label, time, icon = false }) => (
  <div className={rowClass}>
    <div className="flex min-w-0 items-center gap-2.5">
      {icon ? (
        <Headphones aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-teal-500" />
      ) : (
        <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
      )}
      <span className="truncate font-semibold text-slate-800 dark:text-zinc-200">{label}</span>
    </div>
    <span className="shrink-0 font-mono text-[9px] text-slate-500 dark:text-zinc-400">{time}</span>
  </div>
);

const leadStyles = {
  emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400',
  purple: 'bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400',
};

const LeadRow: React.FC<{
  initials: string;
  name: string;
  source: string;
  score: string;
  tone: keyof typeof leadStyles;
  owner: string;
}> = ({ initials, name, source, score, tone, owner }) => (
  <div className={rowClass}>
    <div className="flex min-w-0 items-center gap-3">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-bold ${leadStyles[tone]}`}>
        {initials}
      </div>
      <div className="min-w-0">
        <div className="truncate text-xs font-bold text-slate-900 dark:text-white">{name}</div>
        <div className="mt-0.5 truncate text-[10px] text-slate-500 dark:text-zinc-400">Source: {source}</div>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-3">
      <span className={`rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold ${leadStyles[tone]}`}>
        {score}
      </span>
      <span className="hidden text-[10px] text-slate-500 dark:text-zinc-400 sm:inline">Assigned: {owner}</span>
    </div>
  </div>
);
