import React, { useState } from 'react';
import { Search, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../services/LanguageContext';

const CONSTANTS = [
  { id: 'c1', category: 'Universal', name: 'Speed of Light', symbol: 'c', value: '299,792,458', unit: 'm/s', description: 'Upper limit for the speed of information transfer through space.' },
  { id: 'c2', category: 'Universal', name: 'Gravitational Constant', symbol: 'G', value: '6.67430(15) × 10⁻¹¹', unit: 'm³⋅kg⁻¹⋅s⁻²', description: 'Constant in Newton\'s law of universal gravitation.' },
  { id: 'c3', category: 'Universal', name: 'Planck constant', symbol: 'h', value: '6.62607015 × 10⁻³⁴', unit: 'J⋅s', description: 'Fundamental constant in quantum mechanics.' },
  { id: 'c4', category: 'Electromagnetic', name: 'Elementary charge', symbol: 'e', value: '1.602176634 × 10⁻¹⁹', unit: 'C', description: 'Charge of a single electron or proton.' },
  { id: 'c5', category: 'Electromagnetic', name: 'Vacuum permittivity', symbol: 'ε₀', value: '8.8541878128 × 10⁻¹²', unit: 'F/m', description: 'Absolute dielectric permittivity of classical vacuum.' },
  { id: 'c6', category: 'Atomic', name: 'Electron mass', symbol: 'mₑ', value: '9.1093837015 × 10⁻³¹', unit: 'kg', description: 'The mass of a stationary electron.' },
  { id: 'c7', category: 'Atomic', name: 'Proton mass', symbol: 'mₚ', value: '1.67262192369 × 10⁻²⁷', unit: 'kg', description: 'The rest mass of a proton.' },
  { id: 'c8', category: 'Atomic', name: 'Avogadro constant', symbol: 'N_A', value: '6.02214076 × 10²³', unit: 'mol⁻¹', description: 'Number of particles in one mole of a substance.' },
  { id: 'c9', category: 'Thermodynamic', name: 'Molar Gas Constant', symbol: 'R', value: '8.314462618', unit: 'J⋅mol⁻¹⋅K⁻¹', description: 'Equivalent to Boltzmann constant per mole.' },
  { id: 'c10', category: 'Thermodynamic', name: 'Boltzmann constant', symbol: 'k', value: '1.380649 × 10⁻²³', unit: 'J/K', description: 'Relates kinetic energy of particles to thermodynamic temperature.' },
];

const Constants: React.FC = () => {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [activeTab]);

  const tabs = [t.toolSearchAll, 'Universal', 'Electromagnetic', 'Atomic', 'Thermodynamic'];

  const filtered = CONSTANTS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.symbol.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === t.toolSearchAll || activeTab === 'All' || c.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCopy = (id: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pt-24 pb-12 px-6 lg:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">{t.toolConstantsTitle}</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">{t.toolConstantsSubtitle}</p>
      </div>
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/60 p-4 rounded-2xl border border-white/5">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {tabs.map(tab => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-amber-600 text-white' : 'hover:bg-white/10 text-slate-400'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input type="text" placeholder={t.toolConstantsSearchPlaceholder} value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-amber-500/50 text-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filtered.map(c => (
            <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              key={c.id} className="glass-panel rounded-xl p-5 border border-white/10 bg-slate-900/40 hover:bg-slate-800/60 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{c.category}</span>
                <button onClick={() => handleCopy(c.id, c.value)}
                  className={`${copiedId === c.id ? 'text-green-400' : 'text-slate-500 hover:text-white'} transition-colors`}>
                  {copiedId === c.id ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <div className="flex gap-4 items-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl font-serif italic text-amber-400 border border-white/10 shrink-0">{c.symbol}</div>
                <div>
                  <div className="text-xl font-mono font-bold text-white leading-tight">{c.value}</div>
                  <div className="text-sm text-slate-400">{c.unit}</div>
                </div>
              </div>
              <div className="text-sm font-semibold text-white mb-1">{c.name}</div>
              <div className="text-xs text-slate-500 leading-relaxed line-clamp-3">{c.description}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && <div className="col-span-full py-12 text-center text-slate-500">{t.toolConstantsNoResults}</div>}
      </div>
    </div>
  );
};

export default Constants;
