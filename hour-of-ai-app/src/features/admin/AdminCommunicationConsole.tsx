import React, { useState } from 'react';
import { MessageSquare, Bell, Send, Shield, Settings, FileText, Clock, Megaphone, AlertTriangle, CheckCircle, Eye, Edit3, Trash2, Search, Filter, Plus, Download, ChevronRight, X, Lock, Mail, Inbox, Star, Flag, UserCheck, Users, BookOpen, RefreshCw, Check, Pin, Archive, MessageCircle, Phone, Info, AlertCircle, MoreHorizontal, Activity, Zap, Globe } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type CommSubPageId = 'overview' | 'announcements' | 'threads' | 'support' | 'reminders' | 'safeguarding' | 'notif-settings' | 'logs';
type BadgeVariant = 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'purple';
type AnnouncementRecord = {
  id: string;
  title: string;
  type: string;
  audience: string;
  channel: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
  readRate: string;
  createdBy: string;
  dateSent: string;
  priority: 'Normal' | 'Important' | 'Urgent';
};
type ThreadRecord = {
  id: string;
  className: string;
  programme: string;
  volunteers: string;
  contacts: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  status: 'Active' | 'Muted' | 'Locked';
};
type SupportMessage = {
  id: string;
  sender: string;
  userType: 'Parent' | 'Volunteer' | 'Hub' | 'Sponsor';
  category: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  lastUpdated: string;
};
type ReminderRecord = {
  id: string;
  name: string;
  audience: string;
  trigger: string;
  timing: string;
  channel: string;
  active: boolean;
  lastSent: string;
  successRate: string;
};
type SafeguardingAlert = {
  id: string;
  alertId: string;
  source: string;
  reportedBy: string;
  relatedClass: string;
  severity: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'New' | 'Under Review' | 'Resolved';
  assignedOfficer: string;
};
type LogRecord = {
  id: string;
  datetime: string;
  action: string;
  actionType: 'announcement' | 'reminder' | 'moderation' | 'safeguarding' | 'thread';
  userAdmin: string;
  audience: string;
  channel: string;
  status: 'Delivered' | 'Pending' | 'Failed';
  related: string;
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const COMM_NAV_ITEMS: {
  id: CommSubPageId;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: 'count' | 'alert';
}[] = [{
  id: 'overview',
  label: 'Communication Overview',
  icon: Activity
}, {
  id: 'announcements',
  label: 'Announcements',
  icon: Megaphone,
  badge: '2',
  badgeType: 'count'
}, {
  id: 'threads',
  label: 'Class Threads',
  icon: MessageSquare,
  badge: '5',
  badgeType: 'count'
}, {
  id: 'support',
  label: 'Direct Support Messages',
  icon: Inbox,
  badge: '3',
  badgeType: 'alert'
}, {
  id: 'reminders',
  label: 'Reminders',
  icon: Clock
}, {
  id: 'safeguarding',
  label: 'Safeguarding Alerts',
  icon: Shield,
  badge: '!',
  badgeType: 'alert'
}, {
  id: 'notif-settings',
  label: 'Notification Settings',
  icon: Settings
}, {
  id: 'logs',
  label: 'Communication Logs',
  icon: FileText
}];
const ANNOUNCEMENTS_DATA: AnnouncementRecord[] = [{
  id: 'a1',
  title: 'New safeguarding module now live',
  type: 'Programme Update',
  audience: 'All Volunteers',
  channel: 'Email + In-app',
  status: 'Sent',
  readRate: '87%',
  createdBy: 'David Mensah',
  dateSent: '2 days ago',
  priority: 'Important'
}, {
  id: 'a2',
  title: 'July class schedule updates',
  type: 'Class Update',
  audience: 'All Users',
  channel: 'In-app',
  status: 'Sent',
  readRate: '72%',
  createdBy: 'David Mensah',
  dateSent: '5 days ago',
  priority: 'Normal'
}, {
  id: 'a3',
  title: 'Welcome to new hubs in Uganda',
  type: 'General Update',
  audience: 'Hub Admins',
  channel: 'Email + In-app',
  status: 'Scheduled',
  readRate: '—',
  createdBy: 'Amara Diallo',
  dateSent: 'Scheduled: 20 Jul',
  priority: 'Normal'
}, {
  id: 'a4',
  title: 'Hour of AI – Term 3 registration open',
  type: 'Programme Update',
  audience: 'Parents',
  channel: 'Email',
  status: 'Draft',
  readRate: '—',
  createdBy: 'Sarah Okafor',
  dateSent: '—',
  priority: 'Normal'
}, {
  id: 'a5',
  title: 'URGENT: Platform maintenance this weekend',
  type: 'Urgent Notice',
  audience: 'All Users',
  channel: 'Email + In-app',
  status: 'Sent',
  readRate: '94%',
  createdBy: 'David Mensah',
  dateSent: '1 week ago',
  priority: 'Urgent'
}];
const THREADS_DATA: ThreadRecord[] = [{
  id: 't1',
  className: 'Juniors AI Group A',
  programme: 'Hour of AI',
  volunteers: 'Aisha Kamara',
  contacts: 'Fatima Hassan, Bright Stars (Hub)',
  lastMessage: 'See you Saturday at 10 AM GMT!',
  lastTime: '2h ago',
  unread: 3,
  status: 'Active'
}, {
  id: 't2',
  className: 'Digital Skills – Nairobi',
  programme: 'Digital Skills',
  volunteers: 'James Mwangi',
  contacts: 'Nairobi Community Hub',
  lastMessage: 'Materials have been uploaded for this week.',
  lastTime: '5h ago',
  unread: 0,
  status: 'Active'
}, {
  id: 't3',
  className: 'Juniors AI Group C',
  programme: 'Hour of AI',
  volunteers: 'Sarah Okafor',
  contacts: 'Emmanuel Osei, Amara Diallo',
  lastMessage: 'Class postponed – backup volunteer being arranged.',
  lastTime: '1d ago',
  unread: 7,
  status: 'Active'
}, {
  id: 't4',
  className: 'Maths Literacy B',
  programme: 'Basic Maths',
  volunteers: 'Kofi Mensah',
  contacts: 'Kampala Kids Hub',
  lastMessage: 'Admin: Thread locked for scheduled review.',
  lastTime: '3d ago',
  unread: 0,
  status: 'Locked'
}, {
  id: 't5',
  className: 'Code Club Junior',
  programme: 'Code Club',
  volunteers: 'Tom Ashford',
  contacts: 'Lagos Parent Group',
  lastMessage: 'Reminder: Session starts in 24 hours.',
  lastTime: '6h ago',
  unread: 1,
  status: 'Active'
}];
const SUPPORT_MESSAGES: SupportMessage[] = [{
  id: 'sm1',
  sender: 'Fatima Hassan',
  userType: 'Parent',
  category: 'Parent Support',
  subject: 'Unable to access class link this week',
  status: 'Open',
  priority: 'High',
  lastUpdated: '1h ago'
}, {
  id: 'sm2',
  sender: 'Bright Stars Academy',
  userType: 'Hub',
  category: 'Hub Support',
  subject: 'Request to add second learner group',
  status: 'In Progress',
  priority: 'Medium',
  lastUpdated: '3h ago'
}, {
  id: 'sm3',
  sender: 'Tom Ashford',
  userType: 'Volunteer',
  category: 'Volunteer Support',
  subject: 'Cannot log hours for June',
  status: 'Open',
  priority: 'Medium',
  lastUpdated: '6h ago'
}, {
  id: 'sm4',
  sender: 'Emmanuel Osei',
  userType: 'Parent',
  category: 'Safeguarding Concerns',
  subject: 'Concern about class communication',
  status: 'Open',
  priority: 'Urgent',
  lastUpdated: '30m ago'
}, {
  id: 'sm5',
  sender: 'TechForAll UK',
  userType: 'Sponsor',
  category: 'Sponsorship Enquiries',
  subject: 'Quarterly impact report request',
  status: 'Resolved',
  priority: 'Low',
  lastUpdated: '2d ago'
}];
const REMINDERS_DATA: ReminderRecord[] = [{
  id: 'r1',
  name: 'Session Reminder – Volunteers (24h)',
  audience: 'Volunteers',
  trigger: '24h before class',
  timing: '24 hours before',
  channel: 'Email + In-app',
  active: true,
  lastSent: '2 days ago',
  successRate: '98%'
}, {
  id: 'r2',
  name: 'Session Reminder – Volunteers (1h)',
  audience: 'Volunteers',
  trigger: '1h before class',
  timing: '1 hour before',
  channel: 'In-app',
  active: true,
  lastSent: '2 days ago',
  successRate: '96%'
}, {
  id: 'r3',
  name: 'Session Reminder – Parents/Hubs (24h)',
  audience: 'Parents & Hubs',
  trigger: '24h before class',
  timing: '24 hours before',
  channel: 'Email + In-app',
  active: true,
  lastSent: '2 days ago',
  successRate: '91%'
}, {
  id: 'r4',
  name: 'Weekly Hours Log Reminder',
  audience: 'Volunteers',
  trigger: 'Every Monday 9 AM',
  timing: 'Weekly recurring',
  channel: 'Email',
  active: true,
  lastSent: '5 days ago',
  successRate: '84%'
}, {
  id: 'r5',
  name: 'Training Completion Reminder',
  audience: 'New Volunteers',
  trigger: '7 days after joining',
  timing: '7 days post-registration',
  channel: 'Email + In-app',
  active: true,
  lastSent: '1 week ago',
  successRate: '79%'
}, {
  id: 'r6',
  name: 'Confirm Availability Reminder',
  audience: 'Volunteers',
  trigger: '5 days before new term',
  timing: '5 days prior',
  channel: 'Email',
  active: false,
  lastSent: 'Never',
  successRate: '—'
}, {
  id: 'r7',
  name: 'Missing Attendance Alert',
  audience: 'Parents',
  trigger: 'Learner absent 2+ sessions',
  timing: 'Triggered automatically',
  channel: 'Email',
  active: true,
  lastSent: '3 days ago',
  successRate: '88%'
}];
const SAFEGUARDING_ALERTS: SafeguardingAlert[] = [{
  id: 'sg1',
  alertId: 'SG-2025-041',
  source: 'Support Ticket',
  reportedBy: 'Emmanuel Osei (Parent)',
  relatedClass: 'Juniors AI Group C',
  severity: 'High',
  status: 'New',
  assignedOfficer: 'Unassigned'
}, {
  id: 'sg2',
  alertId: 'SG-2025-038',
  source: 'Class Thread',
  reportedBy: 'Sarah Okafor (Volunteer)',
  relatedClass: 'Juniors AI Group A',
  severity: 'Medium',
  status: 'Under Review',
  assignedOfficer: 'David Mensah'
}, {
  id: 'sg3',
  alertId: 'SG-2025-029',
  source: 'Admin Flag',
  reportedBy: 'Amara Diallo (Admin)',
  relatedClass: 'Digital Skills – Nairobi',
  severity: 'Low',
  status: 'Resolved',
  assignedOfficer: 'David Mensah'
}];
const LOGS_DATA: LogRecord[] = [{
  id: 'l1',
  datetime: '12 Jul 2025, 09:14 AM',
  action: 'Announcement sent: "New safeguarding module now live"',
  actionType: 'announcement',
  userAdmin: 'David Mensah',
  audience: 'All Volunteers',
  channel: 'Email + In-app',
  status: 'Delivered',
  related: 'Global'
}, {
  id: 'l2',
  datetime: '12 Jul 2025, 08:00 AM',
  action: 'Session reminder delivered to 14 volunteers',
  actionType: 'reminder',
  userAdmin: 'System',
  audience: 'Volunteers',
  channel: 'Email + In-app',
  status: 'Delivered',
  related: 'Sat 10 AM classes'
}, {
  id: 'l3',
  datetime: '11 Jul 2025, 03:22 PM',
  action: 'Message removed by admin from Juniors AI Group C thread',
  actionType: 'moderation',
  userAdmin: 'David Mensah',
  audience: 'Class Thread',
  channel: 'In-app',
  status: 'Delivered',
  related: 'Juniors AI Group C'
}, {
  id: 'l4',
  datetime: '11 Jul 2025, 11:45 AM',
  action: 'Safeguarding alert SG-2025-038 created',
  actionType: 'safeguarding',
  userAdmin: 'System',
  audience: 'Safeguarding Officer',
  channel: 'Internal',
  status: 'Delivered',
  related: 'Juniors AI Group A'
}, {
  id: 'l5',
  datetime: '10 Jul 2025, 02:30 PM',
  action: 'Thread locked: Maths Literacy B',
  actionType: 'thread',
  userAdmin: 'David Mensah',
  audience: 'Class Participants',
  channel: 'In-app',
  status: 'Delivered',
  related: 'Maths Literacy B'
}, {
  id: 'l6',
  datetime: '10 Jul 2025, 09:00 AM',
  action: 'Scheduled reminder: "Training Completion" – 12 recipients',
  actionType: 'reminder',
  userAdmin: 'System',
  audience: 'New Volunteers',
  channel: 'Email',
  status: 'Delivered',
  related: 'Onboarding'
}, {
  id: 'l7',
  datetime: '09 Jul 2025, 04:15 PM',
  action: 'Urgent announcement failed – email bounce for 3 recipients',
  actionType: 'announcement',
  userAdmin: 'System',
  audience: 'All Users',
  channel: 'Email',
  status: 'Failed',
  related: 'Platform Maintenance'
}];

// ─── SHARED MICRO COMPONENTS ──────────────────────────────────────────────────

const CBadge = ({
  children,
  variant = 'green'
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) => {
  const cls: Record<BadgeVariant, string> = {
    green: 'bg-[#e6f4ed] text-[#0B6B3A]',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-100 text-gray-600',
    purple: 'bg-purple-50 text-purple-700'
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls[variant]}`}>
      {children}
    </span>;
};
const PageHeading = ({
  label,
  title,
  sub
}: {
  label: string;
  title: string;
  sub?: string;
}) => <div className="mb-7">
    <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-2">{label}</span>
    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
  </div>;
const StatCard = ({
  label,
  value,
  icon: Icon,
  color = 'green',
  sub
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color?: 'green' | 'amber' | 'red' | 'blue';
  sub?: string;
}) => {
  const clr = {
    green: 'text-[#0B6B3A] bg-[#0B6B3A]/10',
    amber: 'text-amber-600 bg-amber-50',
    red: 'text-red-600 bg-red-50',
    blue: 'text-blue-600 bg-blue-50'
  }[color];
  const valClr = {
    green: 'text-[#0B6B3A]',
    amber: 'text-amber-600',
    red: 'text-red-600',
    blue: 'text-blue-600'
  }[color];
  return <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${clr}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className={`text-2xl font-black ${valClr}`}>{value}</p>
        <p className="text-xs font-semibold text-gray-600 mt-0.5">{label}</p>
        {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>;
};

// ─── SUB-PAGE 1: OVERVIEW ─────────────────────────────────────────────────────

const CommOverviewPage = ({
  onNavigate
}: {
  onNavigate: (p: CommSubPageId) => void;
}) => {
  const topStats = [{
    label: 'Announcements Sent',
    value: '24',
    icon: Megaphone,
    color: 'green' as const,
    sub: 'This month'
  }, {
    label: 'Unread Notices',
    value: '3',
    icon: Bell,
    color: 'amber' as const,
    sub: 'Important'
  }, {
    label: 'Open Support Messages',
    value: '8',
    icon: Inbox,
    color: 'amber' as const,
    sub: '3 urgent'
  }, {
    label: 'Active Class Threads',
    value: '4',
    icon: MessageSquare,
    color: 'blue' as const,
    sub: '12 unread'
  }, {
    label: 'Safeguarding Alerts',
    value: '2',
    icon: Shield,
    color: 'red' as const,
    sub: '1 new'
  }, {
    label: 'Scheduled Reminders',
    value: '7',
    icon: Clock,
    color: 'green' as const,
    sub: 'Active'
  }];
  const alertPanelItems = [{
    msg: 'Parent message from Emmanuel Osei marked urgent — safeguarding concern raised',
    type: 'red' as const,
    action: 'Review Now',
    page: 'safeguarding' as CommSubPageId
  }, {
    msg: 'Volunteer absence notification from Tom Ashford in class "Code Club Junior"',
    type: 'amber' as const,
    action: 'View',
    page: 'threads' as CommSubPageId
  }, {
    msg: '3 failed email deliveries detected for "Platform Maintenance" announcement',
    type: 'amber' as const,
    action: 'Retry',
    page: 'logs' as CommSubPageId
  }, {
    msg: 'Safeguarding alert SG-2025-041 is unassigned — needs officer review',
    type: 'red' as const,
    action: 'Assign',
    page: 'safeguarding' as CommSubPageId
  }];
  const recentActivity = [{
    msg: 'Announcement "New safeguarding module" sent to all Volunteers',
    time: '2h ago',
    dot: 'bg-[#0B6B3A]',
    type: 'Announcement'
  }, {
    msg: 'Parent replied in Juniors AI Group A thread',
    time: '3h ago',
    dot: 'bg-blue-400',
    type: 'Thread'
  }, {
    msg: 'Safeguarding concern flagged in support inbox',
    time: '5h ago',
    dot: 'bg-red-400',
    type: 'Alert'
  }, {
    msg: 'Reminder sent for Saturday sessions — 14 recipients',
    time: '8h ago',
    dot: 'bg-amber-400',
    type: 'Reminder'
  }, {
    msg: 'Thread "Maths Literacy B" locked by admin',
    time: '1d ago',
    dot: 'bg-gray-400',
    type: 'Moderation'
  }, {
    msg: 'Announcement "July schedule updates" — 72% read rate',
    time: '5d ago',
    dot: 'bg-[#0B6B3A]',
    type: 'Announcement'
  }];
  const quickActions = [{
    label: 'Create Announcement',
    icon: Megaphone,
    page: 'announcements' as CommSubPageId,
    color: 'bg-[#0B6B3A] text-white hover:bg-[#095e32]'
  }, {
    label: 'Send Urgent Alert',
    icon: Zap,
    page: 'announcements' as CommSubPageId,
    color: 'bg-red-500 text-white hover:bg-red-600'
  }, {
    label: 'View Class Threads',
    icon: MessageSquare,
    page: 'threads' as CommSubPageId,
    color: 'bg-white border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'
  }, {
    label: 'Configure Reminders',
    icon: Settings,
    page: 'reminders' as CommSubPageId,
    color: 'bg-white border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'
  }];
  return <div className="space-y-7">
      <PageHeading label="Communication Hub" title="Communication Overview" sub="Monitor all platform communication, alerts, and engagement in one place." />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {topStats.map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} sub={s.sub} />)}
      </div>

      <div className="flex flex-wrap gap-3">
        {quickActions.map(qa => {
        const Icon = qa.icon;
        return <button key={qa.label} onClick={() => onNavigate(qa.page)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${qa.color}`}>
              <Icon size={14} />
              <span>{qa.label}</span>
            </button>;
      })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span>Alert Panel</span>
          </h3>
          <div className="space-y-3">
            {alertPanelItems.map((a, i) => {
            const bg = a.type === 'red' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100';
            const ic = a.type === 'red' ? 'text-red-500' : 'text-amber-500';
            return <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border ${bg}`}>
                  <AlertTriangle size={14} className={`${ic} shrink-0`} />
                  <p className="text-xs text-gray-700 flex-1 leading-snug">{a.msg}</p>
                  <button onClick={() => onNavigate(a.page)} className="text-xs font-bold text-[#0B6B3A] hover:underline shrink-0 whitespace-nowrap">{a.action}</button>
                </div>;
          })}
          </div>
        </div>

        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={16} className="text-[#0B6B3A]" />
            <span>Recent Activity</span>
          </h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => <div key={i} className="flex items-start gap-3">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-700 leading-snug">{a.msg}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[10px] text-gray-400">{a.time}</p>
                    <span className="text-[10px] text-gray-300">·</span>
                    <p className="text-[10px] text-gray-400 font-medium">{a.type}</p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE 2: ANNOUNCEMENTS ────────────────────────────────────────────────

const AnnouncementsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [annType, setAnnType] = useState('');
  const [audience, setAudience] = useState('');
  const [channel, setChannel] = useState('Both');
  const [schedule, setSchedule] = useState('now');
  const [priority, setPriority] = useState('Normal');
  const [scheduleTime, setScheduleTime] = useState('');
  const [sent, setSent] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [confirmUrgent, setConfirmUrgent] = useState(false);
  const handleSend = () => {
    if (priority === 'Urgent' && !confirmUrgent) {
      setConfirmUrgent(true);
      return;
    }
    if (title && body && audience) setSent(true);
  };
  const filtered = ANNOUNCEMENTS_DATA.filter(a => filterStatus === 'All' || a.status === filterStatus);
  const audienceOpts = ['All Users', 'Volunteers', 'Parents', 'Hub Admins', 'Specific Class', 'Specific Programme', 'Specific Country', 'Specific Hub'];
  const typeOpts = ['General Update', 'Class Update', 'Programme Update', 'Event Update', 'Urgent Notice', 'Sponsorship Update'];
  return <div className="space-y-6">
      <PageHeading label="Broadcast" title="Announcements" sub="Create and manage platform-wide and targeted announcements." />

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
            {['All', 'Sent', 'Scheduled', 'Draft'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <button onClick={() => {
        setShowForm(v => !v);
        setSent(false);
        setConfirmUrgent(false);
      }} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={14} /><span>New Announcement</span>
        </button>
      </div>

      {showForm && <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5">Create Announcement</h3>
            {sent ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
                <CheckCircle size={18} className="text-[#0B6B3A]" />
                <p className="text-sm font-semibold text-[#0B6B3A]">Announcement {schedule === 'now' ? 'sent' : 'scheduled'} successfully.</p>
              </div> : <div className="space-y-4">
                {confirmUrgent && <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-700">Confirm Urgent Announcement</p>
                      <p className="text-xs text-red-600 mt-1">This will immediately notify all selected recipients. Are you sure?</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => {
                  setConfirmUrgent(false);
                  setSent(true);
                }} className="px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600">Confirm Send</button>
                        <button onClick={() => setConfirmUrgent(false)} className="px-4 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-bold">Cancel</button>
                      </div>
                    </div>
                  </div>}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Announcement Title</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter title…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message Body</label>
                  <textarea value={body} onChange={e => setBody(e.target.value)} rows={4} placeholder="Write your message…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Announcement Type</label>
                    <select value={annType} onChange={e => setAnnType(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                      <option value="">Select type…</option>
                      {typeOpts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Audience</label>
                    <select value={audience} onChange={e => setAudience(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                      <option value="">Select audience…</option>
                      {audienceOpts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Delivery Channel</label>
                    <select value={channel} onChange={e => setChannel(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                      {['In-app notification', 'Email', 'Both'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Priority</label>
                    <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                      {['Normal', 'Important', 'Urgent'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Scheduling</label>
                  <div className="flex gap-3">
                    {['now', 'later'].map(opt => <button key={opt} onClick={() => setSchedule(opt)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${schedule === opt ? 'bg-[#0B6B3A] text-white border-[#0B6B3A]' : 'border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A]'}`}>
                        {opt === 'now' ? 'Send Now' : 'Schedule for Later'}
                      </button>)}
                  </div>
                  {schedule === 'later' && <input type="datetime-local" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="w-full mt-2 border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />}
                </div>
                <button onClick={handleSend} className={`w-full py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 ${priority === 'Urgent' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#0B6B3A] text-white hover:bg-[#095e32]'}`}>
                  <Send size={14} />
                  <span>{schedule === 'now' ? priority === 'Urgent' ? 'Send Urgent Alert' : 'Send Announcement' : 'Schedule Announcement'}</span>
                </button>
              </div>}
          </div>

          <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Preview</h3>
            <div className="border border-[#e6f4ed] rounded-xl p-4 bg-[#f7fbf9] min-h-[200px]">
              {title || body ? <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center">
                      <Megaphone size={12} className="text-white" />
                    </div>
                    <p className="text-xs font-bold text-[#0B6B3A]">Nurture Roots</p>
                    {priority !== 'Normal' && <CBadge variant={priority === 'Urgent' ? 'red' : 'amber'}>{priority}</CBadge>}
                  </div>
                  {title && <p className="text-sm font-bold text-gray-900">{title}</p>}
                  {body && <p className="text-xs text-gray-600 leading-relaxed">{body}</p>}
                  {audience && <p className="text-[10px] text-gray-400 mt-2">To: {audience} · via {channel}</p>}
                </div> : <div className="flex items-center justify-center h-32 text-gray-300">
                  <div className="text-center">
                    <Megaphone size={24} className="mx-auto mb-2 opacity-40" />
                    <p className="text-xs">Preview will appear here</p>
                  </div>
                </div>}
            </div>
          </div>
        </div>}

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Title', 'Type', 'Audience', 'Channel', 'Status', 'Read Rate', 'Created By', 'Date', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {filtered.map(a => <tr key={a.id} className="hover:bg-[#fafcfa] transition-colors">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{a.title}</p>
                      <CBadge variant={a.priority === 'Urgent' ? 'red' : a.priority === 'Important' ? 'amber' : 'gray'}>{a.priority}</CBadge>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{a.type}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{a.audience}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{a.channel}</td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={a.status === 'Sent' ? 'green' : a.status === 'Scheduled' ? 'amber' : 'gray'}>{a.status}</CBadge>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-[#0B6B3A]">{a.readRate}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{a.createdBy}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{a.dateSent}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors" title="View"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit"><Edit3 size={13} /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Duplicate"><RefreshCw size={13} /></button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors" title="Archive"><Archive size={13} /></button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE 3: CLASS THREADS ────────────────────────────────────────────────

const ClassThreadsPage = () => {
  const [selectedThread, setSelectedThread] = useState<ThreadRecord | null>(null);
  const [newMsg, setNewMsg] = useState('');
  const THREAD_MESSAGES = [{
    id: 'm1',
    sender: 'Aisha Kamara (Volunteer)',
    msg: 'Hi everyone! Just a reminder that our session is this Saturday at 10 AM GMT. Looking forward to seeing you all.',
    time: '2h ago',
    isAdmin: false
  }, {
    id: 'm2',
    sender: 'Fatima Hassan (Parent)',
    msg: 'Thank you! My children are very excited. Will there be any pre-reading to do?',
    time: '1h 45m ago',
    isAdmin: false
  }, {
    id: 'm3',
    sender: 'Admin Note (David Mensah)',
    msg: 'Materials for this week have been uploaded to the class folder. Please review before Saturday.',
    time: '1h 30m ago',
    isAdmin: true
  }, {
    id: 'm4',
    sender: 'Bright Stars Academy (Hub)',
    msg: 'We have 18 learners confirmed for this session. Is there anything we need to prepare on-site?',
    time: '45m ago',
    isAdmin: false
  }];
  if (selectedThread) {
    return <div className="space-y-6">
        <button onClick={() => setSelectedThread(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" />
          <span>Back to Class Threads</span>
        </button>

        <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] px-6 py-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-white font-black text-lg">{selectedThread.className}</p>
              <p className="text-white/70 text-sm mt-0.5">{selectedThread.programme} · Lead: {selectedThread.volunteers}</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <CBadge variant={selectedThread.status === 'Active' ? 'green' : selectedThread.status === 'Locked' ? 'red' : 'gray'}>{selectedThread.status}</CBadge>
              <button className="px-3 py-1.5 rounded-lg border border-white/30 text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-1.5">
                <Lock size={11} /><span>Lock Thread</span>
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-white/30 text-white text-xs font-bold hover:bg-white/20 transition-colors flex items-center gap-1.5">
                <Flag size={11} /><span>Flag Safeguarding</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
            <Shield size={14} className="text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700 font-medium">All class communication is logged and monitored for safeguarding. No direct private messaging between volunteers and children.</p>
          </div>

          <div className="flex divide-x divide-[#e6f4ed]">
            <div className="flex-1 p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {THREAD_MESSAGES.map(m => <div key={m.id} className={`${m.isAdmin ? 'ml-4 border-l-2 border-[#0B6B3A] pl-4' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`text-xs font-bold ${m.isAdmin ? 'text-[#0B6B3A]' : 'text-gray-700'}`}>{m.sender}</p>
                    <p className="text-[10px] text-gray-400">{m.time}</p>
                    {m.isAdmin && <CBadge variant="green">Admin</CBadge>}
                  </div>
                  <div className={`rounded-xl p-3 text-sm text-gray-700 leading-relaxed ${m.isAdmin ? 'bg-[#f0f9f4]' : 'bg-[#f7f7f7]'}`}>
                    {m.msg}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button className="text-[10px] text-gray-400 hover:text-[#0B6B3A] flex items-center gap-1"><Pin size={9} /><span>Pin</span></button>
                    <button className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1"><Trash2 size={9} /><span>Remove</span></button>
                    <button className="text-[10px] text-gray-400 hover:text-amber-600 flex items-center gap-1"><Flag size={9} /><span>Flag</span></button>
                  </div>
                </div>)}
            </div>

            <div className="w-56 p-4 bg-[#f7fbf9] shrink-0">
              <p className="text-xs font-bold text-gray-700 mb-3">Participants</p>
              <div className="space-y-2">
                {['Aisha Kamara (Lead Volunteer)', 'Fatima Hassan (Parent)', 'Bright Stars Academy (Hub)', 'David Mensah (Admin)'].map(p => <div key={p} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                      {p[0]}
                    </div>
                    <p className="text-[11px] text-gray-600 leading-tight">{p}</p>
                  </div>)}
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-[#e6f4ed] flex gap-3">
            <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Send a message as admin…" className="flex-1 border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            <button className="px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors flex items-center gap-1.5">
              <Send size={13} /><span>Send</span>
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading label="Class Communication" title="Class Threads" sub="Monitored group communication threads for each active class." />

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700"><strong>Safeguarding notice:</strong> All class threads are visible to admins. No direct private messaging is permitted between volunteers and children. All communications are logged.</p>
      </div>

      <div className="space-y-3">
        {THREADS_DATA.map(thread => <div key={thread.id} className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md cursor-pointer ${thread.status === 'Locked' ? 'border-gray-200 opacity-70' : thread.unread > 0 ? 'border-[#0B6B3A]/30' : 'border-[#d1e8db]'}`} onClick={() => setSelectedThread(thread)}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-900">{thread.className}</p>
                  <CBadge variant={thread.status === 'Active' ? 'green' : thread.status === 'Locked' ? 'red' : 'gray'}>{thread.status}</CBadge>
                  {thread.unread > 0 && <span className="w-5 h-5 rounded-full bg-[#0B6B3A] text-white text-[10px] font-bold flex items-center justify-center">{thread.unread}</span>}
                </div>
                <p className="text-xs text-gray-500">{thread.programme} · {thread.volunteers}</p>
                <p className="text-xs text-gray-400 mt-0.5">Contacts: {thread.contacts}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-500 mb-1">{thread.lastTime}</p>
                <p className="text-xs text-gray-600 italic">"{thread.lastMessage}"</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── SUB-PAGE 4: DIRECT SUPPORT MESSAGES ─────────────────────────────────────

const SupportMessagesPage = () => {
  const [selectedMsg, setSelectedMsg] = useState<SupportMessage | null>(null);
  const [filterCat, setFilterCat] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [reply, setReply] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [noteAdded, setNoteAdded] = useState(false);
  const [replySent, setReplySent] = useState(false);
  const categories = ['All', 'Parent Support', 'Volunteer Support', 'Hub Support', 'Sponsorship Enquiries', 'Technical Issues', 'Safeguarding Concerns'];
  const filtered = SUPPORT_MESSAGES.filter(m => {
    const catMatch = filterCat === 'All' || m.category === filterCat;
    const statusMatch = filterStatus === 'All' || m.status === filterStatus;
    return catMatch && statusMatch;
  });
  if (selectedMsg) {
    return <div className="space-y-6">
        <button onClick={() => {
        setSelectedMsg(null);
        setReplySent(false);
        setNoteAdded(false);
      }} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" />
          <span>Back to Support Messages</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
            <div className={`px-6 py-4 flex items-center justify-between flex-wrap gap-3 ${selectedMsg.priority === 'Urgent' ? 'bg-red-50 border-b border-red-100' : 'bg-[#f7fbf9] border-b border-[#e6f4ed]'}`}>
              <div>
                <p className="font-bold text-gray-900">{selectedMsg.subject}</p>
                <p className="text-xs text-gray-500 mt-0.5">From: {selectedMsg.sender} ({selectedMsg.userType}) · {selectedMsg.category}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <CBadge variant={selectedMsg.priority === 'Urgent' ? 'red' : selectedMsg.priority === 'High' ? 'amber' : 'gray'}>{selectedMsg.priority}</CBadge>
                <CBadge variant={selectedMsg.status === 'Open' ? 'amber' : selectedMsg.status === 'In Progress' ? 'blue' : 'green'}>{selectedMsg.status}</CBadge>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-[#f7fbf9] rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 mb-2">Original Message</p>
                <p className="text-sm text-gray-700 leading-relaxed">Hello, {selectedMsg.subject.toLowerCase()}. I would appreciate your assistance with this matter as soon as possible. Thank you for your support.</p>
                <p className="text-[10px] text-gray-400 mt-2">{selectedMsg.lastUpdated}</p>
              </div>

              {!replySent ? <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reply</label>
                  <textarea value={reply} onChange={e => setReply(e.target.value)} rows={4} placeholder="Type your reply…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button onClick={() => {
                  if (reply) setReplySent(true);
                }} className="px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] flex items-center gap-1.5">
                      <Send size={12} /><span>Send Reply</span>
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-amber-200 text-amber-600 text-sm font-bold hover:bg-amber-50 flex items-center gap-1.5">
                      <AlertTriangle size={12} /><span>Escalate</span>
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm font-bold hover:bg-red-50 flex items-center gap-1.5">
                      <Flag size={12} /><span>Convert to Safeguarding</span>
                    </button>
                    <button className="px-4 py-2 rounded-xl border border-[#d1e8db] text-gray-600 text-sm font-bold hover:bg-gray-50 flex items-center gap-1.5">
                      <Check size={12} /><span>Mark Resolved</span>
                    </button>
                  </div>
                </div> : <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
                  <CheckCircle size={16} className="text-[#0B6B3A]" />
                  <p className="text-sm font-semibold text-[#0B6B3A]">Reply sent successfully.</p>
                </div>}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-700 mb-3">Assign to Staff</p>
              <select className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white mb-3">
                <option value="">Select staff member…</option>
                {['David Mensah', 'Amara Diallo', 'Sarah Okafor'].map(s => <option key={s}>{s}</option>)}
              </select>
              <button className="w-full py-2 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32]">Assign</button>
            </div>

            <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-bold text-gray-700 mb-3">Internal Admin Note</p>
              {noteAdded ? <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl">
                  <CheckCircle size={13} className="text-[#0B6B3A]" />
                  <p className="text-xs font-semibold text-[#0B6B3A]">Note saved</p>
                </div> : <div>
                  <textarea value={adminNote} onChange={e => setAdminNote(e.target.value)} rows={3} placeholder="Add confidential note (visible to admins only)…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none mb-2" />
                  <button onClick={() => {
                if (adminNote) setNoteAdded(true);
              }} className="w-full py-2 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-bold hover:bg-[#e6f4ed]">Save Note</button>
                </div>}
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading label="Support Inbox" title="Direct Support Messages" sub="Manage inbound support requests from parents, volunteers, hubs, and sponsors." />

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'Open', 'In Progress', 'Resolved'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Sender', 'User Type', 'Category', 'Subject', 'Priority', 'Status', 'Last Updated', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {filtered.map(m => <tr key={m.id} className={`hover:bg-[#fafcfa] transition-colors ${m.priority === 'Urgent' ? 'bg-red-50/40' : ''}`}>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{m.sender}</td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={m.userType === 'Parent' ? 'purple' : m.userType === 'Volunteer' ? 'green' : m.userType === 'Hub' ? 'blue' : 'amber'}>{m.userType}</CBadge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{m.category}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700 max-w-[200px] truncate">{m.subject}</td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={m.priority === 'Urgent' ? 'red' : m.priority === 'High' ? 'amber' : m.priority === 'Medium' ? 'blue' : 'gray'}>{m.priority}</CBadge>
                  </td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={m.status === 'Open' ? 'amber' : m.status === 'In Progress' ? 'blue' : 'green'}>{m.status}</CBadge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{m.lastUpdated}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => setSelectedMsg(m)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE 5: REMINDERS ────────────────────────────────────────────────────

const RemindersPage = () => {
  const [reminders, setReminders] = useState<ReminderRecord[]>(REMINDERS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [created, setCreated] = useState(false);
  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? {
      ...r,
      active: !r.active
    } : r));
  };
  return <div className="space-y-6">
      <PageHeading label="Automated Reminders" title="Reminders" sub="Configure automated reminders for volunteers, parents, hubs, and events." />

      <div className="flex justify-end">
        <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={14} /><span>New Reminder</span>
        </button>
      </div>

      {showForm && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm max-w-2xl">
          <h3 className="font-bold text-gray-900 mb-5">Create Reminder</h3>
          {created ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Reminder created and activated.</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{
          label: 'Reminder Name',
          placeholder: 'e.g. Session Reminder – Volunteers'
        }, {
          label: 'Audience',
          placeholder: 'e.g. Volunteers'
        }, {
          label: 'Trigger',
          placeholder: 'e.g. 24h before class'
        }, {
          label: 'Timing',
          placeholder: 'e.g. 24 hours before'
        }].map(f => <div key={f.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                  <input placeholder={f.placeholder} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
                </div>)}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Channel</label>
                <select className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                  {['In-app', 'Email', 'Both'].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setCreated(true)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32]">
                  Create Reminder
                </button>
              </div>
            </div>}
        </div>}

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Reminder Name', 'Audience', 'Trigger', 'Timing', 'Channel', 'Last Sent', 'Success Rate', 'Status'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {reminders.map(r => <tr key={r.id} className="hover:bg-[#fafcfa] transition-colors">
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-900">{r.name}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{r.audience}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{r.trigger}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{r.timing}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{r.channel}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{r.lastSent}</td>
                  <td className="px-4 py-3.5 text-sm font-bold text-[#0B6B3A]">{r.successRate}</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => toggleReminder(r.id)} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${r.active ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`} aria-label={`Toggle ${r.name}`}>
                      <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
                    left: r.active ? '22px' : '2px'
                  }} />
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE 6: SAFEGUARDING ALERTS ─────────────────────────────────────────

const SafeguardingAlertsPage = () => {
  const [selectedAlert, setSelectedAlert] = useState<SafeguardingAlert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const filtered = SAFEGUARDING_ALERTS.filter(a => {
    const sevMatch = filterSeverity === 'All' || a.severity === filterSeverity;
    const statusMatch = filterStatus === 'All' || a.status === filterStatus;
    return sevMatch && statusMatch;
  });
  if (selectedAlert) {
    return <div className="space-y-6">
        <button onClick={() => {
        setSelectedAlert(null);
        setNoteSaved(false);
      }} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" />
          <span>Back to Safeguarding Alerts</span>
        </button>

        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
          <Lock size={15} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 font-medium">Restricted access: safeguarding records are only visible to authorised staff. All actions are logged.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
            <div className={`px-6 py-4 flex items-center justify-between flex-wrap gap-3 ${selectedAlert.severity === 'Urgent' || selectedAlert.severity === 'High' ? 'bg-red-50 border-b border-red-100' : 'bg-amber-50 border-b border-amber-100'}`}>
              <div>
                <p className="font-black text-gray-900 text-lg">{selectedAlert.alertId}</p>
                <p className="text-xs text-gray-500 mt-0.5">Source: {selectedAlert.source} · Class: {selectedAlert.relatedClass}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <CBadge variant={selectedAlert.severity === 'Urgent' || selectedAlert.severity === 'High' ? 'red' : selectedAlert.severity === 'Medium' ? 'amber' : 'gray'}>{selectedAlert.severity}</CBadge>
                <CBadge variant={selectedAlert.status === 'New' ? 'red' : selectedAlert.status === 'Under Review' ? 'amber' : 'green'}>{selectedAlert.status}</CBadge>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[{
                label: 'Alert ID',
                value: selectedAlert.alertId
              }, {
                label: 'Reported By',
                value: selectedAlert.reportedBy
              }, {
                label: 'Related Class',
                value: selectedAlert.relatedClass
              }, {
                label: 'Assigned Officer',
                value: selectedAlert.assignedOfficer
              }].map(item => <div key={item.label} className="bg-[#f7fbf9] rounded-xl p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-0.5">{item.value}</p>
                  </div>)}
              </div>

              <div className="bg-[#f7fbf9] rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 mb-2">Reported Issue</p>
                <p className="text-sm text-gray-700 leading-relaxed">A concern was raised regarding communication within the class thread. The reported content has been flagged for review by a safeguarding officer. Details are kept confidential in line with our safeguarding policy.</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Assign Officer', 'Escalate', 'Lock Related Thread', 'Mark Resolved'].map(action => <button key={action} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${action === 'Mark Resolved' ? 'bg-[#0B6B3A] text-white hover:bg-[#095e32]' : action === 'Escalate' ? 'bg-red-500 text-white hover:bg-red-600' : 'border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
                    {action}
                  </button>)}
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
            <p className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-1.5">
              <Lock size={11} className="text-gray-500" />
              <span>Confidential Admin Note</span>
            </p>
            {noteSaved ? <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl">
                <CheckCircle size={13} className="text-[#0B6B3A]" />
                <p className="text-xs font-semibold text-[#0B6B3A]">Note saved securely</p>
              </div> : <div>
                <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={5} placeholder="Add confidential note. Visible to safeguarding officers only." className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none mb-3" />
                <button onClick={() => {
              if (noteText) setNoteSaved(true);
            }} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32]">Save Confidential Note</button>
              </div>}
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading label="Child Protection" title="Safeguarding Alerts" sub="Restricted access. Only authorised safeguarding officers can manage these records." />

      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
        <Shield size={16} className="text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-700"><strong>Restricted access:</strong> Safeguarding records are only visible to authorised staff. All actions are logged and auditable. Use privacy-aware language at all times.</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'Low', 'Medium', 'High', 'Urgent'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'New', 'Under Review', 'Resolved'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map(alert => <div key={alert.id} className={`bg-white border rounded-2xl p-5 shadow-sm transition-all hover:shadow-md cursor-pointer ${alert.status === 'New' ? 'border-red-200' : alert.status === 'Under Review' ? 'border-amber-200' : 'border-[#d1e8db]'}`} onClick={() => setSelectedAlert(alert)}>
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-900">{alert.alertId}</p>
                  <CBadge variant={alert.severity === 'Urgent' || alert.severity === 'High' ? 'red' : alert.severity === 'Medium' ? 'amber' : 'gray'}>{alert.severity}</CBadge>
                  <CBadge variant={alert.status === 'New' ? 'red' : alert.status === 'Under Review' ? 'amber' : 'green'}>{alert.status}</CBadge>
                </div>
                <p className="text-xs text-gray-500">Source: {alert.source} · Reported by: {alert.reportedBy}</p>
                <p className="text-xs text-gray-400 mt-0.5">Class: {alert.relatedClass} · Officer: {alert.assignedOfficer}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── SUB-PAGE 7: NOTIFICATION SETTINGS ───────────────────────────────────────

const NotificationSettingsPage = () => {
  const [senderName, setSenderName] = useState('Nurture Roots');
  const [retryFailed, setRetryFailed] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [saved, setSaved] = useState(false);
  const settingsCards = [{
    label: 'Session Reminders',
    sub: 'Reminder 24h and 1h before each class',
    enabled: true
  }, {
    label: 'Announcements',
    sub: 'Notify users of new platform announcements',
    enabled: true
  }, {
    label: 'Volunteer Engagement',
    sub: 'Nudges for training, hours logging, availability',
    enabled: true
  }, {
    label: 'Parent Engagement',
    sub: 'Class updates, attendance alerts, programme news',
    enabled: true
  }, {
    label: 'Sponsorship Updates',
    sub: 'Notify sponsors of impact and programme updates',
    enabled: false
  }, {
    label: 'Safeguarding Alerts',
    sub: 'Immediate alerts for safeguarding concerns',
    enabled: true
  }];
  const [cardStates, setCardStates] = useState<Record<string, boolean>>(Object.fromEntries(settingsCards.map(c => [c.label, c.enabled])));
  return <div className="space-y-6">
      <PageHeading label="Configuration" title="Notification Settings" sub="Configure default channels, delivery rules, and digest preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Default Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Sender Name</label>
              <input value={senderName} onChange={e => setSenderName(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Default Notification Channel</label>
              <select className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                {['Email + In-app', 'Email only', 'In-app only'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Urgent Alert Behaviour</label>
              <select className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                {['Require confirmation before sending', 'Send immediately', 'Notify Super Admin first'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {[{
            label: 'Retry Failed Notifications',
            sub: 'Automatically retry failed email deliveries',
            value: retryFailed,
            onChange: setRetryFailed
          }, {
            label: 'Weekly Digest',
            sub: 'Send admins a weekly communication summary',
            value: digestEnabled,
            onChange: setDigestEnabled
          }].map(s => <div key={s.label} className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
                <button onClick={() => s.onChange(!s.value)} className={`w-11 h-6 rounded-full transition-colors relative ${s.value ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`} aria-label={s.label}>
                  <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
                left: s.value ? '22px' : '2px'
              }} />
                </button>
              </div>)}

            {saved ? <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl">
                <CheckCircle size={14} className="text-[#0B6B3A]" />
                <p className="text-xs font-semibold text-[#0B6B3A]">Settings saved</p>
              </div> : <button onClick={() => setSaved(true)} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32]">
                Save Settings
              </button>}
          </div>
        </div>

        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Notification Categories</h3>
          <div className="space-y-3">
            {settingsCards.map(card => <div key={card.label} className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{card.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                </div>
                <button onClick={() => setCardStates(prev => ({
              ...prev,
              [card.label]: !prev[card.label]
            }))} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${cardStates[card.label] ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`} aria-label={`Toggle ${card.label}`}>
                  <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
                left: cardStates[card.label] ? '22px' : '2px'
              }} />
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE 8: COMMUNICATION LOGS ──────────────────────────────────────────

const CommunicationLogsPage = () => {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const typeOpts = ['All', 'Announcement', 'Reminder', 'Moderation', 'Safeguarding', 'Thread'];
  const filtered = LOGS_DATA.filter(l => {
    const typeMatch = filterType === 'All' || l.actionType === filterType.toLowerCase();
    const statusMatch = filterStatus === 'All' || l.status === filterStatus;
    const searchMatch = search === '' || l.action.toLowerCase().includes(search.toLowerCase()) || l.userAdmin.toLowerCase().includes(search.toLowerCase());
    return typeMatch && statusMatch && searchMatch;
  });
  return <div className="space-y-6">
      <PageHeading label="Audit Trail" title="Communication Logs" sub="Full audit history of all communication actions across the platform." />

      <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start sm:items-center">
        <div className="flex items-center gap-2 bg-white border border-[#d1e8db] rounded-xl px-3 py-2 flex-1 min-w-[200px]">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs…" className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder-gray-400" />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {typeOpts.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'Delivered', 'Pending', 'Failed'].map(s => <option key={s}>{s}</option>)}
        </select>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-bold hover:bg-[#e6f4ed] transition-colors">
            <Download size={13} /><span>CSV</span>
          </button>
          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
            <FileText size={13} /><span>PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Date / Time', 'Action', 'Type', 'Admin / User', 'Audience', 'Channel', 'Status', 'Related'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {filtered.map(log => <tr key={log.id} className={`hover:bg-[#fafcfa] transition-colors ${log.status === 'Failed' ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3.5 text-xs text-gray-400 whitespace-nowrap">{log.datetime}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700 max-w-[220px]">{log.action}</td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={log.actionType === 'announcement' ? 'green' : log.actionType === 'safeguarding' ? 'red' : log.actionType === 'moderation' ? 'amber' : log.actionType === 'reminder' ? 'blue' : 'gray'}>
                      {log.actionType.charAt(0).toUpperCase() + log.actionType.slice(1)}
                    </CBadge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-600">{log.userAdmin}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{log.audience}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{log.channel}</td>
                  <td className="px-4 py-3.5">
                    <CBadge variant={log.status === 'Delivered' ? 'green' : log.status === 'Failed' ? 'red' : 'amber'}>{log.status}</CBadge>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-400">{log.related}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">
            <FileText size={28} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No log entries found</p>
          </div>}
      </div>
    </div>;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export const AdminCommunicationConsole = () => {
  const [activeSub, setActiveSub] = useState<CommSubPageId>('overview');
  const PAGE_MAP: Record<CommSubPageId, React.ReactElement> = {
    'overview': <CommOverviewPage onNavigate={setActiveSub} />,
    'announcements': <AnnouncementsPage />,
    'threads': <ClassThreadsPage />,
    'support': <SupportMessagesPage />,
    'reminders': <RemindersPage />,
    'safeguarding': <SafeguardingAlertsPage />,
    'notif-settings': <NotificationSettingsPage />,
    'logs': <CommunicationLogsPage />
  };
  return <div className="flex gap-0 min-h-full -mx-4 sm:-mx-6 -mt-6">
      {/* Sub-sidebar */}
      <nav className="hidden md:flex w-56 shrink-0 flex-col bg-white border-r border-[#e6f4ed] pt-5 pb-4">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Communication</p>
        </div>
        <div className="flex-1 px-2 space-y-0.5 overflow-y-auto">
          {COMM_NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const active = activeSub === item.id;
          return <button key={item.id} onClick={() => setActiveSub(item.id)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-200 group text-xs font-semibold ${active ? 'bg-[#e6f4ed] text-[#0B6B3A]' : 'text-gray-500 hover:bg-[#f0f9f4] hover:text-gray-800'}`}>
                <Icon size={14} className={`shrink-0 ${active ? 'text-[#0B6B3A]' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className="flex-1 truncate leading-tight">{item.label}</span>
                {item.badge && <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[16px] text-center ${item.badgeType === 'alert' ? 'bg-red-500 text-white' : active ? 'bg-[#0B6B3A] text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {item.badge}
                  </span>}
              </button>;
        })}
        </div>
      </nav>

      {/* Mobile sub-nav */}
      <div className="md:hidden w-full border-b border-[#e6f4ed] bg-white px-4 pt-4 pb-0 -mb-6">
        <div className="flex gap-1 overflow-x-auto pb-3">
          {COMM_NAV_ITEMS.map(item => {
          const active = activeSub === item.id;
          return <button key={item.id} onClick={() => setActiveSub(item.id)} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${active ? 'bg-[#0B6B3A] text-white' : 'bg-[#f0f9f4] text-gray-600 hover:text-[#0B6B3A]'}`}>
                {item.label.split(' ')[0]}
              </button>;
        })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 pt-6 pb-10 overflow-y-auto">
        {PAGE_MAP[activeSub]}
      </div>
    </div>;
};