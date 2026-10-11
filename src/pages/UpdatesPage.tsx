import React from 'react';

const updates = [
  {
    title: 'Homepage refresh',
    description: 'Clearer hero, sample-data labels and a new workspaces and security section.',
  },
  {
    title: 'Public pages updated',
    description: 'Features, Solutions, Pricing and Integrations now describe current capabilities and mark planned items as Coming soon.',
  },
  {
    title: 'Privacy and Terms pages',
    description: 'Draft pages added, pending legal review.',
  },
  {
    title: 'Navigation and footer cleanup',
    description: 'Fixed links and removed unsupported menu items.',
  },
];

export const UpdatesPage: React.FC = () => (
  <main className="min-h-dvh bg-[#020d0a] px-4 py-6 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="mb-6">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-emerald-200">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-emerald-300" />
          What&apos;s new
        </div>
        <h1 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-white">
          Always improving.
        </h1>
        <p className="mt-1.5 text-[10px] leading-relaxed text-slate-300">
          Recent releases and production improvements shipped to the platform.
        </p>
      </header>

      <ol aria-label="Product updates" className="relative space-y-5">
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[5px] top-2 w-px bg-white/10"
        />
        {updates.map((update) => (
          <li key={update.title} className="relative ml-6">
            <span
              aria-hidden="true"
              className="absolute -left-[24px] top-1.5 h-3 w-3 rounded-full border-[3px] border-[#020d0a] bg-emerald-400 shadow-[0_0_0_1px_rgba(52,211,153,0.2)]"
            />
            <article className="min-h-[80px] rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:px-4">
              <div className="mb-2 flex items-center justify-between gap-4">
                <time className="text-[9px] font-medium text-slate-300">October 2026</time>
                <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[8px] font-semibold leading-none text-emerald-200">
                  Website
                </span>
              </div>
              <h2 className="text-sm font-semibold leading-tight tracking-[-0.02em] text-white">
                {update.title}
              </h2>
              <p className="mt-1 text-[10px] leading-relaxed text-slate-300">
                {update.description}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </main>
);
