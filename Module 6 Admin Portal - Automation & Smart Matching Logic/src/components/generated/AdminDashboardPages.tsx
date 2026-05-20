import React, { useState } from 'react';
import { Users, UserCheck, BookOpen, AlertTriangle, CheckCircle, Clock, Globe, MapPin, TrendingUp, Award, Heart, BarChart3, Download, Eye, Edit3, Plus, Send, Trash2, ChevronRight, ChevronDown, Check, Search, Filter, Star, Shield, Bell, Settings, FileText, Link2, Video, Upload, X, RefreshCw, Calendar, Zap, Target, MessageSquare, Package } from 'lucide-react';
import { SmartMatchingPage } from './AdminDashboardSmartMatching';
import { AdminCommunicationConsole } from './AdminCommunicationConsole';

// ─── SHARED TYPES ─────────────────────────────────────────────────────────────

type StudentRecord = {
  id: string;
  name: string;
  type: 'Parent' | 'Hub';
  country: string;
  programmes: string[];
  learnerCount: number;
  timeSlot: string;
  status: 'Assigned' | 'Unassigned' | 'Pending';
};
type VolunteerRecord = {
  id: string;
  name: string;
  country: string;
  timezone: string;
  programmes: string[];
  weeklyCommitment: string;
  assignedHours: number;
  availabilityStatus: 'Available' | 'Fully Booked' | 'On Leave';
  engagement: 'Active' | 'Inactive';
};
type ClassRecord = {
  id: string;
  name: string;
  programme: string;
  schedule: string;
  leadVolunteer: string;
  backupVolunteer: string;
  learnerCount: number;
  delivery: 'Virtual' | 'Hub' | 'Hybrid';
  status: 'Active' | 'Pending' | 'Cancelled';
};
type SuggestedClass = {
  id: string;
  programme: string;
  timeSlot: string;
  timezone: string;
  leadVolunteer: string;
  backupVolunteer: string;
  availableLearners: number;
  matchScore: number;
};
type Programme = {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  maxClassSize: number;
  minVolunteers: number;
  sessionDuration: string;
  active: boolean;
};
type EventRecord = {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  time: string;
  type: 'Physical' | 'Hybrid' | 'Virtual';
  volunteersAssigned: number;
  volunteersNeeded: number;
  learnersExpected: number;
  status: 'Upcoming' | 'In Review' | 'Cancelled';
};
type AnnouncementRecord = {
  id: string;
  title: string;
  audience: string;
  sentAt: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
};
type SponsorRecord = {
  id: string;
  name: string;
  organisation: string;
  childrenSponsored: number;
  monthlyAmount: number;
  status: 'Active' | 'Paused' | 'Lapsed';
};
type RoleRecord = {
  id: string;
  role: string;
  users: number;
  permissions: string[];
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const STUDENTS: StudentRecord[] = [{
  id: 's1',
  name: 'Fatima Hassan (Parent)',
  type: 'Parent',
  country: 'Nigeria',
  programmes: ['Hour of AI'],
  learnerCount: 2,
  timeSlot: 'Sat 10 AM',
  status: 'Assigned'
}, {
  id: 's2',
  name: 'Bright Stars Academy',
  type: 'Hub',
  country: 'Ghana',
  programmes: ['Hour of AI', 'Digital Skills'],
  learnerCount: 18,
  timeSlot: 'Sat 11 AM',
  status: 'Assigned'
}, {
  id: 's3',
  name: 'Emmanuel Osei (Parent)',
  type: 'Parent',
  country: 'Ghana',
  programmes: ['Digital Skills for Kids'],
  learnerCount: 1,
  timeSlot: 'Sun 2 PM',
  status: 'Unassigned'
}, {
  id: 's4',
  name: 'Nairobi Community Hub',
  type: 'Hub',
  country: 'Kenya',
  programmes: ['Hour of AI'],
  learnerCount: 24,
  timeSlot: 'Sat 10 AM',
  status: 'Assigned'
}, {
  id: 's5',
  name: 'Amara Diallo (Parent)',
  type: 'Parent',
  country: 'Senegal',
  programmes: ['Basic Maths Literacy'],
  learnerCount: 1,
  timeSlot: 'Sun 3 PM',
  status: 'Pending'
}, {
  id: 's6',
  name: 'Kampala Kids Hub',
  type: 'Hub',
  country: 'Uganda',
  programmes: ['Hour of AI'],
  learnerCount: 15,
  timeSlot: 'Sat 9 AM',
  status: 'Unassigned'
}];
const VOLUNTEERS: VolunteerRecord[] = [{
  id: 'v1',
  name: 'Aisha Kamara',
  country: 'Sierra Leone',
  timezone: 'GMT',
  programmes: ['Hour of AI'],
  weeklyCommitment: '2h',
  assignedHours: 2,
  availabilityStatus: 'Fully Booked',
  engagement: 'Active'
}, {
  id: 'v2',
  name: 'Kofi Mensah',
  country: 'Ghana',
  timezone: 'GMT',
  programmes: ['Digital Skills for Kids', 'Hour of AI'],
  weeklyCommitment: '3h',
  assignedHours: 1,
  availabilityStatus: 'Available',
  engagement: 'Active'
}, {
  id: 'v3',
  name: 'Sarah Okafor',
  country: 'Nigeria',
  timezone: 'WAT',
  programmes: ['Hour of AI'],
  weeklyCommitment: '2h',
  assignedHours: 0,
  availabilityStatus: 'Available',
  engagement: 'Active'
}, {
  id: 'v4',
  name: 'James Mwangi',
  country: 'Kenya',
  timezone: 'EAT',
  programmes: ['Basic Maths Literacy'],
  weeklyCommitment: '1h',
  assignedHours: 1,
  availabilityStatus: 'Fully Booked',
  engagement: 'Active'
}, {
  id: 'v5',
  name: 'Lena Adeyemi',
  country: 'Nigeria',
  timezone: 'WAT',
  programmes: ['Hour of AI', 'Digital Skills for Kids'],
  weeklyCommitment: '4h',
  assignedHours: 1,
  availabilityStatus: 'Available',
  engagement: 'Active'
}, {
  id: 'v6',
  name: 'Tom Ashford',
  country: 'UK',
  timezone: 'BST',
  programmes: ['Hour of AI'],
  weeklyCommitment: '1h',
  assignedHours: 0,
  availabilityStatus: 'Available',
  engagement: 'Inactive'
}];
const ACTIVE_CLASSES: ClassRecord[] = [{
  id: 'cl1',
  name: 'Juniors AI Group A',
  programme: 'Hour of AI',
  schedule: 'Sat 10:00 AM GMT',
  leadVolunteer: 'Aisha Kamara',
  backupVolunteer: 'Kofi Mensah',
  learnerCount: 14,
  delivery: 'Virtual',
  status: 'Active'
}, {
  id: 'cl2',
  name: 'Digital Skills – Nairobi',
  programme: 'Digital Skills for Kids',
  schedule: 'Sat 11:00 AM EAT',
  leadVolunteer: 'James Mwangi',
  backupVolunteer: 'Lena Adeyemi',
  learnerCount: 22,
  delivery: 'Hub',
  status: 'Active'
}, {
  id: 'cl3',
  name: 'Juniors AI Group C',
  programme: 'Hour of AI',
  schedule: 'Sun 2:00 PM WAT',
  leadVolunteer: 'Sarah Okafor',
  backupVolunteer: '— None —',
  learnerCount: 10,
  delivery: 'Virtual',
  status: 'Pending'
}, {
  id: 'cl4',
  name: 'Maths Literacy B',
  programme: 'Basic Maths Literacy',
  schedule: 'Sun 2:00 PM WAT',
  leadVolunteer: 'James Mwangi',
  backupVolunteer: 'Kofi Mensah',
  learnerCount: 18,
  delivery: 'Hybrid',
  status: 'Active'
}];
const SUGGESTED_CLASSES: SuggestedClass[] = [{
  id: 'sg1',
  programme: 'Hour of AI',
  timeSlot: 'Sat 9:00 AM GMT',
  timezone: 'GMT',
  leadVolunteer: 'Sarah Okafor',
  backupVolunteer: 'Lena Adeyemi',
  availableLearners: 15,
  matchScore: 98
}, {
  id: 'sg2',
  programme: 'Digital Skills for Kids',
  timeSlot: 'Sun 3:00 PM WAT',
  timezone: 'WAT',
  leadVolunteer: 'Lena Adeyemi',
  backupVolunteer: 'Kofi Mensah',
  availableLearners: 12,
  matchScore: 91
}, {
  id: 'sg3',
  programme: 'Hour of AI',
  timeSlot: 'Sat 10:00 AM EAT',
  timezone: 'EAT',
  leadVolunteer: 'Kofi Mensah',
  backupVolunteer: 'Tom Ashford',
  availableLearners: 24,
  matchScore: 85
}];
const PROGRAMMES: Programme[] = [{
  id: 'p1',
  name: 'Hour of AI',
  description: 'Intro to AI concepts for young learners.',
  ageGroup: '8–14',
  maxClassSize: 20,
  minVolunteers: 2,
  sessionDuration: '60 min',
  active: true
}, {
  id: 'p2',
  name: 'Digital Skills for Kids',
  description: 'Foundational digital literacy programme.',
  ageGroup: '6–12',
  maxClassSize: 25,
  minVolunteers: 2,
  sessionDuration: '45 min',
  active: true
}, {
  id: 'p3',
  name: 'Basic Maths Literacy',
  description: 'Core numeracy for out-of-school children.',
  ageGroup: '10–16',
  maxClassSize: 18,
  minVolunteers: 2,
  sessionDuration: '60 min',
  active: true
}, {
  id: 'p4',
  name: 'Code Club Junior',
  description: 'Block coding and computational thinking.',
  ageGroup: '7–11',
  maxClassSize: 15,
  minVolunteers: 3,
  sessionDuration: '90 min',
  active: false
}];
const EVENTS: EventRecord[] = [{
  id: 'e1',
  title: 'Hour of AI Open Day',
  location: 'Nairobi Hub',
  country: 'Kenya',
  date: 'Sat, 12 Jul 2025',
  time: '10:00 AM EAT',
  type: 'Hybrid',
  volunteersAssigned: 3,
  volunteersNeeded: 4,
  learnersExpected: 60,
  status: 'Upcoming'
}, {
  id: 'e2',
  title: 'Digital Skills Workshop',
  location: 'Community Centre',
  country: 'Nigeria',
  date: 'Sat, 19 Jul 2025',
  time: '11:00 AM WAT',
  type: 'Physical',
  volunteersAssigned: 3,
  volunteersNeeded: 3,
  learnersExpected: 40,
  status: 'Upcoming'
}, {
  id: 'e3',
  title: 'Code Club Global Open',
  location: 'Virtual',
  country: 'Global',
  date: 'Sat, 26 Jul 2025',
  time: '3:00 PM UTC',
  type: 'Virtual',
  volunteersAssigned: 5,
  volunteersNeeded: 8,
  learnersExpected: 200,
  status: 'Upcoming'
}, {
  id: 'e4',
  title: 'Community Day – Accra',
  location: 'Accra Hub',
  country: 'Ghana',
  date: 'Sat, 2 Aug 2025',
  time: '9:00 AM GMT',
  type: 'Physical',
  volunteersAssigned: 2,
  volunteersNeeded: 5,
  learnersExpected: 80,
  status: 'In Review'
}];
const ANNOUNCEMENTS: AnnouncementRecord[] = [{
  id: 'a1',
  title: 'New safeguarding module now live',
  audience: 'All Volunteers',
  sentAt: '2 days ago',
  status: 'Sent'
}, {
  id: 'a2',
  title: 'July schedule updates',
  audience: 'All Users',
  sentAt: '5 days ago',
  status: 'Sent'
}, {
  id: 'a3',
  title: 'Welcome to new hubs in Uganda',
  audience: 'Hubs',
  sentAt: 'Scheduled: 20 Jul',
  status: 'Scheduled'
}];
const SPONSORS: SponsorRecord[] = [{
  id: 'sp1',
  name: 'Chidi Eze',
  organisation: 'Eze Consulting',
  childrenSponsored: 3,
  monthlyAmount: 45,
  status: 'Active'
}, {
  id: 'sp2',
  name: 'Amara Trust Fund',
  organisation: 'Non-Profit',
  childrenSponsored: 10,
  monthlyAmount: 150,
  status: 'Active'
}, {
  id: 'sp3',
  name: 'Grace Addo',
  organisation: 'Individual',
  childrenSponsored: 1,
  monthlyAmount: 15,
  status: 'Paused'
}, {
  id: 'sp4',
  name: 'TechForAll UK',
  organisation: 'Corporate',
  childrenSponsored: 20,
  monthlyAmount: 300,
  status: 'Active'
}];
const ROLES: RoleRecord[] = [{
  id: 'r1',
  role: 'Super Admin',
  users: 1,
  permissions: ['All permissions']
}, {
  id: 'r2',
  role: 'Admin',
  users: 2,
  permissions: ['Manage classes', 'Manage users', 'View reports']
}, {
  id: 'r3',
  role: 'Enrolment Officer',
  users: 3,
  permissions: ['Manage students', 'Assign to classes']
}, {
  id: 'r4',
  role: 'Volunteer Coordinator',
  users: 2,
  permissions: ['Manage volunteers', 'Assign to classes']
}, {
  id: 'r5',
  role: 'Support Staff',
  users: 4,
  permissions: ['View queries', 'Send messages']
}];
const TIMELINE_DATA = [{
  month: 'Jan',
  sessions: 18,
  volunteers: 24
}, {
  month: 'Feb',
  sessions: 22,
  volunteers: 26
}, {
  month: 'Mar',
  sessions: 28,
  volunteers: 31
}, {
  month: 'Apr',
  sessions: 32,
  volunteers: 35
}, {
  month: 'May',
  sessions: 36,
  volunteers: 38
}, {
  month: 'Jun',
  sessions: 41,
  volunteers: 42
}, {
  month: 'Jul',
  sessions: 30,
  volunteers: 40
}];
const PROGRAMME_STATS = [{
  name: 'Hour of AI',
  classes: 8,
  learners: 142,
  color: '#0B6B3A'
}, {
  name: 'Digital Skills',
  classes: 5,
  learners: 88,
  color: '#22a860'
}, {
  name: 'Maths Literacy',
  classes: 4,
  learners: 72,
  color: '#138a4c'
}, {
  name: 'Code Club Jr.',
  classes: 2,
  learners: 30,
  color: '#6dd49a'
}];
const COUNTRIES_DATA = [{
  country: 'Nigeria',
  learners: 112,
  flag: '🇳🇬'
}, {
  country: 'Kenya',
  learners: 87,
  flag: '🇰🇪'
}, {
  country: 'Ghana',
  learners: 74,
  flag: '🇬🇭'
}, {
  country: 'Uganda',
  learners: 45,
  flag: '🇺🇬'
}, {
  country: 'Sierra Leone',
  learners: 31,
  flag: '🇸🇱'
}, {
  country: 'Senegal',
  learners: 23,
  flag: '🇸🇳'
}];

// ─── SHARED MICRO COMPONENTS ──────────────────────────────────────────────────

type BadgeVariant = 'green' | 'amber' | 'blue' | 'red' | 'gray' | 'purple';
const Badge = ({
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
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls[variant]}`}>
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
const AlertItem = ({
  msg,
  type,
  action
}: {
  msg: string;
  type: 'red' | 'amber' | 'blue';
  action?: string;
}) => {
  const bg = type === 'red' ? 'bg-red-50 border-red-100' : type === 'amber' ? 'bg-amber-50 border-amber-100' : 'bg-blue-50 border-blue-100';
  const ic = type === 'red' ? 'text-red-500' : type === 'amber' ? 'text-amber-500' : 'text-blue-500';
  return <div className={`flex items-center gap-3 p-3.5 rounded-xl border ${bg}`}>
      <AlertTriangle size={14} className={`${ic} shrink-0`} />
      <p className="text-xs text-gray-700 flex-1 leading-snug">{msg}</p>
      {action && <button className="text-xs font-bold text-[#0B6B3A] hover:underline shrink-0 whitespace-nowrap">{action}</button>}
    </div>;
};

// ─── PAGE 1: OVERVIEW ─────────────────────────────────────────────────────────

const OverviewPage = ({
  onNavigate
}: {
  onNavigate: (p: AdminPageId) => void;
}) => {
  const topStats = [{
    label: 'Total Students',
    value: '332',
    icon: Users,
    color: 'green' as const,
    sub: '+12 this week'
  }, {
    label: 'Active Volunteers',
    value: '40',
    icon: UserCheck,
    color: 'green' as const,
    sub: '5 unassigned'
  }, {
    label: 'Active Classes',
    value: '17',
    icon: BookOpen,
    color: 'green' as const,
    sub: '3 pending'
  }, {
    label: 'Countries Reached',
    value: '12',
    icon: Globe,
    color: 'blue' as const,
    sub: 'Across 4 regions'
  }, {
    label: 'Community Hubs',
    value: '9',
    icon: MapPin,
    color: 'green' as const,
    sub: '2 new this month'
  }, {
    label: 'Sponsored Children',
    value: '87',
    icon: Heart,
    color: 'green' as const,
    sub: 'Via Street2School'
  }];
  const attentionStats = [{
    label: 'Classes Needing Volunteers',
    value: '3',
    icon: AlertTriangle,
    color: 'red' as const
  }, {
    label: 'Volunteers Without Assignment',
    value: '5',
    icon: UserCheck,
    color: 'amber' as const
  }, {
    label: 'Sessions in Next 48h',
    value: '6',
    icon: Clock,
    color: 'blue' as const
  }];
  const alerts = [{
    msg: 'Juniors AI Group C has no backup volunteer',
    type: 'red' as const,
    action: 'Assign Now'
  }, {
    msg: '3 new student registrations pending review',
    type: 'amber' as const,
    action: 'Review'
  }, {
    msg: 'Tom Ashford has been inactive for 3 weeks',
    type: 'amber' as const,
    action: 'Contact'
  }, {
    msg: '2 volunteer absence requests need approval',
    type: 'amber' as const,
    action: 'Approve'
  }, {
    msg: 'Kampala Kids Hub has 15 unassigned learners',
    type: 'red' as const,
    action: 'Assign'
  }, {
    msg: 'Monthly impact report generated',
    type: 'blue' as const,
    action: 'Download'
  }];
  return <div className="space-y-7">
      <PageHeading label="Mission Control" title="Dashboard Overview" sub="Real-time snapshot of your global education programme." />

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {topStats.map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} sub={s.sub} />)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {attentionStats.map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Panel */}
        <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" />
            <span>Attention Required</span>
          </h3>
          <div className="space-y-2.5">
            {alerts.map((a, i) => <AlertItem key={i} msg={a.msg} type={a.type} action={a.action} />)}
          </div>
        </div>

        {/* Countries at a Glance */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Globe size={16} className="text-[#0B6B3A]" />
            <span>Countries Reached</span>
          </h3>
          <div className="space-y-3">
            {COUNTRIES_DATA.map(c => <div key={c.country} className="flex items-center gap-3">
                <span className="text-base leading-none">{c.flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">{c.country}</span>
                    <span className="font-bold text-[#0B6B3A]">{c.learners}</span>
                  </div>
                  <div className="h-1.5 bg-[#e6f4ed] rounded-full">
                    <div className="h-1.5 bg-[#0B6B3A] rounded-full" style={{
                  width: `${c.learners / 120 * 100}%`
                }} />
                  </div>
                </div>
              </div>)}
          </div>
          <button onClick={() => onNavigate('reports')} className="mt-5 w-full py-2.5 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-xs font-bold hover:bg-[#e6f4ed] transition-colors">
            View Full Report
          </button>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={16} className="text-[#0B6B3A]" />
          <span>Upcoming Sessions (Next 48h)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0f4f2]">
                <th className="text-left text-xs font-bold text-gray-500 pb-3 pr-4">Class</th>
                <th className="text-left text-xs font-bold text-gray-500 pb-3 pr-4">Programme</th>
                <th className="text-left text-xs font-bold text-gray-500 pb-3 pr-4">Schedule</th>
                <th className="text-left text-xs font-bold text-gray-500 pb-3 pr-4">Lead Volunteer</th>
                <th className="text-left text-xs font-bold text-gray-500 pb-3 pr-4">Learners</th>
                <th className="text-left text-xs font-bold text-gray-500 pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {ACTIVE_CLASSES.map(cls => <tr key={cls.id} className="hover:bg-[#fafcfa] transition-colors">
                  <td className="py-3 pr-4 font-semibold text-gray-900">{cls.name}</td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{cls.programme}</td>
                  <td className="py-3 pr-4 text-gray-500 text-xs">{cls.schedule}</td>
                  <td className="py-3 pr-4 text-gray-600 text-xs">{cls.leadVolunteer}</td>
                  <td className="py-3 pr-4 text-gray-700 font-bold text-xs">{cls.learnerCount}</td>
                  <td className="py-3">
                    <Badge variant={cls.status === 'Active' ? 'green' : cls.status === 'Pending' ? 'amber' : 'red'}>
                      {cls.status}
                    </Badge>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── PAGE 2: STUDENTS & HUBS ──────────────────────────────────────────────────

const StudentsPage = () => {
  const [tab, setTab] = useState<'parents' | 'hubs'>('parents');
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const filtered = STUDENTS.filter(s => {
    const matchType = tab === 'parents' ? s.type === 'Parent' : s.type === 'Hub';
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;
    return matchType && matchSearch && matchStatus;
  });
  if (selectedStudent) {
    return <div className="space-y-6">
        <button onClick={() => setSelectedStudent(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" />
          <span>Back to Students & Hubs</span>
        </button>
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <h2 className="text-xl font-black text-gray-900">{selectedStudent.name}</h2>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5"><MapPin size={12} />{selectedStudent.country}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant={selectedStudent.type === 'Hub' ? 'blue' : 'purple'}>{selectedStudent.type}</Badge>
              <Badge variant={selectedStudent.status === 'Assigned' ? 'green' : selectedStudent.status === 'Pending' ? 'amber' : 'red'}>{selectedStudent.status}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[{
            label: 'Learners',
            value: String(selectedStudent.learnerCount)
          }, {
            label: 'Programme(s)',
            value: selectedStudent.programmes.join(', ')
          }, {
            label: 'Preferred Time',
            value: selectedStudent.timeSlot
          }, {
            label: 'Sponsorship',
            value: 'Not Sponsored'
          }].map(stat => <div key={stat.label} className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{stat.value}</p>
              </div>)}
          </div>
          <div className="flex flex-wrap gap-3">
            {['Assign to Class', 'Edit Details', 'Apply Sponsorship', 'Remove'].map(action => <button key={action} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${action === 'Assign to Class' ? 'bg-[#0B6B3A] text-white hover:bg-[#095e32]' : action === 'Remove' ? 'border border-red-200 text-red-500 hover:bg-red-50' : 'border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
                {action}
              </button>)}
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading label="Enrolment Management" title="Students & Hubs" sub="Manage parent registrations and community hub enrolments." />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex bg-[#f0f9f4] border border-[#d1e8db] rounded-xl p-1 gap-1">
          <button onClick={() => setTab('parents')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'parents' ? 'bg-white text-[#0B6B3A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            Parents & Individual
          </button>
          <button onClick={() => setTab('hubs')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === 'hubs' ? 'bg-white text-[#0B6B3A] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            Community Hubs
          </button>
        </div>
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#d1e8db] rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name…" className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder-gray-400" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'Assigned', 'Unassigned', 'Pending'].map(s => <option key={s}>{s}</option>)}
        </select>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={14} /><span>Add New</span>
        </button>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Name', 'Country', 'Programme(s)', 'Learners', 'Preferred Slot', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {filtered.map(s => <tr key={s.id} className="hover:bg-[#fafcfa] transition-colors">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{s.name}</p>
                      <Badge variant={s.type === 'Hub' ? 'blue' : 'purple'}>{s.type}</Badge>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600">{s.country}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {s.programmes.map(p => <Badge key={p} variant="gray">{p}</Badge>)}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{s.learnerCount}</td>
                  <td className="px-4 py-3.5 text-sm text-gray-500">{s.timeSlot}</td>
                  <td className="px-4 py-3.5">
                    <Badge variant={s.status === 'Assigned' ? 'green' : s.status === 'Pending' ? 'amber' : 'red'}>
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedStudent(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Remove">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">
            <Users size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No records found</p>
          </div>}
      </div>
    </div>;
};

// ─── PAGE 3: VOLUNTEERS ───────────────────────────────────────────────────────

const VolunteersPage = () => {
  const [search, setSearch] = useState('');
  const [filterAvail, setFilterAvail] = useState('All');
  const [selectedVol, setSelectedVol] = useState<VolunteerRecord | null>(null);
  const filtered = VOLUNTEERS.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchAvail = filterAvail === 'All' || v.availabilityStatus === filterAvail;
    return matchSearch && matchAvail;
  });
  if (selectedVol) {
    const overbooked = selectedVol.assignedHours > parseInt(selectedVol.weeklyCommitment);
    const unassigned = selectedVol.assignedHours === 0;
    return <div className="space-y-6">
        <button onClick={() => setSelectedVol(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" /><span>Back to Volunteers</span>
        </button>
        <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">🧑‍💻</div>
            <div>
              <h2 className="text-white font-black text-xl">{selectedVol.name}</h2>
              <p className="text-white/70 text-sm">{selectedVol.country} · {selectedVol.timezone}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant={selectedVol.engagement === 'Active' ? 'green' : 'gray'}>{selectedVol.engagement}</Badge>
                <Badge variant={selectedVol.availabilityStatus === 'Available' ? 'green' : selectedVol.availabilityStatus === 'Fully Booked' ? 'amber' : 'red'}>
                  {selectedVol.availabilityStatus}
                </Badge>
                {overbooked && <Badge variant="red">Overbooked</Badge>}
                {unassigned && <Badge variant="amber">No Assignment</Badge>}
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{
            label: 'Weekly Commitment',
            value: selectedVol.weeklyCommitment
          }, {
            label: 'Assigned Hours',
            value: `${selectedVol.assignedHours}h`
          }, {
            label: 'Programmes',
            value: selectedVol.programmes.join(', ')
          }, {
            label: 'Timezone',
            value: selectedVol.timezone
          }].map(s => <div key={s.label} className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-500 font-medium">{s.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{s.value}</p>
              </div>)}
          </div>
          <div className="px-6 pb-6 flex flex-wrap gap-3">
            {['Assign to Class', 'Send Message', 'Approve Absence', 'Deactivate'].map(action => <button key={action} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${action === 'Assign to Class' ? 'bg-[#0B6B3A] text-white hover:bg-[#095e32]' : action === 'Deactivate' ? 'border border-red-200 text-red-500 hover:bg-red-50' : 'border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
                {action}
              </button>)}
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading label="Volunteer Management" title="Volunteers" sub="View, assign, and manage your global volunteer network." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: 'Total Volunteers',
        value: VOLUNTEERS.length,
        color: 'green' as const,
        icon: UserCheck
      }, {
        label: 'Available',
        value: VOLUNTEERS.filter(v => v.availabilityStatus === 'Available').length,
        color: 'green' as const,
        icon: CheckCircle
      }, {
        label: 'Unassigned',
        value: VOLUNTEERS.filter(v => v.assignedHours === 0).length,
        color: 'amber' as const,
        icon: AlertTriangle
      }, {
        label: 'Inactive',
        value: VOLUNTEERS.filter(v => v.engagement === 'Inactive').length,
        color: 'red' as const,
        icon: AlertTriangle
      }].map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} />)}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-[#d1e8db] rounded-xl px-3 py-2">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteers…" className="text-sm text-gray-700 bg-transparent outline-none w-full placeholder-gray-400" />
        </div>
        <select value={filterAvail} onChange={e => setFilterAvail(e.target.value)} className="border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
          {['All', 'Available', 'Fully Booked', 'On Leave'].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Volunteer', 'Country / TZ', 'Programmes', 'Commitment', 'Assigned', 'Availability', 'Engagement', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {filtered.map(v => {
              const overbooked = v.assignedHours > parseInt(v.weeklyCommitment);
              const unassigned = v.assignedHours === 0;
              return <tr key={v.id} className={`hover:bg-[#fafcfa] transition-colors ${unassigned ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-sm shrink-0">
                          🧑‍💻
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{v.name}</p>
                          {overbooked && <Badge variant="red">Overbooked</Badge>}
                          {unassigned && <Badge variant="amber">Unassigned</Badge>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{v.country}<br />{v.timezone}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {v.programmes.map(p => <Badge key={p} variant="gray">{p.split(' ').slice(0, 2).join(' ')}</Badge>)}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{v.weeklyCommitment}</td>
                    <td className="px-4 py-3.5 text-sm font-bold text-[#0B6B3A]">{v.assignedHours}h</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={v.availabilityStatus === 'Available' ? 'green' : v.availabilityStatus === 'Fully Booked' ? 'amber' : 'red'}>
                        {v.availabilityStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={v.engagement === 'Active' ? 'green' : 'gray'}>{v.engagement}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedVol(v)} className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors">
                          <Eye size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <MessageSquare size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── PAGE 4: CLASS MANAGEMENT ─────────────────────────────────────────────────

const ClassManagementPage = () => {
  const [section, setSection] = useState<'suggested' | 'active' | 'create'>('suggested');
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [rejected, setRejected] = useState<Set<string>>(new Set());
  const [newClass, setNewClass] = useState({
    programme: '',
    timeSlot: '',
    timezone: '',
    lead: '',
    backup: '',
    delivery: ''
  });
  const [classCreated, setClassCreated] = useState(false);
  const sections = [{
    id: 'suggested',
    label: 'Auto-Suggested Classes',
    badge: SUGGESTED_CLASSES.length
  }, {
    id: 'active',
    label: 'Active Classes',
    badge: ACTIVE_CLASSES.length
  }, {
    id: 'create',
    label: 'Create Class',
    badge: null
  }] as const;
  return <div className="space-y-6">
      <PageHeading label="Core Feature" title="Class Management" sub="Approve suggestions, manage active classes, and create new ones." />

      <div className="flex gap-2 flex-wrap">
        {sections.map(s => <button key={s.id} onClick={() => setSection(s.id)} className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${section === s.id ? 'bg-[#0B6B3A] text-white shadow-sm' : 'bg-white border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
            <span>{s.label}</span>
            {s.badge !== null && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${section === s.id ? 'bg-white/25' : 'bg-[#0B6B3A]/10 text-[#0B6B3A]'}`}>
                {s.badge}
              </span>}
          </button>)}
      </div>

      {section === 'suggested' && <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-3">
            <Zap size={16} className="text-blue-500 shrink-0" />
            <p className="text-sm text-blue-700 font-medium">
              <strong>System-generated suggestions</strong> based on volunteer availability, programme matching, and learner demand.
            </p>
          </div>
          {SUGGESTED_CLASSES.map(sg => {
        const isApproved = approved.has(sg.id);
        const isRejected = rejected.has(sg.id);
        return <div key={sg.id} className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${isApproved ? 'border-[#0B6B3A]/40 bg-[#f7fbf9]' : isRejected ? 'border-red-200 opacity-50' : 'border-[#d1e8db] hover:shadow-md'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Programme</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{sg.programme}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Time Slot</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">{sg.timeSlot} <span className="text-gray-400">({sg.timezone})</span></p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Volunteers</p>
                      <p className="text-sm font-semibold text-gray-700 mt-0.5">{sg.leadVolunteer} <span className="text-gray-400">/</span> {sg.backupVolunteer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">Learners Available</p>
                      <p className="text-2xl font-black text-[#0B6B3A] leading-none mt-0.5">{sg.availableLearners}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">Match</span>
                      <span className={`text-sm font-black ${sg.matchScore >= 95 ? 'text-[#0B6B3A]' : sg.matchScore >= 85 ? 'text-amber-600' : 'text-red-500'}`}>
                        {sg.matchScore}%
                      </span>
                    </div>
                    {!isApproved && !isRejected && <div className="flex gap-2">
                        <button onClick={() => setRejected(prev => {
                  const n = new Set(prev);
                  n.add(sg.id);
                  return n;
                })} className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors">
                          Reject
                        </button>
                        <button onClick={() => setApproved(prev => {
                  const n = new Set(prev);
                  n.add(sg.id);
                  return n;
                })} className="px-3 py-1.5 rounded-lg bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                          Approve Class
                        </button>
                      </div>}
                    {isApproved && <Badge variant="green"><Check size={10} className="mr-1" />Approved</Badge>}
                    {isRejected && <Badge variant="red"><X size={10} className="mr-1" />Rejected</Badge>}
                  </div>
                </div>
              </div>;
      })}
        </div>}

      {section === 'active' && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
                <tr>
                  {['Class Name', 'Programme', 'Schedule', 'Lead / Backup', 'Learners', 'Delivery', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8fbf9]">
                {ACTIVE_CLASSES.map(cls => <tr key={cls.id} className={`hover:bg-[#fafcfa] transition-colors ${cls.backupVolunteer === '— None —' ? 'bg-red-50/40' : ''}`}>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">{cls.name}</p>
                      {cls.backupVolunteer === '— None —' && <Badge variant="red">Missing Backup</Badge>}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{cls.programme}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{cls.schedule}</td>
                    <td className="px-4 py-3.5 text-xs">
                      <p className="font-semibold text-gray-700">{cls.leadVolunteer}</p>
                      <p className={cls.backupVolunteer === '— None —' ? 'text-red-400' : 'text-gray-400'}>{cls.backupVolunteer}</p>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{cls.learnerCount}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={cls.delivery === 'Virtual' ? 'blue' : cls.delivery === 'Hub' ? 'green' : 'amber'}>{cls.delivery}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={cls.status === 'Active' ? 'green' : cls.status === 'Pending' ? 'amber' : 'red'}>{cls.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors" title="View"><Eye size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors" title="Edit"><Edit3 size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Reassign"><RefreshCw size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Cancel"><X size={14} /></button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}

      {section === 'create' && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm max-w-2xl">
          <h3 className="font-bold text-gray-900 mb-1">Create Class Manually</h3>
          <p className="text-xs text-gray-500 mb-5">System will validate volunteer availability and prevent double-booking.</p>
          {classCreated ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Class created successfully and volunteers have been notified.</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{
          key: 'programme',
          label: 'Programme',
          options: ['Hour of AI', 'Digital Skills for Kids', 'Basic Maths Literacy', 'Code Club Junior']
        }, {
          key: 'delivery',
          label: 'Delivery Mode',
          options: ['Virtual', 'Hub', 'Hybrid']
        }, {
          key: 'timeSlot',
          label: 'Time Slot',
          options: ['Sat 9:00 AM', 'Sat 10:00 AM', 'Sat 11:00 AM', 'Sun 2:00 PM', 'Sun 3:00 PM']
        }, {
          key: 'timezone',
          label: 'Time Zone',
          options: ['GMT', 'WAT', 'EAT', 'BST', 'EST']
        }, {
          key: 'lead',
          label: 'Lead Volunteer',
          options: VOLUNTEERS.filter(v => v.availabilityStatus === 'Available').map(v => v.name)
        }, {
          key: 'backup',
          label: 'Backup Volunteer',
          options: VOLUNTEERS.filter(v => v.availabilityStatus === 'Available').map(v => v.name)
        }].map(field => <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <select value={newClass[field.key as keyof typeof newClass]} onChange={e => setNewClass(p => ({
            ...p,
            [field.key]: e.target.value
          }))} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                    <option value="">Select…</option>
                    {field.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>)}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Safety info</label>
                <span className="text-sm font-semibold text-gray-900">for learners</span>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setClassCreated(true)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                  <Plus size={14} /><span>Create Class</span>
                </button>
              </div>
            </div>}
        </div>}
    </div>;
};

// ─── PAGE 5: PROGRAMME MANAGEMENT ────────────────────────────────────────────

const ProgrammesPage = () => {
  const [programmes, setProgrammes] = useState<Programme[]>(PROGRAMMES);
  const [showForm, setShowForm] = useState(false);
  const [newProg, setNewProg] = useState({
    name: '',
    description: '',
    ageGroup: '',
    maxClassSize: '',
    minVolunteers: '',
    sessionDuration: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const toggleActive = (id: string) => {
    setProgrammes(prev => prev.map(p => p.id === id ? {
      ...p,
      active: !p.active
    } : p));
  };
  return <div className="space-y-6">
      <PageHeading label="Content Management" title="Programme Management" sub="Create and manage the educational programmes on your platform." />

      <div className="flex justify-end">
        <button onClick={() => setShowForm(v => !v)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={14} /><span>New Programme</span>
        </button>
      </div>

      {showForm && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Create New Programme</h3>
          {submitted ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Programme created and saved.</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{
          key: 'name',
          label: 'Programme Name',
          placeholder: 'e.g. Hour of AI'
        }, {
          key: 'ageGroup',
          label: 'Age Group',
          placeholder: 'e.g. 8–14'
        }, {
          key: 'maxClassSize',
          label: 'Max Class Size',
          placeholder: 'e.g. 20'
        }, {
          key: 'minVolunteers',
          label: 'Min Volunteers',
          placeholder: 'e.g. 2'
        }, {
          key: 'sessionDuration',
          label: 'Session Duration',
          placeholder: 'e.g. 60 min'
        }].map(field => <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <input value={newProg[field.key as keyof typeof newProg]} onChange={e => setNewProg(p => ({
            ...p,
            [field.key]: e.target.value
          }))} placeholder={field.placeholder} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
                </div>)}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                <textarea value={newProg.description} onChange={e => setNewProg(p => ({
            ...p,
            description: e.target.value
          }))} rows={3} placeholder="Brief programme description…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setSubmitted(true)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                  Save Programme
                </button>
              </div>
            </div>}
        </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
        {programmes.map(prog => <div key={prog.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${prog.active ? 'border-[#d1e8db]' : 'border-gray-200 opacity-70'}`}>
            <div className={`p-4 flex items-center justify-between ${prog.active ? 'bg-gradient-to-r from-[#0B6B3A] to-[#22a860]' : 'bg-gray-400'}`}>
              <div>
                <p className="text-white font-bold">{prog.name}</p>
                <p className="text-white/70 text-xs mt-0.5">Ages {prog.ageGroup} · {prog.sessionDuration}</p>
              </div>
              <button onClick={() => toggleActive(prog.id)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${prog.active ? 'border-white/30 text-white hover:bg-white/20' : 'border-white/30 text-white hover:bg-black/20'}`}>
                {prog.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">{prog.description}</p>
              <div className="grid grid-cols-3 gap-3">
                {[{
              label: 'Max Class',
              value: prog.maxClassSize
            }, {
              label: 'Min Volunteers',
              value: prog.minVolunteers
            }, {
              label: 'Duration',
              value: prog.sessionDuration
            }].map(s => <div key={s.label} className="bg-[#f7fbf9] rounded-xl p-3 text-center">
                    <p className="text-base font-black text-[#0B6B3A]">{s.value}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
                  </div>)}
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[#f0f4f2]">
                <button className="flex-1 py-2 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-xs font-bold hover:bg-[#e6f4ed] transition-colors">
                  Edit
                </button>
                <button className="flex-1 py-2 rounded-xl border border-[#d1e8db] text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                  <Upload size={11} /><span>Add Materials</span>
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── PAGE 6: EVENTS ───────────────────────────────────────────────────────────

const EventsPage = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [created, setCreated] = useState(false);
  return <div className="space-y-6">
      <PageHeading label="Events Management" title="Events" sub="Manage physical, virtual, and hybrid community sessions." />

      <div className="flex justify-end">
        <button onClick={() => setShowCreate(v => !v)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={14} /><span>Create Event</span>
        </button>
      </div>

      {showCreate && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm max-w-2xl">
          <h3 className="font-bold text-gray-900 mb-5">Create New Event</h3>
          {created ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Event created successfully.</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{
          label: 'Event Title',
          placeholder: 'e.g. Hour of AI Open Day'
        }, {
          label: 'Location',
          placeholder: 'City or "Virtual"'
        }, {
          label: 'Country',
          placeholder: 'e.g. Kenya'
        }, {
          label: 'Date',
          placeholder: 'e.g. Sat, 12 Jul 2025'
        }, {
          label: 'Time',
          placeholder: 'e.g. 10:00 AM EAT'
        }, {
          label: 'Type',
          placeholder: 'Physical / Virtual / Hybrid'
        }].map(field => <div key={field.label}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <input placeholder={field.placeholder} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
                </div>)}
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setCreated(true)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                  Save Event
                </button>
              </div>
            </div>}
        </div>}

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                {['Event', 'Location / Country', 'Date & Time', 'Type', 'Volunteers', 'Learners', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {EVENTS.map(ev => {
              const needsVols = ev.volunteersAssigned < ev.volunteersNeeded;
              return <tr key={ev.id} className={`hover:bg-[#fafcfa] transition-colors ${needsVols ? 'bg-amber-50/30' : ''}`}>
                    <td className="px-4 py-3.5">
                      <p className="text-sm font-semibold text-gray-900">{ev.title}</p>
                      {needsVols && <Badge variant="amber">Needs {ev.volunteersNeeded - ev.volunteersAssigned} more</Badge>}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-gray-500">{ev.location}<br />{ev.country}</td>
                    <td className="px-4 py-3.5 text-xs text-gray-600">{ev.date}<br />{ev.time}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={ev.type === 'Virtual' ? 'blue' : ev.type === 'Physical' ? 'amber' : 'green'}>{ev.type}</Badge>
                    </td>
                    <td className="px-4 py-3.5 text-xs">
                      <span className={`font-bold ${needsVols ? 'text-amber-600' : 'text-[#0B6B3A]'}`}>{ev.volunteersAssigned}</span>
                      <span className="text-gray-400">/{ev.volunteersNeeded}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm font-bold text-gray-900">{ev.learnersExpected}</td>
                    <td className="px-4 py-3.5">
                      <Badge variant={ev.status === 'Upcoming' ? 'green' : ev.status === 'In Review' ? 'amber' : 'red'}>{ev.status}</Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors"><Eye size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"><X size={14} /></button>
                      </div>
                    </td>
                  </tr>;
            })}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};

// ─── PAGE 7: COMMUNICATIONS ───────────────────────────────────────────────────

const CommunicationsPage = () => {
  return <AdminCommunicationConsole />;
};

// ─── PAGE 8: SPONSORSHIP ──────────────────────────────────────────────────────

const SponsorshipPage = () => {
  const [monthlyAmount, setMonthlyAmount] = useState('15');
  const [paymentLink, setPaymentLink] = useState('https://donate.nurtureroots.org');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const totalSponsored = SPONSORS.reduce((acc, s) => acc + s.childrenSponsored, 0);
  const totalRevenue = SPONSORS.filter(s => s.status === 'Active').reduce((acc, s) => acc + s.monthlyAmount, 0);
  return <div className="space-y-6">
      <PageHeading label="Street2School" title="Sponsorship Management" sub="Track and manage child sponsorship through the Street2School initiative." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: 'Active Sponsors',
        value: SPONSORS.filter(s => s.status === 'Active').length,
        icon: Heart,
        color: 'green' as const
      }, {
        label: 'Children Sponsored',
        value: totalSponsored,
        icon: Users,
        color: 'green' as const
      }, {
        label: 'Monthly Revenue',
        value: `$${totalRevenue}`,
        icon: TrendingUp,
        color: 'blue' as const
      }, {
        label: 'Lapsed Sponsors',
        value: SPONSORS.filter(s => s.status === 'Lapsed').length,
        icon: AlertTriangle,
        color: 'amber' as const
      }].map(s => <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} color={s.color} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Sponsors</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-[#f0f4f2]">
                <tr>
                  {['Sponsor', 'Organisation', 'Children', 'Monthly', 'Status', 'Actions'].map(h => <th key={h} className="text-left text-xs font-bold text-gray-500 pb-3 pr-4 whitespace-nowrap">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8fbf9]">
                {SPONSORS.map(sp => <tr key={sp.id} className="hover:bg-[#fafcfa] transition-colors">
                    <td className="py-3.5 pr-4 text-sm font-semibold text-gray-900">{sp.name}</td>
                    <td className="py-3.5 pr-4 text-xs text-gray-500">{sp.organisation}</td>
                    <td className="py-3.5 pr-4 text-sm font-bold text-[#0B6B3A]">{sp.childrenSponsored}</td>
                    <td className="py-3.5 pr-4 text-sm font-semibold text-gray-700">${sp.monthlyAmount}</td>
                    <td className="py-3.5 pr-4">
                      <Badge variant={sp.status === 'Active' ? 'green' : sp.status === 'Paused' ? 'amber' : 'red'}>{sp.status}</Badge>
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors"><Eye size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit3 size={14} /></button>
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#0B6B3A] hover:bg-[#e6f4ed] transition-colors"><Upload size={14} /></button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Sponsorship Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Monthly Sponsorship Amount ($)</label>
              <input value={monthlyAmount} onChange={e => setMonthlyAmount(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Payment Link</label>
              <input value={paymentLink} onChange={e => setPaymentLink(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            </div>
            {settingsSaved ? <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl">
                <CheckCircle size={15} className="text-[#0B6B3A]" />
                <span className="text-xs font-semibold text-[#0B6B3A]">Settings saved</span>
              </div> : <button onClick={() => setSettingsSaved(true)} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                Save Settings
              </button>}
          </div>
        </div>
      </div>
    </div>;
};

// ─── PAGE 9: REPORTS & IMPACT ─────────────────────────────────────────────────

const ReportsPage = () => {
  const maxSessions = Math.max(...TIMELINE_DATA.map(d => d.sessions));
  return <div className="space-y-6">
      <PageHeading label="Analytics" title="Reports & Impact" sub="Measure the reach and effectiveness of your programmes." />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {[{
        label: 'Total Learning Hours',
        value: '648h',
        icon: Clock
      }, {
        label: 'Sessions Delivered',
        value: '186',
        icon: BookOpen
      }, {
        label: 'Total Students',
        value: '332',
        icon: Users
      }, {
        label: 'Total Volunteers',
        value: '40',
        icon: UserCheck
      }, {
        label: 'Countries',
        value: '12',
        icon: Globe
      }, {
        label: 'Hubs',
        value: '9',
        icon: MapPin
      }, {
        label: 'Sponsored',
        value: '87',
        icon: Heart
      }].map(s => {
        const Icon = s.icon;
        return <div key={s.label} className="bg-white border border-[#d1e8db] rounded-2xl p-4 shadow-sm text-center">
              <div className="w-8 h-8 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={14} className="text-[#0B6B3A]" />
              </div>
              <p className="text-xl font-black text-[#0B6B3A]">{s.value}</p>
              <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{s.label}</p>
            </div>;
      })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Over Time */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Sessions Over Time</h3>
          <div className="flex items-end gap-2 h-32">
            {TIMELINE_DATA.map(d => <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#0B6B3A]">{d.sessions}</span>
                <div className="w-full bg-[#0B6B3A] rounded-t-lg transition-all" style={{
              height: `${d.sessions / maxSessions * 100}px`
            }} />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>)}
          </div>
        </div>

        {/* Programme Popularity */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Programme Reach</h3>
          <div className="space-y-4">
            {PROGRAMME_STATS.map(p => <div key={p.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-gray-700">{p.name}</span>
                  <div className="flex gap-3 text-gray-500">
                    <span>{p.classes} classes</span>
                    <span className="font-bold text-[#0B6B3A]">{p.learners} learners</span>
                  </div>
                </div>
                <div className="h-2.5 bg-[#e6f4ed] rounded-full">
                  <div className="h-2.5 bg-[#0B6B3A] rounded-full" style={{
                width: `${p.learners / 150 * 100}%`,
                backgroundColor: p.color
              }} />
                </div>
              </div>)}
          </div>
        </div>

        {/* Countries breakdown */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Countries Breakdown</h3>
          <div className="space-y-3">
            {COUNTRIES_DATA.map(c => <div key={c.country} className="flex items-center gap-3">
                <span className="text-lg leading-none shrink-0">{c.flag}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">{c.country}</span>
                    <span className="font-bold text-[#0B6B3A]">{c.learners} learners</span>
                  </div>
                  <div className="h-1.5 bg-[#e6f4ed] rounded-full">
                    <div className="h-1.5 bg-[#0B6B3A] rounded-full" style={{
                  width: `${c.learners / 120 * 100}%`
                }} />
                  </div>
                </div>
              </div>)}
          </div>
        </div>

        {/* Volunteer Engagement */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Volunteer Engagement</h3>
          <div className="flex items-end gap-2 h-32 mb-4">
            {TIMELINE_DATA.map(d => <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-[#22a860]">{d.volunteers}</span>
                <div className="w-full bg-[#22a860] rounded-t-lg" style={{
              height: `${d.volunteers / 45 * 100}px`
            }} />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>)}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 border-t border-[#f0f4f2] pt-3">
            <span>Active volunteers tracked monthly</span>
            <span className="font-bold text-[#0B6B3A]">↑ 67% YTD growth</span>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-gray-900">Export Report</h3>
          <p className="text-sm text-gray-500 mt-0.5">Download full impact data for your records.</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-[#0B6B3A] font-bold text-sm hover:bg-[#e6f4ed] transition-colors">
            <Download size={14} /><span>Export CSV</span>
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors shadow-sm">
            <FileText size={14} /><span>Export PDF</span>
          </button>
        </div>
      </div>
    </div>;
};

// ─── PAGE 10: SETTINGS ────────────────────────────────────────────────────────

const SettingsPage = () => {
  const [loggingLink, setLoggingLink] = useState('https://hours.nurtureroots.org');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [linkSaved, setLinkSaved] = useState(false);
  return <div className="space-y-6">
      <PageHeading label="Platform Configuration" title="Settings" sub="Manage roles, permissions, and platform defaults." />

      {/* Role & Permission Management */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Shield size={16} className="text-[#0B6B3A]" /><span>Roles & Permissions</span>
        </h3>
        <div className="space-y-3">
          {ROLES.map(role => <div key={role.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900">{role.role}</span>
                  <span className="text-xs text-gray-400">{role.users} user{role.users !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {role.permissions.map(p => <span key={p} className="text-[10px] bg-white border border-[#e6f4ed] text-gray-500 px-2 py-0.5 rounded-full font-medium">{p}</span>)}
                </div>
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d1e8db] text-[#0B6B3A] text-xs font-bold hover:bg-[#e6f4ed] transition-colors shrink-0">
                <Edit3 size={11} /><span>Edit Role</span>
              </button>
            </div>)}
        </div>
        <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
          <Plus size={13} /><span>Add Role</span>
        </button>
      </div>

      {/* External Links */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Link2 size={16} className="text-[#0B6B3A]" /><span>External Links</span>
        </h3>
        <div className="max-w-lg space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Volunteer Hour Logging Link</label>
            <input value={loggingLink} onChange={e => setLoggingLink(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
          </div>
          {linkSaved ? <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={15} className="text-[#0B6B3A]" /><span className="text-xs font-semibold text-[#0B6B3A]">Link saved</span>
            </div> : <button onClick={() => setLinkSaved(true)} className="px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
              Save Link
            </button>}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Bell size={16} className="text-[#0B6B3A]" /><span>Notification Settings</span>
        </h3>
        <div className="space-y-4">
          {[{
          label: 'Email Notifications',
          sub: 'Receive alerts via email',
          value: emailNotifs,
          onChange: setEmailNotifs
        }, {
          label: 'SMS Notifications',
          sub: 'Receive critical alerts via SMS',
          value: smsNotifs,
          onChange: setSmsNotifs
        }].map(setting => <div key={setting.label} className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">{setting.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{setting.sub}</p>
              </div>
              <button onClick={() => setting.onChange(!setting.value)} className={`w-11 h-6 rounded-full transition-colors relative ${setting.value ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${setting.value ? 'left-5.5' : 'left-0.5'}`} style={{
              left: setting.value ? '22px' : '2px'
            }} />
              </button>
            </div>)}
        </div>
      </div>

      {/* Programme Config */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Settings size={16} className="text-[#0B6B3A]" /><span>Programme Configuration Defaults</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[{
          label: 'Default Max Class Size',
          defaultVal: '20'
        }, {
          label: 'Default Min Volunteers',
          defaultVal: '2'
        }, {
          label: 'Default Session Duration',
          defaultVal: '60 min'
        }].map(conf => <div key={conf.label}>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">{conf.label}</label>
              <input defaultValue={conf.defaultVal} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            </div>)}
        </div>
      </div>
    </div>;
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export type AdminPageId = 'overview' | 'students' | 'volunteers' | 'classes' | 'programmes' | 'events' | 'communications' | 'sponsorship' | 'reports' | 'settings' | 'smartmatching';
export const AdminPage = ({
  page,
  onNavigate
}: {
  page: AdminPageId;
  onNavigate: (p: AdminPageId) => void;
}) => {
  const map: Record<AdminPageId, React.ReactElement> = {
    overview: <OverviewPage onNavigate={onNavigate} />,
    students: <StudentsPage />,
    volunteers: <VolunteersPage />,
    classes: <ClassManagementPage />,
    programmes: <ProgrammesPage />,
    events: <EventsPage />,
    communications: <CommunicationsPage />,
    sponsorship: <SponsorshipPage />,
    reports: <ReportsPage />,
    settings: <SettingsPage />,
    smartmatching: <SmartMatchingPage />
  };
  return map[page] ?? <OverviewPage onNavigate={onNavigate} />;
};