import { useState } from 'react';
import { CheckCircle, ChevronDown, Clock } from 'lucide-react';
import { HubReadinessSummary } from './HubOperationalProfile';

type UserMode = 'parent' | 'hub';
type LearnerStatus = 'Enrolled' | 'Pending' | 'Removal requested' | 'Waitlisted' | 'Eligible' | 'Not eligible';
type HubStatus = 'Active' | 'Approved' | 'Pending review' | 'Setup required' | 'Available';

const PROGRAMMES = [
  { id: 'p1', name: 'Hour of AI', ages: '8-14', delivery: 'Virtual / Hybrid', icon: 'AI', description: 'An interactive introduction to artificial intelligence for young learners.' },
  { id: 'p2', name: 'Basic Maths Literacy', ages: '10-16', delivery: 'Virtual', icon: '123', description: 'Practical numeracy sessions that build confidence with everyday maths.' },
  { id: 'p3', name: 'English Language Support', ages: '8-15', delivery: 'Virtual', icon: 'ABC', description: 'Volunteer-led reading, writing and communication support.' },
  { id: 'p4', name: 'Digital Skills for Kids', ages: '6-12', delivery: 'Virtual / Hub', icon: 'PC', description: 'Foundational digital literacy, internet safety and essential computer skills.' }
];

const LEARNERS = [
  { id: 'l1', name: 'Amara Hassan', age: 10 },
  { id: 'l2', name: 'Kofi Hassan', age: 8 },
  { id: 'l3', name: 'Nadia Hassan', age: 13 }
];

const statusStyle = (status: string) => {
  if (status === 'Enrolled' || status === 'Active' || status === 'Approved') return 'bg-[#e6f4ed] text-[#0B6B3A]';
  if (status === 'Eligible' || status === 'Available') return 'bg-blue-50 text-blue-700';
  if (status === 'Pending' || status === 'Removal requested' || status === 'Pending review' || status === 'Setup required') return 'bg-amber-50 text-amber-700';
  if (status === 'Waitlisted') return 'bg-purple-50 text-purple-700';
  return 'bg-gray-100 text-gray-500';
};

const Heading = ({ title, description }: { title: string; description: string }) => <div>
    <h2 className="text-2xl font-black text-gray-900">{title}</h2>
    <p className="mt-1 text-sm text-gray-500">{description}</p>
  </div>;

