import React, { useState } from 'react';
import { useRouter } from '../router/Router.js';
import { useAuth } from '../context/AuthContext.js';
import {
  LayoutDashboard,
  Building,
  Users,
  Inbox,
  CreditCard,
  Layers,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Search,
  Bell,
  Cpu,
  Activity,
  ArrowLeft,
} from 'lucide-react';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const { path, navigate } = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Overview', path: '/super-admin', icon: LayoutDashboard },
      ],
    },
    {
      title: 'PLATFORM',
      items: [
        { label: 'Organizations', path: '/super-admin/organizations', icon: Building },
        { label: 'Users', path: '/super-admin/users', icon: Users },
        { label: 'Demo Requests', path: '/super-admin/demo-requests', icon: Inbox },
      ],
    },
    {
      title: 'BUSINESS',
      items: [
        { label: 'Subscriptions', path: '/super-admin/subscriptions', icon: CreditCard },
        { label: 'Plans', path: '/super-admin/plans', icon: Layers },
        { label: 'Revenue', path: '/super-admin/revenue', icon: DollarSign },
      ],
    },
    {
      title: 'MONITORING',
      items: [
        { label: 'Platform Analytics', path: '/super-admin/analytics', icon: BarChart3 },
        { label: 'Activity', path: '/super-admin/audit-logs', icon: Activity },
        { label: 'Audit Logs', path: '/super-admin/audit-logs', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings', path: '/super-admin/settings', icon: Settings },
        { label: 'Integrations', path: '/app/integrations', icon: Cpu },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-800 flex flex-col font-sans antialiased">
      <div className="flex flex-1 flex-col lg:flex-row min-h-0">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Top Header */}
        <header className="lg:hidden bg-[#131226] text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30 border-b border-[#1e1c3b] shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 -ml-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div
              onClick={() => navigate('/super-admin')}
              className="flex items-center gap-2 font-bold text-base cursor-pointer"
            >
              <div className="w-6 h-6 rounded bg-[#5046e5] flex items-center justify-center font-bold text-xs text-white">
                W
              </div>
              <span>WordbitX</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#5046e5] text-white">AI Ready</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/app/dashboard')}
              className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-indigo-300 text-[11px] font-medium transition"
            >
              CRM
            </button>
            <img
              src={
                user?.avatar ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              }
              alt="Admin"
              className="w-7 h-7 rounded-full object-cover border border-purple-500/50"
            />
          </div>
        </header>

        {/* Super Admin Sidebar - Deep Navy/Midnight Violet matching image.png */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#131226] border-r border-[#1e1c3b] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          } lg:static lg:h-screen lg:shrink-0`}
        >
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Header Branding */}
            <div className="p-4 border-b border-[#1e1c3b]">
              <div className="flex items-center justify-between">
                <div
                  onClick={() => {
                    navigate('/super-admin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer font-bold text-lg tracking-tight text-white"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#5046e5] flex items-center justify-center font-black text-xs text-white shadow-md shadow-indigo-600/30">
                    W
                  </div>
                  <span>WordbitX</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#5046e5] text-white tracking-wide">
                    AI Ready
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="p-3 space-y-3.5 text-xs font-medium">
              {navSections.map((sec) => (
                <div key={sec.title}>
                  <div className="px-3 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {sec.title}
                  </div>
                  <div className="space-y-0.5">
                    {sec.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = path === item.path || (item.path !== '/super-admin' && path.startsWith(item.path));
                      return (
                        <button
                          key={item.label}
                          onClick={() => {
                            navigate(item.path);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition text-left text-xs ${
                            isActive
                              ? 'bg-[#5046e5] text-white font-medium shadow-xs'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Switcher & Profile */}
          <div className="p-3 border-t border-[#1e1c3b] bg-[#0e0d1c] space-y-2">
            <button
              onClick={() => {
                navigate('/app/dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs transition"
            >
              <span className="flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" /> Switch to CRM
              </span>
              <span className="text-[10px] text-slate-400">Org view</span>
            </button>

            <div className="relative">
              <div
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center justify-between p-2 rounded-lg bg-[#16142a] hover:bg-[#1e1b38] cursor-pointer border border-[#232042] transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={
                      user?.avatar ||
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                    }
                    alt={user?.name || 'Admin'}
                    className="w-7 h-7 rounded-full object-cover border border-purple-500/50 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      Shaniba Yasin / Super Admin
                    </div>
                    <div className="text-[10px] text-purple-300 truncate">Platform Administrator</div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {profileDropdown && (
                <div className="absolute bottom-full left-0 w-full mb-1 bg-[#16142a] border border-[#28254b] rounded-lg shadow-xl p-1 text-xs text-slate-300 space-y-0.5 z-50">
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-rose-950/40 text-rose-400 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Super Admin Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 lg:h-screen lg:overflow-y-auto">
          {/* Top Header - Desktop Only */}
          <header className="hidden lg:flex bg-white border-b border-slate-200/90 px-6 py-3 items-center justify-between sticky top-0 z-20">
            <div className="flex-1 max-w-sm">
              <div className="w-full flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-xs text-slate-400">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search anything...</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition">
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5046e5] rounded-full" />
              </button>
              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <img
                  src={
                    user?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                  }
                  alt="Admin"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">Shaniba Yasin</div>
                  <div className="text-[10px] text-slate-500">Super Admin</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </header>

          <main className="p-3.5 sm:p-5 md:p-6 lg:p-8 flex-1 bg-[#f4f6fa] max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Bottom Footer Banner */}
      <footer className="w-full bg-[#131226] text-white px-6 py-2.5 flex flex-wrap items-center justify-between border-t border-[#1e1c3b] text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
            <div className="w-5 h-5 rounded bg-[#5046e5] flex items-center justify-center text-[10px] font-black text-white">
              W
            </div>
            <span>Wordbit<span className="text-indigo-400">X</span></span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">
            Platform Operations & Multi-Tenant Management Center
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
          <button onClick={() => navigate('/super-admin')} className="hover:text-white transition">Overview</button>
          <span>|</span>
          <button onClick={() => navigate('/super-admin/organizations')} className="hover:text-white transition">Organizations</button>
          <span>|</span>
          <button onClick={() => navigate('/super-admin/users')} className="hover:text-white transition">Users</button>
          <span>|</span>
          <button onClick={() => navigate('/super-admin/demo-requests')} className="hover:text-white transition">Demo Requests</button>
          <span>|</span>
          <button onClick={() => navigate('/super-admin/subscriptions')} className="hover:text-white transition">Subscriptions</button>
          <span>|</span>
          <button onClick={() => navigate('/super-admin/revenue')} className="hover:text-white transition">Revenue</button>
        </div>
      </footer>
    </div>
  );
};
