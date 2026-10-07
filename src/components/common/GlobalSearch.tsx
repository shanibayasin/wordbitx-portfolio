import React, { useState, useEffect } from 'react';
import { Search, X, Users, DollarSign, Building2, CheckSquare, ArrowRight } from 'lucide-react';
import { api } from '../../services/apiClient.js';
import { useRouter } from '../../router/Router.js';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>({ leads: [], deals: [], customers: [], companies: [], tasks: [] });
  const [loading, setLoading] = useState(false);
  const { navigate } = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ leads: [], deals: [], customers: [], companies: [], tasks: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.search(query);
        setResults(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalCount =
    (results.leads?.length || 0) +
    (results.deals?.length || 0) +
    (results.customers?.length || 0) +
    (results.companies?.length || 0) +
    (results.tasks?.length || 0);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-xs">
      <div
        className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-slate-100 flex items-center px-4 py-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, deals, customers, companies, tasks..."
            className="w-full px-3 py-1 text-slate-900 placeholder-slate-400 focus:outline-none text-base"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {loading && (
            <div className="text-center py-6 text-sm text-slate-400">Searching your CRM records...</div>
          )}

          {!loading && query && totalCount === 0 && (
            <div className="text-center py-8 text-sm text-slate-500">
              No CRM records found matching "{query}".
            </div>
          )}

          {!loading && !query && (
            <div className="text-center py-6 text-xs text-slate-400">
              Type to instantly search across your organization's leads, deals, companies, and tasks.
            </div>
          )}

          {results.leads?.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-indigo-500" /> Leads ({results.leads.length})
              </div>
              <div className="space-y-1">
                {results.leads.map((l: any) => (
                  <button
                    key={l.id}
                    onClick={() => handleSelect(`/app/leads/${l.id}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-sm group transition"
                  >
                    <div>
                      <span className="font-medium text-slate-900 group-hover:text-indigo-600">{l.name}</span>
                      <span className="text-slate-500 text-xs ml-2">({l.company})</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                      {l.status} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.deals?.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Deals ({results.deals.length})
              </div>
              <div className="space-y-1">
                {results.deals.map((d: any) => (
                  <button
                    key={d.id}
                    onClick={() => handleSelect(`/app/deals/${d.id}`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-sm group transition"
                  >
                    <div>
                      <span className="font-medium text-slate-900 group-hover:text-indigo-600">{d.name}</span>
                      <span className="text-emerald-600 font-semibold text-xs ml-2">${d.value.toLocaleString()}</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                      {d.stage} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.companies?.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-500" /> Companies ({results.companies.length})
              </div>
              <div className="space-y-1">
                {results.companies.map((c: any) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(`/app/companies`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-sm group transition"
                  >
                    <div>
                      <span className="font-medium text-slate-900 group-hover:text-indigo-600">{c.name}</span>
                      <span className="text-slate-500 text-xs ml-2">{c.industry}</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                      View <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.tasks?.length > 0 && (
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-amber-500" /> Tasks ({results.tasks.length})
              </div>
              <div className="space-y-1">
                {results.tasks.map((t: any) => (
                  <button
                    key={t.id}
                    onClick={() => handleSelect(`/app/tasks`)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-left text-sm group transition"
                  >
                    <div>
                      <span className="font-medium text-slate-900 group-hover:text-indigo-600">{t.title}</span>
                      <span className="text-slate-500 text-xs ml-2">Due: {t.dueDate}</span>
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-indigo-600 flex items-center gap-1">
                      {t.priority} <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
