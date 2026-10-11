import React from 'react';
import { useNavigation } from '../../context/NavigationContext';

const linkClass = 'text-slate-400 transition-colors hover:text-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';
const comingSoonClass = 'text-slate-500';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="border-t border-[#183932] bg-[#0b1f1b] text-sm text-slate-300">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-base font-black text-[#071714] shadow-sm">
                W
              </span>
              <span className="flex flex-col leading-none">
                <span className="block text-base font-bold leading-tight tracking-tight text-white">
                  Wordbit<span className="text-emerald-400">X</span>
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
                  CRM
                </span>
              </span>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-slate-300">
              Manage leads, deals, customer records, call logs, tasks, reports, workflows, and team roles in organization workspaces.
            </p>
            <button
              onClick={() => navigate('/demo')}
              className={`${linkClass} cursor-pointer text-xs font-bold`}
            >
              Request a demo
            </button>
          </div>

          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-white">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/features')} className={`${linkClass} cursor-pointer`}>All features</button></li>
              <li><button onClick={() => navigate('/#lead-management')} className={`${linkClass} cursor-pointer`}>Lead management</button></li>
              <li><button onClick={() => navigate('/#deal-pipeline')} className={`${linkClass} cursor-pointer`}>Deal pipeline</button></li>
              <li><button onClick={() => navigate('/#call-logging')} className={`${linkClass} cursor-pointer`}>Call logging</button></li>
              <li><button onClick={() => navigate('/#tasks-follow-ups')} className={`${linkClass} cursor-pointer`}>Tasks &amp; follow-ups</button></li>
              <li><button onClick={() => navigate('/app/customers')} className={`${linkClass} cursor-pointer`}>Customers &amp; companies</button></li>
              <li><button onClick={() => navigate('/app/reports')} className={`${linkClass} cursor-pointer`}>Reports</button></li>
              <li><button onClick={() => navigate('/app/workflows')} className={`${linkClass} cursor-pointer`}>Workflow rules</button></li>
              <li><button onClick={() => navigate('/integrations')} className={`${linkClass} cursor-pointer`}>Integrations</button></li>
              <li><button onClick={() => navigate('/pricing')} className={`${linkClass} cursor-pointer`}>Demo pricing</button></li>
              <li><span aria-disabled="true" className={comingSoonClass}>Customer support · Coming soon</span></li>
              <li><span aria-disabled="true" className={comingSoonClass}>AI assistant · Coming soon</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-white">Solutions</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/#deal-pipeline')} className={`${linkClass} cursor-pointer`}>Sales teams</button></li>
              <li><button onClick={() => navigate('/#call-logging')} className={`${linkClass} cursor-pointer`}>Call-center operations</button></li>
              <li><button onClick={() => navigate('/#security')} className={`${linkClass} cursor-pointer`}>Multi-workspace teams</button></li>
              <li><button onClick={() => navigate('/solutions')} className={`${linkClass} cursor-pointer`}>All solutions</button></li>
              <li><span aria-disabled="true" className={comingSoonClass}>Support desk · Coming soon</span></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3.5 text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => navigate('/about')} className={`${linkClass} cursor-pointer`}>About WordbitX</button></li>
              <li><button onClick={() => navigate('/resources')} className={`${linkClass} cursor-pointer`}>Guides &amp; playbooks</button></li>
              <li><button onClick={() => navigate('/updates')} className={`${linkClass} cursor-pointer`}>What&apos;s new</button></li>
              <li><button onClick={() => navigate('/contact')} className={`${linkClass} cursor-pointer`}>Contact</button></li>
              <li><button onClick={() => navigate('/demo')} className={`${linkClass} cursor-pointer`}>Request a demo</button></li>
              <li><button onClick={() => navigate('/login')} className={`${linkClass} cursor-pointer`}>Sign in</button></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#183932] pt-8 text-xs text-slate-400 sm:flex-row">
          <div>© {new Date().getFullYear()} WordbitX. All rights reserved.</div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => navigate('/privacy')} className={linkClass}>Privacy</button>
            <span aria-hidden="true">•</span>
            <button onClick={() => navigate('/terms')} className={linkClass}>Terms</button>
            <span aria-hidden="true">•</span>
            <button onClick={() => navigate('/#security')} className={linkClass}>Security</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
