import React, { useState } from 'react';
import { Building2, Check, ShieldCheck, UsersRound } from 'lucide-react';
import { DEMO_PERMISSIONS, DEMO_ROLES } from '../demo/sampleData';

export const MultiWorkspaceSection: React.FC = () => {
  const [activeRole, setActiveRole] = useState(0);

  return (
    <section id="workspaces" aria-labelledby="workspace-title" className="relative isolate overflow-hidden border-y border-white/10 bg-[#071510] py-16 text-white lg:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_18%_0%,rgba(16,185,129,.13),transparent_42%)]" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-300">Workspaces & access</p>
          <h2 id="workspace-title" className="mt-3 text-balance font-display text-3xl font-semibold tracking-[-.045em] text-white sm:text-4xl lg:text-5xl">A clear boundary for every team.</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300">Organizations keep their own workspace, with organization roles that determine access. The diagrams and examples below are illustrative.</p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
          <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,.2)] backdrop-blur-xl sm:p-7 lg:col-span-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Workspace structure</span>
              <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">Demo data</span>
            </div>
            <div className="mt-6 rounded-2xl border border-emerald-300/20 bg-[#0b1c14] p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-emerald-200/10 bg-emerald-300/10 text-emerald-200"><Building2 className="h-5 w-5" /></span>
                <div><p className="text-sm font-semibold text-white">Cortexa Group</p><p className="mt-1 text-xs text-slate-300">Organization workspace</p></div>
              </div>
              <div className="ml-5 mt-4 space-y-3 border-l border-dashed border-white/20 pl-5">
                {['Cortexa Health', 'Northpeak Cloud'].map((workspace, index) => (
                  <div key={workspace} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <span className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-emerald-400' : 'bg-emerald-200'}`} />
                    <span className="flex-1 text-xs font-medium text-white">{workspace}</span>
                    <span className="text-xs text-slate-300">Workspace</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs leading-relaxed text-slate-300"><ShieldCheck className="h-4 w-4 shrink-0 text-emerald-300" />Workspace records stay scoped to their organization.</p>
          </article>

          <article className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_70px_rgba(0,0,0,.2)] backdrop-blur-xl sm:p-7 lg:col-span-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div><p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Role permissions</p><h3 className="mt-2 text-lg font-semibold text-white">Access by role</h3></div>
              <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">Demo data</span>
            </div>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
              {DEMO_ROLES.map((role, index) => (
                <button key={role} type="button" onClick={() => setActiveRole(index)} aria-pressed={activeRole === index} className={`min-h-10 shrink-0 rounded-full border px-3 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-emerald-300 ${activeRole === index ? 'border-emerald-300/35 bg-emerald-300/15 text-emerald-50' : 'border-white/15 bg-white/[0.035] text-slate-200 hover:border-white/30'}`}>{role}</button>
              ))}
            </div>
            <div className="mt-3 overflow-x-auto rounded-2xl border border-white/10 bg-[#0b1711]">
              <table className="w-full min-w-[520px] text-left text-xs">
                <thead><tr className="border-b border-white/10"><th scope="col" className="px-4 py-3 font-semibold text-slate-300">Permission</th>{DEMO_ROLES.map((role, index) => <th key={role} scope="col" className={`px-3 py-3 text-center text-xs font-semibold ${index === activeRole ? 'bg-emerald-300/10 text-emerald-100' : 'text-slate-300'}`}>{role}</th>)}</tr></thead>
                <tbody>{DEMO_PERMISSIONS.map((permission) => (
                  <tr key={permission.action} className="border-b border-white/5 last:border-0">
                    <th scope="row" className="px-4 py-3 font-medium text-slate-200">{permission.action}</th>
                    {permission.values.map((value, index) => <td key={`${permission.action}-${index}`} className={`px-2 py-3 text-center text-xs transition-colors ${index === activeRole ? 'bg-emerald-300/[0.07] font-semibold text-emerald-100' : 'text-slate-300'}`}>{value === '—' ? <span aria-label="No access">—</span> : <span className="inline-flex items-center justify-center gap-1">{index === activeRole && <Check className="h-3 w-3 text-emerald-300" />}{value}</span>}</td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-slate-300"><UsersRound className="h-4 w-4 text-emerald-300" />Organization roles are separate from the platform Super Admin role.</p>
          </article>
        </div>
      </div>
    </section>
  );
};
