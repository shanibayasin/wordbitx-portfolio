import React from 'react';
import { Building2, FileText, KeyRound, LockKeyhole, ShieldCheck, UsersRound } from 'lucide-react';

const organizationRoles = [
  'Organization Owner',
  'Admin',
  'Sales Manager',
  'Sales Agent',
  'Viewer',
];

const securityFacts = [
  { label: 'Role-based access', icon: UsersRound },
  { label: 'Audit logs', icon: FileText },
  { label: 'Hashed passwords', icon: LockKeyhole },
  { label: 'API keys', icon: KeyRound },
];

export const MultiWorkspaceSection: React.FC = () => (
  <section id="security" className="border-b border-slate-200/80 bg-[#f5f8f6] py-20 dark:border-[#183932] dark:bg-[#071714] md:py-28">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-14 max-w-3xl space-y-4 text-center">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
          Multi-workspace and roles
        </div>
        <h2 className="text-balance font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
          Separate organizations, clear access.
        </h2>
        <p className="text-balance text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
          Switch between organizations or create a new one. Members receive an organization role, and audit logs record activity.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-[#183932] dark:bg-[#0e2722]">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1f1b] text-emerald-300">
              <Building2 aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Organization workspaces</h3>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Each organization has its own workspace.</p>
            </div>
          </div>
          <div className="space-y-3">
            {['Current organization', 'Another organization'].map((label, index) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 rounded-xl border p-3 ${
                  index === 0
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-white/5'
                }`}
              >
                <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200">{label}</span>
                {index === 0 && <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400">Selected</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
            Workspace examples shown for illustration.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-[#183932] dark:bg-[#0e2722]">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-[#12352e] dark:text-emerald-300">
              <ShieldCheck aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Organization roles</h3>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Set a role when inviting team members.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {organizationRoles.map((role) => (
              <span key={role} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-semibold text-slate-700 dark:border-white/5 dark:bg-white/5 dark:text-zinc-300">
                {role}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500 dark:text-slate-400">
            Platform Super Admin is a separate platform-level role.
          </p>
        </section>
      </div>

      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-4">
        {securityFacts.map(({ label, icon: Icon }) => (
          <div key={label} className="flex min-h-16 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-[10px] font-semibold text-slate-700 dark:border-[#183932] dark:bg-[#0e2722] dark:text-zinc-300">
            <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
            {label}
          </div>
        ))}
      </div>
    </div>
  </section>
);
