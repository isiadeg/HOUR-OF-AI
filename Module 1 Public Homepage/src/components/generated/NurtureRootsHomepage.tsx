import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Users, Globe, Clock, MapPin, BookOpen, Zap, Heart, Star, ArrowRight, Mail, Phone, ChevronRight, Play, Award, Code, Calculator, Languages, Laptop, Calendar, Video, Building2, Menu, X, CheckCircle, TrendingUp } from 'lucide-react';

// ─── CONSTANTS ──────────────────────────────────────────────────────────────

const NAV_LINKS = [{
  label: 'How It Works',
  href: '#how-it-works'
}, {
  label: 'Programmes',
  href: '#programmes'
}, {
  label: 'Events',
  href: '#events'
}, {
  label: 'Impact',
  href: '#impact'
}, {
  label: 'About',
  href: '#about'
}] as any[];
const METRICS = [{
  label: 'Learning Hours Delivered',
  value: 12400,
  suffix: '+',
  icon: Clock
}, {
  label: 'Students Reached',
  value: 8750,
  suffix: '+',
  icon: Users
}, {
  label: 'Active Volunteers',
  value: 320,
  suffix: '+',
  icon: Heart
}, {
  label: 'Community Hubs & Schools',
  value: 95,
  suffix: '+',
  icon: Building2
}, {
  label: 'Countries Reached',
  value: 34,
  suffix: '',
  icon: Globe
}] as any[];
const STEPS = [{
  step: '01',
  icon: Users,
  title: 'Sign Up',
  desc: 'Parents, volunteers, and hubs join the platform in minutes.'
}, {
  step: '02',
  icon: Star,
  title: 'Get Matched',
  desc: 'Learners are matched with global mentors based on level and interest.'
}, {
  step: '03',
  icon: Video,
  title: 'Join Weekly Sessions',
  desc: 'Delivered virtually and in community hubs around the world.'
}, {
  step: '04',
  icon: TrendingUp,
  title: 'Create Impact',
  desc: 'Each session supports the Street2School mission worldwide.'
}] as any[];
const PROGRAMMES = [{
  icon: Zap,
  title: 'Hour of AI',
  desc: 'Explore the fundamentals of artificial intelligence through hands-on activities and real-world projects.',
  age: 'Ages 8–17',
  color: 'from-[#0B6B3A] to-[#138a4c]',
  light: 'bg-[#e6f4ed]'
}, {
  icon: Calculator,
  title: 'Basic Maths Literacy',
  desc: 'Build confidence in numeracy with guided sessions aligned to international learning standards.',
  age: 'Ages 6–14',
  color: 'from-[#1a8a4e] to-[#22a860]',
  light: 'bg-[#eaf6f0]'
}, {
  icon: Languages,
  title: 'English Language Support',
  desc: 'Develop reading, writing and communication skills with certified language mentors.',
  age: 'Ages 7–16',
  color: 'from-[#0d7c44] to-[#16974f]',
  light: 'bg-[#e8f5ed]'
}, {
  icon: Laptop,
  title: 'Digital Skills for Kids',
  desc: 'From typing to internet safety and creative tools — empowering digital citizens of tomorrow.',
  age: 'Ages 6–15',
  color: 'from-[#095e32] to-[#0d7c44]',
  light: 'bg-[#e4f2ea]'
}] as any[];
const EVENTS = [{
  title: 'Intro to AI: Live Global Session',
  city: 'Nairobi, Kenya',
  date: 'Sat, 12 Jul 2025',
  time: '10:00 AM GMT',
  type: 'Hybrid',
  typeColor: 'bg-[#e6f4ed] text-[#0B6B3A]'
}, {
  title: 'Digital Skills Workshop',
  city: 'Lagos, Nigeria',
  date: 'Sat, 19 Jul 2025',
  time: '11:00 AM WAT',
  type: 'Physical',
  typeColor: 'bg-[#fff7e6] text-[#b45309]'
}, {
  title: 'Hour of AI – Open Day',
  city: 'London, United Kingdom',
  date: 'Sat, 26 Jul 2025',
  time: '2:00 PM BST',
  type: 'Virtual',
  typeColor: 'bg-[#e8edf6] text-[#1e40af]'
}, {
  title: 'Maths Literacy Session',
  city: 'Accra, Ghana',
  date: 'Sat, 2 Aug 2025',
  time: '9:00 AM GMT',
  type: 'Hybrid',
  typeColor: 'bg-[#e6f4ed] text-[#0B6B3A]'
}, {
  title: 'English Communication Hub',
  city: 'Kampala, Uganda',
  date: 'Sat, 9 Aug 2025',
  time: '10:30 AM EAT',
  type: 'Physical',
  typeColor: 'bg-[#fff7e6] text-[#b45309]'
}, {
  title: 'Code Club Global Open',
  city: 'Virtual (Global)',
  date: 'Sat, 16 Aug 2025',
  time: '3:00 PM UTC',
  type: 'Virtual',
  typeColor: 'bg-[#e8edf6] text-[#1e40af]'
}] as any[];
const FOOTER_PROGRAMME = ['How it Works', 'Curriculum', 'Mentors', 'Hub Locations'];
const FOOTER_TRUST = ['Safeguarding Policy', 'Code of Conduct', 'Privacy Policy', 'Terms of Use', 'Impact Reporting'];
const PARTNER_LOGOS = ['GIVE', 'AHYEL', 'i-eSchool', 'Nurture Roots'];

