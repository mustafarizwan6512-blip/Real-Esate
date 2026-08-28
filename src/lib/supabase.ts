import { createClient } from '@supabase/supabase-js';

// Retrieve Vite client-side environment variables
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Clean and sanitize URL if present
const sanitizeUrl = (url?: string): string => {
  if (!url) return '';
  const trimmed = url.trim();
  // Remove trailing slashes
  return trimmed.replace(/\/+$/, '');
};

const supabaseUrl = sanitizeUrl(rawSupabaseUrl);
const supabaseAnonKey = (rawSupabaseAnonKey || '').trim();

// Determine if valid Supabase configuration is present
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('placeholder-url') &&
  !supabaseUrl.includes('your-supabase-project') &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'placeholder-key' &&
  supabaseAnonKey !== 'your-supabase-anon-key'
);

// Non-sensitive diagnostic information (safe for UI debugging)
export function getSupabaseDiagnostics() {
  let hostname = 'not-configured';
  try {
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
      hostname = new URL(supabaseUrl).hostname;
    }
  } catch {
    hostname = 'invalid-url';
  }

  return {
    isConfigured: isSupabaseConfigured,
    hasUrl: Boolean(supabaseUrl),
    hasAnonKey: Boolean(supabaseAnonKey),
    hostname,
    isPlaceholder: !isSupabaseConfigured,
    urlScheme: supabaseUrl.startsWith('https://') ? 'https' : (supabaseUrl.startsWith('http://') ? 'http' : 'none')
  };
}

if (!isSupabaseConfigured) {
  console.warn(
    '[REFERESTATES] Supabase environment variables are missing or set to placeholder values.\n' +
    'To connect the admin panel and live database, ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your environment (or Vercel Project Settings) and redeploy.'
  );
}

// Single initialized Supabase client
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-url.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    }
  }
);

/**
 * Classifies Supabase Auth and database errors to provide actionable feedback
 * distinguishing connection failures, invalid credentials, unconfirmed emails,
 * RLS violations, and missing build configuration.
 */
export function classifyAuthError(error: any): {
  type: 'unconfigured' | 'network' | 'credentials' | 'unconfirmed' | 'rate_limit' | 'unauthorized' | 'unknown';
  message: string;
  actionableHint?: string;
} {
  if (!isSupabaseConfigured) {
    return {
      type: 'unconfigured',
      message: 'Supabase is not configured in this build.',
      actionableHint:
        'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are missing from the build. In Vercel, navigate to Project Settings > Environment Variables, add both variables (prefixed with VITE_), and trigger a new deployment.'
    };
  }

  if (!error) {
    return {
      type: 'unknown',
      message: 'An unknown error occurred.'
    };
  }

  const rawMessage = (error?.message || error?.error_description || String(error)).trim();
  const lowerMessage = rawMessage.toLowerCase();
  const status = error?.status || error?.statusCode;

  // Network / Fetch failure
  if (
    rawMessage === 'Failed to fetch' ||
    error?.name === 'TypeError' ||
    lowerMessage.includes('failed to fetch') ||
    lowerMessage.includes('networkerror') ||
    lowerMessage.includes('fetch failed')
  ) {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return {
        type: 'network',
        message: 'No internet connection detected.',
        actionableHint: 'Please check your network connection and try again.'
      };
    }

    const { hostname } = getSupabaseDiagnostics();
    return {
      type: 'network',
      message: `Failed to connect to Supabase server (${hostname}).`,
      actionableHint:
        'The browser could not reach your Supabase endpoint. Please verify: 1) The Supabase project is active (not paused), 2) VITE_SUPABASE_URL matches your project URL (https://xxxx.supabase.co), and 3) No ad-blocker or firewall is blocking supabase.co requests.'
    };
  }

  // Invalid email or password
  if (
    lowerMessage.includes('invalid login credentials') ||
    lowerMessage.includes('invalid grant') ||
    lowerMessage.includes('wrong password') ||
    lowerMessage.includes('invalid email or password') ||
    status === 400
  ) {
    return {
      type: 'credentials',
      message: 'Invalid email or password.',
      actionableHint: 'Please check your email address and password, or use the "Forgot password?" option to reset it.'
    };
  }

  // Email confirmation required
  if (lowerMessage.includes('email not confirmed') || lowerMessage.includes('confirm your email')) {
    return {
      type: 'unconfirmed',
      message: 'Email address is not yet confirmed.',
      actionableHint:
        'Check your inbox for the Supabase confirmation link, or disable "Confirm email" under Authentication > Providers > Email in your Supabase dashboard.'
    };
  }

  // Rate limiting / Too many attempts
  if (status === 429 || lowerMessage.includes('too many requests') || lowerMessage.includes('rate limit')) {
    return {
      type: 'rate_limit',
      message: 'Too many login attempts.',
      actionableHint: 'Please wait a few moments before trying to log in again.'
    };
  }

  // Generic/Other
  return {
    type: 'unknown',
    message: rawMessage || 'Authentication failed. Please verify your credentials and try again.'
  };
}

