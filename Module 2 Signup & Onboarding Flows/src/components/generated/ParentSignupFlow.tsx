import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, Globe, MessageCircle, Plus, Minus, Zap, Calculator, Languages, Laptop, Clock, MapPin, Heart, FileText, CheckCircle, ChevronDown, AlertCircle } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface ChildInfo {
  id: string;
  name: string;
  age: string;
  gender: string;
  school: string;
}
export interface ParentFormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  commMethod: string;
  children: ChildInfo[];
  programmes: string[];
  preferredDays: string[];
  preferredTimeSlots: string[];
  timezone: string;
  sessionType: string;
  sponsorChildren: boolean;
  sponsorCount: number;
  wantReports: boolean;
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 6;
const COUNTRIES = ['Nigeria', 'Kenya', 'Ghana', 'Uganda', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'India', 'Brazil', 'Australia', 'France', 'Germany', 'Tanzania', 'Ethiopia', 'Rwanda', 'Zimbabwe', 'Other'];
const COMM_METHODS = [{
  id: 'email',
  label: 'Email'
}, {
  id: 'whatsapp',
  label: 'WhatsApp'
}, {
  id: 'sms',
  label: 'SMS'
}, {
  id: 'phone',
  label: 'Phone Call'
}] as any[];
const GENDER_OPTIONS = [{
  id: 'male',
  label: 'Male'
}, {
  id: 'female',
  label: 'Female'
}, {
  id: 'prefer_not',
  label: 'Prefer not to say'
}] as any[];
const PROGRAMME_OPTIONS = [{
  id: 'hour_of_ai',
  label: 'Hour of AI',
  icon: Zap,
  color: 'text-[#0B6B3A]',
  bg: 'bg-[#e6f4ed]'
}, {
  id: 'maths',
  label: 'Maths Literacy',
  icon: Calculator,
  color: 'text-[#0B6B3A]',
  bg: 'bg-[#eaf6f0]'
}, {
  id: 'english',
  label: 'English Support',
  icon: Languages,
  color: 'text-[#0B6B3A]',
  bg: 'bg-[#e8f5ed]'
}, {
  id: 'digital',
  label: 'Digital Skills',
  icon: Laptop,
  color: 'text-[#0B6B3A]',
  bg: 'bg-[#e4f2ea]'
}] as any[];
const DAYS = [{
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
const TIME_SLOTS = [{
  id: 'morning',
  label: 'Morning',
  sublabel: '7–11 AM'
}, {
  id: 'midday',
  label: 'Midday',
  sublabel: '11 AM–2 PM'
}, {
  id: 'afternoon',
  label: 'Afternoon',
  sublabel: '2–5 PM'
}, {
  id: 'evening',
  label: 'Evening',
  sublabel: '5–9 PM'
}] as any[];
const TIMEZONES = ['GMT (UTC+0)', 'WAT (UTC+1)', 'CAT (UTC+2)', 'EAT (UTC+3)', 'IST (UTC+5:30)', 'BST (UTC+1)', 'EST (UTC-5)', 'CST (UTC-6)', 'PST (UTC-8)', 'AEST (UTC+10)'];
const SESSION_TYPES = [{
  id: 'virtual',
  label: 'Virtual',
  desc: 'Online from home'
}, {
  id: 'hub',
  label: 'Hub-based',
  desc: 'At a community centre'
}, {
  id: 'both',
  label: 'Both',
  desc: 'Flexible'
}] as any[];
const SPONSOR_COUNTS = [1, 2, 3, 5, 10];

// ─── SHARED UI ATOMS ─────────────────────────────────────────────────────────

const slideVariants = {
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

const StepParentDetails = ({
  data,
  onChange
}: {
  data: ParentFormData;
  onChange: (k: keyof ParentFormData, v: unknown) => void;
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
      <FormLabel>Phone Number</FormLabel>
      <FormInput icon={Phone} type="tel" placeholder="+1 234 567 8900" value={data.phone} onChange={v => onChange('phone', v)} />
    </div>
    <div>
      <FormLabel required>Country</FormLabel>
      <FormSelect placeholder="Select your country" value={data.country} onChange={v => onChange('country', v)} options={COUNTRIES} />
    </div>
    <div>
      <FormLabel>Preferred Communication</FormLabel>
      <div className="flex flex-wrap gap-2 mt-1">
        {COMM_METHODS.map(m => <ToggleChip key={m.id} selected={data.commMethod === m.id} onClick={() => onChange('commMethod', m.id)}>
            {m.label}
          </ToggleChip>)}
      </div>
    </div>
  </div>;
const StepChildInfo = ({
  data,
  onChange
}: {
  data: ParentFormData;
  onChange: (k: keyof ParentFormData, v: unknown) => void;
}) => {
  const updateChild = (id: string, field: keyof ChildInfo, value: string) => {
    const updated = data.children.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c);
    onChange('children', updated);
  };
  const addChild = () => {
    const newChild: ChildInfo = {
      id: `child_${Date.now()}`,
      name: '',
      age: '',
      gender: '',
      school: ''
    };
    onChange('children', [...data.children, newChild]);
  };
  const removeChild = (id: string) => {
    if (data.children.length <= 1) return;
    onChange('children', data.children.filter(c => c.id !== id));
  };
  return <div className="space-y-6">
      {data.children.map((child, idx) => <div key={child.id} className="bg-[#f8fdf9] border border-[#d1e8db] rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#0B6B3A]">
              <span>Child </span><span>{idx + 1}</span>
            </span>
            {data.children.length > 1 && <button type="button" onClick={() => removeChild(child.id)} className="w-7 h-7 rounded-full bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors">
                <Minus size={14} />
              </button>}
          </div>
          <FormInput placeholder="Child's name" value={child.name} onChange={v => updateChild(child.id, 'name', v)} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormSelect placeholder="Age" value={child.age} onChange={v => updateChild(child.id, 'age', v)} options={Array.from({
            length: 13
          }, (_, i) => String(i + 5))} />
            </div>
            <div>
              <FormSelect placeholder="Gender (optional)" value={child.gender} onChange={v => updateChild(child.id, 'gender', v)} options={GENDER_OPTIONS.map(g => g.label)} />
            </div>
          </div>
          <FormInput placeholder="School name (optional)" value={child.school} onChange={v => updateChild(child.id, 'school', v)} />
        </div>)}
      <button type="button" onClick={addChild} className="w-full py-3 rounded-xl border-2 border-dashed border-[#0B6B3A]/30 text-[#0B6B3A] text-sm font-semibold hover:border-[#0B6B3A] hover:bg-[#f0f9f4] transition-all flex items-center justify-center gap-2">
        <Plus size={16} />
        <span>Add Another Child</span>
      </button>
    </div>;
};
const StepProgrammeSelection = ({
  data,
  onChange
}: {
  data: ParentFormData;
  onChange: (k: keyof ParentFormData, v: unknown) => void;
}) => {
  const toggle = (id: string) => {
    const updated = data.programmes.includes(id) ? data.programmes.filter(p => p !== id) : [...data.programmes, id];
    onChange('programmes', updated);
  };
  return <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">Select all that apply — you can change this later.</p>
      {PROGRAMME_OPTIONS.map(prog => <button key={prog.id} type="button" onClick={() => toggle(prog.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${data.programmes.includes(prog.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
          <div className={`w-11 h-11 rounded-xl ${prog.bg} flex items-center justify-center shrink-0`}>
            <prog.icon size={20} className={prog.color} />
          </div>
          <span className="font-semibold text-gray-900 text-sm">{prog.label}</span>
          {data.programmes.includes(prog.id) && <CheckCircle size={18} className="text-[#0B6B3A] ml-auto shrink-0" />}
        </button>)}
    </div>;
};
const StepPreferences = ({
  data,
  onChange
}: {
  data: ParentFormData;
  onChange: (k: keyof ParentFormData, v: unknown) => void;
}) => {
  const toggleDay = (id: string) => {
    const updated = data.preferredDays.includes(id) ? data.preferredDays.filter(d => d !== id) : [...data.preferredDays, id];
    onChange('preferredDays', updated);
  };
  const toggleSlot = (id: string) => {
    const updated = data.preferredTimeSlots.includes(id) ? data.preferredTimeSlots.filter(s => s !== id) : [...data.preferredTimeSlots, id];
    onChange('preferredTimeSlots', updated);
  };
  return <div className="space-y-6">
      <div>
        <FormLabel>Preferred Days</FormLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {DAYS.map(d => <ToggleChip key={d.id} selected={data.preferredDays.includes(d.id)} onClick={() => toggleDay(d.id)}>
              {d.label}
            </ToggleChip>)}
        </div>
      </div>
      <div>
        <FormLabel>Preferred Time Slots</FormLabel>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {TIME_SLOTS.map(slot => <button key={slot.id} type="button" onClick={() => toggleSlot(slot.id)} className={`p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${data.preferredTimeSlots.includes(slot.id) ? 'border-[#0B6B3A] bg-[#f0f9f4]' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <p className="text-sm font-semibold text-gray-900">{slot.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{slot.sublabel}</p>
            </button>)}
        </div>
      </div>
      <div>
        <FormLabel>Time Zone</FormLabel>
        <FormSelect placeholder="Select time zone" value={data.timezone} onChange={v => onChange('timezone', v)} options={TIMEZONES} />
      </div>
      <div>
        <FormLabel>Session Type</FormLabel>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {SESSION_TYPES.map(st => <button key={st.id} type="button" onClick={() => onChange('sessionType', st.id)} className={`p-3 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${data.sessionType === st.id ? 'border-[#0B6B3A] bg-[#f0f9f4]' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <p className="text-xs font-bold text-gray-900">{st.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{st.desc}</p>
            </button>)}
        </div>
      </div>
    </div>;
};
const StepSponsorship = ({
  data,
  onChange
}: {
  data: ParentFormData;
  onChange: (k: keyof ParentFormData, v: unknown) => void;
}) => <div className="space-y-6">
    <div className="bg-gradient-to-br from-[#f0f9f4] to-[#e8f5ed] rounded-2xl p-5 border border-[#d1e8db]">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center shrink-0 mt-0.5">
          <Heart size={20} className="text-[#0B6B3A]" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm">Support a Child's Education</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Your contribution helps fund sessions for out-of-school children in underserved communities worldwide.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#d1e8db]">
        <span className="text-sm font-semibold text-gray-800">Sponsor out-of-school children?</span>
        <button type="button" onClick={() => onChange('sponsorChildren', !data.sponsorChildren)} className={`relative w-12 h-6 rounded-full transition-all duration-300 cursor-pointer ${data.sponsorChildren ? 'bg-[#0B6B3A]' : 'bg-gray-200'}`}>
          <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${data.sponsorChildren ? 'left-6' : 'left-0.5'}`} />
        </button>
      </div>
    </div>

    {data.sponsorChildren && <motion.div initial={{
    opacity: 0,
    y: 8
  }} animate={{
    opacity: 1,
    y: 0
  }} className="space-y-4">
        <div>
          <FormLabel>Number of children to sponsor</FormLabel>
          <div className="flex flex-wrap gap-2 mt-1">
            {SPONSOR_COUNTS.map(n => <ToggleChip key={n} selected={data.sponsorCount === n} onClick={() => onChange('sponsorCount', n)}>
                <span>{n}</span>
                <span>{n === 1 ? ' child' : ' children'}</span>
              </ToggleChip>)}
          </div>
        </div>
        <div className="bg-[#e6f4ed] rounded-xl p-4">
          <p className="text-sm font-bold text-[#0B6B3A]">
            <span>Sponsoring </span><span>{data.sponsorCount}</span>
            <span>{data.sponsorCount === 1 ? ' child' : ' children'}</span>
          </p>
          <p className="text-xs text-[#0B6B3A]/70 mt-1">Monthly contribution amount will be confirmed by our team.</p>
        </div>
        <div className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer" onClick={() => onChange('wantReports', !data.wantReports)}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${data.wantReports ? 'bg-[#0B6B3A] border-[#0B6B3A]' : 'border-gray-300'}`}>
            {data.wantReports && <CheckCircle size={12} className="text-white fill-white" />}
          </div>
          <p className="text-sm text-gray-700">I would like to receive progress reports on sponsored children</p>
        </div>
      </motion.div>}
  </div>;
const StepReview = ({
  data
}: {
  data: ParentFormData;
}) => {
  const prog = PROGRAMME_OPTIONS.filter(p => data.programmes.includes(p.id)).map(p => p.label).join(', ');
  const days = DAYS.filter(d => data.preferredDays.includes(d.id)).map(d => d.label).join(', ');
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
      label: 'Children',
      value: data.children.map(c => c.name || 'Unnamed').join(', ') || '—'
    }, {
      label: 'Programmes',
      value: prog || 'None selected'
    }, {
      label: 'Preferred Days',
      value: days || 'None selected'
    }, {
      label: 'Time Zone',
      value: data.timezone || '—'
    }, {
      label: 'Session Type',
      value: SESSION_TYPES.find(s => s.id === data.sessionType)?.label || '—'
    }, {
      label: 'Sponsoring',
      value: data.sponsorChildren ? `${data.sponsorCount} ${data.sponsorCount === 1 ? 'child' : 'children'}` : 'No'
    }].map(row => <div key={row.label} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
          <span className="text-xs font-semibold text-gray-400 w-28 shrink-0 pt-0.5">{row.label}</span>
          <span className="text-sm text-gray-800 font-medium">{row.value}</span>
        </div>)}
    </div>;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface ParentSignupFlowProps {
  onComplete: () => void;
  onBack: () => void;
}
const STEP_TITLES = [{
  title: 'Your Details',
  subtitle: "Tell us a little about yourself."
}, {
  title: 'Child Information',
  subtitle: "Who are we teaching?"
}, {
  title: 'Programme Selection',
  subtitle: "What would you like to learn?"
}, {
  title: 'Preferences',
  subtitle: "When works best for you?"
}, {
  title: 'Support a Child',
  subtitle: "Extend your impact globally."
}, {
  title: 'Review & Submit',
  subtitle: "Everything look good?"
}] as any[];
const defaultChild: ChildInfo = {
  id: 'child_1',
  name: '',
  age: '',
  gender: '',
  school: ''
};
const defaultData: ParentFormData = {
  fullName: '',
  email: '',
  phone: '',
  country: '',
  commMethod: 'email',
  children: [defaultChild],
  programmes: [],
  preferredDays: [],
  preferredTimeSlots: [],
  timezone: '',
  sessionType: 'virtual',
  sponsorChildren: false,
  sponsorCount: 1,
  wantReports: false
};
export const ParentSignupFlow = ({
  onComplete,
  onBack
}: ParentSignupFlowProps) => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<ParentFormData>(defaultData);
  const [error, setError] = useState('');
  const update = (key: keyof ParentFormData, val: unknown) => {
    setData(prev => ({
      ...prev,
      [key]: val
    }));
    setError('');
  };
  const validate = () => {
    if (step === 1) {
      if (!data.fullName.trim()) return 'Please enter your full name.';
      if (!data.email.trim()) return 'Please enter your email address.';
      if (!data.country) return 'Please select your country.';
    }
    if (step === 2) {
      if (data.children.some(c => !c.name.trim())) return "Please enter a name for each child.";
    }
    if (step === 3) {
      if (data.programmes.length === 0) return 'Please select at least one programme.';
    }
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
      onComplete();
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
            {step === 1 && <StepParentDetails data={data} onChange={update} />}
            {step === 2 && <StepChildInfo data={data} onChange={update} />}
            {step === 3 && <StepProgrammeSelection data={data} onChange={update} />}
            {step === 4 && <StepPreferences data={data} onChange={update} />}
            {step === 5 && <StepSponsorship data={data} onChange={update} />}
            {step === 6 && <StepReview data={data} />}
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