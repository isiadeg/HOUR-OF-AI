import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Building2, ArrowRight, Code, CheckCircle, ChevronLeft, Sparkles, BookOpen, Heart, Star } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { submitRegistration } from '../../services/registration.service';
import { ParentSignupFlow } from './ParentSignupFlow';
import { VolunteerSignupFlow } from './VolunteerSignupFlow';
import { HubSignupFlow } from './HubSignupFlow';

// ─── TYPES ───────────────────────────────────────────────────────────────────

type UserRole = 'parent' | 'volunteer' | 'hub' | null;
type AppScreen = 'role_select' | 'flow' | 'confirmation';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const ROLE_CARDS = [{
  id: 'parent' as UserRole,
  emoji: '👨‍👩‍👧',
  icon: Users,
  title: 'Parent / Guardian',
  desc: 'Register your child for weekly AI learning sessions',
  tag: 'For families',
  tagColor: 'bg-[#e6f4ed] text-[#0B6B3A]',
  gradient: 'from-[#f0f9f4] to-[#e8f5ed]',
  border: 'border-[#c3e0cf]',
  highlight: 'hover:border-[#0B6B3A]'
}, {
  id: 'volunteer' as UserRole,
  emoji: '🌍',
  icon: Globe,
  title: 'Volunteer',
  desc: 'Mentor and teach students from anywhere in the world',
  tag: 'For educators',
  tagColor: 'bg-[#e8edf6] text-[#1e40af]',
  gradient: 'from-[#f0f4ff] to-[#e8edf6]',
  border: 'border-[#c3cfec]',
  highlight: 'hover:border-[#1e40af]'
}, {
  id: 'hub' as UserRole,
  emoji: '🏫',
  icon: Building2,
  title: 'Community Hub',
  desc: 'Register a group of learners from your school or centre',
  tag: 'For organisations',
  tagColor: 'bg-[#fff7e6] text-[#b45309]',
  gradient: 'from-[#fffbf0] to-[#fff7e6]',
  border: 'border-[#f0d5a0]',
  highlight: 'hover:border-[#b45309]'
}] as const;
const CONFIRMATION_CONFIG = {
  parent: {
    emoji: '🎉',
    headline: "You're in!",
    sub: "You've made a brilliant start for your child's future.",
    color: 'from-[#0B6B3A] to-[#22a860]',
    steps: ['You will be assigned to a class shortly', 'Check your email for a welcome message', 'Your first session will be scheduled within 48 hours'],
    dashboardLabel: 'Go to Parent Dashboard',
    dashboardIcon: Users
  },
  volunteer: {
    emoji: '🌟',
    headline: 'Welcome to the Volunteer Network!',
    sub: "You're already making a difference. The world needs you.",
    color: 'from-[#1e40af] to-[#3b6fd4]',
    steps: ["We'll match you with a class based on your availability", 'You\'ll receive your training pack within 24 hours', 'Check your dashboard for session details'],
    dashboardLabel: 'Go to Volunteer Dashboard',
    dashboardIcon: Globe
  },
  hub: {
    emoji: '🏫',
    headline: 'Your hub is registered!',
    sub: "Our team is ready to partner with you. Welcome to the movement.",
    color: 'from-[#b45309] to-[#d97706]',
    steps: ['Our team will match you with qualified volunteers', "You'll receive onboarding materials within 24 hours", 'A programme coordinator will contact you shortly'],
    dashboardLabel: 'Go to Hub Dashboard',
    dashboardIcon: Building2
  }
};

// ─── SHARED ATOMS ────────────────────────────────────────────────────────────

const fadeUp: any = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};
const Logo = () => <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shadow-sm">
      <Code size={15} className="text-white" />
    </div>
    <div>
      <span className="text-sm font-bold text-[#0B6B3A] leading-none block">Nurture Roots</span>
      <span className="text-[10px] text-[#3d9966] font-medium leading-none">Code Club</span>
    </div>
  </div>;

// ─── ROLE SELECTION SCREEN ────────────────────────────────────────────────────

