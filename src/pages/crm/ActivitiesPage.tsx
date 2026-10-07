import React, { useState, useEffect } from 'react';
import { Activity, PhoneCall, DollarSign, UserPlus, CheckSquare, Zap, Clock } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Activity as ActivityType } from '../../types/crm';

export const ActivitiesPage: React.FC = () => {
  const { organization } = useAuth();
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [selectedType, setSelectedType] = useState('all');

  const loadActivities = async () => {
    const data = await api.getActivities();
    setActivities(data || []);
  };

  useEffect(() => {
    loadActivities();
    const unsub = crmStore.subscribe(loadActivities);
    return unsub;
  }, [organization?.id]);

  const filtered = activities.filter((a) => (selectedType === 'all' ? true : a.type === selectedType));

  const getIcon = (type: string) => {
    switch (type) {
      case 'Call':
        return <PhoneCall className="w-4 h-4 text-emerald-600" />;
      case 'Deal':
        return <DollarSign className="w-4 h-4 text-indigo-600" />;
      case 'Lead':
        return <UserPlus className="w-4 h-4 text-blue-600" />;
      case 'Task':
        return <CheckSquare className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Audit & Activity Timeline</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time chronological events, stage changes, call recordings, and team actions
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'Call', 'Deal', 'Lead', 'Task'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedType === t ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {t === 'all' ? 'All Activities' : `${t}s`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-6">
        <div className="relative border-l-2 border-slate-100 ml-4 space-y-6">
          {filtered.map((act) => (
            <div key={act.id} className="relative pl-6">
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                {getIcon(act.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs text-slate-900">{act.userName || 'Sara Khan'}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    {act.type}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date(act.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-700">{act.description}</p>
                {act.relatedName && (
                  <span className="inline-block text-[11px] font-medium text-indigo-600 bg-indigo-50/60 px-2 py-0.5 rounded mt-1">
                    Re: {act.relatedName}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
