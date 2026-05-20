import React, { useState } from 'react';
import { Bell, MessageSquare, Megaphone, AlarmClock, HelpCircle, BookOpen, Calendar, Clock, Users, CheckCircle, AlertCircle, Play, Video, Send, Upload, Shield, Check, X, Pin, ChevronDown, Star, Zap, Heart, Info, ExternalLink, Paperclip, Eye, EyeOff, Award, TrendingUp } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type NotifType = 'class' | 'announcement' | 'alert' | 'event' | 'training';
type Notification = {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  urgent?: boolean;
};
type ClassThread = {
  id: string;
  className: string;
  programme: string;
  participants: string[];
  lastMessage: string;
  lastTime: string;
  unread: number;
};
type ThreadMessage = {
  id: string;
  sender: string;
  role: 'admin' | 'co-volunteer' | 'hub-admin' | 'parent';
  text: string;
  time: string;
  pinned?: boolean;
};
type Announcement = {
  id: string;
  title: string;
  body: string;
  type: 'General' | 'Programme' | 'Class' | 'Urgent';
  date: string;
  sender: string;
  read: boolean;
  pinned?: boolean;
};
type ReminderItem = {
  id: string;
  label: string;
  status: 'done' | 'pending' | 'urgent';
};
type SupportQuery = {
  id: string;
  title: string;
  category: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  updated: string;
};
type NotifFilter = 'All' | 'Classes' | 'Announcements' | 'Alerts' | 'Events';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NOTIFICATIONS_DATA: Notification[] = [{
  id: 'n1',
  type: 'alert',
  title: 'Unlogged Hours Reminder',
  message: 'You have 2 unlogged hours from last week. Please log them via the Impact Hours page.',
  time: '2 hours ago',
  read: false,
  urgent: true
}, {
  id: 'n2',
  type: 'class',
  title: 'Session Reminder – Juniors AI Group A',
  message: 'Your next session is tomorrow, Saturday 12 Jul at 10:00 AM GMT. Make sure you\'re prepared.',
  time: '3 hours ago',
  read: false
}, {
  id: 'n3',
  type: 'training',
  title: 'New Material Available',
  message: 'A new training resource has been added: "Working with Children Online". Please review before your session.',
  time: '1 day ago',
  read: false
}, {
  id: 'n4',
  type: 'class',
  title: 'Absence Request Approved',
  message: 'Your absence request for 5 Jul (Maths Literacy B) has been approved. A backup volunteer has been arranged.',
  time: '3 days ago',
  read: true
}, {
  id: 'n5',
  type: 'event',
  title: 'New Event Near You',
  message: 'Hour of AI Open Day at Nairobi Hub on Sat, 12 Jul. Volunteers are needed — register your interest now.',
  time: '4 days ago',
  read: true
}, {
  id: 'n6',
  type: 'announcement',
  title: 'Programme Update – Hour of AI',
  message: 'Week 5 session materials have been updated with new activities. Please download the latest version.',
  time: '5 days ago',
  read: true
}];
const CLASS_THREADS: ClassThread[] = [{
  id: 'ct1',
  className: 'Juniors AI Group A',
  programme: 'Hour of AI',
  participants: ['Aisha Kamara (You)', 'Kofi Mensah (Co-volunteer)', 'Nairobi Hub Admin'],
  lastMessage: 'Hub Admin: Session confirmed for Saturday. Teams link has been updated.',
  lastTime: '1 hour ago',
  unread: 2
}, {
  id: 'ct2',
  className: 'Digital Skills – Nairobi Hub',
  programme: 'Digital Skills for Kids',
  participants: ['Aisha Kamara (You)', 'Grace Osei (Co-volunteer)', 'Parent Rep – Amara'],
  lastMessage: 'Parent Rep: Thank you for your patience last week, the children really enjoyed it.',
  lastTime: '2 days ago',
  unread: 0
}, {
  id: 'ct3',
  className: 'Maths Literacy B',
  programme: 'Basic Maths Literacy',
  participants: ['Aisha Kamara (You)', 'WAT Hub Admin'],
  lastMessage: 'WAT Hub Admin: This class is now marked as Completed. Well done, Aisha!',
  lastTime: '1 week ago',
  unread: 0
}];
const THREAD_MESSAGES: ThreadMessage[] = [{
  id: 'tm0',
  sender: 'Nairobi Hub Admin',
  role: 'hub-admin',
  text: '📌 PINNED: All volunteers please remember that sessions must start on time. The Teams link for this week is updated in the class details.',
  time: 'Mon, 7 Jul',
  pinned: true
}, {
  id: 'tm1',
  sender: 'Kofi Mensah',
  role: 'co-volunteer',
  text: 'Hi Aisha! Confirmed for Saturday — I\'ve reviewed the Week 4 materials and they look great.',
  time: 'Wed, 9 Jul · 3:22 PM'
}, {
  id: 'tm2',
  sender: 'Nairobi Hub Admin',
  role: 'hub-admin',
  text: 'Session confirmed for Saturday. Teams link has been updated. Please test the link before 9:30 AM.',
  time: 'Thu, 10 Jul · 10:05 AM'
}, {
  id: 'tm3',
  sender: 'Nairobi Hub Admin',
  role: 'hub-admin',
  text: 'Also — we have 14 learners confirmed this week. A parent rep may join briefly to observe. No direct communication with learners or parents please.',
  time: 'Thu, 10 Jul · 10:07 AM'
}];
const ANNOUNCEMENTS_DATA: Announcement[] = [{
  id: 'a1',
  title: 'Review Your Hour of AI Session Guide This Weekend',
  body: 'Reminder: Please review the Hour of AI session guide before your class this weekend. Week 4 covers "How AI Makes Decisions" — the updated slide deck is now available in Training & Prep.',
  type: 'Urgent',
  date: 'Thu, 10 Jul 2025',
  sender: 'Nurture Roots Admin',
  read: false,
  pinned: true
}, {
  id: 'a2',
  title: 'Safeguarding Refresher — All Volunteers Required',
  body: 'All active volunteers are required to complete the updated "Working with Children Online" module before 31 July 2025. This is mandatory for continued participation.',
  type: 'Programme',
  date: 'Tue, 8 Jul 2025',
  sender: 'Safeguarding Team',
  read: false
}, {
  id: 'a3',
  title: 'New Community Session Opportunity – Lagos Hub',
  body: 'We are planning a community open day in Lagos on 2 August. If you are available and based in or near Lagos, please register your interest via the Events page.',
  type: 'General',
  date: 'Mon, 7 Jul 2025',
  sender: 'Programmes Team',
  read: true
}, {
  id: 'a4',
  title: 'Thank You — June Impact Report',
  body: 'In June, our volunteer community delivered 180 sessions to 2,400 learners across 12 countries. Your dedication made this possible. Read the full impact report on the portal.',
  type: 'General',
  date: 'Fri, 4 Jul 2025',
  sender: 'Nurture Roots Admin',
  read: true
}, {
  id: 'a5',
  title: 'Hour of AI – Week 5 Materials Updated',
  body: 'Week 5 session materials have been revised with new interactive activities. Please download the latest version from Training & Prep before your next session.',
  type: 'Class',
  date: 'Wed, 2 Jul 2025',
  sender: 'Curriculum Team',
  read: true
}];
const REMINDER_CHECKLIST: ReminderItem[] = [{
  id: 'r1',
  label: 'Review Week 4 session guide',
  status: 'done'
}, {
  id: 'r2',
  label: 'Test Teams link before session',
  status: 'pending'
}, {
  id: 'r3',
  label: 'Prepare opening question for learners',
  status: 'pending'
}, {
  id: 'r4',
  label: 'Log impact hours from last week',
  status: 'urgent'
}, {
  id: 'r5',
  label: 'Complete safeguarding refresher module',
  status: 'pending'
}, {
  id: 'r6',
  label: 'Confirm availability for next week',
  status: 'done'
}];
const SUPPORT_QUERIES: SupportQuery[] = [{
  id: 'sq1',
  title: 'Teams link not working for Saturday session',
  category: 'Technical issue',
  status: 'In Progress',
  updated: '2 hours ago'
}, {
  id: 'sq2',
  title: 'Request to swap session date – 19 Jul',
  category: 'Availability issue',
  status: 'Resolved',
  updated: '3 days ago'
}, {
  id: 'sq3',
  title: 'Learner attendance concern – Juniors AI',
  category: 'Class issue',
  status: 'Open',
  updated: 'Just now'
}];
const SUPPORT_CATEGORIES = ['Class issue', 'Availability issue', 'Technical issue', 'Safeguarding concern', 'Training material', 'Other'];
const MILESTONES = [{
  id: 'ms1',
  icon: '🎉',
  label: 'First Session',
  earned: true
}, {
  id: 'ms2',
  icon: '⏱️',
  label: '10 Hours',
  earned: true
}, {
  id: 'ms3',
  icon: '👥',
  label: '50 Learners',
  earned: false
}, {
  id: 'ms4',
  icon: '🌍',
  label: '3 Programmes',
  earned: false
}];
const NOTIF_FILTERS: NotifFilter[] = ['All', 'Classes', 'Announcements', 'Alerts', 'Events'];

