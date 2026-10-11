import React from 'react';
import {
  ArrowRight,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';

interface Deal {
  id: number;
  value: string;
}

const initialDeals: Deal[] = [
  { id: 1, value: '$14,500' },
  { id: 2, value: '$9,200' },
  { id: 3, value: '$8,400' },
];

const panelClass =
  'rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-lg transition-colors dark:border-white/10 dark:bg-[#0e1517] sm:p-7';
const textClass = 'text-slate-600 dark:text-zinc-300';
export const AlternatingFeatureShowcase: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const { navigate } = useNavigation();
  const isDark = resolvedTheme === 'dark';
  const deals = initialDeals;

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
            <SectionEyebrow>Deal pipeline</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              See deal values and stages on a Kanban board.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Move deals between stages and keep their values visible as your pipeline changes.
            </p>
            <ActionLink onClick={() => navigate('/app/deals')}>
              Explore deals
            </ActionLink>
          </div>

          <div className="lg:col-span-7">
            <section id="deal-pipeline" aria-label="Sample deal pipeline" className={panelClass}>
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-base">
                  Deal stages
                </h3>
                <span className="rounded bg-[#fff5dd] px-2 py-1 text-[9px] font-semibold text-[#9a6a13]">Demo data</span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { stage: 'Discovery', deal: deals[0] },
                  { stage: 'Proposal', deal: deals[1] },
                  { stage: 'Won', deal: deals[2] },
                ].map(({ stage, deal }) => (
                  <div key={stage} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5">
                    <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-bold text-slate-700 dark:text-zinc-200">
                      <span>{stage}</span>
                      <span className="rounded-full bg-white px-1.5 py-0.5 text-[8px] font-medium text-slate-500 dark:bg-black/20 dark:text-zinc-400">Example</span>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-2.5 dark:border-white/5 dark:bg-[#0e1517]">
                      <div className="text-[10px] font-semibold text-slate-900 dark:text-white">Example deal</div>
                      <div className="mt-1 font-mono text-[9px] text-slate-500 dark:text-zinc-400">{deal.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className={panelClass}>
              <div id="call-log" className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Call log</h3>
                <span className="rounded bg-[#fff5dd] px-2 py-1 text-[9px] font-semibold text-[#9a6a13]">Demo data</span>
              </div>
              <div className="space-y-3">
                {[
                  { record: 'Example lead', details: 'Call logged · Notes saved' },
                  { record: 'Example customer', details: 'Call logged · Follow-up task' },
                ].map((item) => (
                  <div key={item.record} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5">
                    <div className="min-w-0">
                      <div className="truncate text-xs font-bold text-slate-900 dark:text-white">{item.record}</div>
                      <div className="mt-1 text-[10px] text-slate-500 dark:text-zinc-400">{item.details}</div>
                    </div>
                    <span className="shrink-0 rounded-md bg-white px-2 py-1 text-[9px] font-semibold text-slate-600 dark:bg-black/20 dark:text-zinc-300">Sample</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 space-y-5 lg:order-2 lg:col-span-5">
            <SectionEyebrow>Call logging</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Keep call notes with the right records.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Log calls against leads or customers and keep notes and follow-up details in their activity history.
            </p>
            <ActionLink onClick={() => navigate('/app/calls')}>Explore call logging</ActionLink>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-5 lg:col-span-5">
            <SectionEyebrow>Lead capture and conversion</SectionEyebrow>
            <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              Turn a lead into a customer and a deal.
            </h2>
            <p className={`text-sm leading-relaxed sm:text-base ${textClass}`}>
              Create leads, record their source, assign an owner, and convert them to a customer and deal when ready.
            </p>
            <ActionLink onClick={() => navigate('/app/leads')}>Explore lead management</ActionLink>
          </div>

          <div className="lg:col-span-7">
            <div id="lead-conversion" className={panelClass}>
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-white/5">
                <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  Lead lifecycle
                </h3>
                <span className="rounded bg-[#fff5dd] px-2 py-1 text-[9px] font-semibold text-[#9a6a13]">Demo data</span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Lead', detail: 'Source recorded' },
                  { label: 'Customer', detail: 'Record created' },
                  { label: 'Deal', detail: 'Stage and value tracked' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5">
                    <div className="text-[10px] font-bold uppercase tracking-wide text-slate-500 dark:text-zinc-400">{item.label}</div>
                    <div className="mt-2 text-xs font-semibold text-slate-900 dark:text-white">Example record</div>
                    <div className="mt-1 text-[9px] text-slate-500 dark:text-zinc-400">{item.detail}</div>
                  </div>
                ))}
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
