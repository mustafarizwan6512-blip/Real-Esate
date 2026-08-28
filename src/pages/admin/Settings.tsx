import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Lock, User, Phone, Mail, MapPin, Globe, Share2, Database, Shield, Check, Copy } from 'lucide-react';

export default function Settings() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminRole, setAdminRole] = useState<string>('admin');
  const [savingSettings, setSavingSettings] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Password fields
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // General site contact settings
  const [siteSettings, setSiteSettings] = useState({
    site_name: 'REFERESTATES',
    contact_phone: '+966 53 660 9534',
    contact_whatsapp: '+966 53 660 9534',
    contact_email: 'info@referestates.com',
    office_address: 'Riyadh, Kingdom of Saudi Arabia',
    tiktok_url: 'https://www.tiktok.com/@referestates',
    instagram_url: 'https://www.instagram.com/referestates?igsi=NGlwdXVmOGwzcW15',
    facebook_url: 'https://www.facebook.com/profile.php?id=61593521009451',
    currency_default: 'SAR',
  });

  useEffect(() => {
    loadProfileAndSettings();
  }, []);

  const loadProfileAndSettings = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setCurrentUser(session.user);

      // Check admin role
      const { data: adminData } = await supabase
        .from('admins')
        .select('role')
        .eq('user_id', session.user.id)
        .single();
      
      if (adminData) {
        setAdminRole(adminData.role || 'admin');
      }
    }

    // Load site settings
    const { data: settingsData } = await supabase
      .from('website_content')
      .select('content')
      .eq('section', 'general_settings')
      .single();

    if (settingsData?.content) {
      setSiteSettings(prev => ({
        ...prev,
        ...settingsData.content
      }));
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      alert('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      alert(`Failed to update password: ${err.message}`);
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          section: 'general_settings',
          content: siteSettings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'section' });

      if (error) throw error;
      alert('Site settings saved successfully!');
    } catch (err: any) {
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSavingSettings(false);
    }
  };

  const bootstrapSql = `-- Run this in Supabase SQL Editor to make your user an Admin:
INSERT INTO public.admins (user_id, email, full_name, role, is_active)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', split_part(email, '@', 1), 'Admin'), 'super_admin', true
FROM auth.users
WHERE email = '${currentUser?.email || 'admin@referestates.com'}'
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin', is_active = true;`;

  const copySql = () => {
    navigator.clipboard.writeText(bootstrapSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your administrator account credentials and global website contact information.</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <User className="text-primary" size={22} />
          <div>
            <h2 className="text-base font-semibold text-gray-900">Administrator Account</h2>
            <p className="text-xs text-gray-500">Your logged in credentials and role</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-3.5 bg-gray-50 rounded-md border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase">Email</span>
            <p className="text-sm font-medium text-gray-900 mt-1 truncate">{currentUser?.email || 'Loading...'}</p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-md border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase">Assigned Role</span>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mt-1">{adminRole}</p>
          </div>

          <div className="p-3.5 bg-gray-50 rounded-md border border-gray-100">
            <span className="text-xs text-gray-400 font-semibold uppercase">Auth Provider</span>
            <p className="text-sm font-medium text-gray-900 mt-1">Supabase Auth</p>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <Lock className="text-primary" size={22} />
          <div>
            <h2 className="text-base font-semibold text-gray-900">Update Password</h2>
            <p className="text-xs text-gray-500">Change your login password securely</p>
          </div>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={updatingPassword}
            className="px-5 py-2 bg-primary text-cream text-xs uppercase tracking-widest font-bold rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {updatingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* Global Contact & Social Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <Globe className="text-primary" size={22} />
            <div>
              <h2 className="text-base font-semibold text-gray-900">Website Contact & Social Links</h2>
              <p className="text-xs text-gray-500">Used across website headers, footers, and contact sections</p>
            </div>
          </div>
          <button
            onClick={handleSaveSiteSettings}
            disabled={savingSettings}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-cream text-xs uppercase tracking-widest font-bold rounded hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            <span>{savingSettings ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        <form onSubmit={handleSaveSiteSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Site / Brand Name
            </label>
            <input
              type="text"
              value={siteSettings.site_name}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, site_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Default Currency
            </label>
            <input
              type="text"
              value={siteSettings.currency_default}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, currency_default: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={siteSettings.contact_whatsapp}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, contact_whatsapp: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={siteSettings.contact_phone}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, contact_phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Public Contact Email
            </label>
            <input
              type="email"
              value={siteSettings.contact_email}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Office Location
            </label>
            <input
              type="text"
              value={siteSettings.office_address}
              onChange={(e) => setSiteSettings(prev => ({ ...prev, office_address: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary text-sm"
            />
          </div>

          <div className="md:col-span-2 border-t border-gray-100 pt-4">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-4">Social Media Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">TikTok Profile URL</label>
                <input
                  type="url"
                  value={siteSettings.tiktok_url}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, tiktok_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Instagram Profile URL</label>
                <input
                  type="url"
                  value={siteSettings.instagram_url}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, instagram_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Facebook Page URL</label>
                <input
                  type="url"
                  value={siteSettings.facebook_url}
                  onChange={(e) => setSiteSettings(prev => ({ ...prev, facebook_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* SQL Helper for Adding Administrators */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <Database className="text-primary" size={20} />
            <h2 className="text-sm font-semibold text-gray-900">Grant Admin Role in Supabase</h2>
          </div>
          <button
            onClick={copySql}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
          >
            {copiedSql ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            <span>{copiedSql ? 'Copied SQL' : 'Copy SQL'}</span>
          </button>
        </div>
        <p className="text-xs text-gray-500">
          If you invite a new team member via Supabase Auth, run this snippet in your Supabase SQL editor to grant them administrator access:
        </p>
        <pre className="p-3 bg-gray-900 text-gray-100 text-xs rounded-md overflow-x-auto font-mono">
          {bootstrapSql}
        </pre>
      </div>
    </div>
  );
}
