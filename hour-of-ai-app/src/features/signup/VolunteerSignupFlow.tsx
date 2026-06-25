import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Globe, Briefcase, MessageSquare, Zap, BookOpen, Users, Cpu, Clock, Monitor, Home, Layers, ChevronDown, CheckCircle, FileText, AlertCircle, Info } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface VolunteerFormData {
  fullName: string;
  email: string;
  organisation: string;
  country: string;
  timezone: string;
  motivation: string;
  skills: string[];
  programmes: string[];
  hoursPerWeek: number;
  availability: Record<string, string[]>;
  sessionMode: string;
  ageGroups: string[];
  trainingAck: boolean;
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 8;
const COUNTRIES = ['Nigeria', 'Kenya', 'Ghana', 'Uganda', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'India', 'Brazil', 'Australia', 'France', 'Germany', 'Tanzania', 'Ethiopia', 'Rwanda', 'Zimbabwe', 'Other'];
const TIMEZONES = ['GMT (UTC+0)', 'WAT (UTC+1)', 'CAT (UTC+2)', 'EAT (UTC+3)', 'IST (UTC+5:30)', 'BST (UTC+1)', 'EST (UTC-5)', 'CST (UTC-6)', 'PST (UTC-8)', 'AEST (UTC+10)'];
const SKILL_OPTIONS = [{
  id: 'ai_tech',
  label: 'AI / Tech',
  icon: Cpu
}, {
  id: 'teaching',
  label: 'Teaching',
  icon: BookOpen
}, {
  id: 'mentoring',
  label: 'Mentoring',
  icon: Users
}, {
  id: 'other',
  label: 'Other',
  icon: Layers
}] as any[];
const PROGRAMME_OPTIONS = [{
  id: 'hour_of_ai',
  label: 'Hour of AI'
}, {
  id: 'maths',
  label: 'Maths Literacy'
}, {
  id: 'english',
  label: 'English Support'
}, {
  id: 'digital',
  label: 'Digital Skills'
}] as any[];
const HOURS_OPTIONS = [1, 2, 3, 4, 5];
const DAYS_GRID = [{
  id: 'mon',
  label: 'Mon'
}, {
  id: 'tue',
  label: 'Tue'
}, {
  id: 'wed',
  label: 'Wed'
}, {
  id: 'thu',
  label: 'Thu'
}, {
  id: 'fri',
  label: 'Fri'
}, {
  id: 'sat',
  label: 'Sat'
}, {
  id: 'sun',
  label: 'Sun'
}] as any[];
const TIME_GRID = [{
  id: 'early',
  label: '6–9 AM'
}, {
  id: 'morning',
  label: '9–12 PM'
}, {
  id: 'midday',
  label: '12–3 PM'
}, {
  id: 'afternoon',
  label: '3–6 PM'
}, {
  id: 'evening',
  label: '6–9 PM'
}, {
  id: 'night',
  label: '9 PM+'
}] as any[];
const SESSION_MODES = [{
  id: 'virtual',
  label: 'Virtual',
  icon: Monitor
}, {
  id: 'physical',
  label: 'Physical',
  icon: Home
}, {
  id: 'both',
  label: 'Both',
  icon: Layers
}] as any[];
const AGE_GROUPS = [{
  id: '8_10',
  label: '8–10',
  desc: 'Early learners'
}, {
  id: '11_14',
  label: '11–14',
  desc: 'Middle years'
}, {
  id: '15_18',
  label: '15–18',
  desc: 'Older students'
}] as any[];

// ─── SHARED UI ATOMS ─────────────────────────────────────────────────────────

const slideVariants: any = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut'
    }
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: 'easeIn'
    }
  })
};
const FormLabel = ({
  children,
  required
}: {
  children: React.ReactNode;
  required?: boolean;
}) => <label className="block text-sm font-semibold text-gray-800 mb-1.5">
    <span>{children}</span>
    {required && <span className="text-[#0B6B3A] ml-0.5">*</span>}
  </label>;
const FormInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  icon: Icon
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ElementType;
}) => <div className="relative">
    {Icon && <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />}
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0B6B3A] focus:ring-2 focus:ring-[#0B6B3A]/10 transition-all bg-white`} />
  </div>;
const FormSelect = ({
  placeholder,
  value,
  onChange,
  options
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) => <div className="relative">
    <select value={value} onChange={e => onChange(e.target.value)} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#0B6B3A] focus:ring-2 focus:ring-[#0B6B3A]/10 transition-all bg-white appearance-none cursor-pointer">
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
  </div>;
const ToggleChip = ({
  selected,
  onClick,
  children
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => <button type="button" onClick={onClick} className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${selected ? 'border-[#0B6B3A] bg-[#0B6B3A] text-white shadow-sm' : 'border-gray-200 bg-white text-gray-600 hover:border-[#0B6B3A] hover:text-[#0B6B3A]'}`}>
    {children}
  </button>;

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

const StepBasicInfo = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => <div className="space-y-5">
    <div>
      <FormLabel required>Full Name</FormLabel>
      <FormInput icon={User} placeholder="Your full name" value={data.fullName} onChange={v => onChange('fullName', v)} />
    </div>
    <div>
      <FormLabel required>Email Address</FormLabel>
      <FormInput icon={Mail} type="email" placeholder="your@email.com" value={data.email} onChange={v => onChange('email', v)} />
    </div>
    <div>
      <FormLabel>Organisation (optional)</FormLabel>
      <FormInput icon={Briefcase} placeholder="Company, school or NGO" value={data.organisation} onChange={v => onChange('organisation', v)} />
    </div>
    <div>
      <FormLabel required>Country</FormLabel>
      <FormSelect placeholder="Select your country" value={data.country} onChange={v => onChange('country', v)} options={COUNTRIES} />
    </div>
    <div>
      <FormLabel>Time Zone</FormLabel>
      <FormSelect placeholder="Select time zone (auto-detected)" value={data.timezone} onChange={v => onChange('timezone', v)} options={TIMEZONES} />
    </div>
  </div>;
const StepMotivation = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => {
  const toggleSkill = (id: string) => {
    const updated = data.skills.includes(id) ? data.skills.filter(s => s !== id) : [...data.skills, id];
    onChange('skills', updated);
  };
  return <div className="space-y-6">
      <div>
        <FormLabel>Why would you like to volunteer?</FormLabel>
        <div className="relative mt-1">
          <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
          <textarea placeholder="Share what drives you to make a difference..." value={data.motivation} onChange={e => onChange('motivation', e.target.value)} rows={4} className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0B6B3A] focus:ring-2 focus:ring-[#0B6B3A]/10 transition-all bg-white resize-none" />
        </div>
      </div>
      <div>
        <FormLabel>Your Skills</FormLabel>
        <div className="grid grid-cols-2 gap-3 mt-1">
          {SKILL_OPTIONS.map(skill => <button key={skill.id} type="button" onClick={() => toggleSkill(skill.id)} className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${data.skills.includes(skill.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <skill.icon size={18} className={data.skills.includes(skill.id) ? 'text-[#0B6B3A]' : 'text-gray-400'} />
              <span className="text-sm font-semibold text-gray-900">{skill.label}</span>
            </button>)}
        </div>
      </div>
    </div>;
};
const StepVolProgrammes = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => {
  const toggle = (id: string) => {
    const updated = data.programmes.includes(id) ? data.programmes.filter(p => p !== id) : [...data.programmes, id];
    onChange('programmes', updated);
  };
  return <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">Which programmes would you like to support?</p>
      {PROGRAMME_OPTIONS.map(prog => <button key={prog.id} type="button" onClick={() => toggle(prog.id)} className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${data.programmes.includes(prog.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
          <span className="font-semibold text-gray-900 text-sm">{prog.label}</span>
          {data.programmes.includes(prog.id) && <CheckCircle size={18} className="text-[#0B6B3A] shrink-0" />}
        </button>)}
    </div>;
};
const StepCommitment = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => <div className="space-y-6">
    <div>
      <FormLabel>Hours per week you can commit</FormLabel>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {HOURS_OPTIONS.map(h => <button key={h} type="button" onClick={() => onChange('hoursPerWeek', h)} className={`flex flex-col items-center justify-center py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${data.hoursPerWeek === h ? 'border-[#0B6B3A] bg-[#0B6B3A] text-white shadow-md' : 'border-gray-200 bg-white text-gray-700 hover:border-[#0B6B3A]/50'}`}>
            <span className="text-xl font-black">{h}</span>
            <span className="text-[10px] mt-0.5 opacity-70">hr{h > 1 ? 's' : ''}</span>
          </button>)}
      </div>
    </div>
    <div className="bg-[#f0f9f4] border border-[#d1e8db] rounded-xl p-4">
      <div className="flex items-start gap-3">
        <Clock size={16} className="text-[#0B6B3A] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-[#0B6B3A]">
            <span>You're committing </span>
            <span>{data.hoursPerWeek}</span>
            <span>{data.hoursPerWeek === 1 ? ' hour' : ' hours'}</span>
            <span> per week</span>
          </p>
          <p className="text-xs text-[#0B6B3A]/70 mt-1">
            That's making a real difference to children around the world. Every session counts.
          </p>
        </div>
      </div>
    </div>
  </div>;
const StepAvailability = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => {
  const toggleSlot = (day: string, time: string) => {
    const current = data.availability[day] ?? [];
    const updated = current.includes(time) ? current.filter(t => t !== time) : [...current, time];
    onChange('availability', {
      ...data.availability,
      [day]: updated
    });
  };
  const isSelected = (day: string, time: string) => (data.availability[day] ?? []).includes(time);
  const totalSelected = Object.values(data.availability).reduce((sum, arr) => sum + arr.length, 0);
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Tap the blocks when you're available</p>
        {totalSelected > 0 && <span className="text-xs font-bold text-[#0B6B3A] bg-[#e6f4ed] px-2 py-1 rounded-lg">
            <span>{totalSelected}</span><span> selected</span>
          </span>}
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[420px]">
          {/* Header row */}
          <div className="grid grid-cols-8 gap-1 mb-1">
            <div className="text-[10px] text-gray-400 font-semibold py-1.5" />
            {DAYS_GRID.map(d => <div key={d.id} className="text-[10px] text-gray-500 font-bold text-center py-1.5">
                {d.label}
              </div>)}
          </div>
          {/* Grid */}
          {TIME_GRID.map(time => <div key={time.id} className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-[10px] text-gray-400 font-medium flex items-center pr-1">{time.label}</div>
              {DAYS_GRID.map(day => <button key={day.id} type="button" onClick={() => toggleSlot(day.id, time.id)} className={`h-9 rounded-lg transition-all duration-150 cursor-pointer border ${isSelected(day.id, time.id) ? 'bg-[#0B6B3A] border-[#0B6B3A] shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-[#e6f4ed] hover:border-[#0B6B3A]/40'}`} />)}
            </div>)}
        </div>
      </div>
    </div>;
};
const StepVolPreferences = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => {
  const toggleAge = (id: string) => {
    const updated = data.ageGroups.includes(id) ? data.ageGroups.filter(a => a !== id) : [...data.ageGroups, id];
    onChange('ageGroups', updated);
  };
  return <div className="space-y-6">
      <div>
        <FormLabel>Session Mode</FormLabel>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {SESSION_MODES.map(mode => <button key={mode.id} type="button" onClick={() => onChange('sessionMode', mode.id)} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${data.sessionMode === mode.id ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <mode.icon size={20} className={data.sessionMode === mode.id ? 'text-[#0B6B3A]' : 'text-gray-400'} />
              <span className="text-xs font-bold text-gray-900">{mode.label}</span>
            </button>)}
        </div>
      </div>
      <div>
        <FormLabel>Comfortable age groups</FormLabel>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {AGE_GROUPS.map(ag => <button key={ag.id} type="button" onClick={() => toggleAge(ag.id)} className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${data.ageGroups.includes(ag.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <span className="text-base font-black text-gray-900">{ag.label}</span>
              <span className="text-[10px] text-gray-400">{ag.desc}</span>
              {data.ageGroups.includes(ag.id) && <CheckCircle size={14} className="text-[#0B6B3A]" />}
            </button>)}
        </div>
      </div>
    </div>;
};
const StepTrainingAck = ({
  data,
  onChange
}: {
  data: VolunteerFormData;
  onChange: (k: keyof VolunteerFormData, v: unknown) => void;
}) => <div className="space-y-5">
    <div className="bg-gradient-to-br from-[#f0f9f4] to-[#e8f5ed] rounded-2xl p-5 border border-[#d1e8db]">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center shrink-0">
          <Info size={20} className="text-[#0B6B3A]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Training & Preparation</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Before your first session, you'll receive all the resources and guidance you need to deliver an excellent experience.
          </p>
        </div>
      </div>
      <ul className="space-y-2.5">
        {['Welcome pack & session guide', 'Child safeguarding briefing', 'Platform walkthrough (30 min)', 'Mentor buddy system'].map(item => <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
            <CheckCircle size={15} className="text-[#0B6B3A] shrink-0" />
            <span>{item}</span>
          </li>)}
      </ul>
    </div>
    <div className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#0B6B3A]/50 transition-all" onClick={() => onChange('trainingAck', !data.trainingAck)}>
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${data.trainingAck ? 'bg-[#0B6B3A] border-[#0B6B3A]' : 'border-gray-300'}`}>
        {data.trainingAck && <CheckCircle size={12} className="text-white fill-white" />}
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">
        I understand I will receive training materials and preparation support before running sessions.
      </p>
    </div>
  </div>;
const StepVolReview = ({
  data
}: {
  data: VolunteerFormData;
}) => {
  const progs = PROGRAMME_OPTIONS.filter(p => data.programmes.includes(p.id)).map(p => p.label).join(', ');
  const skills = SKILL_OPTIONS.filter(s => data.skills.includes(s.id)).map(s => s.label).join(', ');
  const ages = AGE_GROUPS.filter(a => data.ageGroups.includes(a.id)).map(a => a.label).join(', ');
  const totalSlots = Object.values(data.availability).reduce((s, a) => s + a.length, 0);
  return <div className="space-y-4">
      <p className="text-sm text-gray-500">Please review your details before submitting.</p>
      {[{
      label: 'Name',
      value: data.fullName || '—'
    }, {
      label: 'Email',
      value: data.email || '—'
    }, {
      label: 'Country',
      value: data.country || '—'
    }, {
      label: 'Skills',
      value: skills || 'None selected'
    }, {
      label: 'Programmes',
      value: progs || 'None selected'
    }, {
      label: 'Hours/week',
      value: data.hoursPerWeek ? `${data.hoursPerWeek} hrs` : '—'
    }, {
      label: 'Availability',
      value: totalSlots > 0 ? `${totalSlots} time slots selected` : 'Not set'
    }, {
      label: 'Session Mode',
      value: SESSION_MODES.find(m => m.id === data.sessionMode)?.label || '—'
    }, {
      label: 'Age Groups',
      value: ages || 'None selected'
    }].map(row => <div key={row.label} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
          <span className="text-xs font-semibold text-gray-400 w-28 shrink-0 pt-0.5">{row.label}</span>
          <span className="text-sm text-gray-800 font-medium">{row.value}</span>
        </div>)}
    </div>;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface VolunteerSignupFlowProps {
  onComplete: (data: VolunteerFormData) => void;
  onBack: () => void;
}
const STEP_TITLES = [{
  title: 'Basic Information',
  subtitle: 'Tell us who you are.'
}, {
  title: 'Your Motivation',
  subtitle: 'What drives you to make a difference?'
}, {
  title: 'Programme Selection',
  subtitle: 'Where can you contribute most?'
}, {
  title: 'Weekly Commitment',
  subtitle: 'How much time can you give?'
}, {
  title: 'Availability',
  subtitle: 'When are you free to teach?'
}, {
  title: 'Preferences',
  subtitle: 'How do you like to work?'
}, {
  title: 'Training & Preparation',
  subtitle: 'We\'ll set you up for success.'
}, {
  title: 'Review & Submit',
  subtitle: 'Everything look good?'
}] as any[];
const defaultData: VolunteerFormData = {
  fullName: '',
  email: '',
  organisation: '',
  country: '',
  timezone: '',
  motivation: '',
  skills: [],
  programmes: [],
  hoursPerWeek: 2,
  availability: {},
  sessionMode: 'virtual',
  ageGroups: [],
  trainingAck: false
};
export const VolunteerSignupFlow = ({
  onComplete,
  onBack
}: VolunteerSignupFlowProps) => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<VolunteerFormData>(defaultData);
  const [error, setError] = useState('');
  const update = (key: keyof VolunteerFormData, val: unknown) => {
    setData(prev => ({
      ...prev,
      [key]: val
    }));
    setError('');
  };
  const validate = () => {
    if (step === 1) {
      if (!data.fullName.trim()) return 'Please enter your full name.';
      if (!data.email.trim()) return 'Please enter your email.';
      if (!data.country) return 'Please select your country.';
    }
    if (step === 3 && data.programmes.length === 0) return 'Please select at least one programme.';
    if (step === 7 && !data.trainingAck) return 'Please acknowledge the training information to continue.';
    return '';
  };
  const next = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    if (step < TOTAL_STEPS) {
      setDir(1);
      setStep(s => s + 1);
    } else {
      onComplete(data);
    }
  };
  const back = () => {
    if (step === 1) {
      onBack();
      return;
    }
    setDir(-1);
    setStep(s => s - 1);
    setError('');
  };
  const pct = Math.round(step / TOTAL_STEPS * 100);
  const info = STEP_TITLES[step - 1];
  return <div className="flex flex-col h-full">
      {/* Progress */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#0B6B3A]">
            <span>Step </span><span>{step}</span><span> of </span><span>{TOTAL_STEPS}</span>
          </span>
          <span className="text-xs text-gray-400">{pct}% complete</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-[#0B6B3A] to-[#22a860] rounded-full" initial={false} animate={{
          width: `${pct}%`
        }} transition={{
          duration: 0.4,
          ease: 'easeOut'
        }} />
        </div>
        <div className="mt-3">
          <h2 className="text-lg font-black text-gray-900">{info.title}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{info.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit">
            {step === 1 && <StepBasicInfo data={data} onChange={update} />}
            {step === 2 && <StepMotivation data={data} onChange={update} />}
            {step === 3 && <StepVolProgrammes data={data} onChange={update} />}
            {step === 4 && <StepCommitment data={data} onChange={update} />}
            {step === 5 && <StepAvailability data={data} onChange={update} />}
            {step === 6 && <StepVolPreferences data={data} onChange={update} />}
            {step === 7 && <StepTrainingAck data={data} onChange={update} />}
            {step === 8 && <StepVolReview data={data} />}
          </motion.div>
        </AnimatePresence>
        {error && <motion.div initial={{
        opacity: 0,
        y: 4
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mt-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-red-50 border border-red-100">
            <AlertCircle size={15} className="text-red-400 shrink-0" />
            <span className="text-sm text-red-600">{error}</span>
          </motion.div>}
      </div>

      {/* Footer Nav */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-3">
        <button type="button" onClick={back} className="px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-semibold hover:border-gray-300 transition-all">
          Back
        </button>
        <button type="button" onClick={next} className="flex-1 py-3 rounded-xl bg-[#0B6B3A] text-white text-sm font-bold hover:bg-[#095e32] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
          <span>{step === TOTAL_STEPS ? 'Complete Registration' : 'Continue'}</span>
          {step === TOTAL_STEPS && <FileText size={15} />}
        </button>
      </div>
    </div>;
};
