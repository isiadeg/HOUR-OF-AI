import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { UserRole, useAuth } from './AuthContext';

const roles: UserRole[] = ['admin', 'volunteer', 'parent', 'hub'];

export function AccessPage() {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f4faf7] grid place-items-center px-5">
      <section className="w-full max-w-lg rounded-3xl border border-[#d1e8db] bg-white p-7 shadow-xl">
        <ShieldCheck className="text-[#0B6B3A]" size={30} />
        <h1 className="mt-4 text-2xl font-black text-gray-900">Choose a demo role</h1>
        <p className="mt-2 text-sm text-gray-500">
          Authentication is mocked for Week 1 so every protected dashboard can be reviewed.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {roles.map(item => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-bold capitalize ${
                item === role
                  ? 'border-[#0B6B3A] bg-[#e6f4ed] text-[#0B6B3A]'
                  : 'border-gray-200 text-gray-600 hover:border-[#0B6B3A]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate(`/${role}`, { replace: true })}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B6B3A] px-4 py-3 text-sm font-bold text-white"
        >
          Open dashboard <ArrowRight size={16} />
        </button>
      </section>
    </main>
  );
}