// ─── SMALL HELPERS (non-exported) ────────────────────────────────────────────

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32
  },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: 'easeOut'
    }
  })
};
const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};
const AnimatedCounter = ({
  target,
  suffix
}: {
  target: number;
  suffix: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px'
  });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  // @return
  return <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>;
};
const SectionWrapper = ({
  id,
  children,
  className = ''
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView, controls]);

  // @return
  return <motion.section id={id} ref={ref} initial="hidden" animate={controls} variants={fadeIn} className={className}>
      {children}
    </motion.section>;
};
const PartnerBadge = ({
  name
}: {
  name: string;
}) => <div className="flex items-center justify-center px-4 py-2 rounded-xl bg-white border border-[#d1e8db] shadow-sm">
    <span className="text-xs font-bold tracking-wide text-[#0B6B3A]">{name}</span>
  </div>;
const GreenButton = ({
  children,
  variant = 'filled',
  onClick
}: {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'ghost';
  onClick?: () => void;
}) => {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer select-none';
  const styles = {
    filled: `${base} bg-[#0B6B3A] text-white hover:bg-[#095e32] shadow-md hover:shadow-lg hover:-translate-y-0.5`,
    outline: `${base} border-2 border-[#0B6B3A] text-[#0B6B3A] hover:bg-[#0B6B3A] hover:text-white`,
    ghost: `${base} text-[#0B6B3A] hover:bg-[#e6f4ed]`
  };
  // @return
  return <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>;
};
const WorldMapDecor = () => <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="500" cy="250" rx="490" ry="240" fill="none" stroke="#0B6B3A" strokeWidth="1" />
    <ellipse cx="500" cy="250" rx="340" ry="240" fill="none" stroke="#0B6B3A" strokeWidth="0.5" />
    <ellipse cx="500" cy="250" rx="180" ry="240" fill="none" stroke="#0B6B3A" strokeWidth="0.5" />
    <line x1="10" y1="250" x2="990" y2="250" stroke="#0B6B3A" strokeWidth="0.5" />
    <line x1="10" y1="170" x2="990" y2="170" stroke="#0B6B3A" strokeWidth="0.4" />
    <line x1="10" y1="330" x2="990" y2="330" stroke="#0B6B3A" strokeWidth="0.4" />
    <line x1="500" y1="10" x2="500" y2="490" stroke="#0B6B3A" strokeWidth="0.5" />
    <line x1="250" y1="10" x2="250" y2="490" stroke="#0B6B3A" strokeWidth="0.4" />
    <line x1="750" y1="10" x2="750" y2="490" stroke="#0B6B3A" strokeWidth="0.4" />
    {[[200, 180], [320, 200], [450, 150], [600, 170], [720, 190], [850, 160], [150, 300], [280, 320], [540, 310], [680, 300], [800, 280], [920, 310], [380, 380], [620, 360], [760, 370]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="4" fill="#0B6B3A" opacity="0.6" />)}
  </svg>;

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

