import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Twitter, Github, Linkedin, Instagram, Send, Mail, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLang } from '../services/LanguageContext';

const MotionSpan = motion.span as any;

const TITLES = [
  { text: "E-Prayog", lang: "en" },
  { text: "ಇ-ಪ್ರಯೋಗ", lang: "kn" },
];

const Footer: React.FC = () => {
  const { t } = useLang();
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    setTimeout(() => { setSent(false); setFeedback(''); }, 2000);
  };

  return (
    <footer className="bg-[#020617] border-t border-white/5 pt-16 pb-8 z-10 relative mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity"></div>
                <FlaskConical className="w-8 h-8 text-emerald-400 relative z-10" />
              </div>
              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <MotionSpan
                    key={titleIndex}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-display font-bold text-white tracking-tight leading-none whitespace-nowrap text-glow"
                  >
                    {TITLES[titleIndex].lang === 'en' ? (
                      <>E-<span className="text-emerald-400">Prayog</span></>
                    ) : (
                      <>ಇ-<span className="text-emerald-400">ಪ್ರಯೋಗ</span></>
                    )}
                  </MotionSpan>
                </AnimatePresence>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t.footerDesc}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-emerald-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" aria-label="Github" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-indigo-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">{t.footerPlatform}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">{t.navHome}</Link></li>
              <li><Link to="/subjects" className="hover:text-emerald-400 transition-colors">{t.footerVirtualLabs}</Link></li>
              <li><Link to="/tutor" className="hover:text-emerald-400 transition-colors">{t.navTutor}</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">{t.navDashboard}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">{t.footerSupport}</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">{t.footerContactUs}</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">{t.footerAboutUs}</Link></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footerPrivacy}</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">{t.footerTerms}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide">{t.footerFeedback}</h3>
            <p className="text-xs text-gray-400 mb-4">{t.footerFeedbackDesc}</p>
            <form onSubmit={handleFeedback} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.footerFeedbackPlaceholder}
                  aria-label="Send feedback"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all resize-none h-28 placeholder-gray-600 shadow-inner"
                />
                <button type="submit" aria-label="Submit Feedback" className={`absolute bottom-3 right-3 p-2.5 rounded-xl transition-all shadow-xl hover:scale-110 active:scale-95 ${sent ? 'bg-green-500 text-white' : 'bg-emerald-600 text-white hover:bg-emerald-500'}`}>
                  {sent ? <Heart size={18} fill="currentColor" /> : <Send size={18} />}
                </button>
              </div>
              {sent && <motion.p initial={{opacity:0, y: 5}} animate={{opacity:1, y:0}} className="text-xs text-emerald-400 font-medium">{t.footerFeedbackThanks}</motion.p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} E-Prayog. {t.footerRights}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Mail size={14} />
            <span>support@eprayog.in</span>
          </div>
        </div>

        <div className="w-full text-center mt-6 pt-4 border-t border-white/5 pb-4">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            {t.footerBuiltFor} <span className="text-emerald-400 font-bold tracking-wide">{t.footerKarnatakaStudents}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
