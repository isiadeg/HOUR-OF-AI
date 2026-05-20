import React, { useState } from 'react';
import { LayoutDashboard, Users, BookOpen, GraduationCap, Bell, AlertTriangle, Heart, HelpCircle, User, Menu, X, ChevronDown, LogOut, Code, Shield, Video, MessageSquare, Clock } from 'lucide-react';
import { ParentPage, ParentPageId, UserMode } from './ParentDashboardPages';

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

type NavItem = {
  id: ParentPageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  group?: string;
};
const NAV_ITEMS_PARENT: NavItem[] = [{
  id: 'overview',
  label: 'Overview',
  icon: LayoutDashboard
}, {
  id: 'learners',
  label: 'My Learners',
  icon: Users
}, {
  id: 'classes',
  label: 'Classes',
  icon: BookOpen,
  badge: '3'
}, {
  id: 'programmes',
  label: 'Programmes',
  icon: GraduationCap
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: Bell,
  badge: '3'
}, {
  id: 'messages',
  label: 'Class Messages',
  icon: MessageSquare,
  badge: '2'
}, {
  id: 'reminders',
  label: 'Reminders',
  icon: Clock
}, {
  id: 'announcements',
  label: 'Announcements',
  icon: Bell,
  badge: '2'
}, {
  id: 'absence',
  label: 'Report Absence',
  icon: AlertTriangle
}, {
  id: 'sponsorship',
  label: 'Street2School',
  icon: Heart
}, {
  id: 'support',
  label: 'Support',
  icon: HelpCircle
}, {
  id: 'profile',
  label: 'Profile',
  icon: User
}];
const NAV_ITEMS_HUB: NavItem[] = [{
  id: 'overview',
  label: 'Overview',
  icon: LayoutDashboard
}, {
  id: 'learners',
  label: 'Hub Learners',
  icon: Users,
  badge: '18'
}, {
  id: 'classes',
  label: 'Classes',
  icon: BookOpen,
  badge: '3'
}, {
  id: 'programmes',
  label: 'Programmes',
  icon: GraduationCap
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: Bell,
  badge: '3'
}, {
  id: 'messages',
  label: 'Class Messages',
  icon: MessageSquare,
  badge: '2'
}, {
  id: 'reminders',
  label: 'Reminders',
  icon: Clock
}, {
  id: 'announcements',
  label: 'Announcements',
  icon: Bell,
  badge: '2'
}, {
  id: 'absence',
  label: 'Report Absence',
  icon: AlertTriangle
}, {
  id: 'sponsorship',
  label: 'Street2School',
  icon: Heart
}, {
  id: 'support',
  label: 'Support',
  icon: HelpCircle
}, {
  id: 'profile',
  label: 'Hub Profile',
  icon: User
}];
const PAGE_TITLES: Record<ParentPageId, string> = {
  overview: 'Overview',
  learners: 'My Learners',
  classes: 'Classes',
  programmes: 'Programmes',
  announcements: 'Announcements',
  absence: 'Report Absence',
  sponsorship: 'Street2School',
  support: 'Support',
  profile: 'Profile',
  notifications: 'Notifications',
  messages: 'Class Messages',
  reminders: 'Reminders'
};
const NOTIFS = [{
  id: 'n1',
  msg: 'Your next class is this Saturday at 10:00 AM',
  time: '2h ago',
  dot: 'bg-[#0B6B3A]'
}, {
  id: 'n2',
  msg: 'New announcement: July schedule update',
  time: '1d ago',
  dot: 'bg-blue-400'
}, {
  id: 'n3',
  msg: 'Sponsored child report now available',
  time: '3d ago',
  dot: 'bg-purple-400'
}];

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

