import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, FlaskConical, Dna, Calculator, Monitor, ArrowRight } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { SUBJECTS } from '../constants';
import { m as motion } from 'framer-motion';
import { useLang } from '../services/LanguageContext';

const MotionDiv = motion.div as any;
const icons = [Zap, FlaskConical, Dna, Calculator, Monitor];

const Subjects: React.FC = () => {
  const { t } = useLang();

  // Map subject IDs → translated names and descriptions
  const subjectNameMap: Record<string, string> = {
    physics: t.namePhysics,
    chemistry: t.nameChemistry,
    biology: t.nameBiology,
    math: t.nameMath,
    cs: t.nameCS,
  };
  const subjectDescMap: Record<string, string> = {
    physics: t.descPhysics,
    chemistry: t.descChemistry,
    biology: t.descBiology,
    math: t.descMath,
    cs: t.descCS,
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <MotionDiv initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-white mb-4">
            {t.subjectsTitle}
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            {t.subjectsDesc}
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUBJECTS.map((subject, idx) => {
            const Icon = icons[idx] || Zap;
            const translatedName = subjectNameMap[subject.id] || subject.name;
            const translatedDesc = subjectDescMap[subject.id] || subject.description;
            return (
              <Link key={subject.id} to={`/subjects/${subject.id}`}>
                <GlassCard color={subject.color} className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="size-14 rounded-2xl flex items-center justify-center" style={{ background: `${subject.hex}15` }}>
                      <Icon size={28} style={{ color: subject.hex }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">{translatedName}</h2>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${subject.hex}15`, color: subject.hex }}>
                        {subject.labs.length} {t.subjectsExperiments}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{translatedDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {subject.labs.slice(0, 4).map(lab => (
                      <span key={lab.id} className="text-xs text-zinc-500 bg-white/5 rounded-full px-2 py-0.5">{lab.title}</span>
                    ))}
                    {subject.labs.length > 4 && <span className="text-xs text-zinc-600">+{subject.labs.length - 4} {t.subjectsMore}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: subject.hex }}>
                    {t.subjectsExplore} <ArrowRight size={16} />
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
