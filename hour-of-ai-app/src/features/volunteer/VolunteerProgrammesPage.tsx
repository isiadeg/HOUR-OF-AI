import { useState } from 'react';
import { CheckCircle, Clock, GraduationCap, ShieldCheck } from 'lucide-react';

type VolunteerProgrammeStatus = 'Eligible' | 'Training required' | 'Under review' | 'Available';

const PROGRAMMES = [
  { id: 'p1', name: 'Hour of AI', ages: '8-14', delivery: 'Virtual / Hybrid', description: 'Help learners understand AI through guided discussions and practical activities.', training: 'AI Facilitation Essentials', progress: 100 },
  { id: 'p2', name: 'Digital Skills for Kids', ages: '6-12', delivery: 'Virtual / Hub', description: 'Support foundational computer skills, internet safety and digital confidence.', training: 'Digital Safety for Children', progress: 65 },
  { id: 'p3', name: 'Basic Maths Literacy', ages: '10-16', delivery: 'Virtual', description: 'Build practical numeracy through friendly, confidence-building sessions.', training: 'Maths Support Foundations', progress: 0 },
  { id: 'p4', name: 'English Language Support', ages: '8-15', delivery: 'Virtual', description: 'Support reading, writing and spoken communication in small groups.', training: 'Language Support Essentials', progress: 0 }
];

const statusStyle = (status: VolunteerProgrammeStatus) => {
  if (status === 'Eligible') return 'bg-[#e6f4ed] text-[#0B6B3A]';
  if (status === 'Under review') return 'bg-amber-50 text-amber-700';
  if (status === 'Training required') return 'bg-purple-50 text-purple-700';
  return 'bg-blue-50 text-blue-700';
};

export const VolunteerProgrammesPage = ({ onOpenTraining }: { onOpenTraining: () => void }) => {
  const [statuses, setStatuses] = useState<Record<string, VolunteerProgrammeStatus>>({
    p1: 'Eligible',
    p2: 'Training required',
    p3: 'Under review',
    p4: 'Available'
  });

  return <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-gray-900">Programmes</h2>
        <p className="mt-1 text-sm text-gray-500">Manage programme interests and track your eligibility for class matching.</p>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        Programme approval makes you eligible for matching. It does not assign you to a class; confirmed assignments appear under My Classes.
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['Eligible', 'Training required', 'Under review', 'Available'] as VolunteerProgrammeStatus[]).map(status => <div key={status} className="rounded-xl border border-[#d1e8db] bg-white p-4">
            <p className="text-2xl font-black text-[#0B6B3A]">{Object.values(statuses).filter(item => item === status).length}</p>
            <p className="text-xs font-semibold text-gray-500">{status}</p>
          </div>)}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {PROGRAMMES.map(programme => {
          const status = statuses[programme.id];
          return <div key={programme.id} className="flex flex-col rounded-2xl border border-[#d1e8db] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-gray-900">{programme.name}</h3>
                  <p className="mt-0.5 text-xs text-gray-500">Ages {programme.ages} · {programme.delivery}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle(status)}`}>{status}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">{programme.description}</p>
              {status === 'Eligible' && <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#f0f9f4] p-3">
                  <ShieldCheck size={17} className="mt-0.5 text-[#0B6B3A]" />
                  <div>
                    <p className="text-sm font-bold text-[#0B6B3A]">Approved for matching</p>
                    <p className="text-xs text-gray-600">Training and safeguarding requirements are complete.</p>
                  </div>
                </div>}
              {status === 'Training required' && <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700">{programme.training}</span>
                    <span className="font-bold text-purple-700">{programme.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-purple-100">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${programme.progress}%` }} />
                  </div>
                </div>}
              {status === 'Under review' && <div className="mt-4 flex items-start gap-3 rounded-xl bg-amber-50 p-3">
                  <Clock size={17} className="mt-0.5 text-amber-600" />
                  <div>
                    <p className="text-sm font-bold text-amber-700">Approval in progress</p>
                    <p className="text-xs text-amber-700">Interest received · Training checked · Safeguarding review pending</p>
                  </div>
                </div>}
              <div className="mt-auto flex flex-wrap gap-2 pt-5">
                {status === 'Available' && <button onClick={() => setStatuses(current => ({ ...current, [programme.id]: 'Under review' }))} className="rounded-xl bg-[#0B6B3A] px-4 py-2.5 text-sm font-bold text-white">Register interest</button>}
                {status === 'Training required' && <button onClick={onOpenTraining} className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white"><GraduationCap size={14} /> Continue training</button>}
                {status === 'Under review' && <button onClick={() => setStatuses(current => ({ ...current, [programme.id]: 'Available' }))} className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600">Withdraw interest</button>}
                {status === 'Eligible' && <div className="inline-flex items-center gap-2 rounded-xl bg-[#e6f4ed] px-4 py-2.5 text-sm font-bold text-[#0B6B3A]"><CheckCircle size={14} /> Eligible for matching</div>}
              </div>
            </div>;
        })}
      </div>
    </div>;
};
