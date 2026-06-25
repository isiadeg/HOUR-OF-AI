import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Calendar, GraduationCap, BarChart3, MessageSquare, CalendarDays, User, Menu, X, Bell, ChevronDown, ChevronRight, Clock, Code, LogOut, Settings, Zap, Megaphone, AlarmClock, HelpCircle, MessagesSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardPage, PageId } from './VolunteerDashboardPages';

// ─── TYPES & CONSTANTS ────────────────────────────────────────────────────────

type NavItem = {
  id: PageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
};
const NAV_ITEMS: NavItem[] = [{
  id: 'overview',
  label: 'Overview',
  icon: LayoutDashboard
}, {
  id: 'classes',
  label: 'My Classes',
  icon: BookOpen,
  badge: '3'
}, {
  id: 'programmes',
  label: 'Programmes',
  icon: GraduationCap
}, {
  id: 'availability',
  label: 'Availability',
  icon: Calendar
}, {
  id: 'training',
  label: 'Training & Prep',
  icon: GraduationCap,
  badge: '2'
}, {
  id: 'impact',
  label: 'Impact Hours',
  icon: BarChart3,
  badge: '!'
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: Bell,
  badge: '3'
}, {
  id: 'messages',
  label: 'Class Messages',
  icon: MessagesSquare,
  badge: '2'
}, {
  id: 'announcements',
  label: 'Announcements',
  icon: Megaphone,
  badge: '2'
}, {
  id: 'reminders',
  label: 'Reminders',
  icon: AlarmClock
}, {
  id: 'support',
  label: 'Support',
  icon: HelpCircle
}, {
  id: 'queries',
  label: 'Queries & Support',
  icon: MessageSquare
}, {
  id: 'events',
  label: 'Upcoming Events',
  icon: CalendarDays
}, {
  id: 'profile',
  label: 'Profile',
  icon: User
}];
const PAGE_TITLES: Record<PageId, string> = {
  overview: 'Overview',
  classes: 'My Classes',
  programmes: 'Programmes',
  availability: 'Availability',
  training: 'Training & Prep',
  impact: 'Impact Hours',
  notifications: 'Notifications',
  messages: 'Class Messages',
  announcements: 'Announcements',
  reminders: 'Reminders',
  support: 'Support',
  queries: 'Queries & Support',
  events: 'Upcoming Events',
  profile: 'Profile'
};
const WEEKS = ['Week of 7–13 Jul', 'Week of 14–20 Jul', 'Week of 21–27 Jul'];
const NOTIFICATIONS = [{
  id: 'n1',
  msg: '2 unlogged hours from last week',
  time: '2h ago',
  dot: 'bg-amber-400'
}, {
  id: 'n2',
  msg: 'New material: Working with Children Online',
  time: '1d ago',
  dot: 'bg-blue-400'
}, {
  id: 'n3',
  msg: 'Absence request approved for 5 Jul',
  time: '3d ago',
  dot: 'bg-[#0B6B3A]'
}];

// ─── SIDEBAR COMPONENT ────────────────────────────────────────────────────────

