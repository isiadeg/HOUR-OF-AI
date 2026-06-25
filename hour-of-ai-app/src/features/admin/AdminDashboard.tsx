import React, { useState } from 'react';
import { LayoutDashboard, Users, UserCheck, BookOpen, GraduationCap, CalendarDays, MessageSquare, Heart, BarChart3, Settings, Menu, X, Bell, Search, Plus, ChevronDown, LogOut, Shield, Zap, Code } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminPage, AdminPageId } from './AdminDashboardPages';

// ─── TYPES & CONSTANTS ────────────────────────────────────────────────────────

type NavItem = {
  id: AdminPageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: 'count' | 'alert';
};
const NAV_ITEMS: NavItem[] = [{
  id: 'overview',
  label: 'Dashboard Overview',
  icon: LayoutDashboard
}, {
  id: 'students',
  label: 'Students & Hubs',
  icon: Users,
  badge: '3',
  badgeType: 'alert'
}, {
  id: 'volunteers',
  label: 'Volunteers',
  icon: UserCheck,
  badge: '5',
  badgeType: 'count'
}, {
  id: 'classes',
  label: 'Class Management',
  icon: BookOpen,
  badge: '!',
  badgeType: 'alert'
}, {
  id: 'programmes',
  label: 'Programme Management',
  icon: GraduationCap
}, {
  id: 'events',
  label: 'Events',
  icon: CalendarDays
}, {
  id: 'communications',
  label: 'Communications',
  icon: MessageSquare
}, {
  id: 'sponsorship',
  label: 'Sponsorship',
  icon: Heart
}, {
  id: 'reports',
  label: 'Reports & Impact',
  icon: BarChart3
}, {
  id: 'settings',
  label: 'Settings',
  icon: Settings
}];
const PAGE_TITLES: Record<AdminPageId, string> = {
  overview: 'Dashboard Overview',
  students: 'Students & Hubs',
  volunteers: 'Volunteers',
  classes: 'Class Management',
  programmes: 'Programme Management',
  events: 'Events',
  communications: 'Communications',
  sponsorship: 'Sponsorship',
  reports: 'Reports & Impact',
  settings: 'Settings'
};
const ADMIN_NOTIFICATIONS = [{
  id: 'an1',
  msg: '3 new student registrations pending review',
  time: '10m ago',
  dot: 'bg-amber-400'
}, {
  id: 'an2',
  msg: 'Class "Juniors AI Group C" has no backup volunteer',
  time: '1h ago',
  dot: 'bg-red-400'
}, {
  id: 'an3',
  msg: '2 volunteer absence requests awaiting approval',
  time: '3h ago',
  dot: 'bg-blue-400'
}, {
  id: 'an4',
  msg: 'Monthly impact report ready for download',
  time: '1d ago',
  dot: 'bg-[#0B6B3A]'
}];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

