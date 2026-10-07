import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  Trash2,
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { api } from '../../services/apiClient';
import { crmStore } from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from '../../router/Router';
import type { Lead, LeadStatus } from '../../types/crm';

export const LeadsPage: React.FC = () => {
  const { organization } = useAuth();
  const { navigate } = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState('15000');
  const [status, setStatus] = useState<LeadStatus>('New');
  const [notes, setNotes] = useState('');

  const loadLeads = async () => {
    try {
      const data = await api.getLeads({
        organizationId: organization?.id || '',
        search: searchTerm,
        status: selectedStatus,
      });
      setLeads(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
    const unsub = crmStore.subscribe(loadLeads);
    return unsub;
  }, [searchTerm, selectedStatus, organization?.id]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company) return;

    await api.createLead({
      name,
      company,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone,
      value: Number(value) || 10000,
      status,
      notes,
      source: 'Website',
    });

    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setNotes('');
    setShowAddModal(false);
    loadLeads();
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    await api.updateLead(leadId, { status: newStatus });
    loadLeads();
  };

  const handleDelete = async (leadId: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      await api.deleteLead(leadId);
      loadLeads();
    }
  };

  const handleConvert = async (leadId: string) => {
    await api.convertLead(leadId);
    navigate('/app/pipeline');
  };

  const statusList: { label: string; value: string }[] = [
    { label: 'All Leads', value: 'all' },
    { label: 'New', value: 'New' },
    { label: 'Contacted', value: 'Contacted' },
    { label: 'Qualified', value: 'Qualified' },
    { label: 'Proposal', value: 'Proposal' },
    { label: 'Negotiation', value: 'Negotiation' },
    { label: 'Won', value: 'Won' },
  ];

  return (
    <div className="p-3.5 sm:p-5 lg:p-8 space-y-5 sm:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Leads Management</h1>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              {leads.length} Total Leads
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track, qualify, and convert prospects into high-value sales pipeline deals
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Lead</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
        {/* Status pill tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
          {statusList.map((st) => (
            <button
              key={st.value}
              onClick={() => setSelectedStatus(st.value)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition whitespace-nowrap cursor-pointer ${
                selectedStatus === st.value
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search leads, company..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-indigo-600"
          />
        </div>
      </div>

      {/* Leads Table & Mobile Cards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Mobile View: High density touch cards */}
        <div className="block md:hidden divide-y divide-slate-100">
          {leads.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              No leads matching your search criteria.
            </div>
          ) : (
            leads.map((lead) => (
              <div key={lead.id} className="p-3.5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-900 text-xs">{lead.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{lead.company}</div>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 focus:outline-none shrink-0 ${
                      lead.status === 'Won'
                        ? 'bg-emerald-50 text-emerald-800'
                        : lead.status === 'Qualified'
                        ? 'bg-blue-50 text-blue-800'
                        : lead.status === 'Proposal'
                        ? 'bg-purple-50 text-purple-800'
                        : lead.status === 'Negotiation'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between gap-2">
                  <span className="truncate">{lead.email}</span>
                  <span className="font-bold text-emerald-700 shrink-0">
                    ${(lead.value || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] border-t border-slate-50">
                  <span className="text-[10px] text-slate-400">Agent: {lead.ownerName || 'Sara Khan'}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleConvert(lead.id)}
                      className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                    >
                      Convert to Deal
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
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

        {/* Desktop View: Full data table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Lead Name</th>
                <th className="py-3 px-4">Company & Contact</th>
                <th className="py-3 px-4">Estimated Value</th>
                <th className="py-3 px-4">Status Stage</th>
                <th className="py-3 px-4">Lead Source</th>
                <th className="py-3 px-4">Assigned Agent</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No leads matching your search criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">Added {new Date(lead.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{lead.company}</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>{lead.email}</span>
                        {lead.phone && <span>• {lead.phone}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-emerald-700">
                        ${(lead.value || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md border border-slate-200 cursor-pointer focus:outline-none ${
                          lead.status === 'Won'
                            ? 'bg-emerald-50 text-emerald-800'
                            : lead.status === 'Qualified'
                            ? 'bg-blue-50 text-blue-800'
                            : lead.status === 'Proposal'
                            ? 'bg-purple-50 text-purple-800'
                            : lead.status === 'Negotiation'
                            ? 'bg-amber-50 text-amber-800'
                            : 'bg-slate-50 text-slate-700'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {lead.ownerName || 'Sara Khan'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleConvert(lead.id)}
                          title="Convert to Deal"
                          className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] transition"
                        >
                          Convert to Deal
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          title="Delete Lead"
                          className="p-1 rounded text-slate-400 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Lead */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Add Lead</h3>
            <p className="text-xs text-slate-500 mb-4">Enter new prospect contact & value details</p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bilal Tariq"
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
                    placeholder="e.g. Apex Dynamics"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Initial Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-indigo-600"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Notes & Requirements</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Key prospect requirements or discussion notes..."
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
                  Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
