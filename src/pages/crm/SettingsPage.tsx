import React, { useState } from 'react';
import { Settings, Building2, Shield, CreditCard, Key, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { organization, user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState(organization?.name || 'ABC Technologies');
  const [industry, setIndustry] = useState(organization?.industry || 'Software & Cloud Services');
  const [timezone, setTimezone] = useState(organization?.timezone || 'America/Chicago');
  const [currency, setCurrency] = useState('USD ($)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Workspace Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Organization profile, currency formatting, timezone settings, and subscription tier
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-6">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <h2 className="text-sm font-bold text-slate-900 mb-3">General Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Organization Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Industry</label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Primary Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Default Currency</label>
                <input
                  type="text"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600">
              {saved && '✓ Settings saved successfully!'}
            </span>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Subscription info */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Current Plan & Subscription</h2>
        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs font-bold text-indigo-700 block">PROFESSIONAL PLAN</span>
            <span className="text-xs text-slate-500">15 Active Seats • Unlimited Pipelines • Twilio Add-on</span>
          </div>
          <span className="text-sm font-bold text-slate-900">$79 / seat / mo</span>
        </div>
      </div>
    </div>
  );
};