// @component: NurtureRootsHomepage
export const NurtureRootsHomepage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  // @return
  return <div className="w-full min-h-screen bg-white font-sans overflow-x-hidden">
      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e6f4ed] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center">
              <Code size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#0B6B3A] leading-none block">Nurture Roots</span>
              <span className="text-[10px] text-[#3d9966] font-medium leading-none">Code Club</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => <a key={l.label} href={l.href} className="text-sm text-gray-600 hover:text-[#0B6B3A] font-medium transition-colors">
                {l.label}
              </a>)}
          </nav>

          {/* CTA Row */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#register-volunteer" className="text-sm font-semibold text-[#0B6B3A] hover:underline">
              Volunteer
            </a>
            <GreenButton variant="filled">Register as Student</GreenButton>
          </div>

          {/* Mobile Burger */}
          <button className="md:hidden p-2 text-[#0B6B3A]" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && <motion.div initial={{
        opacity: 0,
        y: -8
      }} animate={{
        opacity: 1,
        y: 0
      }} className="md:hidden bg-white border-t border-[#e6f4ed] px-4 pb-4 flex flex-col gap-3">
            {NAV_LINKS.map(l => <a key={l.label} href={l.href} className="py-2 text-sm font-medium text-gray-700 hover:text-[#0B6B3A]" onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>)}
            <GreenButton variant="filled">Register as Student</GreenButton>
          </motion.div>}
      </header>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-[#f0f9f4] via-white to-[#e8f5ed] relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0B6B3A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22a860]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="flex-1 max-w-xl">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e6f4ed] border border-[#c3e0cf] mb-5">
                <span className="w-2 h-2 rounded-full bg-[#0B6B3A] animate-pulse" />
                <span className="text-xs font-semibold text-[#0B6B3A]">Powered by the Street2School Collective</span>
              </motion.div>

              <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1} className="text-5xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight mb-3">
                Hour of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B6B3A] to-[#22a860]">
                  AI
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2} className="text-xl lg:text-2xl font-semibold text-[#0B6B3A] mb-4">
                Learn, Create, Elevate
              </motion.p>

              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={3} className="text-base lg:text-lg text-gray-600 leading-relaxed mb-8">
                Empowering the next generation through global AI mentorship. Connecting remote
                learners and physical community hubs with world-class mentors.
              </motion.p>

              {/* Partner logos */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="flex flex-wrap gap-3 mb-8">
                {PARTNER_LOGOS.map(p => <PartnerBadge key={p} name={p} />)}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className="flex flex-wrap gap-3">
                <GreenButton variant="filled">
                  <BookOpen size={15} />
                  Register as Student
                </GreenButton>
                <GreenButton variant="outline">
                  <Heart size={15} />
                  Register as Volunteer
                </GreenButton>
                <GreenButton variant="ghost">
                  <Building2 size={15} />
                  Register a Community Hub
                </GreenButton>
              </motion.div>
            </div>

            {/* Right – image + floating card */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className="flex-1 relative w-full max-w-lg">
              {/* Main image panel */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B6B3A]/90 to-[#22a860]/80" />
                {/* Decorative grid of learner avatars */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                  <div className="flex gap-3 flex-wrap justify-center">
                    {['👧🏾', '👦🏻', '👧🏽', '👦🏿', '👧🏼', '👦🏾', '👩🏽', '👨🏻', '👩🏿', '👨🏽'].map((emoji, i) => <motion.div key={i} initial={{
                    scale: 0,
                    opacity: 0
                  }} animate={{
                    scale: 1,
                    opacity: 1
                  }} transition={{
                    delay: 0.3 + i * 0.07,
                    type: 'spring'
                  }} className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl shadow-lg">
                        {emoji}
                      </motion.div>)}
                  </div>
                  <p className="text-white/90 text-sm font-medium text-center mt-2">
                    Diverse learners · Global community · Weekly sessions
                  </p>
                </div>
              </div>

              {/* Floating card – Live Session */}
              <motion.div initial={{
              opacity: 0,
              y: 20,
              scale: 0.9
            }} animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }} transition={{
              delay: 0.9,
              type: 'spring'
            }} className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 border border-[#e6f4ed] min-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-[#e6f4ed] flex items-center justify-center shrink-0">
                  <Play size={16} className="text-[#0B6B3A] fill-[#0B6B3A]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Live Session: Intro to AI</p>
                  <p className="text-xs text-[#0B6B3A] font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B3A] animate-pulse inline-block" />
                    124 learners joined
                  </p>
                </div>
              </motion.div>

              {/* Floating badge – Countries */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 1.1,
              type: 'spring'
            }} className="absolute -top-3 -right-3 bg-[#0B6B3A] text-white rounded-2xl shadow-xl px-4 py-3 text-center">
                <p className="text-xl font-black leading-none">34</p>
                <p className="text-[10px] font-semibold opacity-80 mt-0.5">Countries</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL IMPACT ──────────────────────────────────────────────────── */}
      <SectionWrapper id="impact" className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <WorldMapDecor />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-3">
              Measuring Real Change
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">Our Global Impact</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Every session contributes to empowering children and supporting out-of-school learners
              globally.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {METRICS.map((m, i) => <motion.div key={m.label} variants={fadeUp} custom={i} className="bg-gradient-to-br from-[#f0f9f4] to-white border border-[#d1e8db] rounded-2xl p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-[#0B6B3A]/10 flex items-center justify-center mx-auto mb-3">
                  <m.icon size={20} className="text-[#0B6B3A]" />
                </div>
                <p className="text-2xl lg:text-3xl font-black text-[#0B6B3A] leading-none mb-1">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </p>
                <p className="text-xs text-gray-500 font-medium leading-snug">{m.label}</p>
              </motion.div>)}
          </div>

          {/* Flags row */}
          <motion.div variants={fadeUp} custom={6} className="flex flex-wrap justify-center gap-2 mt-10">
            {['🇳🇬', '🇰🇪', '🇬🇭', '🇺🇬', '🇿🇦', '🇬🇧', '🇺🇸', '🇮🇳', '🇧🇷', '🇨🇦', '🇦🇺', '🇫🇷'].map((flag, i) => <span key={i} className="text-2xl" role="img">
                  {flag}
                </span>)}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <SectionWrapper id="how-it-works" className="py-20 lg:py-28 bg-gradient-to-b from-[#f0f9f4] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-3">
              Simple & Powerful
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">How It Works</h2>
            <p className="text-[#0B6B3A] font-semibold text-base">
              Just 1 hour a week can change a child's future.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => <motion.div key={s.step} variants={fadeUp} custom={i} className="relative bg-white border border-[#d1e8db] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-[#0B6B3A]/10 leading-none">{s.step}</span>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <s.icon size={22} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <ChevronRight size={20} className="text-[#0B6B3A]/40" />
                  </div>}
              </motion.div>)}
          </div>
        </div>
      </SectionWrapper>

      {/* ── PROGRAMMES ─────────────────────────────────────────────────────── */}
      <SectionWrapper id="programmes" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-3">
              World-Class Curriculum
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
              Explore Our Programmes
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Structured learning paths designed for every child, delivered by global mentors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROGRAMMES.map((p, i) => <motion.div key={p.title} variants={fadeUp} custom={i} className="bg-white border border-[#d1e8db] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className={`bg-gradient-to-br ${p.color} p-5 flex items-center gap-3`}>
                  <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                    <p.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug">{p.title}</h3>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`text-xs font-semibold ${p.light} text-[#0B6B3A] px-2 py-1 rounded-lg`}>
                      {p.age}
                    </span>
                    <a href="#" className="text-xs font-bold text-[#0B6B3A] flex items-center gap-1 hover:gap-2 transition-all">
                      Learn More <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </SectionWrapper>

      {/* ── EVENTS ─────────────────────────────────────────────────────────── */}
      <SectionWrapper id="events" className="py-20 lg:py-28 bg-gradient-to-b from-[#f0f9f4] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full bg-[#e6f4ed] text-[#0B6B3A] text-xs font-semibold mb-3">
              Join the Community
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
              Upcoming Events & Local Sessions
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              Volunteers can also host sessions in their local communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EVENTS.map((ev, i) => <motion.div key={ev.title} variants={fadeUp} custom={i} className="bg-white border border-[#d1e8db] rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug">{ev.title}</h3>
                  <span className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-lg ${ev.typeColor}`}>
                    {ev.type}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-2">
                    <MapPin size={12} className="text-[#0B6B3A]" /> {ev.city}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar size={12} className="text-[#0B6B3A]" /> {ev.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={12} className="text-[#0B6B3A]" /> {ev.time}
                  </span>
                </div>
                <div className="mt-1">
                  <GreenButton variant="outline">
                    Join Event <ArrowRight size={13} />
                  </GreenButton>
                </div>
              </motion.div>)}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <SectionWrapper className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} custom={0} className="relative bg-gradient-to-br from-[#0B6B3A] via-[#0d7c44] to-[#22a860] rounded-3xl px-8 py-14 lg:py-20 text-center overflow-hidden shadow-2xl">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-semibold mb-6">
                <Globe size={12} /> Global Movement
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
                Ready to shape the future of AI?
              </h2>
              <p className="text-white/80 text-base max-w-lg mx-auto mb-10">
                Join a global movement bringing AI education to every child.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#0B6B3A] font-bold text-sm hover:bg-green-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                  <BookOpen size={16} /> Start Learning
                </button>
                <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 text-white border border-white/30 font-bold text-sm hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200">
                  <Heart size={16} /> Become a Volunteer
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-[#082d1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Col 1 – Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0B6B3A] to-[#22a860] flex items-center justify-center">
                  <Code size={16} className="text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold leading-none block">Nurture Roots</span>
                  <span className="text-[10px] text-[#6dd49a] font-medium leading-none">Code Club</span>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-6">
                Empowering communities worldwide through accessible AI education and mentorship.
              </p>
              {/* Newsletter */}
              <div>
                <p className="text-xs font-semibold text-white/80 mb-2">
                  Weekly Digest – AI sessions & updates
                </p>
                <div className="flex gap-2">
                  <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#22a860]" />
                  <button onClick={handleSubscribe} className="px-3 py-2 rounded-lg bg-[#0B6B3A] hover:bg-[#22a860] transition-colors" aria-label="Subscribe">
                    {subscribed ? <CheckCircle size={16} /> : <ArrowRight size={16} />}
                  </button>
                </div>
                {subscribed && <p className="text-xs text-[#6dd49a] mt-1">Thanks for subscribing! 🎉</p>}
              </div>
            </div>

            {/* Col 2 – Programme */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white">Programme</h4>
              <ul className="space-y-2">
                {FOOTER_PROGRAMME.map(item => <li key={item}>
                    <a href="#" className="text-sm text-white/60 hover:text-[#6dd49a] transition-colors">
                      {item}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Col 3 – Trust & Safety */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white">Trust & Safety</h4>
              <ul className="space-y-2">
                {FOOTER_TRUST.map(item => <li key={item}>
                    <a href="#" className="text-sm text-white/60 hover:text-[#6dd49a] transition-colors">
                      {item}
                    </a>
                  </li>)}
              </ul>
            </div>

            {/* Col 4 – Contact */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-white">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Mail size={14} className="text-[#22a860] shrink-0" />
                  hello@nurtureroots.org
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <Phone size={14} className="text-[#22a860] shrink-0" />
                  Live Support (24/7)
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-xs text-white/40 mb-3">Follow the movement</p>
                <div className="flex gap-3">
                  {['𝕏', 'in', 'f', '▶'].map((icon, i) => <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#0B6B3A] flex items-center justify-center text-xs font-bold text-white/60 hover:text-white transition-all">
                      {icon}
                    </a>)}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-white/40">Powered by the Street2School Collective</span>
              <div className="flex gap-2 flex-wrap">
                {PARTNER_LOGOS.map(p => <span key={p} className="text-xs font-bold text-[#6dd49a] px-2 py-0.5 rounded bg-white/5">
                    {p}
                  </span>)}
              </div>
            </div>
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Nurture Roots Code Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>;
};