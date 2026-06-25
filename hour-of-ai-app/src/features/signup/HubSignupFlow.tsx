import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, User, Mail, Phone, Globe, MapPin, Users, Zap, Calculator, Languages, Laptop, Wifi, Monitor, Zap as PowerIcon, FileText, CheckCircle, Calendar, Clock, ChevronDown, AlertCircle } from 'lucide-react';

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface HubFormData {
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  hubType: string;
  learnerCount: string;
  ageGroups: string[];
  programmes: string[];
  hasInternet: string;
  hasComputers: string;
  hasPower: string;
  preferredDays: string[];
  preferredTimeSlots: string[];
  timezone: string;
  supportNeeds: string[];
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TOTAL_STEPS = 7;
const COUNTRIES = ['Nigeria', 'Kenya', 'Ghana', 'Uganda', 'South Africa', 'United Kingdom', 'United States', 'Canada', 'India', 'Brazil', 'Australia', 'France', 'Germany', 'Tanzania', 'Ethiopia', 'Rwanda', 'Zimbabwe', 'Other'];
const TIMEZONES = ['GMT (UTC+0)', 'WAT (UTC+1)', 'CAT (UTC+2)', 'EAT (UTC+3)', 'IST (UTC+5:30)', 'BST (UTC+1)', 'EST (UTC-5)', 'CST (UTC-6)', 'PST (UTC-8)', 'AEST (UTC+10)'];
const HUB_TYPES = [{
  id: 'school',
  label: 'School',
  icon: Building2
}, {
  id: 'community',
  label: 'Community Centre',
  icon: Users
}, {
  id: 'ngo',
  label: 'NGO Hub',
  icon: Globe
}] as any[];
const LEARNER_COUNTS = ['1–10', '11–25', '26–50', '51–100', '100+'];
const AGE_GROUPS = [{
  id: '5_8',
  label: '5–8 yrs'
}, {
  id: '9_12',
  label: '9–12 yrs'
}, {
  id: '13_15',
  label: '13–15 yrs'
}, {
  id: '16_18',
  label: '16–18 yrs'
}] as any[];
const PROGRAMME_OPTIONS = [{
  id: 'hour_of_ai',
  label: 'Hour of AI',
  icon: Zap
}, {
  id: 'maths',
  label: 'Maths Literacy',
  icon: Calculator
}, {
  id: 'english',
  label: 'English Support',
  icon: Languages
}, {
  id: 'digital',
  label: 'Digital Skills',
  icon: Laptop
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
const SUPPORT_OPTIONS = [{
  id: 'volunteers',
  label: 'Need volunteers assigned',
  icon: Users
}, {
  id: 'training',
  label: 'Need training support',
  icon: FileText
}, {
  id: 'curriculum',
  label: 'Need curriculum guidance',
  icon: Zap
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
const YesNoToggle = ({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl">
    <span className="text-sm font-semibold text-gray-800">{label}</span>
    <div className="flex gap-2">
      <button type="button" onClick={() => onChange('yes')} className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${value === 'yes' ? 'bg-[#0B6B3A] border-[#0B6B3A] text-white' : 'border-gray-200 text-gray-500 hover:border-[#0B6B3A]'}`}>
        Yes
      </button>
      <button type="button" onClick={() => onChange('no')} className={`px-4 py-1.5 rounded-lg text-sm font-bold border-2 transition-all cursor-pointer ${value === 'no' ? 'bg-red-500 border-red-500 text-white' : 'border-gray-200 text-gray-500 hover:border-red-300'}`}>
        No
      </button>
    </div>
  </div>;

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────

const StepHubInfo = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
}) => <div className="space-y-5">
    <div>
      <FormLabel required>Organisation Name</FormLabel>
      <FormInput icon={Building2} placeholder="Your school or centre name" value={data.orgName} onChange={v => onChange('orgName', v)} />
    </div>
    <div>
      <FormLabel required>Contact Person</FormLabel>
      <FormInput icon={User} placeholder="Full name" value={data.contactName} onChange={v => onChange('contactName', v)} />
    </div>
    <div>
      <FormLabel required>Email Address</FormLabel>
      <FormInput icon={Mail} type="email" placeholder="contact@organisation.org" value={data.email} onChange={v => onChange('email', v)} />
    </div>
    <div>
      <FormLabel>Phone Number</FormLabel>
      <FormInput icon={Phone} type="tel" placeholder="+1 234 567 8900" value={data.phone} onChange={v => onChange('phone', v)} />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <FormLabel required>Country</FormLabel>
        <FormSelect placeholder="Country" value={data.country} onChange={v => onChange('country', v)} options={COUNTRIES} />
      </div>
      <div>
        <FormLabel required>City</FormLabel>
        <FormInput icon={MapPin} placeholder="City" value={data.city} onChange={v => onChange('city', v)} />
      </div>
    </div>
  </div>;
const StepHubDetails = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
}) => {
  const toggleAge = (id: string) => {
    const updated = data.ageGroups.includes(id) ? data.ageGroups.filter(a => a !== id) : [...data.ageGroups, id];
    onChange('ageGroups', updated);
  };
  return <div className="space-y-6">
      <div>
        <FormLabel>Hub Type</FormLabel>
        <div className="grid grid-cols-3 gap-3 mt-1">
          {HUB_TYPES.map(ht => <button key={ht.id} type="button" onClick={() => onChange('hubType', ht.id)} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${data.hubType === ht.id ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <ht.icon size={20} className={data.hubType === ht.id ? 'text-[#0B6B3A]' : 'text-gray-400'} />
              <span className="text-xs font-bold text-gray-900 text-center leading-tight">{ht.label}</span>
            </button>)}
        </div>
      </div>
      <div>
        <FormLabel>Number of Learners</FormLabel>
        <div className="flex flex-wrap gap-2 mt-1">
          {LEARNER_COUNTS.map(c => <ToggleChip key={c} selected={data.learnerCount === c} onClick={() => onChange('learnerCount', c)}>
              {c}
            </ToggleChip>)}
        </div>
      </div>
      <div>
        <FormLabel>Age Groups</FormLabel>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {AGE_GROUPS.map(ag => <button key={ag.id} type="button" onClick={() => toggleAge(ag.id)} className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${data.ageGroups.includes(ag.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
              <span className="text-sm font-semibold text-gray-900">{ag.label}</span>
              {data.ageGroups.includes(ag.id) && <CheckCircle size={16} className="text-[#0B6B3A] shrink-0" />}
            </button>)}
        </div>
      </div>
    </div>;
};
const StepHubProgrammes = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
}) => {
  const toggle = (id: string) => {
    const updated = data.programmes.includes(id) ? data.programmes.filter(p => p !== id) : [...data.programmes, id];
    onChange('programmes', updated);
  };
  return <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">Which programmes will you run at your hub?</p>
      {PROGRAMME_OPTIONS.map(prog => <button key={prog.id} type="button" onClick={() => toggle(prog.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left cursor-pointer ${data.programmes.includes(prog.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
          <div className="w-10 h-10 rounded-xl bg-[#e6f4ed] flex items-center justify-center shrink-0">
            <prog.icon size={18} className="text-[#0B6B3A]" />
          </div>
          <span className="font-semibold text-gray-900 text-sm">{prog.label}</span>
          {data.programmes.includes(prog.id) && <CheckCircle size={18} className="text-[#0B6B3A] ml-auto shrink-0" />}
        </button>)}
    </div>;
};
const StepInfrastructure = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
}) => <div className="space-y-4">
    <p className="text-sm text-gray-500 mb-2">This helps us tailor the programme to your facilities.</p>
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-2">
        <Wifi size={18} className="text-[#0B6B3A]" />
        <span className="text-sm font-bold text-gray-700">Internet Access</span>
      </div>
      <YesNoToggle label="Do you have reliable internet access?" value={data.hasInternet} onChange={v => onChange('hasInternet', v)} />
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-2">
        <Monitor size={18} className="text-[#0B6B3A]" />
        <span className="text-sm font-bold text-gray-700">Computers / Devices</span>
      </div>
      <YesNoToggle label="Do you have computers or shared devices?" value={data.hasComputers} onChange={v => onChange('hasComputers', v)} />
    </div>
    <div className="space-y-3">
      <div className="flex items-center gap-3 mb-2">
        <PowerIcon size={18} className="text-[#0B6B3A]" />
        <span className="text-sm font-bold text-gray-700">Power Supply</span>
      </div>
      <YesNoToggle label="Do you have consistent power supply?" value={data.hasPower} onChange={v => onChange('hasPower', v)} />
    </div>
    {(data.hasInternet === 'no' || data.hasComputers === 'no') && <motion.div initial={{
    opacity: 0,
    y: 6
  }} animate={{
    opacity: 1,
    y: 0
  }} className="mt-2 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-xs text-amber-700 font-medium leading-relaxed">
          No problem — our team can help identify offline-friendly resources and mobile data options for your hub.
        </p>
      </motion.div>}
  </div>;
const StepSessionPref = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
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
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                <Clock size={13} className="text-[#0B6B3A]" />
                <span>{slot.label}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5 ml-5">{slot.sublabel}</p>
            </button>)}
        </div>
      </div>
      <div>
        <FormLabel>Time Zone</FormLabel>
        <FormSelect placeholder="Select time zone" value={data.timezone} onChange={v => onChange('timezone', v)} options={TIMEZONES} />
      </div>
    </div>;
};
const StepSupportNeeds = ({
  data,
  onChange
}: {
  data: HubFormData;
  onChange: (k: keyof HubFormData, v: unknown) => void;
}) => {
  const toggleSupport = (id: string) => {
    const updated = data.supportNeeds.includes(id) ? data.supportNeeds.filter(s => s !== id) : [...data.supportNeeds, id];
    onChange('supportNeeds', updated);
  };
  return <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">Let us know how we can best support your hub.</p>
      {SUPPORT_OPTIONS.map(opt => <div key={opt.id} onClick={() => toggleSupport(opt.id)} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${data.supportNeeds.includes(opt.id) ? 'border-[#0B6B3A] bg-[#f0f9f4] shadow-sm' : 'border-gray-200 bg-white hover:border-[#0B6B3A]/50'}`}>
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${data.supportNeeds.includes(opt.id) ? 'bg-[#0B6B3A] border-[#0B6B3A]' : 'border-gray-300'}`}>
            {data.supportNeeds.includes(opt.id) && <CheckCircle size={12} className="text-white fill-white" />}
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#e6f4ed] flex items-center justify-center shrink-0">
            <opt.icon size={17} className="text-[#0B6B3A]" />
          </div>
          <span className="text-sm font-semibold text-gray-900">{opt.label}</span>
        </div>)}
    </div>;
};
const StepHubReview = ({
  data
}: {
  data: HubFormData;
}) => {
  const progs = PROGRAMME_OPTIONS.filter(p => data.programmes.includes(p.id)).map(p => p.label).join(', ');
  const days = DAYS.filter(d => data.preferredDays.includes(d.id)).map(d => d.label).join(', ');
  const ages = AGE_GROUPS.filter(a => data.ageGroups.includes(a.id)).map(a => a.label).join(', ');
  const support = SUPPORT_OPTIONS.filter(s => data.supportNeeds.includes(s.id)).map(s => s.label).join(', ');
  return <div className="space-y-4">
      <p className="text-sm text-gray-500">Please review before submitting your hub registration.</p>
      {[{
      label: 'Organisation',
      value: data.orgName || '—'
    }, {
      label: 'Contact',
      value: data.contactName || '—'
    }, {
      label: 'Email',
      value: data.email || '—'
    }, {
      label: 'Location',
      value: data.city && data.country ? `${data.city}, ${data.country}` : data.country || '—'
    }, {
      label: 'Hub Type',
      value: HUB_TYPES.find(h => h.id === data.hubType)?.label || '—'
    }, {
      label: 'Learners',
      value: data.learnerCount || '—'
    }, {
      label: 'Age Groups',
      value: ages || 'None selected'
    }, {
      label: 'Programmes',
      value: progs || 'None selected'
    }, {
      label: 'Infrastructure',
      value: `Internet: ${data.hasInternet || '—'} · Computers: ${data.hasComputers || '—'} · Power: ${data.hasPower || '—'}`
    }, {
      label: 'Preferred Days',
      value: days || 'None selected'
    }, {
      label: 'Support Needs',
      value: support || 'None selected'
    }].map(row => <div key={row.label} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
          <span className="text-xs font-semibold text-gray-400 w-28 shrink-0 pt-0.5">{row.label}</span>
          <span className="text-sm text-gray-800 font-medium">{row.value}</span>
        </div>)}
    </div>;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface HubSignupFlowProps {
  onComplete: (data: HubFormData) => void;
  onBack: () => void;
}
const STEP_TITLES = [{
  title: 'Hub Information',
  subtitle: 'Tell us about your organisation.'
}, {
  title: 'Hub Details',
  subtitle: 'How many learners do you serve?'
}, {
  title: 'Programme Selection',
  subtitle: 'What will you teach?'
}, {
  title: 'Infrastructure',
  subtitle: 'What do you have access to?'
}, {
  title: 'Session Preferences',
  subtitle: 'When do your sessions run?'
}, {
  title: 'Support Needs',
  subtitle: 'How can we help you succeed?'
}, {
  title: 'Review & Submit',
  subtitle: 'Everything look good?'
}] as any[];
const defaultData: HubFormData = {
  orgName: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  hubType: '',
  learnerCount: '',
  ageGroups: [],
  programmes: [],
  hasInternet: '',
  hasComputers: '',
  hasPower: '',
  preferredDays: [],
  preferredTimeSlots: [],
  timezone: '',
  supportNeeds: []
};
export const HubSignupFlow = ({
  onComplete,
  onBack
}: HubSignupFlowProps) => {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<HubFormData>(defaultData);
  const [error, setError] = useState('');
  const update = (key: keyof HubFormData, val: unknown) => {
    setData(prev => ({
      ...prev,
      [key]: val
    }));
    setError('');
  };
  const validate = () => {
    if (step === 1) {
      if (!data.orgName.trim()) return 'Please enter your organisation name.';
      if (!data.contactName.trim()) return 'Please enter a contact name.';
      if (!data.email.trim()) return 'Please enter an email address.';
      if (!data.country) return 'Please select your country.';
    }
    if (step === 3 && data.programmes.length === 0) return 'Please select at least one programme.';
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
            {step === 1 && <StepHubInfo data={data} onChange={update} />}
            {step === 2 && <StepHubDetails data={data} onChange={update} />}
            {step === 3 && <StepHubProgrammes data={data} onChange={update} />}
            {step === 4 && <StepInfrastructure data={data} onChange={update} />}
            {step === 5 && <StepSessionPref data={data} onChange={update} />}
            {step === 6 && <StepSupportNeeds data={data} onChange={update} />}
            {step === 7 && <StepHubReview data={data} />}
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
          <span>{step === TOTAL_STEPS ? 'Register Hub' : 'Continue'}</span>
          {step === TOTAL_STEPS && <Calendar size={15} />}
        </button>
      </div>
    </div>;
};
