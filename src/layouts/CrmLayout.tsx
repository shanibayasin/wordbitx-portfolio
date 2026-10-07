import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../router/Router.js';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/apiClient.js';
import { useToast } from '../components/common/Toast.js';
import {
  LayoutDashboard,
  Users,
  Kanban,
  DollarSign,
  UserCheck,
  Building2,
  CheckSquare,
  PhoneCall,
  Activity,
  BarChart3,
  UserPlus,
  Zap,
  Cpu,
  Settings,
  Search,
  Bell,
  LogOut,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  ShieldAlert,
  Check,
  Plus,
} from 'lucide-react';
import { GlobalSearch } from '../components/common/GlobalSearch.js';
import { NotificationsDrawer } from '../components/common/NotificationsDrawer.js';
import { TenantTesterModal } from '../components/common/TenantTesterModal.js';
import { Avatar } from '../components/common/Avatar.js';

interface CrmLayoutProps {
  children: React.ReactNode;
  title?: string;
  onAddLeadClick?: () => void;
}

export const CrmLayout: React.FC<CrmLayoutProps> = ({ children, onAddLeadClick }) => {
  const { path, navigate } = useRouter();
  const { user, organization, logout, isSuperAdmin, switchWorkspace } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const [testerOpen, setTesterOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  // Workspace Switcher Dropdown State
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [workspaceSearch, setWorkspaceSearch] = useState('');
  const workspaceDropdownRef = useRef<HTMLDivElement>(null);

  const defaultWorkspaces = [
    { id: '6ac2a411ceac76195538b01f', name: 'WordbitX Technologies (ABC Tech)', plan: 'PROFESSIONAL', industry: 'Software & Technology', color: '#5046e5', badge: 'Default Public Lead Org' },
    { id: 'org_abc', name: 'ABC Technologies', plan: 'PROFESSIONAL', industry: 'Software & Technology', color: '#5046e5' },
    { id: 'org_nova', name: 'Nova Tech', plan: 'STARTER', industry: 'Technology & AI', color: '#0ea5e9' },
    { id: 'org_prime', name: 'Prime Estates', plan: 'PROFESSIONAL', industry: 'Real Estate & Brokerage', color: '#14b8a6' },
    { id: 'org_bright', name: 'Bright Dental', plan: 'STARTER', industry: 'Healthcare & Dental', color: '#10b981' },
    { id: 'org_techvision', name: 'Tech Vision', plan: 'PROFESSIONAL', industry: 'Cloud & IT Services', color: '#6366f1' },
    { id: 'org_glow', name: 'Glow Clinic', plan: 'STARTER', industry: 'Aesthetic Dermatology', color: '#f43f5e' },
    { id: 'org_solarpro', name: 'SolarPro', plan: 'PROFESSIONAL', industry: 'Renewable Energy', color: '#f59e0b' },
    { id: 'org_urban', name: 'Urban Homes', plan: 'ENTERPRISE', industry: 'Architecture & Construction', color: '#8b5cf6' },
    { id: 'org_apex', name: 'Apex Dynamics', plan: 'STARTER', industry: 'Manufacturing & Logistics', color: '#64748b' },
  ];

  // Fetch all workspaces for switcher
  useEffect(() => {
    const loadWorkspaces = async () => {
      try {
        const res = await api.getWorkspaces();
        if (res && res.length > 0) {
          setWorkspaces(res);
        } else {
          setWorkspaces(defaultWorkspaces);
        }
      } catch (err) {
        setWorkspaces(defaultWorkspaces);
      }
    };
    loadWorkspaces();
  }, [organization?.id]);

  // Click outside listener to close workspace dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workspaceDropdownRef.current && !workspaceDropdownRef.current.contains(e.target as Node)) {
        setWorkspaceDropdownOpen(false);
      }
    };
    if (workspaceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [workspaceDropdownOpen]);

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectWorkspace = async (ws: any) => {
    try {
      await switchWorkspace(ws.id);
      toast(`Switched to ${ws.name} workspace`, 'success');
      setWorkspaceDropdownOpen(false);
      navigate('/app/dashboard');
    } catch (err: any) {
      toast(err.message || 'Failed to switch workspace', 'error');
    }
  };

  const navItems = [
    { label: 'Overview', path: '/app/dashboard', icon: LayoutDashboard, section: 'OVERVIEW' },
    { label: 'Leads', path: '/app/leads', icon: Users, section: 'SALES' },
    { label: 'Pipeline', path: '/app/pipeline', icon: Kanban, section: 'SALES' },
    { label: 'Deals', path: '/app/deals', icon: DollarSign, section: 'SALES' },
    { label: 'Customers', path: '/app/customers', icon: UserCheck, section: 'CUSTOMERS' },
    { label: 'Companies', path: '/app/companies', icon: Building2, section: 'CUSTOMERS' },
    { label: 'Tasks', path: '/app/tasks', icon: CheckSquare, section: 'ACTIVITY' },
    { label: 'Calls', path: '/app/calls', icon: PhoneCall, section: 'ACTIVITY' },
    { label: 'Activities', path: '/app/activities', icon: Activity, section: 'ACTIVITY' },
    { label: 'Reports', path: '/app/reports', icon: BarChart3, section: 'ANALYTICS' },
    { label: 'Team Members', path: '/app/team', icon: UserPlus, section: 'TEAM' },
    { label: 'Workflows', path: '/app/workflows', icon: Zap, section: 'AUTOMATION' },
    { label: 'Integrations', path: '/app/integrations', icon: Cpu, section: 'INTEGRATIONS' },
    { label: 'Settings', path: '/app/settings/organization', icon: Settings, section: 'SETTINGS' },
  ];

  const sections = ['OVERVIEW', 'SALES', 'CUSTOMERS', 'ACTIVITY', 'ANALYTICS', 'TEAM', 'AUTOMATION', 'INTEGRATIONS', 'SETTINGS'];

  const roleMap: Record<string, string> = {
    ORGANIZATION_OWNER: 'Organization Owner',
    ORGANIZATION_ADMIN: 'Organization Admin',
    SALES_MANAGER: 'Sales Manager',
    SALES_AGENT: 'Sales Agent',
    VIEWER: 'Viewer',
    SUPER_ADMIN: 'Super Admin',
  };

  const userName = user?.displayName || user?.name || user?.email?.split('@')[0] || 'CRM User';
  const userRole = (user?.role && roleMap[user.role]) || user?.role || 'Owner';
  const orgName = organization?.name || 'ABC Technologies';

  const displayList = workspaces.length > 0 ? workspaces : defaultWorkspaces;
  const filteredWorkspaces = displayList.filter((ws) =>
    ws.name?.toLowerCase().includes(workspaceSearch.toLowerCase()) ||
    ws.industry?.toLowerCase().includes(workspaceSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col font-sans text-slate-800 antialiased">
      <div className="flex flex-1 flex-col lg:flex-row min-h-0">
        {/* Mobile Backdrop Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-xs transition-opacity duration-200"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Header - Sleek unified top bar for small screens */}
        <header className="lg:hidden bg-[#131226] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-indigo-950/60 sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 -ml-1 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition"
              aria-label="Toggle navigation menu"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div
              onClick={() => navigate('/app/dashboard')}
              className="flex items-center gap-1.5 font-bold text-base cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-[#5046e5] flex items-center justify-center text-xs font-black text-white shadow-xs">
                W
              </div>
              <span>Wordbit<span className="text-indigo-400">X</span></span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Workspace Indicator Pill on Mobile */}
            <button
              onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
              className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-medium text-slate-300 max-w-[110px] truncate"
              title="Current Workspace"
            >
              <span className="truncate">{orgName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setNotifsOpen(true)}
              className="relative p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#5046e5] rounded-full" />
            </button>

            <div
              onClick={() => navigate('/app/settings/organization')}
              className="cursor-pointer ml-0.5"
            >
              <Avatar src={user?.avatar} name={userName} size="sm" />
            </div>
          </div>
        </header>

        {/* Sidebar - Deep Midnight Violet */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#131226] border-r border-[#1e1c3b] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          } lg:static lg:h-screen lg:shrink-0`}
        >
          <div className="flex flex-col flex-1 overflow-y-auto">
            {/* Logo & Workspace Selector */}
            <div className="p-4 border-b border-[#1e1c3b]">
              <div className="flex items-center justify-between mb-3">
                <div
                  onClick={() => {
                    navigate('/app/dashboard');
                    setSidebarOpen(false);
                  }}
                  className="flex items-center gap-2.5 cursor-pointer font-bold text-lg tracking-tight text-white"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#5046e5] flex items-center justify-center text-white font-black shadow-md shadow-indigo-600/30">
                    W
                  </div>
                  <span>Wordbit<span className="text-indigo-400">X</span></span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Workspace selector dropdown pill */}
              <div className="relative" ref={workspaceDropdownRef}>
                <div
                  onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                  className="px-3 py-2 rounded-lg bg-[#1a1835] border border-indigo-900/30 flex items-center justify-between text-xs text-white cursor-pointer hover:bg-[#201e40] transition select-none"
                  title="Click to switch between all organizations"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {organization?.logo ? (
                      <img src={organization.logo} alt={orgName} className="w-4 h-4 rounded object-cover shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded bg-[#5046e5] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                        {orgName.charAt(0)}
                      </div>
                    )}
                    <span className="font-semibold truncate text-white">{orgName}</span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 transition-transform duration-200 ${
                      workspaceDropdownOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </div>

                {/* Workspace Dropdown Panel Showing ALL Organizations */}
                {workspaceDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 mt-1.5 bg-[#181636] border border-[#2d295b] rounded-xl shadow-2xl z-50 overflow-hidden text-xs text-slate-200 animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2.5 border-b border-[#2d295b] flex items-center justify-between bg-[#12112b]">
                      <span className="font-bold text-white text-xs">Switch Workspace</span>
                      <span className="text-[10px] bg-[#5046e5]/40 text-indigo-300 px-2 py-0.5 rounded-full font-semibold border border-indigo-500/30">
                        {displayList.length} Orgs
                      </span>
                    </div>

                    <div className="p-2 border-b border-[#2d295b] bg-[#14122d]">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
                        <input
                          type="text"
                          value={workspaceSearch}
                          onChange={(e) => setWorkspaceSearch(e.target.value)}
                          placeholder="Search workspaces..."
                          className="w-full pl-8 pr-2.5 py-1.5 bg-[#0e0d1f] border border-[#2d295b] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#5046e5]"
                        />
                      </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto divide-y divide-[#232047] p-1 space-y-0.5">
                      {filteredWorkspaces.map((ws) => {
                        const isCurrent = organization?.id === ws.id || orgName === ws.name;
                        return (
                          <button
                            key={ws.id}
                            type="button"
                            onClick={() => {
                              handleSelectWorkspace(ws);
                              setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition ${
                              isCurrent
                                ? 'bg-[#5046e5]/25 text-white border border-[#5046e5]/50'
                                : 'hover:bg-white/5 text-slate-300 hover:text-white border border-transparent'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] text-white shrink-0 shadow-xs"
                                style={{ backgroundColor: ws.color || '#5046e5' }}
                              >
                                {ws.name.slice(0, 2).toUpperCase()}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold truncate text-white text-xs">{ws.name}</div>
                                <div className="text-[10px] text-slate-400 truncate">
                                  {ws.plan || 'Pro'} • {ws.industry || 'Technology'}
                                </div>
                              </div>
                            </div>
                            {isCurrent && (
                              <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2 border-t border-[#2d295b] bg-[#12112b] space-y-1">
                      <button
                        onClick={() => {
                          setWorkspaceDropdownOpen(false);
                          setSidebarOpen(false);
                          navigate('/onboarding/organization');
                        }}
                        className="w-full py-1.5 px-2.5 rounded-lg bg-[#5046e5] hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-1.5 text-xs transition shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" /> Create Organization
                      </button>
                      <button
                        onClick={() => {
                          setWorkspaceDropdownOpen(false);
                          setSidebarOpen(false);
                          navigate('/app/settings/organization');
                        }}
                        className="w-full py-1 px-2 rounded hover:bg-white/5 text-slate-400 hover:text-white text-[10px] text-center transition block"
                      >
                        Organization Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-3 space-y-3.5 text-xs font-medium">
              {sections.map((sec) => {
                const secItems = navItems.filter((item) => item.section === sec);
                return (
                  <div key={sec}>
                    {sec !== 'OVERVIEW' && (
                      <div className="px-3 pb-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {sec}
                      </div>
                    )}
                    <div className="space-y-0.5">
                      {secItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = path === item.path || (item.path !== '/app/dashboard' && path.startsWith(item.path));
                        return (
                          <button
                            key={item.path}
                            onClick={() => {
                              navigate(item.path);
                              setSidebarOpen(false);
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
                );
              })}
            </nav>
          </div>

          {/* Bottom Panel: Multi-Tenant Test + Profile */}
          <div className="p-3 border-t border-[#1e1c3b] bg-[#0e0d1c] space-y-2">
            <button
              onClick={() => {
                setTesterOpen(true);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 hover:text-white hover:bg-indigo-900/60 text-[11px] transition"
              title="Verify Multi-Tenant Isolation Against Org B"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" /> Test Isolation
              </span>
              <span className="text-[9px] bg-indigo-800 text-indigo-200 px-1 rounded font-semibold">Live</span>
            </button>

            {/* User profile dropdown trigger */}
            <div className="relative">
              <div
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center justify-between p-2 rounded-lg bg-[#16142a] hover:bg-[#1e1b38] cursor-pointer border border-[#232042] transition"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar src={user?.avatar} name={userName} size="sm" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{userName}</div>
                    <div className="text-[10px] text-slate-400 truncate">{userRole}</div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>

              {profileDropdown && (
                <div className="absolute bottom-full left-0 w-full mb-1 bg-[#16142a] border border-[#28254b] rounded-lg shadow-xl p-1 text-xs text-slate-300 space-y-0.5 z-50">
                  <button
                    onClick={() => {
                      navigate('/app/settings/organization');
                      setProfileDropdown(false);
                      setSidebarOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-white/5 hover:text-white flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" /> Settings
                  </button>
                  {isSuperAdmin && (
                    <button
                      onClick={() => {
                        navigate('/super-admin');
                        setProfileDropdown(false);
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded hover:bg-purple-900/40 text-purple-300 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Super Admin
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setSidebarOpen(false);
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

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 lg:h-screen lg:overflow-y-auto">
          {/* Desktop Top Header - Only on lg screens to avoid duplicate headers on mobile */}
          <header className="hidden lg:flex bg-white border-b border-slate-200/90 px-6 py-3 items-center justify-between sticky top-0 z-20">
            <div className="flex-1 max-w-lg flex items-center gap-3">
              <div
                onClick={() => setSearchOpen(true)}
                className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-xs text-slate-400 cursor-pointer hover:border-slate-300 transition"
              >
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search anything... (Ctrl+K)</span>
              </div>
              <div
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer transition select-none"
                title="Switch Workspace"
              >
                {organization?.logo ? (
                  <img src={organization.logo} alt={orgName} className="w-4 h-4 rounded object-cover shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded bg-[#5046e5] text-white flex items-center justify-center font-bold text-[9px] shrink-0">
                    {orgName.charAt(0)}
                  </div>
                )}
                <span className="truncate max-w-[120px]">{orgName}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-3">
              {onAddLeadClick && (
                <button
                  onClick={onAddLeadClick}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5046e5] hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  + Add Lead
                </button>
              )}

              {/* Notification Bell */}
              <button
                onClick={() => setNotifsOpen(true)}
                className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#5046e5] rounded-full" />
              </button>

              {/* User Avatar & Name */}
              <div
                onClick={() => navigate('/app/settings/organization')}
                className="flex items-center gap-2.5 pl-3 border-l border-slate-200 cursor-pointer hover:opacity-90 transition"
              >
                <Avatar src={user?.avatar} name={userName} size="md" />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-semibold text-slate-900 leading-tight">{userName}</div>
                  <div className="text-[10px] text-slate-500">{userRole}</div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </div>
            </div>
          </header>

          {/* Page Content Viewport */}
          <main className="p-3.5 sm:p-5 md:p-6 lg:p-8 flex-1 bg-[#f4f6fa] max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Full-width dark footer bar matching image.png */}
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
            Unified CRM • Telephony Call Center • Intelligent Operations
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap">
          <button onClick={() => navigate('/app/dashboard')} className="hover:text-white transition">CRM</button>
          <span>|</span>
          <button onClick={() => navigate('/app/pipeline')} className="hover:text-white transition">Pipeline</button>
          <span>|</span>
          <button onClick={() => navigate('/app/customers')} className="hover:text-white transition">Customers</button>
          <span>|</span>
          <button onClick={() => navigate('/app/deals')} className="hover:text-white transition">Deals</button>
          <span>|</span>
          <button onClick={() => navigate('/app/tasks')} className="hover:text-white transition">Tasks</button>
          <span>|</span>
          <button onClick={() => navigate('/app/reports')} className="hover:text-white transition">Reports</button>
          <span>|</span>
          <button onClick={() => navigate('/app/team')} className="hover:text-white transition">Team</button>
          <span>|</span>
          <button onClick={() => navigate('/app/integrations')} className="hover:text-white transition">Integrations</button>
        </div>
      </footer>

      {/* Global Modals */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <NotificationsDrawer isOpen={notifsOpen} onClose={() => setNotifsOpen(false)} />
      <TenantTesterModal isOpen={testerOpen} onClose={() => setTesterOpen(false)} />
    </div>
  );
};
