import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function WebsiteContent() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('website_content')
      .select('key, value')
      .eq('section', 'homepage');
      
    if (error) {
      console.error('Error fetching content:', error);
    } else if (data) {
      const contentMap: Record<string, string> = {};
      data.forEach(item => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    }
    setLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Create an array of updates
      const updates = Object.entries(content).map(([key, value]) => ({
        section: 'homepage',
        key,
        value,
        content_type: 'text'
      }));

      const { error } = await supabase
        .from('website_content')
        .upsert(updates, { onConflict: 'key' });

      if (error) throw error;
      alert('Homepage content updated successfully!');
    } catch (error: any) {
      alert(`Error saving content: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading CMS...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Homepage Content CMS</h1>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-cream px-6 py-2 rounded-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Publish Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Hero Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Hero Section</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hero Heading</label>
              <input
                type="text"
                value={content.hero_heading || ''}
                onChange={(e) => handleChange('hero_heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-display"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
              <textarea
                rows={2}
                value={content.hero_subtitle || ''}
                onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Button Text</label>
              <input
                type="text"
                value={content.hero_cta || ''}
                onChange={(e) => handleChange('hero_cta', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">About Section</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={content.about_heading || ''}
                onChange={(e) => handleChange('about_heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-display"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description Text</label>
              <textarea
                rows={4}
                value={content.about_text || ''}
                onChange={(e) => handleChange('about_text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* International Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">International Buyers Section</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={content.international_heading || ''}
                onChange={(e) => handleChange('international_heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-display"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description Text</label>
              <textarea
                rows={2}
                value={content.international_text || ''}
                onChange={(e) => handleChange('international_text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6 border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 border-b pb-2">Final Call to Action</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Heading</label>
              <input
                type="text"
                value={content.final_cta_heading || ''}
                onChange={(e) => handleChange('final_cta_heading', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary font-display"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description Text</label>
              <textarea
                rows={2}
                value={content.final_cta_text || ''}
                onChange={(e) => handleChange('final_cta_text', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
