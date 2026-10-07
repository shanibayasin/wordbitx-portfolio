import React, { useState, useEffect } from 'react';
import { PhoneCall, Plus, Play, Pause, PhoneIncoming, PhoneOutgoing, PhoneMissed, Clock, User } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Call } from '../../types/crm';

export const CallsPage: React.FC = () => {
  const { organization } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [caller, setCaller] = useState('Sara Khan (WordbitX)');
  const [recipient, setRecipient] = useState('+1 (555) 234-5678');
  const [direction, setDirection] = useState<'Incoming' | 'Outgoing' | 'Missed'>('Outgoing');
  const [duration, setDuration] = useState('180');
  const [notes, setNotes] = useState('');
  const [relatedName, setRelatedName] = useState('');

  const loadCalls = async () => {
    const data = await api.getCalls();
    setCalls(data || []);
  };

  useEffect(() => {
    loadCalls();
    const unsub = crmStore.subscribe(loadCalls);
    return unsub;
  }, [organization?.id]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createCall({
      caller,
      recipient,
      direction,
      durationSeconds: Number(duration) || 120,
      notes,
      relatedName,
      status: 'Completed',
    });

    setNotes('');
    setShowAddModal(false);
    loadCalls();
  };

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Call Center & Recordings</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              {calls.length} Recorded Calls
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            In-app VoIP telephony logs, call recordings preview, and automated audio transcriptions
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Call</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <PhoneIncoming className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Inbound Calls</span>
            <span className="text-lg font-bold text-slate-900 block">
              {calls.filter((c) => c.direction === 'Incoming').length} calls
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <PhoneOutgoing className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Outbound Dials</span>
            <span className="text-lg font-bold text-slate-900 block">
              {calls.filter((c) => c.direction === 'Outgoing').length} calls
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Avg Call Duration</span>
            <span className="text-lg font-bold text-slate-900 block">3m 48s</span>
          </div>
        </div>
      </div>

      {/* Calls list */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
        {calls.map((c) => (
          <div key={c.id} className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/70 transition">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div
                className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                  c.direction === 'Incoming'
                    ? 'bg-blue-50 text-blue-600'
                    : c.direction === 'Missed'
                    ? 'bg-rose-50 text-rose-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {c.direction === 'Incoming' ? (
                  <PhoneIncoming className="w-4 h-4" />
                ) : c.direction === 'Missed' ? (
                  <PhoneMissed className="w-4 h-4" />
                ) : (
                  <PhoneOutgoing className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-slate-900">{c.relatedName || c.recipient}</span>
                  <span className="text-[11px] text-slate-400 font-normal">({c.caller})</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{c.notes}</p>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] text-slate-400 mt-1 flex-wrap">
                  <span>Agent: {c.agentName || 'Sara Khan'}</span>
                  <span>•</span>
                  <span>{new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            {/* Audio waveform and duration */}
            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-50">
              <span className="text-xs font-semibold text-slate-700">
                {Math.floor(c.durationSeconds / 60)}m {c.durationSeconds % 60}s
              </span>

              {c.durationSeconds > 0 && (
                <button
                  onClick={() => togglePlay(c.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    playingId === c.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {playingId === c.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{playingId === c.id ? 'Playing...' : 'Recording'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-3.5 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Log Telephony Call</h3>
            <p className="text-xs text-slate-500 mb-4">Record call conversation notes and duration</p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Related Prospect / Customer</label>
                <input
                  type="text"
                  value={relatedName}
                  onChange={(e) => setRelatedName(e.target.value)}
                  placeholder="e.g. Ali Raza (Alpha Solutions)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Direction</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  >
                    <option value="Incoming">Incoming</option>
                    <option value="Outgoing">Outgoing</option>
                    <option value="Missed">Missed</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Duration (Seconds)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Call Notes & Key Takeaways</label>
                <textarea
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key discussion points, customer feedback, next steps..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                ></textarea>
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
                  Save Call Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
