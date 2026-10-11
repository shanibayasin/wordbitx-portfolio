import React from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckSquare,
  GitFork,
  PhoneCall,
  BriefcaseBusiness,
  UsersRound,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigation } from '../../context/NavigationContext';

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
  cyan: {
    icon: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-400',
  },
};

type CardTone = keyof typeof cardStyles;

interface ModuleCardProps {
  title: string;
  description: string;
  badge: string;
  tone: CardTone;
  icon: React.ComponentType<{ className?: string }>;
  footer: React.ReactNode;
  onExplore: () => void;
  id: string;
  children: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  description,
  badge,
  tone,
  icon: Icon,
  footer,
  onExplore,
  id,
  children,
}) => (
  <article id={id} className="group flex min-w-0 flex-col rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-[#0e1517] dark:hover:border-emerald-500/40 sm:p-5">
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
      <button type="button" onClick={onExplore} className="text-left font-semibold text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:text-emerald-400">
        {footer}
      </button>
      <ArrowRight aria-hidden="true" className="h-3 w-3 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5" />
    </div>
  </article>
);

export const CustomerOperationsSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      aria-labelledby="customer-operations-title"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[#f8faf9] py-14 transition-colors dark:border-white/5 dark:bg-[#070a0b] sm:py-20"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-[min(80vw,800px)] -translate-x-1/2 rounded-full bg-emerald-300/15 blur-[120px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-11">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-400 sm:text-[9px]">
            Six CRM essentials
          </div>
          <h2
            id="customer-operations-title"
            className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
          >
            Your entire customer operation,{' '}
            <span className="text-emerald-600 dark:text-emerald-400">in one clear view.</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl text-pretty text-xs leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-sm">
            Practical tools for organizing leads, deals, calls, follow-ups, your team, and sales reports.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {['Leads', 'Deals', 'Call log', 'Reports'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 sm:text-[9px]">
                {item}
              </span>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <ModuleCard
            id="lead-management"
            title="Lead management"
            description="Create, update, assign, and track leads by their source, then convert them to customers and deals."
            badge="Demo data"
            tone="emerald"
            icon={GitFork}
            footer="Explore leads"
            onExplore={() => navigate('/app/leads')}
          >
            <WidgetHeading label="Lead record" value="Sample" />
            <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[9px] dark:border-white/5 dark:bg-white/5">
              <span className="font-semibold text-slate-700 dark:text-zinc-200">Example lead</span>
              <span className="font-mono text-slate-500">Website</span>
            </div>
            <div className="mt-2 text-[9px] text-slate-500 dark:text-zinc-400">Assigned to a team member · Status: New</div>
          </ModuleCard>

          <ModuleCard
            id="deal-pipeline"
            title="Deal pipeline"
            description="Move deals across Kanban stages and keep each opportunity's value in view."
            badge="Demo data"
            tone="blue"
            icon={BriefcaseBusiness}
            footer="Explore pipeline"
            onExplore={() => navigate('/app/pipeline')}
          >
            <WidgetHeading label="Deals by stage" value="Sample" />
            <div className="mt-2 space-y-2">
              <PipelineBar label="Discovery" value="Deal value" width="38%" color="bg-sky-400" />
              <PipelineBar label="Proposal" value="Deal value" width="68%" color="bg-indigo-500" />
              <PipelineBar label="Won" value="Deal value" width="52%" color="bg-emerald-500" />
            </div>
          </ModuleCard>

          <ModuleCard
            id="call-logging"
            title="Call logging"
            description="Record call details against a lead or customer and keep the interaction in their activity history."
            badge="Demo data"
            tone="teal"
            icon={PhoneCall}
            footer="Explore call logs"
            onExplore={() => navigate('/app/calls')}
          >
            <WidgetHeading label="Call log entry" value="Sample" />
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[9px] dark:border-white/5 dark:bg-white/5">
              <span className="font-semibold text-slate-700 dark:text-zinc-300">Example customer</span>
              <span className="font-mono text-slate-500">Completed</span>
            </div>
            <div className="mt-2 text-[9px] text-slate-500 dark:text-zinc-400">Call notes and follow-up details</div>
          </ModuleCard>

          <ModuleCard
            id="tasks-follow-ups"
            title="Tasks & follow-ups"
            description="Create and track reminders so lead and customer follow-ups stay organized."
            badge="Demo data"
            tone="amber"
            icon={CheckSquare}
            footer="Explore tasks"
            onExplore={() => navigate('/app/tasks')}
          >
            <WidgetHeading label="Follow-up task" value="Sample" />
            <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-2 text-[9px] dark:border-amber-500/20 dark:bg-amber-500/10">
              <div className="font-semibold text-amber-800 dark:text-amber-300">Follow up with a lead</div>
              <div className="mt-1 text-slate-600 dark:text-zinc-400">Due date · Open</div>
            </div>
          </ModuleCard>

          <ModuleCard
            id="team-roles"
            title="Team & roles"
            description="Invite team members and assign an organization role that defines their access."
            badge="Demo data"
            tone="teal"
            icon={UsersRound}
            footer="Explore team"
            onExplore={() => navigate('/app/team')}
          >
            <WidgetHeading label="Organization member" value="Sample" />
            <div className="mt-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2 py-2 text-[9px] dark:border-white/5 dark:bg-white/5">
              <span className="font-semibold text-slate-700 dark:text-zinc-200">Example member</span>
              <span className="text-slate-500">Sales Agent</span>
            </div>
          </ModuleCard>

          <ModuleCard
            id="reports"
            title="Reports"
            description="Review win rate, lead-source conversion, revenue, and deals by stage."
            badge="Demo data"
            tone="cyan"
            icon={BarChart3}
            footer="Explore reports"
            onExplore={() => navigate('/app/reports')}
          >
            <WidgetHeading label="Report metrics" value="Sample" />
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[8px] text-slate-600 dark:text-zinc-300">
              <span className="rounded bg-white px-2 py-1.5 dark:bg-white/5">Win rate</span>
              <span className="rounded bg-white px-2 py-1.5 dark:bg-white/5">Lead sources</span>
              <span className="rounded bg-white px-2 py-1.5 dark:bg-white/5">Revenue</span>
              <span className="rounded bg-white px-2 py-1.5 dark:bg-white/5">Deals by stage</span>
            </div>
          </ModuleCard>
        </div>
      </div>
    </section>
  );
};

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
