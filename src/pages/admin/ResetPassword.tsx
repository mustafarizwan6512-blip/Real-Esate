import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured, classifyAuthError } from '../../lib/supabase';
import { Lock, CheckCircle, ArrowLeft, AlertCircle } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{
    message: string;
    actionableHint?: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorDetails({
        message: 'Password must be at least 6 characters.',
        actionableHint: 'Please choose a stronger password with at least 6 characters.'
      });
      return;
    }
    if (password !== confirmPassword) {
      setErrorDetails({
        message: 'Passwords do not match.',
        actionableHint: 'Please re-enter your password in both fields.'
      });
      return;
    }

    if (!isSupabaseConfigured) {
      setErrorDetails({
        message: 'Supabase configuration missing.',
        actionableHint: 'Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in Vercel.'
      });
      return;
    }

    setLoading(true);
    setErrorDetails(null);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) throw updateError;
      setSuccess(true);
    } catch (err: any) {
      console.error('Password update error:', err);
      const classified = classifyAuthError(err);
      setErrorDetails(classified);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-1 mb-6">
          <span className="font-display font-bold text-3xl tracking-wide text-secondary">REFER</span>
          <span className="font-display font-bold text-3xl tracking-wide text-primary">ESTATES</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Set New Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter your new password to regain access to your admin account.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="mx-auto text-green-600" size={48} />
              <h3 className="text-lg font-semibold text-gray-900">Password Updated!</h3>
              <p className="text-xs text-gray-500">Your password has been successfully reset.</p>
              <button
                onClick={() => navigate('/admin')}
                className="w-full mt-4 flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-xs uppercase tracking-widest font-bold text-white bg-primary hover:bg-primary-dark transition-colors"
              >
                Go to Admin Dashboard
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleUpdatePassword}>
              {errorDetails && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-xs space-y-1">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    <span className="font-semibold">{errorDetails.message}</span>
                  </div>
                  {errorDetails.actionableHint && (
                    <p className="pl-6 text-[11px] text-red-600/90 leading-relaxed">
                      {errorDetails.actionableHint}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xs font-bold uppercase tracking-widest text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
                >
                  {loading ? 'Updating Password...' : 'Save New Password'}
                </button>
              </div>

              <div className="text-center pt-2">
                <Link to="/admin/login" className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900">
                  <ArrowLeft size={12} />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

