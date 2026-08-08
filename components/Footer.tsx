import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin, Send, Mail, Heart } from 'lucide-react';
import { AnimatePresence, m as motion } from 'framer-motion';
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
    <footer className="bg-[#04060A] border-t border-white/[0.04] pt-16 pb-8 z-10 relative mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
              {/* ── Animated Orbital Logo Mark (matches Navbar) ── */}
              <svg
                viewBox="0 0 80 80"
                width="44"
                height="44"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                style={{ overflow: 'visible', flexShrink: 0 }}
              >
                <defs>
                  <linearGradient id="ft-outerG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="ft-innerG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="ft-eG" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#67E8F9" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <radialGradient id="ft-eGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0891B2" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
                  </radialGradient>
                  <filter id="ft-outerElecGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="ft-innerElecGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="ft-ringGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="0.7" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="ft-eGlowF" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <path id="ft-outerPath" d="M 67.2,40 A 27.2,11.2 0 1 1 67.19,39.97" fill="none" />
                  <path id="ft-innerPath" d="M 57.6,40 A 17.6,7.2 0 1 1 57.59,39.97" fill="none" />
                </defs>

                {/* Outer ring */}
                <g className="ep-outer-ring" style={{ transformOrigin: '40px 40px' }}>
                  <ellipse cx="40" cy="40" rx="27.2" ry="11.2"
                    fill="none" stroke="url(#ft-outerG)" strokeWidth="1.6" strokeOpacity="1"
                    filter="url(#ft-ringGlow)"
                    transform="rotate(-20,40,40)"
                  />
                </g>

                {/* Inner ring */}
                <g className="ep-inner-ring" style={{ transformOrigin: '40px 40px' }}>
                  <ellipse cx="40" cy="40" rx="17.6" ry="7.2"
                    fill="none" stroke="url(#ft-innerG)" strokeWidth="1.6" strokeOpacity="1"
                    filter="url(#ft-ringGlow)"
                    transform="rotate(55,40,40)"
                  />
                </g>

                {/* Outer electrons */}
                <g className="ep-outer-ring" style={{ transformOrigin: '40px 40px' }}>
                  <g filter="url(#ft-outerElecGlow)">
                    <circle r="2.2" fill="#22D3EE">
                      <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlinkHref="#ft-outerPath" />
                      </animateMotion>
                    </circle>
                    <circle r="1.5" fill="#22D3EE" opacity="0.45">
                      <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-0.17s">
                        <mpath xlinkHref="#ft-outerPath" />
                      </animateMotion>
                    </circle>
                  </g>
                  <g filter="url(#ft-outerElecGlow)">
                    <circle r="2.2" fill="#06B6D4">
                      <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3s">
                        <mpath xlinkHref="#ft-outerPath" />
                      </animateMotion>
                    </circle>
                    <circle r="1.5" fill="#06B6D4" opacity="0.45">
                      <animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" begin="-3.17s">
                        <mpath xlinkHref="#ft-outerPath" />
                      </animateMotion>
                    </circle>
                  </g>
                </g>

                {/* Inner electron */}
                <g className="ep-inner-ring" style={{ transformOrigin: '40px 40px' }}>
                  <g filter="url(#ft-innerElecGlow)">
                    <circle r="2" fill="#F59E0B">
                      <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlinkHref="#ft-innerPath" />
                      </animateMotion>
                    </circle>
                    <circle r="1.3" fill="#F59E0B" opacity="0.4">
                      <animateMotion dur="4s" repeatCount="indefinite" calcMode="linear" begin="-0.14s">
                        <mpath xlinkHref="#ft-innerPath" />
                      </animateMotion>
                    </circle>
                  </g>
                </g>

                {/* E ambient glow */}
                <ellipse cx="40" cy="40" rx="9" ry="9" fill="url(#ft-eGlow)" className="ep-eglow" />

                {/* Central E */}
                <g className="ep-eletter" style={{ transformOrigin: '40px 40px' }}>
                  <text x="40" y="44" textAnchor="middle" dominantBaseline="middle"
                    fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="20"
                    fill="url(#ft-eG)" filter="url(#ft-eGlowF)"
                    style={{ userSelect: 'none' }}
                  >E</text>
                </g>

                {/* Sparks */}
                <circle cx="62" cy="22" r="1" fill="#67E8F9" className="ep-spark ep-s1" />
                <circle cx="18" cy="26" r="0.8" fill="#06B6D4" className="ep-spark ep-s2" />
                <circle cx="64" cy="57" r="0.9" fill="#F59E0B" className="ep-spark ep-s3" />
                <circle cx="16" cy="54" r="1" fill="#67E8F9" className="ep-spark ep-s4" />
              </svg>

              {/* Wordmark */}
              <div className="flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <MotionSpan
                    key={titleIndex}
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-display font-semibold text-white tracking-tight leading-none whitespace-nowrap"
                  >
                    {TITLES[titleIndex].lang === 'en' ? (
                      <>E-<span className="text-cyan-400">Prayog</span></>
                    ) : (
                      <>ಇ-<span className="text-cyan-400">ಪ್ರಯೋಗ</span></>
                    )}
                  </MotionSpan>
                </AnimatePresence>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-light">
              {t.footerDesc}
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Twitter" className="text-slate-400 hover:text-cyan-400 transition-colors"><Twitter size={18} /></a>
              <a href="#" aria-label="Github" className="text-slate-400 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-cyan-400 transition-colors"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6 tracking-wider uppercase text-xs">{t.footerPlatform}</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-cyan-400 transition-colors">{t.navHome}</Link></li>
              <li><Link to="/subjects" className="hover:text-cyan-400 transition-colors">{t.footerVirtualLabs}</Link></li>
              <li><Link to="/tutor" className="hover:text-cyan-400 transition-colors">{t.navTutor}</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors">{t.navDashboard}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6 tracking-wider uppercase text-xs">{t.footerSupport}</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">{t.footerContactUs}</Link></li>
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors">{t.footerAboutUs}</Link></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.footerPrivacy}</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">{t.footerTerms}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6 tracking-wider uppercase text-xs">{t.footerFeedback}</h3>
            <p className="text-xs text-slate-400 mb-4 font-light">{t.footerFeedbackDesc}</p>
            <form onSubmit={handleFeedback} className="space-y-4">
              <div className="relative group">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={t.footerFeedbackPlaceholder}
                  aria-label="Send feedback"
                  className="w-full bg-[#0D1117] border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-[#131922] transition-all resize-none h-28 placeholder-slate-600 shadow-inner"
                />
                <button type="submit" aria-label="Submit Feedback" className={`absolute bottom-3 right-3 p-2.5 rounded-xl transition-all ${sent ? 'bg-green-500 text-white' : 'bg-cyan-500 text-slate-900 hover:bg-cyan-400 font-bold'}`}>
                  {sent ? <Heart size={16} fill="currentColor" /> : <Send size={16} />}
                </button>
              </div>
              {sent && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-cyan-400 font-medium">{t.footerFeedbackThanks}</motion.p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} E-Prayog. {t.footerRights}</p>
          <a href="mailto:sushantshetty09@gmail.com" className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-400 transition-colors">
            <Mail size={14} />
            <span>sushantshetty09@gmail.com</span>
          </a>
        </div>

        <div className="w-full text-center mt-6 pt-4 border-t border-white/[0.04] pb-4">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1 font-light">
            {t.footerBuiltFor} <span className="text-cyan-400 font-medium tracking-wide">{t.footerKarnatakaStudents}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
