import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, MessageSquare, Search, Filter, Download, FileText, CheckCircle2, Building } from 'lucide-react';

export default function Leads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [leadNotes, setLeadNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    let query = supabase
      .from('leads')
      .select('*, properties(name, city)')
      .order('created_at', { ascending: false });
    
    if (statusFilter !== 'All') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      setLeads(data || []);
    }
    setLoading(false);
  };

  const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update status');
    } else {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    setSavingNotes(true);
    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes: leadNotes })
        .eq('id', selectedLead.id);

      if (!error) {
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, notes: leadNotes } : l));
        setSelectedLead(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingNotes(false);
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'WhatsApp', 'Country', 'Preferred City', 'Property', 'Status', 'Source', 'Message', 'Notes', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.whatsapp || '').replace(/"/g, '""')}"`,
      `"${(l.country || '').replace(/"/g, '""')}"`,
      `"${(l.preferred_city || l.city || '').replace(/"/g, '""')}"`,
      `"${(l.properties?.name || '').replace(/"/g, '""')}"`,
      `"${(l.status || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${new Date(l.created_at).toLocaleString()}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `referestates_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    (lead.email && lead.email.toLowerCase().includes(search.toLowerCase())) ||
    (lead.phone && lead.phone.includes(search)) ||
    (lead.whatsapp && lead.whatsapp.includes(search)) ||
    (lead.country && lead.country.toLowerCase().includes(search.toLowerCase())) ||
    (lead.properties?.name && lead.properties.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Client Inquiries & Leads</h1>
          <p className="text-xs text-gray-500 mt-1">Manage, follow up, and track investor and buyer inquiries.</p>
        </div>

        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded shadow-sm disabled:opacity-50 transition-colors"
        >
          <Download size={15} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white p-4 shadow-sm rounded-lg flex flex-col sm:flex-row gap-4 justify-between border border-gray-200">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            placeholder="Search leads by name, email, phone, or country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block pl-3 pr-8 py-2 text-xs font-semibold border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded bg-white border"
          >
            <option value="All">All Statuses ({leads.length})</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Interested">Interested</option>
            <option value="Viewing">Viewing</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading leads...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">No inquiries found matching your filter criteria.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <li key={lead.id} className="p-4 sm:p-6 hover:bg-gray-50/80 transition-colors">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-bold text-gray-900">{lead.name}</h3>
                        <StatusBadge status={lead.status} />
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(lead.created_at).toLocaleDateString()} at {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600">
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 hover:text-primary font-medium">
                          <Mail size={14} className="text-gray-400" />
                          <span>{lead.email}</span>
                        </a>
                      )}
                      {(lead.phone || lead.whatsapp) && (
                        <a href={`tel:${lead.phone || lead.whatsapp}`} className="flex items-center gap-1.5 hover:text-primary font-medium">
                          <Phone size={14} className="text-gray-400" />
                          <span>{lead.phone || lead.whatsapp}</span>
                        </a>
                      )}
                      {lead.country && (
                        <span className="text-gray-500">Country: <strong>{lead.country}</strong></span>
                      )}
                      {lead.properties && (
                        <span className="flex items-center gap-1 text-primary font-semibold">
                          <Building size={14} />
                          <span>Project: {lead.properties.name} ({lead.properties.city})</span>
                        </span>
                      )}
                    </div>

                    {lead.message && (
                      <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border border-gray-100">
                        <span className="font-bold text-gray-900 block mb-0.5">Inquiry Message:</span>
                        <p>{lead.message}</p>
                      </div>
                    )}

                    {lead.notes && (
                      <div className="text-xs text-amber-900 bg-amber-50/60 p-2.5 rounded border border-amber-200">
                        <span className="font-bold block mb-0.5">Admin Note:</span>
                        <p>{lead.notes}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-gray-400">
                      <span>Source: {lead.source || 'Website Form'}</span>
                      {lead.preferred_city && <span>• Target City: {lead.preferred_city}</span>}
                    </div>
                  </div>
                  
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0">
                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="py-1.5 pl-3 pr-8 text-xs font-semibold border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded bg-white border"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Follow-up">Follow-up</option>
                        <option value="Interested">Interested</option>
                        <option value="Viewing">Viewing</option>
                        <option value="Negotiation">Negotiation</option>
                        <option value="Closed">Closed</option>
                        <option value="Lost">Lost</option>
                      </select>
                      
                      {(lead.whatsapp || lead.phone) && (
                        <a 
                          href={`https://wa.me/${(lead.whatsapp || lead.phone).replace(/[^0-9]/g, '')}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 bg-[#25D366] text-white rounded hover:bg-[#1EBE5D] transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageSquare size={16} />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLead(lead);
                          setLeadNotes(lead.notes || '');
                        }}
                        className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                        title="Add/Edit Internal Notes"
                      >
                        <FileText size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Notes Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-lg text-gray-900">
              Admin Notes: {selectedLead.name}
            </h3>
            <p className="text-xs text-gray-500">
              Record follow-up remarks, client budget preferences, meeting outcomes, or assigned agent.
            </p>
            <textarea
              rows={4}
              value={leadNotes}
              onChange={(e) => setLeadNotes(e.target.value)}
              placeholder="e.g. Called client on Thursday. Interested in 3-bedroom villa in Riyadh, budget 3.5M SAR. Schedule viewing next Monday."
              className="w-full p-3 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingNotes}
                onClick={handleSaveNotes}
                className="px-5 py-2 bg-primary text-cream text-xs font-bold uppercase tracking-wider rounded hover:bg-primary-dark disabled:opacity-50"
              >
                {savingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  let colors = 'bg-gray-100 text-gray-800';
  
  if (status === 'New') colors = 'bg-green-100 text-green-800 border border-green-200';
  if (status === 'Contacted' || status === 'Follow-up' || status === 'Viewing') colors = 'bg-blue-100 text-blue-800 border border-blue-200';
  if (status === 'Interested' || status === 'Negotiation') colors = 'bg-purple-100 text-purple-800 border border-purple-200';
  if (status === 'Closed') colors = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
  if (status === 'Lost') colors = 'bg-red-100 text-red-800 border border-red-200';

  return (
    <span className={`px-2 py-0.5 inline-flex text-[11px] font-bold rounded-full ${colors}`}>
      {status || 'New'}
    </span>
  );
}

