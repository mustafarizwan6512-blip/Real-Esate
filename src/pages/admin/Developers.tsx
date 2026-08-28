import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Developers() {
  const [developers, setDevelopers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('developers')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching developers:', error);
    } else {
      setDevelopers(data || []);
    }
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('developers')
      .update({ status: !currentStatus })
      .eq('id', id);
      
    if (error) {
      alert('Failed to update status');
    } else {
      fetchDevelopers();
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
      const { error } = await supabase.from('developers').delete().eq('id', id);
      if (error) {
        alert('Failed to delete developer. Ensure they have no associated properties first.');
      } else {
        fetchDevelopers();
      }
    }
  };

  const filteredDevelopers = developers.filter(dev => 
    dev.name.toLowerCase().includes(search.toLowerCase()) || 
    (dev.location && dev.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Developer Management</h1>
        <Link 
          to="/admin/developers/new"
          className="bg-primary text-cream px-4 py-2 text-sm uppercase tracking-wider rounded-sm hover:bg-primary-dark flex items-center gap-2"
        >
          <Plus size={18} />
          Add Developer
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
            placeholder="Search developers by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading developers...</div>
        ) : filteredDevelopers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No developers found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Developer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDevelopers.map((developer) => (
                  <tr key={developer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {developer.logo_url ? (
                            <img className="h-10 w-10 rounded-md object-contain bg-gray-50 p-1" src={developer.logo_url} alt="" />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-500 text-xs font-bold">{developer.name.substring(0, 2).toUpperCase()}</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{developer.name}</div>
                          <div className="text-sm text-gray-500">{developer.location || 'No location'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{developer.email || 'No email'}</div>
                      <div>{developer.website || 'No website'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(developer.id, developer.status)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                          developer.status 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {developer.status ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/developers/${developer.id}`} className="text-primary hover:text-primary-dark">
                          <Edit2 size={18} />
                        </Link>
                        <button onClick={() => handleDelete(developer.id, developer.name)} className="text-red-500 hover:text-red-700">
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
