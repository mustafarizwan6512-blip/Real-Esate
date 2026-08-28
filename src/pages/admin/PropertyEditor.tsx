import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ArrowLeft, Save, Image as ImageIcon, X, Upload, ExternalLink, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PropertyEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [developers, setDevelopers] = useState<any[]>([]);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    developer_id: '',
    property_type: 'Apartment',
    city: 'Riyadh',
    district: '',
    address: '',
    short_description: '',
    description: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    starting_price: '',
    currency: 'SAR',
    payment_plan: '',
    handover_date: '',
    furnished_status: 'Unfurnished',
    status: 'Available',
    featured: false,
    hero_image_url: '',
    floor_plan_url: '',
    seo_title: '',
    seo_description: '',
    notes: ''
  });

  useEffect(() => {
    fetchDevelopers();
    if (!isNew) {
      fetchProperty();
      fetchGallery();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchDevelopers = async () => {
    const { data, error } = await supabase.from('developers').select('id, name').order('name');
    if (!error && data) {
      setDevelopers(data);
    }
  };

  const fetchProperty = async () => {
    const { data, error } = await supabase.from('properties').select('*').eq('id', id).single();
    if (error) {
      setStatusMessage({ type: 'error', text: 'Failed to load property.' });
      setTimeout(() => navigate('/admin/properties'), 2000);
    } else if (data) {
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        developer_id: data.developer_id || '',
        property_type: data.property_type || 'Apartment',
        city: data.city || 'Riyadh',
        district: data.district || '',
        address: data.address || '',
        short_description: data.short_description || '',
        description: data.description || '',
        bedrooms: data.bedrooms || '',
        bathrooms: data.bathrooms || '',
        size: data.size || '',
        starting_price: data.starting_price?.toString() || '',
        currency: data.currency || 'SAR',
        payment_plan: data.payment_plan || '',
        handover_date: data.handover_date || '',
        furnished_status: data.furnished_status || 'Unfurnished',
        status: data.status || 'Available',
        featured: data.featured || false,
        hero_image_url: data.hero_image_url || '',
        floor_plan_url: data.floor_plan_url || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        notes: data.notes || ''
      });
    }
    setLoading(false);
  };

  const fetchGallery = async () => {
    if (!id) return;
    const { data, error } = await supabase
      .from('property_media')
      .select('*')
      .eq('property_id', id)
      .order('sort_order', { ascending: true });
    if (!error && data) {
      setGalleryImages(data);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData(prev => ({
      ...prev,
      name: newName,
      slug: isNew ? generateSlug(newName) : prev.slug
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      const fileExt = file.name.split('.').pop() || 'jpg';
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `properties/hero_${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg'
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('property-media')
        .getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error('Failed to generate public URL for uploaded hero image');
      }

      setFormData(prev => ({ ...prev, hero_image_url: publicUrl }));
    } catch (error: any) {
      alert(`Image upload error: ${error.message}`);
    } finally {
      setUploadingHero(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !id) return;

    try {
      setUploadingGallery(true);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop() || 'jpg';
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `properties/gallery/${Date.now()}_${Math.random().toString(36).substring(2, 7)}_${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-media')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type || 'image/jpeg'
          });

        if (uploadError) {
          console.error(`Error uploading gallery item ${file.name}:`, uploadError);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('property-media')
          .getPublicUrl(filePath);

        if (publicUrl) {
          await supabase.from('property_media').insert([{
            property_id: id,
            media_type: 'image',
            url: publicUrl,
            sort_order: galleryImages.length + i
          }]);
        }
      }
      fetchGallery();
    } catch (err: any) {
      alert(`Gallery upload error: ${err.message}`);
    } finally {
      setUploadingGallery(false);
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  const handleDeleteGalleryImage = async (mediaId: string) => {
    const { error } = await supabase.from('property_media').delete().eq('id', mediaId);
    if (!error) {
      setGalleryImages(prev => prev.filter(img => img.id !== mediaId));
    }
  };

  const handleSetAsHero = (url: string) => {
    setFormData(prev => ({ ...prev, hero_image_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    
    try {
      const payload = {
        ...formData,
        developer_id: formData.developer_id || null,
        starting_price: formData.starting_price ? parseFloat(formData.starting_price) : null,
      };

      if (isNew) {
        const { data, error } = await supabase.from('properties').insert([payload]).select().single();
        if (error) throw error;
        setStatusMessage({ type: 'success', text: 'Property created successfully!' });
        setTimeout(() => {
          navigate(`/admin/properties/${data.id}`);
        }, 1000);
      } else {
        const { error } = await supabase.from('properties').update(payload).eq('id', id);
        if (error) throw error;
        setStatusMessage({ type: 'success', text: 'Property updated successfully!' });
      }
    } catch (error: any) {
      setStatusMessage({ type: 'error', text: `Save error: ${error.message}` });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500 font-medium animate-pulse">
        Loading property information...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/properties"
            className="p-2 text-gray-500 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-display">
              {isNew ? 'Create New Property' : `Edit: ${formData.name}`}
            </h1>
            <p className="text-xs text-gray-500">
              {isNew ? 'Fill in property specifications and upload media' : `ID: ${id}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isNew && (
            <Link
              to={`/projects/${formData.slug || id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              <ExternalLink size={14} />
              <span>Live Preview</span>
            </Link>
          )}

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-cream px-6 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors disabled:opacity-50 shadow-sm"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Property'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-lg flex items-center gap-3 text-xs font-semibold ${
          statusMessage.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {statusMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Property Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleNameChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="e.g. AL REHAB CENTER"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">URL Slug *</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:ring-primary focus:border-primary bg-gray-50"
                placeholder="al-rehab-center"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Partner Developer</label>
              <select
                name="developer_id"
                value={formData.developer_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              >
                <option value="">Select Developer (Optional)</option>
                {developers.map(dev => (
                  <option key={dev.id} value={dev.id}>{dev.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Property Type</label>
              <select
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Duplex">Duplex</option>
                <option value="Mansion">Mansion</option>
                <option value="Mixed Use">Mixed Use</option>
                <option value="Land">Land</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Address */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Location Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="Riyadh, Jeddah, Al Khobar..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">District / Area</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="Al Malqa, Hittin, Al Olaya..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Full Address / Street</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="King Salman Road, Riyadh"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Specifications, Pricing & Timeline */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Specifications & Pricing
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Bedrooms</label>
              <input
                type="text"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="e.g. 2, 3, 4"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Bathrooms</label>
              <input
                type="text"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="e.g. 3, 4"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Total Area (sqm)</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. 250 - 450 sqm"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Starting Price</label>
              <div className="flex">
                <input
                  type="number"
                  name="starting_price"
                  value={formData.starting_price}
                  onChange={handleChange}
                  placeholder="2500000"
                  className="w-full px-3 py-2 border border-r-0 border-gray-300 rounded-l text-sm focus:ring-primary focus:border-primary"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-2.5 py-2 border border-gray-300 rounded-r bg-gray-50 text-xs font-bold"
                >
                  <option value="SAR">SAR</option>
                  <option value="USD">USD</option>
                  <option value="AED">AED</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Handover Date</label>
              <input
                type="text"
                name="handover_date"
                value={formData.handover_date}
                onChange={handleChange}
                placeholder="e.g. Q4 2026 or Ready"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Furnishing</label>
              <select
                name="furnished_status"
                value={formData.furnished_status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              >
                <option value="Unfurnished">Unfurnished</option>
                <option value="Semi-Furnished">Semi-Furnished</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Luxury Fitted">Luxury Fitted</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Terms</label>
              <input
                type="text"
                name="payment_plan"
                value={formData.payment_plan}
                onChange={handleChange}
                placeholder="e.g. 10% Down / 4 Years Installments"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Status & Homepage Visibility */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Visibility & Publication
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Listing Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary font-semibold"
              >
                <option value="Available">Available</option>
                <option value="Limited Availability">Limited Availability</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Sold Out">Sold Out</option>
                <option value="Hidden">Hidden (Draft)</option>
              </select>
            </div>
            
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Featured Property (Featured on Homepage Hero/Grid)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 5: Cover Hero Image */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Hero & Cover Image
          </h2>
          
          <div className="space-y-3">
            {formData.hero_image_url ? (
              <div className="relative w-full max-w-xl aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                <img src={formData.hero_image_url} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white text-gray-900 px-3 py-1.5 rounded text-xs font-bold uppercase shadow hover:bg-gray-100"
                  >
                    Change Image
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, hero_image_url: '' }))}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow"
                    title="Remove Image"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full max-w-xl aspect-video border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary transition-colors"
              >
                {uploadingHero ? (
                  <div className="text-gray-500 flex flex-col items-center text-xs font-medium">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
                    <span>Uploading image to Supabase storage...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Click to upload cover image</span>
                    <span className="text-[11px] text-gray-400 mt-1">Recommended: 1920x1080 JPEG/WebP</span>
                  </>
                )}
              </div>
            )}
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleHeroUpload}
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
            />
          </div>
        </div>

        {/* Section 6: Multiple Gallery Images (if existing property) */}
        {!isNew && (
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-gray-900 font-display">Photo Gallery</h2>
                <p className="text-xs text-gray-500">Add multiple high-resolution photos for this property.</p>
              </div>
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploadingGallery}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
              >
                <Plus size={14} />
                <span>{uploadingGallery ? 'Uploading...' : 'Add Photos'}</span>
              </button>
            </div>

            <input
              type="file"
              ref={galleryInputRef}
              onChange={handleGalleryUpload}
              multiple
              accept="image/jpeg, image/png, image/webp"
              className="hidden"
            />

            {galleryImages.length === 0 ? (
              <p className="text-xs text-gray-400 italic py-4">No gallery images added yet. Click &quot;Add Photos&quot; to upload.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img.id} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => handleSetAsHero(img.url)}
                        className="px-2 py-1 bg-white text-gray-900 text-[10px] font-bold uppercase rounded shadow hover:bg-gray-100"
                        title="Set as Cover Hero"
                      >
                        Set Cover
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryImage(img.id)}
                        className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow"
                        title="Delete photo"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 7: Description & Details */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-5">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3 font-display">
            Descriptions & Overview
          </h2>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Short Summary (Used in cards & previews)</label>
              <textarea
                name="short_description"
                rows={2}
                value={formData.short_description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="A refined luxury residential project located in the heart of..."
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Full Detailed Description</label>
              <textarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="Comprehensive overview covering architectural finishes, prime neighborhood access, amenities, and investment advantages..."
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Internal Admin Notes</label>
              <textarea
                name="notes"
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                placeholder="Private notes regarding developer commissions, unit numbers, contact person..."
              />
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="flex justify-end gap-3 pt-4">
          <Link
            to="/admin/properties"
            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-cream px-8 py-2.5 text-xs font-bold uppercase tracking-widest rounded transition-colors disabled:opacity-50 shadow"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Property'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

