import React, { useState, useEffect } from 'react';
import { Building, Users, DollarSign, Activity, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../router/Router';

export const SuperAdminPage: React.FC = () => {
  const { switchWorkspace } = useAuth();
  const { navigate } = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await api.getSuperAdminDashboard();
      setData(res);
    };
    load();
  }, []);

  if (!data) {
    return <div className="p-8 text-center text-slate-400">Loading super admin platform oversight...</div>;
  }

  const handleSwitch = async (orgId: string) => {
    await switchWorkspace(orgId);
    navigate('/app/dashboard');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Super Admin Platform Oversight</h1>
        <p className="text-xs text-slate-500 mt-1">
          Multi-tenant cross-organization management, active subscriptions, and system resource metrics
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Tenant Organizations</span>
          <span className="text-2xl font-bold text-slate-900 block mt-1">{data.totalOrganizations} Active</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">100% healthy tenants</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Platform MRR</span>
          <span className="text-2xl font-bold text-emerald-700 block mt-1">
            ${(data.monthlyRecurringRevenue || 18450).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">+22% month-over-month</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Registered Users</span>
          <span className="text-2xl font-bold text-indigo-700 block mt-1">{data.totalUsers} users</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Across all workspaces</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">API Requests (Today)</span>
          <span className="text-2xl font-bold text-purple-700 block mt-1">
            {(data.apiRequestsToday || 124500).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">Avg latency: 42ms</span>
        </div>
      </div>

      {/* Organizations directory */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Tenant Workspaces Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Industry</th>
                <th className="py-3 px-4">Subscription Plan</th>
                <th className="py-3 px-4">Country & Region</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Switch Workspace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(data.organizations || []).map((org: any) => (
                <tr key={org.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-bold text-slate-900">{org.name}</td>
                  <td className="py-3 px-4 text-slate-600">{org.industry}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {org.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{org.country}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {org.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleSwitch(org.id)}
                      className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition cursor-pointer"
                    >
                      Enter Workspace →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