const Sidebar = ({
  activePage,
  onNavigate,
  collapsed
}: {
  activePage: PageId;
  onNavigate: (p: PageId) => void;
  collapsed: boolean;
}) => {
  return <aside className={`h-full flex flex-col bg-[#082d1a] transition-all duration-300 ${collapsed ? 'w-0 overflow-hidden' : 'w-64'}`}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10 shrink-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shadow-md shrink-0">
          <Code size={17} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-white leading-none truncate">Nurture Roots</p>
          <p className="text-[10px] text-[#6dd49a] font-medium leading-none mt-0.5">Volunteer Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
        const Icon = item.icon;
        const active = activePage === item.id;
        return <button key={item.id} onClick={() => onNavigate(item.id)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group
                ${active ? 'bg-[#0B6B3A] text-white shadow-md' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
              <Icon size={17} className={`shrink-0 ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`} />
              <span className="text-sm font-medium flex-1 truncate">{item.label}</span>
              {item.badge && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                  ${item.badge === '!' ? 'bg-amber-400 text-white' : active ? 'bg-white/20 text-white' : 'bg-white/15 text-white/70'}`}>
                  {item.badge}
                </span>}
            </button>;
      })}
      </nav>

      {/* Volunteer card */}
      <div className="mx-3 mb-4 p-4 rounded-2xl bg-gradient-to-br from-[#0B6B3A]/40 to-[#22a860]/20 border border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-lg shrink-0">
            👩🏾
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">Aisha Kamara</p>
            <p className="text-white/50 text-[10px] truncate">Lead Volunteer</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span className="flex items-center gap-1"><Clock size={9} /> Next: Sat, 12 Jul</span>
          <span className="flex items-center gap-1 text-[#6dd49a] font-semibold"><Zap size={9} /> 22h total</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3 shrink-0 space-y-0.5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-white hover:bg-white/8 text-sm font-medium transition-all">
          <Settings size={15} /> Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all">
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </aside>;
};

// ─── TOP BAR COMPONENT ────────────────────────────────────────────────────────

const TopBar = ({
  activePage,
  onMenuToggle,
  onNavigate,
  sidebarOpen
}: {
  activePage: PageId;
  onMenuToggle: () => void;
  onNavigate: (page: PageId) => void;
  sidebarOpen: boolean;
}) => {
  const [weekIndex, setWeekIndex] = useState(0);
  const [notifOpen, setNotifOpen] = useState(false);
  const unread = NOTIFICATIONS.length;
  return <header className="h-16 bg-white border-b border-[#e6f4ed] flex items-center px-4 sm:px-6 gap-4 shrink-0 z-30">
      {/* Mobile hamburger */}
      <button onClick={onMenuToggle} className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label="Toggle sidebar">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Desktop collapse toggle */}
      <button onClick={onMenuToggle} className="hidden lg:flex p-2 rounded-xl text-gray-400 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label="Toggle sidebar">
        <Menu size={18} />
      </button>

      {/* Page title */}
      <h1 className="text-base font-black text-gray-900 hidden sm:block">{PAGE_TITLES[activePage]}</h1>

      <div className="flex items-center gap-3 ml-auto">
        {/* Week selector */}
        <div className="hidden sm:flex items-center gap-2 bg-[#f0f9f4] rounded-xl px-3 py-2 border border-[#d1e8db]">
          <button onClick={() => setWeekIndex(i => Math.max(0, i - 1))} className="text-[#0B6B3A] hover:text-[#095e32] disabled:opacity-30" disabled={weekIndex === 0}>
            <ChevronRight size={14} className="rotate-180" />
          </button>
          <span className="text-xs font-bold text-[#0B6B3A] whitespace-nowrap">{WEEKS[weekIndex]}</span>
          <button onClick={() => setWeekIndex(i => Math.min(WEEKS.length - 1, i + 1))} className="text-[#0B6B3A] hover:text-[#095e32] disabled:opacity-30" disabled={weekIndex === WEEKS.length - 1}>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Update Availability */}
        <button onClick={() => onNavigate('availability')} className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors shadow-sm">
          <Calendar size={12} /> Update Availability
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotifOpen(v => !v)} className="relative p-2 rounded-xl text-gray-500 hover:bg-[#e6f4ed] hover:text-[#0B6B3A] transition-colors" aria-label={`${unread} notifications`}>
            <Bell size={18} />
            {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full" />}
          </button>
          {notifOpen && <div className="absolute right-0 top-12 w-80 bg-white border border-[#d1e8db] rounded-2xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#e6f4ed] flex items-center justify-between">
                <p className="text-sm font-bold text-gray-900">Notifications</p>
                <span className="text-xs text-[#0B6B3A] font-semibold">{unread} new</span>
              </div>
              <div className="divide-y divide-[#f0f4f2]">
                {NOTIFICATIONS.map(n => <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-[#fafcfa] transition-colors">
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

        {/* Volunteer avatar */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl hover:bg-[#e6f4ed] transition-colors">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-base">
            👩🏾
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-none">Aisha K.</p>
            <p className="text-[10px] text-gray-400 mt-0.5">Lead Volunteer</p>
          </div>
          <ChevronDown size={13} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>;
};

// ─── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────

const MobileBottomNav = ({
  activePage,
  onNavigate
}: {
  activePage: PageId;
  onNavigate: (p: PageId) => void;
}) => {
  const mobileNav: NavItem[] = NAV_ITEMS.slice(0, 5);
  return <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e6f4ed] flex">
      {mobileNav.map(item => {
      const Icon = item.icon;
      const active = activePage === item.id;
      return <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors relative
              ${active ? 'text-[#0B6B3A]' : 'text-gray-400'}`}>
            {item.badge && <span className={`absolute top-2 right-1/2 translate-x-3 text-[9px] font-bold px-1 rounded-full min-w-[14px] text-center
                ${item.badge === '!' ? 'bg-amber-400 text-white' : 'bg-[#0B6B3A] text-white'}`}>
                {item.badge}
              </span>}
            <Icon size={18} />
            <span className="text-[9px] font-semibold truncate max-w-[50px]">{item.label}</span>
            {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-[#0B6B3A] rounded-full" />}
          </button>;
    })}
    </nav>;
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export const VolunteerDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const routeSegments = location.pathname.split('/');
  const routePage = routeSegments[2] || 'overview';
  const classId = routePage === 'classes' ? routeSegments[3] : undefined;
  const activePage = (PAGE_TITLES[routePage as PageId] ? routePage : 'overview') as PageId;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const handleNavigate = (page: PageId) => {
    navigate(page === 'overview' ? '/volunteer' : `/volunteer/${page}`);
    setMobileSidebarOpen(false);
  };
  const handleOpenClass = (classId?: string) => {
    navigate(classId ? `/volunteer/classes/${classId}` : '/volunteer/classes');
    setMobileSidebarOpen(false);
  };
  return <div className="w-full h-screen flex overflow-hidden bg-[#f5fbf7] font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0 transition-all duration-300" style={{
      width: sidebarOpen ? '256px' : '0'
    }}>
        <Sidebar activePage={activePage} onNavigate={handleNavigate} collapsed={!sidebarOpen} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 h-full">
            <Sidebar activePage={activePage} onNavigate={handleNavigate} collapsed={false} />
          </div>
          <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
        </div>}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopBar activePage={activePage} onNavigate={handleNavigate} onMenuToggle={() => {
        setSidebarOpen(v => !v);
        setMobileSidebarOpen(v => !v);
      }} sidebarOpen={sidebarOpen || mobileSidebarOpen} />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-8 px-4 sm:px-6 pt-6">
          <DashboardPage page={activePage} classId={classId} onNavigate={handleNavigate} onOpenClass={handleOpenClass} />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav activePage={activePage} onNavigate={handleNavigate} />
    </div>;
};
