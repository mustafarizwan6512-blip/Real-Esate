import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Properties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*, developers(name)')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching properties:', error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update status');
    } else {
      fetchProperties(); // refresh
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    const { error } = await supabase
      .from('properties')
      .update({ featured: !currentFeatured })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update featured status');
    } else {
      fetchProperties();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) {
        alert('Failed to delete property');
      } else {
        fetchProperties();
      }
    }
  };

  const filteredProperties = properties.filter(prop => 
    prop.name.toLowerCase().includes(search.toLowerCase()) || 
    prop.city?.toLowerCase().includes(search.toLowerCase()) ||
    prop.developers?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Properties Management</h1>
        <Link 
          to="/admin/properties/new" 
          className="bg-primary text-cream px-4 py-2 text-sm uppercase tracking-wider rounded-sm hover:bg-primary-dark flex items-center gap-2"
        >
          <Plus size={18} />
          Add Property
        </Link>
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Search properties by name, city, or developer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No properties found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developer & Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {property.hero_image_url ? (
                            <img className="h-10 w-10 rounded-md object-cover" src={property.hero_image_url} alt="" />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No img</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{property.name}</div>
                          <div className="text-sm text-gray-500">{property.property_type || 'Property'} • {property.bedrooms ? `${property.bedrooms} Bed` : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.developers?.name || 'Unknown'}</div>
                      <div className="text-sm text-gray-500">{property.city} {property.district ? `- ${property.district}` : ''}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={property.status}
                        onChange={(e) => updateStatus(property.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer outline-none focus:ring-2 focus:ring-primary ${
                          property.status === 'Available' ? 'bg-green-100 text-green-800' :
                          property.status === 'Sold Out' ? 'bg-red-100 text-red-800' :
                          property.status === 'Hidden' ? 'bg-gray-200 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="Limited Availability">Limited Availability</option>
                        <option value="Coming Soon">Coming Soon</option>
                        <option value="Sold Out">Sold Out</option>
                        <option value="Hidden">Hidden</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleFeatured(property.id, property.featured)}
                        className={`text-sm flex items-center gap-1 ${property.featured ? 'text-primary font-medium' : 'text-gray-400'}`}
                      >
                        {property.featured ? <Eye size={16} /> : <EyeOff size={16} />}
                        {property.featured ? 'Featured' : 'Standard'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/properties/${property.id}`} className="text-primary hover:text-primary-dark">
                          <Edit2 size={18} />
                        </Link>
                        <button onClick={() => handleDelete(property.id, property.name)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
