import React, { useState } from 'react';
import { BookOpen, Clock, Users, CheckCircle, AlertCircle, Bell, Play, FileText, Video, Link2, Shield, ChevronDown, ChevronRight, MapPin, Calendar, Upload, Send, TrendingUp, Award, Heart, Globe, ExternalLink, Check, Plus, Minus, Lock, Info, Star, Zap, BarChart3, Target, MessageSquare, Download, Eye, Edit3, X } from 'lucide-react';
import { NotificationsPage, ClassMessagesPage, AnnouncementsPage, RemindersPage, SupportPage } from './VolunteerCommunicationPages';
import { VolunteerProgrammesPage } from './VolunteerProgrammesPage';

// ─── TYPES ───────────────────────────────────────────────────────────────────

type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};
type ClassItem = {
  id: string;
  name: string;
  programme: string;
  ageGroup: string;
  mode: 'Virtual' | 'Hub' | 'Hybrid';
  schedule: string;
  timezone: string;
  role: 'Lead' | 'Backup';
  learners: number;
  teamsLink: string;
  status: 'Upcoming' | 'Active' | 'Completed';
};
type MaterialItem = {
  id: string;
  title: string;
  type: 'PDF' | 'Video' | 'Link' | 'Guide';
  duration: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  section: string;
};
type QueryItem = {
  id: string;
  title: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  updated: string;
};
type EventItem = {
  id: string;
  title: string;
  location: string;
  country: string;
  date: string;
  time: string;
  type: 'Physical' | 'Hybrid' | 'Virtual';
  volunteersNeeded: number;
  learnersExpected: number;
};
type FaqItem = {
  id: string;
  q: string;
  a: string;
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const CLASSES: ClassItem[] = [{
  id: 'c1',
  name: 'Juniors AI Group A',
  programme: 'Hour of AI',
  ageGroup: '8–12',
  mode: 'Virtual',
  schedule: 'Every Saturday, 10:00 AM',
  timezone: 'GMT',
  role: 'Lead',
  learners: 14,
  teamsLink: '#',
  status: 'Upcoming'
}, {
  id: 'c2',
  name: 'Digital Skills – Nairobi Hub',
  programme: 'Digital Skills for Kids',
  ageGroup: '6–10',
  mode: 'Hub',
  schedule: 'Every Saturday, 11:00 AM',
  timezone: 'EAT',
  role: 'Backup',
  learners: 22,
  teamsLink: '#',
  status: 'Active'
}, {
  id: 'c3',
  name: 'Maths Literacy B',
  programme: 'Basic Maths Literacy',
  ageGroup: '10–14',
  mode: 'Hybrid',
  schedule: 'Every Sunday, 2:00 PM',
  timezone: 'WAT',
  role: 'Lead',
  learners: 18,
  teamsLink: '#',
  status: 'Completed'
}];
const CHECKLIST_ITEMS: ChecklistItem[] = [{
  id: 'cl1',
  label: 'Review lesson material',
  done: true
}, {
  id: 'cl2',
  label: 'Confirm availability',
  done: true
}, {
  id: 'cl3',
  label: 'Join session on time',
  done: false
}, {
  id: 'cl4',
  label: 'Log impact hours',
  done: false
}];
const MATERIALS: MaterialItem[] = [{
  id: 'm1',
  title: 'Hour of AI – Lesson Guide',
  type: 'PDF',
  duration: '15 min',
  status: 'Completed',
  section: 'Hour of AI Materials'
}, {
  id: 'm2',
  title: 'Session Slides – Week 4',
  type: 'PDF',
  duration: '10 min',
  status: 'In Progress',
  section: 'Hour of AI Materials'
}, {
  id: 'm3',
  title: 'Code.org Activity – AI for Beginners',
  type: 'Link',
  duration: '20 min',
  status: 'Not Started',
  section: 'Hour of AI Materials'
}, {
  id: 'm4',
  title: 'Facilitation Notes & Tips',
  type: 'Guide',
  duration: '8 min',
  status: 'Completed',
  section: 'Hour of AI Materials'
}, {
  id: 'm5',
  title: 'Safeguarding Guide',
  type: 'PDF',
  duration: '12 min',
  status: 'Completed',
  section: 'Safeguarding & Conduct'
}, {
  id: 'm6',
  title: 'Code of Conduct',
  type: 'PDF',
  duration: '5 min',
  status: 'Completed',
  section: 'Safeguarding & Conduct'
}, {
  id: 'm7',
  title: 'Working with Children Online',
  type: 'Video',
  duration: '18 min',
  status: 'In Progress',
  section: 'Safeguarding & Conduct'
}];
const QUERIES: QueryItem[] = [{
  id: 'q1',
  title: 'Teams link not working for Saturday session',
  category: 'Teams link issue',
  status: 'In Progress',
  updated: '2 hours ago'
}, {
  id: 'q2',
  title: 'Request to swap session date',
  category: 'Availability',
  status: 'Resolved',
  updated: '3 days ago'
}, {
  id: 'q3',
  title: 'Learner attendance concern',
  category: 'Class issue',
  status: 'Open',
  updated: 'Just now'
}];
const EVENTS: EventItem[] = [{
  id: 'e1',
  title: 'Hour of AI Open Day',
  location: 'Nairobi Hub',
  country: 'Kenya',
  date: 'Sat, 12 Jul 2025',
  time: '10:00 AM EAT',
  type: 'Hybrid',
  volunteersNeeded: 4,
  learnersExpected: 60
}, {
  id: 'e2',
  title: 'Digital Skills Workshop',
  location: 'Community Centre',
  country: 'Nigeria',
  date: 'Sat, 19 Jul 2025',
  time: '11:00 AM WAT',
  type: 'Physical',
  volunteersNeeded: 3,
  learnersExpected: 40
}, {
  id: 'e3',
  title: 'Code Club Global Open',
  location: 'Virtual',
  country: 'Global',
  date: 'Sat, 26 Jul 2025',
  time: '3:00 PM UTC',
  type: 'Virtual',
  volunteersNeeded: 8,
  learnersExpected: 200
}, {
  id: 'e4',
  title: 'AI for All – Community Day',
  location: 'Accra Hub',
  country: 'Ghana',
  date: 'Sat, 2 Aug 2025',
  time: '9:00 AM GMT',
  type: 'Physical',
  volunteersNeeded: 5,
  learnersExpected: 80
}];
const FAQS: FaqItem[] = [{
  id: 'f1',
  q: 'How do I join my class?',
  a: 'Go to My Classes, find your session, and click "Join Session". This will open the Microsoft Teams link. Ensure Teams is installed on your device before your session.'
}, {
  id: 'f2',
  q: 'What if I cannot attend my session?',
  a: 'Submit an absence request via the Queries & Support page or through your class card. Do this as early as possible so a backup volunteer can be arranged.'
}, {
  id: 'f3',
  q: 'How do I update my availability?',
  a: 'Navigate to the Availability page, adjust your weekly time blocks, and hit Save Changes. Assigned blocks are locked and cannot be removed without raising an absence request.'
}, {
  id: 'f4',
  q: 'How do I log my volunteer hours?',
  a: 'Go to Impact Hours, review your session summary, and click "Open Giving Portal" to log via your organisation\'s platform. Then check the confirmation checkbox.'
}, {
  id: 'f5',
  q: 'Who do I contact for safeguarding concerns?',
  a: 'Raise a query with category "Safeguarding Concern" immediately. This is escalated to our designated safeguarding lead within 1 hour. For urgent matters, contact hello@nurtureroots.org directly.'
}];
const TIMELINE_MONTHS = [{
  month: 'Apr',
  sessions: 4,
  hours: 5,
  students: 56
}, {
  month: 'May',
  sessions: 4,
  hours: 6,
  students: 58
}, {
  month: 'Jun',
  sessions: 5,
  hours: 7,
  students: 70
}, {
  month: 'Jul',
  sessions: 3,
  hours: 4,
  students: 42
}];
const QUERY_CATEGORIES = ['Class issue', 'Teams link issue', 'Availability', 'Training material', 'Safeguarding concern', 'Other'];
const EVENT_FILTERS = ['All', 'Virtual', 'Physical', 'Hybrid'];

// ─── SHARED MICRO COMPONENTS ─────────────────────────────────────────────────

const GreenBadge = ({
  children,
  variant = 'green'
}: {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'blue' | 'red' | 'gray';
}) => {
  const cls = {
    green: 'bg-[#e6f4ed] text-[#0B6B3A]',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-100 text-gray-600'
  }[variant];
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{children}</span>;
};
const SectionHeading = ({
  label,
  title,
  sub
}: {
  label: string;
  title: string;
  sub?: string;
}) => <div className="mb-8">
    <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-2">{label}</span>
    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
  </div>;
const MaterialTypeIcon = ({
  type
}: {
  type: MaterialItem['type'];
}) => {
  const map = {
    PDF: FileText,
    Video: Video,
    Link: Link2,
    Guide: BookOpen
  };
  const Icon = map[type];
  const color = {
    PDF: 'text-red-500 bg-red-50',
    Video: 'text-purple-500 bg-purple-50',
    Link: 'text-blue-500 bg-blue-50',
    Guide: 'text-[#0B6B3A] bg-[#e6f4ed]'
  }[type];
  return <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}><Icon size={15} /></div>;
};
const StatusDot = ({
  status
}: {
  status: QueryItem['status'];
}) => {
  const map = {
    Open: 'bg-amber-400',
    'In Progress': 'bg-blue-400',
    Resolved: 'bg-green-500'
  };
  return <span className={`w-2 h-2 rounded-full inline-block ${map[status]}`} />;
};