const ParentSidebar = ({
  activePage,
  onNavigate,
  collapsed,
  mode
}: {
  activePage: ParentPageId;
  onNavigate: (p: ParentPageId) => void;
  collapsed: boolean;
  mode: UserMode;
}) => {
  const navItems = mode === 'hub' ? NAV_ITEMS_HUB : NAV_ITEMS_PARENT;
  return <aside className={`h-full flex flex-col bg-[#061a0f] transition-all duration-300 ${collapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shadow-md shrink-0">
          <Code size={17} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white leading-none truncate">Nurture Roots</p>
          <p className="text-[10px] text-[#6dd49a] font-semibold leading-none mt-0.5">Hour of AI</p>
        </div>
      </div>

      {/* Mode toggle pill */}
      <div className="mx-3 mt-3 mb-1">
        <div className="bg-white/8 border border-white/10 rounded-xl p-1 flex gap-1">
          <button onClick={() => {}} className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${mode === 'parent' ? 'bg-[#0B6B3A] text-white' : 'text-white/40 hover:text-white/70'}`}>
            Parent
          </button>
          <button onClick={() => {}} className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold transition-colors ${mode === 'hub' ? 'bg-[#0B6B3A] text-white' : 'text-white/40 hover:text-white/70'}`}>
            Hub Admin
          </button>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map(item => {
        const Icon = item.icon;
        const active = activePage === item.id;
        return <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group
                ${active ? 'bg-[#0B6B3A] text-white shadow-md' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
              <Icon size={16} className={`shrink-0 ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
              <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
              {item.badge && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${active ? 'bg-white/20 text-white' : 'bg-white/15 text-white/70'}`}>
                  {item.badge}
                </span>}
            </button>;
      })}
      </nav>

      {/* User card */}
      <div className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-[#0B6B3A]/40 to-[#22a860]/20 border border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-lg shrink-0">
            {mode === 'parent' ? '👩🏽' : '🏫'}
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">{mode === 'parent' ? 'Fatima Hassan' : 'Bright Stars Hub'}</p>
            <p className="text-white/50 text-[10px] truncate">{mode === 'parent' ? 'Parent · Nigeria' : 'Hub Admin · Ghana'}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-[#6dd49a] font-semibold">
          <Shield size={9} />
          <span>Verified {mode === 'parent' ? 'Parent' : 'Hub'}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3 shrink-0">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all">
          <LogOut size={15} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>;
};

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

const ParentTopBar = ({
  activePage,
  onMenuToggle,
  sidebarOpen,
  onAbsence,
  mode
}: {
  activePage: ParentPageId;
  onMenuToggle: () => void;
  sidebarOpen: boolean;
  onAbsence: () => void;
  mode: UserMode;
}) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFS.length;
  return <header className="h-16 bg-white border-b border-[#e6f4ed] flex items-center px-4 sm:px-6 gap-3 shrink-0 z-30">
      <button onClick={onMenuToggle} className="p-2 rounded-xl text-gray-500 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label="Toggle sidebar">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <h1 className="text-base font-black text-gray-900 hidden sm:block shrink-0">{PAGE_TITLES[activePage]}</h1>

      <div className="flex items-center gap-2 ml-auto">
        {/* Next class quick join */}
        <a href="https://teams.microsoft.com/join/abc123" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors shadow-sm">
          <Video size={13} />
          <span>Join Next Class</span>
        </a>

        {/* Report absence CTA */}
        <button onClick={onAbsence} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-colors">
          <AlertTriangle size={13} />
          <span>Report Absence</span>
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
                {NOTIFS.map(n => <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#fafcfa] transition-colors">
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

        {/* Avatar */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-[#e6f4ed] transition-colors">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-base">
            {mode === 'parent' ? '👩🏽' : '🏫'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-none">{mode === 'parent' ? 'Fatima H.' : 'Bright Stars'}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{mode === 'parent' ? 'Parent' : 'Hub Admin'}</p>
          </div>
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>;
};

// ─── MAIN PARENT DASHBOARD ────────────────────────────────────────────────────

export const ParentDashboard = () => {
  const [activePage, setActivePage] = useState<ParentPageId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mode, setMode] = useState<UserMode>('parent');
  const handleNavigate = (page: ParentPageId) => {
    setActivePage(page);
    setMobileSidebarOpen(false);
  };
  const handleAbsence = () => {
    setActivePage('absence');
    setMobileSidebarOpen(false);
  };
  return <div className="w-full h-screen flex overflow-hidden bg-[#f4faf7] font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0 transition-all duration-300" style={{
      width: sidebarOpen ? '256px' : '0'
    }}>
        <ParentSidebar activePage={activePage} onNavigate={page => {
        handleNavigate(page);
      }} collapsed={!sidebarOpen} mode={mode} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <ParentSidebar activePage={activePage} onNavigate={handleNavigate} collapsed={false} mode={mode} />
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
        </div>}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <ParentTopBar activePage={activePage} onMenuToggle={() => {
        setSidebarOpen(v => !v);
        setMobileSidebarOpen(v => !v);
      }} sidebarOpen={sidebarOpen || mobileSidebarOpen} onAbsence={handleAbsence} mode={mode} />

        {/* Mode switcher banner */}
        <div className="bg-white border-b border-[#e6f4ed] px-4 sm:px-6 py-2.5 flex items-center gap-3 shrink-0">
          <span className="text-xs text-gray-500 font-medium">Viewing as:</span>
          <div className="flex bg-[#f0f9f4] border border-[#d1e8db] rounded-lg p-0.5 gap-0.5">
            <button onClick={() => setMode('parent')} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${mode === 'parent' ? 'bg-[#0B6B3A] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              👩🏽 Parent
            </button>
            <button onClick={() => setMode('hub')} className={`px-3 py-1 rounded-md text-xs font-bold transition-colors ${mode === 'hub' ? 'bg-[#0B6B3A] text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              🏫 Hub Admin
            </button>
          </div>
          <span className="text-[11px] text-gray-400 hidden sm:block">
            Switch to preview different dashboard views
          </span>
        </div>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 pt-6 pb-10">
          <ParentPage page={activePage} onNavigate={handleNavigate} mode={mode} />
        </main>
      </div>
    </div>;
};