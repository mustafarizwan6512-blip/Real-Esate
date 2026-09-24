import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Filter, Share2, Copy, Check, ExternalLink, MapPin, Building, Bed, Bath, Maximize2, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientSearch() {
  const [properties, setProperties] = useState<any[]>([]);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter States
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [furnishedFilter, setFurnishedFilter] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [propsRes, devsRes] = await Promise.all([
      supabase.from('properties').select('*, developers(name, logo_url)').order('created_at', { ascending: false }),
      supabase.from('developers').select('id, name').order('name')
    ]);

    if (propsRes.data) setProperties(propsRes.data);
    if (devsRes.data) setDevelopers(devsRes.data);
    setLoading(false);
  };

  const filteredProperties = properties.filter(prop => {
    // Search query matches name, title, district, city, or developer
    const matchesSearch = !search || 
      prop.name?.toLowerCase().includes(search.toLowerCase()) ||
      prop.title?.toLowerCase().includes(search.toLowerCase()) ||
      prop.city?.toLowerCase().includes(search.toLowerCase()) ||
      prop.district?.toLowerCase().includes(search.toLowerCase()) ||
      prop.developers?.name?.toLowerCase().includes(search.toLowerCase());

    const matchesCity = !cityFilter || prop.city === cityFilter;
    const matchesType = !typeFilter || prop.property_type === typeFilter;
    const matchesBedrooms = !bedroomsFilter || String(prop.bedrooms) === bedroomsFilter;
    const matchesDev = !developerFilter || prop.developer_id === developerFilter;
    const matchesStatus = !statusFilter || prop.status === statusFilter;
    const matchesFurnished = !furnishedFilter || prop.furnished_status === furnishedFilter;
    
    const propPrice = prop.price || prop.starting_price || 0;
    const matchesMinPrice = !minPrice || propPrice >= Number(minPrice);
    const matchesMaxPrice = !maxPrice || propPrice <= Number(maxPrice);

    return matchesSearch && matchesCity && matchesType && matchesBedrooms && matchesDev && matchesStatus && matchesFurnished && matchesMinPrice && matchesMaxPrice;
  });

  const uniqueCities = Array.from(new Set(properties.map(p => p.city).filter(Boolean)));
  const uniqueTypes = Array.from(new Set(properties.map(p => p.property_type).filter(Boolean)));

  const handleCopyDetails = (prop: any) => {
    const text = `🏡 *${prop.name || prop.title}*\n` +
      `📍 Location: ${prop.district ? `${prop.district}, ` : ''}${prop.city}, Saudi Arabia\n` +
      `🏢 Developer: ${prop.developers?.name || prop.developer || 'REFERESTATES Partner'}\n` +
      `🏠 Type: ${prop.property_type || 'Luxury Residence'}\n` +
      `🛏 Bedrooms: ${prop.bedrooms || 'Custom'} | 🛁 Bathrooms: ${prop.bathrooms || 'Custom'}\n` +
      `📐 Size: ${prop.size_sqm ? `${prop.size_sqm} sqm` : 'Upon Request'}\n` +
      `💰 Price: ${prop.price ? `${Number(prop.price).toLocaleString()} ${prop.currency || 'SAR'}` : 'Price on Request'}\n` +
      `🔑 Status: ${prop.status}\n` +
      `🗓 Handover: ${prop.handover_date || 'TBA'}\n\n` +
      `🔗 View details: https://www.referestates.com/projects/${prop.id}`;

    navigator.clipboard.writeText(text);
    setCopiedId(prop.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getWhatsAppShareUrl = (prop: any) => {
    const text = encodeURIComponent(
      `Hello, here are the details for *${prop.name || prop.title}* in ${prop.city}:\n` +
      `• Type: ${prop.property_type || 'Luxury Residence'}\n` +
      `• Bedrooms: ${prop.bedrooms || 'Custom'}\n` +
      `• Price: ${prop.price ? `${Number(prop.price).toLocaleString()} ${prop.currency || 'SAR'}` : 'On Request'}\n` +
      `• Link: https://www.referestates.com/projects/${prop.id}`
    );
    return `https://wa.me/?text=${text}`;
  };

  const resetFilters = () => {
    setSearch('');
    setCityFilter('');
    setTypeFilter('');
    setBedroomsFilter('');
    setDeveloperFilter('');
    setStatusFilter('');
    setMinPrice('');
    setMaxPrice('');
    setFurnishedFilter('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Client Property Search</h1>
          <p className="text-sm text-gray-500 mt-1">Quickly find matching units for client inquiries and share property summaries.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-primary/10 text-primary rounded-full">
            {filteredProperties.length} Properties Found
          </span>
          <button
            onClick={resetFilters}
            className="text-xs font-medium text-gray-600 hover:text-gray-900 underline"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by project name, developer, district, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-sm"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">City</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            >
              <option value="">All Cities</option>
              {uniqueCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Property Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Duplex">Duplex</option>
              <option value="Mansion">Mansion</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Bedrooms</label>
            <select
              value={bedroomsFilter}
              onChange={(e) => setBedroomsFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            >
              <option value="">Any Beds</option>
              <option value="0">Studio</option>
              <option value="1">1 Bed</option>
              <option value="2">2 Beds</option>
              <option value="3">3 Beds</option>
              <option value="4">4 Beds</option>
              <option value="5">5+ Beds</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Developer</label>
            <select
              value={developerFilter}
              onChange={(e) => setDeveloperFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            >
              <option value="">All Developers</option>
              {developers.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Availability</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Limited Availability">Limited</option>
              <option value="Coming Soon">Coming Soon</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Min Price (SAR)</label>
            <input
              type="number"
              placeholder="e.g. 1000000"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Max Price (SAR)</label>
            <input
              type="number"
              placeholder="e.g. 10000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full py-1.5 px-2 bg-gray-50 border border-gray-200 rounded text-xs focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Results List */}
      {loading ? (
        <div className="bg-white p-12 rounded-lg text-center text-gray-500 border border-gray-200">
          Loading properties...
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="bg-white p-12 rounded-lg text-center border border-gray-200">
          <p className="text-gray-500 font-medium">No properties match your filter criteria.</p>
          <button
            onClick={resetFilters}
            className="mt-3 text-sm text-primary font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.map((prop) => {
            const isCopied = copiedId === prop.id;
            return (
              <div
                key={prop.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Image & Status Badge */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                    <img
                      src={prop.cover_image_url || prop.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                      alt={prop.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm text-white ${
                        prop.status === 'Available' ? 'bg-green-600' :
                        prop.status === 'Limited Availability' ? 'bg-amber-600' :
                        prop.status === 'Coming Soon' ? 'bg-blue-600' : 'bg-gray-800'
                      }`}>
                        {prop.status}
                      </span>
                      {prop.featured && (
                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm bg-primary text-white">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 leading-snug">{prop.name || prop.title}</h3>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                          <MapPin size={13} className="text-primary" />
                          {prop.district ? `${prop.district}, ` : ''}{prop.city}
                        </p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {prop.property_type || 'Property'}
                      </span>
                    </div>

                    {/* Developer */}
                    <div className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Building size={14} className="text-gray-400" />
                      <span>Developer: <strong>{prop.developers?.name || prop.developer || 'REFERESTATES'}</strong></span>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-100 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Bed size={15} className="text-gray-400" />
                        <span>{prop.bedrooms !== undefined ? `${prop.bedrooms} Beds` : '-'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath size={15} className="text-gray-400" />
                        <span>{prop.bathrooms !== undefined ? `${prop.bathrooms} Baths` : '-'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Maximize2 size={14} className="text-gray-400" />
                        <span>{prop.size_sqm ? `${prop.size_sqm} m²` : '-'}</span>
                      </div>
                    </div>

                    {/* Price & Handover */}
                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Starting Price</p>
                        <p className="text-base font-bold text-primary">
                          {prop.price ? `${Number(prop.price).toLocaleString()} ${prop.currency || 'SAR'}` : 'Price on Request'}
                        </p>
                      </div>
                      {prop.handover_date && (
                        <div className="text-right">
                          <p className="text-[10px] uppercase font-bold text-gray-400">Handover</p>
                          <p className="text-xs font-semibold text-gray-700">{prop.handover_date}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyDetails(prop)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                        isCopied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                      title="Copy full property pitch for client"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                      <span>{isCopied ? 'Copied' : 'Copy Pitch'}</span>
                    </button>

                    <a
                      href={getWhatsAppShareUrl(prop)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded text-xs font-semibold hover:bg-[#1EBE5D] transition-colors"
                      title="Share directly via WhatsApp"
                    >
                      <Share2 size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>

                  <Link
                    to={`/admin/properties/${prop.id}`}
                    className="text-xs font-semibold text-primary hover:text-primary-dark"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
