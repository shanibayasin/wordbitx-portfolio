import React, { useState, useEffect } from 'react';
import { Users, Plus, Shield, Mail, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { User, UserRole } from '../../types/crm';

export const TeamPage: React.FC = () => {
  const { organization } = useAuth();
  const [team, setTeam] = useState<User[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('SALES_AGENT');
  const [inviteTitle, setInviteTitle] = useState('Account Executive');

  const loadTeam = async () => {
    const data = await api.getTeam();
    setTeam(data || []);
  };

  useEffect(() => {
    loadTeam();
    const unsub = crmStore.subscribe(loadTeam);
    return unsub;
  }, [organization?.id]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    await api.inviteTeamMember({
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      title: inviteTitle,
    });

    setInviteName('');
    setInviteEmail('');
    setShowInviteModal(false);
    loadTeam();
  };

  const roleBadge = (role: string) => {
    switch (role) {
      case 'ORGANIZATION_OWNER':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ORGANIZATION_ADMIN':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SALES_MANAGER':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SUPER_ADMIN':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members & Permissions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage organization members, seat allocations, and role-based permissions (RBAC)
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((user) => (
          <div key={user.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-xs text-slate-900 truncate">{user.name}</h3>
                <span className="text-[11px] text-slate-500 truncate block">{user.title || 'Team Member'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-[11px] truncate">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="pt-1">
                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${roleBadge(user.role)}`}>
                  {user.role.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Invite Team Member</h3>
            <p className="text-xs text-slate-500 mb-4">Grant access to this workspace</p>

            <form onSubmit={handleInvite} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Zainab Malik"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="zainab@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  >
                    <option value="SALES_AGENT">Sales Agent</option>
                    <option value="SALES_MANAGER">Sales Manager</option>
                    <option value="ORGANIZATION_ADMIN">Organization Admin</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={inviteTitle}
                    onChange={(e) => setInviteTitle(e.target.value)}
                    placeholder="Account Executive"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
