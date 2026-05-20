import React, { useState } from 'react';
import { Users, BookOpen, Globe, Heart, Bell, Search, Eye, Edit3, Plus, Send, Trash2, ChevronRight, Check, Download, FileText, Upload, X, Calendar, MessageSquare, Shield, AlertTriangle, CheckCircle, Clock, MapPin, Video, Link2, Phone, Mail, Wifi, Monitor, ChevronDown, Star, Info, Paperclip, HelpCircle } from 'lucide-react';
import { NotificationsPage, ClassMessagesPage, RemindersPage } from './CommunicationHub';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type ParentPageId = 'overview' | 'learners' | 'classes' | 'programmes' | 'announcements' | 'absence' | 'sponsorship' | 'support' | 'profile' | 'notifications' | 'messages' | 'reminders';
type UserMode = 'parent' | 'hub';
type Learner = {
  id: string;
  name: string;
  age: number;
  programme: string;
  classAssigned: string;
  status: 'Pending' | 'Assigned' | 'Active';
  attendanceStatus?: 'Present' | 'Absent' | 'Pending';
};
type ClassSession = {
  id: string;
  name: string;
  programme: string;
  learnerName: string;
  leadVolunteer: string;
  backupVolunteer: string;
  schedule: string;
  timezone: string;
  teamsLink: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  delivery: 'Virtual' | 'Hub' | 'Hybrid';
};
type Programme = {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  delivery: string;
  enrolled: boolean;
  icon: string;
};
type Announcement = {
  id: string;
  title: string;
  message: string;
  date: string;
  audience: string;
  sender: string;
  category: 'class' | 'programme' | 'hub' | 'sponsorship';
  read: boolean;
};
type AbsenceRecord = {
  id: string;
  date: string;
  className: string;
  status: 'Notified' | 'Approved' | 'Pending';
  reason: string;
};
type SponsoredChild = {
  id: string;
  code: string;
  month: string;
  attendance: string;
  progress: string;
};
type SupportTicket = {
  id: string;
  title: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  lastUpdated: string;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const LEARNERS: Learner[] = [{
  id: 'l1',
  name: 'Amara Hassan',
  age: 10,
  programme: 'Hour of AI',
  classAssigned: 'Juniors AI Group A',
  status: 'Active',
  attendanceStatus: 'Present'
}, {
  id: 'l2',
  name: 'Kofi Hassan',
  age: 8,
  programme: 'Digital Skills for Kids',
  classAssigned: 'Digital Group B',
  status: 'Assigned',
  attendanceStatus: 'Present'
}, {
  id: 'l3',
  name: 'Nadia Hassan',
  age: 13,
  programme: 'Basic Maths Literacy',
  classAssigned: 'Maths Group C',
  status: 'Pending',
  attendanceStatus: 'Pending'
}];
const HUB_LEARNERS: Learner[] = [{
  id: 'hl1',
  name: 'Group A (Ages 8–10)',
  age: 9,
  programme: 'Hour of AI',
  classAssigned: 'Juniors AI Group A',
  status: 'Active',
  attendanceStatus: 'Present'
}, {
  id: 'hl2',
  name: 'Group B (Ages 11–13)',
  age: 12,
  programme: 'Digital Skills for Kids',
  classAssigned: 'Digital Group B',
  status: 'Active',
  attendanceStatus: 'Present'
}, {
  id: 'hl3',
  name: 'Group C (Ages 10–12)',
  age: 11,
  programme: 'Basic Maths Literacy',
  classAssigned: 'Maths Group C',
  status: 'Assigned',
  attendanceStatus: 'Pending'
}, {
  id: 'hl4',
  name: 'Group D (Ages 7–9)',
  age: 8,
  programme: 'Hour of AI',
  classAssigned: 'Pending Assignment',
  status: 'Pending',
  attendanceStatus: 'Pending'
}];
const CLASS_SESSIONS: ClassSession[] = [{
  id: 'cs1',
  name: 'Juniors AI Group A',
  programme: 'Hour of AI',
  learnerName: 'Amara Hassan',
  leadVolunteer: 'Aisha Kamara',
  backupVolunteer: 'Kofi Mensah',
  schedule: 'Sat, 12 Jul 2025 · 10:00 AM',
  timezone: 'GMT',
  teamsLink: 'https://teams.microsoft.com/join/abc123',
  status: 'Upcoming',
  delivery: 'Virtual'
}, {
  id: 'cs2',
  name: 'Digital Group B',
  programme: 'Digital Skills for Kids',
  learnerName: 'Kofi Hassan',
  leadVolunteer: 'Sarah Okafor',
  backupVolunteer: 'Lena Adeyemi',
  schedule: 'Sat, 12 Jul 2025 · 11:00 AM',
  timezone: 'WAT',
  teamsLink: 'https://teams.microsoft.com/join/def456',
  status: 'Upcoming',
  delivery: 'Virtual'
}, {
  id: 'cs3',
  name: 'Maths Group C',
  programme: 'Basic Maths Literacy',
  learnerName: 'Nadia Hassan',
  leadVolunteer: 'James Mwangi',
  backupVolunteer: 'Tom Ashford',
  schedule: 'Sun, 13 Jul 2025 · 2:00 PM',
  timezone: 'WAT',
  teamsLink: 'https://teams.microsoft.com/join/ghi789',
  status: 'Upcoming',
  delivery: 'Hybrid'
}];
const PROGRAMMES: Programme[] = [{
  id: 'p1',
  name: 'Hour of AI',
  description: 'Introduce your child to the world of artificial intelligence through fun, interactive sessions designed for young learners.',
  ageGroup: '8–14',
  delivery: 'Virtual / Hybrid',
  enrolled: true,
  icon: '🤖'
}, {
  id: 'p2',
  name: 'Basic Maths Literacy',
  description: 'Build core numeracy skills through engaging practical exercises that make maths fun and accessible.',
  ageGroup: '10–16',
  delivery: 'Virtual',
  enrolled: true,
  icon: '🔢'
}, {
  id: 'p3',
  name: 'English Language Support',
  description: 'Strengthen reading, writing, and communication skills with volunteer-led sessions.',
  ageGroup: '8–15',
  delivery: 'Virtual',
  enrolled: false,
  icon: '📚'
}, {
  id: 'p4',
  name: 'Digital Skills for Kids',
  description: 'Foundational digital literacy covering computers, internet safety, and essential tools.',
  ageGroup: '6–12',
  delivery: 'Virtual / Hub',
  enrolled: false,
  icon: '💻'
}];
const ANNOUNCEMENTS: Announcement[] = [{
  id: 'an1',
  title: 'Upcoming class this Saturday',
  message: 'Your child\'s Hour of AI class is scheduled for this Saturday at 10:00 AM GMT. Please ensure they have a stable internet connection 5 minutes before the session.',
  date: '2 days ago',
  audience: 'Parents',
  sender: 'Class Team',
  category: 'class',
  read: false
}, {
  id: 'an2',
  title: 'New module: Introduction to Machine Learning',
  message: 'This week, learners in the Hour of AI programme will begin exploring machine learning concepts. No preparation needed — just curiosity!',
  date: '4 days ago',
  audience: 'All Users',
  sender: 'Programme Team',
  category: 'programme',
  read: false
}, {
  id: 'an3',
  title: 'Street2School: Sponsorship report available',
  message: 'Your monthly report for your sponsored child is now available to view in the Street2School section.',
  date: '1 week ago',
  audience: 'Sponsors',
  sender: 'Street2School Team',
  category: 'sponsorship',
  read: true
}, {
  id: 'an4',
  title: 'Safeguarding reminder',
  message: 'All sessions are monitored in accordance with our safeguarding policy. If you have any concerns, please contact our safeguarding team directly.',
  date: '2 weeks ago',
  audience: 'All Users',
  sender: 'Admin',
  category: 'class',
  read: true
}];
const ABSENCE_HISTORY: AbsenceRecord[] = [{
  id: 'ab1',
  date: 'Sat, 28 Jun 2025',
  className: 'Juniors AI Group A',
  status: 'Approved',
  reason: 'Family commitment'
}, {
  id: 'ab2',
  date: 'Sat, 14 Jun 2025',
  className: 'Digital Group B',
  status: 'Notified',
  reason: 'Illness'
}];
const SPONSORED_CHILDREN: SponsoredChild[] = [{
  id: 'sc1',
  code: 'NR-2025-041',
  month: 'June 2025',
  attendance: '4/4 sessions',
  progress: 'Excellent engagement. Completed all exercises this month.'
}, {
  id: 'sc2',
  code: 'NR-2025-042',
  month: 'June 2025',
  attendance: '3/4 sessions',
  progress: 'Good progress. Missed one session due to community event.'
}];
const SUPPORT_TICKETS: SupportTicket[] = [{
  id: 'st1',
  title: 'Teams link not working for Saturday class',
  status: 'In Progress',
  lastUpdated: '1 day ago'
}, {
  id: 'st2',
  title: 'How do I register for a second programme?',
  status: 'Resolved',
  lastUpdated: '3 days ago'
}];
const FAQ_ITEMS = [{
  q: 'How does my child join a class?',
  a: 'After enrolment, you\'ll receive a Microsoft Teams link via email and in your Classes page. Click "Join Class" 5 minutes before the session starts.'
}, {
  q: 'What happens if my child misses a session?',
  a: 'Please report the absence using the "Report Absence" page before the session if possible. The class team will be notified and can share any missed materials.'
}, {
  q: 'How do I register for another programme?',
  a: 'Visit the Programmes page and click "Register Interest" on any programme your child is not yet enrolled in. An enrolment officer will be in touch.'
}, {
  q: 'How do I sponsor a child?',
  a: 'Visit the Street2School Sponsorship page and click "Sponsor a Child". You can choose how many children to support and opt in to receive progress reports.'
}, {
  q: 'Who do I contact for safeguarding concerns?',
  a: 'Please use the Support page and select "Safeguarding Concern" as the category. Our safeguarding team will respond within 24 hours.'
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
  emoji,
  title,
  sub
}: {
  emoji: string;
  title: string;
  sub?: string;
}) => <div className="mb-7">
    <div className="flex items-center gap-3 mb-1">
      <span className="text-2xl">{emoji}</span>
      <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    </div>
    {sub && <p className="text-gray-500 text-sm mt-1 ml-1">{sub}</p>}
  </div>;
const ImpactBanner = () => <div className="bg-gradient-to-r from-[#0B6B3A] to-[#1a8a4e] rounded-2xl p-5 text-white flex items-start gap-4">
    <span className="text-3xl shrink-0">🌍</span>
    <div>
      <p className="font-bold text-base leading-snug">Making a difference together</p>
      <p className="text-white/75 text-sm mt-1 leading-relaxed">
        By joining this programme, you are helping children learn digital skills while supporting the Street2School mission.
      </p>
    </div>
  </div>;

// ─── PAGE 1: OVERVIEW ─────────────────────────────────────────────────────────

const OverviewPage = ({
  onNavigate,
  mode
}: {
  onNavigate: (p: ParentPageId) => void;
  mode: UserMode;
}) => {
  const nextClass = CLASS_SESSIONS[0];
  const topCards = [{
    label: 'Next Class',
    value: 'Sat, 12 Jul',
    icon: '📅',
    color: 'bg-[#0B6B3A]',
    sub: '10:00 AM GMT'
  }, {
    label: 'Learners Registered',
    value: mode === 'parent' ? '3' : '18',
    icon: '👧',
    color: 'bg-[#138a4c]',
    sub: mode === 'parent' ? 'Children' : 'Hub Learners'
  }, {
    label: 'Active Programmes',
    value: '2',
    icon: '📘',
    color: 'bg-[#22a860]',
    sub: 'Enrolled & active'
  }, {
    label: 'Sponsorship',
    value: 'Active',
    icon: '💚',
    color: 'bg-[#0B6B3A]',
    sub: '2 children supported'
  }];
  return <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {topCards.map(card => <div key={card.label} className="bg-white border border-[#d1e8db] rounded-2xl p-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-xl mb-3`}>
              <span>{card.icon}</span>
            </div>
            <p className="text-xl font-black text-gray-900">{card.value}</p>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">{card.label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{card.sub}</p>
          </div>)}
      </div>

      {/* Next Class Card */}
      <div className="bg-white border-2 border-[#0B6B3A]/20 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-white font-bold text-base leading-tight">Next Class</p>
              <p className="text-white/70 text-xs">Coming up this Saturday</p>
            </div>
          </div>
          <Badge variant="green">Upcoming</Badge>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
            <div>
              <p className="text-xs text-gray-400 font-medium">Programme</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{nextClass.programme}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">{mode === 'parent' ? 'Learner' : 'Group'}</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{nextClass.learnerName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Date & Time</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{nextClass.schedule}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Delivery Mode</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{nextClass.delivery}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={nextClass.teamsLink} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors shadow-sm">
              <Video size={14} />
              <span>Join Class</span>
            </a>
            <button onClick={() => onNavigate('classes')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-700 text-sm font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
              <Eye size={14} />
              <span>View Details</span>
            </button>
            <button onClick={() => onNavigate('absence')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-200 text-amber-600 text-sm font-semibold hover:bg-amber-50 transition-colors">
              <AlertTriangle size={14} />
              <span>Report Absence</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements preview */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Bell size={16} className="text-[#0B6B3A]" />
              <span>Latest Announcements</span>
            </h3>
            <button onClick={() => onNavigate('announcements')} className="text-xs font-semibold text-[#0B6B3A] hover:underline">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {ANNOUNCEMENTS.slice(0, 3).map(ann => <div key={ann.id} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${ann.read ? 'border-[#f0f4f2] bg-[#fafcfa]' : 'border-[#d1e8db] bg-[#f7fbf9]'}`}>
                {!ann.read && <span className="w-2 h-2 rounded-full bg-[#0B6B3A] mt-1.5 shrink-0" />}
                {ann.read && <span className="w-2 h-2 mt-1.5 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 leading-snug">{ann.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{ann.date} · {ann.sender}</p>
                </div>
              </div>)}
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <ImpactBanner />
          <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {[{
              label: 'Report Absence',
              icon: AlertTriangle,
              page: 'absence' as ParentPageId,
              color: 'text-amber-600 bg-amber-50 border-amber-100 hover:bg-amber-100'
            }, {
              label: 'View Classes',
              icon: Calendar,
              page: 'classes' as ParentPageId,
              color: 'text-[#0B6B3A] bg-[#e6f4ed] border-[#c3e0cf] hover:bg-[#d4efdf]'
            }, {
              label: 'Sponsor a Child',
              icon: Heart,
              page: 'sponsorship' as ParentPageId,
              color: 'text-pink-600 bg-pink-50 border-pink-100 hover:bg-pink-100'
            }, {
              label: 'Get Support',
              icon: HelpCircle,
              page: 'support' as ParentPageId,
              color: 'text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100'
            }].map(action => {
              const Icon = action.icon;
              return <button key={action.label} onClick={() => onNavigate(action.page)} className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-sm font-semibold transition-colors ${action.color}`}>
                    <Icon size={15} />
                    <span>{action.label}</span>
                  </button>;
            })}
            </div>
          </div>
        </div>
      </div>
    </div>;
};

// ─── PAGE 2: MY LEARNERS ──────────────────────────────────────────────────────

const LearnersPage = ({
  mode
}: {
  mode: UserMode;
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addedName, setAddedName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const learners = mode === 'hub' ? HUB_LEARNERS : LEARNERS;
  return <div className="space-y-6">
      <PageHeading emoji="👧" title="My Learners" sub={mode === 'parent' ? 'Manage your children\'s enrolment and class assignments.' : 'Manage your hub\'s learner groups and assignments.'} />

      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3">
          {mode === 'hub' && <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-semibold hover:bg-[#e6f4ed] transition-colors">
              <Upload size={14} />
              <span>Bulk Upload</span>
            </button>}
          <button onClick={() => setShowAddForm(v => !v)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
            <Plus size={14} />
            <span>{mode === 'parent' ? 'Add Child' : 'Add Group'}</span>
          </button>
        </div>
      </div>

      {showAddForm && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm max-w-lg">
          <h3 className="font-bold text-gray-900 mb-4">{mode === 'parent' ? 'Add a Child' : 'Add a Learner Group'}</h3>
          {submitted ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={16} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Added successfully! An enrolment officer will assign a class soon.</p>
            </div> : <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{mode === 'parent' ? 'Child\'s Full Name' : 'Group Name'}</label>
                <input value={addedName} onChange={e => setAddedName(e.target.value)} placeholder={mode === 'parent' ? 'e.g. Amara Hassan' : 'e.g. Group E (Ages 10–12)'} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Age {mode === 'hub' ? 'Range' : ''}</label>
                <input placeholder={mode === 'parent' ? 'e.g. 10' : 'e.g. 10–12'} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Programme Interest</label>
                <select className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                  <option>Select a programme…</option>
                  {PROGRAMMES.map(p => <option key={p.id}>{p.name}</option>)}
                </select>
              </div>
              <button onClick={() => setSubmitted(true)} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                Submit Registration
              </button>
            </div>}
        </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {learners.map(learner => <div key={learner.id} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className={`px-5 py-4 flex items-center justify-between ${learner.status === 'Active' ? 'bg-gradient-to-r from-[#0B6B3A] to-[#22a860]' : learner.status === 'Assigned' ? 'bg-gradient-to-r from-[#138a4c] to-[#2cb870]' : 'bg-gray-400'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                  {mode === 'parent' ? '👧' : '👥'}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{learner.name}</p>
                  <p className="text-white/70 text-xs">{mode === 'parent' ? `Age ${learner.age}` : `Avg. Age ${learner.age}`}</p>
                </div>
              </div>
              <Badge variant={learner.status === 'Active' ? 'green' : learner.status === 'Assigned' ? 'blue' : 'amber'}>{learner.status}</Badge>
            </div>
            <div className="px-5 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Programme</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">{learner.programme}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Class</p>
                  <p className="text-xs font-semibold text-gray-800 mt-0.5">{learner.classAssigned}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-[#f0f4f2]">
                <button className="flex-1 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                  View Class
                </button>
                <button className="flex-1 py-2 rounded-xl border border-[#d1e8db] text-gray-600 text-xs font-semibold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                  Edit
                </button>
                <button className="p-2 rounded-xl border border-red-100 text-red-400 text-xs hover:bg-red-50 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>)}
      </div>

      {mode === 'hub' && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BarChartIcon />
            <span>Hub Impact Summary</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[{
          label: 'Learners Reached',
          value: '18'
        }, {
          label: 'Sessions Attended',
          value: '42'
        }, {
          label: 'Programmes Active',
          value: '3'
        }, {
          label: 'Volunteers Supporting',
          value: '4'
        }].map(stat => <div key={stat.label} className="bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-[#0B6B3A]">{stat.value}</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-tight">{stat.label}</p>
              </div>)}
          </div>
        </div>}
    </div>;
};
const BarChartIcon = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#0B6B3A]">
    <rect x="1" y="8" width="3" height="7" rx="1" fill="currentColor" />
    <rect x="6.5" y="4" width="3" height="11" rx="1" fill="currentColor" />
    <rect x="12" y="1" width="3" height="14" rx="1" fill="currentColor" />
  </svg>;

// ─── PAGE 3: CLASSES ──────────────────────────────────────────────────────────

const ClassesPage = ({
  onNavigate
}: {
  onNavigate: (p: ParentPageId) => void;
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassSession | null>(null);
  if (selectedClass) {
    return <div className="space-y-6">
        <button onClick={() => setSelectedClass(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" />
          <span>Back to Classes</span>
        </button>
        <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] p-6">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{selectedClass.programme}</p>
                <h2 className="text-white font-black text-xl">{selectedClass.name}</h2>
                <p className="text-white/75 text-sm mt-1 flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>{selectedClass.schedule} {selectedClass.timezone}</span>
                </p>
              </div>
              <Badge variant="green">{selectedClass.status}</Badge>
            </div>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium">Lead Volunteer</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedClass.leadVolunteer}</p>
              </div>
              <div className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium">Backup Volunteer</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedClass.backupVolunteer}</p>
              </div>
              <div className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-400 font-medium">Delivery Mode</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{selectedClass.delivery}</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-xs font-bold text-blue-700 mb-1 flex items-center gap-1.5">
                <Info size={12} />
                <span>What to prepare</span>
              </p>
              <ul className="text-xs text-blue-600 space-y-1 ml-4">
                <li>• A device with camera and microphone</li>
                <li>• Stable internet connection</li>
                <li>• Notebook and pen for exercises</li>
                <li>• Join 5 minutes before the session starts</li>
              </ul>
            </div>

            <div className="p-4 bg-[#fff8e6] border border-amber-100 rounded-xl flex items-start gap-3">
              <Shield size={15} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700">
                <strong>Safeguarding reminder:</strong> All sessions are recorded and monitored. If you have any concerns, please contact our safeguarding team via the Support page.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a href={selectedClass.teamsLink} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors shadow-sm">
                <Video size={14} />
                <span>Join Class</span>
              </a>
              <button onClick={() => onNavigate('absence')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-200 text-amber-600 text-sm font-semibold hover:bg-amber-50 transition-colors">
                <AlertTriangle size={14} />
                <span>Report Absence</span>
              </button>
              <button onClick={() => onNavigate('support')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-700 text-sm font-semibold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                <MessageSquare size={14} />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading emoji="📅" title="My Classes" sub="View your schedule, join sessions, and manage attendance." />

      <div className="space-y-4">
        {CLASS_SESSIONS.map(cls => <div key={cls.id} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row">
              <div className={`sm:w-2 shrink-0 ${cls.status === 'Active' ? 'bg-[#0B6B3A]' : cls.status === 'Upcoming' ? 'bg-amber-400' : 'bg-gray-300'} sm:rounded-l-2xl`} style={{
            minHeight: '4px'
          }} />
              <div className="flex-1 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-black text-gray-900">{cls.name}</h3>
                      <Badge variant={cls.status === 'Active' ? 'green' : cls.status === 'Upcoming' ? 'amber' : 'gray'}>{cls.status}</Badge>
                      <Badge variant={cls.delivery === 'Virtual' ? 'blue' : cls.delivery === 'Hybrid' ? 'green' : 'purple'}>{cls.delivery}</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{cls.programme} · {cls.learnerName}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Date & Time</p>
                    <p className="text-xs font-semibold text-gray-800 mt-0.5">{cls.schedule}</p>
                    <p className="text-[10px] text-gray-400">{cls.timezone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Lead Volunteer</p>
                    <p className="text-xs font-semibold text-gray-800 mt-0.5">{cls.leadVolunteer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Backup</p>
                    <p className="text-xs font-semibold text-gray-800 mt-0.5">{cls.backupVolunteer}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Teams Link</p>
                    <a href={cls.teamsLink} className="text-xs font-semibold text-[#0B6B3A] hover:underline flex items-center gap-1 mt-0.5">
                      <Link2 size={10} />
                      <span>Open link</span>
                    </a>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a href={cls.teamsLink} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                    <Video size={12} />
                    <span>Join Class</span>
                  </a>
                  <button onClick={() => setSelectedClass(cls)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#d1e8db] text-gray-700 text-xs font-semibold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                    <Eye size={12} />
                    <span>Session Details</span>
                  </button>
                  <button onClick={() => onNavigate('absence')} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-200 text-amber-600 text-xs font-semibold hover:bg-amber-50 transition-colors">
                    <AlertTriangle size={12} />
                    <span>Report Absence</span>
                  </button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── PAGE 4: PROGRAMMES ───────────────────────────────────────────────────────

const ProgrammesPage = () => {
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  return <div className="space-y-6">
      <PageHeading emoji="📘" title="Programmes" sub="Explore available learning programmes and register your child's interest." />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {PROGRAMMES.map(prog => <div key={prog.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${prog.enrolled || registered.has(prog.id) ? 'border-[#0B6B3A]/30' : 'border-[#d1e8db] hover:shadow-md'}`}>
            <div className={`px-5 py-4 flex items-center gap-4 ${prog.enrolled || registered.has(prog.id) ? 'bg-gradient-to-r from-[#0B6B3A] to-[#22a860]' : 'bg-[#f7fbf9]'}`}>
              <span className="text-3xl">{prog.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className={`font-black text-base leading-tight ${prog.enrolled || registered.has(prog.id) ? 'text-white' : 'text-gray-900'}`}>{prog.name}</h3>
                <p className={`text-xs mt-0.5 ${prog.enrolled || registered.has(prog.id) ? 'text-white/70' : 'text-gray-500'}`}>Ages {prog.ageGroup} · {prog.delivery}</p>
              </div>
              {(prog.enrolled || registered.has(prog.id)) && <Badge variant="green">
                  <Check size={10} className="mr-1" />
                  {registered.has(prog.id) ? 'Interest Sent' : 'Enrolled'}
                </Badge>}
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{prog.description}</p>
              <div className="flex gap-2 flex-wrap text-xs mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e6f4ed] text-[#0B6B3A] rounded-full font-semibold">
                  <Users size={10} />
                  <span>Ages {prog.ageGroup}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-semibold">
                  <Globe size={10} />
                  <span>{prog.delivery}</span>
                </span>
              </div>
              {!prog.enrolled && !registered.has(prog.id) ? <button onClick={() => setRegistered(prev => {
            const n = new Set(prev);
            n.add(prog.id);
            return n;
          })} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors">
                  Register Interest
                </button> : <div className="w-full py-2.5 rounded-xl bg-[#e6f4ed] text-[#0B6B3A] text-sm font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle size={14} />
                  <span>{registered.has(prog.id) ? 'Interest registered — we\'ll be in touch' : 'Currently enrolled'}</span>
                </div>}
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── PAGE 5: ANNOUNCEMENTS ────────────────────────────────────────────────────

const AnnouncementsPage = () => {
  const [filter, setFilter] = useState<'all' | 'class' | 'programme' | 'hub' | 'sponsorship'>('all');
  const [readIds, setReadIds] = useState<Set<string>>(new Set(ANNOUNCEMENTS.filter(a => a.read).map(a => a.id)));
  const filters = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'class',
    label: 'Class Updates'
  }, {
    id: 'programme',
    label: 'Programme'
  }, {
    id: 'hub',
    label: 'Hub Updates'
  }, {
    id: 'sponsorship',
    label: 'Sponsorship'
  }] as const;
  const filtered = ANNOUNCEMENTS.filter(a => filter === 'all' || a.category === filter);
  const categoryColors: Record<string, BadgeVariant> = {
    class: 'green',
    programme: 'blue',
    hub: 'amber',
    sponsorship: 'purple'
  };
  return <div className="space-y-6">
      <PageHeading emoji="📢" title="Announcements" sub="Stay up to date with class updates, reminders, and important notices." />

      <div className="flex gap-2 flex-wrap">
        {filters.map(f => <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f.id ? 'bg-[#0B6B3A] text-white' : 'bg-white border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
            {f.label}
          </button>)}
        <button onClick={() => setReadIds(new Set(ANNOUNCEMENTS.map(a => a.id)))} className="ml-auto text-xs font-semibold text-gray-400 hover:text-[#0B6B3A] transition-colors px-3 py-2">
          Mark all as read
        </button>
      </div>

      <div className="space-y-4">
        {filtered.map(ann => {
        const isRead = readIds.has(ann.id);
        return <div key={ann.id} className={`bg-white border rounded-2xl p-5 shadow-sm transition-all ${isRead ? 'border-[#e6f4ed]' : 'border-[#0B6B3A]/25 bg-[#fafdf9]'}`}>
              <div className="flex items-start gap-3">
                {!isRead && <span className="w-2.5 h-2.5 rounded-full bg-[#0B6B3A] mt-1.5 shrink-0" />}
                {isRead && <span className="w-2.5 h-2.5 shrink-0 mt-1.5" />}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-900">{ann.title}</h3>
                    <Badge variant={categoryColors[ann.category]}>{ann.category.charAt(0).toUpperCase() + ann.category.slice(1)}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{ann.message}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xs text-gray-400">{ann.date} · <strong className="text-gray-500">{ann.sender}</strong> · {ann.audience}</p>
                    {!isRead && <button onClick={() => setReadIds(prev => {
                  const n = new Set(prev);
                  n.add(ann.id);
                  return n;
                })} className="text-xs font-semibold text-[#0B6B3A] hover:underline">
                        Mark as read
                      </button>}
                  </div>
                </div>
              </div>
            </div>;
      })}
        {filtered.length === 0 && <div className="text-center py-12 text-gray-400">
            <Bell size={32} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No announcements in this category</p>
          </div>}
      </div>
    </div>;
};

// ─── PAGE 6: REPORT ABSENCE ───────────────────────────────────────────────────

const AbsencePage = () => {
  const [learner, setLearner] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const allLearners = [...LEARNERS, ...HUB_LEARNERS];
  return <div className="space-y-6">
      <PageHeading emoji="📋" title="Report Absence" sub="Let the class team know in advance if your child or group cannot attend." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Absence Notification Form</h3>
          {submitted ? <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-[#e6f4ed] rounded-xl border border-[#c3e0cf]">
                <CheckCircle size={18} className="text-[#0B6B3A] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#0B6B3A]">Absence reported successfully</p>
                  <p className="text-xs text-[#0B6B3A]/80 mt-0.5">Your class team and admin have been notified. They will share any missed materials after the session.</p>
                </div>
              </div>
              <div className="p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl text-xs text-gray-500 space-y-1">
                <p><strong className="text-gray-700">Learner:</strong> {learner}</p>
                <p><strong className="text-gray-700">Date:</strong> {date}</p>
                <p><strong className="text-gray-700">Reason:</strong> {reason}</p>
                <p><strong className="text-gray-700">Status:</strong> <span className="text-amber-600 font-semibold">Pending confirmation</span></p>
              </div>
              <button onClick={() => {
            setSubmitted(false);
            setLearner('');
            setDate('');
            setReason('');
            setMessage('');
          }} className="w-full py-2.5 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-bold hover:bg-[#e6f4ed] transition-colors">
                Report Another Absence
              </button>
            </div> : <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Learner / Class</label>
                <select value={learner} onChange={e => setLearner(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                  <option value="">Select a learner…</option>
                  {CLASS_SESSIONS.map(c => <option key={c.id} value={`${c.learnerName} – ${c.name}`}>{c.learnerName} – {c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date of Absence</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reason</label>
                <select value={reason} onChange={e => setReason(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                  <option value="">Select a reason…</option>
                  {['Illness', 'Family commitment', 'School event', 'Travel', 'Technical issue', 'Other'].map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Additional message <span className="font-normal text-gray-400">(optional)</span></label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Any additional information for the class team…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <button onClick={() => {
            if (learner && date && reason) setSubmitted(true);
          }} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors flex items-center justify-center gap-2">
                <Send size={14} />
                <span>Notify Class Team</span>
              </button>
            </div>}
        </div>

        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Absence History</h3>
          {ABSENCE_HISTORY.length === 0 ? <div className="text-center py-8 text-gray-400">
              <CheckCircle size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No absences reported</p>
            </div> : <div className="space-y-3">
              {ABSENCE_HISTORY.map(ab => <div key={ab.id} className="border border-[#e6f4ed] rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{ab.className}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{ab.date} · {ab.reason}</p>
                    </div>
                    <Badge variant={ab.status === 'Approved' ? 'green' : ab.status === 'Notified' ? 'blue' : 'amber'}>{ab.status}</Badge>
                  </div>
                </div>)}
            </div>}
        </div>
      </div>
    </div>;
};

// ─── PAGE 7: SPONSORSHIP ──────────────────────────────────────────────────────

const SponsorshipPage = () => {
  const [sponsoring, setSponsoring] = useState(true);
  const [childCount, setChildCount] = useState(2);
  const [wantReports, setWantReports] = useState(true);
  const [sponsorClicked, setSponsorClicked] = useState(false);
  return <div className="space-y-6">
      <PageHeading emoji="💚" title="Street2School Sponsorship" sub="Support a child's education through the Street2School campaign." />

      <div className="bg-gradient-to-br from-[#0B6B3A] to-[#1a8a4e] rounded-2xl p-6 text-white">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-4xl">🌍</span>
          <div>
            <h3 className="font-black text-xl leading-tight">Support a Child's Education</h3>
            <p className="text-white/80 text-sm mt-1.5 leading-relaxed">
              Through the Street2School campaign, families and supporters can help sponsor out-of-school children and give them access to quality education.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[{
          label: 'Per Child',
          value: '$15/mo'
        }, {
          label: 'Children Reached',
          value: '87'
        }, {
          label: 'Your Sponsored',
          value: `${childCount}`
        }].map(stat => <div key={stat.label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-xl font-black">{stat.value}</p>
              <p className="text-white/70 text-[11px] mt-0.5">{stat.label}</p>
            </div>)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Your Sponsorship</h3>

          {sponsorClicked ? <div className="flex items-start gap-3 p-4 bg-[#e6f4ed] rounded-xl border border-[#c3e0cf] mb-4">
              <CheckCircle size={16} className="text-[#0B6B3A] shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Thank you! Your sponsorship request has been submitted. We'll send you a confirmation and payment details shortly.</p>
            </div> : null}

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
              <div>
                <p className="text-sm font-bold text-gray-900">Sponsorship Status</p>
                <p className="text-xs text-gray-400 mt-0.5">Monthly contributions active</p>
              </div>
              <Badge variant={sponsoring ? 'green' : 'amber'}>{sponsoring ? 'Active' : 'Inactive'}</Badge>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Number of children to sponsor</label>
              <div className="flex items-center gap-4">
                <button onClick={() => setChildCount(v => Math.max(1, v - 1))} className="w-9 h-9 rounded-xl border border-[#d1e8db] text-[#0B6B3A] font-bold text-lg hover:bg-[#e6f4ed] transition-colors flex items-center justify-center">
                  −
                </button>
                <span className="text-2xl font-black text-[#0B6B3A] min-w-[2rem] text-center">{childCount}</span>
                <button onClick={() => setChildCount(v => v + 1)} className="w-9 h-9 rounded-xl border border-[#d1e8db] text-[#0B6B3A] font-bold text-lg hover:bg-[#e6f4ed] transition-colors flex items-center justify-center">
                  +
                </button>
                <span className="text-sm text-gray-500">= <strong className="text-gray-900">${childCount * 15}/month</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-900">Receive progress reports</p>
                <p className="text-xs text-gray-400 mt-0.5">Get anonymised updates on sponsored children</p>
              </div>
              <button onClick={() => setWantReports(v => !v)} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${wantReports ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
                <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
                left: wantReports ? '22px' : '2px'
              }} />
              </button>
            </div>

            <button onClick={() => setSponsorClicked(true)} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors flex items-center justify-center gap-2">
              <Heart size={14} />
              <span>Sponsor {childCount} {childCount === 1 ? 'Child' : 'Children'}</span>
            </button>

            <p className="text-xs text-gray-400 text-center leading-relaxed">
              All child information is anonymised. Reports use privacy-friendly codes, never real names.
            </p>
          </div>
        </div>

        {wantReports && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Sponsored Child Reports</h3>
            <p className="text-xs text-gray-400 mb-5">Reports use anonymised child codes to protect privacy.</p>
            <div className="space-y-4">
              {SPONSORED_CHILDREN.map(child => <div key={child.id} className="border border-[#e6f4ed] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#f7fbf9] border-b border-[#e6f4ed]">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-[#0B6B3A]" />
                      <p className="text-sm font-bold text-gray-900">Child {child.code}</p>
                    </div>
                    <Badge variant="blue">{child.month}</Badge>
                  </div>
                  <div className="px-4 py-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle size={12} className="text-[#0B6B3A]" />
                      <span className="text-gray-600"><strong>Attendance:</strong> {child.attendance}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{child.progress}</p>
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B6B3A] hover:underline mt-1">
                      <Download size={11} />
                      <span>Download report</span>
                    </button>
                  </div>
                </div>)}
            </div>
          </div>}
      </div>
    </div>;
};

// ─── PAGE 8: SUPPORT ──────────────────────────────────────────────────────────

const SupportPage = () => {
  const [category, setCategory] = useState('');
  const [msg, setMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const categories = ['Class issue', 'Login issue', 'Teams link issue', 'Programme enquiry', 'Sponsorship enquiry', 'Safeguarding concern', 'Other'];
  return <div className="space-y-6">
      <PageHeading emoji="🤝" title="Support" sub="We're here to help. Reach out and we'll respond as quickly as possible." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5">Get Help</h3>
          {submitted ? <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-[#e6f4ed] rounded-xl border border-[#c3e0cf]">
                <CheckCircle size={16} className="text-[#0B6B3A] shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#0B6B3A]">Support request submitted</p>
                  <p className="text-xs text-[#0B6B3A]/80 mt-0.5">Our team will get back to you within 24 hours.</p>
                </div>
              </div>
              <button onClick={() => {
            setSubmitted(false);
            setCategory('');
            setMsg('');
          }} className="w-full py-2.5 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-bold hover:bg-[#e6f4ed] transition-colors">
                Submit Another Request
              </button>
            </div> : <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                  <option value="">Select a category…</option>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                {category === 'Safeguarding concern' && <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                    <Shield size={13} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600">For urgent safeguarding concerns, our team will respond within 2 hours. You can also email safeguarding@nurtureroots.org directly.</p>
                  </div>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your message</label>
                <textarea value={msg} onChange={e => setMsg(e.target.value)} rows={5} placeholder="Describe your issue or question…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Attachment <span className="font-normal text-gray-400">(optional)</span></label>
                <div className="border border-dashed border-[#d1e8db] rounded-xl px-4 py-3 flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                  <Paperclip size={14} />
                  <span>Click to attach a file</span>
                </div>
              </div>
              <button onClick={() => {
            if (category && msg) setSubmitted(true);
          }} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors flex items-center justify-center gap-2">
                <Send size={14} />
                <span>Submit Request</span>
              </button>
            </div>}
        </div>

        <div className="space-y-5">
          {/* Ticket history */}
          <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Your Support Tickets</h3>
            <div className="space-y-3">
              {SUPPORT_TICKETS.map(ticket => <div key={ticket.id} className="border border-[#e6f4ed] rounded-xl p-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{ticket.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Updated {ticket.lastUpdated}</p>
                  </div>
                  <Badge variant={ticket.status === 'Resolved' ? 'green' : ticket.status === 'In Progress' ? 'blue' : 'amber'}>{ticket.status}</Badge>
                </div>)}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, i) => <div key={item.q} className="border border-[#e6f4ed] rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[#f7fbf9] transition-colors">
                    <span className="text-sm font-semibold text-gray-800 leading-snug">{item.q}</span>
                    <ChevronDown size={14} className={`text-gray-400 shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && <div className="px-4 pb-4">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>}
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>;
};

// ─── PAGE 9: PROFILE ──────────────────────────────────────────────────────────

const ProfilePage = ({
  mode
}: {
  mode: UserMode;
}) => {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  return <div className="space-y-6">
      <PageHeading emoji="👤" title="Profile" sub="Manage your account details and notification preferences." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] px-6 py-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
              {mode === 'parent' ? '👩🏽' : '🏫'}
            </div>
            <div>
              <p className="text-white font-black text-lg leading-tight">{mode === 'parent' ? 'Fatima Hassan' : 'Bright Stars Academy'}</p>
              <p className="text-white/70 text-sm">{mode === 'parent' ? 'Parent / Guardian · Nigeria' : 'Community Hub · Ghana'}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                <Badge variant="green">{mode === 'parent' ? 'Verified Parent' : 'Verified Hub'}</Badge>
                <Badge variant="blue">Active since 2024</Badge>
              </div>
            </div>
          </div>

          <div className="p-6">
            {saved && <div className="flex items-center gap-2 p-3 bg-[#e6f4ed] rounded-xl mb-4">
                <CheckCircle size={14} className="text-[#0B6B3A]" />
                <span className="text-xs font-semibold text-[#0B6B3A]">Profile updated successfully</span>
              </div>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(mode === 'parent' ? [{
              label: 'Full Name',
              value: 'Fatima Hassan',
              icon: '👤'
            }, {
              label: 'Email Address',
              value: 'fatima@email.com',
              icon: '📧'
            }, {
              label: 'Phone Number',
              value: '+234 801 234 5678',
              icon: '📱'
            }, {
              label: 'Country',
              value: 'Nigeria',
              icon: '🌍'
            }, {
              label: 'Time Zone',
              value: 'WAT (UTC+1)',
              icon: '🕐'
            }, {
              label: 'Communication',
              value: 'Email & WhatsApp',
              icon: '💬'
            }] : [{
              label: 'Hub / Org Name',
              value: 'Bright Stars Academy',
              icon: '🏫'
            }, {
              label: 'Contact Person',
              value: 'Joseph Mensah',
              icon: '👤'
            }, {
              label: 'Email Address',
              value: 'brightstarshub@email.com',
              icon: '📧'
            }, {
              label: 'Phone Number',
              value: '+233 55 123 4567',
              icon: '📱'
            }, {
              label: 'Country',
              value: 'Ghana',
              icon: '🌍'
            }, {
              label: 'City',
              value: 'Accra',
              icon: '📍'
            }]).map(field => <div key={field.label}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 flex items-center gap-1.5">
                    <span>{field.icon}</span>
                    <span>{field.label}</span>
                  </label>
                  {editing ? <input defaultValue={field.value} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" /> : <p className="text-sm font-semibold text-gray-800 py-2.5 px-3 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">{field.value}</p>}
                </div>)}
            </div>

            {mode === 'hub' && !editing && <div className="mt-5 pt-5 border-t border-[#f0f4f2]">
                <h4 className="text-sm font-bold text-gray-900 mb-3">Infrastructure Details</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[{
                label: 'Internet',
                icon: Wifi,
                value: 'Stable Broadband',
                ok: true
              }, {
                label: 'Computers',
                icon: Monitor,
                value: '12 Available',
                ok: true
              }, {
                label: 'Power Supply',
                icon: null,
                value: 'Solar + Grid',
                ok: true
              }].map(infra => {
                const Icon = infra.icon;
                return <div key={infra.label} className="bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl p-3 text-center">
                        {Icon && <Icon size={16} className="text-[#0B6B3A] mx-auto mb-1.5" />}
                        {!Icon && <span className="text-base block mb-1">⚡</span>}
                        <p className="text-[10px] text-gray-400 font-medium">{infra.label}</p>
                        <p className="text-xs font-semibold text-gray-800 mt-0.5">{infra.value}</p>
                      </div>;
              })}
                </div>
              </div>}

            <div className="flex gap-3 mt-5 pt-5 border-t border-[#f0f4f2]">
              {editing ? <button onClick={() => {
              setEditing(false);
              setSaved(true);
              setTimeout(() => setSaved(false), 3000);
            }} className="px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
                  Save Changes
                </button> : <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-700 font-semibold text-sm hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                  <Edit3 size={13} />
                  <span>Edit Profile</span>
                </button>}
              {editing && <button onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>}
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
                <Shield size={13} />
                <span>Change Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Bell size={16} className="text-[#0B6B3A]" />
            <span>Notifications</span>
          </h3>
          <div className="space-y-4">
            {[{
            label: 'Email notifications',
            sub: 'Class reminders & updates',
            value: emailNotifs,
            onChange: setEmailNotifs
          }, {
            label: 'SMS notifications',
            sub: 'Critical alerts via SMS',
            value: smsNotifs,
            onChange: setSmsNotifs
          }].map(setting => <div key={setting.label} className="flex items-center justify-between gap-3 p-3.5 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{setting.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{setting.sub}</p>
                </div>
                <button onClick={() => setting.onChange(!setting.value)} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${setting.value ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
                  <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
                left: setting.value ? '22px' : '2px'
              }} />
                </button>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const ParentPage = ({
  page,
  onNavigate,
  mode
}: {
  page: ParentPageId;
  onNavigate: (p: ParentPageId) => void;
  mode: UserMode;
}) => {
  const map: Record<ParentPageId, React.ReactElement> = {
    overview: <OverviewPage onNavigate={onNavigate} mode={mode} />,
    learners: <LearnersPage mode={mode} />,
    classes: <ClassesPage onNavigate={onNavigate} />,
    programmes: <ProgrammesPage />,
    announcements: <AnnouncementsPage />,
    absence: <AbsencePage />,
    sponsorship: <SponsorshipPage />,
    support: <SupportPage />,
    profile: <ProfilePage mode={mode} />,
    notifications: <NotificationsPage onNavigate={p => onNavigate(p as ParentPageId)} />,
    messages: <ClassMessagesPage mode={mode} />,
    reminders: <RemindersPage onNavigate={p => onNavigate(p as ParentPageId)} />
  };
  return map[page] ?? <OverviewPage onNavigate={onNavigate} mode={mode} />;
};
export type { UserMode };