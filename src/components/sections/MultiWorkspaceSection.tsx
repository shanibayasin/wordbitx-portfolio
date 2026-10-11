import React, { useState } from 'react';
import { Building2, Check, ShieldCheck, UsersRound } from 'lucide-react';
import { DEMO_PERMISSIONS, DEMO_ROLES } from '../demo/sampleData';

export const MultiWorkspaceSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section id="workspaces" aria-labelledby="workspace-title" className="border-y border-slate-200 bg-white py-20 dark:border-white/10 dark:bg-[#08110e] sm:py-28">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-700 dark:text-emerald-300">Workspaces & access</p>
          <h2 id="workspace-title" className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-.045em] text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">A clear boundary for every team.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">Organizations keep their own workspace, with organization roles that determine access. The diagrams and examples below are illustrative.</p>
        </div>

        <div className="grid items-stretch gap-5 lg:grid-cols-[.8fr_1.2fr]">
          <article className="rounded-3xl border border-slate-200 bg-[#f7faf8] p-5 dark:border-white/10 dark:bg-[#101a15] sm:p-7">
            <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace structure</span><span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-200">Demo data</span></div>
            <div className="mt-6 rounded-2xl border border-emerald-300/70 bg-white p-4 shadow-sm dark:border-emerald-300/20 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-200"><Building2 className="h-5 w-5" /></span><div><p className="text-sm font-semibold text-slate-900 dark:text-white">Northstar Group</p><p className="mt-1 text-xs text-slate-500">Organization workspace</p></div></div>
              <div className="ml-5 mt-4 space-y-3 border-l border-dashed border-slate-300 pl-5 dark:border-white/15">
                {['Northstar Health', 'Northstar Research'].map((workspace, index) => <div key={workspace} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/[0.035]"><span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-cyan-500'}`} /><span className="flex-1 text-xs font-medium text-slate-800 dark:text-slate-200">{workspace}</span><span className="text-xs text-slate-400">Workspace</span></div>)}
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />Workspace records stay scoped to their organization.</p>
          </article>

          <article className="min-w-0 rounded-3xl border border-slate-200 bg-[#f7faf8] p-5 dark:border-white/10 dark:bg-[#101a15] sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role permissions</p><h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">Access by role</h3></div><span className="w-fit rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 dark:border-amber-300/15 dark:bg-amber-300/10 dark:text-amber-200">Illustrative matrix</span></div>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">{DEMO_ROLES.map((role, index) => <button key={role} type="button" onClick={() => setActiveRole(index)} aria-pressed={activeRole === index} className={`min-h-10 shrink-0 rounded-full border px-3 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-emerald-600 ${activeRole === index ? 'border-emerald-400 bg-emerald-50 text-emerald-950 dark:border-emerald-300/30 dark:bg-emerald-300/10 dark:text-emerald-100' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300'}`}>{role}</button>)}</div>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#0b1510]">
              <table className="w-full min-w-[420px] text-left text-xs"><thead><tr className="border-b border-slate-100 dark:border-white/10"><th scope="col" className="px-4 py-3 font-medium text-slate-500">Permission</th>{DEMO_ROLES.map((role, index) => <th key={role} scope="col" className={`px-3 py-3 text-center text-xs font-semibold ${index === activeRole ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-300/10 dark:text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>{role}</th>)}</tr></thead><tbody>{DEMO_PERMISSIONS.map((permission) => <tr key={permission.action} className="border-b border-slate-100 last:border-0 dark:border-white/5"><th scope="row" className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{permission.action}</th>{permission.values.map((value, index) => <td key={`${permission.action}-${index}`} className={`px-2 py-3 text-center text-xs transition-colors ${index === activeRole ? 'bg-emerald-50/80 font-semibold text-emerald-900 dark:bg-emerald-300/[0.07] dark:text-emerald-100' : 'text-slate-500 dark:text-slate-400'}`}>{value === '—' ? <span aria-label="No access">—</span> : <span className="inline-flex items-center justify-center gap-1">{index === activeRole && <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-300" />}{value}</span>}</td>)}</tr>)}</tbody></table>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><UsersRound className="h-4 w-4" />Organization roles are separate from the platform Super Admin role.</p>
          </article>
        </div>
      </div>
    </section>
  );
};
