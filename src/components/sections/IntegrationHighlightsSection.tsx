import React from 'react';
import { ArrowRight, Cable, Code2, Mail, MessageCircle, Phone, Webhook } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';

const items = [
  { title: 'REST API', detail: 'Connect your own tools with workspace API access.', status: 'Available', icon: Code2 },
  { title: 'Webhooks', detail: 'Send event updates to a service you manage.', status: 'Available', icon: Webhook },
  { title: 'Email sync', detail: 'Keep email conversations attached to customer records.', status: 'Coming soon', icon: Mail },
  { title: 'Calendar', detail: 'Coordinate meetings and follow-up reminders.', status: 'Coming soon', icon: Cable },
  { title: 'Messaging', detail: 'Bring customer messages into the workspace.', status: 'Coming soon', icon: MessageCircle },
  { title: 'Telephony', detail: 'Connect calls and recordings to customer history.', status: 'Coming soon', icon: Phone },
];

export const IntegrationHighlightsSection: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <section id="integrations" aria-labelledby="integration-highlights-title" className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#08110e] sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
          <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Integrations</p><h2 id="integration-highlights-title" className="mt-3 font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl">Works with your stack, honestly.</h2><p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">REST API and Webhooks are available in settings. Other connectors are coming soon.</p></div>
          <button type="button" onClick={() => navigate('/integrations')} className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-white/10 dark:text-slate-200 dark:hover:text-emerald-200">View integration details<ArrowRight className="h-3.5 w-3.5" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map(({ title, detail, status, icon: Icon }) => (
            <article key={title} className="group min-h-44 rounded-2xl border border-slate-200 bg-[#f8faf9] p-4 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg dark:border-white/10 dark:bg-[#101a15] dark:hover:border-emerald-300/30 sm:p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition group-hover:border-emerald-200 group-hover:text-emerald-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:group-hover:text-emerald-300"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1.5 min-h-10 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{detail}</p>
              <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status === 'Available' ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200' : 'bg-slate-200/70 text-slate-600 dark:bg-white/10 dark:text-slate-300'}`}>{status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