// ─── SHARED MICRO COMPONENTS ─────────────────────────────────────────────────

const Badge = ({
  children,
  variant = 'green'
}: {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'blue' | 'red' | 'gray' | 'purple';
}) => {
  const cls: Record<string, string> = {
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
const SectionHeading = ({
  label,
  title,
  sub
}: {
  label: string;
  title: string;
  sub?: string;
}) => <div className="mb-8">
    <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-2">
      {label}
    </span>
    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    {sub && <p className="text-gray-500 text-sm mt-1">{sub}</p>}
  </div>;
const SafeguardingNote = () => <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
    <Shield size={14} className="text-amber-600 mt-0.5 shrink-0" />
    <p className="text-xs text-amber-800 leading-snug">
      <strong>Safeguarding: </strong>
      <span>Communication is monitored to ensure a safe learning environment. Volunteers must not message children directly.</span>
    </p>
  </div>;

// ─── PAGE 1 – NOTIFICATIONS ───────────────────────────────────────────────────

export const NotificationsPage = () => {
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFICATIONS_DATA);
  const [filter, setFilter] = useState<NotifFilter>('All');
  const filterMap: Record<NotifFilter, NotifType[]> = {
    All: ['class', 'announcement', 'alert', 'event', 'training'],
    Classes: ['class'],
    Announcements: ['announcement'],
    Alerts: ['alert', 'training'],
    Events: ['event']
  };
  const filtered = notifs.filter(n => filterMap[filter].includes(n.type));
  const unreadCount = notifs.filter(n => !n.read).length;
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? {
    ...n,
    read: true
  } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({
    ...n,
    read: true
  })));
  const typeIcon = (type: NotifType) => {
    const map: Record<NotifType, React.ElementType> = {
      class: Calendar,
      announcement: Megaphone,
      alert: AlertCircle,
      event: Star,
      training: BookOpen
    };
    return map[type];
  };
  const typeColor = (type: NotifType, urgent?: boolean) => {
    if (urgent) return 'bg-red-50 border-red-100';
    const map: Record<NotifType, string> = {
      class: 'bg-[#e6f4ed] border-[#c3e0cf]',
      announcement: 'bg-blue-50 border-blue-100',
      alert: 'bg-amber-50 border-amber-100',
      event: 'bg-purple-50 border-purple-100',
      training: 'bg-blue-50 border-blue-100'
    };
    return map[type];
  };
  const iconColor = (type: NotifType, urgent?: boolean) => {
    if (urgent) return 'text-red-500';
    const map: Record<NotifType, string> = {
      class: 'text-[#0B6B3A]',
      announcement: 'text-blue-500',
      alert: 'text-amber-500',
      event: 'text-purple-500',
      training: 'text-blue-500'
    };
    return map[type];
  };
  return <div className="space-y-6">
      <SectionHeading label="Stay Informed" title="Notifications" sub="All your important updates in one place." />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {NOTIF_FILTERS.map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === f ? 'bg-[#0B6B3A] text-white' : 'border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
              {f}
            </button>)}
        </div>
        {unreadCount > 0 && <button onClick={markAllRead} className="text-xs font-bold text-[#0B6B3A] hover:underline">
            Mark all as read ({unreadCount})
          </button>}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <div className="bg-white border border-[#d1e8db] rounded-2xl p-10 text-center">
            <Bell size={28} className="text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-medium">No notifications here</p>
          </div>}
        {filtered.map(notif => {
        const Icon = typeIcon(notif.type);
        return <div key={notif.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${notif.urgent ? 'bg-red-50 border-red-100' : notif.read ? 'bg-white border-[#e6f4ed]' : 'bg-white border-[#d1e8db] shadow-sm'}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${typeColor(notif.type, notif.urgent)}`}>
                <Icon size={15} className={iconColor(notif.type, notif.urgent)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold leading-snug ${notif.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {notif.title}
                    {notif.urgent && <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold">
                        Urgent
                      </span>}
                  </p>
                  {!notif.read && <span className="w-2 h-2 bg-[#0B6B3A] rounded-full shrink-0 mt-1.5" />}
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{notif.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-gray-400">{notif.time}</span>
                  {!notif.read && <button onClick={() => markRead(notif.id)} className="text-[10px] font-semibold text-[#0B6B3A] hover:underline">
                      Mark as read
                    </button>}
                </div>
              </div>
            </div>;
      })}
      </div>
    </div>;
};

// ─── PAGE 2 – CLASS MESSAGES ──────────────────────────────────────────────────

export const ClassMessagesPage = () => {
  const [activeThread, setActiveThread] = useState<ClassThread | null>(null);
  const [messages, setMessages] = useState<ThreadMessage[]>(THREAD_MESSAGES);
  const [replyText, setReplyText] = useState('');
  const handleSend = () => {
    if (!replyText.trim()) return;
    const newMsg: ThreadMessage = {
      id: `tm-${Date.now()}`,
      sender: 'Aisha Kamara (You)',
      role: 'co-volunteer',
      text: replyText.trim(),
      time: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
    setReplyText('');
  };
  const roleLabel = (role: ThreadMessage['role']) => {
    const map: Record<ThreadMessage['role'], string> = {
      admin: 'Admin',
      'co-volunteer': 'Co-volunteer',
      'hub-admin': 'Hub Admin',
      parent: 'Parent Rep'
    };
    return map[role];
  };
  const roleColor = (role: ThreadMessage['role']) => {
    const map: Record<ThreadMessage['role'], string> = {
      admin: 'bg-[#0B6B3A] text-white',
      'co-volunteer': 'bg-blue-600 text-white',
      'hub-admin': 'bg-purple-600 text-white',
      parent: 'bg-amber-500 text-white'
    };
    return map[role];
  };
  if (activeThread) {
    const pinnedMsgs = messages.filter(m => m.pinned);
    const regularMsgs = messages.filter(m => !m.pinned);
    return <div className="space-y-5">
        <button onClick={() => setActiveThread(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B6B3A] hover:underline">
          ← Back to Class Messages
        </button>

        <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageSquare size={17} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-base leading-snug truncate">
                {activeThread.className}
              </h3>
              <p className="text-white/70 text-xs mt-0.5">{activeThread.programme}</p>
            </div>
            <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-colors">
              <Video size={12} /> Join Session
            </button>
          </div>

          <div className="px-5 py-3 border-b border-[#e6f4ed] bg-[#f7fbf9] flex flex-wrap gap-2 items-center">
            <Users size={12} className="text-[#0B6B3A]" />
            {activeThread.participants.map(p => <span key={p} className="text-xs text-gray-600 font-medium">{p}</span>)}
          </div>

          <SafeguardingNote />

          <div className="px-5 py-4 space-y-4 min-h-64 max-h-96 overflow-y-auto">
            {pinnedMsgs.map(msg => <div key={msg.id} className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <Pin size={12} className="text-amber-600 mt-1 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${roleColor(msg.role)}`}>
                      {roleLabel(msg.role)}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{msg.sender}</span>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
                </div>
              </div>)}

            {regularMsgs.map(msg => {
            const isMe = msg.sender.includes('(You)');
            return <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${roleColor(msg.role)}`}>
                    {msg.sender.charAt(0)}
                  </div>
                  <div className={`max-w-sm ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    {!isMe && <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-700">{msg.sender}</span>
                        <Badge variant={msg.role === 'hub-admin' ? 'purple' : msg.role === 'admin' ? 'green' : 'blue'}>
                          {roleLabel(msg.role)}
                        </Badge>
                      </div>}
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe ? 'bg-[#0B6B3A] text-white rounded-tr-sm' : 'bg-[#f5fbf7] border border-[#d1e8db] text-gray-800 rounded-tl-sm'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  </div>
                </div>;
          })}
          </div>

          <div className="px-5 py-4 border-t border-[#e6f4ed] bg-[#fafcfa]">
            <div className="flex items-end gap-3">
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }} rows={2} placeholder="Type a message… (Enter to send)" className="flex-1 border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              <div className="flex flex-col gap-2 shrink-0">
                <button className="p-2.5 rounded-xl border border-[#d1e8db] text-gray-400 hover:text-[#0B6B3A] hover:border-[#0B6B3A] transition-colors">
                  <Paperclip size={15} />
                </button>
                <button onClick={handleSend} className="p-2.5 rounded-xl bg-[#0B6B3A] text-white hover:bg-[#095e32] transition-colors">
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <SectionHeading label="Class Communication" title="Class Messages" sub="Communicate safely within your assigned classes." />

      <SafeguardingNote />

      <div className="space-y-3">
        {CLASS_THREADS.map(thread => <button key={thread.id} onClick={() => setActiveThread(thread)} className="w-full text-left bg-white border border-[#d1e8db] rounded-2xl p-5 hover:shadow-md hover:border-[#a8d4bb] transition-all duration-200">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shrink-0">
                <MessageSquare size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900 truncate">{thread.className}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {thread.unread > 0 && <span className="text-[10px] font-bold bg-[#0B6B3A] text-white px-2 py-0.5 rounded-full">
                        {thread.unread} new
                      </span>}
                    <span className="text-[10px] text-gray-400">{thread.lastTime}</span>
                  </div>
                </div>
                <p className="text-xs text-[#0B6B3A] font-medium mt-0.5">{thread.programme}</p>
                <p className="text-xs text-gray-500 mt-1.5 truncate">{thread.lastMessage}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {thread.participants.map(p => <span key={p} className="text-[10px] bg-[#f0f9f4] text-gray-600 px-2 py-0.5 rounded-full">
                      {p}
                    </span>)}
                </div>
              </div>
            </div>
          </button>)}
      </div>
    </div>;
};

