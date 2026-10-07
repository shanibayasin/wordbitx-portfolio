import React, { useState, useEffect } from 'react';
import { DollarSign, Plus, Search, Filter, Trash2, ArrowRight } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../router/Router';
import type { Deal, DealStage } from '../../types/crm';

export const DealsPage: React.FC = () => {
  const { organization } = useAuth();
  const { navigate } = useRouter();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');

  const loadDeals = async () => {
    const data = await api.getDeals();
    setDeals(data || []);
  };

  useEffect(() => {
    loadDeals();
    const unsub = crmStore.subscribe(loadDeals);
    return unsub;
  }, [organization?.id]);

  const filteredDeals = deals.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStage = selectedStage === 'all' || d.stage === selectedStage;
    return matchSearch && matchStage;
  });

  const totalValue = filteredDeals.reduce((sum, d) => sum + (d.value || 0), 0);

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Deals & Opportunities</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${(totalValue / 1000).toFixed(1)}k Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Total of {filteredDeals.length} deals totaling ${(totalValue / 1000).toFixed(1)}k in revenue forecast
          </p>
        </div>

        <button
          onClick={() => navigate('/app/pipeline')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto"
        >
          View Kanban Pipeline
        </button>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Stages</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal">Proposal</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Won">Closed Won</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search deals..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-indigo-600"
          />
        </div>
      </div>

      {/* Table & Mobile Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Mobile View */}
        <div className="block md:hidden divide-y divide-slate-100">
          {filteredDeals.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">No deals found.</div>
          ) : (
            filteredDeals.map((deal) => (
              <div key={deal.id} className="p-3.5 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs">{deal.name}</div>
                    <div className="text-[11px] text-slate-500">{deal.company} • {deal.expectedClose}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 shrink-0">
                    {deal.stage}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-bold text-emerald-700 text-xs">
                    ${(deal.value || 0).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">{deal.probability}% win prob</span>
                    <button
                      onClick={async () => {
                        if (confirm('Delete this deal?')) {
                          await api.deleteDeal(deal.id);
                          loadDeals();
                        }
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Deal</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Probability</th>
                <th className="py-3 px-4">Expected Close</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-semibold text-slate-900">{deal.name}</td>
                  <td className="py-3 px-4 text-slate-700">{deal.company}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">${(deal.value || 0).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600">{deal.probability}%</td>
                  <td className="py-3 px-4 text-slate-600">{deal.expectedClose}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{deal.ownerName || 'Sara Khan'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={async () => {
                        if (confirm('Delete this deal?')) {
                          await api.deleteDeal(deal.id);
                          loadDeals();
                        }
                      }}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
