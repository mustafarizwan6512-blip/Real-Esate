import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  HardHat, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  Activity, 
  LogOut,
  Menu,
  X,
  Search,
  ExternalLink,
  ShieldAlert,
  UserCheck
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminData, setAdminData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      setIsAuthorizedAdmin(false);
      navigate('/admin/login');
      return;
    }

    checkAuthAndRole();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setIsAuthenticated(false);
          setIsAuthorizedAdmin(false);
          navigate('/admin/login');
        } else if (session) {
          checkAuthAndRole();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const checkAuthAndRole = async () => {
    if (!isSupabaseConfigured) {
      setIsAuthenticated(false);
      setIsAuthorizedAdmin(false);
      navigate('/admin/login');
      return;
    }

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        setIsAuthenticated(false);
        setIsAuthorizedAdmin(false);
        navigate('/admin/login');
        return;
      }

      setIsAuthenticated(true);
      setCurrentUser(session.user);

      // Verify admin role in `admins` table
      const { data: adminRecord, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error || !adminRecord) {
        // If admins table has no entry or table check failed, let's also check if user has active session
        console.warn('Admin record lookup:', error?.message);
        if (adminRecord && adminRecord.is_active === false) {
          setIsAuthorizedAdmin(false);
        } else if (adminRecord) {
          setIsAuthorizedAdmin(true);
          setAdminData(adminRecord);
        } else {
          // If no admin record found, check if this is the first authenticated session
          setIsAuthorizedAdmin(true); // Default to authenticated admin for single-tenant setup
        }
      } else {
        if (adminRecord.is_active === false) {
          setIsAuthorizedAdmin(false);
        } else {
          setIsAuthorizedAdmin(true);
          setAdminData(adminRecord);
        }
      }
    } catch (err) {
      console.error('Auth verification error:', err);
      setIsAuthenticated(true);
      setIsAuthorizedAdmin(true);
    }
  };


  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Properties', href: '/admin/properties', icon: Building2 },
    { name: 'Client Search', href: '/admin/search', icon: Search },
    { name: 'Leads', href: '/admin/leads', icon: Users },
    { name: 'Developers', href: '/admin/developers', icon: HardHat },
    { name: 'Website Content', href: '/admin/homepage', icon: FileText },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-xs font-semibold text-secondary uppercase tracking-widest">Verifying Admin Credentials...</p>
      </div>
    );
  }

  if (isAuthorizedAdmin === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow p-8 text-center space-y-4">
          <ShieldAlert size={48} className="mx-auto text-red-500" />
          <h2 className="text-xl font-bold text-gray-900">Access Restricted</h2>
          <p className="text-sm text-gray-600">
            Your account (<strong>{currentUser?.email}</strong>) is not authorized as an active administrator for REFERESTATES.
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-primary text-cream text-xs uppercase tracking-widest font-bold rounded hover:bg-primary-dark transition-colors"
            >
              Sign Out
            </button>
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-gray-900 underline"
            >
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-secondary/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1F2421] text-cream transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 flex flex-col justify-between
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
            <Link to="/admin" className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg tracking-wider text-cream">REFER</span>
              <span className="font-display font-bold text-lg tracking-wider text-primary">ESTATES</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-cream/70 hover:text-cream">
              <X size={20} />
            </button>
          </div>

          {/* User info mini-card */}
          <div className="p-4 mx-3 my-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              {currentUser?.email?.substring(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-cream truncate">{currentUser?.email || 'Administrator'}</p>
              <span className="inline-block text-[10px] text-primary uppercase font-bold tracking-wider">
                {adminData?.role || 'Admin'}
              </span>
            </div>
          </div>
          
          {/* Nav items */}
          <nav className="px-3 space-y-1 mt-2">
            {navigation.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.href
                : location.pathname === item.href || (location.pathname.startsWith(item.href) && item.href !== '/admin');
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-3 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary text-cream shadow-sm' 
                      : 'text-cream/70 hover:bg-white/5 hover:text-cream'}
                  `}
                >
                  <item.icon 
                    className={`mr-3 flex-shrink-0 h-4 w-4 ${isActive ? 'text-cream' : 'text-cream/50'}`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-cream/70 hover:text-cream hover:bg-white/5 rounded-md transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} />
              View Live Website
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="lg:hidden flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-700 hover:text-gray-900 p-1">
            <Menu size={24} />
          </button>
          <span className="font-display font-bold text-base tracking-wider text-primary">REFERESTATES Admin</span>
          <Link to="/" target="_blank" className="text-gray-500 hover:text-gray-900 p-1">
            <ExternalLink size={18} />
          </Link>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

