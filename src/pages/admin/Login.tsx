import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured, classifyAuthError, getSupabaseDiagnostics } from '../../lib/supabase';
import { Lock, Mail, ArrowLeft, CheckCircle, AlertCircle, HelpCircle, Info } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<{
    message: string;
    actionableHint?: string;
    type?: string;
  } | null>(null);

  // Forgot password modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotErrorDetails, setForgotErrorDetails] = useState<{
    message: string;
    actionableHint?: string;
  } | null>(null);

  const navigate = useNavigate();
  const diagnostics = getSupabaseDiagnostics();

  useEffect(() => {
    // If Supabase is configured and already authenticated, redirect straight to admin dashboard
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          navigate('/admin');
        }
      }).catch(err => {
        console.warn('Session retrieval error:', err);
      });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorDetails(null);

    // Pre-flight validation: check if client-side env vars exist
    if (!isSupabaseConfigured) {
      setErrorDetails({
        type: 'unconfigured',
        message: 'Supabase is not configured in this production build.',
        actionableHint:
          'The environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing or set to placeholder values. In your Vercel Dashboard, go to Project Settings > Environment Variables, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, and then trigger a Redeploy.'
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;
      
      if (data?.session) {
        navigate('/admin');
      }
    } catch (err: any) {
      console.error('Supabase Auth error details:', err);
      const classified = classifyAuthError(err);
      setErrorDetails(classified);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotErrorDetails(null);

    if (!isSupabaseConfigured) {
      setForgotErrorDetails({
        message: 'Supabase configuration missing.',
        actionableHint: 'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel settings.'
      });
      setForgotLoading(false);
      return;
    }

    try {
      const redirectUrl = `${window.location.origin}/admin/reset-password`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(forgotEmail.trim(), {
        redirectTo: redirectUrl,
      });

      if (resetError) throw resetError;
      setForgotSuccess(true);
    } catch (err: any) {
      console.error('Password reset error:', err);
      const classified = classifyAuthError(err);
      setForgotErrorDetails(classified);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-1 mb-4">
          <span className="font-display font-bold text-3xl tracking-wide text-secondary">REFER</span>
          <span className="font-display font-bold text-3xl tracking-wide text-primary">ESTATES</span>
        </Link>
        <h2 className="font-display font-bold text-xl tracking-wider text-secondary uppercase">
          Admin Portal
        </h2>
        <p className="mt-1 text-xs text-secondary/60 uppercase tracking-widest">
          Secure Administrator Sign-In
        </p>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md sm:rounded-lg sm:px-10 border border-secondary/10">
          
          {/* Missing Env Banner if not configured */}
          {!isSupabaseConfigured && (
            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle size={15} className="text-amber-600 shrink-0" />
                <span>Supabase Setup Required</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                The production build is currently using placeholder Supabase credentials. Add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your Vercel Project Settings and trigger a Redeploy.
              </p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            {errorDetails && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-xs space-y-1.5">
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
              <label className="block font-display font-bold text-xs uppercase tracking-widest text-secondary/70 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@referestates.com"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-secondary text-sm rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block font-display font-bold text-xs uppercase tracking-widest text-secondary/70">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setForgotEmail(email);
                    setForgotSuccess(false);
                    setForgotErrorDetails(null);
                    setShowForgotModal(true);
                  }}
                  className="text-xs text-primary hover:text-primary-dark font-medium underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 text-secondary text-sm rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-cream px-6 py-3 font-display font-bold text-xs tracking-[0.15em] uppercase hover:bg-primary-dark transition-colors rounded disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-secondary/60 hover:text-secondary font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-lg text-secondary">Reset Password</h3>
            <p className="text-xs text-gray-600">
              Enter your administrator email address and we will send you a password recovery link.
            </p>

            {forgotSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded text-xs space-y-3">
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle size={16} />
                  <span>Password Reset Email Sent!</span>
                </div>
                <p>Please check your email inbox for the reset link.</p>
                <button
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2 bg-green-700 text-white rounded font-bold uppercase tracking-wider text-[11px]"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                {forgotErrorDetails && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-xs space-y-1">
                    <div className="font-semibold">{forgotErrorDetails.message}</div>
                    {forgotErrorDetails.actionableHint && (
                      <p className="text-[11px] text-red-600">{forgotErrorDetails.actionableHint}</p>
                    )}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="admin@referestates.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-primary focus:border-primary"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-4 py-2 bg-primary text-cream text-xs font-bold uppercase tracking-wider rounded hover:bg-primary-dark disabled:opacity-50"
                  >
                    {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