// ─── PAGE 3 – ANNOUNCEMENTS ───────────────────────────────────────────────────

export const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(ANNOUNCEMENTS_DATA);
  const [expanded, setExpanded] = useState<string | null>(null);
  const markRead = (id: string) => setAnnouncements(prev => prev.map(a => a.id === id ? {
    ...a,
    read: true
  } : a));
  const markAllRead = () => setAnnouncements(prev => prev.map(a => ({
    ...a,
    read: true
  })));
  const typeVariant = (type: Announcement['type']) => {
    const map: Record<Announcement['type'], 'red' | 'blue' | 'green' | 'gray'> = {
      Urgent: 'red',
      Programme: 'blue',
      Class: 'green',
      General: 'gray'
    };
    return map[type];
  };
  const pinned = announcements.filter(a => a.pinned);
  const regular = announcements.filter(a => !a.pinned);
  const unread = announcements.filter(a => !a.read).length;
  return <div className="space-y-6">
      <SectionHeading label="From the Team" title="Announcements" sub="Important messages from the Nurture Roots team." />

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">
          {unread > 0 ? `${unread} unread` : 'All caught up ✓'}
        </span>
        {unread > 0 && <button onClick={markAllRead} className="text-xs font-bold text-[#0B6B3A] hover:underline">
            Mark all as read
          </button>}
      </div>

      {pinned.length > 0 && <div className="space-y-3">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <Pin size={11} /> Pinned
          </p>
          {pinned.map(ann => <div key={ann.id} className={`bg-white border-2 rounded-2xl overflow-hidden shadow-sm ${ann.type === 'Urgent' ? 'border-red-200' : 'border-[#0B6B3A]/20'}`}>
              <button onClick={() => {
          setExpanded(expanded === ann.id ? null : ann.id);
          if (!ann.read) markRead(ann.id);
        }} className="w-full text-left px-5 py-4 flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${ann.read ? 'bg-gray-300' : ann.type === 'Urgent' ? 'bg-red-500' : 'bg-[#0B6B3A]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={typeVariant(ann.type)}>{ann.type}</Badge>
                    <span className="text-[10px] text-gray-400">{ann.date}</span>
                  </div>
                  <p className={`text-sm font-bold ${ann.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {ann.title}
                  </p>
                </div>
                <ChevronDown size={15} className={`text-gray-400 shrink-0 mt-1 transition-transform ${expanded === ann.id ? 'rotate-180' : ''}`} />
              </button>
              {expanded === ann.id && <div className="px-5 pb-5 border-t border-[#e6f4ed]">
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">{ann.body}</p>
                  <p className="text-xs text-gray-400 mt-2">From: {ann.sender}</p>
                </div>}
            </div>)}
        </div>}

      <div className="space-y-3">
        {regular.map(ann => <div key={ann.id} className={`bg-white border rounded-2xl overflow-hidden transition-all ${ann.read ? 'border-[#e6f4ed]' : 'border-[#d1e8db] shadow-sm'}`}>
            <button onClick={() => {
          setExpanded(expanded === ann.id ? null : ann.id);
          if (!ann.read) markRead(ann.id);
        }} className="w-full text-left px-5 py-4 flex items-start gap-4">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${ann.read ? 'bg-gray-300' : 'bg-[#0B6B3A]'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge variant={typeVariant(ann.type)}>{ann.type}</Badge>
                  <span className="text-[10px] text-gray-400">{ann.date}</span>
                </div>
                <p className={`text-sm font-bold ${ann.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {ann.title}
                </p>
              </div>
              <ChevronDown size={15} className={`text-gray-400 shrink-0 mt-1 transition-transform ${expanded === ann.id ? 'rotate-180' : ''}`} />
            </button>
            {expanded === ann.id && <div className="px-5 pb-5 border-t border-[#e6f4ed]">
                <p className="text-sm text-gray-600 leading-relaxed mt-3">{ann.body}</p>
                <p className="text-xs text-gray-400 mt-2">From: {ann.sender}</p>
              </div>}
          </div>)}
      </div>
    </div>;
};

// ─── PAGE 4 – REMINDERS ───────────────────────────────────────────────────────

export const RemindersPage = () => {
  const [checklist, setChecklist] = useState<ReminderItem[]>(REMINDER_CHECKLIST);
  const [notifSettings, setNotifSettings] = useState({
    sessionReminders: true,
    announcements: true,
    eventAlerts: false,
    weeklyDigest: true
  });
  const toggle = (id: string) => setChecklist(prev => prev.map(r => r.id === id ? {
    ...r,
    status: r.status === 'done' ? 'pending' : 'done'
  } : r));
  const statusColor = (status: ReminderItem['status']) => {
    if (status === 'done') return 'bg-[#0B6B3A] border-[#0B6B3A]';
    if (status === 'urgent') return 'border-red-400 bg-red-50';
    return 'border-gray-300';
  };
  const labelColor = (status: ReminderItem['status']) => {
    if (status === 'done') return 'line-through text-gray-400';
    if (status === 'urgent') return 'text-red-700 font-semibold';
    return 'text-gray-700';
  };
  const doneCount = checklist.filter(r => r.status === 'done').length;
  const urgentCount = checklist.filter(r => r.status === 'urgent').length;
  type SettingKey = keyof typeof notifSettings;
  const toggleSetting = (key: SettingKey) => setNotifSettings(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
  return <div className="space-y-6">
      <SectionHeading label="Stay on Track" title="Reminders" sub="Everything you need to remember this week." />

      {/* Next Session Banner */}
      <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md">
        <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
          <AlarmClock size={22} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-base">Next Session: Tomorrow</p>
          <p className="text-white/80 text-sm mt-0.5">
            Juniors AI Group A — Saturday 12 Jul, 10:00 AM GMT
          </p>
          <p className="text-white/60 text-xs mt-1 flex items-center gap-1.5">
            <Clock size={11} /> Less than 24 hours away
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-bold transition-colors shrink-0">
          <Video size={14} /> Join on Teams
        </button>
      </div>

      {/* Alerts */}
      {urgentCount > 0 && <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-bold text-red-700">Action Required</p>
            <p className="text-xs text-red-600 mt-0.5">
              You have {urgentCount} urgent item{urgentCount > 1 ? 's' : ''} that need immediate attention.
            </p>
          </div>
        </div>}

      {/* Weekly Checklist */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-base">Weekly Checklist</h3>
          <span className="text-xs text-[#0B6B3A] font-bold">
            {doneCount}/{checklist.length} done
          </span>
        </div>
        <div className="w-full bg-[#e6f4ed] rounded-full h-1.5 mb-5">
          <div className="bg-[#0B6B3A] h-1.5 rounded-full transition-all duration-500" style={{
          width: `${doneCount / checklist.length * 100}%`
        }} />
        </div>
        <div className="space-y-3">
          {checklist.map(item => <div key={item.id} onClick={() => toggle(item.id)} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${statusColor(item.status)} ${item.status !== 'done' ? 'group-hover:border-[#0B6B3A]' : ''}`}>
                {item.status === 'done' && <Check size={11} className="text-white" strokeWidth={3} />}
                {item.status === 'urgent' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />}
              </div>
              <span className={`text-sm transition-colors flex-1 ${labelColor(item.status)}`}>
                {item.label}
              </span>
              {item.status === 'urgent' && <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full shrink-0">
                  Urgent
                </span>}
            </div>)}
        </div>
      </div>

      {/* Automated Reminders Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{
        id: 'ar1',
        icon: Clock,
        title: '24h Reminder',
        desc: 'You\'ll get a reminder 24 hours before each session.',
        color: 'text-[#0B6B3A] bg-[#e6f4ed]'
      }, {
        id: 'ar2',
        icon: Zap,
        title: 'Weekly Summary',
        desc: 'A digest of your week\'s teaching and outstanding tasks.',
        color: 'text-blue-600 bg-blue-50'
      }, {
        id: 'ar3',
        icon: Heart,
        title: 'Impact Updates',
        desc: 'Regular messages celebrating your contribution.',
        color: 'text-purple-600 bg-purple-50'
      }].map(item => {
        const Icon = item.icon;
        return <div key={item.id} className="bg-white border border-[#d1e8db] rounded-2xl p-4 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                <Icon size={16} />
              </div>
              <p className="text-sm font-bold text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
            </div>;
      })}
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-1">Notification Preferences</h3>
        <p className="text-xs text-gray-500 mb-5">Control which reminders you receive.</p>
        <div className="space-y-4">
          {([{
          key: 'sessionReminders',
          label: 'Session reminders (24h & 1h before)',
          sub: 'Receive reminders before each class'
        }, {
          key: 'announcements',
          label: 'Announcement alerts',
          sub: 'Notify me of new announcements'
        }, {
          key: 'eventAlerts',
          label: 'Event & opportunity alerts',
          sub: 'Get notified about new volunteer events'
        }, {
          key: 'weeklyDigest',
          label: 'Weekly impact digest',
          sub: 'A summary of your week\'s contribution'
        }] as {
          key: SettingKey;
          label: string;
          sub: string;
        }[]).map(setting => <div key={setting.key} className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{setting.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{setting.sub}</p>
              </div>
              <button onClick={() => toggleSetting(setting.key)} className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${notifSettings[setting.key] ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${notifSettings[setting.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>)}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <Award size={16} className="text-[#0B6B3A]" />
          <h3 className="font-bold text-gray-900">Your Milestones</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MILESTONES.map(ms => <div key={ms.id} className={`rounded-2xl p-4 text-center border transition-all ${ms.earned ? 'bg-[#e6f4ed] border-[#c3e0cf]' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
              <span className="text-2xl block mb-2">{ms.icon}</span>
              <p className={`text-xs font-bold ${ms.earned ? 'text-[#0B6B3A]' : 'text-gray-400'}`}>
                {ms.label}
              </p>
              {ms.earned && <span className="text-[10px] text-[#0B6B3A] font-semibold mt-1 block">
                  Earned ✓
                </span>}
              {!ms.earned && <span className="text-[10px] text-gray-400 mt-1 block">Locked</span>}
            </div>)}
        </div>
      </div>

      {/* Motivation banner */}
      <div className="bg-gradient-to-br from-[#0B6B3A] to-[#22a860] rounded-2xl p-6 text-white shadow-md">
        <TrendingUp size={22} className="mb-3 opacity-80" />
        <p className="font-semibold text-sm leading-relaxed opacity-90 max-w-lg">
          "You've supported <strong>24 learners</strong> this month. Your time is helping expand access to AI education globally — thank you, Aisha."
        </p>
      </div>
    </div>;
};

// ─── PAGE 5 – SUPPORT ─────────────────────────────────────────────────────────

export const SupportPage = () => {
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [queries] = useState<SupportQuery[]>(SUPPORT_QUERIES);
  const handleSubmit = () => {
    if (category && message.trim()) {
      setSubmitted(true);
    }
  };
  const statusVariant = (status: SupportQuery['status']) => {
    const map: Record<SupportQuery['status'], 'amber' | 'blue' | 'green'> = {
      Open: 'amber',
      'In Progress': 'blue',
      Resolved: 'green'
    };
    return map[status];
  };
  const statusDot = (status: SupportQuery['status']) => {
    const map: Record<SupportQuery['status'], string> = {
      Open: 'bg-amber-400',
      'In Progress': 'bg-blue-400',
      Resolved: 'bg-green-500'
    };
    return map[status];
  };
  return <div className="space-y-6">
      <SectionHeading label="We're Here to Help" title="Support" sub="Raise a query and our team will get back to you within 24 hours." />

      {/* Safeguarding callout */}
      <div className="bg-white border-2 border-[#0B6B3A]/20 rounded-2xl p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-[#e6f4ed] flex items-center justify-center shrink-0">
          <Shield size={18} className="text-[#0B6B3A]" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">Safeguarding Concern?</p>
          <p className="text-xs text-gray-600 mt-1 leading-relaxed">
            If you have an urgent safeguarding concern, select the "Safeguarding concern" category below. This is escalated to our designated safeguarding lead within 1 hour.
            For emergencies, contact <strong>hello@nurtureroots.org</strong> directly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Form */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Raise a Query</h3>
          {submitted ? <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] rounded-xl">
              <CheckCircle size={18} className="text-[#0B6B3A]" />
              <p className="text-sm font-semibold text-[#0B6B3A]">
                Query submitted! We'll respond within 24 hours.
              </p>
            </div> : <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]">
                  <option value="">Select category…</option>
                  {SUPPORT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} placeholder="Describe your query in as much detail as possible…" className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] resize-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Attachment (optional)
                </label>
                <div className="border-2 border-dashed border-[#d1e8db] rounded-xl p-4 text-center cursor-pointer hover:border-[#0B6B3A] hover:bg-[#f7fbf9] transition-colors">
                  <Upload size={18} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-400">Click to upload or drag & drop</p>
                </div>
              </div>
              <button onClick={handleSubmit} className="w-full py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors flex items-center justify-center gap-2">
                <Send size={14} /> Send to Admin Team
              </button>
            </div>}
        </div>

        {/* My Queries */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">My Previous Queries</h3>
          <div className="space-y-3">
            {queries.map(q => <div key={q.id} className="border border-[#e6f4ed] rounded-xl p-4 hover:border-[#c3e0cf] transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 leading-snug">{q.title}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {q.category} · {q.updated}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${statusDot(q.status)}`} />
                    <Badge variant={statusVariant(q.status)}>{q.status}</Badge>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="mt-5 p-4 bg-[#f0f9f4] rounded-xl border border-[#d1e8db]">
            <p className="text-xs font-semibold text-gray-700 mb-1">Response Times</p>
            <div className="space-y-1.5 text-xs text-gray-500">
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span>Safeguarding concerns: within 1 hour</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>Urgent class issues: within 4 hours</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#0B6B3A] rounded-full" />
                <span>General queries: within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};