// ─── PAGE COMPONENTS ──────────────────────────────────────────────────────────

// PAGE 1 – OVERVIEW
const OverviewPage = ({
  onNavigate,
  onOpenClass
}: {
  onNavigate: (page: PageId) => void;
  onOpenClass: (classId: string) => void;
}) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(CHECKLIST_ITEMS);
  const [hoursLogged, setHoursLogged] = useState(false);
  const toggleItem = (id: string) => setChecklist(prev => prev.map(c => c.id === id ? {
    ...c,
    done: !c.done
  } : c));
  const completedCount = checklist.filter(c => c.done).length;
  return <div className="space-y-6">
      <SectionHeading label="Good morning, Aisha 👋" title="Your Week at a Glance" sub="Here's everything you need for this week's session." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Next Session */}
        <div className="lg:col-span-2 bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-base">Next Session</h3>
            <GreenBadge variant="green">Upcoming</GreenBadge>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shrink-0 shadow-md">
              <Play size={22} className="text-white fill-white" />
            </div>
            <div className="flex-1 space-y-1.5">
              <p className="font-bold text-gray-900 text-lg leading-snug">Juniors AI Group A</p>
              <p className="text-sm text-[#0B6B3A] font-semibold">Hour of AI Programme</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#0B6B3A]" /> Sat, 12 Jul 2025</span>
                <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#0B6B3A]" /> 10:00 AM GMT</span>
                <span className="flex items-center gap-1.5"><Globe size={12} className="text-[#0B6B3A]" /> GMT (London)</span>
                <span className="flex items-center gap-1.5"><Star size={12} className="text-[#0B6B3A]" /> Lead Volunteer</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-5 pt-5 border-t border-[#e6f4ed]">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-semibold text-sm hover:bg-[#095e32] transition-colors shadow-sm">
              <Video size={14} /> Join Session (Teams)
            </button>
            <button onClick={() => onOpenClass('c1')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#0B6B3A] text-[#0B6B3A] font-semibold text-sm hover:bg-[#e6f4ed] transition-colors">
              <Eye size={14} /> View Class Details
            </button>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="bg-gradient-to-br from-[#0B6B3A] to-[#22a860] rounded-2xl p-6 text-white flex flex-col justify-between shadow-md">
          <div>
            <Heart size={22} className="mb-3 opacity-80" />
            <p className="font-semibold text-sm leading-relaxed opacity-90">
              "Your 1 hour this week can help children gain digital confidence and support the Street2School mission."
            </p>
          </div>
          <button onClick={() => onNavigate('impact')} className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors border border-white/20">
            <TrendingUp size={13} /> View My Impact
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Weekly Checklist */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-sm">Weekly Checklist</h3>
            <span className="text-xs text-[#0B6B3A] font-bold">{completedCount}/{checklist.length} done</span>
          </div>
          <div className="w-full bg-[#e6f4ed] rounded-full h-1.5 mb-4">
            <div className="bg-[#0B6B3A] h-1.5 rounded-full transition-all duration-500" style={{
            width: `${completedCount / checklist.length * 100}%`
          }} />
          </div>
          <ul className="space-y-3">
            {checklist.map(item => <li key={item.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleItem(item.id)}>
                <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${item.done ? 'bg-[#0B6B3A] border-[#0B6B3A]' : 'border-gray-300 group-hover:border-[#0B6B3A]'}`}>
                  {item.done && <Check size={11} className="text-white" strokeWidth={3} />}
                </div>
                <span className={`text-sm transition-colors ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.label}</span>
              </li>)}
          </ul>
        </div>

        {/* Impact Summary */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Impact This Week</h3>
          <div className="space-y-3">
            {[{
            label: 'Teaching hours',
            value: '1h',
            color: 'bg-[#0B6B3A]'
          }, {
            label: 'Training/prep hours',
            value: '0.5h',
            color: 'bg-[#22a860]'
          }, {
            label: 'Total hours to log',
            value: '1.5h',
            color: 'bg-[#138a4c]'
          }, {
            label: 'Students reached',
            value: '14',
            color: 'bg-[#0d7c44]'
          }].map(stat => <div key={stat.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                  <span className="text-xs text-gray-600">{stat.label}</span>
                </div>
                <span className="text-sm font-black text-gray-900">{stat.value}</span>
              </div>)}
          </div>
          <div className="mt-4 pt-4 border-t border-[#e6f4ed]">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="hours-logged" checked={hoursLogged} onChange={e => setHoursLogged(e.target.checked)} className="w-4 h-4 accent-[#0B6B3A] cursor-pointer" />
              <label htmlFor="hours-logged" className="text-xs text-gray-600 cursor-pointer">I have logged these hours</label>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 text-sm mb-4">Alerts & Notifications</h3>
          <div className="space-y-3">
            {[{
            msg: 'You have 2 unlogged hours from last week',
            type: 'amber',
            icon: Clock
          }, {
            msg: 'New training material: Working with Children Online',
            type: 'blue',
            icon: BookOpen
          }, {
            msg: 'Absence request approved for 5 Jul',
            type: 'green',
            icon: CheckCircle
          }].map((alert, i) => {
            const Icon = alert.icon;
            const bg = alert.type === 'amber' ? 'bg-amber-50 border-amber-100' : alert.type === 'blue' ? 'bg-blue-50 border-blue-100' : 'bg-[#e6f4ed] border-[#c3e0cf]';
            const ic = alert.type === 'amber' ? 'text-amber-600' : alert.type === 'blue' ? 'text-blue-600' : 'text-[#0B6B3A]';
            return <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${bg}`}>
                  <Icon size={14} className={`${ic} mt-0.5 shrink-0`} />
                  <span className="text-xs text-gray-700 leading-snug">{alert.msg}</span>
                </div>;
          })}
          </div>
        </div>
      </div>
    </div>;
};

// PAGE 2 – MY CLASSES
const MyClassesPage = ({
  classId,
  onNavigate,
  onOpenClass
}: {
  classId?: string;
  onNavigate: (page: PageId) => void;
  onOpenClass: (classId?: string) => void;
}) => {
  const selected = classId ? CLASSES.find(cls => cls.id === classId) ?? null : null;
  const [showLearners, setShowLearners] = useState(false);
  const modeVariant = (m: ClassItem['mode']) => m === 'Virtual' ? 'blue' : m === 'Hub' ? 'green' : 'amber';
  const statusVariant = (s: ClassItem['status']) => s === 'Upcoming' ? 'green' : s === 'Active' ? 'blue' : 'gray';
  if (selected) {
    return <div className="space-y-6">
        <button onClick={() => onOpenClass()} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          <ChevronRight size={14} className="rotate-180" /> Back to My Classes
        </button>
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <h2 className="text-xl font-black text-gray-900">{selected.name}</h2>
              <p className="text-[#0B6B3A] font-semibold text-sm mt-1">{selected.programme}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <GreenBadge variant={modeVariant(selected.mode)}>{selected.mode}</GreenBadge>
              <GreenBadge variant={statusVariant(selected.status)}>{selected.status}</GreenBadge>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[{
            label: 'Age Group',
            value: selected.ageGroup
          }, {
            label: 'Schedule',
            value: selected.schedule
          }, {
            label: 'Time Zone',
            value: selected.timezone
          }, {
            label: 'Your Role',
            value: selected.role + ' Volunteer'
          }, {
            label: 'Learners',
            value: String(selected.learners)
          }, {
            label: 'Co-Volunteer',
            value: 'Kofi Mensah (Backup)'
          }].map(stat => <div key={stat.label} className="bg-[#f7fbf9] rounded-xl p-3">
                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{stat.value}</p>
              </div>)}
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors bg-[#0B6B3A] text-white hover:bg-[#095e32]">Join Session</button>
            <button onClick={() => setShowLearners(v => !v)} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]">View Learners</button>
            <button onClick={() => onNavigate('training')} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]">View Materials</button>
            <button onClick={() => onNavigate('queries')} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]">Submit Session Note</button>
            <button onClick={() => onNavigate('support')} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]">Report Issue</button>
            <button onClick={() => onNavigate('availability')} className="px-4 py-2 rounded-xl text-sm font-semibold border border-[#d1e8db] text-gray-700 hover:border-[#0B6B3A] hover:text-[#0B6B3A]">Request Absence</button>
          </div>
          {showLearners && <div className="mt-5 border-t border-[#e6f4ed] pt-5">
              <h3 className="font-bold text-gray-900 mb-3">Learners in this class</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {['Amara Hassan', 'Kofi Boateng', 'Zuri Okafor', 'Samuel Adeyemi', 'Leila Mensah'].slice(0, selected.learners).map((name, index) => <div key={name} className="flex items-center gap-3 rounded-xl bg-[#f7fbf9] p-3">
                    <div className="w-8 h-8 rounded-lg bg-[#e6f4ed] text-[#0B6B3A] flex items-center justify-center text-xs font-black">{index + 1}</div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{name}</p>
                      <p className="text-xs text-gray-500">Age group {selected.ageGroup}</p>
                    </div>
                  </div>)}
              </div>
            </div>}
        </div>
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Session History</h3>
          <div className="space-y-3">
            {[{
            date: 'Sat, 28 Jun',
            topic: 'What is AI?',
            attendance: 12,
            status: 'Delivered'
          }, {
            date: 'Sat, 21 Jun',
            topic: 'Machine Learning Basics',
            attendance: 14,
            status: 'Delivered'
          }, {
            date: 'Sat, 14 Jun',
            topic: 'AI in Everyday Life',
            attendance: 11,
            status: 'Delivered'
          }].map((s, i) => <div key={i} className="flex items-center justify-between py-3 border-b border-[#f0f4f2] last:border-0">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{s.topic}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.date} · {s.attendance} learners</p>
                </div>
                <GreenBadge variant="green">{s.status}</GreenBadge>
              </div>)}
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <SectionHeading label="Your Assignments" title="My Classes" sub="Manage your weekly teaching commitments." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {CLASSES.map(cls => <div key={cls.id} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
            <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Play size={16} className="text-white fill-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-snug">{cls.name}</p>
                <p className="text-white/70 text-xs mt-0.5">{cls.programme}</p>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1 gap-3">
              <div className="flex flex-wrap gap-2">
                <GreenBadge variant={modeVariant(cls.mode)}>{cls.mode}</GreenBadge>
                <GreenBadge variant={statusVariant(cls.status)}>{cls.status}</GreenBadge>
                <GreenBadge variant={cls.role === 'Lead' ? 'green' : 'amber'}>{cls.role}</GreenBadge>
              </div>
              <div className="space-y-1.5 text-xs text-gray-500">
                <p className="flex items-center gap-2"><Users size={11} className="text-[#0B6B3A]" /> {cls.learners} learners · Ages {cls.ageGroup}</p>
                <p className="flex items-center gap-2"><Clock size={11} className="text-[#0B6B3A]" /> {cls.schedule}</p>
                <p className="flex items-center gap-2"><Globe size={11} className="text-[#0B6B3A]" /> {cls.timezone}</p>
              </div>
              <div className="flex gap-2 mt-auto pt-3 border-t border-[#f0f4f2]">
                <button className="flex-1 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                  Join Session
                </button>
                <button onClick={() => onOpenClass(cls.id)} className="flex-1 py-2 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-xs font-bold hover:bg-[#e6f4ed] transition-colors">
                  Details
                </button>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};

// PAGE 3 – AVAILABILITY
const AvailabilityPage = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];
  const assignedBlocks = new Set(['Sat-10 AM', 'Sat-11 AM']);
  const [selected, setSelected] = useState<Set<string>>(new Set(['Mon-9 AM', 'Tue-9 AM', 'Wed-6 PM', 'Sat-10 AM', 'Sat-11 AM', 'Sun-2 PM']));
  const [tz, setTz] = useState('GMT');
  const [absenceClass, setAbsenceClass] = useState('');
  const [absenceReason, setAbsenceReason] = useState('');
  const [absenceSent, setAbsenceSent] = useState(false);
  const [saved, setSaved] = useState(false);
  const toggle = (key: string) => {
    if (assignedBlocks.has(key)) return;
    setSelected(prev => {
      const n = new Set(prev);
      n.has(key) ? n.delete(key) : n.add(key);
      return n;
    });
    setSaved(false);
  };
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  return <div className="space-y-6">
      <SectionHeading label="Manage Your Time" title="Availability" sub="Set your weekly availability to receive class assignments." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
        {[{
        label: 'Weekly Target',
        value: '3h'
      }, {
        label: 'Committed',
        value: `${selected.size}h`
      }, {
        label: 'Available',
        value: `${selected.size - assignedBlocks.size}h`
      }, {
        label: 'Assigned',
        value: `${assignedBlocks.size}h`
      }].map(s => <div key={s.label} className="bg-white border border-[#d1e8db] rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl font-black text-[#0B6B3A]">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>)}
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h3 className="font-bold text-gray-900">Weekly Grid</h3>
          <div className="flex items-center gap-3">
            <select value={tz} onChange={e => setTz(e.target.value)} className="text-xs border border-[#d1e8db] rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-[#0B6B3A]">
              {['GMT', 'EAT', 'WAT', 'BST', 'EST', 'PST'].map(t => <option key={t}>{t}</option>)}
            </select>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0B6B3A] inline-block" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Assigned</span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="text-left text-gray-400 font-medium pb-3 pr-3 w-14" />
                {days.map(d => <th key={d} className="text-center text-gray-600 font-bold pb-3 px-1 min-w-[52px]">{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {hours.map(h => <tr key={h}>
                  <td className="text-gray-400 font-medium pr-3 py-1 text-right whitespace-nowrap">{h}</td>
                  {days.map(d => {
                const key = `${d}-${h}`;
                const isAssigned = assignedBlocks.has(key);
                const isSelected = selected.has(key);
                return <td key={d} className="px-1 py-1">
                        <button onClick={() => toggle(key)} title={isAssigned ? 'Assigned – locked' : undefined} className={`w-full h-8 rounded-lg border transition-all duration-150 flex items-center justify-center
                            ${isAssigned ? 'bg-amber-400 border-amber-300 cursor-not-allowed' : isSelected ? 'bg-[#0B6B3A] border-[#0B6B3A] shadow-sm' : 'border-gray-200 hover:border-[#0B6B3A]/40 hover:bg-[#f0f9f4]'}`}>
                          {isAssigned && <Lock size={10} className="text-white" />}
                        </button>
                      </td>;
              })}
                </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-5">
          <button onClick={handleSave} className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'bg-[#0B6B3A] text-white hover:bg-[#095e32]'}`}>
            {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Absence Request */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Request Absence</h3>
        {absenceSent ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
            <CheckCircle size={18} className="text-[#0B6B3A]" />
            <p className="text-sm font-semibold text-[#0B6B3A]">Absence request submitted. You'll receive a confirmation shortly.</p>
          </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Class</label>
              <select value={absenceClass} onChange={e => setAbsenceClass(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]">
                <option value="">Select class</option>
                {CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reason</label>
              <input value={absenceReason} onChange={e => setAbsenceReason(e.target.value)} placeholder="Brief reason…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button onClick={() => {
            if (absenceClass && absenceReason) setAbsenceSent(true);
          }} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-semibold text-sm hover:bg-[#095e32] transition-colors">
                Submit Request
              </button>
            </div>
          </div>}
        <div className="mt-5 space-y-2">
          {[{
          label: '5 Jul – Maths Literacy B',
          status: 'Approved' as const
        }, {
          label: '21 Jun – Juniors AI Group A',
          status: 'Resolved' as const
        }].map((r, i) => <div key={i} className="flex items-center justify-between text-sm py-2 border-b border-[#f0f4f2] last:border-0">
              <span className="text-gray-700">{r.label}</span>
              <GreenBadge variant={r.status === 'Approved' ? 'green' : 'gray'}>{r.status}</GreenBadge>
            </div>)}
        </div>
      </div>
    </div>;
};

// PAGE 4 – TRAINING & PREP
const TrainingPage = () => {
  const sections = Array.from(new Set(MATERIALS.map(m => m.section)));
  const prepChecklist = [{
    id: 'p1',
    label: 'Read session guide',
    done: true
  }, {
    id: 'p2',
    label: 'Test Teams link',
    done: true
  }, {
    id: 'p3',
    label: 'Prepare opening question',
    done: false
  }, {
    id: 'p4',
    label: 'Review learner age group',
    done: false
  }];
  const [prep, setPrep] = useState(prepChecklist);
  const togglePrep = (id: string) => setPrep(prev => prev.map(p => p.id === id ? {
    ...p,
    done: !p.done
  } : p));
  return <div className="space-y-6">
      <SectionHeading label="Level Up Your Skills" title="Training & Prep" sub="Everything you need to deliver an excellent session." />

      <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md">
        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
          <Star size={22} />
        </div>
        <div>
          <p className="font-bold text-base">Recommended for You</p>
          <p className="text-white/80 text-sm">Based on your Hour of AI programme and upcoming session.</p>
        </div>
        <div className="sm:ml-auto flex items-center gap-2 bg-white/15 rounded-xl px-4 py-2 text-sm font-bold border border-white/20">
          <BookOpen size={14} /> Session Guide – Week 4
        </div>
      </div>

      {sections.map(section => <div key={section} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e6f4ed] bg-[#f7fbf9]">
            <div className="w-8 h-8 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center">
              {section.includes('Safe') ? <Shield size={15} className="text-[#0B6B3A]" /> : <BookOpen size={15} className="text-[#0B6B3A]" />}
            </div>
            <h3 className="font-bold text-gray-900 text-sm">{section}</h3>
          </div>
          <div className="divide-y divide-[#f0f4f2]">
            {MATERIALS.filter(m => m.section === section).map(mat => <div key={mat.id} className="flex items-center gap-4 px-5 py-4 hover:bg-[#fafcfa] transition-colors">
                <MaterialTypeIcon type={mat.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{mat.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-400">{mat.type} · {mat.duration}</span>
                    <GreenBadge variant={mat.status === 'Completed' ? 'green' : mat.status === 'In Progress' ? 'blue' : 'gray'}>{mat.status}</GreenBadge>
                  </div>
                </div>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#d1e8db] text-[#0B6B3A] text-xs font-bold hover:bg-[#e6f4ed] transition-colors shrink-0">
                  <ExternalLink size={11} /> Open
                </button>
              </div>)}
          </div>
        </div>)}

      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Weekly Prep Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prep.map(item => <div key={item.id} className="flex items-center gap-3 cursor-pointer group" onClick={() => togglePrep(item.id)}>
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${item.done ? 'bg-[#0B6B3A] border-[#0B6B3A]' : 'border-gray-300 group-hover:border-[#0B6B3A]'}`}>
                {item.done && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
              <span className={`text-sm transition-colors ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.label}</span>
            </div>)}
        </div>
      </div>
    </div>;
};

// PAGE 5 – IMPACT HOURS
const ImpactHoursPage = () => {
  const [logged, setLogged] = useState(false);
  return <div className="space-y-6">
      <SectionHeading label="Your Contribution" title="Impact Hours" sub="Track and log your volunteer contributions." />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {[{
        label: 'Teaching Hours',
        value: '1h',
        icon: Play
      }, {
        label: 'Training/Prep',
        value: '0.5h',
        icon: BookOpen
      }, {
        label: 'Total Hours',
        value: '1.5h',
        icon: Clock
      }, {
        label: 'Students Reached',
        value: '14',
        icon: Users
      }, {
        label: 'Sessions',
        value: '1',
        icon: Award
      }].map(stat => {
        const Icon = stat.icon;
        return <div key={stat.label} className="bg-white border border-[#d1e8db] rounded-2xl p-4 text-center shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center mx-auto mb-2">
                <Icon size={15} className="text-[#0B6B3A]" />
              </div>
              <p className="text-2xl font-black text-[#0B6B3A]">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>;
      })}
      </div>

      <div className="bg-gradient-to-br from-[#f0f9f4] to-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center shrink-0 mt-0.5">
            <Info size={18} className="text-[#0B6B3A]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Hour Logging Reminder</h3>
            <p className="text-sm text-gray-600 mb-4">Please log your eligible volunteer hours using your organisation's giving platform.</p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-semibold text-sm hover:bg-[#095e32] transition-colors shadow-sm">
              <ExternalLink size={14} /> Open Giving Portal
            </button>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-[#d1e8db] flex items-center gap-3">
          <input type="checkbox" id="confirmed" checked={logged} onChange={e => setLogged(e.target.checked)} className="w-4 h-4 accent-[#0B6B3A] cursor-pointer" />
          <label htmlFor="confirmed" className="text-sm font-semibold text-gray-700 cursor-pointer">I have logged these hours</label>
          {logged && <GreenBadge variant="green"><Check size={10} className="mr-1" />Confirmed</GreenBadge>}
        </div>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4">Unlogged Hours</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[{
          label: 'This week',
          value: '1.5h',
          color: 'text-amber-600'
        }, {
          label: 'Previous weeks',
          value: '0.5h',
          color: 'text-red-500'
        }, {
          label: 'Total unlogged',
          value: '2h',
          color: 'text-red-600'
        }].map(u => <div key={u.label} className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
              <p className={`text-2xl font-black ${u.color}`}>{u.value}</p>
              <p className="text-xs text-gray-500 mt-1">{u.label}</p>
            </div>)}
        </div>
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5">Impact Timeline</h3>
        <div className="space-y-4">
          {TIMELINE_MONTHS.map(m => <div key={m.month} className="flex items-center gap-4">
              <span className="text-xs font-bold text-gray-500 w-8">{m.month}</span>
              <div className="flex-1 grid grid-cols-3 gap-3">
                {[{
              label: 'Sessions',
              value: m.sessions,
              max: 5
            }, {
              label: 'Hours',
              value: m.hours,
              max: 8
            }, {
              label: 'Students',
              value: m.students,
              max: 80
            }].map(bar => <div key={bar.label}>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{bar.label}</span>
                      <span className="font-bold text-gray-700">{bar.value}</span>
                    </div>
                    <div className="h-2 bg-[#e6f4ed] rounded-full">
                      <div className="h-2 bg-[#0B6B3A] rounded-full" style={{
                  width: `${bar.value / bar.max * 100}%`
                }} />
                    </div>
                  </div>)}
              </div>
            </div>)}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#0B6B3A] to-[#22a860] rounded-2xl p-6 text-white shadow-md">
        <Target size={22} className="mb-3 opacity-80" />
        <p className="font-semibold text-sm leading-relaxed opacity-90 max-w-lg">
          "Small weekly actions create long-term change. Your time is helping children access digital skills and supporting education for out-of-school learners worldwide."
        </p>
      </div>
    </div>;
};

// PAGE 6 – QUERIES & SUPPORT
const QueriesPage = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const handleSubmit = () => {
    if (category && message.trim()) {
      setSubmitted(true);
      setCategory('');
      setMessage('');
    }
  };
  return <div className="space-y-6">
      <SectionHeading label="We're Here to Help" title="Queries & Support" sub="Raise a query or browse common questions." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raise Query */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Raise a Query</h3>
          {submitted ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Query submitted! We'll respond within 24 hours.</p>
            </div> : <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]">
                  <option value="">Select category…</option>
                  {QUERY_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Describe your query…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Attachment (optional)</label>
                <div className="border-2 border-dashed border-[#d1e8db] rounded-xl p-4 text-center cursor-pointer hover:border-[#0B6B3A] hover:bg-[#f7fbf9] transition-colors">
                  <Upload size={18} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Click to upload or drag & drop</p>
                </div>
              </div>
              <button onClick={handleSubmit} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors flex items-center justify-center gap-2">
                <Send size={14} /> Submit Query
              </button>
            </div>}
        </div>

        {/* My Queries */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">My Queries</h3>
          <div className="space-y-3">
            {QUERIES.map(q => <div key={q.id} className="border border-[#e6f4ed] rounded-xl p-4 hover:border-[#c3e0cf] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{q.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{q.category} · {q.updated}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <StatusDot status={q.status} />
                    <span className="text-xs font-semibold text-gray-600">{q.status}</span>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e6f4ed] bg-[#f7fbf9]">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><MessageSquare size={16} className="text-[#0B6B3A]" /> Frequently Asked Questions</h3>
        </div>
        <div className="divide-y divide-[#f0f4f2]">
          {FAQS.map(faq => <div key={faq.id}>
              <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#fafcfa] transition-colors">
                <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown size={16} className={`text-[#0B6B3A] shrink-0 transition-transform ${openFaq === faq.id ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === faq.id && <div className="px-6 pb-5">
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>}
            </div>)}
        </div>
      </div>
    </div>;
};

// PAGE 7 – UPCOMING EVENTS
const EventsPage = () => {
  const [filter, setFilter] = useState('All');
  const [showPropose, setShowPropose] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposal, setProposal] = useState({
    title: '',
    location: '',
    date: '',
    learners: '',
    support: ''
  });
  const filtered = filter === 'All' ? EVENTS : EVENTS.filter(e => e.type === filter);
  const typeVariant = (t: EventItem['type']) => t === 'Virtual' ? 'blue' : t === 'Physical' ? 'amber' : 'green';
  return <div className="space-y-6">
      <SectionHeading label="Get Involved" title="Upcoming Events & Local Sessions" sub="Volunteer for events and help bring AI education to your community." />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {EVENT_FILTERS.map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f ? 'bg-[#0B6B3A] text-white' : 'border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
              {f}
            </button>)}
        </div>
        <button onClick={() => setShowPropose(v => !v)} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-[#0B6B3A] text-[#0B6B3A] font-bold text-sm hover:bg-[#e6f4ed] transition-colors">
          <Plus size={15} /> Propose a Local Session
        </button>
      </div>

      {showPropose && <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Propose a Local Session</h3>
          {proposalSent ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">Proposal submitted! Our team will review and get back to you.</p>
            </div> : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{
          key: 'title',
          label: 'Event Title',
          placeholder: 'e.g. Hour of AI Community Day'
        }, {
          key: 'location',
          label: 'Location',
          placeholder: 'City, Country'
        }, {
          key: 'date',
          label: 'Proposed Date',
          placeholder: 'e.g. Sat, 20 Sep 2025'
        }, {
          key: 'learners',
          label: 'Expected Learners',
          placeholder: 'e.g. 30'
        }].map(field => <div key={field.key}>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">{field.label}</label>
                  <input value={proposal[field.key as keyof typeof proposal]} onChange={e => setProposal(p => ({
            ...p,
            [field.key]: e.target.value
          }))} placeholder={field.placeholder} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
                </div>)}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Support Needed</label>
                <textarea value={proposal.support} onChange={e => setProposal(p => ({
            ...p,
            support: e.target.value
          }))} rows={2} placeholder="What do you need from us?" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <button onClick={() => setProposalSent(true)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">Submit Proposal</button>
              </div>
            </div>}
        </div>}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {filtered.map(ev => <div key={ev.id} className="bg-white border border-[#d1e8db] rounded-2xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold text-gray-900 text-base leading-snug">{ev.title}</h3>
              <GreenBadge variant={typeVariant(ev.type)}>{ev.type}</GreenBadge>
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="flex items-center gap-2"><MapPin size={11} className="text-[#0B6B3A]" /> {ev.location}, {ev.country}</p>
              <p className="flex items-center gap-2"><Calendar size={11} className="text-[#0B6B3A]" /> {ev.date}</p>
              <p className="flex items-center gap-2"><Clock size={11} className="text-[#0B6B3A]" /> {ev.time}</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="bg-[#f0f9f4] rounded-xl px-3 py-2 text-center">
                <p className="font-black text-[#0B6B3A] text-lg leading-none">{ev.volunteersNeeded}</p>
                <p className="text-gray-500 mt-0.5">Volunteers needed</p>
              </div>
              <div className="bg-[#f0f9f4] rounded-xl px-3 py-2 text-center">
                <p className="font-black text-[#0B6B3A] text-lg leading-none">{ev.learnersExpected}</p>
                <p className="text-gray-500 mt-0.5">Learners expected</p>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
              Volunteer for Event
            </button>
          </div>)}
      </div>
    </div>;
};

// PAGE 8 – PROFILE
const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Aisha Kamara',
    email: 'aisha.k@volunteerhub.org',
    country: 'Sierra Leone',
    timezone: 'GMT',
    organisation: 'VolunteerHub Global',
    programmes: ['Hour of AI', 'Digital Skills for Kids'],
    skills: 'AI, Teaching, Facilitation',
    ageGroups: '8–12, 12–16',
    delivery: 'Both',
    commitment: '2 hours/week'
  });
  return <div className="space-y-6">
      <SectionHeading label="Your Identity" title="Volunteer Profile" sub="Keep your profile up to date for better matching." />

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-md">
            👩🏾
          </div>
          <div>
            <h3 className="text-white font-black text-xl">{profile.name}</h3>
            <p className="text-white/70 text-sm mt-0.5">{profile.email}</p>
            <div className="flex gap-2 mt-2">
              <GreenBadge variant="green">Lead Volunteer</GreenBadge>
            </div>
          </div>
          <button onClick={() => setEditing(v => !v)} className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-bold border border-white/20 transition-colors">
            <Edit3 size={13} /> {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[{
          label: 'Full Name',
          key: 'name'
        }, {
          label: 'Email',
          key: 'email'
        }, {
          label: 'Country',
          key: 'country'
        }, {
          label: 'Time Zone',
          key: 'timezone'
        }, {
          label: 'Organisation',
          key: 'organisation'
        }, {
          label: 'Skills',
          key: 'skills'
        }, {
          label: 'Preferred Age Groups',
          key: 'ageGroups'
        }, {
          label: 'Delivery Preference',
          key: 'delivery'
        }, {
          label: 'Weekly Commitment',
          key: 'commitment'
        }].map(field => <div key={field.key}>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{field.label}</label>
              {editing ? <input value={profile[field.key as keyof typeof profile] as string} onChange={e => setProfile(p => ({
            ...p,
            [field.key]: e.target.value
          }))} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" /> : <p className="text-sm font-semibold text-gray-900">{profile[field.key as keyof typeof profile] as string}</p>}
            </div>)}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Programmes Selected</label>
            <div className="flex flex-wrap gap-2">
              {profile.programmes.map(p => <GreenBadge key={p} variant="green">{p}</GreenBadge>)}
            </div>
          </div>
        </div>

        {editing && <div className="px-6 pb-6">
            <button onClick={() => setEditing(false)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors">
              Save Changes
            </button>
          </div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['Change Password', 'Notification Preferences', 'Account Settings'].map(action => <button key={action} className="py-3 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-semibold hover:bg-[#e6f4ed] hover:border-[#0B6B3A] transition-colors">
            {action}
          </button>)}
      </div>
    </div>;
};

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export type PageId = 'overview' | 'classes' | 'programmes' | 'availability' | 'training' | 'impact' | 'queries' | 'events' | 'profile' | 'notifications' | 'messages' | 'announcements' | 'reminders' | 'support';
export const DashboardPage = ({
  page,
  classId,
  onNavigate,
  onOpenClass
}: {
  page: PageId;
  classId?: string;
  onNavigate: (page: PageId) => void;
  onOpenClass: (classId?: string) => void;
}) => {
  const map: Record<PageId, React.ReactElement> = {
    overview: <OverviewPage onNavigate={onNavigate} onOpenClass={onOpenClass} />,
    classes: <MyClassesPage classId={classId} onNavigate={onNavigate} onOpenClass={onOpenClass} />,
    programmes: <VolunteerProgrammesPage onOpenTraining={() => onNavigate('training')} />,
    availability: <AvailabilityPage />,
    training: <TrainingPage />,
    impact: <ImpactHoursPage />,
    queries: <QueriesPage />,
    events: <EventsPage />,
    profile: <ProfilePage />,
    notifications: <NotificationsPage />,
    messages: <ClassMessagesPage />,
    announcements: <AnnouncementsPage />,
    reminders: <RemindersPage />,
    support: <SupportPage />
  };
  return map[page] ?? <OverviewPage onNavigate={onNavigate} onOpenClass={onOpenClass} />;
};
