import React, { useState, useEffect } from 'react';
import {
  Kanban,
  Plus,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  Building,
  Calendar,
  CheckCircle2,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Deal, DealStage } from '../../types/crm';

const PIPELINE_STAGES: { id: DealStage; label: string; color: string }[] = [
  { id: 'New', label: 'New Deals', color: 'border-slate-300 bg-slate-50' },
  { id: 'Contacted', label: 'Contacted', color: 'border-blue-300 bg-blue-50/40' },
  { id: 'Qualified', label: 'Qualified', color: 'border-indigo-300 bg-indigo-50/40' },
  { id: 'Proposal', label: 'Proposal Sent', color: 'border-purple-300 bg-purple-50/40' },
  { id: 'Negotiation', label: 'Negotiation', color: 'border-amber-300 bg-amber-50/40' },
  { id: 'Won', label: 'Closed Won', color: 'border-emerald-400 bg-emerald-50/50' },
  { id: 'Lost', label: 'Closed Lost', color: 'border-rose-300 bg-rose-50/40' },
];

export const PipelinePage: React.FC = () => {
  const { organization } = useAuth();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [targetStage, setTargetStage] = useState<DealStage>('New');
  const [activeMobileStage, setActiveMobileStage] = useState<string>('all');

  // Form states
  const [dealName, setDealName] = useState('');
  const [company, setCompany] = useState('');
  const [value, setValue] = useState('25000');
  const [probability, setProbability] = useState('50');

  const loadDeals = async () => {
    try {
      const data = await api.getDeals();
      setDeals(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
    const unsub = crmStore.subscribe(loadDeals);
    return unsub;
  }, [organization?.id]);

  const handleStageMove = async (dealId: string, currentStage: DealStage, direction: 'forward' | 'backward') => {
    const stageOrder: DealStage[] = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won'];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex === -1) return;

    let nextIndex = direction === 'forward' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < stageOrder.length) {
      await api.updateDealStage(dealId, stageOrder[nextIndex]);
      loadDeals();
    }
  };

  const handleCreateDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealName || !company) return;

    await api.createDeal({
      name: dealName,
      company,
      value: Number(value) || 20000,
      stage: targetStage,
      probability: Number(probability) || 50,
      expectedClose: '2026-11-20',
      priority: 'Medium',
    });

    setDealName('');
    setCompany('');
    setShowAddModal(false);
    loadDeals();
  };

  const totalValue = deals.reduce((sum, d) => sum + (d.value || 0), 0);
  const wonValue = deals.filter((d) => d.stage === 'Won').reduce((sum, d) => sum + (d.value || 0), 0);

  const visibleStages = PIPELINE_STAGES.filter(
    (col) => activeMobileStage === 'all' || col.id === activeMobileStage
  );

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Sales Pipeline</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              ${(totalValue / 1000).toFixed(1)}k Total Active Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visual Kanban board showing deals progression, win probabilities, and stage revenue sums
          </p>
        </div>

        <button
          onClick={() => {
            setTargetStage('New');
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Mobile Stage Selector Tabs (visible on small/medium screens) */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveMobileStage('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
            activeMobileStage === 'all'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All Stages (Swipe)
        </button>
        {PIPELINE_STAGES.map((col) => {
          const count = deals.filter((d) => d.stage === col.id).length;
          return (
            <button
              key={col.id}
              onClick={() => setActiveMobileStage(col.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                activeMobileStage === col.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{col.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                activeMobileStage === col.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Kanban Board Horizontal Scroll / Responsive Columns */}
      <div className="overflow-x-auto pb-6 snap-x snap-mandatory">
        <div className={`flex items-start gap-4 ${activeMobileStage === 'all' ? 'min-w-[1280px]' : 'w-full'}`}>
          {visibleStages.map((col) => {
            const columnDeals = deals.filter((d) => d.stage === col.id);
            const colTotal = columnDeals.reduce((sum, d) => sum + (d.value || 0), 0);

            return (
              <div
                key={col.id}
                className={`${
                  activeMobileStage === 'all' ? 'w-[82vw] sm:w-72 shrink-0 snap-center' : 'w-full max-w-xl mx-auto'
                } bg-slate-100/70 rounded-xl p-3 border border-slate-200 flex flex-col max-h-[calc(100vh-210px)]`}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{col.label}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-white text-slate-600 shadow-2xs">
                      {columnDeals.length}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    ${(colTotal / 1000).toFixed(1)}k
                  </span>
                </div>

                {/* Cards Container */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
                  {columnDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs hover:shadow-xs transition space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-slate-900 leading-tight">
                          {deal.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 shrink-0">
                          {deal.probability}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="truncate">{deal.company}</span>
                        <span className="font-bold text-emerald-700 shrink-0">
                          ${(deal.value || 0).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        <span>{deal.expectedClose}</span>
                        <span className="font-medium text-slate-600">{deal.ownerName || 'Sara Khan'}</span>
                      </div>

                      {/* Stage Progression Buttons */}
                      <div className="flex items-center justify-between pt-1 gap-1">
                        <button
                          disabled={col.id === 'New'}
                          onClick={() => handleStageMove(deal.id, deal.stage, 'backward')}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                          title="Move to previous stage"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          Move Stage
                        </span>
                        <button
                          disabled={col.id === 'Won' || col.id === 'Lost'}
                          onClick={() => handleStageMove(deal.id, deal.stage, 'forward')}
                          className="p-1 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:pointer-events-none"
                          title="Advance to next stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {columnDeals.length === 0 && (
                    <div className="py-8 text-center text-slate-400 text-xs italic">
                      No deals in this stage
                    </div>
                  )}
                </div>

                {/* Add deal to this stage */}
                <button
                  onClick={() => {
                    setTargetStage(col.id);
                    setShowAddModal(true);
                  }}
                  className="mt-2 w-full py-1.5 rounded-lg border border-dashed border-slate-300 hover:border-indigo-400 text-slate-500 hover:text-indigo-600 text-xs font-semibold flex items-center justify-center gap-1 transition"
                >
                  <Plus className="w-3 h-3" /> Add Deal
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Deal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Create Deal in {targetStage}</h3>
            <p className="text-xs text-slate-500 mb-4">Enter deal amount and customer details</p>

            <form onSubmit={handleCreateDeal} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Deal Title *</label>
                <input
                  type="text"
                  required
                  value={dealName}
                  onChange={(e) => setDealName(e.target.value)}
                  placeholder="e.g. Enterprise License Contract"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Company *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Nova Tech"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Deal Value ($)</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Win Probability (%)</label>
                  <input
                    type="number"
                    value={probability}
                    onChange={(e) => setProbability(e.target.value)}
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Create Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
