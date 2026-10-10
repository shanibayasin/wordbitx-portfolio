import React from 'react';
import { ArrowRight, Code2, KeyRound, ShieldCheck, Webhook } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const capabilities = [
  {
    title: 'Developer-first API',
    description: 'Connect your customer data to the tools and workflows your team already uses.',
    icon: Code2,
  },
  {
    title: 'Secure by design',
    description: 'Use scoped credentials and workspace-level permissions for every integration.',
    icon: KeyRound,
  },
  {
    title: 'Real-time events',
    description: 'React to lead, deal, and customer updates with webhook event delivery.',
    icon: Webhook,
  },
  {
    title: 'Verified requests',
    description: 'Protect inbound events with signed requests and clear response handling.',
    icon: ShieldCheck,
  },
];

export const DeveloperIntegrationOverviewSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section
      aria-labelledby="developer-integration-title"
      className="border-y border-slate-200/70 bg-[#f8faf9] py-14 dark:border-white/5 dark:bg-[#070a0b] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Developer platform
          </span>
          <h2
            id="developer-integration-title"
            className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-3xl lg:text-4xl"
          >
            Connect your customer operations to the tools you rely on.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 dark:text-zinc-300 sm:text-base">
            Build secure integrations with the WordbitX API and event-driven webhooks.
          </p>
        </header>

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1.15fr)_minmax(0,1fr)] lg:gap-7">
          <div className="space-y-5">
            {capabilities.slice(0, 2).map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0e1517] sm:p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">{description}</p>
              </article>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-emerald-900/60 bg-[#0b1f1b] font-mono text-[10px] text-slate-200 shadow-xl shadow-emerald-950/15 sm:text-xs">
            <div className="flex items-center justify-between border-b border-emerald-900/60 bg-[#071714] px-3.5 py-3 sm:px-4">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-900" />
                  <span className="h-2 w-2 rounded-full bg-emerald-800" />
                  <span className="h-2 w-2 rounded-full bg-emerald-700" />
                </span>
                <span className="text-[9px] font-semibold text-emerald-300 sm:text-[10px]">POST /api/v1/leads</span>
              </div>
              <span className="rounded border border-emerald-800 bg-[#12352e] px-2 py-1 text-[8px] text-emerald-200 sm:text-[9px]">
                cURL
              </span>
            </div>
            <div className="overflow-x-auto px-4 py-4 sm:px-5 sm:py-5">
              <pre className="min-w-[280px] leading-[1.8]">
                <span className="text-emerald-500/80"># Create a lead</span>{'\n'}
                <span className="font-bold text-emerald-300">curl</span> -X POST https://api.wordbitx.com/v1/leads \{'\\'}
                {'\n'}  -H <span className="text-emerald-400">"Authorization: Bearer ••••••"</span> \{'\\'}
                {'\n'}  -H <span className="text-emerald-400">"Content-Type: application/json"</span> \{'\\'}
                {'\n'}  -d <span className="text-amber-300">{`'{`}</span>{'\n'}
                {'    '}<span className="text-emerald-300">"name"</span>: <span className="text-emerald-200">"Alex Morgan"</span>,{'\n'}
                {'    '}<span className="text-emerald-300">"email"</span>: <span className="text-emerald-200">"alex@example.com"</span>,{'\n'}
                {'    '}<span className="text-emerald-300">"company"</span>: <span className="text-emerald-200">"Northstar Labs"</span>{'\n'}
                {'  '}<span className="text-amber-300">{`}'`}</span>
              </pre>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-emerald-900/60 bg-[#071714] px-4 py-2.5 text-[9px] sm:px-5">
              <span className="text-slate-400">Example request · credentials masked</span>
              <span className="font-bold text-emerald-400">JSON API</span>
            </div>
          </div>

          <div className="space-y-5">
            {capabilities.slice(2, 4).map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0e1517] sm:p-5">
                <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">{description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/integrations')}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-xs font-bold text-[#071714] shadow-sm transition-colors hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Explore integration options
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
