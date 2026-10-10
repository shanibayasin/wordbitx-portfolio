import React, { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  CheckSquare,
  PhoneCall,
  Plus,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../router/Router';
import { useToast } from '../../components/common/Toast';
import type { Activity, Call, Deal, KpiMetric, Lead, Task } from '../../types/crm';

interface DashboardMetrics {
  kpi?: Partial<Record<'totalLeads' | 'openPipeline' | 'wonRevenue' | 'winRate' | 'overdueTasks', KpiMetric>>;
  totals?: {
    allLeadsCount?: number;
    allDealsCount?: number;
    activeDealsCount?: number;
    activePipelineValue?: number;
    allCustomersCount?: number;
  };
  pipelineStages?: Record<string, { count: number; value: number }>;
  stages?: Record<string, { count: number; value: number }>;
  recentLeads?: Lead[];
  recentDeals?: Deal[];
  recentCalls?: Call[];
  recentActivities?: Activity[];
  upcomingTasks?: Task[];
  recentTasks?: Task[];
  totalLeads?: number;
  totalDeals?: number;
  totalPipelineValue?: number;
  totalWonRevenue?: number;
  totalCustomers?: number;
  winRate?: number;
  overdueTasks?: number;
  isDemo?: boolean;
}

export const DashboardOverviewPage: React.FC = () => {
  const { organization } = useAuth();
  const { navigate } = useRouter();
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('');

  const loadData = async () => {
    try {
      const data = await api.getDashboard({ range: timeRange });
      setMetrics(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dashboard data could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError('');
    loadData();
    const unsub = crmStore.subscribe(loadData);
    return unsub;
  }, [organization?.id, timeRange]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = Number(newLeadValue);
    if (!newLeadName.trim() || !newLeadCompany.trim() || !newLeadEmail.trim() || !Number.isFinite(value) || value < 0) {
      return;
    }

    try {
      await api.createLead({
        name: newLeadName.trim(),
        company: newLeadCompany.trim(),
        email: newLeadEmail.trim(),
        value,
        status: 'New',
        source: 'Website',
      });
      setNewLeadName('');
      setNewLeadCompany('');
      setNewLeadEmail('');
      setNewLeadValue('');
      setShowAddLeadModal(false);
      await loadData();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Lead could not be created.', 'error');
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      await api.updateTask(task.id, { status: task.status === 'Completed' ? 'Pending' : 'Completed' });
      await loadData();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Task could not be updated.', 'error');
    }
  };

  const handleConvertLead = async (leadId: string) => {
    try {
      await api.convertLead(leadId);
      await loadData();
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Lead could not be converted.', 'error');
    }
  };

  const metric = (key: keyof NonNullable<DashboardMetrics['kpi']>, fallback?: number) =>
    metrics?.kpi?.[key]?.current ?? fallback;
  const totalLeads = metrics?.totals?.allLeadsCount ?? metrics?.totalLeads ?? 0;
  const totalDeals = metrics?.totals?.activeDealsCount ?? metrics?.totalDeals ?? 0;
  const totalPipelineValue = metrics?.totals?.activePipelineValue ?? metrics?.totalPipelineValue ?? 0;
  const recentTasks = metrics?.upcomingTasks ?? metrics?.recentTasks ?? [];
  const stages = metrics?.pipelineStages ?? metrics?.stages ?? {};
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: organization?.currency || 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  if (loading && !metrics) {
    return (
      <div className="mx-auto max-w-7xl space-y-5 p-4 sm:p-6 lg:p-8" role="status" aria-label="Loading dashboard">
        <div className="h-14 animate-pulse rounded-xl bg-slate-200/70" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-xl border border-slate-200 bg-white" />
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <section className="rounded-xl border border-rose-200 bg-white p-6" role="alert">
          <h1 className="text-lg font-semibold text-slate-900">Dashboard unavailable</h1>
          <p className="mt-2 text-sm text-slate-600">{error || 'No dashboard data is available.'}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              loadData();
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <RotateCcw className="h-4 w-4" />
            Try again
          </button>
        </section>
      </div>
    );
  }

  const statCards = [
    {
      label: 'Leads in period',
      value: metric('totalLeads', metrics.totalLeads) ?? 0,
      sub: `${totalLeads.toLocaleString()} in workspace`,
      icon: Users,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      label: 'Active deals',
      value: totalDeals.toLocaleString(),
      sub: `${formatCurrency(totalPipelineValue)} open pipeline`,
      icon: DollarSign,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      label: 'Win rate',
      value: `${metric('winRate', metrics.winRate) ?? 0}%`,
      sub: 'Closed deals in selected period',
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    },
    {
      label: 'Won revenue',
      value: formatCurrency(metric('wonRevenue', metrics.totalWonRevenue) ?? 0),
      sub: 'Closed won in selected period',
      icon: DollarSign,
      color: 'bg-violet-50 text-violet-700 border-violet-200',
    },
    {
      label: 'Overdue follow-ups',
      value: metric('overdueTasks', metrics.overdueTasks)?.toLocaleString() ?? '—',
      sub: 'Tasks past their due date',
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Welcome & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">CRM overview</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              {metrics.isDemo ? 'Sample data' : 'Workspace data'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pipeline and activity for{' '}
            <span className="font-semibold text-slate-700">{organization?.name || 'your workspace'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-between md:justify-end w-full md:w-auto">
          {/* Time range picker */}
          <div className="inline-flex rounded-lg bg-white border border-slate-200 p-0.5 text-xs shadow-xs" role="group" aria-label="Dashboard date range">
            {(['Last 7 Days', 'Last 30 Days', 'Last 90 Days'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                aria-pressed={timeRange === r}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md font-medium transition text-xs ${
                  timeRange === r ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.replace('Last ', '')}
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

      {loading && (
        <p className="text-xs font-medium text-indigo-700" role="status">
          Refreshing workspace data…
        </p>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{card.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2.5 sm:mt-3">
                <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{card.value}</span>
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
          {Object.entries(stages).map(([stage, val]) => (
            <button
              key={stage}
              type="button"
              onClick={() => navigate('/app/pipeline')}
              className="p-2.5 sm:p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-100/70 transition text-center"
            >
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 uppercase tracking-wider block truncate">
                {stage}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 sm:mt-1 block">{val.count || 0}</span>
              <span className="text-[10px] sm:text-[11px] font-medium text-emerald-700 block">
                {formatCurrency(val.value || 0)}
              </span>
            </button>
          ))}
          {Object.keys(stages).length === 0 && (
            <p className="col-span-full rounded-lg border border-dashed border-slate-200 p-5 text-center text-sm text-slate-500">
              No pipeline activity yet.
            </p>
          )}
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
                <h3 className="text-sm font-bold text-slate-900">Recent leads</h3>
                <p className="text-xs text-slate-500">Latest leads in this workspace</p>
              </div>
              <button
                onClick={() => navigate('/app/leads')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                View all ({totalLeads}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Cards for Leads */}
            <div className="block sm:hidden divide-y divide-slate-100 p-2">
              {(metrics.recentLeads || []).map((lead) => (
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
                      {formatCurrency(lead.value || 0)}
                    </span>
                    <button
                      onClick={() => handleConvertLead(lead.id)}
                      className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                    >
                      Convert to Deal
                    </button>
                  </div>
                </div>
              ))}
              {(metrics.recentLeads || []).length === 0 && (
                <p className="p-4 text-center text-xs text-slate-500">No leads found for this workspace yet.</p>
              )}
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
                  {(metrics.recentLeads || []).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{lead.name}</div>
                        <div className="text-[11px] text-slate-500">{lead.email}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 font-medium">{lead.company}</td>
                      <td className="py-3 px-4 text-emerald-700 font-semibold">
                        {formatCurrency(lead.value || 0)}
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
                      <td className="py-3 px-4 text-slate-600">{lead.ownerName || 'Unassigned'}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleConvertLead(lead.id)}
                          className="px-2 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                        >
                          Convert
                        </button>
                      </td>
                    </tr>
                  ))}
                  {(metrics.recentLeads || []).length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-slate-500">No leads found for this workspace yet.</td>
                    </tr>
                  )}
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
                View all ({metrics.totals?.allDealsCount ?? metrics.totalDeals ?? 0}) <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Cards for Deals */}
            <div className="block sm:hidden divide-y divide-slate-100 p-2">
              {(metrics.recentDeals || []).map((deal) => (
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
                      {formatCurrency(deal.value || 0)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${deal.probability ?? 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500">{deal.probability ?? 0}%</span>
                    </div>
                  </div>
                </div>
              ))}
              {(metrics.recentDeals || []).length === 0 && (
                <p className="p-4 text-center text-xs text-slate-500">No active deals to show.</p>
              )}
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
                  {(metrics.recentDeals || []).map((deal) => (
                    <tr key={deal.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">{deal.name}</td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {formatCurrency(deal.value || 0)}
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
                              style={{ width: `${deal.probability ?? 0}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] text-slate-500">{deal.probability ?? 0}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{deal.expectedClose}</td>
                    </tr>
                  ))}
                  {(metrics.recentDeals || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No deals to show.</td>
                    </tr>
                  )}
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
              {recentTasks.map((t) => (
                <div
                  key={t.id}
                  className={`p-3 rounded-lg border transition cursor-pointer flex items-start gap-3 ${
                    t.status === 'Completed'
                      ? 'bg-slate-50/80 border-slate-200 opacity-60'
                      : 'bg-white border-slate-200/80 hover:border-indigo-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={t.status === 'Completed'}
                    onChange={() => handleToggleTask(t)}
                    aria-label={`${t.status === 'Completed' ? 'Reopen' : 'Complete'} task: ${t.title}`}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
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
              {recentTasks.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500">
                  No upcoming follow-ups.
                </p>
              )}
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
              {(metrics.recentCalls || []).map((c) => (
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
              {(metrics.recentCalls || []).length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-200 p-4 text-center text-xs text-slate-500">
                  No call activity recorded.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent activity</h2>
            <p className="mt-1 text-xs text-slate-500">Updates recorded in this workspace</p>
          </div>
        </div>
        <div className="divide-y divide-slate-100">
          {(metrics.recentActivities || []).map((activity) => (
            <div key={activity.id} className="flex flex-col gap-1 px-4 py-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-slate-700">
                <span className="font-semibold text-slate-900">{activity.userName || 'Workspace member'}</span>
                {' '}{activity.description}
              </p>
              <time className="shrink-0 text-slate-500" dateTime={activity.createdAt}>
                {new Date(activity.createdAt).toLocaleString()}
              </time>
            </div>
          ))}
          {(metrics.recentActivities || []).length === 0 && (
            <p className="px-4 py-6 text-center text-xs text-slate-500">
              No activity has been recorded yet.
            </p>
          )}
        </div>
      </section>

      {/* New Lead Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-lead-title"
          >
            <h3 id="new-lead-title" className="text-lg font-bold text-slate-900 mb-1">Add New Lead</h3>
            <p className="text-xs text-slate-500 mb-4">Enter prospect details to log into pipeline</p>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Contact Name *</label>
                <input
                  type="text"
                  required
                  maxLength={120}
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
                  maxLength={160}
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  placeholder="e.g. Apex Global Tech"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  maxLength={254}
                  value={newLeadEmail}
                  onChange={(e) => setNewLeadEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Estimated Value ($) *</label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  required
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
