import React, { useState, useEffect } from 'react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Integration } from '../../types/crm';

export const CrmIntegrationsPage: React.FC = () => {
  const { organization } = useAuth();
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadIntegrations = async () => {
    try {
      const data = await api.getIntegrations();
      setIntegrations(data);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Integration settings could not be loaded.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIntegrations();
    const unsub = crmStore.subscribe(loadIntegrations);
    return unsub;
  }, [organization?.id]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Integration setup</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review workspace integration records. Provider credentials and sync health are not verified here.
          </p>
        </div>
      </div>

      {error && (
        <section className="rounded-xl border border-rose-200 bg-white p-5" role="alert">
          <p className="text-sm text-rose-800">{error}</p>
          <button
            type="button"
            onClick={() => {
              setLoading(true);
              loadIntegrations();
            }}
            className="mt-3 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
          >
            Try again
          </button>
        </section>
      )}

      {loading && <p className="text-sm text-slate-500" role="status">Loading integration records…</p>}

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
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.status === 'CONNECTED' ? 'Configuration recorded' : 'Not configured'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-2">{item.description || 'Enterprise CRM connection integration'}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Saved status does not confirm provider credentials or synchronization.
              </span>
            </div>
          </div>
        ))}
      </div>

      {!loading && !error && integrations.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No integration records are configured for this workspace.
        </p>
      )}
    </div>
  );
};
