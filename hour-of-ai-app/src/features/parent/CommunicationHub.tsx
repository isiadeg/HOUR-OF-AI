import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageSquare, Clock, Video, AlertTriangle, CheckCircle, Send, Paperclip, Shield, ChevronDown, Image as ImageIcon, Megaphone, Calendar, Info, X, Check, Wifi } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

type NotifItem = {
  id: string;
  type: 'class_reminder' | 'class_change' | 'message' | 'announcement' | 'sponsorship' | 'event';
  title: string;
  body: string;
  time: string;
  read: boolean;
  actionPage?: string;
};
type ChatMessage = {
  id: string;
  sender: string;
  role: 'volunteer' | 'parent' | 'hub' | 'admin';
  text: string;
  time: string;
  read: boolean;
};
type ClassThread = {
  id: string;
  className: string;
  programme: string;
  nextSession: string;
  teamsLink: string;
  unread: number;
};
type ReminderItem = {
  id: string;
  kind: 'next_class' | 'alert' | 'nudge';
  title: string;
  body: string;
  time: string;
  color: 'green' | 'amber' | 'red';
  action?: string;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NOTIF_ITEMS: NotifItem[] = [{
  id: 'ni1',
  type: 'class_reminder',
  title: 'Class tomorrow at 10:00 AM',
  body: 'Juniors AI Group A – Hour of AI is scheduled for tomorrow, Saturday 12 Jul at 10:00 AM GMT.',
  time: '2 hours ago',
  read: false,
  actionPage: 'classes'
}, {
  id: 'ni2',
  type: 'message',
  title: 'New message from Aisha Kamara',
  body: 'Your volunteer Aisha has shared preparation notes for this week\'s session.',
  time: '5 hours ago',
  read: false,
  actionPage: 'messages'
}, {
  id: 'ni3',
  type: 'announcement',
  title: 'New module: Introduction to Machine Learning',
  body: 'Learners in Hour of AI begin exploring machine learning concepts this week.',
  time: '1 day ago',
  read: false,
  actionPage: 'announcements'
}, {
  id: 'ni4',
  type: 'sponsorship',
  title: 'Sponsored child report available',
  body: 'The June 2025 report for child NR-2025-041 is now ready to view.',
  time: '3 days ago',
  read: true,
  actionPage: 'sponsorship'
}, {
  id: 'ni5',
  type: 'class_change',
  title: 'Schedule update: Maths Group C',
  body: 'Sunday\'s Maths Group C session has been moved to 3:00 PM WAT. Please update your calendar.',
  time: '4 days ago',
  read: true,
  actionPage: 'classes'
}, {
  id: 'ni6',
  type: 'event',
  title: 'Community session available near you',
  body: 'A new community learning event has been organised in your area. Join to connect with other families.',
  time: '5 days ago',
  read: true
}];
const CLASS_THREADS: ClassThread[] = [{
  id: 'ct1',
  className: 'Juniors AI Group A',
  programme: 'Hour of AI',
  nextSession: 'Sat, 12 Jul · 10:00 AM GMT',
  teamsLink: 'https://teams.microsoft.com/join/abc123',
  unread: 2
}, {
  id: 'ct2',
  className: 'Digital Group B',
  programme: 'Digital Skills for Kids',
  nextSession: 'Sat, 12 Jul · 11:00 AM WAT',
  teamsLink: 'https://teams.microsoft.com/join/def456',
  unread: 0
}, {
  id: 'ct3',
  className: 'Maths Group C',
  programme: 'Basic Maths Literacy',
  nextSession: 'Sun, 13 Jul · 3:00 PM WAT',
  teamsLink: 'https://teams.microsoft.com/join/ghi789',
  unread: 0
}];
const CHAT_MESSAGES: ChatMessage[] = [{
  id: 'cm1',
  sender: 'Aisha Kamara',
  role: 'volunteer',
  text: 'Hello Fatima! Looking forward to Saturday\'s session. Please make sure Amara has a notebook ready — we will be doing some fun drawing exercises this week! 📝',
  time: '5h ago',
  read: true
}, {
  id: 'cm2',
  sender: 'You',
  role: 'parent',
  text: 'Thank you Aisha! Amara is very excited. We will be ready.',
  time: '4h ago',
  read: true
}, {
  id: 'cm3',
  sender: 'Kofi Mensah',
  role: 'volunteer',
  text: 'Hi everyone! I will be the backup volunteer for this session. If there are any connection issues please message here and I will help.',
  time: '3h ago',
  read: true
}, {
  id: 'cm4',
  sender: 'Aisha Kamara',
  role: 'volunteer',
  text: 'Great reminder Kofi. See everyone on Saturday! Here is the Teams join link: https://teams.microsoft.com/join/abc123',
  time: '2h ago',
  read: false
}];
const REMINDER_ITEMS: ReminderItem[] = [{
  id: 'r1',
  kind: 'next_class',
  title: 'Next class tomorrow',
  body: 'Juniors AI Group A · Sat, 12 Jul at 10:00 AM GMT',
  time: 'In 18 hours',
  color: 'green',
  action: 'join'
}, {
  id: 'r2',
  kind: 'next_class',
  title: 'Digital Group B – this Saturday',
  body: 'Digital Skills for Kids · Sat, 12 Jul at 11:00 AM WAT',
  time: 'In 19 hours',
  color: 'green',
  action: 'join'
}, {
  id: 'r3',
  kind: 'alert',
  title: 'Maths Group C – time updated',
  body: 'Session rescheduled to 3:00 PM WAT on Sunday. Please note the new time.',
  time: 'Updated 4 days ago',
  color: 'amber'
}, {
  id: 'r4',
  kind: 'nudge',
  title: 'Don\'t miss your next session!',
  body: 'Sessions happen every weekend. Staying consistent helps your child progress faster.',
  time: 'Weekly reminder',
  color: 'green'
}];

// ─── BADGE HELPER ─────────────────────────────────────────────────────────────

type BadgeV = 'green' | 'amber' | 'blue' | 'red' | 'gray' | 'purple';
const Badge = ({
  children,
  variant = 'green'
}: {
  children: React.ReactNode;
  variant?: BadgeV;
}) => {
  const cls: Record<BadgeV, string> = {
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

// ─── NOTIFICATION TYPE HELPERS ────────────────────────────────────────────────

const notifMeta: Record<NotifItem['type'], {
  icon: React.ReactNode;
  color: string;
  badge: BadgeV;
}> = {
  class_reminder: {
    icon: <Calendar size={15} />,
    color: 'bg-[#e6f4ed] text-[#0B6B3A]',
    badge: 'green'
  },
  class_change: {
    icon: <AlertTriangle size={15} />,
    color: 'bg-amber-50 text-amber-600',
    badge: 'amber'
  },
  message: {
    icon: <MessageSquare size={15} />,
    color: 'bg-blue-50 text-blue-600',
    badge: 'blue'
  },
  announcement: {
    icon: <Megaphone size={15} />,
    color: 'bg-purple-50 text-purple-600',
    badge: 'purple'
  },
  sponsorship: {
    icon: <span className="text-sm">💚</span>,
    color: 'bg-[#e6f4ed] text-[#0B6B3A]',
    badge: 'green'
  },
  event: {
    icon: <span className="text-sm">🌍</span>,
    color: 'bg-orange-50 text-orange-600',
    badge: 'amber'
  }
};
const notifTypeLabel: Record<NotifItem['type'], string> = {
  class_reminder: 'Class Reminder',
  class_change: 'Schedule Change',
  message: 'New Message',
  announcement: 'Announcement',
  sponsorship: 'Sponsorship',
  event: 'Event'
};

// ─── PAGE: NOTIFICATIONS ──────────────────────────────────────────────────────

export const NotificationsPage = ({
  onNavigate
}: {
  onNavigate: (p: string) => void;
}) => {
  const [items, setItems] = useState(NOTIF_ITEMS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const unreadCount = items.filter(i => !i.read).length;
  const displayed = filter === 'unread' ? items.filter(i => !i.read) : items;
  const markRead = (id: string) => setItems(prev => prev.map(n => n.id === id ? {
    ...n,
    read: true
  } : n));
  const markAllRead = () => setItems(prev => prev.map(n => ({
    ...n,
    read: true
  })));
  return <div className="space-y-6">
      <PageHeading emoji="🔔" title="Notifications" sub="Stay informed about classes, messages, and important updates." />

      {/* Unread summary banner */}
      {unreadCount > 0 && <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] rounded-2xl p-4 flex items-center gap-4 text-white">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Bell size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight">
              <span>{unreadCount} unread</span>
              <span> {unreadCount === 1 ? 'notification' : 'notifications'}</span>
            </p>
            <p className="text-white/70 text-xs mt-0.5">Tap any notification to open the related page</p>
          </div>
          <button onClick={markAllRead} className="shrink-0 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-colors">
            Mark all read
          </button>
        </div>}

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${filter === 'all' ? 'bg-[#0B6B3A] text-white' : 'bg-white border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
          All
        </button>
        <button onClick={() => setFilter('unread')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2 ${filter === 'unread' ? 'bg-[#0B6B3A] text-white' : 'bg-white border border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
          <span>Unread</span>
          {unreadCount > 0 && <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${filter === 'unread' ? 'bg-white/25 text-white' : 'bg-red-500 text-white'}`}>
              {unreadCount}
            </span>}
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {displayed.map(notif => {
        const meta = notifMeta[notif.type];
        return <div key={notif.id} className={`bg-white border rounded-2xl p-4 shadow-sm transition-all cursor-pointer hover:shadow-md ${notif.read ? 'border-[#e6f4ed]' : 'border-[#0B6B3A]/20 bg-[#fafdf9]'}`} onClick={() => {
          markRead(notif.id);
          if (notif.actionPage) onNavigate(notif.actionPage);
        }}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl ${meta.color} flex items-center justify-center shrink-0`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-[#0B6B3A] shrink-0" />}
                      <p className="text-sm font-bold text-gray-900 leading-snug">{notif.title}</p>
                    </div>
                    <Badge variant={meta.badge}>{notifTypeLabel[notif.type]}</Badge>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{notif.body}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[11px] text-gray-400">{notif.time}</p>
                    {!notif.read && <button onClick={e => {
                  e.stopPropagation();
                  markRead(notif.id);
                }} className="text-[11px] font-semibold text-[#0B6B3A] hover:underline">
                        Mark as read
                      </button>}
                  </div>
                </div>
              </div>
            </div>;
      })}

        {displayed.length === 0 && <div className="text-center py-16 text-gray-400">
            <Bell size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No unread notifications</p>
            <p className="text-xs mt-1">You're all caught up!</p>
          </div>}
      </div>

      {/* Notification settings footer */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Bell size={14} className="text-[#0B6B3A]" />
          <span>Notification Settings</span>
        </h3>
        <NotifSettingsToggles />
      </div>
    </div>;
};

// ─── NOTIFICATION SETTINGS TOGGLES ───────────────────────────────────────────

const NOTIF_SETTINGS_DATA = [{
  id: 'ns1',
  label: 'Class reminders',
  sub: '24h and 1h before each session',
  defaultOn: true
}, {
  id: 'ns2',
  label: 'Announcements',
  sub: 'Programme and admin updates',
  defaultOn: true
}, {
  id: 'ns3',
  label: 'New messages',
  sub: 'Messages from class volunteers',
  defaultOn: true
}, {
  id: 'ns4',
  label: 'Support replies',
  sub: 'When your support request is updated',
  defaultOn: false
}];
const NotifSettingsToggles = () => {
  const [vals, setVals] = useState<Record<string, boolean>>(Object.fromEntries(NOTIF_SETTINGS_DATA.map(s => [s.id, s.defaultOn])));
  return <div className="space-y-3">
      {NOTIF_SETTINGS_DATA.map(s => <div key={s.id} className="flex items-center justify-between gap-3 p-3 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
          <div>
            <p className="text-sm font-semibold text-gray-900">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
          <button onClick={() => setVals(prev => ({
        ...prev,
        [s.id]: !prev[s.id]
      }))} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${vals[s.id] ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
            <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
          left: vals[s.id] ? '22px' : '2px'
        }} />
          </button>
        </div>)}
    </div>;
};

// ─── PAGE: CLASS MESSAGES ─────────────────────────────────────────────────────

export const ClassMessagesPage = ({
  mode
}: {
  mode: 'parent' | 'hub';
}) => {
  const [selectedThread, setSelectedThread] = useState<ClassThread | null>(null);
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const [draft, setDraft] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selectedThread) {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }, [messages, selectedThread]);
  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const newMsg: ChatMessage = {
      id: `cm${Date.now()}`,
      sender: 'You',
      role: mode === 'parent' ? 'parent' : 'hub',
      text,
      time: 'Just now',
      read: true
    };
    setMessages(prev => [...prev, newMsg]);
    setDraft('');
  };
  const roleColor: Record<ChatMessage['role'], string> = {
    volunteer: 'bg-[#0B6B3A]',
    admin: 'bg-gray-500',
    parent: 'bg-blue-500',
    hub: 'bg-purple-500'
  };
  const roleLabel: Record<ChatMessage['role'], string> = {
    volunteer: 'Volunteer',
    admin: 'Admin',
    parent: 'You',
    hub: 'Hub'
  };
  if (selectedThread) {
    const isMe = (msg: ChatMessage) => msg.sender === 'You';
    return <div className="flex flex-col h-[calc(100vh-230px)] min-h-[400px]">
        {/* Thread header */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm mb-4">
          <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] px-5 py-4 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <button onClick={() => setSelectedThread(null)} className="w-8 h-8 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors" aria-label="Back to threads">
                <ChevronDown size={14} className="text-white rotate-90" />
              </button>
              <div>
                <p className="text-white font-black text-sm leading-tight">{selectedThread.className}</p>
                <p className="text-white/70 text-xs">{selectedThread.programme}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
                <Clock size={11} className="text-white/70" />
                <span className="text-white/80 text-xs font-medium">{selectedThread.nextSession}</span>
              </div>
              <a href={selectedThread.teamsLink} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#0B6B3A] text-xs font-bold hover:bg-white/90 transition-colors">
                <Video size={11} />
                <span>Join Session</span>
              </a>
            </div>
          </div>

          {/* Safeguarding notice */}
          <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
            <Shield size={12} className="text-amber-600 shrink-0" />
            <p className="text-xs text-amber-700">
              <strong>Shared class space.</strong>
              <span> All communication is monitored for safety. No direct messages with children.</span>
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-2">
          {messages.map(msg => <div key={msg.id} className={`flex ${isMe(msg) ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${isMe(msg) ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!isMe(msg) && <div className="flex items-center gap-1.5 ml-1">
                    <div className={`w-5 h-5 rounded-full ${roleColor[msg.role]} flex items-center justify-center text-[9px] font-bold text-white`}>
                      {msg.sender.charAt(0)}
                    </div>
                    <span className="text-[11px] font-semibold text-gray-600">{msg.sender}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${msg.role === 'volunteer' ? 'bg-[#e6f4ed] text-[#0B6B3A]' : 'bg-gray-100 text-gray-500'}`}>
                      {roleLabel[msg.role]}
                    </span>
                  </div>}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isMe(msg) ? 'bg-[#0B6B3A] text-white rounded-br-sm' : 'bg-white border border-[#e6f4ed] text-gray-800 rounded-bl-sm shadow-sm'}`}>
                  <p>{msg.text}</p>
                </div>
                <div className={`flex items-center gap-1.5 ${isMe(msg) ? 'flex-row-reverse' : ''} px-1`}>
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                  {isMe(msg) && <Check size={10} className="text-[#0B6B3A]" />}
                </div>
              </div>
            </div>)}
          <div ref={messagesEndRef} />
        </div>

        {/* Compose bar */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-3 shadow-sm mt-3 shrink-0">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl px-3 py-2 min-h-[44px] flex items-center">
              <textarea value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }} rows={1} placeholder="Type a message…" className="w-full bg-transparent text-sm text-gray-700 resize-none focus:outline-none placeholder-gray-400 leading-relaxed" />
            </div>
            <button className="w-10 h-10 rounded-xl border border-[#d1e8db] text-gray-400 hover:text-[#0B6B3A] hover:border-[#0B6B3A] flex items-center justify-center transition-colors shrink-0">
              <Paperclip size={15} />
            </button>
            <button onClick={sendMessage} className="w-10 h-10 rounded-xl bg-[#0B6B3A] text-white flex items-center justify-center hover:bg-[#095e32] transition-colors shrink-0" aria-label="Send message">
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>;
  }
  return <div className="space-y-6">
      <PageHeading emoji="💬" title="Class Messages" sub="Stay connected with your child's class volunteers. Select a class to open the thread." />

      {/* Safeguarding note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <Shield size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-amber-800">Shared class communication space</p>
          <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
            Messages are visible to all class participants. All communication is monitored for safeguarding. No direct contact with children is permitted here.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {CLASS_THREADS.map(thread => <button key={thread.id} onClick={() => setSelectedThread(thread)} className="w-full bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#0B6B3A]/40 transition-all text-left">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#e6f4ed] flex items-center justify-center shrink-0">
                  <MessageSquare size={16} className="text-[#0B6B3A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-gray-900">{thread.className}</p>
                    {thread.unread > 0 && <span className="text-[10px] font-bold bg-[#0B6B3A] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {thread.unread}
                      </span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{thread.programme}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">{thread.nextSession}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="text-[#0B6B3A]">
                  <ChevronDown size={14} className="-rotate-90" />
                </span>
                <a href={thread.teamsLink} onClick={e => e.stopPropagation()} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                  <Video size={10} />
                  <span>Join</span>
                </a>
              </div>
            </div>
          </button>)}
      </div>
    </div>;
};

// ─── PAGE: REMINDERS ──────────────────────────────────────────────────────────

export const RemindersPage = ({
  onNavigate
}: {
  onNavigate: (p: string) => void;
}) => {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const colorStyle: Record<ReminderItem['color'], {
    border: string;
    bg: string;
    icon: string;
    badge: BadgeV;
    indicator: string;
  }> = {
    green: {
      border: 'border-[#0B6B3A]/20',
      bg: 'bg-white',
      icon: 'bg-[#e6f4ed] text-[#0B6B3A]',
      badge: 'green',
      indicator: 'bg-[#0B6B3A]'
    },
    amber: {
      border: 'border-amber-200',
      bg: 'bg-amber-50/50',
      icon: 'bg-amber-100 text-amber-600',
      badge: 'amber',
      indicator: 'bg-amber-400'
    },
    red: {
      border: 'border-red-200',
      bg: 'bg-red-50/50',
      icon: 'bg-red-100 text-red-600',
      badge: 'red',
      indicator: 'bg-red-500'
    }
  };
  const reminderIcon: Record<ReminderItem['kind'], React.ReactNode> = {
    next_class: <Calendar size={16} />,
    alert: <AlertTriangle size={16} />,
    nudge: <Bell size={16} />
  };
  const activeReminders = REMINDER_ITEMS.filter(r => !dismissed.has(r.id));
  const nextClass = REMINDER_ITEMS.find(r => r.kind === 'next_class');
  return <div className="space-y-6">
      <PageHeading emoji="⏰" title="Reminders" sub="Your upcoming sessions and important alerts, always in one place." />

      {/* Hero next class card */}
      {nextClass && !dismissed.has(nextClass.id) && <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] rounded-2xl p-6 text-white shadow-md">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">
                📅
              </div>
              <div>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Coming up next</p>
                <h3 className="text-white font-black text-lg leading-tight mt-0.5">{nextClass.title}</h3>
              </div>
            </div>
            <span className="text-[11px] font-bold bg-white/20 text-white px-3 py-1 rounded-full shrink-0">
              {nextClass.time}
            </span>
          </div>
          <p className="text-white/80 text-sm mb-5">{nextClass.body}</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://teams.microsoft.com/join/abc123" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B6B3A] text-sm font-black hover:bg-white/90 transition-colors shadow-sm">
              <Video size={14} />
              <span>Join Session</span>
            </a>
            <button onClick={() => onNavigate('absence')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold transition-colors">
              <AlertTriangle size={14} />
              <span>Report Absence</span>
            </button>
          </div>
        </div>}

      {/* All reminders */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-700">All Reminders</h3>
        {activeReminders.map(r => {
        const style = colorStyle[r.color];
        return <div key={r.id} className={`bg-white border ${style.border} rounded-2xl p-4 shadow-sm ${style.bg}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center shrink-0`}>
                  {reminderIcon[r.kind]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-gray-900 leading-snug">{r.title}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant={style.badge}>
                        <span className={`w-1.5 h-1.5 rounded-full ${style.indicator} mr-1.5`} />
                        {r.time}
                      </Badge>
                      <button onClick={() => setDismissed(prev => {
                    const n = new Set(prev);
                    n.add(r.id);
                    return n;
                  })} className="text-gray-300 hover:text-gray-500 transition-colors" aria-label="Dismiss reminder">
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.body}</p>
                  {r.action === 'join' && <a href="https://teams.microsoft.com/join/abc123" className="inline-flex items-center gap-1.5 mt-3 px-4 py-1.5 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                      <Video size={11} />
                      <span>Join Session</span>
                    </a>}
                </div>
              </div>
            </div>;
      })}

        {activeReminders.length === 0 && <div className="text-center py-16 text-gray-400">
            <CheckCircle size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No active reminders</p>
            <p className="text-xs mt-1">All caught up — great work!</p>
          </div>}
      </div>

      {/* Automated reminders info */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Bell size={14} className="text-[#0B6B3A]" />
          <span>Automatic Reminders</span>
        </h3>
        <div className="space-y-2">
          {[{
          icon: '⏰',
          text: '24 hours before each class',
          badge: 'green' as BadgeV
        }, {
          icon: '⚡',
          text: '1 hour before each class',
          badge: 'amber' as BadgeV
        }, {
          icon: '📣',
          text: 'Class rescheduled or cancelled',
          badge: 'red' as BadgeV
        }, {
          icon: '💬',
          text: 'New message from your volunteer',
          badge: 'blue' as BadgeV
        }].map(item => <div key={item.text} className="flex items-center gap-3 p-3 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
              <span className="text-base">{item.icon}</span>
              <p className="text-xs text-gray-700 font-medium flex-1">{item.text}</p>
              <Badge variant={item.badge}>Active</Badge>
            </div>)}
        </div>
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Reminders are sent to your registered email. Update your notification preferences in your Profile.
        </p>
      </div>
    </div>;
};
