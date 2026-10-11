import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../../data/faqData';
import { useNavigation } from '../../context/NavigationContext';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id ?? null);
  const { navigate } = useNavigation();

  return (
    <section id="faq" className="border-b border-slate-200 bg-white py-16 dark:border-white/10 dark:bg-[#08110e] lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_.72fr] lg:gap-16 lg:px-8">
        <div>
          <div className="mb-8 max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-800 dark:text-emerald-300">Questions, answered</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl">Good to know before you begin.</h2><p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">Clear answers about what WordbitX supports today and what is still on the roadmap.</p></div>
          <div className="space-y-2.5">
            {FAQ_DATA.slice(0, 6).map((item) => {
              const open = openId === item.id;
              const panelId = `home-${item.id}-answer`;
              return <article key={item.id} className={`overflow-hidden rounded-2xl border transition-colors ${open ? 'border-emerald-300 bg-[#f9fcfa] dark:border-emerald-300/20 dark:bg-white/[0.035]' : 'border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b1510]'}`}>
                <h3><button type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenId(open ? null : item.id)} className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-emerald-600 sm:px-5"><span className="text-sm font-semibold text-slate-900 dark:text-white">{item.question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-emerald-700 dark:text-emerald-300' : ''}`} /></button></h3>
                <div id={panelId} aria-hidden={!open} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="px-4 pb-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 sm:px-5">{item.answer}</p></div></div>
              </article>;
            })}
          </div>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative isolate overflow-hidden rounded-3xl border border-emerald-900/30 bg-[#071510] p-6 text-white sm:p-8"><div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-[80px]" /><span className="grid h-11 w-11 place-items-center rounded-2xl border border-emerald-200/15 bg-emerald-300/10 text-emerald-200"><MessageCircle className="h-5 w-5" /></span><h3 className="mt-5 text-xl font-semibold tracking-tight">Still have questions?</h3><p className="mt-2 text-sm leading-relaxed text-white/65">Talk with our team about the current product, what is in demo, and what is coming next.</p><button type="button" onClick={() => navigate('/contact')} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-400 px-4 text-sm font-semibold text-[#062015] transition hover:bg-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">Contact the team</button><button type="button" onClick={() => navigate('/pricing')} className="mt-4 block text-xs font-medium text-emerald-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-200">See demo pricing →</button></div>
        </aside>
      </div>
    </section>
  );
};