const RoleSelectionScreen = ({
  onSelect,
  onGoHome
}: {
  onSelect: (role: UserRole) => void;
  onGoHome: () => void;
}) => <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] via-white to-[#e8f5ed] flex flex-col">
    {/* Top bar */}
    <header className="px-5 pt-5 pb-3 flex items-center justify-between max-w-2xl mx-auto w-full">
      <Logo />
      <button onClick={onGoHome} className="text-xs font-semibold text-gray-500 hover:text-[#0B6B3A] transition-colors">
        ← Back to site
      </button>
    </header>

    {/* Content */}
    <div className="flex-1 flex flex-col items-center justify-center px-5 py-8 max-w-2xl mx-auto w-full">
      {/* Hero badge */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e6f4ed] border border-[#c3e0cf] mb-6">
        <Sparkles size={13} className="text-[#0B6B3A]" />
        <span className="text-xs font-semibold text-[#0B6B3A]">Join the Programme</span>
      </motion.div>

      <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-3xl sm:text-4xl font-black text-gray-900 text-center leading-tight mb-3">
        How would you like<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B3A] to-[#22a860]">
          to participate?
        </span>
      </motion.h1>

      <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-sm text-gray-500 text-center mb-10 max-w-sm">
        Select your role — each journey is tailored just for you.
      </motion.p>

      {/* Role cards */}
      <div className="w-full space-y-4">
        {ROLE_CARDS.map((card, i) => <motion.button key={card.id} variants={fadeUp} initial="hidden" animate="visible" custom={i + 3} onClick={() => onSelect(card.id)} className={`w-full bg-gradient-to-br ${card.gradient} border-2 ${card.border} ${card.highlight} rounded-2xl p-5 flex items-center gap-4 text-left transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group cursor-pointer`}>
            {/* Emoji avatar */}
            <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
              <span>{card.emoji}</span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-black text-gray-900 text-base">{card.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.tagColor}`}>
                  {card.tag}
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-snug">{card.desc}</p>
            </div>

            {/* Arrow */}
            <div className="w-9 h-9 rounded-xl bg-white/70 group-hover:bg-white flex items-center justify-center shrink-0 transition-all shadow-sm">
              <ArrowRight size={16} className="text-gray-500 group-hover:text-[#0B6B3A] transition-colors" />
            </div>
          </motion.button>)}
      </div>

      {/* Trust note */}
      <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={7} className="text-xs text-gray-400 text-center mt-8 max-w-xs">
        Trusted by 8,750+ learners across 34 countries. Powered by the Street2School Collective.
      </motion.p>
    </div>
  </div>;

// ─── CONFIRMATION SCREEN ──────────────────────────────────────────────────────

const ConfirmationScreen = ({
  role,
  onGoHome,
  onGoToDashboard
}: {
  role: UserRole;
  onGoHome: () => void;
  onGoToDashboard: () => void;
}) => {
  if (!role) return null;
  const cfg = CONFIRMATION_CONFIG[role];
  return <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] via-white to-[#e8f5ed] flex flex-col items-center justify-center px-5 py-10">
      <motion.div initial={{
      scale: 0.8,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} transition={{
      type: 'spring',
      duration: 0.6
    }} className="w-full max-w-md">
        {/* Success card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Top gradient banner */}
          <div className={`bg-gradient-to-r ${cfg.color} px-8 py-10 text-center`}>
            <motion.div initial={{
            scale: 0,
            rotate: -20
          }} animate={{
            scale: 1,
            rotate: 0
          }} transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 200
          }} className="text-5xl mb-4 inline-block">
              {cfg.emoji}
            </motion.div>
            <h1 className="text-2xl font-black text-white mb-2">{cfg.headline}</h1>
            <p className="text-white/80 text-sm leading-relaxed">{cfg.sub}</p>
          </div>

          {/* Steps */}
          <div className="px-6 py-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">What happens next</p>
            <ul className="space-y-3">
              {cfg.steps.map((step, i) => <motion.li key={step} initial={{
              opacity: 0,
              x: -12
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.5 + i * 0.12
            }} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#e6f4ed] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={13} className="text-[#0B6B3A]" />
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{step}</span>
                </motion.li>)}
            </ul>

            {/* Encouraging message */}
            <div className="mt-6 p-4 bg-[#f0f9f4] border border-[#d1e8db] rounded-xl flex items-start gap-3">
              <Star size={16} className="text-[#0B6B3A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#0B6B3A] font-medium leading-relaxed">
                You're making a difference already. Every session changes a child's future.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="mt-6 space-y-3">
              <button onClick={onGoToDashboard} className="w-full py-3.5 rounded-xl bg-[#0B6B3A] text-white font-bold text-sm hover:bg-[#095e32] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <cfg.dashboardIcon size={16} />
                <span>{cfg.dashboardLabel}</span>
              </button>
              <button onClick={onGoHome} className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 transition-all">
                Back to Homepage
              </button>
            </div>
          </div>
        </div>

        {/* Partner note */}
        <p className="text-xs text-gray-400 text-center mt-6">
          Powered by the Street2School Collective · Nurture Roots Code Club
        </p>
      </motion.div>
    </div>;
};

// ─── FLOW SHELL (modal-like container for multi-step forms) ───────────────────

const FlowShell = ({
  role,
  onComplete,
  onBack
}: {
  role: UserRole;
  onComplete: (data: unknown) => void;
  onBack: () => void;
}) => {
  const roleLabels: Record<string, string> = {
    parent: 'Parent / Guardian',
    volunteer: 'Volunteer',
    hub: 'Community Hub'
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#f0f9f4] via-white to-[#e8f5ed] flex flex-col">
      {/* Sticky header bar */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-[#e6f4ed] shadow-sm sticky top-0 z-10">
        <div className="max-w-xl mx-auto px-5 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0B6B3A] transition-colors">
            <ChevronLeft size={14} />
            <span>Change role</span>
          </button>
          <Logo />
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e6f4ed]">
            <span className="text-[10px] font-bold text-[#0B6B3A]">{role ? roleLabels[role] : ''}</span>
          </div>
        </div>
      </div>

      {/* Form container */}
      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[600px] flex flex-col">
          {role === 'parent' && <ParentSignupFlow onComplete={onComplete} onBack={onBack} />}
          {role === 'volunteer' && <VolunteerSignupFlow onComplete={onComplete} onBack={onBack} />}
          {role === 'hub' && <HubSignupFlow onComplete={onComplete} onBack={onBack} />}
        </div>
      </div>

      {/* Encouraging footer */}
      <div className="text-center pb-6 px-4">
        <div className="inline-flex items-center gap-2 text-xs text-gray-400">
          <Heart size={12} className="text-[#0B6B3A]" />
          <span>Joining a global mission · 8,750+ learners · 34 countries</span>
          <BookOpen size={12} className="text-[#0B6B3A]" />
        </div>
      </div>
    </div>;
};

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export const NurtureRootsOnboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const segment = location.pathname.split('/')[2] ?? '';
  const selectedRole: UserRole =
    segment === 'parent' || segment === 'volunteer' || segment === 'hub' ? segment : null;
  const screen: AppScreen =
    segment === 'complete' ? 'confirmation' : selectedRole ? 'flow' : 'role_select';
  const confirmationRole = new URLSearchParams(location.search).get('role');
  const completedRole: UserRole =
    confirmationRole === 'parent' || confirmationRole === 'volunteer' || confirmationRole === 'hub'
      ? confirmationRole
      : null;
  const handleRoleSelect = (role: UserRole) => {
    if (role) navigate(`/signup/${role}`);
  };
  const handleComplete = async (data: unknown) => {
    if (!selectedRole) return;
    await submitRegistration(selectedRole, data);
    navigate(`/signup/complete?role=${selectedRole}`);
  };
  const handleBackToRoles = () => {
    navigate('/signup');
  };
  const handleGoHome = () => {
    navigate('/');
  };
  if (segment && !selectedRole && segment !== 'complete') {
    return <Navigate to="/signup" replace />;
  }
  return <div className="w-full min-h-screen font-sans">
      <AnimatePresence mode="wait">
        {screen === 'role_select' && <motion.div key="role_select" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0,
        transition: {
          duration: 0.2
        }
      }}>
            <RoleSelectionScreen onSelect={handleRoleSelect} onGoHome={handleGoHome} />
          </motion.div>}

        {screen === 'flow' && selectedRole && <motion.div key="flow" initial={{
        opacity: 0,
        x: 30
      }} animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.35,
          ease: 'easeOut'
        }
      }} exit={{
        opacity: 0,
        x: -30,
        transition: {
          duration: 0.2
        }
      }}>
            <FlowShell role={selectedRole} onComplete={handleComplete} onBack={handleBackToRoles} />
          </motion.div>}

        {screen === 'confirmation' && completedRole && <motion.div key="confirmation" initial={{
        opacity: 0,
        scale: 0.96
      }} animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.4,
          ease: 'easeOut'
        }
      }} exit={{
        opacity: 0
      }}>
            <ConfirmationScreen
              role={completedRole}
              onGoHome={handleGoHome}
              onGoToDashboard={() => navigate('/access', { state: { from: `/${completedRole}` } })}
            />
          </motion.div>}
      </AnimatePresence>
    </div>;
};