const AdminSidebar = ({
  activePage,
  onNavigate,
  collapsed
}: {
  activePage: AdminPageId;
  onNavigate: (p: AdminPageId) => void;
  collapsed: boolean;
}) => {
  return <aside className={`h-full flex flex-col bg-[#061a0f] transition-all duration-300 ${collapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shadow-md shrink-0">
          <Code size={17} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white leading-none truncate">Nurture Roots</p>
          <p className="text-[10px] text-[#6dd49a] font-semibold leading-none mt-0.5">Admin Console</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const active = activePage === item.id;
        return <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group
                ${active ? 'bg-[#0B6B3A] text-white shadow-md' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
              <Icon size={16} className={`shrink-0 ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
              <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
              {item.badge && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                  ${item.badgeType === 'alert' ? 'bg-red-500 text-white' : active ? 'bg-white/20 text-white' : 'bg-white/15 text-white/70'}`}>
                  {item.badge}
                </span>}
            </button>;
      })}
      </nav>

      {/* Admin card */}
      <div className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-[#0B6B3A]/40 to-[#22a860]/20 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-lg shrink-0">
            👨🏽‍💼
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">David Mensah</p>
            <p className="text-white/50 text-[10px] truncate">Super Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#6dd49a] font-semibold">
          <Shield size={9} />
          <span>Full Access</span>
          <span className="ml-auto flex items-center gap-1 text-white/40"><Zap size={9} /> 12 actions today</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3 shrink-0 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all">
          <LogOut size={15} /><span>Sign Out</span>
        </button>
      </div>
    </aside>;
};

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

const AdminTopBar = ({
  activePage,
  onMenuToggle,
  sidebarOpen,
  onCreateClass
}: {
  activePage: AdminPageId;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  onCreateClass: () => void;
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const unread = ADMIN_NOTIFICATIONS.length;
  return <header className="h-16 bg-white border-b border-[#e6f4ed] flex items-center px-4 sm:px-6 gap-3 shrink-0 z-30">
      <button onClick={onMenuToggle} className="p-2 rounded-xl text-gray-500 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label="Toggle sidebar">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <h1 className="text-base font-black text-gray-900 hidden sm:block shrink-0">{PAGE_TITLES[activePage]}</h1>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs ml-2 bg-[#f0f9f4] border border-[#d1e8db] rounded-xl px-3 py-2">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search students, volunteers, classes…" className="text-xs text-gray-700 bg-transparent outline-none w-full placeholder-gray-400" />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Create class CTA */}
        <button onClick={onCreateClass} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors shadow-sm">
          <Plus size={13} /><span>Create Class</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotifOpen(v => !v)} className="relative p-2 rounded-xl text-gray-500 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label={`${unread} notifications`}>
            <Bell size={18} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />}
          </button>
          {notifOpen && <div className="absolute right-0 top-12 w-80 bg-white border border-[#d1e8db] rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e6f4ed] flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">Notifications</p>
                <span className="text-xs text-red-500 font-semibold">{unread} new</span>
              </div>
              <div className="divide-y divide-[#f0f4f2]">
                {ADMIN_NOTIFICATIONS.map(n => <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#fafcfa] transition-colors">
                    <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-700 leading-snug">{n.msg}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>)}
              </div>
              <button onClick={() => setNotifOpen(false)} className="w-full py-3 text-xs font-bold text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors border-t border-[#e6f4ed]">
                Mark all as read
              </button>
            </div>}
        </div>

        {/* Admin avatar */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-[#e6f4ed] transition-colors">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-base">
            👨🏽‍💼
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-none">David M.</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Super Admin</p>
          </div>
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>;
};

// ─── MAIN ADMIN DASHBOARD ─────────────────────────────────────────────────────

export const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routePage = location.pathname.split('/')[2] || 'overview';
  const activePage = (PAGE_TITLES[routePage as AdminPageId] ? routePage : 'overview') as AdminPageId;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const handleNavigate = (page: AdminPageId) => {
    navigate(page === 'overview' ? '/admin' : `/admin/${page}`);
    setMobileSidebarOpen(false);
  };
  const handleCreateClass = () => {
    navigate('/admin/classes/create');
    setMobileSidebarOpen(false);
  };
  return <div className="w-full h-screen flex overflow-hidden bg-[#f4faf7] font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0 transition-all duration-300" style={{
      width: sidebarOpen ? '256px' : '0'
    }}>
        <AdminSidebar activePage={activePage} onNavigate={handleNavigate} collapsed={!sidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <AdminSidebar activePage={activePage} onNavigate={handleNavigate} collapsed={false} />
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
        </div>}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AdminTopBar activePage={activePage} onMenuToggle={() => {
        setSidebarOpen(v => !v);
        setMobileSidebarOpen(v => !v);
      }} sidebarOpen={sidebarOpen || mobileSidebarOpen} onCreateClass={handleCreateClass} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-10">
          <AdminPage page={activePage} onNavigate={handleNavigate} />
        </main>
      </div>
    </div>;
};
