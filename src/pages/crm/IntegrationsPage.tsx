import React, { useState, useEffect } from 'react';
import { Cpu, Check, Plus, ExternalLink, Zap } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Integration } from '../../types/crm';

export const CrmIntegrationsPage: React.FC = () => {
  const { organization } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const loadIntegrations = async () => {
    const data = await api.getIntegrations();
    setIntegrations(data || []);
  };

  useEffect(() => {
    loadIntegrations();
    const unsub = crmStore.subscribe(loadIntegrations);
    return unsub;
  }, [organization?.id]);

  const handleToggle = async (id: string) => {
    await api.toggleIntegration(id);
    loadIntegrations();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Connected Integrations</h1>
          <p className="text-xs text-slate-500 mt-1">
            Connect telephony, email synchronization, communication alerts, and developer API keys
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {integrations.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">{item.name}</h3>
                  <span className="text-[11px] font-semibold text-indigo-600">{item.category || 'Platform Integration'}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.status === 'CONNECTED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.status === 'CONNECTED' ? 'Active' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2">{item.description || 'Enterprise CRM connection integration'}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                {item.status === 'CONNECTED' ? 'Synchronized' : 'Ready to pair'}
              </span>
              <button
                onClick={() => handleToggle(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  item.status === 'CONNECTED'
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                }`}
              >
                {item.status === 'CONNECTED' ? 'Disconnect' : 'Connect Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
