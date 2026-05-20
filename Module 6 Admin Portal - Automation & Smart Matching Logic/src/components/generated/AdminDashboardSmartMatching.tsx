import React, { useState } from 'react';
import { Zap, Users, UserCheck, BookOpen, AlertTriangle, CheckCircle, Clock, Eye, Edit3, Plus, ChevronRight, Check, Search, X, RefreshCw, Shield, MessageSquare, Play, Settings, FileText, Filter, Globe, MapPin, Activity, Lock, Unlock, AlertCircle, Info, ToggleLeft, ToggleRight, ArrowRight, Cpu, CalendarDays, List } from 'lucide-react';

// ─── TYPES ───────────────────────────────────────────────────────────────────

type SmartSubPage = 'overview' | 'suggestions' | 'availability' | 'demand' | 'rules' | 'coverage' | 'logs';
type SuggestionStatus = 'Ready' | 'NeedsBackup' | 'LowLearners' | 'TZConflict' | 'NeedsReview';
type SmartSuggestion = {
  id: string;
  className: string;
  programme: string;
  ageGroup: string;
  delivery: 'Virtual' | 'Hub' | 'Hybrid';
  dayTime: string;
  timezone: string;
  matchScore: number;
  leadVolunteer: string;
  backupVolunteer: string;
  matchReasons: string[];
  learnerCount: number;
  learnerTypes: string;
  countries: string[];
  timeMatch: boolean;
  status: SuggestionStatus;
};
type DemandCard = {
  id: string;
  programme: string;
  icon: string;
  waiting: number;
  preferredTimes: string[];
  suggestedClassSize: number;
  classesNeeded: number;
  ageGroup: string;
};
type AbsenceRecord = {
  id: string;
  volunteer: string;
  className: string;
  date: string;
  backupVolunteer: string;
  coverageStatus: 'Covered' | 'BackupCovering' | 'NeedsReplacement' | 'AtRisk';
  replacementSuggestions: string[];
};
type LogEntry = {
  id: string;
  timestamp: string;
  action: string;
  trigger: string;
  result: string;
  requiresAdmin: boolean;
  category: 'class' | 'volunteer' | 'absence' | 'learner' | 'warning';
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SMART_SUGGESTIONS: SmartSuggestion[] = [{
  id: 'ss1',
  className: 'Hour of AI – Juniors Group D',
  programme: 'Hour of AI',
  ageGroup: '8–14',
  delivery: 'Virtual',
  dayTime: 'Saturday 9:00 AM',
  timezone: 'GMT',
  matchScore: 98,
  leadVolunteer: 'Sarah Okafor',
  backupVolunteer: 'Lena Adeyemi',
  matchReasons: ['2 volunteers available on Sat 9 AM GMT', 'Both selected Hour of AI programme', 'Sarah has 2h remaining weekly commitment', '15 learners in this time window'],
  learnerCount: 15,
  learnerTypes: 'Mix of Parent & Hub',
  countries: ['🇳🇬 Nigeria', '🇬🇭 Ghana', '🇺🇬 Uganda'],
  timeMatch: true,
  status: 'Ready'
}, {
  id: 'ss2',
  className: 'Digital Skills – Juniors Batch B',
  programme: 'Digital Skills for Kids',
  ageGroup: '6–12',
  delivery: 'Virtual',
  dayTime: 'Sunday 3:00 PM',
  timezone: 'WAT',
  matchScore: 91,
  leadVolunteer: 'Lena Adeyemi',
  backupVolunteer: 'Kofi Mensah',
  matchReasons: ['2 volunteers match this programme', 'Lena has 3h remaining commitment', '12 learners waiting for Digital Skills', 'WAT timezone aligns with 9 of 12 learners'],
  learnerCount: 12,
  learnerTypes: 'Parent registrations',
  countries: ['🇳🇬 Nigeria', '🇸🇳 Senegal'],
  timeMatch: true,
  status: 'Ready'
}, {
  id: 'ss3',
  className: 'Hour of AI – Nairobi EAT Group',
  programme: 'Hour of AI',
  ageGroup: '8–14',
  delivery: 'Hub',
  dayTime: 'Saturday 10:00 AM',
  timezone: 'EAT',
  matchScore: 85,
  leadVolunteer: 'Kofi Mensah',
  backupVolunteer: 'Tom Ashford',
  matchReasons: ['Kofi available Sat 10 AM EAT overlap', '24 learners at Nairobi hub waiting', 'Hub delivery suits large learner count'],
  learnerCount: 24,
  learnerTypes: 'Nairobi Community Hub',
  countries: ['🇰🇪 Kenya'],
  timeMatch: false,
  status: 'NeedsBackup'
}, {
  id: 'ss4',
  className: 'Maths Literacy – Kampala Group A',
  programme: 'Basic Maths Literacy',
  ageGroup: '10–16',
  delivery: 'Hub',
  dayTime: 'Saturday 9:00 AM',
  timezone: 'EAT',
  matchScore: 72,
  leadVolunteer: 'James Mwangi',
  backupVolunteer: '— Not matched —',
  matchReasons: ['James available Sat 9 AM EAT', '15 unassigned learners in Kampala', 'Maths programme interest confirmed'],
  learnerCount: 8,
  learnerTypes: 'Hub registrations',
  countries: ['🇺🇬 Uganda'],
  timeMatch: true,
  status: 'NeedsBackup'
}];
const DEMAND_CARDS: DemandCard[] = [{
  id: 'dc1',
  programme: 'Hour of AI',
  icon: '🤖',
  waiting: 42,
  preferredTimes: ['Sat 9–11 AM GMT', 'Sat 10 AM EAT', 'Sun 2 PM WAT'],
  suggestedClassSize: 15,
  classesNeeded: 3,
  ageGroup: '8–14'
}, {
  id: 'dc2',
  programme: 'Digital Skills for Kids',
  icon: '💻',
  waiting: 18,
  preferredTimes: ['Sun 2–4 PM WAT', 'Sat 11 AM GMT'],
  suggestedClassSize: 12,
  classesNeeded: 2,
  ageGroup: '6–12'
}, {
  id: 'dc3',
  programme: 'Basic Maths Literacy',
  icon: '📐',
  waiting: 25,
  preferredTimes: ['Sat 9 AM EAT', 'Sun 3 PM WAT'],
  suggestedClassSize: 18,
  classesNeeded: 2,
  ageGroup: '10–16'
}, {
  id: 'dc4',
  programme: 'Code Club Junior',
  icon: '🧩',
  waiting: 11,
  preferredTimes: ['Sat 10 AM GMT', 'Sun 2 PM BST'],
  suggestedClassSize: 10,
  classesNeeded: 1,
  ageGroup: '7–11'
}];
const ABSENCE_RECORDS: AbsenceRecord[] = [{
  id: 'ab1',
  volunteer: 'Aisha Kamara',
  className: 'Juniors AI Group A',
  date: 'Sat, 19 Jul 2025',
  backupVolunteer: 'Kofi Mensah',
  coverageStatus: 'BackupCovering',
  replacementSuggestions: ['Kofi Mensah', 'Sarah Okafor']
}, {
  id: 'ab2',
  volunteer: 'Sarah Okafor',
  className: 'Juniors AI Group C',
  date: 'Sun, 20 Jul 2025',
  backupVolunteer: '— None assigned —',
  coverageStatus: 'AtRisk',
  replacementSuggestions: ['Lena Adeyemi', 'Kofi Mensah']
}, {
  id: 'ab3',
  volunteer: 'James Mwangi',
  className: 'Digital Skills – Nairobi',
  date: 'Sat, 26 Jul 2025',
  backupVolunteer: 'Lena Adeyemi',
  coverageStatus: 'Covered',
  replacementSuggestions: []
}];
const LOG_ENTRIES: LogEntry[] = [{
  id: 'lg1',
  timestamp: 'Today 09:14 AM',
  action: 'Suggested new Hour of AI class – Juniors Group D',
  trigger: '15 unassigned learners + 2 available volunteers on Sat 9 AM GMT',
  result: 'Draft suggestion created – awaiting admin approval',
  requiresAdmin: true,
  category: 'class'
}, {
  id: 'lg2',
  timestamp: 'Today 08:47 AM',
  action: 'Flagged class "Juniors AI Group C" due to missing backup volunteer',
  trigger: 'Backup volunteer field empty at class creation',
  result: 'Alert raised – admin notified via dashboard',
  requiresAdmin: true,
  category: 'warning'
}, {
  id: 'lg3',
  timestamp: 'Yesterday 3:22 PM',
  action: 'Locked volunteer availability – Aisha Kamara after assignment',
  trigger: 'Aisha assigned to Juniors AI Group A (2h / 2h commitment used)',
  result: 'Availability status set to "Fully Booked"',
  requiresAdmin: false,
  category: 'volunteer'
}, {
  id: 'lg4',
  timestamp: 'Yesterday 11:05 AM',
  action: 'Identified 15 unassigned learners at Kampala Kids Hub',
  trigger: 'Hub registered with no class assignment after 7 days',
  result: 'Alert raised – 3 class suggestions generated',
  requiresAdmin: true,
  category: 'learner'
}, {
  id: 'lg5',
  timestamp: '2 days ago',
  action: 'Absence submitted by Aisha Kamara for Sat 19 Jul',
  trigger: 'Volunteer submitted absence request via portal',
  result: 'Backup Kofi Mensah notified – coverage confirmed',
  requiresAdmin: false,
  category: 'absence'
}, {
  id: 'lg6',
  timestamp: '3 days ago',
  action: 'Suggested Digital Skills class – Juniors Batch B',
  trigger: '12 unassigned learners + Lena & Kofi available Sun 3 PM WAT',
  result: 'Suggestion pending admin review',
  requiresAdmin: true,
  category: 'class'
}, {
  id: 'lg7',
  timestamp: '3 days ago',
  action: 'Tom Ashford flagged as inactive (3 weeks no sessions)',
  trigger: 'No class participation or login in 21 days',
  result: 'Engagement alert sent to Volunteer Coordinator',
  requiresAdmin: true,
  category: 'warning'
}];

// Availability matrix data
const AVAILABILITY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const AVAILABILITY_TIMES = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '2 PM', '3 PM', '4 PM'];
type SlotInfo = {
  volunteers: string[];
  locked: boolean;
};
const AVAILABILITY_MATRIX: Record<string, Record<string, SlotInfo>> = {
  'Sarah Okafor': {
    'Sat-9 AM': {
      volunteers: ['Sarah Okafor', 'Lena Adeyemi'],
      locked: false
    },
    'Sat-10 AM': {
      volunteers: ['Sarah Okafor'],
      locked: false
    },
    'Sun-2 PM': {
      volunteers: ['Sarah Okafor'],
      locked: true
    }
  },
  'Kofi Mensah': {
    'Sat-9 AM': {
      volunteers: ['Kofi Mensah'],
      locked: false
    },
    'Sat-10 AM': {
      volunteers: ['Kofi Mensah', 'Sarah Okafor'],
      locked: false
    },
    'Sun-3 PM': {
      volunteers: ['Kofi Mensah', 'Lena Adeyemi'],
      locked: false
    }
  },
  'Lena Adeyemi': {
    'Sat-9 AM': {
      volunteers: ['Lena Adeyemi', 'Sarah Okafor'],
      locked: false
    },
    'Sun-2 PM': {
      volunteers: ['Lena Adeyemi'],
      locked: true
    },
    'Sun-3 PM': {
      volunteers: ['Lena Adeyemi', 'Kofi Mensah'],
      locked: false
    }
  },
  'Tom Ashford': {
    'Sat-10 AM': {
      volunteers: ['Tom Ashford'],
      locked: false
    },
    'Sun-2 PM': {
      volunteers: ['Tom Ashford'],
      locked: false
    }
  }
};
const MATRIX_VOLUNTEERS = [{
  name: 'Sarah Okafor',
  programme: 'Hour of AI',
  tz: 'WAT',
  available: true
}, {
  name: 'Kofi Mensah',
  programme: 'Hour of AI / Digital Skills',
  tz: 'GMT',
  available: true
}, {
  name: 'Lena Adeyemi',
  programme: 'Hour of AI / Digital Skills',
  tz: 'WAT',
  available: true
}, {
  name: 'Tom Ashford',
  programme: 'Hour of AI',
  tz: 'BST',
  available: false
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
const statusConfig: Record<SuggestionStatus, {
  label: string;
  variant: BadgeVariant;
}> = {
  Ready: {
    label: 'Ready to Approve',
    variant: 'green'
  },
  NeedsBackup: {
    label: 'Needs Backup Volunteer',
    variant: 'red'
  },
  LowLearners: {
    label: 'Low Learner Count',
    variant: 'amber'
  },
  TZConflict: {
    label: 'Time Zone Conflict',
    variant: 'amber'
  },
  NeedsReview: {
    label: 'Admin Review Needed',
    variant: 'gray'
  }
};
const coverageConfig: Record<AbsenceRecord['coverageStatus'], {
  label: string;
  variant: BadgeVariant;
  dot: string;
}> = {
  Covered: {
    label: 'Fully Covered',
    variant: 'green',
    dot: 'bg-[#0B6B3A]'
  },
  BackupCovering: {
    label: 'Backup Covering',
    variant: 'blue',
    dot: 'bg-blue-500'
  },
  NeedsReplacement: {
    label: 'Needs Replacement',
    variant: 'amber',
    dot: 'bg-amber-500'
  },
  AtRisk: {
    label: 'At Risk',
    variant: 'red',
    dot: 'bg-red-500'
  }
};

// ─── SUB-PAGE: MATCHING OVERVIEW ─────────────────────────────────────────────

const MatchingOverviewPage = ({
  onSubNavigate
}: {
  onSubNavigate: (p: SmartSubPage) => void;
}) => {
  const [runningMatch, setRunningMatch] = useState(false);
  const [matchRan, setMatchRan] = useState(false);
  const handleRunMatch = () => {
    setRunningMatch(true);
    setTimeout(() => {
      setRunningMatch(false);
      setMatchRan(true);
    }, 1800);
  };
  const metricCards = [{
    label: 'Learners Waiting',
    value: '96',
    icon: Users,
    color: 'amber' as const,
    sub: 'Across 4 programmes'
  }, {
    label: 'Volunteers Available',
    value: '4',
    icon: UserCheck,
    color: 'green' as const,
    sub: '2 with spare capacity'
  }, {
    label: 'Suggested Classes',
    value: '4',
    icon: Cpu,
    color: 'blue' as const,
    sub: 'Ready to review'
  }, {
    label: 'Ready for Approval',
    value: '2',
    icon: CheckCircle,
    color: 'green' as const,
    sub: 'No issues flagged'
  }, {
    label: 'Missing Backup',
    value: '2',
    icon: AlertTriangle,
    color: 'red' as const,
    sub: 'Urgent attention'
  }, {
    label: 'Unmatched Hubs',
    value: '2',
    icon: MapPin,
    color: 'amber' as const,
    sub: 'Kampala, Accra'
  }];
  const pipelineSteps = [{
    step: 1,
    label: 'Learners Registered',
    count: '332',
    done: true
  }, {
    step: 2,
    label: 'Programme Demand Identified',
    count: '96 waiting',
    done: true
  }, {
    step: 3,
    label: 'Volunteer Availability Matched',
    count: '4 available',
    done: true
  }, {
    step: 4,
    label: 'Suggestions Created',
    count: '4 suggestions',
    done: true
  }, {
    step: 5,
    label: 'Admin Approval',
    count: '2 pending',
    done: false
  }, {
    step: 6,
    label: 'Class Published',
    count: '0 today',
    done: false
  }];
  const notificationGroups = [{
    id: 'ng1',
    group: 'Volunteers',
    icon: '🧑‍💻',
    items: [{
      id: 'ni1',
      text: 'Sarah Okafor: You have been assigned to a new class'
    }, {
      id: 'ni2',
      text: 'Kofi Mensah: Your absence request has been received'
    }, {
      id: 'ni3',
      text: 'Lena Adeyemi: You are needed as backup for Juniors AI Group C'
    }]
  }, {
    id: 'ng2',
    group: 'Parents & Hubs',
    icon: '👨‍👩‍👧',
    items: [{
      id: 'ni4',
      text: 'Fatima Hassan: Your learner has been assigned to a class'
    }, {
      id: 'ni5',
      text: 'Bright Stars Academy: Class schedule updated for July'
    }]
  }, {
    id: 'ng3',
    group: 'Admin Alerts',
    icon: '🔔',
    items: [{
      id: 'ni6',
      text: '2 new class suggestions ready for your review'
    }, {
      id: 'ni7',
      text: 'Juniors AI Group C is missing a backup volunteer'
    }, {
      id: 'ni8',
      text: '15 learners at Kampala Hub unassigned for 7+ days'
    }]
  }];
  return <div className="space-y-7">
      <PageHeading label="Smart Matching Engine" title="Matching Overview" sub="Your automated class-matching assistant. All suggestions require your approval before publishing." />

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleRunMatch} disabled={runningMatch} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] transition-colors shadow-sm disabled:opacity-70">
          {runningMatch ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
          <span>{runningMatch ? 'Running Match…' : 'Run Matching'}</span>
        </button>
        <button onClick={() => onSubNavigate('suggestions')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-[#0B6B3A] text-sm font-bold hover:bg-[#e6f4ed] transition-colors">
          <Eye size={14} /><span>Review Suggestions</span>
        </button>
        <button onClick={() => onSubNavigate('rules')} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#d1e8db] text-gray-600 text-sm font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
          <Settings size={14} /><span>Adjust Rules</span>
        </button>
      </div>

      {matchRan && <div className="flex items-center gap-3 p-4 bg-[#e6f4ed] border border-[#c3e0cf] rounded-2xl">
          <CheckCircle size={18} className="text-[#0B6B3A] shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#0B6B3A]">Matching engine ran successfully</p>
            <p className="text-xs text-[#138a4c] mt-0.5">4 suggestions updated · 2 ready for approval · No conflicts detected</p>
          </div>
        </div>}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {metricCards.map(card => {
        const Icon = card.icon;
        const clr = {
          green: 'text-[#0B6B3A] bg-[#0B6B3A]/10',
          amber: 'text-amber-600 bg-amber-50',
          red: 'text-red-600 bg-red-50',
          blue: 'text-blue-600 bg-blue-50'
        }[card.color];
        const valClr = {
          green: 'text-[#0B6B3A]',
          amber: 'text-amber-600',
          red: 'text-red-600',
          blue: 'text-blue-600'
        }[card.color];
        return <div key={card.label} className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${clr}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className={`text-2xl font-black ${valClr}`}>{card.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">{card.label}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{card.sub}</p>
              </div>
            </div>;
      })}
      </div>

      {/* Matching Pipeline */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Activity size={16} className="text-[#0B6B3A]" />
          <span>Matching Pipeline</span>
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0 overflow-x-auto pb-2">
          {pipelineSteps.map((step, idx) => <div key={step.step} className="flex flex-row sm:flex-col items-center gap-2 sm:gap-0 flex-1 min-w-[120px]">
              <div className="flex sm:flex-col items-center gap-2 sm:gap-0 flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 shrink-0
                  ${step.done ? 'bg-[#0B6B3A] border-[#0B6B3A] text-white' : 'bg-white border-[#d1e8db] text-gray-400'}`}>
                  {step.done ? <Check size={16} /> : <span>{step.step}</span>}
                </div>
                <div className="hidden sm:block h-0.5 w-full bg-[#e6f4ed] mt-0" />
              </div>
              <div className="text-center px-2 sm:mt-3">
                <p className={`text-xs font-bold ${step.done ? 'text-[#0B6B3A]' : 'text-gray-400'}`}>{step.label}</p>
                <p className={`text-[10px] mt-0.5 ${step.done ? 'text-[#22a860]' : 'text-gray-300'}`}>{step.count}</p>
              </div>
              {idx < pipelineSteps.length - 1 && <ArrowRight size={14} className="text-[#c3e0cf] shrink-0 hidden sm:block" />}
            </div>)}
        </div>
      </div>

      {/* Notifications Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {notificationGroups.map(group => <div key={group.id} className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
              <span>{group.icon}</span>
              <span>{group.group}</span>
            </h4>
            <div className="space-y-2">
              {group.items.map(item => <div key={item.id} className="flex items-start gap-2.5 p-2.5 bg-[#f7fbf9] rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B3A] shrink-0 mt-1.5" />
                  <p className="text-xs text-gray-600 leading-snug">{item.text}</p>
                </div>)}
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── SUB-PAGE: SUGGESTED CLASSES ─────────────────────────────────────────────

const SuggestionsPage = () => {
  const [approved, setApproved] = useState<Set<string>>(new Set());
  const [rejected, setRejected] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<'All' | SuggestionStatus>('All');
  const filtered = SMART_SUGGESTIONS.filter(s => filterStatus === 'All' || s.status === filterStatus);
  const filterOptions: Array<{
    id: 'All' | SuggestionStatus;
    label: string;
  }> = [{
    id: 'All',
    label: 'All Suggestions'
  }, {
    id: 'Ready',
    label: 'Ready'
  }, {
    id: 'NeedsBackup',
    label: 'Needs Backup'
  }, {
    id: 'NeedsReview',
    label: 'Needs Review'
  }];
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Suggested Classes" sub="Automatically generated class suggestions. Each shows exactly why it was recommended." />

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <strong>Admin approval required</strong> before any suggested class is published. Review each suggestion carefully — the system will never auto-publish without your sign-off.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map(opt => <button key={opt.id} onClick={() => setFilterStatus(opt.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${filterStatus === opt.id ? 'bg-[#0B6B3A] text-white border-[#0B6B3A]' : 'bg-white border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
            {opt.label}
          </button>)}
      </div>

      <div className="space-y-5">
        {filtered.map(sg => {
        const isApproved = approved.has(sg.id);
        const isRejected = rejected.has(sg.id);
        const sCfg = statusConfig[sg.status];
        return <div key={sg.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all ${isApproved ? 'border-[#0B6B3A]/40' : isRejected ? 'border-gray-200 opacity-50' : 'border-[#d1e8db] hover:shadow-md'}`}>
              {/* Header */}
              <div className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 ${isApproved ? 'bg-[#f0f9f4]' : 'bg-[#fafcfa]'} border-b border-[#e6f4ed]`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${sg.matchScore >= 95 ? 'bg-[#e6f4ed]' : sg.matchScore >= 85 ? 'bg-amber-50' : 'bg-red-50'}`}>
                    🤖
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-black text-gray-900 truncate">{sg.className}</h3>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <Badge variant="gray">{sg.programme}</Badge>
                      <Badge variant="blue">{sg.delivery}</Badge>
                      <Badge variant={sCfg.variant}>{sCfg.label}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-medium">Match Score</p>
                    <p className={`text-2xl font-black leading-none ${sg.matchScore >= 95 ? 'text-[#0B6B3A]' : sg.matchScore >= 85 ? 'text-amber-600' : 'text-red-500'}`}>{sg.matchScore}%</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Schedule */}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Schedule</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CalendarDays size={13} className="text-[#0B6B3A] shrink-0" />
                      <span className="font-semibold">{sg.dayTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Globe size={12} className="shrink-0" />
                      <span>{sg.timezone} timezone</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users size={12} className="shrink-0" />
                      <span>Ages {sg.ageGroup}</span>
                    </div>
                  </div>
                </div>

                {/* Volunteer Match */}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Volunteer Match</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#0B6B3A]/10 flex items-center justify-center text-xs shrink-0">🧑‍💻</div>
                      <div>
                        <p className="text-xs font-bold text-gray-800">{sg.leadVolunteer}</p>
                        <p className="text-[10px] text-gray-400">Lead Volunteer</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 ${sg.backupVolunteer === '— Not matched —' ? 'opacity-60' : ''}`}>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 ${sg.backupVolunteer === '— Not matched —' ? 'bg-red-50' : 'bg-[#0B6B3A]/10'}`}>
                        {sg.backupVolunteer === '— Not matched —' ? '❌' : '🧑‍💻'}
                      </div>
                      <div>
                        <p className={`text-xs font-bold ${sg.backupVolunteer === '— Not matched —' ? 'text-red-500' : 'text-gray-800'}`}>{sg.backupVolunteer}</p>
                        <p className="text-[10px] text-gray-400">Backup Volunteer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Learner Match */}
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Learner Match</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black text-[#0B6B3A] leading-none">{sg.learnerCount}</span>
                      <span className="text-xs text-gray-500">learners matched</span>
                    </div>
                    <p className="text-xs text-gray-500">{sg.learnerTypes}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {sg.countries.map(c => <span key={c} className="text-[10px] bg-[#f0f9f4] text-[#0B6B3A] px-2 py-0.5 rounded-full font-medium border border-[#d1e8db]">{c}</span>)}
                    </div>
                    {sg.timeMatch ? <p className="text-[10px] text-[#0B6B3A] font-semibold flex items-center gap-1"><Check size={10} />Time preference matches</p> : <p className="text-[10px] text-amber-600 font-semibold flex items-center gap-1"><AlertCircle size={10} />Partial time match</p>}
                  </div>
                </div>
              </div>

              {/* Why suggested */}
              <div className="px-6 pb-4">
                <div className="p-3.5 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Why this class was suggested</p>
                  <ul className="space-y-1">
                    {sg.matchReasons.map(reason => <li key={reason} className="flex items-center gap-2 text-xs text-gray-600">
                        <Check size={10} className="text-[#0B6B3A] shrink-0" />
                        <span>{reason}</span>
                      </li>)}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 border-t border-[#f0f4f2] flex flex-wrap items-center justify-between gap-3">
                {!isApproved && !isRejected && <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 rounded-lg border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors flex items-center gap-1.5">
                      <Edit3 size={11} /><span>Edit Suggestion</span>
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors flex items-center gap-1.5">
                      <RefreshCw size={11} /><span>Replace Volunteer</span>
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors flex items-center gap-1.5">
                      <Users size={11} /><span>Edit Learners</span>
                    </button>
                  </div>}
                {!isApproved && !isRejected && <div className="flex gap-2 ml-auto">
                    <button onClick={() => setRejected(prev => {
                const n = new Set(prev);
                n.add(sg.id);
                return n;
              })} className="px-4 py-2 rounded-xl border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors">
                      Reject
                    </button>
                    <button onClick={() => setApproved(prev => {
                const n = new Set(prev);
                n.add(sg.id);
                return n;
              })} className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${sg.status === 'NeedsBackup' ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-[#0B6B3A] text-white hover:bg-[#095e32]'}`}>
                      {sg.status === 'NeedsBackup' ? 'Approve Anyway' : 'Approve Class'}
                    </button>
                  </div>}
                {isApproved && <div className="ml-auto">
                    <Badge variant="green"><Check size={10} className="mr-1" />Approved — Awaiting Publication</Badge>
                  </div>}
                {isRejected && <div className="ml-auto">
                    <Badge variant="red"><X size={10} className="mr-1" />Rejected</Badge>
                  </div>}
              </div>
            </div>;
      })}
      </div>
    </div>;
};

// ─── SUB-PAGE: VOLUNTEER AVAILABILITY MATRIX ─────────────────────────────────

const AvailabilityPage = () => {
  const [filterProgramme, setFilterProgramme] = useState('All');
  const DISPLAY_DAYS = ['Sat', 'Sun'];
  const DISPLAY_TIMES = ['9 AM', '10 AM', '11 AM', '2 PM', '3 PM'];
  const getSlotData = (volunteerName: string, day: string, time: string) => {
    const key = `${day}-${time}`;
    const volData = AVAILABILITY_MATRIX[volunteerName];
    return volData?.[key] ?? null;
  };
  const getSlotCount = (day: string, time: string) => {
    return MATRIX_VOLUNTEERS.filter(v => {
      const key = `${day}-${time}`;
      return AVAILABILITY_MATRIX[v.name]?.[key];
    }).length;
  };
  const bestSlots = [{
    label: 'Sat 9:00 AM GMT',
    volunteers: 3,
    desc: 'High supply – Sarah, Kofi, Lena all available'
  }, {
    label: 'Sun 3:00 PM WAT',
    volunteers: 2,
    desc: 'Good backup coverage – Kofi & Lena'
  }, {
    label: 'Sat 10:00 AM EAT',
    volunteers: 2,
    desc: 'Kofi + Tom (Kofi lead, Tom backup)'
  }];
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Volunteer Availability Matrix" sub="See which volunteers are free, which slots overlap, and where coverage gaps exist." />

      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 bg-white border border-[#d1e8db] rounded-xl px-3 py-2">
          <Filter size={13} className="text-gray-400 shrink-0" />
          <select value={filterProgramme} onChange={e => setFilterProgramme(e.target.value)} className="text-sm text-gray-700 bg-transparent outline-none">
            {['All', 'Hour of AI', 'Digital Skills for Kids', 'Basic Maths Literacy'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500 bg-white border border-[#d1e8db] rounded-xl px-4 py-2.5">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#0B6B3A] shrink-0" /><span>2+ Volunteers</span></span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#e6f4ed] border border-[#0B6B3A]/30 shrink-0" /><span>Available</span></span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 shrink-0" /><span>Assigned</span></span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-200 shrink-0" /><span>Unavailable</span></span>
        </div>
      </div>

      {/* Matrix */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-[#f7fbf9] border-b border-[#e6f4ed]">
              <tr>
                <th className="text-left text-xs font-bold text-gray-500 px-4 py-3 whitespace-nowrap w-48">Volunteer</th>
                {DISPLAY_DAYS.map(day => DISPLAY_TIMES.map(time => <th key={`${day}-${time}`} className="text-center text-[10px] font-bold text-gray-500 px-2 py-3 whitespace-nowrap">
                      <p className="text-[#0B6B3A] font-black">{day}</p>
                      <p>{time}</p>
                    </th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8fbf9]">
              {MATRIX_VOLUNTEERS.map(vol => <tr key={vol.name} className="hover:bg-[#fafcfa] transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#22a860] to-[#0B6B3A] flex items-center justify-center text-sm shrink-0">
                        🧑‍💻
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{vol.name}</p>
                        <p className="text-[10px] text-gray-400">{vol.tz}</p>
                        {!vol.available && <Badge variant="red">Inactive</Badge>}
                      </div>
                    </div>
                  </td>
                  {DISPLAY_DAYS.map(day => DISPLAY_TIMES.map(time => {
                const slot = getSlotData(vol.name, day, time);
                const count = getSlotCount(day, time);
                return <td key={`${day}-${time}`} className="px-2 py-3.5 text-center">
                          {slot ? <div className={`mx-auto w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all ${slot.locked ? 'bg-amber-100 border-2 border-amber-300' : count >= 2 ? 'bg-[#0B6B3A] hover:bg-[#095e32]' : 'bg-[#e6f4ed] border border-[#0B6B3A]/30 hover:border-[#0B6B3A]'}`}>
                              {slot.locked ? <Lock size={12} className="text-amber-600" /> : <Check size={12} className={count >= 2 ? 'text-white' : 'text-[#0B6B3A]'} />}
                            </div> : <div className="mx-auto w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                              <span className="text-gray-200 text-xs">—</span>
                            </div>}
                        </td>;
              }))}
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {/* Best Slots Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {bestSlots.map(slot => <div key={slot.label} className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-[#0B6B3A] flex items-center justify-center shrink-0">
                <Zap size={14} className="text-white" />
              </div>
              <p className="text-sm font-black text-gray-900">{slot.label}</p>
            </div>
            <p className="text-xs text-gray-500 mb-3">{slot.desc}</p>
            <div className="flex items-center justify-between">
              <Badge variant="green">{slot.volunteers} volunteers free</Badge>
              <button className="text-xs font-bold text-[#0B6B3A] hover:underline">Assign</button>
            </div>
          </div>)}
      </div>
    </div>;
};

// ─── SUB-PAGE: LEARNER DEMAND ─────────────────────────────────────────────────

const LearnerDemandPage = () => {
  const countryBreakdown = [{
    id: 'cb1',
    country: 'Nigeria',
    flag: '🇳🇬',
    waiting: 38,
    programme: 'Hour of AI / Digital Skills'
  }, {
    id: 'cb2',
    country: 'Kenya',
    flag: '🇰🇪',
    waiting: 24,
    programme: 'Hour of AI'
  }, {
    id: 'cb3',
    country: 'Ghana',
    flag: '🇬🇭',
    waiting: 18,
    programme: 'Hour of AI / Digital Skills'
  }, {
    id: 'cb4',
    country: 'Uganda',
    flag: '🇺🇬',
    waiting: 15,
    programme: 'Hour of AI'
  }, {
    id: 'cb5',
    country: 'Senegal',
    flag: '🇸🇳',
    waiting: 1,
    programme: 'Maths Literacy'
  }];
  const totalWaiting = DEMAND_CARDS.reduce((a, c) => a + c.waiting, 0);
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Learner Demand View" sub="See which programmes have unassigned learners and what classes need to be created." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: 'Total Waiting',
        value: totalWaiting,
        color: 'amber',
        icon: Users
      }, {
        label: 'Parent Registrations',
        value: 31,
        color: 'green',
        icon: Users
      }, {
        label: 'Hub Registrations',
        value: 65,
        color: 'blue',
        icon: MapPin
      }, {
        label: 'Classes Needed',
        value: DEMAND_CARDS.reduce((a, c) => a + c.classesNeeded, 0),
        color: 'red',
        icon: BookOpen
      }].map(stat => {
        const Icon = stat.icon;
        const clr = {
          green: 'text-[#0B6B3A] bg-[#0B6B3A]/10',
          amber: 'text-amber-600 bg-amber-50',
          red: 'text-red-600 bg-red-50',
          blue: 'text-blue-600 bg-blue-50'
        }[stat.color as string] ?? '';
        const valClr = {
          green: 'text-[#0B6B3A]',
          amber: 'text-amber-600',
          red: 'text-red-600',
          blue: 'text-blue-600'
        }[stat.color as string] ?? '';
        return <div key={stat.label} className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${clr}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className={`text-2xl font-black ${valClr}`}>{stat.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            </div>;
      })}
      </div>

      {/* Demand Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {DEMAND_CARDS.map(card => <div key={card.id} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gradient-to-r from-[#0B6B3A] to-[#22a860] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="text-white font-black text-sm">{card.programme}</p>
                  <p className="text-white/70 text-xs mt-0.5">Ages {card.ageGroup}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white leading-none">{card.waiting}</p>
                <p className="text-white/70 text-[10px]">waiting</p>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f7fbf9] rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 font-medium">Suggested Class Size</p>
                  <p className="text-lg font-black text-[#0B6B3A] leading-tight">{card.suggestedClassSize}</p>
                </div>
                <div className="bg-[#f7fbf9] rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 font-medium">Classes Needed</p>
                  <p className="text-lg font-black text-amber-600 leading-tight">{card.classesNeeded}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium mb-1.5">Preferred Times</p>
                <div className="flex flex-wrap gap-1.5">
                  {card.preferredTimes.map(t => <span key={t} className="text-[10px] bg-[#e6f4ed] text-[#0B6B3A] px-2 py-0.5 rounded-full font-semibold border border-[#c3e0cf]">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-[#f0f4f2]">
                <button className="flex-1 py-2 rounded-xl bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors flex items-center justify-center gap-1.5">
                  <Plus size={11} /><span>Create Class</span>
                </button>
                <button className="flex-1 py-2 rounded-xl border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors flex items-center justify-center gap-1.5">
                  <Eye size={11} /><span>View Learners</span>
                </button>
              </div>
            </div>
          </div>)}
      </div>

      {/* Country Breakdown */}
      <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
          <Globe size={16} className="text-[#0B6B3A]" />
          <span>Demand by Country</span>
        </h3>
        <div className="space-y-4">
          {countryBreakdown.map(c => <div key={c.id} className="flex items-center gap-4">
              <span className="text-xl leading-none w-6 shrink-0">{c.flag}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <div>
                    <span className="text-sm font-bold text-gray-800">{c.country}</span>
                    <span className="text-xs text-gray-400 ml-2">{c.programme}</span>
                  </div>
                  <span className="text-sm font-black text-amber-600">{c.waiting} waiting</span>
                </div>
                <div className="h-2 bg-[#f0f9f4] rounded-full">
                  <div className="h-2 rounded-full bg-gradient-to-r from-[#0B6B3A] to-[#22a860]" style={{
                width: `${c.waiting / 40 * 100}%`
              }} />
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};

// ─── SUB-PAGE: MATCHING RULES ─────────────────────────────────────────────────

const MatchingRulesPage = () => {
  const [classRules, setClassRules] = useState({
    minVolunteers: '2',
    maxLearners: '20',
    minLearners: '5',
    sessionDuration: '60',
    frequency: 'Weekly'
  });
  const [volRules, setVolRules] = useState({
    preventDoubleBook: true,
    respectCommitment: true,
    requireBackup: true,
    multipleClasses: false,
    minTraining: true
  });
  const [learnerRules, setLearnerRules] = useState({
    matchAge: true,
    matchProgramme: true,
    matchTime: true,
    matchTimezone: true,
    mixedCountry: true,
    mixedType: false
  });
  const [riskRules, setRiskRules] = useState({
    flagNoBackup: true,
    flagRepeatAbsence: true,
    flagUnassignedDays: '7'
  });
  const [automationMode, setAutomationMode] = useState<'manual' | 'draft' | 'approval'>('approval');
  const [saved, setSaved] = useState(false);
  const ToggleRule = ({
    value,
    onChange,
    label,
    sub
  }: {
    value: boolean;
    onChange: (v: boolean) => void;
    label: string;
    sub?: string;
  }) => <div className="flex items-center justify-between p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
      <div className="flex-1 min-w-0 pr-3">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <button onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${value ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
        <span className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all" style={{
        left: value ? '22px' : '2px'
      }} />
      </button>
    </div>;
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Matching Rules" sub="Configure the rules the engine uses to suggest and create classes. These apply to every matching run." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Rules */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <BookOpen size={16} className="text-[#0B6B3A]" /><span>Class Rules</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[{
            key: 'minVolunteers',
            label: 'Min Volunteers'
          }, {
            key: 'maxLearners',
            label: 'Max Learners'
          }, {
            key: 'minLearners',
            label: 'Min Learners to Suggest'
          }, {
            key: 'sessionDuration',
            label: 'Session Duration (min)'
          }].map(f => <div key={f.key}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                <input value={classRules[f.key as keyof typeof classRules]} onChange={e => setClassRules(p => ({
              ...p,
              [f.key]: e.target.value
            }))} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
              </div>)}
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Default Class Frequency</label>
              <select value={classRules.frequency} onChange={e => setClassRules(p => ({
              ...p,
              frequency: e.target.value
            }))} className="w-full border border-[#d1e8db] rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A] bg-white">
                {['Weekly', 'Bi-weekly', 'Monthly'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Volunteer Rules */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <UserCheck size={16} className="text-[#0B6B3A]" /><span>Volunteer Rules</span>
          </h3>
          <div className="space-y-3">
            <ToggleRule value={volRules.preventDoubleBook} onChange={v => setVolRules(p => ({
            ...p,
            preventDoubleBook: v
          }))} label="Prevent double-booking" sub="Volunteers cannot be in two classes at the same time" />
            <ToggleRule value={volRules.respectCommitment} onChange={v => setVolRules(p => ({
            ...p,
            respectCommitment: v
          }))} label="Respect weekly commitment limit" sub="Never exceed the volunteer's stated hours" />
            <ToggleRule value={volRules.requireBackup} onChange={v => setVolRules(p => ({
            ...p,
            requireBackup: v
          }))} label="Require backup volunteer" sub="Suggest classes only when a backup is available" />
            <ToggleRule value={volRules.multipleClasses} onChange={v => setVolRules(p => ({
            ...p,
            multipleClasses: v
          }))} label="Allow lead on multiple classes" sub="One volunteer can lead more than one class per week" />
            <ToggleRule value={volRules.minTraining} onChange={v => setVolRules(p => ({
            ...p,
            minTraining: v
          }))} label="Require training completion" sub="Only assign volunteers who completed safeguarding training" />
          </div>
        </div>

        {/* Learner Rules */}
        <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Users size={16} className="text-[#0B6B3A]" /><span>Learner Matching Rules</span>
          </h3>
          <div className="space-y-3">
            <ToggleRule value={learnerRules.matchAge} onChange={v => setLearnerRules(p => ({
            ...p,
            matchAge: v
          }))} label="Match by age group" />
            <ToggleRule value={learnerRules.matchProgramme} onChange={v => setLearnerRules(p => ({
            ...p,
            matchProgramme: v
          }))} label="Match by programme selection" />
            <ToggleRule value={learnerRules.matchTime} onChange={v => setLearnerRules(p => ({
            ...p,
            matchTime: v
          }))} label="Match by time preference" />
            <ToggleRule value={learnerRules.matchTimezone} onChange={v => setLearnerRules(p => ({
            ...p,
            matchTimezone: v
          }))} label="Match by country/timezone" />
            <ToggleRule value={learnerRules.mixedCountry} onChange={v => setLearnerRules(p => ({
            ...p,
            mixedCountry: v
          }))} label="Allow mixed-country classes" sub="Learners from different countries can be in the same class" />
            <ToggleRule value={learnerRules.mixedType} onChange={v => setLearnerRules(p => ({
            ...p,
            mixedType: v
          }))} label="Allow hub + parent learners together" sub="Hub registrations and parent registrations in the same class" />
          </div>
        </div>

        {/* Risk + Automation Rules */}
        <div className="space-y-5">
          <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" /><span>Risk Flags</span>
            </h3>
            <div className="space-y-3">
              <ToggleRule value={riskRules.flagNoBackup} onChange={v => setRiskRules(p => ({
              ...p,
              flagNoBackup: v
            }))} label="Flag classes without backup volunteer" />
              <ToggleRule value={riskRules.flagRepeatAbsence} onChange={v => setRiskRules(p => ({
              ...p,
              flagRepeatAbsence: v
            }))} label="Flag repeated volunteer absences" sub="Alert after 2+ absences in a row" />
              <div className="p-4 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Flag unassigned learners after (days)</label>
                <input value={riskRules.flagUnassignedDays} onChange={e => setRiskRules(p => ({
                ...p,
                flagUnassignedDays: e.target.value
              }))} className="w-24 border border-[#d1e8db] rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#0B6B3A]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#d1e8db] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Cpu size={16} className="text-[#0B6B3A]" /><span>Automation Mode</span>
            </h3>
            <p className="text-xs text-gray-500 mb-4">Controls how far the system goes before requiring admin approval.</p>
            <div className="space-y-2.5">
              {[{
              id: 'manual',
              label: 'Manual suggestions only',
              sub: 'System shows ideas. Admin creates all classes manually.'
            }, {
              id: 'draft',
              label: 'Auto-create draft classes',
              sub: 'System creates drafts automatically. Admin reviews before publication.'
            }, {
              id: 'approval',
              label: 'Auto-create, admin approval to publish',
              sub: '⭐ Recommended — Classes draft automatically, admin must approve publication.'
            }].map(mode => <button key={mode.id} onClick={() => setAutomationMode(mode.id as typeof automationMode)} className={`w-full text-left p-4 rounded-xl border transition-all ${automationMode === mode.id ? 'border-[#0B6B3A] bg-[#f0f9f4]' : 'border-[#e6f4ed] hover:border-[#0B6B3A]/50'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${automationMode === mode.id ? 'border-[#0B6B3A] bg-[#0B6B3A]' : 'border-gray-300'}`}>
                      {automationMode === mode.id && <Check size={9} className="text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{mode.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{mode.sub}</p>
                    </div>
                  </div>
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        {saved ? <div className="flex items-center gap-2 px-5 py-2.5 bg-[#e6f4ed] rounded-xl">
            <CheckCircle size={15} className="text-[#0B6B3A]" />
            <span className="text-sm font-bold text-[#0B6B3A]">Rules saved successfully</span>
          </div> : <button onClick={() => setSaved(true)} className="px-6 py-2.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] transition-colors shadow-sm">
            Save All Rules
          </button>}
      </div>
    </div>;
};

// ─── SUB-PAGE: ABSENCE & COVERAGE ────────────────────────────────────────────

const CoveragePage = () => {
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Absence & Coverage Automation" sub="Manage volunteer absences and ensure every class has coverage before it runs." />

      {/* Coverage Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{
        label: 'Fully Covered',
        value: 1,
        color: 'green',
        icon: CheckCircle
      }, {
        label: 'Backup Covering',
        value: 1,
        color: 'blue',
        icon: UserCheck
      }, {
        label: 'Needs Replacement',
        value: 0,
        color: 'amber',
        icon: AlertTriangle
      }, {
        label: 'At Risk',
        value: 1,
        color: 'red',
        icon: AlertCircle
      }].map(stat => {
        const Icon = stat.icon;
        const clr = {
          green: 'text-[#0B6B3A] bg-[#0B6B3A]/10',
          amber: 'text-amber-600 bg-amber-50',
          red: 'text-red-600 bg-red-50',
          blue: 'text-blue-600 bg-blue-50'
        }[stat.color as string] ?? '';
        const valClr = {
          green: 'text-[#0B6B3A]',
          amber: 'text-amber-600',
          red: 'text-red-600',
          blue: 'text-blue-600'
        }[stat.color as string] ?? '';
        return <div key={stat.label} className="bg-white border border-[#d1e8db] rounded-2xl p-5 shadow-sm flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${clr}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className={`text-2xl font-black ${valClr}`}>{stat.value}</p>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">{stat.label}</p>
              </div>
            </div>;
      })}
      </div>

      {/* Coverage Cards */}
      <div className="space-y-4">
        {ABSENCE_RECORDS.map(record => {
        const cfg = coverageConfig[record.coverageStatus];
        const isHandled = accepted.has(record.id);
        return <div key={record.id} className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${record.coverageStatus === 'AtRisk' ? 'border-red-200' : record.coverageStatus === 'NeedsReplacement' ? 'border-amber-200' : 'border-[#d1e8db]'}`}>
              <div className={`px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b ${record.coverageStatus === 'AtRisk' ? 'bg-red-50/60 border-red-100' : record.coverageStatus === 'BackupCovering' ? 'bg-blue-50/60 border-blue-100' : 'bg-[#fafcfa] border-[#e6f4ed]'}`}>
                <div>
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                    <h3 className="text-sm font-black text-gray-900">{record.className}</h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">{record.volunteer}</span>
                    <span className="mx-1">·</span>
                    <span>Absent {record.date}</span>
                  </p>
                </div>
                <Badge variant={cfg.variant}>{cfg.label}</Badge>
              </div>

              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Coverage Status</p>
                  <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${record.coverageStatus === 'AtRisk' ? 'bg-red-50 border-red-100' : record.coverageStatus === 'BackupCovering' ? 'bg-blue-50 border-blue-100' : record.coverageStatus === 'Covered' ? 'bg-[#e6f4ed] border-[#c3e0cf]' : 'bg-amber-50 border-amber-100'}`}>
                    {record.coverageStatus === 'AtRisk' ? <AlertCircle size={14} className="text-red-500 shrink-0" /> : record.coverageStatus === 'BackupCovering' ? <UserCheck size={14} className="text-blue-500 shrink-0" /> : <CheckCircle size={14} className="text-[#0B6B3A] shrink-0" />}
                    <div>
                      <p className="text-xs font-bold text-gray-800">Backup: {record.backupVolunteer}</p>
                      <p className="text-[10px] text-gray-500">
                        {record.coverageStatus === 'Covered' ? 'Backup confirmed and notified' : record.coverageStatus === 'BackupCovering' ? 'Backup has accepted coverage' : record.coverageStatus === 'AtRisk' ? 'No backup assigned – class at risk!' : 'Backup being arranged'}
                      </p>
                    </div>
                  </div>
                </div>

                {record.replacementSuggestions.length > 0 && <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Replacements</p>
                    <div className="space-y-2">
                      {record.replacementSuggestions.map((name, i) => <div key={name} className="flex items-center justify-between p-2.5 bg-[#f7fbf9] border border-[#e6f4ed] rounded-xl">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-[#0B6B3A]/10 flex items-center justify-center text-xs">🧑‍💻</div>
                            <div>
                              <p className="text-xs font-bold text-gray-800">{name}</p>
                              <p className="text-[10px] text-gray-400">{i === 0 ? 'Best match · Programme aligned' : 'Available · Spare capacity'}</p>
                            </div>
                          </div>
                          <button className="text-xs font-bold text-[#0B6B3A] hover:underline px-2 py-1 hover:bg-[#e6f4ed] rounded-lg transition-colors">
                            Assign
                          </button>
                        </div>)}
                    </div>
                  </div>}
              </div>

              <div className="px-5 pb-5 flex flex-wrap gap-2">
                {!isHandled ? <div className="flex flex-wrap gap-2">
                    <button onClick={() => setAccepted(prev => {
                const n = new Set(prev);
                n.add(record.id);
                return n;
              })} className="px-3 py-1.5 rounded-lg bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#095e32] transition-colors">
                      Accept Backup Cover
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors">
                      Replace Volunteer
                    </button>
                    <button className="px-3 py-1.5 rounded-lg border border-[#d1e8db] text-gray-600 text-xs font-bold hover:border-[#0B6B3A] hover:text-[#0B6B3A] transition-colors flex items-center gap-1.5">
                      <MessageSquare size={11} /><span>Message Class</span>
                    </button>
                    {record.coverageStatus === 'AtRisk' && <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs font-bold hover:bg-red-50 transition-colors">
                        Cancel Session
                      </button>}
                  </div> : <Badge variant="green"><Check size={10} className="mr-1" />Coverage confirmed</Badge>}
              </div>
            </div>;
      })}
      </div>
    </div>;
};

// ─── SUB-PAGE: AUTOMATION LOGS ───────────────────────────────────────────────

const AutomationLogsPage = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | LogEntry['category']>('all');
  const filtered = LOG_ENTRIES.filter(l => filterCategory === 'all' || l.category === filterCategory);
  const catConfig: Record<LogEntry['category'], {
    label: string;
    variant: BadgeVariant;
    dot: string;
  }> = {
    class: {
      label: 'Class',
      variant: 'green',
      dot: 'bg-[#0B6B3A]'
    },
    volunteer: {
      label: 'Volunteer',
      variant: 'blue',
      dot: 'bg-blue-500'
    },
    absence: {
      label: 'Absence',
      variant: 'amber',
      dot: 'bg-amber-500'
    },
    learner: {
      label: 'Learner',
      variant: 'purple',
      dot: 'bg-purple-500'
    },
    warning: {
      label: 'Warning',
      variant: 'red',
      dot: 'bg-red-500'
    }
  };
  const filterOpts: Array<{
    id: 'all' | LogEntry['category'];
    label: string;
  }> = [{
    id: 'all',
    label: 'All Logs'
  }, {
    id: 'class',
    label: 'Class Creation'
  }, {
    id: 'volunteer',
    label: 'Volunteer'
  }, {
    id: 'absence',
    label: 'Absence'
  }, {
    id: 'learner',
    label: 'Learner'
  }, {
    id: 'warning',
    label: 'Warnings'
  }];
  return <div className="space-y-6">
      <PageHeading label="Smart Matching" title="Automation Logs" sub="A transparent record of every action the system has taken. Nothing is hidden." />

      <div className="flex flex-wrap gap-2">
        {filterOpts.map(opt => <button key={opt.id} onClick={() => setFilterCategory(opt.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${filterCategory === opt.id ? 'bg-[#0B6B3A] text-white border-[#0B6B3A]' : 'bg-white border-[#d1e8db] text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
            {opt.label}
          </button>)}
      </div>

      <div className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#e6f4ed] flex items-center justify-between">
          <p className="text-sm font-bold text-gray-900">{filtered.length} log entries</p>
          <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6B3A] hover:underline">
            <FileText size={12} /><span>Export Logs</span>
          </button>
        </div>
        <div className="divide-y divide-[#f8fbf9]">
          {filtered.map(log => {
          const cfg = catConfig[log.category];
          return <div key={log.id} className="px-6 py-4 hover:bg-[#fafcfa] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot}`} />
                    <div className="w-px flex-1 bg-[#e6f4ed] min-h-[20px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <Badge variant={cfg.variant}>{cfg.label}</Badge>
                      {log.requiresAdmin && <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={9} /><span>Admin Action Required</span>
                        </span>}
                      <span className="text-[10px] text-gray-400 ml-auto">{log.timestamp}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{log.action}</p>
                    <div className="space-y-0.5">
                      <p className="text-xs text-gray-500 flex items-start gap-1.5">
                        <span className="font-semibold text-gray-600 shrink-0">Trigger:</span>
                        <span>{log.trigger}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-start gap-1.5">
                        <span className="font-semibold text-gray-600 shrink-0">Result:</span>
                        <span>{log.result}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
};

// ─── SMART MATCHING NAV ───────────────────────────────────────────────────────

const SMART_NAV: Array<{
  id: SmartSubPage;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: 'red' | 'amber';
}> = [{
  id: 'overview',
  label: 'Matching Overview',
  icon: Activity
}, {
  id: 'suggestions',
  label: 'Suggested Classes',
  icon: Cpu,
  badge: '4',
  badgeVariant: 'amber'
}, {
  id: 'availability',
  label: 'Volunteer Availability',
  icon: CalendarDays
}, {
  id: 'demand',
  label: 'Learner Demand',
  icon: Users
}, {
  id: 'rules',
  label: 'Matching Rules',
  icon: Settings
}, {
  id: 'coverage',
  label: 'Absence & Coverage',
  icon: Shield,
  badge: '1',
  badgeVariant: 'red'
}, {
  id: 'logs',
  label: 'Automation Logs',
  icon: List
}];

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export const SmartMatchingPage = () => {
  const [activeSub, setActiveSub] = useState<SmartSubPage>('overview');
  const renderPage = () => {
    if (activeSub === 'overview') return <MatchingOverviewPage onSubNavigate={setActiveSub} />;
    if (activeSub === 'suggestions') return <SuggestionsPage />;
    if (activeSub === 'availability') return <AvailabilityPage />;
    if (activeSub === 'demand') return <LearnerDemandPage />;
    if (activeSub === 'rules') return <MatchingRulesPage />;
    if (activeSub === 'coverage') return <CoveragePage />;
    if (activeSub === 'logs') return <AutomationLogsPage />;
    return <MatchingOverviewPage onSubNavigate={setActiveSub} />;
  };
  return <div className="space-y-0">
      {/* Sub-nav */}
      <div className="flex gap-1.5 flex-wrap mb-6 bg-white border border-[#d1e8db] rounded-2xl p-2 shadow-sm">
        {SMART_NAV.map(item => {
        const Icon = item.icon;
        const active = activeSub === item.id;
        return <button key={item.id} onClick={() => setActiveSub(item.id)} className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${active ? 'bg-[#0B6B3A] text-white shadow-sm' : 'text-gray-500 hover:bg-[#f0f9f4] hover:text-[#0B6B3A]'}`}>
              <Icon size={13} className="shrink-0" />
              <span>{item.label}</span>
              {item.badge && <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[16px] text-center ${active ? 'bg-white/25 text-white' : item.badgeVariant === 'red' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                  {item.badge}
                </span>}
            </button>;
      })}
      </div>

      {renderPage()}
    </div>;
};