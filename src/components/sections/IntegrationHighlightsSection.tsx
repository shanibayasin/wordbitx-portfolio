import React from 'react';
import { Cable, Code2, Mail, MessageCircle, Phone, Webhook } from 'lucide-react';

const items = [
  { title: 'REST API', detail: 'Connect your own tools with workspace API access.', status: 'Available', icon: Code2 },
  { title: 'Webhooks', detail: 'Send event updates to a service you manage.', status: 'Available', icon: Webhook },
  { title: 'Email sync', detail: 'Keep email conversations attached to customer records.', status: 'Coming soon', icon: Mail },
  { title: 'Calendar', detail: 'Coordinate meetings and follow-up reminders.', status: 'Coming soon', icon: Cable },
  { title: 'Messaging', detail: 'Bring customer messages into the workspace.', status: 'Coming soon', icon: MessageCircle },
  { title: 'Telephony', detail: 'Connect calls and recordings to customer history.', status: 'Coming soon', icon: Phone },
];

export const IntegrationHighlightsSection: React.FC = () => {
  return (
    <section id="integrations" aria-labelledby="integration-highlights-title" className="relative isolate overflow-hidden border-y border-slate-200 bg-[#f8faf9] py-16 dark:border-white/10 dark:bg-[#08110e] lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(16,185,129,.08),transparent_75%)]" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-2xl sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Integrations</p>
          <h2 id="integration-highlights-title" className="mt-2 font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl">Connect with your stack.</h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">Bring the tools you use every day into one connected workspace.</p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, detail, status, icon: Icon }) => (
            <article key={title} className="group min-h-[168px] rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_-30px_rgba(15,23,42,.32)] transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-white/10 dark:bg-[#101a15] dark:hover:border-emerald-300/30 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-100 dark:border-emerald-300/15 dark:bg-emerald-300/10 dark:text-emerald-300 dark:group-hover:bg-emerald-300/15">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status === 'Available' ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200' : 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200'}`}>{status}</span>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
