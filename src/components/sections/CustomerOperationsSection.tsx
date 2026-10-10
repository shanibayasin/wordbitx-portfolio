import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Check,
  GitFork,
  Headphones,
  LifeBuoy,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Zap,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const chatMessages = [
  { name: 'Elena R.', text: 'Contract signed for Apex Logistics', color: 'bg-emerald-500' },
  { name: 'Marcus V.', text: 'Onboarding engineer assigned', color: 'bg-blue-500' },
  { name: 'Sarah J.', text: 'Customer requested 45 SIP trunks', color: 'bg-teal-500' },
];

const cardStyles = {
  emerald: {
    icon: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400',
  },
  blue: {
    icon: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
    badge: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400',
  },
  teal: {
    icon: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400',
    badge: 'border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400',
  },
  amber: {
    icon: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400',
    badge: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400',
  },
  violet: {
    icon: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400',
    badge: 'border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400',
  },
  cyan: {
    icon: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400',
  },
};

type CardTone = keyof typeof cardStyles;

const statusTextColors: Record<CardTone, string> = {
  emerald: 'text-emerald-700 dark:text-emerald-400',
  blue: 'text-blue-700 dark:text-blue-400',
  teal: 'text-teal-700 dark:text-teal-400',
  amber: 'text-amber-700 dark:text-amber-400',
  violet: 'text-violet-700 dark:text-violet-400',
  cyan: 'text-cyan-700 dark:text-cyan-400',
};

