import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, Clock, AlertCircle } from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import type { Task } from '../../types/crm';

export const TasksPage: React.FC = () => {
  const { organization } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('Tomorrow, 10:00 AM');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('High');

  const loadTasks = async () => {
    const data = await api.getTasks();
    setTasks(data || []);
  };

  useEffect(() => {
    loadTasks();
    const unsub = crmStore.subscribe(loadTasks);
    return unsub;
  }, [organization?.id]);

  const handleToggle = async (id: string) => {
    await api.updateTask(id, {});
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await api.deleteTask(id);
    loadTasks();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    await api.createTask({
      title,
      description,
      dueDate,
      priority,
      status: 'Pending',
    });

    setTitle('');
    setDescription('');
    setShowAddModal(false);
    loadTasks();
  };

  const filteredTasks = tasks.filter((t) => (filter === 'all' ? true : t.status === filter));

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Tasks & Follow-Ups</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              {tasks.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Sales action checklist, prospect call reminders, and deal milestones
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Task</span>
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['all', 'Pending', 'Completed'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              filter === st ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {st === 'all' ? `All (${tasks.length})` : `${st} (${tasks.filter((t) => t.status === st).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className={`p-3.5 sm:p-4 flex items-start justify-between gap-2.5 sm:gap-3 hover:bg-slate-50/70 transition ${
              t.status === 'Completed' ? 'opacity-60 bg-slate-50/40' : ''
            }`}
          >
            <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
              <input
                type="checkbox"
                checked={t.status === 'Completed'}
                onChange={() => handleToggle(t.id)}
                className="mt-0.5 sm:mt-1 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold ${t.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {t.title}
                </p>
                {t.description && <p className="text-[11px] text-slate-500 mt-0.5">{t.description}</p>}
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] text-slate-400 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <Calendar className="w-3 h-3" /> {t.dueDate}
                  </span>
                  <span>Assigned to {t.assignedUserName}</span>
                  {t.relatedName && <span className="text-indigo-600">Re: {t.relatedName}</span>}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  t.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {t.priority}
              </span>
              <button
                onClick={() => handleDelete(t.id)}
                className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-3.5 sm:p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Create Task</h3>
            <p className="text-xs text-slate-500 mb-4">Add new action item or follow-up deadline</p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Call Ali Raza regarding deployment"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional context or checklist items..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Tomorrow, 02:00 PM"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
