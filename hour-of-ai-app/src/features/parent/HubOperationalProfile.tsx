import { useState } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle, Clock, Monitor, Save, Wifi, Zap } from 'lucide-react';

export type HubOperationalData = {
  internet: string;
  computers: number;
  power: string;
  learnerCapacity: number;
  ageGroups: string[];
  operatingDays: string[];
  timeSlots: string[];
  timezone: string;
  supportNeeds: string[];
};

const STORAGE_KEY = 'hour-of-ai-hub-operational-profile';
const DEFAULT_PROFILE: HubOperationalData = {
  internet: 'Stable broadband',
  computers: 12,
  power: 'Solar + grid',
  learnerCapacity: 40,
  ageGroups: ['8-10', '11-14'],
  operatingDays: ['Saturday'],
  timeSlots: ['Morning'],
  timezone: 'GMT (UTC+0)',
  supportNeeds: ['Volunteer matching']
};

const loadProfile = () => {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } as HubOperationalData : DEFAULT_PROFILE;
};

export const useHubOperationalProfile = () => {
  const [profile, setProfile] = useState<HubOperationalData>(loadProfile);
  const saveProfile = (next: HubOperationalData) => {
    setProfile(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };
  return { profile, saveProfile };
};

const ToggleGroup = ({
  values,
  selected,
  onChange
}: {
  values: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) => <div className="flex flex-wrap gap-2">
    {values.map(value => <button key={value} type="button" onClick={() => onChange(
      selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]
    )} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
      selected.includes(value)
        ? 'border-[#0B6B3A] bg-[#e6f4ed] text-[#0B6B3A]'
        : 'border-[#d1e8db] bg-white text-gray-600'
    }`}>{value}</button>)}
  </div>;

export const HubOperationalProfileEditor = () => {
  const { profile, saveProfile } = useHubOperationalProfile();
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const update = <K extends keyof HubOperationalData>(key: K, value: HubOperationalData[K]) =>
    setDraft(current => ({ ...current, [key]: value }));

  return <div className="rounded-2xl border border-[#d1e8db] bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-gray-900">Hub Operations</h3>
          <p className="mt-1 text-sm text-gray-500">Keep facilities, capacity and availability current for programme readiness checks.</p>
        </div>
        {!editing && <button onClick={() => {
          setDraft(profile);
          setEditing(true);
        }} className="rounded-xl border border-[#d1e8db] px-4 py-2 text-sm font-bold text-[#0B6B3A] hover:bg-[#e6f4ed]">Edit operations</button>}
      </div>

      {saved && <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#e6f4ed] p-3 text-xs font-bold text-[#0B6B3A]">
          <CheckCircle size={14} /> Operational profile updated
        </div>}

      {!editing ? <div className="mt-5 space-y-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Internet', value: profile.internet, icon: Wifi },
              { label: 'Computers', value: `${profile.computers} available`, icon: Monitor },
              { label: 'Power', value: profile.power, icon: Zap }
            ].map(item => {
              const Icon = item.icon;
              return <div key={item.label} className="rounded-xl border border-[#e6f4ed] bg-[#f7fbf9] p-4">
                  <Icon size={16} className="text-[#0B6B3A]" />
                  <p className="mt-2 text-[10px] font-medium text-gray-400">{item.label}</p>
                  <p className="text-sm font-bold text-gray-800">{item.value}</p>
                </div>;
            })}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Summary label="Learner capacity" value={`${profile.learnerCapacity} learners`} />
            <Summary label="Age groups" value={profile.ageGroups.join(', ')} />
            <Summary label="Operating days" value={profile.operatingDays.join(', ')} />
            <Summary label="Time slots" value={profile.timeSlots.join(', ')} />
            <Summary label="Timezone" value={profile.timezone} />
            <Summary label="Support needs" value={profile.supportNeeds.join(', ') || 'None'} />
          </div>
        </div> : <div className="mt-5 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Internet">
              <select value={draft.internet} onChange={event => update('internet', event.target.value)} className="w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                <option>Stable broadband</option>
                <option>Mobile data</option>
                <option>Intermittent access</option>
                <option>No reliable internet</option>
              </select>
            </Field>
            <Field label="Available computers">
              <input type="number" min={0} value={draft.computers} onChange={event => update('computers', Number(event.target.value))} className="w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]" />
            </Field>
            <Field label="Power supply">
              <select value={draft.power} onChange={event => update('power', event.target.value)} className="w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                <option>Solar + grid</option>
                <option>Reliable grid</option>
                <option>Generator backup</option>
                <option>Intermittent power</option>
              </select>
            </Field>
            <Field label="Learner capacity">
              <input type="number" min={1} value={draft.learnerCapacity} onChange={event => update('learnerCapacity', Number(event.target.value))} className="w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]" />
            </Field>
            <Field label="Timezone">
              <select value={draft.timezone} onChange={event => update('timezone', event.target.value)} className="w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                <option>GMT (UTC+0)</option>
                <option>WAT (UTC+1)</option>
                <option>CAT (UTC+2)</option>
                <option>EAT (UTC+3)</option>
              </select>
            </Field>
          </div>
          <Field label="Age groups"><ToggleGroup values={['6-7', '8-10', '11-14', '15-18']} selected={draft.ageGroups} onChange={value => update('ageGroups', value)} /></Field>
          <Field label="Operating days"><ToggleGroup values={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} selected={draft.operatingDays} onChange={value => update('operatingDays', value)} /></Field>
          <Field label="Time slots"><ToggleGroup values={['Morning', 'Afternoon', 'Evening']} selected={draft.timeSlots} onChange={value => update('timeSlots', value)} /></Field>
          <Field label="Support needs"><ToggleGroup values={['Devices', 'Internet support', 'Power support', 'Volunteer matching', 'Learning materials']} selected={draft.supportNeeds} onChange={value => update('supportNeeds', value)} /></Field>
          <div className="flex gap-3 border-t border-[#f0f4f2] pt-5">
            <button onClick={() => {
              saveProfile(draft);
              setEditing(false);
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }} className="inline-flex items-center gap-2 rounded-xl bg-[#0B6B3A] px-5 py-2.5 text-sm font-bold text-white"><Save size={14} /> Save operations</button>
            <button onClick={() => {
              setDraft(profile);
              setEditing(false);
            }} className="rounded-xl border border-[#d1e8db] px-5 py-2.5 text-sm font-semibold text-gray-600">Cancel</button>
          </div>
        </div>}
    </div>;
};

export const HubReadinessSummary = () => {
  const { profile } = useHubOperationalProfile();
  const items = [
    { label: `${profile.computers} computers available`, ready: profile.computers > 0 },
    { label: profile.internet, ready: profile.internet !== 'No reliable internet' },
    { label: profile.power, ready: profile.power !== 'Intermittent power' },
    { label: `${profile.learnerCapacity}-learner hub capacity`, ready: profile.learnerCapacity > 0 },
    { label: `${profile.operatingDays.join(', ')} · ${profile.timeSlots.join(', ')}`, ready: profile.operatingDays.length > 0 && profile.timeSlots.length > 0 }
  ];
  return <div className="rounded-xl border border-[#d1e8db] bg-[#f7fbf9] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-gray-900">Saved hub readiness</p>
        <span className="text-[10px] font-bold text-gray-500">From Hub Profile</span>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map(item => <div key={item.label} className="flex items-center gap-2 text-xs text-gray-700">
            {item.ready ? <CheckCircle size={14} className="text-[#0B6B3A]" /> : <Clock size={14} className="text-amber-500" />}
            {item.label}
          </div>)}
      </div>
    </div>;
};

const Summary = ({ label, value }: { label: string; value: string }) => <div>
    <p className="text-xs font-semibold text-gray-500">{label}</p>
    <p className="mt-1 rounded-xl border border-[#e6f4ed] bg-[#f7fbf9] px-3 py-2.5 text-sm font-bold text-gray-800">{value}</p>
  </div>;

const Field = ({ label, children }: { label: string; children: ReactNode }) => <label className="block text-xs font-semibold text-gray-600">
    {label}
    <div className="mt-1.5">{children}</div>
  </label>;
