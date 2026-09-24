import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DeveloperEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    website: '',
    email: '',
    phone: '',
    whatsapp: '',
    location: '',
    logo_url: '',
    cover_image_url: '',
    status: true,
    sort_order: 0
  });

  useEffect(() => {
    if (!isNew) {
      fetchDeveloper();
    }
  }, [id]);

  const fetchDeveloper = async () => {
    const { data, error } = await supabase
      .from('developers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching developer:', error);
      alert('Failed to load developer');
      navigate('/admin/developers');
    } else if (data) {
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        website: data.website || '',
        email: data.email || '',
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        location: data.location || '',
        logo_url: data.logo_url || '',
        cover_image_url: data.cover_image_url || '',
        status: data.status,
        sort_order: data.sort_order || 0
      });
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Auto-generate slug from name if new
    if (name === 'name' && isNew) {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generatedSlug
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const uploadImage = async (file: File, type: 'logo' | 'cover') => {
    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop() || 'jpg';
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `developers/${type}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('developer-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('developer-media')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) {
        throw new Error('Failed to generate public URL for uploaded file');
      }

      setFormData(prev => ({
        ...prev,
        [type === 'logo' ? 'logo_url' : 'cover_image_url']: data.publicUrl
      }));
    } catch (error: any) {
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'cover') => {
    if (e.target.files && e.target.files.length > 0) {
      uploadImage(e.target.files[0], type);
    }
  };

  const removeImage = (type: 'logo' | 'cover') => {
    setFormData(prev => ({
      ...prev,
      [type === 'logo' ? 'logo_url' : 'cover_image_url']: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = {
        ...formData
      };

      if (isNew) {
        const { error } = await supabase
          .from('developers')
          .insert([payload]);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('developers')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      }

      alert(`Developer ${isNew ? 'created' : 'updated'} successfully!`);
      navigate('/admin/developers');
    } catch (error: any) {
      alert(`Error saving developer: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading developer data...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/developers" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isNew ? 'Add New Developer' : 'Edit Developer'}
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-cream px-6 py-2 rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Developer'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Developer Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">URL Slug *</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary bg-gray-50"
              />
              <p className="text-xs text-gray-500">Must be unique, lowercase, no spaces (e.g., dar-al-arkan)</p>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Location (City, Country)</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2 flex items-center pt-8">
              <input
                type="checkbox"
                id="status"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="status" className="ml-2 block text-sm text-gray-900">
                Active (Visible on website)
              </label>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Developer Logo</label>
              {formData.logo_url ? (
                <div className="relative aspect-square max-w-[200px] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                  <img src={formData.logo_url} alt="Logo preview" className="max-h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => removeImage('logo')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full max-w-[200px]">
                  <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500 font-medium">Upload Logo</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} disabled={uploadingImage} />
                  </label>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Cover Image</label>
              {formData.cover_image_url ? (
                <div className="relative aspect-video max-w-sm border border-gray-200 rounded-lg overflow-hidden">
                  <img src={formData.cover_image_url} alt="Cover preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage('cover')}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full max-w-sm">
                  <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500 font-medium">Upload Cover</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'cover')} disabled={uploadingImage} />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Contact Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="e.g. +966..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