const ParentProgrammes = () => {
  const [statuses, setStatuses] = useState<Record<string, Record<string, LearnerStatus>>>({
    p1: { l1: 'Enrolled', l2: 'Eligible', l3: 'Not eligible' },
    p2: { l1: 'Eligible', l2: 'Not eligible', l3: 'Pending' },
    p3: { l1: 'Eligible', l2: 'Eligible', l3: 'Waitlisted' },
    p4: { l1: 'Eligible', l2: 'Enrolled', l3: 'Not eligible' }
  });
  const [expanded, setExpanded] = useState<string | null>('p1');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleLearner = (learnerId: string) => setSelected(current => {
    const next = new Set(current);
    next.has(learnerId) ? next.delete(learnerId) : next.add(learnerId);
    return next;
  });
  const requestEnrolment = (programmeId: string) => {
    setStatuses(current => ({
      ...current,
      [programmeId]: {
        ...current[programmeId],
        ...Object.fromEntries([...selected].map(learnerId => [learnerId, 'Pending']))
      }
    }));
    setSelected(new Set());
  };

  return <div className="space-y-6">
      <Heading title="Programmes" description="Manage programme enrolment separately for each learner." />
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        Eligibility and current enrolment would come from the backend. Select eligible learners to submit a new request.
      </div>
      <div className="space-y-4">
        {PROGRAMMES.map(programme => {
          const programmeStatuses = statuses[programme.id];
          const open = expanded === programme.id;
          const enrolled = Object.values(programmeStatuses).filter(status => status === 'Enrolled').length;
          return <div key={programme.id} className="overflow-hidden rounded-2xl border border-[#d1e8db] bg-white shadow-sm">
              <button onClick={() => {
                setExpanded(open ? null : programme.id);
                setSelected(new Set());
              }} className="flex w-full items-center gap-4 p-5 text-left hover:bg-[#f7fbf9]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4ed] text-xs font-black text-[#0B6B3A]">{programme.icon}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">{programme.name}</h3>
                  <p className="text-xs text-gray-500">Ages {programme.ages} · {programme.delivery}</p>
                </div>
                <span className="rounded-full bg-[#e6f4ed] px-2.5 py-1 text-[10px] font-bold text-[#0B6B3A]">{enrolled} enrolled</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <div className="border-t border-[#e6f4ed] p-5">
                  <p className="mb-4 text-sm text-gray-600">{programme.description}</p>
                  <div className="space-y-3">
                    {LEARNERS.map(learner => {
                      const status = programmeStatuses[learner.id];
                      const selectable = status === 'Eligible';
                      return <div key={learner.id} className={`flex items-center gap-3 rounded-xl border p-4 ${selectable ? 'border-[#d1e8db] hover:border-[#0B6B3A]' : 'border-gray-100 bg-gray-50'}`}>
                          <input type="checkbox" checked={selected.has(learner.id)} disabled={!selectable} onChange={() => toggleLearner(learner.id)} className="h-4 w-4 accent-[#0B6B3A]" />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">{learner.name}</p>
                            <p className="text-xs text-gray-500">Age {learner.age}</p>
                          </div>
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle(status)}`}>{status}</span>
                            {status === 'Enrolled' && <button type="button" onClick={() => setStatuses(current => ({
                              ...current,
                              [programme.id]: { ...current[programme.id], [learner.id]: 'Removal requested' }
                            }))} className="text-[10px] font-bold text-red-600 hover:underline">Request removal</button>}
                          </div>
                        </div>;
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">{selected.size ? `${selected.size} learner${selected.size > 1 ? 's' : ''} selected` : 'Select eligible learners to continue.'}</p>
                    <button disabled={!selected.size} onClick={() => requestEnrolment(programme.id)} className="rounded-xl bg-[#0B6B3A] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Request enrolment</button>
                  </div>
                </div>}
            </div>;
        })}
      </div>
    </div>;
};

const HubProgrammes = ({ hubName }: { hubName?: string }) => {
  const [statuses, setStatuses] = useState<Record<string, HubStatus>>({
    p1: 'Active',
    p2: 'Setup required',
    p3: 'Available',
    p4: 'Pending review'
  });
  const [expanded, setExpanded] = useState<string | null>('p1');

  return <div className="space-y-6">
      <Heading title="Hub Programmes" description={`Manage programmes at ${hubName ?? 'your hub'} and request new ones.`} />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['Active', 'Approved', 'Pending review', 'Setup required'] as HubStatus[]).map(status => <div key={status} className="rounded-xl border border-[#d1e8db] bg-white p-4">
            <p className="text-2xl font-black text-[#0B6B3A]">{Object.values(statuses).filter(item => item === status).length}</p>
            <p className="text-xs font-semibold text-gray-500">{status}</p>
          </div>)}
      </div>
      <div className="space-y-4">
        {PROGRAMMES.map(programme => {
          const status = statuses[programme.id];
          const open = expanded === programme.id;
          const incomplete = programme.id === 'p2';
          const readiness = [
            { label: 'Facilities confirmed', done: true },
            { label: 'Safeguarding review', done: true },
            { label: 'Volunteer matching', done: !incomplete },
            { label: 'Minimum learner group', done: !incomplete }
          ];
          return <div key={programme.id} className="overflow-hidden rounded-2xl border border-[#d1e8db] bg-white shadow-sm">
              <button onClick={() => setExpanded(open ? null : programme.id)} className="flex w-full items-center gap-4 p-5 text-left hover:bg-[#f7fbf9]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4ed] text-xs font-black text-[#0B6B3A]">{programme.icon}</span>
                <div className="flex-1">
                  <h3 className="font-black text-gray-900">{programme.name}</h3>
                  <p className="text-xs text-gray-500">Ages {programme.ages} · {programme.delivery}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle(status)}`}>{status}</span>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && <div className="border-t border-[#e6f4ed] p-5">
                  <p className="text-sm text-gray-600">{programme.description}</p>
                  <div className="mt-4">
                    <HubReadinessSummary />
                  </div>
                  {status !== 'Available' && <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {readiness.map(item => <div key={item.label} className="flex items-center gap-2 rounded-xl bg-[#f7fbf9] p-3 text-sm">
                          {item.done ? <CheckCircle size={15} className="text-[#0B6B3A]" /> : <Clock size={15} className="text-amber-500" />}
                          <span className={item.done ? 'text-gray-700' : 'text-amber-700'}>{item.label}</span>
                        </div>)}
                    </div>}
                  {status === 'Available' && <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="text-xs font-semibold text-gray-600">Expected learners
                        <input type="number" defaultValue={20} min={1} className="mt-1.5 w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]" />
                      </label>
                      <label className="text-xs font-semibold text-gray-600">Target age group
                        <select className="mt-1.5 w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                          <option>Ages 6-7</option>
                          <option>Ages 8-10</option>
                          <option>Ages 11-14</option>
                          <option>Ages 15-18</option>
                        </select>
                      </label>
                      <label className="text-xs font-semibold text-gray-600">Preferred start month
                        <input type="month" className="mt-1.5 w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]" />
                      </label>
                      <label className="text-xs font-semibold text-gray-600">Preferred schedule
                        <select className="mt-1.5 w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                          <option>Saturday mornings</option>
                          <option>Saturday afternoons</option>
                          <option>Sunday afternoons</option>
                          <option>Weekday evenings</option>
                        </select>
                      </label>
                      <label className="text-xs font-semibold text-gray-600">Delivery preference
                        <select className="mt-1.5 w-full rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]">
                          <option>Hub-based</option>
                          <option>Hybrid</option>
                          <option>Virtual</option>
                        </select>
                      </label>
                      <label className="text-xs font-semibold text-gray-600 sm:col-span-2">Programme-specific support
                        <textarea rows={3} placeholder="Optional: materials, specialist volunteer support, accessibility needs..." className="mt-1.5 w-full resize-none rounded-xl border border-[#d1e8db] px-3 py-2.5 text-sm font-normal text-gray-800 outline-none focus:border-[#0B6B3A]" />
                      </label>
                    </div>}
                  <div className="mt-4 flex flex-wrap gap-3">
                    {status === 'Available' && <button onClick={() => setStatuses(current => ({ ...current, [programme.id]: 'Pending review' }))} className="rounded-xl bg-[#0B6B3A] px-4 py-2.5 text-sm font-bold text-white">Request programme</button>}
                    {status === 'Active' && <button className="rounded-xl border border-[#d1e8db] px-4 py-2.5 text-sm font-bold text-[#0B6B3A]">Manage capacity</button>}
                    {status === 'Setup required' && <button className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-white">Complete setup</button>}
                    {status === 'Pending review' && <button onClick={() => setStatuses(current => ({ ...current, [programme.id]: 'Available' }))} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600">Withdraw request</button>}
                  </div>
                </div>}
            </div>;
        })}
      </div>
    </div>;
};

export const RoleProgrammesPage = ({ mode, hubName }: { mode: UserMode; hubName?: string }) =>
  mode === 'hub' ? <HubProgrammes hubName={hubName} /> : <ParentProgrammes />;
