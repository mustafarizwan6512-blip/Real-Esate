import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Trash2, Copy, Check, ExternalLink, Image as ImageIcon, Folder, RefreshCw, AlertCircle } from 'lucide-react';

interface StorageFile {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: any;
  publicUrl?: string;
}

export default function MediaLibrary() {
  const [selectedBucket, setSelectedBucket] = useState<'property-media' | 'developer-media' | 'website-media'>('property-media');
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const buckets = [
    { id: 'property-media', name: 'Property Media', description: 'Images and gallery assets for properties' },
    { id: 'developer-media', name: 'Developer Media', description: 'Logos and cover photos for real estate developers' },
    { id: 'website-media', name: 'Website Media', description: 'CMS assets, banners, and general website images' },
  ] as const;

  useEffect(() => {
    fetchBucketFiles();
  }, [selectedBucket]);

  const fetchBucketFiles = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const { data, error } = await supabase.storage
        .from(selectedBucket)
        .list('', { limit: 100, offset: 0, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) {
        // If bucket does not exist or access issue
        setErrorMessage(error.message);
        setFiles([]);
      } else if (data) {
        // Exclude placeholder files if any
        const filtered = data.filter(f => f.name !== '.emptyFolderPlaceholder' && !f.name.startsWith('.'));
        const filesWithUrls = filtered.map(file => {
          const { data: urlData } = supabase.storage.from(selectedBucket).getPublicUrl(file.name);
          return {
            ...file,
            publicUrl: urlData.publicUrl
          };
        });
        setFiles(filesWithUrls);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to list bucket files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    setErrorMessage(null);

    const uploadedFiles: File[] = Array.from(e.target.files);
    let errorCount = 0;

    for (const file of uploadedFiles) {
      try {
        const fileExt = file.name.split('.').pop();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueFileName = `${Date.now()}_${safeName}`;

        const { error } = await supabase.storage
          .from(selectedBucket)
          .upload(uniqueFileName, file, {
            cacheControl: '3600',
            upsert: true,
            contentType: file.type || 'image/jpeg'
          });

        if (error) {
          console.error(`Error uploading ${file.name}:`, error);
          errorCount++;
        }
      } catch (err) {
        console.error(err);
        errorCount++;
      }
    }

    if (errorCount > 0) {
      alert(`Completed with ${errorCount} errors. Make sure storage buckets and RLS policies are configured.`);
    }

    setUploading(false);
    fetchBucketFiles();
    e.target.value = '';
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!window.confirm(`Are you sure you want to delete "${fileName}"? This cannot be undone.`)) return;

    try {
      const { error } = await supabase.storage.from(selectedBucket).remove([fileName]);
      if (error) {
        alert(`Failed to delete: ${error.message}`);
      } else {
        setFiles(prev => prev.filter(f => f.name !== fileName));
      }
    } catch (err: any) {
      alert(`Error deleting file: ${err.message}`);
    }
  };

  const handleCopyUrl = (url?: string) => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
          <p className="text-sm text-gray-500 mt-1">Manage images and assets stored on Supabase Storage.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBucketFiles}
            disabled={loading}
            className="p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50 text-gray-600 disabled:opacity-50"
            title="Refresh Files"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>

          <label className={`flex items-center gap-2 bg-primary text-cream px-4 py-2 rounded-sm text-sm uppercase tracking-wider font-semibold cursor-pointer hover:bg-primary-dark transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
            <Upload size={18} />
            <span>{uploading ? 'Uploading...' : 'Upload Media'}</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Bucket Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {buckets.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBucket(b.id)}
            className={`p-4 text-left rounded-lg border transition-all ${
              selectedBucket === b.id
                ? 'bg-white border-primary shadow-sm ring-1 ring-primary'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3 mb-1">
              <Folder className={selectedBucket === b.id ? 'text-primary' : 'text-gray-400'} size={20} />
              <span className={`font-semibold text-sm ${selectedBucket === b.id ? 'text-gray-900' : 'text-gray-700'}`}>
                {b.name}
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{b.description}</p>
          </button>
        ))}
      </div>

      {/* Error / Instruction Banner */}
      {errorMessage && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3 text-amber-800 text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Bucket Notice</p>
            <p className="mt-0.5">{errorMessage}</p>
            <p className="text-xs mt-1 text-amber-700">
              Ensure you have created the public storage buckets (<strong>property-media</strong>, <strong>developer-media</strong>, <strong>website-media</strong>) in your Supabase project dashboard under <strong>Storage &gt; New Bucket (Public)</strong>.
            </p>
          </div>
        </div>
      )}

      {/* File Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[300px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <RefreshCw className="animate-spin mb-3 text-primary" size={28} />
            <p className="text-sm">Loading media files...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ImageIcon className="text-gray-300 mb-3" size={48} />
            <p className="text-base font-semibold text-gray-800">No media found in {selectedBucket}</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              Upload images directly using the button above or attach them while creating properties and developers.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {files.map((file) => {
              const isCopied = copiedUrl === file.publicUrl;
              return (
                <div
                  key={file.name}
                  className="group relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  {/* Image Thumbnail */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    <img
                      src={file.publicUrl}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <a
                        href={file.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
                        title="View Full Size"
                      >
                        <ExternalLink size={16} />
                      </a>
                      <button
                        onClick={() => handleDeleteFile(file.name)}
                        className="p-1.5 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors"
                        title="Delete File"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-2.5 bg-white border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-800 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        onClick={() => handleCopyUrl(file.publicUrl)}
                        className={`flex items-center gap-1 text-[11px] font-semibold px-2 py-1 rounded transition-colors ${
                          isCopied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isCopied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{isCopied ? 'Copied' : 'Copy URL'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
