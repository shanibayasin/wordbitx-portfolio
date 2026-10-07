import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Download, Award, Users, DollarSign, Target } from 'lucide-react';
import { api } from '../../services/apiClient';
import { useAuth } from '../../context/AuthContext';

export const ReportsPage: React.FC = () => {
  const { organization } = useAuth();
  const [reports, setReports] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const data = await api.getReports();
      setReports(data);
      setLoading(false);
    };
    fetchReports();
  }, [organization?.id]);

  if (loading || !reports) {
    return <div className="p-8 text-center text-slate-400">Loading reports & analytics...</div>;
  }

  const exportCsv = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Rep,Deals Won,Revenue,Conversion Rate', ...reports.reps.map((r: any) => `${r.name},${r.dealsWon},${r.revenue},${r.conversionRate}%`)].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `wordbitx_sales_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Analytics & Performance Reports</h1>
          <p className="text-xs text-slate-500 mt-1">
            Revenue trends, representative leaderboards, and sales velocity metrics
          </p>
        </div>

        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Closed Won</span>
          <span className="text-xl sm:text-2xl font-bold text-emerald-700 block mt-1">
            ${(reports.totalRevenue || 0).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 mt-1 block">{reports.dealsWon} won contracts</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Win Rate Ratio</span>
          <span className="text-xl sm:text-2xl font-bold text-indigo-700 block mt-1">{reports.winRate}%</span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">+6.2% vs last quarter</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Average Sales Cycle</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900 block mt-1">{reports.averageCycleDays} days</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Lead creation to signed MSA</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Pipeline Velocity</span>
          <span className="text-xl sm:text-2xl font-bold text-purple-700 block mt-1">$4,820 / day</span>
          <span className="text-[11px] text-slate-400 mt-1 block">Daily net pipeline additions</span>
        </div>
      </div>

      {/* Monthly Revenue Bars */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Monthly Revenue Growth (Last 5 Months)</h2>
        <div className="grid grid-cols-5 gap-2 sm:gap-3 pt-4">
          {(reports.monthlyTrends || []).map((m: any) => {
            const max = 100000;
            const heightPercent = Math.min(100, Math.round((m.revenue / max) * 100));
            return (
              <div key={m.month} className="flex flex-col items-center gap-1.5 sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-800">${(m.revenue / 1000).toFixed(0)}k</span>
                <div className="w-full bg-slate-100 rounded-t-lg h-28 sm:h-36 flex items-end p-0.5 sm:p-1">
                  <div
                    className="w-full bg-indigo-600 rounded-t-md transition-all duration-500"
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate w-full text-center">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sales Rep Leaderboard */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-sm font-bold text-slate-900">Representative Leaderboard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[500px]">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Sales Rep</th>
                <th className="py-3 px-4">Deals Won</th>
                <th className="py-3 px-4">Revenue Contribution</th>
                <th className="py-3 px-4">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(reports.reps || []).map((rep: any, idx: number) => (
                <tr key={rep.name} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{rep.name}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{rep.dealsWon} contracts</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">${rep.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 sm:w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${rep.conversionRate}%` }}></div>
                      </div>
                      <span className="font-semibold text-slate-600 text-[11px]">{rep.conversionRate}%</span>
                    </div>
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
