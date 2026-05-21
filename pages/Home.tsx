import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, FlaskConical, Dna, Calculator, Monitor, Bot, Microscope, GraduationCap, Sparkles, ArrowRight, BookOpen, BarChart3, Smartphone, HelpCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { SUBJECTS } from '../constants';
import { useAuth } from '../services/AuthContext';
import { useLang } from '../services/LanguageContext';

const MotionDiv = motion.div as any;
const MotionH1 = motion.h1 as any;
const MotionP = motion.p as any;

const subjectIcons = [Zap, FlaskConical, Dna, Calculator, Monitor];

const stats = [
  { label: 'Experiments', value: 42, icon: Microscope, color: '#10b981' },
  { label: 'Subjects', value: 5, icon: BookOpen, color: '#0ea5e9' },
  { label: 'Karnataka PUC Labs', value: 42, icon: GraduationCap, color: '#f59e0b' },
  { label: 'AI Powered', value: 1, suffix: '', icon: Bot, color: '#6366f1' },
];

const features = [
  { title: 'Interactive 2D Simulations', desc: 'Rich Canvas & SVG labs for every experiment — no 3D required.', icon: Microscope, color: '#10b981' },
  { title: 'AI Lab Tutor', desc: 'Context-aware Gemini AI that knows your current experiment.', icon: Bot, color: '#8b5cf6' },
  { title: 'Karnataka PUC Syllabus', desc: 'Every lab aligned with 1st and 2nd PUC curriculum.', icon: BookOpen, color: '#0ea5e9' },
  { title: 'Real-time Calculations', desc: 'Live physics engine with error analysis and graphing.', icon: BarChart3, color: '#f59e0b' },
  { title: 'Mobile Responsive', desc: 'Learn on any device — phone, tablet, or laptop.', icon: Smartphone, color: '#ec4899' },
  { title: 'Viva Questions', desc: 'Prepare for practical exams with curated viva Q&A.', icon: HelpCircle, color: '#6366f1' },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}</span>;
}

const Home: React.FC = () => {
  const { user, role } = useAuth();
  const { t } = useLang();

  const stats = [
    { label: t.statsExperiments, value: 42, icon: Microscope, color: '#10b981' },
    { label: t.statsSubjects,    value: 5,  icon: BookOpen,   color: '#0ea5e9' },
    { label: t.statsLabs,        value: 42, icon: GraduationCap, color: '#f59e0b' },
    { label: t.statsAi,          value: 1,  suffix: '', icon: Bot, color: '#6366f1' },
  ];

  const features = [
    { title: t.feat1Title, desc: t.feat1Desc, icon: Microscope, color: '#10b981' },
    { title: t.feat2Title, desc: t.feat2Desc, icon: Bot, color: '#8b5cf6' },
    { title: t.feat3Title, desc: t.feat3Desc, icon: BookOpen, color: '#0ea5e9' },
    { title: t.feat4Title, desc: t.feat4Desc, icon: BarChart3, color: '#f59e0b' },
    { title: t.feat5Title, desc: t.feat5Desc, icon: Smartphone, color: '#ec4899' },
    { title: t.feat6Title, desc: t.feat6Desc, icon: HelpCircle, color: '#6366f1' },
  ];
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.07] via-transparent to-blue-500/[0.07]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <MotionDiv initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8">
              <Sparkles size={14} /> {t.heroBadge}
            </div>
            <MotionH1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-zinc-900 dark:text-white leading-tight mb-6">
              E-<span className="text-emerald-600 dark:text-emerald-400">Prayog</span>
              <br />
              <span className="text-2xl md:text-3xl lg:text-4xl font-normal text-zinc-500 dark:text-zinc-400">ಇ-ಪ್ರಯೋಗ</span>
            </MotionH1>
            <MotionP initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              {t.heroDesc}
            </MotionP>
            <MotionDiv initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 justify-center">
              <Link to="/subjects" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-600/25 hover:shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95">
                {t.heroCta} <ArrowRight size={20} />
              </Link>
              <Link to="/tutor" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 font-bold text-lg transition-all hover:scale-105">
                <Bot size={20} className="text-purple-400" /> {t.heroCtaAi}
              </Link>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>



      {/* Stats */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <MotionDiv key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="glass-panel rounded-2xl p-6 text-center">
              <stat.icon size={28} className="mx-auto mb-3" style={{ color: stat.color }} />
              <div className="text-3xl md:text-4xl font-bold font-display text-white">
                <AnimatedCounter target={stat.value} />{stat.suffix}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </MotionDiv>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-zinc-900 dark:text-white mb-4">{t.subjectsHeading}</h2>
          <p className="text-center text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">{t.subjectsSubheading}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SUBJECTS.map((subject, idx) => {
              const Icon = subjectIcons[idx] || Zap;
              return (
                <Link key={subject.id} to={`/subjects/${subject.id}`}>
                  <GlassCard color={subject.color} className="text-center h-full">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${subject.hex}15` }}>
                      <Icon size={28} style={{ color: subject.hex }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{subject.name}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">{subject.description}</p>
                    <div className="text-xs font-bold px-3 py-1 rounded-full inline-block" style={{ background: `${subject.hex}15`, color: subject.hex }}>
                      {subject.labs.length} {t.labsLabel}
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-12">{t.featuresHeading}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
              <GlassCard key={idx} hoverEffect={false} className="text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${feature.color}15` }}>
                  <Icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-zinc-400">{feature.desc}</p>
              </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-panel rounded-3xl p-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">{t.ctaHeading}</h2>
              <p className="text-zinc-400 mb-8">{t.ctaSubheading}</p>
              <Link to="/subjects" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-600/25 transition-all hover:scale-105">
                {t.ctaBtn} <ArrowRight size={20} />
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
