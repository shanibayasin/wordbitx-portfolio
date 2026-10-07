import React, { useState, useEffect } from 'react';
import { Zap, Play, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Workflow } from '../../types/crm';

export const WorkflowsPage: React.FC = () => {
  const { organization } = useAuth();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const loadWorkflows = async () => {
    const data = await api.getWorkflows();
    setWorkflows(data || []);
  };

  useEffect(() => {
    loadWorkflows();
    const unsub = crmStore.subscribe(loadWorkflows);
    return unsub;
  }, [organization?.id]);

  const handleToggle = async (id: string, currentStatus?: string) => {
    await api.toggleWorkflow(id, currentStatus !== 'ACTIVE');
    loadWorkflows();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automation Workflows</h1>
          <p className="text-xs text-slate-500 mt-1">
            Event-driven triggers, automated customer onboarding, and sales team alerts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {workflows.map((wf) => {
          const isActive = wf.status === 'ACTIVE' || wf.enabled === true;
          const actions = Array.isArray(wf.actions) ? wf.actions : (typeof wf.actions === 'string' ? [wf.actions] : []);

          return (
            <div key={wf.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Zap className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 leading-tight">{wf.name}</h3>
                </div>
                <button
                  onClick={() => handleToggle(wf.id, wf.status || (wf.enabled ? 'ACTIVE' : 'PAUSED'))}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isActive ? 'bg-indigo-600' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      isActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <p className="text-xs text-slate-600">{wf.description || 'Automated CRM action'}</p>

              <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Trigger Event:</span>
                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {wf.trigger}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Total Executions:</span>
                  <span className="font-bold text-slate-900">{wf.runCount || 0} times</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Run:</span>
                  <span className="text-slate-600">{wf.lastRun || 'Just now'}</span>
                </div>
              </div>

              {actions.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Actions Chain
                  </span>
                  <ul className="space-y-1">
                    {actions.map((act: string, i: number) => (
                      <li key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
