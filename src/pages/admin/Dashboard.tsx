import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  HardHat, 
  FileText, 
  ArrowRight, 
  Plus, 
  Search, 
  Image as ImageIcon, 
  Phone, 
  ExternalLink,
  CheckCircle2,
  Clock,
  MapPin,
  RefreshCw
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    closedLeads: 0,
    totalProperties: 0,
    availableProperties: 0,
    limitedProperties: 0,
    comingSoonProperties: 0,
    soldOutProperties: 0,
    totalDevelopers: 0
  });

  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [
        { count: totalLeads },
        { count: newLeads },
        { count: contactedLeads },
        { count: closedLeads },
        { count: totalProperties },
        { count: availableProperties },
        { count: limitedProperties },
        { count: comingSoonProperties },
        { count: soldOutProperties },
        { count: totalDevelopers },
        { data: leadsData },
        { data: propsData }
      ] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'Contacted'),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'Closed'),
        supabase.from('properties').select('*', { count: 'exact', head: true }),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Available'),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Limited Availability'),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Coming Soon'),
        supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'Sold Out'),
        supabase.from('developers').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(6),
        supabase.from('properties').select('id, name, title, city, district, price, currency, status, cover_image_url, image_url, created_at').order('created_at', { ascending: false }).limit(4)
      ]);

      setStats({
        totalLeads: totalLeads || 0,
        newLeads: newLeads || 0,
        contactedLeads: contactedLeads || 0,
        closedLeads: closedLeads || 0,
        totalProperties: totalProperties || 0,
        availableProperties: availableProperties || 0,
        limitedProperties: limitedProperties || 0,
        comingSoonProperties: comingSoonProperties || 0,
        soldOutProperties: soldOutProperties || 0,
        totalDevelopers: totalDevelopers || 0
      });

      if (leadsData) setRecentLeads(leadsData);
      if (propsData) setRecentProperties(propsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);

      if (!error) {
        setRecentLeads(prev =>
          prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l)
        );
        fetchDashboardData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <RefreshCw className="animate-spin text-primary mb-3" size={32} />
        <p className="text-sm font-medium">Loading REFERESTATES overview...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Welcome to REFERESTATES Admin</h1>
          <p className="text-xs text-gray-500 mt-1">Manage listings, client inquiries, developers, and website content in real time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/admin/search"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <Search size={14} />
            Client Search
          </Link>
          <Link
            to="/admin/developers/new"
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            <Plus size={14} />
            Add Developer
          </Link>
          <Link
            to="/admin/properties/new"
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-cream hover:bg-primary-dark text-xs font-bold uppercase tracking-widest rounded transition-colors"
          >
            <Plus size={14} />
            Add Property
          </Link>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Properties Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Properties</span>
            <div className="p-2 bg-primary/10 rounded text-primary">
              <Building2 size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{stats.totalProperties}</span>
            <div className="flex flex-wrap gap-1.5 mt-2 text-[11px] text-gray-500">
              <span className="text-green-700 font-semibold">{stats.availableProperties} Available</span> • 
              <span className="text-amber-700 font-semibold">{stats.limitedProperties} Limited</span> • 
              <span className="text-gray-600 font-semibold">{stats.soldOutProperties} Sold</span>
            </div>
          </div>
          <Link to="/admin/properties" className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary-dark">
            <span>Manage Properties</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Leads Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Client Inquiries</span>
            <div className="p-2 bg-blue-50 rounded text-blue-600">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{stats.totalLeads}</span>
            <div className="flex flex-wrap gap-1.5 mt-2 text-[11px] text-gray-500">
              <span className="text-green-700 font-semibold">{stats.newLeads} New</span> • 
              <span className="text-blue-700 font-semibold">{stats.contactedLeads} Contacted</span>
            </div>
          </div>
          <Link to="/admin/leads" className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary-dark">
            <span>View All Leads</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Developers Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Developers</span>
            <div className="p-2 bg-amber-50 rounded text-amber-600">
              <HardHat size={18} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-gray-900">{stats.totalDevelopers}</span>
            <p className="text-[11px] text-gray-500 mt-2">Partnered real estate developers in KSA</p>
          </div>
          <Link to="/admin/developers" className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary-dark">
            <span>Manage Developers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick Links Card */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">CMS & Media</span>
            <div className="p-2 bg-purple-50 rounded text-purple-600">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            <Link to="/admin/homepage" className="block text-xs font-semibold text-gray-800 hover:text-primary">
              • Edit Homepage Content
            </Link>
            <Link to="/admin/media" className="block text-xs font-semibold text-gray-800 hover:text-primary">
              • Manage Media Library
            </Link>
            <Link to="/admin/settings" className="block text-xs font-semibold text-gray-800 hover:text-primary">
              • Contact & Social Settings
            </Link>
          </div>
          <Link to="/admin/homepage" className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary hover:text-primary-dark">
            <span>Open Website CMS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Grid: Recent Leads & Recent Properties */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div>
              <h2 className="text-base font-bold text-gray-900">Recent Inquiries & Leads</h2>
              <p className="text-xs text-gray-500">Clients who submitted inquiries from website forms</p>
            </div>
            <Link to="/admin/leads" className="text-xs font-semibold text-primary hover:underline">
              View All ({stats.totalLeads})
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              No inquiries yet. New submissions will appear here.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900 truncate">{lead.name}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{lead.country || 'Saudi Arabia'}</span>
                    </div>
                    <div className="text-xs text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{lead.email}</span>
                      <span>{lead.whatsapp || lead.phone}</span>
                      {lead.city && <span>Preferred: <strong>{lead.city}</strong></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <select
                      value={lead.status || 'New'}
                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                      className={`text-[11px] font-semibold py-1 px-2 rounded border focus:ring-primary focus:border-primary ${
                        lead.status === 'New' ? 'bg-green-50 border-green-200 text-green-800' :
                        lead.status === 'Contacted' ? 'bg-blue-50 border-blue-200 text-blue-800' :
                        lead.status === 'Qualified' ? 'bg-purple-50 border-purple-200 text-purple-800' :
                        lead.status === 'Closed' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
                        'bg-gray-50 border-gray-200 text-gray-700'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Closed">Closed</option>
                      <option value="Lost">Lost</option>
                    </select>

                    {(lead.whatsapp || lead.phone) && (
                      <a
                        href={`https://wa.me/${(lead.whatsapp || lead.phone).replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#25D366] text-white rounded hover:bg-[#1EBE5D] transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <Phone size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Added Properties (1 Col) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-base font-bold text-gray-900">Latest Properties</h2>
              <Link to="/admin/properties" className="text-xs font-semibold text-primary hover:underline">
                All Properties
              </Link>
            </div>

            <div className="p-4 space-y-3">
              {recentProperties.map((prop) => (
                <div key={prop.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                  <img
                    src={prop.cover_image_url || prop.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300'}
                    alt={prop.name}
                    className="w-14 h-14 object-cover rounded shrink-0 bg-gray-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-xs text-gray-900 truncate">{prop.name || prop.title}</h3>
                    <p className="text-[11px] text-gray-500 truncate">{prop.city}</p>
                    <p className="text-[11px] font-bold text-primary">
                      {prop.price ? `${Number(prop.price).toLocaleString()} ${prop.currency || 'SAR'}` : 'On Request'}
                    </p>
                  </div>
                  <Link
                    to={`/admin/properties/${prop.id}`}
                    className="px-2.5 py-1 text-[11px] font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <Link
              to="/admin/properties/new"
              className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-cream text-xs font-bold uppercase tracking-wider rounded hover:bg-primary-dark transition-colors"
            >
              <Plus size={14} />
              <span>Create New Listing</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