interface ModuleCardProps {
  title: string;
  description: string;
  badge: string;
  tone: CardTone;
  icon: React.ComponentType<{ className?: string }>;
  footer: React.ReactNode;
  children: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  badge,
  tone,
  icon: Icon,
  footer,
  children,
}) => (
  <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-[#0e1517] dark:hover:border-emerald-500/40 sm:p-5">
    <div className="flex items-center justify-between gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl border ${cardStyles[tone].icon}`}>
        <span aria-hidden="true"><Icon className="h-4 w-4" /></span>
      </div>
      <span className={`rounded-full border px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] ${cardStyles[tone].badge}`}>
        {badge}
      </span>
    </div>

    <h3 className="mt-3 text-sm font-bold tracking-tight text-slate-900 dark:text-white">
      {title}
    </h3>
    <p className="mt-1.5 min-h-9 text-[10px] leading-relaxed text-slate-600 dark:text-zinc-400">
      {description}
    </p>

    <div className="my-3 rounded-xl border border-slate-200/80 bg-slate-50 p-2.5 dark:border-white/5 dark:bg-black/30">
      {children}
    </div>

    <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 text-[9px] dark:border-white/5">
      <span className="text-slate-600 dark:text-zinc-400">{footer}</span>
      <ArrowRight aria-hidden="true" className="h-3 w-3 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
    </div>
  </article>
);

export const CustomerOperationsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [slaSeconds, setSlaSeconds] = useState(192);
  const [activeMessage, setActiveMessage] = useState(0);
  const [queryLatency, setQueryLatency] = useState(1.4);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlaSeconds((seconds) => (seconds > 1 ? seconds - 1 : 192));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveMessage((index) => (index + 1) % chatMessages.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setQueryLatency((latency) => +(latency >= 1.6 ? 1.3 : latency + 0.1).toFixed(1));
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  const formattedSla = `${Math.floor(slaSeconds / 60)}m ${String(slaSeconds % 60).padStart(2, '0')}s`;

  return (
    <section
      aria-labelledby="customer-operations-title"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[#f8faf9] py-14 transition-colors dark:border-white/5 dark:bg-[#070a0b] sm:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-[min(80vw,800px)] -translate-x-1/2 rounded-full bg-emerald-300/15 blur-[120px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-11">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400 sm:text-[9px]">
            <Zap aria-hidden="true" className="h-3 w-3 fill-emerald-500 text-emerald-500" />
            System architecture / 6 core modules
          </div>
          <h2
            id="customer-operations-title"
            className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
          >
            Your entire customer operation,{' '}
            <span className="text-emerald-600 dark:text-emerald-400">in one clear view.</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-pretty text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm">
            From lead capture to closed deals, WordbitX delivers architectural clarity, eliminating
            cognitive fatigue while maximizing pipeline velocity.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <StatusPill icon={<Check aria-hidden="true" />} label="Lead capture" value="12.4k/mo" tone="emerald" />
            <StatusPill icon={<Zap aria-hidden="true" />} label="Rev pipeline" value="$4.2M" tone="blue" />
            <StatusPill icon={<PhoneCall aria-hidden="true" />} label="Voice up-time" value="99.9%" tone="teal" />
            <StatusPill icon={<ShieldCheck aria-hidden="true" />} label="Resolution" value="98% CSAT" tone="emerald" />
          </div>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <ModuleCard
            title="Lead management"
            description="Capture, qualify and assign leads automatically with smart routing based on rep availability and skills."
            badge="Active routing"
            tone="emerald"
            icon={GitFork}
            footer={<><Check aria-hidden="true" className="mr-1 inline h-3 w-3 text-emerald-600" /> Automated routing: 144/hr</>}
          >
            <WidgetHeading label="Routing criteria matrix" value="0.14s match" />
            <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[9px] dark:border-white/5 dark:bg-white/5">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Enterprise inbound</span>
              <span className="font-mono text-slate-500">ARR &gt;$50k</span>
            </div>
            <div className="py-1 text-center text-[10px] text-emerald-600 dark:text-emerald-400">↓</div>
            <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-[9px] dark:border-emerald-500/20 dark:bg-emerald-500/10">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">Marcus Vance · Senior AE</span>
              <span className="rounded bg-emerald-500 px-1 py-0.5 text-[8px] font-bold text-white dark:text-black">98%</span>
            </div>
          </ModuleCard>

          <ModuleCard
            title="Revenue pipeline"
            description="Track deals through custom stages with real-time conversion probability and automated sales reminders."
            badge="Live forecast: +18%"
            tone="blue"
            icon={TrendingUp}
            footer={<><Check aria-hidden="true" className="mr-1 inline h-3 w-3 text-blue-600" /> Forecast updated live</>}
          >
            <WidgetHeading label="Stage progression" value="Avg 18 days to win" />
            <div className="mt-2 space-y-2">
              <PipelineBar label="Discovery" value="$28.5k" width="38%" color="bg-sky-400" />
              <PipelineBar label="Negotiation" value="$64.2k" width="68%" color="bg-indigo-500" />
              <PipelineBar label="Proposal" value="$52.0k" width="52%" color="bg-violet-500" />
              <PipelineBar label="Closed won" value="$38.4k" width="82%" color="bg-emerald-500" />
            </div>
          </ModuleCard>

          <ModuleCard
            title="Call center operations"
            description="Manage queues, monitor live agents, record conversations and improve response times with WebRTC."
            badge="WebRTC VoIP"
            tone="teal"
            icon={PhoneCall}
            footer={<><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-teal-500" /> VoIP latency: &lt;18ms</>}
          >
            <WidgetHeading label="Live audio packets" value="0% drop rate" />
            <div className="flex h-12 items-center justify-center gap-1.5" aria-label="Live call audio visualization">
              {[20, 35, 55, 28, 70, 45, 90, 50, 32, 76, 42, 60, 25].map((height, index) => (
                <motion.span
                  key={index}
                  aria-hidden="true"
                  animate={shouldReduceMotion ? undefined : { height: [`${height * 0.35}%`, `${height}%`, `${height * 0.45}%`] }}
                  transition={{ repeat: Infinity, duration: 0.65 + (index % 4) * 0.13, ease: 'easeInOut' }}
                  className="w-1 rounded-full bg-teal-500/80"
                  style={shouldReduceMotion ? { height: `${height * 0.65}%` } : undefined}
                />
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[9px] dark:border-white/5 dark:bg-white/5">
              <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-300"><Headphones aria-hidden="true" className="h-3 w-3 text-emerald-500" /> 14/16 recorded</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">+2.8 AMPS</span>
            </div>
          </ModuleCard>

          <ModuleCard
            title="Support workflows"
            description="Resolve tickets faster, route issues across channels, and keep customers happy with automated escalations."
            badge="SLA: 4 mins"
            tone="amber"
            icon={LifeBuoy}
            footer={<><Check aria-hidden="true" className="mr-1 inline h-3 w-3 text-emerald-600" /> Auto-escalation active</>}
          >
            <WidgetHeading label="Ticket escalation queue" value="Tier-2" />
            <div className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
              <div>
                <div className="text-[9px] font-bold text-amber-700 dark:text-amber-400">Breach risk in {formattedSla}</div>
                <div className="mt-0.5 font-mono text-[8px] text-slate-500">Ticket #782 · Server timeout</div>
              </div>
              <button
                type="button"
                onClick={() => setSlaSeconds(240)}
                className="rounded-md bg-amber-500 px-2 py-1 text-[8px] font-bold text-black transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                Reassign
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[8px] text-slate-500 dark:text-zinc-400">
              <span>● Auto-escalated</span><span>Escalation: Dev</span>
            </div>
          </ModuleCard>

          <ModuleCard
            title="Team collaboration"
            description="Assign tasks and coordinate cross-functional wins with shared deal updates and live team activity."
            badge="War room live"
            tone="violet"
            icon={UsersRound}
            footer={<><MessageSquare aria-hidden="true" className="mr-1 inline h-3 w-3 text-violet-600 dark:text-violet-400" /> Team activity: live sync</>}
          >
            <WidgetHeading label="Deal war room chat" value="Live #12" />
            <div className="mt-2 space-y-1.5" aria-live="polite">
              {chatMessages.map((message, index) => (
                <div
                  key={message.name}
                  className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[8px] transition-colors ${
                    activeMessage === index
                      ? 'border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10'
                      : 'border-slate-200 bg-white dark:border-white/5 dark:bg-white/5'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${message.color}`} />
                  <span className="shrink-0 font-bold text-slate-700 dark:text-zinc-200">{message.name}</span>
                  <span className="truncate text-slate-500 dark:text-zinc-400">{message.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[8px] text-emerald-600 dark:text-emerald-400">● 2 active viewers · Apex Capital Room</div>
          </ModuleCard>

          <ModuleCard
            title="Reporting & analytics"
            description="Get real-time insight with fast queries across cohorts, customer behavior and pipeline performance."
            badge="High-IOPS OLAP"
            tone="cyan"
            icon={BarChart3}
            footer={<><Check aria-hidden="true" className="mr-1 inline h-3 w-3 text-cyan-600" /> Live query: {queryLatency.toFixed(1)}ms</>}
          >
            <div className="rounded-lg bg-slate-900 p-2 text-[8px] text-zinc-300 dark:bg-black/50">
              <WidgetHeading label="OLAP query engine" value={`${queryLatency.toFixed(1)}ms`} light />
              <div className="mt-2 space-y-1 font-mono leading-relaxed">
                <div><span className="font-bold text-cyan-400">SELECT</span> cohort, ltv, churn</div>
                <div className="text-zinc-400"><span className="font-bold text-cyan-400">FROM</span> telemetry_v2 <span className="text-emerald-400">WHERE</span> segment = 'b2b'</div>
                <div className="flex items-center gap-1 pt-1 text-emerald-400"><span className="h-1 w-1 rounded-full bg-emerald-400" /> 1.4M records processed</div>
              </div>
              <div className="mt-2 flex justify-between border-t border-white/10 pt-1.5 font-mono text-[8px]">
                <span className="text-emerald-400">Retention 91.2%</span><span>78.2% ARR</span>
              </div>
            </div>
          </ModuleCard>
        </div>
      </div>
    </section>
  );
};

interface StatusPillProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: CardTone;
}

const StatusPill: React.FC<StatusPillProps> = ({ icon, label, value, tone }) => (
  <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 sm:text-[9px]">
    <span className={`[&>svg]:h-3 [&>svg]:w-3 ${statusTextColors[tone]}`}>
      {icon}
    </span>
    <span className="uppercase tracking-wide">{label}:</span>
    <strong className={`font-mono ${tone === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : tone === 'blue' ? 'text-blue-600 dark:text-blue-400' : tone === 'teal' ? 'text-teal-600 dark:text-teal-400' : statusTextColors[tone]}`}>
      {value}
    </strong>
  </div>
);

const WidgetHeading: React.FC<{ label: string; value: string; light?: boolean }> = ({ label, value, light = false }) => (
  <div className={`flex items-center justify-between gap-2 border-b pb-1 text-[8px] font-mono uppercase tracking-wide ${
    light ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-500 dark:border-white/10 dark:text-zinc-400'
  }`}>
    <span className="truncate">{label}</span>
    <span className={`shrink-0 font-bold ${light ? 'text-cyan-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{value}</span>
  </div>
);

const PipelineBar: React.FC<{ label: string; value: string; width: string; color: string }> = ({ label, value, width, color }) => (
  <div>
    <div className="mb-1 flex justify-between text-[8px]">
      <span className="text-slate-500 dark:text-zinc-400">{label}</span>
      <span className="font-mono font-semibold text-slate-700 dark:text-zinc-200">{value}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
      <motion.div
        initial={false}
        animate={{ width }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  </div>
);
