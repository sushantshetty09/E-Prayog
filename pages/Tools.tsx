import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sigma, Cpu, Table2, Hash, Calculator, ShieldCheck, Microscope } from 'lucide-react';
import { useLang } from '../services/LanguageContext';

const TOOLS = [
  { id: 'formula-sheet', key: 'toolsFormulaSheet',  icon: Sigma,      color: '#3b82f6', bg: 'rgba(59,130,246,0.15)',  path: '/tools/formula-sheet' },
  { id: 'logic-gates', key: 'toolsLogicGates', icon: Cpu, color: '#a855f7', bg: 'rgba(168,85,247,0.15)', path: '/tools/logic-gates' },
  { id: 'periodic-table', key: 'toolsPeriodicTable', icon: Table2, color: '#10b981', bg: 'rgba(16,185,129,0.15)', path: '/tools/periodic-table' },
  { id: 'constants', key: 'toolsConstants', icon: Hash, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', path: '/tools/constants' },
  { id: 'calculator', key: 'toolsCalculator', icon: Calculator, color: '#ec4899', bg: 'rgba(236,72,153,0.15)', path: '/tools/calculator' },
  { id: 'safety-guide', key: 'toolsSafetyGuide', icon: ShieldCheck,color: '#ef4444', bg: 'rgba(239,68,68,0.15)',  path: '/tools/safety-guide' },
  { id: 'bio-diagrams', key: 'toolsBioDiagrams', icon: Microscope, color: '#22c55e', bg: 'rgba(34,197,94,0.15)',  path: '/tools/bio-diagrams' },
];

const Tools: React.FC = () => {
  const { t } = useLang();
  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">{t.toolsTitle}</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          {t.toolsDesc}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {TOOLS.map((tool, i) => (
          <Link key={tool.id} to={tool.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="glass-panel rounded-2xl p-6 flex flex-col items-center gap-4 cursor-pointer
                         border border-white/5 hover:border-white/15 transition-colors
                         bg-zinc-900/60 hover:bg-zinc-800/60 h-full"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                   style={{ background: tool.bg, border: `1.5px solid ${tool.color}25` }}>
                <tool.icon size={30} style={{ color: tool.color }} />
              </div>
              <span className="text-white font-semibold text-sm text-center">{t[tool.key]}</span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tools;
