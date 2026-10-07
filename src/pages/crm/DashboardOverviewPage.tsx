import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  UserCheck,
  CheckSquare,
  PhoneCall,
  ArrowUpRight,
  Plus,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  Sparkles,
  Play,
  RotateCcw
} from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../router/Router';

export const DashboardOverviewPage: React.FC = () => {
  const { organization } = useAuth();
  const { navigate } = useRouter();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('15000');

  const loadData = async () => {
    try {
      const data = await api.getDashboard({ organizationId: organization?.id || '', range: timeRange });
      setMetrics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const unsub = crmStore.subscribe(loadData);
    return unsub;
  }, [organization?.id, timeRange]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadCompany) return;

    await api.createLead({
      name: newLeadName,
      company: newLeadCompany,
      email: newLeadEmail || `${newLeadName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      value: Number(newLeadValue) || 12000,
      status: 'New',
      source: 'Website',
    });

    setNewLeadName('');
    setNewLeadCompany('');
    setNewLeadEmail('');
    setShowAddLeadModal(false);
    loadData();
  };

  const handleToggleTask = async (taskId: string) => {
    await api.updateTask(taskId, {});
    loadData();
  };

  if (loading || !metrics) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium text-slate-500">Loading workspace dashboard...</span>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Leads',
      value: metrics.totalLeads,
      change: '+18.4%',
      positive: true,
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      label: 'Active Pipeline Value',
      value: `$${(metrics.totalPipelineValue || 0).toLocaleString()}`,
      sub: `${metrics.totalDeals} active deals`,
      change: '+24.1%',
      positive: true,
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      label: 'Won Revenue',
      value: `$${(metrics.totalWonRevenue || 0).toLocaleString()}`,
      sub: `Win Rate: ${metrics.winRate || 38}%`,
      change: '+32.8%',
      positive: true,
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      label: 'Active Customers',
      value: metrics.totalCustomers || 2,
      sub: 'Multi-account subscriptions',
      change: '+12.5%',
      positive: true,
      icon: UserCheck,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ];

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Welcome & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">CRM Overview Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              Live Workspace
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time pipeline performance, qualified inbound leads, and activity log for{' '}
            <span className="font-semibold text-slate-700">{organization?.name || 'ABC Technologies'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-between md:justify-end w-full md:w-auto">
          {/* Time range picker */}
          <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5 text-xs shadow-xs">
            {(['7d', '30d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md font-medium transition text-xs ${
                  timeRange === r ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '30d' ? '30 Days' : 'Quarter'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddLeadModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5 sm:mt-3 flex items-baseline justify-between">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{card.value}</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.change}
                </span>
              </div>
              {card.sub && <p className="text-[11px] text-slate-500 mt-1">{card.sub}</p>}
            </div>
          );
        })}
      </div>

      {/* Pipeline Stage Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Pipeline Stage Distribution</h2>
            <p className="text-xs text-slate-500">Deals actively progressing across sales pipeline stages</p>
          </div>
          <button
            onClick={() => navigate('/app/pipeline')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 self-start sm:self-auto"
          >
            Open Kanban Board <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {Object.entries(metrics.stages || {}).map(([stage, val]: [string, any]) => (
            <div
              key={stage}
              onClick={() => navigate('/app/pipeline')}
              className="p-2.5 sm:p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/70 transition cursor-pointer text-center"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider block truncate">
                {stage}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 sm:mt-1 block">{val.count || 0}</span>
              <span className="text-[10px] sm:text-[11px] font-medium text-emerald-700 block">
                ${((val.value || 0) / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Two-Column Section: Leads & Deals vs Tasks & Calls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Left 2 Cols: Recent Leads & Deals */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* Recent Leads */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recent Qualified Leads</h3>
                <p className="text-xs text-slate-500">Inbound prospects ready for outreach</p>
              </div>
              <button
                onClick={() => navigate('/app/leads')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View all ({metrics.totalLeads}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Cards for Leads */}
            <div className="block sm:hidden divide-y divide-slate-100 p-2">
              {(metrics.recentLeads || []).map((lead: any) => (
                <div key={lead.id} className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{lead.name}</div>
                      <div className="text-[11px] text-slate-500">{lead.company} • {lead.email}</div>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        lead.status === 'Won'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lead.status === 'Qualified'
                          ? 'bg-blue-100 text-blue-800'
                          : lead.status === 'Proposal'
                          ? 'bg-purple-100 text-purple-800'
                          : lead.status === 'Negotiation'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-emerald-700">
                      ${(lead.value || 0).toLocaleString()}
                    </span>
                    <button
                      onClick={() => {
                        api.convertLead(lead.id);
                        loadData();
                      }}
                      className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                    >
                      Convert to Deal
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table for Leads */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-b border-slate-200/70 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Value</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Owner</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(metrics.recentLeads || []).map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] text-slate-500">{lead.email}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{lead.company}</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">
                        ${(lead.value || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.status === 'Won'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.status === 'Qualified'
                              ? 'bg-blue-100 text-blue-800'
                              : lead.status === 'Proposal'
                              ? 'bg-purple-100 text-purple-800'
                              : lead.status === 'Negotiation'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{lead.ownerName || 'Sara Khan'}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            api.convertLead(lead.id);
                            loadData();
                          }}
                          className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                        >
                          Convert
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Deals Tracker */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Active Deals & Revenue Forecast</h3>
                <p className="text-xs text-slate-500">Pipeline deals approaching scheduled close</p>
              </div>
              <button
                onClick={() => navigate('/app/deals')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View all ({metrics.totalDeals}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Cards for Deals */}
            <div className="block sm:hidden divide-y divide-slate-100 p-2">
              {(metrics.recentDeals || []).map((deal: any) => (
                <div key={deal.id} className="p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{deal.name}</div>
                      <div className="text-[11px] text-slate-500">Close: {deal.expectedClose}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 shrink-0">
                      {deal.stage}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-bold text-emerald-700 text-xs">
                      ${(deal.value || 0).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${deal.probability || 50}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500">{deal.probability}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table for Deals */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/70 text-slate-500 border-b border-slate-200/70 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Deal Name</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Probability</th>
                    <th className="py-3 px-4">Expected Close</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(metrics.recentDeals || []).map((deal: any) => (
                    <tr key={deal.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">{deal.name}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        ${(deal.value || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                          {deal.stage}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-indigo-600 rounded-full"
                              style={{ width: `${deal.probability || 50}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-slate-500">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{deal.expectedClose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Follow-up Tasks & Live Call Logs */}
        <div className="space-y-6">
          {/* Action Tasks */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Upcoming Tasks</h3>
              </div>
              <button
                onClick={() => navigate('/app/tasks')}
                className="text-xs text-indigo-600 font-semibold hover:underline"
              >
                All tasks
              </button>
            </div>

            <div className="space-y-2.5">
              {(metrics.recentTasks || []).map((t: any) => (
                <div
                  key={t.id}
                  onClick={() => handleToggleTask(t.id)}
                  className={`p-3 rounded-lg border transition cursor-pointer flex items-start gap-3 ${
                    t.status === 'Completed'
                      ? 'bg-slate-50/80 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200/80 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.status === 'Completed'}
                    readOnly
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold ${
                        t.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-800'
                      }`}
                    >
                      {t.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{t.dueDate}</span>
                      <span>•</span>
                      <span className="text-indigo-600 font-medium">{t.assignedUserName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Telephony Calls */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Recent Calls</h3>
              </div>
              <button
                onClick={() => navigate('/app/calls')}
                className="text-xs text-emerald-600 font-semibold hover:underline"
              >
                Call logs
              </button>
            </div>

            <div className="space-y-3">
              {(metrics.recentCalls || []).map((c: any) => (
                <div key={c.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 text-xs">
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{c.relatedName || c.recipient}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        c.direction === 'Incoming'
                          ? 'bg-blue-100 text-blue-700'
                          : c.direction === 'Missed'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {c.direction} ({Math.floor(c.durationSeconds / 60)}m {c.durationSeconds % 60}s)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{c.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add New Lead</h3>
            <p className="text-xs text-slate-500 mb-4">Enter prospect details to log into pipeline</p>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Tariq Mehmood"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  placeholder="e.g. Apex Global Tech"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Value ($)</label>
                <input
                  type="number"
                  value={newLeadValue}
                  onChange={(e) => setNewLeadValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
